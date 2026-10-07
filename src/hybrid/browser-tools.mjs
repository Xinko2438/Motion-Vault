import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';import path from 'node:path';
export {withBrowser} from '../../scripts/isolated-browser.mjs';
export async function withStage(root, task) {
 const requests=[];
 const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.md':'text/plain; charset=utf-8','.txt':'text/plain; charset=utf-8','.jpg':'image/jpeg','.png':'image/png','.webp':'image/webp','.mp4':'video/mp4','.svg':'image/svg+xml'};
 const server=createServer(async(req,res)=>{try{const u=new URL(req.url,'http://localhost');requests.push(u.pathname);let p=decodeURIComponent(u.pathname);if(p==='/'||p==='/motion-vault.html')p='/index.html';if(p==='/motion-vault-candidates.html')p='/candidates.html';if(p==='/motion-vault-catalog.json')p='/catalog.json';
  const target=path.resolve(root,'.'+p);if(!target.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}const info=await stat(target);if(!info.isFile()){res.writeHead(404);res.end();return;}
  const data=await readFile(target);res.setHeader('Content-Type',types[path.extname(target)]||'application/octet-stream');res.setHeader('Cache-Control','no-cache');res.setHeader('Access-Control-Allow-Origin','*');
  const range=/bytes=(\d+)-(\d*)/.exec(req.headers.range||'');if(range){const a=+range[1],b=Math.min(info.size-1,range[2]?+range[2]:info.size-1);if(a>b){res.writeHead(416);res.end();return;}res.writeHead(206,{'Content-Range':`bytes ${a}-${b}/${info.size}`,'Content-Length':b-a+1,'Accept-Ranges':'bytes'});res.end(data.subarray(a,b+1));}else{res.writeHead(200,{'Content-Length':data.length});res.end(data);}
 }catch{res.writeHead(404,{'Content-Type':'text/plain'});res.end('Not found');}});
 await new Promise((ok,no)=>{server.once('error',no);server.listen(0,'127.0.0.1',ok)});
 try{return await task({url:'http://127.0.0.1:'+server.address().port,requests});}finally{server.closeAllConnections();await new Promise(ok=>server.close(ok));}
}
export async function until(browser, expression, timeout=6000){const start=Date.now();while(Date.now()-start<timeout){if(await browser.evaluate(expression))return true;await browser.delay(60);}throw new Error('Timed out waiting: '+expression);}
