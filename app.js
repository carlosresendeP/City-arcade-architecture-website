/**
 * CITY ARCADE — GSAP & ScrollTrigger Motion Engine, Fixed Blurred Header,
 * Interactive Portfolio Filter, Patrimonial Simulator & Concierge (PT-BR)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Register GSAP ScrollTrigger
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  /* ========================================================================
     1. FIXED HEADER: TRANSPARENT AT TOP -> BLURRED GLASS ON SCROLL > 80px
     ======================================================================== */
  const siteHeader = document.getElementById('siteHeader');
  const navLinks = document.querySelectorAll('.main-nav .nav-link, .mobile-nav-links .mobile-nav-link');
  const trackedSections = document.querySelectorAll('section[id]');

  function handleHeaderScroll() {
    const scrollY = window.scrollY || window.pageYOffset;

    if (siteHeader) {
      if (scrollY > 80) {
        siteHeader.classList.add('is-scrolled');
      } else {
        siteHeader.classList.remove('is-scrolled');
      }
    }

    // Active section highlight in navbar
    let currentSectionId = 'inicio';
    trackedSections.forEach((sec) => {
      const top = sec.offsetTop - 160;
      if (scrollY >= top) {
        currentSectionId = sec.getAttribute('id') || currentSectionId;
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === `#${currentSectionId}`) {
        link.classList.add('is-active');
      } else {
        link.classList.remove('is-active');
      }
    });
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  /* ========================================================================
     2. AMBIENT CURSOR FOLLOWER
     ======================================================================== */
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow && window.matchMedia('(pointer: fine)').matches && typeof gsap !== 'undefined') {
    window.addEventListener('mousemove', (e) => {
      cursorGlow.style.opacity = '1';
      gsap.to(cursorGlow, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.65,
        ease: 'power3.out',
        overwrite: 'auto'
      });
    });
  }

  /* ========================================================================
     3. MOBILE NAVIGATION DRAWER
     ======================================================================== */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  if (mobileMenuBtn && mobileNavDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileNavDrawer.classList.toggle('is-open');
      mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
      mobileNavDrawer.setAttribute('aria-hidden', String(!isOpen));
    });

    mobileNavDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileNavDrawer.classList.remove('is-open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileNavDrawer.setAttribute('aria-hidden', 'true');
      });
    });
  }

  /* ========================================================================
     4. HERO ENTRANCE TIMELINE & SYNCHRONIZED 3D PARALLAX
     ======================================================================== */
  if (typeof gsap !== 'undefined') {
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    heroTl.from('.site-header', {
      y: -18,
      opacity: 0,
      duration: 0.75
    });

    heroTl.from(
      '.hero-display-title .char',
      {
        yPercent: 105,
        opacity: 0,
        duration: 0.9,
        stagger: 0.045,
        ease: 'power4.out'
      },
      '-=0.45'
    );

    heroTl.from(
      '#heroSceneBox',
      {
        y: 34,
        opacity: 0,
        duration: 1.05,
        ease: 'power3.out'
      },
      '-=0.65'
    );

    heroTl.from(
      '.hero-left-col > *',
      {
        y: 18,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12
      },
      '-=0.75'
    );

    heroTl.from(
      '.stat-block',
      {
        x: 18,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12
      },
      '-=0.7'
    );

    // Animate KPI counters
    document.querySelectorAll('.stat-counter').forEach((counterEl) => {
      const targetVal = parseInt(counterEl.getAttribute('data-target') || '0', 10);
      const counterObj = { val: 0 };
      gsap.to(counterObj, {
        val: targetVal,
        duration: 1.6,
        delay: 0.4,
        ease: 'power2.out',
        onUpdate: () => {
          counterEl.textContent = String(Math.round(counterObj.val));
        }
      });
    });

    /* ----------------------------------------------------------------------
       HERO SCROLL PARALLAX (Typography & 3D Architectural Cutout Lockstep)
       ---------------------------------------------------------------------- */
    const heroWordCity = document.getElementById('heroWordCity');
    const heroWordArcade = document.getElementById('heroWordArcade');
    const heroSceneBox = document.getElementById('heroSceneBox');

    if (heroWordCity && heroWordArcade && heroSceneBox) {
      gsap.to(heroWordCity, {
        xPercent: -5,
        y: -18,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6
        }
      });

      gsap.to(heroWordArcade, {
        xPercent: 5,
        y: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6
        }
      });

      gsap.to(heroSceneBox, {
        '--hero-img-y': '18px',
        '--hero-img-scale': 1.035,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8
        }
      });

      const heroSection = document.querySelector('.hero-section');
      if (heroSection && window.matchMedia('(pointer: fine)').matches) {
        heroSection.addEventListener('mousemove', (e) => {
          const rect = heroSection.getBoundingClientRect();
          const relX = (e.clientX - rect.left) / rect.width - 0.5;
          gsap.to(heroSceneBox, {
            '--hero-img-x': `${-relX * 10}px`,
            duration: 0.8,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        });

        heroSection.addEventListener('mouseleave', () => {
          gsap.to(heroSceneBox, {
            '--hero-img-x': '0px',
            duration: 0.9,
            ease: 'power3.out',
            overwrite: 'auto'
          });
        });
      }
    }

    /* ======================================================================
       5. MANIFESTO EDITORIAL LINES — SCROLL REVEAL & STAGGERED DRIFT
       ====================================================================== */
    const manifestoLines = gsap.utils.toArray('.manifesto-line');
    manifestoLines.forEach((line, idx) => {
      const dir = idx % 2 === 0 ? -22 : 22;
      gsap.fromTo(
        line,
        { x: dir, opacity: 0.25 },
        {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: line,
            start: 'top 90%',
            end: 'top 48%',
            scrub: 0.5
          }
        }
      );
    });

    /* ======================================================================
       6. FEATURES SPLIT SECTION & WHY CITYARCEDE BANNER ANIMATIONS
       ====================================================================== */
    gsap.fromTo(
      '.feature-card',
      { y: 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.75,
        stagger: 0.12,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.features-section',
          start: 'top 85%',
          once: true
        }
      }
    );

    gsap.fromTo(
      '.features-showcase-frame',
      { y: 34, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.95,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.features-section',
          start: 'top 85%',
          once: true
        }
      }
    );

    gsap.fromTo(
      '#featureImgParallax',
      { yPercent: -5 },
      {
        yPercent: 5,
        ease: 'none',
        scrollTrigger: {
          trigger: '.features-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.7
        }
      }
    );

    gsap.fromTo(
      '#whyArchWrap',
      { y: 26, x: -12 },
      {
        y: 0,
        x: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.why-section',
          start: 'top 92%',
          end: 'bottom 70%',
          scrub: 0.6
        }
      }
    );

    /* ======================================================================
       7. NEW SECTIONS SCROLL REVEALS (PORTFOLIO, INTELLIGENCE, CONCIGE)
       ====================================================================== */
    gsap.fromTo(
      '.portfolio-section .property-card',
      { y: 36, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.85,
        stagger: 0.14,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.portfolio-section',
          start: 'top 85%',
          once: true
        }
      }
    );

    gsap.fromTo(
      '.intelligence-section .process-step-item',
      { x: -24, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.75,
        stagger: 0.14,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.intelligence-section',
          start: 'top 85%',
          once: true
        }
      }
    );

    gsap.fromTo(
      '.intelligence-section .simulator-card',
      { y: 32, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.intelligence-section',
          start: 'top 85%',
          once: true
        }
      }
    );

    gsap.fromTo(
      '.concierge-section .advisor-item',
      { y: 22, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.concierge-section',
          start: 'top 85%',
          once: true
        }
      }
    );

    gsap.fromTo(
      '.concierge-section .booking-card',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.85,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.concierge-section',
          start: 'top 85%',
          once: true
        }
      }
    );

    window.addEventListener('load', () => {
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    });
  }

  /* ========================================================================
     8. INTERACTIVE FEATURE CARDS -> SYNCHRONIZED SHOWCASE VIEWER
     ======================================================================== */
  const featureCards = document.querySelectorAll('.feature-card');
  const showcaseImg = document.getElementById('featureShowcaseImg');
  const hudTag = document.getElementById('featureHudTag');
  const hudLocation = document.getElementById('featureHudLocation');
  const cardsCol = document.querySelector('.features-cards-col');

  function activateFeatureCard(card, updateVisual = true) {
    featureCards.forEach((c) => c.classList.remove('is-active'));
    card.classList.add('is-active');

    if (!updateVisual || !showcaseImg) return;
    const newImg = card.getAttribute('data-img');
    const newTag = card.getAttribute('data-tag');
    const newLoc = card.getAttribute('data-location');
    const idx = card.getAttribute('data-feature-index');

    if (hudTag && newTag) hudTag.textContent = newTag;
    if (hudLocation && newLoc) hudLocation.textContent = newLoc;

    if (newImg && !showcaseImg.src.endsWith(newImg)) {
      showcaseImg.style.opacity = '0.45';
      setTimeout(() => {
        showcaseImg.src = newImg;
        if (idx === '0' || idx === '1') {
          showcaseImg.classList.add('is-mirrored');
        } else {
          showcaseImg.classList.remove('is-mirrored');
        }
        showcaseImg.style.opacity = '1';
      }, 160);
    } else if (idx === '0') {
      showcaseImg.style.transform = 'scaleX(-1) scale(1.04)';
    } else if (idx === '1') {
      showcaseImg.style.transform = 'scaleX(-1) scale(1)';
    }
  }

  featureCards.forEach((card) => {
    card.addEventListener('mouseenter', () => activateFeatureCard(card, true));
    card.addEventListener('focus', () => activateFeatureCard(card, true));
    card.addEventListener('click', () => activateFeatureCard(card, true));
  });

  if (cardsCol && featureCards.length >= 2) {
    cardsCol.addEventListener('mouseleave', () => {
      activateFeatureCard(featureCards[1], true);
    });
  }

  /* ========================================================================
     9. PORTFOLIO FILTER PILLS (ACERVO DE PROPRIEDADES)
     ======================================================================== */
  const filterPills = document.querySelectorAll('.filter-pill');
  const propertyCards = document.querySelectorAll('.property-card');

  filterPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const filterValue = pill.getAttribute('data-filter') || 'todos';

      filterPills.forEach((p) => {
        p.classList.remove('is-active');
        p.setAttribute('aria-selected', 'false');
      });
      pill.classList.add('is-active');
      pill.setAttribute('aria-selected', 'true');

      propertyCards.forEach((card) => {
        const categories = card.getAttribute('data-category') || '';
        const matches = filterValue === 'todos' || categories.includes(filterValue);

        if (matches) {
          card.classList.remove('is-hidden');
          if (typeof gsap !== 'undefined') {
            gsap.fromTo(
              card,
              { opacity: 0, y: 18 },
              {
                opacity: 1,
                y: 0,
                duration: 0.45,
                ease: 'power2.out',
                overwrite: true,
                clearProps: 'transform,opacity'
              }
            );
          }
        } else {
          card.classList.add('is-hidden');
        }
      });

      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    });
  });

  /* ========================================================================
     10. INTERACTIVE PATRIMONIAL & YIELD SIMULATOR (PT-BR CURRENCY)
     ======================================================================== */
  const simValueRange = document.getElementById('simValueRange');
  const simYearsRange = document.getElementById('simYearsRange');
  const simValueOutput = document.getElementById('simValueOutput');
  const simYearsOutput = document.getElementById('simYearsOutput');
  const simProjectedTotal = document.getElementById('simProjectedTotal');
  const simMonthlyYield = document.getElementById('simMonthlyYield');

  function formatBRL(value) {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0
    });
  }

  function updateSimulator() {
    if (!simValueRange || !simYearsRange) return;
    const baseMillions = parseFloat(simValueRange.value) || 15;
    const years = parseInt(simYearsRange.value, 10) || 5;
    const baseAmount = baseMillions * 1000000;

    // Historical 14.6% annual appreciation for modular luxury portfolio
    const annualRate = 0.146;
    const projectedAmount = baseAmount * Math.pow(1 + annualRate, years);

    // Estimated monthly private rental yield (~0.62% per month)
    const monthlyYield = baseAmount * 0.0062;

    if (simValueOutput) simValueOutput.textContent = formatBRL(baseAmount);
    if (simYearsOutput) simYearsOutput.textContent = years === 1 ? '1 ANO' : `${years} ANOS`;
    if (simProjectedTotal) simProjectedTotal.textContent = formatBRL(Math.round(projectedAmount / 10000) * 10000);
    if (simMonthlyYield) simMonthlyYield.textContent = `${formatBRL(Math.round(monthlyYield / 500) * 500)} / mês`;
  }

  if (simValueRange && simYearsRange) {
    simValueRange.addEventListener('input', updateSimulator);
    simYearsRange.addEventListener('input', updateSimulator);
    updateSimulator();
  }

  /* ========================================================================
     11. PRIVATE ADVISOR QUICK-CONNECT & BOOKING FORM SUBMISSION
     ======================================================================== */
  const advisorBtns = document.querySelectorAll('.advisor-contact-pill');
  const clientNotes = document.getElementById('clientNotes');
  const clientName = document.getElementById('clientName');
  const privateBookingForm = document.getElementById('privateBookingForm');
  const bookingFeedback = document.getElementById('bookingFeedback');

  advisorBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const advisorName = btn.getAttribute('data-advisor') || '';
      if (clientNotes) {
        clientNotes.value = `Solicito atendimento direto com o especialista ${advisorName}.`;
      }
      if (clientName) {
        clientName.focus();
      }
    });
  });

  if (privateBookingForm) {
    privateBookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(privateBookingForm);
      const nome = formData.get('clientName') || 'Cliente';
      const modalidade = formData.get('modalidade') || 'Visita Privada';
      const cidade = formData.get('clientCity') || 'São Paulo';

      if (bookingFeedback) {
        bookingFeedback.textContent = `✓ Solicitação confirmada, ${nome}. Nosso Private Desk entrará em contato em até 15 minutos para coordenar sua ${modalidade} (${cidade}).`;
      }
      privateBookingForm.reset();
    });
  }

  // Newsletter form feedback
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = newsletterForm.querySelector('button');
      if (btn) {
        btn.textContent = 'INSCRITO COM SUCESSO ✓';
      }
      newsletterForm.reset();
    });
  }

  /* ========================================================================
     12. HERO LIVE ARCHITECTURAL LIGHT & SPEED-STREAK CANVAS
     ======================================================================== */
  const ambientCanvas = document.getElementById('heroAmbientCanvas');
  if (ambientCanvas) {
    const ctx = ambientCanvas.getContext('2d');
    let width = 0;
    let height = 0;

    const resizeCanvas = () => {
      const rect = ambientCanvas.getBoundingClientRect();
      width = ambientCanvas.width = Math.max(1, Math.floor(rect.width));
      height = ambientCanvas.height = Math.max(1, Math.floor(rect.height));
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const streaks = Array.from({ length: 6 }, (_, i) => ({
      x: Math.random() * 1000,
      yRatio: 0.78 + (i % 3) * 0.045,
      len: 90 + Math.random() * 140,
      speed: 3.2 + Math.random() * 4.5,
      alpha: 0.08 + Math.random() * 0.14,
      warm: i % 2 === 0
    }));

    let shimmerPhase = 0;

    const renderAmbient = () => {
      ctx.clearRect(0, 0, width, height);
      shimmerPhase += 0.006;

      const sweepX = ((Math.sin(shimmerPhase) + 1) * 0.5) * width * 0.6 + width * 0.2;
      const grad = ctx.createRadialGradient(
        sweepX,
        height * 0.42,
        10,
        sweepX,
        height * 0.42,
        width * 0.28
      );
      grad.addColorStop(0, 'rgba(255, 232, 195, 0.12)');
      grad.addColorStop(1, 'rgba(255, 232, 195, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      streaks.forEach((s) => {
        s.x += s.speed;
        if (s.x - s.len > width) {
          s.x = -s.len;
        }
        const y = height * s.yRatio;
        const lineGrad = ctx.createLinearGradient(s.x - s.len, y, s.x, y);
        const colorRGB = s.warm ? '255, 190, 110' : '210, 230, 255';
        lineGrad.addColorStop(0, `rgba(${colorRGB}, 0)`);
        lineGrad.addColorStop(0.5, `rgba(${colorRGB}, ${s.alpha})`);
        lineGrad.addColorStop(1, `rgba(${colorRGB}, 0)`);

        ctx.strokeStyle = lineGrad;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(s.x - s.len, y);
        ctx.lineTo(s.x, y);
        ctx.stroke();
      });

      requestAnimationFrame(renderAmbient);
    };

    renderAmbient();
  }

  /* ========================================================================
     13. HERO PERSPECTIVE SWITCHER (ALTERNATE ARCHITECTURAL VIEW)
     ======================================================================== */
  const heroAngleToggle = document.getElementById('heroAngleToggle');
  const heroBaseImg = document.getElementById('heroBaseImg');
  const heroPopoutImg = document.getElementById('heroPopoutImg');
  let isAltPerspective = false;

  if (heroAngleToggle && heroBaseImg && heroPopoutImg) {
    heroAngleToggle.addEventListener('click', () => {
      isAltPerspective = !isAltPerspective;
      const toggleText = heroAngleToggle.querySelector('.toggle-text');

      if (isAltPerspective) {
        heroBaseImg.src = 'assets/hero-architecture.jpg';
        heroPopoutImg.style.opacity = '0';
        if (toggleText) toggleText.textContent = 'RESTAURAR RECORTE 3D';
      } else {
        heroBaseImg.src = 'assets/hero-perspective.jpg';
        heroPopoutImg.style.opacity = '1';
        if (toggleText) toggleText.textContent = 'PERSPECTIVA AO VIVO';
      }
    });
  }

  /* ========================================================================
     14. SEARCH, DOSSIER & SIGN-IN INTERACTIVE MODAL (PT-BR)
     ======================================================================== */
  const modal = document.getElementById('interactiveModal');
  const modalKicker = document.getElementById('modalKicker');
  const modalBody = document.getElementById('modalBody');
  const openSearchBtn = document.getElementById('openSearchBtn');
  const openSignInBtn = document.getElementById('openSignInBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const propertyActionBtns = document.querySelectorAll('.property-action-btn');

  function openModal(type, payload = {}) {
    if (!modal || !modalKicker || !modalBody) return;

    if (type === 'search') {
      modalKicker.textContent = 'BUSCA INSTANTÂNEA DE IMÓVEIS';
      modalBody.innerHTML = `
        <form class="modal-input-group" onsubmit="event.preventDefault();">
          <input type="text" class="modal-input" placeholder="Buscar por cidade, estilo arquitetônico ou código..." autofocus />
          <button type="submit" class="modal-submit-btn" onclick="document.getElementById('interactiveModal').classList.remove('is-open'); location.hash='#imoveis';">EXPLORAR IMÓVEIS VERIFICADOS</button>
        </form>
        <div class="modal-quick-tags">
          <button type="button" class="quick-tag" onclick="document.getElementById('interactiveModal').classList.remove('is-open'); location.hash='#imoveis';">JARDINS · SP</button>
          <button type="button" class="quick-tag" onclick="document.getElementById('interactiveModal').classList.remove('is-open'); location.hash='#imoveis';">MÓDULOS DE VIDRO</button>
          <button type="button" class="quick-tag" onclick="document.getElementById('interactiveModal').classList.remove('is-open'); location.hash='#imoveis';">JOÁ · RIO</button>
          <button type="button" class="quick-tag" onclick="document.getElementById('interactiveModal').classList.remove('is-open'); location.hash='#imoveis';">COBERTURAS</button>
        </div>
      `;
    } else if (type === 'dossier') {
      modalKicker.textContent = `DOSSIÊ CONFIDENCIAL · ${payload.loc || ''}`;
      modalBody.innerHTML = `
        <div style="margin-bottom: 16px;">
          <h4 style="font-size: 1.25rem; font-weight: 400; margin-bottom: 4px;">${payload.title || ''}</h4>
          <p style="font-size: 0.72rem; color: #3898ec; font-weight: 600; margin-bottom: 8px;">VALOR: ${payload.price || ''}</p>
          <p style="font-size: 0.68rem; color: #555; letter-spacing: 0.04em;">${payload.specs || ''}</p>
        </div>
        <form class="modal-input-group" onsubmit="event.preventDefault(); this.innerHTML='<p style=\\'font-size:0.75rem;color:#15803d;font-weight:600;padding:12px 0;\\'>✓ Dossiê completo em PDF e planta BIM enviados para seu e-mail.</p>';">
          <input type="email" class="modal-input" placeholder="Informe seu e-mail para receber a planta e o dossiê" required autofocus />
          <button type="submit" class="modal-submit-btn">RECEBER DOSSIÊ COMPLETO (PDF &amp; TOUR 3D)</button>
        </form>
      `;
    } else {
      modalKicker.textContent = 'PORTAL DO CLIENTE — ACESSO PRIVATE';
      modalBody.innerHTML = `
        <form class="modal-input-group" onsubmit="event.preventDefault();">
          <input type="email" class="modal-input" placeholder="E-mail cadastrado no Private Desk" required autofocus />
          <input type="password" class="modal-input" placeholder="Credencial de acesso" required />
          <button type="submit" class="modal-submit-btn">ACESSAR PORTFÓLIO EXCLUSIVO</button>
        </form>
      `;
    }

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
  }

  if (openSearchBtn) openSearchBtn.addEventListener('click', () => openModal('search'));
  if (openSignInBtn) openSignInBtn.addEventListener('click', () => openModal('signin'));
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

  propertyActionBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      openModal('dossier', {
        title: btn.getAttribute('data-prop-title'),
        price: btn.getAttribute('data-prop-price'),
        loc: btn.getAttribute('data-prop-loc'),
        specs: btn.getAttribute('data-prop-specs')
      });
    });
  });

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
});
