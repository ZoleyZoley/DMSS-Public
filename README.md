# DMSS Public

Public CDN host for the DentalMedicalSupportServices embeddable forms. Contains only
client-side widget scripts — no Apps Script code, secrets, or sheet IDs live here.

| File | Squarespace page | Mount id | Backend |
|---|---|---|---|
| `dmss-form.js` | lead / new intake form | `dmss-lead-form` | DMSS New Intake project (`DMSSIntake.gs` → `doPost`) |
| `dmss-joborder-form.js` | Place a Job Order | `dmss-job-order-form` | DMSS Job Order project (`JobOrderIntake.gs` → `doPost`) |

## Embedding on a Squarespace page

Add a Code Block with **just these two lines** on the page that needs the form.

Lead / new intake form:

```html
<div id="dmss-lead-form"></div>
<script src="https://cdn.jsdelivr.net/gh/ZoleyZoley/DMSS-Public@main/dmss-form.js"></script>
```

Place a Job Order:

```html
<div id="dmss-job-order-form"></div>
<script src="https://cdn.jsdelivr.net/gh/ZoleyZoley/DMSS-Public@main/dmss-joborder-form.js"></script>
```

Each script injects its own styles and markup into its mount div and wires up the
wizard, validation, and submission. Set the page's title and meta description in
Squarespace's own Page Settings → SEO, not in the snippet.

## Updating a form

Edit the `.js` and push to `main`. Every page using the snippet picks up the change
automatically — nothing needs to be touched on Squarespace.

jsDelivr caches files for up to ~24 hours after a push. To force an immediate refresh
instead of waiting, open the matching purge URL in a browser:

```
https://purge.jsdelivr.net/gh/ZoleyZoley/DMSS-Public@main/dmss-form.js
https://purge.jsdelivr.net/gh/ZoleyZoley/DMSS-Public@main/dmss-joborder-form.js
```

## Job order form: live endpoint, test-mode email

`dmss-joborder-form.js`'s `FORM_ENDPOINT` holds the deployed Apps Script Web App `/exec`
URL as of 2026-09-23, so submissions reach the Job Order project. (If it is ever reset to
the `PASTE_...` placeholder, the form refuses to submit and logs an error to the browser
console rather than showing a visitor a success it didn't earn.) Redeploying the Web App
as a *new* deployment changes the URL — update it here too. See the DMSS Job Order
project's `SETUP.md` section 12.

Email is fully live as of 2026-09-23: `JobOrderIntake.gs`'s `WEB_FORM_TEST_MODE` is
`false`, so a submitter gets their own confirmation and the new-order alert goes to the
real staff addresses. Nothing the widget sends is redirected any more.

## Source of truth

These widgets are derived from the readable full-page versions in the private working
folders (`DentalMedicalForm.v4.html`, `PlaceAJobOrder-LandingPage.html`), which carry
the full design notes. Those pages are **not** what ships — these files are. A change
made to one should be made to the other.

Converting a full page into a widget is not a copy/paste: the page's global CSS
(`:root`, `*`, `html`, `body`, `img`, `a`, `h1/h2/h3`, `p`) has to be scoped under the
widget's own class or it restyles the entire Squarespace site, and collision-prone class
names (`.btn`, `.wrap`, `.item`, `.lead`, `.sub`) need prefixing because Squarespace
defines several of them itself. `dmss-joborder-form.js`'s file header lists every
such difference for that widget.
