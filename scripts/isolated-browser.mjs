import {spawn,execFileSync} from 'node:child_process';
import {existsSync} from 'node:fs';
import {mkdir,writeFile,rm} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const project=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const delay=ms=>new Promise(r=>setTimeout(r,ms));
export async function withBrowser(task,options={}){
 const candidates=[process.env.PROGRAMFILES&&path.join(process.env.PROGRAMFILES,'Google/Chrome/Application/chrome.exe'),process.env['PROGRAMFILES(X86)']&&path.join(process.env['PROGRAMFILES(X86)'],'Microsoft/Edge/Application/msedge.exe'),process.env.LOCALAPPDATA&&path.join(process.env.LOCALAPPDATA,'Google/Chrome/Application/chrome.exe')].filter(Boolean);
 const discovered=JSON.parse(execFileSync('powershell.exe',['-NoProfile','-Command','Get-CimInstance Win32_Process | Where-Object { $_.Name -match "^(chrome|msedge)\\.exe$" } | Select-Object -First 1 -ExpandProperty ExecutablePath | ConvertTo-Json -Compress'],{encoding:'utf8',windowsHide:true}).trim()||'null');if(discovered)candidates.unshift(discovered);const exe=candidates.find(existsSync);if(!exe)throw new Error('No supported installed browser found');
 const profile=path.join(project,'.runtime/formal-merge/browser-'+process.pid+'-'+Date.now());await mkdir(profile,{recursive:true});
 const child=spawn(exe,['--headless=new','--remote-debugging-pipe','--no-first-run','--no-default-browser-check','--disable-background-networking','--disable-extensions',...(options.gpu?[]:['--disable-gpu']),...(options.softwareVideoDecode?['--disable-accelerated-video-decode']:[]),...(options.highPerformanceGPU?['--force-high-performance-gpu']:[]),'--user-data-dir='+profile],{windowsHide:true,stdio:['ignore','ignore','pipe','pipe','pipe']});
 let sequence=0,buffer='',closed=false;const pending=new Map(),events=new Map();let stderr='';child.stderr.on('data',d=>{stderr=(stderr+d).slice(-1000)});
 child.stdio[4].on('data',d=>{buffer+=d.toString();let i;while((i=buffer.indexOf('\0'))>=0){const line=buffer.slice(0,i);buffer=buffer.slice(i+1);if(!line)continue;let response;try{response=JSON.parse(line)}catch{continue}if(response.method)for(const fn of events.get(response.method)||[]){try{fn(response.params,response.sessionId)}catch(e){stderr=(stderr+'\n'+e.message).slice(-1000)}}const p=pending.get(response.id);if(p){pending.delete(response.id);clearTimeout(p.timer);response.error?p.reject(new Error(response.error.message)):p.resolve(response.result);}}});
 function send(method,params={},sessionId){if(closed)return Promise.reject(new Error('Browser closed'));return new Promise((resolve,reject)=>{const id=++sequence;const timer=setTimeout(()=>{pending.delete(id);reject(new Error('CDP timeout: '+method))},25000);pending.set(id,{resolve,reject,timer});child.stdio[3].write(JSON.stringify({id,method,params,...(sessionId?{sessionId}:{})})+'\0')});}
 try{await delay(500);const {targetId}=await send('Target.createTarget',{url:'about:blank'});const {sessionId}=await send('Target.attachToTarget',{targetId,flatten:true});const call=(m,p={})=>send(m,p,sessionId);await call('Page.enable');await call('Runtime.enable');await call('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
 const evaluate=async expression=>{const r=await call('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw new Error(r.exceptionDetails.text+': '+JSON.stringify(r.exceptionDetails.exception));return r.result?.value};
 const goto=async(url,wait=1800)=>{const r=await call('Page.navigate',{url});if(r.errorText)throw new Error(r.errorText);await delay(wait);return evaluate('({url:location.href,title:document.title,ready:document.readyState})')};
 const onEvent=(name,fn)=>{if(!events.has(name))events.set(name,new Set());events.get(name).add(fn);return()=>events.get(name)?.delete(fn)};
 return await task({call,evaluate,goto,delay,project,profile,send,onEvent,sessionId});
 }finally{
  try{await send('Browser.close')}catch{}
  closed=true;for(const p of pending.values()){clearTimeout(p.timer);p.reject(new Error('Browser closed'))}pending.clear();
  if(child.exitCode===null&&child.signalCode===null)child.kill();
  for(let n=0;n<30&&child.exitCode===null&&child.signalCode===null;n++)await delay(100);
  // Only this call's isolated, project-owned profile is disposable; never touch the user's Chrome profile.
  if(!options.keepProfile&&(child.exitCode!==null||child.signalCode!==null)){
   try{await rm(profile,{recursive:true,force:true,maxRetries:3,retryDelay:200});}
   catch(e){console.error('Isolated browser scratch retained after '+e.code+'; use the bounded maintenance audit when no QA browser is running.');}
  }
 }
}
if(process.argv[2]==='probe'){
 console.log(JSON.stringify(await withBrowser(async b=>{const local=await b.goto('http://127.0.0.1:4380/app/assets/motion-vault.html');const cards=await b.evaluate('document.querySelectorAll(".card").length');let external;try{external=await b.goto('https://tympanus.net/codrops/hub/gsap-highlights/',4000);external.videos=await b.evaluate('document.querySelectorAll("video").length')}catch(e){external={error:e.message}}return {local,cards,external,profile:'isolated project-local test profile; no personal browser attached'}})),null,2);
}
