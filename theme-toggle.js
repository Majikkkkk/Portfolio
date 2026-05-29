// Theme toggle behavior: toggles `.light` on document.documentElement
(function(){
  const STORAGE_KEY = 'portfolio-theme';
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  if(!btn) return;

  function applyTheme(isLight){
    if(isLight){
      root.classList.add('light');
      btn.classList.add('is-light');
      btn.setAttribute('aria-pressed','true');
      localStorage.setItem(STORAGE_KEY,'light');
    } else {
      root.classList.remove('light');
      btn.classList.remove('is-light');
      btn.setAttribute('aria-pressed','false');
      localStorage.setItem(STORAGE_KEY,'dark');
    }
  }

  // initialize from preference or system
  const stored = localStorage.getItem(STORAGE_KEY);
  if(stored === 'light') applyTheme(true);
  else if(stored === 'dark') applyTheme(false);
  else {
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    applyTheme(prefersLight);
  }

  // toggle handler
  btn.addEventListener('click', ()=>{
    const isNowLight = !root.classList.contains('light');
    applyTheme(isNowLight);
  });

  // keyboard accessibility
  btn.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      btn.click();
    }
  });
})();
