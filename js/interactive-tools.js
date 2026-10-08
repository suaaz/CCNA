/**
 * NetVisual Pro - Interactive Network Engineering Tools
 * 1. Step-by-Step Packet Flow & Header Transformation Simulator
 * 2. Visual IPv4 CIDR & Subnetting Calculator with Binary Bitmaps
 */

const InteractiveTools = {
  // Current Simulator State
  simulatorStep: 0,
  simulatorTimer: null,

  simulatorSteps: [
    {
      title: "Step 1: Application Generation & Subnet Calculation",
      description: "PC1 wants to fetch a webpage from Web Server (172.16.50.80). PC1 applies its subnet mask (255.255.255.0) to compare its IP (192.168.1.10) with the destination IP. PC1 determines the server is on a REMOTE network. Therefore, the packet MUST be forwarded to its Default Gateway (Router 1: 192.168.1.1).",
      activeNode: "pc1",
      packetPosition: "pc1",
      layer: "Layer 3 (IP)",
      srcMac: "AAAA.AAAA.0001 (PC1)",
      dstMac: "Unknown (Needs ARP)",
      srcIp: "192.168.1.10 (PC1)",
      dstIp: "172.16.50.80 (Web Server)",
      ttl: "64",
      protocol: "TCP (HTTP 80)"
    },
    {
      title: "Step 2: ARP Request for Default Gateway MAC",
      description: "PC1 checks its local ARP Cache for Default Gateway 192.168.1.1. It finds no entry (ARP Cache Miss)! PC1 crafts an ARP Request broadcast: 'Who has 192.168.1.1? Tell 192.168.1.10'. Destination MAC is set to FF:FF:FF:FF:FF:FF.",
      activeNode: "switch1",
      packetPosition: "link-pc1-sw1",
      layer: "Layer 2 (ARP Broadcast)",
      srcMac: "AAAA.AAAA.0001 (PC1)",
      dstMac: "FFFF.FFFF.FFFF (Broadcast)",
      srcIp: "192.168.1.10",
      dstIp: "192.168.1.1",
      ttl: "N/A (L2 Only)",
      protocol: "ARP (Type 0x0806)"
    },
    {
      title: "Step 3: Switch 1 MAC Learning & Flooding",
      description: "Switch 1 receives the broadcast on Port Gi0/1. It examines the Source MAC and learns: 'MAC AAAA.AAAA.0001 is on Port Gi0/1'. It then floods the broadcast frame out all other ports on VLAN 1, reaching Router 1 on Port Gi0/24.",
      activeNode: "router1",
      packetPosition: "link-sw1-r1",
      layer: "Layer 2 (CAM Table Update)",
      srcMac: "AAAA.AAAA.0001 (PC1)",
      dstMac: "FFFF.FFFF.FFFF (Broadcast)",
      srcIp: "192.168.1.10",
      dstIp: "192.168.1.1",
      ttl: "N/A",
      protocol: "ARP Flooding"
    },
    {
      title: "Step 4: Router 1 Unicast ARP Reply",
      description: "Router 1 sees that its own IP (192.168.1.1) was queried. It replies with a unicast ARP Reply: '192.168.1.1 is at MAC 0000.0C01.0001'. Switch 1 forwards this directly to PC1, and PC1 installs the gateway MAC into its ARP table.",
      activeNode: "pc1",
      packetPosition: "link-sw1-pc1",
      layer: "Layer 2 (ARP Reply)",
      srcMac: "0000.0C01.0001 (Router 1)",
      dstMac: "AAAA.AAAA.0001 (PC1)",
      srcIp: "192.168.1.1",
      dstIp: "192.168.1.10",
      ttl: "N/A",
      protocol: "ARP Reply"
    },
    {
      title: "Step 5: PC1 Encapsulates & Transmits Original IP Packet",
      description: "Now PC1 can build the complete Layer 2 Ethernet frame! Destination MAC is Router 1's MAC. Notice: The Destination IP remains the Web Server (172.16.50.80), but Destination MAC is the Default Gateway (0000.0C01.0001)!",
      activeNode: "router1",
      packetPosition: "link-pc1-sw1-r1",
      layer: "Layer 2 & 3 Encapsulation",
      srcMac: "AAAA.AAAA.0001 (PC1)",
      dstMac: "0000.0C01.0001 (Router 1)",
      srcIp: "192.168.1.10 (PC1)",
      dstIp: "172.16.50.80 (Server)",
      ttl: "64",
      protocol: "TCP (Port 80)"
    },
    {
      title: "Step 6: Router 1 Routing Lookup & TTL Decrement",
      description: "Router 1 strips off the Layer 2 Ethernet header. It examines the IP destination (172.16.50.80). It decrements the TTL from 64 to 63 (and recalculates the IP Header Checksum). It checks its Cisco Express Forwarding (CEF) FIB table and finds route 172.16.0.0/16 pointing to Next Hop Router 2 (10.0.0.2).",
      activeNode: "router2",
      packetPosition: "link-r1-r2",
      layer: "Layer 3 Routing & Re-encapsulation",
      srcMac: "0000.0C01.0002 (Router 1 WAN)",
      dstMac: "0000.0C02.0001 (Router 2 WAN)",
      srcIp: "192.168.1.10 (Preserved)",
      dstIp: "172.16.50.80 (Preserved)",
      ttl: "63 (Decremented!)",
      protocol: "TCP (Port 80)"
    },
    {
      title: "Step 7: Router 2 Delivers to Destination Server",
      description: "Router 2 receives the frame, removes the L2 WAN header, and recognizes that 172.16.50.80 resides directly on its connected LAN interface. It re-encapsulates the frame with Server MAC (BBBB.BBBB.0001) and transmits it to the server. The packet successfully arrives!",
      activeNode: "server",
      packetPosition: "server",
      layer: "Layer 2 Local Delivery",
      srcMac: "0000.0C02.0002 (Router 2 LAN)",
      dstMac: "BBBB.BBBB.0001 (Server)",
      srcIp: "192.168.1.10",
      dstIp: "172.16.50.80",
      ttl: "62",
      protocol: "HTTP Request Arrived!"
    }
  ],

  /**
   * Render Simulator UI
   */
  renderSimulator: function(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const current = this.simulatorSteps[this.simulatorStep];
    const totalSteps = this.simulatorSteps.length;

    container.innerHTML = `
      <div class="glass-card rounded-xl p-5 border border-slate-700/60 shadow-xl">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
          <div>
            <span class="text-xs uppercase tracking-wider font-semibold text-sky-400 bg-sky-950/60 px-2.5 py-1 rounded border border-sky-800/40">
              Interactive Packet Flow Engine
            </span>
            <h3 class="text-lg font-bold text-white mt-1">L2 MAC vs L3 IP Hop-by-Hop Trace</h3>
          </div>
          <div class="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <span class="text-xs font-mono text-slate-400">Step ${this.simulatorStep + 1}/${totalSteps}</span>
            <div class="flex items-center gap-1.5">
              <button id="sim-prev-btn" class="px-2.5 sm:px-3 py-1.5 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition" ${this.simulatorStep === 0 ? 'disabled opacity-50 cursor-not-allowed' : ''}>
                ◀ Prev
              </button>
              <button id="sim-next-btn" class="px-2.5 sm:px-3 py-1.5 text-xs rounded bg-sky-600 hover:bg-sky-500 text-white font-semibold transition" ${this.simulatorStep === totalSteps - 1 ? 'disabled opacity-50 cursor-not-allowed' : ''}>
                Next ▶
              </button>
              <button id="sim-reset-btn" class="px-2.5 sm:px-3 py-1.5 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition">
                Reset
              </button>
            </div>
          </div>
        </div>

        <!-- Visual Network Topology Bar -->
        <div class="sm:hidden text-center text-[11px] text-slate-500 font-mono mb-1 flex items-center justify-center gap-1">
          <span>👈 Swipe horizontally to view topology 👉</span>
        </div>
        <div class="relative bg-slate-950 p-4 sm:p-6 rounded-lg border border-slate-800 my-4 overflow-x-auto touch-scroll">
          <div class="min-w-[650px] flex items-center justify-between relative py-2">
            <!-- Connecting Line -->
            <div class="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-1 bg-slate-800 -z-0"></div>
            
            <!-- PC1 Node -->
            <div class="flex flex-col items-center z-10 ${current.activeNode === 'pc1' ? 'scale-110' : 'opacity-80'} transition-all">
              <div class="w-14 h-14 rounded-xl flex items-center justify-center font-bold text-lg ${current.activeNode === 'pc1' ? 'bg-sky-500 text-white ring-4 ring-sky-500/30' : 'bg-slate-800 text-slate-300 border border-slate-700'} shadow-lg">
                💻
              </div>
              <span class="text-xs font-bold text-white mt-2">PC 1</span>
              <span class="text-[10px] text-slate-400 font-mono">192.168.1.10</span>
            </div>

            <!-- Switch 1 Node -->
            <div class="flex flex-col items-center z-10 ${current.activeNode === 'switch1' ? 'scale-110' : 'opacity-80'} transition-all">
              <div class="w-14 h-14 rounded-xl flex items-center justify-center font-bold text-lg ${current.activeNode === 'switch1' ? 'bg-emerald-500 text-white ring-4 ring-emerald-500/30' : 'bg-slate-800 text-slate-300 border border-slate-700'} shadow-lg">
                🔀
              </div>
              <span class="text-xs font-bold text-white mt-2">Switch 1</span>
              <span class="text-[10px] text-slate-400 font-mono">CAM Table</span>
            </div>

            <!-- Router 1 Node -->
            <div class="flex flex-col items-center z-10 ${current.activeNode === 'router1' ? 'scale-110' : 'opacity-80'} transition-all">
              <div class="w-14 h-14 rounded-xl flex items-center justify-center font-bold text-lg ${current.activeNode === 'router1' ? 'bg-amber-500 text-white ring-4 ring-amber-500/30' : 'bg-slate-800 text-slate-300 border border-slate-700'} shadow-lg">
                🌐
              </div>
              <span class="text-xs font-bold text-white mt-2">Router 1</span>
              <span class="text-[10px] text-slate-400 font-mono">GW: 192.168.1.1</span>
            </div>

            <!-- Router 2 Node -->
            <div class="flex flex-col items-center z-10 ${current.activeNode === 'router2' ? 'scale-110' : 'opacity-80'} transition-all">
              <div class="w-14 h-14 rounded-xl flex items-center justify-center font-bold text-lg ${current.activeNode === 'router2' ? 'bg-purple-500 text-white ring-4 ring-purple-500/30' : 'bg-slate-800 text-slate-300 border border-slate-700'} shadow-lg">
                🌐
              </div>
              <span class="text-xs font-bold text-white mt-2">Router 2</span>
              <span class="text-[10px] text-slate-400 font-mono">WAN: 10.0.0.2</span>
            </div>

            <!-- Web Server Node -->
            <div class="flex flex-col items-center z-10 ${current.activeNode === 'server' ? 'scale-110' : 'opacity-80'} transition-all">
              <div class="w-14 h-14 rounded-xl flex items-center justify-center font-bold text-lg ${current.activeNode === 'server' ? 'bg-sky-500 text-white ring-4 ring-sky-500/30' : 'bg-slate-800 text-slate-300 border border-slate-700'} shadow-lg">
                🖥️
              </div>
              <span class="text-xs font-bold text-white mt-2">Web Server</span>
              <span class="text-[10px] text-slate-400 font-mono">172.16.50.80</span>
            </div>
          </div>
        </div>

        <!-- Step Explanation -->
        <div class="p-4 rounded-lg bg-slate-900 border border-slate-800 mb-4">
          <div class="flex items-center gap-2 mb-1.5">
            <span class="w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping"></span>
            <h4 class="text-sm font-bold text-sky-300">${current.title}</h4>
            <span class="ml-auto text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">${current.layer}</span>
          </div>
          <p class="text-xs text-slate-300 leading-relaxed">${current.description}</p>
        </div>

        <!-- Dynamic Live Packet Header Inspector -->
        <div class="bg-slate-950 p-4 rounded-lg border border-slate-800">
          <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 block">
            🔍 Live Wire Inspection (PDU Header State at this Hop):
          </span>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs font-mono">
            <div class="p-2 bg-slate-900 rounded border border-slate-800">
              <span class="text-slate-500 text-[10px] block">L2 Src MAC:</span>
              <span class="text-sky-300 font-semibold truncate block">${current.srcMac}</span>
            </div>
            <div class="p-2 bg-slate-900 rounded border border-slate-800">
              <span class="text-slate-500 text-[10px] block">L2 Dst MAC:</span>
              <span class="text-sky-300 font-semibold truncate block">${current.dstMac}</span>
            </div>
            <div class="p-2 bg-slate-900 rounded border border-slate-800">
              <span class="text-slate-500 text-[10px] block">L3 Src IP:</span>
              <span class="text-emerald-300 font-semibold truncate block">${current.srcIp}</span>
            </div>
            <div class="p-2 bg-slate-900 rounded border border-slate-800">
              <span class="text-slate-500 text-[10px] block">L3 Dst IP:</span>
              <span class="text-emerald-300 font-semibold truncate block">${current.dstIp}</span>
            </div>
            <div class="p-2 bg-slate-900 rounded border border-slate-800">
              <span class="text-slate-500 text-[10px] block">L3 TTL:</span>
              <span class="text-amber-300 font-semibold truncate block">${current.ttl}</span>
            </div>
            <div class="p-2 bg-slate-900 rounded border border-slate-800">
              <span class="text-slate-500 text-[10px] block">L4 Protocol:</span>
              <span class="text-purple-300 font-semibold truncate block">${current.protocol}</span>
            </div>
          </div>
          <p class="text-[11px] text-slate-500 mt-2 italic">
            * Note how L2 MAC addresses change hop-by-hop across routers, while L3 Source & Destination IPs remain constant end-to-end!
          </p>
        </div>
      </div>
    `;

    // Attach button listeners
    document.getElementById("sim-prev-btn")?.addEventListener("click", () => {
      if (this.simulatorStep > 0) {
        this.simulatorStep--;
        this.renderSimulator(containerId);
      }
    });

    document.getElementById("sim-next-btn")?.addEventListener("click", () => {
      if (this.simulatorStep < this.simulatorSteps.length - 1) {
        this.simulatorStep++;
        this.renderSimulator(containerId);
      }
    });

    document.getElementById("sim-reset-btn")?.addEventListener("click", () => {
      this.simulatorStep = 0;
      this.renderSimulator(containerId);
    });
  },

  /**
   * Visual IPv4 Subnet Calculator Engine
   */
  calculateSubnet: function(ipStr, cidr) {
    cidr = parseInt(cidr, 10);
    if (isNaN(cidr) || cidr < 1 || cidr > 32) cidr = 24;

    const parts = ipStr.split('.').map(p => parseInt(p, 10));
    if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) {
      return null;
    }

    // Calculate Subnet Mask
    let maskInt = 0;
    for (let i = 0; i < cidr; i++) {
      maskInt |= (1 << (31 - i));
    }
    const maskOctets = [
      (maskInt >>> 24) & 255,
      (maskInt >>> 16) & 255,
      (maskInt >>> 8) & 255,
      maskInt & 255
    ];

    // Wildcard Mask
    const wildcardOctets = maskOctets.map(o => 255 - o);

    // IP to 32-bit int
    const ipInt = ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
    const networkInt = (ipInt & maskInt) >>> 0;
    const broadcastInt = (networkInt | ~maskInt) >>> 0;

    const intToIp = (num) => [
      (num >>> 24) & 255,
      (num >>> 16) & 255,
      (num >>> 8) & 255,
      num & 255
    ].join('.');

    const networkIp = intToIp(networkInt);
    const broadcastIp = intToIp(broadcastInt);

    // Usable range
    let firstUsable = "N/A";
    let lastUsable = "N/A";
    let usableHosts = 0;

    if (cidr === 32) {
      firstUsable = networkIp;
      lastUsable = networkIp;
      usableHosts = 1;
    } else if (cidr === 31) {
      firstUsable = networkIp;
      lastUsable = broadcastIp;
      usableHosts = 2; // RFC 3021 Point-to-Point
    } else {
      firstUsable = intToIp(networkInt + 1);
      lastUsable = intToIp(broadcastInt - 1);
      usableHosts = Math.pow(2, 32 - cidr) - 2;
    }

    // Class & Scope
    let ipClass = "Class A";
    if (parts[0] >= 128 && parts[0] <= 191) ipClass = "Class B";
    else if (parts[0] >= 192 && parts[0] <= 223) ipClass = "Class C";
    else if (parts[0] >= 224 && parts[0] <= 239) ipClass = "Class D (Multicast)";
    else if (parts[0] >= 240) ipClass = "Class E (Experimental)";

    let isPrivate = false;
    if (parts[0] === 10) isPrivate = true;
    else if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) isPrivate = true;
    else if (parts[0] === 192 && parts[1] === 168) isPrivate = true;

    // Binary string representation
    const ipBinary = parts.map(p => p.toString(2).padStart(8, '0')).join('');

    return {
      ip: parts.join('.'),
      cidr: cidr,
      mask: maskOctets.join('.'),
      wildcard: wildcardOctets.join('.'),
      network: networkIp,
      broadcast: broadcastIp,
      firstUsable: firstUsable,
      lastUsable: lastUsable,
      usableHosts: usableHosts.toLocaleString(),
      ipClass: ipClass,
      scope: isPrivate ? "RFC 1918 Private (Non-routable on Internet)" : "Public Routable",
      binary: ipBinary
    };
  },

  /**
   * Render Subnet Calculator UI
   */
  renderSubnetCalculator: function(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="glass-card rounded-xl p-5 border border-slate-700/60 shadow-xl">
        <div class="mb-4 pb-3 border-b border-slate-800">
          <span class="text-xs uppercase tracking-wider font-semibold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800/40">
            CIDR & Binary Explorer
          </span>
          <h3 class="text-lg font-bold text-white mt-1">Visual IPv4 Subnet Calculator</h3>
        </div>

        <!-- Input controls -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <div class="sm:col-span-2">
            <label class="text-xs text-slate-400 block mb-1 font-semibold">IPv4 Address:</label>
            <input type="text" id="calc-ip-input" value="192.168.10.130" 
              class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500">
          </div>
          <div>
            <label class="text-xs text-slate-400 block mb-1 font-semibold">CIDR Prefix (/):</label>
            <select id="calc-cidr-select" 
              class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-emerald-500">
              ${Array.from({length: 32}, (_, i) => 32 - i).map(c => `
                <option value="${c}" ${c === 26 ? 'selected' : ''}>/${c}</option>
              `).join('')}
            </select>
          </div>
        </div>

        <!-- Results Display Box -->
        <div id="calc-result-box" class="space-y-3">
          <!-- Dynamically populated -->
        </div>
      </div>
    `;

    const updateCalc = () => {
      const ip = document.getElementById("calc-ip-input")?.value.trim() || "192.168.10.130";
      const cidr = document.getElementById("calc-cidr-select")?.value || 26;
      const res = this.calculateSubnet(ip, cidr);
      const resBox = document.getElementById("calc-result-box");

      if (!res || !resBox) {
        if (resBox) resBox.innerHTML = `<div class="p-3 bg-red-950/40 border border-red-800 text-red-300 rounded text-xs">Invalid IPv4 address format. Please provide 4 octets between 0 and 255.</div>`;
        return;
      }

      // Format binary network vs host bits
      const netBits = res.binary.slice(0, res.cidr);
      const hostBits = res.binary.slice(res.cidr);

      resBox.innerHTML = `
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs font-mono">
          <div class="p-2.5 bg-slate-900 rounded border border-slate-800">
            <span class="text-slate-500 text-[10px] block">Subnet Mask:</span>
            <span class="text-emerald-300 font-bold">${res.mask}</span>
          </div>
          <div class="p-2.5 bg-slate-900 rounded border border-slate-800">
            <span class="text-slate-500 text-[10px] block">Wildcard Mask:</span>
            <span class="text-sky-300 font-bold">${res.wildcard}</span>
          </div>
          <div class="p-2.5 bg-slate-900 rounded border border-slate-800">
            <span class="text-slate-500 text-[10px] block">Network ID:</span>
            <span class="text-amber-300 font-bold">${res.network}</span>
          </div>
          <div class="p-2.5 bg-slate-900 rounded border border-slate-800">
            <span class="text-slate-500 text-[10px] block">Broadcast IP:</span>
            <span class="text-red-300 font-bold">${res.broadcast}</span>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs font-mono">
          <div class="p-2.5 bg-slate-900 rounded border border-slate-800">
            <span class="text-slate-500 text-[10px] block">Usable Host Range:</span>
            <span class="text-white">${res.firstUsable} – ${res.lastUsable}</span>
          </div>
          <div class="p-2.5 bg-slate-900 rounded border border-slate-800">
            <span class="text-slate-500 text-[10px] block">Usable Hosts:</span>
            <span class="text-emerald-400 font-bold text-sm">${res.usableHosts}</span>
          </div>
          <div class="p-2.5 bg-slate-900 rounded border border-slate-800">
            <span class="text-slate-500 text-[10px] block">Scope & Class:</span>
            <span class="text-slate-300">${res.ipClass} • ${res.scope}</span>
          </div>
        </div>

        <!-- Binary Bit Visualization -->
        <div class="p-3 bg-slate-950 rounded border border-slate-800 font-mono text-xs">
          <span class="text-[10px] text-slate-500 block mb-1">32-Bit Binary Map (Network Bits vs Host Bits):</span>
          <div class="break-all tracking-widest text-sm py-1">
            <span class="text-sky-400 font-bold bg-sky-950/60 px-1 rounded">${netBits}</span><span class="text-amber-400 font-bold bg-amber-950/60 px-1 rounded">${hostBits}</span>
          </div>
          <div class="flex flex-wrap items-center gap-3 text-[10px] text-slate-400 mt-2">
            <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 bg-sky-500 rounded-sm inline-block"></span> Network Bits (${res.cidr})</span>
            <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 bg-amber-500 rounded-sm inline-block"></span> Host Bits (${32 - res.cidr})</span>
          </div>
        </div>
      `;
    };

    document.getElementById("calc-ip-input")?.addEventListener("input", updateCalc);
    document.getElementById("calc-cidr-select")?.addEventListener("change", updateCalc);
    updateCalc();
  }
};
