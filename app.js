(async()=>{
await window.OIEFPublicReady;
'use strict';
const notice = document.querySelector('#notice');
function announce(text) { document.querySelector('#notice-text').textContent=text; notice.hidden=false; }
notice.querySelector('button').addEventListener('click',()=>{notice.hidden=true;});
document.querySelector('.language').addEventListener('click',()=>announce('ইংরেজি সংস্করণ বর্তমানে উপলব্ধ নয়। বাংলা সংস্করণে আমাদের কাজ সম্পর্কে জানুন।'));
// The profile link opens user login before the synthetic dashboard.
const menu=document.querySelector('.menu-toggle'),mobile=document.querySelector('#mobile-menu'),backdrop=document.querySelector('.menu-backdrop'),drawerClose=mobile.querySelector('.drawer-close');
const desktopQuery=matchMedia('(min-width:80rem)');
const utilityHome=document.querySelector('.desktop-utilities'),drawerUtilities=document.querySelector('.drawer-utilities');
const profileControl=utilityHome.querySelector('.profile-button'),languageControl=document.querySelector('.language');
const languageHome=document.querySelector('.footer-utilities');
function placeUtilities(){
 (desktopQuery.matches?utilityHome:drawerUtilities).append(profileControl);
 (desktopQuery.matches?languageHome:drawerUtilities).append(languageControl);
}
placeUtilities();
let menuScrollY=0,menuOpen=false,drawerAnimation=null,backdropAnimation=null,menuTransition=0;
function setMobileMenu(open,returnFocus=false,instant=false){
 if(open===menuOpen&&(open||mobile.hidden))return;
 const visible=!mobile.hidden,token=++menuTransition;
 const fromTransform=visible?getComputedStyle(mobile).transform:'translateX(-100%)';
 const fromOpacity=visible?getComputedStyle(backdrop).opacity:'0';
 drawerAnimation?.cancel();backdropAnimation?.cancel();menuOpen=open;
 menu.setAttribute('aria-expanded',String(open));
 menu.setAttribute('aria-label',open?'মেনু বন্ধ করুন':'মেনু খুলুন');
 if(open){
  if(!visible){
   menuScrollY=window.scrollY;
   document.body.style.top=-menuScrollY+'px';
   document.body.classList.add('menu-open');document.documentElement.classList.add('menu-open');
  }
  mobile.hidden=false;mobile.inert=false;mobile.removeAttribute('aria-hidden');backdrop.hidden=false;
  document.querySelectorAll('.site-header,main,.site-footer').forEach(element=>element.inert=true);
  drawerClose.focus({preventScroll:true});
 }else{
  mobile.inert=true;mobile.setAttribute('aria-hidden','true');
 }
 function finish(){
  if(token!==menuTransition)return;
  if(!open){
   mobile.hidden=true;backdrop.hidden=true;
   document.body.classList.remove('menu-open');document.documentElement.classList.remove('menu-open');document.body.style.top='';
   window.scrollTo({top:menuScrollY,behavior:'instant'});
   document.querySelectorAll('.site-header,main,.site-footer').forEach(element=>element.inert=false);
   if(returnFocus&&!desktopQuery.matches)menu.focus({preventScroll:true});
  }
  drawerAnimation?.cancel();backdropAnimation?.cancel();drawerAnimation=null;backdropAnimation=null;
 }
 if(instant||matchMedia('(prefers-reduced-motion: reduce)').matches){finish();return;}
 const options={duration:open?360:260,easing:'cubic-bezier(0.16, 1, 0.3, 1)',fill:'forwards'};
 drawerAnimation=mobile.animate([{transform:fromTransform},{transform:open?'translateX(0)':'translateX(-100%)'}],options);
 backdropAnimation=backdrop.animate([{opacity:fromOpacity},{opacity:open?'1':'0'}],options);
 Promise.all([drawerAnimation.finished,backdropAnimation.finished]).then(finish,()=>{});
}
menu.addEventListener('click',()=>setMobileMenu(!menuOpen));
drawerClose.addEventListener('click',()=>setMobileMenu(false,true));
backdrop.addEventListener('click',()=>setMobileMenu(false,true));
mobile.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>setMobileMenu(false)));
desktopQuery.addEventListener('change',()=>{setMobileMenu(false,false,true);placeUtilities();});
const dropdowns=[...document.querySelectorAll('.drop-toggle')];
function closeDropdowns(){dropdowns.forEach(button=>{button.setAttribute('aria-expanded','false');document.getElementById(button.getAttribute('aria-controls')).hidden=true;});}
function openDropdown(button){closeDropdowns();button.setAttribute('aria-expanded','true');document.getElementById(button.getAttribute('aria-controls')).hidden=false;}
dropdowns.forEach(button=>{
 const group=button.closest('.nav-group');let closeTimer;
 button.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')==='true';closeDropdowns();if(!open)openDropdown(button);});
 group.addEventListener('pointerenter',event=>{if(event.pointerType==='touch'||!desktopQuery.matches)return;clearTimeout(closeTimer);openDropdown(button);});
 group.addEventListener('pointerleave',()=>{clearTimeout(closeTimer);closeTimer=setTimeout(()=>{if(!group.contains(document.activeElement)){button.setAttribute('aria-expanded','false');document.getElementById(button.getAttribute('aria-controls')).hidden=true;}},120);});
 group.addEventListener('focusout',event=>{if(!group.contains(event.relatedTarget)){button.setAttribute('aria-expanded','false');document.getElementById(button.getAttribute('aria-controls')).hidden=true;}});
});
document.addEventListener('click',event=>{if(!event.target.closest('.nav-group'))closeDropdowns();});
document.addEventListener('keydown',event=>{
 if(event.key==='Escape'){
  const active=dropdowns.find(button=>button.getAttribute('aria-expanded')==='true');closeDropdowns();if(active)active.focus();
  if(!mobile.hidden)setMobileMenu(false,true);
  notice.hidden=true;
 }
 if(event.key==='Tab'&&!mobile.hidden){
  const targets=[...mobile.querySelectorAll('a,button,summary'),...(!notice.hidden?[notice.querySelector('button')]:[])].filter(element=>element.getClientRects().length&&!element.closest('[hidden],[inert]'));
  if(!targets.length){event.preventDefault();return;}
  const first=targets[0],last=targets.at(-1);
  if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
  else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
 }
});
const descriptions={general:'ফাউন্ডেশনের সামগ্রিক কাজের জন্য সহায়তা।',education:'শিক্ষা কেন্দ্র ও সংশ্লিষ্ট শিক্ষা কার্যক্রমের জন্য সহায়তা।','student-support':'বই ও শিক্ষার্থীদের সহায়তার জন্য তহবিল।','teacher-training':'শিক্ষকদের প্রশিক্ষণের কাজে সহায়তা।',relief:'দুর্যোগ ও কল্যাণমূলক কাজে সহায়তা।',health:'স্বাস্থ্যসেবা ও রক্তদান-সংশ্লিষ্ট কাজে সহায়তা।'};
document.querySelectorAll('[name="fund"]').forEach(radio=>radio.addEventListener('change',()=>{document.querySelector('#selected-fund').textContent=radio.nextElementSibling.textContent;document.querySelector('#selected-description').textContent=descriptions[radio.value];document.querySelector('#giving-review').hidden=true;document.querySelector('#review-giving').setAttribute('aria-expanded','false');}));
document.querySelector('#review-giving')?.addEventListener('click',e=>{const panel=document.querySelector('#giving-review');panel.hidden=false;e.currentTarget.setAttribute('aria-expanded','true');document.querySelector('#review-fund').textContent='নির্বাচিত তহবিল: '+document.querySelector('#selected-fund').textContent;panel.focus({preventScroll:true});panel.scrollIntoView({block:'nearest',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});});
// Browser-local discovery controls; no personal data or network submissions.
document.querySelectorAll('[data-search-target]').forEach(input=>{
 const target=document.getElementById(input.dataset.searchTarget),empty=document.querySelector('[data-search-empty="'+input.dataset.searchTarget+'"]');
 input.addEventListener('input',()=>{const term=input.value.trim().normalize('NFC').toLocaleLowerCase('bn');let shown=0;target.querySelectorAll('[data-search-item]').forEach(item=>{item.hidden=!item.textContent.normalize('NFC').toLocaleLowerCase('bn').includes(term);if(!item.hidden)shown++;});if(empty)empty.hidden=shown!==0;});
});
document.querySelectorAll('[data-filter-for]').forEach(group=>{const target=document.getElementById(group.dataset.filterFor);group.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{group.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));target.querySelectorAll('[data-category]').forEach(item=>item.hidden=button.dataset.filter!=='all'&&item.dataset.category!==button.dataset.filter);}));});
if(document.querySelector('.gallery-open')){
 const viewer=document.createElement('dialog');viewer.className='gallery-viewer';viewer.setAttribute('aria-label','ছবি বড় করে দেখুন');viewer.innerHTML='<button type="button">বন্ধ করুন</button><img src="/OpenIslamicEducationFoundation/assets/learning.webp" alt=""><p></p>';document.body.append(viewer);let opener;
 viewer.querySelector('button').addEventListener('click',()=>viewer.close());viewer.addEventListener('close',()=>opener?.focus());viewer.addEventListener('click',e=>{if(e.target===viewer){const r=viewer.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)viewer.close();}});
 document.querySelectorAll('.gallery-open').forEach(button=>button.addEventListener('click',()=>{opener=button;const img=viewer.querySelector('img');img.src=button.dataset.image;img.alt=button.dataset.caption;viewer.querySelector('p').textContent=button.dataset.caption;viewer.showModal();}));
}
const incomingFund=document.querySelector('input[name="fund"]'+(location.hash.startsWith('#fund-')?'[value="'+CSS.escape(location.hash.slice(6))+'"]':''));
if(incomingFund){incomingFund.checked=true;document.querySelector('#selected-fund').textContent=incomingFund.nextElementSibling.textContent;document.querySelector('#selected-description').textContent=descriptions[incomingFund.value];}

// Dots select the story; horizontal movement preserves its spatial relationship.
const heroSlides=[...document.querySelectorAll('.hero-slide')];
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
if(heroSlides.length){
 let currentSlide=0,finishTransition=null;
 const dots=[...document.querySelectorAll('[data-hero-slide]')];
 heroSlides.forEach((slide,index)=>{slide.inert=index!==0;slide.setAttribute('aria-hidden',String(index!==0));});
 function showSlide(index,automatic=false){
  finishTransition?.();
  const nextIndex=(index+heroSlides.length)%heroSlides.length;
  if(nextIndex===currentSlide)return;
  const outgoing=heroSlides[currentSlide],incoming=heroSlides[nextIndex],direction=nextIndex>currentSlide?1:-1;
  currentSlide=nextIndex;
  outgoing.inert=true;outgoing.setAttribute('aria-hidden','true');
  incoming.hidden=false;incoming.inert=false;incoming.setAttribute('aria-hidden','false');
  dots.forEach((dot,i)=>dot.setAttribute('aria-pressed',String(i===currentSlide)));
  document.querySelector('#hero-status').setAttribute('aria-live',automatic?'off':'polite');
  document.querySelector('#hero-status').textContent=(currentSlide+1).toLocaleString('bn-BD')+' / '+heroSlides.length.toLocaleString('bn-BD');
  if(reducedMotion.matches){outgoing.hidden=true;return;}
  outgoing.classList.add('hero-outgoing');
  const options={duration:520,easing:'cubic-bezier(0.16, 1, 0.3, 1)'};
  const animations=[outgoing.animate([{transform:'translateX(0)'},{transform:'translateX('+(-direction*100)+'%)'}],options),incoming.animate([{transform:'translateX('+(direction*100)+'%)'},{transform:'translateX(0)'}],options)];
  let complete=false;
  const finish=()=>{if(complete)return;complete=true;outgoing.hidden=true;outgoing.classList.remove('hero-outgoing');animations.forEach(animation=>animation.cancel());if(finishTransition===finish)finishTransition=null;};
  finishTransition=finish;
  Promise.all(animations.map(animation=>animation.finished)).then(finish,finish);
 }
 dots.forEach(dot=>dot.addEventListener('click',()=>showSlide(Number(dot.dataset.heroSlide))));
 let heroTimer=null,heroVisible=true,heroHovered=false;
 const hero=document.querySelector('.home-hero');
 function scheduleHero(){
  clearTimeout(heroTimer);
  if(reducedMotion.matches||document.hidden||!heroVisible||heroHovered||hero.contains(document.activeElement)||menu.getAttribute('aria-expanded')==='true')return;
  heroTimer=setTimeout(()=>{showSlide(currentSlide+1,true);scheduleHero();},7000);
 }
 dots.forEach(dot=>dot.addEventListener('click',scheduleHero));
 hero.addEventListener('mouseenter',()=>{heroHovered=true;scheduleHero();});
 hero.addEventListener('mouseleave',()=>{heroHovered=false;scheduleHero();});
 hero.addEventListener('focusin',scheduleHero);hero.addEventListener('focusout',()=>setTimeout(scheduleHero,0));
 document.addEventListener('visibilitychange',scheduleHero);
 new MutationObserver(scheduleHero).observe(menu,{attributes:true,attributeFilter:['aria-expanded']});
 new IntersectionObserver(entries=>{heroVisible=entries[0].isIntersecting;scheduleHero();},{threshold:0.3}).observe(hero);
 reducedMotion.addEventListener('change',()=>{finishTransition?.();scheduleHero();});
 scheduleHero();
}
const workTrack=document.querySelector('#work-track');
if(workTrack){
 const cards=[...workTrack.children],previous=document.querySelector('#work-prev'),next=document.querySelector('#work-next'),region=workTrack.closest('.work-slider'),status=document.querySelector('#work-status');
 let paused=reducedMotion.matches,hovered=false,inView=false,autoTimer=null,autoDirection=1;
 function updateWorkControls(){
  const bounds=workTrack.getBoundingClientRect();
  const visible=cards.map((card,i)=>({i,rect:card.getBoundingClientRect()})).filter(({rect})=>rect.left>=bounds.left-5&&rect.right<=bounds.right+5);
  const first=visible[0]?.i??Math.round(workTrack.scrollLeft/(cards[0].getBoundingClientRect().width+24));
  const last=visible.at(-1)?.i??first;
  const bn=n=>n.toLocaleString('bn-BD');
  status.textContent=bn(first+1)+(last>first?'–'+bn(last+1):'')+' / '+bn(cards.length);
  previous.disabled=workTrack.scrollLeft<=5;
  next.disabled=workTrack.scrollLeft>=workTrack.scrollWidth-workTrack.clientWidth-5;
 }
 function canAdvance(){return !paused&&!hovered&&inView&&!document.hidden&&!region.contains(document.activeElement)&&mobile.hidden;}
 function scheduleWork(){
  clearTimeout(autoTimer);autoTimer=null;
  status.setAttribute('aria-live',canAdvance()?'off':'polite');
  if(!canAdvance())return;
  autoTimer=setTimeout(()=>{
   if(!canAdvance())return;
   if(next.disabled)autoDirection=-1;else if(previous.disabled)autoDirection=1;
   moveWork(autoDirection);scheduleWork();
  },3000);
 }
 function moveWork(direction){workTrack.scrollBy({left:direction*(cards[0].getBoundingClientRect().width+24),behavior:reducedMotion.matches?'instant':'smooth'});}
 previous.addEventListener('click',()=>{moveWork(-1);scheduleWork();});next.addEventListener('click',()=>{moveWork(1);scheduleWork();});
 workTrack.addEventListener('keydown',event=>{
  if(event.target!==workTrack)return;
  if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();moveWork(event.key==='ArrowRight'?1:-1);}
  if(event.key==='Home'||event.key==='End'){event.preventDefault();workTrack.scrollTo({left:event.key==='Home'?0:workTrack.scrollWidth,behavior:'instant'});}
  scheduleWork();
 });
 workTrack.addEventListener('scroll',updateWorkControls,{passive:true});
 region.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse'){hovered=true;scheduleWork();}});
 region.addEventListener('pointerleave',()=>{hovered=false;scheduleWork();});
 region.addEventListener('focusin',scheduleWork);region.addEventListener('focusout',()=>setTimeout(scheduleWork,0));
 region.addEventListener('touchstart',()=>{clearTimeout(autoTimer);},{passive:true});region.addEventListener('touchend',scheduleWork,{passive:true});
 document.addEventListener('visibilitychange',scheduleWork);
 new MutationObserver(scheduleWork).observe(mobile,{attributes:true,attributeFilter:['hidden']});
 new IntersectionObserver(entries=>{inView=entries[0].intersectionRatio>=0.3;scheduleWork();},{threshold:0.3}).observe(region);
 new ResizeObserver(updateWorkControls).observe(workTrack);
 reducedMotion.addEventListener('change',event=>{paused=event.matches;scheduleWork();});
 updateWorkControls();scheduleWork();
}
const homeDonation=document.querySelector('#home-donation');
if(homeDonation){
 const contact=document.querySelector('#home-contact'),fund=document.querySelector('#home-fund'),amount=document.querySelector('#home-amount'),button=document.querySelector('#home-giving-review'),result=document.querySelector('#home-giving-result');
 function resetReview(){result.hidden=true;button.setAttribute('aria-expanded','false');}
 fund.addEventListener('change',resetReview);amount.addEventListener('input',resetReview);contact.addEventListener('input',()=>{contact.setCustomValidity('');resetReview();});
 function reviewHomeGiving(){
  const value=contact.value.trim();
  const normalized=value.replace(/[০-৯]/g,digit=>String('০১২৩৪৫৬৭৮৯'.indexOf(digit))).replace(/[\s()-]/g,'');
  const validContact=value.includes('@')?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value):/^\+?\d{7,15}$/.test(normalized);
  contact.setCustomValidity(validContact?'':'সঠিক মোবাইল নম্বর বা ইমেইল ঠিকানা লিখুন।');
  if(!homeDonation.reportValidity())return;
  document.querySelector('#home-giving-summary').textContent=fund.options[fund.selectedIndex].text+' · '+Number(amount.value).toLocaleString('bn-BD',{maximumFractionDigits:2})+' টাকা';
  document.querySelector('#home-fund-link').href='/OpenIslamicEducationFoundation/donate/#fund-'+fund.value;
  result.hidden=false;button.setAttribute('aria-expanded','true');result.focus({preventScroll:true});
  result.scrollIntoView({block:'nearest',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
 }
 homeDonation.addEventListener('submit',event=>{event.preventDefault();reviewHomeGiving();});
 button.addEventListener('click',reviewHomeGiving);
}

// One answer per FAQ group. Grid transitions animate both opening and closing.
document.querySelectorAll('.faq').forEach(group=>{
 const items=[...group.querySelectorAll('details')];
 const closeTimers=new WeakMap();
 function setAnswer(item,expanded){
  clearTimeout(closeTimers.get(item));
  const panel=item.querySelector('.faq-panel'),summary=item.querySelector('summary');
  item.dataset.expanded=String(expanded);summary.setAttribute('aria-expanded',String(expanded));panel.inert=!expanded;
  if(expanded){item.open=true;panel.getBoundingClientRect();panel.classList.add('is-open');}
  else{
   panel.classList.remove('is-open');
   if(reducedMotion.matches)item.open=false;
   else closeTimers.set(item,setTimeout(()=>{if(item.dataset.expanded==='false')item.open=false;},300));
  }
 }
 items.forEach(item=>{
  const summary=item.querySelector('summary'),panel=document.createElement('div'),inner=document.createElement('div');
  panel.className='faq-panel';inner.className='faq-panel-inner';
  [...item.childNodes].filter(node=>node!==summary).forEach(node=>inner.append(node));panel.append(inner);item.append(panel);
  setAnswer(item,item.open);
  summary.addEventListener('click',event=>{event.preventDefault();const opening=item.dataset.expanded!=='true';if(opening)items.filter(other=>other!==item).forEach(other=>setAnswer(other,false));setAnswer(item,opening);});
 });
});

})();
