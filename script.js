// ── SCROLL REVEAL ──
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(el => {
        if (el.isIntersecting) {
          el.target.classList.add('visible');
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // ── PROGRESS BARS ──
    const barObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.progress-fill').forEach(fill => {
            fill.style.width = fill.dataset.width + '%';
          });
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.data-card').forEach(card => barObserver.observe(card));

    // ── COUNTER ANIMATION ──
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.stat-number').forEach(el => {
            const target = parseFloat(el.textContent);
            if (isNaN(target)) return;
            const suffix = el.textContent.replace(/[\d.]/g, '');
            let start = 0;
            const duration = 1400;
            const startTime = performance.now();
            const animate = (now) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              el.textContent = (target * eased % 1 !== 0
                ? (target * eased).toFixed(1)
                : Math.round(target * eased)) + suffix;
              if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
          });
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stats-bar').forEach(el => counterObserver.observe(el));

    // ── FORM SUBMIT ──
    function handleSubmit() {
      const input = document.getElementById('emailInput');
      const msg = document.getElementById('confirmMsg');
      if (!input.value || !input.value.includes('@')) {
        input.style.borderColor = '#f87171';
        setTimeout(() => input.style.borderColor = '', 1500);
        return;
      }
      input.parentElement.style.display = 'none';
      msg.style.display = 'flex';
    }

    document.getElementById('emailInput').addEventListener('keydown', e => {
      if (e.key === 'Enter') handleSubmit();
    });