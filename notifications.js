'use strict';
// Shared notification API for dashboard actions and future website integrations.
(()=>{
 const region=document.createElement('div');region.className='notification-stack';region.setAttribute('aria-label','নোটিফিকেশন');document.body.append(region);
 const paths={success:'M5 12l4 4L19 6',error:'M6 6l12 12M6 18 18 6',info:'M12 11v6M12 7h.01'};
 window.OIEFNotify=(message,{tone='info',duration=5000}={})=>{
  const toast=document.createElement('div');toast.className='notification-toast '+(paths[tone]?tone:'info');
  const glyph=document.createElementNS('http://www.w3.org/2000/svg','svg');glyph.setAttribute('viewBox','0 0 24 24');glyph.setAttribute('aria-hidden','true');const path=document.createElementNS(glyph.namespaceURI,'path');path.setAttribute('d',paths[tone]||paths.info);glyph.append(path);
  const text=document.createElement('span');text.setAttribute('role',tone==='error'?'alert':'status');text.textContent=message;
  const close=document.createElement('button');close.type='button';close.setAttribute('aria-label','নোটিফিকেশন বন্ধ করুন');close.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6"/OpenIslamicEducationFoundation/></svg>';
  toast.append(glyph,text,close);region.append(toast);
  let timer,remaining=duration,started;const dismiss=()=>{clearTimeout(timer);toast.remove();},pause=()=>{clearTimeout(timer);remaining=Math.max(0,remaining-(Date.now()-started));},resume=()=>{clearTimeout(timer);started=Date.now();timer=setTimeout(dismiss,remaining);};
  close.addEventListener('click',dismiss);toast.addEventListener('mouseenter',pause);toast.addEventListener('mouseleave',()=>{if(!toast.contains(document.activeElement))resume();});toast.addEventListener('focusin',pause);toast.addEventListener('focusout',()=>{if(!toast.matches(':hover'))resume();});resume();
  while(region.children.length>3)region.firstElementChild.remove();return dismiss;
 };
})();
