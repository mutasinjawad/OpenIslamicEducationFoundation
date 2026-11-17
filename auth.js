'use strict';
const password = document.querySelector('#password');
const toggle = document.querySelector('#password-toggle');
toggle.addEventListener('click', () => {
 const visible = password.type === 'password';
 password.type = visible ? 'text' : 'password';
 toggle.setAttribute('aria-pressed', String(visible));
 toggle.setAttribute('aria-label', visible ? 'পাসওয়ার্ড লুকান' : 'পাসওয়ার্ড দেখুন');
});
document.querySelector('#auth-form').addEventListener('submit', event => {
 event.preventDefault();
 const destination = event.currentTarget.dataset.destination;
 if (destination === '/OpenIslamicEducationFoundation/profile/') sessionStorage.removeItem('oief-profile-logged-out');
 window.location.assign(destination);
});
