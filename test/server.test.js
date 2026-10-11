const {test,before,after}=require('node:test');
const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const path=require('node:path');
let child;
const base='http://127.0.0.1:3107';
before(async()=>{
 child=spawn(process.execPath,['server.js'],{cwd:path.join(__dirname,'..'),env:{...process.env,PORT:'3107'},stdio:['ignore','pipe','pipe']});
 await new Promise((resolve,reject)=>{child.stdout.once('data',resolve);child.once('error',reject);child.once('exit',code=>reject(Error('Server exited '+code)));});
});
after(()=>child?.kill());
test('serves app entry point with its script and stylesheet',async()=>{
 const r=await fetch(base);assert.equal(r.status,200);assert.match(r.headers.get('content-type'),/text\/html/);const body=await r.text();assert.match(body,/\/app.js/);assert.match(body,/\/style.css/);
});
test('serves JavaScript and CSS with correct content types',async()=>{
 for(const [file,type] of [['app.js','javascript'],['style.css','css']]){const r=await fetch(base+'/'+file);assert.equal(r.status,200);assert.ok(r.headers.get('content-type').includes(type));assert.ok((await r.text()).length>100);}
});
test('missing files return 404 rather than an app success response',async()=>{const r=await fetch(base+'/missing');assert.equal(r.status,404);});
test('encoded traversal cannot expose package metadata',async()=>{const r=await fetch(base+'/%2e%2e%2fpackage.json');assert.equal(r.status,403);});
