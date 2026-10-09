// @ts-nocheck
/**
 * MysuruBus Saathi - Core Logic Engine
 * Full implementation of KSRTC Mysuru City Bus companion
 */

// Window types and globals
declare global {
  interface Window {
    [key: string]: any;
  }
}


// ── DATA ──
const ROUTES = {
  'CBS|Chamundi Betta': { no: '101*', time: '45 min', freq: 'Every 20 min', crowd: 'Low', fare: 30, stops: ['CBS', 'Devaraja Market', 'Zoo', 'Chamundi Foothills', 'Chamundi Betta'] },
  'CBS|Mysore Palace': { no: '102*', time: '10 min', freq: 'Every 10 min', crowd: 'Moderate', fare: 15, stops: ['CBS', 'Devaraja Market', 'Mysore Palace'] },
  'CBS|Gokulam':       { no: '103*', time: '25 min', freq: 'Every 15 min', crowd: 'Low',  fare: 20, stops: ['CBS', 'Vontikoppal', 'Gokulam'] },
  'CBS|Hebbal':        { no: '104*', time: '30 min', freq: 'Every 25 min', crowd: 'Low',  fare: 22, stops: ['CBS', 'Bannimantap', 'Hebbal'] },
  'CBS|Vijayanagar':   { no: '105*', time: '20 min', freq: 'Every 15 min', crowd: 'High', fare: 18, stops: ['CBS', 'Lakshmipuram', 'Vijayanagar'] },
  'CBS|Kuvempunagar':  { no: '106*', time: '20 min', freq: 'Every 20 min', crowd: 'Low',  fare: 15, stops: ['CBS', 'Saraswathipuram', 'Kuvempunagar'] },
  'CBS|Saraswathipuram':{ no: '107*', time: '15 min', freq: 'Every 20 min', crowd: 'Low',  fare: 18, stops: ['CBS', 'Lakshmipuram', 'Saraswathipuram'] },
  'CBS|Siddarthanagar':{ no: '108*', time: '20 min', freq: 'Every 20 min', crowd: 'Moderate', fare: 20, stops: ['CBS', 'Jayalakshmipuram', 'Siddarthanagar'] },
  'CBS|Yadavagiri':    { no: '110', time: '30 min', freq: 'Every 30 min', crowd: 'Low',  fare: 25, stops: ['CBS', 'Kuvempunagar', 'Yadavagiri'] },
  'CBS|Bogadi':        { no: '111', time: '35 min', freq: 'Every 30 min', crowd: 'Low',  fare: 28, stops: ['CBS', 'Vijayanagar', 'Bogadi'] },
  'CBS|Bannimantap':   { no: '112', time: '10 min', freq: 'Every 10 min', crowd: 'Low',  fare: 15, stops: ['CBS', 'Bannimantap'] },
  'CBS|Nanjangud Road':{ no: '113', time: '40 min', freq: 'Every 30 min', crowd: 'Low',  fare: 35, stops: ['CBS', 'Nanjangud Road'] },
  'CBS|Lakshmipuram':  { no: '114', time: '12 min', freq: 'Every 15 min', crowd: 'Moderate', fare: 18, stops: ['CBS', 'Lakshmipuram'] },
};

const TIMINGS = {
  '101': { route: 'CBS → Chamundi Betta', times: [
    { time:'06:00 AM', badge:'first', type:'First Bus' },
    { time:'06:30 AM', badge:'running', type:'Running' },
    { time:'07:00 AM', badge:'running', type:'Running' },
    { time:'07:30 AM', badge:'running', type:'Running' },
    { time:'08:00 AM', badge:'running', type:'Running' },
    { time:'09:00 AM', badge:'running', type:'Running' },
    { time:'10:30 AM', badge:'running', type:'Running' },
    { time:'12:00 PM', badge:'running', type:'Running' },
    { time:'02:00 PM', badge:'running', type:'Running' },
    { time:'04:00 PM', badge:'running', type:'Running' },
    { time:'06:00 PM', badge:'running', type:'Running' },
    { time:'07:30 PM', badge:'running', type:'Running' },
    { time:'09:00 PM', badge:'last', type:'Last Bus' },
  ]},
  '102': { route: 'CBS → Mysore Palace', times: [
    { time:'05:30 AM', badge:'first', type:'First Bus' },
    { time:'06:00 AM', badge:'running', type:'Running' },
    { time:'07:00 AM', badge:'running', type:'Running' },
    { time:'08:00 AM', badge:'running', type:'Running' },
    { time:'09:00 AM', badge:'running', type:'Running' },
    { time:'10:00 AM', badge:'running', type:'Running' },
    { time:'11:00 AM', badge:'running', type:'Running' },
    { time:'12:00 PM', badge:'running', type:'Running' },
    { time:'01:00 PM', badge:'running', type:'Running' },
    { time:'02:00 PM', badge:'running', type:'Running' },
    { time:'03:00 PM', badge:'running', type:'Running' },
    { time:'04:00 PM', badge:'running', type:'Running' },
    { time:'05:00 PM', badge:'running', type:'Running' },
    { time:'06:00 PM', badge:'running', type:'Running' },
    { time:'07:00 PM', badge:'running', type:'Running' },
    { time:'08:00 PM', badge:'running', type:'Running' },
    { time:'09:30 PM', badge:'last', type:'Last Bus' },
  ]},
  '103': { route: 'CBS → Gokulam', times: [
    { time:'06:00 AM', badge:'first', type:'First Bus' },
    { time:'07:30 AM', badge:'running', type:'Running' },
    { time:'09:00 AM', badge:'running', type:'Running' },
    { time:'11:00 AM', badge:'running', type:'Running' },
    { time:'01:00 PM', badge:'running', type:'Running' },
    { time:'03:00 PM', badge:'running', type:'Running' },
    { time:'05:00 PM', badge:'running', type:'Running' },
    { time:'07:00 PM', badge:'running', type:'Running' },
    { time:'09:00 PM', badge:'last', type:'Last Bus' },
  ]},
  '104': { route: 'CBS → Hebbal', times: [
    { time:'06:30 AM', badge:'first', type:'First Bus' },
    { time:'08:00 AM', badge:'running', type:'Running' },
    { time:'10:00 AM', badge:'running', type:'Running' },
    { time:'12:30 PM', badge:'running', type:'Running' },
    { time:'03:00 PM', badge:'running', type:'Running' },
    { time:'05:30 PM', badge:'running', type:'Running' },
    { time:'08:00 PM', badge:'last', type:'Last Bus' },
  ]},
  '105': { route: 'CBS → Vijayanagar', times: [
    { time:'05:45 AM', badge:'first', type:'First Bus' },
    { time:'06:30 AM', badge:'running', type:'Running' },
    { time:'07:00 AM', badge:'running', type:'Running' },
    { time:'08:00 AM', badge:'running', type:'Running' },
    { time:'09:00 AM', badge:'running', type:'Running' },
    { time:'10:00 AM', badge:'running', type:'Running' },
    { time:'12:00 PM', badge:'running', type:'Running' },
    { time:'02:00 PM', badge:'running', type:'Running' },
    { time:'04:00 PM', badge:'running', type:'Running' },
    { time:'06:00 PM', badge:'running', type:'Running' },
    { time:'09:00 PM', badge:'last', type:'Last Bus' },
  ]},
  '106': { route: 'CBS → Kuvempunagar', times: [
    { time:'06:15 AM', badge:'first', type:'First Bus' },
    { time:'07:30 AM', badge:'running', type:'Running' },
    { time:'09:00 AM', badge:'running', type:'Running' },
    { time:'11:00 AM', badge:'running', type:'Running' },
    { time:'01:00 PM', badge:'running', type:'Running' },
    { time:'03:30 PM', badge:'running', type:'Running' },
    { time:'06:00 PM', badge:'running', type:'Running' },
    { time:'09:00 PM', badge:'last', type:'Last Bus' },
  ]},
  '107': { route: 'CBS → Saraswathipuram', times: [
    { time:'06:15 AM', badge:'first', type:'First Bus' },
    { time:'07:45 AM', badge:'running', type:'Running' },
    { time:'09:30 AM', badge:'running', type:'Running' },
    { time:'12:00 PM', badge:'running', type:'Running' },
    { time:'02:30 PM', badge:'running', type:'Running' },
    { time:'05:00 PM', badge:'running', type:'Running' },
    { time:'07:30 PM', badge:'running', type:'Running' },
    { time:'09:15 PM', badge:'last', type:'Last Bus' },
  ]},
  '108': { route: 'CBS → Siddarthanagar', times: [
    { time:'06:00 AM', badge:'first', type:'First Bus' },
    { time:'07:15 AM', badge:'running', type:'Running' },
    { time:'08:45 AM', badge:'running', type:'Running' },
    { time:'11:30 AM', badge:'running', type:'Running' },
    { time:'02:00 PM', badge:'running', type:'Running' },
    { time:'04:30 PM', badge:'running', type:'Running' },
    { time:'07:00 PM', badge:'running', type:'Running' },
    { time:'09:00 PM', badge:'last', type:'Last Bus' },
  ]},
};

const FARE_MAP = {
  'CBS (City Bus Stand)|Chamundi Betta': 30,
  'CBS (City Bus Stand)|Mysore Palace': 15,
  'CBS (City Bus Stand)|Gokulam': 20,
  'CBS (City Bus Stand)|Hebbal': 22,
  'CBS (City Bus Stand)|Vijayanagar': 18,
  'CBS (City Bus Stand)|Kuvempunagar': 15,
  'Mysore Palace|Chamundi Betta': 20,
  'Mysore Palace|Gokulam': 25,
  'Chamundi Betta|CBS (City Bus Stand)': 30,
  'Gokulam|CBS (City Bus Stand)': 20,
  'Hebbal|CBS (City Bus Stand)': 22,
  'Vijayanagar|CBS (City Bus Stand)': 18,
  'Kuvempunagar|CBS (City Bus Stand)': 15,
};

// ── TAB SWITCHING ──
function showTab(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  const page = document.getElementById('page-' + name);
  if (page) page.classList.add('active');
  const btns = document.querySelectorAll('.tab-btn');
  const labels = ['home','tickets','routes','timings','crowd','nextbus','fares','pass','lost'];
  const idx = labels.indexOf(name);
  if (idx >= 0 && btns[idx]) btns[idx].classList.add('active');
  window.scrollTo(0, 0);
  if (name === 'tickets' && typeof initTicketsPage === 'function') {
    initTicketsPage();
  }
}

// ── ROUTE FINDER ──
function findRoutes() {
  const from = document.getElementById('from-stop').value;
  const to = document.getElementById('to-stop').value;
  const key = from + '|' + to;
  const revKey = to + '|' + from;
  const results = document.getElementById('route-results');
  results.innerHTML = '<div class="section-header">✅ Available Routes</div>';
  results.classList.add('show');

  let route = ROUTES[key] || ROUTES[revKey];
  if (!route) {
    // generate a plausible route
    route = { no: '1' + Math.floor(Math.random()*50+10), time: Math.floor(Math.random()*30+10)+' min', freq: 'Every 30 min', crowd: 'Low', fare: Math.floor(Math.random()*20+15), stops: [from, 'Devaraja Market', to] };
  }

  const crowdClass = route.crowd === 'Low' ? '' : route.crowd === 'Moderate' ? 'busy' : 'full';
  const dotClass = route.crowd === 'Low' ? 'green' : route.crowd === 'Moderate' ? 'yellow' : 'red';

  results.innerHTML += `
    <div class="result-card ${crowdClass}" onclick="showRouteDetail('${route.no}','${from}','${to}',${route.fare},'${route.time}','${route.freq}','${route.crowd}')">
      <div class="result-info">
        <h4>🚌 Route ${route.no}</h4>
        <p>${from} → ${to}</p>
        <p>⏱️ ${route.time} · ${route.freq}</p>
      </div>
      <div class="result-meta">
        <div class="fare-badge">₹${route.fare}</div>
        <div class="crowd-dot"><span class="dot ${dotClass}"></span>${route.crowd} crowd</div>
      </div>
    </div>
  `;

  // Show alternate if exists
  results.innerHTML += `
    <div class="result-card busy" onclick="showToast('Alternate route details coming soon!')">
      <div class="result-info">
        <h4>🚌 Alternate Route</h4>
        <p>${from} → ${to} (via City Centre)</p>
        <p>⏱️ +10 min · Less frequent</p>
      </div>
      <div class="result-meta">
        <div class="fare-badge">₹${route.fare + 5}</div>
        <div class="crowd-dot"><span class="dot yellow"></span>Moderate</div>
      </div>
    </div>
  `;
}

function showRouteDetail(no, from, to, fare, time, freq, crowd) {
  document.getElementById('modal-title').textContent = 'Route ' + no + ' Details';
  document.getElementById('modal-body').innerHTML = `
    <div class="detail-row"><span>From</span><span>${from}</span></div>
    <div class="detail-row"><span>To</span><span>${to}</span></div>
    <div class="detail-row"><span>Route No.</span><span>${no}</span></div>
    <div class="detail-row"><span>Travel Time</span><span>${time}</span></div>
    <div class="detail-row"><span>Frequency</span><span>${freq}</span></div>
    <div class="detail-row"><span>Current Crowd</span><span>${crowd}</span></div>
    <div class="detail-row"><span>🎟️ Fare</span><span style="color:var(--orange);font-weight:800;font-size:1.1rem;">₹${fare}</span></div>
    <div class="detail-row"><span>Depot</span><span>CBS (City Bus Stand)</span></div>
  `;
  document.getElementById('modal').classList.add('open');
}

function swapStops() {
  const from = document.getElementById('from-stop');
  const to = document.getElementById('to-stop');
  const tmp = from.value;
  from.value = to.value;
  to.value = tmp;
}

function fillRoute(from, to) {
  showTab('routes');
  setTimeout(() => {
    document.getElementById('from-stop').value = from;
    document.getElementById('to-stop').value = to;
    findRoutes();
  }, 100);
}

// ── TIMINGS ──
function loadTimings(val) {
  const cont = document.getElementById('timings-result');
  if (!val) { cont.innerHTML = ''; return; }
  const cleanVal = String(val).replace('*', '');
  const data = TIMINGS[val] || TIMINGS[cleanVal];
  if (!data) { cont.innerHTML = '<p style="color:var(--muted);text-align:center;margin-top:20px;">No data available.</p>'; return; }

  const displayVal = val.includes('*') ? val : (['101','102','103','104','105','106','107','108'].includes(cleanVal) ? cleanVal + '*' : val);
  let html = `<div class="stop-card"><h4>🚌 Route ${displayVal} · ${data.route}</h4>`;
  data.times.forEach(t => {
    html += `<div class="timing-row">
      <span class="route-no">Route ${displayVal}</span>
      <span class="time">${t.time}</span>
      <span class="badge ${t.badge}">${t.type}</span>
    </div>`;
  });
  html += '</div>';
  cont.innerHTML = html;
}

// ── CROWD ──
function renderSeats(id, taken, total) {
  const el = document.getElementById(id);
  if (!el) return;
  let html = '';
  for (let i = 0; i < total; i++) {
    html += `<div class="seat${i < taken ? ' taken' : ''}"></div>`;
  }
  el.innerHTML = html;
}
renderSeats('seats-1', 12, 40);
renderSeats('seats-2', 29, 40);
renderSeats('seats-3', 38, 40);

function refreshCrowd() {
  showToast('🔄 Crowd data refreshed!');
}

// ── NEXT BUS ──
function estimateNext() {
  const from = document.getElementById('nb-from').value;
  const to = document.getElementById('nb-to').value;
  const mins = Math.floor(Math.random() * 18 + 2);
  const after = mins + Math.floor(Math.random() * 20 + 15);
  document.getElementById('next-bus-result').innerHTML = `
    <div class="next-bus-hero">
      <div class="label">Next bus from ${from} → ${to}</div>
      <div class="arrives">${mins}</div>
      <div class="min-label">minutes away</div>
      <div class="route-info">🚌 After that: <strong>${after} min</strong> &nbsp;|&nbsp; Fare: <strong style="color:var(--gold);">₹${Math.floor(Math.random()*20+15)}</strong></div>
    </div>
    <div class="result-card">
      <div class="result-info">
        <h4>🌙 Last Bus Info</h4>
        <p>${from} → ${to}</p>
        <p>Stay worry-free, plan your return!</p>
      </div>
      <div class="result-meta">
        <div class="fare-badge">9:30 PM</div>
        <div class="crowd-dot" style="color:var(--muted)">Last Bus</div>
      </div>
    </div>
  `;
}

// ── FARE CALCULATOR ──
function calcFare() {
  const from = document.getElementById('fc-from').value;
  const to = document.getElementById('fc-to').value;
  const key = from + '|' + to;
  const revKey = to + '|' + from;
  const fare = FARE_MAP[key] || FARE_MAP[revKey] || Math.floor(Math.random() * 20 + 15);
  document.getElementById('fare-result').style.display = 'block';
  document.getElementById('fare-amount').textContent = '₹' + fare;
}

// ── MODAL ──
function closeModal(e) {
  if (e.target === document.getElementById('modal')) closeModalDirect();
}
function closeModalDirect() {
  document.getElementById('modal').classList.remove('open');
}

// ── TOAST ──
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}


// Script 1 exports
(window as any).ROUTES = ROUTES;
(window as any).TIMINGS = TIMINGS;
(window as any).FARE_MAP = FARE_MAP;
(window as any).showTab = showTab;
(window as any).findRoutes = findRoutes;
(window as any).showRouteDetail = showRouteDetail;
(window as any).swapStops = swapStops;
(window as any).fillRoute = fillRoute;
(window as any).loadTimings = loadTimings;
(window as any).renderSeats = renderSeats;
(window as any).refreshCrowd = refreshCrowd;
(window as any).estimateNext = estimateNext;
(window as any).calcFare = calcFare;
(window as any).closeModal = closeModal;
(window as any).closeModalDirect = closeModalDirect;
(window as any).showToast = showToast;


// ── LOGIN SCREEN ──
let currentUser = null;

const GOOGLE_ICON_SVG = '<svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.98 13.72 18.05 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-2.22-.2-4.36-.57-6.42H24v12.18h12.94c-.56 3.01-2.26 5.56-4.82 7.27l7.73 6c4.51-4.16 7.11-10.28 7.11-17.63z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-5.95 0-10.99-4.02-12.79-9.44l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>';

const USER_GOOGLE_ACCOUNTS = [
  { email: 'arjun.mysuru@gmail.com', initial: 'A', color: '#F26522' },
  { email: 'priya.saathi@gmail.com', initial: 'P', color: '#4B1E8F' }
];
const EMP_GOOGLE_ACCOUNTS = [
  { email: 'emp.driver01@ksrtc.in', initial: 'D', color: '#27AE60' },
  { email: 'conductor.mysuru@ksrtc.in', initial: 'C', color: '#F5A623' }
];

function truncateEmail(email) {
  if (!email) return '';
  return email.length > 14 ? email.slice(0, 14) + '...' : email;
}

function hideAppChrome() {
  const nav = document.querySelector('nav'); if (nav) (nav as HTMLElement).style.display = 'none';
  const tabs = document.querySelector('.tabs'); if (tabs) (tabs as HTMLElement).style.display = 'none';
  document.querySelectorAll('.page').forEach(p => { (p as HTMLElement).style.display = 'none'; });
  const footer = document.querySelector('.footer-bar'); if (footer) (footer as HTMLElement).style.display = 'none';
  const toast = document.getElementById('toast'); if (toast) toast.style.display = 'none';
  const modal = document.getElementById('modal'); if (modal) modal.style.display = 'none';
}

function applyEmployeeTabRestrictions() {
  const isEmployee = currentUser && currentUser.type === 'employee';
  const restricted = [
    { tab: '.tab-btn[onclick*="tickets"]', page: '#page-tickets' },
    { tab: '.tab-btn[onclick*="routes"]', page: '#page-routes' },
    { tab: '.tab-btn[onclick*="timings"]', page: '#page-timings' },
    { tab: '.tab-btn[onclick*="nextbus"]', page: '#page-nextbus' },
    { tab: '.tab-btn[onclick*="fares"]', page: '#page-fares' },
    { tab: '.tab-btn[onclick*="pass"]', page: '#page-pass' },
    { tab: '#tab-plan-btn', page: '#page-plan' }
  ];
  restricted.forEach(function (item) {
    const tabEl = document.querySelector(item.tab);
    const pageEl = document.querySelector(item.page);
    if (tabEl) tabEl.style.display = isEmployee ? 'none' : '';
    if (pageEl) pageEl.style.display = isEmployee ? 'none' : '';
  });
}

function showAppChrome() {
  const nav = document.querySelector('nav'); if (nav) (nav as HTMLElement).style.display = '';
  const tabs = document.querySelector('.tabs'); if (tabs) (tabs as HTMLElement).style.display = '';
  document.querySelectorAll('.page').forEach(p => { (p as HTMLElement).style.display = ''; });
  const footer = document.querySelector('.footer-bar'); if (footer) (footer as HTMLElement).style.display = '';
  const toast = document.getElementById('toast'); if (toast) toast.style.display = '';
  const modal = document.getElementById('modal'); if (modal) modal.style.display = '';
  applyEmployeeTabRestrictions();
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-home').classList.add('active');
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  const homeTab = document.querySelector('.tab-btn[onclick*="home"]') || document.querySelector('.tab-btn');
  if (homeTab) homeTab.classList.add('active');
}

function buildGoogleAccountRows(accounts, onSelect) {
  return accounts.map(acc =>
    `<div class="google-account-row" data-email="${acc.email}" style="display:flex;align-items:center;gap:12px;padding:10px 14px;border-radius:10px;cursor:pointer;border:1px solid #E5E7EB;margin-bottom:6px;background:#fff;">
      <div style="width:36px;height:36px;border-radius:50%;background:${acc.color};color:#fff;font-weight:700;font-size:0.9rem;display:flex;align-items:center;justify-content:center;flex-shrink:0;">${acc.initial}</div>
      <span style="font-size:0.88rem;color:#1A1A2E;">${acc.email}</span>
    </div>`
  ).join('');
}

function injectLoginOverlay() {
  const overlay = document.createElement('div');
  overlay.id = 'login-overlay';

  overlay.innerHTML = `
    <div class="login-card">
      <div style="text-align:center;">
        <div class="ksrtc-login-badge">
          <span style="font-size:0.75rem;font-weight:700;color:var(--orange);letter-spacing:0.5px;display:block;">ಕರ್ನಾಟಕ ರಾಜ್ಯ ರಸ್ತೆ ಸಾರಿಗೆ ನಿಗಮ</span>
          <span style="font-size:0.68rem;font-weight:700;color:#6B7280;letter-spacing:0.8px;">KSRTC MYSURU CITY DIVISION</span>
        </div>
        <div style="width:52px;height:52px;background:linear-gradient(135deg,var(--orange),var(--deep-orange));border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:26px;margin:10px auto 6px;box-shadow:0 4px 14px rgba(242,101,34,0.35);">🚌</div>
        <div style="font-family:'Baloo 2',cursive;font-weight:800;font-size:1.55rem;color:#4B1E8F;margin-top:4px;text-align:center;">MysuruBus <span style="color:#F5A623">Saathi</span></div>
        <p style="font-size:0.85rem;color:#6B7280;text-align:center;margin-bottom:20px;">Your smart bus companion for Mysuru</p>
      </div>
      <div class="login-toggle-row">
        <button type="button" id="toggle-user" class="active" style="border-radius:10px 0 0 10px;">👤 User Login</button>
        <button type="button" id="toggle-emp" style="border-radius:0 10px 10px 0;">🧑‍💼 Employee Login</button>
      </div>
      <div id="form-user">
        <h2 id="user-auth-heading" class="user-auth-heading">Welcome Back 👋</h2>
        <input type="text" id="user-name" placeholder="Full Name" autocomplete="name" style="display:none;">
        <div class="field-group" id="phone-wrapper" style="display:flex; gap:8px; margin-bottom:10px;">
          <span style="padding:12px; border:1.5px solid #E5E7EB; border-radius:10px; background:#FAFAFA; font-size:0.92rem; font-weight:600; color:#6B7280; display:flex; align-items:center;">+91</span>
          <input type="tel" id="user-phone" placeholder="Phone Number" maxlength="10" autocomplete="tel" style="flex:1; padding:12px; border:1.5px solid #E5E7EB; border-radius:10px; font-size:0.92rem; font-family:'Inter', sans-serif; background:#FAFAFA; color:#1A1A2E; box-sizing:border-box;">
        </div>
        <div class="pwd-wrap">
          <input type="password" id="user-password" class="pwd-inner" placeholder="Password" autocomplete="current-password">
          <button type="button" class="pwd-eye" data-target="user-password" aria-label="Show password">👁</button>
        </div>
        <div class="pwd-wrap" id="confirm-pwd-wrap" style="display:none;">
          <input type="password" id="user-confirm-password" class="pwd-inner" placeholder="Confirm Password" autocomplete="new-password">
          <button type="button" class="pwd-eye" data-target="user-confirm-password" aria-label="Show password">👁</button>
        </div>
        <div id="user-error" style="color:#E74C3C;font-size:0.8rem;display:none;margin-top:4px;">Please fill in all fields.</div>
        <button type="button" id="btn-user-login" style="width:100%;background:linear-gradient(135deg,#F26522,#C94E0A);color:#fff;padding:14px;border-radius:12px;font-family:'Baloo 2',cursive;font-weight:700;font-size:1rem;border:none;cursor:pointer;margin-top:8px;">Login →</button>
        <a href="#" id="auth-mode-link" class="auth-mode-link">New user? Create Account →</a>
      </div>
      <div id="form-emp" style="display:none;">
        <input type="text" id="emp-id" placeholder="Enter Employee ID" autocomplete="username">
        <input type="password" id="emp-password" placeholder="Enter Password" autocomplete="current-password">
        <div id="emp-error" style="color:#E74C3C;font-size:0.8rem;display:none;margin-top:4px;">Please fill in all fields.</div>
        <button type="button" id="btn-emp-login" style="width:100%;background:linear-gradient(135deg,#F26522,#C94E0A);color:#fff;padding:14px;border-radius:12px;font-family:'Baloo 2',cursive;font-weight:700;font-size:1rem;border:none;cursor:pointer;margin-top:8px;">Login as Employee</button>
      </div>
    </div>
  `;

  document.body.insertBefore(overlay, document.body.firstChild);
  bindLoginEvents(overlay);
}

function bindLoginEvents(overlay) {
  const toggleUser = document.getElementById('toggle-user');
  const toggleEmp = document.getElementById('toggle-emp');
  const formUser = document.getElementById('form-user');
  const formEmp = document.getElementById('form-emp');

  toggleUser.addEventListener('click', () => {
    toggleUser.classList.add('active');
    toggleEmp.classList.remove('active');
    formUser.style.display = 'block';
    formEmp.style.display = 'none';
  });
  toggleEmp.addEventListener('click', () => {
    toggleEmp.classList.add('active');
    toggleUser.classList.remove('active');
    formEmp.style.display = 'block';
    formUser.style.display = 'none';
  });

  document.getElementById('btn-user-login').addEventListener('click', () => {
    const name = document.getElementById('user-name').value.trim();
    const phone = document.getElementById('user-phone').value.trim();
    const err = document.getElementById('user-error');
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      err.textContent = 'Please enter a valid 10-digit phone number starting with 6, 7, 8, or 9.';
      err.style.display = 'block';
      return;
    }
    const pass = document.getElementById('user-password').value;
    if (!name || !phone || !pass) {
      err.textContent = 'Please fill in all fields.';
      err.style.display = 'block';
      return;
    }
    err.style.display = 'none';
    loginAsUser(name, phone);
  });

  document.getElementById('btn-emp-login').addEventListener('click', () => {
    const id = document.getElementById('emp-id').value.trim();
    const pass = document.getElementById('emp-password').value;
    const err = document.getElementById('emp-error');
    if (!id || !pass) {
      err.textContent = 'Please fill in all fields.';
      err.style.display = 'block';
      return;
    }
    err.style.display = 'none';
    loginAsEmployee(id);
  });
}

function ensureLogoutButton() {
  if (document.getElementById('user-menu-container')) return;
  const navLinks = document.querySelector('.nav-links');
  if (!navLinks) return;

  const li = document.createElement('li');
  li.className = 'user-menu-container';
  li.id = 'user-menu-container';

  li.innerHTML = `
    <button type="button" id="user-profile-btn" class="user-profile-btn" aria-haspopup="true" aria-expanded="false" title="Click to view account & logout">
      <span class="user-avatar-badge" id="user-avatar-badge">👤</span>
      <span class="user-name-label" id="user-name-label">User</span>
      <span class="user-caret">▾</span>
    </button>
    
    <div class="user-dropdown-menu" id="user-dropdown-menu">
      <div class="user-dropdown-header">
        <div class="dropdown-avatar-circle" id="dropdown-avatar-circle">U</div>
        <div class="dropdown-user-info">
          <div class="dropdown-user-name" id="dropdown-user-name">User Account</div>
          <div class="dropdown-user-sub" id="dropdown-user-sub">KSRTC Passenger</div>
        </div>
      </div>
      <div class="user-dropdown-divider"></div>
      <button type="button" class="user-dropdown-item" id="dropdown-bookings-btn">
        <span class="dropdown-item-icon">🎟️</span>
        <span class="dropdown-item-text">My Bookings</span>
      </button>
      <button type="button" class="user-dropdown-item logout-item" id="dropdown-logout-btn">
        <span class="dropdown-item-icon">🚪</span>
        <span class="dropdown-item-text">Logout & Switch Account</span>
      </button>
    </div>
  `;

  navLinks.appendChild(li);

  const profileBtn = li.querySelector('#user-profile-btn');
  const dropdown = li.querySelector('#user-dropdown-menu');
  const logoutBtn = li.querySelector('#dropdown-logout-btn');
  const bookingsBtn = li.querySelector('#dropdown-bookings-btn');

  if (bookingsBtn) {
    bookingsBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (dropdown) dropdown.classList.remove('open');
      if (profileBtn) profileBtn.classList.remove('active');
      if (typeof (window as any).openBookingsModal === 'function') {
        (window as any).openBookingsModal();
      }
    });
  }

  if (profileBtn && dropdown) {
    profileBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      const isOpen = dropdown.classList.contains('open');
      dropdown.classList.toggle('open', !isOpen);
      profileBtn.classList.toggle('active', !isOpen);
      profileBtn.setAttribute('aria-expanded', String(!isOpen));
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (dropdown) dropdown.classList.remove('open');
      if (profileBtn) profileBtn.classList.remove('active');
      logout();
    });
  }

  document.addEventListener('click', function (e) {
    if (li && !li.contains(e.target)) {
      if (dropdown) dropdown.classList.remove('open');
      if (profileBtn) profileBtn.classList.remove('active');
    }
  });
}

function updateLogoutLabel(label) {
  ensureLogoutButton();
  const text = (label || '').trim() || (currentUser ? (currentUser.name || currentUser.id || 'User') : 'User');
  const initial = text.charAt(0).toUpperCase() || 'U';

  const nameLabel = document.getElementById('user-name-label');
  if (nameLabel) nameLabel.textContent = text.length > 14 ? text.slice(0, 14) + '...' : text;

  const dropName = document.getElementById('dropdown-user-name');
  if (dropName) dropName.textContent = text;

  const dropSub = document.getElementById('dropdown-user-sub');
  if (dropSub) {
    if (currentUser && currentUser.type === 'employee') {
      dropSub.textContent = (currentUser.role || 'Employee') + ' · ' + (currentUser.id || 'KSRTC');
    } else if (currentUser && currentUser.phone) {
      dropSub.textContent = 'Passenger · +91 ' + currentUser.phone;
    } else {
      dropSub.textContent = 'KSRTC Passenger';
    }
  }

  const avatarCircle = document.getElementById('dropdown-avatar-circle');
  if (avatarCircle) avatarCircle.textContent = initial;

  const avatarBadge = document.getElementById('user-avatar-badge');
  if (avatarBadge) avatarBadge.textContent = initial;
}

function showEmployeeRoleModal() {
  if (document.getElementById('emp-role-overlay')) return;
  const overlay = document.createElement('div');
  overlay.id = 'emp-role-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:10001;background:rgba(0,0,0,0.55);display:flex;align-items:center;justify-content:center;padding:20px;';
  overlay.innerHTML = `
    <div style="background:#fff;border-radius:20px;padding:28px 24px;max-width:340px;width:100%;text-align:center;box-shadow:0 8px 32px rgba(75,30,143,0.25);">
      <div style="font-size:40px;margin-bottom:8px;">🧑‍💼</div>
      <h3 style="font-family:'Baloo 2',cursive;font-weight:800;font-size:1.15rem;color:#4B1E8F;margin-bottom:8px;">Select Your Role</h3>
      <p style="font-size:0.85rem;color:#6B7280;margin-bottom:20px;">Are you a Driver or Conductor?</p>
      <button type="button" id="btn-role-driver" style="width:100%;background:linear-gradient(135deg,#F26522,#C94E0A);color:#fff;padding:14px;border-radius:12px;font-family:'Baloo 2',cursive;font-weight:700;font-size:1rem;border:none;cursor:pointer;margin-bottom:10px;">🚌 Driver</button>
      <button type="button" id="btn-role-conductor" style="width:100%;background:#4B1E8F;color:#fff;padding:14px;border-radius:12px;font-family:'Baloo 2',cursive;font-weight:700;font-size:1rem;border:none;cursor:pointer;">🎫 Conductor</button>
    </div>
  `;
  document.body.appendChild(overlay);
  document.getElementById('btn-role-driver').addEventListener('click', () => completeEmployeeLogin('Driver'));
  document.getElementById('btn-role-conductor').addEventListener('click', () => completeEmployeeLogin('Conductor'));
}

function completeEmployeeLogin(role) {
  if (!currentUser || currentUser.type !== 'employee') return;
  currentUser.role = role;
  const roleOverlay = document.getElementById('emp-role-overlay');
  if (roleOverlay) roleOverlay.remove();
  showAppChrome();
  updateLogoutLabel(currentUser.role + ' · ' + currentUser.id);
  injectEmployeeCrowdCard();
}

function loginAsEmployee(employeeId) {
  if (!employeeId || !String(employeeId).trim()) return;
  currentUser = { type: 'employee', id: String(employeeId).trim() };
  document.getElementById('login-overlay').style.display = 'none';
  showEmployeeRoleModal();
}

function injectEmployeeCrowdCard() {
  if (document.getElementById('emp-crowd-card')) return;
  const page = document.getElementById('page-crowd');
  const card = document.createElement('div');
  card.id = 'emp-crowd-card';
  card.style.cssText = 'background:#fff;border-radius:16px;padding:20px;box-shadow:0 4px 24px rgba(242,101,34,0.10);margin-bottom:20px;';
  card.innerHTML = `
    <h3 style="font-family:'Baloo 2',cursive;font-weight:700;font-size:1rem;margin-bottom:14px;color:#4B1E8F;">🧑‍💼 Employee Crowd Update</h3>
    <p style="font-size:0.82rem;color:#6B7280;margin-bottom:14px;">Submit real-time crowd data for your assigned bus.</p>
    <div class="field-group">
      <label>Bus Number</label>
      <select id="emp-bus-select">
        <option value="KA-55-F-1234">KA-55-F-1234 · Route 101</option>
        <option value="KA-55-F-2288">KA-55-F-2288 · Route 102</option>
        <option value="KA-55-F-3301">KA-55-F-3301 · Route 105</option>
      </select>
    </div>
    <div class="field-group">
      <label>Seats Occupied (out of 40)</label>
      <input type="number" id="emp-seats" min="0" max="40" placeholder="e.g. 25" value="20">
    </div>
    <div class="field-group">
      <label>Crowd Level</label>
      <select id="emp-crowd-level">
        <option value="low">🟢 Low Crowd</option>
        <option value="mid">🟡 Moderate</option>
        <option value="high">🔴 Very Crowded</option>
      </select>
    </div>
    <button type="button" id="btn-emp-crowd-submit" class="btn-primary" style="margin-top:4px;">📤 Publish Crowd Update</button>
  `;
  page.insertBefore(card, page.firstChild);

  document.getElementById('btn-emp-crowd-submit').addEventListener('click', () => {
    const busId = document.getElementById('emp-bus-select').value;
    const seats = parseInt(document.getElementById('emp-seats').value, 10) || 0;
    const level = document.getElementById('emp-crowd-level').value;
    const cards = page.querySelectorAll('.crowd-card');
    cards.forEach(c => {
      if (c.querySelector('.bus-id')?.textContent === busId) {
        const pct = Math.min(100, Math.round((seats / 40) * 100));
        const bar = c.querySelector('.crowd-bar');
        const labels = c.querySelector('.crowd-label');
        bar.className = 'crowd-bar ' + level;
        bar.style.width = pct + '%';
        const levelText = level === 'low' ? '🟢 Low Crowd' : level === 'mid' ? '🟡 Moderate' : '🔴 Very Crowded';
        if (labels) labels.innerHTML = '<span>' + levelText + '</span><span>' + seats + '/40 seats</span>';
      }
    });
    const roleLabel = currentUser && currentUser.role ? currentUser.role : 'Employee';
    showToast('✅ Live Update: Crowd status for ' + busId + ' changed by ' + roleLabel + '.');
  });
}

function logout() {
  try { localStorage.removeItem('mbs_current_session'); } catch (e) {}
  currentUser = null;
  const empCard = document.getElementById('emp-crowd-card');
  if (empCard) empCard.remove();
  hideAppChrome();
  const overlay = document.getElementById('login-overlay');
  if (overlay) overlay.style.display = 'block';
  const uname = document.getElementById('user-name'); if (uname) uname.value = '';
  const uphone = document.getElementById('user-phone'); if (uphone) uphone.value = '';
  const upass = document.getElementById('user-password'); if (upass) upass.value = '';
  const empid = document.getElementById('emp-id'); if (empid) empid.value = '';
  const emppass = document.getElementById('emp-password'); if (emppass) emppass.value = '';
  const uerr = document.getElementById('user-error'); if (uerr) uerr.style.display = 'none';
  const emperr = document.getElementById('emp-error'); if (emperr) emperr.style.display = 'none';
  const roleOverlay = document.getElementById('emp-role-overlay');
  if (roleOverlay) roleOverlay.remove();
  applyEmployeeTabRestrictions();
  const toggleUser = document.getElementById('toggle-user');
  if (toggleUser) toggleUser.click();
  showToast('🚪 Logged out. Redirected to login page.');
}




// Script 2 exports
(window as any).USER_GOOGLE_ACCOUNTS = USER_GOOGLE_ACCOUNTS;
(window as any).EMP_GOOGLE_ACCOUNTS = EMP_GOOGLE_ACCOUNTS;
(window as any).truncateEmail = truncateEmail;
(window as any).hideAppChrome = hideAppChrome;
(window as any).applyEmployeeTabRestrictions = applyEmployeeTabRestrictions;
(window as any).showAppChrome = showAppChrome;
(window as any).buildGoogleAccountRows = buildGoogleAccountRows;
(window as any).injectLoginOverlay = injectLoginOverlay;
(window as any).bindLoginEvents = bindLoginEvents;
(window as any).ensureLogoutButton = ensureLogoutButton;
(window as any).updateLogoutLabel = updateLogoutLabel;
(window as any).showEmployeeRoleModal = showEmployeeRoleModal;
(window as any).completeEmployeeLogin = completeEmployeeLogin;
(window as any).loginAsEmployee = loginAsEmployee;
(window as any).injectEmployeeCrowdCard = injectEmployeeCrowdCard;
(window as any).logout = logout;
function initLogin() {
  hideAppChrome();
  injectLoginOverlay();
  ensureLogoutButton();
  try {
    const saved = localStorage.getItem('mbs_current_session');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.type) {
        currentUser = parsed;
        const overlay = document.getElementById('login-overlay');
        if (overlay) overlay.style.display = 'none';
        showAppChrome();
        if (currentUser.type === 'user') {
          updateLogoutLabel(currentUser.name);
          if (typeof checkQRTicketBtn === 'function') checkQRTicketBtn();
        } else {
          updateLogoutLabel((currentUser.role || 'Employee') + ' · ' + currentUser.id);
          injectEmployeeCrowdCard();
        }
      }
    }
  } catch (e) {}
}
(window as any).initLogin = initLogin;


/* ── USER AUTH (login / signup) override ── */
let loginMode = true;

function seedMbsUsers() {
  try {
    const raw = localStorage.getItem('mbs_users');
    const users = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(users) || users.length === 0) {
      localStorage.setItem('mbs_users', JSON.stringify([
        { name: 'Arjun Kumar', phone: '9876543210', password: 'demo123', createdAt: Date.now() },
        { name: 'Priya Rao', phone: '9845012345', password: 'demo456', createdAt: Date.now() }
      ]));
    }
  } catch (e) {
    localStorage.setItem('mbs_users', JSON.stringify([
      { name: 'Arjun Kumar', phone: '9876543210', password: 'demo123', createdAt: Date.now() },
      { name: 'Priya Rao', phone: '9845012345', password: 'demo456', createdAt: Date.now() }
    ]));
  }
}

function setUserAuthMode(isLogin) {
  loginMode = isLogin;
  const heading = document.getElementById('user-auth-heading');
  const nameEl = document.getElementById('user-name');
  const confirmWrap = document.getElementById('confirm-pwd-wrap');
  const btn = document.getElementById('btn-user-login');
  const link = document.getElementById('auth-mode-link');
  const err = document.getElementById('user-error');
  if (err) err.style.display = 'none';
  if (heading) heading.textContent = isLogin ? 'Welcome Back 👋' : 'Create Account 🚌';
  if (nameEl) nameEl.style.display = isLogin ? 'none' : 'block';
  if (confirmWrap) confirmWrap.style.display = isLogin ? 'none' : 'block';
  if (btn) btn.textContent = isLogin ? 'Login →' : 'Create Account →';
  if (link) {
    link.textContent = isLogin ? 'New user? Create Account →' : 'Already have an account? Login';
  }
}

function completeUserSession(name, phone) {
  currentUser = { type: 'user', name: String(name).trim(), phone: String(phone).trim() };
  try { localStorage.setItem('mbs_current_session', JSON.stringify(currentUser)); } catch (e) {}
  document.getElementById('login-overlay').style.display = 'none';
  showAppChrome();
  updateLogoutLabel(currentUser.name);
  if (typeof checkQRTicketBtn === 'function') checkQRTicketBtn();
}

function loginAsUser(name, phone) {
  const err = document.getElementById('user-error');
  const phoneEl = document.getElementById('user-phone');
  const passEl = document.getElementById('user-password');
  const nameEl = document.getElementById('user-name');
  const confirmEl = document.getElementById('user-confirm-password');
  const phoneVal = (phoneEl && phoneEl.value ? phoneEl.value : phone || '').trim().replace(/\D/g, '').slice(-10);
  const passVal = passEl ? passEl.value : '';
  const nameVal = nameEl ? nameEl.value.trim() : (name || '').trim();
  const phoneRegex = /^[6-9]\d{9}$/;

  function showErr(msg) {
    if (err) { err.textContent = msg; err.style.display = 'block'; }
  }

  if (!phoneRegex.test(phoneVal)) {
    showErr('Please enter a valid 10-digit phone number starting with 6, 7, 8, or 9.');
    return;
  }

  if (loginMode) {
    if (!passVal) {
      showErr('Please enter your password.');
      return;
    }
    let users = [];
    try { users = JSON.parse(localStorage.getItem('mbs_users') || '[]'); } catch (e) { users = []; }
    const user = users.find(function (u) { return u.phone === phoneVal; });
    if (!user) {
      showErr('Phone number not registered. Please sign up.');
      return;
    }
    if (user.password !== passVal) {
      showErr('Incorrect password.');
      return;
    }
    if (err) err.style.display = 'none';
    completeUserSession(user.name, user.phone);
    return;
  }

  const confirmVal = confirmEl ? confirmEl.value : '';
  if (!nameVal) {
    showErr('Please enter your full name.');
    return;
  }
  if (passVal.length < 6) {
    showErr('Password must be at least 6 characters.');
    return;
  }
  if (passVal !== confirmVal) {
    showErr('Passwords do not match.');
    return;
  }
  let users = [];
  try { users = JSON.parse(localStorage.getItem('mbs_users') || '[]'); } catch (e) { users = []; }
  if (users.some(function (u) { return u.phone === phoneVal; })) {
    showErr('Phone already registered. Please login.');
    return;
  }
  users.push({ name: nameVal, phone: phoneVal, password: passVal, createdAt: Date.now() });
  localStorage.setItem('mbs_users', JSON.stringify(users));
  if (err) err.style.display = 'none';
  completeUserSession(nameVal, phoneVal);
}




// Script 3 exports
(window as any).seedMbsUsers = seedMbsUsers;
(window as any).setUserAuthMode = setUserAuthMode;
(window as any).completeUserSession = completeUserSession;
(window as any).loginAsUser = loginAsUser;
function setupUserAuthUI() {
  seedMbsUsers();
  setUserAuthMode(true);
  const modeLink = document.getElementById('auth-mode-link');
  if (modeLink) {
    modeLink.addEventListener('click', function (e) {
      e.preventDefault();
      setUserAuthMode(!loginMode);
    });
  }
  document.querySelectorAll('#login-overlay .pwd-eye').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const id = btn.getAttribute('data-target');
      const inp = document.getElementById(id);
      if (!inp) return;
      inp.type = inp.type === 'password' ? 'text' : 'password';
    });
  });
  const oldBtn = document.getElementById('btn-user-login');
  if (oldBtn) {
    const newBtn = oldBtn.cloneNode(true);
    oldBtn.parentNode.replaceChild(newBtn, oldBtn);
    newBtn.addEventListener('click', function () { loginAsUser(); });
  }
  const toggleUser = document.getElementById('toggle-user');
  if (toggleUser) {
    toggleUser.addEventListener('click', function () { setUserAuthMode(true); });
  }
}
(window as any).setupUserAuthUI = setupUserAuthUI;


/* ── NEW FEATURES LOGIC ── */
(function () {
  'use strict';

  let isKannada = false;
  let savedRoutes = [];
  let alertDismissed = false;
  let lfTypeLost = true;
  let passReturnTrip = false;
  let routeStarsInjected = false;
  let lastLoggedIn = false;

  const KANNADA_STRINGS = {
    'CBS': 'ಸಿಬಿಎಸ್',
    'About': 'ಬಗ್ಗೆ',
    'My Bookings': 'ನನ್ನ ಬುಕಿಂಗ್‌ಗಳು',
    '🎟️ My Bookings': '🎟️ ನನ್ನ ಬುಕಿಂಗ್‌ಗಳು',
    'All Bookings': 'ಎಲ್ಲಾ ಬುಕಿಂಗ್‌ಗಳು',
    '🏠 Home': '🏠 ಮುಖಪುಟ',
    '🗺️ Routes': '🗺️ ಮಾರ್ಗಗಳು',
    '⏰ Timings': '⏰ ಸಮಯಗಳು',
    '👥 Crowd': '👥 ಜನಸಂದಣಿ',
    '🚌 Next Bus': '🚌 ಮುಂದಿನ ಬಸ್',
    '💰 Fares': '💰 ದರಗಳು',
    '🔍 Lost & Found': '🔍 ಕಳೆದು & ದೊರೆತ',
    '📅 Plan Trip': '📅 ಪ್ರಯಾಣ ಯೋಜನೆ',
    '📍 City Bus Depot — CBS, Mysuru': '📍 ನಗರ ಬಸ್ ನಿಲ್ದಾಣ — ಸಿಬಿಎಸ್, ಮೈಸೂರು',
    'MysuruBus Saathi 💛': 'ಮೈಸೂರುಬಸ್ ಸಾಥಿ 💛',
    'Your smart companion for KSRTC City buses. Real-time routes, crowd, fares & more.': 'ಕೆಎಸ್ಆರ್ಟಿಸಿ ನಗರ ಬಸ್ಗಳಿಗೆ ನಿಮ್ಮ ಸ್ಮಾರ್ಟ್ ಸಹಚರ. ನೈಜ-ಸಮಯ ಮಾರ್ಗಗಳು, ಜನಸಂದಣಿ, ದರಗಳು ಮತ್ತು ಇನ್ನಷ್ಟು.',
    '⚡ Quick Access': '⚡ ತ್ವರಿತ ಪ್ರವೇಶ',
    'Route Finder': 'ಮಾರ್ಗ ಹುಡುಕಿ',
    'Find best bus route': 'ಉತ್ತಮ ಬಸ್ ಮಾರ್ಗ ಹುಡುಕಿ',
    'Bus Timings': 'ಬಸ್ ಸಮಯಗಳು',
    'First & last bus times': 'ಮೊದಲ ಮತ್ತು ಕೊನೆಯ ಬಸ್ ಸಮಯ',
    'Live Crowd': 'ಲೈವ್ ಜನಸಂದಣಿ',
    'Seat availability': 'ಆಸನ ಲಭ್ಯತೆ',
    'Live Bus & Route Alerts': 'ಲೈವ್ ಬಸ್ ಮತ್ತು ಮಾರ್ಗ ಎಚ್ಚರಿಕೆಗಳು',
    'Delays, overcrowded buses & route changes in Mysuru': 'ಮೈಸೂರಿನಲ್ಲಿ ವಿಳಂಬಗಳು, ಜನನಿಬಿಡ ಬಸ್‌ಗಳು ಮತ್ತು ಮಾರ್ಗ ಬದಲಾವಣೆಗಳು',
    'All (3)': 'ಎಲ್ಲಾ (3)',
    '⏱️ Delays (1)': '⏱️ ವಿಳಂಬಗಳು (1)',
    '👥 Overcrowded (1)': '👥 ಹೆಚ್ಚು ಜನಸಂದಣಿ (1)',
    '🔄 Route Changes (1)': '🔄 ಮಾರ್ಗ ಬದಲಾವಣೆಗಳು (1)',
    '⏱️ 15-20 Min Delay': '⏱️ 15-20 ನಿಮಿಷ ವಿಳಂಬ',
    '👥 95% Overpopulated · Standing Only': '👥 95% ಜನನಿಬಿಡ · ನಿಲ್ಲಲು ಮಾತ್ರ ಸ್ಥಳ',
    '🔄 Route Diversion': '🔄 ಮಾರ್ಗ ತಿರುವು',
    'Updated 4m ago': '4 ನಿಮಿಷಗಳ ಹಿಂದೆ ನವೀಕರಿಸಲಾಗಿದೆ',
    'Updated 8m ago': '8 ನಿಮಿಷಗಳ ಹಿಂದೆ ನವೀಕರಿಸಲಾಗಿದೆ',
    'Valid Today': 'ಇಂದಿಗೆ ಅನ್ವಯ',
    'View Timetable →': 'ವೇಳಾಪಟ್ಟಿ ನೋಡಿ →',
    'Check Live Meter →': 'ಲೈವ್ ಮೀಟರ್ ನೋಡಿ →',
    'Find Best Route →': 'ಉತ್ತಮ ಮಾರ್ಗ ಹುಡುಕಿ →',
    '🔄 Refresh Transit Alerts': '🔄 ಸಂಚಾರ ಎಚ್ಚರಿಕೆಗಳನ್ನು ನವೀಕರಿಸಿ',
    'Done': 'ಮುಗಿದಿದೆ',
    'Lost & Found': 'ಕಳೆದು & ದೊರೆತ',
    'Report lost items': 'ಕಳೆದ ವಸ್ತುಗಳನ್ನು ವರದಿ ಮಾಡಿ',
    '🔥 Popular Routes from CBS': '🔥 ಸಿಬಿಎಸ್‌ನಿಂದ ಜನಪ್ರಿಯ ಮಾರ್ಗಗಳು',
    '🗺️ Find Best Route': '🗺️ ಉತ್ತಮ ಮಾರ್ಗ ಹುಡುಕಿ',
    'From': 'ಇಂದ',
    'To': 'ವರೆಗೆ',
    '🔍 Find Best Route': '🔍 ಉತ್ತಮ ಮಾರ್ಗ ಹುಡುಕಿ',
    '✅ Available Routes': '✅ ಲಭ್ಯವಿರುವ ಮಾರ್ಗಗಳು',
    '⏰ Bus Timings': '⏰ ಬಸ್ ಸಮಯಗಳು',
    'Select Route': 'ಮಾರ್ಗ ಆಯ್ಕೆಮಾಡಿ',
    '-- Select a Route --': '-- ಮಾರ್ಗ ಆಯ್ಕೆಮಾಡಿ --',
    '👥 Live Crowd Meter': '👥 ಲೈವ್ ಜನಸಂದಣಿ ಮೀಟರ್',
    'Real-time crowd levels updated by fellow passengers.': 'ಸಹ ಪ್ರಯಾಣಿಕರಿಂದ ನವೀಕರಿಸಲಾದ ನೈಜ-ಸಮಯ ಜನಸಂದಣಿ ಮಟ್ಟಗಳು.',
    '🔄 Refresh Crowd Data': '🔄 ಜನಸಂದಣಿ ಡೇಟಾ ರಿಫ್ರೆಶ್',
    '🚌 Next Bus Estimator': '🚌 ಮುಂದಿನ ಬಸ್ ಅಂದಾಜು',
    'From Stop': 'ಇಂದ ನಿಲ್ದಾಣ',
    'To Stop': 'ವರೆಗೆ ನಿಲ್ದಾಣ',
    '⏱️ Check Next Bus': '⏱️ ಮುಂದಿನ ಬಸ್ ಪರಿಶೀಲಿಸಿ',
    '💰 Government Bus Fares from CBS': '💰 ಸಿಬಿಎಸ್‌ನಿಂದ ಸರ್ಕಾರಿ ಬಸ್ ದರಗಳು',
    'Official KSRTC City Bus fares (Ordinary class). Fares are fixed by Karnataka Government.': 'ಅಧಿಕೃತ ಕೆಎಸ್ಆರ್ಟಿಸಿ ನಗರ ಬಸ್ ದರಗಳು (ಸಾಮಾನ್ಯ ವರ್ಗ). ದರಗಳನ್ನು ಕರ್ನಾಟಕ ಸರ್ಕಾರ ನಿಗದಿಪಡಿಸಿದೆ.',
    'From → To': 'ಇಂದ → ವರೆಗೆ',
    'Route No.': 'ಮಾರ್ಗ ಸಂ.',
    'Fare': 'ದರ',
    '🧮 Fare Calculator': '🧮 ದರ ಕ್ಯಾಲ್ಕುಲೇಟರ್',
    '💰 Calculate Fare': '💰 ದರ ಲೆಕ್ಕಾಚಾರ',
    'Estimated Fare': 'ಅಂದಾಜು ದರ',
    'KSRTC Ordinary Class': 'ಕೆಎಸ್ಆರ್ಟಿಸಿ ಸಾಮಾನ್ಯ ವರ್ಗ',
    '🔍 Lost & Found Board': '🔍 ಕಳೆದು & ದೊರೆತ ಫಲಕ',
    '+ Report Lost Item': '+ ಕಳೆದ ವಸ್ತು ವರದಿ',
    '📋 Recent Found Items': '📋 ಇತ್ತೀಚೆ ದೊರೆತ ವಸ್ತುಗಳು',
    '📍 CBS Lost & Found Counter open 6 AM – 9 PM daily': '📍 ಸಿಬಿಎಸ್ ಕಳೆದು & ದೊರೆತ ಕೌಂಟರ್ ಪ್ರತಿದಿನ ಬೆಳಿಗ್ಗೆ 6 – ರಾತ್ರಿ 9 ತೆರೆದಿರುತ್ತದೆ',
    'Route Details': 'ಮಾರ್ಗ ವಿವರಗಳು',
    '✕ Close': '✕ ಮುಚ್ಚಿ',
    'Built with ❤️ by': '❤️ ಜೊತೆ ನಿರ್ಮಿಸಲಾಗಿದೆ',
    'Team Penta Core': 'ಟೀಮ್ ಪೆಂಟಾ ಕೋರ್',
    '· #MysuruBusSaathi · #SmartMysuru': '· #ಮೈಸೂರುಬಸ್‌ಸಾಥಿ · #ಸ್ಮಾರ್ಟ್‌ಮೈಸೂರು',
    'MysuruBus Saathi': 'ಮೈಸೂರುಬಸ್ ಸಾಥಿ',
    'Your smart bus companion for Mysuru': 'ಮೈಸೂರಿಗೆ ನಿಮ್ಮ ಸ್ಮಾರ್ಟ್ ಬಸ್ ಸಹಚರ',
    '👤 User Login': '👤 ಬಳಕೆದಾರ ಲಾಗಿನ್',
    '🧑‍💼 Employee Login': '🧑‍💼 ಉದ್ಯೋಗಿ ಲಾಗಿನ್',
    'Login as User': 'ಬಳಕೆದಾರರಾಗಿ ಲಾಗಿನ್',
    'Login as Employee': 'ಉದ್ಯೋಗಿಯಾಗಿ ಲಾಗಿನ್',
    'Continue with Google': 'ಗೂಗಲ್‌ನೊಂದಿಗೆ ಮುಂದುವರಿಸಿ',
    'or': 'ಅಥವಾ',
    'Please fill in all fields.': 'ದಯವಿಟ್ಟು ಎಲ್ಲಾ ಫೀಲ್ಡ್‌ಗಳನ್ನು ತುಂಬಿರಿ.',
    '🚪 Logout': '🚪 ಲಾಗ್‌ಔಟ್',
    '🧑‍💼 Employee Crowd Update': '🧑‍💼 ಉದ್ಯೋಗಿ ಜನಸಂದಣಿ ನವೀಕರಣ',
    'Submit real-time crowd data for your assigned bus.': 'ನಿಮಗೆ ನಿಯೋಜಿತ ಬಸ್‌ಗಾಗಿ ನೈಜ-ಸಮಯ ಜನಸಂದಣಿ ಡೇಟಾ ಸಲ್ಲಿಸಿ.',
    'Bus Number': 'ಬಸ್ ಸಂಖ್ಯೆ',
    'Seats Occupied (out of 40)': 'ಆಕ್ರಮಿಸಿದ ಆಸನಗಳು (40 ರಲ್ಲಿ)',
    'Crowd Level': 'ಜನಸಂದಣಿ ಮಟ್ಟ',
    '📤 Publish Crowd Update': '📤 ಜನಸಂದಣಿ ನವೀಕರಣ ಪ್ರಕಟಿಸಿ',
    '🟢 Low Crowd': '🟢 ಕಡಿಮೆ ಜನಸಂದಣಿ',
    '🟡 Moderate': '🟡 ಮಧ್ಯಮ',
    '🔴 Very Crowded': '🔴 ತುಂಬಾ ಜನಸಂದಣಿ',
    'Low': 'ಕಡಿಮೆ',
    'Moderate': 'ಮಧ್ಯಮ',
    'High': 'ಹೆಚ್ಚು',
    'crowd': 'ಜನಸಂದಣಿ',
    'minutes away': 'ನಿಮಿಷಗಳಲ್ಲಿ',
    'Last Bus': 'ಕೊನೆಯ ಬಸ್',
    '🌙 Last Bus Info': '🌙 ಕೊನೆಯ ಬಸ್ ಮಾಹಿತಿ',
    'Stay worry-free, plan your return!': 'ಚಿಂತೆ ಇಲ್ಲದೆ, ನಿಮ್ಮ ಹಿಂತಿರುಗುವಿಕೆಯನ್ನು ಯೋಜಿಸಿ!',
    'First Bus': 'ಮೊದಲ ಬಸ್',
    'Running': 'ಚಾಲನೆಯಲ್ಲಿದೆ',
    'Last Bus': 'ಕೊನೆಯ ಬಸ್',
    'No data available.': 'ಡೇಟಾ ಲಭ್ಯವಿಲ್ಲ.',
    'Travel Time': 'ಪ್ರಯಾಣ ಸಮಯ',
    'Frequency': 'ಆವರ್ತನ',
    'Current Crowd': 'ಪ್ರಸ್ತುತ ಜನಸಂದಣಿ',
    '🎟️ Fare': '🎟️ ದರ',
    'Depot': 'ನಿಲ್ದಾಣ',
    'Route No.': 'ಮಾರ್ಗ ಸಂ.',
    '⭐ My Saved Routes': '⭐ ನನ್ನ ಉಳಿಸಿದ ಮಾರ್ಗಗಳು',
    'Tap ⭐ on any route to save it here.': 'ಇಲ್ಲಿ ಉಳಿಸಲು ಯಾವುದೇ ಮಾರ್ಗದಲ್ಲಿ ⭐ ಟ್ಯಾಪ್ ಮಾಡಿ.',
    '📅 Trip Planner — Arrive On Time': '📅 ಪ್ರಯಾಣ ಯೋಜಕ — ಸಮಯಕ್ಕೆ ತಲುಪಿ',
    'Destination': 'ಗಮ್ಯಸ್ಥಾನ',
    'I want to arrive by': 'ನಾನು ಇಷ್ಟು ಸಮಯಕ್ಕೆ ತಲುಪಬೇಕು',
    '📅 Plan My Trip': '📅 ನನ್ನ ಪ್ರಯಾಣ ಯೋಜಿಸಿ',
    '📝 Report a Lost or Found Item': '📝 ಕಳೆದು ಅಥವಾ ದೊರೆತ ವಸ್ತು ವರದಿ',
    '🔍 I Lost Something': '🔍 ನಾನು ಏನೋ ಕಳೆದುಕೊಂಡಿದ್ದೇನೆ',
    '✅ I Found Something': '✅ ನಾನು ಏನೋ ಕಂಡುಕೊಂಡಿದ್ದೇನೆ',
    '📤 Submit Report': '📤 ವರದಿ ಸಲ್ಲಿಸಿ',
    '🎟️ Monthly Pass Calculator': '🎟️ ಮಾಸಿಕ ಪಾಸ್ ಕ್ಯಾಲ್ಕುಲೇಟರ್',
    'Your Daily Route': 'ನಿಮ್ಮ ದೈನಂದಿನ ಮಾರ್ಗ',
    'Working days per month': 'ತಿಂಗಳಿಗೆ ಕೆಲಸದ ದಿನಗಳು',
    'Single Trip': 'ಒಂದು ಪ್ರಯಾಣ',
    'Return Trip': 'ಹೋಗಿ-ಬರು ಪ್ರಯಾಣ',
    '🎟️ Calculate Pass Cost': '🎟️ ಪಾಸ್ ವೆಚ್ಚ ಲೆಕ್ಕಾಚಾರ',
    'Emergency Help': 'ತುರ್ತು ಸಹಾಯ',
    'Share your location or contact depot immediately.': 'ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಹಂಚಿಕೊಳ್ಳಿ ಅಥವಾ ತಕ್ಷಣ ನಿಲ್ದಾಣವನ್ನು ಸಂಪರ್ಕಿಸಿ.',
    '📞 Call CBS Depot: 0821-2345678': '📞 ಸಿಬಿಎಸ್ ನಿಲ್ದಾಣಕ್ಕೆ ಕರೆ: 0821-2345678',
    '🚔 Call Police: 100': '🚔 ಪೊಲೀಸಿಗೆ ಕರೆ: 100',
    '📍 Always share your route number and bus number with emergency contacts.': '📍 ತುರ್ತು ಸಂಪರ್ಕಗಳೊಂದಿಗೆ ಯಾವಾಗಲೂ ನಿಮ್ಮ ಮಾರ್ಗ ಸಂಖ್ಯೆ ಮತ್ತು ಬಸ್ ಸಂಖ್ಯೆಯನ್ನು ಹಂಚಿಕೊಳ್ಳಿ.',
    '⚠️ Route 101 delayed today — Dasara parade traffic near Palace Road. Allow 15 extra minutes.': '⚠️ ಇಂದು ಮಾರ್ಗ 101 ವಿಳಂಬ — ಅರಮನೆ ರಸ್ತೆಯ ಬಳಿ ದಸರಾ ಘೋಷಾಯಾತ್ರೆ ಸಂಚಾರ. 15 ಹೆಚ್ಚುವರಿ ನಿಮಿಷಗಳನ್ನು ನೀಡಿ.',
    'Route': 'ಮಾರ್ಗ',
    'Arrive By': 'ಇಷ್ಟು ಸಮಯಕ್ಕೆ ತಲುಪಿ',
    'Leave by:': 'ಇಷ್ಟು ಸಮಯಕ್ಕೆ ಹೊರಡಿ:',
    '💡 We added 5 min buffer. Catch the bus at least 3 min before departure.': '💡 ನಾವು 5 ನಿಮಿಷ ಬಫರ್ ಸೇರಿಸಿದ್ದೇವೆ. ಹೊರಡುವ ಮೊದಲು ಕನಿಷ್ಠ 3 ನಿಮಿಷ ಮೊದಲು ಬಸ್ ಹಿಡಿಯಿರಿ.',
    'Route not in our database yet. Allow 35 min travel time as estimate.': 'ಮಾರ್ಗ ಇನ್ನೂ ನಮ್ಮ ಡೇಟಾಬೇಸ್‌ನಲ್ಲಿ ಇಲ್ಲ. ಅಂದಾಜಾಗಿ 35 ನಿಮಿಷ ಪ್ರಯಾಣ ಸಮಯ ನೀಡಿ.',
    'Without Pass:': 'ಪಾಸ್ ಇಲ್ಲದೆ:',
    'You save': 'ನೀವು ಉಳಿಸುತ್ತೀರಿ',
    'per month 🎉': 'ಪ್ರತಿ ತಿಂಗಳು 🎉',
    'Approximate. Actual KSRTC pass prices may vary. Check at CBS counter.': 'ಅಂದಾಜು. ನಿಜವಾದ ಕೆಎಸ್ಆರ್ಟಿಸಿ ಪಾಸ್ ದರಗಳು ಬದಲಾಗಬಹುದು. ಸಿಬಿಎಸ್ ಕೌಂಟರ್‌ನಲ್ಲಿ ಪರಿಶೀಲಿಸಿ.',
    'Monthly Pass:': 'ಮಾಸಿಕ ಪಾಸ್:',
    '✅ Report submitted! CBS staff will review within 24 hours.': '✅ ವರದಿ ಸಲ್ಲಿಸಲಾಗಿದೆ! ಸಿಬಿಎಸ್ ಸಿಬ್ಬಂದಿ 24 ಗಂಟೆಗಳಲ್ಲಿ ಪರಿಶೀಲಿಸುತ್ತಾರೆ.',
    'Please fill in all fields.': 'ದಯವಿಟ್ಟು ಎಲ್ಲಾ ಫೀಲ್ಡ್‌ಗಳನ್ನು ತುಂಬಿರಿ.',
    'Unclaimed': 'ಹಕ್ಕು ಸಾಧಿಸಲಾಗಿಲ್ಲ',
    'Enquired': 'ವಿಚಾರಿಸಲಾಗಿದೆ',
    'Claimed': 'ಹಕ್ಕು ಸಾಧಿಸಲಾಗಿದೆ',
    'Just now': 'ಇದೀಗ',
    'Mysuru': 'ಮೈಸೂರು',
    'Bus': 'ಬಸ್',
    ' Saathi': ' ಸಾಥಿ'
  };

  const PLACEHOLDER_I18N = {
    'user-name': { en: 'Full Name', kn: 'ಪೂರ್ಣ ಹೆಸರು' },
    'user-phone': { en: 'Phone Number', kn: 'ಫೋನ್ ಸಂಖ್ಯೆ' },
    'user-password': { en: 'Enter your password', kn: 'ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ' },
    'emp-id': { en: 'Enter Employee ID', kn: 'ಉದ್ಯೋಗಿ ಐಡಿ ನಮೂದಿಸಿ' },
    'emp-password': { en: 'Enter Password', kn: 'ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ' },
    'emp-seats': { en: 'e.g. 25', kn: 'ಉದಾ. 25' },
    'lf-item': { en: 'Item name (e.g. Black Wallet)', kn: 'ವಸ್ತುವಿನ ಹೆಸರು (ಉದಾ. ಕಪ್ಪು ವಾಲೆಟ್)' },
    'lf-desc': { en: 'Description & where found/lost', kn: 'ವಿವರಣೆ ಮತ್ತು ಎಲ್ಲಿ ದೊರೆತ/ಕಳೆದು' },
    'lf-contact': { en: 'Your contact number', kn: 'ನಿಮ್ಮ ಸಂಪರ್ಕ ಸಂಖ್ಯೆ' }
  };

  const ENGLISH_FROM_KANNADA = {};
  Object.keys(KANNADA_STRINGS).forEach(function (k) {
    ENGLISH_FROM_KANNADA[KANNADA_STRINGS[k]] = k;
  });

  function applyDomLanguage() {
    const map = isKannada ? KANNADA_STRINGS : ENGLISH_FROM_KANNADA;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (!node.textContent.trim()) return NodeFilter.FILTER_REJECT;
        const p = node.parentElement;
        if (!p || p.tagName === 'SCRIPT' || p.tagName === 'STYLE') return NodeFilter.FILTER_REJECT;
        if (p.closest('#lang-toggle-btn')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    let node;
    while ((node = walker.nextNode())) {
      const raw = node.textContent;
      const trimmed = raw.trim();
      if (!trimmed) continue;
      const translated = map[trimmed];
      if (translated !== undefined) {
        const lead = raw.match(/^\s*/)[0];
        const trail = raw.match(/\s*$/)[0];
        node.textContent = lead + translated + trail;
      }
    }
    Object.keys(PLACEHOLDER_I18N).forEach(function (id) {
      const el = document.getElementById(id);
      if (!el) return;
      el.placeholder = isKannada ? PLACEHOLDER_I18N[id].kn : PLACEHOLDER_I18N[id].en;
    });
    document.body.classList.toggle('lang-kannada', isKannada);
    const langBtn = document.getElementById('lang-toggle-btn');
    if (langBtn) langBtn.textContent = isKannada ? 'E/ಕ' : 'ಕ/E';
  }

  function injectLangToggle() {
    if (document.getElementById('lang-toggle-btn')) return;
    const langBtn = document.createElement('button');
    langBtn.type = 'button';
    langBtn.id = 'lang-toggle-btn';
    langBtn.textContent = 'ಕ/E';
    langBtn.addEventListener('click', function () {
      isKannada = !isKannada;
      (window as any).isKannada = isKannada;
      applyDomLanguage();
      updateThemeButtonLabel();
    });
    const brand = document.querySelector('.nav-brand');
    if (brand) brand.insertAdjacentElement('afterend', langBtn);
  }

  let isDarkMode = false;

  function updateThemeButtonLabel() {
    const btn = document.getElementById('theme-toggle-btn');
    if (!btn) return;
    const isK = (window as any).isKannada;
    if (isDarkMode) {
      btn.innerHTML = '<span class="theme-icon">☀️</span><span class="theme-label">' + (isK ? 'ಹಗಲು' : 'Day') + '</span>';
      btn.title = isK ? 'ಹಗಲು ಮೋಡ್‌ಗೆ ಬದಲಾಯಿಸಿ (Day Mode)' : 'Switch to Day (Light) Mode';
    } else {
      btn.innerHTML = '<span class="theme-icon">🌙</span><span class="theme-label">' + (isK ? 'ರಾತ್ರಿ' : 'Night') + '</span>';
      btn.title = isK ? 'ರಾತ್ರಿ ಮೋಡ್‌ಗೆ ಬದಲಾಯಿಸಿ (Night Mode)' : 'Switch to Night (Dark) Mode';
    }
  }

  function applyTheme(dark, showNotification) {
    isDarkMode = !!dark;
    (window as any).isDarkMode = isDarkMode;
    try {
      localStorage.setItem('mbs_theme', isDarkMode ? 'dark' : 'light');
    } catch (e) {}

    document.body.classList.toggle('dark-mode', isDarkMode);
    document.documentElement.classList.toggle('dark-mode', isDarkMode);

    updateThemeButtonLabel();

    if (showNotification && typeof (window as any).showToast === 'function') {
      const isK = (window as any).isKannada;
      const msg = isDarkMode
        ? (isK ? '🌙 ರಾತ್ರಿ ಮೋಡ್ (Dark Mode) ಸಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ' : '🌙 Night (Dark) Mode enabled')
        : (isK ? '☀️ ಹಗಲು ಮೋಡ್ (Day Mode) ಸಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ' : '☀️ Day (Light) Mode enabled');
      (window as any).showToast(msg);
    }
  }

  function toggleTheme() {
    applyTheme(!isDarkMode, true);
  }

  function initThemeState() {
    try {
      const savedTheme = localStorage.getItem('mbs_theme');
      if (savedTheme) {
        isDarkMode = savedTheme === 'dark';
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        isDarkMode = true;
      }
    } catch (e) {
      isDarkMode = false;
    }
    applyTheme(isDarkMode, false);
  }

  function injectThemeToggle() {
    if (document.getElementById('theme-toggle-btn')) return;
    const themeBtn = document.createElement('button');
    themeBtn.type = 'button';
    themeBtn.id = 'theme-toggle-btn';
    themeBtn.className = 'theme-toggle-btn';
    themeBtn.title = 'Toggle Day / Night Mode';
    themeBtn.addEventListener('click', toggleTheme);
    const langBtn = document.getElementById('lang-toggle-btn');
    if (langBtn) {
      langBtn.insertAdjacentElement('afterend', themeBtn);
    } else {
      const brand = document.querySelector('.nav-brand');
      if (brand) brand.insertAdjacentElement('afterend', themeBtn);
    }
    updateThemeButtonLabel();
  }

  (window as any).toggleTheme = toggleTheme;
  (window as any).applyTheme = applyTheme;

  function injectPlanTab() {
    if (document.getElementById('tab-plan-btn')) return;
    const tabs = document.querySelector('.tabs');
    if (!tabs) return;
    const btn = document.createElement('button');
    btn.className = 'tab-btn';
    btn.id = 'tab-plan-btn';
    btn.textContent = '📅 Plan Trip';
    btn.addEventListener('click', function () {
      showTab('plan');
      document.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      window.scrollTo(0, 0);
    });
    tabs.appendChild(btn);
    tabs.addEventListener('click', function (e) {
      const clicked = e.target.closest('.tab-btn');
      if (clicked && clicked.id !== 'tab-plan-btn') {
        const planBtn = document.getElementById('tab-plan-btn');
        if (planBtn) planBtn.classList.remove('active');
      }
    });
  }

  function injectPlanPage() {
    if (document.getElementById('page-plan')) return;
    const stopOpts = document.getElementById('from-stop')
      ? document.getElementById('from-stop').innerHTML
      : '';
    const page = document.createElement('div');
    page.id = 'page-plan';
    page.className = 'page';
    page.innerHTML =
      '<div class="section-header">📅 Trip Planner — Arrive On Time</div>' +
      '<div class="search-card">' +
      '<div class="field-group"><label>From Stop</label><select id="plan-from">' + stopOpts + '</select></div>' +
      '<div class="field-group"><label>Destination</label><select id="plan-to">' + stopOpts + '</select></div>' +
      '<div class="field-group"><label>I want to arrive by</label><input type="time" id="plan-arrive-by"></div>' +
      '<button type="button" class="btn-primary" onclick="planTrip()">📅 Plan My Trip</button>' +
      '</div>' +
      '<div id="plan-result"></div>';
    const lostPage = document.getElementById('page-lost');
    if (lostPage && lostPage.parentNode) {
      lostPage.parentNode.insertBefore(page, lostPage);
    } else {
      document.body.appendChild(page);
    }
  }

  window.formatTime = function (totalMinutes) {
    totalMinutes = ((totalMinutes % 1440) + 1440) % 1440;
    const h24 = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    const ampm = h24 >= 12 ? 'PM' : 'AM';
    let h12 = h24 % 12;
    if (h12 === 0) h12 = 12;
    return String(h12).padStart(2, '0') + ':' + String(mins).padStart(2, '0') + ' ' + ampm;
  };

  window.planTrip = function () {
    const fromEl = document.getElementById('plan-from');
    const toEl = document.getElementById('plan-to');
    const timeEl = document.getElementById('plan-arrive-by');
    const resultEl = document.getElementById('plan-result');
    if (!fromEl || !toEl || !timeEl || !resultEl) return;

    const from = fromEl.value;
    const to = toEl.value;
    const arriveStr = timeEl.value;
    if (!from || !to || !arriveStr) {
      resultEl.innerHTML = '<div class="plan-error">Please fill in all fields.</div>';
      if (isKannada) applyDomLanguage();
      return;
    }

    const normFrom = from.replace(/\s*\(.*\)\s*/, '').trim() || from;
    const normTo = to.replace(/\s*\(.*\)\s*/, '').trim() || to;
    const key = normFrom + '|' + normTo;
    const revKey = normTo + '|' + normFrom;
    let route = typeof ROUTES !== 'undefined' ? (ROUTES[key] || ROUTES[revKey]) : null;
    let travelMins = 35;
    let routeNo = '—';
    let freq = '—';
    let fare = 20;
    let timeLabel = '35 min';
    let genericNote = '';

    if (route) {
      const m = String(route.time).match(/(\d+)/);
      travelMins = m ? parseInt(m[1], 10) : 35;
      routeNo = route.no;
      freq = route.freq;
      fare = route.fare;
      timeLabel = route.time;
    } else {
      genericNote =
        '<p class="plan-result-note">Route not in our database yet. Allow 35 min travel time as estimate.</p>';
    }

    const parts = arriveStr.split(':');
    const arriveMins = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
    const departMins = arriveMins - travelMins - 5;

    resultEl.innerHTML =
      '<div class="search-card" style="margin-top:0;">' +
      '<h3 style="font-family:\'Baloo 2\',cursive;color:var(--purple);margin-bottom:12px;">🚌 Take Route ' + routeNo + '</h3>' +
      '<div class="plan-result-row"><span>From</span><span>' + from + '</span></div>' +
      '<div class="plan-result-row"><span>To</span><span>' + to + '</span></div>' +
      '<div class="plan-result-row"><span>Travel Time</span><span>' + timeLabel + '</span></div>' +
      '<div class="plan-result-row"><span>Arrive By</span><span>' + formatTime(arriveMins) + '</span></div>' +
      '<div class="plan-highlight">⏰ Leave by: ' + formatTime(departMins) + '</div>' +
      '<div class="plan-result-row"><span>Frequency</span><span>' + freq + '</span></div>' +
      '<div class="plan-result-row"><span>Fare</span><span style="color:var(--orange);font-weight:800;">₹' + fare + '</span></div>' +
      genericNote +
      '<p class="plan-result-note">💡 We added 5 min buffer. Catch the bus at least 3 min before departure.</p>' +
      '</div>';
    if (isKannada) applyDomLanguage();
  };

  function injectSOS() {
    if (document.getElementById('sos-btn')) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'sos-btn';
    btn.title = 'Emergency SOS';
    btn.textContent = '🆘';
    btn.addEventListener('click', function () {
      const modal = document.getElementById('sos-modal');
      if (modal) modal.classList.add('open');
    });
    document.body.appendChild(btn);

    const modal = document.createElement('div');
    modal.id = 'sos-modal';
    modal.innerHTML =
      '<div class="sos-inner">' +
      '<div class="sos-emoji">🆘</div>' +
      '<div class="sos-heading">Emergency Help</div>' +
      '<div class="sos-sub">Share your location or contact depot immediately.</div>' +
      '<button type="button" class="sos-action sos-depot">📞 Call CBS Depot: 0821-2345678</button>' +
      '<button type="button" class="sos-action sos-police">🚔 Call Police: 100</button>' +
      '<button type="button" class="sos-action sos-close-btn">✕ Close</button>' +
      '<div class="sos-note">📍 Always share your route number and bus number with emergency contacts.</div>' +
      '</div>';
    modal.addEventListener('click', function (e) {
      if (e.target === modal) modal.classList.remove('open');
    });
    modal.querySelector('.sos-depot').addEventListener('click', function () {
      window.location.href = 'tel:08212345678';
    });
    modal.querySelector('.sos-police').addEventListener('click', function () {
      window.location.href = 'tel:100';
    });
    modal.querySelector('.sos-close-btn').addEventListener('click', function () {
      modal.classList.remove('open');
    });
    document.body.appendChild(modal);
  }

  function injectAlertBanner() {
    if (document.getElementById('alert-banner')) return;
    const tabs = document.querySelector('.tabs');
    if (!tabs) return;
    const banner = document.createElement('div');
    banner.id = 'alert-banner';
    banner.style.cssText =
      'background:linear-gradient(135deg,#F5A623,#F26522);color:#fff;padding:10px 20px;font-size:0.82rem;font-weight:600;display:none;align-items:center;justify-content:space-between;gap:10px;font-family:Inter,sans-serif;';
    banner.innerHTML =
      '<span class="alert-msg">⚠️ Route 101 delayed today — Dasara parade traffic near Palace Road. Allow 15 extra minutes.</span>' +
      '<button type="button" class="alert-dismiss" aria-label="Dismiss">✕</button>';
    banner.querySelector('.alert-dismiss').addEventListener('click', function () {
      alertDismissed = true;
      banner.style.display = 'none';
    });
    tabs.insertAdjacentElement('beforebegin', banner);
  }

  function parseRoutePill(pill) {
    const onclick = pill.getAttribute('onclick') || '';
    const m = onclick.match(/fillRoute\s*\(\s*'([^']*)'\s*,\s*'([^']*)'\s*\)/);
    if (m) return { from: m[1], to: m[2] };
    const text = pill.textContent.replace(/[⭐☆✕]/g, '').trim();
    const arrow = text.split('→');
    if (arrow.length >= 2) {
      return { from: arrow[0].trim(), to: arrow[1].replace(/₹\d+/, '').trim() };
    }
    return null;
  }

  function isRouteSaved(from, to) {
    return savedRoutes.some(function (r) { return r.from === from && r.to === to; });
  }

  function toggleSaveRoute(from, to) {
    const idx = savedRoutes.findIndex(function (r) { return r.from === from && r.to === to; });
    if (idx >= 0) savedRoutes.splice(idx, 1);
    else savedRoutes.push({ from: from, to: to });
    renderMyRoutes();
    updateRouteStarButtons();
  }

  function renderMyRoutes() {
    const section = document.getElementById('my-routes-section');
    if (!section) return;
    const row = section.querySelector('.my-routes-scroll');
    if (!row) return;
    row.innerHTML = '';
    if (savedRoutes.length === 0) {
      row.innerHTML = '<div class="my-routes-empty">Tap ⭐ on any route to save it here.</div>';
      if (isKannada) applyDomLanguage();
      return;
    }
    savedRoutes.forEach(function (r, i) {
      const pill = document.createElement('div');
      pill.className = 'route-pill';
      pill.style.cursor = 'pointer';
      pill.innerHTML = r.from + ' → ' + r.to +
        ' <button type="button" class="route-star-btn" data-remove="' + i + '" style="color:#E74C3C;">✕</button>';
      pill.addEventListener('click', function (e) {
        if (e.target.closest('[data-remove]')) return;
        if (typeof fillRoute === 'function') fillRoute(r.from, r.to);
      });
      pill.querySelector('[data-remove]').addEventListener('click', function (e) {
        e.stopPropagation();
        savedRoutes.splice(i, 1);
        renderMyRoutes();
        updateRouteStarButtons();
      });
      row.appendChild(pill);
    });
    if (isKannada) applyDomLanguage();
  }

  function injectMyRoutesSection() {
    const home = document.getElementById('page-home');
    if (!home || document.getElementById('my-routes-section')) return;
    const section = document.createElement('div');
    section.id = 'my-routes-section';
    section.innerHTML =
      '<div class="section-header">⭐ My Saved Routes</div>' +
      '<div class="my-routes-scroll"></div>';
    const hero = home.querySelector('.hero');
    if (hero) home.insertBefore(section, hero);
    else home.insertBefore(section, home.firstChild);
    renderMyRoutes();
  }

  function updateRouteStarButtons() {
    document.querySelectorAll('#page-home .route-pill').forEach(function (pill) {
      const route = parseRoutePill(pill);
      if (!route) return;
      const star = pill.querySelector('.route-star-btn');
      if (star) {
        star.textContent = isRouteSaved(route.from, route.to) ? '⭐' : '☆';
      }
    });
  }

  function injectRouteStars() {
    if (routeStarsInjected) return;
    const pills = document.querySelectorAll('#page-home .route-pill');
    if (!pills.length) return;
    pills.forEach(function (pill) {
      if (pill.querySelector('.route-star-btn')) return;
      const route = parseRoutePill(pill);
      if (!route) return;
      const star = document.createElement('button');
      star.type = 'button';
      star.className = 'route-star-btn';
      star.textContent = isRouteSaved(route.from, route.to) ? '⭐' : '☆';
      star.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleSaveRoute(route.from, route.to);
      });
      pill.appendChild(star);
    });
    routeStarsInjected = true;
  }

  function injectLostFoundForm() {
    if (document.getElementById('lf-form-card')) return;
    const page = document.getElementById('page-lost');
    const reportBtn = page && page.querySelector('.report-btn');
    const firstCard = page && page.querySelector('.lf-card');
    if (!page || !reportBtn) return;

    const card = document.createElement('div');
    card.id = 'lf-form-card';
    card.className = 'search-card';
    card.innerHTML =
      '<h3>📝 Report a Lost or Found Item</h3>' +
      '<div class="field-group"><input type="text" id="lf-item" placeholder="Item name (e.g. Black Wallet)"></div>' +
      '<div class="field-group"><input type="text" id="lf-desc" placeholder="Description & where found/lost"></div>' +
      '<div class="field-group"><label>Route</label><select id="lf-route">' +
      '<option>Route 101</option><option>Route 102</option><option>Route 103</option>' +
      '<option>Route 104</option><option>Route 105</option><option>Route 106</option></select></div>' +
      '<div class="field-group"><input type="tel" id="lf-contact" placeholder="Your contact number"></div>' +
      '<div class="field-group"><input type="file" accept="image/*" capture="environment" id="lf-camera" style="padding:10px;background:#fff;border:1.5px dashed var(--orange);border-radius:10px;width:100%;"></div>' +
      '<div class="lf-toggle-row">' +
      '<button type="button" id="lf-type-lost" class="active">🔍 I Lost Something</button>' +
      '<button type="button" id="lf-type-found">✅ I Found Something</button></div>' +
      '<button type="button" class="btn-primary" onclick="submitLostFound()">📤 Submit Report</button>' +
      '<div id="lf-submit-result"></div>';

    const lostBtn = card.querySelector('#lf-type-lost');
    const foundBtn = card.querySelector('#lf-type-found');
    lostBtn.addEventListener('click', function () {
      lfTypeLost = true;
      lostBtn.classList.add('active');
      foundBtn.classList.remove('active');
    });
    foundBtn.addEventListener('click', function () {
      lfTypeLost = false;
      foundBtn.classList.add('active');
      lostBtn.classList.remove('active');
    });

    if (currentUser && currentUser.type === 'employee') {
      lostBtn.style.display = 'none';
      foundBtn.click();
    }
    if (currentUser && currentUser.type === 'user') {
      foundBtn.style.display = 'none';
      lostBtn.click();
    }

    reportBtn.insertAdjacentElement('afterend', card);
  }

  window.submitLostFound = async function () {
    const item = document.getElementById('lf-item').value;
    const desc = document.getElementById('lf-desc').value;
    const route = document.getElementById('lf-route').value;
    const contact = document.getElementById('lf-contact').value;
    const resultEl = document.getElementById('lf-submit-result');

    if (!item.trim() || !contact.trim()) {
      showToast('Please fill in Item and Contact fields.');
      return;
    }

    resultEl.textContent = '⏳ Sending to cloud...';

    try {
      const response = await fetch('https://mysorebussathi.vercel.app/api/lostandfound', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          item: item, 
          desc: desc, 
          route: route, 
          contact: contact, 
          type: typeof lfTypeLost !== 'undefined' ? (lfTypeLost ? 'lost' : 'found') : 'report' 
        })
      });

      if (response.ok) {
        resultEl.textContent = '✅ Saved to cloud!';
        document.getElementById('lf-item').value = '';
        document.getElementById('lf-desc').value = '';
        document.getElementById('lf-contact').value = '';
      } else {
        resultEl.textContent = '❌ Error saving to database.';
      }
    } catch (err) {
      resultEl.textContent = '❌ Cloud connection failed.';
    }
};

  function injectPassCalculator() {
    if (document.getElementById('pass-calc-card')) return;
    const faresPage = document.getElementById('page-fares');
    if (!faresPage) return;
    const fareCards = faresPage.querySelectorAll('.search-card');
    const anchor = fareCards.length ? fareCards[fareCards.length - 1] : null;
    const fcFrom = document.getElementById('fc-from');
    const routeOpts = fcFrom ? fcFrom.innerHTML : '';

    const card = document.createElement('div');
    card.id = 'pass-calc-card';
    card.className = 'search-card';
    card.innerHTML =
      '<h3>🎟️ Monthly Pass Calculator</h3>' +
      '<div class="field-group"><label>Your Daily Route</label><select id="pass-route">' + routeOpts + '</select></div>' +
      '<div class="field-group"><label>Working days per month</label>' +
      '<input type="number" id="pass-days" min="1" max="26" value="22" placeholder="22"></div>' +
      '<div class="pass-toggle-row">' +
      '<button type="button" id="pass-single" class="active">Single Trip</button>' +
      '<button type="button" id="pass-return">Return Trip</button></div>' +
      '<button type="button" class="btn-primary" onclick="calcPass()">🎟️ Calculate Pass Cost</button>' +
      '<div id="pass-result"></div>';

    const singleBtn = card.querySelector('#pass-single');
    const returnBtn = card.querySelector('#pass-return');
    singleBtn.addEventListener('click', function () {
      passReturnTrip = false;
      singleBtn.classList.add('active');
      returnBtn.classList.remove('active');
    });
    returnBtn.addEventListener('click', function () {
      passReturnTrip = true;
      returnBtn.classList.add('active');
      singleBtn.classList.remove('active');
    });

    if (anchor) anchor.insertAdjacentElement('afterend', card);
    else faresPage.appendChild(card);
  }

  window.calcPass = function () {
    const routeSel = document.getElementById('pass-route');
    const daysEl = document.getElementById('pass-days');
    const resultEl = document.getElementById('pass-result');
    if (!routeSel || !resultEl) return;

    const routeText = routeSel.value;
    const days = parseInt(daysEl && daysEl.value ? daysEl.value : '22', 10) || 22;
    const fcFrom = document.getElementById('fc-from');
    const fcTo = document.getElementById('fc-to');
    let fare = 20;
    if (fcFrom && fcTo) {
      const from = fcFrom.value;
      const to = fcTo.value;
      const key = from + '|' + to;
      const revKey = to + '|' + from;
      if (typeof FARE_MAP !== 'undefined') {
        fare = FARE_MAP[key] || FARE_MAP[revKey] || fare;
      }
    }
    if (typeof ROUTES !== 'undefined') {
      Object.keys(ROUTES).forEach(function (k) {
        const r = ROUTES[k];
        if (routeText.indexOf(r.no) >= 0 || routeText.indexOf(k.split('|')[1]) >= 0) {
          fare = r.fare;
        }
      });
    }
    const tripMultiplier = passReturnTrip ? 2 : 1;
    const singleTripMonthly = fare * days * 2 * tripMultiplier;
    const passCost = singleTripMonthly * 0.65;
    const savings = singleTripMonthly - passCost;

    resultEl.innerHTML =
      '<div class="pass-result-box">' +
      '<div class="pass-without">Without Pass: ₹' + singleTripMonthly + '</div>' +
      '<div class="pass-monthly">Monthly Pass: ₹' + passCost.toFixed(0) + '</div>' +
      '<div class="pass-savings">You save ₹' + savings.toFixed(0) + ' per month 🎉</div>' +
      '<div class="pass-note">Approximate. Actual KSRTC pass prices may vary. Check at CBS counter.</div>' +
      '</div>';
    if (isKannada) applyDomLanguage();
  };

  function onLogoutCleanup() {
    savedRoutes = [];
    routeStarsInjected = false;
    alertDismissed = false;
    const mySec = document.getElementById('my-routes-section');
    if (mySec) mySec.remove();
    const banner = document.getElementById('alert-banner');
    if (banner) banner.style.display = 'none';
    const sos = document.getElementById('sos-btn');
    if (sos) sos.style.display = 'none';
    document.querySelectorAll('#page-home .route-star-btn').forEach(function (b) { b.remove(); });
  }

  function pollAuthUI() {
    const loggedIn = typeof currentUser !== 'undefined' && currentUser !== null;
    const sos = document.getElementById('sos-btn');
    const banner = document.getElementById('alert-banner');

    if (loggedIn) {
      if (sos) sos.style.display = 'flex';
      if (banner && !alertDismissed) banner.style.display = 'flex';
      injectMyRoutesSection();
      injectRouteStars();
      updateRouteStarButtons();
    } else {
      if (sos) sos.style.display = 'none';
      if (banner) banner.style.display = 'none';
      if (lastLoggedIn) onLogoutCleanup();
    }
    lastLoggedIn = loggedIn;
    if (typeof checkQRTicketBtn === 'function') checkQRTicketBtn();
  }

  function initNewFeatures() {
    injectLangToggle();
    injectThemeToggle();
    initThemeState();
    injectPlanTab();
    injectPlanPage();
    injectSOS();
    injectAlertBanner();
    injectLostFoundForm();
    injectPassCalculator();
    setInterval(pollAuthUI, 500);
    pollAuthUI();
  }

  (window as any).initNewFeatures = initNewFeatures;
})();


/* ── PASS & PAY · PAYMENT SHEET · QR TICKET ── */
(function () {
  'use strict';

  var passPageReturnTrip = false;
  var calculatedPassCost = 0;
  var calculatedDailyCost = 0;
  var selectedPassRoute = '';
  var selectedDailyRoute = '';
  var currentPayData = null;
  var payTimer = null;

  var PAY_METHODS = [
    { bg: '#34A853', emoji: 'G', name: 'Google Pay', tag: 'Pay via Google account' },
    { bg: '#5F259F', emoji: '₹', name: 'PhonePe', tag: "India's #1 UPI app" },
    { bg: '#2D6BE4', emoji: 'R', name: 'Razorpay', tag: 'Trusted by 8M+ businesses' },
    { bg: '#00B9F1', emoji: 'P', name: 'Paytm', tag: 'Wallet + UPI + Cards' },
    { bg: '#FF6B00', emoji: 'B', name: 'BHIM UPI', tag: 'Government of India UPI' },
    { bg: '#FF9900', emoji: 'A', name: 'Amazon Pay', tag: 'Linked to Amazon account' },
    { bg: '#1A1F71', emoji: '💳', name: 'Credit/Debit Card', tag: 'Visa · Mastercard · RuPay' },
    { bg: '#003087', emoji: '🏦', name: 'Net Banking', tag: 'All major Indian banks' },
    { bg: '#6B7280', emoji: '📲', name: 'IMPS / NEFT', tag: 'Direct bank transfer' },
    { bg: '#6C3FC7', emoji: 'M', name: 'MobiKwik', tag: 'Super wallet & UPI' }
  ];

  function formatRouteLabel(key, route) {
    var dest = key.split('|')[1] || key.split('|')[0];
    return 'Route ' + route.no + ' — CBS → ' + dest;
  }

  function buildRouteOptionsHtml() {
    if (typeof ROUTES === 'undefined') return '';
    var html = '';
    Object.keys(ROUTES).forEach(function (key) {
      var r = ROUTES[key];
      var label = formatRouteLabel(key, r);
      html += '<option value="' + label.replace(/"/g, '&quot;') + '">' + label + '</option>';
    });
    return html;
  }

  function fareFromRouteSelect(routeText) {
    var fare = 20;
    if (typeof ROUTES !== 'undefined') {
      Object.keys(ROUTES).forEach(function (k) {
        var r = ROUTES[k];
        if (routeText.indexOf(r.no) >= 0 || routeText.indexOf(k.split('|')[1]) >= 0) {
          fare = r.fare;
        }
      });
    }
    return fare;
  }

  function initPassPage() {
    var routeOpts = buildRouteOptionsHtml();
    var monthlySel = document.getElementById('pass-pg-route');
    var dailySel = document.getElementById('pass-pg-daily-route');
    if (monthlySel) monthlySel.innerHTML = routeOpts;
    if (dailySel) dailySel.innerHTML = routeOpts;

    var todayEl = document.getElementById('pass-today-date');
    if (todayEl) {
      todayEl.textContent = new Date().toLocaleDateString('en-IN', {
        weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
      });
    }

    var subMonthly = document.getElementById('pass-sub-monthly');
    var subDaily = document.getElementById('pass-sub-daily');
    var panelM = document.getElementById('pass-monthly-panel');
    var panelD = document.getElementById('pass-daily-panel');
    if (subMonthly && subDaily) {
      subMonthly.addEventListener('click', function () {
        subMonthly.classList.add('active');
        subDaily.classList.remove('active');
        if (panelM) panelM.style.display = 'block';
        if (panelD) panelD.style.display = 'none';
      });
      subDaily.addEventListener('click', function () {
        subDaily.classList.add('active');
        subMonthly.classList.remove('active');
        if (panelM) panelM.style.display = 'none';
        if (panelD) panelD.style.display = 'block';
      });
    }

    var singleBtn = document.getElementById('pass-pg-single');
    var returnBtn = document.getElementById('pass-pg-return');
    if (singleBtn && returnBtn) {
      singleBtn.addEventListener('click', function () {
        passPageReturnTrip = false;
        singleBtn.classList.add('active');
        returnBtn.classList.remove('active');
      });
      returnBtn.addEventListener('click', function () {
        passPageReturnTrip = true;
        returnBtn.classList.add('active');
        singleBtn.classList.remove('active');
      });
    }

    var calcM = document.getElementById('btn-calc-monthly');
    if (calcM) calcM.addEventListener('click', calcPassPageMonthly);

    var calcD = document.getElementById('btn-calc-daily');
    if (calcD) calcD.addEventListener('click', calcPassPageDaily);

    var buyM = document.getElementById('btn-buy-monthly');
    if (buyM) {
      buyM.addEventListener('click', function () {
        openPaymentSheet({
          passType: 'Monthly Pass',
          amount: calculatedPassCost,
          route: selectedPassRoute,
          validity: '30 days'
        });
      });
    }

    var buyD = document.getElementById('btn-buy-daily');
    if (buyD) {
      buyD.addEventListener('click', function () {
        openPaymentSheet({
          passType: 'Daily Pass',
          amount: calculatedDailyCost,
          route: selectedDailyRoute,
          validity: 'Today only'
        });
      });
    }
  }

  function calcPassPageMonthly() {
    var routeSel = document.getElementById('pass-pg-route');
    var daysEl = document.getElementById('pass-pg-days');
    var resultEl = document.getElementById('pass-pg-result');
    var buyBtn = document.getElementById('btn-buy-monthly');
    if (!routeSel || !resultEl) return;

    selectedPassRoute = routeSel.value;
    var days = parseInt(daysEl && daysEl.value ? daysEl.value : '22', 10) || 22;
    var fare = fareFromRouteSelect(selectedPassRoute);
    var tripMultiplier = passPageReturnTrip ? 2 : 1;
    var singleTripMonthly = fare * days * 2 * tripMultiplier;
    calculatedPassCost = Math.round(singleTripMonthly * 0.65);
    var savings = Math.round(singleTripMonthly - calculatedPassCost);

    resultEl.innerHTML =
      '<div class="pass-result-box">' +
      '<div class="pass-without">Without Pass: ₹' + singleTripMonthly + '</div>' +
      '<div class="pass-monthly">Monthly Pass: ₹' + calculatedPassCost + '</div>' +
      '<div class="pass-savings">You save ₹' + savings + ' per month 🎉</div>' +
      '</div>';
    resultEl.style.display = 'block';
    if (buyBtn) buyBtn.style.display = 'block';
  }

  function calcPassPageDaily() {
    var routeSel = document.getElementById('pass-pg-daily-route');
    var tripsEl = document.getElementById('pass-pg-trips');
    var resultEl = document.getElementById('pass-daily-result');
    var buyBtn = document.getElementById('btn-buy-daily');
    if (!routeSel || !resultEl) return;

    selectedDailyRoute = routeSel.value;
    var trips = parseInt(tripsEl && tripsEl.value ? tripsEl.value : '2', 10) || 2;
    var fare = fareFromRouteSelect(selectedDailyRoute);
    var totalWithout = fare * trips;
    calculatedDailyCost = Math.round(totalWithout * 0.90);
    var savings = totalWithout - calculatedDailyCost;

    resultEl.innerHTML =
      '<div class="pass-result-box">' +
      '<div class="pass-without">Without Pass: ₹' + totalWithout + '</div>' +
      '<div class="pass-monthly">Daily Pass: ₹' + calculatedDailyCost + '</div>' +
      '<div class="pass-savings">You save ₹' + savings + '</div>' +
      '</div>';
    resultEl.style.display = 'block';
    if (buyBtn) buyBtn.style.display = 'block';
  }

  function setPayStep(step) {
    [1, 2, 3, 4].forEach(function (n) {
      var el = document.getElementById('pay-step-' + n);
      if (!el) return;
      el.classList.remove('active');
      if (n === step) {
        requestAnimationFrame(function () { el.classList.add('active'); });
      }
    });
  }

  function buildPayMethodsList() {
    var list = document.getElementById('pay-methods-list');
    if (!list || list.children.length) return;
    PAY_METHODS.forEach(function (m) {
      var card = document.createElement('div');
      card.className = 'pay-method-card';
      card.innerHTML =
        '<div class="pay-method-icon" style="background:' + m.bg + ';">' + m.emoji + '</div>' +
        '<div class="pay-method-info"><div class="pay-m-name">' + m.name + '</div>' +
        '<div class="pay-m-tag">' + m.tag + '</div></div>' +
        '<span class="pay-method-chevron">›</span>';
      card.addEventListener('click', function () { goToPayStep3(m.name); });
      list.appendChild(card);
    });
  }

  window.openPaymentSheet = function (passData, maybeAmount, maybeRoute, maybeValidity) {
    if (typeof passData === 'string') {
      passData = {
        passType: passData,
        amount: typeof maybeAmount === 'number' ? maybeAmount : (parseInt(maybeAmount, 10) || 30),
        route: maybeRoute || 'CBS → Chamundi Betta',
        validity: maybeValidity || 'Valid for 3 Hours'
      };
    } else if (passData && typeof passData === 'object') {
      if (!passData.validity) {
        passData.validity = (passData.passType && passData.passType.indexOf('Ticket') >= 0)
          ? 'Valid for 3 Hours'
          : ((passData.passType && passData.passType.indexOf('Daily') >= 0) ? 'Today only' : '30 days');
      }
    }
    currentPayData = passData;
    buildPayMethodsList();
    var overlay = document.getElementById('payment-sheet-overlay');
    var summary = document.getElementById('pay-summary-card');
    var proceed = document.getElementById('pay-proceed-btn');
    var amt2 = document.getElementById('pay-step2-amt');
    if (!overlay || !passData) return;

    var emoji = (passData.passType && passData.passType.indexOf('Daily') >= 0)
      ? '☀️'
      : ((passData.passType && passData.passType.indexOf('Ticket') >= 0) ? '🎫' : '📅');
    if (summary) {
      summary.innerHTML =
        '<div class="pay-summary-row"><span>' + emoji + ' ' + passData.passType + '</span>' +
        '<span style="color:#6B7280;font-size:0.82rem;">' + passData.validity + '</span></div>' +
        '<div class="pay-summary-row" style="margin-bottom:0;"><span style="color:#6B7280;">' + passData.route + '</span></div>' +
        '<div class="pay-summary-row pay-amount"><span>Amount</span>' +
        '<span class="pay-amt-val">₹' + passData.amount + '</span></div>';
    }
    if (proceed) proceed.textContent = 'Proceed to Pay ₹' + passData.amount + ' →';
    if (amt2) amt2.textContent = '₹' + passData.amount;
    setPayStep(1);
    overlay.classList.add('open');
  };

  window.closePaymentSheet = function () {
    var overlay = document.getElementById('payment-sheet-overlay');
    if (overlay) overlay.classList.remove('open');
    if (payTimer) { clearTimeout(payTimer); payTimer = null; }
  };

  window.goToPayStep2 = function () { setPayStep(2); };

  window.goToPayStep3 = function (methodName) {
    setPayStep(3);
    var pill = document.getElementById('pay-processing-method');
    if (pill) pill.textContent = methodName;
    if (payTimer) clearTimeout(payTimer);
    payTimer = setTimeout(function () { goToPayStep4(); }, 2200);
  };

  window.goToPayStep4 = function () {
    setPayStep(4);
    if (!currentPayData) return;

    var lastTxnId = 'TXN' + Math.floor(Math.random() * 9000000000 + 1000000000);
    var now = new Date();
    var dateStr = now.toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric'
    }) + ' · ' + now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

    var isTicket = currentPayData.passType.indexOf('Ticket') >= 0;
    var isDaily = currentPayData.passType.indexOf('Daily') >= 0;
    var ticketId = isTicket
      ? ('KSRTC-TKT-' + Math.floor(Math.random() * 900000 + 100000))
      : (isDaily
        ? ('KSRTC-DP-' + Math.floor(Math.random() * 900000 + 100000))
        : ('MBS' + Math.floor(Math.random() * 90000000 + 10000000)));
    var validHours = isTicket ? 3 : (isDaily ? 24 : 720);
    var validUntil = new Date(Date.now() + validHours * 3600000).toISOString();
    var randomSeed = Math.random().toString(36).substring(2, 12).toUpperCase();

    var ticketObj = {
      id: ticketId,
      ticketId: ticketId,
      passType: currentPayData.passType,
      type: isTicket ? 'ticket' : 'pass',
      route: currentPayData.route,
      amount: currentPayData.amount,
      purchasedAt: now.toISOString(),
      dateStr: dateStr,
      validUntil: validUntil,
      isDaily: isDaily,
      isTicket: isTicket,
      randomSeed: randomSeed,
      pax: ticketPassengerCount || 1,
      userId: (typeof currentUser !== 'undefined' && currentUser) ? currentUser.phone : 'guest',
      txnId: lastTxnId
    };

    try {
      localStorage.setItem('mbs_active_ticket', JSON.stringify(ticketObj));
    } catch (e) {}
    if (typeof (window as any).saveBooking === 'function') {
      (window as any).saveBooking(ticketObj);
    }

    var card = document.getElementById('pay-txn-card');
    if (card) {
      card.innerHTML =
        '<div class="pay-txn-row"><span>Transaction ID</span><span>' + lastTxnId + '</span></div>' +
        '<div class="pay-txn-row"><span>Amount</span><span>₹' + currentPayData.amount + '</span></div>' +
        '<div class="pay-txn-row"><span>Date & Time</span><span>' + dateStr + '</span></div>' +
        '<div class="pay-txn-row"><span>' + (isTicket ? 'Ticket Type' : 'Pass Type') + '</span><span>' + currentPayData.passType + '</span></div>' +
        '<div class="pay-txn-row"><span>Route</span><span style="max-width:55%;text-align:right;font-size:0.78rem;">' + currentPayData.route + '</span></div>' +
        '<div class="pay-txn-row"><span>Status</span><span class="pay-status-badge">✅ ACTIVE</span></div>';
    }
    checkQRTicketBtn();
  };

  var ticketPassengerCount = 1;
  var ticketIsReturn = false;
  var currentTicketFare = 30;

  function initTicketsPage() {
    var todayEl = document.getElementById('ticket-today-date');
    if (todayEl) {
      var d = new Date();
      todayEl.textContent = d.toLocaleDateString('en-IN', {
        weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
      });
    }
    calcTicketFare();
  }

  function swapTicketStops() {
    var fromEl = document.getElementById('ticket-from-stop');
    var toEl = document.getElementById('ticket-to-stop');
    if (!fromEl || !toEl) return;
    var temp = fromEl.value;
    fromEl.value = toEl.value;
    toEl.value = temp;
    calcTicketFare();
  }

  function setTicketTripType(isReturn) {
    ticketIsReturn = !!isReturn;
    var singleBtn = document.getElementById('ticket-type-single');
    var returnBtn = document.getElementById('ticket-type-return');
    if (singleBtn) {
      singleBtn.style.background = ticketIsReturn ? '#fff' : '#F26522';
      singleBtn.style.color = ticketIsReturn ? 'var(--text)' : '#fff';
    }
    if (returnBtn) {
      returnBtn.style.background = ticketIsReturn ? '#F26522' : '#fff';
      returnBtn.style.color = ticketIsReturn ? '#fff' : 'var(--text)';
    }
    calcTicketFare();
  }

  function changePassengerCount(delta) {
    ticketPassengerCount = Math.max(1, Math.min(10, ticketPassengerCount + delta));
    var el = document.getElementById('ticket-passenger-count');
    if (el) el.textContent = String(ticketPassengerCount);
    calcTicketFare();
  }

  function calcTicketFare() {
    var fromEl = document.getElementById('ticket-from-stop');
    var toEl = document.getElementById('ticket-to-stop');
    if (!fromEl || !toEl) return 30;

    var from = fromEl.value;
    var to = toEl.value;

    var normFrom = from.replace(/\s*\(.*\)\s*/, '').trim() || from;
    var normTo = to.replace(/\s*\(.*\)\s*/, '').trim() || to;

    var base = 20;
    if (normFrom === normTo) {
      base = 15;
    } else {
      var key = normFrom + '|' + normTo;
      var revKey = normTo + '|' + normFrom;
      if (typeof FARE_MAP !== 'undefined') {
        base = FARE_MAP[key] || FARE_MAP[revKey] || FARE_MAP[from + '|' + to] || FARE_MAP[to + '|' + from] || 20;
      }
    }

    var volvoRadio = document.querySelector('input[name="bus-cat"]:checked');
    var isVolvo = volvoRadio && volvoRadio.value === 'volvo';
    if (isVolvo) base += 10;

    var catOrd = document.getElementById('cat-ordinary-label');
    var catVol = document.getElementById('cat-volvo-label');
    if (catOrd && catVol) {
      catOrd.style.borderColor = isVolvo ? 'var(--border)' : 'var(--orange)';
      catOrd.style.background = isVolvo ? '#fff' : '#FFF8F2';
      catVol.style.borderColor = isVolvo ? 'var(--green)' : 'var(--border)';
      catVol.style.background = isVolvo ? '#E8F8EE' : '#fff';
    }

    var multiplier = ticketIsReturn ? 2 : 1;
    var total = base * ticketPassengerCount * multiplier;
    currentTicketFare = total;

    var baseEl = document.getElementById('ticket-base-fare');
    if (baseEl) baseEl.textContent = '₹' + base + (isVolvo ? ' (Volvo AC)' : '');

    var paxEl = document.getElementById('ticket-calc-pax');
    if (paxEl) paxEl.textContent = ticketPassengerCount + ' Passenger' + (ticketPassengerCount > 1 ? 's' : '');

    var tripEl = document.getElementById('ticket-calc-trip-label');
    if (tripEl) tripEl.textContent = ticketIsReturn ? '2x (Round Trip)' : '1x (One-way)';

    var totalEl = document.getElementById('ticket-total-fare');
    if (totalEl) totalEl.textContent = '₹' + total;

    var buyBtn = document.getElementById('btn-buy-qr-ticket');
    if (buyBtn) {
      var isK = (window as any).isKannada;
      buyBtn.textContent = isK
        ? '💳 ಪಾವತಿಸಿ QR ಟಿಕೆಟ್ ಪಡೆಯಿರಿ (₹' + total + ') →'
        : '💳 Pay & Get QR Ticket (₹' + total + ') →';
    }

    return total;
  }

  function proceedToBuyTicket() {
    var fromEl = document.getElementById('ticket-from-stop') as HTMLSelectElement | null;
    var toEl = document.getElementById('ticket-to-stop') as HTMLSelectElement | null;
    var from = fromEl ? fromEl.value : 'CBS (City Bus Stand)';
    var to = toEl ? toEl.value : 'Chamundi Betta';
    var volvoRadio = document.querySelector('input[name="bus-cat"]:checked') as HTMLInputElement | null;
    var isVolvo = volvoRadio && volvoRadio.value === 'volvo';
    var busCatStr = isVolvo ? 'Vajra AC Volvo' : 'Ordinary City Bus';

    var total = calcTicketFare();
    var routeText = from + ' → ' + to + ' (' + busCatStr + ')';
    var passTypeStr = (ticketIsReturn ? 'Round Trip QR Ticket' : 'Single Journey QR Ticket') + ' (' + ticketPassengerCount + ' Pax)';

    if (typeof (window as any).openPaymentSheet === 'function') {
      (window as any).openPaymentSheet({
        passType: passTypeStr,
        amount: total,
        route: routeText,
        validity: 'Valid for 3 Hours'
      });
    }
  }

  (window as any).swapTicketStops = swapTicketStops;
  (window as any).setTicketTripType = setTicketTripType;
  (window as any).changePassengerCount = changePassengerCount;
  (window as any).calcTicketFare = calcTicketFare;
  (window as any).proceedToBuyTicket = proceedToBuyTicket;
  (window as any).initTicketsPage = initTicketsPage;

  function renderRandomQRCode(container, payload) {
    if (!container) return;
    container.innerHTML = '';

    if (typeof window !== 'undefined' && typeof (window as any).QRCode === 'function') {
      try {
        new (window as any).QRCode(container, {
          text: payload,
          width: 180,
          height: 180,
          colorDark: '#1A1A2E',
          colorLight: '#ffffff'
        });
        return;
      } catch (err) {}
    }

    var size = 25;
    var grid = [];
    for (var r = 0; r < size; r++) {
      grid[r] = [];
      for (var c = 0; c < size; c++) {
        grid[r][c] = Math.random() > 0.48 ? 1 : 0;
      }
    }

    function stamp(sR, sC) {
      for (var row = 0; row < 7; row++) {
        for (var col = 0; col < 7; col++) {
          if (row === 0 || row === 6 || col === 0 || col === 6 || (row >= 2 && row <= 4 && col >= 2 && col <= 4)) {
            grid[sR + row][sC + col] = 1;
          } else {
            grid[sR + row][sC + col] = 0;
          }
        }
      }
      for (var k = 0; k < 8; k++) {
        if (sR + 7 < size && sC + k < size) grid[sR + 7][sC + k] = 0;
        if (sR + k < size && sC + 7 < size) grid[sR + k][sC + 7] = 0;
        if (sR - 1 >= 0 && sC + k < size) grid[sR - 1][sC + k] = 0;
        if (sR + k < size && sC - 1 >= 0) grid[sR + k][sC - 1] = 0;
      }
    }

    stamp(0, 0);
    stamp(0, size - 7);
    stamp(size - 7, 0);

    for (var t = 8; t < size - 8; t++) {
      grid[6][t] = t % 2 === 0 ? 1 : 0;
      grid[t][6] = t % 2 === 0 ? 1 : 0;
    }

    var m = size - 9;
    for (var ar = 0; ar < 5; ar++) {
      for (var ac = 0; ac < 5; ac++) {
        if (ar === 0 || ar === 4 || ac === 0 || ac === 4 || (ar === 2 && ac === 2)) {
          grid[m + ar][m + ac] = 1;
        } else {
          grid[m + ar][m + ac] = 0;
        }
      }
    }

    var rects = '';
    var mSize = 7;
    for (var rowIdx = 0; rowIdx < size; rowIdx++) {
      for (var colIdx = 0; colIdx < size; colIdx++) {
        if (grid[rowIdx][colIdx] === 1) {
          rects += '<rect x="' + (colIdx * mSize) + '" y="' + (rowIdx * mSize) + '" width="' + mSize + '" height="' + mSize + '" fill="#1A1A2E" />';
        }
      }
    }

    container.innerHTML =
      '<div style="background:#fff;padding:12px;border-radius:14px;box-shadow:0 4px 16px rgba(0,0,0,0.12);display:inline-block;">' +
      '<svg width="180" height="180" viewBox="0 0 ' + (size * mSize) + ' ' + (size * mSize) + '" style="display:block;">' +
      '<rect width="' + (size * mSize) + '" height="' + (size * mSize) + '" fill="#ffffff" />' +
      rects +
      '</svg>' +
      '</div>';
  }

  // ── MY BOOKINGS SYSTEM ──
  function getBookingsList() {
    var stored = null;
    try {
      stored = localStorage.getItem('mbs_my_bookings');
    } catch (e) {}
    if (stored) {
      try {
        var parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }

    // Seed realistic initial bookings so user immediately sees both booked tickets and passes
    var seeded = [
      {
        id: 'KSRTC-TKT-392104',
        ticketId: 'KSRTC-TKT-392104',
        type: 'ticket',
        passType: 'Single Journey QR Ticket (1 Pax)',
        route: 'CBS (City Bus Stand) → Chamundi Betta (Route 101*)',
        amount: 30,
        pax: 1,
        purchasedAt: new Date(Date.now() - 35 * 60000).toISOString(),
        dateStr: new Date(Date.now() - 35 * 60000).toLocaleDateString('en-IN', {
          day: 'numeric', month: 'short', year: 'numeric'
        }) + ' · ' + new Date(Date.now() - 35 * 60000).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        validUntil: new Date(Date.now() + 145 * 60000).toISOString(),
        isDaily: false,
        isTicket: true,
        txnId: 'TXN8912409182',
        paymentMethod: 'UPI (Google Pay)',
        busCategory: 'Ordinary City Bus',
        randomSeed: 'TKT' + Math.random().toString(36).substring(2, 8).toUpperCase()
      },
      {
        id: 'KSRTC-DP-819203',
        ticketId: 'KSRTC-DP-819203',
        type: 'pass',
        passType: 'KSRTC Daily Bus Pass',
        route: 'All Mysuru City Routes (Unlimited Travel)',
        amount: 70,
        pax: 1,
        purchasedAt: new Date(new Date().setHours(7, 30, 0, 0)).toISOString(),
        dateStr: new Date(new Date().setHours(7, 30, 0, 0)).toLocaleDateString('en-IN', {
          day: 'numeric', month: 'short', year: 'numeric'
        }) + ' · 07:30 AM',
        validUntil: new Date(new Date().setHours(23, 59, 59, 999)).toISOString(),
        isDaily: true,
        isTicket: false,
        txnId: 'TXN7291830491',
        paymentMethod: 'PhonePe UPI',
        busCategory: 'City Bus All Routes',
        randomSeed: 'PASS' + Math.random().toString(36).substring(2, 8).toUpperCase()
      }
    ];
    try {
      localStorage.setItem('mbs_my_bookings', JSON.stringify(seeded));
    } catch (e) {}
    return seeded;
  }

  function saveBooking(booking: any) {
    var list = getBookingsList();
    list.unshift(booking);
    try {
      localStorage.setItem('mbs_my_bookings', JSON.stringify(list));
    } catch (e) {}
    updateBookingsBadge();
    if (typeof currentBookingsFilter !== 'undefined') {
      renderBookingsList(currentBookingsFilter);
    }
  }

  function updateBookingsBadge() {
    var list = getBookingsList();
    var now = new Date();
    var activeCount = 0;
    list.forEach(function (b: any) {
      if (new Date(b.validUntil) > now) activeCount++;
    });
    var badge = document.getElementById('nav-bookings-badge');
    if (badge) {
      badge.textContent = String(activeCount);
      badge.style.display = activeCount > 0 ? 'inline-block' : 'none';
    }
  }

  var currentBookingsFilter = 'all';

  function filterBookings(cat: string) {
    currentBookingsFilter = cat;
    document.querySelectorAll('.bookings-filter-tab').forEach(function (tab: any) {
      if (tab.id === 'bfilter-' + cat) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
    renderBookingsList(cat);
  }

  function renderBookingsList(filter: string) {
    var container = document.getElementById('bookings-list-content');
    if (!container) return;

    var list = getBookingsList();
    var now = new Date();

    var totalAll = list.length;
    var totalTickets = list.filter(function (b: any) { return b.type === 'ticket' || b.isTicket; }).length;
    var totalPasses = list.filter(function (b: any) { return b.type === 'pass' || b.isDaily || (b.passType && b.passType.indexOf('Pass') >= 0); }).length;

    var countAllEl = document.getElementById('bcount-all');
    var countTicketsEl = document.getElementById('bcount-tickets');
    var countPassesEl = document.getElementById('bcount-passes');
    if (countAllEl) countAllEl.textContent = String(totalAll);
    if (countTicketsEl) countTicketsEl.textContent = String(totalTickets);
    if (countPassesEl) countPassesEl.textContent = String(totalPasses);

    var filtered = list.filter(function (b: any) {
      if (filter === 'tickets') return b.type === 'ticket' || b.isTicket;
      if (filter === 'passes') return b.type === 'pass' || b.isDaily || (b.passType && b.passType.indexOf('Pass') >= 0);
      return true;
    });

    if (filtered.length === 0) {
      var emptyTitle = filter === 'tickets' ? 'No Booked Tickets' : (filter === 'passes' ? 'No Booked Passes' : 'No Bookings Found');
      var emptyDesc = filter === 'tickets'
        ? 'You haven’t booked any QR bus tickets yet.'
        : (filter === 'passes'
          ? 'You haven’t purchased any bus passes yet.'
          : 'Book your daily pass or instant QR tickets to travel with ease.');
      var btnText = filter === 'tickets' ? '🎫 Buy QR Ticket' : '🎟️ Buy Daily Pass';
      var tabTarget = filter === 'tickets' ? 'tickets' : 'pass';

      container.innerHTML =
        '<div class="bookings-empty-state">' +
        '<div class="bempty-icon">📭</div>' +
        '<div class="bempty-title">' + emptyTitle + '</div>' +
        '<div class="bempty-desc">' + emptyDesc + '</div>' +
        '<button type="button" class="btn-primary" style="margin:0 auto;padding:10px 20px;font-size:0.9rem;" onclick="closeBookingsModalDirect(); showTab(\'' + tabTarget + '\');">' + btnText + ' →</button>' +
        '</div>';
      return;
    }

    var html = '';
    filtered.forEach(function (b: any) {
      var isValid = new Date(b.validUntil) > now;
      var isTkt = b.type === 'ticket' || b.isTicket;
      var typeBadgeClass = isTkt ? 'type-ticket' : 'type-pass';
      var cardBorderClass = isTkt ? 'card-ticket' : 'card-pass';
      var typeText = isTkt ? '🎫 QR BUS TICKET' : '🎟️ BUS PASS';
      var statusClass = isValid ? 'status-active' : 'status-expired';
      var statusText = isValid ? '🟢 ACTIVE' : '⏳ EXPIRED';

      var formattedValid = new Date(b.validUntil).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
      });

      var bookingDate = b.dateStr || new Date(b.purchasedAt).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
      });

      var paxStr = (b.pax || 1) + ' Pax';

      html +=
        '<div class="booking-card ' + cardBorderClass + '">' +
          '<div class="booking-card-top">' +
            '<span class="booking-type-badge ' + typeBadgeClass + '">' + typeText + '</span>' +
            '<span class="booking-status-pill ' + statusClass + '">' + statusText + '</span>' +
          '</div>' +
          '<h4 class="booking-route-title">' + (b.route || 'CBS → Chamundi Betta') + '</h4>' +
          '<div class="booking-meta-row">' +
            '<span>' + (b.passType || (isTkt ? 'Single QR Ticket' : 'Daily Pass')) + '</span>' +
            '<span style="font-weight:700;color:var(--purple);">' + paxStr + '</span>' +
          '</div>' +
          '<div class="booking-details-grid">' +
            '<div class="bdetail-item">' +
              '<span class="bdetail-label">Booking / Ticket ID</span>' +
              '<span class="bdetail-val" style="font-family:monospace;font-size:0.8rem;">' + (b.ticketId || b.id) + '</span>' +
            '</div>' +
            '<div class="bdetail-item">' +
              '<span class="bdetail-label">Fare Paid</span>' +
              '<span class="bdetail-val fare">₹' + (b.amount || 30) + '</span>' +
            '</div>' +
            '<div class="bdetail-item">' +
              '<span class="bdetail-label">Booked At</span>' +
              '<span class="bdetail-val">' + bookingDate + '</span>' +
            '</div>' +
            '<div class="bdetail-item">' +
              '<span class="bdetail-label">Valid Until</span>' +
              '<span class="bdetail-val" style="color:' + (isValid ? '#27AE60' : '#9CA3AF') + ';">' + formattedValid + '</span>' +
            '</div>' +
          '</div>' +
          '<div class="booking-card-actions">' +
            '<button type="button" class="btn-view-qr-booking" onclick="showBookingQR(\'' + (b.id || b.ticketId) + '\')">' +
              '📱 View QR Code →' +
            '</button>' +
            '<button type="button" class="btn-print-booking" onclick="printBookingTicket(\'' + (b.id || b.ticketId) + '\')" title="Print / Receipt">' +
              '📄 Receipt' +
            '</button>' +
          '</div>' +
        '</div>';
    });

    container.innerHTML = html;
  }

  function openBookingsModal() {
    var overlay = document.getElementById('bookings-modal-overlay');
    if (overlay) {
      overlay.classList.add('open');
      renderBookingsList(currentBookingsFilter || 'all');
    }
  }

  function closeBookingsModal(e: any) {
    if (e && e.target && e.target.id === 'bookings-modal-overlay') {
      closeBookingsModalDirect();
    }
  }

  function closeBookingsModalDirect() {
    var overlay = document.getElementById('bookings-modal-overlay');
    if (overlay) overlay.classList.remove('open');
  }

  function showBookingQR(bookingId: string) {
    var list = getBookingsList();
    var item = list.find(function (b: any) { return b.id === bookingId || b.ticketId === bookingId; });
    if (item) {
      try {
        localStorage.setItem('mbs_active_ticket', JSON.stringify(item));
      } catch (e) {}
      closeBookingsModalDirect();
      if (typeof (window as any).openQRModal === 'function') {
        (window as any).openQRModal(item);
      }
    }
  }

  function printBookingTicket(bookingId: string) {
    var list = getBookingsList();
    var item = list.find(function (b: any) { return b.id === bookingId || b.ticketId === bookingId; });
    if (!item) return;
    if (typeof (window as any).showToast === 'function') {
      (window as any).showToast('📄 Booking Receipt: ' + (item.ticketId || item.id) + ' (₹' + item.amount + ')');
    }
  }

  (window as any).getBookingsList = getBookingsList;
  (window as any).saveBooking = saveBooking;
  (window as any).updateBookingsBadge = updateBookingsBadge;
  (window as any).filterBookings = filterBookings;
  (window as any).renderBookingsList = renderBookingsList;
  (window as any).openBookingsModal = openBookingsModal;
  (window as any).closeBookingsModal = closeBookingsModal;
  (window as any).closeBookingsModalDirect = closeBookingsModalDirect;
  (window as any).showBookingQR = showBookingQR;
  (window as any).printBookingTicket = printBookingTicket;

  window.openQRModal = function (passedTicket) {
    var ticket = passedTicket;
    if (!ticket) {
      try {
        ticket = JSON.parse(localStorage.getItem('mbs_active_ticket') || 'null');
      } catch (e) { ticket = null; }
    }
    if (!ticket || new Date(ticket.validUntil) < new Date()) {
      var list = getBookingsList();
      ticket = (list && list.length > 0) ? list[0] : {
        ticketId: 'KSRTC-DP-' + Math.floor(Math.random() * 900000 + 100000),
        passType: 'KSRTC Daily Bus Pass',
        route: 'All Mysuru City Routes (Unlimited)',
        amount: 70,
        validUntil: new Date(Date.now() + 24 * 3600000).toISOString(),
        purchasedAt: new Date().toISOString()
      };
      try {
        localStorage.setItem('mbs_active_ticket', JSON.stringify(ticket));
      } catch (e) {}
    }
    var titleEl = document.getElementById('qr-modal-title');
    if (titleEl) {
      titleEl.textContent = (ticket.isTicket || (ticket.passType && ticket.passType.indexOf('Ticket') >= 0))
        ? '🎫 Digital QR Bus Ticket'
        : '🎟️ My Bus Pass';
    }
    var info = document.getElementById('qr-pass-info');
    var tid = document.getElementById('qr-ticket-id');
    var val = document.getElementById('qr-validity');
    var tokenEl = document.getElementById('qr-token-badge');
    var container = document.getElementById('qr-code-container');
    var overlay = document.getElementById('qr-modal-overlay');

    if (info) info.textContent = ticket.passType + ' · ' + ticket.route;
    if (tid) {
      var isTkt = ticket.isTicket || (ticket.passType && ticket.passType.indexOf('Ticket') >= 0);
      tid.textContent = (isTkt ? 'Ticket ID: ' : 'Pass ID: ') + (ticket.ticketId || ticket.id);
    }
    if (val) {
      val.textContent = 'Valid until: ' + new Date(ticket.validUntil).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
      });
    }

    var randomToken = Math.random().toString(36).substring(2, 10).toUpperCase() + '-' + Math.floor(1000 + Math.random() * 9000);
    if (tokenEl) {
      tokenEl.textContent = '🔐 Conductor Token: #' + randomToken;
      tokenEl.style.display = 'inline-block';
    }

    if (container) {
      var isTktQ = ticket.isTicket || (ticket.passType && ticket.passType.indexOf('Ticket') >= 0);
      var prefix = isTktQ ? 'KSRTC-QR-TICKET|' : 'KSRTC-DAILY-PASS|';
      var randomQrText = prefix + 'ID:' + (ticket.ticketId || ticket.id) + '|SEC:' + randomToken + '|RAND:' + Math.random().toString(36).substring(2, 14).toUpperCase() + '|TS:' + Date.now();
      renderRandomQRCode(container, randomQrText);
    }
    if (overlay) overlay.style.display = 'flex';
  };

  window.regenerateRandomQR = function () {
    var ticket;
    try {
      ticket = JSON.parse(localStorage.getItem('mbs_active_ticket') || 'null');
    } catch (e) { ticket = null; }
    if (!ticket) return;
    var container = document.getElementById('qr-code-container');
    var tokenEl = document.getElementById('qr-token-badge');
    var randomToken = Math.random().toString(36).substring(2, 10).toUpperCase() + '-' + Math.floor(1000 + Math.random() * 9000);
    if (tokenEl) tokenEl.textContent = '🔐 Conductor Token: #' + randomToken;
    if (container) {
      var isTktQ = ticket.isTicket || (ticket.passType && ticket.passType.indexOf('Ticket') >= 0);
      var prefix = isTktQ ? 'KSRTC-QR-TICKET|' : 'KSRTC-DAILY-PASS|';
      var randomQrText = prefix + 'ID:' + ticket.ticketId + '|SEC:' + randomToken + '|RAND:' + Math.random().toString(36).substring(2, 14).toUpperCase() + '|TS:' + Date.now();
      renderRandomQRCode(container, randomQrText);
    }
    if (typeof showToast === 'function') {
      showToast('🔄 Generated fresh random QR Code');
    }
  };

  window.closeQRModal = function () {
    var overlay = document.getElementById('qr-modal-overlay');
    if (overlay) overlay.style.display = 'none';
  };

  window.checkQRTicketBtn = function () {
    var btn = document.getElementById('qr-ticket-btn');
    if (!btn) return;
    var loggedIn = typeof currentUser !== 'undefined' && currentUser !== null;
    if (!loggedIn) { btn.style.display = 'none'; return; }
    try {
      var ticket = JSON.parse(localStorage.getItem('mbs_active_ticket') || 'null');
      if (ticket && new Date(ticket.validUntil) > new Date()) {
        btn.style.display = 'flex';
      } else {
        btn.style.display = 'none';
      }
    } catch (e) { btn.style.display = 'none'; }
  };

  function initPaymentUI() {
    var overlay = document.getElementById('payment-sheet-overlay');
    if (overlay) {
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closePaymentSheet();
      });
    }
    var proceed = document.getElementById('pay-proceed-btn');
    if (proceed) proceed.addEventListener('click', goToPayStep2);
    var cancel1 = document.getElementById('pay-cancel-1');
    if (cancel1) cancel1.addEventListener('click', closePaymentSheet);
    var back2 = document.getElementById('pay-back-2');
    if (back2) back2.addEventListener('click', function () { setPayStep(1); });
    var viewQr = document.getElementById('pay-view-qr');
    if (viewQr) {
      viewQr.addEventListener('click', function () {
        openQRModal();
        closePaymentSheet();
      });
    }
    var done = document.getElementById('pay-done-btn');
    if (done) done.addEventListener('click', closePaymentSheet);

    var qrOverlay = document.getElementById('qr-modal-overlay');
    if (qrOverlay) {
      qrOverlay.addEventListener('click', function (e) {
        if (e.target === qrOverlay) closeQRModal();
      });
    }
    var qrBtn = document.getElementById('qr-ticket-btn');
    if (qrBtn) qrBtn.addEventListener('click', openQRModal);
  }

  function initPassPayFeatures() {
    initPassPage();
    initPaymentUI();
    buildPayMethodsList();
    checkQRTicketBtn();
    updateBookingsBadge();
  }

  (window as any).initPassPayFeatures = initPassPayFeatures;
})();


// QRCode fallback for reliability
if (typeof window !== 'undefined' && !window.QRCode) {
  window.QRCode = function (el, options) {
    const text = typeof options === 'string' ? options : (options && options.text) || 'MBS-TICKET';
    el.innerHTML = `
      <div style="background:#fff;padding:12px;display:inline-block;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
        <svg width="150" height="150" viewBox="0 0 100 100" style="display:block;">
          <rect width="100" height="100" fill="#ffffff" />
          <rect x="10" y="10" width="25" height="25" fill="#4B1E8F" />
          <rect x="15" y="15" width="15" height="15" fill="#ffffff" />
          <rect x="18" y="18" width="9" height="9" fill="#4B1E8F" />
          
          <rect x="65" y="10" width="25" height="25" fill="#4B1E8F" />
          <rect x="70" y="15" width="15" height="15" fill="#ffffff" />
          <rect x="73" y="18" width="9" height="9" fill="#4B1E8F" />
          
          <rect x="10" y="65" width="25" height="25" fill="#4B1E8F" />
          <rect x="15" y="70" width="15" height="15" fill="#ffffff" />
          <rect x="18" y="73" width="9" height="9" fill="#4B1E8F" />
          
          <rect x="42" y="12" width="6" height="6" fill="#4B1E8F" />
          <rect x="52" y="12" width="6" height="6" fill="#4B1E8F" />
          <rect x="42" y="24" width="6" height="12" fill="#4B1E8F" />
          <rect x="52" y="30" width="6" height="6" fill="#4B1E8F" />
          
          <rect x="12" y="42" width="6" height="6" fill="#4B1E8F" />
          <rect x="24" y="42" width="12" height="6" fill="#4B1E8F" />
          <rect x="18" y="52" width="6" height="6" fill="#4B1E8F" />
          
          <rect x="42" y="42" width="16" height="16" fill="#F26522" rx="4" />
          <text x="50" y="53" font-size="8" fill="#fff" font-weight="bold" text-anchor="middle">MBS</text>
          
          <rect x="65" y="42" width="8" height="6" fill="#4B1E8F" />
          <rect x="78" y="42" width="6" height="10" fill="#4B1E8F" />
          <rect x="70" y="52" width="14" height="6" fill="#4B1E8F" />
          
          <rect x="42" y="65" width="6" height="12" fill="#4B1E8F" />
          <rect x="52" y="70" width="8" height="6" fill="#4B1E8F" />
          <rect x="42" y="82" width="12" height="6" fill="#4B1E8F" />
          <rect x="65" y="65" width="10" height="6" fill="#4B1E8F" />
          <rect x="80" y="72" width="8" height="8" fill="#4B1E8F" />
          <rect x="68" y="82" width="16" height="6" fill="#4B1E8F" />
        </svg>
      </div>
    `;
  };
}

// ── TRANSIT NOTIFICATIONS & ALERTS ──
function openNotifModal() {
  const m = document.getElementById('notif-modal');
  if (m) {
    m.classList.add('open');
    if ((window as any).isKannada && typeof (window as any).applyDomLanguage === 'function') {
      (window as any).applyDomLanguage();
    }
  }
}

function closeNotifModal(e: any) {
  if (e && e.target && e.target.id === 'notif-modal') {
    closeNotifModalDirect();
  }
}

function closeNotifModalDirect() {
  const m = document.getElementById('notif-modal');
  if (m) m.classList.remove('open');
}

function filterNotifs(category: string) {
  document.querySelectorAll('.notif-filter-chip').forEach(function (c: any) {
    if (c.getAttribute('data-filter') === category) c.classList.add('active');
    else c.classList.remove('active');
  });
  const items = document.querySelectorAll('.notif-item-card');
  items.forEach(function (item: any) {
    if (category === 'all' || item.getAttribute('data-category') === category) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

function refreshAlerts() {
  const isK = (window as any).isKannada;
  if (typeof (window as any).showToast === 'function') {
    (window as any).showToast(isK ? '✅ ಸಂಚಾರ ಎಚ್ಚರಿಕೆಗಳನ್ನು ನವೀಕರಿಸಲಾಗಿದೆ (ಸಿಬಿಎಸ್ ಸಂಚಾರ ನಿಯಂತ್ರಣ ಕೊಠಡಿ)' : '✅ Live Transit Alerts refreshed from CBS Control Room');
  }
  document.querySelectorAll('.notif-time-tag').forEach(function (el: any) {
    el.textContent = isK ? 'ಈಗಷ್ಟೇ ನವೀಕರಿಸಲಾಗಿದೆ' : 'Updated just now';
  });
}

(window as any).openNotifModal = openNotifModal;
(window as any).closeNotifModal = closeNotifModal;
(window as any).closeNotifModalDirect = closeNotifModalDirect;
(window as any).filterNotifs = filterNotifs;
(window as any).refreshAlerts = refreshAlerts;

export function initMysuruBusApp() {
  if (typeof window === 'undefined') return;

  // Initialize Login & App Chrome
  if (typeof (window as any).initLogin === 'function') {
    (window as any).initLogin();
  }

  // Hook up user authentication events
  if (typeof (window as any).setupUserAuthUI === 'function') {
    (window as any).setupUserAuthUI();
  }

  // Render initial seat displays on Crowd page
  if (typeof (window as any).renderSeats === 'function') {
    (window as any).renderSeats('seats-1', 12, 40);
    (window as any).renderSeats('seats-2', 29, 40);
    (window as any).renderSeats('seats-3', 38, 40);
  }

  // Initialize New Features (Kannada, SOS, Plan Trip, Alert Banner, Saved Routes, Lost & Found Form)
  if (typeof (window as any).initNewFeatures === 'function') {
    (window as any).initNewFeatures();
  }

  // Initialize Pass & Pay, Payment Sheet, and QR ticket
  if (typeof (window as any).initPassPayFeatures === 'function') {
    (window as any).initPassPayFeatures();
  }

  // Initialize My Bookings badge
  if (typeof (window as any).updateBookingsBadge === 'function') {
    (window as any).updateBookingsBadge();
  }
}
