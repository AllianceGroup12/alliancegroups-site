document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const accordion = document.querySelector('[data-accordion]');
  if (accordion) {
    accordion.addEventListener('click', (event) => {
      const trigger = event.target.closest('.accordion-trigger');
      if (!trigger) return;

      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', String(!expanded));

      const panel = trigger.nextElementSibling;
      if (panel) {
        panel.hidden = expanded;
      }
    });
  }

  const scoreEl = document.querySelector('[data-score]');
  const trendEl = document.querySelector('[data-trend]');
  const automationsEl = document.querySelector('[data-automations]');

  if (scoreEl && trendEl && automationsEl) {
    let properties = parseInt(scoreEl.textContent.replace(/[\s\u00A0]/g, ''), 10) || 1284;
    let jobs = parseInt(automationsEl.textContent.replace(/[\s\u00A0]/g, ''), 10) || 4617;

    const fmt = (n) => n.toLocaleString('en-AU');

    setInterval(() => {
      const propDelta = Math.round(Math.random() * 5);
      const jobDelta = Math.round(Math.random() * 12);
      properties += propDelta;
      jobs += jobDelta;

      scoreEl.textContent = fmt(properties);
      trendEl.textContent = `+${propDelta}`;
      automationsEl.textContent = fmt(jobs);

      trendEl.classList.remove('negative');
    }, 6500);
  }
});
