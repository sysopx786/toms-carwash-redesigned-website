/* Static, dependency-free enhancement. Core content and navigation work without JS. */
(() => {
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const connection = navigator.connection;
  let userMotion = null, lowBattery = false;
  try { userMotion = localStorage.getItem('toms-motion'); } catch {}
  const motionOff = () => reduce.matches || connection?.saveData || lowBattery || userMotion === 'off';
  const toggle = document.querySelector('.motion-toggle');
  function updateMotion() {
    root.dataset.motion = motionOff() ? 'off' : 'on';
    if (toggle) { toggle.textContent = motionOff() ? 'Motion: reduced' : 'Motion: on'; toggle.setAttribute('aria-pressed', String(!motionOff())); }
    if (motionOff()) { document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible')); document.querySelectorAll('[data-tilt]').forEach(el => el.style.transform = ''); document.querySelector('.hero-media')?.style.removeProperty('transform'); }
  }
  toggle?.addEventListener('click', () => { userMotion = userMotion === 'off' ? 'on' : 'off'; try { localStorage.setItem('toms-motion', userMotion); } catch {} updateMotion(); });
  reduce.addEventListener('change', updateMotion);
  connection?.addEventListener('change', updateMotion);
  // Battery status is optional: browsers do not expose a universal low-power-mode API.
  if (navigator.getBattery) navigator.getBattery().then(b => { const sync = () => { lowBattery = !b.charging && b.level < .2; updateMotion(); }; b.addEventListener('levelchange', sync); b.addEventListener('chargingchange', sync); sync(); }).catch(() => {});
  const hour = new Date().getHours(); document.body.dataset.time = hour < 7 || hour >= 19 ? 'night' : 'day'; updateMotion();
  const menu = document.querySelector('.nav'), menuButton = document.querySelector('.menu-toggle');
  function closeMenu() { menu?.classList.remove('is-open'); menuButton?.setAttribute('aria-expanded','false'); }
  menuButton?.addEventListener('click', () => { const open = menu.classList.toggle('is-open'); menuButton.setAttribute('aria-expanded', String(open)); });
  menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu?.classList.contains('is-open')) { closeMenu(); menuButton.focus(); } });
  document.addEventListener('click', e => { if (!e.target.closest('.site-header')) closeMenu(); });
  if ('IntersectionObserver' in window && !motionOff()) {
    root.classList.add('js-motion');
    const observer = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); observer.unobserve(e.target); } }), {threshold:.08});
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }
  // Small spring-like cursor response; only on pointer devices and never on scroll/touch.
  if (matchMedia('(hover:hover) and (pointer:fine)').matches) document.querySelectorAll('[data-tilt]').forEach(el => {
    let frame = 0, tx = 0, ty = 0, x = 0, y = 0;
    const draw = () => { if (motionOff()) { frame=0; el.style.transform=''; return; } x += (tx-x)*.14; y += (ty-y)*.14; el.style.transform = `perspective(1000px) rotateX(${x}deg) rotateY(${y}deg)`; if(Math.abs(tx-x)+Math.abs(ty-y)>.01) frame=requestAnimationFrame(draw); else frame=0; };
    el.addEventListener('pointermove', e => { if(motionOff())return; const r=el.getBoundingClientRect(); tx=-(e.clientY-r.top-r.height/2)/r.height*4; ty=(e.clientX-r.left-r.width/2)/r.width*4; if(!frame)frame=requestAnimationFrame(draw); });
    el.addEventListener('pointerleave', () => {tx=ty=0;if(!frame&&!motionOff())frame=requestAnimationFrame(draw);});
  });
  const hero = document.querySelector('.hero'), media = document.querySelector('.hero-media'), video = document.querySelector('#hero-video');
  // Set data-src on #hero-video when a real MP4 is supplied. No missing-file requests.
  if(video?.dataset.src && !motionOff()) { video.src=video.dataset.src; video.load(); video.addEventListener('loadeddata', () => {video.hidden=false;}); video.addEventListener('error',()=>{video.hidden=true;}); }
  let scheduled=false;
  function scrub(){ scheduled=false;if(!hero||motionOff())return;const r=hero.getBoundingClientRect();const p=Math.min(1,Math.max(0,-r.top/hero.offsetHeight));media.style.transform=`translateY(${p*40}px) scale(${1+p*.055})`;const bar=document.querySelector('.progress-line');if(bar)bar.style.width=`${p*100}%`;if(video&&!video.hidden&&Number.isFinite(video.duration)&&!video.seeking){const t=p*Math.max(0,video.duration-.05);if(Math.abs(video.currentTime-t)>.045)video.currentTime=t;} }
  if(hero)window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(scrub);}},{passive:true});
  const compare = document.querySelector('#compare-toggle');
  compare?.addEventListener('click', () => {const table=document.querySelector('#comparison');const open=table.hidden;table.hidden=!open;compare.setAttribute('aria-expanded',String(open));compare.textContent=open?'Hide full comparison −':'Compare every feature +';});

  // Mobile comparison reads the published table, keeping the prices and feature data in one place.
  const comparison=document.querySelector('#comparison');
  const sourceTable=comparison?.querySelector('table');
  if(sourceTable?.tHead?.rows.length && sourceTable?.tBodies[0]){
    const packages=Array.from(sourceTable.tHead.rows[0].cells).slice(1).map(cell=>{
      const parts=cell.textContent.trim().split('·');
      return {name:parts[0].trim(),price:parts.slice(1).join('·').trim()};
    });
    const features=Array.from(sourceTable.tBodies[0].rows).map(row=>({
      label:row.cells[0].textContent.trim(),
      included:Array.from(row.cells).slice(1).map(cell=>cell.textContent.trim()==='Included')
    }));
    if(packages.length && features.length){
      const el=(tag,cls,text)=>{
        const node=document.createElement(tag);
        if(cls)node.className=cls;
        if(text!==undefined)node.textContent=text;
        return node;
      };
      const mobile=el('div','mobile-wash-comparison');
      const tabs=el('div','mobile-wash-tabs');
      tabs.setAttribute('role','tablist');
      tabs.setAttribute('aria-label','Select a wash package');
      const panel=el('section','mobile-wash-card');
      panel.id='mobile-wash-panel';
      panel.setAttribute('role','tabpanel');
      panel.tabIndex=0;
      function showWash(index){
        buttons.forEach((button,i)=>{
          const active=index===i;
          button.classList.toggle('is-active',active);
          button.setAttribute('aria-selected',String(active));
          button.tabIndex=active?0:-1;
        });
        panel.setAttribute('aria-labelledby',buttons[index].id);
        const head=el('div','mobile-wash-card-heading');
        head.append(el('h3','',packages[index].name+' Wash'),el('strong','',packages[index].price));
        const list=el('ul','mobile-wash-features');
        features.forEach(feature=>{
          const included=feature.included[index];
          const row=el('li','mobile-wash-feature');
          const status=el('span','mobile-wash-feature-status '+(included?'is-included':'is-absent'));
          const icon=el('span','mobile-wash-feature-icon',included?'✓':'−');
          icon.setAttribute('aria-hidden','true');
          status.append(icon,el('span','',included?'Included':'Not included'));
          row.append(el('span','mobile-wash-feature-name',feature.label),status);
          list.append(row);
        });
        panel.replaceChildren(head,list);
      }
      const buttons=packages.map((pkg,index)=>{
        const button=el('button','mobile-wash-tab');
        button.type='button';
        button.id='mobile-wash-tab-'+index;
        button.setAttribute('role','tab');
        button.setAttribute('aria-controls',panel.id);
        button.append(el('span','mobile-wash-tab-name',pkg.name),el('strong','mobile-wash-tab-price',pkg.price));
        button.addEventListener('click',()=>showWash(index));
        button.addEventListener('keydown',event=>{
          let next=index;
          if(event.key==='ArrowRight')next=(index+1)%packages.length;
          else if(event.key==='ArrowLeft')next=(index+packages.length-1)%packages.length;
          else if(event.key==='Home')next=0;
          else if(event.key==='End')next=packages.length-1;
          else return;
          event.preventDefault();
          showWash(next);
          buttons[next].focus();
        });
        tabs.append(button);
        return button;
      });
      mobile.append(tabs,panel);
      comparison.insertBefore(mobile,sourceTable);
      showWash(0);
      comparison.classList.add('mobile-ready');
    }
  }

})();
