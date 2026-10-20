
document.addEventListener('DOMContentLoaded',()=>{
 const pre=document.querySelector('.preloader');
 window.addEventListener('load',()=>setTimeout(()=>pre&&pre.classList.add('hide'),350));
 setTimeout(()=>pre&&pre.classList.add('hide'),1800);
 const top=document.querySelector('.back-top');
 window.addEventListener('scroll',()=>{if(top)top.classList.toggle('show',window.scrollY>450)});
 top&&top.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
 document.querySelectorAll('[data-current-year]').forEach(el=>el.textContent=new Date().getFullYear());
 const form=document.querySelector('#projectEnquiryForm');
 if(form){form.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const subject=encodeURIComponent('Project enquiry — KG Plus Architecture Studio');const body=encodeURIComponent(`Name: ${d.get('name')}\\nEmail: ${d.get('email')}\\nPhone: ${d.get('phone')||'Not provided'}\\nService: ${d.get('service')||'Not specified'}\\nMessage: ${d.get('message')}`);window.location.href=`mailto:info@kg-intl.com?subject=${subject}&body=${body}`;const status=form.querySelector('.form-status');if(status)status.textContent='Your email app should open with your enquiry prepared. Please send it to complete your enquiry.';});}
 const popup=document.querySelector('#enquiryModal');
 if(popup&&!sessionStorage.getItem('kgEnquirySeen')){setTimeout(()=>{if(!sessionStorage.getItem('kgEnquiryDismissed')){const modal=bootstrap.Modal.getOrCreateInstance(popup);modal.show();sessionStorage.setItem('kgEnquirySeen','1')}},9000)}
 if(popup)popup.addEventListener('hidden.bs.modal',()=>sessionStorage.setItem('kgEnquiryDismissed','1'));
});
