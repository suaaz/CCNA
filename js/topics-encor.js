/**
 * NetVisual Pro - ENCOR (350-401) Enterprise Core Curriculum
 * Enterprise Architecture, Virtualization, BGP, SD-WAN, QoS, and Automation
 */

const ENCOR_TOPICS = [
  {
    id: "encor-campus-architecture",
    track: "ENCOR",
    domain: "Architecture",
    title: "Enterprise Campus Design & High Availability (SSO & NSF)",
    subtitle: "3-Tier vs Collapsed Core, Stateful Switchover, and Non-Stop Forwarding",
    summary: "Architecting resilient enterprise LAN backbones with redundant supervisor engines and sub-second convergence.",
    diagramType: "campusArchitecture",
    readingTime: "12 min read",
    tags: ["Campus Design", "Core", "Distribution", "SSO", "NSF", "Redundancy"],
    content: `
      <h3>1. Two-Tier Collapsed Core vs Three-Tier Architecture</h3>
      <p>In modern enterprise networks, physical topology is structured into deterministic tiers to isolate faults, simplify policy changes, and scale predictably:</p>

      <ul class="list-disc pl-6 space-y-2 text-slate-300">
        <li>
          <strong>Three-Tier Modular Hierarchy:</strong>
          Comprises a dedicated <strong>Core Layer</strong> (pure high-speed packet transport with no ACLs or QOS processing overhead), a <strong>Distribution Layer</strong> (policy boundary, default gateways via SVIs, summarization, security filtering), and an <strong>Access Layer</strong> (end-user switchports, 802.1X, PoE, port security).
        </li>
        <li>
          <strong>Two-Tier Collapsed Core:</strong>
          Combines the Core and Distribution layers into a single pair of redundant Layer 3 switches. Commonly deployed in small-to-medium enterprise campuses (&lt;2,000 users) to reduce hardware costs while maintaining high availability.
        </li>
      </ul>

      <h3 class="mt-4">2. High Availability: Stateful Switchover (SSO) & Non-Stop Forwarding (NSF)</h3>
      <p>In enterprise chassis switches (e.g. Cisco Catalyst 9400/9600) equipped with dual supervisor engines:</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 text-sm">
        <div class="p-4 bg-slate-900 border border-slate-800 rounded-lg">
          <h4 class="text-purple-400 font-bold mb-1">Stateful Switchover (SSO)</h4>
          <p class="text-slate-300">Synchronizes the active supervisor's Control Plane state and hardware forwarding tables (FIB and Adjacency tables) to the standby supervisor in real-time. If the active supervisor crashes, the standby assumes control within milliseconds without rebooting line cards.</p>
        </div>
        <div class="p-4 bg-slate-900 border border-slate-800 rounded-lg">
          <h4 class="text-sky-400 font-bold mb-1">Non-Stop Forwarding (NSF)</h4>
          <p class="text-slate-300">Works in conjunction with SSO to prevent routing protocol reconvergence (OSPF/BGP/EIGRP flaps) during a supervisor failover. Routing neighbors are signaled to maintain traffic forwarding using the existing CEF hardware tables while the newly active supervisor rebuilds the control plane adjacencies.</p>
        </div>
      </div>

      <h3 class="mt-6">3. Cisco IOS-XE Redundancy Configuration</h3>
      <div class="cisco-terminal p-4 my-3 text-xs overflow-x-auto">
        <p class="cli-comment">! Configure Stateful Switchover mode</p>
        <p><span class="cli-prompt">Switch(config)#</span> <span class="cli-command">redundancy</span></p>
        <p><span class="cli-prompt">Switch(config-red)#</span> <span class="cli-command">mode sso</span></p>
        <p class="cli-comment">! Enable Non-Stop Forwarding for OSPF</p>
        <p><span class="cli-prompt">Switch(config)#</span> <span class="cli-command">router ospf 1</span></p>
        <p><span class="cli-prompt">Switch(config-router)#</span> <span class="cli-command">nsf cisco</span></p>
        <p class="cli-comment">! Verify redundancy state</p>
        <p><span class="cli-prompt">Switch#</span> <span class="cli-command">show redundancy</span></p>
        <p class="cli-output">Unit id: 1</p>
        <p class="cli-output">Current Operating Mode: <span class="cli-highlight">sso</span></p>
        <p class="cli-output">Operating Status: <span class="cli-highlight">Active</span>, Peer: Standby hot</p>
      </div>
    `
  },
  {
    id: "encor-bgp-attributes",
    track: "ENCOR",
    domain: "Infrastructure",
    title: "Border Gateway Protocol (BGP) & Path Selection",
    subtitle: "eBGP vs iBGP, Loop Prevention, and the 8-Step Best Path Algorithm",
    summary: "Master the routing engine of the Internet. Understand autonomous systems, prefix advertisement, Next-Hop-Self, and BGP route manipulation.",
    diagramType: "bgpPeering",
    readingTime: "14 min read",
    tags: ["BGP", "eBGP", "iBGP", "AS-Path", "Local Preference", "Weight"],
    content: `
      <h3>1. BGP Foundations & Peering</h3>
      <p>BGP is a <strong>Path-Vector protocol</strong> that runs over reliable TCP port 179. It does not use periodic hellos to discover neighbors dynamically; peer relationships must be explicitly configured statically.</p>

      <ul class="list-disc pl-6 space-y-2 text-slate-300">
        <li><strong>eBGP (External BGP):</strong> Formed between routers in <em>different</em> Autonomous Systems (AS). Default Administrative Distance is <strong>20</strong>. eBGP peers must typically be directly connected (default TTL = 1 unless <code>ebgp-multihop</code> is configured).</li>
        <li><strong>iBGP (Internal BGP):</strong> Formed between routers in the <em>same</em> Autonomous System. Default Administrative Distance is <strong>200</strong>. Loop prevention rule: An iBGP router will NOT re-advertise a prefix learned via iBGP to another iBGP peer (requiring full mesh or Route Reflectors).</li>
      </ul>

      <h3 class="mt-4">2. BGP Best Path Selection Algorithm (N-WLLA-OMNI)</h3>
      <p>When multiple paths exist to the same prefix, BGP evaluates attributes in this exact sequence:</p>
      
      <div class="space-y-1.5 text-xs text-slate-300 font-mono my-3">
        <div class="p-2 bg-slate-900 rounded border-l-4 border-sky-500"><strong>0. Next-Hop Reachable:</strong> Next-hop IP must be resolvable in the routing table (IGP).</div>
        <div class="p-2 bg-slate-900 rounded border-l-4 border-sky-500"><strong>1. Weight:</strong> Highest wins (0 - 65,535). Local to router only, Cisco proprietary.</div>
        <div class="p-2 bg-slate-900 rounded border-l-4 border-emerald-500"><strong>2. Local Preference:</strong> Highest wins (Default 100). Advertised throughout entire AS!</div>
        <div class="p-2 bg-slate-900 rounded border-l-4 border-slate-600"><strong>3. Locally Originated:</strong> Locally injected routes (via <code>network</code> or <code>aggregate-address</code>) beat received routes.</div>
        <div class="p-2 bg-slate-900 rounded border-l-4 border-purple-500"><strong>4. AS Path:</strong> Shortest AS-Path length wins.</div>
        <div class="p-2 bg-slate-900 rounded border-l-4 border-slate-600"><strong>5. Origin Code:</strong> IGP (<code>i</code>) beats EGP (<code>e</code>) beats Incomplete (<code>?</code>).</div>
        <div class="p-2 bg-slate-900 rounded border-l-4 border-amber-500"><strong>6. MED (Multi-Exit Discriminator):</strong> Lowest wins. Injected to influence inbound traffic from an external AS.</div>
        <div class="p-2 bg-slate-900 rounded border-l-4 border-red-500"><strong>7. Neighbor Type:</strong> eBGP paths beat iBGP paths.</div>
      </div>

      <h3 class="mt-6">3. Cisco BGP Configuration & Next-Hop-Self</h3>
      <div class="cisco-terminal p-4 my-3 text-xs overflow-x-auto">
        <p><span class="cli-prompt">Router(config)#</span> <span class="cli-command">router bgp 65001</span></p>
        <p><span class="cli-prompt">Router(config-router)#</span> <span class="cli-command">bgp router-id 2.2.2.2</span></p>
        <p class="cli-comment">! eBGP Peering with Service Provider (AS 65002)</p>
        <p><span class="cli-prompt">Router(config-router)#</span> <span class="cli-command">neighbor 203.0.113.1 remote-as 65002</span></p>
        <p class="cli-comment">! iBGP Peering with Internal Core Router</p>
        <p><span class="cli-prompt">Router(config-router)#</span> <span class="cli-command">neighbor 10.1.1.1 remote-as 65001</span></p>
        <p><span class="cli-prompt">Router(config-router)#</span> <span class="cli-command">neighbor 10.1.1.1 update-source Loopback0</span></p>
        <p><span class="cli-prompt">Router(config-router)#</span> <span class="cli-command">neighbor 10.1.1.1 next-hop-self</span> <span class="cli-keyword">! Critical for iBGP reachability!</span></p>
      </div>

      <div class="p-4 rounded-lg bg-purple-950/40 border border-purple-500/30 my-4">
        <h4 class="text-purple-300 font-bold flex items-center gap-2">💡 Why Next-Hop-Self is Essential in iBGP</h4>
        <p class="text-sm text-slate-300 mt-1">When an edge router advertises an external eBGP route into iBGP, by default it does NOT change the next-hop IP address. Internal routers often have no route to that external IP, rendering the route invalid! <code>neighbor next-hop-self</code> forces the edge router to set itself as the next hop.</p>
      </div>
    `
  },
  {
    id: "encor-sdwan-architecture",
    track: "ENCOR",
    domain: "Infrastructure",
    title: "Cisco Catalyst SD-WAN Architecture & OMP",
    subtitle: "Management, Control, Data, and Orchestration Planes",
    summary: "Disaggregating WAN networking into vManage, vSmart, vBond, and WAN Edge routers operating over an automated IPsec overlay.",
    diagramType: "sdwanPlanes",
    readingTime: "13 min read",
    tags: ["SD-WAN", "vManage", "vSmart", "vBond", "OMP", "Overlays"],
    content: `
      <h3>1. The 4 Planes of Cisco SD-WAN</h3>
      <p>Legacy WANs require manual per-device hop-by-hop configuration. Cisco SD-WAN separates network intelligence into four distinct planes:</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 text-sm">
        <div class="p-3 bg-slate-900 border border-amber-500/30 rounded">
          <strong class="text-amber-400">1. Orchestration Plane (vBond Validator):</strong>
          <p class="text-slate-300 mt-1">The gatekeeper. Authenticates all SD-WAN components using signed X.509 certificates and handles initial zero-touch onboarding and NAT traversal (STUN).</p>
        </div>
        <div class="p-3 bg-slate-900 border border-sky-500/30 rounded">
          <strong class="text-sky-400">2. Management Plane (vManage):</strong>
          <p class="text-slate-300 mt-1">Centralized graphical user interface (Single Pane of Glass). Provides REST APIs, template configuration, firmware lifecycle, and network-wide monitoring.</p>
        </div>
        <div class="p-3 bg-slate-900 border border-purple-500/30 rounded">
          <strong class="text-purple-400">3. Control Plane (vSmart Controller):</strong>
          <p class="text-slate-300 mt-1">The brain. Maintains the Overlay Management Protocol (OMP) control sessions with WAN Edges. Distributes routing, topology policies, and security encryption keys.</p>
        </div>
        <div class="p-3 bg-slate-900 border border-emerald-500/30 rounded">
          <strong class="text-emerald-400">4. Data Plane (WAN Edge - vEdge / cEdge):</strong>
          <p class="text-slate-300 mt-1">Physical or virtual routers deployed at branches and data centers. Enforces application-aware routing (AAR), traffic shaping, and line-rate IPsec data forwarding.</p>
        </div>
      </div>

      <h3 class="mt-4">2. Overlay Management Protocol (OMP)</h3>
      <p>OMP is a proprietary BGP-like protocol running over secure TLS/DTLS tunnels between WAN Edge routers and vSmart controllers. It advertises:</p>
      <ul class="list-disc pl-6 space-y-1 text-slate-300">
        <li><strong>OMP Routes:</strong> Prefixes learned from the local site LAN (OSPF, BGP, connected subnets).</li>
        <li><strong>TLOCs (Transport Locations):</strong> Defines transport attachment points (System IP, Color like <code>mpls</code>/<code>biz-internet</code>, Encapsulation like <code>ipsec</code>).</li>
        <li><strong>Service Routes:</strong> Advertises network services like firewalls or WAN optimization appliances.</li>
      </ul>

      <h3 class="mt-6">3. Zero-Touch Provisioning (ZTP / PnP) Flow</h3>
      <ol class="list-decimal pl-6 space-y-2 text-slate-300 text-sm">
        <li>Edge router powers on and pulls DHCP IP, DNS, and Gateway.</li>
        <li>Edge contacts Cisco Plug-and-Play (PnP) cloud server using pre-installed factory cert.</li>
        <li>PnP redirects edge router to the enterprise's dedicated <strong>vBond</strong> validator.</li>
        <li>vBond verifies edge serial number & certificate, then delivers IP addresses of <strong>vManage</strong> and <strong>vSmart</strong>.</li>
        <li>Edge joins fabric, receives device template from vManage, establishes OMP session with vSmart, and forms IPsec mesh with peer sites!</li>
      </ol>
    `
  },
  {
    id: "encor-vxlan-lisp",
    track: "ENCOR",
    domain: "Virtualization",
    title: "VXLAN & LISP in Cisco SD-Access Architecture",
    subtitle: "Overcoming 4096 VLAN Limits and Decoupling Identity from Location",
    summary: "Understand Layer 2 over Layer 3 overlay encapsulation with 24-bit VNIs and LISP control plane mapping in modern Enterprise fabrics.",
    diagramType: "vxlanEncapsulation",
    readingTime: "11 min read",
    tags: ["VXLAN", "LISP", "SD-Access", "Fabric", "VTEP", "VNI"],
    content: `
      <h3>1. Why VXLAN (Virtual Extensible LAN)?</h3>
      <p>Traditional VLANs are limited to 12 bits (a maximum of 4,094 VLAN IDs) and require spanning tree protocols that block valuable redundant links. VXLAN addresses these limitations:</p>

      <ul class="list-disc pl-6 space-y-2 text-slate-300">
        <li><strong>16 Million Segments:</strong> Uses a <strong>24-bit VXLAN Network Identifier (VNI)</strong>, providing up to 16,777,216 distinct overlay segments.</li>
        <li><strong>L2 Over L3 Encapsulation:</strong> Encapsulates entire Ethernet frames inside standard UDP packets (Destination Port <strong>4789</strong>), allowing Layer 2 adjacency across routed Layer 3 IP underlays.</li>
        <li><strong>VTEP (VXLAN Tunnel End Point):</strong> The physical switch entity (like a Catalyst 9300 Edge node) that originates and terminates VXLAN encapsulation.</li>
      </ul>

      <h3 class="mt-4">2. The Role of LISP in SD-Access</h3>
      <p>Instead of relying on CPU-intensive flood-and-learn broadcast replication across the fabric, Cisco SD-Access utilizes <strong>LISP (Locator/ID Separation Protocol)</strong> as its control plane:</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 text-sm">
        <div class="p-3 bg-slate-900 border border-slate-800 rounded">
          <strong class="text-sky-400">Endpoint Identifier (EID):</strong>
          <p class="text-slate-300 mt-1">The IP or MAC address of the host workstation/device (Who the device is, independent of where it plugs in).</p>
        </div>
        <div class="p-3 bg-slate-900 border border-slate-800 rounded">
          <strong class="text-purple-400">Routing Locator (RLOC):</strong>
          <p class="text-slate-300 mt-1">The IP address of the Fabric Edge switch (VTEP) where the endpoint is currently physically attached (Where the device is).</p>
        </div>
      </div>

      <div class="p-4 rounded-lg bg-sky-950/40 border border-sky-500/30 my-4">
        <h4 class="text-sky-300 font-bold flex items-center gap-2">💡 Anycast Gateway</h4>
        <p class="text-sm text-slate-300 mt-1">In SD-Access, the exact same Default Gateway IP and MAC address are configured on EVERY Fabric Edge switch simultaneously! As a wireless laptop or mobile client roams across buildings, its default gateway never changes, eliminating Layer 2 STP loops and spanning tree recalculations.</p>
      </div>
    `
  },
  {
    id: "encor-qos-architecture",
    track: "ENCOR",
    domain: "Infrastructure",
    title: "Quality of Service (QoS): Marking, Queuing & Policing",
    subtitle: "Differentiated Services (DiffServ), DSCP, CoS, and Congestion Avoidance",
    summary: "Protect real-time voice and video traffic from latency and jitter during network congestion using DiffServ architecture.",
    diagramType: "pduEncapsulation",
    readingTime: "11 min read",
    tags: ["QoS", "DSCP", "CoS", "Policing", "Shaping", "Queuing"],
    content: `
      <h3>1. QoS Fundamentals & Traffic Metrics</h3>
      <p>QoS manages network resources when bandwidth demand exceeds capacity. Key network impairments mitigated by QoS:</p>
      <ul class="list-disc pl-6 space-y-1 text-slate-300">
        <li><strong>Bandwidth:</strong> Total bits per second available on an egress interface.</li>
        <li><strong>Delay (Latency):</strong> The time it takes for a packet to transit from sender to receiver.</li>
        <li><strong>Jitter:</strong> The variance in packet arrival delay (detrimental to VoIP and video streams).</li>
        <li><strong>Packet Loss:</strong> Frames dropped when switch hardware buffers fill completely (tail drop).</li>
      </ul>

      <h3 class="mt-4">2. Layer 2 CoS vs Layer 3 DSCP</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 text-sm">
        <div class="p-3 bg-slate-900 border border-slate-800 rounded">
          <strong class="text-sky-400">Layer 2 CoS (Class of Service):</strong>
          <p class="text-slate-300 mt-1">3 bits in the 802.1Q tag (values 0-7). Lost whenever the packet crosses a routed Layer 3 interface.</p>
        </div>
        <div class="p-3 bg-slate-900 border border-slate-800 rounded">
          <strong class="text-emerald-400">Layer 3 DSCP (Differentiated Services):</strong>
          <p class="text-slate-300 mt-1">6 bits in the IPv4 ToS byte / IPv6 Traffic Class (values 0-63). Preserved end-to-end across routers!</p>
        </div>
      </div>

      <div class="p-3 bg-slate-900 rounded border border-slate-800 my-2 text-xs">
        <p class="text-sky-300 font-semibold mb-1">Standard DSCP Values to Memorize for the Exam:</p>
        <ul class="space-y-1 text-slate-300">
          <li><strong>EF (Expedited Forwarding - DSCP 46):</strong> Reserved strictly for VoIP Bearer Audio (RTP). Prioritized above all else.</li>
          <li><strong>CS4 / AF41 (DSCP 32/34):</strong> Video Conferencing streams.</li>
          <li><strong>CS3 / AF31 (DSCP 24/26):</strong> VoIP Call Signaling (SIP/SCCP).</li>
          <li><strong>AF21 / AF11:</strong> Transactional & Bulk data.</li>
          <li><strong>DF (Default Forwarding - DSCP 0):</strong> Best-effort Internet browsing.</li>
        </ul>
      </div>

      <h3 class="mt-4">3. Policing vs Shaping</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-2 text-sm">
        <div class="p-3 bg-slate-900 border border-red-500/30 rounded">
          <strong class="text-red-400">Policing (Rate Limiting):</strong> Drops or remarks traffic that exceeds configured burst rates. Introduces no delay. Ideal for inbound traffic.
        </div>
        <div class="p-3 bg-slate-900 border border-blue-500/30 rounded">
          <strong class="text-blue-400">Shaping (Traffic Smoothing):</strong> Buffers excess packets in memory queues and meters them out smoothly. Introduces delay. Ideal for egress WAN interfaces.
        </div>
      </div>
    `
  },
  {
    id: "encor-automation-restconf-yang",
    track: "ENCOR",
    domain: "Automation",
    title: "Network Programmability: YANG, RESTCONF & NETCONF",
    subtitle: "Moving Beyond CLI Screen Scraping to Model-Driven Telemetry",
    summary: "Automate Cisco enterprise routers using structured data models (YANG), JSON/XML payloads, and REST APIs over HTTPS.",
    diagramType: "sdwanPlanes",
    readingTime: "10 min read",
    tags: ["Automation", "RESTCONF", "NETCONF", "YANG", "Python", "JSON"],
    content: `
      <h3>1. The Transition to Model-Driven Programmability</h3>
      <p>Traditional network management relied on SNMP (unencrypted, non-standard MIBs) and CLI Expect/SSH scraping (fragile string parsing). Modern programmable networks utilize <strong>YANG (Yet Another Next Generation)</strong> data models.</p>

      <ul class="list-disc pl-6 space-y-1 text-slate-300">
        <li><strong>YANG:</strong> The formal modeling language (RFC 6020) that describes network configuration and operational state. It is NOT a protocol; it defines the schema!</li>
        <li><strong>NETCONF:</strong> Uses SSH (Port 830), transports XML payloads, supports transactional operations (Candidate configuration, Commit, Rollback).</li>
        <li><strong>RESTCONF:</strong> Uses HTTPS (Port 443), transports JSON or XML, maps CRUD operations directly to standard HTTP methods (GET, POST, PUT, PATCH, DELETE).</li>
      </ul>

      <h3 class="mt-4">2. HTTP Verbs to CRUD Mapping</h3>
      <table class="w-full text-xs text-slate-300 border border-slate-800 my-2">
        <thead class="bg-slate-900 text-sky-400">
          <tr><th class="p-2 text-left">HTTP Verb</th><th class="p-2 text-left">CRUD Equivalent</th><th class="p-2 text-left">Action on Router</th></tr>
        </thead>
        <tbody class="divide-y divide-slate-800">
          <tr><td class="p-2 font-mono text-emerald-400">GET</td><td class="p-2">Read</td><td class="p-2">Retrieve config or operational telemetry</td></tr>
          <tr><td class="p-2 font-mono text-sky-400">POST</td><td class="p-2">Create</td><td class="p-2">Create a new resource (e.g. create a loopback or VLAN)</td></tr>
          <tr><td class="p-2 font-mono text-amber-400">PUT</td><td class="p-2">Replace</td><td class="p-2">Create or replace existing resource entirely</td></tr>
          <tr><td class="p-2 font-mono text-purple-400">PATCH</td><td class="p-2">Update</td><td class="p-2">Modify specific fields without touching other attributes</td></tr>
          <tr><td class="p-2 font-mono text-red-400">DELETE</td><td class="p-2">Delete</td><td class="p-2">Remove configuration element (like 'no shutdown')</td></tr>
        </tbody>
      </table>

      <h3 class="mt-6">3. Python Scripting with Netmiko & Requests</h3>
      <div class="cisco-terminal p-4 my-3 text-xs overflow-x-auto">
        <p class="cli-comment"># Example: Query Cisco IOS-XE Interfaces via RESTCONF in Python</p>
        <p><span class="cli-keyword">import</span> requests</p>
        <p>url = <span class="cli-highlight">"https://10.1.1.1/restconf/data/ietf-interfaces:interfaces"</span></p>
        <p>headers = {</p>
        <p>    <span class="cli-highlight">"Accept"</span>: <span class="cli-highlight">"application/yang-data+json"</span>,</p>
        <p>    <span class="cli-highlight">"Content-Type"</span>: <span class="cli-highlight">"application/yang-data+json"</span></p>
        <p>}</p>
        <p>response = requests.get(url, auth=(<span class="cli-highlight">'admin'</span>, <span class="cli-highlight">'Cisco123!'</span>), headers=headers, verify=<span class="cli-keyword">False</span>)</p>
        <p>print(response.json())</p>
      </div>
    `
  }
];
