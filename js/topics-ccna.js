/**
 * NetVisual Pro - CCNA (200-301) Comprehensive Curriculum
 * Rich explanations, CLI syntax, diagrams, and exam traps
 */

const CCNA_TOPICS = [
  {
    id: "ccna-encapsulation",
    track: "CCNA",
    domain: "Network Fundamentals",
    title: "OSI Model vs TCP/IP & Encapsulation",
    subtitle: "Understanding PDUs, Protocol Headers, and the 7-Layer Flow",
    summary: "How raw application data is wrapped into Transport segments, Network packets, and Data Link frames across the network wire.",
    diagramType: "pduEncapsulation",
    readingTime: "8 min read",
    tags: ["OSI", "TCP/IP", "Encapsulation", "Headers", "L2-L4"],
    content: `
      <h3>1. The OSI vs. TCP/IP Architecture</h3>
      <p>Data transmission across any computer network follows an encapsulation model. As an application creates payload data, each layer down the stack attaches its own control header containing addressing and sequence information.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <div class="p-4 rounded-lg bg-slate-900 border border-slate-800">
          <h4 class="text-sky-400 font-bold mb-2">OSI 7-Layer Model</h4>
          <ul class="text-sm space-y-1 text-slate-300">
            <li><strong>7. Application:</strong> HTTP, DNS, SSH, SNMP</li>
            <li><strong>6. Presentation:</strong> SSL/TLS, ASCII, JPEG</li>
            <li><strong>5. Session:</strong> RPC, SQL Sessions, NetBIOS</li>
            <li><strong>4. Transport:</strong> TCP (Reliable), UDP (Fast)</li>
            <li><strong>3. Network:</strong> IPv4, IPv6, ICMP, Routing</li>
            <li><strong>2. Data Link:</strong> Ethernet (802.3), Wi-Fi (802.11)</li>
            <li><strong>1. Physical:</strong> Cat6 RJ45, Fiber Optic, Bits</li>
          </ul>
        </div>
        <div class="p-4 rounded-lg bg-slate-900 border border-slate-800">
          <h4 class="text-emerald-400 font-bold mb-2">TCP/IP 4-Layer Model</h4>
          <ul class="text-sm space-y-1 text-slate-300">
            <li><strong>Application:</strong> Represents OSI L5, L6, L7</li>
            <li><strong>Transport:</strong> TCP / UDP segments</li>
            <li><strong>Internet:</strong> IP Packets, ARP, ICMP</li>
            <li><strong>Network Access:</strong> Ethernet Frames, MAC, Physical</li>
          </ul>
        </div>
      </div>

      <h3>2. Protocol Data Units (PDU) & Decapsulation</h3>
      <p>A frequent CCNA exam question tests the exact name of the PDU at each layer:</p>
      <ul class="list-disc pl-6 space-y-1 text-slate-300">
        <li>Layer 4 = <strong>Segment</strong> (TCP) or <strong>Datagram</strong> (UDP)</li>
        <li>Layer 3 = <strong>Packet</strong> (IPv4 or IPv6)</li>
        <li>Layer 2 = <strong>Frame</strong> (Ethernet II or 802.1Q)</li>
        <li>Layer 1 = <strong>Bits</strong> (Electrical voltage, light pulses, RF)</li>
      </ul>

      <h3 class="mt-6">3. Cisco IOS CLI Verification</h3>
      <div class="cisco-terminal p-4 my-3 text-xs overflow-x-auto">
        <p class="cli-comment">! Check interface layer status (L1 and L2)</p>
        <p><span class="cli-prompt">Router#</span> <span class="cli-command">show ip interface brief</span></p>
        <p class="cli-output">Interface              IP-Address      OK? Method Status                Protocol</p>
        <p class="cli-output">GigabitEthernet0/0/0   192.168.1.1     YES manual up                    up      <span class="cli-highlight">(L1 Up, L2 Up)</span></p>
        <p class="cli-output">GigabitEthernet0/0/1   unassigned      YES unset  up                    down    <span class="cli-keyword">(L1 Up, L2 Down - Keepalive/encapsulation mismatch)</span></p>
        <p class="cli-output">GigabitEthernet0/0/2   unassigned      YES unset  administratively down down    <span class="cli-comment">(Shutdown configured)</span></p>
      </div>

      <div class="p-4 rounded-lg bg-sky-950/40 border border-sky-500/30 my-4">
        <h4 class="text-sky-300 font-bold flex items-center gap-2">💡 CCNA Exam Tip</h4>
        <p class="text-sm text-slate-300 mt-1">If an interface says <code>Status: Up, Protocol: Down</code>, Layer 1 physical cable is connected, but Layer 2 framing, clock rate, keepalive, or encapsulation protocol (e.g. HDLC vs PPP) failed.</p>
      </div>
    `
  },
  {
    id: "ccna-vlans-trunking",
    track: "CCNA",
    domain: "Network Access",
    title: "VLANs, 802.1Q Trunking & Inter-VLAN Routing",
    subtitle: "Segmenting Broadcast Domains and Router-on-a-Stick vs SVIs",
    summary: "Isolate network traffic at Layer 2 using Virtual LANs, tag frames across multi-switch trunks with IEEE 802.1Q, and route between subnets.",
    diagramType: "campusArchitecture",
    readingTime: "10 min read",
    tags: ["VLAN", "802.1Q", "Trunk", "Router-on-a-Stick", "SVI"],
    content: `
      <h3>1. What is a VLAN?</h3>
      <p>A Virtual Local Area Network (VLAN) breaks a single physical switch into multiple logical switches. Each VLAN represents a distinct <strong>broadcast domain</strong> and typically maps to a single IP subnet.</p>
      
      <p>Benefits of VLANs:</p>
      <ul class="list-disc pl-6 space-y-1 text-slate-300">
        <li><strong>Security:</strong> Isolates sensitive devices (e.g., HR, Finance, Voice, Guests) from one another.</li>
        <li><strong>Performance:</strong> Prevents broadcast storms (such as ARP or DHCP queries) from saturating the entire campus.</li>
        <li><strong>Cost Reduction:</strong> No need to buy separate physical switches for each departmental department.</li>
      </ul>

      <h3 class="mt-4">2. 802.1Q Frame Tagging</h3>
      <p>When an Ethernet frame traverses an access port, it has no tag. When it crosses an <strong>802.1Q Trunk port</strong>, a 4-byte 802.1Q header is inserted directly after the Source MAC field:</p>
      <ul class="list-disc pl-6 space-y-1 text-slate-300">
        <li><strong>TPID (2 Bytes):</strong> Value <code>0x8100</code> identifying an 802.1Q tagged frame.</li>
        <li><strong>PCP (3 Bits):</strong> Priority Code Point for Layer 2 Class of Service (QoS).</li>
        <li><strong>DEI (1 Bit):</strong> Drop Eligible Indicator.</li>
        <li><strong>VLAN ID (12 Bits):</strong> Supports VLANs 1 to 4094 (0 and 4095 reserved).</li>
      </ul>

      <h3 class="mt-6">3. Cisco Switch CLI Configuration</h3>
      <div class="cisco-terminal p-4 my-3 text-xs overflow-x-auto">
        <p class="cli-comment">! Create VLANs</p>
        <p><span class="cli-prompt">Switch(config)#</span> <span class="cli-command">vlan 10</span></p>
        <p><span class="cli-prompt">Switch(config-vlan)#</span> <span class="cli-command">name ENGINEERING</span></p>
        <p><span class="cli-prompt">Switch(config)#</span> <span class="cli-command">vlan 20</span></p>
        <p><span class="cli-prompt">Switch(config-vlan)#</span> <span class="cli-command">name VOICE</span></p>
        <p class="cli-comment">! Configure Access Port with Voice VLAN</p>
        <p><span class="cli-prompt">Switch(config)#</span> <span class="cli-command">interface GigabitEthernet0/1</span></p>
        <p><span class="cli-prompt">Switch(config-if)#</span> <span class="cli-command">switchport mode access</span></p>
        <p><span class="cli-prompt">Switch(config-if)#</span> <span class="cli-command">switchport access vlan 10</span></p>
        <p><span class="cli-prompt">Switch(config-if)#</span> <span class="cli-command">switchport voice vlan 20</span></p>
        <p class="cli-comment">! Configure Trunk Port to upstream switch</p>
        <p><span class="cli-prompt">Switch(config)#</span> <span class="cli-command">interface GigabitEthernet0/24</span></p>
        <p><span class="cli-prompt">Switch(config-if)#</span> <span class="cli-command">switchport trunk encapsulation dot1q</span></p>
        <p><span class="cli-prompt">Switch(config-if)#</span> <span class="cli-command">switchport mode trunk</span></p>
        <p><span class="cli-prompt">Switch(config-if)#</span> <span class="cli-command">switchport trunk allowed vlan 10,20</span></p>
        <p><span class="cli-prompt">Switch(config-if)#</span> <span class="cli-command">switchport trunk native vlan 99</span></p>
      </div>

      <div class="p-4 rounded-lg bg-amber-950/40 border border-amber-500/30 my-4">
        <h4 class="text-amber-300 font-bold flex items-center gap-2">⚠️ Security Warning: Native VLAN Mismatch</h4>
        <p class="text-sm text-slate-300 mt-1">By default, untagged traffic travels over the Native VLAN (default VLAN 1). Leaving VLAN 1 as native poses VLAN Hopping attack risks. Always configure a dedicated unused Native VLAN (e.g. VLAN 99 or 999) on both ends of the trunk!</p>
      </div>
    `
  },
  {
    id: "ccna-spanning-tree",
    track: "CCNA",
    domain: "Network Access",
    title: "Spanning Tree Protocol (STP & Rapid PVST+)",
    subtitle: "Preventing Layer 2 Loops, Broadcast Storms, and Bridge Loops",
    summary: "Deep dive into Bridge ID, Root Bridge election, Port Roles (Root, Designated, Alternate), and 802.1w Rapid convergence.",
    diagramType: "spanningTree",
    readingTime: "11 min read",
    tags: ["STP", "802.1D", "802.1w", "Rapid PVST+", "Root Bridge"],
    content: `
      <h3>1. Why Spanning Tree is Necessary</h3>
      <p>Unlike Layer 3 IP packets which have a Time-to-Live (TTL) field that decrements to zero, <strong>Layer 2 Ethernet frames have NO TTL</strong>. If redundant links exist between switches without STP, broadcast frames loop infinitely, causing catastrophic CPU lockup, CAM table flapping, and network blackout.</p>

      <h3 class="mt-4">2. The STP Election Process</h3>
      <ol class="list-decimal pl-6 space-y-2 text-slate-300">
        <li>
          <strong>Elect One Root Bridge per Broadcast Domain:</strong>
          The switch with the <strong>lowest Bridge ID (BID)</strong> wins.
          <br><span class="text-sky-300 text-xs font-mono">Bridge ID = Priority (multiple of 4096) + Extended System ID (VLAN ID) + Base MAC Address</span>
        </li>
        <li>
          <strong>Elect One Root Port (RP) per Non-Root Switch:</strong>
          The port with the lowest Root Path Cost toward the Root Bridge.
        </li>
        <li>
          <strong>Elect One Designated Port (DP) per Segment:</strong>
          The port advertising the best BPDU into the wire.
        </li>
        <li>
          <strong>Block Remaining Ports:</strong>
          Put remaining ports into <strong>Alternate / Blocking</strong> state to sever loops.
        </li>
      </ol>

      <h3 class="mt-6">3. Cisco IOS CLI Tuning</h3>
      <div class="cisco-terminal p-4 my-3 text-xs overflow-x-auto">
        <p class="cli-comment">! Set switch to Rapid PVST+ (converges in 1-2 seconds vs 30-50s 802.1D)</p>
        <p><span class="cli-prompt">Switch(config)#</span> <span class="cli-command">spanning-tree mode rapid-pvst</span></p>
        <p class="cli-comment">! Hardcode this switch to be the Root Bridge for VLAN 10</p>
        <p><span class="cli-prompt">Switch(config)#</span> <span class="cli-command">spanning-tree vlan 10 priority 4096</span></p>
        <p class="cli-comment">! Protect access ports against rogue switches and bridge loops</p>
        <p><span class="cli-prompt">Switch(config-if)#</span> <span class="cli-command">spanning-tree portfast</span></p>
        <p><span class="cli-prompt">Switch(config-if)#</span> <span class="cli-command">spanning-tree bpduguard enable</span></p>
      </div>

      <div class="p-4 rounded-lg bg-sky-950/40 border border-sky-500/30 my-4">
        <h4 class="text-sky-300 font-bold flex items-center gap-2">💡 PortFast & BPDU Guard</h4>
        <p class="text-sm text-slate-300 mt-1"><code>PortFast</code> immediately transitions an edge port from Blocking to Forwarding, bypassing Listening and Learning states. <code>BPDU Guard</code> instantly error-disables the port if any BPDU is received, preventing unauthorized switches from hijacking the Root role.</p>
      </div>
    `
  },
  {
    id: "ccna-ospf-fundamentals",
    track: "CCNA",
    domain: "IP Connectivity",
    title: "OSPFv2 Single & Multi-Area Routing",
    subtitle: "Dijkstra SPF Algorithm, Neighbor States, and LSAs",
    summary: "Open Shortest Path First link-state routing protocol, DR/BDR election on broadcast networks, and LSA exchanges.",
    diagramType: "ospfArchitecture",
    readingTime: "12 min read",
    tags: ["OSPFv2", "Routing", "Link-State", "DR/BDR", "Area 0"],
    content: `
      <h3>1. OSPF Protocol Characteristics</h3>
      <p>OSPF is an open-standard <strong>Link-State</strong> routing protocol based on Edsger Dijkstra's Shortest Path First (SPF) algorithm.</p>
      <ul class="list-disc pl-6 space-y-1 text-slate-300">
        <li><strong>Metric:</strong> Cost = Reference Bandwidth / Interface Bandwidth (Default 100 Mbps).</li>
        <li><strong>Administrative Distance (AD):</strong> 110.</li>
        <li><strong>Multicast Addresses:</strong> <code>224.0.0.5</code> (All OSPF Routers), <code>224.0.0.6</code> (All DR/BDR Routers).</li>
        <li><strong>Protocol Number:</strong> IP Protocol 89 (Does NOT use TCP or UDP).</li>
      </ul>

      <h3 class="mt-4">2. The 7 OSPF Neighbor States</h3>
      <div class="space-y-2 text-sm text-slate-300 my-3">
        <div class="p-2 bg-slate-900 rounded"><strong class="text-sky-400">1. Down:</strong> No Hello packets heard.</div>
        <div class="p-2 bg-slate-900 rounded"><strong class="text-sky-400">2. Init:</strong> Received Hello from neighbor, but our own Router ID is not listed in it.</div>
        <div class="p-2 bg-slate-900 rounded"><strong class="text-sky-400">3. 2-Way:</strong> Bidirectional communication established; our Router ID is seen. DR/BDR election happens here!</div>
        <div class="p-2 bg-slate-900 rounded"><strong class="text-sky-400">4. ExStart:</strong> Master/Slave relationship negotiated and initial sequence number chosen.</div>
        <div class="p-2 bg-slate-900 rounded"><strong class="text-sky-400">5. Exchange:</strong> Database Description (DBD) packets exchanged.</div>
        <div class="p-2 bg-slate-900 rounded"><strong class="text-sky-400">6. Loading:</strong> Link State Requests (LSR) and Link State Updates (LSU) populate the LSDB.</div>
        <div class="p-2 bg-slate-900 rounded"><strong class="text-emerald-400 font-bold">7. Full:</strong> Routers have synchronized LSDB databases. Full adjacency!</div>
      </div>

      <h3 class="mt-6">3. Cisco Router Configuration</h3>
      <div class="cisco-terminal p-4 my-3 text-xs overflow-x-auto">
        <p><span class="cli-prompt">Router(config)#</span> <span class="cli-command">router ospf 1</span></p>
        <p><span class="cli-prompt">Router(config-router)#</span> <span class="cli-command">router-id 1.1.1.1</span></p>
        <p><span class="cli-prompt">Router(config-router)#</span> <span class="cli-command">auto-cost reference-bandwidth 10000</span> <span class="cli-comment">! Tuning for 10Gbps links</span></p>
        <p class="cli-comment">! Enable OSPF on interfaces directly (Modern Best Practice)</p>
        <p><span class="cli-prompt">Router(config)#</span> <span class="cli-command">interface GigabitEthernet0/0/0</span></p>
        <p><span class="cli-prompt">Router(config-if)#</span> <span class="cli-command">ip ospf 1 area 0</span></p>
        <p><span class="cli-prompt">Router(config-if)#</span> <span class="cli-command">ip ospf priority 255</span> <span class="cli-comment">! Guarantee DR role</span></p>
        <p class="cli-comment">! Stop sending hellos into LAN switch</p>
        <p><span class="cli-prompt">Router(config-router)#</span> <span class="cli-command">passive-interface GigabitEthernet0/0/1</span></p>
      </div>
    `
  },
  {
    id: "ccna-ip-services-nat",
    track: "CCNA",
    domain: "IP Services",
    title: "Network Address Translation (NAT) & PAT",
    subtitle: "Static NAT, Dynamic NAT, and Port Address Translation (Overload)",
    summary: "Conserving IPv4 public address space by mapping private RFC 1918 IPs to globally routable public IPs.",
    diagramType: "pduEncapsulation",
    readingTime: "9 min read",
    tags: ["NAT", "PAT", "RFC 1918", "Overload", "Port Numbers"],
    content: `
      <h3>1. RFC 1918 Private IP Ranges</h3>
      <p>Before studying NAT, commit the 3 private address ranges to memory:</p>
      <ul class="list-disc pl-6 space-y-1 text-slate-300">
        <li><strong>Class A:</strong> <code>10.0.0.0/8</code> (10.0.0.0 – 10.255.255.255)</li>
        <li><strong>Class B:</strong> <code>172.16.0.0/12</code> (172.16.0.0 – 172.31.255.255)</li>
        <li><strong>Class C:</strong> <code>192.168.0.0/16</code> (192.168.0.0 – 192.168.255.255)</li>
      </ul>

      <h3 class="mt-4">2. NAT Terminology Cheat Sheet</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 my-3 text-sm">
        <div class="p-3 bg-slate-900 border border-slate-800 rounded">
          <strong class="text-sky-400">Inside Local (IL):</strong> The private IP assigned to the host inside your network (e.g. 192.168.1.50).
        </div>
        <div class="p-3 bg-slate-900 border border-slate-800 rounded">
          <strong class="text-emerald-400">Inside Global (IG):</strong> The public IP representing the host to the outside internet (e.g. 203.0.113.5).
        </div>
        <div class="p-3 bg-slate-900 border border-slate-800 rounded">
          <strong class="text-purple-400">Outside Local (OL):</strong> The IP of the destination as known by internal hosts.
        </div>
        <div class="p-3 bg-slate-900 border border-slate-800 rounded">
          <strong class="text-amber-400">Outside Global (OG):</strong> The true public IP assigned to the destination server on the Internet.
        </div>
      </div>

      <h3 class="mt-6">3. Port Address Translation (PAT / Overload) Configuration</h3>
      <p>PAT maps thousands of private internal IP addresses to a single public IP address by tracking Layer 4 source port numbers (up to 65,535 concurrent translation sockets).</p>
      <div class="cisco-terminal p-4 my-3 text-xs overflow-x-auto">
        <p class="cli-comment">! Define internal interfaces and outside internet interface</p>
        <p><span class="cli-prompt">Router(config)#</span> <span class="cli-command">interface GigabitEthernet0/0/0</span></p>
        <p><span class="cli-prompt">Router(config-if)#</span> <span class="cli-command">ip nat inside</span></p>
        <p><span class="cli-prompt">Router(config)#</span> <span class="cli-command">interface GigabitEthernet0/0/1</span></p>
        <p><span class="cli-prompt">Router(config-if)#</span> <span class="cli-command">ip nat outside</span></p>
        <p class="cli-comment">! Match internal subnet with ACL</p>
        <p><span class="cli-prompt">Router(config)#</span> <span class="cli-command">access-list 1 permit 192.168.1.0 0.0.0.255</span></p>
        <p class="cli-comment">! Enable NAT Overload on outside WAN interface</p>
        <p><span class="cli-prompt">Router(config)#</span> <span class="cli-command">ip nat inside source list 1 interface GigabitEthernet0/0/1 overload</span></p>
        <p class="cli-comment">! Verify active translations</p>
        <p><span class="cli-prompt">Router#</span> <span class="cli-command">show ip nat translations</span></p>
      </div>
    `
  },
  {
    id: "ccna-network-security-acls",
    track: "CCNA",
    domain: "Security Fundamentals",
    title: "Access Control Lists (ACLs) & Port Security",
    subtitle: "Standard vs Extended ACLs, Wildcard Masks, and L2 Hardening",
    summary: "Filter packet traffic based on IP, port numbers, and protocols, combined with switchport MAC address locking.",
    diagramType: "campusArchitecture",
    readingTime: "10 min read",
    tags: ["ACL", "Security", "Port Security", "Wildcard Mask", "Firewall"],
    content: `
      <h3>1. Standard vs Extended Access Control Lists</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 text-sm">
        <div class="p-4 bg-slate-900 border border-slate-800 rounded-lg">
          <h4 class="text-sky-400 font-bold mb-1">Standard ACLs (1-99, 1300-1999)</h4>
          <p class="text-slate-300">Filters <strong>ONLY based on Source IP address</strong>. Must be placed as close to the <strong>destination</strong> as possible to avoid prematurely blocking needed traffic elsewhere.</p>
        </div>
        <div class="p-4 bg-slate-900 border border-slate-800 rounded-lg">
          <h4 class="text-purple-400 font-bold mb-1">Extended ACLs (100-199, 2000-2699)</h4>
          <p class="text-slate-300">Filters on <strong>Source IP, Destination IP, Protocol (TCP/UDP/ICMP), and Port number</strong>. Must be placed as close to the <strong>source</strong> as possible to drop unauthorized traffic immediately!</p>
        </div>
      </div>

      <h3 class="mt-4">2. Switchport Port Security</h3>
      <p>Prevents MAC flooding attacks by restricting how many MAC addresses can be learned on a physical switchport.</p>
      <div class="cisco-terminal p-4 my-3 text-xs overflow-x-auto">
        <p><span class="cli-prompt">Switch(config)#</span> <span class="cli-command">interface GigabitEthernet0/2</span></p>
        <p><span class="cli-prompt">Switch(config-if)#</span> <span class="cli-command">switchport mode access</span></p>
        <p><span class="cli-prompt">Switch(config-if)#</span> <span class="cli-command">switchport port-security</span></p>
        <p><span class="cli-prompt">Switch(config-if)#</span> <span class="cli-command">switchport port-security maximum 2</span></p>
        <p><span class="cli-prompt">Switch(config-if)#</span> <span class="cli-command">switchport port-security mac-address sticky</span></p>
        <p><span class="cli-prompt">Switch(config-if)#</span> <span class="cli-command">switchport port-security violation shutdown</span></p>
      </div>

      <div class="p-3 bg-slate-900 rounded border border-slate-800 my-2 text-xs">
        <p class="text-sky-300 font-semibold mb-1">Port Security Violation Modes:</p>
        <ul class="space-y-1 text-slate-300">
          <li><strong>Protect:</strong> Drops offending frames quietly. No SNMP trap, counter does not increment.</li>
          <li><strong>Restrict:</strong> Drops offending frames. Sends SNMP trap, logs Syslog, increments violation counter.</li>
          <li><strong>Shutdown (Default):</strong> Error-disables port immediately. LED turns amber. Requires admin <code>shutdown / no shutdown</code> or errdisable recovery.</li>
        </ul>
      </div>
    `
  }
];
