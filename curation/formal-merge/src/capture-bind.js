const byId=id=>document.getElementById(id);
byId('addBtn').addEventListener('click',()=>byId('addDialog').showModal());
for(const el of document.querySelectorAll('[data-close]'))el.addEventListener('click',()=>byId(el.dataset.close).close());
for(const d of [byId('addDialog'),byId('saveDialog')])d.addEventListener('close',()=>d.querySelectorAll('video').forEach(v=>v.pause()));
byId('startRecordBtn').addEventListener('click',startScreenRecord);byId('stopRecordBtn').addEventListener('click',stopRecording);
byId('importBtn').addEventListener('click',()=>byId('fileInput').click());byId('fileInput').addEventListener('change',e=>{const f=e.target.files[0];if(f)prepareCapture(f,f.name.replace(/\.[^.]+$/,''));e.target.value=''});
byId('saveForm').addEventListener('submit',saveCapture);
window.addEventListener('pagehide',()=>{stopRecording();if(STATE.pending)URL.revokeObjectURL(STATE.pending.url)});
