import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import { createGappyOrbit, bezier } from '../components/home-v2/orbit/orbit-runtime.js';

class Element {
  constructor(tag) { this.tag=tag; this.attrs={}; this.style={}; this.children=[]; this.events=new Map(); this.dataset={}; this.clientWidth=1200; this.classes=new Set(); this.classList={contains:n=>this.classes.has(n),add:n=>this.classes.add(n),remove:n=>this.classes.delete(n)}; }
  setAttribute(n,v) { this.attrs[n]=String(v); }
  getAttribute(n) { return this.attrs[n]??null; }
  removeAttribute(n) { delete this.attrs[n]; }
  append(...children) { for(const c of children) {this.children.push(c);c.parent=this;} }
  remove() { if(this.parent)this.parent.children=this.parent.children.filter(c=>c!==this); }
  addEventListener(n,fn) { this.events.set(n,fn); }
  removeEventListener(n) { this.events.delete(n); }
}
const document=new Element('document'); document.hidden=false; document.createElementNS=(_,tag)=>new Element(tag);
const media=new Element('media');media.matches=false;
const frames=new Map();let frameId=0;let io,resize;
const observers=[];
class IO { constructor(cb){this.cb=cb;this.disconnected=false;io=this;observers.push(this);} observe(){} disconnect(){this.disconnected=true;} }
class RO { constructor(cb){this.cb=cb;this.disconnected=false;resize=this;observers.push(this);} observe(){} disconnect(){this.disconnected=true;} }
Object.assign(globalThis,{document,window:{matchMedia:()=>media,IntersectionObserver:IO},IntersectionObserver:IO,ResizeObserver:RO,requestAnimationFrame:fn=>{frames.set(++frameId,fn);return frameId;},cancelAnimationFrame:id=>frames.delete(id)});
const tools=JSON.parse(readFileSync('public/orbit-reference/tools.json','utf8'));
const all=(e,p)=>[...(p(e)?[e]:[]),...e.children.flatMap(c=>all(c,p))];
const attr=(e,n)=>all(e,x=>n in x.attrs);
const values=e=>attr(e,'data-orbit-card').map(n=>n.attrs.transform);
const step=timestamp=>{const pending=[...frames.values()];frames.clear();pending.forEach(fn=>fn(timestamp));};
const escape=s=>String(s).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
function serialize(e){if(e.style.display==='none')return '';return `<${e.tag} ${Object.entries(e.attrs).map(([k,v])=>`${k}="${escape(v)}"`).join(' ')}>${escape(e.textContent??'')}${e.children.map(serialize).join('')}</${e.tag}>`;}
function staticFile(host,name){
 const svg=host.children[0];svg.setAttribute('xmlns','http://www.w3.org/2000/svg');
 for(const img of all(svg,e=>e.tag==='image')) {const path=img.attrs.href;img.setAttribute('href',`data:${path.endsWith('.png')?'image/png':'image/svg+xml'};base64,${readFileSync('public'+path).toString('base64')}`);}
 for(const signal of attr(svg,'data-orbit-signal'))signal.setAttribute('opacity','0');
 writeFileSync(`public/orbit-reference/static-${name}.svg`,serialize(svg)+'\n');
}
const host=new Element('div');
const orbit=createGappyOrbit(host,{tools,mobileCount:4});
assert.equal(frames.size,0);io.cb([{isIntersecting:true}]);step(0);step(50);const moved=values(host);step(100);assert.notDeepEqual(values(host),moved);
const point=n=>n.attrs.transform.match(/[-\d.]+/g).map(Number);
const first=attr(host,'data-orbit-card').map(point);step(150);const next=attr(host,'data-orbit-card').map(point);
for(let i=0;i<first.length;i++){const a=first[i],b=next[i];const cross=(a[0]-600)*(b[1]-310)-(a[1]-310)*(b[0]-600);assert.equal(Math.sign(cross),i%2===0?1:-1);}
const stable=fn=>{fn();const p=values(host);assert.equal(frames.size,0);step(100000);assert.deepEqual(values(host),p);};
stable(()=>orbit.setPaused(true));orbit.setPaused(false);assert.equal(frames.size,1);
stable(()=>{document.hidden=true;document.events.get('visibilitychange')();});document.hidden=false;document.events.get('visibilitychange')();const beforeResume=values(host);step(200000);assert.deepEqual(values(host),beforeResume);step(200050);assert.notDeepEqual(values(host),beforeResume);
stable(()=>{media.matches=true;media.events.get('change')();});assert.ok(attr(host,'data-orbit-signal').every(e=>e.attrs.opacity==='0'));media.matches=false;media.events.get('change')();
stable(()=>io.cb([{isIntersecting:false}]));io.cb([{isIntersecting:true}]);
for(const width of [272,350,640,900,1230]){
 host.clientWidth=width;resize.cb();const visible=attr(host,'data-orbit-card').filter(n=>n.style.display!=='none');assert.equal(visible.length,width<=900?4:6);
 assert.ok(visible.every(n=>/^translate\(/.test(n.attrs.transform)&&!n.attrs.transform.includes('rotate')));
}
// Curved connectors terminate at the card boundary and particles use the same Bezier.
const paths=attr(host,'data-orbit-line');const nodes=attr(host,'data-orbit-card');
for(let i=0;i<paths.length;i++){
 const v=paths[i].attrs.d.match(/-?\d+(?:\.\d+)?/g).map(Number);const [x,y]=point(nodes[i]);
 const dx=Math.abs(v[4]-x),dy=Math.abs(v[5]-y);assert.ok(Math.abs(Math.max(dx,dy)-35)<.03);
 assert.deepEqual(bezier({x:v[0],y:v[1]},{x:v[2],y:v[3]},{x:v[4],y:v[5]},0),{x:v[0],y:v[1]});
 assert.deepEqual(bezier({x:v[0],y:v[1]},{x:v[2],y:v[3]},{x:v[4],y:v[5]},1),{x:v[4],y:v[5]});
}
// Sample the actual runtime over the full 46/64-second common cycle.
let time=300000;
for(const width of [350,1230]) {
 host.clientWidth=width;resize.cb();step(time);
 for(let frame=0;frame<29440;frame++) {
  time+=50;step(time);if(frame%10)continue;
  const visible=attr(host,'data-orbit-card').filter(n=>n.style.display!=='none');
  const w=width<=900?520:1200,cx=w/2,cy=310,r=width<=900?73:91;
  const boxes=visible.map(n=>{const [x,y]=point(n);const card=n.children[0];const half=+card.attrs.width/2;return {x,y,half};});
  for(const b of boxes){
   assert.ok(b.x-b.half>=0&&b.x+b.half<=w&&b.y-b.half>=0&&b.y+b.half<=620,'card clipped');
   const dx=Math.max(Math.abs(b.x-cx)-b.half,0),dy=Math.max(Math.abs(b.y-cy)-b.half,0);
   assert.ok(dx*dx+dy*dy>r*r,'card touches center');
  }
  for(let i=0;i<boxes.length;i++)for(let j=i+1;j<boxes.length;j++){
   const a=boxes[i],b=boxes[j];assert.ok(Math.abs(a.x-b.x)>=a.half+b.half||Math.abs(a.y-b.y)>=a.half+b.half,'cards overlap');
  }
 }
}
orbit.destroy();assert.equal(frames.size,0);assert.equal(host.children.length,0);assert.equal(document.events.size,0);assert.equal(media.events.size,0);assert.ok(observers.every(o=>o.disconnected));
if(process.argv.includes('--write-static')){
 for(const [name,width] of [['desktop',1200],['mobile',350],['desktop-light',1200],['mobile-light',350]]){const h=new Element('div');h.clientWidth=width;const c=createGappyOrbit(h,{tools,mobileCount:4,paused:true,theme:name.includes('light')?'light':'dark'});staticFile(h,name);c.destroy();}
}
console.log('PASS supplied runtime: counter-rotation, upright cards, curve endpoints, pause/resume, hidden-tab no-jump, reduced motion, offscreen, resize, cleanup');
