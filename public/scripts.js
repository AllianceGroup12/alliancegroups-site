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
    let score = Number(scoreEl.textContent) || 864;
    let automations = Number(automationsEl.textContent) || 147;

    setInterval(() => {
      const delta = Math.round((Math.random() - 0.4) * 12);
      score = Math.max(750, Math.min(950, score + delta));
      const trend = ((delta / Math.max(score - delta, 1)) * 100).toFixed(1);
      const automationDelta = Math.round((Math.random() - 0.3) * 3);
      automations = Math.max(120, automations + automationDelta);

      scoreEl.textContent = score.toString();
      trendEl.textContent = `${delta >= 0 ? '+' : ''}${trend}%`;
      automationsEl.textContent = automations.toString();

      trendEl.classList.toggle('negative', delta < 0);
    }, 6500);
  }
});
