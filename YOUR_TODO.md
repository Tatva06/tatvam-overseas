# ✅ YOUR TODO LIST — Before Go Live (Monday)

These are things only you can do. Everything else has been fixed by the coder.

---

## 🔴 CRITICAL (Must do before Monday)

### 1. Google Analytics ID
**What to do:**
- Go to https://analytics.google.com
- Create a new GA4 property for tatvamoverseasinc.com (if not done already)
- Copy your Measurement ID (looks like: G-ABC123XYZ)
- Search and replace `G-XXXXXXXXXX` in these files with your real ID:
  - `index.html`
  - `about.html`
  - `contact.html`
  - `blog.html`
  - `mtc.html`

---

### 2. Social Media Links
**What to do:**
- If you have social pages, get the exact URLs and tell the developer (or update in footer across all pages):
  - LinkedIn: `https://www.linkedin.com/company/YOUR-PAGE`
  - Facebook: `https://www.facebook.com/YOUR-PAGE`
  - Instagram: `https://www.instagram.com/YOUR-PAGE`
- If you do NOT have social pages yet → tell developer to remove icons

---

### 3. Google Maps Link
**What to do:**
- Open Google Maps
- Search: "39/41, Kamal Building, 1st Kumbharwada Lane, Mumbai 400004"
- Click Share → Copy Link
- Replace the fake link in `contact.html` (line ~176) with the real one

---

### 4. OG / Social Share Image
**What to do:**
- Upload a real image of your warehouse or office to your server at:
  `https://tatvamoverseasinc.com/images/tatvamoverseasinc-warehouse-stock.jpg`
- Minimum size: 1200 × 630 pixels
- This image shows when someone shares your website link on WhatsApp/LinkedIn

---

### 5. Verify Email Addresses Work
**What to do:**
- Send a test email to:
  - sales@tatvamoverseasinc.com
  - export@tatvamoverseasinc.com
  - accounts@tatvamoverseasinc.com
- Confirm all 3 are active and someone checks them
- Test the contact form on the live site after launch

---

### 6. Web3Forms — Verify Access Key
**What to do:**
- Log in to https://web3forms.com
- Confirm the access key `e65ddd09-27a6-4380-aef9-4f4465c4449f` is valid and points to your email
- Test by submitting the contact form — you should receive the email

---

## 🟡 BEFORE LAUNCH (Do this on Friday/Saturday)

### 7. Domain & Hosting Check
- Confirm `tatvamoverseasinc.com` is pointed to Vercel correctly
- Do a test visit in incognito mode to check everything loads
- Test on mobile (Android + iPhone)

### 8. WhatsApp Number Verification
- The site uses: `+91 9082834775`
- Open this link in browser to test: `https://wa.me/919082834775`
- Confirm it opens a WhatsApp chat to the right number

### 9. PDF Catalog
- Verify `assets/TatvamOverseasInc_Catalog_2025.pdf` is the correct/latest version
- Try downloading it from the site after deployment

### 10. Review All Product Data
- Open `js/data.js` and confirm all product descriptions, grades, and specifications are accurate
- Especially check: pricing, stock availability claims, certifications listed

---

## 🟢 AFTER LAUNCH (Week 1)

### 11. Google Search Console
- Go to https://search.google.com/search-console
- Add your domain: tatvamoverseasinc.com (or whichever domain you purchase)
- Submit your sitemap: https://tatvamoverseasinc.com/sitemap.xml

### 12. Update Sitemap Dates
- Open `sitemap.xml`
- Change all `<lastmod>` dates to today's date (2026-07-15)

### 13. Business Listings
- Update Google Business Profile with website URL
- Add website to IndiaMART / TradeIndia profile if you have one

---

## 💼 Zoho Business Setup Guide (Mail & CRM)

If you want to run your business operations using Zoho, follow these steps to connect your website:

### A. Zoho Mail Setup (Business Emails)
To get professional email addresses (like `sales@yourdomain.com`), you need to verify your domain ownership and point your DNS to Zoho:

1. **Sign up for Zoho Mail:** Create an account at [zoho.in/mail](https://www.zoho.in/mail/) or [zoho.com/mail](https://www.zoho.com/mail/).
2. **Verify Domain Ownership:** Zoho will ask you to add a **TXT verification record** in your domain registrar (GoDaddy, Namecheap, Vercel, etc.). It looks like:
   * **Host:** `@` or blank
   * **Value:** `zoho-verification=zb12345678.txt`
3. **Configure MX Records (Mail Exchanger):** Add these records to route mail to Zoho:
   * **MX 1:** `mx.zoho.in` (Priority: `10`)
   * **MX 2:** `mx2.zoho.in` (Priority: `20`)
   * **MX 3:** `mx3.zoho.in` (Priority: `50`)
   *(Note: Use `.com` instead of `.in` if your Zoho account was registered on Zoho.com)*
4. **Configure Security Records (Crucial for spam prevention):**
   * **SPF (TXT Record):** Host: `@`, Value: `v=spf1 include:zoho.in ~all`
   * **DKIM (TXT Record):** Generate the selector value inside your Zoho Mail Admin Console and add it as a TXT record.

---

### B. Zoho CRM Integration (Web-to-Lead)
To make your contact form and price-list popups directly create Lead records inside Zoho CRM instead of sending emails via Web3Forms, do this:

1. **Generate Webform Code in Zoho:**
   * Go to **Zoho CRM** → **Settings** (Gear Icon) → **Developer Space** → **Webforms**.
   * Click **Create Webform**.
   * Drag & drop these fields onto the form:
     * *Last Name* (Name)
     * *Email*
     * *Phone*
     * *Company*
     * *Description* (Requirements)
     * *Lead Source* (set hidden value to "Website Quote Form")
   * Save and go to **Form Details**. Set your return URL (e.g. your thank you page).
   * Click **Source** and select **HTML**.

2. **Extract Integration Keys:**
   Look in the generated HTML code for hidden input fields containing these values:
   * `xnQsjsdp` (Your Zoho Form Organization ID)
   * `xmIwtap` (Your Zoho Webform Active ID)
   * `action` URL (Usually `https://crm.zoho.in/crm/WebToLeadForm` or `.com`)

3. **Update Website Forms:**
   Provide these values to the developer to replace Web3Forms.
   For example, in `contact.html` the form action changes to:
   ```html
   <form action="https://crm.zoho.in/crm/WebToLeadForm" method="POST" id="contactForm">
       <input type="hidden" name="xnQsjsdp" value="YOUR_ORG_ID">
       <input type="hidden" name="xmIwtap" value="YOUR_WEBFORM_ID">
       <input type="hidden" name="actionType" value="TGVhZHM=">
       <!-- Rest of form fields with 'name' attributes matching Zoho's CRM names -->
   </form>
   ```

---

## 📞 Questions for Developer
If you have answers to any of these, share them:
- [ ] Real GA4 ID?
- [ ] LinkedIn/Facebook/Instagram URLs?
- [ ] Real Google Maps link for warehouse?
- [ ] Any content changes needed on About page or product descriptions?

