# 🌐 NetEngineer.io — CCNA & ENCOR Visual Playbook

An interactive, visual-first personal website designed to teach and explain Cisco **CCNA (200-301)** and **ENCOR (350-401)** network engineering concepts. Features crisp architectural SVG diagrams, packet encapsulation visualizers, live CLI snippets, and an automated daily rotating concept curriculum.

![NetEngineer Banner](https://img.shields.io/badge/Cisco-CCNA%20%7C%20ENCOR-0284c7?style=for-the-badge&logo=cisco&logoColor=white)
![Hosted on GitHub Pages](https://img.shields.io/badge/Deployment-GitHub%20Pages-10b981?style=for-the-badge&logo=github&logoColor=white)
![License MIT](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

---

## ✨ Features

- 📐 **Vector Architectural Blueprints (SVG)**: Custom scalable diagrams for OSI/TCP Encapsulation, Spanning Tree (STP), OSPF Multi-Area, BGP Autonomous Systems, 3-Tier Campus Design, VXLAN encapsulation, and Cisco SD-WAN 4-Plane Architecture.
- 🕒 **Automated Daily Concept Engine**: Rotates daily through Cisco exam topics, featuring:
  - *Daily Concept Deep Dive*
  - *Cisco Command of the Day* (with realistic console outputs)
  - *Daily Exam Challenge* (interactive multiple-choice practice with explanations)
  - *Previous/Next Day Calendar Browser*
- 🔬 **Interactive Network Tools**:
  - **Interactive Packet Flow Simulator**: Step-by-step trace showing ARP broadcast, CAM table updates, gateway MAC resolution, and TTL decrements across routers.
  - **Visual IPv4 CIDR Calculator**: Subnetting explorer with 32-bit binary bitmap highlighting network vs. host bits in real time.
- 📚 **Comprehensive Curriculum**:
  - **CCNA (200-301)**: Network Fundamentals, VLANs, 802.1Q Trunking, Spanning Tree, OSPFv2, NAT/PAT, ACLs, Port Security, Wireless, and Automation.
  - **ENCOR (350-401)**: SSO/NSF High Availability, eBGP vs iBGP Path Selection, VXLAN & LISP Fabric, Cisco SD-WAN (vBond/vManage/vSmart/vEdge), QoS (DSCP/CoS), and RESTCONF/YANG automation.
- 🔍 **Instant Search & Filters**: Filter by domain or search across all topics using `/` or `Ctrl+K`.
- ⭐ **Exam Review Bookmarks**: Save difficult topics to your browser's local storage for rapid pre-exam review.
- ⚡ **Zero-Build Architecture**: Runs instantly with zero dependencies. No Node.js or Python required. 100% compatible with GitHub Pages.

---

## 🚀 Quick Start (Local)

Simply open `index.html` in any modern web browser:

```powershell
# Open directly in default browser on Windows
start index.html
```

---

## 🌐 Deploy to GitHub Pages (Live Website)

For a complete step-by-step tutorial, see the [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md).

```powershell
git init
git add .
git commit -m "feat: Launch NetEngineer CCNA and ENCOR visual hub"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main
```

Then in GitHub: **Repository Settings ➔ Pages ➔ Source: GitHub Actions (or Deploy from branch 'main')**.

---

## 📁 Repository Structure

```text
├── index.html                   # Core single-page application & responsive layout
├── css/
│   └── styles.css               # Modern dark theme styles, animations, and typography
├── js/
│   ├── app.js                   # Application controller, modal handlers, search, filters
│   ├── daily.js                 # Daily rotation engine & daily practice quiz
│   ├── diagrams.js              # High-definition scalable SVG diagrams
│   ├── interactive-tools.js     # Packet Flow Simulator & Visual Subnet Calculator
│   ├── topics-ccna.js           # CCNA (200-301) curriculum data
│   └── topics-encor.js          # ENCOR (350-401) curriculum data
├── .github/
│   └── workflows/
│       ├── deploy.yml           # GitHub Pages auto-deployment workflow
│       └── daily-update.yml     # Daily scheduled GitHub Action cron job (00:00 UTC)
├── daily-status.json            # Automated timestamp log
├── DEPLOYMENT_GUIDE.md          # Step-by-step GitHub deployment guide
└── README.md                    # Project documentation
```

---

## 👤 Author

**Abdul-Azeez Sulaimon**  
- Aspiring Cisco Network & Enterprise Systems Engineer  
- Focus: CCNA (200-301) & CCNP Enterprise ENCOR (350-401)  

---

## 📄 License
This project is licensed under the MIT License — feel free to use, share, and expand it!
