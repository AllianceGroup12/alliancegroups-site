# 🏗️ ALLIANCE GROUP // AGENT HANDOFF & EXACT BUILD SPECIFICATION

**Version:** 1.0.0 (Production Live)  
**Date:** September 2026  
**Git Branch:** `production-live` (Commit: `dc0cfbb`)  
**Remote:** `https://github.com/AllianceGroup12/alliancegroups-site.git`  
**Live Public HTTPS URL:** [https://alliance-hub-5ed2c.web.app](https://alliance-hub-5ed2c.web.app)  
**Firebase Project ID:** `alliance-hub-5ed2c`

---

## 1. 🚨 STRICT OPERATIONAL CONSTRAINTS (DO NOT ALTER)
1. **Zero QBCC Mentions:** Under no circumstances should "QBCC" be written on the site. Use "Licensed Commercial Builder QLD" and "Class A Asbestos License #230491".
2. **Direct Operations Phone:** `0410 942 905` (`tel:0410942905`). No 1300 number.
3. **Inbound Intake Email:** `info@alliancegroups.com.au`.
4. **Direct Bank Remittance:** 
   - **Bank:** ANZ Australia
   - **BSB:** `014-202`
   - **Account:** `4829 1059`
   - **Account Name:** Alliance Group QLD Pty Ltd
   - **PayID Mobile (Instant Settlement):** `0410942905`
   - **PayID Email:** `info@alliancegroups.com.au`

---

## 2. REPOSITORY FILE STRUCTURE

```
/Users/alliancegroup/Desktop/7p[
├── index.html                   # Live Homepage, Services breakdown, Quote Form + Floating Bar
├── about.html                   # Corporate Credentials, WorkSafe Compliance, Payment Link
├── services.html                # Commercial Building, Metal Roofing, Class A & B Asbestos
├── case-studies.html            # Proven Industrial & Commercial Projects in SEQ
├── contact.html                 # Direct Inquiry Form & Secure Online Payment / PayID Portal
├── styles.css                   # Master Design System + Mobile Sticky Floating Action Bar
├── firebase.json                # Firebase Hosting config (public: ".", cleanUrls: true)
├── .firebaserc                  # Target project: "alliance-hub-5ed2c"
├── HANDOFF.md                   # This file (Agent Handoff Instructions)
│
└── auto-company/                # 14-Agent 24/7 Commercial Engine & Command HUD
    ├── dashboard/
    │   └── app.py               # J.A.R.V.I.S. Command HUD (Port 5050)
    ├── scripts/
    │   ├── core/
    │   │   ├── runner_agy.py    # Autonomous sprint runner & consensus updater
    │   │   ├── auto-loop.sh     # Continuous 24/7 loop execution bash runner
    │   │   └── monitor.sh       # Process telemetry monitor
    │   ├── revenue/
    │   │   └── money_printer.py # Commercial invoice & clearance cert generation
    │   └── outreach/
    │       └── real_outbound_machine.py # B2B Sales cadence & proposal generator
    ├── data/
    │   ├── revenue_ledger.json   # Real-time transaction ledger & ARR/MRR metrics
    │   └── real_leads_intake.json# Inbound customer quote submissions queue
    ├── invoices/                # Generated WorkSafe QLD Tax Invoices (INV-xxx.html)
    ├── proposals/               # Fixed-Price Commercial Proposals (proposal_xxx.html)
    ├── memories/
    │   └── consensus.md         # Autonomous state handoff baton across cycles
    └── projects/
        └── complianceshield/
            ├── index.html       # Instant Commercial Asbestos Risk & Permit SaaS (Port 5055)
            ├── commercial_leads.json
            └── sales_cadence.md
```

---

## 3. HOW TO RUN LOCALLY

### Service 1: Production Website (Port 8080)
```bash
cd "/Users/alliancegroup/Desktop/7p["
python3 -m http.server 8080
# View at: http://localhost:8080
```

### Service 2: J.A.R.V.I.S. Command HUD & Money Engine (Port 5050)
```bash
cd "/Users/alliancegroup/Desktop/7p[/auto-company"
python3 dashboard/app.py
# View at: http://localhost:5050
```

### Service 3: ComplianceShield SaaS (Port 5055)
```bash
cd "/Users/alliancegroup/Desktop/7p[/auto-company/projects/complianceshield"
python3 -m http.server 5055
# View at: http://localhost:5055
```

---

## 4. HOW TO DEPLOY TO PRODUCTION (LIVE WEB)

### Deploying the Website to Firebase Hosting:
```bash
cd "/Users/alliancegroup/Desktop/7p["
npx -y firebase-tools deploy --only hosting
# Live instantly at: https://alliance-hub-5ed2c.web.app
```

### Pushing Updates to GitHub:
```bash
cd "/Users/alliancegroup/Desktop/7p["
git add .
git commit -m "feat: updates"
git push origin production-live
```

---

## 5. API ENDPOINTS IN J.A.R.V.I.S. HUD (`dashboard/app.py` Port 5050)
- `GET /api/state`: Returns active cycle, next action, and log stream.
- `GET /api/revenue`: Returns ledger metrics (total booked, MRR, ARR, transactions).
- `POST /api/print_money`: Closes a commercial deal, updates ledger, and outputs printable WorkSafe tax invoice.
- `GET /api/real_intake`: Returns customer inquiries submitted from website.
- `POST /api/real_intake`: Receives web form submissions and payment notices (CORS enabled for port 8080 and live site).
- `GET /api/outbound_targets`: Returns Ray White, Colliers, Strata, and Builder pitch decks with 1-click `mailto:` links.
- `GET /invoices/<file>`: Serves generated invoices.
- `GET /proposals/<file>`: Serves fixed quotations.

---

## 6. NEXT STEPS FOR SUCCESSOR AGENT
1. **Custom Domain Linking**:
   - In Firebase Console (`https://console.firebase.google.com/project/alliance-hub-5ed2c/hosting/sites`), add custom domain `alliancegroups.com.au` and update DNS records.
2. **Live Stripe Payment Link**:
   - Replace simulated credit card checkout in `contact.html` and `complianceshield/index.html` with direct `https://buy.stripe.com/...` checkout button.
3. **SMS Dispatch Integration**:
   - In `dashboard/app.py` `/api/real_intake`, connect Twilio or Australian SMS gateway API to send instant SMS alerts to `0410 942 905` on form submissions.
