// ---- Boot sequence ----
  const bootLines = [
    {p:'$', t:' whoami'},
    {o:'> palak_goyal — software engineer'},
    {p:'$', t:' cat role.txt'},
    {o:'> backend &amp; full-stack developer | java · spring boot · mern'},
    {p:'$', t:' ./init_portfolio.sh'},
    {o:'> loading experience... done'},
    {o:'> loading projects... done'},
    {o:'> status: <span class="ok">ready</span>'}
  ];
  const bootBody = document.getElementById('bootBody');
  const boot = document.getElementById('boot');
  let i = 0;
  function typeLine(){
    if(i >= bootLines.length){
      setTimeout(()=>{ boot.classList.add('hidden'); document.body.style.overflow='auto'; }, 400);
      return;
    }
    const line = bootLines[i];
    const el = document.createElement('div');
    el.className = 'boot-line';
    if(line.p){
      el.innerHTML = '<span class="prompt">'+line.p+'</span><span class="out">'+line.t+'</span>';
    } else {
      el.innerHTML = '<span class="out">'+line.o+'</span>';
    }
    bootBody.appendChild(el);
    i++;
    setTimeout(typeLine, 260);
  }
  document.body.style.overflow='hidden';
  setTimeout(typeLine, 300);
  // safety fallback in case JS stalls
  setTimeout(()=>{ boot.classList.add('hidden'); document.body.style.overflow='auto'; }, 6000);

  // ---- Mobile menu ----
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  burger.addEventListener('click', ()=> mobileMenu.classList.toggle('open'));
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', ()=> mobileMenu.classList.remove('open')));

  // ---- Scroll reveal ----
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){ entry.target.classList.add('show'); io.unobserve(entry.target); }
    });
  }, {threshold:0.15});
  revealEls.forEach(el => io.observe(el));

  // ---- Counter animation ----
  const counters = document.querySelectorAll('[data-count]');
  const counterIO = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '+';
        let cur = 0;
        const step = Math.max(1, Math.round(target/40));
        const tick = ()=>{
          cur += step;
          if(cur >= target){ el.textContent = target + suffix; return; }
          el.textContent = cur + suffix;
          requestAnimationFrame(tick);
        };
        tick();
        counterIO.unobserve(el);
      }
    });
  }, {threshold:0.5});
  counters.forEach(el => counterIO.observe(el));

  // ---- Active nav link on scroll ----
  const sections = document.querySelectorAll('section[id]');
  const navA = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', ()=>{
    let current = '';
    sections.forEach(sec=>{
      const top = sec.offsetTop - 140;
      if(window.scrollY >= top) current = sec.getAttribute('id');
    });
    navA.forEach(a=>{
      a.classList.toggle('active', a.getAttribute('href') === '#'+current);
    });
  });