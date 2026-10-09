export const BODY_HTML = `<!-- NAV -->
<nav>
  <a class="nav-brand" href="#">
    <div class="nav-logo">🚌</div>
    <div class="nav-title">Mysuru<span>Bus</span> Saathi</div>
  </a>
  <ul class="nav-links">
    <li>
      <button id="nav-bookings-btn" type="button" class="nav-bookings-btn" title="View Booked Tickets & Passes" aria-label="My Bookings" onclick="openBookingsModal()">
        <span class="nav-bookings-icon">🎟️</span>
        <span class="nav-bookings-text">My Bookings</span>
        <span class="nav-bookings-badge" id="nav-bookings-badge">2</span>
      </button>
    </li>
    <li>
      <button id="nav-notif-btn" type="button" class="nav-notif-btn" title="Live Route & Bus Alerts" aria-label="Route Alerts" onclick="openNotifModal()">
        <span class="bell-icon">🔔</span>
        <span class="notif-badge" id="notif-badge-count">3</span>
      </button>
    </li>
  </ul>
</nav>

<!-- TABS -->
<div class="tabs">
  <button class="tab-btn active" onclick="showTab('home')">🏠 Home</button>
  <button class="tab-btn" onclick="showTab('tickets')">🎫 Buy QR Tickets</button>
  <button class="tab-btn" onclick="showTab('routes')">🗺️ Routes</button>
  <button class="tab-btn" onclick="showTab('timings')">⏰ Timings</button>
  <button class="tab-btn" onclick="showTab('crowd')">👥 Crowd</button>
  <button class="tab-btn" onclick="showTab('nextbus')">🚌 Next Bus</button>
  <button class="tab-btn" onclick="showTab('fares')">💰 Fares</button>
  <button class="tab-btn" onclick="showTab('pass')">🎟️ Pass & Pay</button>
  <button class="tab-btn" onclick="showTab('lost')">🔍 Lost & Found</button>
</div>

<!-- ══════════ HOME ══════════ -->
<div id="page-home" class="page active">
  <div class="hero">
    <div class="hero-tag">📍 City Bus Depot — CBS, Mysuru</div>
    <h1>Mysuru<span>Bus</span> Saathi 💛</h1>
    <p>Your smart companion for KSRTC City buses. Real-time routes, crowd, fares & more.</p>
  </div>

  <div class="section-header">⚡ Quick Access</div>
  <div class="quick-grid">
    <div class="quick-card" onclick="showTab('tickets')">
      <div class="icon">🎫</div>
      <h4>Buy QR Ticket</h4>
      <p>Instant phone tickets</p>
    </div>
    <div class="quick-card" onclick="showTab('routes')">
      <div class="icon">🗺️</div>
      <h4>Route Finder</h4>
      <p>Find best bus route</p>
    </div>
    <div class="quick-card" onclick="showTab('timings')">
      <div class="icon">⏰</div>
      <h4>Bus Timings</h4>
      <p>First & last bus times</p>
    </div>
    <div class="quick-card" onclick="showTab('crowd')">
      <div class="icon">👥</div>
      <h4>Live Crowd</h4>
      <p>Seat availability</p>
    </div>
    <div class="quick-card" onclick="showTab('lost')">
      <div class="icon">🔍</div>
      <h4>Lost & Found</h4>
      <p>Report lost items</p>
    </div>
  </div>

  <div class="section-header">🔥 Popular Routes from CBS</div>
  <div>
    <div class="route-pill" onclick="fillRoute('CBS','Chamundi Betta')">CBS → Chamundi Betta <span class="fare">₹30</span></div>
    <div class="route-pill" onclick="fillRoute('CBS','Mysore Palace')">CBS → Mysore Palace <span class="fare">₹15</span></div>
    <div class="route-pill" onclick="fillRoute('CBS','Gokulam')">CBS → Gokulam <span class="fare">₹20</span></div>
    <div class="route-pill" onclick="fillRoute('CBS','Hebbal')">CBS → Hebbal <span class="fare">₹22</span></div>
    <div class="route-pill" onclick="fillRoute('CBS','Vijayanagar')">CBS → Vijayanagar <span class="fare">₹18</span></div>
    <div class="route-pill" onclick="fillRoute('CBS','Kuvempunagar')">CBS → Kuvempunagar <span class="fare">₹15</span></div>
    <div class="route-pill" onclick="fillRoute('CBS','Saraswathipuram')">CBS → Saraswathipuram <span class="fare">₹18</span></div>
    <div class="route-pill" onclick="fillRoute('CBS','Siddarthanagar')">CBS → Siddarthanagar <span class="fare">₹20</span></div>
  </div>
</div>

<!-- ══════════ BUY QR TICKETS ══════════ -->
<div id="page-tickets" class="page">
  <div class="section-header">🎫 Buy QR Bus Tickets</div>
  <p style="font-size:0.82rem;color:var(--muted);margin-bottom:16px;">Instant digital transit tickets for KSRTC Mysuru City ordinary and Volvo buses.</p>

  <!-- Live Date & Station Badge -->
  <div class="pass-date-display" id="ticket-today-display" style="background:#FFF8F2;border-radius:10px;padding:12px 14px;font-size:0.88rem;color:#6B7280;margin-bottom:14px;text-align:center;">
    📅 <strong>Today's Service:</strong> <span id="ticket-today-date"></span> · Valid for immediate boarding
  </div>

  <div class="search-card">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
      <h3 style="margin:0;">🚌 Ticket Details</h3>
      <span class="route-tag" style="background:#E8F8EE;color:#27AE60;font-weight:700;font-size:0.75rem;padding:3px 10px;border-radius:12px;">Instant QR on Phone</span>
    </div>

    <!-- From & To Stops -->
    <div class="field-group">
      <label>Origin Stop (Boarding)</label>
      <select id="ticket-from-stop" onchange="calcTicketFare()">
        <option value="CBS (City Bus Stand)">CBS (City Bus Stand)</option>
        <option value="Chamundi Betta">Chamundi Betta</option>
        <option value="Mysore Palace">Mysore Palace</option>
        <option value="Gokulam">Gokulam</option>
        <option value="Hebbal">Hebbal</option>
        <option value="Vijayanagar">Vijayanagar</option>
        <option value="Kuvempunagar">Kuvempunagar</option>
        <option value="Saraswathipuram">Saraswathipuram</option>
        <option value="Siddarthanagar">Siddarthanagar</option>
      </select>
    </div>

    <div style="text-align:center;margin:-4px 0 8px;">
      <button type="button" class="swap-btn" style="background:#F3F4F6;border:1px solid #E5E7EB;border-radius:20px;padding:4px 14px;font-size:0.8rem;font-weight:700;color:var(--purple);cursor:pointer;" onclick="swapTicketStops()">⇅ Swap Boarding / Destination</button>
    </div>

    <div class="field-group">
      <label>Destination Stop</label>
      <select id="ticket-to-stop" onchange="calcTicketFare()">
        <option value="Chamundi Betta">Chamundi Betta (Route 101*)</option>
        <option value="Mysore Palace">Mysore Palace (Route 102*)</option>
        <option value="Gokulam">Gokulam (Route 103*)</option>
        <option value="Hebbal">Hebbal (Route 104*)</option>
        <option value="Vijayanagar">Vijayanagar (Route 105*)</option>
        <option value="Kuvempunagar">Kuvempunagar (Route 106*)</option>
        <option value="Saraswathipuram">Saraswathipuram (Route 107*)</option>
        <option value="Siddarthanagar">Siddarthanagar (Route 108*)</option>
        <option value="CBS (City Bus Stand)">CBS (City Bus Stand)</option>
      </select>
    </div>

    <!-- Trip Type Toggle: Single vs Return -->
    <div style="margin-bottom:14px;">
      <label style="font-size:0.82rem;font-weight:700;color:var(--text);display:block;margin-bottom:6px;">Trip Type</label>
      <div class="pass-toggle-row" style="display:flex;gap:8px;">
        <button type="button" id="ticket-type-single" class="active" style="flex:1;padding:10px;border-radius:10px;border:1.5px solid var(--border);background:#F26522;color:#fff;font-family:'Baloo 2',cursive;font-weight:700;cursor:pointer;font-size:0.88rem;" onclick="setTicketTripType(false)">Single Journey (One-way)</button>
        <button type="button" id="ticket-type-return" style="flex:1;padding:10px;border-radius:10px;border:1.5px solid var(--border);background:#fff;color:var(--text);font-family:'Baloo 2',cursive;font-weight:700;cursor:pointer;font-size:0.88rem;" onclick="setTicketTripType(true)">Round Trip (Return)</button>
      </div>
    </div>

    <!-- Passenger Count Selector -->
    <div style="margin-bottom:16px;">
      <label style="font-size:0.82rem;font-weight:700;color:var(--text);display:block;margin-bottom:6px;">Number of Passengers</label>
      <div style="display:flex;align-items:center;justify-content:space-between;background:#FAF8F6;border:1.5px solid var(--border);border-radius:12px;padding:8px 16px;">
        <span style="font-size:0.88rem;color:#4B5563;font-weight:600;">Passenger(s)</span>
        <div style="display:flex;align-items:center;gap:12px;">
          <button type="button" onclick="changePassengerCount(-1)" style="width:34px;height:34px;border-radius:50%;border:1.5px solid #D1D5DB;background:#fff;font-size:1.1rem;font-weight:800;color:#4B1E8F;cursor:pointer;display:flex;align-items:center;justify-content:center;">−</button>
          <span id="ticket-passenger-count" style="font-family:'Baloo 2',cursive;font-size:1.2rem;font-weight:800;color:var(--purple);min-width:24px;text-align:center;">1</span>
          <button type="button" onclick="changePassengerCount(1)" style="width:34px;height:34px;border-radius:50%;border:1.5px solid #D1D5DB;background:#fff;font-size:1.1rem;font-weight:800;color:#4B1E8F;cursor:pointer;display:flex;align-items:center;justify-content:center;">+</button>
        </div>
      </div>
    </div>

    <!-- Bus Category Option -->
    <div style="margin-bottom:16px;">
      <label style="font-size:0.82rem;font-weight:700;color:var(--text);display:block;margin-bottom:6px;">Bus Category</label>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
        <label id="cat-ordinary-label" style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:#FFF8F2;border:1.5px solid var(--orange);border-radius:10px;cursor:pointer;font-size:0.82rem;font-weight:700;">
          <input type="radio" name="bus-cat" value="ordinary" checked onchange="calcTicketFare()">
          <span>🔴 Ordinary (City Bus)</span>
        </label>
        <label id="cat-volvo-label" style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:#fff;border:1.5px solid var(--border);border-radius:10px;cursor:pointer;font-size:0.82rem;font-weight:700;">
          <input type="radio" name="bus-cat" value="volvo" onchange="calcTicketFare()">
          <span>🟢 Vajra AC Volvo (+₹10)</span>
        </label>
      </div>
    </div>

    <!-- Live Calculation Result Card -->
    <div id="ticket-calc-result" style="background:#FFF8F2;border-radius:14px;padding:16px;border:1.5px solid rgba(242,101,34,0.25);margin-bottom:16px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
        <span style="font-size:0.85rem;color:#6B7280;">Single Ticket Base Fare</span>
        <span id="ticket-base-fare" style="font-weight:700;color:var(--purple);">₹30</span>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
        <span style="font-size:0.85rem;color:#6B7280;">Passengers</span>
        <span id="ticket-calc-pax" style="font-weight:700;color:var(--purple);">1 Passenger</span>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
        <span style="font-size:0.85rem;color:#6B7280;">Trip Multiplier</span>
        <span id="ticket-calc-trip-label" style="font-weight:700;color:var(--purple);">1x (One-way)</span>
      </div>
      <div style="border-top:1px dashed rgba(242,101,34,0.3);padding-top:10px;display:flex;justify-content:space-between;align-items:center;">
        <div>
          <div style="font-size:0.75rem;color:#6B7280;text-transform:uppercase;font-weight:700;">Total Amount</div>
          <div id="ticket-total-fare" style="font-family:'Baloo 2',cursive;font-size:1.6rem;font-weight:800;color:var(--orange);line-height:1;">₹30</div>
        </div>
        <div style="font-size:0.75rem;color:#27AE60;background:#E8F8EE;padding:3px 10px;border-radius:12px;font-weight:700;">
          ⚡ Valid for 3 Hours
        </div>
      </div>
    </div>

    <!-- Shakti Scheme Banner Note -->
    <div style="background:#EBF5FB;border:1px solid #AED6F1;border-radius:10px;padding:10px 12px;font-size:0.78rem;color:#1B4F72;margin-bottom:16px;line-height:1.4;">
      🌸 <strong>Karnataka Shakti Scheme:</strong> Women with Karnataka domicile travel free in Ordinary City buses! Keep your valid Government ID card handy for Conductor physical verification.
    </div>

    <!-- Buy Ticket Button -->
    <button type="button" id="btn-buy-qr-ticket" class="btn-primary" style="width:100%;font-size:1.05rem;padding:14px;" onclick="proceedToBuyTicket()">
      💳 Pay & Get QR Ticket (₹30) →
    </button>
  </div>
</div>

<!-- ══════════ ROUTES ══════════ -->
<div id="page-routes" class="page">
  <div class="search-card">
    <h3>🗺️ Find Best Route</h3>
    <div class="field-group">
      <label>From</label>
      <select id="from-stop">
        <option value="CBS">CBS (City Bus Stand)</option>
        <option>Mysore Palace</option>
        <option>Chamundi Betta</option>
        <option>Gokulam</option>
        <option>Hebbal</option>
        <option>Vijayanagar</option>
        <option>Kuvempunagar</option>
        <option>Saraswathipuram</option>
        <option>Siddarthanagar</option>
        <option>Jayalakshmipuram</option>
        <option>Lakshmipuram</option>
        <option>Yadavagiri</option>
        <option>Bogadi</option>
        <option>Nanjangud Road</option>
        <option>Bannimantap</option>
      </select>
    </div>
    <button class="swap-btn" onclick="swapStops()" title="Swap">⇅</button>
    <div class="field-group">
      <label>To</label>
      <select id="to-stop">
        <option>Chamundi Betta</option>
        <option value="CBS">CBS (City Bus Stand)</option>
        <option>Mysore Palace</option>
        <option>Gokulam</option>
        <option>Hebbal</option>
        <option>Vijayanagar</option>
        <option>Kuvempunagar</option>
        <option>Saraswathipuram</option>
        <option>Siddarthanagar</option>
        <option>Jayalakshmipuram</option>
        <option>Lakshmipuram</option>
        <option>Yadavagiri</option>
        <option>Bogadi</option>
        <option>Nanjangud Road</option>
        <option>Bannimantap</option>
      </select>
    </div>
    <button class="btn-primary" onclick="findRoutes()">🔍 Find Best Route</button>
  </div>

  <div class="results" id="route-results">
    <div class="section-header">✅ Available Routes</div>
  </div>
</div>

<!-- ══════════ TIMINGS ══════════ -->
<div id="page-timings" class="page">
  <div class="search-card" style="margin-bottom:20px;">
    <h3>⏰ Bus Timings</h3>
    <div class="field-group">
      <label>Select Route</label>
      <select onchange="loadTimings(this.value)" id="timing-route">
        <option value="">-- Select a Route --</option>
        <option value="101*">Route 101* — CBS to Chamundi Betta</option>
        <option value="102*">Route 102* — CBS to Mysore Palace</option>
        <option value="103*">Route 103* — CBS to Gokulam</option>
        <option value="104*">Route 104* — CBS to Hebbal</option>
        <option value="105*">Route 105* — CBS to Vijayanagar</option>
        <option value="106*">Route 106* — CBS to Kuvempunagar</option>
        <option value="107*">Route 107* — CBS to Saraswathipuram</option>
        <option value="108*">Route 108* — CBS to Siddarthanagar</option>
      </select>
    </div>
  </div>
  <div id="timings-result"></div>
</div>

<!-- ══════════ CROWD ══════════ -->
<div id="page-crowd" class="page">
  <div class="section-header">👥 Live Crowd Meter</div>
  <p style="font-size:0.82rem;color:var(--muted);margin-bottom:16px;">Real-time crowd levels updated by fellow passengers.</p>

  <div class="crowd-card">
    <div class="bus-id">KA-55-F-1234</div>
    <div class="route-tag">Route 101* · CBS → Chamundi Betta · Next stop: Zoo</div>
    <div class="crowd-bar-wrap"><div class="crowd-bar low" style="width:35%"></div></div>
    <div class="crowd-label"><span>🟢 Low Crowd</span><span>12/40 seats</span></div>
    <div class="seats-row" id="seats-1"></div>
  </div>

  <div class="crowd-card">
    <div class="bus-id">KA-55-F-2288</div>
    <div class="route-tag">Route 102* · CBS → Mysore Palace · Next stop: CBS</div>
    <div class="crowd-bar-wrap"><div class="crowd-bar mid" style="width:72%"></div></div>
    <div class="crowd-label"><span>🟡 Moderate</span><span>29/40 seats</span></div>
    <div class="seats-row" id="seats-2"></div>
  </div>

  <div class="crowd-card">
    <div class="bus-id">KA-55-F-3301</div>
    <div class="route-tag">Route 105* · CBS → Vijayanagar · Departing in 5 min</div>
    <div class="crowd-bar-wrap"><div class="crowd-bar high" style="width:95%"></div></div>
    <div class="crowd-label"><span>🔴 Very Crowded</span><span>38/40 seats</span></div>
    <div class="seats-row" id="seats-3"></div>
  </div>

  <button class="btn-primary" onclick="refreshCrowd()">🔄 Refresh Crowd Data</button>
</div>

<!-- ══════════ NEXT BUS ══════════ -->
<div id="page-nextbus" class="page">
  <div class="search-card">
    <h3>🚌 Next Bus Estimator</h3>
    <div class="field-group">
      <label>From Stop</label>
      <select id="nb-from">
        <option>CBS (City Bus Stand)</option>
        <option>Mysore Palace</option>
        <option>Zoo</option>
        <option>Chamundi Betta</option>
        <option>Gokulam</option>
        <option>Hebbal</option>
        <option>Vijayanagar</option>
      </select>
    </div>
    <div class="field-group">
      <label>To Stop</label>
      <select id="nb-to">
        <option>Chamundi Betta</option>
        <option>CBS (City Bus Stand)</option>
        <option>Mysore Palace</option>
        <option>Gokulam</option>
        <option>Hebbal</option>
        <option>Vijayanagar</option>
      </select>
    </div>
    <button class="btn-primary" onclick="estimateNext()">⏱️ Check Next Bus</button>
  </div>
  <div id="next-bus-result"></div>
</div>

<!-- ══════════ FARES ══════════ -->
<div id="page-fares" class="page">
  <div class="section-header">💰 Government Bus Fares from CBS</div>
  <p style="font-size:0.82rem;color:var(--muted);margin-bottom:16px;">Official KSRTC City Bus fares (Ordinary class). Fares are fixed by Karnataka Government.</p>

  <table class="fare-table">
    <thead>
      <tr>
        <th>From → To</th>
        <th>Route No.</th>
        <th>Fare</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>CBS → Chamundi Betta</td><td>101*</td><td class="fare-val">₹30</td></tr>
      <tr><td>CBS → Mysore Palace</td><td>102*</td><td class="fare-val">₹15</td></tr>
      <tr><td>CBS → Gokulam</td><td>103*</td><td class="fare-val">₹20</td></tr>
      <tr><td>CBS → Hebbal</td><td>104*</td><td class="fare-val">₹22</td></tr>
      <tr><td>CBS → Vijayanagar</td><td>105*</td><td class="fare-val">₹18</td></tr>
      <tr><td>CBS → Kuvempunagar</td><td>106*</td><td class="fare-val">₹15</td></tr>
      <tr><td>CBS → Saraswathipuram</td><td>107*</td><td class="fare-val">₹18</td></tr>
      <tr><td>CBS → Siddarthanagar</td><td>108*</td><td class="fare-val">₹20</td></tr>
      <tr><td>CBS → Jayalakshmipuram</td><td>109</td><td class="fare-val">₹22</td></tr>
      <tr><td>CBS → Yadavagiri</td><td>110</td><td class="fare-val">₹25</td></tr>
      <tr><td>CBS → Bogadi</td><td>111</td><td class="fare-val">₹28</td></tr>
      <tr><td>CBS → Bannimantap</td><td>112</td><td class="fare-val">₹15</td></tr>
      <tr><td>CBS → Nanjangud Road</td><td>113</td><td class="fare-val">₹35</td></tr>
      <tr><td>CBS → Lakshmipuram</td><td>114</td><td class="fare-val">₹18</td></tr>
    </tbody>
  </table>

  <div class="search-card">
    <h3>🧮 Fare Calculator</h3>
    <div class="field-group">
      <label>From</label>
      <select id="fc-from">
        <option>CBS (City Bus Stand)</option>
        <option>Mysore Palace</option>
        <option>Chamundi Betta</option>
      </select>
    </div>
    <div class="field-group">
      <label>To</label>
      <select id="fc-to">
        <option>Chamundi Betta</option>
        <option>CBS (City Bus Stand)</option>
        <option>Mysore Palace</option>
        <option>Gokulam</option>
        <option>Hebbal</option>
        <option>Vijayanagar</option>
        <option>Kuvempunagar</option>
      </select>
    </div>
    <button class="btn-primary" onclick="calcFare()">💰 Calculate Fare</button>
    <div id="fare-result" style="margin-top:14px;display:none;">
      <div style="background:var(--bg);border-radius:12px;padding:16px;text-align:center;">
        <div style="font-size:0.82rem;color:var(--muted);">Estimated Fare</div>
        <div id="fare-amount" style="font-family:'Baloo 2',cursive;font-size:2.5rem;font-weight:800;color:var(--orange);"></div>
        <div style="font-size:0.78rem;color:var(--muted);">KSRTC Ordinary Class</div>
      </div>
    </div>
  </div>
</div>

<!-- ══════════ PASS & PAY ══════════ -->
<div id="page-pass" class="page">
  <div class="pass-subtab-row">
    <button type="button" id="pass-sub-monthly" class="active">📅 Monthly Pass</button>
    <button type="button" id="pass-sub-daily">☀️ Daily Pass</button>
  </div>
  <div id="pass-monthly-panel">
    <div class="section-header">🎟️ Monthly Pass Calculator</div>
    <div class="search-card">
      <div class="field-group">
        <label>Route</label>
        <select id="pass-pg-route"></select>
      </div>
      <div class="field-group">
        <label>Working days / month</label>
        <input type="number" id="pass-pg-days" min="1" max="26" value="22">
      </div>
      <div class="pass-toggle-row">
        <button type="button" id="pass-pg-single" class="active">Single Trip</button>
        <button type="button" id="pass-pg-return">Return Trip</button>
      </div>
      <button type="button" class="btn-primary" id="btn-calc-monthly">Calculate →</button>
      <div id="pass-pg-result" style="display:none;margin-top:14px;"></div>
      <button type="button" class="btn-primary" id="btn-buy-monthly" style="display:none;margin-top:10px;">💳 Buy Monthly Pass →</button>
    </div>
  </div>
  <div id="pass-daily-panel" style="display:none;">
    <div class="section-header">☀️ Daily Pass</div>
    <div class="search-card">
      <div class="field-group">
        <label>Route</label>
        <select id="pass-pg-daily-route"></select>
      </div>
      <div class="field-group">
        <label>Trips today</label>
        <input type="number" id="pass-pg-trips" min="1" max="10" value="2">
      </div>
      <div class="pass-date-display">📅 Today: <strong id="pass-today-date"></strong></div>
      <button type="button" class="btn-primary" id="btn-calc-daily">Calculate →</button>
      <div id="pass-daily-result" style="display:none;margin-top:14px;"></div>
      <button type="button" class="btn-primary" id="btn-buy-daily" style="display:none;margin-top:10px;">💳 Buy Daily Pass →</button>
    </div>
  </div>
</div>

<!-- ══════════ LOST & FOUND ══════════ -->
<div id="page-lost" class="page">
  <div class="section-header">🔍 Lost & Found Board</div>
  <button class="report-btn" onclick="showToast('📝 Report form coming soon!')">+ Report Lost Item</button>

  <div class="section-header" style="font-size:0.9rem;">📋 Recent Found Items</div>

  <div class="lf-card">
    <div class="lf-icon">👜</div>
    <div class="lf-info">
      <h4>Black Handbag</h4>
      <p>Found on Route 101*, near Zoo stop. Contains documents & keys.</p>
      <div class="lf-meta">
        <span>🕐 2 hrs ago</span>
        <span>Route 101*</span>
        <span>🟢 Unclaimed</span>
      </div>
    </div>
  </div>

  <div class="lf-card">
    <div class="lf-icon">📱</div>
    <div class="lf-info">
      <h4>Samsung Mobile Phone</h4>
      <p>Found on Route 102*, CBS stop. Blue cover, cracked screen.</p>
      <div class="lf-meta">
        <span>🕐 5 hrs ago</span>
        <span>Route 102*</span>
        <span>🟢 Unclaimed</span>
      </div>
    </div>
  </div>

  <div class="lf-card">
    <div class="lf-icon">🎒</div>
    <div class="lf-info">
      <h4>School Bag (Blue)</h4>
      <p>Found on Route 105*. Contains textbooks. Handover to CBS depot.</p>
      <div class="lf-meta">
        <span>🕐 1 day ago</span>
        <span>Route 105*</span>
        <span>🟡 Enquired</span>
      </div>
    </div>
  </div>

  <div class="lf-card">
    <div class="lf-icon">👓</div>
    <div class="lf-info">
      <h4>Spectacles (Gold Frame)</h4>
      <p>Found near Chamundi Betta stop. At CBS Lost & Found counter.</p>
      <div class="lf-meta">
        <span>🕐 2 days ago</span>
        <span>Route 101*</span>
        <span>🔴 Claimed</span>
      </div>
    </div>
  </div>

  <p style="font-size:0.78rem;color:var(--muted);text-align:center;margin-top:10px;">
    📍 CBS Lost & Found Counter open 6 AM – 9 PM daily
  </p>
</div>

<!-- ══════════ MODAL ══════════ -->
<div class="modal-overlay" id="modal" onclick="closeModal(event)">
  <div class="modal">
    <div class="modal-handle"></div>
    <h3 id="modal-title">Route Details</h3>
    <div id="modal-body"></div>
    <button class="modal-close" onclick="closeModalDirect()">✕ Close</button>
  </div>
</div>

<!-- TOAST -->
<div class="toast" id="toast"></div>

<button id="qr-ticket-btn" type="button" title="My Ticket QR"
  style="position:fixed;bottom:140px;right:20px;z-index:500;width:52px;height:52px;
  border-radius:50%;background:linear-gradient(135deg,#27AE60,#1e8449);
  color:#fff;font-size:22px;border:none;cursor:pointer;
  box-shadow:0 4px 16px rgba(39,174,96,0.5);display:none;
  align-items:center;justify-content:center;">🎟️</button>

<div id="qr-modal-overlay" style="display:none;position:fixed;inset:0;
  z-index:6000;background:rgba(0,0,0,0.65);align-items:center;
  justify-content:center;padding:20px;">
  <div id="qr-modal" style="background:#fff;border-radius:24px;padding:28px 24px;
    max-width:340px;width:100%;text-align:center;
    box-shadow:0 0 0 3px #27AE60,0 8px 32px rgba(39,174,96,0.3);">
    <div id="qr-modal-title" style="font-family:'Baloo 2',cursive;font-weight:800;font-size:1.15rem;
      color:#4B1E8F;margin-bottom:4px;">🎟️ My Bus Pass</div>
    <div id="qr-pass-info" style="font-size:0.82rem;color:#6B7280;margin-bottom:16px;"></div>
    <div id="qr-code-container" style="display:flex;justify-content:center;margin-bottom:16px;"></div>
    <div id="qr-ticket-id" style="font-family:monospace;font-size:0.78rem;color:#6B7280;margin-bottom:6px;"></div>
    <div id="qr-token-badge" style="font-family:monospace;font-size:0.74rem;color:#F26522;font-weight:700;margin-bottom:10px;background:#FFF8F2;padding:4px 10px;border-radius:10px;display:inline-block;"></div>
    <div style="margin-bottom:10px;"><button type="button" id="btn-refresh-qr" style="background:#FFF8F2;border:1px solid rgba(242,101,34,0.35);color:#F26522;font-family:'Baloo 2',cursive;font-size:0.8rem;font-weight:700;padding:5px 14px;border-radius:12px;cursor:pointer;transition:all 0.15s;" onclick="regenerateRandomQR()">🔄 Refresh Dynamic QR</button></div>
    <div id="qr-validity" style="display:inline-block;background:#E8F8EE;
      color:#27AE60;font-weight:700;font-size:0.8rem;padding:4px 14px;
      border-radius:20px;margin-bottom:16px;"></div>
    <div style="font-size:0.75rem;color:#6B7280;margin-bottom:16px;line-height:1.4;">
      Show this QR to the Conductor for verification</div>
    <div style="display:flex;gap:8px;">
      <button type="button" onclick="closeQRModal(); openBookingsModal();" style="flex:1;padding:12px;background:#FFF8F2;border:1.5px solid var(--orange);border-radius:12px;font-family:'Baloo 2',cursive;font-weight:700;color:var(--orange);cursor:pointer;font-size:0.9rem;">📋 My Bookings</button>
      <button type="button" onclick="closeQRModal()" style="flex:1;padding:12px;background:#F3F4F6;border:none;border-radius:12px;font-family:'Baloo 2',cursive;font-weight:700;color:#4B1E8F;cursor:pointer;font-size:0.95rem;">Close</button>
    </div>
  </div>
</div>

<div id="payment-sheet-overlay">
  <div id="payment-sheet" onclick="event.stopPropagation()">
    <div id="pay-step-1" class="pay-step active" style="padding:24px 20px;">
      <div class="pay-drag-handle"></div>
      <h3 style="font-family:'Baloo 2',cursive;font-weight:800;color:#4B1E8F;margin-bottom:16px;">Order Summary</h3>
      <div class="pay-summary-card" id="pay-summary-card"></div>
      <div class="pay-demo-banner">🎭 DEMO MODE — No real payment</div>
      <button type="button" class="btn-primary" id="pay-proceed-btn" style="width:100%;">Proceed to Pay →</button>
      <button type="button" id="pay-cancel-1" style="display:block;width:100%;margin-top:12px;background:none;border:none;color:#6B7280;font-size:0.88rem;cursor:pointer;text-align:center;">Cancel</button>
    </div>
    <div id="pay-step-2" class="pay-step" style="padding:24px 20px;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
        <div style="display:flex;align-items:center;">
          <button type="button" class="pay-back-btn" id="pay-back-2">←</button>
          <h3 style="font-family:'Baloo 2',cursive;font-weight:800;color:#4B1E8F;font-size:1rem;">Choose Payment Method</h3>
        </div>
        <span class="pay-amt-pill" id="pay-step2-amt">₹0</span>
      </div>
      <div id="pay-methods-list"></div>
    </div>
    <div id="pay-step-3" class="pay-step" style="padding:48px 20px;text-align:center;">
      <div class="pay-spinner"></div>
      <div style="font-weight:700;font-size:1.1rem;margin-top:20px;">Processing Payment…</div>
      <div style="color:#6B7280;font-size:0.82rem;margin-top:8px;">Do not press back or close the app</div>
      <div class="pay-method-pill" id="pay-processing-method"></div>
    </div>
    <div id="pay-step-4" class="pay-step" style="padding:40px 20px;text-align:center;">
      <div class="pay-check-circle"></div>
      <div style="font-family:'Baloo 2',cursive;font-size:1.4rem;font-weight:800;color:#27AE60;margin-top:16px;">Payment Successful! 🎉</div>
      <div class="pay-txn-card" id="pay-txn-card"></div>
      <button type="button" class="btn-primary" id="pay-view-qr" style="width:100%;margin-top:16px;background:linear-gradient(135deg,#27AE60,#1e8449);">🎟️ View My QR Ticket →</button>
      <button type="button" id="pay-done-btn" style="width:100%;margin-top:8px;padding:14px;background:#F3F4F6;border:none;border-radius:12px;font-family:'Baloo 2',cursive;font-weight:700;color:#4B1E8F;cursor:pointer;font-size:0.95rem;">Done</button>
    </div>
  </div>
</div>

<!-- ══════════ NOTIFICATION MODAL ══════════ -->
<div class="notif-modal-overlay" id="notif-modal" onclick="closeNotifModal(event)">
  <div class="notif-modal-card" onclick="event.stopPropagation()">
    <div class="notif-modal-header">
      <div style="display:flex;align-items:center;gap:10px;">
        <div class="notif-header-icon">🔔</div>
        <div>
          <h3 id="notif-modal-title">Live Bus & Route Alerts</h3>
          <p id="notif-modal-sub">Delays, overcrowded buses & route changes in Mysuru</p>
        </div>
      </div>
      <button type="button" class="notif-close-x" onclick="closeNotifModalDirect()" title="Close">✕</button>
    </div>

    <!-- Filter chips -->
    <div class="notif-filter-row">
      <button type="button" class="notif-filter-chip active" data-filter="all" onclick="filterNotifs('all')">All (3)</button>
      <button type="button" class="notif-filter-chip" data-filter="delay" onclick="filterNotifs('delay')">⏱️ Delays (1)</button>
      <button type="button" class="notif-filter-chip" data-filter="crowd" onclick="filterNotifs('crowd')">👥 Overcrowded (1)</button>
      <button type="button" class="notif-filter-chip" data-filter="route" onclick="filterNotifs('route')">🔄 Route Changes (1)</button>
    </div>

    <!-- List of alert cards -->
    <div class="notif-list-container" id="notif-list-container">
      <!-- Item 1: Delay on Route 101* -->
      <div class="notif-item-card delay-type" data-category="delay">
        <div class="notif-item-top">
          <span class="notif-tag delay-tag">⏱️ 15-20 Min Delay</span>
          <span class="notif-time-tag">Updated 4m ago</span>
        </div>
        <div class="notif-item-body">
          <div class="notif-route-badge">Route 101*</div>
          <div class="notif-item-details">
            <h4 class="notif-item-title">CBS ↔ Chamundi Betta (KA-55-F-1234)</h4>
            <p class="notif-item-desc">Heavy pilgrim rush at Chamundi Foothills & slow climb on ghat road. Next departure running with ~15 min delay from CBS Depot.</p>
          </div>
        </div>
        <div class="notif-item-footer">
          <span class="notif-meta-pill">📍 Affected: Foothills, Tavarekatte, Betta</span>
          <button type="button" class="notif-action-btn" onclick="showTab('timings'); loadTimings('101*'); closeNotifModalDirect();">View Timetable →</button>
        </div>
      </div>

      <!-- Item 2: Overcrowded on Route 105* -->
      <div class="notif-item-card crowd-type" data-category="crowd">
        <div class="notif-item-top">
          <span class="notif-tag crowd-tag">👥 95% Overpopulated · Standing Only</span>
          <span class="notif-time-tag">Updated 8m ago</span>
        </div>
        <div class="notif-item-body">
          <div class="notif-route-badge" style="background:#E74C3C;">Route 105*</div>
          <div class="notif-item-details">
            <h4 class="notif-item-title">CBS ↔ Vijayanagar 4th Stage (KA-55-F-3301)</h4>
            <p class="notif-item-desc">High student and office peak crowd near Saraswathipuram & Maruthi Temple. Conductor reported full capacity (38/40 seated + 22 standing passengers).</p>
          </div>
        </div>
        <div class="notif-item-footer">
          <span class="notif-meta-pill">💡 Tip: Board Route 111 (Bogadi) as alternate</span>
          <button type="button" class="notif-action-btn" onclick="showTab('crowd'); closeNotifModalDirect();">Check Live Meter →</button>
        </div>
      </div>

      <!-- Item 3: Route Change on Route 102* -->
      <div class="notif-item-card route-type" data-category="route">
        <div class="notif-item-top">
          <span class="notif-tag route-tag">🔄 Route Diversion</span>
          <span class="notif-time-tag">Valid Today</span>
        </div>
        <div class="notif-item-body">
          <div class="notif-route-badge" style="background:#4B1E8F;">Route 102*</div>
          <div class="notif-item-details">
            <h4 class="notif-item-title">CBS ↔ Mysore Palace (Diversion via Sayyaji Rao Rd)</h4>
            <p class="notif-item-desc">Palace South Gate lane maintenance work underway. Buses diverting via Sayyaji Rao Road & Hardinge Circle. Palace North Gate pickup point active.</p>
          </div>
        </div>
        <div class="notif-item-footer">
          <span class="notif-meta-pill">🚧 Temp stop: Palace North Gate (Gate 2)</span>
          <button type="button" class="notif-action-btn" onclick="fillRoute('CBS','Mysore Palace'); closeNotifModalDirect();">Find Best Route →</button>
        </div>
      </div>
    </div>

    <!-- Modal Footer Actions -->
    <div class="notif-modal-actions">
      <button type="button" class="notif-refresh-btn" onclick="refreshAlerts()">🔄 Refresh Transit Alerts</button>
      <button type="button" class="notif-dismiss-btn" onclick="closeNotifModalDirect()">Done</button>
    </div>
  </div>
</div>

<!-- ══════════ MY BOOKINGS MODAL ══════════ -->
<div class="bookings-modal-overlay" id="bookings-modal-overlay" onclick="closeBookingsModal(event)">
  <div class="bookings-modal-card" onclick="event.stopPropagation()">
    <div class="bookings-modal-header">
      <div style="display:flex;align-items:center;gap:12px;">
        <div class="bookings-header-icon">🎟️</div>
        <div>
          <h3 id="bookings-modal-title" style="margin:0;font-family:'Baloo 2',cursive;font-size:1.24rem;font-weight:800;color:var(--purple);line-height:1.2;">My Bookings</h3>
          <p id="bookings-modal-sub" style="margin:2px 0 0;font-size:0.76rem;color:#6B7280;">Your active & past KSRTC tickets and bus passes</p>
        </div>
      </div>
      <button type="button" class="notif-close-x" onclick="closeBookingsModalDirect()" title="Close Bookings">✕</button>
    </div>

    <!-- Filter Pills: All / Tickets / Passes -->
    <div class="bookings-tabs-bar">
      <button type="button" class="bookings-filter-tab active" id="bfilter-all" onclick="filterBookings('all')">
        All Bookings <span class="bfilter-count" id="bcount-all">0</span>
      </button>
      <button type="button" class="bookings-filter-tab" id="bfilter-tickets" onclick="filterBookings('tickets')">
        🎫 Tickets <span class="bfilter-count" id="bcount-tickets">0</span>
      </button>
      <button type="button" class="bookings-filter-tab" id="bfilter-passes" onclick="filterBookings('passes')">
        🎟️ Passes <span class="bfilter-count" id="bcount-passes">0</span>
      </button>
    </div>

    <!-- Bookings List Container -->
    <div class="bookings-list-content" id="bookings-list-content">
      <!-- Populated dynamically via renderBookingsList() -->
    </div>

    <!-- Modal Footer Actions -->
    <div class="bookings-modal-footer">
      <button type="button" class="bookings-action-btn primary-action" onclick="closeBookingsModalDirect(); showTab('tickets');">
        🎫 Buy QR Ticket
      </button>
      <button type="button" class="bookings-action-btn secondary-action" onclick="closeBookingsModalDirect(); showTab('pass');">
        🎟️ Buy Daily Pass
      </button>
    </div>
  </div>
</div>`;
