/**
 * NetVisual Pro - High Definition Scalable SVG Network Diagrams
 * Handcrafted vector illustrations for Cisco CCNA and ENCOR concepts
 */

const NetworkDiagrams = {
  /**
   * Diagram 1: Protocol Data Unit (PDU) & L2-L4 Encapsulation
   */
  pduEncapsulation: function() {
    return `
      <svg viewBox="0 0 900 360" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
        <defs>
          <linearGradient id="gradEth" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#0284c7" />
            <stop offset="100%" stop-color="#0369a1" />
          </linearGradient>
          <linearGradient id="gradIp" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#8b5cf6" />
            <stop offset="100%" stop-color="#6d28d9" />
          </linearGradient>
          <linearGradient id="gradTcp" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#10b981" />
            <stop offset="100%" stop-color="#047857" />
          </linearGradient>
          <linearGradient id="gradData" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#f59e0b" />
            <stop offset="100%" stop-color="#b45309" />
          </linearGradient>
        </defs>

        <!-- Background -->
        <rect width="900" height="360" fill="#0b1120" rx="12"/>
        <text x="450" y="35" text-anchor="middle" fill="#38bdf8" font-size="18" font-weight="700" letter-spacing="1">DATA ENCAPSULATION & PROTOCOL HEADERS (L2 - L7)</text>

        <!-- Layer 7-5 Data -->
        <g transform="translate(50, 65)">
          <rect x="520" y="0" width="280" height="42" fill="url(#gradData)" rx="6"/>
          <text x="660" y="26" text-anchor="middle" fill="#fff" font-weight="bold" font-size="14">Application Data (HTTP/DNS/SSH)</text>
          <text x="490" y="26" text-anchor="end" fill="#94a3b8" font-size="13">L7-L5</text>
        </g>

        <!-- Layer 4 Segment -->
        <g transform="translate(50, 125)">
          <rect x="360" y="0" width="150" height="42" fill="url(#gradTcp)" rx="6"/>
          <text x="435" y="22" text-anchor="middle" fill="#fff" font-weight="bold" font-size="13">TCP / UDP Header</text>
          <text x="435" y="36" text-anchor="middle" fill="#d1fae5" font-size="10">Src/Dst Port, Seq, Ack</text>
          
          <rect x="520" y="0" width="280" height="42" fill="url(#gradData)" rx="6" opacity="0.85"/>
          <text x="660" y="26" text-anchor="middle" fill="#fff" font-size="14">Payload Data</text>
          <text x="330" y="26" text-anchor="end" fill="#34d399" font-size="13" font-weight="bold">L4 Segment</text>
        </g>

        <!-- Layer 3 Packet -->
        <g transform="translate(50, 185)">
          <rect x="190" y="0" width="160" height="42" fill="url(#gradIp)" rx="6"/>
          <text x="270" y="22" text-anchor="middle" fill="#fff" font-weight="bold" font-size="13">IPv4 / IPv6 Header</text>
          <text x="270" y="36" text-anchor="middle" fill="#ede9fe" font-size="10">Src/Dst IP, TTL, Protocol</text>

          <rect x="360" y="0" width="150" height="42" fill="url(#gradTcp)" rx="6" opacity="0.85"/>
          <text x="435" y="26" text-anchor="middle" fill="#fff" font-size="12">L4 Header</text>

          <rect x="520" y="0" width="280" height="42" fill="url(#gradData)" rx="6" opacity="0.7"/>
          <text x="660" y="26" text-anchor="middle" fill="#fff" font-size="14">Payload Data</text>
          <text x="160" y="26" text-anchor="end" fill="#a78bfa" font-size="13" font-weight="bold">L3 Packet</text>
        </g>

        <!-- Layer 2 Frame -->
        <g transform="translate(50, 245)">
          <!-- Ethernet Header -->
          <rect x="20" y="0" width="160" height="46" fill="url(#gradEth)" rx="6"/>
          <text x="100" y="22" text-anchor="middle" fill="#fff" font-weight="bold" font-size="13">Ethernet Header</text>
          <text x="100" y="38" text-anchor="middle" fill="#bae6fd" font-size="10">Preamble, Dst/Src MAC, Type</text>

          <!-- IP -->
          <rect x="190" y="0" width="160" height="46" fill="url(#gradIp)" rx="6" opacity="0.9"/>
          <text x="270" y="28" text-anchor="middle" fill="#fff" font-size="12">IP Header</text>

          <!-- TCP -->
          <rect x="360" y="0" width="150" height="46" fill="url(#gradTcp)" rx="6" opacity="0.85"/>
          <text x="435" y="28" text-anchor="middle" fill="#fff" font-size="12">TCP Header</text>

          <!-- Data -->
          <rect x="520" y="0" width="220" height="46" fill="url(#gradData)" rx="6" opacity="0.7"/>
          <text x="630" y="28" text-anchor="middle" fill="#fff" font-size="13">Payload Data</text>

          <!-- FCS Trailer -->
          <rect x="750" y="0" width="50" height="46" fill="#ef4444" rx="6"/>
          <text x="775" y="22" text-anchor="middle" fill="#fff" font-weight="bold" font-size="12">FCS</text>
          <text x="775" y="38" text-anchor="middle" fill="#fecaca" font-size="9">CRC-32</text>
          
          <text x="0" y="28" text-anchor="end" fill="#38bdf8" font-size="13" font-weight="bold">L2 Frame</text>
        </g>

        <!-- Bottom Wire -->
        <path d="M 70 325 L 850 325" stroke="#334155" stroke-width="2" stroke-dasharray="6 4"/>
        <text x="450" y="340" text-anchor="middle" fill="#64748b" font-size="12">Layer 1 Physical Transmission (Bits: 0101100101...)</text>
      </svg>
    `;
  },

  /**
   * Diagram 2: Spanning Tree Protocol (STP 802.1D / 802.1w) Election
   */
  spanningTree: function() {
    return `
      <svg viewBox="0 0 900 450" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
        <rect width="900" height="450" fill="#0b1120" rx="12"/>
        <text x="450" y="35" text-anchor="middle" fill="#38bdf8" font-size="18" font-weight="700">SPANNING TREE PROTOCOL (STP) ROOT & PORT ROLES</text>

        <!-- Links between switches -->
        <!-- SW1 to SW2 -->
        <line x1="450" y1="120" x2="220" y2="310" stroke="#0284c7" stroke-width="4"/>
        <!-- SW1 to SW3 -->
        <line x1="450" y1="120" x2="680" y2="310" stroke="#0284c7" stroke-width="4"/>
        <!-- SW2 to SW3 (Blocked link) -->
        <line x1="220" y1="310" x2="680" y2="310" stroke="#ef4444" stroke-width="3" stroke-dasharray="8 6"/>

        <!-- Root Switch (SW1) -->
        <g transform="translate(370, 70)">
          <rect width="160" height="85" rx="8" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
          <circle cx="25" cy="22" r="10" fill="#38bdf8"/>
          <text x="25" y="26" text-anchor="middle" fill="#0b1120" font-weight="bold" font-size="11">ROOT</text>
          <text x="85" y="26" text-anchor="middle" fill="#f8fafc" font-weight="bold" font-size="15">SWITCH 1</text>
          <text x="80" y="48" text-anchor="middle" fill="#34d399" font-size="11">Bridge ID: 24576.0001</text>
          <text x="80" y="66" text-anchor="middle" fill="#94a3b8" font-size="10">Lowest Priority Winner</text>
        </g>

        <!-- Switch 2 (Non-Root) -->
        <g transform="translate(140, 270)">
          <rect width="160" height="85" rx="8" fill="#0f172a" stroke="#64748b" stroke-width="2"/>
          <text x="80" y="28" text-anchor="middle" fill="#f8fafc" font-weight="bold" font-size="15">SWITCH 2</text>
          <text x="80" y="50" text-anchor="middle" fill="#94a3b8" font-size="11">Bridge ID: 32768.0002</text>
          <text x="80" y="68" text-anchor="middle" fill="#64748b" font-size="10">MAC: 00:00:00:00:00:02</text>
        </g>

        <!-- Switch 3 (Non-Root) -->
        <g transform="translate(600, 270)">
          <rect width="160" height="85" rx="8" fill="#0f172a" stroke="#64748b" stroke-width="2"/>
          <text x="80" y="28" text-anchor="middle" fill="#f8fafc" font-weight="bold" font-size="15">SWITCH 3</text>
          <text x="80" y="50" text-anchor="middle" fill="#94a3b8" font-size="11">Bridge ID: 32768.0003</text>
          <text x="80" y="68" text-anchor="middle" fill="#64748b" font-size="10">MAC: 00:00:00:00:00:03</text>
        </g>

        <!-- Port Badges -->
        <!-- SW1 DP 1 -->
        <rect x="365" y="165" width="48" height="22" rx="4" fill="#10b981"/>
        <text x="389" y="180" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">DP (Fwd)</text>

        <!-- SW1 DP 2 -->
        <rect x="490" y="165" width="48" height="22" rx="4" fill="#10b981"/>
        <text x="514" y="180" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">DP (Fwd)</text>

        <!-- SW2 RP -->
        <rect x="250" y="235" width="48" height="22" rx="4" fill="#0284c7"/>
        <text x="274" y="250" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">RP (Fwd)</text>

        <!-- SW3 RP -->
        <rect x="605" y="235" width="48" height="22" rx="4" fill="#0284c7"/>
        <text x="629" y="250" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">RP (Fwd)</text>

        <!-- SW2 DP on cross link -->
        <rect x="315" y="320" width="48" height="22" rx="4" fill="#10b981"/>
        <text x="339" y="335" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">DP (Fwd)</text>

        <!-- SW3 Alternate/Blocking Port (Red X) -->
        <rect x="540" y="320" width="55" height="22" rx="4" fill="#ef4444"/>
        <text x="567" y="335" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">BLK (Alt)</text>

        <!-- Legend / Rules Box -->
        <g transform="translate(120, 395)">
          <rect width="660" height="42" rx="6" fill="#1e293b" stroke="#334155"/>
          <text x="20" y="26" fill="#38bdf8" font-size="12" font-weight="bold">STP ELECTION RULES:</text>
          <text x="175" y="26" fill="#f8fafc" font-size="11">1. Lowest Bridge ID = Root</text>
          <text x="335" y="26" fill="#f8fafc" font-size="11">2. Best Path Cost = Root Port (RP)</text>
          <text x="535" y="26" fill="#f8fafc" font-size="11">3. Loop Broken = Port Blocked</text>
        </g>
      </svg>
    `;
  },

  /**
   * Diagram 3: OSPF Multi-Area Architecture (Area 0, ABR, ASBR)
   */
  ospfArchitecture: function() {
    return `
      <svg viewBox="0 0 900 440" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
        <rect width="900" height="440" fill="#0b1120" rx="12"/>
        <text x="450" y="35" text-anchor="middle" fill="#38bdf8" font-size="18" font-weight="700">OSPF MULTI-AREA DESIGN & ROUTER ROLES</text>

        <!-- Area 1 Bubble -->
        <rect x="40" y="70" width="230" height="300" rx="20" fill="rgba(16, 185, 129, 0.08)" stroke="#10b981" stroke-width="2" stroke-dasharray="6 4"/>
        <text x="155" y="105" text-anchor="middle" fill="#34d399" font-weight="bold" font-size="16">AREA 1 (Standard)</text>

        <!-- Area 0 Backbone Bubble -->
        <rect x="310" y="70" width="280" height="300" rx="20" fill="rgba(56, 189, 248, 0.08)" stroke="#38bdf8" stroke-width="2"/>
        <text x="450" y="105" text-anchor="middle" fill="#38bdf8" font-weight="bold" font-size="16">AREA 0 (Backbone)</text>

        <!-- Area 2 Bubble -->
        <rect x="630" y="70" width="230" height="300" rx="20" fill="rgba(139, 92, 246, 0.08)" stroke="#8b5cf6" stroke-width="2" stroke-dasharray="6 4"/>
        <text x="745" y="105" text-anchor="middle" fill="#c084fc" font-weight="bold" font-size="16">AREA 2 / External</text>

        <!-- Router Connections -->
        <line x1="155" y1="210" x2="310" y2="210" stroke="#64748b" stroke-width="3"/>
        <line x1="310" y1="210" x2="450" y2="210" stroke="#38bdf8" stroke-width="4"/>
        <line x1="450" y1="210" x2="630" y2="210" stroke="#38bdf8" stroke-width="4"/>
        <line x1="630" y1="210" x2="745" y2="210" stroke="#8b5cf6" stroke-width="3"/>

        <!-- Internal Router Area 1 -->
        <g transform="translate(85, 175)">
          <circle cx="45" cy="35" r="30" fill="#0f172a" stroke="#10b981" stroke-width="2"/>
          <text x="45" y="32" text-anchor="middle" fill="#f8fafc" font-weight="bold" font-size="12">R1</text>
          <text x="45" y="46" text-anchor="middle" fill="#94a3b8" font-size="10">Internal</text>
        </g>

        <!-- ABR 1 (Area Border Router between Area 1 and Area 0) -->
        <g transform="translate(265, 175)">
          <circle cx="45" cy="35" r="32" fill="#0f172a" stroke="#f59e0b" stroke-width="3"/>
          <text x="45" y="30" text-anchor="middle" fill="#fbbf24" font-weight="bold" font-size="12">ABR 1</text>
          <text x="45" y="44" text-anchor="middle" fill="#94a3b8" font-size="9">LSA 1/2 ⇄ LSA 3</text>
        </g>

        <!-- Backbone Router Area 0 -->
        <g transform="translate(405, 175)">
          <circle cx="45" cy="35" r="30" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
          <text x="45" y="32" text-anchor="middle" fill="#f8fafc" font-weight="bold" font-size="12">R2 (BB)</text>
          <text x="45" y="46" text-anchor="middle" fill="#38bdf8" font-size="10">Backbone</text>
        </g>

        <!-- ASBR (Area Border or Autonomous System Boundary Router) -->
        <g transform="translate(585, 175)">
          <circle cx="45" cy="35" r="32" fill="#0f172a" stroke="#ef4444" stroke-width="3"/>
          <text x="45" y="30" text-anchor="middle" fill="#f87171" font-weight="bold" font-size="12">ASBR</text>
          <text x="45" y="44" text-anchor="middle" fill="#94a3b8" font-size="9">Injects LSA 5</text>
        </g>

        <!-- BGP / Internet Cloud in Area 2 -->
        <g transform="translate(710, 185)">
          <path d="M 10 30 Q 20 0 50 15 Q 80 5 95 30 Q 110 50 85 70 Q 50 85 20 70 Q -10 55 10 30" fill="#1e1b4b" stroke="#8b5cf6" stroke-width="2"/>
          <text x="50" y="42" text-anchor="middle" fill="#c084fc" font-weight="bold" font-size="11">BGP / ISP</text>
          <text x="50" y="55" text-anchor="middle" fill="#a78bfa" font-size="9">External AS</text>
        </g>

        <!-- LSA Summary Strip -->
        <g transform="translate(50, 390)">
          <rect width="800" height="38" rx="6" fill="#1e293b"/>
          <text x="15" y="24" fill="#38bdf8" font-weight="bold" font-size="11">LSA TYPES:</text>
          <text x="95" y="24" fill="#94a3b8" font-size="11">Type 1 (Router) • Type 2 (Network) • Type 3 (Summary by ABR) • Type 4 (ASBR Summary) • Type 5 (External by ASBR)</text>
        </g>
      </svg>
    `;
  },

  /**
   * Diagram 4: BGP Peering Architecture (eBGP vs iBGP)
   */
  bgpPeering: function() {
    return `
      <svg viewBox="0 0 900 420" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
        <rect width="900" height="420" fill="#0b1120" rx="12"/>
        <text x="450" y="35" text-anchor="middle" fill="#38bdf8" font-size="18" font-weight="700">BORDER GATEWAY PROTOCOL (BGP) eBGP VS iBGP</text>

        <!-- AS 65001 -->
        <rect x="40" y="70" width="380" height="290" rx="16" fill="rgba(2, 132, 199, 0.08)" stroke="#0284c7" stroke-width="2"/>
        <text x="230" y="105" text-anchor="middle" fill="#38bdf8" font-weight="bold" font-size="16">Autonomous System 65001 (Enterprise)</text>

        <!-- AS 65002 -->
        <rect x="480" y="70" width="380" height="290" rx="16" fill="rgba(139, 92, 246, 0.08)" stroke="#8b5cf6" stroke-width="2"/>
        <text x="670" y="105" text-anchor="middle" fill="#c084fc" font-weight="bold" font-size="16">Autonomous System 65002 (Service Provider)</text>

        <!-- iBGP peering line inside AS 65001 -->
        <line x1="140" y1="230" x2="320" y2="230" stroke="#10b981" stroke-width="3" stroke-dasharray="6 4"/>
        <rect x="195" y="218" width="70" height="22" rx="4" fill="#065f46"/>
        <text x="230" y="233" text-anchor="middle" fill="#34d399" font-size="10" font-weight="bold">iBGP (AD 200)</text>

        <!-- eBGP peering link between AS 65001 and AS 65002 -->
        <line x1="320" y1="230" x2="580" y2="230" stroke="#f59e0b" stroke-width="4"/>
        <rect x="415" y="218" width="75" height="24" rx="4" fill="#78350f"/>
        <text x="452" y="234" text-anchor="middle" fill="#fde68a" font-size="11" font-weight="bold">eBGP (AD 20)</text>

        <!-- Routers inside AS 65001 -->
        <!-- R1 Internal -->
        <g transform="translate(100, 195)">
          <circle cx="35" cy="35" r="32" fill="#0f172a" stroke="#0284c7" stroke-width="2"/>
          <text x="35" y="32" text-anchor="middle" fill="#f8fafc" font-weight="bold" font-size="13">R1</text>
          <text x="35" y="48" text-anchor="middle" fill="#94a3b8" font-size="10">Core iBGP</text>
        </g>
        <!-- R2 Edge -->
        <g transform="translate(285, 195)">
          <circle cx="35" cy="35" r="32" fill="#0f172a" stroke="#38bdf8" stroke-width="3"/>
          <text x="35" y="32" text-anchor="middle" fill="#f8fafc" font-weight="bold" font-size="13">R2</text>
          <text x="35" y="48" text-anchor="middle" fill="#38bdf8" font-size="10">Edge ASBR</text>
        </g>

        <!-- Routers inside AS 65002 -->
        <!-- ISP-1 Edge -->
        <g transform="translate(545, 195)">
          <circle cx="35" cy="35" r="32" fill="#0f172a" stroke="#8b5cf6" stroke-width="3"/>
          <text x="35" y="32" text-anchor="middle" fill="#f8fafc" font-weight="bold" font-size="13">ISP-R1</text>
          <text x="35" y="48" text-anchor="middle" fill="#c084fc" font-size="10">Carrier Edge</text>
        </g>
        <!-- ISP-2 Core -->
        <g transform="translate(730, 195)">
          <circle cx="35" cy="35" r="32" fill="#0f172a" stroke="#6d28d9" stroke-width="2"/>
          <text x="35" y="32" text-anchor="middle" fill="#f8fafc" font-weight="bold" font-size="13">ISP-R2</text>
          <text x="35" y="48" text-anchor="middle" fill="#94a3b8" font-size="10">Carrier Core</text>
        </g>
        <line x1="580" y1="230" x2="765" y2="230" stroke="#10b981" stroke-width="3" stroke-dasharray="6 4"/>

        <!-- BGP Best Path Rule strip -->
        <g transform="translate(40, 375)">
          <rect width="820" height="34" rx="6" fill="#1e293b"/>
          <text x="20" y="22" fill="#f59e0b" font-weight="bold" font-size="11">BGP PATH SELECTION (N-WLLA-OMNI):</text>
          <text x="250" y="22" fill="#94a3b8" font-size="11">Next-Hop Reachable > Weight (Cisco) > Local Pref > Locally Originated > AS Path > Origin > MED > eBGP over iBGP</text>
        </g>
      </svg>
    `;
  },

  /**
   * Diagram 5: Cisco SD-WAN 4-Plane Architecture
   */
  sdwanPlanes: function() {
    return `
      <svg viewBox="0 0 900 460" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
        <rect width="900" height="460" fill="#0b1120" rx="12"/>
        <text x="450" y="35" text-anchor="middle" fill="#38bdf8" font-size="18" font-weight="700">CISCO SD-WAN ARCHITECTURE & PLANES</text>

        <!-- Plane 1: Orchestration Plane (vBond) -->
        <g transform="translate(50, 70)">
          <rect width="180" height="310" rx="10" fill="rgba(245, 158, 11, 0.08)" stroke="#f59e0b" stroke-width="2"/>
          <text x="90" y="30" text-anchor="middle" fill="#fbbf24" font-weight="bold" font-size="14">ORCHESTRATION</text>
          
          <rect x="20" y="70" width="140" height="90" rx="8" fill="#1e293b" stroke="#f59e0b"/>
          <text x="90" y="105" text-anchor="middle" fill="#fff" font-weight="bold" font-size="14">vBond</text>
          <text x="90" y="125" text-anchor="middle" fill="#fde68a" font-size="10">Validator</text>
          
          <text x="90" y="200" text-anchor="middle" fill="#94a3b8" font-size="11">Initial Bring-up</text>
          <text x="90" y="220" text-anchor="middle" fill="#94a3b8" font-size="11">NAT Traversal (STUN)</text>
          <text x="90" y="240" text-anchor="middle" fill="#94a3b8" font-size="11">Mutual Cert Trust</text>
        </g>

        <!-- Plane 2: Management Plane (vManage) -->
        <g transform="translate(255, 70)">
          <rect width="180" height="310" rx="10" fill="rgba(56, 189, 248, 0.08)" stroke="#38bdf8" stroke-width="2"/>
          <text x="90" y="30" text-anchor="middle" fill="#38bdf8" font-weight="bold" font-size="14">MANAGEMENT</text>

          <rect x="20" y="70" width="140" height="90" rx="8" fill="#1e293b" stroke="#38bdf8"/>
          <text x="90" y="105" text-anchor="middle" fill="#fff" font-weight="bold" font-size="14">vManage</text>
          <text x="90" y="125" text-anchor="middle" fill="#bae6fd" font-size="10">Manager</text>

          <text x="90" y="200" text-anchor="middle" fill="#94a3b8" font-size="11">Single Pane of Glass</text>
          <text x="90" y="220" text-anchor="middle" fill="#94a3b8" font-size="11">Configuration Templates</text>
          <text x="90" y="240" text-anchor="middle" fill="#94a3b8" font-size="11">REST APIs & Telemetry</text>
        </g>

        <!-- Plane 3: Control Plane (vSmart) -->
        <g transform="translate(460, 70)">
          <rect width="180" height="310" rx="10" fill="rgba(139, 92, 246, 0.08)" stroke="#8b5cf6" stroke-width="2"/>
          <text x="90" y="30" text-anchor="middle" fill="#c084fc" font-weight="bold" font-size="14">CONTROL</text>

          <rect x="20" y="70" width="140" height="90" rx="8" fill="#1e293b" stroke="#8b5cf6"/>
          <text x="90" y="105" text-anchor="middle" fill="#fff" font-weight="bold" font-size="14">vSmart</text>
          <text x="90" y="125" text-anchor="middle" fill="#ede9fe" font-size="10">Controller</text>

          <text x="90" y="200" text-anchor="middle" fill="#94a3b8" font-size="11">OMP (Overlay Mgmt)</text>
          <text x="90" y="220" text-anchor="middle" fill="#94a3b8" font-size="11">Route & Policy Distr.</text>
          <text x="90" y="240" text-anchor="middle" fill="#94a3b8" font-size="11">IPsec Key Exchange</text>
        </g>

        <!-- Plane 4: Data Plane (vEdge / cEdge) -->
        <g transform="translate(665, 70)">
          <rect width="180" height="310" rx="10" fill="rgba(16, 185, 129, 0.08)" stroke="#10b981" stroke-width="2"/>
          <text x="90" y="30" text-anchor="middle" fill="#34d399" font-weight="bold" font-size="14">DATA PLANE</text>

          <rect x="20" y="70" width="140" height="90" rx="8" fill="#1e293b" stroke="#10b981"/>
          <text x="90" y="105" text-anchor="middle" fill="#fff" font-weight="bold" font-size="14">WAN Edge</text>
          <text x="90" y="125" text-anchor="middle" fill="#d1fae5" font-size="10">cEdge / vEdge</text>

          <text x="90" y="200" text-anchor="middle" fill="#94a3b8" font-size="11">Line-rate IPsec Fabric</text>
          <text x="90" y="220" text-anchor="middle" fill="#94a3b8" font-size="11">App-Aware Routing</text>
          <text x="90" y="240" text-anchor="middle" fill="#94a3b8" font-size="11">BFD Path Probing</text>
        </g>

        <!-- Overlay Underlay Connection bar -->
        <rect x="50" y="400" width="795" height="40" rx="6" fill="#1e293b"/>
        <text x="450" y="425" text-anchor="middle" fill="#f8fafc" font-size="12">
          Underlay Networks: MPLS, Internet Broadband, 4G/5G LTE ➔ Encapsulated into Dynamic IPsec Overlay
        </text>
      </svg>
    `;
  },

  /**
   * Diagram 6: 3-Tier Enterprise Campus vs Collapsed Core
   */
  campusArchitecture: function() {
    return `
      <svg viewBox="0 0 900 440" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
        <rect width="900" height="440" fill="#0b1120" rx="12"/>
        <text x="450" y="35" text-anchor="middle" fill="#38bdf8" font-size="18" font-weight="700">ENTERPRISE HIERARCHICAL CAMPUS ARCHITECTURE</text>

        <!-- Core Layer -->
        <g transform="translate(60, 65)">
          <rect width="780" height="75" rx="8" fill="rgba(239, 68, 68, 0.08)" stroke="#ef4444" stroke-width="1.5"/>
          <text x="30" y="30" fill="#f87171" font-weight="bold" font-size="13">CORE LAYER</text>
          <text x="30" y="50" fill="#94a3b8" font-size="11">High-Speed Backbone, Zero Packet Inspection, Redundancy</text>

          <rect x="300" y="15" width="150" height="45" rx="6" fill="#1e293b" stroke="#ef4444"/>
          <text x="375" y="42" text-anchor="middle" fill="#fff" font-weight="bold" font-size="13">Core Switch 1</text>
          <rect x="500" y="15" width="150" height="45" rx="6" fill="#1e293b" stroke="#ef4444"/>
          <text x="575" y="42" text-anchor="middle" fill="#fff" font-weight="bold" font-size="13">Core Switch 2</text>
          <line x1="450" y1="37" x2="500" y2="37" stroke="#ef4444" stroke-width="3"/>
        </g>

        <!-- Distribution Layer -->
        <g transform="translate(60, 165)">
          <rect width="780" height="95" rx="8" fill="rgba(245, 158, 11, 0.08)" stroke="#f59e0b" stroke-width="1.5"/>
          <text x="30" y="35" fill="#fbbf24" font-weight="bold" font-size="13">DISTRIBUTION LAYER</text>
          <text x="30" y="55" fill="#94a3b8" font-size="11">Routing Boundary (SVIs), Policy Enforcement, ACLs, QoS, Summarization</text>

          <rect x="220" y="25" width="150" height="50" rx="6" fill="#1e293b" stroke="#f59e0b"/>
          <text x="295" y="55" text-anchor="middle" fill="#fff" font-weight="bold" font-size="12">Dist-SW 1 (HSRP)</text>
          <rect x="420" y="25" width="150" height="50" rx="6" fill="#1e293b" stroke="#f59e0b"/>
          <text x="495" y="55" text-anchor="middle" fill="#fff" font-weight="bold" font-size="12">Dist-SW 2 (HSRP)</text>
          <line x1="370" y1="50" x2="420" y2="50" stroke="#f59e0b" stroke-width="3"/>
        </g>

        <!-- Access Layer -->
        <g transform="translate(60, 285)">
          <rect width="780" height="130" rx="8" fill="rgba(16, 185, 129, 0.08)" stroke="#10b981" stroke-width="1.5"/>
          <text x="30" y="30" fill="#34d399" font-weight="bold" font-size="13">ACCESS LAYER</text>
          <text x="30" y="50" fill="#94a3b8" font-size="11">End-User Connectivity, PoE+, Port Security, 802.1X, VLAN Assignment</text>

          <rect x="150" y="65" width="120" height="45" rx="6" fill="#1e293b" stroke="#10b981"/>
          <text x="210" y="92" text-anchor="middle" fill="#fff" font-size="12">Access SW 1</text>
          <rect x="330" y="65" width="120" height="45" rx="6" fill="#1e293b" stroke="#10b981"/>
          <text x="390" y="92" text-anchor="middle" fill="#fff" font-size="12">Access SW 2</text>
          <rect x="510" y="65" width="120" height="45" rx="6" fill="#1e293b" stroke="#10b981"/>
          <text x="570" y="92" text-anchor="middle" fill="#fff" font-size="12">Access SW 3</text>
          <rect x="690" y="65" width="120" height="45" rx="6" fill="#1e293b" stroke="#10b981"/>
          <text x="750" y="92" text-anchor="middle" fill="#fff" font-size="12">AP / VoIP Phones</text>
        </g>
      </svg>
    `;
  },

  /**
   * Diagram 7: VXLAN / Overlay Encapsulation
   */
  vxlanEncapsulation: function() {
    return `
      <svg viewBox="0 0 900 360" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
        <rect width="900" height="360" fill="#0b1120" rx="12"/>
        <text x="450" y="35" text-anchor="middle" fill="#38bdf8" font-size="18" font-weight="700">VXLAN PACKET FORMAT & 50-BYTE OVERHEAD</text>

        <!-- Outer Transport Header -->
        <g transform="translate(40, 75)">
          <text x="140" y="20" text-anchor="middle" fill="#38bdf8" font-weight="bold" font-size="12">OUTER UNDERLAY HEADER (36 Bytes)</text>
          <rect x="0" y="30" width="90" height="50" rx="6" fill="#0284c7"/>
          <text x="45" y="55" text-anchor="middle" fill="#fff" font-weight="bold" font-size="11">Outer L2</text>
          <text x="45" y="70" text-anchor="middle" fill="#bae6fd" font-size="9">14 Bytes</text>

          <rect x="95" y="30" width="100" height="50" rx="6" fill="#0369a1"/>
          <text x="145" y="55" text-anchor="middle" fill="#fff" font-weight="bold" font-size="11">Outer IP</text>
          <text x="145" y="70" text-anchor="middle" fill="#bae6fd" font-size="9">20 Bytes (VTEP IP)</text>

          <rect x="200" y="30" width="80" height="50" rx="6" fill="#075985"/>
          <text x="240" y="55" text-anchor="middle" fill="#fff" font-weight="bold" font-size="11">Outer UDP</text>
          <text x="240" y="70" text-anchor="middle" fill="#bae6fd" font-size="9">Dst Port 4789</text>
        </g>

        <!-- VXLAN Header -->
        <g transform="translate(325, 75)">
          <text x="50" y="20" text-anchor="middle" fill="#34d399" font-weight="bold" font-size="12">VXLAN (8 Bytes)</text>
          <rect x="0" y="30" width="105" height="50" rx="6" fill="#059669"/>
          <text x="52" y="55" text-anchor="middle" fill="#fff" font-weight="bold" font-size="11">VXLAN Header</text>
          <text x="52" y="70" text-anchor="middle" fill="#d1fae5" font-size="9">24-bit VNI (16M IDs)</text>
        </g>

        <!-- Inner Original L2 Frame -->
        <g transform="translate(435, 75)">
          <text x="200" y="20" text-anchor="middle" fill="#c084fc" font-weight="bold" font-size="12">ORIGINAL TENANT PAYLOAD (OVERLAY)</text>
          
          <rect x="0" y="30" width="100" height="50" rx="6" fill="#7c3aed"/>
          <text x="50" y="55" text-anchor="middle" fill="#fff" font-weight="bold" font-size="11">Inner MAC</text>
          <text x="50" y="70" text-anchor="middle" fill="#ede9fe" font-size="9">Original L2</text>

          <rect x="105" y="30" width="100" height="50" rx="6" fill="#6d28d9"/>
          <text x="155" y="55" text-anchor="middle" fill="#fff" font-weight="bold" font-size="11">Inner IP</text>
          <text x="155" y="70" text-anchor="middle" fill="#ede9fe" font-size="9">Tenant IP</text>

          <rect x="210" y="30" width="170" height="50" rx="6" fill="#f59e0b"/>
          <text x="295" y="55" text-anchor="middle" fill="#fff" font-weight="bold" font-size="11">Original Payload</text>
          <text x="295" y="70" text-anchor="middle" fill="#fef3c7" font-size="9">TCP/UDP & Data</text>

          <rect x="385" y="30" width="40" height="50" rx="6" fill="#ef4444"/>
          <text x="405" y="60" text-anchor="middle" fill="#fff" font-weight="bold" font-size="10">FCS</text>
        </g>

        <!-- MTU Note -->
        <g transform="translate(40, 200)">
          <rect width="820" height="120" rx="10" fill="#1e293b" stroke="#334155"/>
          <text x="25" y="35" fill="#38bdf8" font-weight="bold" font-size="14">💡 CRITICAL EXAM MTU CONSIDERATION:</text>
          <text x="25" y="65" fill="#f8fafc" font-size="13">
            • VXLAN encapsulates a full Ethernet frame into UDP, adding exactly 50 bytes of overhead (14 + 20 + 8 + 8).
          </text>
          <text x="25" y="90" fill="#f8fafc" font-size="13">
            • To avoid IP fragmentation, the Underlay IP network MUST support Jumbo Frames (recommended MTU ≥ 1600 bytes or 9216 bytes).
          </text>
        </g>
      </svg>
    `;
  }
};
