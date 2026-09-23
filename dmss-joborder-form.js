/**
 * DMSS "Place a Job Order" — embeddable Squarespace widget.
 *
 * GENERATED FROM ../DMSS Job Order/PlaceAJobOrder-LandingPage.html.
 * That file is the readable reference copy (and carries the full design
 * notes); THIS file is what actually ships. When you change the page,
 * change it here too -- or re-derive this file from it -- and push. Same
 * relationship dmss-form.js has with DentalMedicalForm.v4.html.
 *
 * Embed on a Squarespace page with a Code block containing exactly:
 *
 *   <div id="dmss-job-order-form"></div>
 *   <script src="https://cdn.jsdelivr.net/gh/ZoleyZoley/DMSS-Public@main/dmss-joborder-form.js"></script>
 *
 * Submissions POST to the DMSS Job Order Apps Script Web App (doPost ->
 * JobOrderIntake.handleFormPost), which writes a row to the "Job Orders"
 * tab with Source = "Website Form" and Status = "New". See that project's
 * SETUP.md section 12.
 *
 * WHAT DIFFERS FROM THE STANDALONE PAGE, and why:
 *  - Every CSS rule is scoped under .dmss-jo. The page's global selectors
 *    (:root, *, html, body, img, a, h1/h2/h3, p) would otherwise be
 *    injected into document.head and restyle the ENTIRE Squarespace site.
 *    The custom properties moved from :root onto .dmss-jo, which works
 *    because custom properties inherit.
 *  - Collision-prone class names got a jo- prefix (.wrap, .btn, .item,
 *    .sub, .lead, .testimonial, .dot ...), since Squarespace defines
 *    several of those itself.
 *  - html{scroll-behavior:smooth} is gone, so the two scrollIntoView
 *    calls and the mobile CTA pass behavior:'smooth' explicitly.
 *  - The dark hero gets negative margins to break out of the Code block's
 *    content column (see "Full-bleed" in the CSS).
 *  - All document.getElementById / querySelector lookups are scoped to the
 *    mount element.
 */
(function () {
  var MOUNT_ID = 'dmss-job-order-form';

  // ---------- Backend endpoint ----------
  // >>> PASTE THE WEB APP /exec URL HERE. <<<
  // Apps Script editor (DMSS Job Order project) -> Deploy -> New
  // deployment -> Web app, "Execute as: Me", "Who has access: Anyone",
  // then copy the /exec URL. See ../DMSS Job Order/SETUP.md section 12.
  // Until this is set, the form refuses to submit and logs an error
  // rather than showing the visitor a success it didn't earn.
  // NOTE: every change to JobOrderIntake.gs needs a NEW DEPLOYMENT
  // VERSION to take effect -- this URL keeps serving the old code
  // otherwise.
  var FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzldUewa_ROMZJzE2ryVsOKQR2thFcbg5Ui_ssFGO2YjiO1DPwF8EcAxqe_Mon_tCwFIg/exec';

  var css = `
  .dmss-jo {
    --teal-dark:#0d3b35;
    --teal:#14b8a6;
    --teal-hover:#0f766e;
    --teal-soft:#bfe3da;
    --teal-soft2:#a8d0c6;
    --mint:#eef7f5;
    --cream:#fbfaf7;
    --ink:#163832;
    --ink-soft:#4a5c58;
    --gold:#c9992e;
    --error-text:#b3341f;
    --white:#ffffff;
    --radius:14px;
    --shadow:0 10px 30px rgba(13,59,53,0.12);
    --maxw:1120px;
    font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  }
  .dmss-jo *, .dmss-jo *::before, .dmss-jo *::after {
    box-sizing:border-box;
  }
  .dmss-jo {
    color:var(--ink);
    line-height:1.55;
    overflow-x:hidden;
    -webkit-font-smoothing:antialiased;
  }
  .dmss-jo img {
    max-width:100%;display:block;
  }
  .dmss-jo a {
    color:inherit;
  }
  .dmss-jo .jo-wrap {
    max-width:var(--maxw);margin:0 auto;padding:0 24px;
  }
  .dmss-jo h1,
  .dmss-jo h2,
  .dmss-jo h3 {
    line-height:1.15;margin:0 0 16px;color:var(--teal-dark);
  }
  .dmss-jo h1 {
    font-size:clamp(32px,5vw,52px);font-weight:800;
  }
  .dmss-jo h3 {
    font-size:20px;font-weight:700;
  }
  .dmss-jo p {
    margin:0 0 16px;color:var(--ink-soft);
  }
  .dmss-jo .jo-eyebrow {
    display:inline-flex;align-self:flex-start;align-items:center;gap:8px;
    background:var(--mint);color:var(--teal-hover);
    font-weight:700;font-size:13px;letter-spacing:.3px;
    padding:7px 14px;border-radius:999px;margin-bottom:18px;
  }
  .dmss-jo .jo-eyebrow .jo-dot {
    width:7px;height:7px;border-radius:50%;background:var(--gold);
  }
  .dmss-jo .jo-btn {
    display:inline-flex;align-items:center;justify-content:center;gap:8px;
    padding:16px 30px;border-radius:10px;font-size:17px;font-weight:700;
    cursor:pointer;border:none;text-decoration:none;transition:.15s ease;
  }
  .dmss-jo .jo-btn-primary {
    background:var(--teal);color:#fff;box-shadow:0 12px 26px rgba(20,184,166,.35);
  }
  .dmss-jo .jo-btn-primary:hover {
    background:var(--teal-hover);
  }
  .dmss-jo .jo-btn-block {
    width:100%;
  }
  /* ---------- Page shell ---------- */
  .dmss-jo .job-order {
    background:linear-gradient(160deg,var(--teal-dark) 0%,#0a2b26 100%);
    min-height:100vh;
    display:flex;
    align-items:center;
    padding:64px 0;
    position:relative;overflow:hidden;
  }
  .dmss-jo .job-order::after {
    content:"";position:absolute;right:-120px;top:-120px;width:420px;height:420px;
    background:radial-gradient(circle,rgba(20,184,166,.25) 0%,transparent 70%);
  }
  .dmss-jo .job-order-grid {
    display:grid;grid-template-columns:1.3fr 1fr;gap:64px;align-items:stretch;position:relative;width:100%;
  }
  /* ---------- Left: copy ---------- */
  .dmss-jo .job-copy {
    color:#fff;padding-top:6px;display:flex;flex-direction:column;
  }
  .dmss-jo .job-copy h1 {
    color:#fff;
  }
  .dmss-jo .job-copy p.jo-lead {
    color:var(--teal-soft2);font-size:19px;max-width:560px;
  }
  .dmss-jo .job-copy h2 {
    color:#fff;font-size:15px;font-weight:800;letter-spacing:.3px;
    text-transform:uppercase;margin:38px 0 18px;
  }
  .dmss-jo .role-tags {
    display:flex;flex-wrap:nowrap;gap:6px;
  }
  .dmss-jo .role-tag {
    display:inline-flex;align-items:center;padding:5px 10px;
    border-radius:999px;background:rgba(255,255,255,.08);
    border:1px solid rgba(255,255,255,.22);color:var(--teal-soft);
    font-size:11.5px;font-weight:600;white-space:nowrap;
  }
  .dmss-jo .process-list {
    display:flex;flex-direction:column;gap:20px;
  }
  .dmss-jo .process-item {
    display:flex;gap:14px;align-items:flex-start;
  }
  .dmss-jo .process-num {
    flex:none;width:30px;height:30px;border-radius:50%;
    background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.28);
    color:#fff;font-weight:800;font-size:14px;
    display:flex;align-items:center;justify-content:center;
  }
  .dmss-jo .process-item strong {
    display:block;color:#fff;font-size:15.5px;margin-bottom:2px;
  }
  .dmss-jo .process-item span {
    font-size:14px;color:var(--teal-soft2);
  }
  .dmss-jo .jo-testimonial {
    margin-top:34px;padding:26px;background:var(--teal);
    border-radius:16px;box-shadow:0 20px 44px rgba(0,0,0,.3);position:relative;
  }
  .dmss-jo .jo-testimonial p {
    color:#fff;font-size:16.5px;font-weight:700;font-style:normal;
    margin:0 0 12px;
  }
  .dmss-jo .jo-testimonial .jo-attribution {
    font-size:13px;font-weight:700;color:var(--teal-dark);
  }
  .dmss-jo .job-copy .trust-strip {
    margin-top:auto;display:flex;flex-direction:row;flex-wrap:wrap;gap:14px 28px;
    border-top:1px solid rgba(255,255,255,.14);padding-top:26px;
    padding-bottom:2px; /* visually lines its bottom edge up with the form card's bottom edge */
  }
  .dmss-jo .job-copy .trust-strip .jo-trust-item {
    display:flex;align-items:center;gap:10px;font-size:15px;font-weight:600;color:var(--teal-soft);
  }
  .dmss-jo .job-copy .trust-strip .jo-trust-item svg {
    flex:none;
  }
  .dmss-jo .mobile-scroll-btn {
    display:none;
  }
  /* ---------- Right: form ---------- */
  .dmss-jo .custom-form {
    max-width:520px;margin:0 auto;padding:32px 30px;background:#fff;
    border-radius:20px;box-shadow:0 25px 60px rgba(0,0,0,.4);color:var(--ink);
  }
  .dmss-jo .custom-form h3 {
    color:var(--teal-dark);margin-bottom:6px;
  }
  .dmss-jo .custom-form .jo-sub {
    color:var(--ink-soft);font-size:14px;margin-bottom:22px;
  }
  .dmss-jo .form-row {
    display:grid;grid-template-columns:1fr 1fr;gap:14px;
  }
  .dmss-jo .custom-form label {
    font-weight:700;margin-bottom:6px;display:block;font-size:13.5px;color:var(--teal-dark);
  }
  .dmss-jo .custom-form .required::after {
    content:" *";color:#e5533f;
  }
  .dmss-jo .custom-form input,
  .dmss-jo .custom-form select {
    width:100%;padding:13px 14px;margin-bottom:16px;border:1px solid #dbe6e3;
    border-radius:9px;box-sizing:border-box;font-size:15px;color:var(--ink);
    background-color:var(--mint);transition:.15s ease;
  }
  .dmss-jo .custom-form select {
    appearance:none;-webkit-appearance:none;-moz-appearance:none;height:48px;padding-right:36px;
    background-image:url("data:image/svg+xml;utf8,<svg fill='%230f766e' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
    background-repeat:no-repeat;background-position:right 12px center;background-size:18px;
  }
  .dmss-jo .custom-form input:focus,
  .dmss-jo .custom-form select:focus {
    outline:none;border-color:var(--teal);
    box-shadow:0 0 0 4px rgba(20,184,166,.18);
  }
  .dmss-jo .form-extra {
    position:absolute;left:-9999px;top:-9999px;width:1px;height:1px;overflow:hidden;
  }
  .dmss-jo .form-disclaimer {
    font-size:12px;color:#8a9a96;margin-top:4px;text-align:center;
  }
  /* ---------- Wizard: Step 1 (who/what) → Step 2 (when), Step 2's
  content branches on Step 1's Placement Type answer. Same mechanics as
  DentalMedicalForm.v4.html, restyled for this page's white form card
  instead of that form's dark card. ---------- */
  .dmss-jo .wizard-progress {
    margin-bottom:22px;
  }
  .dmss-jo .wizard-progress-track {
    width:100%;height:6px;background:var(--teal-soft);border-radius:999px;overflow:hidden;
  }
  .dmss-jo .wizard-progress-fill {
    height:100%;width:50%;background:var(--teal);border-radius:999px;transition:width .25s ease;
  }
  .dmss-jo .wizard-progress-label {
    margin-top:8px;font-size:11.5px;font-weight:700;letter-spacing:.4px;text-transform:uppercase;color:var(--ink-soft);text-align:right;
  }
  .dmss-jo .form-step {
    display:none;
  }
  .dmss-jo .form-step.active {
    display:block;
  }
  .dmss-jo .step-heading {
    font-size:18px;font-weight:800;color:var(--teal-dark);margin:0 0 6px;
  }
  .dmss-jo .step-description {
    font-size:14px;color:var(--ink-soft);margin:0 0 20px;
  }
  .dmss-jo .checkbox-row {
    display:flex;align-items:flex-start;gap:10px;margin-bottom:18px;
  }
  .dmss-jo .checkbox-row input[type=checkbox] {
    width:auto;margin:3px 0 0;flex-shrink:0;
  }
  .dmss-jo .checkbox-row label {
    display:inline;margin:0;font-weight:700;color:var(--teal-dark);font-size:13.5px;
  }
  /* Coverage Type — three required toggle buttons (radios underneath for
  real form semantics/keyboard support, visually hidden). .selected
  gets the green glow; toggled in JS off the radios' :checked state. */
  /* Three equal buttons on ONE row, styled to match the internal New Job
  Order dialog (NewJobOrderDialog.html): a green --teal-soft hairline on
  white, filling to --mint with the teal glow once picked. They used to
  be flex:1 1 140px and carried "(e.g. Mon, Wed, Fri)" sublabels, which
  forced the third button onto a second row; nowrap + a 0 flex-basis is
  what keeps all three side by side at any card width. */
  .dmss-jo .coverage-type-row {
    display:flex;flex-wrap:nowrap;gap:8px;margin-bottom:6px;
  }
  .dmss-jo .coverage-btn {
    position:relative;flex:1 1 0;min-width:0;display:flex;align-items:center;justify-content:center;
    text-align:center;padding:13px 8px;border-radius:10px;border:1.5px solid var(--teal-soft);
    background:var(--white);color:var(--teal-dark);font-weight:700;font-size:13px;
    line-height:1.25;cursor:pointer;transition:.15s ease;
  }
  .dmss-jo .coverage-btn:hover {
    background:var(--mint);
  }
  .dmss-jo .coverage-btn input[type=radio] {
    position:absolute;opacity:0;width:0;height:0;pointer-events:none;
  }
  .dmss-jo .coverage-btn.selected {
    border-color:var(--teal);background:var(--mint);
    box-shadow:0 0 0 3px rgba(20,184,166,.3),0 0 16px rgba(20,184,166,.55);
  }
  /* #e5533f (the old error red) only clears ~3.5:1 against this white card,
  which is under AA for text this small — all error copy uses the darker
  --error-text instead, and #e5533f is kept for BORDERS only, where
  contrast rules don't apply. */
  .dmss-jo .coverage-type-error {
    display:none;color:var(--error-text);font-size:12.5px;font-weight:700;margin:-2px 0 14px;
  }
  .dmss-jo .coverage-type-error.visible {
    display:block;
  }
  /* Coverage hint — appears only once a coverage type is picked, and only
  for the two that need explaining. "Single Day" is self-evident, so it
  deliberately has no hint (see COVERAGE_HINTS in the script). Uses
  --teal-hover, not --teal: the lighter teal is unreadable on white. */
  .dmss-jo .coverage-hint {
    display:none;margin:2px 0 15px;font-size:12.5px;font-weight:600;
    color:var(--teal-hover);line-height:1.45;
  }
  .dmss-jo .coverage-hint.visible {
    display:block;
  }
  /* ---------- Notes (optional) ---------- */
  .dmss-jo .custom-form textarea {
    width:100%;padding:13px 14px;margin-bottom:16px;border:1px solid #dbe6e3;
    border-radius:9px;box-sizing:border-box;font-size:15px;font-family:inherit;
    color:var(--ink);background-color:var(--mint);line-height:1.5;
    resize:vertical;min-height:86px;transition:.15s ease;
  }
  .dmss-jo .custom-form textarea:focus {
    outline:none;border-color:var(--teal);box-shadow:0 0 0 4px rgba(20,184,166,.18);
  }
  .dmss-jo .custom-form input::placeholder,
  .dmss-jo .custom-form textarea::placeholder {
    color:#9aaeaa;
  }
  .dmss-jo .optional-tag {
    font-weight:600;color:var(--ink-soft);font-size:11.5px;text-transform:none;letter-spacing:0;
  }
  /* ---------- Inline validation ----------
  Replaces the alert() dialogs this form used to throw. Each message is
  inserted next to the field it's about (see errorNodeFor in the script)
  rather than in one summary block, so there's nothing to hunt for. */
  .dmss-jo .field-error {
    display:none;margin:-10px 0 14px;font-size:12.5px;font-weight:600;
    color:var(--error-text);line-height:1.45;
  }
  .dmss-jo .field-error.visible {
    display:block;
  }
  .dmss-jo .custom-form input.has-error,
  .dmss-jo .custom-form select.has-error,
  .dmss-jo .custom-form textarea.has-error,
  .dmss-jo .custom-form .time-trigger.has-error {
    border-color:#e5533f;box-shadow:0 0 0 3px rgba(229,83,63,.16);
  }
  /* Form-level failure (the submission itself broke, not a field) */
  .dmss-jo .form-error {
    display:none;margin:0 0 14px;padding:11px 13px;border-radius:9px;
    background:#fdeeeb;border:1px solid #f0bdb3;color:var(--error-text);
    font-size:13px;font-weight:600;line-height:1.5;
  }
  .dmss-jo .form-error.visible {
    display:block;
  }
  .dmss-jo .specific-date-row {
    display:flex;align-items:center;gap:8px;
  }
  .dmss-jo .specific-date-row input[type=date] {
    flex:1;margin-bottom:10px;
  }
  .dmss-jo .removeSpecificDateBtn {
    flex-shrink:0;width:34px;height:48px;margin-bottom:10px;border-radius:9px;border:1px solid #dbe6e3;
    background:var(--mint);color:var(--ink-soft);font-size:16px;cursor:pointer;line-height:1;
  }
  .dmss-jo .removeSpecificDateBtn:hover {
    background:#e3f0ed;
  }
  .dmss-jo .jo-add-date-btn {
    background:transparent;color:var(--teal-hover);border:1.5px solid #dbe6e3;
    padding:9px 16px;font-size:13.5px;margin-bottom:18px;
  }
  .dmss-jo .jo-add-date-btn:hover {
    background:var(--mint);
  }
  /* ---------- Time dropdowns (custom listbox) ----------
  A native <select> can only open where its selected option is, so a
  placeholder-first list always opens at 12:00 AM and an office has to
  scroll ~28 rows to reach a plausible shift start. There is no way to
  scroll a native dropdown's popup from script, so the visible control
  is a listbox we own: the list stays in plain chronological order
  (scroll up from 7:00 AM and midnight is right there), but it OPENS
  parked on 7:00 AM.
  The real <select> stays in the DOM, visually hidden, and remains the
  single source of truth — it still holds the value, still lands in
  FormData as "Start Time"/"End Time", and validateStep2 still reads it
  — so nothing downstream of this file knows the difference. */
  .dmss-jo .time-select {
    position:relative;margin-bottom:16px;
  }
  .dmss-jo .time-select-native {
    position:absolute;width:1px;height:1px;padding:0;margin:-1px;
    overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0;
  }
  .dmss-jo .custom-form .time-trigger {
    width:100%;height:48px;padding:0 36px 0 14px;
    display:flex;align-items:center;
    border:1px solid #dbe6e3;border-radius:9px;
    background-color:var(--mint);
    background-image:url("data:image/svg+xml;utf8,<svg fill='%230f766e' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
    background-repeat:no-repeat;background-position:right 12px center;background-size:18px;
    font-family:inherit;font-size:15px;font-weight:400;line-height:1.2;
    color:var(--ink);text-align:left;cursor:pointer;transition:.15s ease;
  }
  .dmss-jo .custom-form .time-trigger.placeholder {
    color:#8aa39d;
  }
  .dmss-jo .custom-form .time-trigger:hover {
    background-color:#e6f2ef;
  }
  .dmss-jo .custom-form .time-trigger:focus-visible,
  .dmss-jo .time-select.open .time-trigger {
    outline:none;border-color:var(--teal);
    box-shadow:0 0 0 4px rgba(20,184,166,.18);
  }
  .dmss-jo .time-list {
    display:none;position:absolute;left:0;right:0;top:calc(100% + 5px);
    max-height:250px;overflow-y:auto;-webkit-overflow-scrolling:touch;
    background:#fff;border:1px solid var(--teal-soft);border-radius:10px;
    box-shadow:0 16px 38px rgba(13,59,53,.22);z-index:30;padding:5px;
  }
  .dmss-jo .time-select.open .time-list {
    display:block;
  }
  .dmss-jo .time-select.up .time-list {
    top:auto;bottom:calc(100% + 5px);
  }
  .dmss-jo .time-option {
    padding:9px 11px;border-radius:7px;font-size:14.5px;color:var(--ink);
    cursor:pointer;line-height:1.2;
  }
  .dmss-jo .time-option:hover,
  .dmss-jo .time-option.active {
    background:var(--mint);
  }
  .dmss-jo .time-option.selected {
    background:var(--teal);color:#fff;font-weight:700;
  }
  .dmss-jo .time-option.selected.active {
    background:var(--teal-hover);
  }
  .dmss-jo .wizard-nav {
    /* Collapses with the preceding field's 16px margin-bottom, so this
    value IS the gap above the buttons, not an addition to it. */
    display:flex;gap:12px;margin-top:24px;
  }
  .dmss-jo .wizard-nav .jo-btn {
    flex:1;
  }
  .dmss-jo .jo-btn-secondary {
    background:transparent;color:var(--ink-soft);border:1.5px solid #dbe6e3;
  }
  .dmss-jo .jo-btn-secondary:hover {
    background:var(--mint);
  }
  /* ---------- Responsive: mobile becomes two stacked "screens" ---------- */

  @media (max-width:900px) {
    .dmss-jo .job-order {
      display:block;
      padding:0;
      min-height:0;
    }
    .dmss-jo .job-order-grid {
      display:block;
      width:auto;
    }
    /* Screen 1: title + one line + button, fills the first viewport */
    .dmss-jo .job-copy {
      min-height:100vh;
      min-height:100svh;
      display:flex;
      flex-direction:column;
      justify-content:center;
      padding:32px 24px;
    }
    /* Screen 1 carries the headline, the button, the roles we staff, and
    one quote (added 2026-09-23 — it used to be title + button only).
    What stays desktop-only: the numbered "What Happens Next" list and
    the trust strip, which together are taller than everything else
    combined and would push the button off the first screen.
    The process heading is hidden with its list — an orphan heading
    with nothing under it reads as a broken page. */
    .dmss-jo .job-copy .process-h2,
    .dmss-jo .job-copy .process-list,
    .dmss-jo .job-copy .trust-strip {
      display:none;
    }
    /* Everything on screen 1 is tightened to fit one viewport: the desktop
    sizes here total roughly 820px at 390px wide, which overflows a
    phone once the Squarespace header is above it. */
    .dmss-jo .job-copy {
      padding:26px 22px;
    }
    .dmss-jo .job-copy p.jo-lead {
      font-size:16px;max-width:none;margin-bottom:12px;
    }
    .dmss-jo .job-copy h2 {
      font-size:12.5px;margin:20px 0 10px;
    }
    /* Five tags cannot sit in one row at phone width — the desktop nowrap
    would overflow horizontally rather than wrap. */
    .dmss-jo .role-tags {
      flex-wrap:wrap;gap:6px;
    }
    .dmss-jo .role-tag {
      font-size:11px;padding:4px 9px;
    }
    /* Screen 1 reading order (2026-09-23): the quote moves up under the
    intro as social proof, and the button moves to the bottom as the last
    thing on the screen — the pitch, then the proof, then the roles, then
    the ask. .job-copy is already a flex column, so this is pure CSS order
    and needs no markup change; desktop keeps DOM order untouched because
    these rules only exist inside this breakpoint. */
    .dmss-jo .job-copy .jo-eyebrow {
      order:1;
    }
    .dmss-jo .job-copy h1 {
      order:2;
    }
    .dmss-jo .job-copy p.jo-lead {
      order:3;
    }
    .dmss-jo .job-copy .jo-testimonial {
      order:4;
    }
    .dmss-jo .job-copy .roles-h2 {
      order:5;
    }
    .dmss-jo .job-copy .role-tags {
      order:6;
    }
    .dmss-jo .job-copy .mobile-scroll-btn {
      order:7;
    }
    /* The quote used to be a solid --teal panel with a heavy shadow, which
    is exactly what .jo-btn-primary looks like — two teal blocks on one
    screen, one tappable and one not. Reworked as a pull-quote instead:
    translucent fill, a --gold left rule (the brand's other accent, so it
    cannot be mistaken for the teal CTA), and italic text. Nothing here
    reads as a button. */
    .dmss-jo .jo-testimonial {
      order:4;
      margin-top:14px;
      padding:13px 15px;
      background:rgba(255,255,255,.06);
      border:1px solid rgba(255,255,255,.15);
      border-left:3px solid var(--gold);
      border-radius:3px 11px 11px 3px;
      box-shadow:none;
    }
    .dmss-jo .jo-testimonial p {
      color:#fff;
      font-size:13.5px;
      font-style:italic;
      font-weight:500;
      line-height:1.5;
      margin:0 0 6px;
    }
    /* Overridden from the desktop --teal-dark, which was legible on the
    solid teal panel and would be near-invisible on this one. */
    .dmss-jo .jo-testimonial .jo-attribution {
      color:var(--teal-soft2);
      font-size:11px;
      font-style:normal;
      font-weight:600;
    }
    /* Full width of the copy column, not content-width. The base .jo-btn is
    inline-flex with align-self:flex-start, which made it hug its label
    and sit against the left edge — align-self:stretch fills the cross
    axis of the flex column instead, so it spans the screen inside
    .job-copy's 22px gutters. 17px of vertical padding puts it at ~54px,
    comfortably above the 44px touch-target minimum. */
    .dmss-jo .mobile-scroll-btn {
      display:flex;
      align-self:stretch;
      margin-top:14px;
      padding:17px 26px;
      font-size:16.5px;
    }
    /* Screen 2: the form, reached by scrolling (or tapping the button) */
    .dmss-jo .job-form-wrap {
      background:var(--cream);
      padding:48px 20px 64px;
    }
  }
  /* Height-based, not width-based, on purpose: what runs out on a short
  phone (or a landscape one) is vertical room, and the button staying
  visible on screen 1 matters more than the extra copy. Ordered so the
  quote goes first and the roles only go on the very shortest screens. */

  @media (max-width:900px) and (max-height:760px) {
    .dmss-jo .job-copy .jo-testimonial {
      display:none;
    }
  }

  @media (max-width:900px) and (max-height:620px) {
    .dmss-jo .job-copy .roles-h2,
    .dmss-jo .job-copy .role-tags {
      display:none;
    }
  }

  @media (max-width:560px) {
    .dmss-jo .form-row {
      grid-template-columns:1fr;
    }
    /* iOS Safari zooms the whole page whenever a focused form control has a
    font-size under 16px — every tap on a field would jolt the layout.
    16px is the threshold, not a preference. (Raising the font is the
    correct fix; suppressing zoom with maximum-scale would break
    pinch-zoom for everyone.) */
    .dmss-jo .custom-form input,
    .dmss-jo .custom-form select,
    .dmss-jo .custom-form .time-trigger {
      font-size:16px;
    }
    /* Comfortable touch targets in the time list: 11px padding puts each
    row at ~44px, the usual minimum for a reliable tap. */
    .dmss-jo .time-option {
      font-size:16px;padding:11px 12px;
    }
  }

  @media (max-width:480px) {
    /* 30px of side padding each side is a lot of a ~360px screen; pulling it
    in gives the three coverage buttons and the stacked date/time rows
    room to breathe. */
    .dmss-jo .custom-form {
      padding:26px 18px;
    }
    .dmss-jo .job-form-wrap {
      padding:40px 14px 56px;
    }
    /* Keep all three coverage buttons on one row (the whole point of the
    nowrap above) on the narrowest phones — a label may wrap to two lines
    inside its button, and since the row stretches them to equal heights
    that stays tidy. */
    .dmss-jo .coverage-type-row {
      gap:6px;
    }
    .dmss-jo .coverage-btn {
      padding:12px 5px;font-size:12px;
    }
  }

  /* ---------- Squarespace defence ----------
     Squarespace styles bare h1/h2/h3/p/button/input/select with the site's
     own fonts and margins. The original standalone page could set
     font-family once on :root and let the whole tree inherit it -- but an
     INHERITED value loses to any direct rule, so Squarespace's own
     bare h1 font-family rule would beat it. Re-asserting inherit here, at
     scope-class specificity, pulls those elements back to the font-family
     declared on .dmss-jo above. Same reasoning for the form controls,
     which browsers and Squarespace both restyle. */
  .dmss-jo h1,
  .dmss-jo h2,
  .dmss-jo h3,
  .dmss-jo p,
  .dmss-jo span,
  .dmss-jo strong,
  .dmss-jo small,
  .dmss-jo label,
  .dmss-jo a,
  .dmss-jo button,
  .dmss-jo input,
  .dmss-jo select {
    font-family:inherit;
  }
  /* Squarespace's own button/input resets (and some template themes) add
     text-transform, letter-spacing and min-heights that distort this
     card's controls. */
  .dmss-jo button,
  .dmss-jo input,
  .dmss-jo select {
    text-transform:none;
    letter-spacing:normal;
    min-height:0;
  }
  .dmss-jo a {
    text-decoration:none;
  }

  /* ---------- Full-bleed inside a Squarespace code block ----------
     A Code block sits inside Squarespace's centred content column, so the
     dark gradient section would otherwise stop at the column edges and
     read as a floating panel rather than the full-width hero it was
     designed as. These two negative margins let it span the viewport
     regardless of how wide the container is. .dmss-jo keeps overflow-x
     hidden (set above) to absorb the scrollbar-width rounding that any
     vw-based full-bleed introduces.
     TO DISABLE (keep it inside the content column): delete this rule. */
  .dmss-jo .job-order {
    margin-left:calc(50% - 50vw);
    margin-right:calc(50% - 50vw);
  }

  /* ---------- Success modal ----------
     Was inline styles on the standalone page; moved here so the scope
     class governs it like everything else. */
  .dmss-jo .jo-popup-overlay {
    display:none;position:fixed;inset:0;background:rgba(0,0,0,.6);
    z-index:9999;justify-content:center;align-items:center;padding:20px;
  }
  .dmss-jo .jo-popup-overlay.visible {
    display:flex;
  }
  .dmss-jo .jo-popup-box {
    background:#fff;border-radius:14px;padding:34px;max-width:420px;width:100%;
    text-align:center;box-shadow:0 20px 50px rgba(0,0,0,.3);
  }
  .dmss-jo .jo-popup-box h2 {
    color:var(--teal-dark);margin:10px 0;font-size:24px;
  }
  .dmss-jo .jo-popup-box p {
    color:var(--ink-soft);
  }
  `;

  var html = `
  <div class="dmss-jo">
  <section class="job-order">
    <div class="jo-wrap job-order-grid">
      <div class="job-copy">
        <div class="jo-eyebrow" style="background:rgba(255,255,255,.1);color:var(--teal-soft);"><span class="jo-dot"></span>For Dental Offices</div>
        <h1>Place a Job Order</h1>
        <p class="jo-lead">Tell us the role, the timing, and how to reach you, and we'll take it from there. No account to create, no job board to post to yourself, just a two-minute form straight to a real person on our staffing team.</p>
        <a href="#jobForm" id="mobileScrollBtn" class="jo-btn jo-btn-primary mobile-scroll-btn">Start Your Job Order ↓</a>
  
        <h2 class="roles-h2">Roles We Staff</h2>
        <div class="role-tags">
          <span class="role-tag">Dentist</span>
          <span class="role-tag">Hygienist</span>
          <span class="role-tag">Assistant</span>
          <span class="role-tag">EFDA</span>
          <span class="role-tag">Front Office</span>
        </div>
  
        <h2 class="process-h2">What Happens Next</h2>
        <div class="process-list">
          <div class="process-item">
            <span class="process-num">1</span>
            <div><strong>You submit the form</strong><span>Takes about two minutes, right here on this page.</span></div>
          </div>
          <div class="process-item">
            <span class="process-num">2</span>
            <div><strong>A local coordinator calls you</strong><span>Same business day, to confirm details and answer questions.</span></div>
          </div>
          <div class="process-item">
            <span class="process-num">3</span>
            <div><strong>We get to work finding your match</strong><span>We draw on 25+ years of local relationships to fill your chairs fast.</span></div>
          </div>
        </div>
  
        <div class="jo-testimonial">
          <p>&ldquo;When we need coverage, they respond quickly and handle everything. It takes the stress out of staffing completely.&rdquo;</p>
          <div class="jo-attribution">— Mark L., Office Manager</div>
        </div>
  
        <div class="trust-strip">
          <div class="jo-trust-item"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>Family-Owned &amp; Operated</div>
          <div class="jo-trust-item"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12.5l2.5 2.5L16 9.5"/></svg>Fast, Personal Response</div>
        </div>
      </div>
  
      <div class="job-form-wrap" id="jobForm">
        <form class="custom-form" id="leadForm" novalidate>
          <h3>Job Order Details</h3>
          <p class="jo-sub">Fill this out and we'll take it from there.</p>
  
          <!-- Honeypot (bot trap, kept invisible) -->
          <div class="form-extra" aria-hidden="true">
            <label for="website">Website</label>
            <input type="text" id="website" name="website" tabindex="-1" autocomplete="off">
          </div>
  
          <!-- Hidden context fields, matching the naming convention the other
               DMSS lead forms use, so wiring this up later is a drop-in. -->
          <input type="hidden" name="Visitor Type" value="My office is placing a job order.">
          <input type="hidden" name="Office/Candidate" value="Office">
          <input type="hidden" name="Country" value="USA">
  
          <div class="wizard-progress">
            <div class="wizard-progress-track"><div class="wizard-progress-fill" id="progressFill"></div></div>
            <div class="wizard-progress-label" id="progressLabel">Step 1 of 2</div>
          </div>
  
          <div class="form-step active" data-step="1">
            <label for="officeName" class="required">Office Name</label>
            <input type="text" id="officeName" name="Office Name" placeholder="Smith Family Dental" required>
  
            <div class="form-row">
              <div>
                <label for="firstName" class="required">Contact First Name</label>
                <input type="text" id="firstName" name="First Name" placeholder="Jamie" required>
              </div>
              <div>
                <label for="lastName" class="required">Contact Last Name</label>
                <input type="text" id="lastName" name="Last Name" placeholder="Smith" required>
              </div>
            </div>
  
            <label for="phone" class="required">Phone Number</label>
            <input type="tel" id="phone" name="Phone" placeholder="(317) 555-1234" required>
  
            <label for="email" class="required">Email</label>
            <input type="email" id="email" name="Email" placeholder="jamie@practice.com" required>
  
            <label for="position" class="required">Position You Need Filled</label>
            <select id="position" name="Position Interested In" required>
              <option value="" disabled hidden selected>Select a role</option>
              <option value="Dentist">Dentist</option>
              <option value="Dental Hygienist">Dental Hygienist</option>
              <option value="Dental Assistant">Dental Assistant</option>
              <option value="EFDA">Dental Assistant (Expanded Functions)</option>
              <option value="Front Office">Front Office</option>
              <option value="Dental Office">Multiple / Not Sure Yet</option>
            </select>
  
            <label for="placementType" class="required">Type of Placement</label>
            <select id="placementType" name="Placement Type" required>
              <option value="" disabled hidden selected>Select an option</option>
              <option value="Temporary Staffing">Temporary Staffing</option>
              <option value="Permanent Placement">Permanent Placement</option>
              <option value="Both">Both</option>
              <option value="Not Sure Yet">Not Sure Yet</option>
            </select>
          </div>
  
          <div class="form-step" data-step="2">
            <h2 class="step-heading" id="step2Heading">When Do You Need Coverage?</h2>
            <p class="step-description" id="step2Description">Let us know the schedule so we can start matching candidates.</p>
  
            <div id="permanentPanel">
              <label for="permStartDate" class="required">Start Date</label>
              <input type="date" id="permStartDate" name="Start Date (Permanent)" required>
            </div>
  
            <div id="tempPanel">
              <label class="required" style="margin-bottom:8px;">Coverage Type</label>
              <div class="coverage-type-row" id="coverageTypeRow">
                <label class="coverage-btn">
                  <input type="radio" name="Coverage Type" id="coverageTypeSingle" value="single">
                  <span>Single Day</span>
                </label>
                <label class="coverage-btn">
                  <input type="radio" name="Coverage Type" id="coverageTypeSpecific" value="specific">
                  <span>Specific Days</span>
                </label>
                <label class="coverage-btn">
                  <input type="radio" name="Coverage Type" id="coverageTypeRange" value="range">
                  <span>Span of Days</span>
                </label>
              </div>
              <div class="coverage-type-error" id="coverageTypeError">Please choose Single Day, Specific Days, or a Span of Days.</div>
              <div class="coverage-hint" id="coverageHint"></div>
  
              <div id="singleDateField">
                <label for="dateNeeded" class="required">Date Needed</label>
                <input type="date" id="dateNeeded" name="Date Needed" required>
              </div>
  
              <div id="specificDatesFields">
                <label>Specific Days</label>
                <div id="specificDatesList">
                  <div class="specific-date-row">
                    <input type="date" class="specific-date-input" name="Specific Date 1">
                    <button type="button" class="removeSpecificDateBtn" aria-label="Remove day">×</button>
                  </div>
                  <div class="specific-date-row">
                    <input type="date" class="specific-date-input" name="Specific Date 2">
                    <button type="button" class="removeSpecificDateBtn" aria-label="Remove day">×</button>
                  </div>
                </div>
                <button type="button" id="addSpecificDateBtn" class="jo-add-date-btn">+ Add another day</button>
                <div class="field-error" id="specificDatesError"></div>
              </div>
  
              <div id="multiDateFields">
                <div class="form-row">
                  <div>
                    <label for="coverageStartDate" class="required">Start Date</label>
                    <input type="date" id="coverageStartDate" name="Start Date (Coverage)" required>
                  </div>
                  <div>
                    <label for="coverageEndDate" class="required">End Date</label>
                    <input type="date" id="coverageEndDate" name="End Date (Coverage)" required>
                  </div>
                </div>
              </div>
  
              <div class="form-row">
                <div>
                  <label for="startTime" class="required">Start Time</label>
                  <select id="startTime" name="Start Time" required><option value="">Select…</option></select>
                </div>
                <div>
                  <label for="endTime" class="required">End Time</label>
                  <select id="endTime" name="End Time" required><option value="">Select…</option></select>
                </div>
              </div>
            </div>
  
            <!-- Outside both scheduling panels on purpose: Notes applies to a
                 permanent placement just as much as to temp coverage, and
                 setPanelActive would otherwise disable and clear it whenever
                 the visitor switched placement type. Maps to the Notes
                 column (S) — handleFormPost_ already reads this field name. -->
            <label for="notes">Anything Else We Should Know? <span class="optional-tag">(optional)</span></label>
            <textarea id="notes" name="Notes" rows="3" placeholder="Tell us more about your needs."></textarea>
          </div>
  
          <div class="form-error" id="formError"></div>
  
          <div class="wizard-nav">
            <button type="button" id="backBtn" class="jo-btn jo-btn-secondary" style="display:none;">Back</button>
            <button type="button" id="nextBtn" class="jo-btn jo-btn-primary">Next</button>
            <button type="submit" id="submitBtn" class="jo-btn jo-btn-primary" style="display:none;">Submit Job Order</button>
          </div>
          <p class="form-disclaimer">A local coordinator will reach out shortly. No spam, ever.</p>
        </form>
      </div>
    </div>
  </section>
  
  <!-- ================= SUCCESS MODAL ================= -->
  <div class="jo-popup-overlay" id="popupOverlay">
    <div class="jo-popup-box">
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12.5l2.5 2.5L16 9.5"/></svg>
      <h2 style="color:var(--teal-dark);margin:10px 0;">Job Order Received!</h2>
      <p style="color:var(--ink-soft);">Thanks for reaching out. A local coordinator will follow up shortly to confirm details and get your position filled.</p>
      <button type="button" id="closePopup" class="jo-btn jo-btn-primary" style="margin-top:10px;">Close</button>
    </div>
  </div>
  </div>
  `;

  // Injected once per page, not once per init -- see mount()'s comment for
  // why init can be reached more than once.
  var STYLE_ID = 'dmss-joborder-form-styles';
  function injectStylesOnce() {
    if (document.getElementById(STYLE_ID)) return;
    var styleEl = document.createElement('style');
    styleEl.id = STYLE_ID;
    styleEl.textContent = css;
    document.head.appendChild(styleEl);
  }

  function init(root) {
    injectStylesOnce();

    root.innerHTML = html;

    // Root-scoped lookups, replacing the standalone page's document.*
    // calls -- keeps this widget from reaching into anything else on the
    // Squarespace page (including the other DMSS form, if they ever share
    // a page and therefore share element ids).
    function $(sel) { return root.querySelector(sel); }
    function $$(sel) { return root.querySelectorAll(sel); }

    // ---------- Time dropdowns (15-min increments) ----------
      // A native <input type=time step=900> only quantizes its spinner arrows —
      // typing or a platform picker can still land on any minute — so a real
      // dropdown is the only way to actually restrict the choice.
      // Plain chronological list, 12:00 AM through 11:45 PM, every quarter hour.
      // A native <input type=time step=900> only quantizes its spinner arrows --
      // typing or a platform picker can still land on any minute -- so a real
      // dropdown is the only way to actually restrict the choice.
      function buildTimeOptions() {
        const pad = (n) => (n < 10 ? '0' : '') + n;
        const opts = ['<option value="">Select…</option>'];
        for (let h = 0; h < 24; h++) {
          for (let m = 0; m < 60; m += 15) {
            const h12 = h % 12 === 0 ? 12 : h % 12;
            opts.push('<option value="' + pad(h) + ':' + pad(m) + '">'
              + h12 + ':' + pad(m) + ' ' + (h < 12 ? 'AM' : 'PM') + '</option>');
          }
        }
        return opts.join('');
      }
      // ---------- Custom time dropdowns ----------
      // See the .time-select block in the <style> above for why the native
      // control is replaced. This is the time the list opens parked on:
      const TIME_OPEN_AT = '07:00';
      const timeControls = [];
      function refreshTimeControls() { timeControls.forEach((c) => c.refresh()); }
    
      function enhanceTimeSelect(select) {
        const wrap = document.createElement('div');
        wrap.className = 'time-select';
        select.parentNode.insertBefore(wrap, select);
        select.classList.add('time-select-native');
        select.setAttribute('tabindex', '-1');
        select.setAttribute('aria-hidden', 'true');
        wrap.appendChild(select);
    
        const trigger = document.createElement('button');
        trigger.type = 'button';
        trigger.className = 'time-trigger';
        trigger.setAttribute('aria-haspopup', 'listbox');
        trigger.setAttribute('aria-expanded', 'false');
        const label = $('label[for="' + select.id + '"]');
        if (label) trigger.setAttribute('aria-label', label.textContent.trim());
        wrap.appendChild(trigger);
    
        const list = document.createElement('div');
        list.className = 'time-list';
        list.id = select.id + 'List';
        list.setAttribute('role', 'listbox');
        list.tabIndex = -1;
        trigger.setAttribute('aria-controls', list.id);
        wrap.appendChild(list);
    
        // Rows are built FROM the select's own options, so buildTimeOptions
        // stays the single place the time list is defined.
        Array.from(select.options).forEach((opt) => {
          if (!opt.value) return; // skip the "Select…" placeholder
          const row = document.createElement('div');
          row.className = 'time-option';
          row.id = select.id + '-' + opt.value.replace(':', '');
          row.setAttribute('role', 'option');
          row.setAttribute('aria-selected', 'false');
          row.dataset.value = opt.value;
          row.textContent = opt.textContent;
          list.appendChild(row);
        });
        const rows = Array.from(list.children);
        const rowFor = (v) => rows.filter((r) => r.dataset.value === v)[0];
    
        let activeRow = null;
        function setActive(row, keepInView) {
          if (activeRow) activeRow.classList.remove('active');
          activeRow = row || null;
          if (!activeRow) { list.removeAttribute('aria-activedescendant'); return; }
          activeRow.classList.add('active');
          list.setAttribute('aria-activedescendant', activeRow.id);
          if (!keepInView) return;
          const top = activeRow.offsetTop;
          const bottom = top + activeRow.offsetHeight;
          if (top < list.scrollTop) list.scrollTop = top;
          else if (bottom > list.scrollTop + list.clientHeight) list.scrollTop = bottom - list.clientHeight;
        }
    
        const isOpen = () => wrap.classList.contains('open');
    
        function open() {
          if (select.disabled || isOpen()) return;
          // Flip upward when the list wouldn't fit below. .job-order sets
          // overflow:hidden, so a downward list near the bottom of the card
          // would be CLIPPED rather than just overhanging the edge.
          // Which way to open, and how tall to be. .job-order sets
          // overflow:hidden, so a list that runs past the card is CLIPPED
          // rather than just overhanging — on a short viewport (landscape
          // phone, or an on-screen keyboard eating half the screen) neither
          // direction may have the full 250px, so the height is clamped to
          // whatever room the chosen direction actually has.
          const rect = trigger.getBoundingClientRect();
          const gap = 5, margin = 12;
          const below = window.innerHeight - rect.bottom - gap - margin;
          const above = rect.top - gap - margin;
          const flipUp = below < 180 && above > below;
          wrap.classList.toggle('up', flipUp);
          list.style.maxHeight = Math.max(120, Math.min(250, flipUp ? above : below)) + 'px';
          wrap.classList.add('open');
          trigger.setAttribute('aria-expanded', 'true');
          // Park the chosen time — or 7:00 AM — at the TOP of the list, so the
          // earlier hours stay one scroll-up away instead of being reordered
          // or hidden behind a divider.
          const anchor = rowFor(select.value) || rowFor(TIME_OPEN_AT) || rows[0];
          list.scrollTop = anchor ? anchor.offsetTop : 0;
          setActive(anchor, false);
          list.focus();
        }
        function close(returnFocus) {
          if (!isOpen()) return;
          wrap.classList.remove('open');
          wrap.classList.remove('up');
          trigger.setAttribute('aria-expanded', 'false');
          setActive(null);
          if (returnFocus) trigger.focus();
        }
        function choose(value) {
          select.value = value;
          // Keeps the hidden select the source of truth and lets anything
          // listening on it (now or later) behave as it would natively.
          select.dispatchEvent(new Event('change', { bubbles: true }));
          refresh();
          close(true);
        }
        function refresh() {
          const chosen = rowFor(select.value);
          trigger.textContent = chosen ? chosen.textContent : 'Select…';
          trigger.classList.toggle('placeholder', !chosen);
          trigger.disabled = select.disabled;
          rows.forEach((r) => {
            const on = r === chosen;
            r.classList.toggle('selected', on);
            r.setAttribute('aria-selected', on ? 'true' : 'false');
          });
          // Covers setPanelActive clearing the value out from under an open
          // list when the visitor switches placement/coverage type.
          if (!chosen) close(false);
        }
    
        trigger.addEventListener('click', () => { isOpen() ? close(true) : open(); });
        trigger.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            open();
          }
        });
        list.addEventListener('click', (e) => {
          const row = e.target.closest && e.target.closest('.time-option');
          if (row) choose(row.dataset.value);
        });
        list.addEventListener('keydown', (e) => {
          const i = activeRow ? rows.indexOf(activeRow) : -1;
          if (e.key === 'ArrowDown') { e.preventDefault(); setActive(rows[Math.min(i + 1, rows.length - 1)] || rows[0], true); }
          else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(rows[Math.max(i - 1, 0)], true); }
          else if (e.key === 'Home') { e.preventDefault(); setActive(rows[0], true); }
          else if (e.key === 'End') { e.preventDefault(); setActive(rows[rows.length - 1], true); }
          else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (activeRow) choose(activeRow.dataset.value); }
          else if (e.key === 'Escape') { e.preventDefault(); close(true); }
          else if (e.key === 'Tab') { close(false); }
        });
        document.addEventListener('click', (e) => { if (!wrap.contains(e.target)) close(false); });
    
        refresh();
        timeControls.push({ refresh: refresh });
      }
    
      ['startTime', 'endTime'].forEach((id) => {
        const select = $('#' + id);
        select.innerHTML = buildTimeOptions();
        enhanceTimeSelect(select);
      });
    
      // ---------- Phone formatting ----------
      const phoneField = $('#phone');
      phoneField.addEventListener('input', (e) => {
        let input = e.target.value.replace(/\D/g, '');
        if (input.length > 0) input = '(' + input;
        if (input.length > 4) input = input.slice(0, 4) + ') ' + input.slice(4);
        if (input.length > 9) input = input.slice(0, 9) + '-' + input.slice(9, 13);
        e.target.value = input;
      });
    
      // ---------- Field refs ----------
      const form = $('#leadForm');
      const officeNameField = $('#officeName');
      const firstNameField = $('#firstName');
      const lastNameField = $('#lastName');
      const emailField = $('#email');
      const positionField = $('#position');
      const placementTypeField = $('#placementType');
    
      const permanentPanel = $('#permanentPanel');
      const tempPanel = $('#tempPanel');
      const singleDateField = $('#singleDateField');
      const specificDatesFields = $('#specificDatesFields');
      const specificDatesList = $('#specificDatesList');
      const addSpecificDateBtn = $('#addSpecificDateBtn');
      const multiDateFields = $('#multiDateFields');
      const coverageTypeSingle = $('#coverageTypeSingle');
      const coverageTypeRow = $('#coverageTypeRow');
    
      const permStartDateField = $('#permStartDate');
      const dateNeededField = $('#dateNeeded');
      const coverageStartDateField = $('#coverageStartDate');
      const coverageEndDateField = $('#coverageEndDate');
      const startTimeField = $('#startTime');
      const endTimeField = $('#endTime');
    
      const step2Heading = $('#step2Heading');
      const step2Description = $('#step2Description');
      const coverageHint = $('#coverageHint');
      const specificDatesError = $('#specificDatesError');
      const formError = $('#formError');
    
      // ---------- Past dates ----------
      // Computed at page load rather than hardcoded as a min="" attribute so it
      // can't go stale, and re-applied to Specific Days rows as they're added.
      // The attribute greys out earlier days in the native picker; validateStep2
      // checks the value too, since a date can still be typed in directly.
      function pad2(n) { return (n < 10 ? '0' : '') + n; }
      function todayISO() {
        const d = new Date();
        return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
      }
      const TODAY = todayISO();
      function applyDateFloor(scope) {
        scope.querySelectorAll('input[type=date]').forEach((input) => { input.min = TODAY; });
      }
    
      // ---------- Inline validation ----------
      // Each message lives next to the field it's about, created on demand and
      // reused. Replaces this form's alert() dialogs, which couldn't be styled,
      // read poorly on mobile, and gave no indication of WHICH field was wrong
      // once dismissed.
      const errorNodes = {};
      function visualFor(field) {
        // The time fields are hidden behind a custom trigger, so the red border
        // has to go on the trigger, not the invisible <select>.
        const wrap = field.closest('.time-select');
        return wrap ? wrap.querySelector('.time-trigger') : field;
      }
      function errorNodeFor(field) {
        if (errorNodes[field.id]) return errorNodes[field.id];
        const node = document.createElement('div');
        node.className = 'field-error';
        node.id = field.id + 'Error';
        // Insert after the custom-dropdown WRAPPER where there is one, or the
        // message would end up inside it, above the option list.
        const anchor = field.closest('.time-select') || field;
        anchor.parentNode.insertBefore(node, anchor.nextSibling);
        errorNodes[field.id] = node;
        return node;
      }
      function clearFieldError(field) {
        if (!field || !field.id) return;
        const node = errorNodes[field.id];
        if (node) { node.classList.remove('visible'); node.textContent = ''; }
        const visual = visualFor(field);
        if (visual && visual.classList) visual.classList.remove('has-error');
        field.removeAttribute('aria-invalid');
      }
      function clearAllErrors() {
        // querySelector, not getElementById: the widget build rewrites these
        // lookups to be root-scoped and only handles the querySelector form.
        Object.keys(errorNodes).forEach((id) => clearFieldError($('#' + id)));
        coverageTypeError.classList.remove('visible');
        specificDatesError.classList.remove('visible');
        formError.classList.remove('visible');
      }
      function fail(field, message) {
        const node = errorNodeFor(field);
        node.textContent = message;
        node.classList.add('visible');
        const visual = visualFor(field);
        visual.classList.add('has-error');
        field.setAttribute('aria-invalid', 'true');
        field.setAttribute('aria-describedby', node.id);
        if (visual.focus) visual.focus();
        visual.scrollIntoView({ block: 'center', behavior: 'smooth' });
        return false;
      }
      function failBlock(node, scrollTo, message) {
        node.textContent = message;
        node.classList.add('visible');
        scrollTo.scrollIntoView({ block: 'center', behavior: 'smooth' });
        return false;
      }
      function showFormError(message) {
        formError.textContent = message;
        formError.classList.add('visible');
        formError.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
      // Clear a field's message the moment the visitor starts fixing it.
      form.addEventListener('input', (e) => clearFieldError(e.target));
      form.addEventListener('change', (e) => clearFieldError(e.target));
    
      // ---------- Specific Days: dynamic add/remove rows, min 2. Inputs are
      // renumbered (Specific Date 1, 2, 3…) on every add/remove so FormData
      // field names stay sequential regardless of which row got removed. ----------
      function renumberSpecificDateInputs() {
        specificDatesList.querySelectorAll('.specific-date-input').forEach((input, i) => {
          input.name = 'Specific Date ' + (i + 1);
        });
      }
      function updateRemoveButtonVisibility() {
        const rows = specificDatesList.querySelectorAll('.specific-date-row');
        rows.forEach((row) => {
          row.querySelector('.removeSpecificDateBtn').style.display = rows.length > 2 ? '' : 'none';
        });
      }
      function addSpecificDateRow() {
        const row = document.createElement('div');
        row.className = 'specific-date-row';
        row.innerHTML = '<input type="date" class="specific-date-input"><button type="button" class="removeSpecificDateBtn" aria-label="Remove day">×</button>';
        specificDatesList.appendChild(row);
        applyDateFloor(row); // added rows need the same past-date floor
        renumberSpecificDateInputs();
        updateRemoveButtonVisibility();
      }
      addSpecificDateBtn.addEventListener('click', addSpecificDateRow);
      specificDatesList.addEventListener('click', (e) => {
        if (e.target.classList.contains('removeSpecificDateBtn')) {
          const rows = specificDatesList.querySelectorAll('.specific-date-row');
          if (rows.length <= 2) return;
          e.target.closest('.specific-date-row').remove();
          renumberSpecificDateInputs();
          updateRemoveButtonVisibility();
        }
      });
      updateRemoveButtonVisibility();
      function getSpecificDateValues() {
        return Array.from(specificDatesList.querySelectorAll('.specific-date-input'))
          .map((input) => input.value)
          .filter((v) => v);
      }
    
      // ---------- Wizard: Step 2's content branches on Step 1's Placement
      // Type answer (Permanent → just a start date; Temporary/Both/Not Sure
      // Yet → single- vs multi-day scheduling). ----------
      const steps = Array.from($$('.form-step'));
      const totalSteps = steps.length;
      let currentStep = 1;
    
      const progressFill = $('#progressFill');
      const progressLabel = $('#progressLabel');
      const backBtn = $('#backBtn');
      const nextBtn = $('#nextBtn');
      const submitBtn = $('#submitBtn');
      const popupOverlay = $('#popupOverlay');
      const closePopup = $('#closePopup');
    
      function showStep(step) {
        steps.forEach((s) => s.classList.toggle('active', parseInt(s.dataset.step, 10) === step));
        progressFill.style.width = (step / totalSteps * 100) + '%';
        progressLabel.textContent = 'Step ' + step + ' of ' + totalSteps;
        backBtn.style.display = step === 1 ? 'none' : 'inline-flex';
        nextBtn.style.display = step === totalSteps ? 'none' : 'inline-flex';
        submitBtn.style.display = step === totalSteps ? 'inline-flex' : 'none';
        form.scrollIntoView({ block: 'start', behavior: 'smooth' });
      }
    
      // Toggling display + disabled together (rather than display alone) keeps
      // whichever path the visitor didn't take out of FormData entirely —
      // disabled fields are skipped automatically — instead of quietly
      // submitting stale values from a hidden panel.
      function setPanelActive(el, active) {
        el.style.display = active ? '' : 'none';
        el.querySelectorAll('input, select').forEach((field) => {
          field.disabled = !active;
          if (!active) field.value = '';
        });
        // The time <select>s are hidden behind custom triggers, and the
        // disabling/clearing above is programmatic, so it fires no change
        // event — the triggers have to be told.
        refreshTimeControls();
      }
    
      // Only the date row switches between one field (single day), a dynamic
      // list (specific days), or two fields (a span) — Start Time/End Time are
      // collected either way now, so the full shift timeline (not just an
      // arrival time) is always on file to send to candidates.
      const coverageTypeError = $('#coverageTypeError');
    
      function getCoverageType() {
        const checked = $('input[name="Coverage Type"]:checked');
        return checked ? checked.value : '';
      }
      // Shown under the row once a choice is made. "Single Day" has no entry on
      // purpose — it needs no explanation, and an always-present hint line would
      // just push the date fields down. These replace the "(e.g. Mon, Wed, Fri)"
      // sublabels the buttons used to carry, which forced a second row.
      const COVERAGE_HINTS = {
        specific: 'Pick each individual day you need covered — for example Mon, Wed and Fri.',
        range: 'Pick the first and last day of one continuous stretch — for example Monday through Wednesday.',
      };
      function updateCoverageHint(mode) {
        const text = COVERAGE_HINTS[mode] || '';
        coverageHint.textContent = text;
        coverageHint.classList.toggle('visible', !!text);
      }
    
      function updateCoverageFields() {
        const mode = getCoverageType();
        setPanelActive(singleDateField, mode === 'single');
        setPanelActive(specificDatesFields, mode === 'specific');
        setPanelActive(multiDateFields, mode === 'range');
        $$('.coverage-btn').forEach((btn) => {
          btn.classList.toggle('selected', btn.querySelector('input').checked);
        });
        updateCoverageHint(mode);
        if (mode) coverageTypeError.classList.remove('visible');
        specificDatesError.classList.remove('visible');
      }
      $$('input[name="Coverage Type"]').forEach((r) => {
        r.addEventListener('change', updateCoverageFields);
      });
    
      function configureStep2() {
        const isPermanent = placementTypeField.value === 'Permanent Placement';
        setPanelActive(permanentPanel, isPermanent);
        setPanelActive(tempPanel, !isPermanent);
        if (isPermanent) {
          step2Heading.textContent = 'When Are You Looking to Fill This?';
          step2Description.textContent = "Since this is a permanent placement, we just need a target start date — we'll work out the details when we call.";
          coverageTypeSingle.checked = true;
        } else {
          step2Heading.textContent = 'When Do You Need Coverage?';
          step2Description.textContent = 'Let us know the schedule so we can start matching candidates.';
        }
        updateCoverageFields();
      }
    
      function validateStep1() {
        clearAllErrors();
        if (!officeNameField.value.trim()) return fail(officeNameField, 'Please enter the office name.');
        if (!firstNameField.value.trim()) return fail(firstNameField, 'Please enter a contact first name.');
        if (!lastNameField.value.trim()) return fail(lastNameField, 'Please enter a contact last name.');
        if (phoneField.value.replace(/\D/g, '').length !== 10) return fail(phoneField, 'Please enter a valid 10-digit phone number.');
        if (!emailField.value.trim()) return fail(emailField, 'Please enter an email address.');
        // Format-checked, not just non-empty: a typo here means the office never
        // gets its confirmation email and the lead looks unreachable.
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailField.value.trim())) {
          return fail(emailField, 'That email address doesn’t look quite right — please double-check it.');
        }
        if (!positionField.value) return fail(positionField, 'Please select the position you need filled.');
        if (!placementTypeField.value) return fail(placementTypeField, 'Please select the type of placement.');
        return true;
      }
    
      const PAST = 'Please choose a date that isn’t in the past.';
      function validateStep2() {
        clearAllErrors();
        if (placementTypeField.value === 'Permanent Placement') {
          if (!permStartDateField.value) return fail(permStartDateField, 'Please choose a start date.');
          if (permStartDateField.value < TODAY) return fail(permStartDateField, PAST);
          return true;
        }
        const mode = getCoverageType();
        if (!mode) {
          return failBlock(coverageTypeError, coverageTypeRow,
            'Please choose Single Day, Specific Days, or a Span of Days.');
        }
        if (mode === 'range') {
          if (!coverageStartDateField.value) return fail(coverageStartDateField, 'Please choose a start date.');
          if (coverageStartDateField.value < TODAY) return fail(coverageStartDateField, PAST);
          if (!coverageEndDateField.value) return fail(coverageEndDateField, 'Please choose an end date.');
          if (coverageEndDateField.value < coverageStartDateField.value) return fail(coverageEndDateField, 'The end date needs to be on or after the start date.');
        } else if (mode === 'specific') {
          const picked = getSpecificDateValues();
          if (picked.length < 2) {
            return failBlock(specificDatesError, specificDatesFields,
              'Please pick at least 2 days, or choose Single Day instead.');
          }
          if (picked.some((d) => d < TODAY)) {
            return failBlock(specificDatesError, specificDatesFields,
              'One of these days is in the past — please pick upcoming dates only.');
          }
        } else {
          if (!dateNeededField.value) return fail(dateNeededField, 'Please choose the date needed.');
          if (dateNeededField.value < TODAY) return fail(dateNeededField, PAST);
        }
        if (!startTimeField.value) return fail(startTimeField, 'Please choose a start time.');
        if (!endTimeField.value) return fail(endTimeField, 'Please choose an end time.');
        if (endTimeField.value <= startTimeField.value) return fail(endTimeField, 'The end time needs to be after the start time.');
        return true;
      }
    
      nextBtn.addEventListener('click', () => {
        if (!validateStep1()) return;
        configureStep2();
        currentStep = 2;
        showStep(currentStep);
      });
    
      backBtn.addEventListener('click', () => {
        currentStep = 1;
        showStep(currentStep);
      });
    
      // ---------- Form submit ----------
      applyDateFloor(form);
    
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!validateStep2()) return;
    
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
    
        // Wired up 2026-09-23 to JobOrderIntake.gs's doPost (see
        // handleFormPost_ there for the receiving end). Field names on every
        // input match the naming convention the other two DMSS lead forms
        // use, and handleFormPost_ maps them onto dialogAddJobOrder_'s
        // camelCase contract — the same function the staff New Job Order
        // dialog calls, so a web order and a phone order are recorded
        // identically. Disabled fields from whichever scheduling path wasn't
        // taken are already excluded from FormData by setPanelActive above.
        //
        // mode:'no-cors' (same as the other two DMSS forms) is what lets a
        // Squarespace page POST to script.google.com at all without CORS
        // preflight failures. The tradeoff: the response is OPAQUE — .then()
        // fires on any completed request and .catch() only on a genuine
        // network failure, so we cannot tell a saved order from a rejected
        // one here. The backend compensates by emailing staff the raw
        // submission if it can't write the row, so nothing is ever lost
        // silently; see handleFormPost_'s no-cors comment.
        if (FORM_ENDPOINT.indexOf('PASTE_') === 0) {
          console.error('DMSS job order form: FORM_ENDPOINT is still the placeholder — deploy JobOrderIntake.gs as a Web App and paste its /exec URL in. Submission NOT sent.');
          onSubmitError(new Error('Form endpoint not configured'));
          return;
        }
        fetch(FORM_ENDPOINT, {
          method: 'POST',
          mode: 'no-cors',
          body: new FormData(form)
        }).then(onSubmitSuccess).catch(onSubmitError);
    
        function onSubmitSuccess() {
          // Scoped to this page only: relies on gtag.js already being loaded
          // site-wide, doesn't add or change anything elsewhere. Distinct
          // event name from the hygienist/office lead forms so Ads/GA4 can
          // tell the three lead types apart.
          if (typeof gtag === 'function') {
            gtag('event', 'job_order_submit');
          }
          popupOverlay.classList.add('visible');
          form.reset();
          refreshTimeControls(); // form.reset() restores the placeholder silently
          currentStep = 1;
          showStep(currentStep);
          submitBtn.disabled = false;
          submitBtn.textContent = 'Submit Job Order';
        }
    
        function onSubmitError(error) {
          console.error('Error!', error && error.message);
          submitBtn.disabled = false;
          submitBtn.textContent = 'Submit Job Order';
          showFormError('Something went wrong submitting your job order. Please try again, or call us at (317) 844-5538 and we’ll take it over the phone.');
        }
      });
    
      closePopup.addEventListener('click', () => { popupOverlay.classList.remove('visible'); });
      popupOverlay.addEventListener('click', (e) => { if (e.target === popupOverlay) popupOverlay.classList.remove('visible'); });
    
      showStep(currentStep);
    
      // ---------- Mobile CTA ----------
      // On the standalone page this was just <a href="#jobForm"> plus
      // html{scroll-behavior:smooth}. Both of those are gone here (the global
      // rule would have applied to the whole Squarespace site), and a bare
      // hash href can additionally fight Squarespace's own in-page routing --
      // so do the scroll explicitly and swallow the navigation.
      const mobileScrollBtn = $('#mobileScrollBtn');
      const jobFormAnchor = $('#jobForm');
      mobileScrollBtn.addEventListener('click', (e) => {
        e.preventDefault();
        jobFormAnchor.scrollIntoView({ block: 'start', behavior: 'smooth' });
      });
  }

  // Guarded against running twice on the same element. This is not
  // hypothetical on Squarespace: 7.1 navigates between pages client-side
  // and re-executes the Code block's script, and a page can also end up
  // including the snippet twice. A second init() would call
  // root.innerHTML = html again, which REPLACES every node -- leaving the
  // first init's cached element references (form, popupOverlay, the step
  // panels) pointing at orphaned nodes that are no longer in the document,
  // so the wizard and the success modal silently stop working.
  var MOUNTED_ATTR = 'data-dmss-jo-mounted';
  function mount() {
    var root = document.getElementById(MOUNT_ID);
    if (!root) {
      console.error('DMSS job order form: no element with id="' + MOUNT_ID + '" found on this page.');
      return;
    }
    if (root.getAttribute(MOUNTED_ATTR) === '1') return;
    root.setAttribute(MOUNTED_ATTR, '1');
    init(root);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
