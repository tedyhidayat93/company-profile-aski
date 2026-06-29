import{r as y,j as i,f as st,t as ot,c as N,a as V,L as H,d as rt,b as A,g as nt}from"./app-BFjZOHqA.js";import{u as it,a as R,d as lt,c as S,e as Oe,B as ct,h as dt,g as U}from"./image-D15O8MDh.js";import{R as ft,T as ut,D as pt,C as mt,P as ht,a as gt,O as bt}from"./index-Cak5yr-v.js";import{X as yt,C as Te,F as vt}from"./x-CveGar5q.js";import{T as xt,b as _t,d as Tt,e as wt}from"./tooltip-MpYcFnDX.js";import{u as kt,c as Nt,P as Ct,b as Y,a as St}from"./index-9DqtRKlg.js";import{P as pe}from"./index-CyQ2hsvl.js";import{u as jt,a as Et}from"./index-Bq7QP_O0.js";import{e as It,f as we,U as $t,c as ne,g as Lt,a as At,b as Ot,D as Pt,S as Mt}from"./dropdown-menu-D5_fGgRQ.js";import{b as Rt,d as zt}from"./index-B-9MuXRv.js";import{u as Dt}from"./config-Bku_rp9m.js";import{T as Bt}from"./tag-BwW5mvpq.js";import{H as Ht}from"./hand-heart-CYft75M_.js";import{S as Ut}from"./star-BuuTvY-F.js";var ee="Collapsible",[Ft]=St(ee),[qt,me]=Ft(ee),Pe=y.forwardRef((t,e)=>{const{__scopeCollapsible:a,open:s,defaultOpen:o,disabled:r,onOpenChange:n,...l}=t,[c,d]=kt({prop:s,defaultProp:o??!1,onChange:n,caller:ee});return i.jsx(qt,{scope:a,disabled:r,contentId:jt(),open:c,onOpenToggle:y.useCallback(()=>d(f=>!f),[d]),children:i.jsx(pe.div,{"data-state":ge(c),"data-disabled":r?"":void 0,...l,ref:e})})});Pe.displayName=ee;var Me="CollapsibleTrigger",Re=y.forwardRef((t,e)=>{const{__scopeCollapsible:a,...s}=t,o=me(Me,a);return i.jsx(pe.button,{type:"button","aria-controls":o.contentId,"aria-expanded":o.open||!1,"data-state":ge(o.open),"data-disabled":o.disabled?"":void 0,disabled:o.disabled,...s,ref:e,onClick:Nt(t.onClick,o.onOpenToggle)})});Re.displayName=Me;var he="CollapsibleContent",ze=y.forwardRef((t,e)=>{const{forceMount:a,...s}=t,o=me(he,t.__scopeCollapsible);return i.jsx(Ct,{present:a||o.open,children:({present:r})=>i.jsx(Vt,{...s,ref:e,present:r})})});ze.displayName=he;var Vt=y.forwardRef((t,e)=>{const{__scopeCollapsible:a,present:s,children:o,...r}=t,n=me(he,a),[l,c]=y.useState(s),d=y.useRef(null),f=it(e,d),u=y.useRef(0),p=u.current,b=y.useRef(0),T=b.current,_=n.open||l,v=y.useRef(_),x=y.useRef(void 0);return y.useEffect(()=>{const m=requestAnimationFrame(()=>v.current=!1);return()=>cancelAnimationFrame(m)},[]),Y(()=>{const m=d.current;if(m){x.current=x.current||{transitionDuration:m.style.transitionDuration,animationName:m.style.animationName},m.style.transitionDuration="0s",m.style.animationName="none";const g=m.getBoundingClientRect();u.current=g.height,b.current=g.width,v.current||(m.style.transitionDuration=x.current.transitionDuration,m.style.animationName=x.current.animationName),c(s)}},[n.open,s]),i.jsx(pe.div,{"data-state":ge(n.open),"data-disabled":n.disabled?"":void 0,id:n.contentId,hidden:!_,...r,ref:f,style:{"--radix-collapsible-content-height":p?`${p}px`:void 0,"--radix-collapsible-content-width":T?`${T}px`:void 0,...t.style},children:_&&o})});function ge(t){return t?"open":"closed"}var Kt=Pe,ie={exports:{}},le={};var ke;function Wt(){if(ke)return le;ke=1;var t=st();function e(u,p){return u===p&&(u!==0||1/u===1/p)||u!==u&&p!==p}var a=typeof Object.is=="function"?Object.is:e,s=t.useState,o=t.useEffect,r=t.useLayoutEffect,n=t.useDebugValue;function l(u,p){var b=p(),T=s({inst:{value:b,getSnapshot:p}}),_=T[0].inst,v=T[1];return r(function(){_.value=b,_.getSnapshot=p,c(_)&&v({inst:_})},[u,b,p]),o(function(){return c(_)&&v({inst:_}),u(function(){c(_)&&v({inst:_})})},[u]),n(b),b}function c(u){var p=u.getSnapshot;u=u.value;try{var b=p();return!a(u,b)}catch{return!0}}function d(u,p){return p()}var f=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?d:l;return le.useSyncExternalStore=t.useSyncExternalStore!==void 0?t.useSyncExternalStore:f,le}var Ne;function Gt(){return Ne||(Ne=1,ie.exports=Wt()),ie.exports}var Xt=Gt();function Qt(){return Xt.useSyncExternalStore(Yt,()=>!0,()=>!1)}function Yt(){return()=>{}}const Zt=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],Jt=R("ChevronRight",Zt);const ea=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]],ta=R("ChevronUp",ea);const aa=[["path",{d:"m7 15 5 5 5-5",key:"1hf1tw"}],["path",{d:"m7 9 5-5 5 5",key:"sgt6xg"}]],sa=R("ChevronsUpDown",aa);const oa=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}],["path",{d:"M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662",key:"154egf"}]],ra=R("CircleUser",oa);const na=[["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",key:"1kt360"}]],ia=R("Folder",na);const la=[["path",{d:"m11 17 2 2a1 1 0 1 0 3-3",key:"efffak"}],["path",{d:"m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4",key:"9pr0kb"}],["path",{d:"m21 3 1 11h-2",key:"1tisrp"}],["path",{d:"M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3",key:"1uvwmv"}],["path",{d:"M3 4h8",key:"1ep09j"}]],ca=R("Handshake",la);const da=[["path",{d:"m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4",key:"g0fldk"}],["path",{d:"m21 2-9.6 9.6",key:"1j0ho8"}],["circle",{cx:"7.5",cy:"15.5",r:"5.5",key:"yqb3hr"}]],fa=R("Key",da);const ua=[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1",key:"1g98yp"}],["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1",key:"6d4xhi"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1",key:"nxv5o0"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1",key:"1bb6yr"}]],Ce=R("LayoutGrid",ua);const pa=[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]],ma=R("LogOut",pa);const ha=[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",key:"vv11sd"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]],ga=R("MessageCircleQuestion",ha);const ba=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M9 3v18",key:"fh3hqa"}]],ya=R("PanelLeft",ba);const va=[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],xa=R("Settings",va);const _a=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]],Ta=R("Shield",_a);const wa=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]],Se=R("Users",wa);var ka=Symbol.for("react.lazy"),Z=ot[" use ".trim().toString()];function Na(t){return typeof t=="object"&&t!==null&&"then"in t}function De(t){return t!=null&&typeof t=="object"&&"$$typeof"in t&&t.$$typeof===ka&&"_payload"in t&&Na(t._payload)}function Be(t){const e=Ca(t),a=y.forwardRef((s,o)=>{let{children:r,...n}=s;De(r)&&typeof Z=="function"&&(r=Z(r._payload));const l=y.Children.toArray(r),c=l.find(ja);if(c){const d=c.props.children,f=l.map(u=>u===c?y.Children.count(d)>1?y.Children.only(null):y.isValidElement(d)?d.props.children:null:u);return i.jsx(e,{...n,ref:o,children:y.isValidElement(d)?y.cloneElement(d,void 0,f):null})}return i.jsx(e,{...n,ref:o,children:r})});return a.displayName=`${t}.Slot`,a}var K=Be("Slot");function Ca(t){const e=y.forwardRef((a,s)=>{let{children:o,...r}=a;if(De(o)&&typeof Z=="function"&&(o=Z(o._payload)),y.isValidElement(o)){const n=Ia(o),l=Ea(r,o.props);return o.type!==y.Fragment&&(l.ref=s?lt(s,n):n),y.cloneElement(o,l)}return y.Children.count(o)>1?y.Children.only(null):null});return e.displayName=`${t}.SlotClone`,e}var Sa=Symbol("radix.slottable");function ja(t){return y.isValidElement(t)&&typeof t.type=="function"&&"__radixId"in t.type&&t.type.__radixId===Sa}function Ea(t,e){const a={...e};for(const s in e){const o=t[s],r=e[s];/^on[A-Z]/.test(s)?o&&r?a[s]=(...l)=>{const c=r(...l);return o(...l),c}:o&&(a[s]=o):s==="style"?a[s]={...o,...r}:s==="className"&&(a[s]=[o,r].filter(Boolean).join(" "))}return{...t,...a}}function Ia(t){let e=Object.getOwnPropertyDescriptor(t.props,"ref")?.get,a=e&&"isReactWarning"in e&&e.isReactWarning;return a?t.ref:(e=Object.getOwnPropertyDescriptor(t,"ref")?.get,a=e&&"isReactWarning"in e&&e.isReactWarning,a?t.props.ref:t.props.ref||t.ref)}const $a=Oe("inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",{variants:{variant:{default:"border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",secondary:"border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",destructive:"border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",outline:"text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"}},defaultVariants:{variant:"default"}});function La(t){const e=N.c(12);let a,s,o,r;e[0]!==t?({className:a,variant:r,asChild:o,...s}=t,e[0]=t,e[1]=a,e[2]=s,e[3]=o,e[4]=r):(a=e[1],s=e[2],o=e[3],r=e[4]);const l=(o===void 0?!1:o)?K:"span";let c;e[5]!==a||e[6]!==r?(c=S($a({variant:r}),a),e[5]=a,e[6]=r,e[7]=c):c=e[7];let d;return e[8]!==l||e[9]!==s||e[10]!==c?(d=i.jsx(l,{"data-slot":"badge",className:c,...s}),e[8]=l,e[9]=s,e[10]=c,e[11]=d):d=e[11],d}const Aa=768,Q=typeof window>"u"?void 0:window.matchMedia(`(max-width: ${Aa-1}px)`);function Oa(t){return Q?(Q.addEventListener("change",t),()=>{Q.removeEventListener("change",t)}):()=>{}}function Pa(){return Q?.matches??!1}function Ma(){return!1}function He(){return y.useSyncExternalStore(Oa,Pa,Ma)}var Ra=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"],be=Ra.reduce((t,e)=>{const a=Be(`Primitive.${e}`),s=y.forwardRef((o,r)=>{const{asChild:n,...l}=o,c=n?a:e;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),i.jsx(c,{...l,ref:r})});return s.displayName=`Primitive.${e}`,{...t,[e]:s}},{});function za(t){const e=N.c(4);let a;e[0]!==t?({...a}=t,e[0]=t,e[1]=a):a=e[1];let s;return e[2]!==a?(s=i.jsx(ft,{"data-slot":"sheet",...a}),e[2]=a,e[3]=s):s=e[3],s}function Da(t){const e=N.c(4);let a;e[0]!==t?({...a}=t,e[0]=t,e[1]=a):a=e[1];let s;return e[2]!==a?(s=i.jsx(ht,{"data-slot":"sheet-portal",...a}),e[2]=a,e[3]=s):s=e[3],s}function Ba(t){const e=N.c(8);let a,s;e[0]!==t?({className:a,...s}=t,e[0]=t,e[1]=a,e[2]=s):(a=e[1],s=e[2]);let o;e[3]!==a?(o=S("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80",a),e[3]=a,e[4]=o):o=e[4];let r;return e[5]!==s||e[6]!==o?(r=i.jsx(bt,{"data-slot":"sheet-overlay",className:o,...s}),e[5]=s,e[6]=o,e[7]=r):r=e[7],r}function Ha(t){const e=N.c(17);let a,s,o,r;e[0]!==t?({className:s,children:a,side:r,...o}=t,e[0]=t,e[1]=a,e[2]=s,e[3]=o,e[4]=r):(a=e[1],s=e[2],o=e[3],r=e[4]);const n=r===void 0?"right":r;let l;e[5]===Symbol.for("react.memo_cache_sentinel")?(l=i.jsx(Ba,{}),e[5]=l):l=e[5];const c=n==="right"&&"data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",d=n==="left"&&"data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",f=n==="top"&&"data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",u=n==="bottom"&&"data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t";let p;e[6]!==s||e[7]!==c||e[8]!==d||e[9]!==f||e[10]!==u?(p=S("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",c,d,f,u,s),e[6]=s,e[7]=c,e[8]=d,e[9]=f,e[10]=u,e[11]=p):p=e[11];let b;e[12]===Symbol.for("react.memo_cache_sentinel")?(b=i.jsxs(gt,{className:"ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none",children:[i.jsx(yt,{className:"size-4"}),i.jsx("span",{className:"sr-only",children:"Close"})]}),e[12]=b):b=e[12];let T;return e[13]!==a||e[14]!==o||e[15]!==p?(T=i.jsxs(Da,{children:[l,i.jsxs(mt,{"data-slot":"sheet-content",className:p,...o,children:[a,b]})]}),e[13]=a,e[14]=o,e[15]=p,e[16]=T):T=e[16],T}function Ua(t){const e=N.c(8);let a,s;e[0]!==t?({className:a,...s}=t,e[0]=t,e[1]=a,e[2]=s):(a=e[1],s=e[2]);let o;e[3]!==a?(o=S("flex flex-col gap-1.5 p-4",a),e[3]=a,e[4]=o):o=e[4];let r;return e[5]!==s||e[6]!==o?(r=i.jsx("div",{"data-slot":"sheet-header",className:o,...s}),e[5]=s,e[6]=o,e[7]=r):r=e[7],r}function Fa(t){const e=N.c(8);let a,s;e[0]!==t?({className:a,...s}=t,e[0]=t,e[1]=a,e[2]=s):(a=e[1],s=e[2]);let o;e[3]!==a?(o=S("text-foreground font-semibold",a),e[3]=a,e[4]=o):o=e[4];let r;return e[5]!==s||e[6]!==o?(r=i.jsx(ut,{"data-slot":"sheet-title",className:o,...s}),e[5]=s,e[6]=o,e[7]=r):r=e[7],r}function qa(t){const e=N.c(8);let a,s;e[0]!==t?({className:a,...s}=t,e[0]=t,e[1]=a,e[2]=s):(a=e[1],s=e[2]);let o;e[3]!==a?(o=S("text-muted-foreground text-sm",a),e[3]=a,e[4]=o):o=e[4];let r;return e[5]!==s||e[6]!==o?(r=i.jsx(pt,{"data-slot":"sheet-description",className:o,...s}),e[5]=s,e[6]=o,e[7]=r):r=e[7],r}const Va="sidebar_state",Ka=3600*24*7,Wa="16rem",Ga="18rem",Xa="3rem",Qa="b",Ue=y.createContext(null);function te(){const t=y.useContext(Ue);if(!t)throw new Error("useSidebar must be used within a SidebarProvider.");return t}function Ya(t){const e=N.c(36);let a,s,o,r,n,l,c;e[0]!==t?({defaultOpen:c,open:o,onOpenChange:n,className:s,style:l,children:a,...r}=t,e[0]=t,e[1]=a,e[2]=s,e[3]=o,e[4]=r,e[5]=n,e[6]=l,e[7]=c):(a=e[1],s=e[2],o=e[3],r=e[4],n=e[5],l=e[6],c=e[7]);const d=c===void 0?!0:c,f=He(),[u,p]=y.useState(!1),[b,T]=y.useState(d),_=o??b;let v;e[8]!==_||e[9]!==n?(v=B=>{const z=typeof B=="function"?B(_):B;n?n(z):T(z),document.cookie=`${Va}=${z}; path=/; max-age=${Ka}`},e[8]=_,e[9]=n,e[10]=v):v=e[10];const x=v;let m;e[11]!==f||e[12]!==x?(m=()=>f?p(Ja):x(Za),e[11]=f,e[12]=x,e[13]=m):m=e[13];const g=m;let h,k;e[14]!==g?(h=()=>{const B=z=>{z.key===Qa&&(z.metaKey||z.ctrlKey)&&(z.preventDefault(),g())};return window.addEventListener("keydown",B),()=>window.removeEventListener("keydown",B)},k=[g],e[14]=g,e[15]=h,e[16]=k):(h=e[15],k=e[16]),y.useEffect(h,k);const E=_?"expanded":"collapsed";let w;e[17]!==f||e[18]!==_||e[19]!==u||e[20]!==x||e[21]!==E||e[22]!==g?(w={state:E,open:_,setOpen:x,isMobile:f,openMobile:u,setOpenMobile:p,toggleSidebar:g},e[17]=f,e[18]=_,e[19]=u,e[20]=x,e[21]=E,e[22]=g,e[23]=w):w=e[23];const C=w;let I;e[24]!==l?(I={"--sidebar-width":Wa,"--sidebar-width-icon":Xa,...l},e[24]=l,e[25]=I):I=e[25];const j=I;let $;e[26]!==s?($=S("group/sidebar-wrapper has-data-[variant=inset]:bg-slate-950 flex min-h-svh w-full",s),e[26]=s,e[27]=$):$=e[27];let O;e[28]!==a||e[29]!==r||e[30]!==j||e[31]!==$?(O=i.jsx(xt,{delayDuration:0,children:i.jsx("div",{"data-slot":"sidebar-wrapper",style:j,className:$,...r,children:a})}),e[28]=a,e[29]=r,e[30]=j,e[31]=$,e[32]=O):O=e[32];let P;return e[33]!==C||e[34]!==O?(P=i.jsx(Ue.Provider,{value:C,children:O}),e[33]=C,e[34]=O,e[35]=P):P=e[35],P}function Za(t){return!t}function Ja(t){return!t}function es(t){const e=N.c(46);let a,s,o,r,n,l;e[0]!==t?({side:r,variant:n,collapsible:l,className:s,children:a,...o}=t,e[0]=t,e[1]=a,e[2]=s,e[3]=o,e[4]=r,e[5]=n,e[6]=l):(a=e[1],s=e[2],o=e[3],r=e[4],n=e[5],l=e[6]);const c=r===void 0?"left":r,d=n===void 0?"sidebar":n,f=l===void 0?"offcanvas":l,{isMobile:u,state:p,openMobile:b,setOpenMobile:T}=te();if(f==="none"){let I;e[7]!==s?(I=S("bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col",s),e[7]=s,e[8]=I):I=e[8];let j;return e[9]!==a||e[10]!==o||e[11]!==I?(j=i.jsx("div",{"data-slot":"sidebar",className:I,...o,children:a}),e[9]=a,e[10]=o,e[11]=I,e[12]=j):j=e[12],j}if(u){let I;e[13]===Symbol.for("react.memo_cache_sentinel")?(I=i.jsxs(Ua,{className:"sr-only",children:[i.jsx(Fa,{children:"Sidebar"}),i.jsx(qa,{children:"Displays the mobile sidebar."})]}),e[13]=I):I=e[13];let j;e[14]===Symbol.for("react.memo_cache_sentinel")?(j={"--sidebar-width":Ga},e[14]=j):j=e[14];let $;e[15]!==a?($=i.jsx("div",{className:"flex h-full w-full flex-col",children:a}),e[15]=a,e[16]=$):$=e[16];let O;e[17]!==c||e[18]!==$?(O=i.jsx(Ha,{"data-sidebar":"sidebar","data-slot":"sidebar","data-mobile":"true",className:"bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden",style:j,side:c,children:$}),e[17]=c,e[18]=$,e[19]=O):O=e[19];let P;return e[20]!==b||e[21]!==o||e[22]!==T||e[23]!==O?(P=i.jsxs(za,{open:b,onOpenChange:T,...o,children:[I,O]}),e[20]=b,e[21]=o,e[22]=T,e[23]=O,e[24]=P):P=e[24],P}const _=p==="collapsed"?f:"",v=d==="floating"||d==="inset"?"group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]":"group-data-[collapsible=icon]:w-(--sidebar-width-icon)";let x;e[25]!==v?(x=S("relative h-svh w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear","group-data-[collapsible=offcanvas]:w-0","group-data-[side=right]:rotate-180",v),e[25]=v,e[26]=x):x=e[26];let m;e[27]!==x?(m=i.jsx("div",{className:x}),e[27]=x,e[28]=m):m=e[28];const g=c==="left"?"left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]":"right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",h=d==="floating"||d==="inset"?"p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]":"group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l";let k;e[29]!==s||e[30]!==g||e[31]!==h?(k=S("fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",g,h,s),e[29]=s,e[30]=g,e[31]=h,e[32]=k):k=e[32];let E;e[33]!==a?(E=i.jsx("div",{"data-sidebar":"sidebar",className:"bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm",children:a}),e[33]=a,e[34]=E):E=e[34];let w;e[35]!==o||e[36]!==k||e[37]!==E?(w=i.jsx("div",{className:k,...o,children:E}),e[35]=o,e[36]=k,e[37]=E,e[38]=w):w=e[38];let C;return e[39]!==c||e[40]!==p||e[41]!==w||e[42]!==_||e[43]!==m||e[44]!==d?(C=i.jsxs("div",{className:"group peer text-sidebar-foreground hidden md:block","data-state":p,"data-collapsible":_,"data-variant":d,"data-side":c,"data-slot":"sidebar",children:[m,w]}),e[39]=c,e[40]=p,e[41]=w,e[42]=_,e[43]=m,e[44]=d,e[45]=C):C=e[45],C}function ts(t){const e=N.c(15);let a,s,o;e[0]!==t?({className:a,onClick:s,...o}=t,e[0]=t,e[1]=a,e[2]=s,e[3]=o):(a=e[1],s=e[2],o=e[3]);const{toggleSidebar:r}=te();let n;e[4]!==a?(n=S("h-7 w-7",a),e[4]=a,e[5]=n):n=e[5];let l;e[6]!==s||e[7]!==r?(l=u=>{s?.(u),r()},e[6]=s,e[7]=r,e[8]=l):l=e[8];let c,d;e[9]===Symbol.for("react.memo_cache_sentinel")?(c=i.jsx(ya,{}),d=i.jsx("span",{className:"sr-only",children:"Toggle Sidebar"}),e[9]=c,e[10]=d):(c=e[9],d=e[10]);let f;return e[11]!==o||e[12]!==n||e[13]!==l?(f=i.jsxs(ct,{"data-sidebar":"trigger","data-slot":"sidebar-trigger",variant:"ghost",size:"icon",className:n,onClick:l,...o,children:[c,d]}),e[11]=o,e[12]=n,e[13]=l,e[14]=f):f=e[14],f}function as(t){const e=N.c(8);let a,s;e[0]!==t?({className:a,...s}=t,e[0]=t,e[1]=a,e[2]=s):(a=e[1],s=e[2]);let o;e[3]!==a?(o=S("bg-background relative flex max-w-full min-h-svh flex-1 flex-col","peer-data-[variant=inset]:min-h-[calc(100svh-(--spacing(4)))] md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-0",a),e[3]=a,e[4]=o):o=e[4];let r;return e[5]!==s||e[6]!==o?(r=i.jsx("main",{"data-slot":"sidebar-inset",className:o,...s}),e[5]=s,e[6]=o,e[7]=r):r=e[7],r}function ss(t){const e=N.c(8);let a,s;e[0]!==t?({className:a,...s}=t,e[0]=t,e[1]=a,e[2]=s):(a=e[1],s=e[2]);let o;e[3]!==a?(o=S("flex flex-col gap-2 p-2",a),e[3]=a,e[4]=o):o=e[4];let r;return e[5]!==s||e[6]!==o?(r=i.jsx("div",{"data-slot":"sidebar-header","data-sidebar":"header",className:o,...s}),e[5]=s,e[6]=o,e[7]=r):r=e[7],r}function os(t){const e=N.c(8);let a,s;e[0]!==t?({className:a,...s}=t,e[0]=t,e[1]=a,e[2]=s):(a=e[1],s=e[2]);let o;e[3]!==a?(o=S("flex flex-col gap-2 p-2",a),e[3]=a,e[4]=o):o=e[4];let r;return e[5]!==s||e[6]!==o?(r=i.jsx("div",{"data-slot":"sidebar-footer","data-sidebar":"footer",className:o,...s}),e[5]=s,e[6]=o,e[7]=r):r=e[7],r}function rs(t){const e=N.c(8);let a,s;e[0]!==t?({className:a,...s}=t,e[0]=t,e[1]=a,e[2]=s):(a=e[1],s=e[2]);let o;e[3]!==a?(o=S("flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",a),e[3]=a,e[4]=o):o=e[4];let r;return e[5]!==s||e[6]!==o?(r=i.jsx("div",{"data-slot":"sidebar-content","data-sidebar":"content",className:o,...s}),e[5]=s,e[6]=o,e[7]=r):r=e[7],r}function ns(t){const e=N.c(8);let a,s;e[0]!==t?({className:a,...s}=t,e[0]=t,e[1]=a,e[2]=s):(a=e[1],s=e[2]);let o;e[3]!==a?(o=S("relative flex w-full min-w-0 flex-col p-2",a),e[3]=a,e[4]=o):o=e[4];let r;return e[5]!==s||e[6]!==o?(r=i.jsx("div",{"data-slot":"sidebar-group","data-sidebar":"group",className:o,...s}),e[5]=s,e[6]=o,e[7]=r):r=e[7],r}function is(t){const e=N.c(10);let a,s,o;e[0]!==t?({className:a,asChild:o,...s}=t,e[0]=t,e[1]=a,e[2]=s,e[3]=o):(a=e[1],s=e[2],o=e[3]);const n=(o===void 0?!1:o)?K:"div";let l;e[4]!==a?(l=S("text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0","group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:select-none group-data-[collapsible=icon]:pointer-events-none",a),e[4]=a,e[5]=l):l=e[5];let c;return e[6]!==n||e[7]!==s||e[8]!==l?(c=i.jsx(n,{"data-slot":"sidebar-group-label","data-sidebar":"group-label",className:l,...s}),e[6]=n,e[7]=s,e[8]=l,e[9]=c):c=e[9],c}function J(t){const e=N.c(8);let a,s;e[0]!==t?({className:a,...s}=t,e[0]=t,e[1]=a,e[2]=s):(a=e[1],s=e[2]);let o;e[3]!==a?(o=S("flex w-full min-w-0 flex-col gap-1",a),e[3]=a,e[4]=o):o=e[4];let r;return e[5]!==s||e[6]!==o?(r=i.jsx("ul",{"data-slot":"sidebar-menu","data-sidebar":"menu",className:o,...s}),e[5]=s,e[6]=o,e[7]=r):r=e[7],r}function ye(t){const e=N.c(8);let a,s;e[0]!==t?({className:a,...s}=t,e[0]=t,e[1]=a,e[2]=s):(a=e[1],s=e[2]);let o;e[3]!==a?(o=S("group/menu-item relative",a),e[3]=a,e[4]=o):o=e[4];let r;return e[5]!==s||e[6]!==o?(r=i.jsx("li",{"data-slot":"sidebar-menu-item","data-sidebar":"menu-item",className:o,...s}),e[5]=s,e[6]=o,e[7]=r):r=e[7],r}const ls=Oe("peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",{variants:{variant:{default:"hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",outline:"bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"h-8 text-sm",sm:"h-7 text-xs",lg:"h-12 text-sm group-data-[collapsible=icon]:p-0!"}},defaultVariants:{variant:"default",size:"default"}});function ve(t){const e=N.c(28);let a,s,o,r,n,l,c;e[0]!==t?({asChild:o,isActive:r,variant:n,size:l,tooltip:c,className:a,...s}=t,e[0]=t,e[1]=a,e[2]=s,e[3]=o,e[4]=r,e[5]=n,e[6]=l,e[7]=c):(a=e[1],s=e[2],o=e[3],r=e[4],n=e[5],l=e[6],c=e[7]);const d=o===void 0?!1:o,f=r===void 0?!1:r,u=n===void 0?"default":n,p=l===void 0?"default":l,b=d?K:"button",{isMobile:T,state:_}=te();let v;e[8]!==a||e[9]!==p||e[10]!==u?(v=S(ls({variant:u,size:p}),a),e[8]=a,e[9]=p,e[10]=u,e[11]=v):v=e[11];let x;e[12]!==b||e[13]!==f||e[14]!==s||e[15]!==p||e[16]!==v?(x=i.jsx(b,{"data-slot":"sidebar-menu-button","data-sidebar":"menu-button","data-size":p,"data-active":f,className:v,...s}),e[12]=b,e[13]=f,e[14]=s,e[15]=p,e[16]=v,e[17]=x):x=e[17];const m=x;if(!c)return m;if(typeof c=="string"){let w;e[18]!==c?(w={children:c},e[18]=c,e[19]=w):w=e[19],c=w}let g;e[20]!==m?(g=i.jsx(Tt,{asChild:!0,children:m}),e[20]=m,e[21]=g):g=e[21];const h=_!=="collapsed"||T;let k;e[22]!==h||e[23]!==c?(k=i.jsx(_t,{side:"right",align:"center",hidden:h,...c}),e[22]=h,e[23]=c,e[24]=k):k=e[24];let E;return e[25]!==g||e[26]!==k?(E=i.jsxs(wt,{children:[g,k]}),e[25]=g,e[26]=k,e[27]=E):E=e[27],E}function cs(t){const e=N.c(8);let a,s;e[0]!==t?({className:a,...s}=t,e[0]=t,e[1]=a,e[2]=s):(a=e[1],s=e[2]);let o;e[3]!==a?(o=S("border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5","group-data-[collapsible=icon]:hidden",a),e[3]=a,e[4]=o):o=e[4];let r;return e[5]!==s||e[6]!==o?(r=i.jsx("ul",{"data-slot":"sidebar-menu-sub","data-sidebar":"menu-sub",className:o,...s}),e[5]=s,e[6]=o,e[7]=r):r=e[7],r}function ds(t){const e=N.c(8);let a,s;e[0]!==t?({className:a,...s}=t,e[0]=t,e[1]=a,e[2]=s):(a=e[1],s=e[2]);let o;e[3]!==a?(o=S("group/menu-sub-item relative",a),e[3]=a,e[4]=o):o=e[4];let r;return e[5]!==s||e[6]!==o?(r=i.jsx("li",{"data-slot":"sidebar-menu-sub-item","data-sidebar":"menu-sub-item",className:o,...s}),e[5]=s,e[6]=o,e[7]=r):r=e[7],r}function fs(t){const e=N.c(16);let a,s,o,r,n;e[0]!==t?({asChild:o,size:r,isActive:n,className:a,...s}=t,e[0]=t,e[1]=a,e[2]=s,e[3]=o,e[4]=r,e[5]=n):(a=e[1],s=e[2],o=e[3],r=e[4],n=e[5]);const l=o===void 0?!1:o,c=r===void 0?"md":r,d=n===void 0?!1:n,f=l?K:"a",u=c==="sm"&&"text-xs",p=c==="md"&&"text-sm";let b;e[6]!==a||e[7]!==u||e[8]!==p?(b=S("text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-hidden focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0","data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",u,p,"group-data-[collapsible=icon]:hidden",a),e[6]=a,e[7]=u,e[8]=p,e[9]=b):b=e[9];let T;return e[10]!==f||e[11]!==d||e[12]!==s||e[13]!==c||e[14]!==b?(T=i.jsx(f,{"data-slot":"sidebar-menu-sub-button","data-sidebar":"menu-sub-button","data-size":c,"data-active":d,className:b,...s}),e[10]=f,e[11]=d,e[12]=s,e[13]=c,e[14]=b,e[15]=T):T=e[15],T}function us(t){const e=N.c(10);let a,s,o;if(e[0]!==t?({variant:o,children:a,...s}=t,e[0]=t,e[1]=a,e[2]=s,e[3]=o):(a=e[1],s=e[2],o=e[3]),(o===void 0?"header":o)==="sidebar"){let l;return e[4]!==a||e[5]!==s?(l=i.jsx(as,{...s,children:a}),e[4]=a,e[5]=s,e[6]=l):l=e[6],l}let n;return e[7]!==a||e[8]!==s?(n=i.jsx("main",{className:"mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4 rounded-xl bg-slate-950!",...s,children:a}),e[7]=a,e[8]=s,e[9]=n):n=e[9],n}function ps(t){const e=N.c(5),{children:a,variant:s}=t,o=s===void 0?"header":s,r=V().props.sidebarOpen;if(o==="header"){let l;return e[0]!==a?(l=i.jsx("div",{className:"flex min-h-screen w-full flex-col",children:a}),e[0]=a,e[1]=l):l=e[1],l}let n;return e[2]!==a||e[3]!==r?(n=i.jsx(Ya,{defaultOpen:r,children:a}),e[2]=a,e[3]=r,e[4]=n):n=e[4],n}function je(t){const e=N.c(4);let a;e[0]!==t?({...a}=t,e[0]=t,e[1]=a):a=e[1];let s;return e[2]!==a?(s=i.jsx(Kt,{"data-slot":"collapsible",...a}),e[2]=a,e[3]=s):s=e[3],s}function Ee(t){const e=N.c(4);let a;e[0]!==t?({...a}=t,e[0]=t,e[1]=a):a=e[1];let s;return e[2]!==a?(s=i.jsx(Re,{"data-slot":"collapsible-trigger",...a}),e[2]=a,e[3]=s):s=e[3],s}function Ie(t){const e=N.c(4);let a;e[0]!==t?({...a}=t,e[0]=t,e[1]=a):a=e[1];let s;return e[2]!==a?(s=i.jsx(ze,{"data-slot":"collapsible-content",...a}),e[2]=a,e[3]=s):s=e[3],s}function ms(t){const e=N.c(20),{items:a,groupTitle:s,newOrdersCount:o}=t,{url:r}=V();let n;e[0]===Symbol.for("react.memo_cache_sentinel")?(n={},e[0]=n):n=e[0];const[l,c]=y.useState(n),[d,f]=y.useState(s==="CMS");let u;e[1]!==r?(u=h=>h==="/cpanel"?r===h:h.includes("/settings/")?r.startsWith("/cpanel/settings/")||r.startsWith(h):r.startsWith(h)||r===h,e[1]=r,e[2]=u):u=e[2];const p=u;let b;e[3]===Symbol.for("react.memo_cache_sentinel")?(b=h=>{c(k=>({...k,[h]:!k[h]}))},e[3]=b):b=e[3];const T=b;let _;e[4]!==p||e[5]!==o||e[6]!==l?(_=(h,k)=>{const E=k===void 0?0:k,w=h.items&&h.items.length>0,C=p(h.href.toString())||h.isActive,I=l[h.href.toString()]??C;return i.jsx(je,{open:I,onOpenChange:()=>T(h.href.toString()),className:S("transition-colors duration-200",C&&"",E>0&&"border-border/20 ml-4 border-l-2"),children:i.jsxs(ye,{children:[i.jsx(Ee,{asChild:!0,children:i.jsx(ve,{asChild:!0,className:S("w-full",C?"bg-primary dark:bg-accent-foreground font-semibold dark:text-black!":"text-foreground hover:bg-white/10!"),children:i.jsxs("div",{className:"flex w-full items-center justify-between",children:[i.jsxs(H,{href:h.href,className:S("flex flex-1 items-center gap-2 text-sm","transition-colors duration-200",C?"text-slate-800 font-bold":"text-accent/70 dark:text-white/70",E>0&&"text-xs"),children:[h.icon&&i.jsx(h.icon,{className:"h-4 w-4 shrink-0"}),i.jsx("span",{className:"truncate",children:h.title})]}),o?h.title==="Daftar Pesanan"&&o>0&&i.jsx(La,{className:"animate-pulse h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500 hover:bg-red-600",children:o}):null,w&&i.jsx(Te,{className:S("h-4 w-4 transition-transform duration-200",I?"rotate-180":"")})]})})}),w&&i.jsx(Ie,{children:i.jsx(cs,{children:h.items?.map(j=>i.jsx(ds,{className:S("border-border/20 ml-2 border-l-2",p(j.href.toString())&&"border-primary/50"),children:i.jsx(fs,{asChild:!0,children:i.jsxs(H,{href:j.href,className:S("flex items-center gap-2 text-sm",p(j.href.toString())?"text-foreground font-medium":"text-muted-foreground hover:text-foreground","transition-colors duration-200"),children:[j.icon&&i.jsx(j.icon,{className:"h-3.5 w-3.5 shrink-0"}),i.jsx("span",{className:"truncate",children:j.title})]})})},j.href.toString()))})})]})},h.href.toString())},e[4]=p,e[5]=o,e[6]=l,e[7]=_):_=e[7];const v=_;let x;e[8]!==s||e[9]!==d||e[10]!==a||e[11]!==v?(x=s&&i.jsxs(je,{defaultOpen:s==="CMS",onOpenChange:f,className:"space-y-0",children:[i.jsx(Ee,{asChild:!0,children:i.jsxs(is,{className:S("text-xxs! text-muted-foreground hover:bg-accent/50 flex cursor-pointer items-center justify-between rounded-md px-2 py-1.5 font-semibold transition-colors",d&&"mb-1"),children:[i.jsx("span",{children:s}),d?i.jsx(ta,{className:"text-muted-foreground h-3.5 w-3.5"}):i.jsx(Te,{className:"text-muted-foreground h-3.5 w-3.5"})]})}),i.jsx(Ie,{children:i.jsx(J,{className:"space-y-0",children:a.map(h=>v(h))})})]}),e[8]=s,e[9]=d,e[10]=a,e[11]=v,e[12]=x):x=e[12];let m;e[13]!==s||e[14]!==a||e[15]!==v?(m=!s&&i.jsx(J,{className:"space-y-0",children:a.map(h=>v(h))}),e[13]=s,e[14]=a,e[15]=v,e[16]=m):m=e[16];let g;return e[17]!==x||e[18]!==m?(g=i.jsxs(ns,{className:"space-y-0",children:[x,m]}),e[17]=x,e[18]=m,e[19]=g):g=e[19],g}function hs(t,e=[]){let a=[];function s(r,n){const l=y.createContext(n);l.displayName=r+"Context";const c=a.length;a=[...a,n];const d=u=>{const{scope:p,children:b,...T}=u,_=p?.[t]?.[c]||l,v=y.useMemo(()=>T,Object.values(T));return i.jsx(_.Provider,{value:v,children:b})};d.displayName=r+"Provider";function f(u,p){const b=p?.[t]?.[c]||l,T=y.useContext(b);if(T)return T;if(n!==void 0)return n;throw new Error(`\`${u}\` must be used within \`${r}\``)}return[d,f]}const o=()=>{const r=a.map(n=>y.createContext(n));return function(l){const c=l?.[t]||r;return y.useMemo(()=>({[`__scope${t}`]:{...l,[t]:c}}),[l,c])}};return o.scopeName=t,[s,gs(o,...e)]}function gs(...t){const e=t[0];if(t.length===1)return e;const a=()=>{const s=t.map(o=>({useScope:o(),scopeName:o.scopeName}));return function(r){const n=s.reduce((l,{useScope:c,scopeName:d})=>{const u=c(r)[`__scope${d}`];return{...l,...u}},{});return y.useMemo(()=>({[`__scope${e.scopeName}`]:n}),[n])}};return a.scopeName=e.scopeName,a}var xe="Avatar",[bs]=hs(xe),[ys,Fe]=bs(xe),qe=y.forwardRef((t,e)=>{const{__scopeAvatar:a,...s}=t,[o,r]=y.useState("idle");return i.jsx(ys,{scope:a,imageLoadingStatus:o,onImageLoadingStatusChange:r,children:i.jsx(be.span,{...s,ref:e})})});qe.displayName=xe;var Ve="AvatarImage",Ke=y.forwardRef((t,e)=>{const{__scopeAvatar:a,src:s,onLoadingStatusChange:o=()=>{},...r}=t,n=Fe(Ve,a),l=vs(s,r),c=Et(d=>{o(d),n.onImageLoadingStatusChange(d)});return Y(()=>{l!=="idle"&&c(l)},[l,c]),l==="loaded"?i.jsx(be.img,{...r,ref:e,src:s}):null});Ke.displayName=Ve;var We="AvatarFallback",Ge=y.forwardRef((t,e)=>{const{__scopeAvatar:a,delayMs:s,...o}=t,r=Fe(We,a),[n,l]=y.useState(s===void 0);return y.useEffect(()=>{if(s!==void 0){const c=window.setTimeout(()=>l(!0),s);return()=>window.clearTimeout(c)}},[s]),n&&r.imageLoadingStatus!=="loaded"?i.jsx(be.span,{...o,ref:e}):null});Ge.displayName=We;function $e(t,e){return t?e?(t.src!==e&&(t.src=e),t.complete&&t.naturalWidth>0?"loaded":"loading"):"error":"idle"}function vs(t,{referrerPolicy:e,crossOrigin:a}){const s=Qt(),o=y.useRef(null),r=s?(o.current||(o.current=new window.Image),o.current):null,[n,l]=y.useState(()=>$e(r,t));return Y(()=>{l($e(r,t))},[r,t]),Y(()=>{const c=u=>()=>{l(u)};if(!r)return;const d=c("loaded"),f=c("error");return r.addEventListener("load",d),r.addEventListener("error",f),e&&(r.referrerPolicy=e),typeof a=="string"&&(r.crossOrigin=a),()=>{r.removeEventListener("load",d),r.removeEventListener("error",f)}},[r,a,e]),n}var xs=qe,_s=Ke,Ts=Ge;function ws(t){const e=N.c(8);let a,s;e[0]!==t?({className:a,...s}=t,e[0]=t,e[1]=a,e[2]=s):(a=e[1],s=e[2]);let o;e[3]!==a?(o=S("relative flex size-8 shrink-0 overflow-hidden rounded-full",a),e[3]=a,e[4]=o):o=e[4];let r;return e[5]!==s||e[6]!==o?(r=i.jsx(xs,{"data-slot":"avatar",className:o,...s}),e[5]=s,e[6]=o,e[7]=r):r=e[7],r}function ks(t){const e=N.c(8);let a,s;e[0]!==t?({className:a,...s}=t,e[0]=t,e[1]=a,e[2]=s):(a=e[1],s=e[2]);let o;e[3]!==a?(o=S("aspect-square size-full",a),e[3]=a,e[4]=o):o=e[4];let r;return e[5]!==s||e[6]!==o?(r=i.jsx(_s,{"data-slot":"avatar-image",className:o,...s}),e[5]=s,e[6]=o,e[7]=r):r=e[7],r}function Ns(t){const e=N.c(8);let a,s;e[0]!==t?({className:a,...s}=t,e[0]=t,e[1]=a,e[2]=s):(a=e[1],s=e[2]);let o;e[3]!==a?(o=S("bg-muted flex size-full items-center justify-center rounded-full",a),e[3]=a,e[4]=o):o=e[4];let r;return e[5]!==s||e[6]!==o?(r=i.jsx(Ts,{"data-slot":"avatar-fallback",className:o,...s}),e[5]=s,e[6]=o,e[7]=r):r=e[7],r}function Cs(){return Ss}function Ss(t){const e=t.trim().split(" ");if(e.length===0)return"";if(e.length===1)return e[0].charAt(0).toUpperCase();const a=e[0].charAt(0),s=e[e.length-1].charAt(0);return`${a}${s}`.toUpperCase()}function Xe(t){const e=N.c(21),{user:a,showEmail:s}=t,o=Cs(),r=a.avatar?`/storage/${a.avatar}`:void 0;let n;e[0]!==r||e[1]!==a.name?(n=i.jsx(ks,{src:r,alt:a.name}),e[0]=r,e[1]=a.name,e[2]=n):n=e[2];let l;e[3]!==o||e[4]!==a.name?(l=o(a.name),e[3]=o,e[4]=a.name,e[5]=l):l=e[5];let c;e[6]!==l?(c=i.jsx(Ns,{className:"rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white",children:l}),e[6]=l,e[7]=c):c=e[7];let d;e[8]!==n||e[9]!==c?(d=i.jsxs(ws,{className:"h-8 w-8 overflow-hidden rounded-full",children:[n,c]}),e[8]=n,e[9]=c,e[10]=d):d=e[10];let f;e[11]!==a.name?(f=i.jsx("span",{className:"truncate font-medium text-orange-400",children:a.name}),e[11]=a.name,e[12]=f):f=e[12];let u;e[13]!==a.email?(u=i.jsx("span",{className:"text-muted-foreground truncate text-xs",children:a.email}),e[13]=a.email,e[14]=u):u=e[14];let p;e[15]!==f||e[16]!==u?(p=i.jsxs("div",{className:"grid flex-1 text-left text-sm leading-tight",children:[f,u]}),e[15]=f,e[16]=u,e[17]=p):p=e[17];let b;return e[18]!==d||e[19]!==p?(b=i.jsxs(i.Fragment,{children:[d,p]}),e[18]=d,e[19]=p,e[20]=b):b=e[20],b}function js(){return Es}function Es(){document.body.style.removeProperty("pointer-events")}function Is(t){const e=N.c(23),{user:a}=t,s=js();let o;e[0]!==s?(o=()=>{s(),rt.flushAll()},e[0]=s,e[1]=o):o=e[1];const r=o;let n;e[2]!==a?(n=i.jsx(It,{className:"p-0 font-normal",children:i.jsx("div",{className:"flex items-center gap-2 px-1 py-1.5 text-left text-sm",children:i.jsx(Xe,{user:a,showEmail:!0})})}),e[2]=a,e[3]=n):n=e[3];let l;e[4]===Symbol.for("react.memo_cache_sentinel")?(l=i.jsx(we,{}),e[4]=l):l=e[4];let c;e[5]===Symbol.for("react.memo_cache_sentinel")?(c=i.jsx($t,{className:"mr-2"}),e[5]=c):c=e[5];let d;e[6]!==s?(d=i.jsx(ne,{asChild:!0,children:i.jsxs(H,{className:"block w-full",href:"/cpanel/settings/profile",as:"button",prefetch:!0,onClick:s,children:[c,"Edit Profil"]})}),e[6]=s,e[7]=d):d=e[7];let f;e[8]===Symbol.for("react.memo_cache_sentinel")?(f=i.jsx(fa,{className:"mr-2"}),e[8]=f):f=e[8];let u;e[9]!==s?(u=i.jsx(ne,{asChild:!0,children:i.jsxs(H,{className:"block w-full",href:"/cpanel/settings/password",as:"button",prefetch:!0,onClick:s,children:[f,"Ubah Password"]})}),e[9]=s,e[10]=u):u=e[10];let p;e[11]!==d||e[12]!==u?(p=i.jsxs(Lt,{children:[d,u]}),e[11]=d,e[12]=u,e[13]=p):p=e[13];let b;e[14]===Symbol.for("react.memo_cache_sentinel")?(b=i.jsx(we,{}),e[14]=b):b=e[14];let T;e[15]===Symbol.for("react.memo_cache_sentinel")?(T=Rt(),e[15]=T):T=e[15];let _;e[16]===Symbol.for("react.memo_cache_sentinel")?(_=i.jsx(ma,{className:"mr-2"}),e[16]=_):_=e[16];let v;e[17]!==r?(v=i.jsx(ne,{asChild:!0,children:i.jsxs(H,{className:"block w-full",href:T,as:"button",onClick:r,"data-test":"logout-button",children:[_,"Keluar"]})}),e[17]=r,e[18]=v):v=e[18];let x;return e[19]!==v||e[20]!==n||e[21]!==p?(x=i.jsxs(i.Fragment,{children:[n,l,p,b,v]}),e[19]=v,e[20]=n,e[21]=p,e[22]=x):x=e[22],x}function $s(){const t=N.c(13),{auth:e}=V().props,{state:a}=te(),s=He();let o;t[0]!==e.user?(o=i.jsx(Xe,{user:e.user}),t[0]=e.user,t[1]=o):o=t[1];let r;t[2]===Symbol.for("react.memo_cache_sentinel")?(r=i.jsx(sa,{className:"ml-auto size-4"}),t[2]=r):r=t[2];let n;t[3]!==o?(n=i.jsx(At,{asChild:!0,children:i.jsxs(ve,{size:"lg",className:"group text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent","data-test":"sidebar-menu-button",children:[o,r]})}),t[3]=o,t[4]=n):n=t[4];const l=s?"bottom":a==="collapsed"?"left":"bottom";let c;t[5]!==e.user?(c=i.jsx(Is,{user:e.user}),t[5]=e.user,t[6]=c):c=t[6];let d;t[7]!==l||t[8]!==c?(d=i.jsx(Ot,{className:"w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg",align:"end",side:l,children:c}),t[7]=l,t[8]=c,t[9]=d):d=t[9];let f;return t[10]!==n||t[11]!==d?(f=i.jsx(J,{children:i.jsx(ye,{children:i.jsxs(Pt,{children:[n,d]})})}),t[10]=n,t[11]=d,t[12]=f):f=t[12],f}function Ls(){const t=N.c(11),{getConfig:e}=Dt();let a,s;if(t[0]!==e){const d=e("site_favicon","/images/logo-main-square.png");a=e("site_name","Alumoda Sinergi Kontainer Indonesia"),s=d.startsWith("configurations/")?`/storage/${d}`:d,t[0]=e,t[1]=a,t[2]=s}else a=t[1],s=t[2];const o=s;let r;t[3]!==o?(r=i.jsx("div",{className:"text-sidebar-primary-foreground flex aspect-square size-9 items-center justify-center rounded-md bg-white/10",children:i.jsx("img",{src:o,className:"size-9 fill-current text-white dark:text-black",onError:As})}),t[3]=o,t[4]=r):r=t[4];let n;t[5]===Symbol.for("react.memo_cache_sentinel")?(n=i.jsx("span",{className:"mb-0.5 truncate leading-tight font-semibold text-orange-400",children:"Admin Panel"}),t[5]=n):n=t[5];let l;t[6]!==a?(l=i.jsxs("div",{className:"ml-1 grid flex-1 text-left text-sm",children:[n,i.jsx("span",{className:"text-muted dark:text-white/50 truncate text-xs",children:a})]}),t[6]=a,t[7]=l):l=t[7];let c;return t[8]!==r||t[9]!==l?(c=i.jsxs(i.Fragment,{children:[r,l]}),t[8]=r,t[9]=l,t[10]=c):c=t[10],c}function As(t){return dt(t,"/images/logo-main-square.png","Site logo")}const Os=[{group:{title:"",items:[{title:"Dashboard",href:"/cpanel",icon:Ce},{title:"Daftar Pesanan",href:"/cpanel/crm/orders",icon:Mt,permission:"order-list"},{title:"Posting Artikel",href:"/cpanel/cms/article",icon:vt,permission:"article-list"},{title:"Produk",href:"/cpanel/cms/product?status=published",icon:Ce,permission:"product-list"},{title:"Pelanggan",href:"/cpanel/crm/customer",icon:Se,permission:"customer-list"},{title:"Klien",href:"/cpanel/cms/client",icon:ca,permission:"client-list"},{title:"Merek",href:"/cpanel/cms/brand",icon:Bt,permission:"brand-list"},{title:"Layanan",href:"/cpanel/cms/service",icon:Ht,permission:"service-list"},{title:"Kategori",href:"/cpanel/cms/category",icon:ia,permission:"category-list"},{title:"FAQ",href:"/cpanel/cms/faq",icon:ga,permission:"faq-list"},{title:"Ulasan",href:"/cpanel/cms/testimonial",icon:Ut,permission:"testimonial-list"},{title:"Akun Pengguna",href:"/cpanel/authorization/user-management",icon:Se,permission:"user-list"},{title:"Peran",href:"/cpanel/authorization/roles",icon:ra,permission:"role-list"},{title:"Hak Akses",href:"/cpanel/authorization/permissions",icon:Ta,permission:"permission-list"},{title:"Pengaturan",href:"/cpanel/settings/configuration/site",icon:xa,permission:"setting-configuration-list"}]}}];function Ps(t){const e=N.c(34),{recentOrders:a}=t;let s;e[0]!==a?(s=a===void 0?[]:a,e[0]=a,e[1]=s):s=e[1];const o=s,{auth:r}=V().props;let n;e[2]!==r.permissions?(n=r.permissions||[],e[2]=r.permissions,e[3]=n):n=e[3];const l=n;let c;e[4]!==o?(c=o.filter(Ms),e[4]=o,e[5]=c):c=e[5];const d=c.length;let f,u,p,b,T,_,v,x;if(e[6]!==d||e[7]!==l){let k;e[16]!==l?(k=I=>{const{group:j}=I;return{group:{...j,items:j.items.filter($=>$.permission?l.includes($.permission):!0)}}},e[16]=l,e[17]=k):k=e[17];const E=Os.map(k);u=es,_="icon",v="inset",x="bg-slate-900";let w;e[18]===Symbol.for("react.memo_cache_sentinel")?(w=zt(),e[18]=w):w=e[18],e[19]===Symbol.for("react.memo_cache_sentinel")?(p=i.jsx(ss,{className:"bg-slate-900",children:i.jsx(J,{children:i.jsx(ye,{children:i.jsx(ve,{className:"hover:bg-slate-900",size:"lg",asChild:!0,children:i.jsx(H,{href:w,prefetch:!0,children:i.jsx(Ls,{})})})})})}),e[19]=p):p=e[19],f=rs,b="-space-y-2! bg-slate-900";let C;e[20]!==d?(C=(I,j)=>{const{group:$}=I;return i.jsx(ms,{items:$.items,groupTitle:$.title,newOrdersCount:d},j)},e[20]=d,e[21]=C):C=e[21],T=E.map(C),e[6]=d,e[7]=l,e[8]=f,e[9]=u,e[10]=p,e[11]=b,e[12]=T,e[13]=_,e[14]=v,e[15]=x}else f=e[8],u=e[9],p=e[10],b=e[11],T=e[12],_=e[13],v=e[14],x=e[15];let m;e[22]!==f||e[23]!==b||e[24]!==T?(m=i.jsx(f,{className:b,children:T}),e[22]=f,e[23]=b,e[24]=T,e[25]=m):m=e[25];let g;e[26]===Symbol.for("react.memo_cache_sentinel")?(g=i.jsx(os,{className:"bg-slate-900",children:i.jsx($s,{})}),e[26]=g):g=e[26];let h;return e[27]!==u||e[28]!==p||e[29]!==m||e[30]!==_||e[31]!==v||e[32]!==x?(h=i.jsxs(u,{collapsible:_,variant:v,className:x,children:[p,m,g]}),e[27]=u,e[28]=p,e[29]=m,e[30]=_,e[31]=v,e[32]=x,e[33]=h):h=e[33],h}function Ms(t){return t.status==="pending"}function Rs(t){const e=N.c(4);let a;e[0]!==t?({...a}=t,e[0]=t,e[1]=a):a=e[1];let s;return e[2]!==a?(s=i.jsx("nav",{"aria-label":"breadcrumb","data-slot":"breadcrumb",...a}),e[2]=a,e[3]=s):s=e[3],s}function zs(t){const e=N.c(8);let a,s;e[0]!==t?({className:a,...s}=t,e[0]=t,e[1]=a,e[2]=s):(a=e[1],s=e[2]);let o;e[3]!==a?(o=S("text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",a),e[3]=a,e[4]=o):o=e[4];let r;return e[5]!==s||e[6]!==o?(r=i.jsx("ol",{"data-slot":"breadcrumb-list",className:o,...s}),e[5]=s,e[6]=o,e[7]=r):r=e[7],r}function Ds(t){const e=N.c(8);let a,s;e[0]!==t?({className:a,...s}=t,e[0]=t,e[1]=a,e[2]=s):(a=e[1],s=e[2]);let o;e[3]!==a?(o=S("inline-flex items-center gap-1.5",a),e[3]=a,e[4]=o):o=e[4];let r;return e[5]!==s||e[6]!==o?(r=i.jsx("li",{"data-slot":"breadcrumb-item",className:o,...s}),e[5]=s,e[6]=o,e[7]=r):r=e[7],r}function Bs(t){const e=N.c(10);let a,s,o;e[0]!==t?({asChild:a,className:s,...o}=t,e[0]=t,e[1]=a,e[2]=s,e[3]=o):(a=e[1],s=e[2],o=e[3]);const r=a?K:"a";let n;e[4]!==s?(n=S("hover:text-foreground transition-colors",s),e[4]=s,e[5]=n):n=e[5];let l;return e[6]!==r||e[7]!==o||e[8]!==n?(l=i.jsx(r,{"data-slot":"breadcrumb-link",className:n,...o}),e[6]=r,e[7]=o,e[8]=n,e[9]=l):l=e[9],l}function Hs(t){const e=N.c(8);let a,s;e[0]!==t?({className:a,...s}=t,e[0]=t,e[1]=a,e[2]=s):(a=e[1],s=e[2]);let o;e[3]!==a?(o=S("text-foreground font-normal",a),e[3]=a,e[4]=o):o=e[4];let r;return e[5]!==s||e[6]!==o?(r=i.jsx("span",{"data-slot":"breadcrumb-page",role:"link","aria-disabled":"true","aria-current":"page",className:o,...s}),e[5]=s,e[6]=o,e[7]=r):r=e[7],r}function Us(t){const e=N.c(12);let a,s,o;e[0]!==t?({children:a,className:s,...o}=t,e[0]=t,e[1]=a,e[2]=s,e[3]=o):(a=e[1],s=e[2],o=e[3]);let r;e[4]!==s?(r=S("[&>svg]:size-3.5",s),e[4]=s,e[5]=r):r=e[5];let n;e[6]!==a?(n=a??i.jsx(Jt,{}),e[6]=a,e[7]=n):n=e[7];let l;return e[8]!==o||e[9]!==r||e[10]!==n?(l=i.jsx("li",{"data-slot":"breadcrumb-separator",role:"presentation","aria-hidden":"true",className:r,...o,children:n}),e[8]=o,e[9]=r,e[10]=n,e[11]=l):l=e[11],l}function Fs(t){const e=N.c(4),{breadcrumbs:a}=t;let s;e[0]!==a?(s=a.length>0&&i.jsx(Rs,{children:i.jsx(zs,{children:a.map((r,n)=>{const l=n===a.length-1;return i.jsxs(y.Fragment,{children:[i.jsx(Ds,{children:l?i.jsx(Hs,{children:r.title}):i.jsx(Bs,{asChild:!0,children:i.jsx(H,{href:r.href,children:r.title})})}),!l&&i.jsx(Us,{})]},n)})})}),e[0]=a,e[1]=s):s=e[1];let o;return e[2]!==s?(o=i.jsx(i.Fragment,{children:s}),e[2]=s,e[3]=o):o=e[3],o}function qs(t){const e=N.c(5),{breadcrumbs:a}=t;let s;e[0]!==a?(s=a===void 0?[]:a,e[0]=a,e[1]=s):s=e[1];const o=s;let r;e[2]===Symbol.for("react.memo_cache_sentinel")?(r=i.jsx(ts,{className:"-ml-1"}),e[2]=r):r=e[2];let n;return e[3]!==o?(n=i.jsx("header",{className:"border-sidebar-border/50 flex h-16 shrink-0 items-center gap-2 border-b px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4",children:i.jsxs("div",{className:"flex items-center gap-2",children:[r,i.jsx(Fs,{breadcrumbs:o})]})}),e[3]=o,e[4]=n):n=e[4],n}function Vs(t){const e=N.c(14),{children:a,breadcrumbs:s,recentOrders:o}=t;let r;e[0]!==s?(r=s===void 0?[]:s,e[0]=s,e[1]=r):r=e[1];const n=r;let l;e[2]!==o?(l=o===void 0?[]:o,e[2]=o,e[3]=l):l=e[3];const c=l;let d;e[4]!==c?(d=i.jsx(Ps,{recentOrders:c}),e[4]=c,e[5]=d):d=e[5];let f;e[6]!==n?(f=i.jsx(qs,{breadcrumbs:n}),e[6]=n,e[7]=f):f=e[7];let u;e[8]!==a||e[9]!==f?(u=i.jsxs(us,{variant:"sidebar",className:"overflow-x-hidden",children:[f,a]}),e[8]=a,e[9]=f,e[10]=u):u=e[10];let p;return e[11]!==d||e[12]!==u?(p=i.jsxs(ps,{variant:"sidebar",children:[d,u]}),e[11]=d,e[12]=u,e[13]=p):p=e[13],p}var W=t=>typeof t=="number"&&!isNaN(t),F=t=>typeof t=="string",D=t=>typeof t=="function",Ks=t=>F(t)||W(t),ce=t=>F(t)||D(t)?t:null,Ws=(t,e)=>t===!1||W(t)&&t>0?t:e,de=t=>y.isValidElement(t)||F(t)||D(t)||W(t);function Gs(t,e,a=300){let{scrollHeight:s,style:o}=t;requestAnimationFrame(()=>{o.minHeight="initial",o.height=s+"px",o.transition=`all ${a}ms`,requestAnimationFrame(()=>{o.height="0",o.padding="0",o.margin="0",setTimeout(e,a)})})}function Xs({enter:t,exit:e,appendPosition:a=!1,collapse:s=!0,collapseDuration:o=300}){return function({children:r,position:n,preventExitTransition:l,done:c,nodeRef:d,isIn:f,playToast:u}){let p=a?`${t}--${n}`:t,b=a?`${e}--${n}`:e,T=y.useRef(0);return y.useLayoutEffect(()=>{let _=d.current,v=p.split(" "),x=m=>{m.target===d.current&&(u(),_.removeEventListener("animationend",x),_.removeEventListener("animationcancel",x),T.current===0&&m.type!=="animationcancel"&&_.classList.remove(...v))};_.classList.add(...v),_.addEventListener("animationend",x),_.addEventListener("animationcancel",x)},[]),y.useEffect(()=>{let _=d.current,v=()=>{_.removeEventListener("animationend",v),s?Gs(_,c,o):c()};f||(l?v():(T.current=1,_.className+=` ${b}`,_.addEventListener("animationend",v)))},[f]),A.createElement(A.Fragment,null,r)}}function Le(t,e){return{content:Qe(t.content,t.props),containerId:t.props.containerId,id:t.props.toastId,theme:t.props.theme,type:t.props.type,data:t.props.data||{},isLoading:t.props.isLoading,icon:t.props.icon,reason:t.removalReason,status:e}}function Qe(t,e,a=!1){return y.isValidElement(t)&&!F(t.type)?y.cloneElement(t,{closeToast:e.closeToast,toastProps:e,data:e.data,isPaused:a}):D(t)?t({closeToast:e.closeToast,toastProps:e,data:e.data,isPaused:a}):t}function Qs({closeToast:t,theme:e,ariaLabel:a="close"}){return A.createElement("button",{className:`Toastify__close-button Toastify__close-button--${e}`,type:"button",onClick:s=>{s.stopPropagation(),t(!0)},"aria-label":a},A.createElement("svg",{"aria-hidden":"true",viewBox:"0 0 14 16"},A.createElement("path",{fillRule:"evenodd",d:"M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"})))}function Ys({delay:t,isRunning:e,closeToast:a,type:s="default",hide:o,className:r,controlledProgress:n,progress:l,rtl:c,isIn:d,theme:f}){let u=o||n&&l===0,p={animationDuration:`${t}ms`,animationPlayState:e?"running":"paused"};n&&(p.transform=`scaleX(${l})`);let b=U("Toastify__progress-bar",n?"Toastify__progress-bar--controlled":"Toastify__progress-bar--animated",`Toastify__progress-bar-theme--${f}`,`Toastify__progress-bar--${s}`,{"Toastify__progress-bar--rtl":c}),T=D(r)?r({rtl:c,type:s,defaultClassName:b}):U(b,r),_={[n&&l>=1?"onTransitionEnd":"onAnimationEnd"]:n&&l<1?null:()=>{d&&a()}};return A.createElement("div",{className:"Toastify__progress-bar--wrp","data-hidden":u},A.createElement("div",{className:`Toastify__progress-bar--bg Toastify__progress-bar-theme--${f} Toastify__progress-bar--${s}`}),A.createElement("div",{role:"progressbar","aria-hidden":u?"true":"false","aria-label":"notification timer","aria-valuenow":n?Math.round(l*100):void 0,"aria-valuemin":0,"aria-valuemax":100,className:T,style:p,..._}))}var Zs=1,Ye=()=>`${Zs++}`;function Js(t,e,a){let s=1,o=0,r=[],n=[],l=e,c=new Map,d=new Set,f=m=>(d.add(m),()=>d.delete(m)),u=()=>{n=Array.from(c.values()),d.forEach(m=>m())},p=({containerId:m,toastId:g,updateId:h})=>{let k=m?m!==t:t!==1,E=c.has(g)&&h==null;return k||E},b=(m,g)=>{c.forEach(h=>{var k;(g==null||g===h.props.toastId)&&((k=h.toggle)==null||k.call(h,m))})},T=m=>{var g,h;m.isActive&&((h=(g=m.props)==null?void 0:g.onClose)==null||h.call(g,m.removalReason),m.isActive=!1,a(Le(m,"removed")))},_=m=>{if(m==null)c.forEach(T);else{let g=c.get(m);g&&T(g)}u()},v=()=>{o-=r.length,r=[]},x=m=>{var g,h;let{toastId:k,updateId:E}=m.props,w=E==null;m.staleId&&c.delete(m.staleId),m.isActive=!0,c.set(k,m),u(),a(Le(m,w?"added":"updated")),w&&((h=(g=m.props).onOpen)==null||h.call(g))};return{id:t,props:l,observe:f,toggle:b,removeToast:_,toasts:c,clearQueue:v,buildToast:(m,g)=>{if(p(g))return;let{toastId:h,updateId:k,data:E,staleId:w,delay:C}=g,I=k==null;I&&o++;let j={...l,style:l.toastStyle,key:s++,...Object.fromEntries(Object.entries(g).filter(([O,P])=>P!=null)),toastId:h,updateId:k,data:E,isIn:!1,className:ce(g.className||l.toastClassName),progressClassName:ce(g.progressClassName||l.progressClassName),autoClose:g.isLoading?!1:Ws(g.autoClose,l.autoClose),closeToast(O){let P=c.get(h);P&&(P.removalReason=O,_(h))},deleteToast(){if(c.get(h)!=null){if(c.delete(h),o--,o<0&&(o=0),r.length>0){x(r.shift());return}u()}}};j.closeButton=l.closeButton,g.closeButton===!1||de(g.closeButton)?j.closeButton=g.closeButton:g.closeButton===!0&&(j.closeButton=de(l.closeButton)?l.closeButton:!0);let $={content:m,props:j,staleId:w};l.limit&&l.limit>0&&o>l.limit&&I?r.push($):W(C)?setTimeout(()=>{x($)},C):x($)},setProps(m){l=m},setToggle:(m,g)=>{let h=c.get(m);h&&(h.toggle=g)},isToastActive:m=>{var g;return(g=c.get(m))==null?void 0:g.isActive},getSnapshot:()=>n}}var M=new Map,q=[],fe=new Set,eo=t=>fe.forEach(e=>e(t)),Ze=()=>M.size>0;function to(){q.forEach(t=>et(t.content,t.options)),q=[]}var ao=(t,{containerId:e})=>{var a;return(a=M.get(e||1))==null?void 0:a.toasts.get(t)};function Je(t,e){var a;if(e)return!!((a=M.get(e))!=null&&a.isToastActive(t));let s=!1;return M.forEach(o=>{o.isToastActive(t)&&(s=!0)}),s}function so(t){if(!Ze()){q=q.filter(e=>t!=null&&e.options.toastId!==t);return}if(t==null||Ks(t))M.forEach(e=>{e.removeToast(t)});else if(t&&("containerId"in t||"id"in t)){let e=M.get(t.containerId);e?e.removeToast(t.id):M.forEach(a=>{a.removeToast(t.id)})}}var oo=(t={})=>{M.forEach(e=>{e.props.limit&&(!t.containerId||e.id===t.containerId)&&e.clearQueue()})};function et(t,e){de(t)&&(Ze()||q.push({content:t,options:e}),M.forEach(a=>{a.buildToast(t,e)}))}function ro(t){var e;(e=M.get(t.containerId||1))==null||e.setToggle(t.id,t.fn)}function tt(t,e){M.forEach(a=>{(e==null||!(e!=null&&e.containerId)||e?.containerId===a.id)&&a.toggle(t,e?.id)})}function no(t){let e=t.containerId||1;return{subscribe(a){let s=Js(e,t,eo);M.set(e,s);let o=s.observe(a);return to(),()=>{o(),M.delete(e)}},setProps(a){var s;(s=M.get(e))==null||s.setProps(a)},getSnapshot(){var a;return(a=M.get(e))==null?void 0:a.getSnapshot()}}}function io(t){return fe.add(t),()=>{fe.delete(t)}}function lo(t){return t&&(F(t.toastId)||W(t.toastId))?t.toastId:Ye()}function G(t,e){return et(t,e),e.toastId}function ae(t,e){return{...e,type:e&&e.type||t,toastId:lo(e)}}function se(t){return(e,a)=>G(e,ae(t,a))}function L(t,e){return G(t,ae("default",e))}L.loading=(t,e)=>G(t,ae("default",{isLoading:!0,autoClose:!1,closeOnClick:!1,closeButton:!1,draggable:!1,...e}));function co(t,{pending:e,error:a,success:s},o){let r;e&&(r=F(e)?L.loading(e,o):L.loading(e.render,{...o,...e}));let n={isLoading:null,autoClose:null,closeOnClick:null,closeButton:null,draggable:null},l=(d,f,u)=>{if(f==null){L.dismiss(r);return}let p={type:d,...n,...o,data:u},b=F(f)?{render:f}:f;return r?L.update(r,{...p,...b}):L(b.render,{...p,...b}),u},c=D(t)?t():t;return c.then(d=>l("success",s,d)).catch(d=>l("error",a,d)),c}L.promise=co;L.success=se("success");L.info=se("info");L.error=se("error");L.warning=se("warning");L.warn=L.warning;L.dark=(t,e)=>G(t,ae("default",{theme:"dark",...e}));function fo(t){so(t)}L.dismiss=fo;L.clearWaitingQueue=oo;L.isActive=Je;L.update=(t,e={})=>{let a=ao(t,e);if(a){let{props:s,content:o}=a,r={delay:100,...s,...e,toastId:e.toastId||t,updateId:Ye()};r.toastId!==t&&(r.staleId=t);let n=r.render||o;delete r.render,G(n,r)}};L.done=t=>{L.update(t,{progress:1})};L.onChange=io;L.play=t=>tt(!0,t);L.pause=t=>tt(!1,t);function uo(t){var e;let{subscribe:a,getSnapshot:s,setProps:o}=y.useRef(no(t)).current;o(t);let r=(e=y.useSyncExternalStore(a,s,s))==null?void 0:e.slice();function n(l){if(!r)return[];let c=new Map;return t.newestOnTop&&r.reverse(),r.forEach(d=>{let{position:f}=d.props;c.has(f)||c.set(f,[]),c.get(f).push(d)}),Array.from(c,d=>l(d[0],d[1]))}return{getToastToRender:n,isToastActive:Je,count:r?.length}}function po(t){let[e,a]=y.useState(!1),[s,o]=y.useState(!1),r=y.useRef(null),n=y.useRef({start:0,delta:0,removalDistance:0,canCloseOnClick:!0,canDrag:!1,didMove:!1}).current,{autoClose:l,pauseOnHover:c,closeToast:d,onClick:f,closeOnClick:u}=t;ro({id:t.toastId,containerId:t.containerId,fn:a}),y.useEffect(()=>{if(t.pauseOnFocusLoss)return p(),()=>{b()}},[t.pauseOnFocusLoss]);function p(){document.hasFocus()||x(),window.addEventListener("focus",v),window.addEventListener("blur",x)}function b(){window.removeEventListener("focus",v),window.removeEventListener("blur",x)}function T(w){if(t.draggable===!0||t.draggable===w.pointerType){m();let C=r.current;n.canCloseOnClick=!0,n.canDrag=!0,C.style.transition="none",t.draggableDirection==="x"?(n.start=w.clientX,n.removalDistance=C.offsetWidth*(t.draggablePercent/100)):(n.start=w.clientY,n.removalDistance=C.offsetHeight*(t.draggablePercent===80?t.draggablePercent*1.5:t.draggablePercent)/100)}}function _(w){let{top:C,bottom:I,left:j,right:$}=r.current.getBoundingClientRect();w.pointerType==="mouse"&&t.pauseOnHover&&w.clientX>=j&&w.clientX<=$&&w.clientY>=C&&w.clientY<=I?x():v()}function v(){a(!0)}function x(){a(!1)}function m(){n.didMove=!1,document.addEventListener("pointermove",h),document.addEventListener("pointerup",k)}function g(){document.removeEventListener("pointermove",h),document.removeEventListener("pointerup",k)}function h(w){let C=r.current;if(n.canDrag&&C){n.didMove=!0,e&&x(),t.draggableDirection==="x"?n.delta=w.clientX-n.start:n.delta=w.clientY-n.start,n.start!==w.clientX&&(n.canCloseOnClick=!1);let I=t.draggableDirection==="x"?`${n.delta}px, var(--y)`:`0, calc(${n.delta}px + var(--y))`;C.style.transform=`translate3d(${I},0)`,C.style.opacity=`${1-Math.abs(n.delta/n.removalDistance)}`}}function k(){g();let w=r.current;if(n.canDrag&&n.didMove&&w){if(n.canDrag=!1,Math.abs(n.delta)>n.removalDistance){o(!0),t.closeToast(!0),t.collapseAll();return}w.style.transition="transform 0.2s, opacity 0.2s",w.style.removeProperty("transform"),w.style.removeProperty("opacity")}}let E={onPointerDown:T,onPointerUp:_};return l&&c&&(E.onMouseEnter=x,t.stacked||(E.onMouseLeave=v)),u&&(E.onClick=w=>{f&&f(w),n.canCloseOnClick&&d(!0)}),{playToast:v,pauseToast:x,isRunning:e,preventExitTransition:s,toastRef:r,eventHandlers:E}}var at=typeof window<"u"?y.useLayoutEffect:y.useEffect,oe=({theme:t,type:e,isLoading:a,...s})=>A.createElement("svg",{viewBox:"0 0 24 24",width:"100%",height:"100%",fill:t==="colored"?"currentColor":`var(--toastify-icon-color-${e})`,...s});function mo(t){return A.createElement(oe,{...t},A.createElement("path",{d:"M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z"}))}function ho(t){return A.createElement(oe,{...t},A.createElement("path",{d:"M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z"}))}function go(t){return A.createElement(oe,{...t},A.createElement("path",{d:"M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"}))}function bo(t){return A.createElement(oe,{...t},A.createElement("path",{d:"M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"}))}function yo(){return A.createElement("div",{className:"Toastify__spinner"})}var ue={info:ho,warning:mo,success:go,error:bo,spinner:yo},vo=t=>t in ue;function xo({theme:t,type:e,isLoading:a,icon:s}){let o=null,r={theme:t,type:e};return s===!1||(D(s)?o=s({...r,isLoading:a}):y.isValidElement(s)?o=y.cloneElement(s,r):a?o=ue.spinner():vo(e)&&(o=ue[e](r))),o}var _o=t=>{let{isRunning:e,preventExitTransition:a,toastRef:s,eventHandlers:o,playToast:r}=po(t),{closeButton:n,children:l,autoClose:c,onClick:d,type:f,hideProgressBar:u,closeToast:p,transition:b,position:T,className:_,style:v,progressClassName:x,updateId:m,role:g,progress:h,rtl:k,toastId:E,deleteToast:w,isIn:C,isLoading:I,closeOnClick:j,theme:$,ariaLabel:O}=t,P=U("Toastify__toast",`Toastify__toast-theme--${$}`,`Toastify__toast--${f}`,{"Toastify__toast--rtl":k},{"Toastify__toast--close-on-click":j}),B=D(_)?_({rtl:k,position:T,type:f,defaultClassName:P}):U(P,_),z=xo(t),_e=!!h||!c,re={closeToast:p,type:f,theme:$},X=null;return n===!1||(D(n)?X=n(re):y.isValidElement(n)?X=y.cloneElement(n,re):X=Qs(re)),A.createElement(b,{isIn:C,done:w,position:T,preventExitTransition:a,nodeRef:s,playToast:r},A.createElement("div",{id:E,tabIndex:0,onClick:d,"data-in":C,className:B,...o,style:v,ref:s,...C&&{role:g,"aria-label":O}},z!=null&&A.createElement("div",{className:U("Toastify__toast-icon",{"Toastify--animate-icon Toastify__zoom-enter":!I})},z),Qe(l,t,!e),X,!t.customProgressBar&&A.createElement(Ys,{...m&&!_e?{key:`p-${m}`}:{},rtl:k,theme:$,delay:c,isRunning:e,isIn:C,closeToast:p,hide:u,type:f,className:x,controlledProgress:_e,progress:h||0})))},To=(t,e=!1)=>({enter:`Toastify--animate Toastify__${t}-enter`,exit:`Toastify--animate Toastify__${t}-exit`,appendPosition:e}),wo=Xs(To("bounce",!0)),ko={position:"top-right",transition:wo,autoClose:5e3,closeButton:!0,pauseOnHover:!0,pauseOnFocusLoss:!0,draggable:"touch",draggablePercent:80,draggableDirection:"x",role:"alert",theme:"light","aria-label":"Notifications Alt+T",hotKeys:t=>t.altKey&&t.code==="KeyT"};function No(t){let e={...ko,...t},a=t.stacked,[s,o]=y.useState(!0),r=y.useRef(null),{getToastToRender:n,isToastActive:l,count:c}=uo(e),{className:d,style:f,rtl:u,containerId:p,hotKeys:b}=e;function T(v){let x=U("Toastify__toast-container",`Toastify__toast-container--${v}`,{"Toastify__toast-container--rtl":u});return D(d)?d({position:v,rtl:u,defaultClassName:x}):U(x,ce(d))}function _(){a&&(o(!0),L.play())}return at(()=>{var v;if(a){let x=r.current.querySelectorAll('[data-in="true"]'),m=12,g=(v=e.position)==null?void 0:v.includes("top"),h=0,k=0;Array.from(x).reverse().forEach((E,w)=>{let C=E;C.classList.add("Toastify__toast--stacked"),w>0&&(C.dataset.collapsed=`${s}`),C.dataset.pos||(C.dataset.pos=g?"top":"bot");let I=h*(s?.2:1)+(s?0:m*w),j=Math.max(.5,1-(s?k:0));C.style.setProperty("--y",`${g?I:I*-1}px`),C.style.setProperty("--g",`${m}`),C.style.setProperty("--s",`${j}`),h+=C.offsetHeight,k+=.025})}},[s,c,a]),y.useEffect(()=>{function v(x){var m;let g=r.current;b(x)&&((m=g?.querySelector('[tabIndex="0"]'))==null||m.focus(),o(!1),L.pause()),x.key==="Escape"&&(document.activeElement===g||g!=null&&g.contains(document.activeElement))&&(o(!0),L.play())}return document.addEventListener("keydown",v),()=>{document.removeEventListener("keydown",v)}},[b]),A.createElement("section",{ref:r,className:"Toastify",id:p,onMouseEnter:()=>{a&&(o(!1),L.pause())},onMouseLeave:_,"aria-live":"polite","aria-atomic":"false","aria-relevant":"additions text","aria-label":e["aria-label"]},n((v,x)=>{let m=x.length?{...f}:{...f,pointerEvents:"none"};return A.createElement("div",{tabIndex:-1,className:T(v),"data-stacked":a,style:m,key:`c-${v}`},x.map(({content:g,props:h})=>A.createElement(_o,{...h,stacked:a,collapseAll:_,isIn:l(h.toastId,h.containerId),key:`t-${h.key}`},g)))}))}var Co=`:root {
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
`,Ae=new Map,So=(t,e)=>{at(()=>{if(typeof document>"u")return;let a=document,s=Ae.get(a);if(s){e&&s.setAttribute("nonce",e);return}let o=a.createElement("style");o.textContent=t,e&&o.setAttribute("nonce",e),a.head.appendChild(o),Ae.set(a,o)},[e])};function jo(t){return So(Co,t.nonce),A.createElement(No,{...t})}function Eo(){const t=N.c(8),{props:e}=V();let a;t[0]!==e.flash?(a=e.flash||{},t[0]=e.flash,t[1]=a):a=t[1];const s=a;let o;t[2]!==s.error||t[3]!==s.success?(o=()=>{s.success&&L.success(s.success,{toastId:`success-${s.success}`}),s.error&&L.error(s.error,{toastId:`error-${s.error}`})},t[2]=s.error,t[3]=s.success,t[4]=o):o=t[4];let r;t[5]!==s?(r=[s],t[5]=s,t[6]=r):r=t[6],y.useEffect(o,r);let n;return t[7]===Symbol.for("react.memo_cache_sentinel")?(n=i.jsx(jo,{position:"top-right",autoClose:5500,hideProgressBar:!1,newestOnTop:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!0,theme:"light"}),t[7]=n):n=t[7],n}const qo=({children:t,breadcrumbs:e,recentOrders:a,...s})=>{const[o,r]=y.useState([]);return y.useEffect(()=>{const n=async()=>{try{const c=await nt.get("/cpanel/dashboard/recent-orders");r(c.data.recentOrders||[])}catch(c){console.error("Failed fetch recent orders",c)}};n();const l=setInterval(n,1e4);return()=>clearInterval(l)},[]),i.jsxs(i.Fragment,{children:[i.jsx(Eo,{}),i.jsx(Vs,{breadcrumbs:e,recentOrders:o||a,...s,children:t})]})};export{qo as A,La as B,ta as C,fa as K,ga as M,be as P,Ta as S,Se as U,Jt as a,xa as b,Gt as r};
