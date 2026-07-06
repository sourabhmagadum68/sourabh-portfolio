gsap.registerPlugin(ScrollTrigger);

/* ---------------- data ---------------- */
const skillItems = [
  {name:"Adobe Photoshop", bg:"#001E36", fg:"#31A8FF", label:"Ps", pct:95},
  {name:"Adobe Illustrator", bg:"#330000", fg:"#FF7C00", label:"Ai", pct:90},
  {name:"Figma", bg:"#0D0D0D", fg:"#F24E1E", label:"Fg", multi:true, pct:85},
  {name:"Adobe Firefly", bg:"#1D0A2E", fg:"#E4562E", label:"Fy", pct:85},
  {name:"Midjourney", bg:"#0A0A0A", fg:"#EDEDED", label:"Mj", pct:82},
  {name:"ChatGPT", bg:"#0A0A0A", fg:"#10A37F", label:"Gp", pct:88},
  {name:"Branding", bg:"rgba(255,255,255,0.05)", fg:"var(--lime)", label:"◆", pct:92},
  {name:"Logo Design", bg:"rgba(255,255,255,0.05)", fg:"var(--lime)", label:"◈", pct:90},
  {name:"Typography", bg:"rgba(255,255,255,0.05)", fg:"var(--lime)", label:"Tt", pct:93},
  {name:"Poster Design", bg:"rgba(255,255,255,0.05)", fg:"var(--lime)", label:"▤", pct:95},
  {name:"Photo Manipulation", bg:"rgba(255,255,255,0.05)", fg:"var(--lime)", label:"◐", pct:88},
  {name:"Motion Graphics", bg:"rgba(255,255,255,0.05)", fg:"var(--lime)", label:"▶", pct:75},
  {name:"Social Media Design", bg:"rgba(255,255,255,0.05)", fg:"var(--lime)", label:"◧", pct:90},
];

const services = [
  {icon:"◆", title:"Brand Identity", desc:"Logos, guidelines, and cohesive visual systems built to last."},
  {icon:"▤", title:"Poster Design", desc:"Editorial and cinematic posters with strong typographic voice."},
  {icon:"▶", title:"YouTube Thumbnails", desc:"High-CTR thumbnail design tuned for clarity at a glance."},
  {icon:"◧", title:"Social Media Design", desc:"On-brand creative systems for campaigns and content calendars."},
  {icon:"▭", title:"Banner & Print Design", desc:"Print-ready creative for campaigns, events, and retail."},
  {icon:"◫", title:"UI/UX Design", desc:"Clean, functional interface design rooted in usability."},
  {icon:"✦", title:"Motion Graphics", desc:"Short-form animated visuals for social and campaign use."},
  {icon:"◐", title:"Photo Editing", desc:"Precise retouching and manipulation for editorial-grade output."},
  {icon:"✧", title:"AI Creative Design", desc:"AI-assisted ideation and production using Firefly & Midjourney."},
];

/* ---------------- render skills ---------------- */
const skillGrid = document.getElementById('skillGrid');

skillItems.forEach(s=>{
  const el = document.createElement('div');
  el.className = 'skill-card glass';
  el.innerHTML = `
    <div class="logo-badge" style="background:${s.bg};">
      <span style="color:${s.fg}; ${s.multi ? 'background:linear-gradient(90deg,#F24E1E,#A259FF,#1ABCFE,#0ACF83); -webkit-background-clip:text; background-clip:text; color:transparent;' : ''}">${s.label}</span>
    </div>
    <div class="bar-track">
      <div class="bar-fill" data-pct="${s.pct}"></div>
    </div>
    <div class="pct-label">${s.pct}%</div>
    <div class="name">${s.name}</div>
  `;
  skillGrid.appendChild(el);
});
// gradient def for rings
const svgNS = "http://www.w3.org/2000/svg";
const defsSvg = document.createElementNS(svgNS,"svg");
defsSvg.style.width=0; defsSvg.style.height=0; defsSvg.style.position="absolute";
defsSvg.innerHTML = `<defs><linearGradient id="gradStroke" x1="0%" y1="0%" x2="100%" y2="100%">
  <stop offset="0%" stop-color="#D7FF3F"/><stop offset="55%" stop-color="#B4F23A"/><stop offset="100%" stop-color="#8FE23A"/>
</linearGradient></defs>`;
document.body.appendChild(defsSvg);

/* ---------------- render services ---------------- */
const servicesGrid = document.getElementById('servicesGrid');
services.forEach(s=>{
  const el = document.createElement('div');
  el.className = 'service-card glass reveal';
  el.innerHTML = `<div class="service-icon">${s.icon}</div><h3>${s.title}</h3><p>${s.desc}</p>`;
  servicesGrid.appendChild(el);
});

/* ---------------- project modals (static per-project HTML, real images) ---------------- */
document.querySelectorAll('.proj-card').forEach(card=>{
  card.addEventListener('click', ()=>{
    const modal = document.getElementById(card.dataset.modal);
    if(!modal) return;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

document.querySelectorAll('.modal-overlay').forEach(modal=>{
  const closeBtn = modal.querySelector('.modal-close');
  const close = ()=>{
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };
  if(closeBtn) closeBtn.addEventListener('click', close);
  modal.addEventListener('click', e=>{ if(e.target === modal) close(); });
});

/* ---------------- mobile menu toggle (real) ---------------- */
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
navToggle.addEventListener('click', ()=>{
  const isOpen = mobileMenu.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});
document.querySelectorAll('.mobile-link, #mobileMenu .btn').forEach(link=>{
  link.addEventListener('click', ()=>{
    mobileMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded','false');
  });
});

/* ---------------- nav scroll state + active link ---------------- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', ()=>{
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      navLinks.forEach(l=>l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if(active) active.classList.add('active');
    }
  });
}, {rootMargin:"-45% 0px -45% 0px"});
sections.forEach(s=>io.observe(s));

/* ---------------- cursor glow ---------------- */
const glow = document.getElementById('cursor-glow');
window.addEventListener('mousemove', e=>{
  glow.style.opacity = 1;
  glow.style.left = e.clientX+'px';
  glow.style.top = e.clientY+'px';
});
window.addEventListener('mouseleave', ()=> glow.style.opacity = 0);

/* ---------------- magnetic buttons ---------------- */
document.querySelectorAll('.magnetic').forEach(btn=>{
  btn.addEventListener('mousemove', e=>{
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width/2;
    const y = e.clientY - r.top - r.height/2;
    gsap.to(btn, {x:x*0.25, y:y*0.35, duration:0.4, ease:"power2.out"});
  });
  btn.addEventListener('mouseleave', ()=>{
    gsap.to(btn, {x:0, y:0, duration:0.5, ease:"elastic.out(1,0.4)"});
  });
});

/* ---------------- role cycler ---------------- */
const roleList = document.getElementById('roleList');
const roleItems = roleList.children.length;
let roleIndex = 0;
setInterval(()=>{
  roleIndex = (roleIndex+1) % roleItems;
  gsap.to(roleList, {y: -roleIndex*1.15+"em", duration:0.7, ease:"power3.inOut"});
}, 2600);

/* ---------------- scroll reveal ---------------- */
window.addEventListener('load', ()=>{
  gsap.utils.toArray('.reveal').forEach((el,i)=>{
    gsap.to(el, {
      opacity:1, y:0, duration:0.9, ease:"power3.out",
      scrollTrigger:{ trigger:el, start:"top 88%", once:true }
    });
  });
  // skill bar animation
  document.querySelectorAll('.bar-fill').forEach(bar=>{
    ScrollTrigger.create({
      trigger: bar, start:"top 90%", once:true,
      onEnter:()=> gsap.to(bar, {width: bar.dataset.pct+"%", duration:1.2, ease:"power2.out"})
    });
  });
  // hero reveal immediately
  gsap.to('#hero .reveal', {opacity:1, y:0, duration:1, stagger:0.12, ease:"power3.out"});
});

/* ---------------- back to top ---------------- */
document.getElementById('toTop').addEventListener('click', ()=>{
  window.scrollTo({top:0, behavior:'smooth'});
});

/* ---------------- contact form (real, mailto-based — no backend required) ---------------- */
document.getElementById('contactForm').addEventListener('submit', function(e){
  e.preventDefault();
  const name = document.getElementById('fName').value.trim();
  const email = document.getElementById('fEmail').value.trim();
  const message = document.getElementById('fMessage').value.trim();
  const note = document.getElementById('formNote');

  if(!name || !email || !message){
    note.style.color = '#f87171';
    note.textContent = "Please fill in every field before sending.";
    return;
  }

  const subject = encodeURIComponent(`Project inquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  const mailtoLink = `mailto:sourabhmagadum528@gmail.com?subject=${subject}&body=${body}`;

  // Opens the visitor's own email client with everything pre-filled —
  // works everywhere with zero backend, API keys, or third-party accounts.
  window.location.href = mailtoLink;

  note.style.color = 'var(--muted)';
  note.textContent = "Opening your email app with this message pre-filled — hit send there to reach me.";
  this.reset();
});

/* reduced motion respect */
if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  document.querySelectorAll('.reveal').forEach(el=>{ el.style.opacity=1; el.style.transform='none'; });
}
