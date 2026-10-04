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
})();