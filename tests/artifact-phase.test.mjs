import test from 'node:test';
import assert from 'node:assert/strict';
import {verifyCandidateInventory,verifyPublicationTarget} from '../scripts/artifact-phase.mjs';
const a='a'.repeat(64), b='b'.repeat(64), c='c'.repeat(64);
const fixture=()=>({plan:{schema:'motion.reviewed-promotion-plan.v1',baselineInventory:{'index.html':a,'asset.txt':a},finalInventory:{'index.html':b,'asset.txt':a,'new.txt':c},writes:{'index.html':{before:a,after:b},'new.txt':{before:null,after:c}}},actual:{'index.html':b,'asset.txt':a,'new.txt':c}});
test('Reviewed candidate is validated against its exact prospective inventory, not an old publication receipt',()=>assert.equal(verifyCandidateInventory(fixture()).verified,true));
test('Missing, extra, changed or unplanned candidate files fail closed',()=>{
 for(const mutate of [f=>delete f.actual['asset.txt'],f=>f.actual['extra.txt']=a,f=>f.actual['new.txt']=a,f=>delete f.plan.writes['new.txt'],f=>f.plan.writes['index.html'].before=c,f=>delete f.plan.finalInventory['asset.txt'],f=>{f.plan.writes['../escape']={before:null,after:a};f.plan.finalInventory['../escape']=a;f.actual['../escape']=a;}]){const f=fixture();mutate(f);assert.throws(()=>verifyCandidateInventory(f));}
});
test('Publication permits the reviewed before-image or identical after-image and rejects later edits',()=>{
 for(const actualHash of [a,b])assert.doesNotThrow(()=>verifyPublicationTarget({beforeHash:a,afterHash:b,actualHash}));
 assert.doesNotThrow(()=>verifyPublicationTarget({beforeHash:null,afterHash:b,actualHash:null}));
 for(const actualHash of [c,null])assert.throws(()=>verifyPublicationTarget({beforeHash:a,afterHash:b,actualHash}));
 assert.throws(()=>verifyPublicationTarget({beforeHash:null,afterHash:b,actualHash:a}));
});
