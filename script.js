(() => {
 const menu = document.querySelector('.menu');
 const nav = document.querySelector('#nav');
 if (menu && nav) {
   menu.addEventListener('click', () => {
     const open = menu.getAttribute('aria-expanded') === 'true';
     menu.setAttribute('aria-expanded', String(!open));
     menu.setAttribute('aria-label', open ? 'Abrir menu' : 'Fechar menu');
     nav.classList.toggle('open', !open);
   });
   nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
     menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('open');
   }));
 }
 document.querySelectorAll('[data-interest]').forEach(link => link.addEventListener('click', () => {
   const select = document.querySelector('#interesse');
   if (select) select.value = link.dataset.interest;
 }));
 const year = document.querySelector('#year');
 if (year) year.textContent = new Date().getFullYear();
 const form = document.querySelector('#contact-form');
 const status = document.querySelector('#form-status');
 if (form) form.addEventListener('submit', event => {
   event.preventDefault();
   const data = new FormData(form);
   const body = encodeURIComponent('Olá, Dive Easy!\n\nNome: ' + data.get('nome') + '\nE-mail: ' + data.get('email') + '\nInteresse: ' + data.get('interesse') + '\nMensagem: ' + (data.get('mensagem') || 'Gostaria de saber mais sobre os mergulhos disponíveis.'));
   const subject = encodeURIComponent('Consulta de mergulho — Dive Easy');
   if (status) status.textContent = 'Tentando abrir seu aplicativo de e-mail…';
   window.location.href = 'mailto:?subject=' + subject + '&body=' + body;
 });

 const header = document.querySelector('.header');
 if (header) {
   let ticking = false;
   const updateHeader = () => {
     header.classList.toggle('is-scrolled', window.scrollY > 24);
     ticking = false;
   };
   window.addEventListener('scroll', () => {
     if (!ticking) {
       window.requestAnimationFrame(updateHeader);
       ticking = true;
     }
   }, { passive: true });
   updateHeader();
 }


 const bookingForm = document.querySelector('#booking-form');
 const bookingStatus = document.querySelector('#booking-status');
 const bookingDate = document.querySelector('#booking-date');
 if (bookingDate) {
   const localToday = new Date();
   const offset = localToday.getTimezoneOffset();
   const minDate = new Date(localToday.getTime() - offset * 60000).toISOString().slice(0, 10);
   bookingDate.min = minDate;
 }
 if (bookingForm) bookingForm.addEventListener('submit', event => {
   event.preventDefault();
   if (!bookingForm.reportValidity()) return;
   const data = new FormData(bookingForm);
   const message = [
     'Olá, Dive Easy! Gostaria de consultar uma saída de mergulho.',
     '',
     'Passeio: ' + data.get('passeio'),
     'Data desejada: ' + data.get('data'),
     'Número de pessoas: ' + data.get('pessoas'),
     'Experiência: ' + data.get('experiencia'),
     'Nome: ' + data.get('nome'),
     'Meu WhatsApp: ' + data.get('telefone'),
     '',
     'Entendo que a disponibilidade, os requisitos e o valor precisam ser confirmados pela equipe.'
   ].join('\n');
   if (bookingStatus) bookingStatus.textContent = 'Abrindo o WhatsApp para você escolher o contato da Dive Easy. O pedido ainda precisará ser confirmado pela equipe.';
   window.open('https://wa.me/?text=' + encodeURIComponent(message), '_blank', 'noopener,noreferrer');
 });
})();