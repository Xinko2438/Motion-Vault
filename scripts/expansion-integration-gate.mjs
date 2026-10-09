// Human acceptance authorizes the exact requested integration. It is never an
// automatic runtime result, asset promotion, or a production-selection decision.
import {createHash} from 'node:crypto';
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
export function verifyExpansionIntegration({compatibility,registry,formal,candidates,galleryHTML,redirectHTML}){
 if(!registry.length)return{mode:'no-expansion',humanAccepted:false,automaticRuntimePassed:false};
 if(compatibility.integrationAllowed!==true)throw Error('Source expansion integration gate is closed');
 const ids=registry.map(i=>String(i.id)),all=[...formal.items,...candidates.items].map(i=>String(i.id));
 if(new Set(ids).size!==ids.length||new Set(all).size!==all.length||ids.some(id=>!all.includes(id)))throw Error('Expansion identity mismatch');
 const human=compatibility.humanAcceptance,bindings=human?.boundHashes;
 if(human?.previewUserConfirmed===true&&human?.fusionUserAuthorized===true&&human?.additionalBrowserVerificationRequired===false){
  if(!human.authorizationEvidence?.userStatement||!bindings||bindings.gallerySha256!==hash(galleryHTML)||bindings.redirectSha256!==hash(redirectHTML)||bindings.formalCatalogueSha256!==hash(JSON.stringify(formal))||bindings.candidateCatalogueSha256!==hash(JSON.stringify(candidates))||bindings.registrySha256!==hash(JSON.stringify(registry)))throw Error('Human acceptance does not match these current files');
  const counts=compatibility.cataloguePlan;
  if(!counts||counts.formalSourceCount!==formal.items.length||counts.candidateSourceCount!==candidates.items.length||counts.expansionSourceCount!==registry.length)throw Error('Human-accepted source catalogue counts differ');
  if(compatibility.runtimeApprovedCount!==0||compatibility.runtimeApprovedIds?.length!==0)throw Error('Human-only acceptance must retain zero automatic runtime approvals');
  return{mode:'explicit-human-acceptance',humanAccepted:true,automaticRuntimePassed:false,automaticRuntimeApprovedCount:0,expansionSourceCount:registry.length};
 }
 const approved=new Set((compatibility.runtimeApprovedIds||[]).map(String));
 if(compatibility.runtimeApprovedCount!==ids.length||ids.some(id=>!approved.has(id)))throw Error('Expansion lacks complete automatic runtime approval or matching human acceptance');
 return{mode:'automatic-runtime-evidence',humanAccepted:false,automaticRuntimePassed:true,automaticRuntimeApprovedCount:ids.length};
}
