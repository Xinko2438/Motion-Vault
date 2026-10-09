// Scoped transform of pinned Troika 0.47.2 for an owned, terminal local runtime.
// Typesetting/SDF algorithms are unchanged; expose cleanup for its private timers,
// font XHR, atlas textures/contexts, and drop callbacks after disposal.
export function transformTroika(source){
 let text=source;
 const change=(from,to)=>{if(text.split(from).length!==2)throw new Error('Troika lifecycle transform drift: '+from.slice(0,70));text=text.replace(from,to);};
 change('function createTypesetter(fontParser, bidi, config) {',`const vaultFontRequests=new Set(),vaultTypeDisposers=new Set();let vaultTextDisposed=false;
function createTypesetter(fontParser, bidi, config) {`);
 change('const fonts = Object.create(null);','const fonts = Object.create(null);vaultTypeDisposers.add(()=>{for(const key of Object.keys(fonts))delete fonts[key];});');
 change('function doLoadFont(url, callback) {','function doLoadFont(url, callback) {if(vaultTextDisposed)return;');
 change('function loadFont(fontUrl, callback) {','function loadFont(fontUrl, callback) {if(vaultTextDisposed)return;');
 change('        typesetter.typeset(args, resolve);','        if(!vaultTextDisposed)typesetter.typeset(args, resolve);');
 change('const onError = err => {','const onError = err => {if(vaultTextDisposed)return;window.VaultSourceFail?.(err);');
 change('const request = new XMLHttpRequest();','const request = new XMLHttpRequest();vaultFontRequests.add(request);');
 change('request.onload = function () {','request.onload = function () {vaultFontRequests.delete(request);if(vaultTextDisposed)return;');
 change('request.onerror = onError;','request.onerror = error=>{vaultFontRequests.delete(request);onError(error);};');
 change('function generateSDF(width, height, path, viewBox, distance, exponent, canvas, x, y, channel, useWebGL = true) {','function generateSDF(width, height, path, viewBox, distance, exponent, canvas, x, y, channel, useWebGL = true) {if(vaultTextDisposed)return Promise.reject(new DOMException("Disposed","AbortError"));');
 change('.then(({ textureData, timing }) => {','.then(({ textureData, timing }) => {if(vaultTextDisposed)return {timing:0};');
 change('function getTextRenderInfo(args, callback) {','function getTextRenderInfo(args, callback) {if(vaultTextDisposed)return;');
 change('typesetInWorker(args).then(result => {','typesetInWorker(args).then(result => {if(vaultTextDisposed)return;');
 change('if (neededSDFs.length && !atlas.contextLost) {','if(vaultTextDisposed)return;\n      if (neededSDFs.length && !atlas.contextLost) {');
 text+=`\nexport function disposeVaultTextResources(){
 if(vaultTextDisposed)return;vaultTextDisposed=true;clearTimeout(timer);timer=0;queue.length=0;
 for(const request of vaultFontRequests)request.abort();vaultFontRequests.clear();
 for(const dispose of vaultTypeDisposers)dispose();vaultTypeDisposers.clear();
 for(const thread of Object.values(threads))clearTimeout(thread.idleTimer);
 for(const key of Object.keys(atlases)){const atlas=atlases[key];atlas.contextLost=true;atlas.sdfTexture.dispose();atlas.glyphsByFont.clear();const gl=atlas.sdfCanvas.getContext('webgl');gl?.getExtension('WEBGL_lose_context')?.loseContext();atlas.sdfCanvas.width=atlas.sdfCanvas.height=1;delete atlases[key];}
}\n`;
 return text;
}
