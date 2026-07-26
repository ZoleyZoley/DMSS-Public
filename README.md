# DMSS Public

Public CDN host for the DentalMedicalSupportServices lead form. Contains only the
client-side widget script — no Apps Script code, secrets, or sheet IDs live here.

## Embedding on a Squarespace page

Add a Code Block with this on any page that needs the form:

```html
<div id="dmss-lead-form"></div>
<script src="https://cdn.jsdelivr.net/gh/ZoleyZoley/DMSS-Public@main/dmss-form.js"></script>
```

The script injects its own styles and markup into the `#dmss-lead-form` div and wires
up the multi-step wizard, validation, and submission to the existing Google Apps
Script endpoint.

## Updating the form

Edit `dmss-form.js` and push to `main`. Every page using the snippet above picks up
the change automatically — nothing needs to be touched on Squarespace.

jsDelivr caches files for up to ~24 hours after a push. To force an immediate
refresh instead of waiting, purge the cache for this file:

```
https://purge.jsdelivr.net/gh/ZoleyZoley/DMSS-Public@main/dmss-form.js
```

(Just open that URL in a browser after pushing a change.)
