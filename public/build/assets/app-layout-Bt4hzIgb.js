import{b as P,j as l,r as c,f as er,t as tr,c as N,a as we,L as te,d as or,g as nr}from"./app-D7TdYQaz.js";import{u as U,b as Oe,d as xt,a as W,c as R,e as fo,B as rr,h as ar,g as oe}from"./image-Btch9D2m.js";import{b as me,u as Ke,c as A,P as J,d as Le,e as sr}from"./index-mBRvhTHr.js";import{u as ne,a as pe,P as po,D as mo,R as ir,A as lr,c as vo,C as cr,b as ur,T as dr,d as fr,e as pr,f as mr}from"./tooltip-BrYgJ08S.js";import{P as $,d as vr}from"./index-9l8_GOaC.js";import{X as gr}from"./x-CBeBxYgW.js";import{C as Gt,H as hr}from"./hand-heart-bK2Jf_Ze.js";import{b as yr,d as br}from"./index-yf8TppwC.js";import{U as xr,S as _r}from"./user-KDbd4d57.js";import{u as wr}from"./config-BfKQARts.js";import{F as Cr}from"./file-text-CbX6a5Fx.js";import{T as Tr,F as Sr}from"./tag-DQrZuTR0.js";import{S as Er}from"./star-C0JhdQHh.js";function go(t){const e=t+"CollectionProvider",[o,n]=me(e),[r,a]=o(e,{collectionRef:{current:null},itemMap:new Map}),s=v=>{const{scope:g,children:y}=v,h=P.useRef(null),b=P.useRef(new Map).current;return l.jsx(r,{scope:g,itemMap:b,collectionRef:h,children:y})};s.displayName=e;const i=t+"CollectionSlot",u=Oe(i),f=P.forwardRef((v,g)=>{const{scope:y,children:h}=v,b=a(i,y),x=U(g,b.collectionRef);return l.jsx(u,{ref:x,children:h})});f.displayName=i;const p=t+"CollectionItemSlot",d="data-radix-collection-item",m=Oe(p),_=P.forwardRef((v,g)=>{const{scope:y,children:h,...b}=v,x=P.useRef(null),C=U(g,x),E=a(p,y);return P.useEffect(()=>(E.itemMap.set(x,{ref:x,...b}),()=>{E.itemMap.delete(x)})),l.jsx(m,{[d]:"",ref:C,children:h})});_.displayName=p;function w(v){const g=a(t+"CollectionConsumer",v);return P.useCallback(()=>{const h=g.collectionRef.current;if(!h)return[];const b=Array.from(h.querySelectorAll(`[${d}]`));return Array.from(g.itemMap.values()).sort((E,T)=>b.indexOf(E.ref.current)-b.indexOf(T.ref.current))},[g.collectionRef,g.itemMap])}return[{Provider:s,Slot:f,ItemSlot:_},w,n]}var Ue="Collapsible",[Nr]=me(Ue),[Mr,_t]=Nr(Ue),ho=c.forwardRef((t,e)=>{const{__scopeCollapsible:o,open:n,defaultOpen:r,disabled:a,onOpenChange:s,...i}=t,[u,f]=Ke({prop:n,defaultProp:r??!1,onChange:s,caller:Ue});return l.jsx(Mr,{scope:o,disabled:a,contentId:ne(),open:u,onOpenToggle:c.useCallback(()=>f(p=>!p),[f]),children:l.jsx($.div,{"data-state":Ct(u),"data-disabled":a?"":void 0,...i,ref:e})})});ho.displayName=Ue;var yo="CollapsibleTrigger",bo=c.forwardRef((t,e)=>{const{__scopeCollapsible:o,...n}=t,r=_t(yo,o);return l.jsx($.button,{type:"button","aria-controls":r.contentId,"aria-expanded":r.open||!1,"data-state":Ct(r.open),"data-disabled":r.disabled?"":void 0,disabled:r.disabled,...n,ref:e,onClick:A(t.onClick,r.onOpenToggle)})});bo.displayName=yo;var wt="CollapsibleContent",xo=c.forwardRef((t,e)=>{const{forceMount:o,...n}=t,r=_t(wt,t.__scopeCollapsible);return l.jsx(J,{present:o||r.open,children:({present:a})=>l.jsx(Ir,{...n,ref:e,present:a})})});xo.displayName=wt;var Ir=c.forwardRef((t,e)=>{const{__scopeCollapsible:o,present:n,children:r,...a}=t,s=_t(wt,o),[i,u]=c.useState(n),f=c.useRef(null),p=U(e,f),d=c.useRef(0),m=d.current,_=c.useRef(0),w=_.current,v=s.open||i,g=c.useRef(v),y=c.useRef(void 0);return c.useEffect(()=>{const h=requestAnimationFrame(()=>g.current=!1);return()=>cancelAnimationFrame(h)},[]),Le(()=>{const h=f.current;if(h){y.current=y.current||{transitionDuration:h.style.transitionDuration,animationName:h.style.animationName},h.style.transitionDuration="0s",h.style.animationName="none";const b=h.getBoundingClientRect();d.current=b.height,_.current=b.width,g.current||(h.style.transitionDuration=y.current.transitionDuration,h.style.animationName=y.current.animationName),u(n)}},[s.open,n]),l.jsx($.div,{"data-state":Ct(s.open),"data-disabled":s.disabled?"":void 0,id:s.contentId,hidden:!v,...a,ref:p,style:{"--radix-collapsible-content-height":m?`${m}px`:void 0,"--radix-collapsible-content-width":w?`${w}px`:void 0,...t.style},children:v&&r})});function Ct(t){return t?"open":"closed"}var Rr=ho,kr=c.createContext(void 0);function _o(t){const e=c.useContext(kr);return t||e||"ltr"}var ot="focusScope.autoFocusOnMount",nt="focusScope.autoFocusOnUnmount",Kt={bubbles:!1,cancelable:!0},jr="FocusScope",Tt=c.forwardRef((t,e)=>{const{loop:o=!1,trapped:n=!1,onMountAutoFocus:r,onUnmountAutoFocus:a,...s}=t,[i,u]=c.useState(null),f=pe(r),p=pe(a),d=c.useRef(null),m=U(e,v=>u(v)),_=c.useRef({paused:!1,pause(){this.paused=!0},resume(){this.paused=!1}}).current;c.useEffect(()=>{if(n){let v=function(b){if(_.paused||!i)return;const x=b.target;i.contains(x)?d.current=x:Z(d.current,{select:!0})},g=function(b){if(_.paused||!i)return;const x=b.relatedTarget;x!==null&&(i.contains(x)||Z(d.current,{select:!0}))},y=function(b){if(document.activeElement===document.body)for(const C of b)C.removedNodes.length>0&&Z(i)};document.addEventListener("focusin",v),document.addEventListener("focusout",g);const h=new MutationObserver(y);return i&&h.observe(i,{childList:!0,subtree:!0}),()=>{document.removeEventListener("focusin",v),document.removeEventListener("focusout",g),h.disconnect()}}},[n,i,_.paused]),c.useEffect(()=>{if(i){Wt.add(_);const v=document.activeElement;if(!i.contains(v)){const y=new CustomEvent(ot,Kt);i.addEventListener(ot,f),i.dispatchEvent(y),y.defaultPrevented||(Ar($r(wo(i)),{select:!0}),document.activeElement===v&&Z(i))}return()=>{i.removeEventListener(ot,f),setTimeout(()=>{const y=new CustomEvent(nt,Kt);i.addEventListener(nt,p),i.dispatchEvent(y),y.defaultPrevented||Z(v??document.body,{select:!0}),i.removeEventListener(nt,p),Wt.remove(_)},0)}}},[i,f,p,_]);const w=c.useCallback(v=>{if(!o&&!n||_.paused)return;const g=v.key==="Tab"&&!v.altKey&&!v.ctrlKey&&!v.metaKey,y=document.activeElement;if(g&&y){const h=v.currentTarget,[b,x]=Pr(h);b&&x?!v.shiftKey&&y===x?(v.preventDefault(),o&&Z(b,{select:!0})):v.shiftKey&&y===b&&(v.preventDefault(),o&&Z(x,{select:!0})):y===h&&v.preventDefault()}},[o,n,_.paused]);return l.jsx($.div,{tabIndex:-1,...s,ref:m,onKeyDown:w})});Tt.displayName=jr;function Ar(t,{select:e=!1}={}){const o=document.activeElement;for(const n of t)if(Z(n,{select:e}),document.activeElement!==o)return}function Pr(t){const e=wo(t),o=Ut(e,t),n=Ut(e.reverse(),t);return[o,n]}function wo(t){const e=[],o=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT,{acceptNode:n=>{const r=n.tagName==="INPUT"&&n.type==="hidden";return n.disabled||n.hidden||r?NodeFilter.FILTER_SKIP:n.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});for(;o.nextNode();)e.push(o.currentNode);return e}function Ut(t,e){for(const o of t)if(!Dr(o,{upTo:e}))return o}function Dr(t,{upTo:e}){if(getComputedStyle(t).visibility==="hidden")return!0;for(;t;){if(e!==void 0&&t===e)return!1;if(getComputedStyle(t).display==="none")return!0;t=t.parentElement}return!1}function Or(t){return t instanceof HTMLInputElement&&"select"in t}function Z(t,{select:e=!1}={}){if(t&&t.focus){const o=document.activeElement;t.focus({preventScroll:!0}),t!==o&&Or(t)&&e&&t.select()}}var Wt=Lr();function Lr(){let t=[];return{add(e){const o=t[0];e!==o&&o?.pause(),t=Vt(t,e),t.unshift(e)},remove(e){t=Vt(t,e),t[0]?.resume()}}}function Vt(t,e){const o=[...t],n=o.indexOf(e);return n!==-1&&o.splice(n,1),o}function $r(t){return t.filter(e=>e.tagName!=="A")}var rt=0;function Co(){c.useEffect(()=>{const t=document.querySelectorAll("[data-radix-focus-guard]");return document.body.insertAdjacentElement("afterbegin",t[0]??Ht()),document.body.insertAdjacentElement("beforeend",t[1]??Ht()),rt++,()=>{rt===1&&document.querySelectorAll("[data-radix-focus-guard]").forEach(e=>e.remove()),rt--}},[])}function Ht(){const t=document.createElement("span");return t.setAttribute("data-radix-focus-guard",""),t.tabIndex=0,t.style.outline="none",t.style.opacity="0",t.style.position="fixed",t.style.pointerEvents="none",t}var q=function(){return q=Object.assign||function(e){for(var o,n=1,r=arguments.length;n<r;n++){o=arguments[n];for(var a in o)Object.prototype.hasOwnProperty.call(o,a)&&(e[a]=o[a])}return e},q.apply(this,arguments)};function To(t,e){var o={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(o[n]=t[n]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,n=Object.getOwnPropertySymbols(t);r<n.length;r++)e.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(t,n[r])&&(o[n[r]]=t[n[r]]);return o}function Fr(t,e,o){if(o||arguments.length===2)for(var n=0,r=e.length,a;n<r;n++)(a||!(n in e))&&(a||(a=Array.prototype.slice.call(e,0,n)),a[n]=e[n]);return t.concat(a||Array.prototype.slice.call(e))}var Ae="right-scroll-bar-position",Pe="width-before-scroll-bar",Br="with-scroll-bars-hidden",zr="--removed-body-scroll-bar-size";function at(t,e){return typeof t=="function"?t(e):t&&(t.current=e),t}function Gr(t,e){var o=c.useState(function(){return{value:t,callback:e,facade:{get current(){return o.value},set current(n){var r=o.value;r!==n&&(o.value=n,o.callback(n,r))}}}})[0];return o.callback=e,o.facade}var Kr=typeof window<"u"?c.useLayoutEffect:c.useEffect,Xt=new WeakMap;function Ur(t,e){var o=Gr(null,function(n){return t.forEach(function(r){return at(r,n)})});return Kr(function(){var n=Xt.get(o);if(n){var r=new Set(n),a=new Set(t),s=o.current;r.forEach(function(i){a.has(i)||at(i,null)}),a.forEach(function(i){r.has(i)||at(i,s)})}Xt.set(o,t)},[t]),o}function Wr(t){return t}function Vr(t,e){e===void 0&&(e=Wr);var o=[],n=!1,r={read:function(){if(n)throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");return o.length?o[o.length-1]:t},useMedium:function(a){var s=e(a,n);return o.push(s),function(){o=o.filter(function(i){return i!==s})}},assignSyncMedium:function(a){for(n=!0;o.length;){var s=o;o=[],s.forEach(a)}o={push:function(i){return a(i)},filter:function(){return o}}},assignMedium:function(a){n=!0;var s=[];if(o.length){var i=o;o=[],i.forEach(a),s=o}var u=function(){var p=s;s=[],p.forEach(a)},f=function(){return Promise.resolve().then(u)};f(),o={push:function(p){s.push(p),f()},filter:function(p){return s=s.filter(p),o}}}};return r}function Hr(t){t===void 0&&(t={});var e=Vr(null);return e.options=q({async:!0,ssr:!1},t),e}var So=function(t){var e=t.sideCar,o=To(t,["sideCar"]);if(!e)throw new Error("Sidecar: please provide `sideCar` property to import the right car");var n=e.read();if(!n)throw new Error("Sidecar medium not found");return c.createElement(n,q({},o))};So.isSideCarExport=!0;function Xr(t,e){return t.useMedium(e),So}var Eo=Hr(),st=function(){},We=c.forwardRef(function(t,e){var o=c.useRef(null),n=c.useState({onScrollCapture:st,onWheelCapture:st,onTouchMoveCapture:st}),r=n[0],a=n[1],s=t.forwardProps,i=t.children,u=t.className,f=t.removeScrollBar,p=t.enabled,d=t.shards,m=t.sideCar,_=t.noRelative,w=t.noIsolation,v=t.inert,g=t.allowPinchZoom,y=t.as,h=y===void 0?"div":y,b=t.gapMode,x=To(t,["forwardProps","children","className","removeScrollBar","enabled","shards","sideCar","noRelative","noIsolation","inert","allowPinchZoom","as","gapMode"]),C=m,E=Ur([o,e]),T=q(q({},x),r);return c.createElement(c.Fragment,null,p&&c.createElement(C,{sideCar:Eo,removeScrollBar:f,shards:d,noRelative:_,noIsolation:w,inert:v,setCallbacks:a,allowPinchZoom:!!g,lockRef:o,gapMode:b}),s?c.cloneElement(c.Children.only(i),q(q({},T),{ref:E})):c.createElement(h,q({},T,{className:u,ref:E}),i))});We.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1};We.classNames={fullWidth:Pe,zeroRight:Ae};var Yr=function(){if(typeof __webpack_nonce__<"u")return __webpack_nonce__};function qr(){if(!document)return null;var t=document.createElement("style");t.type="text/css";var e=Yr();return e&&t.setAttribute("nonce",e),t}function Qr(t,e){t.styleSheet?t.styleSheet.cssText=e:t.appendChild(document.createTextNode(e))}function Zr(t){var e=document.head||document.getElementsByTagName("head")[0];e.appendChild(t)}var Jr=function(){var t=0,e=null;return{add:function(o){t==0&&(e=qr())&&(Qr(e,o),Zr(e)),t++},remove:function(){t--,!t&&e&&(e.parentNode&&e.parentNode.removeChild(e),e=null)}}},ea=function(){var t=Jr();return function(e,o){c.useEffect(function(){return t.add(e),function(){t.remove()}},[e&&o])}},No=function(){var t=ea(),e=function(o){var n=o.styles,r=o.dynamic;return t(n,r),null};return e},ta={left:0,top:0,right:0,gap:0},it=function(t){return parseInt(t||"",10)||0},oa=function(t){var e=window.getComputedStyle(document.body),o=e[t==="padding"?"paddingLeft":"marginLeft"],n=e[t==="padding"?"paddingTop":"marginTop"],r=e[t==="padding"?"paddingRight":"marginRight"];return[it(o),it(n),it(r)]},na=function(t){if(t===void 0&&(t="margin"),typeof window>"u")return ta;var e=oa(t),o=document.documentElement.clientWidth,n=window.innerWidth;return{left:e[0],top:e[1],right:e[2],gap:Math.max(0,n-o+e[2]-e[0])}},ra=No(),fe="data-scroll-locked",aa=function(t,e,o,n){var r=t.left,a=t.top,s=t.right,i=t.gap;return o===void 0&&(o="margin"),`
  .`.concat(Br,` {
   overflow: hidden `).concat(n,`;
   padding-right: `).concat(i,"px ").concat(n,`;
  }
  body[`).concat(fe,`] {
    overflow: hidden `).concat(n,`;
    overscroll-behavior: contain;
    `).concat([e&&"position: relative ".concat(n,";"),o==="margin"&&`
    padding-left: `.concat(r,`px;
    padding-top: `).concat(a,`px;
    padding-right: `).concat(s,`px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(i,"px ").concat(n,`;
    `),o==="padding"&&"padding-right: ".concat(i,"px ").concat(n,";")].filter(Boolean).join(""),`
  }
  
  .`).concat(Ae,` {
    right: `).concat(i,"px ").concat(n,`;
  }
  
  .`).concat(Pe,` {
    margin-right: `).concat(i,"px ").concat(n,`;
  }
  
  .`).concat(Ae," .").concat(Ae,` {
    right: 0 `).concat(n,`;
  }
  
  .`).concat(Pe," .").concat(Pe,` {
    margin-right: 0 `).concat(n,`;
  }
  
  body[`).concat(fe,`] {
    `).concat(zr,": ").concat(i,`px;
  }
`)},Yt=function(){var t=parseInt(document.body.getAttribute(fe)||"0",10);return isFinite(t)?t:0},sa=function(){c.useEffect(function(){return document.body.setAttribute(fe,(Yt()+1).toString()),function(){var t=Yt()-1;t<=0?document.body.removeAttribute(fe):document.body.setAttribute(fe,t.toString())}},[])},ia=function(t){var e=t.noRelative,o=t.noImportant,n=t.gapMode,r=n===void 0?"margin":n;sa();var a=c.useMemo(function(){return na(r)},[r]);return c.createElement(ra,{styles:aa(a,!e,r,o?"":"!important")})},pt=!1;if(typeof window<"u")try{var Ie=Object.defineProperty({},"passive",{get:function(){return pt=!0,!0}});window.addEventListener("test",Ie,Ie),window.removeEventListener("test",Ie,Ie)}catch{pt=!1}var ce=pt?{passive:!1}:!1,la=function(t){return t.tagName==="TEXTAREA"},Mo=function(t,e){if(!(t instanceof Element))return!1;var o=window.getComputedStyle(t);return o[e]!=="hidden"&&!(o.overflowY===o.overflowX&&!la(t)&&o[e]==="visible")},ca=function(t){return Mo(t,"overflowY")},ua=function(t){return Mo(t,"overflowX")},qt=function(t,e){var o=e.ownerDocument,n=e;do{typeof ShadowRoot<"u"&&n instanceof ShadowRoot&&(n=n.host);var r=Io(t,n);if(r){var a=Ro(t,n),s=a[1],i=a[2];if(s>i)return!0}n=n.parentNode}while(n&&n!==o.body);return!1},da=function(t){var e=t.scrollTop,o=t.scrollHeight,n=t.clientHeight;return[e,o,n]},fa=function(t){var e=t.scrollLeft,o=t.scrollWidth,n=t.clientWidth;return[e,o,n]},Io=function(t,e){return t==="v"?ca(e):ua(e)},Ro=function(t,e){return t==="v"?da(e):fa(e)},pa=function(t,e){return t==="h"&&e==="rtl"?-1:1},ma=function(t,e,o,n,r){var a=pa(t,window.getComputedStyle(e).direction),s=a*n,i=o.target,u=e.contains(i),f=!1,p=s>0,d=0,m=0;do{if(!i)break;var _=Ro(t,i),w=_[0],v=_[1],g=_[2],y=v-g-a*w;(w||y)&&Io(t,i)&&(d+=y,m+=w);var h=i.parentNode;i=h&&h.nodeType===Node.DOCUMENT_FRAGMENT_NODE?h.host:h}while(!u&&i!==document.body||u&&(e.contains(i)||e===i));return(p&&Math.abs(d)<1||!p&&Math.abs(m)<1)&&(f=!0),f},Re=function(t){return"changedTouches"in t?[t.changedTouches[0].clientX,t.changedTouches[0].clientY]:[0,0]},Qt=function(t){return[t.deltaX,t.deltaY]},Zt=function(t){return t&&"current"in t?t.current:t},va=function(t,e){return t[0]===e[0]&&t[1]===e[1]},ga=function(t){return`
  .block-interactivity-`.concat(t,` {pointer-events: none;}
  .allow-interactivity-`).concat(t,` {pointer-events: all;}
`)},ha=0,ue=[];function ya(t){var e=c.useRef([]),o=c.useRef([0,0]),n=c.useRef(),r=c.useState(ha++)[0],a=c.useState(No)[0],s=c.useRef(t);c.useEffect(function(){s.current=t},[t]),c.useEffect(function(){if(t.inert){document.body.classList.add("block-interactivity-".concat(r));var v=Fr([t.lockRef.current],(t.shards||[]).map(Zt),!0).filter(Boolean);return v.forEach(function(g){return g.classList.add("allow-interactivity-".concat(r))}),function(){document.body.classList.remove("block-interactivity-".concat(r)),v.forEach(function(g){return g.classList.remove("allow-interactivity-".concat(r))})}}},[t.inert,t.lockRef.current,t.shards]);var i=c.useCallback(function(v,g){if("touches"in v&&v.touches.length===2||v.type==="wheel"&&v.ctrlKey)return!s.current.allowPinchZoom;var y=Re(v),h=o.current,b="deltaX"in v?v.deltaX:h[0]-y[0],x="deltaY"in v?v.deltaY:h[1]-y[1],C,E=v.target,T=Math.abs(b)>Math.abs(x)?"h":"v";if("touches"in v&&T==="h"&&E.type==="range")return!1;var S=window.getSelection(),I=S&&S.anchorNode,M=I?I===E||I.contains(E):!1;if(M)return!1;var k=qt(T,E);if(!k)return!0;if(k?C=T:(C=T==="v"?"h":"v",k=qt(T,E)),!k)return!1;if(!n.current&&"changedTouches"in v&&(b||x)&&(n.current=C),!C)return!0;var O=n.current||C;return ma(O,g,v,O==="h"?b:x)},[]),u=c.useCallback(function(v){var g=v;if(!(!ue.length||ue[ue.length-1]!==a)){var y="deltaY"in g?Qt(g):Re(g),h=e.current.filter(function(C){return C.name===g.type&&(C.target===g.target||g.target===C.shadowParent)&&va(C.delta,y)})[0];if(h&&h.should){g.cancelable&&g.preventDefault();return}if(!h){var b=(s.current.shards||[]).map(Zt).filter(Boolean).filter(function(C){return C.contains(g.target)}),x=b.length>0?i(g,b[0]):!s.current.noIsolation;x&&g.cancelable&&g.preventDefault()}}},[]),f=c.useCallback(function(v,g,y,h){var b={name:v,delta:g,target:y,should:h,shadowParent:ba(y)};e.current.push(b),setTimeout(function(){e.current=e.current.filter(function(x){return x!==b})},1)},[]),p=c.useCallback(function(v){o.current=Re(v),n.current=void 0},[]),d=c.useCallback(function(v){f(v.type,Qt(v),v.target,i(v,t.lockRef.current))},[]),m=c.useCallback(function(v){f(v.type,Re(v),v.target,i(v,t.lockRef.current))},[]);c.useEffect(function(){return ue.push(a),t.setCallbacks({onScrollCapture:d,onWheelCapture:d,onTouchMoveCapture:m}),document.addEventListener("wheel",u,ce),document.addEventListener("touchmove",u,ce),document.addEventListener("touchstart",p,ce),function(){ue=ue.filter(function(v){return v!==a}),document.removeEventListener("wheel",u,ce),document.removeEventListener("touchmove",u,ce),document.removeEventListener("touchstart",p,ce)}},[]);var _=t.removeScrollBar,w=t.inert;return c.createElement(c.Fragment,null,w?c.createElement(a,{styles:ga(r)}):null,_?c.createElement(ia,{noRelative:t.noRelative,gapMode:t.gapMode}):null)}function ba(t){for(var e=null;t!==null;)t instanceof ShadowRoot&&(e=t.host,t=t.host),t=t.parentNode;return e}const xa=Xr(Eo,ya);var St=c.forwardRef(function(t,e){return c.createElement(We,q({},t,{ref:e,sideCar:xa}))});St.classNames=We.classNames;var _a=function(t){if(typeof document>"u")return null;var e=Array.isArray(t)?t[0]:t;return e.ownerDocument.body},de=new WeakMap,ke=new WeakMap,je={},lt=0,ko=function(t){return t&&(t.host||ko(t.parentNode))},wa=function(t,e){return e.map(function(o){if(t.contains(o))return o;var n=ko(o);return n&&t.contains(n)?n:(console.error("aria-hidden",o,"in not contained inside",t,". Doing nothing"),null)}).filter(function(o){return!!o})},Ca=function(t,e,o,n){var r=wa(e,Array.isArray(t)?t:[t]);je[o]||(je[o]=new WeakMap);var a=je[o],s=[],i=new Set,u=new Set(r),f=function(d){!d||i.has(d)||(i.add(d),f(d.parentNode))};r.forEach(f);var p=function(d){!d||u.has(d)||Array.prototype.forEach.call(d.children,function(m){if(i.has(m))p(m);else try{var _=m.getAttribute(n),w=_!==null&&_!=="false",v=(de.get(m)||0)+1,g=(a.get(m)||0)+1;de.set(m,v),a.set(m,g),s.push(m),v===1&&w&&ke.set(m,!0),g===1&&m.setAttribute(o,"true"),w||m.setAttribute(n,"true")}catch(y){console.error("aria-hidden: cannot operate on ",m,y)}})};return p(e),i.clear(),lt++,function(){s.forEach(function(d){var m=de.get(d)-1,_=a.get(d)-1;de.set(d,m),a.set(d,_),m||(ke.has(d)||d.removeAttribute(n),ke.delete(d)),_||d.removeAttribute(o)}),lt--,lt||(de=new WeakMap,de=new WeakMap,ke=new WeakMap,je={})}},jo=function(t,e,o){o===void 0&&(o="data-aria-hidden");var n=Array.from(Array.isArray(t)?t:[t]),r=_a(t);return r?(n.push.apply(n,Array.from(r.querySelectorAll("[aria-live], script"))),Ca(n,r,o,"aria-hidden")):function(){return null}},Ve="Dialog",[Ao,mu]=me(Ve),[Ta,Y]=Ao(Ve),Po=t=>{const{__scopeDialog:e,children:o,open:n,defaultOpen:r,onOpenChange:a,modal:s=!0}=t,i=c.useRef(null),u=c.useRef(null),[f,p]=Ke({prop:n,defaultProp:r??!1,onChange:a,caller:Ve});return l.jsx(Ta,{scope:e,triggerRef:i,contentRef:u,contentId:ne(),titleId:ne(),descriptionId:ne(),open:f,onOpenChange:p,onOpenToggle:c.useCallback(()=>p(d=>!d),[p]),modal:s,children:o})};Po.displayName=Ve;var Do="DialogTrigger",Oo=c.forwardRef((t,e)=>{const{__scopeDialog:o,...n}=t,r=Y(Do,o),a=U(e,r.triggerRef);return l.jsx($.button,{type:"button","aria-haspopup":"dialog","aria-expanded":r.open,"aria-controls":r.contentId,"data-state":Mt(r.open),...n,ref:a,onClick:A(t.onClick,r.onOpenToggle)})});Oo.displayName=Do;var Et="DialogPortal",[Sa,Lo]=Ao(Et,{forceMount:void 0}),$o=t=>{const{__scopeDialog:e,forceMount:o,children:n,container:r}=t,a=Y(Et,e);return l.jsx(Sa,{scope:e,forceMount:o,children:c.Children.map(n,s=>l.jsx(J,{present:o||a.open,children:l.jsx(po,{asChild:!0,container:r,children:s})}))})};$o.displayName=Et;var $e="DialogOverlay",Fo=c.forwardRef((t,e)=>{const o=Lo($e,t.__scopeDialog),{forceMount:n=o.forceMount,...r}=t,a=Y($e,t.__scopeDialog);return a.modal?l.jsx(J,{present:n||a.open,children:l.jsx(Na,{...r,ref:e})}):null});Fo.displayName=$e;var Ea=Oe("DialogOverlay.RemoveScroll"),Na=c.forwardRef((t,e)=>{const{__scopeDialog:o,...n}=t,r=Y($e,o);return l.jsx(St,{as:Ea,allowPinchZoom:!0,shards:[r.contentRef],children:l.jsx($.div,{"data-state":Mt(r.open),...n,ref:e,style:{pointerEvents:"auto",...n.style}})})}),re="DialogContent",Bo=c.forwardRef((t,e)=>{const o=Lo(re,t.__scopeDialog),{forceMount:n=o.forceMount,...r}=t,a=Y(re,t.__scopeDialog);return l.jsx(J,{present:n||a.open,children:a.modal?l.jsx(Ma,{...r,ref:e}):l.jsx(Ia,{...r,ref:e})})});Bo.displayName=re;var Ma=c.forwardRef((t,e)=>{const o=Y(re,t.__scopeDialog),n=c.useRef(null),r=U(e,o.contentRef,n);return c.useEffect(()=>{const a=n.current;if(a)return jo(a)},[]),l.jsx(zo,{...t,ref:r,trapFocus:o.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:A(t.onCloseAutoFocus,a=>{a.preventDefault(),o.triggerRef.current?.focus()}),onPointerDownOutside:A(t.onPointerDownOutside,a=>{const s=a.detail.originalEvent,i=s.button===0&&s.ctrlKey===!0;(s.button===2||i)&&a.preventDefault()}),onFocusOutside:A(t.onFocusOutside,a=>a.preventDefault())})}),Ia=c.forwardRef((t,e)=>{const o=Y(re,t.__scopeDialog),n=c.useRef(!1),r=c.useRef(!1);return l.jsx(zo,{...t,ref:e,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:a=>{t.onCloseAutoFocus?.(a),a.defaultPrevented||(n.current||o.triggerRef.current?.focus(),a.preventDefault()),n.current=!1,r.current=!1},onInteractOutside:a=>{t.onInteractOutside?.(a),a.defaultPrevented||(n.current=!0,a.detail.originalEvent.type==="pointerdown"&&(r.current=!0));const s=a.target;o.triggerRef.current?.contains(s)&&a.preventDefault(),a.detail.originalEvent.type==="focusin"&&r.current&&a.preventDefault()}})}),zo=c.forwardRef((t,e)=>{const{__scopeDialog:o,trapFocus:n,onOpenAutoFocus:r,onCloseAutoFocus:a,...s}=t,i=Y(re,o),u=c.useRef(null),f=U(e,u);return Co(),l.jsxs(l.Fragment,{children:[l.jsx(Tt,{asChild:!0,loop:!0,trapped:n,onMountAutoFocus:r,onUnmountAutoFocus:a,children:l.jsx(mo,{role:"dialog",id:i.contentId,"aria-describedby":i.descriptionId,"aria-labelledby":i.titleId,"data-state":Mt(i.open),...s,ref:f,onDismiss:()=>i.onOpenChange(!1)})}),l.jsxs(l.Fragment,{children:[l.jsx(Ra,{titleId:i.titleId}),l.jsx(ja,{contentRef:u,descriptionId:i.descriptionId})]})]})}),Nt="DialogTitle",Go=c.forwardRef((t,e)=>{const{__scopeDialog:o,...n}=t,r=Y(Nt,o);return l.jsx($.h2,{id:r.titleId,...n,ref:e})});Go.displayName=Nt;var Ko="DialogDescription",Uo=c.forwardRef((t,e)=>{const{__scopeDialog:o,...n}=t,r=Y(Ko,o);return l.jsx($.p,{id:r.descriptionId,...n,ref:e})});Uo.displayName=Ko;var Wo="DialogClose",Vo=c.forwardRef((t,e)=>{const{__scopeDialog:o,...n}=t,r=Y(Wo,o);return l.jsx($.button,{type:"button",...n,ref:e,onClick:A(t.onClick,()=>r.onOpenChange(!1))})});Vo.displayName=Wo;function Mt(t){return t?"open":"closed"}var Ho="DialogTitleWarning",[vu,Xo]=sr(Ho,{contentName:re,titleName:Nt,docsSlug:"dialog"}),Ra=({titleId:t})=>{const e=Xo(Ho),o=`\`${e.contentName}\` requires a \`${e.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${e.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${e.docsSlug}`;return c.useEffect(()=>{t&&(document.getElementById(t)||console.error(o))},[o,t]),null},ka="DialogDescriptionWarning",ja=({contentRef:t,descriptionId:e})=>{const n=`Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${Xo(ka).contentName}}.`;return c.useEffect(()=>{const r=t.current?.getAttribute("aria-describedby");e&&r&&(document.getElementById(e)||console.warn(n))},[n,t,e]),null},Aa=Po,gu=Oo,Pa=$o,Da=Fo,Oa=Bo,La=Go,$a=Uo,Fa=Vo,ct={exports:{}},ut={};var Jt;function Ba(){if(Jt)return ut;Jt=1;var t=er();function e(d,m){return d===m&&(d!==0||1/d===1/m)||d!==d&&m!==m}var o=typeof Object.is=="function"?Object.is:e,n=t.useState,r=t.useEffect,a=t.useLayoutEffect,s=t.useDebugValue;function i(d,m){var _=m(),w=n({inst:{value:_,getSnapshot:m}}),v=w[0].inst,g=w[1];return a(function(){v.value=_,v.getSnapshot=m,u(v)&&g({inst:v})},[d,_,m]),r(function(){return u(v)&&g({inst:v}),d(function(){u(v)&&g({inst:v})})},[d]),s(_),_}function u(d){var m=d.getSnapshot;d=d.value;try{var _=m();return!o(d,_)}catch{return!0}}function f(d,m){return m()}var p=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?f:i;return ut.useSyncExternalStore=t.useSyncExternalStore!==void 0?t.useSyncExternalStore:p,ut}var eo;function za(){return eo||(eo=1,ct.exports=Ba()),ct.exports}var Ga=za();function Ka(){return Ga.useSyncExternalStore(Ua,()=>!0,()=>!1)}function Ua(){return()=>{}}var dt="rovingFocusGroup.onEntryFocus",Wa={bubbles:!1,cancelable:!0},Ce="RovingFocusGroup",[mt,Yo,Va]=go(Ce),[Ha,qo]=me(Ce,[Va]),[Xa,Ya]=Ha(Ce),Qo=c.forwardRef((t,e)=>l.jsx(mt.Provider,{scope:t.__scopeRovingFocusGroup,children:l.jsx(mt.Slot,{scope:t.__scopeRovingFocusGroup,children:l.jsx(qa,{...t,ref:e})})}));Qo.displayName=Ce;var qa=c.forwardRef((t,e)=>{const{__scopeRovingFocusGroup:o,orientation:n,loop:r=!1,dir:a,currentTabStopId:s,defaultCurrentTabStopId:i,onCurrentTabStopIdChange:u,onEntryFocus:f,preventScrollOnEntryFocus:p=!1,...d}=t,m=c.useRef(null),_=U(e,m),w=_o(a),[v,g]=Ke({prop:s,defaultProp:i??null,onChange:u,caller:Ce}),[y,h]=c.useState(!1),b=pe(f),x=Yo(o),C=c.useRef(!1),[E,T]=c.useState(0);return c.useEffect(()=>{const S=m.current;if(S)return S.addEventListener(dt,b),()=>S.removeEventListener(dt,b)},[b]),l.jsx(Xa,{scope:o,orientation:n,dir:w,loop:r,currentTabStopId:v,onItemFocus:c.useCallback(S=>g(S),[g]),onItemShiftTab:c.useCallback(()=>h(!0),[]),onFocusableItemAdd:c.useCallback(()=>T(S=>S+1),[]),onFocusableItemRemove:c.useCallback(()=>T(S=>S-1),[]),children:l.jsx($.div,{tabIndex:y||E===0?-1:0,"data-orientation":n,...d,ref:_,style:{outline:"none",...t.style},onMouseDown:A(t.onMouseDown,()=>{C.current=!0}),onFocus:A(t.onFocus,S=>{const I=!C.current;if(S.target===S.currentTarget&&I&&!y){const M=new CustomEvent(dt,Wa);if(S.currentTarget.dispatchEvent(M),!M.defaultPrevented){const k=x().filter(V=>V.focusable),O=k.find(V=>V.active),L=k.find(V=>V.id===v),F=[O,L,...k].filter(Boolean).map(V=>V.ref.current);en(F,p)}}C.current=!1}),onBlur:A(t.onBlur,()=>h(!1))})})}),Zo="RovingFocusGroupItem",Jo=c.forwardRef((t,e)=>{const{__scopeRovingFocusGroup:o,focusable:n=!0,active:r=!1,tabStopId:a,children:s,...i}=t,u=ne(),f=a||u,p=Ya(Zo,o),d=p.currentTabStopId===f,m=Yo(o),{onFocusableItemAdd:_,onFocusableItemRemove:w,currentTabStopId:v}=p;return c.useEffect(()=>{if(n)return _(),()=>w()},[n,_,w]),l.jsx(mt.ItemSlot,{scope:o,id:f,focusable:n,active:r,children:l.jsx($.span,{tabIndex:d?0:-1,"data-orientation":p.orientation,...i,ref:e,onMouseDown:A(t.onMouseDown,g=>{n?p.onItemFocus(f):g.preventDefault()}),onFocus:A(t.onFocus,()=>p.onItemFocus(f)),onKeyDown:A(t.onKeyDown,g=>{if(g.key==="Tab"&&g.shiftKey){p.onItemShiftTab();return}if(g.target!==g.currentTarget)return;const y=Ja(g,p.orientation,p.dir);if(y!==void 0){if(g.metaKey||g.ctrlKey||g.altKey||g.shiftKey)return;g.preventDefault();let b=m().filter(x=>x.focusable).map(x=>x.ref.current);if(y==="last")b.reverse();else if(y==="prev"||y==="next"){y==="prev"&&b.reverse();const x=b.indexOf(g.currentTarget);b=p.loop?es(b,x+1):b.slice(x+1)}setTimeout(()=>en(b))}}),children:typeof s=="function"?s({isCurrentTabStop:d,hasTabStop:v!=null}):s})})});Jo.displayName=Zo;var Qa={ArrowLeft:"prev",ArrowUp:"prev",ArrowRight:"next",ArrowDown:"next",PageUp:"first",Home:"first",PageDown:"last",End:"last"};function Za(t,e){return e!=="rtl"?t:t==="ArrowLeft"?"ArrowRight":t==="ArrowRight"?"ArrowLeft":t}function Ja(t,e,o){const n=Za(t.key,o);if(!(e==="vertical"&&["ArrowLeft","ArrowRight"].includes(n))&&!(e==="horizontal"&&["ArrowUp","ArrowDown"].includes(n)))return Qa[n]}function en(t,e=!1){const o=document.activeElement;for(const n of t)if(n===o||(n.focus({preventScroll:e}),document.activeElement!==o))return}function es(t,e){return t.map((o,n)=>t[(e+n)%t.length])}var ts=Qo,os=Jo,vt=["Enter"," "],ns=["ArrowDown","PageUp","Home"],tn=["ArrowUp","PageDown","End"],rs=[...ns,...tn],as={ltr:[...vt,"ArrowRight"],rtl:[...vt,"ArrowLeft"]},ss={ltr:["ArrowLeft"],rtl:["ArrowRight"]},Te="Menu",[be,is,ls]=go(Te),[se,on]=me(Te,[ls,vo,qo]),He=vo(),nn=qo(),[cs,ie]=se(Te),[us,Se]=se(Te),rn=t=>{const{__scopeMenu:e,open:o=!1,children:n,dir:r,onOpenChange:a,modal:s=!0}=t,i=He(e),[u,f]=c.useState(null),p=c.useRef(!1),d=pe(a),m=_o(r);return c.useEffect(()=>{const _=()=>{p.current=!0,document.addEventListener("pointerdown",w,{capture:!0,once:!0}),document.addEventListener("pointermove",w,{capture:!0,once:!0})},w=()=>p.current=!1;return document.addEventListener("keydown",_,{capture:!0}),()=>{document.removeEventListener("keydown",_,{capture:!0}),document.removeEventListener("pointerdown",w,{capture:!0}),document.removeEventListener("pointermove",w,{capture:!0})}},[]),l.jsx(ir,{...i,children:l.jsx(cs,{scope:e,open:o,onOpenChange:d,content:u,onContentChange:f,children:l.jsx(us,{scope:e,onClose:c.useCallback(()=>d(!1),[d]),isUsingKeyboardRef:p,dir:m,modal:s,children:n})})})};rn.displayName=Te;var ds="MenuAnchor",It=c.forwardRef((t,e)=>{const{__scopeMenu:o,...n}=t,r=He(o);return l.jsx(lr,{...r,...n,ref:e})});It.displayName=ds;var Rt="MenuPortal",[fs,an]=se(Rt,{forceMount:void 0}),sn=t=>{const{__scopeMenu:e,forceMount:o,children:n,container:r}=t,a=ie(Rt,e);return l.jsx(fs,{scope:e,forceMount:o,children:l.jsx(J,{present:o||a.open,children:l.jsx(po,{asChild:!0,container:r,children:n})})})};sn.displayName=Rt;var H="MenuContent",[ps,kt]=se(H),ln=c.forwardRef((t,e)=>{const o=an(H,t.__scopeMenu),{forceMount:n=o.forceMount,...r}=t,a=ie(H,t.__scopeMenu),s=Se(H,t.__scopeMenu);return l.jsx(be.Provider,{scope:t.__scopeMenu,children:l.jsx(J,{present:n||a.open,children:l.jsx(be.Slot,{scope:t.__scopeMenu,children:s.modal?l.jsx(ms,{...r,ref:e}):l.jsx(vs,{...r,ref:e})})})})}),ms=c.forwardRef((t,e)=>{const o=ie(H,t.__scopeMenu),n=c.useRef(null),r=U(e,n);return c.useEffect(()=>{const a=n.current;if(a)return jo(a)},[]),l.jsx(jt,{...t,ref:r,trapFocus:o.open,disableOutsidePointerEvents:o.open,disableOutsideScroll:!0,onFocusOutside:A(t.onFocusOutside,a=>a.preventDefault(),{checkForDefaultPrevented:!1}),onDismiss:()=>o.onOpenChange(!1)})}),vs=c.forwardRef((t,e)=>{const o=ie(H,t.__scopeMenu);return l.jsx(jt,{...t,ref:e,trapFocus:!1,disableOutsidePointerEvents:!1,disableOutsideScroll:!1,onDismiss:()=>o.onOpenChange(!1)})}),gs=Oe("MenuContent.ScrollLock"),jt=c.forwardRef((t,e)=>{const{__scopeMenu:o,loop:n=!1,trapFocus:r,onOpenAutoFocus:a,onCloseAutoFocus:s,disableOutsidePointerEvents:i,onEntryFocus:u,onEscapeKeyDown:f,onPointerDownOutside:p,onFocusOutside:d,onInteractOutside:m,onDismiss:_,disableOutsideScroll:w,...v}=t,g=ie(H,o),y=Se(H,o),h=He(o),b=nn(o),x=is(o),[C,E]=c.useState(null),T=c.useRef(null),S=U(e,T,g.onContentChange),I=c.useRef(0),M=c.useRef(""),k=c.useRef(0),O=c.useRef(null),L=c.useRef("right"),G=c.useRef(0),F=w?St:c.Fragment,V=w?{as:gs,allowPinchZoom:!0}:void 0,ve=j=>{const le=M.current+j,ee=x().filter(K=>!K.disabled),ge=document.activeElement,et=ee.find(K=>K.ref.current===ge)?.textValue,tt=ee.map(K=>K.textValue),Bt=Ms(tt,le,et),he=ee.find(K=>K.textValue===Bt)?.ref.current;(function K(zt){M.current=zt,window.clearTimeout(I.current),zt!==""&&(I.current=window.setTimeout(()=>K(""),1e3))})(le),he&&setTimeout(()=>he.focus())};c.useEffect(()=>()=>window.clearTimeout(I.current),[]),Co();const X=c.useCallback(j=>L.current===O.current?.side&&Rs(j,O.current?.area),[]);return l.jsx(ps,{scope:o,searchRef:M,onItemEnter:c.useCallback(j=>{X(j)&&j.preventDefault()},[X]),onItemLeave:c.useCallback(j=>{X(j)||(T.current?.focus(),E(null))},[X]),onTriggerLeave:c.useCallback(j=>{X(j)&&j.preventDefault()},[X]),pointerGraceTimerRef:k,onPointerGraceIntentChange:c.useCallback(j=>{O.current=j},[]),children:l.jsx(F,{...V,children:l.jsx(Tt,{asChild:!0,trapped:r,onMountAutoFocus:A(a,j=>{j.preventDefault(),T.current?.focus({preventScroll:!0})}),onUnmountAutoFocus:s,children:l.jsx(mo,{asChild:!0,disableOutsidePointerEvents:i,onEscapeKeyDown:f,onPointerDownOutside:p,onFocusOutside:d,onInteractOutside:m,onDismiss:_,children:l.jsx(ts,{asChild:!0,...b,dir:y.dir,orientation:"vertical",loop:n,currentTabStopId:C,onCurrentTabStopIdChange:E,onEntryFocus:A(u,j=>{y.isUsingKeyboardRef.current||j.preventDefault()}),preventScrollOnEntryFocus:!0,children:l.jsx(cr,{role:"menu","aria-orientation":"vertical","data-state":Tn(g.open),"data-radix-menu-content":"",dir:y.dir,...h,...v,ref:S,style:{outline:"none",...v.style},onKeyDown:A(v.onKeyDown,j=>{const ee=j.target.closest("[data-radix-menu-content]")===j.currentTarget,ge=j.ctrlKey||j.altKey||j.metaKey,et=j.key.length===1;ee&&(j.key==="Tab"&&j.preventDefault(),!ge&&et&&ve(j.key));const tt=T.current;if(j.target!==tt||!rs.includes(j.key))return;j.preventDefault();const he=x().filter(K=>!K.disabled).map(K=>K.ref.current);tn.includes(j.key)&&he.reverse(),Es(he)}),onBlur:A(t.onBlur,j=>{j.currentTarget.contains(j.target)||(window.clearTimeout(I.current),M.current="")}),onPointerMove:A(t.onPointerMove,xe(j=>{const le=j.target,ee=G.current!==j.clientX;if(j.currentTarget.contains(le)&&ee){const ge=j.clientX>G.current?"right":"left";L.current=ge,G.current=j.clientX}}))})})})})})})});ln.displayName=H;var hs="MenuGroup",At=c.forwardRef((t,e)=>{const{__scopeMenu:o,...n}=t;return l.jsx($.div,{role:"group",...n,ref:e})});At.displayName=hs;var ys="MenuLabel",cn=c.forwardRef((t,e)=>{const{__scopeMenu:o,...n}=t;return l.jsx($.div,{...n,ref:e})});cn.displayName=ys;var Fe="MenuItem",to="menu.itemSelect",Xe=c.forwardRef((t,e)=>{const{disabled:o=!1,onSelect:n,...r}=t,a=c.useRef(null),s=Se(Fe,t.__scopeMenu),i=kt(Fe,t.__scopeMenu),u=U(e,a),f=c.useRef(!1),p=()=>{const d=a.current;if(!o&&d){const m=new CustomEvent(to,{bubbles:!0,cancelable:!0});d.addEventListener(to,_=>n?.(_),{once:!0}),vr(d,m),m.defaultPrevented?f.current=!1:s.onClose()}};return l.jsx(un,{...r,ref:u,disabled:o,onClick:A(t.onClick,p),onPointerDown:d=>{t.onPointerDown?.(d),f.current=!0},onPointerUp:A(t.onPointerUp,d=>{f.current||d.currentTarget?.click()}),onKeyDown:A(t.onKeyDown,d=>{const m=i.searchRef.current!=="";o||m&&d.key===" "||vt.includes(d.key)&&(d.currentTarget.click(),d.preventDefault())})})});Xe.displayName=Fe;var un=c.forwardRef((t,e)=>{const{__scopeMenu:o,disabled:n=!1,textValue:r,...a}=t,s=kt(Fe,o),i=nn(o),u=c.useRef(null),f=U(e,u),[p,d]=c.useState(!1),[m,_]=c.useState("");return c.useEffect(()=>{const w=u.current;w&&_((w.textContent??"").trim())},[a.children]),l.jsx(be.ItemSlot,{scope:o,disabled:n,textValue:r??m,children:l.jsx(os,{asChild:!0,...i,focusable:!n,children:l.jsx($.div,{role:"menuitem","data-highlighted":p?"":void 0,"aria-disabled":n||void 0,"data-disabled":n?"":void 0,...a,ref:f,onPointerMove:A(t.onPointerMove,xe(w=>{n?s.onItemLeave(w):(s.onItemEnter(w),w.defaultPrevented||w.currentTarget.focus({preventScroll:!0}))})),onPointerLeave:A(t.onPointerLeave,xe(w=>s.onItemLeave(w))),onFocus:A(t.onFocus,()=>d(!0)),onBlur:A(t.onBlur,()=>d(!1))})})})}),bs="MenuCheckboxItem",dn=c.forwardRef((t,e)=>{const{checked:o=!1,onCheckedChange:n,...r}=t;return l.jsx(gn,{scope:t.__scopeMenu,checked:o,children:l.jsx(Xe,{role:"menuitemcheckbox","aria-checked":Be(o)?"mixed":o,...r,ref:e,"data-state":Dt(o),onSelect:A(r.onSelect,()=>n?.(Be(o)?!0:!o),{checkForDefaultPrevented:!1})})})});dn.displayName=bs;var fn="MenuRadioGroup",[xs,_s]=se(fn,{value:void 0,onValueChange:()=>{}}),pn=c.forwardRef((t,e)=>{const{value:o,onValueChange:n,...r}=t,a=pe(n);return l.jsx(xs,{scope:t.__scopeMenu,value:o,onValueChange:a,children:l.jsx(At,{...r,ref:e})})});pn.displayName=fn;var mn="MenuRadioItem",vn=c.forwardRef((t,e)=>{const{value:o,...n}=t,r=_s(mn,t.__scopeMenu),a=o===r.value;return l.jsx(gn,{scope:t.__scopeMenu,checked:a,children:l.jsx(Xe,{role:"menuitemradio","aria-checked":a,...n,ref:e,"data-state":Dt(a),onSelect:A(n.onSelect,()=>r.onValueChange?.(o),{checkForDefaultPrevented:!1})})})});vn.displayName=mn;var Pt="MenuItemIndicator",[gn,ws]=se(Pt,{checked:!1}),hn=c.forwardRef((t,e)=>{const{__scopeMenu:o,forceMount:n,...r}=t,a=ws(Pt,o);return l.jsx(J,{present:n||Be(a.checked)||a.checked===!0,children:l.jsx($.span,{...r,ref:e,"data-state":Dt(a.checked)})})});hn.displayName=Pt;var Cs="MenuSeparator",yn=c.forwardRef((t,e)=>{const{__scopeMenu:o,...n}=t;return l.jsx($.div,{role:"separator","aria-orientation":"horizontal",...n,ref:e})});yn.displayName=Cs;var Ts="MenuArrow",bn=c.forwardRef((t,e)=>{const{__scopeMenu:o,...n}=t,r=He(o);return l.jsx(ur,{...r,...n,ref:e})});bn.displayName=Ts;var Ss="MenuSub",[hu,xn]=se(Ss),ye="MenuSubTrigger",_n=c.forwardRef((t,e)=>{const o=ie(ye,t.__scopeMenu),n=Se(ye,t.__scopeMenu),r=xn(ye,t.__scopeMenu),a=kt(ye,t.__scopeMenu),s=c.useRef(null),{pointerGraceTimerRef:i,onPointerGraceIntentChange:u}=a,f={__scopeMenu:t.__scopeMenu},p=c.useCallback(()=>{s.current&&window.clearTimeout(s.current),s.current=null},[]);return c.useEffect(()=>p,[p]),c.useEffect(()=>{const d=i.current;return()=>{window.clearTimeout(d),u(null)}},[i,u]),l.jsx(It,{asChild:!0,...f,children:l.jsx(un,{id:r.triggerId,"aria-haspopup":"menu","aria-expanded":o.open,"aria-controls":r.contentId,"data-state":Tn(o.open),...t,ref:xt(e,r.onTriggerChange),onClick:d=>{t.onClick?.(d),!(t.disabled||d.defaultPrevented)&&(d.currentTarget.focus(),o.open||o.onOpenChange(!0))},onPointerMove:A(t.onPointerMove,xe(d=>{a.onItemEnter(d),!d.defaultPrevented&&!t.disabled&&!o.open&&!s.current&&(a.onPointerGraceIntentChange(null),s.current=window.setTimeout(()=>{o.onOpenChange(!0),p()},100))})),onPointerLeave:A(t.onPointerLeave,xe(d=>{p();const m=o.content?.getBoundingClientRect();if(m){const _=o.content?.dataset.side,w=_==="right",v=w?-5:5,g=m[w?"left":"right"],y=m[w?"right":"left"];a.onPointerGraceIntentChange({area:[{x:d.clientX+v,y:d.clientY},{x:g,y:m.top},{x:y,y:m.top},{x:y,y:m.bottom},{x:g,y:m.bottom}],side:_}),window.clearTimeout(i.current),i.current=window.setTimeout(()=>a.onPointerGraceIntentChange(null),300)}else{if(a.onTriggerLeave(d),d.defaultPrevented)return;a.onPointerGraceIntentChange(null)}})),onKeyDown:A(t.onKeyDown,d=>{const m=a.searchRef.current!=="";t.disabled||m&&d.key===" "||as[n.dir].includes(d.key)&&(o.onOpenChange(!0),o.content?.focus(),d.preventDefault())})})})});_n.displayName=ye;var wn="MenuSubContent",Cn=c.forwardRef((t,e)=>{const o=an(H,t.__scopeMenu),{forceMount:n=o.forceMount,...r}=t,a=ie(H,t.__scopeMenu),s=Se(H,t.__scopeMenu),i=xn(wn,t.__scopeMenu),u=c.useRef(null),f=U(e,u);return l.jsx(be.Provider,{scope:t.__scopeMenu,children:l.jsx(J,{present:n||a.open,children:l.jsx(be.Slot,{scope:t.__scopeMenu,children:l.jsx(jt,{id:i.contentId,"aria-labelledby":i.triggerId,...r,ref:f,align:"start",side:s.dir==="rtl"?"left":"right",disableOutsidePointerEvents:!1,disableOutsideScroll:!1,trapFocus:!1,onOpenAutoFocus:p=>{s.isUsingKeyboardRef.current&&u.current?.focus(),p.preventDefault()},onCloseAutoFocus:p=>p.preventDefault(),onFocusOutside:A(t.onFocusOutside,p=>{p.target!==i.trigger&&a.onOpenChange(!1)}),onEscapeKeyDown:A(t.onEscapeKeyDown,p=>{s.onClose(),p.preventDefault()}),onKeyDown:A(t.onKeyDown,p=>{const d=p.currentTarget.contains(p.target),m=ss[s.dir].includes(p.key);d&&m&&(a.onOpenChange(!1),i.trigger?.focus(),p.preventDefault())})})})})})});Cn.displayName=wn;function Tn(t){return t?"open":"closed"}function Be(t){return t==="indeterminate"}function Dt(t){return Be(t)?"indeterminate":t?"checked":"unchecked"}function Es(t){const e=document.activeElement;for(const o of t)if(o===e||(o.focus(),document.activeElement!==e))return}function Ns(t,e){return t.map((o,n)=>t[(e+n)%t.length])}function Ms(t,e,o){const r=e.length>1&&Array.from(e).every(f=>f===e[0])?e[0]:e,a=o?t.indexOf(o):-1;let s=Ns(t,Math.max(a,0));r.length===1&&(s=s.filter(f=>f!==o));const u=s.find(f=>f.toLowerCase().startsWith(r.toLowerCase()));return u!==o?u:void 0}function Is(t,e){const{x:o,y:n}=t;let r=!1;for(let a=0,s=e.length-1;a<e.length;s=a++){const i=e[a],u=e[s],f=i.x,p=i.y,d=u.x,m=u.y;p>n!=m>n&&o<(d-f)*(n-p)/(m-p)+f&&(r=!r)}return r}function Rs(t,e){if(!e)return!1;const o={x:t.clientX,y:t.clientY};return Is(o,e)}function xe(t){return e=>e.pointerType==="mouse"?t(e):void 0}var ks=rn,js=It,As=sn,Ps=ln,Ds=At,Os=cn,Ls=Xe,$s=dn,Fs=pn,Bs=vn,zs=hn,Gs=yn,Ks=bn,Us=_n,Ws=Cn,Ye="DropdownMenu",[Vs]=me(Ye,[on]),z=on(),[Hs,Sn]=Vs(Ye),En=t=>{const{__scopeDropdownMenu:e,children:o,dir:n,open:r,defaultOpen:a,onOpenChange:s,modal:i=!0}=t,u=z(e),f=c.useRef(null),[p,d]=Ke({prop:r,defaultProp:a??!1,onChange:s,caller:Ye});return l.jsx(Hs,{scope:e,triggerId:ne(),triggerRef:f,contentId:ne(),open:p,onOpenChange:d,onOpenToggle:c.useCallback(()=>d(m=>!m),[d]),modal:i,children:l.jsx(ks,{...u,open:p,onOpenChange:d,dir:n,modal:i,children:o})})};En.displayName=Ye;var Nn="DropdownMenuTrigger",Mn=c.forwardRef((t,e)=>{const{__scopeDropdownMenu:o,disabled:n=!1,...r}=t,a=Sn(Nn,o),s=z(o);return l.jsx(js,{asChild:!0,...s,children:l.jsx($.button,{type:"button",id:a.triggerId,"aria-haspopup":"menu","aria-expanded":a.open,"aria-controls":a.open?a.contentId:void 0,"data-state":a.open?"open":"closed","data-disabled":n?"":void 0,disabled:n,...r,ref:xt(e,a.triggerRef),onPointerDown:A(t.onPointerDown,i=>{!n&&i.button===0&&i.ctrlKey===!1&&(a.onOpenToggle(),a.open||i.preventDefault())}),onKeyDown:A(t.onKeyDown,i=>{n||(["Enter"," "].includes(i.key)&&a.onOpenToggle(),i.key==="ArrowDown"&&a.onOpenChange(!0),["Enter"," ","ArrowDown"].includes(i.key)&&i.preventDefault())})})})});Mn.displayName=Nn;var Xs="DropdownMenuPortal",In=t=>{const{__scopeDropdownMenu:e,...o}=t,n=z(e);return l.jsx(As,{...n,...o})};In.displayName=Xs;var Rn="DropdownMenuContent",kn=c.forwardRef((t,e)=>{const{__scopeDropdownMenu:o,...n}=t,r=Sn(Rn,o),a=z(o),s=c.useRef(!1);return l.jsx(Ps,{id:r.contentId,"aria-labelledby":r.triggerId,...a,...n,ref:e,onCloseAutoFocus:A(t.onCloseAutoFocus,i=>{s.current||r.triggerRef.current?.focus(),s.current=!1,i.preventDefault()}),onInteractOutside:A(t.onInteractOutside,i=>{const u=i.detail.originalEvent,f=u.button===0&&u.ctrlKey===!0,p=u.button===2||f;(!r.modal||p)&&(s.current=!0)}),style:{...t.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});kn.displayName=Rn;var Ys="DropdownMenuGroup",jn=c.forwardRef((t,e)=>{const{__scopeDropdownMenu:o,...n}=t,r=z(o);return l.jsx(Ds,{...r,...n,ref:e})});jn.displayName=Ys;var qs="DropdownMenuLabel",An=c.forwardRef((t,e)=>{const{__scopeDropdownMenu:o,...n}=t,r=z(o);return l.jsx(Os,{...r,...n,ref:e})});An.displayName=qs;var Qs="DropdownMenuItem",Pn=c.forwardRef((t,e)=>{const{__scopeDropdownMenu:o,...n}=t,r=z(o);return l.jsx(Ls,{...r,...n,ref:e})});Pn.displayName=Qs;var Zs="DropdownMenuCheckboxItem",Js=c.forwardRef((t,e)=>{const{__scopeDropdownMenu:o,...n}=t,r=z(o);return l.jsx($s,{...r,...n,ref:e})});Js.displayName=Zs;var ei="DropdownMenuRadioGroup",ti=c.forwardRef((t,e)=>{const{__scopeDropdownMenu:o,...n}=t,r=z(o);return l.jsx(Fs,{...r,...n,ref:e})});ti.displayName=ei;var oi="DropdownMenuRadioItem",ni=c.forwardRef((t,e)=>{const{__scopeDropdownMenu:o,...n}=t,r=z(o);return l.jsx(Bs,{...r,...n,ref:e})});ni.displayName=oi;var ri="DropdownMenuItemIndicator",ai=c.forwardRef((t,e)=>{const{__scopeDropdownMenu:o,...n}=t,r=z(o);return l.jsx(zs,{...r,...n,ref:e})});ai.displayName=ri;var si="DropdownMenuSeparator",Dn=c.forwardRef((t,e)=>{const{__scopeDropdownMenu:o,...n}=t,r=z(o);return l.jsx(Gs,{...r,...n,ref:e})});Dn.displayName=si;var ii="DropdownMenuArrow",li=c.forwardRef((t,e)=>{const{__scopeDropdownMenu:o,...n}=t,r=z(o);return l.jsx(Ks,{...r,...n,ref:e})});li.displayName=ii;var ci="DropdownMenuSubTrigger",ui=c.forwardRef((t,e)=>{const{__scopeDropdownMenu:o,...n}=t,r=z(o);return l.jsx(Us,{...r,...n,ref:e})});ui.displayName=ci;var di="DropdownMenuSubContent",fi=c.forwardRef((t,e)=>{const{__scopeDropdownMenu:o,...n}=t,r=z(o);return l.jsx(Ws,{...r,...n,ref:e,style:{...t.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});fi.displayName=di;var pi=En,mi=Mn,vi=In,gi=kn,hi=jn,yi=An,bi=Pn,xi=Dn;const _i=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],wi=W("ChevronRight",_i);const Ci=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]],Ti=W("ChevronUp",Ci);const Si=[["path",{d:"m7 15 5 5 5-5",key:"1hf1tw"}],["path",{d:"m7 9 5-5 5 5",key:"sgt6xg"}]],Ei=W("ChevronsUpDown",Si);const Ni=[["path",{d:"m11 17 2 2a1 1 0 1 0 3-3",key:"efffak"}],["path",{d:"m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4",key:"9pr0kb"}],["path",{d:"m21 3 1 11h-2",key:"1tisrp"}],["path",{d:"M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3",key:"1uvwmv"}],["path",{d:"M3 4h8",key:"1ep09j"}]],Mi=W("Handshake",Ni);const Ii=[["path",{d:"m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4",key:"g0fldk"}],["path",{d:"m21 2-9.6 9.6",key:"1j0ho8"}],["circle",{cx:"7.5",cy:"15.5",r:"5.5",key:"yqb3hr"}]],Ri=W("Key",Ii);const ki=[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1",key:"1g98yp"}],["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1",key:"6d4xhi"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1",key:"nxv5o0"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1",key:"1bb6yr"}]],oo=W("LayoutGrid",ki);const ji=[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]],Ai=W("LogOut",ji);const Pi=[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",key:"vv11sd"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]],Di=W("MessageCircleQuestion",Pi);const Oi=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M9 3v18",key:"fh3hqa"}]],Li=W("PanelLeft",Oi);const $i=[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],Fi=W("Settings",$i);const Bi=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"M8 12h.01",key:"czm47f"}],["path",{d:"M12 12h.01",key:"1mp3jc"}],["path",{d:"M16 12h.01",key:"1l6xoz"}]],zi=W("ShieldEllipsis",Bi);const Gi=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]],Ki=W("Shield",Gi);const Ui=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]],no=W("Users",Ui);var Wi=Symbol.for("react.lazy"),ze=tr[" use ".trim().toString()];function Vi(t){return typeof t=="object"&&t!==null&&"then"in t}function On(t){return t!=null&&typeof t=="object"&&"$$typeof"in t&&t.$$typeof===Wi&&"_payload"in t&&Vi(t._payload)}function Ln(t){const e=Hi(t),o=c.forwardRef((n,r)=>{let{children:a,...s}=n;On(a)&&typeof ze=="function"&&(a=ze(a._payload));const i=c.Children.toArray(a),u=i.find(Yi);if(u){const f=u.props.children,p=i.map(d=>d===u?c.Children.count(f)>1?c.Children.only(null):c.isValidElement(f)?f.props.children:null:d);return l.jsx(e,{...s,ref:r,children:c.isValidElement(f)?c.cloneElement(f,void 0,p):null})}return l.jsx(e,{...s,ref:r,children:a})});return o.displayName=`${t}.Slot`,o}var Ee=Ln("Slot");function Hi(t){const e=c.forwardRef((o,n)=>{let{children:r,...a}=o;if(On(r)&&typeof ze=="function"&&(r=ze(r._payload)),c.isValidElement(r)){const s=Qi(r),i=qi(a,r.props);return r.type!==c.Fragment&&(i.ref=n?xt(n,s):s),c.cloneElement(r,i)}return c.Children.count(r)>1?c.Children.only(null):null});return e.displayName=`${t}.SlotClone`,e}var Xi=Symbol("radix.slottable");function Yi(t){return c.isValidElement(t)&&typeof t.type=="function"&&"__radixId"in t.type&&t.type.__radixId===Xi}function qi(t,e){const o={...e};for(const n in e){const r=t[n],a=e[n];/^on[A-Z]/.test(n)?r&&a?o[n]=(...i)=>{const u=a(...i);return r(...i),u}:r&&(o[n]=r):n==="style"?o[n]={...r,...a}:n==="className"&&(o[n]=[r,a].filter(Boolean).join(" "))}return{...t,...o}}function Qi(t){let e=Object.getOwnPropertyDescriptor(t.props,"ref")?.get,o=e&&"isReactWarning"in e&&e.isReactWarning;return o?t.ref:(e=Object.getOwnPropertyDescriptor(t,"ref")?.get,o=e&&"isReactWarning"in e&&e.isReactWarning,o?t.props.ref:t.props.ref||t.ref)}const Zi=fo("inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",{variants:{variant:{default:"border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",secondary:"border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",destructive:"border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",outline:"text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"}},defaultVariants:{variant:"default"}});function Ji(t){const e=N.c(12);let o,n,r,a;e[0]!==t?({className:o,variant:a,asChild:r,...n}=t,e[0]=t,e[1]=o,e[2]=n,e[3]=r,e[4]=a):(o=e[1],n=e[2],r=e[3],a=e[4]);const i=(r===void 0?!1:r)?Ee:"span";let u;e[5]!==o||e[6]!==a?(u=R(Zi({variant:a}),o),e[5]=o,e[6]=a,e[7]=u):u=e[7];let f;return e[8]!==i||e[9]!==n||e[10]!==u?(f=l.jsx(i,{"data-slot":"badge",className:u,...n}),e[8]=i,e[9]=n,e[10]=u,e[11]=f):f=e[11],f}const el=768,De=typeof window>"u"?void 0:window.matchMedia(`(max-width: ${el-1}px)`);function tl(t){return De?(De.addEventListener("change",t),()=>{De.removeEventListener("change",t)}):()=>{}}function ol(){return De?.matches??!1}function nl(){return!1}function $n(){return c.useSyncExternalStore(tl,ol,nl)}var rl=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"],Ot=rl.reduce((t,e)=>{const o=Ln(`Primitive.${e}`),n=c.forwardRef((r,a)=>{const{asChild:s,...i}=r,u=s?o:e;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),l.jsx(u,{...i,ref:a})});return n.displayName=`Primitive.${e}`,{...t,[e]:n}},{});function al(t){const e=N.c(4);let o;e[0]!==t?({...o}=t,e[0]=t,e[1]=o):o=e[1];let n;return e[2]!==o?(n=l.jsx(Aa,{"data-slot":"sheet",...o}),e[2]=o,e[3]=n):n=e[3],n}function sl(t){const e=N.c(4);let o;e[0]!==t?({...o}=t,e[0]=t,e[1]=o):o=e[1];let n;return e[2]!==o?(n=l.jsx(Pa,{"data-slot":"sheet-portal",...o}),e[2]=o,e[3]=n):n=e[3],n}function il(t){const e=N.c(8);let o,n;e[0]!==t?({className:o,...n}=t,e[0]=t,e[1]=o,e[2]=n):(o=e[1],n=e[2]);let r;e[3]!==o?(r=R("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80",o),e[3]=o,e[4]=r):r=e[4];let a;return e[5]!==n||e[6]!==r?(a=l.jsx(Da,{"data-slot":"sheet-overlay",className:r,...n}),e[5]=n,e[6]=r,e[7]=a):a=e[7],a}function ll(t){const e=N.c(17);let o,n,r,a;e[0]!==t?({className:n,children:o,side:a,...r}=t,e[0]=t,e[1]=o,e[2]=n,e[3]=r,e[4]=a):(o=e[1],n=e[2],r=e[3],a=e[4]);const s=a===void 0?"right":a;let i;e[5]===Symbol.for("react.memo_cache_sentinel")?(i=l.jsx(il,{}),e[5]=i):i=e[5];const u=s==="right"&&"data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",f=s==="left"&&"data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",p=s==="top"&&"data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",d=s==="bottom"&&"data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t";let m;e[6]!==n||e[7]!==u||e[8]!==f||e[9]!==p||e[10]!==d?(m=R("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",u,f,p,d,n),e[6]=n,e[7]=u,e[8]=f,e[9]=p,e[10]=d,e[11]=m):m=e[11];let _;e[12]===Symbol.for("react.memo_cache_sentinel")?(_=l.jsxs(Fa,{className:"ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none",children:[l.jsx(gr,{className:"size-4"}),l.jsx("span",{className:"sr-only",children:"Close"})]}),e[12]=_):_=e[12];let w;return e[13]!==o||e[14]!==r||e[15]!==m?(w=l.jsxs(sl,{children:[i,l.jsxs(Oa,{"data-slot":"sheet-content",className:m,...r,children:[o,_]})]}),e[13]=o,e[14]=r,e[15]=m,e[16]=w):w=e[16],w}function cl(t){const e=N.c(8);let o,n;e[0]!==t?({className:o,...n}=t,e[0]=t,e[1]=o,e[2]=n):(o=e[1],n=e[2]);let r;e[3]!==o?(r=R("flex flex-col gap-1.5 p-4",o),e[3]=o,e[4]=r):r=e[4];let a;return e[5]!==n||e[6]!==r?(a=l.jsx("div",{"data-slot":"sheet-header",className:r,...n}),e[5]=n,e[6]=r,e[7]=a):a=e[7],a}function ul(t){const e=N.c(8);let o,n;e[0]!==t?({className:o,...n}=t,e[0]=t,e[1]=o,e[2]=n):(o=e[1],n=e[2]);let r;e[3]!==o?(r=R("text-foreground font-semibold",o),e[3]=o,e[4]=r):r=e[4];let a;return e[5]!==n||e[6]!==r?(a=l.jsx(La,{"data-slot":"sheet-title",className:r,...n}),e[5]=n,e[6]=r,e[7]=a):a=e[7],a}function dl(t){const e=N.c(8);let o,n;e[0]!==t?({className:o,...n}=t,e[0]=t,e[1]=o,e[2]=n):(o=e[1],n=e[2]);let r;e[3]!==o?(r=R("text-muted-foreground text-sm",o),e[3]=o,e[4]=r):r=e[4];let a;return e[5]!==n||e[6]!==r?(a=l.jsx($a,{"data-slot":"sheet-description",className:r,...n}),e[5]=n,e[6]=r,e[7]=a):a=e[7],a}const fl="sidebar_state",pl=3600*24*7,ml="16rem",vl="18rem",gl="3rem",hl="b",Fn=c.createContext(null);function qe(){const t=c.useContext(Fn);if(!t)throw new Error("useSidebar must be used within a SidebarProvider.");return t}function yl(t){const e=N.c(36);let o,n,r,a,s,i,u;e[0]!==t?({defaultOpen:u,open:r,onOpenChange:s,className:n,style:i,children:o,...a}=t,e[0]=t,e[1]=o,e[2]=n,e[3]=r,e[4]=a,e[5]=s,e[6]=i,e[7]=u):(o=e[1],n=e[2],r=e[3],a=e[4],s=e[5],i=e[6],u=e[7]);const f=u===void 0?!0:u,p=$n(),[d,m]=c.useState(!1),[_,w]=c.useState(f),v=r??_;let g;e[8]!==v||e[9]!==s?(g=G=>{const F=typeof G=="function"?G(v):G;s?s(F):w(F),document.cookie=`${fl}=${F}; path=/; max-age=${pl}`},e[8]=v,e[9]=s,e[10]=g):g=e[10];const y=g;let h;e[11]!==p||e[12]!==y?(h=()=>p?m(xl):y(bl),e[11]=p,e[12]=y,e[13]=h):h=e[13];const b=h;let x,C;e[14]!==b?(x=()=>{const G=F=>{F.key===hl&&(F.metaKey||F.ctrlKey)&&(F.preventDefault(),b())};return window.addEventListener("keydown",G),()=>window.removeEventListener("keydown",G)},C=[b],e[14]=b,e[15]=x,e[16]=C):(x=e[15],C=e[16]),c.useEffect(x,C);const E=v?"expanded":"collapsed";let T;e[17]!==p||e[18]!==v||e[19]!==d||e[20]!==y||e[21]!==E||e[22]!==b?(T={state:E,open:v,setOpen:y,isMobile:p,openMobile:d,setOpenMobile:m,toggleSidebar:b},e[17]=p,e[18]=v,e[19]=d,e[20]=y,e[21]=E,e[22]=b,e[23]=T):T=e[23];const S=T;let I;e[24]!==i?(I={"--sidebar-width":ml,"--sidebar-width-icon":gl,...i},e[24]=i,e[25]=I):I=e[25];const M=I;let k;e[26]!==n?(k=R("group/sidebar-wrapper has-data-[variant=inset]:bg-slate-950 flex min-h-svh w-full",n),e[26]=n,e[27]=k):k=e[27];let O;e[28]!==o||e[29]!==a||e[30]!==M||e[31]!==k?(O=l.jsx(dr,{delayDuration:0,children:l.jsx("div",{"data-slot":"sidebar-wrapper",style:M,className:k,...a,children:o})}),e[28]=o,e[29]=a,e[30]=M,e[31]=k,e[32]=O):O=e[32];let L;return e[33]!==S||e[34]!==O?(L=l.jsx(Fn.Provider,{value:S,children:O}),e[33]=S,e[34]=O,e[35]=L):L=e[35],L}function bl(t){return!t}function xl(t){return!t}function _l(t){const e=N.c(46);let o,n,r,a,s,i;e[0]!==t?({side:a,variant:s,collapsible:i,className:n,children:o,...r}=t,e[0]=t,e[1]=o,e[2]=n,e[3]=r,e[4]=a,e[5]=s,e[6]=i):(o=e[1],n=e[2],r=e[3],a=e[4],s=e[5],i=e[6]);const u=a===void 0?"left":a,f=s===void 0?"sidebar":s,p=i===void 0?"offcanvas":i,{isMobile:d,state:m,openMobile:_,setOpenMobile:w}=qe();if(p==="none"){let I;e[7]!==n?(I=R("bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col",n),e[7]=n,e[8]=I):I=e[8];let M;return e[9]!==o||e[10]!==r||e[11]!==I?(M=l.jsx("div",{"data-slot":"sidebar",className:I,...r,children:o}),e[9]=o,e[10]=r,e[11]=I,e[12]=M):M=e[12],M}if(d){let I;e[13]===Symbol.for("react.memo_cache_sentinel")?(I=l.jsxs(cl,{className:"sr-only",children:[l.jsx(ul,{children:"Sidebar"}),l.jsx(dl,{children:"Displays the mobile sidebar."})]}),e[13]=I):I=e[13];let M;e[14]===Symbol.for("react.memo_cache_sentinel")?(M={"--sidebar-width":vl},e[14]=M):M=e[14];let k;e[15]!==o?(k=l.jsx("div",{className:"flex h-full w-full flex-col",children:o}),e[15]=o,e[16]=k):k=e[16];let O;e[17]!==u||e[18]!==k?(O=l.jsx(ll,{"data-sidebar":"sidebar","data-slot":"sidebar","data-mobile":"true",className:"bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden",style:M,side:u,children:k}),e[17]=u,e[18]=k,e[19]=O):O=e[19];let L;return e[20]!==_||e[21]!==r||e[22]!==w||e[23]!==O?(L=l.jsxs(al,{open:_,onOpenChange:w,...r,children:[I,O]}),e[20]=_,e[21]=r,e[22]=w,e[23]=O,e[24]=L):L=e[24],L}const v=m==="collapsed"?p:"",g=f==="floating"||f==="inset"?"group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]":"group-data-[collapsible=icon]:w-(--sidebar-width-icon)";let y;e[25]!==g?(y=R("relative h-svh w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear","group-data-[collapsible=offcanvas]:w-0","group-data-[side=right]:rotate-180",g),e[25]=g,e[26]=y):y=e[26];let h;e[27]!==y?(h=l.jsx("div",{className:y}),e[27]=y,e[28]=h):h=e[28];const b=u==="left"?"left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]":"right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",x=f==="floating"||f==="inset"?"p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]":"group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l";let C;e[29]!==n||e[30]!==b||e[31]!==x?(C=R("fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",b,x,n),e[29]=n,e[30]=b,e[31]=x,e[32]=C):C=e[32];let E;e[33]!==o?(E=l.jsx("div",{"data-sidebar":"sidebar",className:"bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm",children:o}),e[33]=o,e[34]=E):E=e[34];let T;e[35]!==r||e[36]!==C||e[37]!==E?(T=l.jsx("div",{className:C,...r,children:E}),e[35]=r,e[36]=C,e[37]=E,e[38]=T):T=e[38];let S;return e[39]!==u||e[40]!==m||e[41]!==T||e[42]!==v||e[43]!==h||e[44]!==f?(S=l.jsxs("div",{className:"group peer text-sidebar-foreground hidden md:block","data-state":m,"data-collapsible":v,"data-variant":f,"data-side":u,"data-slot":"sidebar",children:[h,T]}),e[39]=u,e[40]=m,e[41]=T,e[42]=v,e[43]=h,e[44]=f,e[45]=S):S=e[45],S}function wl(t){const e=N.c(15);let o,n,r;e[0]!==t?({className:o,onClick:n,...r}=t,e[0]=t,e[1]=o,e[2]=n,e[3]=r):(o=e[1],n=e[2],r=e[3]);const{toggleSidebar:a}=qe();let s;e[4]!==o?(s=R("h-7 w-7",o),e[4]=o,e[5]=s):s=e[5];let i;e[6]!==n||e[7]!==a?(i=d=>{n?.(d),a()},e[6]=n,e[7]=a,e[8]=i):i=e[8];let u,f;e[9]===Symbol.for("react.memo_cache_sentinel")?(u=l.jsx(Li,{}),f=l.jsx("span",{className:"sr-only",children:"Toggle Sidebar"}),e[9]=u,e[10]=f):(u=e[9],f=e[10]);let p;return e[11]!==r||e[12]!==s||e[13]!==i?(p=l.jsxs(rr,{"data-sidebar":"trigger","data-slot":"sidebar-trigger",variant:"ghost",size:"icon",className:s,onClick:i,...r,children:[u,f]}),e[11]=r,e[12]=s,e[13]=i,e[14]=p):p=e[14],p}function Cl(t){const e=N.c(8);let o,n;e[0]!==t?({className:o,...n}=t,e[0]=t,e[1]=o,e[2]=n):(o=e[1],n=e[2]);let r;e[3]!==o?(r=R("bg-background relative flex max-w-full min-h-svh flex-1 flex-col","peer-data-[variant=inset]:min-h-[calc(100svh-(--spacing(4)))] md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-0",o),e[3]=o,e[4]=r):r=e[4];let a;return e[5]!==n||e[6]!==r?(a=l.jsx("main",{"data-slot":"sidebar-inset",className:r,...n}),e[5]=n,e[6]=r,e[7]=a):a=e[7],a}function Tl(t){const e=N.c(8);let o,n;e[0]!==t?({className:o,...n}=t,e[0]=t,e[1]=o,e[2]=n):(o=e[1],n=e[2]);let r;e[3]!==o?(r=R("flex flex-col gap-2 p-2",o),e[3]=o,e[4]=r):r=e[4];let a;return e[5]!==n||e[6]!==r?(a=l.jsx("div",{"data-slot":"sidebar-header","data-sidebar":"header",className:r,...n}),e[5]=n,e[6]=r,e[7]=a):a=e[7],a}function Sl(t){const e=N.c(8);let o,n;e[0]!==t?({className:o,...n}=t,e[0]=t,e[1]=o,e[2]=n):(o=e[1],n=e[2]);let r;e[3]!==o?(r=R("flex flex-col gap-2 p-2",o),e[3]=o,e[4]=r):r=e[4];let a;return e[5]!==n||e[6]!==r?(a=l.jsx("div",{"data-slot":"sidebar-footer","data-sidebar":"footer",className:r,...n}),e[5]=n,e[6]=r,e[7]=a):a=e[7],a}function El(t){const e=N.c(8);let o,n;e[0]!==t?({className:o,...n}=t,e[0]=t,e[1]=o,e[2]=n):(o=e[1],n=e[2]);let r;e[3]!==o?(r=R("flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",o),e[3]=o,e[4]=r):r=e[4];let a;return e[5]!==n||e[6]!==r?(a=l.jsx("div",{"data-slot":"sidebar-content","data-sidebar":"content",className:r,...n}),e[5]=n,e[6]=r,e[7]=a):a=e[7],a}function Nl(t){const e=N.c(8);let o,n;e[0]!==t?({className:o,...n}=t,e[0]=t,e[1]=o,e[2]=n):(o=e[1],n=e[2]);let r;e[3]!==o?(r=R("relative flex w-full min-w-0 flex-col p-2",o),e[3]=o,e[4]=r):r=e[4];let a;return e[5]!==n||e[6]!==r?(a=l.jsx("div",{"data-slot":"sidebar-group","data-sidebar":"group",className:r,...n}),e[5]=n,e[6]=r,e[7]=a):a=e[7],a}function Ml(t){const e=N.c(10);let o,n,r;e[0]!==t?({className:o,asChild:r,...n}=t,e[0]=t,e[1]=o,e[2]=n,e[3]=r):(o=e[1],n=e[2],r=e[3]);const s=(r===void 0?!1:r)?Ee:"div";let i;e[4]!==o?(i=R("text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0","group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:select-none group-data-[collapsible=icon]:pointer-events-none",o),e[4]=o,e[5]=i):i=e[5];let u;return e[6]!==s||e[7]!==n||e[8]!==i?(u=l.jsx(s,{"data-slot":"sidebar-group-label","data-sidebar":"group-label",className:i,...n}),e[6]=s,e[7]=n,e[8]=i,e[9]=u):u=e[9],u}function Ge(t){const e=N.c(8);let o,n;e[0]!==t?({className:o,...n}=t,e[0]=t,e[1]=o,e[2]=n):(o=e[1],n=e[2]);let r;e[3]!==o?(r=R("flex w-full min-w-0 flex-col gap-1",o),e[3]=o,e[4]=r):r=e[4];let a;return e[5]!==n||e[6]!==r?(a=l.jsx("ul",{"data-slot":"sidebar-menu","data-sidebar":"menu",className:r,...n}),e[5]=n,e[6]=r,e[7]=a):a=e[7],a}function Lt(t){const e=N.c(8);let o,n;e[0]!==t?({className:o,...n}=t,e[0]=t,e[1]=o,e[2]=n):(o=e[1],n=e[2]);let r;e[3]!==o?(r=R("group/menu-item relative",o),e[3]=o,e[4]=r):r=e[4];let a;return e[5]!==n||e[6]!==r?(a=l.jsx("li",{"data-slot":"sidebar-menu-item","data-sidebar":"menu-item",className:r,...n}),e[5]=n,e[6]=r,e[7]=a):a=e[7],a}const Il=fo("peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",{variants:{variant:{default:"hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",outline:"bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"h-8 text-sm",sm:"h-7 text-xs",lg:"h-12 text-sm group-data-[collapsible=icon]:p-0!"}},defaultVariants:{variant:"default",size:"default"}});function $t(t){const e=N.c(28);let o,n,r,a,s,i,u;e[0]!==t?({asChild:r,isActive:a,variant:s,size:i,tooltip:u,className:o,...n}=t,e[0]=t,e[1]=o,e[2]=n,e[3]=r,e[4]=a,e[5]=s,e[6]=i,e[7]=u):(o=e[1],n=e[2],r=e[3],a=e[4],s=e[5],i=e[6],u=e[7]);const f=r===void 0?!1:r,p=a===void 0?!1:a,d=s===void 0?"default":s,m=i===void 0?"default":i,_=f?Ee:"button",{isMobile:w,state:v}=qe();let g;e[8]!==o||e[9]!==m||e[10]!==d?(g=R(Il({variant:d,size:m}),o),e[8]=o,e[9]=m,e[10]=d,e[11]=g):g=e[11];let y;e[12]!==_||e[13]!==p||e[14]!==n||e[15]!==m||e[16]!==g?(y=l.jsx(_,{"data-slot":"sidebar-menu-button","data-sidebar":"menu-button","data-size":m,"data-active":p,className:g,...n}),e[12]=_,e[13]=p,e[14]=n,e[15]=m,e[16]=g,e[17]=y):y=e[17];const h=y;if(!u)return h;if(typeof u=="string"){let T;e[18]!==u?(T={children:u},e[18]=u,e[19]=T):T=e[19],u=T}let b;e[20]!==h?(b=l.jsx(pr,{asChild:!0,children:h}),e[20]=h,e[21]=b):b=e[21];const x=v!=="collapsed"||w;let C;e[22]!==x||e[23]!==u?(C=l.jsx(fr,{side:"right",align:"center",hidden:x,...u}),e[22]=x,e[23]=u,e[24]=C):C=e[24];let E;return e[25]!==b||e[26]!==C?(E=l.jsxs(mr,{children:[b,C]}),e[25]=b,e[26]=C,e[27]=E):E=e[27],E}function Rl(t){const e=N.c(8);let o,n;e[0]!==t?({className:o,...n}=t,e[0]=t,e[1]=o,e[2]=n):(o=e[1],n=e[2]);let r;e[3]!==o?(r=R("border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5","group-data-[collapsible=icon]:hidden",o),e[3]=o,e[4]=r):r=e[4];let a;return e[5]!==n||e[6]!==r?(a=l.jsx("ul",{"data-slot":"sidebar-menu-sub","data-sidebar":"menu-sub",className:r,...n}),e[5]=n,e[6]=r,e[7]=a):a=e[7],a}function kl(t){const e=N.c(8);let o,n;e[0]!==t?({className:o,...n}=t,e[0]=t,e[1]=o,e[2]=n):(o=e[1],n=e[2]);let r;e[3]!==o?(r=R("group/menu-sub-item relative",o),e[3]=o,e[4]=r):r=e[4];let a;return e[5]!==n||e[6]!==r?(a=l.jsx("li",{"data-slot":"sidebar-menu-sub-item","data-sidebar":"menu-sub-item",className:r,...n}),e[5]=n,e[6]=r,e[7]=a):a=e[7],a}function jl(t){const e=N.c(16);let o,n,r,a,s;e[0]!==t?({asChild:r,size:a,isActive:s,className:o,...n}=t,e[0]=t,e[1]=o,e[2]=n,e[3]=r,e[4]=a,e[5]=s):(o=e[1],n=e[2],r=e[3],a=e[4],s=e[5]);const i=r===void 0?!1:r,u=a===void 0?"md":a,f=s===void 0?!1:s,p=i?Ee:"a",d=u==="sm"&&"text-xs",m=u==="md"&&"text-sm";let _;e[6]!==o||e[7]!==d||e[8]!==m?(_=R("text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-hidden focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0","data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",d,m,"group-data-[collapsible=icon]:hidden",o),e[6]=o,e[7]=d,e[8]=m,e[9]=_):_=e[9];let w;return e[10]!==p||e[11]!==f||e[12]!==n||e[13]!==u||e[14]!==_?(w=l.jsx(p,{"data-slot":"sidebar-menu-sub-button","data-sidebar":"menu-sub-button","data-size":u,"data-active":f,className:_,...n}),e[10]=p,e[11]=f,e[12]=n,e[13]=u,e[14]=_,e[15]=w):w=e[15],w}function Al(t){const e=N.c(10);let o,n,r;if(e[0]!==t?({variant:r,children:o,...n}=t,e[0]=t,e[1]=o,e[2]=n,e[3]=r):(o=e[1],n=e[2],r=e[3]),(r===void 0?"header":r)==="sidebar"){let i;return e[4]!==o||e[5]!==n?(i=l.jsx(Cl,{...n,children:o}),e[4]=o,e[5]=n,e[6]=i):i=e[6],i}let s;return e[7]!==o||e[8]!==n?(s=l.jsx("main",{className:"mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4 rounded-xl bg-slate-950!",...n,children:o}),e[7]=o,e[8]=n,e[9]=s):s=e[9],s}function Pl(t){const e=N.c(5),{children:o,variant:n}=t,r=n===void 0?"header":n,a=we().props.sidebarOpen;if(r==="header"){let i;return e[0]!==o?(i=l.jsx("div",{className:"flex min-h-screen w-full flex-col",children:o}),e[0]=o,e[1]=i):i=e[1],i}let s;return e[2]!==o||e[3]!==a?(s=l.jsx(yl,{defaultOpen:a,children:o}),e[2]=o,e[3]=a,e[4]=s):s=e[4],s}function ro(t){const e=N.c(4);let o;e[0]!==t?({...o}=t,e[0]=t,e[1]=o):o=e[1];let n;return e[2]!==o?(n=l.jsx(Rr,{"data-slot":"collapsible",...o}),e[2]=o,e[3]=n):n=e[3],n}function ao(t){const e=N.c(4);let o;e[0]!==t?({...o}=t,e[0]=t,e[1]=o):o=e[1];let n;return e[2]!==o?(n=l.jsx(bo,{"data-slot":"collapsible-trigger",...o}),e[2]=o,e[3]=n):n=e[3],n}function so(t){const e=N.c(4);let o;e[0]!==t?({...o}=t,e[0]=t,e[1]=o):o=e[1];let n;return e[2]!==o?(n=l.jsx(xo,{"data-slot":"collapsible-content",...o}),e[2]=o,e[3]=n):n=e[3],n}function Dl(t){const e=N.c(20),{items:o,groupTitle:n,newOrdersCount:r}=t,{url:a}=we();let s;e[0]===Symbol.for("react.memo_cache_sentinel")?(s={},e[0]=s):s=e[0];const[i,u]=c.useState(s),[f,p]=c.useState(n==="CMS");let d;e[1]!==a?(d=x=>x==="/cpanel"?a===x:x.includes("/settings/")?a.startsWith("/cpanel/settings/")||a.startsWith(x):a.startsWith(x)||a===x,e[1]=a,e[2]=d):d=e[2];const m=d;let _;e[3]===Symbol.for("react.memo_cache_sentinel")?(_=x=>{u(C=>({...C,[x]:!C[x]}))},e[3]=_):_=e[3];const w=_;let v;e[4]!==m||e[5]!==r||e[6]!==i?(v=(x,C)=>{const E=C===void 0?0:C,T=x.items&&x.items.length>0,S=m(x.href.toString())||x.isActive,I=i[x.href.toString()]??S;return l.jsx(ro,{open:I,onOpenChange:()=>w(x.href.toString()),className:R("transition-colors duration-200",S&&"",E>0&&"border-border/20 ml-4 border-l-2"),children:l.jsxs(Lt,{children:[l.jsx(ao,{asChild:!0,children:l.jsx($t,{asChild:!0,className:R("w-full",S?"bg-primary dark:bg-accent-foreground font-semibold dark:text-black!":"text-foreground hover:bg-white/10!"),children:l.jsxs("div",{className:"flex w-full items-center justify-between",children:[l.jsxs(te,{href:x.href,className:R("flex flex-1 items-center gap-2 text-sm","transition-colors duration-200",S?"text-slate-800 font-bold":"text-accent/70 dark:text-white/70",E>0&&"text-xs"),children:[x.icon&&l.jsx(x.icon,{className:"h-4 w-4 shrink-0"}),l.jsx("span",{className:"truncate",children:x.title})]}),r?x.title==="Daftar Pesanan"&&r>0&&l.jsx(Ji,{className:"animate-pulse h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500 hover:bg-red-600",children:r}):null,T&&l.jsx(Gt,{className:R("h-4 w-4 transition-transform duration-200",I?"rotate-180":"")})]})})}),T&&l.jsx(so,{children:l.jsx(Rl,{children:x.items?.map(M=>l.jsx(kl,{className:R("border-border/20 ml-2 border-l-2",m(M.href.toString())&&"border-primary/50"),children:l.jsx(jl,{asChild:!0,children:l.jsxs(te,{href:M.href,className:R("flex items-center gap-2 text-sm",m(M.href.toString())?"text-foreground font-medium":"text-muted-foreground hover:text-foreground","transition-colors duration-200"),children:[M.icon&&l.jsx(M.icon,{className:"h-3.5 w-3.5 shrink-0"}),l.jsx("span",{className:"truncate",children:M.title})]})})},M.href.toString()))})})]})},x.href.toString())},e[4]=m,e[5]=r,e[6]=i,e[7]=v):v=e[7];const g=v;let y;e[8]!==n||e[9]!==f||e[10]!==o||e[11]!==g?(y=n&&l.jsxs(ro,{defaultOpen:n==="CMS",onOpenChange:p,className:"space-y-0",children:[l.jsx(ao,{asChild:!0,children:l.jsxs(Ml,{className:R("text-xxs! text-muted-foreground hover:bg-accent/50 flex cursor-pointer items-center justify-between rounded-md px-2 py-1.5 font-semibold transition-colors",f&&"mb-1"),children:[l.jsx("span",{children:n}),f?l.jsx(Ti,{className:"text-muted-foreground h-3.5 w-3.5"}):l.jsx(Gt,{className:"text-muted-foreground h-3.5 w-3.5"})]})}),l.jsx(so,{children:l.jsx(Ge,{className:"space-y-0",children:o.map(x=>g(x))})})]}),e[8]=n,e[9]=f,e[10]=o,e[11]=g,e[12]=y):y=e[12];let h;e[13]!==n||e[14]!==o||e[15]!==g?(h=!n&&l.jsx(Ge,{className:"space-y-0",children:o.map(x=>g(x))}),e[13]=n,e[14]=o,e[15]=g,e[16]=h):h=e[16];let b;return e[17]!==y||e[18]!==h?(b=l.jsxs(Nl,{className:"space-y-0",children:[y,h]}),e[17]=y,e[18]=h,e[19]=b):b=e[19],b}function Ol(t){const e=N.c(4);let o;e[0]!==t?({...o}=t,e[0]=t,e[1]=o):o=e[1];let n;return e[2]!==o?(n=l.jsx(pi,{"data-slot":"dropdown-menu",...o}),e[2]=o,e[3]=n):n=e[3],n}function Ll(t){const e=N.c(4);let o;e[0]!==t?({...o}=t,e[0]=t,e[1]=o):o=e[1];let n;return e[2]!==o?(n=l.jsx(mi,{"data-slot":"dropdown-menu-trigger",...o}),e[2]=o,e[3]=n):n=e[3],n}function $l(t){const e=N.c(10);let o,n,r;e[0]!==t?({className:o,sideOffset:r,...n}=t,e[0]=t,e[1]=o,e[2]=n,e[3]=r):(o=e[1],n=e[2],r=e[3]);const a=r===void 0?4:r;let s;e[4]!==o?(s=R("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md",o),e[4]=o,e[5]=s):s=e[5];let i;return e[6]!==n||e[7]!==a||e[8]!==s?(i=l.jsx(vi,{children:l.jsx(gi,{"data-slot":"dropdown-menu-content",sideOffset:a,className:s,...n})}),e[6]=n,e[7]=a,e[8]=s,e[9]=i):i=e[9],i}function Fl(t){const e=N.c(4);let o;e[0]!==t?({...o}=t,e[0]=t,e[1]=o):o=e[1];let n;return e[2]!==o?(n=l.jsx(hi,{"data-slot":"dropdown-menu-group",...o}),e[2]=o,e[3]=n):n=e[3],n}function ft(t){const e=N.c(12);let o,n,r,a;e[0]!==t?({className:o,inset:n,variant:a,...r}=t,e[0]=t,e[1]=o,e[2]=n,e[3]=r,e[4]=a):(o=e[1],n=e[2],r=e[3],a=e[4]);const s=a===void 0?"default":a;let i;e[5]!==o?(i=R("focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive-foreground data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/40 data-[variant=destructive]:focus:text-destructive-foreground data-[variant=destructive]:*:[svg]:!text-destructive-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",o),e[5]=o,e[6]=i):i=e[6];let u;return e[7]!==n||e[8]!==r||e[9]!==i||e[10]!==s?(u=l.jsx(bi,{"data-slot":"dropdown-menu-item","data-inset":n,"data-variant":s,className:i,...r}),e[7]=n,e[8]=r,e[9]=i,e[10]=s,e[11]=u):u=e[11],u}function Bl(t){const e=N.c(10);let o,n,r;e[0]!==t?({className:o,inset:n,...r}=t,e[0]=t,e[1]=o,e[2]=n,e[3]=r):(o=e[1],n=e[2],r=e[3]);let a;e[4]!==o?(a=R("px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",o),e[4]=o,e[5]=a):a=e[5];let s;return e[6]!==n||e[7]!==r||e[8]!==a?(s=l.jsx(yi,{"data-slot":"dropdown-menu-label","data-inset":n,className:a,...r}),e[6]=n,e[7]=r,e[8]=a,e[9]=s):s=e[9],s}function io(t){const e=N.c(8);let o,n;e[0]!==t?({className:o,...n}=t,e[0]=t,e[1]=o,e[2]=n):(o=e[1],n=e[2]);let r;e[3]!==o?(r=R("bg-border -mx-1 my-1 h-px",o),e[3]=o,e[4]=r):r=e[4];let a;return e[5]!==n||e[6]!==r?(a=l.jsx(xi,{"data-slot":"dropdown-menu-separator",className:r,...n}),e[5]=n,e[6]=r,e[7]=a):a=e[7],a}function zl(t,e=[]){let o=[];function n(a,s){const i=c.createContext(s);i.displayName=a+"Context";const u=o.length;o=[...o,s];const f=d=>{const{scope:m,children:_,...w}=d,v=m?.[t]?.[u]||i,g=c.useMemo(()=>w,Object.values(w));return l.jsx(v.Provider,{value:g,children:_})};f.displayName=a+"Provider";function p(d,m){const _=m?.[t]?.[u]||i,w=c.useContext(_);if(w)return w;if(s!==void 0)return s;throw new Error(`\`${d}\` must be used within \`${a}\``)}return[f,p]}const r=()=>{const a=o.map(s=>c.createContext(s));return function(i){const u=i?.[t]||a;return c.useMemo(()=>({[`__scope${t}`]:{...i,[t]:u}}),[i,u])}};return r.scopeName=t,[n,Gl(r,...e)]}function Gl(...t){const e=t[0];if(t.length===1)return e;const o=()=>{const n=t.map(r=>({useScope:r(),scopeName:r.scopeName}));return function(a){const s=n.reduce((i,{useScope:u,scopeName:f})=>{const d=u(a)[`__scope${f}`];return{...i,...d}},{});return c.useMemo(()=>({[`__scope${e.scopeName}`]:s}),[s])}};return o.scopeName=e.scopeName,o}var Ft="Avatar",[Kl]=zl(Ft),[Ul,Bn]=Kl(Ft),zn=c.forwardRef((t,e)=>{const{__scopeAvatar:o,...n}=t,[r,a]=c.useState("idle");return l.jsx(Ul,{scope:o,imageLoadingStatus:r,onImageLoadingStatusChange:a,children:l.jsx(Ot.span,{...n,ref:e})})});zn.displayName=Ft;var Gn="AvatarImage",Kn=c.forwardRef((t,e)=>{const{__scopeAvatar:o,src:n,onLoadingStatusChange:r=()=>{},...a}=t,s=Bn(Gn,o),i=Wl(n,a),u=pe(f=>{r(f),s.onImageLoadingStatusChange(f)});return Le(()=>{i!=="idle"&&u(i)},[i,u]),i==="loaded"?l.jsx(Ot.img,{...a,ref:e,src:n}):null});Kn.displayName=Gn;var Un="AvatarFallback",Wn=c.forwardRef((t,e)=>{const{__scopeAvatar:o,delayMs:n,...r}=t,a=Bn(Un,o),[s,i]=c.useState(n===void 0);return c.useEffect(()=>{if(n!==void 0){const u=window.setTimeout(()=>i(!0),n);return()=>window.clearTimeout(u)}},[n]),s&&a.imageLoadingStatus!=="loaded"?l.jsx(Ot.span,{...r,ref:e}):null});Wn.displayName=Un;function lo(t,e){return t?e?(t.src!==e&&(t.src=e),t.complete&&t.naturalWidth>0?"loaded":"loading"):"error":"idle"}function Wl(t,{referrerPolicy:e,crossOrigin:o}){const n=Ka(),r=c.useRef(null),a=n?(r.current||(r.current=new window.Image),r.current):null,[s,i]=c.useState(()=>lo(a,t));return Le(()=>{i(lo(a,t))},[a,t]),Le(()=>{const u=d=>()=>{i(d)};if(!a)return;const f=u("loaded"),p=u("error");return a.addEventListener("load",f),a.addEventListener("error",p),e&&(a.referrerPolicy=e),typeof o=="string"&&(a.crossOrigin=o),()=>{a.removeEventListener("load",f),a.removeEventListener("error",p)}},[a,o,e]),s}var Vl=zn,Hl=Kn,Xl=Wn;function Yl(t){const e=N.c(8);let o,n;e[0]!==t?({className:o,...n}=t,e[0]=t,e[1]=o,e[2]=n):(o=e[1],n=e[2]);let r;e[3]!==o?(r=R("relative flex size-8 shrink-0 overflow-hidden rounded-full",o),e[3]=o,e[4]=r):r=e[4];let a;return e[5]!==n||e[6]!==r?(a=l.jsx(Vl,{"data-slot":"avatar",className:r,...n}),e[5]=n,e[6]=r,e[7]=a):a=e[7],a}function ql(t){const e=N.c(8);let o,n;e[0]!==t?({className:o,...n}=t,e[0]=t,e[1]=o,e[2]=n):(o=e[1],n=e[2]);let r;e[3]!==o?(r=R("aspect-square size-full",o),e[3]=o,e[4]=r):r=e[4];let a;return e[5]!==n||e[6]!==r?(a=l.jsx(Hl,{"data-slot":"avatar-image",className:r,...n}),e[5]=n,e[6]=r,e[7]=a):a=e[7],a}function Ql(t){const e=N.c(8);let o,n;e[0]!==t?({className:o,...n}=t,e[0]=t,e[1]=o,e[2]=n):(o=e[1],n=e[2]);let r;e[3]!==o?(r=R("bg-muted flex size-full items-center justify-center rounded-full",o),e[3]=o,e[4]=r):r=e[4];let a;return e[5]!==n||e[6]!==r?(a=l.jsx(Xl,{"data-slot":"avatar-fallback",className:r,...n}),e[5]=n,e[6]=r,e[7]=a):a=e[7],a}function Zl(){return Jl}function Jl(t){const e=t.trim().split(" ");if(e.length===0)return"";if(e.length===1)return e[0].charAt(0).toUpperCase();const o=e[0].charAt(0),n=e[e.length-1].charAt(0);return`${o}${n}`.toUpperCase()}function Vn(t){const e=N.c(21),{user:o,showEmail:n}=t,r=Zl(),a=o.avatar?`/storage/${o.avatar}`:void 0;let s;e[0]!==a||e[1]!==o.name?(s=l.jsx(ql,{src:a,alt:o.name}),e[0]=a,e[1]=o.name,e[2]=s):s=e[2];let i;e[3]!==r||e[4]!==o.name?(i=r(o.name),e[3]=r,e[4]=o.name,e[5]=i):i=e[5];let u;e[6]!==i?(u=l.jsx(Ql,{className:"rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white",children:i}),e[6]=i,e[7]=u):u=e[7];let f;e[8]!==s||e[9]!==u?(f=l.jsxs(Yl,{className:"h-8 w-8 overflow-hidden rounded-full",children:[s,u]}),e[8]=s,e[9]=u,e[10]=f):f=e[10];let p;e[11]!==o.name?(p=l.jsx("span",{className:"truncate font-medium text-orange-400",children:o.name}),e[11]=o.name,e[12]=p):p=e[12];let d;e[13]!==o.email?(d=l.jsx("span",{className:"text-muted-foreground truncate text-xs",children:o.email}),e[13]=o.email,e[14]=d):d=e[14];let m;e[15]!==p||e[16]!==d?(m=l.jsxs("div",{className:"grid flex-1 text-left text-sm leading-tight",children:[p,d]}),e[15]=p,e[16]=d,e[17]=m):m=e[17];let _;return e[18]!==f||e[19]!==m?(_=l.jsxs(l.Fragment,{children:[f,m]}),e[18]=f,e[19]=m,e[20]=_):_=e[20],_}function ec(){return tc}function tc(){document.body.style.removeProperty("pointer-events")}function oc(t){const e=N.c(23),{user:o}=t,n=ec();let r;e[0]!==n?(r=()=>{n(),or.flushAll()},e[0]=n,e[1]=r):r=e[1];const a=r;let s;e[2]!==o?(s=l.jsx(Bl,{className:"p-0 font-normal",children:l.jsx("div",{className:"flex items-center gap-2 px-1 py-1.5 text-left text-sm",children:l.jsx(Vn,{user:o,showEmail:!0})})}),e[2]=o,e[3]=s):s=e[3];let i;e[4]===Symbol.for("react.memo_cache_sentinel")?(i=l.jsx(io,{}),e[4]=i):i=e[4];let u;e[5]===Symbol.for("react.memo_cache_sentinel")?(u=l.jsx(xr,{className:"mr-2"}),e[5]=u):u=e[5];let f;e[6]!==n?(f=l.jsx(ft,{asChild:!0,children:l.jsxs(te,{className:"block w-full",href:"/cpanel/settings/profile",as:"button",prefetch:!0,onClick:n,children:[u,"Edit Profil"]})}),e[6]=n,e[7]=f):f=e[7];let p;e[8]===Symbol.for("react.memo_cache_sentinel")?(p=l.jsx(Ri,{className:"mr-2"}),e[8]=p):p=e[8];let d;e[9]!==n?(d=l.jsx(ft,{asChild:!0,children:l.jsxs(te,{className:"block w-full",href:"/cpanel/settings/password",as:"button",prefetch:!0,onClick:n,children:[p,"Ubah Password"]})}),e[9]=n,e[10]=d):d=e[10];let m;e[11]!==f||e[12]!==d?(m=l.jsxs(Fl,{children:[f,d]}),e[11]=f,e[12]=d,e[13]=m):m=e[13];let _;e[14]===Symbol.for("react.memo_cache_sentinel")?(_=l.jsx(io,{}),e[14]=_):_=e[14];let w;e[15]===Symbol.for("react.memo_cache_sentinel")?(w=yr(),e[15]=w):w=e[15];let v;e[16]===Symbol.for("react.memo_cache_sentinel")?(v=l.jsx(Ai,{className:"mr-2"}),e[16]=v):v=e[16];let g;e[17]!==a?(g=l.jsx(ft,{asChild:!0,children:l.jsxs(te,{className:"block w-full",href:w,as:"button",onClick:a,"data-test":"logout-button",children:[v,"Keluar"]})}),e[17]=a,e[18]=g):g=e[18];let y;return e[19]!==g||e[20]!==s||e[21]!==m?(y=l.jsxs(l.Fragment,{children:[s,i,m,_,g]}),e[19]=g,e[20]=s,e[21]=m,e[22]=y):y=e[22],y}function nc(){const t=N.c(13),{auth:e}=we().props,{state:o}=qe(),n=$n();let r;t[0]!==e.user?(r=l.jsx(Vn,{user:e.user}),t[0]=e.user,t[1]=r):r=t[1];let a;t[2]===Symbol.for("react.memo_cache_sentinel")?(a=l.jsx(Ei,{className:"ml-auto size-4"}),t[2]=a):a=t[2];let s;t[3]!==r?(s=l.jsx(Ll,{asChild:!0,children:l.jsxs($t,{size:"lg",className:"group text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent","data-test":"sidebar-menu-button",children:[r,a]})}),t[3]=r,t[4]=s):s=t[4];const i=n?"bottom":o==="collapsed"?"left":"bottom";let u;t[5]!==e.user?(u=l.jsx(oc,{user:e.user}),t[5]=e.user,t[6]=u):u=t[6];let f;t[7]!==i||t[8]!==u?(f=l.jsx($l,{className:"w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg",align:"end",side:i,children:u}),t[7]=i,t[8]=u,t[9]=f):f=t[9];let p;return t[10]!==s||t[11]!==f?(p=l.jsx(Ge,{children:l.jsx(Lt,{children:l.jsxs(Ol,{children:[s,f]})})}),t[10]=s,t[11]=f,t[12]=p):p=t[12],p}function rc(){const t=N.c(11),{getConfig:e}=wr();let o,n;if(t[0]!==e){const f=e("site_favicon","/images/logo-main-square.png");o=e("site_name","Alumoda Sinergi Kontainer Indonesia"),n=f.startsWith("configurations/")?`/storage/${f}`:f,t[0]=e,t[1]=o,t[2]=n}else o=t[1],n=t[2];const r=n;let a;t[3]!==r?(a=l.jsx("div",{className:"text-sidebar-primary-foreground flex aspect-square size-9 items-center justify-center rounded-md bg-white/10",children:l.jsx("img",{src:r,className:"size-9 fill-current text-white dark:text-black",onError:ac})}),t[3]=r,t[4]=a):a=t[4];let s;t[5]===Symbol.for("react.memo_cache_sentinel")?(s=l.jsx("span",{className:"mb-0.5 truncate leading-tight font-semibold text-orange-400",children:"Admin Panel"}),t[5]=s):s=t[5];let i;t[6]!==o?(i=l.jsxs("div",{className:"ml-1 grid flex-1 text-left text-sm",children:[s,l.jsx("span",{className:"text-muted dark:text-white/50 truncate text-xs",children:o})]}),t[6]=o,t[7]=i):i=t[7];let u;return t[8]!==a||t[9]!==i?(u=l.jsxs(l.Fragment,{children:[a,i]}),t[8]=a,t[9]=i,t[10]=u):u=t[10],u}function ac(t){return ar(t,"/images/logo-main-square.png","Site logo")}const sc=[{group:{title:"",items:[{title:"Dashboard",href:"/cpanel",icon:oo},{title:"Daftar Pesanan",href:"/cpanel/crm/orders",icon:_r,permission:"order-list"},{title:"Posting Artikel",href:"/cpanel/cms/article",icon:Cr,permission:"article-list"},{title:"Produk",href:"/cpanel/cms/product?status=published",icon:oo,permission:"product-list"},{title:"Pelanggan",href:"/cpanel/crm/customer",icon:no,permission:"customer-list"},{title:"Klien",href:"/cpanel/cms/client",icon:Mi,permission:"client-list"},{title:"Merek",href:"/cpanel/cms/brand",icon:Tr,permission:"brand-list"},{title:"Layanan",href:"/cpanel/cms/service",icon:hr,permission:"service-list"},{title:"Kategori",href:"/cpanel/cms/category",icon:Sr,permission:"category-list"},{title:"FAQ",href:"/cpanel/cms/faq",icon:Di,permission:"faq-list"},{title:"Ulasan",href:"/cpanel/cms/testimonial",icon:Er,permission:"testimonial-list"},{title:"User",href:"/cpanel/authorization/user-management",icon:no,permission:"user-list"},{title:"Role",href:"/cpanel/authorization/roles",icon:zi,permission:"role-list"},{title:"Hak Akses",href:"/cpanel/authorization/permissions",icon:Ki,permission:"permission-list"},{title:"Pengaturan",href:"/cpanel/settings/configuration/site",icon:Fi,permission:"setting-configuration-list"}]}}];function ic(t){const e=N.c(34),{recentOrders:o}=t;let n;e[0]!==o?(n=o===void 0?[]:o,e[0]=o,e[1]=n):n=e[1];const r=n,{auth:a}=we().props;let s;e[2]!==a.permissions?(s=a.permissions||[],e[2]=a.permissions,e[3]=s):s=e[3];const i=s;let u;e[4]!==r?(u=r.filter(lc),e[4]=r,e[5]=u):u=e[5];const f=u.length;let p,d,m,_,w,v,g,y;if(e[6]!==f||e[7]!==i){let C;e[16]!==i?(C=I=>{const{group:M}=I;return{group:{...M,items:M.items.filter(k=>k.permission?i.includes(k.permission):!0)}}},e[16]=i,e[17]=C):C=e[17];const E=sc.map(C);d=_l,v="icon",g="inset",y="bg-slate-900";let T;e[18]===Symbol.for("react.memo_cache_sentinel")?(T=br(),e[18]=T):T=e[18],e[19]===Symbol.for("react.memo_cache_sentinel")?(m=l.jsx(Tl,{className:"bg-slate-900",children:l.jsx(Ge,{children:l.jsx(Lt,{children:l.jsx($t,{className:"hover:bg-slate-900",size:"lg",asChild:!0,children:l.jsx(te,{href:T,prefetch:!0,children:l.jsx(rc,{})})})})})}),e[19]=m):m=e[19],p=El,_="-space-y-2! bg-slate-900";let S;e[20]!==f?(S=(I,M)=>{const{group:k}=I;return l.jsx(Dl,{items:k.items,groupTitle:k.title,newOrdersCount:f},M)},e[20]=f,e[21]=S):S=e[21],w=E.map(S),e[6]=f,e[7]=i,e[8]=p,e[9]=d,e[10]=m,e[11]=_,e[12]=w,e[13]=v,e[14]=g,e[15]=y}else p=e[8],d=e[9],m=e[10],_=e[11],w=e[12],v=e[13],g=e[14],y=e[15];let h;e[22]!==p||e[23]!==_||e[24]!==w?(h=l.jsx(p,{className:_,children:w}),e[22]=p,e[23]=_,e[24]=w,e[25]=h):h=e[25];let b;e[26]===Symbol.for("react.memo_cache_sentinel")?(b=l.jsx(Sl,{className:"bg-slate-900",children:l.jsx(nc,{})}),e[26]=b):b=e[26];let x;return e[27]!==d||e[28]!==m||e[29]!==h||e[30]!==v||e[31]!==g||e[32]!==y?(x=l.jsxs(d,{collapsible:v,variant:g,className:y,children:[m,h,b]}),e[27]=d,e[28]=m,e[29]=h,e[30]=v,e[31]=g,e[32]=y,e[33]=x):x=e[33],x}function lc(t){return t.status==="pending"}function cc(t){const e=N.c(4);let o;e[0]!==t?({...o}=t,e[0]=t,e[1]=o):o=e[1];let n;return e[2]!==o?(n=l.jsx("nav",{"aria-label":"breadcrumb","data-slot":"breadcrumb",...o}),e[2]=o,e[3]=n):n=e[3],n}function uc(t){const e=N.c(8);let o,n;e[0]!==t?({className:o,...n}=t,e[0]=t,e[1]=o,e[2]=n):(o=e[1],n=e[2]);let r;e[3]!==o?(r=R("text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",o),e[3]=o,e[4]=r):r=e[4];let a;return e[5]!==n||e[6]!==r?(a=l.jsx("ol",{"data-slot":"breadcrumb-list",className:r,...n}),e[5]=n,e[6]=r,e[7]=a):a=e[7],a}function dc(t){const e=N.c(8);let o,n;e[0]!==t?({className:o,...n}=t,e[0]=t,e[1]=o,e[2]=n):(o=e[1],n=e[2]);let r;e[3]!==o?(r=R("inline-flex items-center gap-1.5",o),e[3]=o,e[4]=r):r=e[4];let a;return e[5]!==n||e[6]!==r?(a=l.jsx("li",{"data-slot":"breadcrumb-item",className:r,...n}),e[5]=n,e[6]=r,e[7]=a):a=e[7],a}function fc(t){const e=N.c(10);let o,n,r;e[0]!==t?({asChild:o,className:n,...r}=t,e[0]=t,e[1]=o,e[2]=n,e[3]=r):(o=e[1],n=e[2],r=e[3]);const a=o?Ee:"a";let s;e[4]!==n?(s=R("hover:text-foreground transition-colors",n),e[4]=n,e[5]=s):s=e[5];let i;return e[6]!==a||e[7]!==r||e[8]!==s?(i=l.jsx(a,{"data-slot":"breadcrumb-link",className:s,...r}),e[6]=a,e[7]=r,e[8]=s,e[9]=i):i=e[9],i}function pc(t){const e=N.c(8);let o,n;e[0]!==t?({className:o,...n}=t,e[0]=t,e[1]=o,e[2]=n):(o=e[1],n=e[2]);let r;e[3]!==o?(r=R("text-foreground font-normal",o),e[3]=o,e[4]=r):r=e[4];let a;return e[5]!==n||e[6]!==r?(a=l.jsx("span",{"data-slot":"breadcrumb-page",role:"link","aria-disabled":"true","aria-current":"page",className:r,...n}),e[5]=n,e[6]=r,e[7]=a):a=e[7],a}function mc(t){const e=N.c(12);let o,n,r;e[0]!==t?({children:o,className:n,...r}=t,e[0]=t,e[1]=o,e[2]=n,e[3]=r):(o=e[1],n=e[2],r=e[3]);let a;e[4]!==n?(a=R("[&>svg]:size-3.5",n),e[4]=n,e[5]=a):a=e[5];let s;e[6]!==o?(s=o??l.jsx(wi,{}),e[6]=o,e[7]=s):s=e[7];let i;return e[8]!==r||e[9]!==a||e[10]!==s?(i=l.jsx("li",{"data-slot":"breadcrumb-separator",role:"presentation","aria-hidden":"true",className:a,...r,children:s}),e[8]=r,e[9]=a,e[10]=s,e[11]=i):i=e[11],i}function vc(t){const e=N.c(4),{breadcrumbs:o}=t;let n;e[0]!==o?(n=o.length>0&&l.jsx(cc,{children:l.jsx(uc,{children:o.map((a,s)=>{const i=s===o.length-1;return l.jsxs(c.Fragment,{children:[l.jsx(dc,{children:i?l.jsx(pc,{children:a.title}):l.jsx(fc,{asChild:!0,children:l.jsx(te,{href:a.href,children:a.title})})}),!i&&l.jsx(mc,{})]},s)})})}),e[0]=o,e[1]=n):n=e[1];let r;return e[2]!==n?(r=l.jsx(l.Fragment,{children:n}),e[2]=n,e[3]=r):r=e[3],r}function gc(t){const e=N.c(5),{breadcrumbs:o}=t;let n;e[0]!==o?(n=o===void 0?[]:o,e[0]=o,e[1]=n):n=e[1];const r=n;let a;e[2]===Symbol.for("react.memo_cache_sentinel")?(a=l.jsx(wl,{className:"-ml-1"}),e[2]=a):a=e[2];let s;return e[3]!==r?(s=l.jsx("header",{className:"border-sidebar-border/50 flex h-16 shrink-0 items-center gap-2 border-b px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4",children:l.jsxs("div",{className:"flex items-center gap-2",children:[a,l.jsx(vc,{breadcrumbs:r})]})}),e[3]=r,e[4]=s):s=e[4],s}function hc(t){const e=N.c(14),{children:o,breadcrumbs:n,recentOrders:r}=t;let a;e[0]!==n?(a=n===void 0?[]:n,e[0]=n,e[1]=a):a=e[1];const s=a;let i;e[2]!==r?(i=r===void 0?[]:r,e[2]=r,e[3]=i):i=e[3];const u=i;let f;e[4]!==u?(f=l.jsx(ic,{recentOrders:u}),e[4]=u,e[5]=f):f=e[5];let p;e[6]!==s?(p=l.jsx(gc,{breadcrumbs:s}),e[6]=s,e[7]=p):p=e[7];let d;e[8]!==o||e[9]!==p?(d=l.jsxs(Al,{variant:"sidebar",className:"overflow-x-hidden",children:[p,o]}),e[8]=o,e[9]=p,e[10]=d):d=e[10];let m;return e[11]!==f||e[12]!==d?(m=l.jsxs(Pl,{variant:"sidebar",children:[f,d]}),e[11]=f,e[12]=d,e[13]=m):m=e[13],m}var Ne=t=>typeof t=="number"&&!isNaN(t),ae=t=>typeof t=="string",Q=t=>typeof t=="function",yc=t=>ae(t)||Ne(t),gt=t=>ae(t)||Q(t)?t:null,bc=(t,e)=>t===!1||Ne(t)&&t>0?t:e,ht=t=>c.isValidElement(t)||ae(t)||Q(t)||Ne(t);function xc(t,e,o=300){let{scrollHeight:n,style:r}=t;requestAnimationFrame(()=>{r.minHeight="initial",r.height=n+"px",r.transition=`all ${o}ms`,requestAnimationFrame(()=>{r.height="0",r.padding="0",r.margin="0",setTimeout(e,o)})})}function _c({enter:t,exit:e,appendPosition:o=!1,collapse:n=!0,collapseDuration:r=300}){return function({children:a,position:s,preventExitTransition:i,done:u,nodeRef:f,isIn:p,playToast:d}){let m=o?`${t}--${s}`:t,_=o?`${e}--${s}`:e,w=c.useRef(0);return c.useLayoutEffect(()=>{let v=f.current,g=m.split(" "),y=h=>{h.target===f.current&&(d(),v.removeEventListener("animationend",y),v.removeEventListener("animationcancel",y),w.current===0&&h.type!=="animationcancel"&&v.classList.remove(...g))};v.classList.add(...g),v.addEventListener("animationend",y),v.addEventListener("animationcancel",y)},[]),c.useEffect(()=>{let v=f.current,g=()=>{v.removeEventListener("animationend",g),n?xc(v,u,r):u()};p||(i?g():(w.current=1,v.className+=` ${_}`,v.addEventListener("animationend",g)))},[p]),P.createElement(P.Fragment,null,a)}}function co(t,e){return{content:Hn(t.content,t.props),containerId:t.props.containerId,id:t.props.toastId,theme:t.props.theme,type:t.props.type,data:t.props.data||{},isLoading:t.props.isLoading,icon:t.props.icon,reason:t.removalReason,status:e}}function Hn(t,e,o=!1){return c.isValidElement(t)&&!ae(t.type)?c.cloneElement(t,{closeToast:e.closeToast,toastProps:e,data:e.data,isPaused:o}):Q(t)?t({closeToast:e.closeToast,toastProps:e,data:e.data,isPaused:o}):t}function wc({closeToast:t,theme:e,ariaLabel:o="close"}){return P.createElement("button",{className:`Toastify__close-button Toastify__close-button--${e}`,type:"button",onClick:n=>{n.stopPropagation(),t(!0)},"aria-label":o},P.createElement("svg",{"aria-hidden":"true",viewBox:"0 0 14 16"},P.createElement("path",{fillRule:"evenodd",d:"M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"})))}function Cc({delay:t,isRunning:e,closeToast:o,type:n="default",hide:r,className:a,controlledProgress:s,progress:i,rtl:u,isIn:f,theme:p}){let d=r||s&&i===0,m={animationDuration:`${t}ms`,animationPlayState:e?"running":"paused"};s&&(m.transform=`scaleX(${i})`);let _=oe("Toastify__progress-bar",s?"Toastify__progress-bar--controlled":"Toastify__progress-bar--animated",`Toastify__progress-bar-theme--${p}`,`Toastify__progress-bar--${n}`,{"Toastify__progress-bar--rtl":u}),w=Q(a)?a({rtl:u,type:n,defaultClassName:_}):oe(_,a),v={[s&&i>=1?"onTransitionEnd":"onAnimationEnd"]:s&&i<1?null:()=>{f&&o()}};return P.createElement("div",{className:"Toastify__progress-bar--wrp","data-hidden":d},P.createElement("div",{className:`Toastify__progress-bar--bg Toastify__progress-bar-theme--${p} Toastify__progress-bar--${n}`}),P.createElement("div",{role:"progressbar","aria-hidden":d?"true":"false","aria-label":"notification timer","aria-valuenow":s?Math.round(i*100):void 0,"aria-valuemin":0,"aria-valuemax":100,className:w,style:m,...v}))}var Tc=1,Xn=()=>`${Tc++}`;function Sc(t,e,o){let n=1,r=0,a=[],s=[],i=e,u=new Map,f=new Set,p=h=>(f.add(h),()=>f.delete(h)),d=()=>{s=Array.from(u.values()),f.forEach(h=>h())},m=({containerId:h,toastId:b,updateId:x})=>{let C=h?h!==t:t!==1,E=u.has(b)&&x==null;return C||E},_=(h,b)=>{u.forEach(x=>{var C;(b==null||b===x.props.toastId)&&((C=x.toggle)==null||C.call(x,h))})},w=h=>{var b,x;h.isActive&&((x=(b=h.props)==null?void 0:b.onClose)==null||x.call(b,h.removalReason),h.isActive=!1,o(co(h,"removed")))},v=h=>{if(h==null)u.forEach(w);else{let b=u.get(h);b&&w(b)}d()},g=()=>{r-=a.length,a=[]},y=h=>{var b,x;let{toastId:C,updateId:E}=h.props,T=E==null;h.staleId&&u.delete(h.staleId),h.isActive=!0,u.set(C,h),d(),o(co(h,T?"added":"updated")),T&&((x=(b=h.props).onOpen)==null||x.call(b))};return{id:t,props:i,observe:p,toggle:_,removeToast:v,toasts:u,clearQueue:g,buildToast:(h,b)=>{if(m(b))return;let{toastId:x,updateId:C,data:E,staleId:T,delay:S}=b,I=C==null;I&&r++;let M={...i,style:i.toastStyle,key:n++,...Object.fromEntries(Object.entries(b).filter(([O,L])=>L!=null)),toastId:x,updateId:C,data:E,isIn:!1,className:gt(b.className||i.toastClassName),progressClassName:gt(b.progressClassName||i.progressClassName),autoClose:b.isLoading?!1:bc(b.autoClose,i.autoClose),closeToast(O){let L=u.get(x);L&&(L.removalReason=O,v(x))},deleteToast(){if(u.get(x)!=null){if(u.delete(x),r--,r<0&&(r=0),a.length>0){y(a.shift());return}d()}}};M.closeButton=i.closeButton,b.closeButton===!1||ht(b.closeButton)?M.closeButton=b.closeButton:b.closeButton===!0&&(M.closeButton=ht(i.closeButton)?i.closeButton:!0);let k={content:h,props:M,staleId:T};i.limit&&i.limit>0&&r>i.limit&&I?a.push(k):Ne(S)?setTimeout(()=>{y(k)},S):y(k)},setProps(h){i=h},setToggle:(h,b)=>{let x=u.get(h);x&&(x.toggle=b)},isToastActive:h=>{var b;return(b=u.get(h))==null?void 0:b.isActive},getSnapshot:()=>s}}var B=new Map,_e=[],yt=new Set,Ec=t=>yt.forEach(e=>e(t)),Yn=()=>B.size>0;function Nc(){_e.forEach(t=>Qn(t.content,t.options)),_e=[]}var Mc=(t,{containerId:e})=>{var o;return(o=B.get(e||1))==null?void 0:o.toasts.get(t)};function qn(t,e){var o;if(e)return!!((o=B.get(e))!=null&&o.isToastActive(t));let n=!1;return B.forEach(r=>{r.isToastActive(t)&&(n=!0)}),n}function Ic(t){if(!Yn()){_e=_e.filter(e=>t!=null&&e.options.toastId!==t);return}if(t==null||yc(t))B.forEach(e=>{e.removeToast(t)});else if(t&&("containerId"in t||"id"in t)){let e=B.get(t.containerId);e?e.removeToast(t.id):B.forEach(o=>{o.removeToast(t.id)})}}var Rc=(t={})=>{B.forEach(e=>{e.props.limit&&(!t.containerId||e.id===t.containerId)&&e.clearQueue()})};function Qn(t,e){ht(t)&&(Yn()||_e.push({content:t,options:e}),B.forEach(o=>{o.buildToast(t,e)}))}function kc(t){var e;(e=B.get(t.containerId||1))==null||e.setToggle(t.id,t.fn)}function Zn(t,e){B.forEach(o=>{(e==null||!(e!=null&&e.containerId)||e?.containerId===o.id)&&o.toggle(t,e?.id)})}function jc(t){let e=t.containerId||1;return{subscribe(o){let n=Sc(e,t,Ec);B.set(e,n);let r=n.observe(o);return Nc(),()=>{r(),B.delete(e)}},setProps(o){var n;(n=B.get(e))==null||n.setProps(o)},getSnapshot(){var o;return(o=B.get(e))==null?void 0:o.getSnapshot()}}}function Ac(t){return yt.add(t),()=>{yt.delete(t)}}function Pc(t){return t&&(ae(t.toastId)||Ne(t.toastId))?t.toastId:Xn()}function Me(t,e){return Qn(t,e),e.toastId}function Qe(t,e){return{...e,type:e&&e.type||t,toastId:Pc(e)}}function Ze(t){return(e,o)=>Me(e,Qe(t,o))}function D(t,e){return Me(t,Qe("default",e))}D.loading=(t,e)=>Me(t,Qe("default",{isLoading:!0,autoClose:!1,closeOnClick:!1,closeButton:!1,draggable:!1,...e}));function Dc(t,{pending:e,error:o,success:n},r){let a;e&&(a=ae(e)?D.loading(e,r):D.loading(e.render,{...r,...e}));let s={isLoading:null,autoClose:null,closeOnClick:null,closeButton:null,draggable:null},i=(f,p,d)=>{if(p==null){D.dismiss(a);return}let m={type:f,...s,...r,data:d},_=ae(p)?{render:p}:p;return a?D.update(a,{...m,..._}):D(_.render,{...m,..._}),d},u=Q(t)?t():t;return u.then(f=>i("success",n,f)).catch(f=>i("error",o,f)),u}D.promise=Dc;D.success=Ze("success");D.info=Ze("info");D.error=Ze("error");D.warning=Ze("warning");D.warn=D.warning;D.dark=(t,e)=>Me(t,Qe("default",{theme:"dark",...e}));function Oc(t){Ic(t)}D.dismiss=Oc;D.clearWaitingQueue=Rc;D.isActive=qn;D.update=(t,e={})=>{let o=Mc(t,e);if(o){let{props:n,content:r}=o,a={delay:100,...n,...e,toastId:e.toastId||t,updateId:Xn()};a.toastId!==t&&(a.staleId=t);let s=a.render||r;delete a.render,Me(s,a)}};D.done=t=>{D.update(t,{progress:1})};D.onChange=Ac;D.play=t=>Zn(!0,t);D.pause=t=>Zn(!1,t);function Lc(t){var e;let{subscribe:o,getSnapshot:n,setProps:r}=c.useRef(jc(t)).current;r(t);let a=(e=c.useSyncExternalStore(o,n,n))==null?void 0:e.slice();function s(i){if(!a)return[];let u=new Map;return t.newestOnTop&&a.reverse(),a.forEach(f=>{let{position:p}=f.props;u.has(p)||u.set(p,[]),u.get(p).push(f)}),Array.from(u,f=>i(f[0],f[1]))}return{getToastToRender:s,isToastActive:qn,count:a?.length}}function $c(t){let[e,o]=c.useState(!1),[n,r]=c.useState(!1),a=c.useRef(null),s=c.useRef({start:0,delta:0,removalDistance:0,canCloseOnClick:!0,canDrag:!1,didMove:!1}).current,{autoClose:i,pauseOnHover:u,closeToast:f,onClick:p,closeOnClick:d}=t;kc({id:t.toastId,containerId:t.containerId,fn:o}),c.useEffect(()=>{if(t.pauseOnFocusLoss)return m(),()=>{_()}},[t.pauseOnFocusLoss]);function m(){document.hasFocus()||y(),window.addEventListener("focus",g),window.addEventListener("blur",y)}function _(){window.removeEventListener("focus",g),window.removeEventListener("blur",y)}function w(T){if(t.draggable===!0||t.draggable===T.pointerType){h();let S=a.current;s.canCloseOnClick=!0,s.canDrag=!0,S.style.transition="none",t.draggableDirection==="x"?(s.start=T.clientX,s.removalDistance=S.offsetWidth*(t.draggablePercent/100)):(s.start=T.clientY,s.removalDistance=S.offsetHeight*(t.draggablePercent===80?t.draggablePercent*1.5:t.draggablePercent)/100)}}function v(T){let{top:S,bottom:I,left:M,right:k}=a.current.getBoundingClientRect();T.pointerType==="mouse"&&t.pauseOnHover&&T.clientX>=M&&T.clientX<=k&&T.clientY>=S&&T.clientY<=I?y():g()}function g(){o(!0)}function y(){o(!1)}function h(){s.didMove=!1,document.addEventListener("pointermove",x),document.addEventListener("pointerup",C)}function b(){document.removeEventListener("pointermove",x),document.removeEventListener("pointerup",C)}function x(T){let S=a.current;if(s.canDrag&&S){s.didMove=!0,e&&y(),t.draggableDirection==="x"?s.delta=T.clientX-s.start:s.delta=T.clientY-s.start,s.start!==T.clientX&&(s.canCloseOnClick=!1);let I=t.draggableDirection==="x"?`${s.delta}px, var(--y)`:`0, calc(${s.delta}px + var(--y))`;S.style.transform=`translate3d(${I},0)`,S.style.opacity=`${1-Math.abs(s.delta/s.removalDistance)}`}}function C(){b();let T=a.current;if(s.canDrag&&s.didMove&&T){if(s.canDrag=!1,Math.abs(s.delta)>s.removalDistance){r(!0),t.closeToast(!0),t.collapseAll();return}T.style.transition="transform 0.2s, opacity 0.2s",T.style.removeProperty("transform"),T.style.removeProperty("opacity")}}let E={onPointerDown:w,onPointerUp:v};return i&&u&&(E.onMouseEnter=y,t.stacked||(E.onMouseLeave=g)),d&&(E.onClick=T=>{p&&p(T),s.canCloseOnClick&&f(!0)}),{playToast:g,pauseToast:y,isRunning:e,preventExitTransition:n,toastRef:a,eventHandlers:E}}var Jn=typeof window<"u"?c.useLayoutEffect:c.useEffect,Je=({theme:t,type:e,isLoading:o,...n})=>P.createElement("svg",{viewBox:"0 0 24 24",width:"100%",height:"100%",fill:t==="colored"?"currentColor":`var(--toastify-icon-color-${e})`,...n});function Fc(t){return P.createElement(Je,{...t},P.createElement("path",{d:"M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z"}))}function Bc(t){return P.createElement(Je,{...t},P.createElement("path",{d:"M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z"}))}function zc(t){return P.createElement(Je,{...t},P.createElement("path",{d:"M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"}))}function Gc(t){return P.createElement(Je,{...t},P.createElement("path",{d:"M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"}))}function Kc(){return P.createElement("div",{className:"Toastify__spinner"})}var bt={info:Bc,warning:Fc,success:zc,error:Gc,spinner:Kc},Uc=t=>t in bt;function Wc({theme:t,type:e,isLoading:o,icon:n}){let r=null,a={theme:t,type:e};return n===!1||(Q(n)?r=n({...a,isLoading:o}):c.isValidElement(n)?r=c.cloneElement(n,a):o?r=bt.spinner():Uc(e)&&(r=bt[e](a))),r}var Vc=t=>{let{isRunning:e,preventExitTransition:o,toastRef:n,eventHandlers:r,playToast:a}=$c(t),{closeButton:s,children:i,autoClose:u,onClick:f,type:p,hideProgressBar:d,closeToast:m,transition:_,position:w,className:v,style:g,progressClassName:y,updateId:h,role:b,progress:x,rtl:C,toastId:E,deleteToast:T,isIn:S,isLoading:I,closeOnClick:M,theme:k,ariaLabel:O}=t,L=oe("Toastify__toast",`Toastify__toast-theme--${k}`,`Toastify__toast--${p}`,{"Toastify__toast--rtl":C},{"Toastify__toast--close-on-click":M}),G=Q(v)?v({rtl:C,position:w,type:p,defaultClassName:L}):oe(L,v),F=Wc(t),V=!!x||!u,ve={closeToast:m,type:p,theme:k},X=null;return s===!1||(Q(s)?X=s(ve):c.isValidElement(s)?X=c.cloneElement(s,ve):X=wc(ve)),P.createElement(_,{isIn:S,done:T,position:w,preventExitTransition:o,nodeRef:n,playToast:a},P.createElement("div",{id:E,tabIndex:0,onClick:f,"data-in":S,className:G,...r,style:g,ref:n,...S&&{role:b,"aria-label":O}},F!=null&&P.createElement("div",{className:oe("Toastify__toast-icon",{"Toastify--animate-icon Toastify__zoom-enter":!I})},F),Hn(i,t,!e),X,!t.customProgressBar&&P.createElement(Cc,{...h&&!V?{key:`p-${h}`}:{},rtl:C,theme:k,delay:u,isRunning:e,isIn:S,closeToast:m,hide:d,type:p,className:y,controlledProgress:V,progress:x||0})))},Hc=(t,e=!1)=>({enter:`Toastify--animate Toastify__${t}-enter`,exit:`Toastify--animate Toastify__${t}-exit`,appendPosition:e}),Xc=_c(Hc("bounce",!0)),Yc={position:"top-right",transition:Xc,autoClose:5e3,closeButton:!0,pauseOnHover:!0,pauseOnFocusLoss:!0,draggable:"touch",draggablePercent:80,draggableDirection:"x",role:"alert",theme:"light","aria-label":"Notifications Alt+T",hotKeys:t=>t.altKey&&t.code==="KeyT"};function qc(t){let e={...Yc,...t},o=t.stacked,[n,r]=c.useState(!0),a=c.useRef(null),{getToastToRender:s,isToastActive:i,count:u}=Lc(e),{className:f,style:p,rtl:d,containerId:m,hotKeys:_}=e;function w(g){let y=oe("Toastify__toast-container",`Toastify__toast-container--${g}`,{"Toastify__toast-container--rtl":d});return Q(f)?f({position:g,rtl:d,defaultClassName:y}):oe(y,gt(f))}function v(){o&&(r(!0),D.play())}return Jn(()=>{var g;if(o){let y=a.current.querySelectorAll('[data-in="true"]'),h=12,b=(g=e.position)==null?void 0:g.includes("top"),x=0,C=0;Array.from(y).reverse().forEach((E,T)=>{let S=E;S.classList.add("Toastify__toast--stacked"),T>0&&(S.dataset.collapsed=`${n}`),S.dataset.pos||(S.dataset.pos=b?"top":"bot");let I=x*(n?.2:1)+(n?0:h*T),M=Math.max(.5,1-(n?C:0));S.style.setProperty("--y",`${b?I:I*-1}px`),S.style.setProperty("--g",`${h}`),S.style.setProperty("--s",`${M}`),x+=S.offsetHeight,C+=.025})}},[n,u,o]),c.useEffect(()=>{function g(y){var h;let b=a.current;_(y)&&((h=b?.querySelector('[tabIndex="0"]'))==null||h.focus(),r(!1),D.pause()),y.key==="Escape"&&(document.activeElement===b||b!=null&&b.contains(document.activeElement))&&(r(!0),D.play())}return document.addEventListener("keydown",g),()=>{document.removeEventListener("keydown",g)}},[_]),P.createElement("section",{ref:a,className:"Toastify",id:m,onMouseEnter:()=>{o&&(r(!1),D.pause())},onMouseLeave:v,"aria-live":"polite","aria-atomic":"false","aria-relevant":"additions text","aria-label":e["aria-label"]},s((g,y)=>{let h=y.length?{...p}:{...p,pointerEvents:"none"};return P.createElement("div",{tabIndex:-1,className:w(g),"data-stacked":o,style:h,key:`c-${g}`},y.map(({content:b,props:x})=>P.createElement(Vc,{...x,stacked:o,collapseAll:v,isIn:i(x.toastId,x.containerId),key:`t-${x.key}`},b)))}))}var Qc=`:root {
  --toastify-color-light: #fff;
  --toastify-color-dark: #121212;
  --toastify-color-info: #3498db;
  --toastify-color-success: #07bc0c;
  --toastify-color-warning: #f1c40f;
  --toastify-color-error: hsl(6, 78%, 57%);
  --toastify-color-transparent: rgba(255, 255, 255, 0.7);

  --toastify-icon-color-info: var(--toastify-color-info);
  --toastify-icon-color-success: var(--toastify-color-success);
  --toastify-icon-color-warning: var(--toastify-color-warning);
  --toastify-icon-color-error: var(--toastify-color-error);

  --toastify-container-width: fit-content;
  --toastify-toast-width: 320px;
  --toastify-toast-offset: 16px;
  --toastify-toast-top: max(var(--toastify-toast-offset), env(safe-area-inset-top));
  --toastify-toast-right: max(var(--toastify-toast-offset), env(safe-area-inset-right));
  --toastify-toast-left: max(var(--toastify-toast-offset), env(safe-area-inset-left));
  --toastify-toast-bottom: max(var(--toastify-toast-offset), env(safe-area-inset-bottom));
  --toastify-toast-background: #fff;
  --toastify-toast-padding: 14px;
  --toastify-toast-min-height: 64px;
  --toastify-toast-max-height: 800px;
  --toastify-toast-bd-radius: 6px;
  --toastify-toast-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  --toastify-font-family: sans-serif;
  --toastify-z-index: 9999;
  --toastify-text-color-light: #757575;
  --toastify-text-color-dark: #fff;

  /* Used only for colored theme */
  --toastify-text-color-info: #fff;
  --toastify-text-color-success: #fff;
  --toastify-text-color-warning: #fff;
  --toastify-text-color-error: #fff;

  --toastify-spinner-color: #616161;
  --toastify-spinner-color-empty-area: #e0e0e0;
  --toastify-color-progress-light: linear-gradient(to right, #4cd964, #5ac8fa, #007aff, #34aadc, #5856d6, #ff2d55);
  --toastify-color-progress-dark: #bb86fc;
  --toastify-color-progress-info: var(--toastify-color-info);
  --toastify-color-progress-success: var(--toastify-color-success);
  --toastify-color-progress-warning: var(--toastify-color-warning);
  --toastify-color-progress-error: var(--toastify-color-error);
  /* used to control the opacity of the progress trail */
  --toastify-color-progress-bgo: 0.2;
}

.Toastify__toast-container {
  z-index: var(--toastify-z-index);
  -webkit-transform: translate3d(0, 0, var(--toastify-z-index));
  position: fixed;
  width: var(--toastify-container-width);
  box-sizing: border-box;
  color: #fff;
  display: flex;
  flex-direction: column;
}

.Toastify__toast-container--top-left {
  top: var(--toastify-toast-top);
  left: var(--toastify-toast-left);
}
.Toastify__toast-container--top-center {
  top: var(--toastify-toast-top);
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
}
.Toastify__toast-container--top-right {
  top: var(--toastify-toast-top);
  right: var(--toastify-toast-right);
  align-items: end;
}
.Toastify__toast-container--bottom-left {
  bottom: var(--toastify-toast-bottom);
  left: var(--toastify-toast-left);
}
.Toastify__toast-container--bottom-center {
  bottom: var(--toastify-toast-bottom);
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
}
.Toastify__toast-container--bottom-right {
  bottom: var(--toastify-toast-bottom);
  right: var(--toastify-toast-right);
  align-items: end;
}

.Toastify__toast {
  --y: 0px;
  position: relative;
  touch-action: none;
  width: var(--toastify-toast-width);
  min-height: var(--toastify-toast-min-height);
  box-sizing: border-box;
  margin-bottom: 1rem;
  padding: var(--toastify-toast-padding);
  border-radius: var(--toastify-toast-bd-radius);
  box-shadow: var(--toastify-toast-shadow);
  max-height: var(--toastify-toast-max-height);
  font-family: var(--toastify-font-family);
  /* webkit only issue #791 */
  z-index: 0;
  /* inner swag */
  display: flex;
  flex: 1 auto;
  align-items: center;
  word-break: break-word;
}

@media only screen and (max-width: 480px) {
  .Toastify__toast-container {
    width: 100vw;
    left: env(safe-area-inset-left);
    margin: 0;
  }
  .Toastify__toast-container--top-left,
  .Toastify__toast-container--top-center,
  .Toastify__toast-container--top-right {
    top: env(safe-area-inset-top);
    transform: translateX(0);
  }
  .Toastify__toast-container--bottom-left,
  .Toastify__toast-container--bottom-center,
  .Toastify__toast-container--bottom-right {
    bottom: env(safe-area-inset-bottom);
    transform: translateX(0);
  }
  .Toastify__toast-container--rtl {
    right: env(safe-area-inset-right);
    left: initial;
  }
  .Toastify__toast {
    --toastify-toast-width: 100%;
    margin-bottom: 0;
    border-radius: 0;
  }
}

.Toastify__toast-container[data-stacked='true'] {
  width: var(--toastify-toast-width);
}

@media only screen and (max-width: 480px) {
  .Toastify__toast-container[data-stacked='true'] {
    width: 100vw;
  }
}

.Toastify__toast--stacked {
  position: absolute;
  width: 100%;
  transform: translate3d(0, var(--y), 0) scale(var(--s));
  transition: transform 0.3s;
}

.Toastify__toast--stacked[data-collapsed] .Toastify__toast-body,
.Toastify__toast--stacked[data-collapsed] .Toastify__close-button {
  transition: opacity 0.1s;
}

.Toastify__toast--stacked[data-collapsed='false'] {
  overflow: visible;
}

.Toastify__toast--stacked[data-collapsed='true']:not(:last-child) > * {
  opacity: 0;
}

.Toastify__toast--stacked:after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: calc(var(--g) * 1px);
  bottom: 100%;
}

.Toastify__toast--stacked[data-pos='top'] {
  top: 0;
}

.Toastify__toast--stacked[data-pos='bot'] {
  bottom: 0;
}

.Toastify__toast--stacked[data-pos='bot'].Toastify__toast--stacked:before {
  transform-origin: top;
}

.Toastify__toast--stacked[data-pos='top'].Toastify__toast--stacked:before {
  transform-origin: bottom;
}

.Toastify__toast--stacked:before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  transform: scaleY(3);
  z-index: -1;
}

.Toastify__toast--rtl {
  direction: rtl;
}

.Toastify__toast--close-on-click {
  cursor: pointer;
}

.Toastify__toast-icon {
  margin-inline-end: 10px;
  width: 22px;
  flex-shrink: 0;
  display: flex;
}

.Toastify--animate {
  animation-fill-mode: both;
  animation-duration: 0.5s;
}

.Toastify--animate-icon {
  animation-fill-mode: both;
  animation-duration: 0.3s;
}

.Toastify__toast-theme--dark {
  background: var(--toastify-color-dark);
  color: var(--toastify-text-color-dark);
}

.Toastify__toast-theme--light {
  background: var(--toastify-color-light);
  color: var(--toastify-text-color-light);
}

.Toastify__toast-theme--colored.Toastify__toast--default {
  background: var(--toastify-color-light);
  color: var(--toastify-text-color-light);
}

.Toastify__toast-theme--colored.Toastify__toast--info {
  color: var(--toastify-text-color-info);
  background: var(--toastify-color-info);
}

.Toastify__toast-theme--colored.Toastify__toast--success {
  color: var(--toastify-text-color-success);
  background: var(--toastify-color-success);
}

.Toastify__toast-theme--colored.Toastify__toast--warning {
  color: var(--toastify-text-color-warning);
  background: var(--toastify-color-warning);
}

.Toastify__toast-theme--colored.Toastify__toast--error {
  color: var(--toastify-text-color-error);
  background: var(--toastify-color-error);
}

.Toastify__progress-bar-theme--light {
  background: var(--toastify-color-progress-light);
}

.Toastify__progress-bar-theme--dark {
  background: var(--toastify-color-progress-dark);
}

.Toastify__progress-bar--info {
  background: var(--toastify-color-progress-info);
}

.Toastify__progress-bar--success {
  background: var(--toastify-color-progress-success);
}

.Toastify__progress-bar--warning {
  background: var(--toastify-color-progress-warning);
}

.Toastify__progress-bar--error {
  background: var(--toastify-color-progress-error);
}

.Toastify__progress-bar-theme--colored.Toastify__progress-bar--info,
.Toastify__progress-bar-theme--colored.Toastify__progress-bar--success,
.Toastify__progress-bar-theme--colored.Toastify__progress-bar--warning,
.Toastify__progress-bar-theme--colored.Toastify__progress-bar--error {
  background: var(--toastify-color-transparent);
}

.Toastify__close-button {
  color: #fff;
  position: absolute;
  top: 6px;
  right: 6px;
  background: transparent;
  outline: none;
  border: none;
  padding: 0;
  cursor: pointer;
  opacity: 0.7;
  transition: 0.3s ease;
  z-index: 1;
}

.Toastify__toast--rtl .Toastify__close-button {
  left: 6px;
  right: unset;
}

.Toastify__close-button--light {
  color: #000;
  opacity: 0.3;
}

.Toastify__close-button > svg {
  fill: currentColor;
  height: 16px;
  width: 14px;
}

.Toastify__close-button:hover,
.Toastify__close-button:focus {
  opacity: 1;
}

@keyframes Toastify__trackProgress {
  0% {
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(0);
  }
}

.Toastify__progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0.7;
  transform-origin: left;
}

.Toastify__progress-bar--animated {
  animation: Toastify__trackProgress linear 1 forwards;
}

.Toastify__progress-bar--controlled {
  transition: transform 0.2s;
}

.Toastify__progress-bar--rtl {
  right: 0;
  left: initial;
  transform-origin: right;
  border-bottom-left-radius: initial;
}

.Toastify__progress-bar--wrp {
  position: absolute;
  overflow: hidden;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5px;
  border-bottom-left-radius: var(--toastify-toast-bd-radius);
  border-bottom-right-radius: var(--toastify-toast-bd-radius);
}

.Toastify__progress-bar--wrp[data-hidden='true'] {
  opacity: 0;
}

.Toastify__progress-bar--bg {
  opacity: var(--toastify-color-progress-bgo);
  width: 100%;
  height: 100%;
}

.Toastify__spinner {
  width: 20px;
  height: 20px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: var(--toastify-spinner-color-empty-area);
  border-right-color: var(--toastify-spinner-color);
  animation: Toastify__spin 0.65s linear infinite;
}

@keyframes Toastify__bounceInRight {
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  from {
    opacity: 0;
    transform: translate3d(3000px, 0, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(-25px, 0, 0);
  }
  75% {
    transform: translate3d(10px, 0, 0);
  }
  90% {
    transform: translate3d(-5px, 0, 0);
  }
  to {
    transform: none;
  }
}

@keyframes Toastify__bounceOutRight {
  20% {
    opacity: 1;
    transform: translate3d(-20px, var(--y), 0);
  }
  to {
    opacity: 0;
    transform: translate3d(2000px, var(--y), 0);
  }
}

@keyframes Toastify__bounceInLeft {
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    opacity: 0;
    transform: translate3d(-3000px, 0, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(25px, 0, 0);
  }
  75% {
    transform: translate3d(-10px, 0, 0);
  }
  90% {
    transform: translate3d(5px, 0, 0);
  }
  to {
    transform: none;
  }
}

@keyframes Toastify__bounceOutLeft {
  20% {
    opacity: 1;
    transform: translate3d(20px, var(--y), 0);
  }
  to {
    opacity: 0;
    transform: translate3d(-2000px, var(--y), 0);
  }
}

@keyframes Toastify__bounceInUp {
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  from {
    opacity: 0;
    transform: translate3d(0, 3000px, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(0, -20px, 0);
  }
  75% {
    transform: translate3d(0, 10px, 0);
  }
  90% {
    transform: translate3d(0, -5px, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}

@keyframes Toastify__bounceOutUp {
  20% {
    transform: translate3d(0, calc(var(--y) - 10px), 0);
  }
  40%,
  45% {
    opacity: 1;
    transform: translate3d(0, calc(var(--y) + 20px), 0);
  }
  to {
    opacity: 0;
    transform: translate3d(0, -2000px, 0);
  }
}

@keyframes Toastify__bounceInDown {
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    opacity: 0;
    transform: translate3d(0, -3000px, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(0, 25px, 0);
  }
  75% {
    transform: translate3d(0, -10px, 0);
  }
  90% {
    transform: translate3d(0, 5px, 0);
  }
  to {
    transform: none;
  }
}

@keyframes Toastify__bounceOutDown {
  20% {
    transform: translate3d(0, calc(var(--y) - 10px), 0);
  }
  40%,
  45% {
    opacity: 1;
    transform: translate3d(0, calc(var(--y) + 20px), 0);
  }
  to {
    opacity: 0;
    transform: translate3d(0, 2000px, 0);
  }
}

.Toastify__bounce-enter--top-left,
.Toastify__bounce-enter--bottom-left {
  animation-name: Toastify__bounceInLeft;
}

.Toastify__bounce-enter--top-right,
.Toastify__bounce-enter--bottom-right {
  animation-name: Toastify__bounceInRight;
}

.Toastify__bounce-enter--top-center {
  animation-name: Toastify__bounceInDown;
}

.Toastify__bounce-enter--bottom-center {
  animation-name: Toastify__bounceInUp;
}

.Toastify__bounce-exit--top-left,
.Toastify__bounce-exit--bottom-left {
  animation-name: Toastify__bounceOutLeft;
}

.Toastify__bounce-exit--top-right,
.Toastify__bounce-exit--bottom-right {
  animation-name: Toastify__bounceOutRight;
}

.Toastify__bounce-exit--top-center {
  animation-name: Toastify__bounceOutUp;
}

.Toastify__bounce-exit--bottom-center {
  animation-name: Toastify__bounceOutDown;
}

@keyframes Toastify__zoomIn {
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
  50% {
    opacity: 1;
  }
}

@keyframes Toastify__zoomOut {
  from {
    opacity: 1;
  }
  50% {
    opacity: 0;
    transform: translate3d(0, var(--y), 0) scale3d(0.3, 0.3, 0.3);
  }
  to {
    opacity: 0;
  }
}

.Toastify__zoom-enter {
  animation-name: Toastify__zoomIn;
}

.Toastify__zoom-exit {
  animation-name: Toastify__zoomOut;
}

@keyframes Toastify__flipIn {
  from {
    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    animation-timing-function: ease-in;
    opacity: 0;
  }
  40% {
    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    animation-timing-function: ease-in;
  }
  60% {
    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
    opacity: 1;
  }
  80% {
    transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
  }
  to {
    transform: perspective(400px);
  }
}

@keyframes Toastify__flipOut {
  from {
    transform: translate3d(0, var(--y), 0) perspective(400px);
  }
  30% {
    transform: translate3d(0, var(--y), 0) perspective(400px) rotate3d(1, 0, 0, -20deg);
    opacity: 1;
  }
  to {
    transform: translate3d(0, var(--y), 0) perspective(400px) rotate3d(1, 0, 0, 90deg);
    opacity: 0;
  }
}

.Toastify__flip-enter {
  animation-name: Toastify__flipIn;
}

.Toastify__flip-exit {
  animation-name: Toastify__flipOut;
}

@keyframes Toastify__slideInRight {
  from {
    transform: translate3d(110%, 0, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, var(--y), 0);
  }
}

@keyframes Toastify__slideInLeft {
  from {
    transform: translate3d(-110%, 0, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, var(--y), 0);
  }
}

@keyframes Toastify__slideInUp {
  from {
    transform: translate3d(0, 110%, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, var(--y), 0);
  }
}

@keyframes Toastify__slideInDown {
  from {
    transform: translate3d(0, -110%, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, var(--y), 0);
  }
}

@keyframes Toastify__slideOutRight {
  from {
    transform: translate3d(0, var(--y), 0);
  }
  to {
    visibility: hidden;
    transform: translate3d(110%, var(--y), 0);
  }
}

@keyframes Toastify__slideOutLeft {
  from {
    transform: translate3d(0, var(--y), 0);
  }
  to {
    visibility: hidden;
    transform: translate3d(-110%, var(--y), 0);
  }
}

@keyframes Toastify__slideOutDown {
  from {
    transform: translate3d(0, var(--y), 0);
  }
  to {
    visibility: hidden;
    transform: translate3d(0, 500px, 0);
  }
}

@keyframes Toastify__slideOutUp {
  from {
    transform: translate3d(0, var(--y), 0);
  }
  to {
    visibility: hidden;
    transform: translate3d(0, -500px, 0);
  }
}

.Toastify__slide-enter--top-left,
.Toastify__slide-enter--bottom-left {
  animation-name: Toastify__slideInLeft;
}

.Toastify__slide-enter--top-right,
.Toastify__slide-enter--bottom-right {
  animation-name: Toastify__slideInRight;
}

.Toastify__slide-enter--top-center {
  animation-name: Toastify__slideInDown;
}

.Toastify__slide-enter--bottom-center {
  animation-name: Toastify__slideInUp;
}

.Toastify__slide-exit--top-left,
.Toastify__slide-exit--bottom-left {
  animation-name: Toastify__slideOutLeft;
  animation-timing-function: ease-in;
  animation-duration: 0.3s;
}

.Toastify__slide-exit--top-right,
.Toastify__slide-exit--bottom-right {
  animation-name: Toastify__slideOutRight;
  animation-timing-function: ease-in;
  animation-duration: 0.3s;
}

.Toastify__slide-exit--top-center {
  animation-name: Toastify__slideOutUp;
  animation-timing-function: ease-in;
  animation-duration: 0.3s;
}

.Toastify__slide-exit--bottom-center {
  animation-name: Toastify__slideOutDown;
  animation-timing-function: ease-in;
  animation-duration: 0.3s;
}

@keyframes Toastify__spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
`,uo=new Map,Zc=(t,e)=>{Jn(()=>{if(typeof document>"u")return;let o=document,n=uo.get(o);if(n){e&&n.setAttribute("nonce",e);return}let r=o.createElement("style");r.textContent=t,e&&r.setAttribute("nonce",e),o.head.appendChild(r),uo.set(o,r)},[e])};function Jc(t){return Zc(Qc,t.nonce),P.createElement(qc,{...t})}function eu(){const t=N.c(8),{props:e}=we();let o;t[0]!==e.flash?(o=e.flash||{},t[0]=e.flash,t[1]=o):o=t[1];const n=o;let r;t[2]!==n.error||t[3]!==n.success?(r=()=>{n.success&&D.success(n.success,{toastId:`success-${n.success}`}),n.error&&D.error(n.error,{toastId:`error-${n.error}`})},t[2]=n.error,t[3]=n.success,t[4]=r):r=t[4];let a;t[5]!==n?(a=[n],t[5]=n,t[6]=a):a=t[6],c.useEffect(r,a);let s;return t[7]===Symbol.for("react.memo_cache_sentinel")?(s=l.jsx(Jc,{position:"top-right",autoClose:5500,hideProgressBar:!1,newestOnTop:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!0,theme:"light"}),t[7]=s):s=t[7],s}const yu=({children:t,breadcrumbs:e,recentOrders:o,...n})=>{const[r,a]=c.useState([]);return c.useEffect(()=>{const s=async()=>{try{const u=await nr.get("/cpanel/dashboard/recent-orders");a(u.data.recentOrders||[])}catch(u){console.error("Failed fetch recent orders",u)}};s();const i=setInterval(s,1e4);return()=>clearInterval(i)},[]),l.jsxs(l.Fragment,{children:[l.jsx(eu,{}),l.jsx(hc,{breadcrumbs:e,recentOrders:r||o,...n,children:t})]})};export{yu as A,Ji as B,Ti as C,Ol as D,Tt as F,Ri as K,Di as M,Da as O,Ot as P,St as R,Ki as S,La as T,no as U,vu as W,Ll as a,$l as b,ft as c,go as d,Co as e,wi as f,$a as g,jo as h,Aa as i,Oa as j,Fa as k,gu as l,Pa as m,mu as n,Fi as o,za as r,_o as u};
