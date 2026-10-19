/* ContaPro - Contact form
   Validación nativa y simulación de envío con toast.
*/

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const form = $('#contact-form');
    if (!form) return;

    /* Pre-seleccionar plan si viene en URL */
    const params = new URLSearchParams(location.search);
    const plan = params.get('plan');
    if (plan) {
      const select = $('#servicio', form);
      if (select) {
        const option = $$('option', select).find(o => o.value === plan);
        if (option) select.value = option.value;
      }
    }

    const fields = {
      nombre:   { required: true,  min: 3 },
      email:    { required: true,  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/ },
      telefono: { required: false, pattern: /^[\d\s+\-()]{7,}$/ },
      servicio: { required: true },
      mensaje:  { required: true,  min: 10 }
    };

    function setError(input, hasError) {
      input.classList.toggle('error', hasError);
    }

    function validate() {
      let ok = true;
      Object.keys(fields).forEach(name => {
        const input = form.querySelector(`[name="${name}"]`);
        if (!input) return;
        const rules = fields[name];
        const val = (input.value || '').trim();
        let error = false;
        if (rules.required && !val) error = true;
        if (val && rules.min && val.length < rules.min) error = true;
        if (val && rules.pattern && !rules.pattern.test(val)) error = true;
        setError(input, error);
        if (error) ok = false;
      });
      return ok;
    }

    /* Limpiar errores al re-intentar */
    form.addEventListener('input', (e) => {
      if (e.target.matches('.form-input')) setError(e.target, false);
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validate()) {
        const toast = window.CONTA_TOAST;
        if (toast) toast('Por favor revisa los campos marcados en rojo.', { type: 'error', title: 'Faltan datos' });
        const firstError = form.querySelector('.form-input.error');
        if (firstError) firstError.focus();
        return;
      }

      const submitBtn = form.querySelector('[type="submit"]');
      const original = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';

      /* Simulación de envío */
      setTimeout(() => {
        const data = Object.fromEntries(new FormData(form).entries());
        // En un entorno real, aquí iría fetch(...) a un endpoint.
        // Demo: no se transmite información a un servidor.

        const toast = window.CONTA_TOAST;
        if (toast) {
          toast(`Gracias ${data.nombre.split(' ')[0]}, esta es una demostración; tu mensaje no se ha enviado.`, { title: 'Formulario de demostración' });
        }
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = original;
      }, 900);
    });
  });

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }
})();
