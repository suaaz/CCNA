/**
 * NetVisual Pro - Daily Concept Engine & Daily Exam Challenge
 * Calculates daily content based on calendar date with daily rotations
 * Includes Beginner-Friendly Context, Real-World Analogies, and Jargon Decoders
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
    mysteryFact: "Did you know? If two switches have mismatched Native VLANs on a trunk, Cisco CDP will detect it and print native VLAN mismatch errors, while Spanning Tree will block the VLAN to prevent Layer 2 loops!",
    deepContext: {
      analogyTitle: "Think of VLAN Trunking like an Airport Luggage Tag System 🏷️",
      analogy: `Imagine an airport terminal where passengers from three different flights (Flight 10, Flight 20, and Flight 30) drop off their suitcases on a single shared conveyor belt.
      
If the suitcases didn't have barcode tags on them, workers on the other end wouldn't know which luggage cart each suitcase belonged to, and luggage from Flight 10 would get mixed up with Flight 30!

In networking:
• The conveyor belt is the **Trunk Cable** connecting two network switches.
• The flights are separate **VLANs** (e.g. Sales, Accounting, and Guest Wi-Fi).
• The barcode sticker placed on each bag is the **802.1Q Tag**.
When a packet leaves Switch A, the switch slaps a 4-byte 802.1Q tag stating: "This packet belongs to VLAN 10". When Switch B receives it across the trunk, it reads the tag, removes it, and delivers the packet only to computers in VLAN 10!`,
      whatIsIt: "VLAN Trunking allows a single physical network cable between two switches to carry traffic for multiple isolated departments (VLANs) simultaneously without their data mixing together.",
      whyDoWeNeedIt: "Without Trunking, if you had 10 different VLANs (like Sales, HR, IT, VoIP, Security Cameras), you would need to run 10 separate physical cables between every single pair of switches in your building! Trunking combines all 10 virtual networks over a single high-speed fiber or copper wire.",
      howItWorksStepByStep: [
        "1. A computer in VLAN 10 sends a standard Ethernet packet to Switch A.",
        "2. Switch A recognizes that the destination computer is connected to Switch B.",
        "3. Switch A inserts a temporary 4-byte 802.1Q tag containing 'VLAN ID: 10' right after the Source MAC address.",
        "4. The tagged packet travels across the single inter-switch trunk wire.",
        "5. Switch B reads the tag, removes it, and delivers the original untagged packet only to ports assigned to VLAN 10."
      ],
      jargonGlossary: [
        { term: "VLAN (Virtual Local Area Network)", def: "A logical grouping of computers that can talk to each other as if on their own private physical switch, completely isolated from other groups." },
        { term: "Access Port", def: "A switch port connected to an end device (like a laptop or printer) that only handles traffic for ONE specific VLAN, with NO tags attached." },
        { term: "Trunk Port", def: "A high-capacity link between switches or routers that carries traffic for MULTIPLE VLANs simultaneously." },
        { term: "Native VLAN", def: "A special default VLAN on a trunk link whose traffic travels WITHOUT any 802.1Q tag (usually for backward compatibility)." }
      ],
      whatHappensIfWrong: "If two switches have mismatched Native VLAN configurations on either end of a trunk cable, packets from VLAN 10 could mistakenly leak directly into VLAN 20! This is a severe security vulnerability known as VLAN hopping or route leakage."
    }
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
    mysteryFact: "BGP does not use Hello packets to find neighbors! Because BGP runs over TCP Port 179, neighbors must be statically configured with their exact IP address.",
    deepContext: {
      analogyTitle: "Think of BGP Path Selection like Choosing an International Flight ✈️",
      analogy: `Imagine you run a multinational corporation and need to send shipments from your headquarters in New York to London. You have contracts with two different international cargo airlines (Carrier A and Carrier B).

• **Weight** is like a personal preference set by one specific warehouse manager: "I personally prefer loading onto Carrier A at my loading dock". No one else in the company knows or cares about this rule; it only affects that single loading dock.
• **Local Preference** is like a company-wide corporate policy issued by the CEO: "All offices across our entire company MUST prioritize Carrier B because we negotiated a 30% discount". Every warehouse router in your entire corporate network obeys this rule.

In BGP, when there are multiple paths to reach the Internet, routers use these values to decide which ISP connection to push outbound traffic through.`,
      whatIsIt: "BGP (Border Gateway Protocol) is the routing language of the entire global Internet. Weight and Local Preference are numerical settings network engineers use to choose which Internet Service Provider (ISP) to send their company's outbound traffic through.",
      whyDoWeNeedIt: "Most companies pay for two or more redundant Internet connections (e.g. AT&T and Verizon). If both connections can reach Google, Netflix, or Microsoft, BGP needs deterministic rules to know which ISP to use first so bandwidth isn't wasted and expensive backup links aren't saturated.",
      howItWorksStepByStep: [
        "1. Your company's edge routers receive advertisements for millions of Internet destinations from ISP 1 and ISP 2.",
        "2. A Cisco router first checks **Weight** (highest value wins). This only affects that one router.",
        "3. If Weight is equal or not set, the router checks **Local Preference** (highest value wins). This value is shared across ALL internal company routers.",
        "4. If still tied, it evaluates which path crosses fewer autonomous networks (Shortest AS Path).",
        "5. The winner is marked with a '>' in the routing table and used to forward all customer packets."
      ],
      jargonGlossary: [
        { term: "BGP (Border Gateway Protocol)", def: "The postal system of the Internet that decides how packets travel between different global companies and telecom providers." },
        { term: "Autonomous System (AS)", def: "A large network operated by a single organization (like Google, Apple, or your ISP) with a globally registered AS Number." },
        { term: "Local Preference", def: "A number (default 100) shared across your entire network telling all routers which outbound ISP connection is preferred." },
        { term: "Weight", def: "A Cisco-specific setting (0 to 65,535) that overrides all other rules, but strictly on the single router where you type it." }
      ],
      whatHappensIfWrong: "If Local Preference is misconfigured, gigabits of user traffic could accidentally get routed over a tiny, expensive emergency 4G backup link instead of your primary 10Gbps fiber connection, causing massive company-wide slowdowns and exorbitant telecom bills."
    }
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
    mysteryFact: "Setting an OSPF interface priority to 0 (`ip ospf priority 0`) immediately disqualifies that router from ever becoming a DR or BDR!",
    deepContext: {
      analogyTitle: "Think of OSPF DR/BDR like a Classroom Teacher and Class President 🏫",
      analogy: `Imagine a classroom with 30 students. If every single student had to turn around and whisper their homework answers individually to all 29 other students, the classroom would explode with 435 chaotic simultaneous conversations! Nobody would be able to hear anything.
      
Instead, the class elects a **Teacher (Designated Router - DR)** and a **Class President (Backup Designated Router - BDR)**.
Whenever a student completes a piece of homework, they only hand it to the Teacher. The Teacher then makes photocopies and announces it to the whole class at once.

In OSPF:
• The students are individual routers connected to the same switch.
• The DR receives updates from everyone and broadcasts them out cleanly.
• The BDR listens quietly in the background, ready to take over the second the Teacher is sick.`,
      whatIsIt: "On a shared local network with many routers, OSPF elects one router as the Designated Router (DR) and one as Backup (BDR) to be the central spokespeople for route updates, preventing network flood chaos.",
      whyDoWeNeedIt: "Without a DR/BDR, if you had 10 routers on a switch, they would form 45 separate neighbor relationships and flood duplicate routing packets back and forth, consuming excessive router CPU, memory, and link bandwidth.",
      howItWorksStepByStep: [
        "1. Routers join the shared network and send OSPF Hello packets to multicast address 224.0.0.5.",
        "2. Routers inspect each other's priority. The highest priority (default 1) wins. In case of a tie, the highest Router ID (IP address) wins.",
        "3. The winner becomes the DR; the second place becomes the BDR.",
        "4. All regular routers (called DROTHERs) establish a full neighbor relationship ONLY with the DR and BDR.",
        "5. When any network link goes down, a router whispers the bad news only to the DR/BDR (multicast 224.0.0.6), and the DR updates everyone else (224.0.0.5)."
      ],
      jargonGlossary: [
        { term: "OSPF (Open Shortest Path First)", def: "A popular open-standard routing protocol that maps out the fastest path between routers using Dijkstra's algorithm." },
        { term: "DR (Designated Router)", def: "The elected lead router responsible for collecting and distributing routing information on a shared LAN." },
        { term: "BDR (Backup Designated Router)", def: "The standby router that takes over instantly if the DR fails." },
        { term: "DROTHER", def: "A router that is neither the DR nor BDR. DROTHER routers do not exchange full routing tables with each other directly." }
      ],
      whatHappensIfWrong: "If a low-end, underpowered router with a slow CPU accidentally wins the DR election, it can get overwhelmed by routing updates during an outage, causing the entire building's routing table to stall."
    }
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
    mysteryFact: "Because VXLAN encapsulates Layer 2 frames in UDP, underlay routers can perform Equal-Cost Multi-Path (ECMP) hashing on the UDP source port, spreading traffic across all fabric links!",
    deepContext: {
      analogyTitle: "Think of VXLAN like Shipping Containers on a Cargo Ship 🚢",
      analogy: `Imagine you want to send a delicate antique bicycle across the ocean. You don't just push the bicycle into the ocean water; you place the bicycle inside a standardized steel shipping container.
      
The crane operators, cargo ship captains, and truck drivers don't know or care what is inside the container (whether it's a bicycle, a piano, or toys). All they look at is the shipping container's exterior ID number and destination harbor address!

In VXLAN:
• The antique bicycle is your original **Layer 2 Ethernet frame** (with its own MAC addresses and private VLANs).
• The steel shipping container is the **VXLAN + UDP header**.
• The cargo ship is the high-speed **Underlay IP Network**.
Even if two computers are separated by multiple routers across different cities, VXLAN wraps their packets in an outer envelope so they feel like they are plugged into the exact same switch room!`,
      whatIsIt: "VXLAN (Virtual Extensible LAN) is an encapsulation technology that takes an entire Ethernet frame and wraps it inside an IP/UDP packet, enabling computers to communicate on the same virtual LAN across routed networks.",
      whyDoWeNeedIt: "Old-school VLANs only support 4,096 IDs, which is way too small for modern cloud data centers (like AWS, Azure, or large enterprise campuses). VXLAN expands this limit to over **16 million virtual segments** and eliminates Spanning Tree blocking bottlenecks.",
      howItWorksStepByStep: [
        "1. Server A transmits a packet to Server B, believing they are on the same local switch.",
        "2. The physical switch (VTEP) intercepts the frame.",
        "3. The switch wraps the frame inside an outer UDP header (Port 4789) and adds an 8-byte VXLAN header with a 24-bit VNI ID.",
        "4. The packet is routed across the standard Layer 3 IP network using high-speed equal-cost multipath.",
        "5. The remote switch (VTEP) receives the UDP packet, removes the outer wrapper, and delivers the pristine original frame to Server B."
      ],
      jargonGlossary: [
        { term: "Overlay Network", def: "The virtual network that the end-user servers live in, created on top of physical hardware." },
        { term: "Underlay Network", def: "The underlying physical routers, switches, and fiber cables that move the encapsulated packets." },
        { term: "VTEP (VXLAN Tunnel Endpoint)", def: "The physical switch or software agent that packs and unpacks the VXLAN envelopes." },
        { term: "VNI (VXLAN Network Identifier)", def: "A 24-bit number identifying which virtual network the packet belongs to (supports up to 16,777,216 networks)." }
      ],
      whatHappensIfWrong: "Because wrapping a packet in VXLAN adds exactly 50 bytes of extra header weight, if the physical network cables and routers aren't configured with Jumbo Frames (MTU >= 1600), packets will get fragmented or dropped, destroying server throughput."
    }
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
    mysteryFact: "All SD-WAN controllers authenticate using enterprise root certificates. If the system clock on a brand-new router is skewed by several years, certificate validation will fail and the router will not join the SD-WAN fabric!",
    deepContext: {
      analogyTitle: "Think of vBond like a VIP Club Bouncer with a Guestlist 🛡️",
      analogy: `Imagine a high-security private members' club. You can't just walk straight into the executive dining room or financial offices.
      
At the front entrance stands the **Head Bouncer (vBond Orchestrator)**.
When a new person arrives at the door:
1. The Bouncer demands your official government security badge (**Digital Certificate**).
2. The Bouncer checks whether your serial number is on the approved company guestlist.
3. If approved, the Bouncer hands you a map showing exactly where the Manager's office (**vManage**) and Strategy Room (**vSmart**) are located.
4. Once you enter, the Bouncer steps aside; your day-to-day work happens with the Manager and Strategist!`,
      whatIsIt: "In Cisco SD-WAN, vBond is the first point of contact and security checkpoint. When a new branch router is plugged into power anywhere in the world, vBond verifies its identity before allowing it to join the corporate network.",
      whyDoWeNeedIt: "In traditional networks, a network engineer had to manually drive to every new branch office with a laptop and serial console cable to configure routers. With SD-WAN and vBond, anyone can plug the router into an Internet cable, and it automatically onboards itself securely in minutes (Zero-Touch Provisioning).",
      howItWorksStepByStep: [
        "1. A brand new router boots up at a new branch store and gets an Internet IP from DHCP.",
        "2. The router contacts vBond over a secure encrypted tunnel (DTLS/TLS).",
        "3. vBond and the router perform mutual certificate authentication to prove neither is an imposter.",
        "4. vBond figures out if the router is behind a NAT firewall using STUN.",
        "5. vBond tells the router: 'Here are the IP addresses of your vManage configuration dashboard and vSmart route controller'."
      ],
      jargonGlossary: [
        { term: "SD-WAN (Software-Defined WAN)", def: "A modern way to connect company branch offices over commodity Internet and fiber, managed centrally via software rather than manual commands." },
        { term: "vBond Orchestrator", def: "The gatekeeper that authenticates devices and facilitates initial connection discovery." },
        { term: "vManage", def: "The central web dashboard where network engineers configure policies and monitor health." },
        { term: "vSmart", def: "The controller that computes and distributes routing tables and encryption keys to all branch routers." }
      ],
      whatHappensIfWrong: "If a branch router's internal clock is wrong by more than a few minutes or the root certificate authority is expired, vBond will reject the connection, and the branch store will remain completely offline with no network connectivity."
    }
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
    mysteryFact: "Dynamic ARP Inspection (DAI) cannot function reliably without DHCP Snooping enabled first, because DAI inspects ARP replies against the DHCP Snooping binding table!",
    deepContext: {
      analogyTitle: "Think of DHCP Snooping like a Hotel Front Desk Badge Registry 🏨",
      analogy: `Imagine a large hotel. When guests arrive, they go to the official Front Desk to get their room keycard and room number.
      
Now imagine a malicious imposter sets up a fake folding table in the hallway, pretending to be hotel staff. When innocent guests walk by, the scammer hands them fake keys pointing to rooms wired with listening microphones!

• **DHCP Snooping** tells the hotel security guard: "Only the official Front Desk (Trusted Port) is allowed to hand out room keys. If anyone sitting at a regular guest table (Untrusted Port) tries to hand out room keys, confiscate the keys and kick them out immediately!"
• The switch keeps a notebook of every key handed out (**Binding Table**), so it knows exactly which guest lives in which room.`,
      whatIsIt: "DHCP Snooping is a Layer 2 switch security feature that prevents hackers from running rogue DHCP servers on user ports, ensuring employees only get legitimate IP addresses and DNS settings.",
      whyDoWeNeedIt: "If an attacker connects a rogue DHCP server to an office wall jack, they can trick all neighboring computers into sending their Internet traffic through the attacker's laptop (a Man-In-The-Middle attack), allowing them to steal bank passwords, emails, and sensitive files.",
      howItWorksStepByStep: [
        "1. The network engineer marks the port connected to the real company DHCP server as **Trusted**.",
        "2. All regular employee wall jacks are treated as **Untrusted**.",
        "3. When a computer asks for an IP (DHCP Discover), the switch lets it through.",
        "4. But if a rogue device on an untrusted port tries to answer with an IP offer (DHCP Offer/ACK), the switch immediately drops the packet and shuts down the attacker's port!",
        "5. The switch records every legitimate IP and MAC address in its **DHCP Snooping Binding Table**."
      ],
      jargonGlossary: [
        { term: "DHCP (Dynamic Host Configuration Protocol)", def: "The automatic service that gives your computer an IP address, subnet mask, and DNS server when you connect to Wi-Fi or Ethernet." },
        { term: "Rogue DHCP Server", def: "An unauthorized or malicious device pretending to be a DHCP server to hijack users' traffic." },
        { term: "Trusted Port", def: "A switch port allowed to transmit DHCP server responses (connected to legitimate network infrastructure)." },
        { term: "Dynamic ARP Inspection (DAI)", def: "A companion security feature that stops ARP spoofing by verifying packets against the DHCP snooping table." }
      ],
      whatHappensIfWrong: "If DHCP Snooping is enabled globally but the administrator forgets to configure `ip dhcp snooping trust` on the uplink port to the real server, ALL legitimate DHCP responses will be blocked, and NO computer in the building will be able to get an IP address!"
    }
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
    mysteryFact: "If you assign too much bandwidth to a strict Priority Queue (PQ), it can completely starve all other queues, which is why strict priority classes should always be policed to a sensible ceiling!",
    deepContext: {
      analogyTitle: "Think of DSCP 46 & QoS like an Ambulance with Sirens in Highway Traffic 🚑",
      analogy: `Imagine a crowded 4-lane highway during rush hour. Thousands of regular commuter cars and delivery trucks are stuck bumper-to-bumper.
      
If someone downloads a massive 50GB video game update, that's like a convoy of heavy freight trucks pulling onto the highway.
If a live 911 phone call or doctor's emergency voice call was treated the same as those freight trucks, the voice call would get stuck in the traffic jam, arriving garbled, delayed, or disconnected!

• **Quality of Service (QoS)** is the highway traffic management system.
• **DSCP 46 (Expedited Forwarding)** is the flashing red lights and sirens on the ambulance.
• **Priority Queuing** is the dedicated emergency carpool lane that immediately pulls the ambulance to the front of the toll booth before ANY regular car is allowed to move!`,
      whatIsIt: "QoS (Quality of Service) manages network bandwidth during times of congestion. DSCP 46 (Expedited Forwarding) is the industry standard stamp placed on real-time voice and video calls so routers transmit them instantly with zero delay.",
      whyDoWeNeedIt: "If a webpage takes 2 extra seconds to load, you barely notice. But if a live phone call or Zoom meeting suffers even 150 milliseconds of delay or 30ms of jitter, voices sound like robotic stutter, words get cut off, and calls drop.",
      howItWorksStepByStep: [
        "1. When an IP phone makes a call, it sets the DSCP field in the IP packet header to value 46 (Expedited Forwarding).",
        "2. The edge switch recognizes the phone's voice traffic and preserves the DSCP 46 mark.",
        "3. When the packet arrives at a busy WAN router with full buffers, the router inspects the DSCP field.",
        "4. The router places DSCP 46 packets directly into the **Strict Priority Queue**.",
        "5. The priority queue empties first, ensuring voice packets bypass bulk file downloads and transmit immediately."
      ],
      jargonGlossary: [
        { term: "QoS (Quality of Service)", def: "Technologies used to manage network resources and prioritize critical traffic when bandwidth is saturated." },
        { term: "DSCP (Differentiated Services Code Point)", def: "A 6-bit tag in the IP header (0 to 63) used to classify packet priority." },
        { term: "EF (Expedited Forwarding - DSCP 46)", def: "The highest standard priority level, strictly reserved for real-time voice audio packets." },
        { term: "Jitter", def: "The variation in packet arrival time. High jitter makes voice calls sound robotic and disjointed." },
        { term: "Latency (Delay)", def: "The total time it takes for a packet to travel from speaker to listener across the network." }
      ],
      whatHappensIfWrong: "Without QoS, whenever someone in the office backs up a large database or downloads a video file, everyone on Microsoft Teams or Cisco Webex will experience audio robotic glitches, dropped words, and disconnection."
    }
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
