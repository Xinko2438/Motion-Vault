// Moves policy declarations only; does not change policy text or resource order.
const META = /<meta\b[^>]*>/gi;
const IS_CSP = /\bhttp-equiv\s*=\s*(["'])content-security-policy\1/i;
const IS_CHARSET = /\bcharset\s*=/i;
const RESOURCE = /<(?:script|link|style|img|iframe|object|embed|source|video|audio|base)\b|<meta\b[^>]*\bhttp-equiv\s*=\s*(["'])refresh\1/i;
function headRange(html) {
  const opening=/<head\b[^>]*>/i.exec(html), closing=/<\/head\s*>/i.exec(html);
  if(!opening || !closing || closing.index < opening.index) throw new Error('Expected one valid HTML head');
  return {start:opening.index+opening[0].length,end:closing.index};
}
function policyMatches(head) { return [...head.matchAll(META)].filter(match=>IS_CSP.test(match[0])); }
export function assertCSPBeforeResources(html, label='HTML') {
  const range=headRange(html), head=html.slice(range.start,range.end), policies=policyMatches(head);
  if(!policies.length) throw new Error(label+': missing CSP policy');
  const firstResource=RESOURCE.exec(head);
  if(firstResource && policies.some(policy=>policy.index > firstResource.index)) throw new Error(label+': executable/resource appears before CSP');
  return true;
}
export function moveCSPToFront(html) {
  const range=headRange(html), head=html.slice(range.start,range.end), policies=policyMatches(head);
  if(!policies.length) throw new Error('Cannot order an absent CSP policy');
  const charset=[...head.matchAll(META)].find(match=>IS_CHARSET.test(match[0]));
  const firstResource=RESOURCE.exec(head);
  const anchor=charset && (!firstResource || charset.index < firstResource.index) ? charset.index+charset[0].length : 0;
  // Already directly after charset/head (ignoring whitespace) is the canonical, idempotent state.
  const expected=head.slice(anchor).match(/^\s*/)[0].length+anchor;
  if(policies[0].index===expected && policies.every((policy,index)=> index===0 || !head.slice(policies[index-1].index+policies[index-1][0].length,policy.index).trim())) {
    assertCSPBeforeResources(html); return html;
  }
  const without=head.replace(META,tag=>IS_CSP.test(tag)?'':tag);
  const newCharset=[...without.matchAll(META)].find(match=>IS_CHARSET.test(match[0]));
  const newResource=RESOURCE.exec(without);
  const insertion=newCharset && (!newResource || newCharset.index < newResource.index) ? newCharset.index+newCharset[0].length : 0;
  const ordered=without.slice(0,insertion)+'\n'+policies.map(policy=>policy[0]).join('\n')+'\n'+without.slice(insertion);
  const result=html.slice(0,range.start)+ordered+html.slice(range.end);
  assertCSPBeforeResources(result); return result;
}
