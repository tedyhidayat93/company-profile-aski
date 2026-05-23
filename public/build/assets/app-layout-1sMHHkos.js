import{r as u,j as c,b as $,t as Mo,R as rs,f as as,e as ss,c as P,a as Ve,L as _e,d as is,g as ls}from"./app-Ce52WIBy.js";import{u as G,b as mt,d as vn,e as cs,a as Y,c as D,g as Ao,B as us,h as ds,i as Ce}from"./image-DNe_ejSL.js";import{b as ye,d as he,u as Xe,c as I,P as ie,e as fs,a as ps}from"./index-WGKQCNNH.js";import{P as H,d as Oo}from"./index-DE_Vlytv.js";import{X as ms}from"./x-CRJq8dTM.js";import{C as Vn}from"./chevron-down-CYJLM1Sn.js";import{b as hs,d as gs}from"./index-yf8TppwC.js";import{U as vs,S as ys}from"./user-ow85by3I.js";import{u as bs}from"./config-B7d5w7XZ.js";import{F as xs}from"./file-text-B5_iioW2.js";import{T as ws,F as _s}from"./tag-B6Gge-5i.js";import{S as Cs}from"./star-Db4nC5Mo.js";var Es=Object.freeze({position:"absolute",border:0,width:1,height:1,padding:0,margin:-1,overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",wordWrap:"normal"}),Ts="VisuallyHidden",Io=u.forwardRef((t,e)=>c.jsx(H.span,{...t,ref:e,style:{...Es,...t.style}}));Io.displayName=Ts;var Ss=Io;function ko(t){const e=t+"CollectionProvider",[n,o]=ye(e),[r,a]=n(e,{collectionRef:{current:null},itemMap:new Map}),s=h=>{const{scope:v,children:b}=h,x=$.useRef(null),_=$.useRef(new Map).current;return c.jsx(r,{scope:v,itemMap:_,collectionRef:x,children:b})};s.displayName=e;const i=t+"CollectionSlot",l=mt(i),d=$.forwardRef((h,v)=>{const{scope:b,children:x}=h,_=a(i,b),w=G(v,_.collectionRef);return c.jsx(l,{ref:w,children:x})});d.displayName=i;const f=t+"CollectionItemSlot",p="data-radix-collection-item",m=mt(f),g=$.forwardRef((h,v)=>{const{scope:b,children:x,..._}=h,w=$.useRef(null),E=G(v,w),T=a(f,b);return $.useEffect(()=>(T.itemMap.set(w,{ref:w,..._}),()=>{T.itemMap.delete(w)})),c.jsx(m,{[p]:"",ref:E,children:x})});g.displayName=f;function y(h){const v=a(t+"CollectionConsumer",h);return $.useCallback(()=>{const x=v.collectionRef.current;if(!x)return[];const _=Array.from(x.querySelectorAll(`[${p}]`));return Array.from(v.itemMap.values()).sort((T,C)=>_.indexOf(T.ref.current)-_.indexOf(C.ref.current))},[v.collectionRef,v.itemMap])}return[{Provider:s,Slot:d,ItemSlot:g},y,o]}var Rs=Mo[" useId ".trim().toString()]||(()=>{}),Ns=0;function me(t){const[e,n]=u.useState(Rs());return he(()=>{n(o=>o??String(Ns++))},[t]),t||(e?`radix-${e}`:"")}var Et="Collapsible",[Ps]=ye(Et),[Ms,yn]=Ps(Et),Do=u.forwardRef((t,e)=>{const{__scopeCollapsible:n,open:o,defaultOpen:r,disabled:a,onOpenChange:s,...i}=t,[l,d]=Xe({prop:o,defaultProp:r??!1,onChange:s,caller:Et});return c.jsx(Ms,{scope:n,disabled:a,contentId:me(),open:l,onOpenToggle:u.useCallback(()=>d(f=>!f),[d]),children:c.jsx(H.div,{"data-state":xn(l),"data-disabled":a?"":void 0,...i,ref:e})})});Do.displayName=Et;var jo="CollapsibleTrigger",Lo=u.forwardRef((t,e)=>{const{__scopeCollapsible:n,...o}=t,r=yn(jo,n);return c.jsx(H.button,{type:"button","aria-controls":r.contentId,"aria-expanded":r.open||!1,"data-state":xn(r.open),"data-disabled":r.disabled?"":void 0,disabled:r.disabled,...o,ref:e,onClick:I(t.onClick,r.onOpenToggle)})});Lo.displayName=jo;var bn="CollapsibleContent",$o=u.forwardRef((t,e)=>{const{forceMount:n,...o}=t,r=yn(bn,t.__scopeCollapsible);return c.jsx(ie,{present:n||r.open,children:({present:a})=>c.jsx(As,{...o,ref:e,present:a})})});$o.displayName=bn;var As=u.forwardRef((t,e)=>{const{__scopeCollapsible:n,present:o,children:r,...a}=t,s=yn(bn,n),[i,l]=u.useState(o),d=u.useRef(null),f=G(e,d),p=u.useRef(0),m=p.current,g=u.useRef(0),y=g.current,h=s.open||i,v=u.useRef(h),b=u.useRef(void 0);return u.useEffect(()=>{const x=requestAnimationFrame(()=>v.current=!1);return()=>cancelAnimationFrame(x)},[]),he(()=>{const x=d.current;if(x){b.current=b.current||{transitionDuration:x.style.transitionDuration,animationName:x.style.animationName},x.style.transitionDuration="0s",x.style.animationName="none";const _=x.getBoundingClientRect();p.current=_.height,g.current=_.width,v.current||(x.style.transitionDuration=b.current.transitionDuration,x.style.animationName=b.current.animationName),l(o)}},[s.open,o]),c.jsx(H.div,{"data-state":xn(s.open),"data-disabled":s.disabled?"":void 0,id:s.contentId,hidden:!h,...a,ref:f,style:{"--radix-collapsible-content-height":m?`${m}px`:void 0,"--radix-collapsible-content-width":y?`${y}px`:void 0,...t.style},children:h&&r})});function xn(t){return t?"open":"closed"}var Os=Do,Is=u.createContext(void 0);function Fo(t){const e=u.useContext(Is);return t||e||"ltr"}function se(t){const e=u.useRef(t);return u.useEffect(()=>{e.current=t}),u.useMemo(()=>(...n)=>e.current?.(...n),[])}function ks(t,e=globalThis?.document){const n=se(t);u.useEffect(()=>{const o=r=>{r.key==="Escape"&&n(r)};return e.addEventListener("keydown",o,{capture:!0}),()=>e.removeEventListener("keydown",o,{capture:!0})},[n,e])}var Ds="DismissableLayer",on="dismissableLayer.update",js="dismissableLayer.pointerDownOutside",Ls="dismissableLayer.focusOutside",Xn,Bo=u.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set}),Tt=u.forwardRef((t,e)=>{const{disableOutsidePointerEvents:n=!1,onEscapeKeyDown:o,onPointerDownOutside:r,onFocusOutside:a,onInteractOutside:s,onDismiss:i,...l}=t,d=u.useContext(Bo),[f,p]=u.useState(null),m=f?.ownerDocument??globalThis?.document,[,g]=u.useState({}),y=G(e,C=>p(C)),h=Array.from(d.layers),[v]=[...d.layersWithOutsidePointerEventsDisabled].slice(-1),b=h.indexOf(v),x=f?h.indexOf(f):-1,_=d.layersWithOutsidePointerEventsDisabled.size>0,w=x>=b,E=Bs(C=>{const S=C.target,N=[...d.branches].some(R=>R.contains(S));!w||N||(r?.(C),s?.(C),C.defaultPrevented||i?.())},m),T=zs(C=>{const S=C.target;[...d.branches].some(R=>R.contains(S))||(a?.(C),s?.(C),C.defaultPrevented||i?.())},m);return ks(C=>{x===d.layers.size-1&&(o?.(C),!C.defaultPrevented&&i&&(C.preventDefault(),i()))},m),u.useEffect(()=>{if(f)return n&&(d.layersWithOutsidePointerEventsDisabled.size===0&&(Xn=m.body.style.pointerEvents,m.body.style.pointerEvents="none"),d.layersWithOutsidePointerEventsDisabled.add(f)),d.layers.add(f),Yn(),()=>{n&&d.layersWithOutsidePointerEventsDisabled.size===1&&(m.body.style.pointerEvents=Xn)}},[f,m,n,d]),u.useEffect(()=>()=>{f&&(d.layers.delete(f),d.layersWithOutsidePointerEventsDisabled.delete(f),Yn())},[f,d]),u.useEffect(()=>{const C=()=>g({});return document.addEventListener(on,C),()=>document.removeEventListener(on,C)},[]),c.jsx(H.div,{...l,ref:y,style:{pointerEvents:_?w?"auto":"none":void 0,...t.style},onFocusCapture:I(t.onFocusCapture,T.onFocusCapture),onBlurCapture:I(t.onBlurCapture,T.onBlurCapture),onPointerDownCapture:I(t.onPointerDownCapture,E.onPointerDownCapture)})});Tt.displayName=Ds;var $s="DismissableLayerBranch",Fs=u.forwardRef((t,e)=>{const n=u.useContext(Bo),o=u.useRef(null),r=G(e,o);return u.useEffect(()=>{const a=o.current;if(a)return n.branches.add(a),()=>{n.branches.delete(a)}},[n.branches]),c.jsx(H.div,{...t,ref:r})});Fs.displayName=$s;function Bs(t,e=globalThis?.document){const n=se(t),o=u.useRef(!1),r=u.useRef(()=>{});return u.useEffect(()=>{const a=i=>{if(i.target&&!o.current){let l=function(){zo(js,n,d,{discrete:!0})};const d={originalEvent:i};i.pointerType==="touch"?(e.removeEventListener("click",r.current),r.current=l,e.addEventListener("click",r.current,{once:!0})):l()}else e.removeEventListener("click",r.current);o.current=!1},s=window.setTimeout(()=>{e.addEventListener("pointerdown",a)},0);return()=>{window.clearTimeout(s),e.removeEventListener("pointerdown",a),e.removeEventListener("click",r.current)}},[e,n]),{onPointerDownCapture:()=>o.current=!0}}function zs(t,e=globalThis?.document){const n=se(t),o=u.useRef(!1);return u.useEffect(()=>{const r=a=>{a.target&&!o.current&&zo(Ls,n,{originalEvent:a},{discrete:!1})};return e.addEventListener("focusin",r),()=>e.removeEventListener("focusin",r)},[e,n]),{onFocusCapture:()=>o.current=!0,onBlurCapture:()=>o.current=!1}}function Yn(){const t=new CustomEvent(on);document.dispatchEvent(t)}function zo(t,e,n,{discrete:o}){const r=n.originalEvent.target,a=new CustomEvent(t,{bubbles:!1,cancelable:!0,detail:n});e&&r.addEventListener(t,e,{once:!0}),o?Oo(r,a):r.dispatchEvent(a)}var Ht="focusScope.autoFocusOnMount",Ut="focusScope.autoFocusOnUnmount",qn={bubbles:!1,cancelable:!0},Ws="FocusScope",wn=u.forwardRef((t,e)=>{const{loop:n=!1,trapped:o=!1,onMountAutoFocus:r,onUnmountAutoFocus:a,...s}=t,[i,l]=u.useState(null),d=se(r),f=se(a),p=u.useRef(null),m=G(e,h=>l(h)),g=u.useRef({paused:!1,pause(){this.paused=!0},resume(){this.paused=!1}}).current;u.useEffect(()=>{if(o){let h=function(_){if(g.paused||!i)return;const w=_.target;i.contains(w)?p.current=w:pe(p.current,{select:!0})},v=function(_){if(g.paused||!i)return;const w=_.relatedTarget;w!==null&&(i.contains(w)||pe(p.current,{select:!0}))},b=function(_){if(document.activeElement===document.body)for(const E of _)E.removedNodes.length>0&&pe(i)};document.addEventListener("focusin",h),document.addEventListener("focusout",v);const x=new MutationObserver(b);return i&&x.observe(i,{childList:!0,subtree:!0}),()=>{document.removeEventListener("focusin",h),document.removeEventListener("focusout",v),x.disconnect()}}},[o,i,g.paused]),u.useEffect(()=>{if(i){Qn.add(g);const h=document.activeElement;if(!i.contains(h)){const b=new CustomEvent(Ht,qn);i.addEventListener(Ht,d),i.dispatchEvent(b),b.defaultPrevented||(Hs(Xs(Wo(i)),{select:!0}),document.activeElement===h&&pe(i))}return()=>{i.removeEventListener(Ht,d),setTimeout(()=>{const b=new CustomEvent(Ut,qn);i.addEventListener(Ut,f),i.dispatchEvent(b),b.defaultPrevented||pe(h??document.body,{select:!0}),i.removeEventListener(Ut,f),Qn.remove(g)},0)}}},[i,d,f,g]);const y=u.useCallback(h=>{if(!n&&!o||g.paused)return;const v=h.key==="Tab"&&!h.altKey&&!h.ctrlKey&&!h.metaKey,b=document.activeElement;if(v&&b){const x=h.currentTarget,[_,w]=Us(x);_&&w?!h.shiftKey&&b===w?(h.preventDefault(),n&&pe(_,{select:!0})):h.shiftKey&&b===_&&(h.preventDefault(),n&&pe(w,{select:!0})):b===x&&h.preventDefault()}},[n,o,g.paused]);return c.jsx(H.div,{tabIndex:-1,...s,ref:m,onKeyDown:y})});wn.displayName=Ws;function Hs(t,{select:e=!1}={}){const n=document.activeElement;for(const o of t)if(pe(o,{select:e}),document.activeElement!==n)return}function Us(t){const e=Wo(t),n=Zn(e,t),o=Zn(e.reverse(),t);return[n,o]}function Wo(t){const e=[],n=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT,{acceptNode:o=>{const r=o.tagName==="INPUT"&&o.type==="hidden";return o.disabled||o.hidden||r?NodeFilter.FILTER_SKIP:o.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});for(;n.nextNode();)e.push(n.currentNode);return e}function Zn(t,e){for(const n of t)if(!Gs(n,{upTo:e}))return n}function Gs(t,{upTo:e}){if(getComputedStyle(t).visibility==="hidden")return!0;for(;t;){if(e!==void 0&&t===e)return!1;if(getComputedStyle(t).display==="none")return!0;t=t.parentElement}return!1}function Ks(t){return t instanceof HTMLInputElement&&"select"in t}function pe(t,{select:e=!1}={}){if(t&&t.focus){const n=document.activeElement;t.focus({preventScroll:!0}),t!==n&&Ks(t)&&e&&t.select()}}var Qn=Vs();function Vs(){let t=[];return{add(e){const n=t[0];e!==n&&n?.pause(),t=Jn(t,e),t.unshift(e)},remove(e){t=Jn(t,e),t[0]?.resume()}}}function Jn(t,e){const n=[...t],o=n.indexOf(e);return o!==-1&&n.splice(o,1),n}function Xs(t){return t.filter(e=>e.tagName!=="A")}var Ys="Portal",St=u.forwardRef((t,e)=>{const{container:n,...o}=t,[r,a]=u.useState(!1);he(()=>a(!0),[]);const s=n||r&&globalThis?.document?.body;return s?rs.createPortal(c.jsx(H.div,{...o,ref:e}),s):null});St.displayName=Ys;var Gt=0;function Ho(){u.useEffect(()=>{const t=document.querySelectorAll("[data-radix-focus-guard]");return document.body.insertAdjacentElement("afterbegin",t[0]??eo()),document.body.insertAdjacentElement("beforeend",t[1]??eo()),Gt++,()=>{Gt===1&&document.querySelectorAll("[data-radix-focus-guard]").forEach(e=>e.remove()),Gt--}},[])}function eo(){const t=document.createElement("span");return t.setAttribute("data-radix-focus-guard",""),t.tabIndex=0,t.style.outline="none",t.style.opacity="0",t.style.position="fixed",t.style.pointerEvents="none",t}var oe=function(){return oe=Object.assign||function(e){for(var n,o=1,r=arguments.length;o<r;o++){n=arguments[o];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},oe.apply(this,arguments)};function Uo(t,e){var n={};for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&e.indexOf(o)<0&&(n[o]=t[o]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,o=Object.getOwnPropertySymbols(t);r<o.length;r++)e.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(t,o[r])&&(n[o[r]]=t[o[r]]);return n}function qs(t,e,n){if(n||arguments.length===2)for(var o=0,r=e.length,a;o<r;o++)(a||!(o in e))&&(a||(a=Array.prototype.slice.call(e,0,o)),a[o]=e[o]);return t.concat(a||Array.prototype.slice.call(e))}var ut="right-scroll-bar-position",dt="width-before-scroll-bar",Zs="with-scroll-bars-hidden",Qs="--removed-body-scroll-bar-size";function Kt(t,e){return typeof t=="function"?t(e):t&&(t.current=e),t}function Js(t,e){var n=u.useState(function(){return{value:t,callback:e,facade:{get current(){return n.value},set current(o){var r=n.value;r!==o&&(n.value=o,n.callback(o,r))}}}})[0];return n.callback=e,n.facade}var ei=typeof window<"u"?u.useLayoutEffect:u.useEffect,to=new WeakMap;function ti(t,e){var n=Js(null,function(o){return t.forEach(function(r){return Kt(r,o)})});return ei(function(){var o=to.get(n);if(o){var r=new Set(o),a=new Set(t),s=n.current;r.forEach(function(i){a.has(i)||Kt(i,null)}),a.forEach(function(i){r.has(i)||Kt(i,s)})}to.set(n,t)},[t]),n}function ni(t){return t}function oi(t,e){e===void 0&&(e=ni);var n=[],o=!1,r={read:function(){if(o)throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");return n.length?n[n.length-1]:t},useMedium:function(a){var s=e(a,o);return n.push(s),function(){n=n.filter(function(i){return i!==s})}},assignSyncMedium:function(a){for(o=!0;n.length;){var s=n;n=[],s.forEach(a)}n={push:function(i){return a(i)},filter:function(){return n}}},assignMedium:function(a){o=!0;var s=[];if(n.length){var i=n;n=[],i.forEach(a),s=n}var l=function(){var f=s;s=[],f.forEach(a)},d=function(){return Promise.resolve().then(l)};d(),n={push:function(f){s.push(f),d()},filter:function(f){return s=s.filter(f),n}}}};return r}function ri(t){t===void 0&&(t={});var e=oi(null);return e.options=oe({async:!0,ssr:!1},t),e}var Go=function(t){var e=t.sideCar,n=Uo(t,["sideCar"]);if(!e)throw new Error("Sidecar: please provide `sideCar` property to import the right car");var o=e.read();if(!o)throw new Error("Sidecar medium not found");return u.createElement(o,oe({},n))};Go.isSideCarExport=!0;function ai(t,e){return t.useMedium(e),Go}var Ko=ri(),Vt=function(){},Rt=u.forwardRef(function(t,e){var n=u.useRef(null),o=u.useState({onScrollCapture:Vt,onWheelCapture:Vt,onTouchMoveCapture:Vt}),r=o[0],a=o[1],s=t.forwardProps,i=t.children,l=t.className,d=t.removeScrollBar,f=t.enabled,p=t.shards,m=t.sideCar,g=t.noRelative,y=t.noIsolation,h=t.inert,v=t.allowPinchZoom,b=t.as,x=b===void 0?"div":b,_=t.gapMode,w=Uo(t,["forwardProps","children","className","removeScrollBar","enabled","shards","sideCar","noRelative","noIsolation","inert","allowPinchZoom","as","gapMode"]),E=m,T=ti([n,e]),C=oe(oe({},w),r);return u.createElement(u.Fragment,null,f&&u.createElement(E,{sideCar:Ko,removeScrollBar:d,shards:p,noRelative:g,noIsolation:y,inert:h,setCallbacks:a,allowPinchZoom:!!v,lockRef:n,gapMode:_}),s?u.cloneElement(u.Children.only(i),oe(oe({},C),{ref:T})):u.createElement(x,oe({},C,{className:l,ref:T}),i))});Rt.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1};Rt.classNames={fullWidth:dt,zeroRight:ut};var si=function(){if(typeof __webpack_nonce__<"u")return __webpack_nonce__};function ii(){if(!document)return null;var t=document.createElement("style");t.type="text/css";var e=si();return e&&t.setAttribute("nonce",e),t}function li(t,e){t.styleSheet?t.styleSheet.cssText=e:t.appendChild(document.createTextNode(e))}function ci(t){var e=document.head||document.getElementsByTagName("head")[0];e.appendChild(t)}var ui=function(){var t=0,e=null;return{add:function(n){t==0&&(e=ii())&&(li(e,n),ci(e)),t++},remove:function(){t--,!t&&e&&(e.parentNode&&e.parentNode.removeChild(e),e=null)}}},di=function(){var t=ui();return function(e,n){u.useEffect(function(){return t.add(e),function(){t.remove()}},[e&&n])}},Vo=function(){var t=di(),e=function(n){var o=n.styles,r=n.dynamic;return t(o,r),null};return e},fi={left:0,top:0,right:0,gap:0},Xt=function(t){return parseInt(t||"",10)||0},pi=function(t){var e=window.getComputedStyle(document.body),n=e[t==="padding"?"paddingLeft":"marginLeft"],o=e[t==="padding"?"paddingTop":"marginTop"],r=e[t==="padding"?"paddingRight":"marginRight"];return[Xt(n),Xt(o),Xt(r)]},mi=function(t){if(t===void 0&&(t="margin"),typeof window>"u")return fi;var e=pi(t),n=document.documentElement.clientWidth,o=window.innerWidth;return{left:e[0],top:e[1],right:e[2],gap:Math.max(0,o-n+e[2]-e[0])}},hi=Vo(),Oe="data-scroll-locked",gi=function(t,e,n,o){var r=t.left,a=t.top,s=t.right,i=t.gap;return n===void 0&&(n="margin"),`
  .`.concat(Zs,` {
   overflow: hidden `).concat(o,`;
   padding-right: `).concat(i,"px ").concat(o,`;
  }
  body[`).concat(Oe,`] {
    overflow: hidden `).concat(o,`;
    overscroll-behavior: contain;
    `).concat([e&&"position: relative ".concat(o,";"),n==="margin"&&`
    padding-left: `.concat(r,`px;
    padding-top: `).concat(a,`px;
    padding-right: `).concat(s,`px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(i,"px ").concat(o,`;
    `),n==="padding"&&"padding-right: ".concat(i,"px ").concat(o,";")].filter(Boolean).join(""),`
  }
  
  .`).concat(ut,` {
    right: `).concat(i,"px ").concat(o,`;
  }
  
  .`).concat(dt,` {
    margin-right: `).concat(i,"px ").concat(o,`;
  }
  
  .`).concat(ut," .").concat(ut,` {
    right: 0 `).concat(o,`;
  }
  
  .`).concat(dt," .").concat(dt,` {
    margin-right: 0 `).concat(o,`;
  }
  
  body[`).concat(Oe,`] {
    `).concat(Qs,": ").concat(i,`px;
  }
`)},no=function(){var t=parseInt(document.body.getAttribute(Oe)||"0",10);return isFinite(t)?t:0},vi=function(){u.useEffect(function(){return document.body.setAttribute(Oe,(no()+1).toString()),function(){var t=no()-1;t<=0?document.body.removeAttribute(Oe):document.body.setAttribute(Oe,t.toString())}},[])},yi=function(t){var e=t.noRelative,n=t.noImportant,o=t.gapMode,r=o===void 0?"margin":o;vi();var a=u.useMemo(function(){return mi(r)},[r]);return u.createElement(hi,{styles:gi(a,!e,r,n?"":"!important")})},rn=!1;if(typeof window<"u")try{var at=Object.defineProperty({},"passive",{get:function(){return rn=!0,!0}});window.addEventListener("test",at,at),window.removeEventListener("test",at,at)}catch{rn=!1}var Pe=rn?{passive:!1}:!1,bi=function(t){return t.tagName==="TEXTAREA"},Xo=function(t,e){if(!(t instanceof Element))return!1;var n=window.getComputedStyle(t);return n[e]!=="hidden"&&!(n.overflowY===n.overflowX&&!bi(t)&&n[e]==="visible")},xi=function(t){return Xo(t,"overflowY")},wi=function(t){return Xo(t,"overflowX")},oo=function(t,e){var n=e.ownerDocument,o=e;do{typeof ShadowRoot<"u"&&o instanceof ShadowRoot&&(o=o.host);var r=Yo(t,o);if(r){var a=qo(t,o),s=a[1],i=a[2];if(s>i)return!0}o=o.parentNode}while(o&&o!==n.body);return!1},_i=function(t){var e=t.scrollTop,n=t.scrollHeight,o=t.clientHeight;return[e,n,o]},Ci=function(t){var e=t.scrollLeft,n=t.scrollWidth,o=t.clientWidth;return[e,n,o]},Yo=function(t,e){return t==="v"?xi(e):wi(e)},qo=function(t,e){return t==="v"?_i(e):Ci(e)},Ei=function(t,e){return t==="h"&&e==="rtl"?-1:1},Ti=function(t,e,n,o,r){var a=Ei(t,window.getComputedStyle(e).direction),s=a*o,i=n.target,l=e.contains(i),d=!1,f=s>0,p=0,m=0;do{if(!i)break;var g=qo(t,i),y=g[0],h=g[1],v=g[2],b=h-v-a*y;(y||b)&&Yo(t,i)&&(p+=b,m+=y);var x=i.parentNode;i=x&&x.nodeType===Node.DOCUMENT_FRAGMENT_NODE?x.host:x}while(!l&&i!==document.body||l&&(e.contains(i)||e===i));return(f&&Math.abs(p)<1||!f&&Math.abs(m)<1)&&(d=!0),d},st=function(t){return"changedTouches"in t?[t.changedTouches[0].clientX,t.changedTouches[0].clientY]:[0,0]},ro=function(t){return[t.deltaX,t.deltaY]},ao=function(t){return t&&"current"in t?t.current:t},Si=function(t,e){return t[0]===e[0]&&t[1]===e[1]},Ri=function(t){return`
  .block-interactivity-`.concat(t,` {pointer-events: none;}
  .allow-interactivity-`).concat(t,` {pointer-events: all;}
`)},Ni=0,Me=[];function Pi(t){var e=u.useRef([]),n=u.useRef([0,0]),o=u.useRef(),r=u.useState(Ni++)[0],a=u.useState(Vo)[0],s=u.useRef(t);u.useEffect(function(){s.current=t},[t]),u.useEffect(function(){if(t.inert){document.body.classList.add("block-interactivity-".concat(r));var h=qs([t.lockRef.current],(t.shards||[]).map(ao),!0).filter(Boolean);return h.forEach(function(v){return v.classList.add("allow-interactivity-".concat(r))}),function(){document.body.classList.remove("block-interactivity-".concat(r)),h.forEach(function(v){return v.classList.remove("allow-interactivity-".concat(r))})}}},[t.inert,t.lockRef.current,t.shards]);var i=u.useCallback(function(h,v){if("touches"in h&&h.touches.length===2||h.type==="wheel"&&h.ctrlKey)return!s.current.allowPinchZoom;var b=st(h),x=n.current,_="deltaX"in h?h.deltaX:x[0]-b[0],w="deltaY"in h?h.deltaY:x[1]-b[1],E,T=h.target,C=Math.abs(_)>Math.abs(w)?"h":"v";if("touches"in h&&C==="h"&&T.type==="range")return!1;var S=window.getSelection(),N=S&&S.anchorNode,R=N?N===T||N.contains(T):!1;if(R)return!1;var A=oo(C,T);if(!A)return!0;if(A?E=C:(E=C==="v"?"h":"v",A=oo(C,T)),!A)return!1;if(!o.current&&"changedTouches"in h&&(_||w)&&(o.current=E),!E)return!0;var k=o.current||E;return Ti(k,v,h,k==="h"?_:w)},[]),l=u.useCallback(function(h){var v=h;if(!(!Me.length||Me[Me.length-1]!==a)){var b="deltaY"in v?ro(v):st(v),x=e.current.filter(function(E){return E.name===v.type&&(E.target===v.target||v.target===E.shadowParent)&&Si(E.delta,b)})[0];if(x&&x.should){v.cancelable&&v.preventDefault();return}if(!x){var _=(s.current.shards||[]).map(ao).filter(Boolean).filter(function(E){return E.contains(v.target)}),w=_.length>0?i(v,_[0]):!s.current.noIsolation;w&&v.cancelable&&v.preventDefault()}}},[]),d=u.useCallback(function(h,v,b,x){var _={name:h,delta:v,target:b,should:x,shadowParent:Mi(b)};e.current.push(_),setTimeout(function(){e.current=e.current.filter(function(w){return w!==_})},1)},[]),f=u.useCallback(function(h){n.current=st(h),o.current=void 0},[]),p=u.useCallback(function(h){d(h.type,ro(h),h.target,i(h,t.lockRef.current))},[]),m=u.useCallback(function(h){d(h.type,st(h),h.target,i(h,t.lockRef.current))},[]);u.useEffect(function(){return Me.push(a),t.setCallbacks({onScrollCapture:p,onWheelCapture:p,onTouchMoveCapture:m}),document.addEventListener("wheel",l,Pe),document.addEventListener("touchmove",l,Pe),document.addEventListener("touchstart",f,Pe),function(){Me=Me.filter(function(h){return h!==a}),document.removeEventListener("wheel",l,Pe),document.removeEventListener("touchmove",l,Pe),document.removeEventListener("touchstart",f,Pe)}},[]);var g=t.removeScrollBar,y=t.inert;return u.createElement(u.Fragment,null,y?u.createElement(a,{styles:Ri(r)}):null,g?u.createElement(yi,{noRelative:t.noRelative,gapMode:t.gapMode}):null)}function Mi(t){for(var e=null;t!==null;)t instanceof ShadowRoot&&(e=t.host,t=t.host),t=t.parentNode;return e}const Ai=ai(Ko,Pi);var _n=u.forwardRef(function(t,e){return u.createElement(Rt,oe({},t,{ref:e,sideCar:Ai}))});_n.classNames=Rt.classNames;var Oi=function(t){if(typeof document>"u")return null;var e=Array.isArray(t)?t[0]:t;return e.ownerDocument.body},Ae=new WeakMap,it=new WeakMap,lt={},Yt=0,Zo=function(t){return t&&(t.host||Zo(t.parentNode))},Ii=function(t,e){return e.map(function(n){if(t.contains(n))return n;var o=Zo(n);return o&&t.contains(o)?o:(console.error("aria-hidden",n,"in not contained inside",t,". Doing nothing"),null)}).filter(function(n){return!!n})},ki=function(t,e,n,o){var r=Ii(e,Array.isArray(t)?t:[t]);lt[n]||(lt[n]=new WeakMap);var a=lt[n],s=[],i=new Set,l=new Set(r),d=function(p){!p||i.has(p)||(i.add(p),d(p.parentNode))};r.forEach(d);var f=function(p){!p||l.has(p)||Array.prototype.forEach.call(p.children,function(m){if(i.has(m))f(m);else try{var g=m.getAttribute(o),y=g!==null&&g!=="false",h=(Ae.get(m)||0)+1,v=(a.get(m)||0)+1;Ae.set(m,h),a.set(m,v),s.push(m),h===1&&y&&it.set(m,!0),v===1&&m.setAttribute(n,"true"),y||m.setAttribute(o,"true")}catch(b){console.error("aria-hidden: cannot operate on ",m,b)}})};return f(e),i.clear(),Yt++,function(){s.forEach(function(p){var m=Ae.get(p)-1,g=a.get(p)-1;Ae.set(p,m),a.set(p,g),m||(it.has(p)||p.removeAttribute(o),it.delete(p)),g||p.removeAttribute(n)}),Yt--,Yt||(Ae=new WeakMap,Ae=new WeakMap,it=new WeakMap,lt={})}},Qo=function(t,e,n){n===void 0&&(n="data-aria-hidden");var o=Array.from(Array.isArray(t)?t:[t]),r=Oi(t);return r?(o.push.apply(o,Array.from(r.querySelectorAll("[aria-live], script"))),ki(o,r,n,"aria-hidden")):function(){return null}},Nt="Dialog",[Jo,cm]=ye(Nt),[Di,te]=Jo(Nt),er=t=>{const{__scopeDialog:e,children:n,open:o,defaultOpen:r,onOpenChange:a,modal:s=!0}=t,i=u.useRef(null),l=u.useRef(null),[d,f]=Xe({prop:o,defaultProp:r??!1,onChange:a,caller:Nt});return c.jsx(Di,{scope:e,triggerRef:i,contentRef:l,contentId:me(),titleId:me(),descriptionId:me(),open:d,onOpenChange:f,onOpenToggle:u.useCallback(()=>f(p=>!p),[f]),modal:s,children:n})};er.displayName=Nt;var tr="DialogTrigger",nr=u.forwardRef((t,e)=>{const{__scopeDialog:n,...o}=t,r=te(tr,n),a=G(e,r.triggerRef);return c.jsx(H.button,{type:"button","aria-haspopup":"dialog","aria-expanded":r.open,"aria-controls":r.contentId,"data-state":Tn(r.open),...o,ref:a,onClick:I(t.onClick,r.onOpenToggle)})});nr.displayName=tr;var Cn="DialogPortal",[ji,or]=Jo(Cn,{forceMount:void 0}),rr=t=>{const{__scopeDialog:e,forceMount:n,children:o,container:r}=t,a=te(Cn,e);return c.jsx(ji,{scope:e,forceMount:n,children:u.Children.map(o,s=>c.jsx(ie,{present:n||a.open,children:c.jsx(St,{asChild:!0,container:r,children:s})}))})};rr.displayName=Cn;var ht="DialogOverlay",ar=u.forwardRef((t,e)=>{const n=or(ht,t.__scopeDialog),{forceMount:o=n.forceMount,...r}=t,a=te(ht,t.__scopeDialog);return a.modal?c.jsx(ie,{present:o||a.open,children:c.jsx($i,{...r,ref:e})}):null});ar.displayName=ht;var Li=mt("DialogOverlay.RemoveScroll"),$i=u.forwardRef((t,e)=>{const{__scopeDialog:n,...o}=t,r=te(ht,n);return c.jsx(_n,{as:Li,allowPinchZoom:!0,shards:[r.contentRef],children:c.jsx(H.div,{"data-state":Tn(r.open),...o,ref:e,style:{pointerEvents:"auto",...o.style}})})}),Ee="DialogContent",sr=u.forwardRef((t,e)=>{const n=or(Ee,t.__scopeDialog),{forceMount:o=n.forceMount,...r}=t,a=te(Ee,t.__scopeDialog);return c.jsx(ie,{present:o||a.open,children:a.modal?c.jsx(Fi,{...r,ref:e}):c.jsx(Bi,{...r,ref:e})})});sr.displayName=Ee;var Fi=u.forwardRef((t,e)=>{const n=te(Ee,t.__scopeDialog),o=u.useRef(null),r=G(e,n.contentRef,o);return u.useEffect(()=>{const a=o.current;if(a)return Qo(a)},[]),c.jsx(ir,{...t,ref:r,trapFocus:n.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:I(t.onCloseAutoFocus,a=>{a.preventDefault(),n.triggerRef.current?.focus()}),onPointerDownOutside:I(t.onPointerDownOutside,a=>{const s=a.detail.originalEvent,i=s.button===0&&s.ctrlKey===!0;(s.button===2||i)&&a.preventDefault()}),onFocusOutside:I(t.onFocusOutside,a=>a.preventDefault())})}),Bi=u.forwardRef((t,e)=>{const n=te(Ee,t.__scopeDialog),o=u.useRef(!1),r=u.useRef(!1);return c.jsx(ir,{...t,ref:e,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:a=>{t.onCloseAutoFocus?.(a),a.defaultPrevented||(o.current||n.triggerRef.current?.focus(),a.preventDefault()),o.current=!1,r.current=!1},onInteractOutside:a=>{t.onInteractOutside?.(a),a.defaultPrevented||(o.current=!0,a.detail.originalEvent.type==="pointerdown"&&(r.current=!0));const s=a.target;n.triggerRef.current?.contains(s)&&a.preventDefault(),a.detail.originalEvent.type==="focusin"&&r.current&&a.preventDefault()}})}),ir=u.forwardRef((t,e)=>{const{__scopeDialog:n,trapFocus:o,onOpenAutoFocus:r,onCloseAutoFocus:a,...s}=t,i=te(Ee,n),l=u.useRef(null),d=G(e,l);return Ho(),c.jsxs(c.Fragment,{children:[c.jsx(wn,{asChild:!0,loop:!0,trapped:o,onMountAutoFocus:r,onUnmountAutoFocus:a,children:c.jsx(Tt,{role:"dialog",id:i.contentId,"aria-describedby":i.descriptionId,"aria-labelledby":i.titleId,"data-state":Tn(i.open),...s,ref:d,onDismiss:()=>i.onOpenChange(!1)})}),c.jsxs(c.Fragment,{children:[c.jsx(zi,{titleId:i.titleId}),c.jsx(Hi,{contentRef:l,descriptionId:i.descriptionId})]})]})}),En="DialogTitle",lr=u.forwardRef((t,e)=>{const{__scopeDialog:n,...o}=t,r=te(En,n);return c.jsx(H.h2,{id:r.titleId,...o,ref:e})});lr.displayName=En;var cr="DialogDescription",ur=u.forwardRef((t,e)=>{const{__scopeDialog:n,...o}=t,r=te(cr,n);return c.jsx(H.p,{id:r.descriptionId,...o,ref:e})});ur.displayName=cr;var dr="DialogClose",fr=u.forwardRef((t,e)=>{const{__scopeDialog:n,...o}=t,r=te(dr,n);return c.jsx(H.button,{type:"button",...o,ref:e,onClick:I(t.onClick,()=>r.onOpenChange(!1))})});fr.displayName=dr;function Tn(t){return t?"open":"closed"}var pr="DialogTitleWarning",[um,mr]=fs(pr,{contentName:Ee,titleName:En,docsSlug:"dialog"}),zi=({titleId:t})=>{const e=mr(pr),n=`\`${e.contentName}\` requires a \`${e.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${e.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${e.docsSlug}`;return u.useEffect(()=>{t&&(document.getElementById(t)||console.error(n))},[n,t]),null},Wi="DialogDescriptionWarning",Hi=({contentRef:t,descriptionId:e})=>{const o=`Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${mr(Wi).contentName}}.`;return u.useEffect(()=>{const r=t.current?.getAttribute("aria-describedby");e&&r&&(document.getElementById(e)||console.warn(o))},[o,t,e]),null},Ui=er,dm=nr,Gi=rr,Ki=ar,Vi=sr,Xi=lr,Yi=ur,qi=fr,qt={exports:{}},Zt={};var so;function Zi(){if(so)return Zt;so=1;var t=as();function e(p,m){return p===m&&(p!==0||1/p===1/m)||p!==p&&m!==m}var n=typeof Object.is=="function"?Object.is:e,o=t.useState,r=t.useEffect,a=t.useLayoutEffect,s=t.useDebugValue;function i(p,m){var g=m(),y=o({inst:{value:g,getSnapshot:m}}),h=y[0].inst,v=y[1];return a(function(){h.value=g,h.getSnapshot=m,l(h)&&v({inst:h})},[p,g,m]),r(function(){return l(h)&&v({inst:h}),p(function(){l(h)&&v({inst:h})})},[p]),s(g),g}function l(p){var m=p.getSnapshot;p=p.value;try{var g=m();return!n(p,g)}catch{return!0}}function d(p,m){return m()}var f=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?d:i;return Zt.useSyncExternalStore=t.useSyncExternalStore!==void 0?t.useSyncExternalStore:f,Zt}var io;function Qi(){return io||(io=1,qt.exports=Zi()),qt.exports}var Ji=Qi();function el(){return Ji.useSyncExternalStore(tl,()=>!0,()=>!1)}function tl(){return()=>{}}const nl=["top","right","bottom","left"],ge=Math.min,q=Math.max,gt=Math.round,ct=Math.floor,ae=t=>({x:t,y:t}),ol={left:"right",right:"left",bottom:"top",top:"bottom"};function an(t,e,n){return q(t,ge(e,n))}function ce(t,e){return typeof t=="function"?t(e):t}function ue(t){return t.split("-")[0]}function je(t){return t.split("-")[1]}function Sn(t){return t==="x"?"y":"x"}function Rn(t){return t==="y"?"height":"width"}function re(t){const e=t[0];return e==="t"||e==="b"?"y":"x"}function Nn(t){return Sn(re(t))}function rl(t,e,n){n===void 0&&(n=!1);const o=je(t),r=Nn(t),a=Rn(r);let s=r==="x"?o===(n?"end":"start")?"right":"left":o==="start"?"bottom":"top";return e.reference[a]>e.floating[a]&&(s=vt(s)),[s,vt(s)]}function al(t){const e=vt(t);return[sn(t),e,sn(e)]}function sn(t){return t.includes("start")?t.replace("start","end"):t.replace("end","start")}const lo=["left","right"],co=["right","left"],sl=["top","bottom"],il=["bottom","top"];function ll(t,e,n){switch(t){case"top":case"bottom":return n?e?co:lo:e?lo:co;case"left":case"right":return e?sl:il;default:return[]}}function cl(t,e,n,o){const r=je(t);let a=ll(ue(t),n==="start",o);return r&&(a=a.map(s=>s+"-"+r),e&&(a=a.concat(a.map(sn)))),a}function vt(t){const e=ue(t);return ol[e]+t.slice(e.length)}function ul(t){return{top:0,right:0,bottom:0,left:0,...t}}function hr(t){return typeof t!="number"?ul(t):{top:t,right:t,bottom:t,left:t}}function yt(t){const{x:e,y:n,width:o,height:r}=t;return{width:o,height:r,top:n,left:e,right:e+o,bottom:n+r,x:e,y:n}}function uo(t,e,n){let{reference:o,floating:r}=t;const a=re(e),s=Nn(e),i=Rn(s),l=ue(e),d=a==="y",f=o.x+o.width/2-r.width/2,p=o.y+o.height/2-r.height/2,m=o[i]/2-r[i]/2;let g;switch(l){case"top":g={x:f,y:o.y-r.height};break;case"bottom":g={x:f,y:o.y+o.height};break;case"right":g={x:o.x+o.width,y:p};break;case"left":g={x:o.x-r.width,y:p};break;default:g={x:o.x,y:o.y}}switch(je(e)){case"start":g[s]-=m*(n&&d?-1:1);break;case"end":g[s]+=m*(n&&d?-1:1);break}return g}async function dl(t,e){var n;e===void 0&&(e={});const{x:o,y:r,platform:a,rects:s,elements:i,strategy:l}=t,{boundary:d="clippingAncestors",rootBoundary:f="viewport",elementContext:p="floating",altBoundary:m=!1,padding:g=0}=ce(e,t),y=hr(g),v=i[m?p==="floating"?"reference":"floating":p],b=yt(await a.getClippingRect({element:(n=await(a.isElement==null?void 0:a.isElement(v)))==null||n?v:v.contextElement||await(a.getDocumentElement==null?void 0:a.getDocumentElement(i.floating)),boundary:d,rootBoundary:f,strategy:l})),x=p==="floating"?{x:o,y:r,width:s.floating.width,height:s.floating.height}:s.reference,_=await(a.getOffsetParent==null?void 0:a.getOffsetParent(i.floating)),w=await(a.isElement==null?void 0:a.isElement(_))?await(a.getScale==null?void 0:a.getScale(_))||{x:1,y:1}:{x:1,y:1},E=yt(a.convertOffsetParentRelativeRectToViewportRelativeRect?await a.convertOffsetParentRelativeRectToViewportRelativeRect({elements:i,rect:x,offsetParent:_,strategy:l}):x);return{top:(b.top-E.top+y.top)/w.y,bottom:(E.bottom-b.bottom+y.bottom)/w.y,left:(b.left-E.left+y.left)/w.x,right:(E.right-b.right+y.right)/w.x}}const fl=50,pl=async(t,e,n)=>{const{placement:o="bottom",strategy:r="absolute",middleware:a=[],platform:s}=n,i=s.detectOverflow?s:{...s,detectOverflow:dl},l=await(s.isRTL==null?void 0:s.isRTL(e));let d=await s.getElementRects({reference:t,floating:e,strategy:r}),{x:f,y:p}=uo(d,o,l),m=o,g=0;const y={};for(let h=0;h<a.length;h++){const v=a[h];if(!v)continue;const{name:b,fn:x}=v,{x:_,y:w,data:E,reset:T}=await x({x:f,y:p,initialPlacement:o,placement:m,strategy:r,middlewareData:y,rects:d,platform:i,elements:{reference:t,floating:e}});f=_??f,p=w??p,y[b]={...y[b],...E},T&&g<fl&&(g++,typeof T=="object"&&(T.placement&&(m=T.placement),T.rects&&(d=T.rects===!0?await s.getElementRects({reference:t,floating:e,strategy:r}):T.rects),{x:f,y:p}=uo(d,m,l)),h=-1)}return{x:f,y:p,placement:m,strategy:r,middlewareData:y}},ml=t=>({name:"arrow",options:t,async fn(e){const{x:n,y:o,placement:r,rects:a,platform:s,elements:i,middlewareData:l}=e,{element:d,padding:f=0}=ce(t,e)||{};if(d==null)return{};const p=hr(f),m={x:n,y:o},g=Nn(r),y=Rn(g),h=await s.getDimensions(d),v=g==="y",b=v?"top":"left",x=v?"bottom":"right",_=v?"clientHeight":"clientWidth",w=a.reference[y]+a.reference[g]-m[g]-a.floating[y],E=m[g]-a.reference[g],T=await(s.getOffsetParent==null?void 0:s.getOffsetParent(d));let C=T?T[_]:0;(!C||!await(s.isElement==null?void 0:s.isElement(T)))&&(C=i.floating[_]||a.floating[y]);const S=w/2-E/2,N=C/2-h[y]/2-1,R=ge(p[b],N),A=ge(p[x],N),k=R,j=C-h[y]-A,L=C/2-h[y]/2+S,B=an(k,L,j),F=!l.arrow&&je(r)!=null&&L!==B&&a.reference[y]/2-(L<k?R:A)-h[y]/2<0,W=F?L<k?L-k:L-j:0;return{[g]:m[g]+W,data:{[g]:B,centerOffset:L-B-W,...F&&{alignmentOffset:W}},reset:F}}}),hl=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var n,o;const{placement:r,middlewareData:a,rects:s,initialPlacement:i,platform:l,elements:d}=e,{mainAxis:f=!0,crossAxis:p=!0,fallbackPlacements:m,fallbackStrategy:g="bestFit",fallbackAxisSideDirection:y="none",flipAlignment:h=!0,...v}=ce(t,e);if((n=a.arrow)!=null&&n.alignmentOffset)return{};const b=ue(r),x=re(i),_=ue(i)===i,w=await(l.isRTL==null?void 0:l.isRTL(d.floating)),E=m||(_||!h?[vt(i)]:al(i)),T=y!=="none";!m&&T&&E.push(...cl(i,h,y,w));const C=[i,...E],S=await l.detectOverflow(e,v),N=[];let R=((o=a.flip)==null?void 0:o.overflows)||[];if(f&&N.push(S[b]),p){const L=rl(r,s,w);N.push(S[L[0]],S[L[1]])}if(R=[...R,{placement:r,overflows:N}],!N.every(L=>L<=0)){var A,k;const L=(((A=a.flip)==null?void 0:A.index)||0)+1,B=C[L];if(B&&(!(p==="alignment"?x!==re(B):!1)||R.every(O=>re(O.placement)===x?O.overflows[0]>0:!0)))return{data:{index:L,overflows:R},reset:{placement:B}};let F=(k=R.filter(W=>W.overflows[0]<=0).sort((W,O)=>W.overflows[1]-O.overflows[1])[0])==null?void 0:k.placement;if(!F)switch(g){case"bestFit":{var j;const W=(j=R.filter(O=>{if(T){const M=re(O.placement);return M===x||M==="y"}return!0}).map(O=>[O.placement,O.overflows.filter(M=>M>0).reduce((M,K)=>M+K,0)]).sort((O,M)=>O[1]-M[1])[0])==null?void 0:j[0];W&&(F=W);break}case"initialPlacement":F=i;break}if(r!==F)return{reset:{placement:F}}}return{}}}};function fo(t,e){return{top:t.top-e.height,right:t.right-e.width,bottom:t.bottom-e.height,left:t.left-e.width}}function po(t){return nl.some(e=>t[e]>=0)}const gl=function(t){return t===void 0&&(t={}),{name:"hide",options:t,async fn(e){const{rects:n,platform:o}=e,{strategy:r="referenceHidden",...a}=ce(t,e);switch(r){case"referenceHidden":{const s=await o.detectOverflow(e,{...a,elementContext:"reference"}),i=fo(s,n.reference);return{data:{referenceHiddenOffsets:i,referenceHidden:po(i)}}}case"escaped":{const s=await o.detectOverflow(e,{...a,altBoundary:!0}),i=fo(s,n.floating);return{data:{escapedOffsets:i,escaped:po(i)}}}default:return{}}}}},gr=new Set(["left","top"]);async function vl(t,e){const{placement:n,platform:o,elements:r}=t,a=await(o.isRTL==null?void 0:o.isRTL(r.floating)),s=ue(n),i=je(n),l=re(n)==="y",d=gr.has(s)?-1:1,f=a&&l?-1:1,p=ce(e,t);let{mainAxis:m,crossAxis:g,alignmentAxis:y}=typeof p=="number"?{mainAxis:p,crossAxis:0,alignmentAxis:null}:{mainAxis:p.mainAxis||0,crossAxis:p.crossAxis||0,alignmentAxis:p.alignmentAxis};return i&&typeof y=="number"&&(g=i==="end"?y*-1:y),l?{x:g*f,y:m*d}:{x:m*d,y:g*f}}const yl=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){var n,o;const{x:r,y:a,placement:s,middlewareData:i}=e,l=await vl(e,t);return s===((n=i.offset)==null?void 0:n.placement)&&(o=i.arrow)!=null&&o.alignmentOffset?{}:{x:r+l.x,y:a+l.y,data:{...l,placement:s}}}}},bl=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){const{x:n,y:o,placement:r,platform:a}=e,{mainAxis:s=!0,crossAxis:i=!1,limiter:l={fn:b=>{let{x,y:_}=b;return{x,y:_}}},...d}=ce(t,e),f={x:n,y:o},p=await a.detectOverflow(e,d),m=re(ue(r)),g=Sn(m);let y=f[g],h=f[m];if(s){const b=g==="y"?"top":"left",x=g==="y"?"bottom":"right",_=y+p[b],w=y-p[x];y=an(_,y,w)}if(i){const b=m==="y"?"top":"left",x=m==="y"?"bottom":"right",_=h+p[b],w=h-p[x];h=an(_,h,w)}const v=l.fn({...e,[g]:y,[m]:h});return{...v,data:{x:v.x-n,y:v.y-o,enabled:{[g]:s,[m]:i}}}}}},xl=function(t){return t===void 0&&(t={}),{options:t,fn(e){const{x:n,y:o,placement:r,rects:a,middlewareData:s}=e,{offset:i=0,mainAxis:l=!0,crossAxis:d=!0}=ce(t,e),f={x:n,y:o},p=re(r),m=Sn(p);let g=f[m],y=f[p];const h=ce(i,e),v=typeof h=="number"?{mainAxis:h,crossAxis:0}:{mainAxis:0,crossAxis:0,...h};if(l){const _=m==="y"?"height":"width",w=a.reference[m]-a.floating[_]+v.mainAxis,E=a.reference[m]+a.reference[_]-v.mainAxis;g<w?g=w:g>E&&(g=E)}if(d){var b,x;const _=m==="y"?"width":"height",w=gr.has(ue(r)),E=a.reference[p]-a.floating[_]+(w&&((b=s.offset)==null?void 0:b[p])||0)+(w?0:v.crossAxis),T=a.reference[p]+a.reference[_]+(w?0:((x=s.offset)==null?void 0:x[p])||0)-(w?v.crossAxis:0);y<E?y=E:y>T&&(y=T)}return{[m]:g,[p]:y}}}},wl=function(t){return t===void 0&&(t={}),{name:"size",options:t,async fn(e){var n,o;const{placement:r,rects:a,platform:s,elements:i}=e,{apply:l=()=>{},...d}=ce(t,e),f=await s.detectOverflow(e,d),p=ue(r),m=je(r),g=re(r)==="y",{width:y,height:h}=a.floating;let v,b;p==="top"||p==="bottom"?(v=p,b=m===(await(s.isRTL==null?void 0:s.isRTL(i.floating))?"start":"end")?"left":"right"):(b=p,v=m==="end"?"top":"bottom");const x=h-f.top-f.bottom,_=y-f.left-f.right,w=ge(h-f[v],x),E=ge(y-f[b],_),T=!e.middlewareData.shift;let C=w,S=E;if((n=e.middlewareData.shift)!=null&&n.enabled.x&&(S=_),(o=e.middlewareData.shift)!=null&&o.enabled.y&&(C=x),T&&!m){const R=q(f.left,0),A=q(f.right,0),k=q(f.top,0),j=q(f.bottom,0);g?S=y-2*(R!==0||A!==0?R+A:q(f.left,f.right)):C=h-2*(k!==0||j!==0?k+j:q(f.top,f.bottom))}await l({...e,availableWidth:S,availableHeight:C});const N=await s.getDimensions(i.floating);return y!==N.width||h!==N.height?{reset:{rects:!0}}:{}}}};function Pt(){return typeof window<"u"}function Le(t){return vr(t)?(t.nodeName||"").toLowerCase():"#document"}function Z(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function le(t){var e;return(e=(vr(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function vr(t){return Pt()?t instanceof Node||t instanceof Z(t).Node:!1}function J(t){return Pt()?t instanceof Element||t instanceof Z(t).Element:!1}function fe(t){return Pt()?t instanceof HTMLElement||t instanceof Z(t).HTMLElement:!1}function mo(t){return!Pt()||typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof Z(t).ShadowRoot}function Ye(t){const{overflow:e,overflowX:n,overflowY:o,display:r}=ee(t);return/auto|scroll|overlay|hidden|clip/.test(e+o+n)&&r!=="inline"&&r!=="contents"}function _l(t){return/^(table|td|th)$/.test(Le(t))}function Mt(t){try{if(t.matches(":popover-open"))return!0}catch{}try{return t.matches(":modal")}catch{return!1}}const Cl=/transform|translate|scale|rotate|perspective|filter/,El=/paint|layout|strict|content/,we=t=>!!t&&t!=="none";let Qt;function Pn(t){const e=J(t)?ee(t):t;return we(e.transform)||we(e.translate)||we(e.scale)||we(e.rotate)||we(e.perspective)||!Mn()&&(we(e.backdropFilter)||we(e.filter))||Cl.test(e.willChange||"")||El.test(e.contain||"")}function Tl(t){let e=ve(t);for(;fe(e)&&!ke(e);){if(Pn(e))return e;if(Mt(e))return null;e=ve(e)}return null}function Mn(){return Qt==null&&(Qt=typeof CSS<"u"&&CSS.supports&&CSS.supports("-webkit-backdrop-filter","none")),Qt}function ke(t){return/^(html|body|#document)$/.test(Le(t))}function ee(t){return Z(t).getComputedStyle(t)}function At(t){return J(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function ve(t){if(Le(t)==="html")return t;const e=t.assignedSlot||t.parentNode||mo(t)&&t.host||le(t);return mo(e)?e.host:e}function yr(t){const e=ve(t);return ke(e)?t.ownerDocument?t.ownerDocument.body:t.body:fe(e)&&Ye(e)?e:yr(e)}function We(t,e,n){var o;e===void 0&&(e=[]),n===void 0&&(n=!0);const r=yr(t),a=r===((o=t.ownerDocument)==null?void 0:o.body),s=Z(r);if(a){const i=ln(s);return e.concat(s,s.visualViewport||[],Ye(r)?r:[],i&&n?We(i):[])}else return e.concat(r,We(r,[],n))}function ln(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function br(t){const e=ee(t);let n=parseFloat(e.width)||0,o=parseFloat(e.height)||0;const r=fe(t),a=r?t.offsetWidth:n,s=r?t.offsetHeight:o,i=gt(n)!==a||gt(o)!==s;return i&&(n=a,o=s),{width:n,height:o,$:i}}function An(t){return J(t)?t:t.contextElement}function Ie(t){const e=An(t);if(!fe(e))return ae(1);const n=e.getBoundingClientRect(),{width:o,height:r,$:a}=br(e);let s=(a?gt(n.width):n.width)/o,i=(a?gt(n.height):n.height)/r;return(!s||!Number.isFinite(s))&&(s=1),(!i||!Number.isFinite(i))&&(i=1),{x:s,y:i}}const Sl=ae(0);function xr(t){const e=Z(t);return!Mn()||!e.visualViewport?Sl:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function Rl(t,e,n){return e===void 0&&(e=!1),!n||e&&n!==Z(t)?!1:e}function Te(t,e,n,o){e===void 0&&(e=!1),n===void 0&&(n=!1);const r=t.getBoundingClientRect(),a=An(t);let s=ae(1);e&&(o?J(o)&&(s=Ie(o)):s=Ie(t));const i=Rl(a,n,o)?xr(a):ae(0);let l=(r.left+i.x)/s.x,d=(r.top+i.y)/s.y,f=r.width/s.x,p=r.height/s.y;if(a){const m=Z(a),g=o&&J(o)?Z(o):o;let y=m,h=ln(y);for(;h&&o&&g!==y;){const v=Ie(h),b=h.getBoundingClientRect(),x=ee(h),_=b.left+(h.clientLeft+parseFloat(x.paddingLeft))*v.x,w=b.top+(h.clientTop+parseFloat(x.paddingTop))*v.y;l*=v.x,d*=v.y,f*=v.x,p*=v.y,l+=_,d+=w,y=Z(h),h=ln(y)}}return yt({width:f,height:p,x:l,y:d})}function Ot(t,e){const n=At(t).scrollLeft;return e?e.left+n:Te(le(t)).left+n}function wr(t,e){const n=t.getBoundingClientRect(),o=n.left+e.scrollLeft-Ot(t,n),r=n.top+e.scrollTop;return{x:o,y:r}}function Nl(t){let{elements:e,rect:n,offsetParent:o,strategy:r}=t;const a=r==="fixed",s=le(o),i=e?Mt(e.floating):!1;if(o===s||i&&a)return n;let l={scrollLeft:0,scrollTop:0},d=ae(1);const f=ae(0),p=fe(o);if((p||!p&&!a)&&((Le(o)!=="body"||Ye(s))&&(l=At(o)),p)){const g=Te(o);d=Ie(o),f.x=g.x+o.clientLeft,f.y=g.y+o.clientTop}const m=s&&!p&&!a?wr(s,l):ae(0);return{width:n.width*d.x,height:n.height*d.y,x:n.x*d.x-l.scrollLeft*d.x+f.x+m.x,y:n.y*d.y-l.scrollTop*d.y+f.y+m.y}}function Pl(t){return Array.from(t.getClientRects())}function Ml(t){const e=le(t),n=At(t),o=t.ownerDocument.body,r=q(e.scrollWidth,e.clientWidth,o.scrollWidth,o.clientWidth),a=q(e.scrollHeight,e.clientHeight,o.scrollHeight,o.clientHeight);let s=-n.scrollLeft+Ot(t);const i=-n.scrollTop;return ee(o).direction==="rtl"&&(s+=q(e.clientWidth,o.clientWidth)-r),{width:r,height:a,x:s,y:i}}const ho=25;function Al(t,e){const n=Z(t),o=le(t),r=n.visualViewport;let a=o.clientWidth,s=o.clientHeight,i=0,l=0;if(r){a=r.width,s=r.height;const f=Mn();(!f||f&&e==="fixed")&&(i=r.offsetLeft,l=r.offsetTop)}const d=Ot(o);if(d<=0){const f=o.ownerDocument,p=f.body,m=getComputedStyle(p),g=f.compatMode==="CSS1Compat"&&parseFloat(m.marginLeft)+parseFloat(m.marginRight)||0,y=Math.abs(o.clientWidth-p.clientWidth-g);y<=ho&&(a-=y)}else d<=ho&&(a+=d);return{width:a,height:s,x:i,y:l}}function Ol(t,e){const n=Te(t,!0,e==="fixed"),o=n.top+t.clientTop,r=n.left+t.clientLeft,a=fe(t)?Ie(t):ae(1),s=t.clientWidth*a.x,i=t.clientHeight*a.y,l=r*a.x,d=o*a.y;return{width:s,height:i,x:l,y:d}}function go(t,e,n){let o;if(e==="viewport")o=Al(t,n);else if(e==="document")o=Ml(le(t));else if(J(e))o=Ol(e,n);else{const r=xr(t);o={x:e.x-r.x,y:e.y-r.y,width:e.width,height:e.height}}return yt(o)}function _r(t,e){const n=ve(t);return n===e||!J(n)||ke(n)?!1:ee(n).position==="fixed"||_r(n,e)}function Il(t,e){const n=e.get(t);if(n)return n;let o=We(t,[],!1).filter(i=>J(i)&&Le(i)!=="body"),r=null;const a=ee(t).position==="fixed";let s=a?ve(t):t;for(;J(s)&&!ke(s);){const i=ee(s),l=Pn(s);!l&&i.position==="fixed"&&(r=null),(a?!l&&!r:!l&&i.position==="static"&&!!r&&(r.position==="absolute"||r.position==="fixed")||Ye(s)&&!l&&_r(t,s))?o=o.filter(f=>f!==s):r=i,s=ve(s)}return e.set(t,o),o}function kl(t){let{element:e,boundary:n,rootBoundary:o,strategy:r}=t;const s=[...n==="clippingAncestors"?Mt(e)?[]:Il(e,this._c):[].concat(n),o],i=go(e,s[0],r);let l=i.top,d=i.right,f=i.bottom,p=i.left;for(let m=1;m<s.length;m++){const g=go(e,s[m],r);l=q(g.top,l),d=ge(g.right,d),f=ge(g.bottom,f),p=q(g.left,p)}return{width:d-p,height:f-l,x:p,y:l}}function Dl(t){const{width:e,height:n}=br(t);return{width:e,height:n}}function jl(t,e,n){const o=fe(e),r=le(e),a=n==="fixed",s=Te(t,!0,a,e);let i={scrollLeft:0,scrollTop:0};const l=ae(0);function d(){l.x=Ot(r)}if(o||!o&&!a)if((Le(e)!=="body"||Ye(r))&&(i=At(e)),o){const g=Te(e,!0,a,e);l.x=g.x+e.clientLeft,l.y=g.y+e.clientTop}else r&&d();a&&!o&&r&&d();const f=r&&!o&&!a?wr(r,i):ae(0),p=s.left+i.scrollLeft-l.x-f.x,m=s.top+i.scrollTop-l.y-f.y;return{x:p,y:m,width:s.width,height:s.height}}function Jt(t){return ee(t).position==="static"}function vo(t,e){if(!fe(t)||ee(t).position==="fixed")return null;if(e)return e(t);let n=t.offsetParent;return le(t)===n&&(n=n.ownerDocument.body),n}function Cr(t,e){const n=Z(t);if(Mt(t))return n;if(!fe(t)){let r=ve(t);for(;r&&!ke(r);){if(J(r)&&!Jt(r))return r;r=ve(r)}return n}let o=vo(t,e);for(;o&&_l(o)&&Jt(o);)o=vo(o,e);return o&&ke(o)&&Jt(o)&&!Pn(o)?n:o||Tl(t)||n}const Ll=async function(t){const e=this.getOffsetParent||Cr,n=this.getDimensions,o=await n(t.floating);return{reference:jl(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:o.width,height:o.height}}};function $l(t){return ee(t).direction==="rtl"}const Fl={convertOffsetParentRelativeRectToViewportRelativeRect:Nl,getDocumentElement:le,getClippingRect:kl,getOffsetParent:Cr,getElementRects:Ll,getClientRects:Pl,getDimensions:Dl,getScale:Ie,isElement:J,isRTL:$l};function Er(t,e){return t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height}function Bl(t,e){let n=null,o;const r=le(t);function a(){var i;clearTimeout(o),(i=n)==null||i.disconnect(),n=null}function s(i,l){i===void 0&&(i=!1),l===void 0&&(l=1),a();const d=t.getBoundingClientRect(),{left:f,top:p,width:m,height:g}=d;if(i||e(),!m||!g)return;const y=ct(p),h=ct(r.clientWidth-(f+m)),v=ct(r.clientHeight-(p+g)),b=ct(f),_={rootMargin:-y+"px "+-h+"px "+-v+"px "+-b+"px",threshold:q(0,ge(1,l))||1};let w=!0;function E(T){const C=T[0].intersectionRatio;if(C!==l){if(!w)return s();C?s(!1,C):o=setTimeout(()=>{s(!1,1e-7)},1e3)}C===1&&!Er(d,t.getBoundingClientRect())&&s(),w=!1}try{n=new IntersectionObserver(E,{..._,root:r.ownerDocument})}catch{n=new IntersectionObserver(E,_)}n.observe(t)}return s(!0),a}function zl(t,e,n,o){o===void 0&&(o={});const{ancestorScroll:r=!0,ancestorResize:a=!0,elementResize:s=typeof ResizeObserver=="function",layoutShift:i=typeof IntersectionObserver=="function",animationFrame:l=!1}=o,d=An(t),f=r||a?[...d?We(d):[],...e?We(e):[]]:[];f.forEach(b=>{r&&b.addEventListener("scroll",n,{passive:!0}),a&&b.addEventListener("resize",n)});const p=d&&i?Bl(d,n):null;let m=-1,g=null;s&&(g=new ResizeObserver(b=>{let[x]=b;x&&x.target===d&&g&&e&&(g.unobserve(e),cancelAnimationFrame(m),m=requestAnimationFrame(()=>{var _;(_=g)==null||_.observe(e)})),n()}),d&&!l&&g.observe(d),e&&g.observe(e));let y,h=l?Te(t):null;l&&v();function v(){const b=Te(t);h&&!Er(h,b)&&n(),h=b,y=requestAnimationFrame(v)}return n(),()=>{var b;f.forEach(x=>{r&&x.removeEventListener("scroll",n),a&&x.removeEventListener("resize",n)}),p?.(),(b=g)==null||b.disconnect(),g=null,l&&cancelAnimationFrame(y)}}const Wl=yl,Hl=bl,Ul=hl,Gl=wl,Kl=gl,yo=ml,Vl=xl,Xl=(t,e,n)=>{const o=new Map,r={platform:Fl,...n},a={...r.platform,_c:o};return pl(t,e,{...r,platform:a})};var Yl=typeof document<"u",ql=function(){},ft=Yl?u.useLayoutEffect:ql;function bt(t,e){if(t===e)return!0;if(typeof t!=typeof e)return!1;if(typeof t=="function"&&t.toString()===e.toString())return!0;let n,o,r;if(t&&e&&typeof t=="object"){if(Array.isArray(t)){if(n=t.length,n!==e.length)return!1;for(o=n;o--!==0;)if(!bt(t[o],e[o]))return!1;return!0}if(r=Object.keys(t),n=r.length,n!==Object.keys(e).length)return!1;for(o=n;o--!==0;)if(!{}.hasOwnProperty.call(e,r[o]))return!1;for(o=n;o--!==0;){const a=r[o];if(!(a==="_owner"&&t.$$typeof)&&!bt(t[a],e[a]))return!1}return!0}return t!==t&&e!==e}function Tr(t){return typeof window>"u"?1:(t.ownerDocument.defaultView||window).devicePixelRatio||1}function bo(t,e){const n=Tr(t);return Math.round(e*n)/n}function en(t){const e=u.useRef(t);return ft(()=>{e.current=t}),e}function Zl(t){t===void 0&&(t={});const{placement:e="bottom",strategy:n="absolute",middleware:o=[],platform:r,elements:{reference:a,floating:s}={},transform:i=!0,whileElementsMounted:l,open:d}=t,[f,p]=u.useState({x:0,y:0,strategy:n,placement:e,middlewareData:{},isPositioned:!1}),[m,g]=u.useState(o);bt(m,o)||g(o);const[y,h]=u.useState(null),[v,b]=u.useState(null),x=u.useCallback(O=>{O!==T.current&&(T.current=O,h(O))},[]),_=u.useCallback(O=>{O!==C.current&&(C.current=O,b(O))},[]),w=a||y,E=s||v,T=u.useRef(null),C=u.useRef(null),S=u.useRef(f),N=l!=null,R=en(l),A=en(r),k=en(d),j=u.useCallback(()=>{if(!T.current||!C.current)return;const O={placement:e,strategy:n,middleware:m};A.current&&(O.platform=A.current),Xl(T.current,C.current,O).then(M=>{const K={...M,isPositioned:k.current!==!1};L.current&&!bt(S.current,K)&&(S.current=K,ss.flushSync(()=>{p(K)}))})},[m,e,n,A,k]);ft(()=>{d===!1&&S.current.isPositioned&&(S.current.isPositioned=!1,p(O=>({...O,isPositioned:!1})))},[d]);const L=u.useRef(!1);ft(()=>(L.current=!0,()=>{L.current=!1}),[]),ft(()=>{if(w&&(T.current=w),E&&(C.current=E),w&&E){if(R.current)return R.current(w,E,j);j()}},[w,E,j,R,N]);const B=u.useMemo(()=>({reference:T,floating:C,setReference:x,setFloating:_}),[x,_]),F=u.useMemo(()=>({reference:w,floating:E}),[w,E]),W=u.useMemo(()=>{const O={position:n,left:0,top:0};if(!F.floating)return O;const M=bo(F.floating,f.x),K=bo(F.floating,f.y);return i?{...O,transform:"translate("+M+"px, "+K+"px)",...Tr(F.floating)>=1.5&&{willChange:"transform"}}:{position:n,left:M,top:K}},[n,i,F.floating,f.x,f.y]);return u.useMemo(()=>({...f,update:j,refs:B,elements:F,floatingStyles:W}),[f,j,B,F,W])}const Ql=t=>{function e(n){return{}.hasOwnProperty.call(n,"current")}return{name:"arrow",options:t,fn(n){const{element:o,padding:r}=typeof t=="function"?t(n):t;return o&&e(o)?o.current!=null?yo({element:o.current,padding:r}).fn(n):{}:o?yo({element:o,padding:r}).fn(n):{}}}},Jl=(t,e)=>{const n=Wl(t);return{name:n.name,fn:n.fn,options:[t,e]}},ec=(t,e)=>{const n=Hl(t);return{name:n.name,fn:n.fn,options:[t,e]}},tc=(t,e)=>({fn:Vl(t).fn,options:[t,e]}),nc=(t,e)=>{const n=Ul(t);return{name:n.name,fn:n.fn,options:[t,e]}},oc=(t,e)=>{const n=Gl(t);return{name:n.name,fn:n.fn,options:[t,e]}},rc=(t,e)=>{const n=Kl(t);return{name:n.name,fn:n.fn,options:[t,e]}},ac=(t,e)=>{const n=Ql(t);return{name:n.name,fn:n.fn,options:[t,e]}};var sc="Arrow",Sr=u.forwardRef((t,e)=>{const{children:n,width:o=10,height:r=5,...a}=t;return c.jsx(H.svg,{...a,ref:e,width:o,height:r,viewBox:"0 0 30 10",preserveAspectRatio:"none",children:t.asChild?n:c.jsx("polygon",{points:"0,0 30,0 15,10"})})});Sr.displayName=sc;var ic=Sr,On="Popper",[Rr,It]=ye(On),[lc,Nr]=Rr(On),Pr=t=>{const{__scopePopper:e,children:n}=t,[o,r]=u.useState(null);return c.jsx(lc,{scope:e,anchor:o,onAnchorChange:r,children:n})};Pr.displayName=On;var Mr="PopperAnchor",Ar=u.forwardRef((t,e)=>{const{__scopePopper:n,virtualRef:o,...r}=t,a=Nr(Mr,n),s=u.useRef(null),i=G(e,s),l=u.useRef(null);return u.useEffect(()=>{const d=l.current;l.current=o?.current||s.current,d!==l.current&&a.onAnchorChange(l.current)}),o?null:c.jsx(H.div,{...r,ref:i})});Ar.displayName=Mr;var In="PopperContent",[cc,uc]=Rr(In),Or=u.forwardRef((t,e)=>{const{__scopePopper:n,side:o="bottom",sideOffset:r=0,align:a="center",alignOffset:s=0,arrowPadding:i=0,avoidCollisions:l=!0,collisionBoundary:d=[],collisionPadding:f=0,sticky:p="partial",hideWhenDetached:m=!1,updatePositionStrategy:g="optimized",onPlaced:y,...h}=t,v=Nr(In,n),[b,x]=u.useState(null),_=G(e,U=>x(U)),[w,E]=u.useState(null),T=ps(w),C=T?.width??0,S=T?.height??0,N=o+(a!=="center"?"-"+a:""),R=typeof f=="number"?f:{top:0,right:0,bottom:0,left:0,...f},A=Array.isArray(d)?d:[d],k=A.length>0,j={padding:R,boundary:A.filter(fc),altBoundary:k},{refs:L,floatingStyles:B,placement:F,isPositioned:W,middlewareData:O}=Zl({strategy:"fixed",placement:N,whileElementsMounted:(...U)=>zl(...U,{animationFrame:g==="always"}),elements:{reference:v.anchor},middleware:[Jl({mainAxis:r+S,alignmentAxis:s}),l&&ec({mainAxis:!0,crossAxis:!1,limiter:p==="partial"?tc():void 0,...j}),l&&nc({...j}),oc({...j,apply:({elements:U,rects:Be,availableWidth:es,availableHeight:ts})=>{const{width:ns,height:os}=Be.reference,rt=U.floating.style;rt.setProperty("--radix-popper-available-width",`${es}px`),rt.setProperty("--radix-popper-available-height",`${ts}px`),rt.setProperty("--radix-popper-anchor-width",`${ns}px`),rt.setProperty("--radix-popper-anchor-height",`${os}px`)}}),w&&ac({element:w,padding:i}),pc({arrowWidth:C,arrowHeight:S}),m&&rc({strategy:"referenceHidden",...j})]}),[M,K]=Dr(F),ne=se(y);he(()=>{W&&ne?.()},[W,ne]);const be=O.arrow?.x,$e=O.arrow?.y,Fe=O.arrow?.centerOffset!==0,[ot,xe]=u.useState();return he(()=>{b&&xe(window.getComputedStyle(b).zIndex)},[b]),c.jsx("div",{ref:L.setFloating,"data-radix-popper-content-wrapper":"",style:{...B,transform:W?B.transform:"translate(0, -200%)",minWidth:"max-content",zIndex:ot,"--radix-popper-transform-origin":[O.transformOrigin?.x,O.transformOrigin?.y].join(" "),...O.hide?.referenceHidden&&{visibility:"hidden",pointerEvents:"none"}},dir:t.dir,children:c.jsx(cc,{scope:n,placedSide:M,onArrowChange:E,arrowX:be,arrowY:$e,shouldHideArrow:Fe,children:c.jsx(H.div,{"data-side":M,"data-align":K,...h,ref:_,style:{...h.style,animation:W?void 0:"none"}})})})});Or.displayName=In;var Ir="PopperArrow",dc={top:"bottom",right:"left",bottom:"top",left:"right"},kr=u.forwardRef(function(e,n){const{__scopePopper:o,...r}=e,a=uc(Ir,o),s=dc[a.placedSide];return c.jsx("span",{ref:a.onArrowChange,style:{position:"absolute",left:a.arrowX,top:a.arrowY,[s]:0,transformOrigin:{top:"",right:"0 0",bottom:"center 0",left:"100% 0"}[a.placedSide],transform:{top:"translateY(100%)",right:"translateY(50%) rotate(90deg) translateX(-50%)",bottom:"rotate(180deg)",left:"translateY(50%) rotate(-90deg) translateX(50%)"}[a.placedSide],visibility:a.shouldHideArrow?"hidden":void 0},children:c.jsx(ic,{...r,ref:n,style:{...r.style,display:"block"}})})});kr.displayName=Ir;function fc(t){return t!==null}var pc=t=>({name:"transformOrigin",options:t,fn(e){const{placement:n,rects:o,middlewareData:r}=e,s=r.arrow?.centerOffset!==0,i=s?0:t.arrowWidth,l=s?0:t.arrowHeight,[d,f]=Dr(n),p={start:"0%",center:"50%",end:"100%"}[f],m=(r.arrow?.x??0)+i/2,g=(r.arrow?.y??0)+l/2;let y="",h="";return d==="bottom"?(y=s?p:`${m}px`,h=`${-l}px`):d==="top"?(y=s?p:`${m}px`,h=`${o.floating.height+l}px`):d==="right"?(y=`${-l}px`,h=s?p:`${g}px`):d==="left"&&(y=`${o.floating.width+l}px`,h=s?p:`${g}px`),{data:{x:y,y:h}}}});function Dr(t){const[e,n="center"]=t.split("-");return[e,n]}var jr=Pr,Lr=Ar,$r=Or,Fr=kr,tn="rovingFocusGroup.onEntryFocus",mc={bubbles:!1,cancelable:!0},qe="RovingFocusGroup",[cn,Br,hc]=ko(qe),[gc,zr]=ye(qe,[hc]),[vc,yc]=gc(qe),Wr=u.forwardRef((t,e)=>c.jsx(cn.Provider,{scope:t.__scopeRovingFocusGroup,children:c.jsx(cn.Slot,{scope:t.__scopeRovingFocusGroup,children:c.jsx(bc,{...t,ref:e})})}));Wr.displayName=qe;var bc=u.forwardRef((t,e)=>{const{__scopeRovingFocusGroup:n,orientation:o,loop:r=!1,dir:a,currentTabStopId:s,defaultCurrentTabStopId:i,onCurrentTabStopIdChange:l,onEntryFocus:d,preventScrollOnEntryFocus:f=!1,...p}=t,m=u.useRef(null),g=G(e,m),y=Fo(a),[h,v]=Xe({prop:s,defaultProp:i??null,onChange:l,caller:qe}),[b,x]=u.useState(!1),_=se(d),w=Br(n),E=u.useRef(!1),[T,C]=u.useState(0);return u.useEffect(()=>{const S=m.current;if(S)return S.addEventListener(tn,_),()=>S.removeEventListener(tn,_)},[_]),c.jsx(vc,{scope:n,orientation:o,dir:y,loop:r,currentTabStopId:h,onItemFocus:u.useCallback(S=>v(S),[v]),onItemShiftTab:u.useCallback(()=>x(!0),[]),onFocusableItemAdd:u.useCallback(()=>C(S=>S+1),[]),onFocusableItemRemove:u.useCallback(()=>C(S=>S-1),[]),children:c.jsx(H.div,{tabIndex:b||T===0?-1:0,"data-orientation":o,...p,ref:g,style:{outline:"none",...t.style},onMouseDown:I(t.onMouseDown,()=>{E.current=!0}),onFocus:I(t.onFocus,S=>{const N=!E.current;if(S.target===S.currentTarget&&N&&!b){const R=new CustomEvent(tn,mc);if(S.currentTarget.dispatchEvent(R),!R.defaultPrevented){const A=w().filter(F=>F.focusable),k=A.find(F=>F.active),j=A.find(F=>F.id===h),B=[k,j,...A].filter(Boolean).map(F=>F.ref.current);Gr(B,f)}}E.current=!1}),onBlur:I(t.onBlur,()=>x(!1))})})}),Hr="RovingFocusGroupItem",Ur=u.forwardRef((t,e)=>{const{__scopeRovingFocusGroup:n,focusable:o=!0,active:r=!1,tabStopId:a,children:s,...i}=t,l=me(),d=a||l,f=yc(Hr,n),p=f.currentTabStopId===d,m=Br(n),{onFocusableItemAdd:g,onFocusableItemRemove:y,currentTabStopId:h}=f;return u.useEffect(()=>{if(o)return g(),()=>y()},[o,g,y]),c.jsx(cn.ItemSlot,{scope:n,id:d,focusable:o,active:r,children:c.jsx(H.span,{tabIndex:p?0:-1,"data-orientation":f.orientation,...i,ref:e,onMouseDown:I(t.onMouseDown,v=>{o?f.onItemFocus(d):v.preventDefault()}),onFocus:I(t.onFocus,()=>f.onItemFocus(d)),onKeyDown:I(t.onKeyDown,v=>{if(v.key==="Tab"&&v.shiftKey){f.onItemShiftTab();return}if(v.target!==v.currentTarget)return;const b=_c(v,f.orientation,f.dir);if(b!==void 0){if(v.metaKey||v.ctrlKey||v.altKey||v.shiftKey)return;v.preventDefault();let _=m().filter(w=>w.focusable).map(w=>w.ref.current);if(b==="last")_.reverse();else if(b==="prev"||b==="next"){b==="prev"&&_.reverse();const w=_.indexOf(v.currentTarget);_=f.loop?Cc(_,w+1):_.slice(w+1)}setTimeout(()=>Gr(_))}}),children:typeof s=="function"?s({isCurrentTabStop:p,hasTabStop:h!=null}):s})})});Ur.displayName=Hr;var xc={ArrowLeft:"prev",ArrowUp:"prev",ArrowRight:"next",ArrowDown:"next",PageUp:"first",Home:"first",PageDown:"last",End:"last"};function wc(t,e){return e!=="rtl"?t:t==="ArrowLeft"?"ArrowRight":t==="ArrowRight"?"ArrowLeft":t}function _c(t,e,n){const o=wc(t.key,n);if(!(e==="vertical"&&["ArrowLeft","ArrowRight"].includes(o))&&!(e==="horizontal"&&["ArrowUp","ArrowDown"].includes(o)))return xc[o]}function Gr(t,e=!1){const n=document.activeElement;for(const o of t)if(o===n||(o.focus({preventScroll:e}),document.activeElement!==n))return}function Cc(t,e){return t.map((n,o)=>t[(e+o)%t.length])}var Ec=Wr,Tc=Ur,un=["Enter"," "],Sc=["ArrowDown","PageUp","Home"],Kr=["ArrowUp","PageDown","End"],Rc=[...Sc,...Kr],Nc={ltr:[...un,"ArrowRight"],rtl:[...un,"ArrowLeft"]},Pc={ltr:["ArrowLeft"],rtl:["ArrowRight"]},Ze="Menu",[He,Mc,Ac]=ko(Ze),[Re,Vr]=ye(Ze,[Ac,It,zr]),kt=It(),Xr=zr(),[Oc,Ne]=Re(Ze),[Ic,Qe]=Re(Ze),Yr=t=>{const{__scopeMenu:e,open:n=!1,children:o,dir:r,onOpenChange:a,modal:s=!0}=t,i=kt(e),[l,d]=u.useState(null),f=u.useRef(!1),p=se(a),m=Fo(r);return u.useEffect(()=>{const g=()=>{f.current=!0,document.addEventListener("pointerdown",y,{capture:!0,once:!0}),document.addEventListener("pointermove",y,{capture:!0,once:!0})},y=()=>f.current=!1;return document.addEventListener("keydown",g,{capture:!0}),()=>{document.removeEventListener("keydown",g,{capture:!0}),document.removeEventListener("pointerdown",y,{capture:!0}),document.removeEventListener("pointermove",y,{capture:!0})}},[]),c.jsx(jr,{...i,children:c.jsx(Oc,{scope:e,open:n,onOpenChange:p,content:l,onContentChange:d,children:c.jsx(Ic,{scope:e,onClose:u.useCallback(()=>p(!1),[p]),isUsingKeyboardRef:f,dir:m,modal:s,children:o})})})};Yr.displayName=Ze;var kc="MenuAnchor",kn=u.forwardRef((t,e)=>{const{__scopeMenu:n,...o}=t,r=kt(n);return c.jsx(Lr,{...r,...o,ref:e})});kn.displayName=kc;var Dn="MenuPortal",[Dc,qr]=Re(Dn,{forceMount:void 0}),Zr=t=>{const{__scopeMenu:e,forceMount:n,children:o,container:r}=t,a=Ne(Dn,e);return c.jsx(Dc,{scope:e,forceMount:n,children:c.jsx(ie,{present:n||a.open,children:c.jsx(St,{asChild:!0,container:r,children:o})})})};Zr.displayName=Dn;var Q="MenuContent",[jc,jn]=Re(Q),Qr=u.forwardRef((t,e)=>{const n=qr(Q,t.__scopeMenu),{forceMount:o=n.forceMount,...r}=t,a=Ne(Q,t.__scopeMenu),s=Qe(Q,t.__scopeMenu);return c.jsx(He.Provider,{scope:t.__scopeMenu,children:c.jsx(ie,{present:o||a.open,children:c.jsx(He.Slot,{scope:t.__scopeMenu,children:s.modal?c.jsx(Lc,{...r,ref:e}):c.jsx($c,{...r,ref:e})})})})}),Lc=u.forwardRef((t,e)=>{const n=Ne(Q,t.__scopeMenu),o=u.useRef(null),r=G(e,o);return u.useEffect(()=>{const a=o.current;if(a)return Qo(a)},[]),c.jsx(Ln,{...t,ref:r,trapFocus:n.open,disableOutsidePointerEvents:n.open,disableOutsideScroll:!0,onFocusOutside:I(t.onFocusOutside,a=>a.preventDefault(),{checkForDefaultPrevented:!1}),onDismiss:()=>n.onOpenChange(!1)})}),$c=u.forwardRef((t,e)=>{const n=Ne(Q,t.__scopeMenu);return c.jsx(Ln,{...t,ref:e,trapFocus:!1,disableOutsidePointerEvents:!1,disableOutsideScroll:!1,onDismiss:()=>n.onOpenChange(!1)})}),Fc=mt("MenuContent.ScrollLock"),Ln=u.forwardRef((t,e)=>{const{__scopeMenu:n,loop:o=!1,trapFocus:r,onOpenAutoFocus:a,onCloseAutoFocus:s,disableOutsidePointerEvents:i,onEntryFocus:l,onEscapeKeyDown:d,onPointerDownOutside:f,onFocusOutside:p,onInteractOutside:m,onDismiss:g,disableOutsideScroll:y,...h}=t,v=Ne(Q,n),b=Qe(Q,n),x=kt(n),_=Xr(n),w=Mc(n),[E,T]=u.useState(null),C=u.useRef(null),S=G(e,C,v.onContentChange),N=u.useRef(0),R=u.useRef(""),A=u.useRef(0),k=u.useRef(null),j=u.useRef("right"),L=u.useRef(0),B=y?_n:u.Fragment,F=y?{as:Fc,allowPinchZoom:!0}:void 0,W=M=>{const K=R.current+M,ne=w().filter(U=>!U.disabled),be=document.activeElement,$e=ne.find(U=>U.ref.current===be)?.textValue,Fe=ne.map(U=>U.textValue),ot=Zc(Fe,K,$e),xe=ne.find(U=>U.textValue===ot)?.ref.current;(function U(Be){R.current=Be,window.clearTimeout(N.current),Be!==""&&(N.current=window.setTimeout(()=>U(""),1e3))})(K),xe&&setTimeout(()=>xe.focus())};u.useEffect(()=>()=>window.clearTimeout(N.current),[]),Ho();const O=u.useCallback(M=>j.current===k.current?.side&&Jc(M,k.current?.area),[]);return c.jsx(jc,{scope:n,searchRef:R,onItemEnter:u.useCallback(M=>{O(M)&&M.preventDefault()},[O]),onItemLeave:u.useCallback(M=>{O(M)||(C.current?.focus(),T(null))},[O]),onTriggerLeave:u.useCallback(M=>{O(M)&&M.preventDefault()},[O]),pointerGraceTimerRef:A,onPointerGraceIntentChange:u.useCallback(M=>{k.current=M},[]),children:c.jsx(B,{...F,children:c.jsx(wn,{asChild:!0,trapped:r,onMountAutoFocus:I(a,M=>{M.preventDefault(),C.current?.focus({preventScroll:!0})}),onUnmountAutoFocus:s,children:c.jsx(Tt,{asChild:!0,disableOutsidePointerEvents:i,onEscapeKeyDown:d,onPointerDownOutside:f,onFocusOutside:p,onInteractOutside:m,onDismiss:g,children:c.jsx(Ec,{asChild:!0,..._,dir:b.dir,orientation:"vertical",loop:o,currentTabStopId:E,onCurrentTabStopIdChange:T,onEntryFocus:I(l,M=>{b.isUsingKeyboardRef.current||M.preventDefault()}),preventScrollOnEntryFocus:!0,children:c.jsx($r,{role:"menu","aria-orientation":"vertical","data-state":ma(v.open),"data-radix-menu-content":"",dir:b.dir,...x,...h,ref:S,style:{outline:"none",...h.style},onKeyDown:I(h.onKeyDown,M=>{const ne=M.target.closest("[data-radix-menu-content]")===M.currentTarget,be=M.ctrlKey||M.altKey||M.metaKey,$e=M.key.length===1;ne&&(M.key==="Tab"&&M.preventDefault(),!be&&$e&&W(M.key));const Fe=C.current;if(M.target!==Fe||!Rc.includes(M.key))return;M.preventDefault();const xe=w().filter(U=>!U.disabled).map(U=>U.ref.current);Kr.includes(M.key)&&xe.reverse(),Yc(xe)}),onBlur:I(t.onBlur,M=>{M.currentTarget.contains(M.target)||(window.clearTimeout(N.current),R.current="")}),onPointerMove:I(t.onPointerMove,Ue(M=>{const K=M.target,ne=L.current!==M.clientX;if(M.currentTarget.contains(K)&&ne){const be=M.clientX>L.current?"right":"left";j.current=be,L.current=M.clientX}}))})})})})})})});Qr.displayName=Q;var Bc="MenuGroup",$n=u.forwardRef((t,e)=>{const{__scopeMenu:n,...o}=t;return c.jsx(H.div,{role:"group",...o,ref:e})});$n.displayName=Bc;var zc="MenuLabel",Jr=u.forwardRef((t,e)=>{const{__scopeMenu:n,...o}=t;return c.jsx(H.div,{...o,ref:e})});Jr.displayName=zc;var xt="MenuItem",xo="menu.itemSelect",Dt=u.forwardRef((t,e)=>{const{disabled:n=!1,onSelect:o,...r}=t,a=u.useRef(null),s=Qe(xt,t.__scopeMenu),i=jn(xt,t.__scopeMenu),l=G(e,a),d=u.useRef(!1),f=()=>{const p=a.current;if(!n&&p){const m=new CustomEvent(xo,{bubbles:!0,cancelable:!0});p.addEventListener(xo,g=>o?.(g),{once:!0}),Oo(p,m),m.defaultPrevented?d.current=!1:s.onClose()}};return c.jsx(ea,{...r,ref:l,disabled:n,onClick:I(t.onClick,f),onPointerDown:p=>{t.onPointerDown?.(p),d.current=!0},onPointerUp:I(t.onPointerUp,p=>{d.current||p.currentTarget?.click()}),onKeyDown:I(t.onKeyDown,p=>{const m=i.searchRef.current!=="";n||m&&p.key===" "||un.includes(p.key)&&(p.currentTarget.click(),p.preventDefault())})})});Dt.displayName=xt;var ea=u.forwardRef((t,e)=>{const{__scopeMenu:n,disabled:o=!1,textValue:r,...a}=t,s=jn(xt,n),i=Xr(n),l=u.useRef(null),d=G(e,l),[f,p]=u.useState(!1),[m,g]=u.useState("");return u.useEffect(()=>{const y=l.current;y&&g((y.textContent??"").trim())},[a.children]),c.jsx(He.ItemSlot,{scope:n,disabled:o,textValue:r??m,children:c.jsx(Tc,{asChild:!0,...i,focusable:!o,children:c.jsx(H.div,{role:"menuitem","data-highlighted":f?"":void 0,"aria-disabled":o||void 0,"data-disabled":o?"":void 0,...a,ref:d,onPointerMove:I(t.onPointerMove,Ue(y=>{o?s.onItemLeave(y):(s.onItemEnter(y),y.defaultPrevented||y.currentTarget.focus({preventScroll:!0}))})),onPointerLeave:I(t.onPointerLeave,Ue(y=>s.onItemLeave(y))),onFocus:I(t.onFocus,()=>p(!0)),onBlur:I(t.onBlur,()=>p(!1))})})})}),Wc="MenuCheckboxItem",ta=u.forwardRef((t,e)=>{const{checked:n=!1,onCheckedChange:o,...r}=t;return c.jsx(sa,{scope:t.__scopeMenu,checked:n,children:c.jsx(Dt,{role:"menuitemcheckbox","aria-checked":wt(n)?"mixed":n,...r,ref:e,"data-state":Bn(n),onSelect:I(r.onSelect,()=>o?.(wt(n)?!0:!n),{checkForDefaultPrevented:!1})})})});ta.displayName=Wc;var na="MenuRadioGroup",[Hc,Uc]=Re(na,{value:void 0,onValueChange:()=>{}}),oa=u.forwardRef((t,e)=>{const{value:n,onValueChange:o,...r}=t,a=se(o);return c.jsx(Hc,{scope:t.__scopeMenu,value:n,onValueChange:a,children:c.jsx($n,{...r,ref:e})})});oa.displayName=na;var ra="MenuRadioItem",aa=u.forwardRef((t,e)=>{const{value:n,...o}=t,r=Uc(ra,t.__scopeMenu),a=n===r.value;return c.jsx(sa,{scope:t.__scopeMenu,checked:a,children:c.jsx(Dt,{role:"menuitemradio","aria-checked":a,...o,ref:e,"data-state":Bn(a),onSelect:I(o.onSelect,()=>r.onValueChange?.(n),{checkForDefaultPrevented:!1})})})});aa.displayName=ra;var Fn="MenuItemIndicator",[sa,Gc]=Re(Fn,{checked:!1}),ia=u.forwardRef((t,e)=>{const{__scopeMenu:n,forceMount:o,...r}=t,a=Gc(Fn,n);return c.jsx(ie,{present:o||wt(a.checked)||a.checked===!0,children:c.jsx(H.span,{...r,ref:e,"data-state":Bn(a.checked)})})});ia.displayName=Fn;var Kc="MenuSeparator",la=u.forwardRef((t,e)=>{const{__scopeMenu:n,...o}=t;return c.jsx(H.div,{role:"separator","aria-orientation":"horizontal",...o,ref:e})});la.displayName=Kc;var Vc="MenuArrow",ca=u.forwardRef((t,e)=>{const{__scopeMenu:n,...o}=t,r=kt(n);return c.jsx(Fr,{...r,...o,ref:e})});ca.displayName=Vc;var Xc="MenuSub",[fm,ua]=Re(Xc),ze="MenuSubTrigger",da=u.forwardRef((t,e)=>{const n=Ne(ze,t.__scopeMenu),o=Qe(ze,t.__scopeMenu),r=ua(ze,t.__scopeMenu),a=jn(ze,t.__scopeMenu),s=u.useRef(null),{pointerGraceTimerRef:i,onPointerGraceIntentChange:l}=a,d={__scopeMenu:t.__scopeMenu},f=u.useCallback(()=>{s.current&&window.clearTimeout(s.current),s.current=null},[]);return u.useEffect(()=>f,[f]),u.useEffect(()=>{const p=i.current;return()=>{window.clearTimeout(p),l(null)}},[i,l]),c.jsx(kn,{asChild:!0,...d,children:c.jsx(ea,{id:r.triggerId,"aria-haspopup":"menu","aria-expanded":n.open,"aria-controls":r.contentId,"data-state":ma(n.open),...t,ref:vn(e,r.onTriggerChange),onClick:p=>{t.onClick?.(p),!(t.disabled||p.defaultPrevented)&&(p.currentTarget.focus(),n.open||n.onOpenChange(!0))},onPointerMove:I(t.onPointerMove,Ue(p=>{a.onItemEnter(p),!p.defaultPrevented&&!t.disabled&&!n.open&&!s.current&&(a.onPointerGraceIntentChange(null),s.current=window.setTimeout(()=>{n.onOpenChange(!0),f()},100))})),onPointerLeave:I(t.onPointerLeave,Ue(p=>{f();const m=n.content?.getBoundingClientRect();if(m){const g=n.content?.dataset.side,y=g==="right",h=y?-5:5,v=m[y?"left":"right"],b=m[y?"right":"left"];a.onPointerGraceIntentChange({area:[{x:p.clientX+h,y:p.clientY},{x:v,y:m.top},{x:b,y:m.top},{x:b,y:m.bottom},{x:v,y:m.bottom}],side:g}),window.clearTimeout(i.current),i.current=window.setTimeout(()=>a.onPointerGraceIntentChange(null),300)}else{if(a.onTriggerLeave(p),p.defaultPrevented)return;a.onPointerGraceIntentChange(null)}})),onKeyDown:I(t.onKeyDown,p=>{const m=a.searchRef.current!=="";t.disabled||m&&p.key===" "||Nc[o.dir].includes(p.key)&&(n.onOpenChange(!0),n.content?.focus(),p.preventDefault())})})})});da.displayName=ze;var fa="MenuSubContent",pa=u.forwardRef((t,e)=>{const n=qr(Q,t.__scopeMenu),{forceMount:o=n.forceMount,...r}=t,a=Ne(Q,t.__scopeMenu),s=Qe(Q,t.__scopeMenu),i=ua(fa,t.__scopeMenu),l=u.useRef(null),d=G(e,l);return c.jsx(He.Provider,{scope:t.__scopeMenu,children:c.jsx(ie,{present:o||a.open,children:c.jsx(He.Slot,{scope:t.__scopeMenu,children:c.jsx(Ln,{id:i.contentId,"aria-labelledby":i.triggerId,...r,ref:d,align:"start",side:s.dir==="rtl"?"left":"right",disableOutsidePointerEvents:!1,disableOutsideScroll:!1,trapFocus:!1,onOpenAutoFocus:f=>{s.isUsingKeyboardRef.current&&l.current?.focus(),f.preventDefault()},onCloseAutoFocus:f=>f.preventDefault(),onFocusOutside:I(t.onFocusOutside,f=>{f.target!==i.trigger&&a.onOpenChange(!1)}),onEscapeKeyDown:I(t.onEscapeKeyDown,f=>{s.onClose(),f.preventDefault()}),onKeyDown:I(t.onKeyDown,f=>{const p=f.currentTarget.contains(f.target),m=Pc[s.dir].includes(f.key);p&&m&&(a.onOpenChange(!1),i.trigger?.focus(),f.preventDefault())})})})})})});pa.displayName=fa;function ma(t){return t?"open":"closed"}function wt(t){return t==="indeterminate"}function Bn(t){return wt(t)?"indeterminate":t?"checked":"unchecked"}function Yc(t){const e=document.activeElement;for(const n of t)if(n===e||(n.focus(),document.activeElement!==e))return}function qc(t,e){return t.map((n,o)=>t[(e+o)%t.length])}function Zc(t,e,n){const r=e.length>1&&Array.from(e).every(d=>d===e[0])?e[0]:e,a=n?t.indexOf(n):-1;let s=qc(t,Math.max(a,0));r.length===1&&(s=s.filter(d=>d!==n));const l=s.find(d=>d.toLowerCase().startsWith(r.toLowerCase()));return l!==n?l:void 0}function Qc(t,e){const{x:n,y:o}=t;let r=!1;for(let a=0,s=e.length-1;a<e.length;s=a++){const i=e[a],l=e[s],d=i.x,f=i.y,p=l.x,m=l.y;f>o!=m>o&&n<(p-d)*(o-f)/(m-f)+d&&(r=!r)}return r}function Jc(t,e){if(!e)return!1;const n={x:t.clientX,y:t.clientY};return Qc(n,e)}function Ue(t){return e=>e.pointerType==="mouse"?t(e):void 0}var eu=Yr,tu=kn,nu=Zr,ou=Qr,ru=$n,au=Jr,su=Dt,iu=ta,lu=oa,cu=aa,uu=ia,du=la,fu=ca,pu=da,mu=pa,jt="DropdownMenu",[hu]=ye(jt,[Vr]),X=Vr(),[gu,ha]=hu(jt),ga=t=>{const{__scopeDropdownMenu:e,children:n,dir:o,open:r,defaultOpen:a,onOpenChange:s,modal:i=!0}=t,l=X(e),d=u.useRef(null),[f,p]=Xe({prop:r,defaultProp:a??!1,onChange:s,caller:jt});return c.jsx(gu,{scope:e,triggerId:me(),triggerRef:d,contentId:me(),open:f,onOpenChange:p,onOpenToggle:u.useCallback(()=>p(m=>!m),[p]),modal:i,children:c.jsx(eu,{...l,open:f,onOpenChange:p,dir:o,modal:i,children:n})})};ga.displayName=jt;var va="DropdownMenuTrigger",ya=u.forwardRef((t,e)=>{const{__scopeDropdownMenu:n,disabled:o=!1,...r}=t,a=ha(va,n),s=X(n);return c.jsx(tu,{asChild:!0,...s,children:c.jsx(H.button,{type:"button",id:a.triggerId,"aria-haspopup":"menu","aria-expanded":a.open,"aria-controls":a.open?a.contentId:void 0,"data-state":a.open?"open":"closed","data-disabled":o?"":void 0,disabled:o,...r,ref:vn(e,a.triggerRef),onPointerDown:I(t.onPointerDown,i=>{!o&&i.button===0&&i.ctrlKey===!1&&(a.onOpenToggle(),a.open||i.preventDefault())}),onKeyDown:I(t.onKeyDown,i=>{o||(["Enter"," "].includes(i.key)&&a.onOpenToggle(),i.key==="ArrowDown"&&a.onOpenChange(!0),["Enter"," ","ArrowDown"].includes(i.key)&&i.preventDefault())})})})});ya.displayName=va;var vu="DropdownMenuPortal",ba=t=>{const{__scopeDropdownMenu:e,...n}=t,o=X(e);return c.jsx(nu,{...o,...n})};ba.displayName=vu;var xa="DropdownMenuContent",wa=u.forwardRef((t,e)=>{const{__scopeDropdownMenu:n,...o}=t,r=ha(xa,n),a=X(n),s=u.useRef(!1);return c.jsx(ou,{id:r.contentId,"aria-labelledby":r.triggerId,...a,...o,ref:e,onCloseAutoFocus:I(t.onCloseAutoFocus,i=>{s.current||r.triggerRef.current?.focus(),s.current=!1,i.preventDefault()}),onInteractOutside:I(t.onInteractOutside,i=>{const l=i.detail.originalEvent,d=l.button===0&&l.ctrlKey===!0,f=l.button===2||d;(!r.modal||f)&&(s.current=!0)}),style:{...t.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});wa.displayName=xa;var yu="DropdownMenuGroup",_a=u.forwardRef((t,e)=>{const{__scopeDropdownMenu:n,...o}=t,r=X(n);return c.jsx(ru,{...r,...o,ref:e})});_a.displayName=yu;var bu="DropdownMenuLabel",Ca=u.forwardRef((t,e)=>{const{__scopeDropdownMenu:n,...o}=t,r=X(n);return c.jsx(au,{...r,...o,ref:e})});Ca.displayName=bu;var xu="DropdownMenuItem",Ea=u.forwardRef((t,e)=>{const{__scopeDropdownMenu:n,...o}=t,r=X(n);return c.jsx(su,{...r,...o,ref:e})});Ea.displayName=xu;var wu="DropdownMenuCheckboxItem",_u=u.forwardRef((t,e)=>{const{__scopeDropdownMenu:n,...o}=t,r=X(n);return c.jsx(iu,{...r,...o,ref:e})});_u.displayName=wu;var Cu="DropdownMenuRadioGroup",Eu=u.forwardRef((t,e)=>{const{__scopeDropdownMenu:n,...o}=t,r=X(n);return c.jsx(lu,{...r,...o,ref:e})});Eu.displayName=Cu;var Tu="DropdownMenuRadioItem",Su=u.forwardRef((t,e)=>{const{__scopeDropdownMenu:n,...o}=t,r=X(n);return c.jsx(cu,{...r,...o,ref:e})});Su.displayName=Tu;var Ru="DropdownMenuItemIndicator",Nu=u.forwardRef((t,e)=>{const{__scopeDropdownMenu:n,...o}=t,r=X(n);return c.jsx(uu,{...r,...o,ref:e})});Nu.displayName=Ru;var Pu="DropdownMenuSeparator",Ta=u.forwardRef((t,e)=>{const{__scopeDropdownMenu:n,...o}=t,r=X(n);return c.jsx(du,{...r,...o,ref:e})});Ta.displayName=Pu;var Mu="DropdownMenuArrow",Au=u.forwardRef((t,e)=>{const{__scopeDropdownMenu:n,...o}=t,r=X(n);return c.jsx(fu,{...r,...o,ref:e})});Au.displayName=Mu;var Ou="DropdownMenuSubTrigger",Iu=u.forwardRef((t,e)=>{const{__scopeDropdownMenu:n,...o}=t,r=X(n);return c.jsx(pu,{...r,...o,ref:e})});Iu.displayName=Ou;var ku="DropdownMenuSubContent",Du=u.forwardRef((t,e)=>{const{__scopeDropdownMenu:n,...o}=t,r=X(n);return c.jsx(mu,{...r,...o,ref:e,style:{...t.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});Du.displayName=ku;var ju=ga,Lu=ya,$u=ba,Fu=wa,Bu=_a,zu=Ca,Wu=Ea,Hu=Ta,[Lt]=ye("Tooltip",[It]),$t=It(),Sa="TooltipProvider",Uu=700,dn="tooltip.open",[Gu,zn]=Lt(Sa),Ra=t=>{const{__scopeTooltip:e,delayDuration:n=Uu,skipDelayDuration:o=300,disableHoverableContent:r=!1,children:a}=t,s=u.useRef(!0),i=u.useRef(!1),l=u.useRef(0);return u.useEffect(()=>{const d=l.current;return()=>window.clearTimeout(d)},[]),c.jsx(Gu,{scope:e,isOpenDelayedRef:s,delayDuration:n,onOpen:u.useCallback(()=>{window.clearTimeout(l.current),s.current=!1},[]),onClose:u.useCallback(()=>{window.clearTimeout(l.current),l.current=window.setTimeout(()=>s.current=!0,o)},[o]),isPointerInTransitRef:i,onPointerInTransitChange:u.useCallback(d=>{i.current=d},[]),disableHoverableContent:r,children:a})};Ra.displayName=Sa;var Ge="Tooltip",[Ku,Je]=Lt(Ge),Na=t=>{const{__scopeTooltip:e,children:n,open:o,defaultOpen:r,onOpenChange:a,disableHoverableContent:s,delayDuration:i}=t,l=zn(Ge,t.__scopeTooltip),d=$t(e),[f,p]=u.useState(null),m=me(),g=u.useRef(0),y=s??l.disableHoverableContent,h=i??l.delayDuration,v=u.useRef(!1),[b,x]=Xe({prop:o,defaultProp:r??!1,onChange:C=>{C?(l.onOpen(),document.dispatchEvent(new CustomEvent(dn))):l.onClose(),a?.(C)},caller:Ge}),_=u.useMemo(()=>b?v.current?"delayed-open":"instant-open":"closed",[b]),w=u.useCallback(()=>{window.clearTimeout(g.current),g.current=0,v.current=!1,x(!0)},[x]),E=u.useCallback(()=>{window.clearTimeout(g.current),g.current=0,x(!1)},[x]),T=u.useCallback(()=>{window.clearTimeout(g.current),g.current=window.setTimeout(()=>{v.current=!0,x(!0),g.current=0},h)},[h,x]);return u.useEffect(()=>()=>{g.current&&(window.clearTimeout(g.current),g.current=0)},[]),c.jsx(jr,{...d,children:c.jsx(Ku,{scope:e,contentId:m,open:b,stateAttribute:_,trigger:f,onTriggerChange:p,onTriggerEnter:u.useCallback(()=>{l.isOpenDelayedRef.current?T():w()},[l.isOpenDelayedRef,T,w]),onTriggerLeave:u.useCallback(()=>{y?E():(window.clearTimeout(g.current),g.current=0)},[E,y]),onOpen:w,onClose:E,disableHoverableContent:y,children:n})})};Na.displayName=Ge;var fn="TooltipTrigger",Pa=u.forwardRef((t,e)=>{const{__scopeTooltip:n,...o}=t,r=Je(fn,n),a=zn(fn,n),s=$t(n),i=u.useRef(null),l=G(e,i,r.onTriggerChange),d=u.useRef(!1),f=u.useRef(!1),p=u.useCallback(()=>d.current=!1,[]);return u.useEffect(()=>()=>document.removeEventListener("pointerup",p),[p]),c.jsx(Lr,{asChild:!0,...s,children:c.jsx(H.button,{"aria-describedby":r.open?r.contentId:void 0,"data-state":r.stateAttribute,...o,ref:l,onPointerMove:I(t.onPointerMove,m=>{m.pointerType!=="touch"&&!f.current&&!a.isPointerInTransitRef.current&&(r.onTriggerEnter(),f.current=!0)}),onPointerLeave:I(t.onPointerLeave,()=>{r.onTriggerLeave(),f.current=!1}),onPointerDown:I(t.onPointerDown,()=>{r.open&&r.onClose(),d.current=!0,document.addEventListener("pointerup",p,{once:!0})}),onFocus:I(t.onFocus,()=>{d.current||r.onOpen()}),onBlur:I(t.onBlur,r.onClose),onClick:I(t.onClick,r.onClose)})})});Pa.displayName=fn;var Wn="TooltipPortal",[Vu,Xu]=Lt(Wn,{forceMount:void 0}),Ma=t=>{const{__scopeTooltip:e,forceMount:n,children:o,container:r}=t,a=Je(Wn,e);return c.jsx(Vu,{scope:e,forceMount:n,children:c.jsx(ie,{present:n||a.open,children:c.jsx(St,{asChild:!0,container:r,children:o})})})};Ma.displayName=Wn;var De="TooltipContent",Aa=u.forwardRef((t,e)=>{const n=Xu(De,t.__scopeTooltip),{forceMount:o=n.forceMount,side:r="top",...a}=t,s=Je(De,t.__scopeTooltip);return c.jsx(ie,{present:o||s.open,children:s.disableHoverableContent?c.jsx(Oa,{side:r,...a,ref:e}):c.jsx(Yu,{side:r,...a,ref:e})})}),Yu=u.forwardRef((t,e)=>{const n=Je(De,t.__scopeTooltip),o=zn(De,t.__scopeTooltip),r=u.useRef(null),a=G(e,r),[s,i]=u.useState(null),{trigger:l,onClose:d}=n,f=r.current,{onPointerInTransitChange:p}=o,m=u.useCallback(()=>{i(null),p(!1)},[p]),g=u.useCallback((y,h)=>{const v=y.currentTarget,b={x:y.clientX,y:y.clientY},x=Ju(b,v.getBoundingClientRect()),_=ed(b,x),w=td(h.getBoundingClientRect()),E=od([..._,...w]);i(E),p(!0)},[p]);return u.useEffect(()=>()=>m(),[m]),u.useEffect(()=>{if(l&&f){const y=v=>g(v,f),h=v=>g(v,l);return l.addEventListener("pointerleave",y),f.addEventListener("pointerleave",h),()=>{l.removeEventListener("pointerleave",y),f.removeEventListener("pointerleave",h)}}},[l,f,g,m]),u.useEffect(()=>{if(s){const y=h=>{const v=h.target,b={x:h.clientX,y:h.clientY},x=l?.contains(v)||f?.contains(v),_=!nd(b,s);x?m():_&&(m(),d())};return document.addEventListener("pointermove",y),()=>document.removeEventListener("pointermove",y)}},[l,f,s,d,m]),c.jsx(Oa,{...t,ref:a})}),[qu,Zu]=Lt(Ge,{isInside:!1}),Qu=cs("TooltipContent"),Oa=u.forwardRef((t,e)=>{const{__scopeTooltip:n,children:o,"aria-label":r,onEscapeKeyDown:a,onPointerDownOutside:s,...i}=t,l=Je(De,n),d=$t(n),{onClose:f}=l;return u.useEffect(()=>(document.addEventListener(dn,f),()=>document.removeEventListener(dn,f)),[f]),u.useEffect(()=>{if(l.trigger){const p=m=>{m.target?.contains(l.trigger)&&f()};return window.addEventListener("scroll",p,{capture:!0}),()=>window.removeEventListener("scroll",p,{capture:!0})}},[l.trigger,f]),c.jsx(Tt,{asChild:!0,disableOutsidePointerEvents:!1,onEscapeKeyDown:a,onPointerDownOutside:s,onFocusOutside:p=>p.preventDefault(),onDismiss:f,children:c.jsxs($r,{"data-state":l.stateAttribute,...d,...i,ref:e,style:{...i.style,"--radix-tooltip-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-tooltip-content-available-width":"var(--radix-popper-available-width)","--radix-tooltip-content-available-height":"var(--radix-popper-available-height)","--radix-tooltip-trigger-width":"var(--radix-popper-anchor-width)","--radix-tooltip-trigger-height":"var(--radix-popper-anchor-height)"},children:[c.jsx(Qu,{children:o}),c.jsx(qu,{scope:n,isInside:!0,children:c.jsx(Ss,{id:l.contentId,role:"tooltip",children:r||o})})]})})});Aa.displayName=De;var Ia="TooltipArrow",ka=u.forwardRef((t,e)=>{const{__scopeTooltip:n,...o}=t,r=$t(n);return Zu(Ia,n).isInside?null:c.jsx(Fr,{...r,...o,ref:e})});ka.displayName=Ia;function Ju(t,e){const n=Math.abs(e.top-t.y),o=Math.abs(e.bottom-t.y),r=Math.abs(e.right-t.x),a=Math.abs(e.left-t.x);switch(Math.min(n,o,r,a)){case a:return"left";case r:return"right";case n:return"top";case o:return"bottom";default:throw new Error("unreachable")}}function ed(t,e,n=5){const o=[];switch(e){case"top":o.push({x:t.x-n,y:t.y+n},{x:t.x+n,y:t.y+n});break;case"bottom":o.push({x:t.x-n,y:t.y-n},{x:t.x+n,y:t.y-n});break;case"left":o.push({x:t.x+n,y:t.y-n},{x:t.x+n,y:t.y+n});break;case"right":o.push({x:t.x-n,y:t.y-n},{x:t.x-n,y:t.y+n});break}return o}function td(t){const{top:e,right:n,bottom:o,left:r}=t;return[{x:r,y:e},{x:n,y:e},{x:n,y:o},{x:r,y:o}]}function nd(t,e){const{x:n,y:o}=t;let r=!1;for(let a=0,s=e.length-1;a<e.length;s=a++){const i=e[a],l=e[s],d=i.x,f=i.y,p=l.x,m=l.y;f>o!=m>o&&n<(p-d)*(o-f)/(m-f)+d&&(r=!r)}return r}function od(t){const e=t.slice();return e.sort((n,o)=>n.x<o.x?-1:n.x>o.x?1:n.y<o.y?-1:n.y>o.y?1:0),rd(e)}function rd(t){if(t.length<=1)return t.slice();const e=[];for(let o=0;o<t.length;o++){const r=t[o];for(;e.length>=2;){const a=e[e.length-1],s=e[e.length-2];if((a.x-s.x)*(r.y-s.y)>=(a.y-s.y)*(r.x-s.x))e.pop();else break}e.push(r)}e.pop();const n=[];for(let o=t.length-1;o>=0;o--){const r=t[o];for(;n.length>=2;){const a=n[n.length-1],s=n[n.length-2];if((a.x-s.x)*(r.y-s.y)>=(a.y-s.y)*(r.x-s.x))n.pop();else break}n.push(r)}return n.pop(),e.length===1&&n.length===1&&e[0].x===n[0].x&&e[0].y===n[0].y?e:e.concat(n)}var ad=Ra,sd=Na,id=Pa,ld=Ma,cd=Aa,ud=ka;const dd=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],fd=Y("ChevronRight",dd);const pd=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]],md=Y("ChevronUp",pd);const hd=[["path",{d:"m7 15 5 5 5-5",key:"1hf1tw"}],["path",{d:"m7 9 5-5 5 5",key:"sgt6xg"}]],gd=Y("ChevronsUpDown",hd);const vd=[["path",{d:"M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16",key:"1ifwr1"}],["path",{d:"m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9",key:"17abbs"}],["path",{d:"m2 15 6 6",key:"10dquu"}],["path",{d:"M19.5 8.5c.7-.7 1.5-1.6 1.5-2.7A2.73 2.73 0 0 0 16 4a2.78 2.78 0 0 0-5 1.8c0 1.2.8 2 1.5 2.8L16 12Z",key:"1h3036"}]],yd=Y("HandHeart",vd);const bd=[["path",{d:"m11 17 2 2a1 1 0 1 0 3-3",key:"efffak"}],["path",{d:"m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4",key:"9pr0kb"}],["path",{d:"m21 3 1 11h-2",key:"1tisrp"}],["path",{d:"M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3",key:"1uvwmv"}],["path",{d:"M3 4h8",key:"1ep09j"}]],xd=Y("Handshake",bd);const wd=[["path",{d:"m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4",key:"g0fldk"}],["path",{d:"m21 2-9.6 9.6",key:"1j0ho8"}],["circle",{cx:"7.5",cy:"15.5",r:"5.5",key:"yqb3hr"}]],_d=Y("Key",wd);const Cd=[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1",key:"1g98yp"}],["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1",key:"6d4xhi"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1",key:"nxv5o0"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1",key:"1bb6yr"}]],wo=Y("LayoutGrid",Cd);const Ed=[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]],Td=Y("LogOut",Ed);const Sd=[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",key:"vv11sd"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]],Rd=Y("MessageCircleQuestion",Sd);const Nd=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M9 3v18",key:"fh3hqa"}]],Pd=Y("PanelLeft",Nd);const Md=[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],Ad=Y("Settings",Md);const Od=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"M8 12h.01",key:"czm47f"}],["path",{d:"M12 12h.01",key:"1mp3jc"}],["path",{d:"M16 12h.01",key:"1l6xoz"}]],Id=Y("ShieldEllipsis",Od);const kd=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]],Dd=Y("Shield",kd);const jd=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]],_o=Y("Users",jd);var Ld=Symbol.for("react.lazy"),_t=Mo[" use ".trim().toString()];function $d(t){return typeof t=="object"&&t!==null&&"then"in t}function Da(t){return t!=null&&typeof t=="object"&&"$$typeof"in t&&t.$$typeof===Ld&&"_payload"in t&&$d(t._payload)}function ja(t){const e=Fd(t),n=u.forwardRef((o,r)=>{let{children:a,...s}=o;Da(a)&&typeof _t=="function"&&(a=_t(a._payload));const i=u.Children.toArray(a),l=i.find(zd);if(l){const d=l.props.children,f=i.map(p=>p===l?u.Children.count(d)>1?u.Children.only(null):u.isValidElement(d)?d.props.children:null:p);return c.jsx(e,{...s,ref:r,children:u.isValidElement(d)?u.cloneElement(d,void 0,f):null})}return c.jsx(e,{...s,ref:r,children:a})});return n.displayName=`${t}.Slot`,n}var et=ja("Slot");function Fd(t){const e=u.forwardRef((n,o)=>{let{children:r,...a}=n;if(Da(r)&&typeof _t=="function"&&(r=_t(r._payload)),u.isValidElement(r)){const s=Hd(r),i=Wd(a,r.props);return r.type!==u.Fragment&&(i.ref=o?vn(o,s):s),u.cloneElement(r,i)}return u.Children.count(r)>1?u.Children.only(null):null});return e.displayName=`${t}.SlotClone`,e}var Bd=Symbol("radix.slottable");function zd(t){return u.isValidElement(t)&&typeof t.type=="function"&&"__radixId"in t.type&&t.type.__radixId===Bd}function Wd(t,e){const n={...e};for(const o in e){const r=t[o],a=e[o];/^on[A-Z]/.test(o)?r&&a?n[o]=(...i)=>{const l=a(...i);return r(...i),l}:r&&(n[o]=r):o==="style"?n[o]={...r,...a}:o==="className"&&(n[o]=[r,a].filter(Boolean).join(" "))}return{...t,...n}}function Hd(t){let e=Object.getOwnPropertyDescriptor(t.props,"ref")?.get,n=e&&"isReactWarning"in e&&e.isReactWarning;return n?t.ref:(e=Object.getOwnPropertyDescriptor(t,"ref")?.get,n=e&&"isReactWarning"in e&&e.isReactWarning,n?t.props.ref:t.props.ref||t.ref)}const Ud=Ao("inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",{variants:{variant:{default:"border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",secondary:"border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",destructive:"border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",outline:"text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"}},defaultVariants:{variant:"default"}});function Gd(t){const e=P.c(12);let n,o,r,a;e[0]!==t?({className:n,variant:a,asChild:r,...o}=t,e[0]=t,e[1]=n,e[2]=o,e[3]=r,e[4]=a):(n=e[1],o=e[2],r=e[3],a=e[4]);const i=(r===void 0?!1:r)?et:"span";let l;e[5]!==n||e[6]!==a?(l=D(Ud({variant:a}),n),e[5]=n,e[6]=a,e[7]=l):l=e[7];let d;return e[8]!==i||e[9]!==o||e[10]!==l?(d=c.jsx(i,{"data-slot":"badge",className:l,...o}),e[8]=i,e[9]=o,e[10]=l,e[11]=d):d=e[11],d}const Kd=768,pt=typeof window>"u"?void 0:window.matchMedia(`(max-width: ${Kd-1}px)`);function Vd(t){return pt?(pt.addEventListener("change",t),()=>{pt.removeEventListener("change",t)}):()=>{}}function Xd(){return pt?.matches??!1}function Yd(){return!1}function La(){return u.useSyncExternalStore(Vd,Xd,Yd)}var qd=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"],Hn=qd.reduce((t,e)=>{const n=ja(`Primitive.${e}`),o=u.forwardRef((r,a)=>{const{asChild:s,...i}=r,l=s?n:e;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),c.jsx(l,{...i,ref:a})});return o.displayName=`Primitive.${e}`,{...t,[e]:o}},{});function Zd(t){const e=P.c(4);let n;e[0]!==t?({...n}=t,e[0]=t,e[1]=n):n=e[1];let o;return e[2]!==n?(o=c.jsx(Ui,{"data-slot":"sheet",...n}),e[2]=n,e[3]=o):o=e[3],o}function Qd(t){const e=P.c(4);let n;e[0]!==t?({...n}=t,e[0]=t,e[1]=n):n=e[1];let o;return e[2]!==n?(o=c.jsx(Gi,{"data-slot":"sheet-portal",...n}),e[2]=n,e[3]=o):o=e[3],o}function Jd(t){const e=P.c(8);let n,o;e[0]!==t?({className:n,...o}=t,e[0]=t,e[1]=n,e[2]=o):(n=e[1],o=e[2]);let r;e[3]!==n?(r=D("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80",n),e[3]=n,e[4]=r):r=e[4];let a;return e[5]!==o||e[6]!==r?(a=c.jsx(Ki,{"data-slot":"sheet-overlay",className:r,...o}),e[5]=o,e[6]=r,e[7]=a):a=e[7],a}function ef(t){const e=P.c(17);let n,o,r,a;e[0]!==t?({className:o,children:n,side:a,...r}=t,e[0]=t,e[1]=n,e[2]=o,e[3]=r,e[4]=a):(n=e[1],o=e[2],r=e[3],a=e[4]);const s=a===void 0?"right":a;let i;e[5]===Symbol.for("react.memo_cache_sentinel")?(i=c.jsx(Jd,{}),e[5]=i):i=e[5];const l=s==="right"&&"data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",d=s==="left"&&"data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",f=s==="top"&&"data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",p=s==="bottom"&&"data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t";let m;e[6]!==o||e[7]!==l||e[8]!==d||e[9]!==f||e[10]!==p?(m=D("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",l,d,f,p,o),e[6]=o,e[7]=l,e[8]=d,e[9]=f,e[10]=p,e[11]=m):m=e[11];let g;e[12]===Symbol.for("react.memo_cache_sentinel")?(g=c.jsxs(qi,{className:"ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none",children:[c.jsx(ms,{className:"size-4"}),c.jsx("span",{className:"sr-only",children:"Close"})]}),e[12]=g):g=e[12];let y;return e[13]!==n||e[14]!==r||e[15]!==m?(y=c.jsxs(Qd,{children:[i,c.jsxs(Vi,{"data-slot":"sheet-content",className:m,...r,children:[n,g]})]}),e[13]=n,e[14]=r,e[15]=m,e[16]=y):y=e[16],y}function tf(t){const e=P.c(8);let n,o;e[0]!==t?({className:n,...o}=t,e[0]=t,e[1]=n,e[2]=o):(n=e[1],o=e[2]);let r;e[3]!==n?(r=D("flex flex-col gap-1.5 p-4",n),e[3]=n,e[4]=r):r=e[4];let a;return e[5]!==o||e[6]!==r?(a=c.jsx("div",{"data-slot":"sheet-header",className:r,...o}),e[5]=o,e[6]=r,e[7]=a):a=e[7],a}function nf(t){const e=P.c(8);let n,o;e[0]!==t?({className:n,...o}=t,e[0]=t,e[1]=n,e[2]=o):(n=e[1],o=e[2]);let r;e[3]!==n?(r=D("text-foreground font-semibold",n),e[3]=n,e[4]=r):r=e[4];let a;return e[5]!==o||e[6]!==r?(a=c.jsx(Xi,{"data-slot":"sheet-title",className:r,...o}),e[5]=o,e[6]=r,e[7]=a):a=e[7],a}function of(t){const e=P.c(8);let n,o;e[0]!==t?({className:n,...o}=t,e[0]=t,e[1]=n,e[2]=o):(n=e[1],o=e[2]);let r;e[3]!==n?(r=D("text-muted-foreground text-sm",n),e[3]=n,e[4]=r):r=e[4];let a;return e[5]!==o||e[6]!==r?(a=c.jsx(Yi,{"data-slot":"sheet-description",className:r,...o}),e[5]=o,e[6]=r,e[7]=a):a=e[7],a}function $a(t){const e=P.c(6);let n,o;e[0]!==t?({delayDuration:o,...n}=t,e[0]=t,e[1]=n,e[2]=o):(n=e[1],o=e[2]);const r=o===void 0?0:o;let a;return e[3]!==r||e[4]!==n?(a=c.jsx(ad,{"data-slot":"tooltip-provider",delayDuration:r,...n}),e[3]=r,e[4]=n,e[5]=a):a=e[5],a}function rf(t){const e=P.c(4);let n;e[0]!==t?({...n}=t,e[0]=t,e[1]=n):n=e[1];let o;return e[2]!==n?(o=c.jsx($a,{children:c.jsx(sd,{"data-slot":"tooltip",...n})}),e[2]=n,e[3]=o):o=e[3],o}function af(t){const e=P.c(4);let n;e[0]!==t?({...n}=t,e[0]=t,e[1]=n):n=e[1];let o;return e[2]!==n?(o=c.jsx(id,{"data-slot":"tooltip-trigger",...n}),e[2]=n,e[3]=o):o=e[3],o}function sf(t){const e=P.c(13);let n,o,r,a;e[0]!==t?({className:o,sideOffset:a,children:n,...r}=t,e[0]=t,e[1]=n,e[2]=o,e[3]=r,e[4]=a):(n=e[1],o=e[2],r=e[3],a=e[4]);const s=a===void 0?4:a;let i;e[5]!==o?(i=D("bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-w-sm rounded-md px-3 py-1.5 text-xs",o),e[5]=o,e[6]=i):i=e[6];let l;e[7]===Symbol.for("react.memo_cache_sentinel")?(l=c.jsx(ud,{className:"bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]"}),e[7]=l):l=e[7];let d;return e[8]!==n||e[9]!==r||e[10]!==s||e[11]!==i?(d=c.jsx(ld,{children:c.jsxs(cd,{"data-slot":"tooltip-content",sideOffset:s,className:i,...r,children:[n,l]})}),e[8]=n,e[9]=r,e[10]=s,e[11]=i,e[12]=d):d=e[12],d}const lf="sidebar_state",cf=3600*24*7,uf="16rem",df="18rem",ff="3rem",pf="b",Fa=u.createContext(null);function Ft(){const t=u.useContext(Fa);if(!t)throw new Error("useSidebar must be used within a SidebarProvider.");return t}function mf(t){const e=P.c(36);let n,o,r,a,s,i,l;e[0]!==t?({defaultOpen:l,open:r,onOpenChange:s,className:o,style:i,children:n,...a}=t,e[0]=t,e[1]=n,e[2]=o,e[3]=r,e[4]=a,e[5]=s,e[6]=i,e[7]=l):(n=e[1],o=e[2],r=e[3],a=e[4],s=e[5],i=e[6],l=e[7]);const d=l===void 0?!0:l,f=La(),[p,m]=u.useState(!1),[g,y]=u.useState(d),h=r??g;let v;e[8]!==h||e[9]!==s?(v=L=>{const B=typeof L=="function"?L(h):L;s?s(B):y(B),document.cookie=`${lf}=${B}; path=/; max-age=${cf}`},e[8]=h,e[9]=s,e[10]=v):v=e[10];const b=v;let x;e[11]!==f||e[12]!==b?(x=()=>f?m(gf):b(hf),e[11]=f,e[12]=b,e[13]=x):x=e[13];const _=x;let w,E;e[14]!==_?(w=()=>{const L=B=>{B.key===pf&&(B.metaKey||B.ctrlKey)&&(B.preventDefault(),_())};return window.addEventListener("keydown",L),()=>window.removeEventListener("keydown",L)},E=[_],e[14]=_,e[15]=w,e[16]=E):(w=e[15],E=e[16]),u.useEffect(w,E);const T=h?"expanded":"collapsed";let C;e[17]!==f||e[18]!==h||e[19]!==p||e[20]!==b||e[21]!==T||e[22]!==_?(C={state:T,open:h,setOpen:b,isMobile:f,openMobile:p,setOpenMobile:m,toggleSidebar:_},e[17]=f,e[18]=h,e[19]=p,e[20]=b,e[21]=T,e[22]=_,e[23]=C):C=e[23];const S=C;let N;e[24]!==i?(N={"--sidebar-width":uf,"--sidebar-width-icon":ff,...i},e[24]=i,e[25]=N):N=e[25];const R=N;let A;e[26]!==o?(A=D("group/sidebar-wrapper has-data-[variant=inset]:bg-slate-950 flex min-h-svh w-full",o),e[26]=o,e[27]=A):A=e[27];let k;e[28]!==n||e[29]!==a||e[30]!==R||e[31]!==A?(k=c.jsx($a,{delayDuration:0,children:c.jsx("div",{"data-slot":"sidebar-wrapper",style:R,className:A,...a,children:n})}),e[28]=n,e[29]=a,e[30]=R,e[31]=A,e[32]=k):k=e[32];let j;return e[33]!==S||e[34]!==k?(j=c.jsx(Fa.Provider,{value:S,children:k}),e[33]=S,e[34]=k,e[35]=j):j=e[35],j}function hf(t){return!t}function gf(t){return!t}function vf(t){const e=P.c(46);let n,o,r,a,s,i;e[0]!==t?({side:a,variant:s,collapsible:i,className:o,children:n,...r}=t,e[0]=t,e[1]=n,e[2]=o,e[3]=r,e[4]=a,e[5]=s,e[6]=i):(n=e[1],o=e[2],r=e[3],a=e[4],s=e[5],i=e[6]);const l=a===void 0?"left":a,d=s===void 0?"sidebar":s,f=i===void 0?"offcanvas":i,{isMobile:p,state:m,openMobile:g,setOpenMobile:y}=Ft();if(f==="none"){let N;e[7]!==o?(N=D("bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col",o),e[7]=o,e[8]=N):N=e[8];let R;return e[9]!==n||e[10]!==r||e[11]!==N?(R=c.jsx("div",{"data-slot":"sidebar",className:N,...r,children:n}),e[9]=n,e[10]=r,e[11]=N,e[12]=R):R=e[12],R}if(p){let N;e[13]===Symbol.for("react.memo_cache_sentinel")?(N=c.jsxs(tf,{className:"sr-only",children:[c.jsx(nf,{children:"Sidebar"}),c.jsx(of,{children:"Displays the mobile sidebar."})]}),e[13]=N):N=e[13];let R;e[14]===Symbol.for("react.memo_cache_sentinel")?(R={"--sidebar-width":df},e[14]=R):R=e[14];let A;e[15]!==n?(A=c.jsx("div",{className:"flex h-full w-full flex-col",children:n}),e[15]=n,e[16]=A):A=e[16];let k;e[17]!==l||e[18]!==A?(k=c.jsx(ef,{"data-sidebar":"sidebar","data-slot":"sidebar","data-mobile":"true",className:"bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden",style:R,side:l,children:A}),e[17]=l,e[18]=A,e[19]=k):k=e[19];let j;return e[20]!==g||e[21]!==r||e[22]!==y||e[23]!==k?(j=c.jsxs(Zd,{open:g,onOpenChange:y,...r,children:[N,k]}),e[20]=g,e[21]=r,e[22]=y,e[23]=k,e[24]=j):j=e[24],j}const h=m==="collapsed"?f:"",v=d==="floating"||d==="inset"?"group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]":"group-data-[collapsible=icon]:w-(--sidebar-width-icon)";let b;e[25]!==v?(b=D("relative h-svh w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear","group-data-[collapsible=offcanvas]:w-0","group-data-[side=right]:rotate-180",v),e[25]=v,e[26]=b):b=e[26];let x;e[27]!==b?(x=c.jsx("div",{className:b}),e[27]=b,e[28]=x):x=e[28];const _=l==="left"?"left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]":"right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",w=d==="floating"||d==="inset"?"p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]":"group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l";let E;e[29]!==o||e[30]!==_||e[31]!==w?(E=D("fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",_,w,o),e[29]=o,e[30]=_,e[31]=w,e[32]=E):E=e[32];let T;e[33]!==n?(T=c.jsx("div",{"data-sidebar":"sidebar",className:"bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm",children:n}),e[33]=n,e[34]=T):T=e[34];let C;e[35]!==r||e[36]!==E||e[37]!==T?(C=c.jsx("div",{className:E,...r,children:T}),e[35]=r,e[36]=E,e[37]=T,e[38]=C):C=e[38];let S;return e[39]!==l||e[40]!==m||e[41]!==C||e[42]!==h||e[43]!==x||e[44]!==d?(S=c.jsxs("div",{className:"group peer text-sidebar-foreground hidden md:block","data-state":m,"data-collapsible":h,"data-variant":d,"data-side":l,"data-slot":"sidebar",children:[x,C]}),e[39]=l,e[40]=m,e[41]=C,e[42]=h,e[43]=x,e[44]=d,e[45]=S):S=e[45],S}function yf(t){const e=P.c(15);let n,o,r;e[0]!==t?({className:n,onClick:o,...r}=t,e[0]=t,e[1]=n,e[2]=o,e[3]=r):(n=e[1],o=e[2],r=e[3]);const{toggleSidebar:a}=Ft();let s;e[4]!==n?(s=D("h-7 w-7",n),e[4]=n,e[5]=s):s=e[5];let i;e[6]!==o||e[7]!==a?(i=p=>{o?.(p),a()},e[6]=o,e[7]=a,e[8]=i):i=e[8];let l,d;e[9]===Symbol.for("react.memo_cache_sentinel")?(l=c.jsx(Pd,{}),d=c.jsx("span",{className:"sr-only",children:"Toggle Sidebar"}),e[9]=l,e[10]=d):(l=e[9],d=e[10]);let f;return e[11]!==r||e[12]!==s||e[13]!==i?(f=c.jsxs(us,{"data-sidebar":"trigger","data-slot":"sidebar-trigger",variant:"ghost",size:"icon",className:s,onClick:i,...r,children:[l,d]}),e[11]=r,e[12]=s,e[13]=i,e[14]=f):f=e[14],f}function bf(t){const e=P.c(8);let n,o;e[0]!==t?({className:n,...o}=t,e[0]=t,e[1]=n,e[2]=o):(n=e[1],o=e[2]);let r;e[3]!==n?(r=D("bg-background relative flex max-w-full min-h-svh flex-1 flex-col","peer-data-[variant=inset]:min-h-[calc(100svh-(--spacing(4)))] md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-0",n),e[3]=n,e[4]=r):r=e[4];let a;return e[5]!==o||e[6]!==r?(a=c.jsx("main",{"data-slot":"sidebar-inset",className:r,...o}),e[5]=o,e[6]=r,e[7]=a):a=e[7],a}function xf(t){const e=P.c(8);let n,o;e[0]!==t?({className:n,...o}=t,e[0]=t,e[1]=n,e[2]=o):(n=e[1],o=e[2]);let r;e[3]!==n?(r=D("flex flex-col gap-2 p-2",n),e[3]=n,e[4]=r):r=e[4];let a;return e[5]!==o||e[6]!==r?(a=c.jsx("div",{"data-slot":"sidebar-header","data-sidebar":"header",className:r,...o}),e[5]=o,e[6]=r,e[7]=a):a=e[7],a}function wf(t){const e=P.c(8);let n,o;e[0]!==t?({className:n,...o}=t,e[0]=t,e[1]=n,e[2]=o):(n=e[1],o=e[2]);let r;e[3]!==n?(r=D("flex flex-col gap-2 p-2",n),e[3]=n,e[4]=r):r=e[4];let a;return e[5]!==o||e[6]!==r?(a=c.jsx("div",{"data-slot":"sidebar-footer","data-sidebar":"footer",className:r,...o}),e[5]=o,e[6]=r,e[7]=a):a=e[7],a}function _f(t){const e=P.c(8);let n,o;e[0]!==t?({className:n,...o}=t,e[0]=t,e[1]=n,e[2]=o):(n=e[1],o=e[2]);let r;e[3]!==n?(r=D("flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",n),e[3]=n,e[4]=r):r=e[4];let a;return e[5]!==o||e[6]!==r?(a=c.jsx("div",{"data-slot":"sidebar-content","data-sidebar":"content",className:r,...o}),e[5]=o,e[6]=r,e[7]=a):a=e[7],a}function Cf(t){const e=P.c(8);let n,o;e[0]!==t?({className:n,...o}=t,e[0]=t,e[1]=n,e[2]=o):(n=e[1],o=e[2]);let r;e[3]!==n?(r=D("relative flex w-full min-w-0 flex-col p-2",n),e[3]=n,e[4]=r):r=e[4];let a;return e[5]!==o||e[6]!==r?(a=c.jsx("div",{"data-slot":"sidebar-group","data-sidebar":"group",className:r,...o}),e[5]=o,e[6]=r,e[7]=a):a=e[7],a}function Ef(t){const e=P.c(10);let n,o,r;e[0]!==t?({className:n,asChild:r,...o}=t,e[0]=t,e[1]=n,e[2]=o,e[3]=r):(n=e[1],o=e[2],r=e[3]);const s=(r===void 0?!1:r)?et:"div";let i;e[4]!==n?(i=D("text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0","group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:select-none group-data-[collapsible=icon]:pointer-events-none",n),e[4]=n,e[5]=i):i=e[5];let l;return e[6]!==s||e[7]!==o||e[8]!==i?(l=c.jsx(s,{"data-slot":"sidebar-group-label","data-sidebar":"group-label",className:i,...o}),e[6]=s,e[7]=o,e[8]=i,e[9]=l):l=e[9],l}function Ct(t){const e=P.c(8);let n,o;e[0]!==t?({className:n,...o}=t,e[0]=t,e[1]=n,e[2]=o):(n=e[1],o=e[2]);let r;e[3]!==n?(r=D("flex w-full min-w-0 flex-col gap-1",n),e[3]=n,e[4]=r):r=e[4];let a;return e[5]!==o||e[6]!==r?(a=c.jsx("ul",{"data-slot":"sidebar-menu","data-sidebar":"menu",className:r,...o}),e[5]=o,e[6]=r,e[7]=a):a=e[7],a}function Un(t){const e=P.c(8);let n,o;e[0]!==t?({className:n,...o}=t,e[0]=t,e[1]=n,e[2]=o):(n=e[1],o=e[2]);let r;e[3]!==n?(r=D("group/menu-item relative",n),e[3]=n,e[4]=r):r=e[4];let a;return e[5]!==o||e[6]!==r?(a=c.jsx("li",{"data-slot":"sidebar-menu-item","data-sidebar":"menu-item",className:r,...o}),e[5]=o,e[6]=r,e[7]=a):a=e[7],a}const Tf=Ao("peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",{variants:{variant:{default:"hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",outline:"bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"h-8 text-sm",sm:"h-7 text-xs",lg:"h-12 text-sm group-data-[collapsible=icon]:p-0!"}},defaultVariants:{variant:"default",size:"default"}});function Gn(t){const e=P.c(28);let n,o,r,a,s,i,l;e[0]!==t?({asChild:r,isActive:a,variant:s,size:i,tooltip:l,className:n,...o}=t,e[0]=t,e[1]=n,e[2]=o,e[3]=r,e[4]=a,e[5]=s,e[6]=i,e[7]=l):(n=e[1],o=e[2],r=e[3],a=e[4],s=e[5],i=e[6],l=e[7]);const d=r===void 0?!1:r,f=a===void 0?!1:a,p=s===void 0?"default":s,m=i===void 0?"default":i,g=d?et:"button",{isMobile:y,state:h}=Ft();let v;e[8]!==n||e[9]!==m||e[10]!==p?(v=D(Tf({variant:p,size:m}),n),e[8]=n,e[9]=m,e[10]=p,e[11]=v):v=e[11];let b;e[12]!==g||e[13]!==f||e[14]!==o||e[15]!==m||e[16]!==v?(b=c.jsx(g,{"data-slot":"sidebar-menu-button","data-sidebar":"menu-button","data-size":m,"data-active":f,className:v,...o}),e[12]=g,e[13]=f,e[14]=o,e[15]=m,e[16]=v,e[17]=b):b=e[17];const x=b;if(!l)return x;if(typeof l=="string"){let C;e[18]!==l?(C={children:l},e[18]=l,e[19]=C):C=e[19],l=C}let _;e[20]!==x?(_=c.jsx(af,{asChild:!0,children:x}),e[20]=x,e[21]=_):_=e[21];const w=h!=="collapsed"||y;let E;e[22]!==w||e[23]!==l?(E=c.jsx(sf,{side:"right",align:"center",hidden:w,...l}),e[22]=w,e[23]=l,e[24]=E):E=e[24];let T;return e[25]!==_||e[26]!==E?(T=c.jsxs(rf,{children:[_,E]}),e[25]=_,e[26]=E,e[27]=T):T=e[27],T}function Sf(t){const e=P.c(8);let n,o;e[0]!==t?({className:n,...o}=t,e[0]=t,e[1]=n,e[2]=o):(n=e[1],o=e[2]);let r;e[3]!==n?(r=D("border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5","group-data-[collapsible=icon]:hidden",n),e[3]=n,e[4]=r):r=e[4];let a;return e[5]!==o||e[6]!==r?(a=c.jsx("ul",{"data-slot":"sidebar-menu-sub","data-sidebar":"menu-sub",className:r,...o}),e[5]=o,e[6]=r,e[7]=a):a=e[7],a}function Rf(t){const e=P.c(8);let n,o;e[0]!==t?({className:n,...o}=t,e[0]=t,e[1]=n,e[2]=o):(n=e[1],o=e[2]);let r;e[3]!==n?(r=D("group/menu-sub-item relative",n),e[3]=n,e[4]=r):r=e[4];let a;return e[5]!==o||e[6]!==r?(a=c.jsx("li",{"data-slot":"sidebar-menu-sub-item","data-sidebar":"menu-sub-item",className:r,...o}),e[5]=o,e[6]=r,e[7]=a):a=e[7],a}function Nf(t){const e=P.c(16);let n,o,r,a,s;e[0]!==t?({asChild:r,size:a,isActive:s,className:n,...o}=t,e[0]=t,e[1]=n,e[2]=o,e[3]=r,e[4]=a,e[5]=s):(n=e[1],o=e[2],r=e[3],a=e[4],s=e[5]);const i=r===void 0?!1:r,l=a===void 0?"md":a,d=s===void 0?!1:s,f=i?et:"a",p=l==="sm"&&"text-xs",m=l==="md"&&"text-sm";let g;e[6]!==n||e[7]!==p||e[8]!==m?(g=D("text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-hidden focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0","data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",p,m,"group-data-[collapsible=icon]:hidden",n),e[6]=n,e[7]=p,e[8]=m,e[9]=g):g=e[9];let y;return e[10]!==f||e[11]!==d||e[12]!==o||e[13]!==l||e[14]!==g?(y=c.jsx(f,{"data-slot":"sidebar-menu-sub-button","data-sidebar":"menu-sub-button","data-size":l,"data-active":d,className:g,...o}),e[10]=f,e[11]=d,e[12]=o,e[13]=l,e[14]=g,e[15]=y):y=e[15],y}function Pf(t){const e=P.c(10);let n,o,r;if(e[0]!==t?({variant:r,children:n,...o}=t,e[0]=t,e[1]=n,e[2]=o,e[3]=r):(n=e[1],o=e[2],r=e[3]),(r===void 0?"header":r)==="sidebar"){let i;return e[4]!==n||e[5]!==o?(i=c.jsx(bf,{...o,children:n}),e[4]=n,e[5]=o,e[6]=i):i=e[6],i}let s;return e[7]!==n||e[8]!==o?(s=c.jsx("main",{className:"mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4 rounded-xl bg-slate-950!",...o,children:n}),e[7]=n,e[8]=o,e[9]=s):s=e[9],s}function Mf(t){const e=P.c(5),{children:n,variant:o}=t,r=o===void 0?"header":o,a=Ve().props.sidebarOpen;if(r==="header"){let i;return e[0]!==n?(i=c.jsx("div",{className:"flex min-h-screen w-full flex-col",children:n}),e[0]=n,e[1]=i):i=e[1],i}let s;return e[2]!==n||e[3]!==a?(s=c.jsx(mf,{defaultOpen:a,children:n}),e[2]=n,e[3]=a,e[4]=s):s=e[4],s}function Co(t){const e=P.c(4);let n;e[0]!==t?({...n}=t,e[0]=t,e[1]=n):n=e[1];let o;return e[2]!==n?(o=c.jsx(Os,{"data-slot":"collapsible",...n}),e[2]=n,e[3]=o):o=e[3],o}function Eo(t){const e=P.c(4);let n;e[0]!==t?({...n}=t,e[0]=t,e[1]=n):n=e[1];let o;return e[2]!==n?(o=c.jsx(Lo,{"data-slot":"collapsible-trigger",...n}),e[2]=n,e[3]=o):o=e[3],o}function To(t){const e=P.c(4);let n;e[0]!==t?({...n}=t,e[0]=t,e[1]=n):n=e[1];let o;return e[2]!==n?(o=c.jsx($o,{"data-slot":"collapsible-content",...n}),e[2]=n,e[3]=o):o=e[3],o}function Af(t){const e=P.c(20),{items:n,groupTitle:o,newOrdersCount:r}=t,{url:a}=Ve();let s;e[0]===Symbol.for("react.memo_cache_sentinel")?(s={},e[0]=s):s=e[0];const[i,l]=u.useState(s),[d,f]=u.useState(o==="CMS");let p;e[1]!==a?(p=w=>w==="/cpanel"?a===w:w.includes("/settings/")?a.startsWith("/cpanel/settings/")||a.startsWith(w):a.startsWith(w)||a===w,e[1]=a,e[2]=p):p=e[2];const m=p;let g;e[3]===Symbol.for("react.memo_cache_sentinel")?(g=w=>{l(E=>({...E,[w]:!E[w]}))},e[3]=g):g=e[3];const y=g;let h;e[4]!==m||e[5]!==r||e[6]!==i?(h=(w,E)=>{const T=E===void 0?0:E,C=w.items&&w.items.length>0,S=m(w.href.toString())||w.isActive,N=i[w.href.toString()]??S;return c.jsx(Co,{open:N,onOpenChange:()=>y(w.href.toString()),className:D("transition-colors duration-200",S&&"",T>0&&"border-border/20 ml-4 border-l-2"),children:c.jsxs(Un,{children:[c.jsx(Eo,{asChild:!0,children:c.jsx(Gn,{asChild:!0,className:D("w-full",S?"bg-primary dark:bg-accent-foreground font-semibold dark:text-black!":"text-foreground hover:bg-white/10!"),children:c.jsxs("div",{className:"flex w-full items-center justify-between",children:[c.jsxs(_e,{href:w.href,className:D("flex flex-1 items-center gap-2 text-sm","transition-colors duration-200",S?"text-slate-800 font-bold":"text-accent/70 dark:text-white/70",T>0&&"text-xs"),children:[w.icon&&c.jsx(w.icon,{className:"h-4 w-4 shrink-0"}),c.jsx("span",{className:"truncate",children:w.title})]}),r?w.title==="Daftar Pesanan"&&r>0&&c.jsx(Gd,{className:"animate-pulse h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500 hover:bg-red-600",children:r}):null,C&&c.jsx(Vn,{className:D("h-4 w-4 transition-transform duration-200",N?"rotate-180":"")})]})})}),C&&c.jsx(To,{children:c.jsx(Sf,{children:w.items?.map(R=>c.jsx(Rf,{className:D("border-border/20 ml-2 border-l-2",m(R.href.toString())&&"border-primary/50"),children:c.jsx(Nf,{asChild:!0,children:c.jsxs(_e,{href:R.href,className:D("flex items-center gap-2 text-sm",m(R.href.toString())?"text-foreground font-medium":"text-muted-foreground hover:text-foreground","transition-colors duration-200"),children:[R.icon&&c.jsx(R.icon,{className:"h-3.5 w-3.5 shrink-0"}),c.jsx("span",{className:"truncate",children:R.title})]})})},R.href.toString()))})})]})},w.href.toString())},e[4]=m,e[5]=r,e[6]=i,e[7]=h):h=e[7];const v=h;let b;e[8]!==o||e[9]!==d||e[10]!==n||e[11]!==v?(b=o&&c.jsxs(Co,{defaultOpen:o==="CMS",onOpenChange:f,className:"space-y-0",children:[c.jsx(Eo,{asChild:!0,children:c.jsxs(Ef,{className:D("text-xxs! text-muted-foreground hover:bg-accent/50 flex cursor-pointer items-center justify-between rounded-md px-2 py-1.5 font-semibold transition-colors",d&&"mb-1"),children:[c.jsx("span",{children:o}),d?c.jsx(md,{className:"text-muted-foreground h-3.5 w-3.5"}):c.jsx(Vn,{className:"text-muted-foreground h-3.5 w-3.5"})]})}),c.jsx(To,{children:c.jsx(Ct,{className:"space-y-0",children:n.map(w=>v(w))})})]}),e[8]=o,e[9]=d,e[10]=n,e[11]=v,e[12]=b):b=e[12];let x;e[13]!==o||e[14]!==n||e[15]!==v?(x=!o&&c.jsx(Ct,{className:"space-y-0",children:n.map(w=>v(w))}),e[13]=o,e[14]=n,e[15]=v,e[16]=x):x=e[16];let _;return e[17]!==b||e[18]!==x?(_=c.jsxs(Cf,{className:"space-y-0",children:[b,x]}),e[17]=b,e[18]=x,e[19]=_):_=e[19],_}function Of(t){const e=P.c(4);let n;e[0]!==t?({...n}=t,e[0]=t,e[1]=n):n=e[1];let o;return e[2]!==n?(o=c.jsx(ju,{"data-slot":"dropdown-menu",...n}),e[2]=n,e[3]=o):o=e[3],o}function If(t){const e=P.c(4);let n;e[0]!==t?({...n}=t,e[0]=t,e[1]=n):n=e[1];let o;return e[2]!==n?(o=c.jsx(Lu,{"data-slot":"dropdown-menu-trigger",...n}),e[2]=n,e[3]=o):o=e[3],o}function kf(t){const e=P.c(10);let n,o,r;e[0]!==t?({className:n,sideOffset:r,...o}=t,e[0]=t,e[1]=n,e[2]=o,e[3]=r):(n=e[1],o=e[2],r=e[3]);const a=r===void 0?4:r;let s;e[4]!==n?(s=D("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md",n),e[4]=n,e[5]=s):s=e[5];let i;return e[6]!==o||e[7]!==a||e[8]!==s?(i=c.jsx($u,{children:c.jsx(Fu,{"data-slot":"dropdown-menu-content",sideOffset:a,className:s,...o})}),e[6]=o,e[7]=a,e[8]=s,e[9]=i):i=e[9],i}function Df(t){const e=P.c(4);let n;e[0]!==t?({...n}=t,e[0]=t,e[1]=n):n=e[1];let o;return e[2]!==n?(o=c.jsx(Bu,{"data-slot":"dropdown-menu-group",...n}),e[2]=n,e[3]=o):o=e[3],o}function nn(t){const e=P.c(12);let n,o,r,a;e[0]!==t?({className:n,inset:o,variant:a,...r}=t,e[0]=t,e[1]=n,e[2]=o,e[3]=r,e[4]=a):(n=e[1],o=e[2],r=e[3],a=e[4]);const s=a===void 0?"default":a;let i;e[5]!==n?(i=D("focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive-foreground data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/40 data-[variant=destructive]:focus:text-destructive-foreground data-[variant=destructive]:*:[svg]:!text-destructive-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",n),e[5]=n,e[6]=i):i=e[6];let l;return e[7]!==o||e[8]!==r||e[9]!==i||e[10]!==s?(l=c.jsx(Wu,{"data-slot":"dropdown-menu-item","data-inset":o,"data-variant":s,className:i,...r}),e[7]=o,e[8]=r,e[9]=i,e[10]=s,e[11]=l):l=e[11],l}function jf(t){const e=P.c(10);let n,o,r;e[0]!==t?({className:n,inset:o,...r}=t,e[0]=t,e[1]=n,e[2]=o,e[3]=r):(n=e[1],o=e[2],r=e[3]);let a;e[4]!==n?(a=D("px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",n),e[4]=n,e[5]=a):a=e[5];let s;return e[6]!==o||e[7]!==r||e[8]!==a?(s=c.jsx(zu,{"data-slot":"dropdown-menu-label","data-inset":o,className:a,...r}),e[6]=o,e[7]=r,e[8]=a,e[9]=s):s=e[9],s}function So(t){const e=P.c(8);let n,o;e[0]!==t?({className:n,...o}=t,e[0]=t,e[1]=n,e[2]=o):(n=e[1],o=e[2]);let r;e[3]!==n?(r=D("bg-border -mx-1 my-1 h-px",n),e[3]=n,e[4]=r):r=e[4];let a;return e[5]!==o||e[6]!==r?(a=c.jsx(Hu,{"data-slot":"dropdown-menu-separator",className:r,...o}),e[5]=o,e[6]=r,e[7]=a):a=e[7],a}function Lf(t,e=[]){let n=[];function o(a,s){const i=u.createContext(s);i.displayName=a+"Context";const l=n.length;n=[...n,s];const d=p=>{const{scope:m,children:g,...y}=p,h=m?.[t]?.[l]||i,v=u.useMemo(()=>y,Object.values(y));return c.jsx(h.Provider,{value:v,children:g})};d.displayName=a+"Provider";function f(p,m){const g=m?.[t]?.[l]||i,y=u.useContext(g);if(y)return y;if(s!==void 0)return s;throw new Error(`\`${p}\` must be used within \`${a}\``)}return[d,f]}const r=()=>{const a=n.map(s=>u.createContext(s));return function(i){const l=i?.[t]||a;return u.useMemo(()=>({[`__scope${t}`]:{...i,[t]:l}}),[i,l])}};return r.scopeName=t,[o,$f(r,...e)]}function $f(...t){const e=t[0];if(t.length===1)return e;const n=()=>{const o=t.map(r=>({useScope:r(),scopeName:r.scopeName}));return function(a){const s=o.reduce((i,{useScope:l,scopeName:d})=>{const p=l(a)[`__scope${d}`];return{...i,...p}},{});return u.useMemo(()=>({[`__scope${e.scopeName}`]:s}),[s])}};return n.scopeName=e.scopeName,n}var Kn="Avatar",[Ff]=Lf(Kn),[Bf,Ba]=Ff(Kn),za=u.forwardRef((t,e)=>{const{__scopeAvatar:n,...o}=t,[r,a]=u.useState("idle");return c.jsx(Bf,{scope:n,imageLoadingStatus:r,onImageLoadingStatusChange:a,children:c.jsx(Hn.span,{...o,ref:e})})});za.displayName=Kn;var Wa="AvatarImage",Ha=u.forwardRef((t,e)=>{const{__scopeAvatar:n,src:o,onLoadingStatusChange:r=()=>{},...a}=t,s=Ba(Wa,n),i=zf(o,a),l=se(d=>{r(d),s.onImageLoadingStatusChange(d)});return he(()=>{i!=="idle"&&l(i)},[i,l]),i==="loaded"?c.jsx(Hn.img,{...a,ref:e,src:o}):null});Ha.displayName=Wa;var Ua="AvatarFallback",Ga=u.forwardRef((t,e)=>{const{__scopeAvatar:n,delayMs:o,...r}=t,a=Ba(Ua,n),[s,i]=u.useState(o===void 0);return u.useEffect(()=>{if(o!==void 0){const l=window.setTimeout(()=>i(!0),o);return()=>window.clearTimeout(l)}},[o]),s&&a.imageLoadingStatus!=="loaded"?c.jsx(Hn.span,{...r,ref:e}):null});Ga.displayName=Ua;function Ro(t,e){return t?e?(t.src!==e&&(t.src=e),t.complete&&t.naturalWidth>0?"loaded":"loading"):"error":"idle"}function zf(t,{referrerPolicy:e,crossOrigin:n}){const o=el(),r=u.useRef(null),a=o?(r.current||(r.current=new window.Image),r.current):null,[s,i]=u.useState(()=>Ro(a,t));return he(()=>{i(Ro(a,t))},[a,t]),he(()=>{const l=p=>()=>{i(p)};if(!a)return;const d=l("loaded"),f=l("error");return a.addEventListener("load",d),a.addEventListener("error",f),e&&(a.referrerPolicy=e),typeof n=="string"&&(a.crossOrigin=n),()=>{a.removeEventListener("load",d),a.removeEventListener("error",f)}},[a,n,e]),s}var Wf=za,Hf=Ha,Uf=Ga;function Gf(t){const e=P.c(8);let n,o;e[0]!==t?({className:n,...o}=t,e[0]=t,e[1]=n,e[2]=o):(n=e[1],o=e[2]);let r;e[3]!==n?(r=D("relative flex size-8 shrink-0 overflow-hidden rounded-full",n),e[3]=n,e[4]=r):r=e[4];let a;return e[5]!==o||e[6]!==r?(a=c.jsx(Wf,{"data-slot":"avatar",className:r,...o}),e[5]=o,e[6]=r,e[7]=a):a=e[7],a}function Kf(t){const e=P.c(8);let n,o;e[0]!==t?({className:n,...o}=t,e[0]=t,e[1]=n,e[2]=o):(n=e[1],o=e[2]);let r;e[3]!==n?(r=D("aspect-square size-full",n),e[3]=n,e[4]=r):r=e[4];let a;return e[5]!==o||e[6]!==r?(a=c.jsx(Hf,{"data-slot":"avatar-image",className:r,...o}),e[5]=o,e[6]=r,e[7]=a):a=e[7],a}function Vf(t){const e=P.c(8);let n,o;e[0]!==t?({className:n,...o}=t,e[0]=t,e[1]=n,e[2]=o):(n=e[1],o=e[2]);let r;e[3]!==n?(r=D("bg-muted flex size-full items-center justify-center rounded-full",n),e[3]=n,e[4]=r):r=e[4];let a;return e[5]!==o||e[6]!==r?(a=c.jsx(Uf,{"data-slot":"avatar-fallback",className:r,...o}),e[5]=o,e[6]=r,e[7]=a):a=e[7],a}function Xf(){return Yf}function Yf(t){const e=t.trim().split(" ");if(e.length===0)return"";if(e.length===1)return e[0].charAt(0).toUpperCase();const n=e[0].charAt(0),o=e[e.length-1].charAt(0);return`${n}${o}`.toUpperCase()}function Ka(t){const e=P.c(21),{user:n,showEmail:o}=t,r=Xf(),a=n.avatar?`/storage/${n.avatar}`:void 0;let s;e[0]!==a||e[1]!==n.name?(s=c.jsx(Kf,{src:a,alt:n.name}),e[0]=a,e[1]=n.name,e[2]=s):s=e[2];let i;e[3]!==r||e[4]!==n.name?(i=r(n.name),e[3]=r,e[4]=n.name,e[5]=i):i=e[5];let l;e[6]!==i?(l=c.jsx(Vf,{className:"rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white",children:i}),e[6]=i,e[7]=l):l=e[7];let d;e[8]!==s||e[9]!==l?(d=c.jsxs(Gf,{className:"h-8 w-8 overflow-hidden rounded-full",children:[s,l]}),e[8]=s,e[9]=l,e[10]=d):d=e[10];let f;e[11]!==n.name?(f=c.jsx("span",{className:"truncate font-medium text-orange-400",children:n.name}),e[11]=n.name,e[12]=f):f=e[12];let p;e[13]!==n.email?(p=c.jsx("span",{className:"text-muted-foreground truncate text-xs",children:n.email}),e[13]=n.email,e[14]=p):p=e[14];let m;e[15]!==f||e[16]!==p?(m=c.jsxs("div",{className:"grid flex-1 text-left text-sm leading-tight",children:[f,p]}),e[15]=f,e[16]=p,e[17]=m):m=e[17];let g;return e[18]!==d||e[19]!==m?(g=c.jsxs(c.Fragment,{children:[d,m]}),e[18]=d,e[19]=m,e[20]=g):g=e[20],g}function qf(){return Zf}function Zf(){document.body.style.removeProperty("pointer-events")}function Qf(t){const e=P.c(23),{user:n}=t,o=qf();let r;e[0]!==o?(r=()=>{o(),is.flushAll()},e[0]=o,e[1]=r):r=e[1];const a=r;let s;e[2]!==n?(s=c.jsx(jf,{className:"p-0 font-normal",children:c.jsx("div",{className:"flex items-center gap-2 px-1 py-1.5 text-left text-sm",children:c.jsx(Ka,{user:n,showEmail:!0})})}),e[2]=n,e[3]=s):s=e[3];let i;e[4]===Symbol.for("react.memo_cache_sentinel")?(i=c.jsx(So,{}),e[4]=i):i=e[4];let l;e[5]===Symbol.for("react.memo_cache_sentinel")?(l=c.jsx(vs,{className:"mr-2"}),e[5]=l):l=e[5];let d;e[6]!==o?(d=c.jsx(nn,{asChild:!0,children:c.jsxs(_e,{className:"block w-full",href:"/cpanel/settings/profile",as:"button",prefetch:!0,onClick:o,children:[l,"Edit Profil"]})}),e[6]=o,e[7]=d):d=e[7];let f;e[8]===Symbol.for("react.memo_cache_sentinel")?(f=c.jsx(_d,{className:"mr-2"}),e[8]=f):f=e[8];let p;e[9]!==o?(p=c.jsx(nn,{asChild:!0,children:c.jsxs(_e,{className:"block w-full",href:"/cpanel/settings/password",as:"button",prefetch:!0,onClick:o,children:[f,"Ubah Password"]})}),e[9]=o,e[10]=p):p=e[10];let m;e[11]!==d||e[12]!==p?(m=c.jsxs(Df,{children:[d,p]}),e[11]=d,e[12]=p,e[13]=m):m=e[13];let g;e[14]===Symbol.for("react.memo_cache_sentinel")?(g=c.jsx(So,{}),e[14]=g):g=e[14];let y;e[15]===Symbol.for("react.memo_cache_sentinel")?(y=hs(),e[15]=y):y=e[15];let h;e[16]===Symbol.for("react.memo_cache_sentinel")?(h=c.jsx(Td,{className:"mr-2"}),e[16]=h):h=e[16];let v;e[17]!==a?(v=c.jsx(nn,{asChild:!0,children:c.jsxs(_e,{className:"block w-full",href:y,as:"button",onClick:a,"data-test":"logout-button",children:[h,"Keluar"]})}),e[17]=a,e[18]=v):v=e[18];let b;return e[19]!==v||e[20]!==s||e[21]!==m?(b=c.jsxs(c.Fragment,{children:[s,i,m,g,v]}),e[19]=v,e[20]=s,e[21]=m,e[22]=b):b=e[22],b}function Jf(){const t=P.c(13),{auth:e}=Ve().props,{state:n}=Ft(),o=La();let r;t[0]!==e.user?(r=c.jsx(Ka,{user:e.user}),t[0]=e.user,t[1]=r):r=t[1];let a;t[2]===Symbol.for("react.memo_cache_sentinel")?(a=c.jsx(gd,{className:"ml-auto size-4"}),t[2]=a):a=t[2];let s;t[3]!==r?(s=c.jsx(If,{asChild:!0,children:c.jsxs(Gn,{size:"lg",className:"group text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent","data-test":"sidebar-menu-button",children:[r,a]})}),t[3]=r,t[4]=s):s=t[4];const i=o?"bottom":n==="collapsed"?"left":"bottom";let l;t[5]!==e.user?(l=c.jsx(Qf,{user:e.user}),t[5]=e.user,t[6]=l):l=t[6];let d;t[7]!==i||t[8]!==l?(d=c.jsx(kf,{className:"w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg",align:"end",side:i,children:l}),t[7]=i,t[8]=l,t[9]=d):d=t[9];let f;return t[10]!==s||t[11]!==d?(f=c.jsx(Ct,{children:c.jsx(Un,{children:c.jsxs(Of,{children:[s,d]})})}),t[10]=s,t[11]=d,t[12]=f):f=t[12],f}function ep(){const t=P.c(11),{getConfig:e}=bs();let n,o;if(t[0]!==e){const d=e("site_favicon","/images/logo-main-square.png");n=e("site_name","Alumoda Sinergi Kontainer Indonesia"),o=d.startsWith("configurations/")?`/storage/${d}`:d,t[0]=e,t[1]=n,t[2]=o}else n=t[1],o=t[2];const r=o;let a;t[3]!==r?(a=c.jsx("div",{className:"text-sidebar-primary-foreground flex aspect-square size-9 items-center justify-center rounded-md bg-white/10",children:c.jsx("img",{src:r,className:"size-9 fill-current text-white dark:text-black",onError:tp})}),t[3]=r,t[4]=a):a=t[4];let s;t[5]===Symbol.for("react.memo_cache_sentinel")?(s=c.jsx("span",{className:"mb-0.5 truncate leading-tight font-semibold text-orange-400",children:"Admin Panel"}),t[5]=s):s=t[5];let i;t[6]!==n?(i=c.jsxs("div",{className:"ml-1 grid flex-1 text-left text-sm",children:[s,c.jsx("span",{className:"text-muted dark:text-white/50 truncate text-xs",children:n})]}),t[6]=n,t[7]=i):i=t[7];let l;return t[8]!==a||t[9]!==i?(l=c.jsxs(c.Fragment,{children:[a,i]}),t[8]=a,t[9]=i,t[10]=l):l=t[10],l}function tp(t){return ds(t,"/images/logo-main-square.png","Site logo")}const np=[{group:{title:"",items:[{title:"Dashboard",href:"/cpanel",icon:wo},{title:"Daftar Pesanan",href:"/cpanel/crm/orders",icon:ys,permission:"order-list"},{title:"Posting Artikel",href:"/cpanel/cms/article",icon:xs,permission:"article-list"},{title:"Produk",href:"/cpanel/cms/product",icon:wo,permission:"product-list"},{title:"Pelanggan",href:"/cpanel/crm/customer",icon:_o,permission:"customer-list"},{title:"Klien",href:"/cpanel/cms/client",icon:xd,permission:"client-list"},{title:"Merek",href:"/cpanel/cms/brand",icon:ws,permission:"brand-list"},{title:"Layanan",href:"/cpanel/cms/service",icon:yd,permission:"service-list"},{title:"Kategori",href:"/cpanel/cms/category",icon:_s,permission:"category-list"},{title:"FAQ",href:"/cpanel/cms/faq",icon:Rd,permission:"faq-list"},{title:"Ulasan",href:"/cpanel/cms/testimonial",icon:Cs,permission:"testimonial-list"},{title:"User",href:"/cpanel/authorization/user-management",icon:_o,permission:"user-list"},{title:"Role",href:"/cpanel/authorization/roles",icon:Id,permission:"role-list"},{title:"Hak Akses",href:"/cpanel/authorization/permissions",icon:Dd,permission:"permission-list"},{title:"Pengaturan",href:"/cpanel/settings/configuration/site",icon:Ad,permission:"setting-configuration-list"}]}}];function op(t){const e=P.c(34),{recentOrders:n}=t;let o;e[0]!==n?(o=n===void 0?[]:n,e[0]=n,e[1]=o):o=e[1];const r=o,{auth:a}=Ve().props;let s;e[2]!==a.permissions?(s=a.permissions||[],e[2]=a.permissions,e[3]=s):s=e[3];const i=s;let l;e[4]!==r?(l=r.filter(rp),e[4]=r,e[5]=l):l=e[5];const d=l.length;let f,p,m,g,y,h,v,b;if(e[6]!==d||e[7]!==i){let E;e[16]!==i?(E=N=>{const{group:R}=N;return{group:{...R,items:R.items.filter(A=>A.permission?i.includes(A.permission):!0)}}},e[16]=i,e[17]=E):E=e[17];const T=np.map(E);p=vf,h="icon",v="inset",b="bg-slate-900";let C;e[18]===Symbol.for("react.memo_cache_sentinel")?(C=gs(),e[18]=C):C=e[18],e[19]===Symbol.for("react.memo_cache_sentinel")?(m=c.jsx(xf,{className:"bg-slate-900",children:c.jsx(Ct,{children:c.jsx(Un,{children:c.jsx(Gn,{className:"hover:bg-slate-900",size:"lg",asChild:!0,children:c.jsx(_e,{href:C,prefetch:!0,children:c.jsx(ep,{})})})})})}),e[19]=m):m=e[19],f=_f,g="-space-y-2! bg-slate-900";let S;e[20]!==d?(S=(N,R)=>{const{group:A}=N;return c.jsx(Af,{items:A.items,groupTitle:A.title,newOrdersCount:d},R)},e[20]=d,e[21]=S):S=e[21],y=T.map(S),e[6]=d,e[7]=i,e[8]=f,e[9]=p,e[10]=m,e[11]=g,e[12]=y,e[13]=h,e[14]=v,e[15]=b}else f=e[8],p=e[9],m=e[10],g=e[11],y=e[12],h=e[13],v=e[14],b=e[15];let x;e[22]!==f||e[23]!==g||e[24]!==y?(x=c.jsx(f,{className:g,children:y}),e[22]=f,e[23]=g,e[24]=y,e[25]=x):x=e[25];let _;e[26]===Symbol.for("react.memo_cache_sentinel")?(_=c.jsx(wf,{className:"bg-slate-900",children:c.jsx(Jf,{})}),e[26]=_):_=e[26];let w;return e[27]!==p||e[28]!==m||e[29]!==x||e[30]!==h||e[31]!==v||e[32]!==b?(w=c.jsxs(p,{collapsible:h,variant:v,className:b,children:[m,x,_]}),e[27]=p,e[28]=m,e[29]=x,e[30]=h,e[31]=v,e[32]=b,e[33]=w):w=e[33],w}function rp(t){return t.status==="pending"}function ap(t){const e=P.c(4);let n;e[0]!==t?({...n}=t,e[0]=t,e[1]=n):n=e[1];let o;return e[2]!==n?(o=c.jsx("nav",{"aria-label":"breadcrumb","data-slot":"breadcrumb",...n}),e[2]=n,e[3]=o):o=e[3],o}function sp(t){const e=P.c(8);let n,o;e[0]!==t?({className:n,...o}=t,e[0]=t,e[1]=n,e[2]=o):(n=e[1],o=e[2]);let r;e[3]!==n?(r=D("text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",n),e[3]=n,e[4]=r):r=e[4];let a;return e[5]!==o||e[6]!==r?(a=c.jsx("ol",{"data-slot":"breadcrumb-list",className:r,...o}),e[5]=o,e[6]=r,e[7]=a):a=e[7],a}function ip(t){const e=P.c(8);let n,o;e[0]!==t?({className:n,...o}=t,e[0]=t,e[1]=n,e[2]=o):(n=e[1],o=e[2]);let r;e[3]!==n?(r=D("inline-flex items-center gap-1.5",n),e[3]=n,e[4]=r):r=e[4];let a;return e[5]!==o||e[6]!==r?(a=c.jsx("li",{"data-slot":"breadcrumb-item",className:r,...o}),e[5]=o,e[6]=r,e[7]=a):a=e[7],a}function lp(t){const e=P.c(10);let n,o,r;e[0]!==t?({asChild:n,className:o,...r}=t,e[0]=t,e[1]=n,e[2]=o,e[3]=r):(n=e[1],o=e[2],r=e[3]);const a=n?et:"a";let s;e[4]!==o?(s=D("hover:text-foreground transition-colors",o),e[4]=o,e[5]=s):s=e[5];let i;return e[6]!==a||e[7]!==r||e[8]!==s?(i=c.jsx(a,{"data-slot":"breadcrumb-link",className:s,...r}),e[6]=a,e[7]=r,e[8]=s,e[9]=i):i=e[9],i}function cp(t){const e=P.c(8);let n,o;e[0]!==t?({className:n,...o}=t,e[0]=t,e[1]=n,e[2]=o):(n=e[1],o=e[2]);let r;e[3]!==n?(r=D("text-foreground font-normal",n),e[3]=n,e[4]=r):r=e[4];let a;return e[5]!==o||e[6]!==r?(a=c.jsx("span",{"data-slot":"breadcrumb-page",role:"link","aria-disabled":"true","aria-current":"page",className:r,...o}),e[5]=o,e[6]=r,e[7]=a):a=e[7],a}function up(t){const e=P.c(12);let n,o,r;e[0]!==t?({children:n,className:o,...r}=t,e[0]=t,e[1]=n,e[2]=o,e[3]=r):(n=e[1],o=e[2],r=e[3]);let a;e[4]!==o?(a=D("[&>svg]:size-3.5",o),e[4]=o,e[5]=a):a=e[5];let s;e[6]!==n?(s=n??c.jsx(fd,{}),e[6]=n,e[7]=s):s=e[7];let i;return e[8]!==r||e[9]!==a||e[10]!==s?(i=c.jsx("li",{"data-slot":"breadcrumb-separator",role:"presentation","aria-hidden":"true",className:a,...r,children:s}),e[8]=r,e[9]=a,e[10]=s,e[11]=i):i=e[11],i}function dp(t){const e=P.c(4),{breadcrumbs:n}=t;let o;e[0]!==n?(o=n.length>0&&c.jsx(ap,{children:c.jsx(sp,{children:n.map((a,s)=>{const i=s===n.length-1;return c.jsxs(u.Fragment,{children:[c.jsx(ip,{children:i?c.jsx(cp,{children:a.title}):c.jsx(lp,{asChild:!0,children:c.jsx(_e,{href:a.href,children:a.title})})}),!i&&c.jsx(up,{})]},s)})})}),e[0]=n,e[1]=o):o=e[1];let r;return e[2]!==o?(r=c.jsx(c.Fragment,{children:o}),e[2]=o,e[3]=r):r=e[3],r}function fp(t){const e=P.c(5),{breadcrumbs:n}=t;let o;e[0]!==n?(o=n===void 0?[]:n,e[0]=n,e[1]=o):o=e[1];const r=o;let a;e[2]===Symbol.for("react.memo_cache_sentinel")?(a=c.jsx(yf,{className:"-ml-1"}),e[2]=a):a=e[2];let s;return e[3]!==r?(s=c.jsx("header",{className:"border-sidebar-border/50 flex h-16 shrink-0 items-center gap-2 border-b px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4",children:c.jsxs("div",{className:"flex items-center gap-2",children:[a,c.jsx(dp,{breadcrumbs:r})]})}),e[3]=r,e[4]=s):s=e[4],s}function pp(t){const e=P.c(14),{children:n,breadcrumbs:o,recentOrders:r}=t;let a;e[0]!==o?(a=o===void 0?[]:o,e[0]=o,e[1]=a):a=e[1];const s=a;let i;e[2]!==r?(i=r===void 0?[]:r,e[2]=r,e[3]=i):i=e[3];const l=i;let d;e[4]!==l?(d=c.jsx(op,{recentOrders:l}),e[4]=l,e[5]=d):d=e[5];let f;e[6]!==s?(f=c.jsx(fp,{breadcrumbs:s}),e[6]=s,e[7]=f):f=e[7];let p;e[8]!==n||e[9]!==f?(p=c.jsxs(Pf,{variant:"sidebar",className:"overflow-x-hidden",children:[f,n]}),e[8]=n,e[9]=f,e[10]=p):p=e[10];let m;return e[11]!==d||e[12]!==p?(m=c.jsxs(Mf,{variant:"sidebar",children:[d,p]}),e[11]=d,e[12]=p,e[13]=m):m=e[13],m}var tt=t=>typeof t=="number"&&!isNaN(t),Se=t=>typeof t=="string",de=t=>typeof t=="function",mp=t=>Se(t)||tt(t),pn=t=>Se(t)||de(t)?t:null,hp=(t,e)=>t===!1||tt(t)&&t>0?t:e,mn=t=>u.isValidElement(t)||Se(t)||de(t)||tt(t);function gp(t,e,n=300){let{scrollHeight:o,style:r}=t;requestAnimationFrame(()=>{r.minHeight="initial",r.height=o+"px",r.transition=`all ${n}ms`,requestAnimationFrame(()=>{r.height="0",r.padding="0",r.margin="0",setTimeout(e,n)})})}function vp({enter:t,exit:e,appendPosition:n=!1,collapse:o=!0,collapseDuration:r=300}){return function({children:a,position:s,preventExitTransition:i,done:l,nodeRef:d,isIn:f,playToast:p}){let m=n?`${t}--${s}`:t,g=n?`${e}--${s}`:e,y=u.useRef(0);return u.useLayoutEffect(()=>{let h=d.current,v=m.split(" "),b=x=>{x.target===d.current&&(p(),h.removeEventListener("animationend",b),h.removeEventListener("animationcancel",b),y.current===0&&x.type!=="animationcancel"&&h.classList.remove(...v))};h.classList.add(...v),h.addEventListener("animationend",b),h.addEventListener("animationcancel",b)},[]),u.useEffect(()=>{let h=d.current,v=()=>{h.removeEventListener("animationend",v),o?gp(h,l,r):l()};f||(i?v():(y.current=1,h.className+=` ${g}`,h.addEventListener("animationend",v)))},[f]),$.createElement($.Fragment,null,a)}}function No(t,e){return{content:Va(t.content,t.props),containerId:t.props.containerId,id:t.props.toastId,theme:t.props.theme,type:t.props.type,data:t.props.data||{},isLoading:t.props.isLoading,icon:t.props.icon,reason:t.removalReason,status:e}}function Va(t,e,n=!1){return u.isValidElement(t)&&!Se(t.type)?u.cloneElement(t,{closeToast:e.closeToast,toastProps:e,data:e.data,isPaused:n}):de(t)?t({closeToast:e.closeToast,toastProps:e,data:e.data,isPaused:n}):t}function yp({closeToast:t,theme:e,ariaLabel:n="close"}){return $.createElement("button",{className:`Toastify__close-button Toastify__close-button--${e}`,type:"button",onClick:o=>{o.stopPropagation(),t(!0)},"aria-label":n},$.createElement("svg",{"aria-hidden":"true",viewBox:"0 0 14 16"},$.createElement("path",{fillRule:"evenodd",d:"M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"})))}function bp({delay:t,isRunning:e,closeToast:n,type:o="default",hide:r,className:a,controlledProgress:s,progress:i,rtl:l,isIn:d,theme:f}){let p=r||s&&i===0,m={animationDuration:`${t}ms`,animationPlayState:e?"running":"paused"};s&&(m.transform=`scaleX(${i})`);let g=Ce("Toastify__progress-bar",s?"Toastify__progress-bar--controlled":"Toastify__progress-bar--animated",`Toastify__progress-bar-theme--${f}`,`Toastify__progress-bar--${o}`,{"Toastify__progress-bar--rtl":l}),y=de(a)?a({rtl:l,type:o,defaultClassName:g}):Ce(g,a),h={[s&&i>=1?"onTransitionEnd":"onAnimationEnd"]:s&&i<1?null:()=>{d&&n()}};return $.createElement("div",{className:"Toastify__progress-bar--wrp","data-hidden":p},$.createElement("div",{className:`Toastify__progress-bar--bg Toastify__progress-bar-theme--${f} Toastify__progress-bar--${o}`}),$.createElement("div",{role:"progressbar","aria-hidden":p?"true":"false","aria-label":"notification timer","aria-valuenow":s?Math.round(i*100):void 0,"aria-valuemin":0,"aria-valuemax":100,className:y,style:m,...h}))}var xp=1,Xa=()=>`${xp++}`;function wp(t,e,n){let o=1,r=0,a=[],s=[],i=e,l=new Map,d=new Set,f=x=>(d.add(x),()=>d.delete(x)),p=()=>{s=Array.from(l.values()),d.forEach(x=>x())},m=({containerId:x,toastId:_,updateId:w})=>{let E=x?x!==t:t!==1,T=l.has(_)&&w==null;return E||T},g=(x,_)=>{l.forEach(w=>{var E;(_==null||_===w.props.toastId)&&((E=w.toggle)==null||E.call(w,x))})},y=x=>{var _,w;x.isActive&&((w=(_=x.props)==null?void 0:_.onClose)==null||w.call(_,x.removalReason),x.isActive=!1,n(No(x,"removed")))},h=x=>{if(x==null)l.forEach(y);else{let _=l.get(x);_&&y(_)}p()},v=()=>{r-=a.length,a=[]},b=x=>{var _,w;let{toastId:E,updateId:T}=x.props,C=T==null;x.staleId&&l.delete(x.staleId),x.isActive=!0,l.set(E,x),p(),n(No(x,C?"added":"updated")),C&&((w=(_=x.props).onOpen)==null||w.call(_))};return{id:t,props:i,observe:f,toggle:g,removeToast:h,toasts:l,clearQueue:v,buildToast:(x,_)=>{if(m(_))return;let{toastId:w,updateId:E,data:T,staleId:C,delay:S}=_,N=E==null;N&&r++;let R={...i,style:i.toastStyle,key:o++,...Object.fromEntries(Object.entries(_).filter(([k,j])=>j!=null)),toastId:w,updateId:E,data:T,isIn:!1,className:pn(_.className||i.toastClassName),progressClassName:pn(_.progressClassName||i.progressClassName),autoClose:_.isLoading?!1:hp(_.autoClose,i.autoClose),closeToast(k){let j=l.get(w);j&&(j.removalReason=k,h(w))},deleteToast(){if(l.get(w)!=null){if(l.delete(w),r--,r<0&&(r=0),a.length>0){b(a.shift());return}p()}}};R.closeButton=i.closeButton,_.closeButton===!1||mn(_.closeButton)?R.closeButton=_.closeButton:_.closeButton===!0&&(R.closeButton=mn(i.closeButton)?i.closeButton:!0);let A={content:x,props:R,staleId:C};i.limit&&i.limit>0&&r>i.limit&&N?a.push(A):tt(S)?setTimeout(()=>{b(A)},S):b(A)},setProps(x){i=x},setToggle:(x,_)=>{let w=l.get(x);w&&(w.toggle=_)},isToastActive:x=>{var _;return(_=l.get(x))==null?void 0:_.isActive},getSnapshot:()=>s}}var V=new Map,Ke=[],hn=new Set,_p=t=>hn.forEach(e=>e(t)),Ya=()=>V.size>0;function Cp(){Ke.forEach(t=>Za(t.content,t.options)),Ke=[]}var Ep=(t,{containerId:e})=>{var n;return(n=V.get(e||1))==null?void 0:n.toasts.get(t)};function qa(t,e){var n;if(e)return!!((n=V.get(e))!=null&&n.isToastActive(t));let o=!1;return V.forEach(r=>{r.isToastActive(t)&&(o=!0)}),o}function Tp(t){if(!Ya()){Ke=Ke.filter(e=>t!=null&&e.options.toastId!==t);return}if(t==null||mp(t))V.forEach(e=>{e.removeToast(t)});else if(t&&("containerId"in t||"id"in t)){let e=V.get(t.containerId);e?e.removeToast(t.id):V.forEach(n=>{n.removeToast(t.id)})}}var Sp=(t={})=>{V.forEach(e=>{e.props.limit&&(!t.containerId||e.id===t.containerId)&&e.clearQueue()})};function Za(t,e){mn(t)&&(Ya()||Ke.push({content:t,options:e}),V.forEach(n=>{n.buildToast(t,e)}))}function Rp(t){var e;(e=V.get(t.containerId||1))==null||e.setToggle(t.id,t.fn)}function Qa(t,e){V.forEach(n=>{(e==null||!(e!=null&&e.containerId)||e?.containerId===n.id)&&n.toggle(t,e?.id)})}function Np(t){let e=t.containerId||1;return{subscribe(n){let o=wp(e,t,_p);V.set(e,o);let r=o.observe(n);return Cp(),()=>{r(),V.delete(e)}},setProps(n){var o;(o=V.get(e))==null||o.setProps(n)},getSnapshot(){var n;return(n=V.get(e))==null?void 0:n.getSnapshot()}}}function Pp(t){return hn.add(t),()=>{hn.delete(t)}}function Mp(t){return t&&(Se(t.toastId)||tt(t.toastId))?t.toastId:Xa()}function nt(t,e){return Za(t,e),e.toastId}function Bt(t,e){return{...e,type:e&&e.type||t,toastId:Mp(e)}}function zt(t){return(e,n)=>nt(e,Bt(t,n))}function z(t,e){return nt(t,Bt("default",e))}z.loading=(t,e)=>nt(t,Bt("default",{isLoading:!0,autoClose:!1,closeOnClick:!1,closeButton:!1,draggable:!1,...e}));function Ap(t,{pending:e,error:n,success:o},r){let a;e&&(a=Se(e)?z.loading(e,r):z.loading(e.render,{...r,...e}));let s={isLoading:null,autoClose:null,closeOnClick:null,closeButton:null,draggable:null},i=(d,f,p)=>{if(f==null){z.dismiss(a);return}let m={type:d,...s,...r,data:p},g=Se(f)?{render:f}:f;return a?z.update(a,{...m,...g}):z(g.render,{...m,...g}),p},l=de(t)?t():t;return l.then(d=>i("success",o,d)).catch(d=>i("error",n,d)),l}z.promise=Ap;z.success=zt("success");z.info=zt("info");z.error=zt("error");z.warning=zt("warning");z.warn=z.warning;z.dark=(t,e)=>nt(t,Bt("default",{theme:"dark",...e}));function Op(t){Tp(t)}z.dismiss=Op;z.clearWaitingQueue=Sp;z.isActive=qa;z.update=(t,e={})=>{let n=Ep(t,e);if(n){let{props:o,content:r}=n,a={delay:100,...o,...e,toastId:e.toastId||t,updateId:Xa()};a.toastId!==t&&(a.staleId=t);let s=a.render||r;delete a.render,nt(s,a)}};z.done=t=>{z.update(t,{progress:1})};z.onChange=Pp;z.play=t=>Qa(!0,t);z.pause=t=>Qa(!1,t);function Ip(t){var e;let{subscribe:n,getSnapshot:o,setProps:r}=u.useRef(Np(t)).current;r(t);let a=(e=u.useSyncExternalStore(n,o,o))==null?void 0:e.slice();function s(i){if(!a)return[];let l=new Map;return t.newestOnTop&&a.reverse(),a.forEach(d=>{let{position:f}=d.props;l.has(f)||l.set(f,[]),l.get(f).push(d)}),Array.from(l,d=>i(d[0],d[1]))}return{getToastToRender:s,isToastActive:qa,count:a?.length}}function kp(t){let[e,n]=u.useState(!1),[o,r]=u.useState(!1),a=u.useRef(null),s=u.useRef({start:0,delta:0,removalDistance:0,canCloseOnClick:!0,canDrag:!1,didMove:!1}).current,{autoClose:i,pauseOnHover:l,closeToast:d,onClick:f,closeOnClick:p}=t;Rp({id:t.toastId,containerId:t.containerId,fn:n}),u.useEffect(()=>{if(t.pauseOnFocusLoss)return m(),()=>{g()}},[t.pauseOnFocusLoss]);function m(){document.hasFocus()||b(),window.addEventListener("focus",v),window.addEventListener("blur",b)}function g(){window.removeEventListener("focus",v),window.removeEventListener("blur",b)}function y(C){if(t.draggable===!0||t.draggable===C.pointerType){x();let S=a.current;s.canCloseOnClick=!0,s.canDrag=!0,S.style.transition="none",t.draggableDirection==="x"?(s.start=C.clientX,s.removalDistance=S.offsetWidth*(t.draggablePercent/100)):(s.start=C.clientY,s.removalDistance=S.offsetHeight*(t.draggablePercent===80?t.draggablePercent*1.5:t.draggablePercent)/100)}}function h(C){let{top:S,bottom:N,left:R,right:A}=a.current.getBoundingClientRect();C.pointerType==="mouse"&&t.pauseOnHover&&C.clientX>=R&&C.clientX<=A&&C.clientY>=S&&C.clientY<=N?b():v()}function v(){n(!0)}function b(){n(!1)}function x(){s.didMove=!1,document.addEventListener("pointermove",w),document.addEventListener("pointerup",E)}function _(){document.removeEventListener("pointermove",w),document.removeEventListener("pointerup",E)}function w(C){let S=a.current;if(s.canDrag&&S){s.didMove=!0,e&&b(),t.draggableDirection==="x"?s.delta=C.clientX-s.start:s.delta=C.clientY-s.start,s.start!==C.clientX&&(s.canCloseOnClick=!1);let N=t.draggableDirection==="x"?`${s.delta}px, var(--y)`:`0, calc(${s.delta}px + var(--y))`;S.style.transform=`translate3d(${N},0)`,S.style.opacity=`${1-Math.abs(s.delta/s.removalDistance)}`}}function E(){_();let C=a.current;if(s.canDrag&&s.didMove&&C){if(s.canDrag=!1,Math.abs(s.delta)>s.removalDistance){r(!0),t.closeToast(!0),t.collapseAll();return}C.style.transition="transform 0.2s, opacity 0.2s",C.style.removeProperty("transform"),C.style.removeProperty("opacity")}}let T={onPointerDown:y,onPointerUp:h};return i&&l&&(T.onMouseEnter=b,t.stacked||(T.onMouseLeave=v)),p&&(T.onClick=C=>{f&&f(C),s.canCloseOnClick&&d(!0)}),{playToast:v,pauseToast:b,isRunning:e,preventExitTransition:o,toastRef:a,eventHandlers:T}}var Ja=typeof window<"u"?u.useLayoutEffect:u.useEffect,Wt=({theme:t,type:e,isLoading:n,...o})=>$.createElement("svg",{viewBox:"0 0 24 24",width:"100%",height:"100%",fill:t==="colored"?"currentColor":`var(--toastify-icon-color-${e})`,...o});function Dp(t){return $.createElement(Wt,{...t},$.createElement("path",{d:"M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z"}))}function jp(t){return $.createElement(Wt,{...t},$.createElement("path",{d:"M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z"}))}function Lp(t){return $.createElement(Wt,{...t},$.createElement("path",{d:"M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"}))}function $p(t){return $.createElement(Wt,{...t},$.createElement("path",{d:"M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"}))}function Fp(){return $.createElement("div",{className:"Toastify__spinner"})}var gn={info:jp,warning:Dp,success:Lp,error:$p,spinner:Fp},Bp=t=>t in gn;function zp({theme:t,type:e,isLoading:n,icon:o}){let r=null,a={theme:t,type:e};return o===!1||(de(o)?r=o({...a,isLoading:n}):u.isValidElement(o)?r=u.cloneElement(o,a):n?r=gn.spinner():Bp(e)&&(r=gn[e](a))),r}var Wp=t=>{let{isRunning:e,preventExitTransition:n,toastRef:o,eventHandlers:r,playToast:a}=kp(t),{closeButton:s,children:i,autoClose:l,onClick:d,type:f,hideProgressBar:p,closeToast:m,transition:g,position:y,className:h,style:v,progressClassName:b,updateId:x,role:_,progress:w,rtl:E,toastId:T,deleteToast:C,isIn:S,isLoading:N,closeOnClick:R,theme:A,ariaLabel:k}=t,j=Ce("Toastify__toast",`Toastify__toast-theme--${A}`,`Toastify__toast--${f}`,{"Toastify__toast--rtl":E},{"Toastify__toast--close-on-click":R}),L=de(h)?h({rtl:E,position:y,type:f,defaultClassName:j}):Ce(j,h),B=zp(t),F=!!w||!l,W={closeToast:m,type:f,theme:A},O=null;return s===!1||(de(s)?O=s(W):u.isValidElement(s)?O=u.cloneElement(s,W):O=yp(W)),$.createElement(g,{isIn:S,done:C,position:y,preventExitTransition:n,nodeRef:o,playToast:a},$.createElement("div",{id:T,tabIndex:0,onClick:d,"data-in":S,className:L,...r,style:v,ref:o,...S&&{role:_,"aria-label":k}},B!=null&&$.createElement("div",{className:Ce("Toastify__toast-icon",{"Toastify--animate-icon Toastify__zoom-enter":!N})},B),Va(i,t,!e),O,!t.customProgressBar&&$.createElement(bp,{...x&&!F?{key:`p-${x}`}:{},rtl:E,theme:A,delay:l,isRunning:e,isIn:S,closeToast:m,hide:p,type:f,className:b,controlledProgress:F,progress:w||0})))},Hp=(t,e=!1)=>({enter:`Toastify--animate Toastify__${t}-enter`,exit:`Toastify--animate Toastify__${t}-exit`,appendPosition:e}),Up=vp(Hp("bounce",!0)),Gp={position:"top-right",transition:Up,autoClose:5e3,closeButton:!0,pauseOnHover:!0,pauseOnFocusLoss:!0,draggable:"touch",draggablePercent:80,draggableDirection:"x",role:"alert",theme:"light","aria-label":"Notifications Alt+T",hotKeys:t=>t.altKey&&t.code==="KeyT"};function Kp(t){let e={...Gp,...t},n=t.stacked,[o,r]=u.useState(!0),a=u.useRef(null),{getToastToRender:s,isToastActive:i,count:l}=Ip(e),{className:d,style:f,rtl:p,containerId:m,hotKeys:g}=e;function y(v){let b=Ce("Toastify__toast-container",`Toastify__toast-container--${v}`,{"Toastify__toast-container--rtl":p});return de(d)?d({position:v,rtl:p,defaultClassName:b}):Ce(b,pn(d))}function h(){n&&(r(!0),z.play())}return Ja(()=>{var v;if(n){let b=a.current.querySelectorAll('[data-in="true"]'),x=12,_=(v=e.position)==null?void 0:v.includes("top"),w=0,E=0;Array.from(b).reverse().forEach((T,C)=>{let S=T;S.classList.add("Toastify__toast--stacked"),C>0&&(S.dataset.collapsed=`${o}`),S.dataset.pos||(S.dataset.pos=_?"top":"bot");let N=w*(o?.2:1)+(o?0:x*C),R=Math.max(.5,1-(o?E:0));S.style.setProperty("--y",`${_?N:N*-1}px`),S.style.setProperty("--g",`${x}`),S.style.setProperty("--s",`${R}`),w+=S.offsetHeight,E+=.025})}},[o,l,n]),u.useEffect(()=>{function v(b){var x;let _=a.current;g(b)&&((x=_?.querySelector('[tabIndex="0"]'))==null||x.focus(),r(!1),z.pause()),b.key==="Escape"&&(document.activeElement===_||_!=null&&_.contains(document.activeElement))&&(r(!0),z.play())}return document.addEventListener("keydown",v),()=>{document.removeEventListener("keydown",v)}},[g]),$.createElement("section",{ref:a,className:"Toastify",id:m,onMouseEnter:()=>{n&&(r(!1),z.pause())},onMouseLeave:h,"aria-live":"polite","aria-atomic":"false","aria-relevant":"additions text","aria-label":e["aria-label"]},s((v,b)=>{let x=b.length?{...f}:{...f,pointerEvents:"none"};return $.createElement("div",{tabIndex:-1,className:y(v),"data-stacked":n,style:x,key:`c-${v}`},b.map(({content:_,props:w})=>$.createElement(Wp,{...w,stacked:n,collapseAll:h,isIn:i(w.toastId,w.containerId),key:`t-${w.key}`},_)))}))}var Vp=`:root {
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
`,Po=new Map,Xp=(t,e)=>{Ja(()=>{if(typeof document>"u")return;let n=document,o=Po.get(n);if(o){e&&o.setAttribute("nonce",e);return}let r=n.createElement("style");r.textContent=t,e&&r.setAttribute("nonce",e),n.head.appendChild(r),Po.set(n,r)},[e])};function Yp(t){return Xp(Vp,t.nonce),$.createElement(Kp,{...t})}function qp(){const t=P.c(7),{props:e}=Ve();let n;t[0]!==e.flash?(n=e.flash||{success:"",error:""},t[0]=e.flash,t[1]=n):n=t[1];const o=n;let r,a;t[2]!==o.error||t[3]!==o.success?(r=()=>{o.success&&z.success(o.success),o.error&&z.error(o.error)},a=[o.success,o.error],t[2]=o.error,t[3]=o.success,t[4]=r,t[5]=a):(r=t[4],a=t[5]),u.useEffect(r,a);let s;return t[6]===Symbol.for("react.memo_cache_sentinel")?(s=c.jsx(Yp,{position:"top-right",autoClose:5500,hideProgressBar:!1,newestOnTop:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!0,theme:"light"}),t[6]=s):s=t[6],s}const pm=({children:t,breadcrumbs:e,recentOrders:n,...o})=>{const[r,a]=u.useState([]);return u.useEffect(()=>{const s=async()=>{try{const l=await ls.get("/cpanel/dashboard/recent-orders");a(l.data.recentOrders||[])}catch(l){console.error("Failed fetch recent orders",l)}};s();const i=setInterval(s,1e4);return()=>clearInterval(i)},[]),c.jsxs(c.Fragment,{children:[c.jsx(qp,{}),c.jsx(pp,{breadcrumbs:e,recentOrders:r||n,...o,children:t})]})};export{pm as A,Gd as B,$r as C,Of as D,wn as F,_d as K,Rd as M,Ki as O,St as P,jr as R,Dd as S,Xi as T,_o as U,Es as V,um as W,If as a,kf as b,nn as c,me as d,Lr as e,It as f,ko as g,se as h,Qo as i,Ho as j,_n as k,Tt as l,Fr as m,md as n,fd as o,Hn as p,Yi as q,Qi as r,Ui as s,Vi as t,Fo as u,qi as v,dm as w,Gi as x,cm as y,Ad as z};
