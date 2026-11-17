'use strict';
// Review state only. Committee names are explicitly authorized source content.
// Never enter real contact, financial, academic or credential data.
window.OIEFReview=(async()=>{
 const key='oief-client-meeting-v1';
 const seed=await fetch('/OpenIslamicEducationFoundation/review-data.json?v=20261117-committees-2',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('Review data unavailable');return r.json();});
 let data;try{data=JSON.parse(sessionStorage.getItem(key))||structuredClone(seed);}catch{data=structuredClone(seed);}
 // Add the explicitly requested second trainee course to existing review sessions once.
 if(!data.traineeSecondCourseV1){const user=data.users.find(u=>u.id==='U-102');if(user?.grants.includes('trainee'))user.enrollments=[...new Set([...(user.enrollments||[user.course]),'teaching-methods'])];data.traineeSecondCourseV1=true;}
 if(!Array.isArray(seed.committees))throw Error('Committee seed data is unavailable');
 if(!Array.isArray(data.committees))data.committees=structuredClone(seed.committees);
 if(!data.cms.announcement)data.cms.announcement=structuredClone(seed.cms.announcement);
 const save=()=>{try{sessionStorage.setItem(key,JSON.stringify(data));}catch{};};
 save();
 const reset=()=>{data=structuredClone(seed);save();return data;};
 return {get data(){return data;},save,reset};
})();
