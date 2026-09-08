# DNS, 301 Redirect & Google Merchant Center Resolution Guide
**Target Domains:** `www.alliancegroups.com.au` & `AUasbestos.com.au`

---

## 1. Root Cause Summary
1. **`AUasbestos.com.au` was parked at GoDaddy (`/lander`)**:
   * Google Merchant Center and Google Ads crawl destination URLs for all products in your feed.
   * When the crawler hit `auasbestos.com.au`, it received GoDaddy's parking script, triggering the policy violation: **"Broken landing page / Under construction / Destination URL down"**.
2. **`www.alliancegroups.com.au` was not serving product landing pages or lacked policy disclosures**:
   * Google Shopping requires accessible Privacy, Terms, Refund/Return, and Delivery policies in the footer of every page.
   * All placeholder links (`#`, `tel:+61700000000`, `Pending` licences) have now been removed and replaced with working pages and valid Australian contact details.

---

## 2. GoDaddy / DNS Registrar Setup Instructions

### A. Pointing `AUasbestos.com.au` to the Live Product Page (Recommended 301 Forwarding)
1. Log into your **GoDaddy Domain Portfolio** (or registrar console).
2. Select **`auasbestos.com.au`** > click **DNS** > scroll down to **Forwarding**.
3. Under **Domain Forwarding**, click **Add Forwarding**:
   * **Destination URL:** `https://www.alliancegroups.com.au/asbestos-services.html`
   * **Forward Type:** `Permanent (301)`
   * **Forwarding Settings:** `Forward with masking: No` (or `Forward Only`)
   * **Protocol:** `https://`
4. Click **Save**.

*Note: This immediately routes all asbestos product links, search traffic, and Google crawlers from `AUasbestos.com.au` to the active, certified `asbestos-services.html` landing page.*

---

### B. Connecting `www.alliancegroups.com.au` to Hosting
In the DNS settings for **`alliancegroups.com.au`**:
1. **A Record (Apex domain):**
   * **Name / Host:** `@`
   * **Value:** *(Your Web Server IP or Google Hosting IP)*
   * **TTL:** `600` (10 minutes)
2. **CNAME Record (`www` subdomain):**
   * **Name / Host:** `www`
   * **Value:** `ghs.googlehosted.com` *(if using Google Sites/App Hosting)* OR `alliancegroups.com.au`
   * **TTL:** `600`

---

## 3. Google Merchant Center & Google Ads Resolution Checklist

Once DNS is pointed:

### Step 1: Update Product Feed URLs
1. Log into **[Google Merchant Center](https://merchants.google.com)**.
2. Navigate to **Products** > **All Products** or **Feeds**.
3. Edit your product links:
   * Change any product URL pointing to `auasbestos.com.au` (or broken paths) to:
     `https://www.alliancegroups.com.au/asbestos-services.html#prod-test-kit`
     `https://www.alliancegroups.com.au/asbestos-services.html#prod-site-test`
     `https://www.alliancegroups.com.au/asbestos-services.html#prod-removal`
     `https://www.alliancegroups.com.au/asbestos-services.html#prod-register`
4. Re-upload or fetch your updated feed.

### Step 2: Confirm Website Verification & Claiming
1. In Google Merchant Center, go to **Settings** > **Business Information** > **Website**.
2. Confirm `https://www.alliancegroups.com.au` is **Claimed & Verified** via HTML tag or Google Analytics (G-Tag `AW-18006768389` is already installed in the site header).

### Step 3: Request Re-Review
1. Go to **Products** > **Diagnostics** > **Account Issues**.
2. Locate the issue **"Broken landing page"** or **"Website needs improvement"**.
3. Click **"Request Review"** / **"I have fixed the issue"**.
4. Google’s automated crawler typically re-scans the live landing pages within **12 to 24 hours** and clears the disapproval.

---

## 4. Summary of Website Assets Created & Ready to Deploy

| File | Purpose | Google Policy Satisfied |
| :--- | :--- | :--- |
| [`index.html`](file:///Users/alliancegroup/.gemini/antigravity/scratch/alliancegroups-website/index.html) | Main site landing page | Structure, fast loading, active quote form |
| [`asbestos-services.html`](file:///Users/alliancegroup/.gemini/antigravity/scratch/alliancegroups-website/asbestos-services.html) | AUasbestos product & service page | Working product destination URL & order flow |
| [`privacy.html`](file:///Users/alliancegroup/.gemini/antigravity/scratch/alliancegroups-website/privacy.html) | Privacy Policy (APPs compliant) | Data collection & transparency rules |
| [`terms.html`](file:///Users/alliancegroup/.gemini/antigravity/scratch/alliancegroups-website/terms.html) | Terms & Conditions | Transparent business contract terms |
| [`refunds.html`](file:///Users/alliancegroup/.gemini/antigravity/scratch/alliancegroups-website/refunds.html) | Refund & Cancellation Policy | Australian Consumer Law & Returns policy |
| [`shipping.html`](file:///Users/alliancegroup/.gemini/antigravity/scratch/alliancegroups-website/shipping.html) | Delivery & Dispatch Policy | Shipping terms for testing kits |
