/**
 * NetVisual Pro - Daily Concept Engine & Daily Exam Challenge
 * Calculates daily content based on calendar date with daily rotations
 */

const DAILY_CATALOG = [
  {
    dayId: 1,
    dateHint: "Day 1",
    track: "CCNA",
    domain: "Network Access",
    title: "VLAN Trunking & The IEEE 802.1Q Tag Anatomy",
    summary: "Today's deep dive breaks down the 4-byte 802.1Q header inserted into Ethernet frames. Learn how switches preserve VLAN segmentation across inter-switch trunk links.",
    diagramType: "campusArchitecture",
    takeaway: "The 802.1Q tag adds 4 bytes (TPID 0x8100 + TCI) directly after the Source MAC address. The Native VLAN travels completely untagged across the link.",
    commandOfDay: {
      command: "show interfaces trunk",
      syntax: "Switch# show interfaces trunk",
      description: "Instantly checks whether switchports have formed active trunks, the encapsulation used (802.1q), the native VLAN, and allowed VLAN lists.",
      sampleOutput: `Port        Mode             Encapsulation  Status        Native vlan
Gi0/24      on               802.1q         trunking      99

Port        Vlans allowed on trunk
Gi0/24      10,20,30,99

Port        Vlans in spanning tree forwarding state and not pruned
Gi0/24      10,20,30`
    },
    quiz: {
      question: "Which field in the IEEE 802.1Q tag determines the Layer 2 Class of Service (CoS) priority for voice and video frames?",
      options: [
        "A) TPID (Tag Protocol Identifier)",
        "B) PCP (Priority Code Point - 3 bits)",
        "C) DEI (Drop Eligible Indicator - 1 bit)",
        "D) VID (VLAN Identifier - 12 bits)"
      ],
      correctIndex: 1,
      explanation: "The Priority Code Point (PCP) is a 3-bit field within the 802.1Q tag that encodes 8 different priority levels (0 to 7), providing Layer 2 Quality of Service (Class of Service)."
    },
    mysteryFact: "Did you know? If two switches have mismatched Native VLANs on a trunk, Cisco CDP will detect it and print native VLAN mismatch errors, while Spanning Tree will block the VLAN to prevent Layer 2 loops!"
  },
  {
    dayId: 2,
    dateHint: "Day 2",
    track: "ENCOR",
    domain: "Infrastructure",
    title: "BGP Path Selection: Weight vs Local Preference",
    summary: "Mastering the first two steps of the Cisco BGP Best Path Selection algorithm. Why Weight is local-only while Local Preference dictates outbound AS routing.",
    diagramType: "bgpPeering",
    takeaway: "Weight is Cisco-proprietary and never leaves the local router. Local Preference is an AS-wide well-known discretionary attribute (default 100) advertised to all iBGP peers.",
    commandOfDay: {
      command: "show ip bgp | begin Network",
      syntax: "Router# show ip bgp",
      description: "Displays the BGP table, indicating the best path with a '>' symbol, next-hop IP, metric, local preference, weight, and AS path.",
      sampleOutput: `   Network          Next Hop            Metric LocPrf Weight Path
*> 198.51.100.0/24  203.0.113.2              0    100      0 65002 i
*  198.51.100.0/24  10.1.1.2                 0    100      0 65003 65002 i`
    },
    quiz: {
      question: "In the BGP Best Path algorithm, which attribute is evaluated FIRST by a Cisco router?",
      options: [
        "A) Lowest AS Path length",
        "B) Highest Local Preference",
        "C) Highest Weight (Cisco proprietary)",
        "D) Lowest MED"
      ],
      correctIndex: 2,
      explanation: "On Cisco IOS/IOS-XE devices, the highest Weight attribute is evaluated first (after ensuring the Next Hop is reachable in the routing table)."
    },
    mysteryFact: "BGP does not use Hello packets to find neighbors! Because BGP runs over TCP Port 179, neighbors must be statically configured with their exact IP address."
  },
  {
    dayId: 3,
    dateHint: "Day 3",
    track: "CCNA",
    domain: "IP Connectivity",
    title: "OSPF DR & BDR Election on Multi-Access Networks",
    summary: "Why OSPF elects a Designated Router (DR) and Backup Designated Router (BDR) on Ethernet LANs to reduce full mesh n*(n-1)/2 neighbor adjacencies.",
    diagramType: "ospfArchitecture",
    takeaway: "Routers on multi-access LANs form full adjacency ONLY with the DR and BDR (using multicast 224.0.0.6). Adjacencies between two DROTHER routers stay in 2-WAY state.",
    commandOfDay: {
      command: "show ip ospf neighbor",
      syntax: "Router# show ip ospf neighbor",
      description: "Shows neighbor Router IDs, priority, current state (FULL/DR, FULL/BDR, or 2WAY/DROTHER), dead timer, and interface.",
      sampleOutput: `Neighbor ID     Pri   State           Dead Time   Address         Interface
10.255.255.2      1   FULL/DR         00:00:36    192.168.1.2     Gi0/0/0
10.255.255.3      1   FULL/BDR        00:00:38    192.168.1.3     Gi0/0/0
10.255.255.4      0   2WAY/DROTHER    00:00:34    192.168.1.4     Gi0/0/0`
    },
    quiz: {
      question: "What is the primary condition that determines which router becomes the OSPF Designated Router (DR) when priorities are tied?",
      options: [
        "A) Lowest MAC address on the LAN",
        "B) Highest Router ID (highest loopback IP or highest active physical IP)",
        "C) The router with the lowest IP address",
        "D) The router with the lowest OSPF process ID"
      ],
      correctIndex: 1,
      explanation: "Highest OSPF interface priority wins (default 1). In case of a tie, the router with the highest Router ID (RID) is elected DR."
    },
    mysteryFact: "Setting an OSPF interface priority to 0 (`ip ospf priority 0`) immediately disqualifies that router from ever becoming a DR or BDR!"
  },
  {
    dayId: 4,
    dateHint: "Day 4",
    track: "ENCOR",
    domain: "Virtualization",
    title: "VXLAN Encapsulation & The 50-Byte Packet Overhead",
    summary: "How modern enterprise and data center fabrics wrap Ethernet frames into UDP Port 4789 to provide 16 million overlay VNIs without STP bottlenecks.",
    diagramType: "vxlanEncapsulation",
    takeaway: "VXLAN adds 50 bytes of overhead (Outer L2 14B + Outer IP 20B + UDP 8B + VXLAN 8B). Underlay IP routers must support MTU >= 1600 bytes to avoid packet fragmentation.",
    commandOfDay: {
      command: "show nve vni",
      syntax: "Switch# show nve vni",
      description: "On Cisco Nexus / Catalyst switches, displays Network Virtualization Endpoint (NVE) VXLAN mappings, VNI IDs, and multicast groups.",
      sampleOutput: `VNI        State  BD    Mode       Type      Flags
10010      Up     10    L2         L2        --
10020      Up     20    L2         L2        --
50001      Up     --    L3         L3        --`
    },
    quiz: {
      question: "Which destination UDP port is reserved by IANA for standard VXLAN traffic?",
      options: [
        "A) Port 4789",
        "B) Port 8472",
        "C) Port 4500",
        "D) Port 179"
      ],
      correctIndex: 0,
      explanation: "RFC 7348 standardized destination UDP port 4789 for VXLAN traffic. (Port 8472 was an early pre-standard Linux draft)."
    },
    mysteryFact: "Because VXLAN encapsulates Layer 2 frames in UDP, underlay routers can perform Equal-Cost Multi-Path (ECMP) hashing on the UDP source port, spreading traffic across all fabric links!"
  },
  {
    dayId: 5,
    dateHint: "Day 5",
    track: "ENCOR",
    domain: "Infrastructure",
    title: "Cisco SD-WAN: The vBond Zero-Touch Orchestrator",
    summary: "Understanding how vBond acts as the initial authentication gatekeeper, facilitating STUN NAT discovery and controller discovery for edge routers.",
    diagramType: "sdwanPlanes",
    takeaway: "vBond is the only SD-WAN component that requires a publicly routable IP address because branch routers must reach it from behind unknown NAT gateways.",
    commandOfDay: {
      command: "show control connections",
      syntax: "vEdge# show control connections",
      description: "Verifies secure DTLS/TLS control plane tunnels from the WAN Edge to vBond, vManage, and vSmart controllers.",
      sampleOutput: `PEER    PEER             PEER
TYPE    IP               PRIVATE IP       STATE
vbond   198.51.100.10    198.51.100.10    connected
vmanage 198.51.100.20    10.0.100.20      connected
vsmart  198.51.100.30    10.0.100.30      connected`
    },
    quiz: {
      question: "Which protocol do Cisco SD-WAN WAN Edge routers use to discover their public IP and NAT mapping through vBond?",
      options: [
        "A) OMP (Overlay Management Protocol)",
        "B) STUN (Session Traversal Utilities for NAT)",
        "C) BFD (Bidirectional Forwarding Detection)",
        "D) IPsec IKEv2"
      ],
      correctIndex: 1,
      explanation: "vBond utilizes STUN (RFC 5389) mechanisms to determine the public IP and NAT mapping type of edge routers attempting to join the fabric."
    },
    mysteryFact: "All SD-WAN controllers authenticate using enterprise root certificates. If the system clock on a brand-new router is skewed by several years, certificate validation will fail and the router will not join the SD-WAN fabric!"
  },
  {
    dayId: 6,
    dateHint: "Day 6",
    track: "CCNA",
    domain: "Security Fundamentals",
    title: "DHCP Snooping & Dynamic ARP Inspection (DAI)",
    subtitle: "Protecting Campus Switches from Rogue DHCP and ARP Poisoning",
    summary: "How Layer 2 switches inspect DHCP requests to build a trusted binding database and stop Man-In-The-Middle attacks.",
    diagramType: "campusArchitecture",
    takeaway: "DHCP Snooping designates switchports as Trusted (uplink to genuine DHCP server) or Untrusted (user access ports). DAI leverages the snooping database to validate ARP packets.",
    commandOfDay: {
      command: "show ip dhcp snooping binding",
      syntax: "Switch# show ip dhcp snooping binding",
      description: "Displays the learned MAC-to-IP binding table built dynamically by DHCP Snooping on untrusted ports.",
      sampleOutput: `MacAddress          IpAddress        Lease(sec)  Type           VLAN  Interface
------------------  ---------------  ----------  -------------  ----  --------------------
00:1A:2B:3C:4D:5E   192.168.10.105   86400       dhcp-snooping  10    GigabitEthernet0/1
00:50:56:A1:B2:C3   192.168.10.106   86400       dhcp-snooping  10    GigabitEthernet0/2`
    },
    quiz: {
      question: "What happens by default if an untrusted port receives a DHCP OFFER packet when DHCP Snooping is enabled?",
      options: [
        "A) The switch forwards the packet normally",
        "B) The switch drops the DHCP OFFER packet immediately",
        "C) The switch modifies the default gateway to 0.0.0.0",
        "D) The switch converts the packet to unicast"
      ],
      correctIndex: 1,
      explanation: "DHCP server responses (DHCP OFFER, DHCP ACK) are only allowed to enter through Trusted ports. If received on an Untrusted port, the switch discards the packet to prevent rogue DHCP attacks."
    },
    mysteryFact: "Dynamic ARP Inspection (DAI) cannot function reliably without DHCP Snooping enabled first, because DAI inspects ARP replies against the DHCP Snooping binding table!"
  },
  {
    dayId: 7,
    dateHint: "Day 7",
    track: "ENCOR",
    domain: "Infrastructure",
    title: "Quality of Service (QoS): Expedited Forwarding (EF) & DSCP 46",
    summary: "Why voice RTP bearer traffic is assigned DSCP 46 (Expedited Forwarding) and placed into strict Priority Queuing with zero tolerance for jitter.",
    diagramType: "pduEncapsulation",
    takeaway: "VoIP voice streams require <= 150ms one-way delay, <= 30ms jitter, and <= 1% packet loss. Strict priority queuing guarantees voice packets transmit before any other data packets.",
    commandOfDay: {
      command: "show policy-map interface GigabitEthernet0/0/1",
      syntax: "Router# show policy-map interface GigabitEthernet0/0/1",
      description: "Checks real-time QoS queue statistics, matched packets, dropped packets, and policing bandwidth usage.",
      sampleOutput: `Service-policy output: WAN-EDGE-QOS
  Class-map: VOICE-EF (match-any)
    542010 packets, 119242200 bytes
    Strict Priority
    Bandwidth 500 (kbps)
    (pkts matched/pkts dropped) 542010/0`
    },
    quiz: {
      question: "What is the binary value of DSCP 46 (Expedited Forwarding) when mapped to the 6-bit Differentiated Services field?",
      options: [
        "A) 101110",
        "B) 100010",
        "C) 011010",
        "D) 000000"
      ],
      correctIndex: 0,
      explanation: "46 in binary is 101110 (32 + 8 + 4 + 2 = 46). In the IP header Type of Service (ToS) byte, the last two bits are reserved for ECN (Explicit Congestion Notification)."
    },
    mysteryFact: "If you assign too much bandwidth to a strict Priority Queue (PQ), it can completely starve all other queues, which is why strict priority classes should always be policed to a sensible ceiling!"
  }
];

const DailyEngine = {
  /**
   * Get day index of the year (1 - 365)
   */
  getDayOfYear: function(date = new Date()) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = (date - start) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  },

  /**
   * Get the featured concept for the selected date
   */
  getTodayConcept: function(customDate = new Date()) {
    const dayOfYear = this.getDayOfYear(customDate);
    const catalogIndex = (dayOfYear - 1) % DAILY_CATALOG.length;
    const entry = DAILY_CATALOG[catalogIndex];
    
    return {
      ...entry,
      currentDate: customDate.toLocaleDateString(undefined, { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      dayNumber: dayOfYear,
      totalCatalog: DAILY_CATALOG.length
    };
  }
};
