import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'
import ts from 'typescript'
import * as consent from '../lib/analytics-consent.ts'

const code = ts.transpileModule(readFileSync('components/analytics/AnalyticsConsent.tsx', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText
function harness({ enabled = true, saved, storageThrows = false, locale = 'en' } = {}) {
  const slots = [], listeners = new Map(), store = new Map(saved === undefined ? [] : [[consent.CONSENT_KEY, saved]])
  let index = 0, pending = [], changed = true, result
  const signals = [], writes = []
  const win = { addEventListener: (k,v) => listeners.set(k,v), removeEventListener: k => listeners.delete(k), dispatchEvent: e => signals.push([e.type,win.gappyAnalyticsConsent]) }
  const depsEqual = (a,b) => a && b && a.length === b.length && a.every((v,i)=>Object.is(v,b[i]))
  class HTMLElement { focus() {} }
  const react = {
    createContext: value => ({ Provider: 'Provider', value }), useContext: c => c.value,
    useRef: v => { const i=index++; return slots[i] ||= {current:v} },
    useState: v => { const i=index++; slots[i] ||= {value:v}; return [slots[i].value, value => { if (!Object.is(slots[i].value,value)) {slots[i].value=value;changed=true} }] },
    useEffect: (fn,deps) => { const i=index++; if(!depsEqual(slots[i]?.deps,deps)){slots[i]?.cleanup?.();slots[i]={deps};pending.push(()=>{slots[i].cleanup=fn()})} },
  }
  const doc = { activeElement: new HTMLElement(), get cookie(){return '_ga=synthetic; _ga_STREAM=synthetic; essential=keep'}, set cookie(v){writes.push(v)} }
  const exports = {}
  vm.runInNewContext(code, {exports,window:win,document:doc,HTMLElement,Event:class {constructor(type){this.type=type}},location:{hostname:'gappy.jp',pathname:'/'},localStorage:{getItem:k=>{if(storageThrows)throw Error();return store.get(k)},setItem:(k,v)=>{if(storageThrows)throw Error();store.set(k,v)}},require:name=>({react,'react/jsx-runtime':{jsx:(type,props)=>({type,props}),jsxs:(type,props)=>({type,props})},'next/navigation':{usePathname:()=>locale==='ja'?'/ja/':'/'},'@/lib/analytics-consent':consent,'./analytics-consent.css':{}})[name]})
  function render(){changed=true;let n=0;while(changed){assert.ok(n++<10);changed=false;index=0;pending=[];result=exports.default({enabled,children:'site'});pending.forEach(f=>f())}return result}
  function nodes(node=result){return !node||typeof node!=='object'?[]:[node,...[node.props?.children].flat(3).flatMap(n=>nodes(n))]}
  render()
  return {win,store,signals,writes,nodes,render,visible:()=>nodes().some(n=>n.type==='section'),choose:grant=>{const label=locale==='ja'?(grant?'許可する':'拒否する'):(grant?'Allow analytics':'Decline');nodes().find(n=>n.type==='button'&&n.props.children===label).props.onClick();render()},open:()=>{result.props.value.open();render()},sync:value=>{value===null?store.delete(consent.CONSENT_KEY):store.set(consent.CONSENT_KEY,value);listeners.get('storage')({key:consent.CONSENT_KEY});render()}}
}
const disabled=harness({enabled:false})
assert.equal(disabled.visible(),false);assert.equal(disabled.signals.length,0)
const fresh=harness()
assert.equal(fresh.visible(),true);assert.equal(fresh.win.gappyAnalyticsConsent,'denied')
fresh.choose(false)
assert.equal(fresh.visible(),false);assert.equal(fresh.store.get(consent.CONSENT_KEY),'denied')
fresh.open();assert.equal(fresh.visible(),true)
fresh.choose(true);assert.equal(fresh.win.gappyAnalyticsConsent,'granted');assert.equal(fresh.store.size,1)
fresh.open();fresh.choose(false)
assert.equal(fresh.win.gappyAnalyticsConsent,'denied')
assert.ok(fresh.writes.some(x=>x.startsWith('_ga=')))
assert.ok(fresh.writes.some(x=>x.startsWith('_ga_STREAM=')))
assert.ok(fresh.writes.every(x=>!x.includes('essential')))
for(const locale of ['en','ja']){
 const restored=harness({saved:'granted',locale});assert.equal(restored.visible(),false);assert.equal(restored.win.gappyAnalyticsConsent,'granted')
 restored.sync('denied');assert.equal(restored.win.gappyAnalyticsConsent,'denied')
 restored.sync(null);assert.equal(restored.visible(),true);assert.equal(restored.win.gappyAnalyticsConsent,'denied')
}
assert.equal(harness({saved:'invalid'}).visible(),true)
const blocked=harness({storageThrows:true});blocked.choose(true);assert.equal(blocked.win.gappyAnalyticsConsent,'granted');assert.equal(blocked.store.size,0);assert.ok(blocked.nodes().some(n=>n.props?.role==='status'))
assert.doesNotThrow(()=>consent.clearAnalyticsCookies({get cookie(){throw Error()}},'gappy.jp','/'))
console.log('PASS: actual consent TSX — shared disabled gate, first visit, decline, grant, reopen/revoke, storage-only decision, restore EN/JP, cross-tab sync, invalid/blocked storage and bounded cookie removal')
