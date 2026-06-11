// ══ FIREBASE INITIALIZATION ══
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyArCIwOQyX9-EIi7b6FvPKT7kZ-ByfxiCI",
  authDomain: "porto-komen.firebaseapp.com",
  projectId: "porto-komen",
  storageBucket: "porto-komen.firebasestorage.app",
  messagingSenderId: "248864182128",
  appId: "1:248864182128:web:ef0f5878e8850d976909b5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ══ KANVAS FOTO & BINGKAI GOOGLE ══
window.addEventListener('DOMContentLoaded', function() {
  var kanvas = document.getElementById('kanvasBulat');
  if (!kanvas) return; 
  
  var ctx = kanvas.getContext('2d');
  var gambar = new Image();
  gambar.src = 'bagus.jpeg'; 

  gambar.onload = function() {
    ctx.save(); 
    ctx.beginPath();
    ctx.arc(100, 100, 90, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(gambar, 10, 10, 180, 180);
    ctx.restore(); 

    ctx.lineWidth = 10; 
    ctx.strokeStyle = "#FBBC05"; ctx.beginPath(); ctx.arc(100, 100, 95, (5/6) * Math.PI, (7/6) * Math.PI); ctx.stroke();
    ctx.strokeStyle = "#EA4335"; ctx.beginPath(); ctx.arc(100, 100, 95, (7/6) * Math.PI, (11/6) * Math.PI); ctx.stroke();
    ctx.strokeStyle = "#4285F4"; ctx.beginPath(); ctx.arc(100, 100, 95, (-1.5/6) * Math.PI, (1.5/6) * Math.PI); ctx.stroke();
    ctx.strokeStyle = "#34A853"; ctx.beginPath(); ctx.arc(100, 100, 95, (1.5/6) * Math.PI, (5/6) * Math.PI); ctx.stroke();
  };
});

// ══ PARTICLES ══
const canvas = document.getElementById('particles');
if(canvas) {
  const ctxParticles = canvas.getContext('2d');
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.4 + 0.1;
      const colors = ['#61afef','#98c379','#c678dd','#e5c07b','#56b6c2'];
      this.color = colors[Math.floor(Math.random()*colors.length)];
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
    }
    draw() {
      ctxParticles.save();
      ctxParticles.globalAlpha = this.opacity;
      ctxParticles.fillStyle = this.color;
      ctxParticles.beginPath();
      ctxParticles.arc(this.x, this.y, this.size, 0, Math.PI*2);
      ctxParticles.fill();
      ctxParticles.restore();
    }
  }

  for (let i=0; i<80; i++) particles.push(new Particle());

  function animateParticles() {
    ctxParticles.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();
}

// ══ LINE NUMBERS ══
function generateLineNums(el, count) {
  let html = '';
  for (let i=1;i<=count;i++) html += `<span class="line-num">${i}</span>`;
  if(el) el.innerHTML = html;
}
generateLineNums(document.getElementById('aboutLineNums'), 60);

// ══ MOBILE MENU TOGGLE ══
window.toggleMobileMenu = function() {
  const tabsBar = document.getElementById('tabsBar');
  if(tabsBar) tabsBar.classList.toggle('open');
}

// ══ SECTION NAVIGATION ══
window.showSection = function(name) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.activity-icon').forEach(a => a.classList.remove('active'));
  document.querySelectorAll('.tree-file').forEach(f => f.classList.remove('active'));

  const sec = document.getElementById('section-'+name);
  const tab = document.getElementById('tab-'+name);
  if(sec) sec.classList.add('active');
  if(tab) tab.classList.add('active');

  const tabsBar = document.getElementById('tabsBar');
  if(tabsBar && tabsBar.classList.contains('open')) tabsBar.classList.remove('open');

  const order = ['about','skills','experience','projects','comments'];
  const idx = order.indexOf(name);
  if(idx>=0) {
    const icons = document.querySelectorAll('.activity-icon');
    if(icons[idx]) icons[idx].classList.add('active');
  }

  if(name==='skills') setTimeout(animateSkillBars, 100);
  if(name==='projects') startTyping();

  if(name==='comments') {
    unreadCount = 0;
    const badge = document.getElementById('bellBadge');
    if(badge) badge.classList.remove('show');
  }
}

// ══ SKILLS DATA ══
const technicalSkills = [
  { name: 'Web Development', level: 85, color: '#61afef' },
  { name: 'UI/UX Design', level: 80, color: '#ff79c6' },
  { name: 'Internet of Things (IoT)', level: 88, color: '#98c379' },
  { name: 'Microcontrollers (ESP32/Arduino)', level: 85, color: '#00979D' },
  { name: 'HTML5 & CSS3', level: 88, color: '#e44d26' },
  { name: 'JavaScript', level: 78, color: '#f7df1e' },
  { name: 'PHP (Laravel)', level: 75, color: '#8892be' },
  { name: 'Python', level: 80, color: '#3776ab' },
  { name: 'C++ Programming', level: 75, color: '#00599C' },
  { name: 'Graphic & Multimedia Design', level: 82, color: '#e5c07b' },
  { name: 'Quality Assurance (QA)', level: 70, color: '#56b6c2' },
  { name: 'Network Installation', level: 80, color: '#d19a66' }
];

const softSkills = [
  { name: 'Public Speaking', icon: 'fas fa-microphone' },
  { name: 'Leadership', icon: 'fas fa-crown' },
  { name: 'Problem Solving', icon: 'fas fa-puzzle-piece' },
  { name: 'Teamwork & Collaboration', icon: 'fas fa-users' },
  { name: 'Time Management', icon: 'fas fa-clock' },
  { name: 'Strategic Communications', icon: 'fas fa-bullhorn' },
  { name: 'Public Relations (PR)', icon: 'fas fa-comments' },
  { name: 'Media Relations', icon: 'fas fa-handshake' },
  { name: 'Organizational Skills', icon: 'fas fa-sitemap' },
  { name: 'Operations Management', icon: 'fas fa-tasks' }
];

const sg = document.getElementById('skillsGrid');
if(sg) {
  technicalSkills.forEach(sk => {
    const card = document.createElement('div');
    card.className = 'skill-card';
    card.innerHTML = `
      <div class="skill-name">${sk.name}</div>
      <div style="display:flex;align-items:center;gap:10px">
        <div class="skill-bar-bg" style="flex:1">
          <div class="skill-bar" data-level="${sk.level}" style="background:linear-gradient(90deg,${sk.color},${sk.color}aa)"></div>
        </div>
        <span style="font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-muted)">${sk.level}%</span>
      </div>`;
    sg.appendChild(card);
  });
}

const ssl = document.getElementById('softSkillList');
if(ssl) {
  softSkills.forEach(s => {
    const tag = document.createElement('div');
    tag.className = 'softskill-tag';
    tag.innerHTML = `<i class="${s.icon}"></i> ${s.name}`;
    ssl.appendChild(tag);
  });
}

function animateSkillBars() {
  document.querySelectorAll('.skill-bar').forEach(bar => {
    bar.style.width = bar.dataset.level + '%';
  });
}

// ══ TYPING ANIMATION IN TERMINAL ══
let typingInterval;
function startTyping() {
  const el = document.getElementById('typingCmd');
  if(!el) return;
  const text = 'echo "Stay curious, keep building!" 🚀';
  let i = 0;
  clearInterval(typingInterval);
  el.textContent = '';
  typingInterval = setInterval(() => {
    if(i<text.length) { el.textContent += text[i++]; }
    else clearInterval(typingInterval);
  }, 60);
}

// ══ FIREBASE COMMENTS SYSTEM ══
let comments = [];
let unreadCount = 0;
let initialLoad = true;
const avatarColors = ['#61afef','#98c379','#c678dd','#e5c07b','#56b6c2','#d19a66','#e06c75'];

function getAvatar(name) { return name ? name.charAt(0).toUpperCase() : '?'; }
function getColor(name) {
  let h = 0;
  for(let c of (name||'')) h += c.charCodeAt(0);
  return avatarColors[h % avatarColors.length];
}
function formatTime(ts) {
  const d = new Date(ts);
  return d.toLocaleDateString('id-ID', {day:'2-digit',month:'short',year:'numeric'}) + ' ' + d.toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'});
}
function escHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// Menarik data secara Real-Time dari Firestore
const commentsRef = collection(db, "comments");
const q = query(commentsRef, orderBy("ts", "desc"));

onSnapshot(q, (snapshot) => {
  comments = [];
  snapshot.forEach((doc) => {
    comments.push({ id: doc.id, ...doc.data() });
  });
  
  renderComments();

  // Memunculkan notifikasi jika ada komentar baru masuk saat web sedang dibuka
  if(!initialLoad && comments.length > 0) {
    const newest = comments[0];
    const currentTab = document.querySelector('.tab.active');
    if(currentTab && currentTab.id !== 'tab-comments') {
      showNotification(newest.name, newest.text);
      updateBadge();
    }
  }
  initialLoad = false;
});

window.renderComments = function() {
  const list = document.getElementById('commentList');
  const empty = document.getElementById('emptyState');
  const count = document.getElementById('commentCount');
  if(!list) return;
  
  count.textContent = comments.length;

  // Bersihkan list sebelum di-render ulang
  list.innerHTML = '';
  if(empty) list.appendChild(empty);

  if(comments.length === 0) {
    if(empty) empty.style.display = '';
    return;
  }
  if(empty) empty.style.display = 'none';

  comments.forEach(c => {
    const card = document.createElement('div');
    card.className = 'comment-card';
    const color = getColor(c.name);
    card.innerHTML = `
      <div class="comment-header">
        <div class="comment-avatar" style="background:${color}22;color:${color};border:2px solid ${color}44">${getAvatar(c.name)}</div>
        <div>
          <div class="comment-author">${escHtml(c.name)}</div>
          <div class="comment-email">${c.email ? escHtml(c.email) : 'Anonymous'}</div>
        </div>
        <div class="comment-time"><i class="fas fa-clock"></i> ${formatTime(c.ts)}</div>
      </div>
      <div class="comment-text">${escHtml(c.text)}</div>`;
    list.appendChild(card);
  });
}

// Mengirim Komentar ke Firestore
window.submitComment = async function() {
  const nameInput = document.getElementById('commentName');
  const emailInput = document.getElementById('commentEmail');
  const textInput = document.getElementById('commentText');
  const btnSubmit = document.querySelector('.form-submit');

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const text = textInput.value.trim();

  if(!name) { shakeInput('commentName'); return; }
  if(!text) { shakeInput('commentText'); return; }

  // Ubah tombol jadi loading
  const originalBtnText = btnSubmit.innerHTML;
  btnSubmit.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Sending...`;
  btnSubmit.disabled = true;

  try {
    await addDoc(collection(db, "comments"), {
      name: name,
      email: email,
      text: text,
      ts: Date.now()
    });

    // Reset Form
    nameInput.value = '';
    emailInput.value = '';
    textInput.value = '';
    if(document.getElementById('commentContact')) document.getElementById('commentContact').value = '';
    
  } catch (error) {
    console.error("Error adding document: ", error);
    alert("Gagal mengirim komentar. Silakan coba lagi.");
  } finally {
    btnSubmit.innerHTML = originalBtnText;
    btnSubmit.disabled = false;
  }
}

function shakeInput(id) {
  const el = document.getElementById(id);
  if(!el) return;
  el.style.borderColor = 'var(--accent-red)';
  el.style.animation = 'shake 0.4s ease';
  setTimeout(() => { el.style.borderColor=''; el.style.animation=''; }, 500);
}

function showNotification(author, message) {
  const stack = document.getElementById('notifStack');
  if(!stack) return;
  const notif = document.createElement('div');
  notif.className = 'notification';
  notif.innerHTML = `
    <i class="fas fa-comment-dots notif-icon"></i>
    <div>
      <div class="notif-title">💬 New Comment from ${escHtml(author)}</div>
      <div class="notif-body">${escHtml(message.substring(0,60))}${message.length>60?'…':''}</div>
    </div>`;
  stack.appendChild(notif);
  notif.onclick = () => dismissNotif(notif);
  setTimeout(() => dismissNotif(notif), 5000);
}

function dismissNotif(el) {
  el.classList.add('exiting');
  setTimeout(() => el.remove(), 350);
}

function updateBadge() {
  unreadCount++;
  const badge = document.getElementById('bellBadge');
  if(badge) {
    badge.textContent = unreadCount;
    badge.classList.add('show');
  }
}

setTimeout(() => {
  const lb = document.getElementById('loading-bar');
  if(lb) { lb.style.opacity='0'; lb.style.transition='opacity 0.5s'; setTimeout(()=>lb.remove(),500); }
}, 1200);

const style = document.createElement('style');
style.textContent = '@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}';
document.head.appendChild(style);

// ══ CUSTOM CURSOR ══
(function() {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  const trailCanvas = document.getElementById('cursor-trail-canvas');
  if(!dot || !ring || !trailCanvas) return;
  const tCtx = trailCanvas.getContext('2d');

  function resizeTrail() {
    trailCanvas.width  = window.innerWidth;
    trailCanvas.height = window.innerHeight;
  }
  resizeTrail();
  window.addEventListener('resize', resizeTrail);

  let mouseX = window.innerWidth/2, mouseY = window.innerHeight/2;
  let ringX  = mouseX, ringY = mouseY;
  let dotX   = mouseX, dotY  = mouseY;

  const TRAIL_LEN = 20;
  const trail = [];
  for (let i=0;i<TRAIL_LEN;i++) trail.push({x:mouseX,y:mouseY});

  document.addEventListener('mousemove', e => { mouseX=e.clientX; mouseY=e.clientY; });
  document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
  document.addEventListener('mouseup',   () => document.body.classList.remove('cursor-click'));

  const hoverSel = 'a,button,.tab,.activity-icon,.tree-file,.skill-card,.contact-card,.timeline-item,.dot,.logo-placeholder,.softskill-tag,.form-submit,.comment-card,.social-link';
  const textSel  = 'input,textarea,select';

  document.addEventListener('mouseover', e => {
    if (e.target.closest(textSel)) {
      document.body.classList.remove('cursor-hover');
      document.body.classList.add('cursor-text');
    } else if (e.target.closest(hoverSel)) {
      document.body.classList.remove('cursor-text');
      document.body.classList.add('cursor-hover');
    }
  });
  document.addEventListener('mouseout', e => {
    if (!e.target.closest(hoverSel) && !e.target.closest(textSel)) {
      document.body.classList.remove('cursor-hover','cursor-text');
    }
  });

  const trailColors = [[97,175,239],[86,182,194],[152,195,121],[198,120,221],[229,192,123],[209,154,102]];
  let colorT = 0;

  function lerpColor(a,b,t){ return [a[0]+(b[0]-a[0])*t, a[1]+(b[1]-a[1])*t, a[2]+(b[2]-a[2])*t]; }
  function getColorStr(t){
    t = ((t % 1)+1)%1;
    const ci = Math.floor(t*trailColors.length)%trailColors.length;
    const ni = (ci+1)%trailColors.length;
    const lt = (t*trailColors.length)%1;
    const [r,g,b] = lerpColor(trailColors[ci],trailColors[ni],lt);
    return `${Math.round(r)},${Math.round(g)},${Math.round(b)}`;
  }

  const sparks = [];
  document.addEventListener('click', e => {
    for (let i=0;i<12;i++){
      const angle=(Math.PI*2/12)*i+Math.random()*0.5;
      sparks.push({
        x:e.clientX, y:e.clientY,
        vx:Math.cos(angle)*(1.5+Math.random()*3.5),
        vy:Math.sin(angle)*(1.5+Math.random()*3.5),
        alpha:1, size:1.5+Math.random()*2.5,
        color:trailColors[Math.floor(Math.random()*trailColors.length)]
      });
    }
  });

  function animate(){
    dotX += (mouseX-dotX)*0.9; dotY += (mouseY-dotY)*0.9;
    dot.style.left = dotX+'px'; dot.style.top  = dotY+'px';
    ringX += (mouseX-ringX)*0.1; ringY += (mouseY-ringY)*0.1;
    ring.style.left = ringX+'px'; ring.style.top  = ringY+'px';

    trail.unshift({x:dotX,y:dotY});
    if(trail.length>TRAIL_LEN) trail.pop();

    colorT += 0.004;
    tCtx.clearRect(0,0,trailCanvas.width,trailCanvas.height);

    for(let i=1;i<trail.length;i++){
      const a = (1-i/TRAIL_LEN)*0.6;
      const w = (1-i/TRAIL_LEN)*3.5;
      const col = getColorStr(colorT - i*0.05);
      tCtx.save();
      tCtx.globalAlpha = a; tCtx.strokeStyle = `rgba(${col},1)`;
      tCtx.lineWidth = w; tCtx.lineCap = 'round';
      tCtx.shadowColor = `rgba(${col},0.7)`; tCtx.shadowBlur = 8;
      tCtx.beginPath();
      tCtx.moveTo(trail[i-1].x, trail[i-1].y);
      tCtx.lineTo(trail[i].x,   trail[i].y);
      tCtx.stroke();
      tCtx.restore();
    }

    for(let i=sparks.length-1;i>=0;i--){
      const s=sparks[i];
      s.x+=s.vx; s.y+=s.vy; s.vy+=0.18; s.vx*=0.97; s.alpha-=0.04;
      if(s.alpha<=0){sparks.splice(i,1);continue;}
      tCtx.save();
      tCtx.globalAlpha=s.alpha;
      tCtx.fillStyle=`rgb(${s.color[0]},${s.color[1]},${s.color[2]})`;
      tCtx.shadowColor=`rgba(${s.color[0]},${s.color[1]},${s.color[2]},0.9)`;
      tCtx.shadowBlur=10;
      tCtx.beginPath();
      tCtx.arc(s.x,s.y,s.size,0,Math.PI*2);
      tCtx.fill();
      tCtx.restore();
    }
    requestAnimationFrame(animate);
  }
  animate();
})();