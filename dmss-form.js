(function () {
  var MOUNT_ID = 'dmss-lead-form';
  var FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwvpGqd5L_G8iWThipTJSl5CzCCgG-Vcoviirfdl-ifbUG4LSeKPP0NQIybGUet7itByA/exec';

  var css = `
  .custom-form {
    max-width: 500px;
    margin: 0 auto;
    padding: 32px 28px;
    background: #0d3b35;
    border-radius: 16px;
    box-shadow: 0 25px 50px -12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
    overflow-x: hidden;
  }

  .custom-form label {
    font-weight: 600;
    margin-bottom: 6px;
    display: block;
    color: #bfe3da;
  }

  .custom-form .required::after {
    content: " *";
    color: #f87171;
  }

  .custom-form input,
  .custom-form select {
    width: 100%;
    padding: 12px 14px;
    margin-bottom: 20px;
    border: 1px solid rgba(15,118,110,0.2);
    border-radius: 8px;
    box-sizing: border-box;
    font-size: 14px;
    color: #1f2d2b;
    background-color: #eef7f5;
    box-shadow: inset 0 1px 2px rgba(0,0,0,0.06), 0 3px 10px rgba(0,0,0,0.15);
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
  }

  .custom-form input::placeholder {
    color: #8aa39d;
  }

  .custom-form select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    height: 48px;
    padding-right: 40px;
    background-image: url("data:image/svg+xml;utf8,<svg fill='%230f766e' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
    background-repeat: no-repeat;
    background-position: right 14px center;
    background-size: 18px;
  }

  .custom-form input:focus,
  .custom-form select:focus {
    outline: none;
    border-color: #14b8a6;
    box-shadow: 0 0 0 4px rgba(20, 184, 166, 0.25), 0 0 20px rgba(20, 184, 166, 0.3), inset 0 1px 2px rgba(0,0,0,0.06);
  }

  .custom-form select option {
    background-color: #fbfefd;
    color: #163832;
    padding: 10px 12px;
  }

  .custom-form select option:disabled {
    color: #9db8b2;
  }

  .custom-form .step-heading {
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    margin: 0 0 8px;
  }

  .custom-form .step-description {
    font-size: 14px;
    color: #a8d0c6;
    line-height: 1.5;
    margin: 0 0 20px;
  }

  .custom-form .step-divider {
    border: none;
    border-top: 1px solid rgba(255,255,255,0.14);
    margin: 0 0 24px;
  }

  .custom-form .wizard-progress {
    margin-bottom: 26px;
  }

  .custom-form .wizard-progress-track {
    width: 100%;
    height: 6px;
    background: rgba(255,255,255,0.15);
    border-radius: 999px;
    overflow: hidden;
  }

  .custom-form .wizard-progress-fill {
    height: 100%;
    width: 33.333%;
    background-color: #14b8a6;
    border-radius: 999px;
    transition: width 0.25s ease;
  }

  .custom-form .wizard-progress-label {
    margin-top: 8px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.4px;
    text-transform: uppercase;
    color: #8fc9bd;
    text-align: right;
  }

  .custom-form .form-step {
    display: none;
  }

  .custom-form .form-step.active {
    display: block;
  }

  .custom-form .wizard-nav {
    display: flex;
    gap: 12px;
    margin-top: 20px;
  }

  .custom-form .btn {
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: background-color 0.15s ease, border-color 0.15s ease;
  }

  .custom-form .btn-primary {
    flex: 1;
    background-color: #14b8a6;
    color: #fff;
    box-shadow: 0 10px 24px rgba(13, 148, 136, 0.35);
  }

  .custom-form .btn-primary:hover {
    background-color: #0f766e;
  }

  .custom-form .btn-secondary {
    background-color: transparent;
    color: #bfe3da;
    border: 1px solid rgba(191,227,218,0.35);
  }

  .custom-form .btn-secondary:hover {
    background-color: rgba(255,255,255,0.08);
    border-color: rgba(191,227,218,0.55);
  }

  @media (max-width:768px){
    .custom-form input,
    .custom-form select {
      font-size: 16px;
    }
  }

  .dmss-popup-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 9999;
    justify-content: center;
    align-items: center;
  }

  .dmss-popup-box {
    background: #fff;
    border-radius: 8px;
    padding: 30px;
    max-width: 400px;
    width: 90%;
    text-align: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    animation: dmssFadeIn 0.3s ease-in-out;
  }

  .dmss-popup-box h2 {
    margin-top: 0;
    color: #0f766e;
    font-size: 22px;
  }

  .dmss-popup-box button {
    margin-top: 20px;
    background-color: #14b8a6;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease;
  }

  .dmss-popup-box button:hover {
    background-color: #0f766e;
  }

  @keyframes dmssFadeIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }

  .form-extra {
    position: absolute;
    left: -9999px;
    top: -9999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }
  `;

  var html = `
  <form class="custom-form" id="leadForm" novalidate>

    <div class="form-extra" aria-hidden="true">
      <label for="website">Website</label>
      <input type="text" id="website" name="website" tabindex="-1" autocomplete="off">
    </div>

    <div class="wizard-progress">
      <div class="wizard-progress-track">
        <div class="wizard-progress-fill" id="progressFill"></div>
      </div>
      <div class="wizard-progress-label" id="progressLabel">Step 1 of 3</div>
    </div>

    <div class="form-step active" data-step="1">
      <h2 class="step-heading">Let's Get Started</h2>
      <p class="step-description">Tell us what brings you here and the role you're interested in.</p>
      <hr class="step-divider">

      <label for="visitorType" class="required">What Brings You Here Today?</label>
      <select id="visitorType" name="Visitor Type" required>
        <option value="" disabled hidden selected>Select an option</option>
        <option value="I’m a job seeker looking for a dental position.">
          I’m a job seeker looking for a dental position.
        </option>
        <option value="My office is looking to hire dental professionals.">
          My office is looking to hire dental professionals.
        </option>
      </select>

      <label for="position" class="required">Position Interested In</label>
      <select id="position" name="Position Interested In" required>
        <option value="" disabled hidden selected>Select a position</option>
        <option value="Front Office">Front Office</option>
        <option value="EFDA">EFDA</option>
        <option value="Dental Assistant">Dental Assistant</option>
        <option value="Dental Hygienist">Dental Hygienist</option>
        <option value="Dentist">Dentist</option>
        <option value="Dental Office">Dental Office</option>
      </select>
    </div>

    <div class="form-step" data-step="2">
      <h2 class="step-heading">How Can We Reach You?</h2>
      <p class="step-description">Share your contact info so we can follow up about next steps.</p>
      <hr class="step-divider">

      <label for="firstName" class="required">First Name</label>
      <input type="text" id="firstName" name="First Name" placeholder="John" required>

      <label for="lastName" class="required">Last Name</label>
      <input type="text" id="lastName" name="Last Name" placeholder="Smith" required>

      <label for="phone" class="required">Phone Number</label>
      <input type="tel" id="phone" name="Phone" placeholder="(317) 555-1234" required>

      <label for="email" class="required">Email</label>
      <input type="email" id="email" name="Email" placeholder="johnsmith@gmail.com" required>
    </div>

    <div class="form-step" data-step="3">
      <h2 class="step-heading">Share Your Address</h2>
      <p class="step-description">We'll connect you with the best opportunities in your area. You won't receive any marketing to your home.</p>
      <hr class="step-divider">

      <label for="country" class="required">Country</label>
      <select id="country" name="Country" required>
        <option value="USA" selected>USA</option>
      </select>

      <label for="address1" class="required">Address 1</label>
      <input type="text" id="address1" name="Address 1" placeholder="123 Monument Circle" required>

      <label for="address2">Address 2</label>
      <input type="text" id="address2" name="Address 2" placeholder="Apt 4B">

      <label for="city" class="required">City</label>
      <input type="text" id="city" name="City" placeholder="Indianapolis" required>

      <label for="state" class="required">State</label>
      <select id="state" name="State" required>
        <option value="" disabled hidden selected>Select your state</option>
        <option value="IN">IN - Indiana</option>
        <option disabled>──────────</option>
        <option value="AL">AL - Alabama</option>
        <option value="AK">AK - Alaska</option>
        <option value="AZ">AZ - Arizona</option>
        <option value="AR">AR - Arkansas</option>
        <option value="CA">CA - California</option>
        <option value="CO">CO - Colorado</option>
        <option value="CT">CT - Connecticut</option>
        <option value="DE">DE - Delaware</option>
        <option value="FL">FL - Florida</option>
        <option value="GA">GA - Georgia</option>
        <option value="HI">HI - Hawaii</option>
        <option value="ID">ID - Idaho</option>
        <option value="IL">IL - Illinois</option>
        <option value="IA">IA - Iowa</option>
        <option value="KS">KS - Kansas</option>
        <option value="KY">KY - Kentucky</option>
        <option value="LA">LA - Louisiana</option>
        <option value="ME">ME - Maine</option>
        <option value="MD">MD - Maryland</option>
        <option value="MA">MA - Massachusetts</option>
        <option value="MI">MI - Michigan</option>
        <option value="MN">MN - Minnesota</option>
        <option value="MS">MS - Mississippi</option>
        <option value="MO">MO - Missouri</option>
        <option value="MT">MT - Montana</option>
        <option value="NE">NE - Nebraska</option>
        <option value="NV">NV - Nevada</option>
        <option value="NH">NH - New Hampshire</option>
        <option value="NJ">NJ - New Jersey</option>
        <option value="NM">NM - New Mexico</option>
        <option value="NY">NY - New York</option>
        <option value="NC">NC - North Carolina</option>
        <option value="ND">ND - North Dakota</option>
        <option value="OH">OH - Ohio</option>
        <option value="OK">OK - Oklahoma</option>
        <option value="OR">OR - Oregon</option>
        <option value="PA">PA - Pennsylvania</option>
        <option value="RI">RI - Rhode Island</option>
        <option value="SC">SC - South Carolina</option>
        <option value="SD">SD - South Dakota</option>
        <option value="TN">TN - Tennessee</option>
        <option value="TX">TX - Texas</option>
        <option value="UT">UT - Utah</option>
        <option value="VT">VT - Vermont</option>
        <option value="VA">VA - Virginia</option>
        <option value="WA">WA - Washington</option>
        <option value="WV">WV - West Virginia</option>
        <option value="WI">WI - Wisconsin</option>
        <option value="WY">WY - Wyoming</option>
      </select>

      <label for="zip" class="required">Zip Code</label>
      <input type="text" id="zip" name="Zip Code" placeholder="46204" required>
    </div>

    <div class="wizard-nav">
      <button type="button" id="backBtn" class="btn btn-secondary" style="display:none;">Back</button>
      <button type="button" id="nextBtn" class="btn btn-primary">Next</button>
      <button type="submit" id="submitBtn" class="btn btn-primary" style="display:none;">Submit</button>
    </div>
  </form>

  <div class="dmss-popup-overlay" id="popupOverlay">
    <div class="dmss-popup-box">
      <h2>Thank You!</h2>
      <p>Your information has been submitted. We’ll be in touch soon.</p>
      <button id="closePopup">Close</button>
    </div>
  </div>
  `;

  function init(root) {
    var styleEl = document.createElement('style');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    root.innerHTML = html;

    var form = root.querySelector('#leadForm');
    var popupOverlay = root.querySelector('#popupOverlay');
    var closePopup = root.querySelector('#closePopup');
    var stateField = root.querySelector('#state');
    var positionField = root.querySelector('#position');
    var visitorTypeField = root.querySelector('#visitorType');
    var phoneField = root.querySelector('#phone');
    var firstNameField = root.querySelector('#firstName');
    var lastNameField = root.querySelector('#lastName');
    var emailField = root.querySelector('#email');
    var address1Field = root.querySelector('#address1');
    var cityField = root.querySelector('#city');
    var zipField = root.querySelector('#zip');

    var steps = Array.from(root.querySelectorAll('.form-step'));
    var totalSteps = steps.length;
    var currentStep = 1;

    var progressFill = root.querySelector('#progressFill');
    var progressLabel = root.querySelector('#progressLabel');
    var backBtn = root.querySelector('#backBtn');
    var nextBtn = root.querySelector('#nextBtn');
    var submitBtn = root.querySelector('#submitBtn');

    function showStep(step) {
      steps.forEach(function (s) {
        s.classList.toggle('active', parseInt(s.dataset.step, 10) === step);
      });
      progressFill.style.width = (step / totalSteps * 100) + '%';
      progressLabel.textContent = 'Step ' + step + ' of ' + totalSteps;
      backBtn.style.display = step === 1 ? 'none' : 'block';
      nextBtn.style.display = step === totalSteps ? 'none' : 'block';
      submitBtn.style.display = step === totalSteps ? 'block' : 'none';
    }

    function validateStep1() {
      if (!visitorTypeField.value) {
        alert('Please select what brings you here.');
        return false;
      }
      if (!positionField.value) {
        alert('Please select your position.');
        return false;
      }
      return true;
    }

    function validateStep2() {
      if (!firstNameField.value.trim()) {
        alert('Please enter your first name.');
        firstNameField.focus();
        return false;
      }
      if (!lastNameField.value.trim()) {
        alert('Please enter your last name.');
        lastNameField.focus();
        return false;
      }
      var rawPhone = phoneField.value.replace(/\D/g, '');
      if (rawPhone.length !== 10) {
        alert('Please enter a valid 10-digit phone number.');
        phoneField.focus();
        return false;
      }
      if (!emailField.value.trim()) {
        alert('Please enter your email.');
        emailField.focus();
        return false;
      }
      return true;
    }

    function validateStep3() {
      if (!address1Field.value.trim()) {
        alert('Please enter your address.');
        address1Field.focus();
        return false;
      }
      if (!cityField.value.trim()) {
        alert('Please enter your city.');
        cityField.focus();
        return false;
      }
      if (!stateField.value) {
        alert('Please select your state.');
        return false;
      }
      if (!zipField.value.trim()) {
        alert('Please enter your zip code.');
        zipField.focus();
        return false;
      }
      return true;
    }

    phoneField.addEventListener('input', function (e) {
      var input = e.target.value.replace(/\D/g, '');
      if (input.length > 0) input = '(' + input;
      if (input.length > 4) input = input.slice(0, 4) + ') ' + input.slice(4);
      if (input.length > 9) input = input.slice(0, 9) + '-' + input.slice(9, 13);
      e.target.value = input;
    });

    nextBtn.addEventListener('click', function () {
      var valid = currentStep === 1 ? validateStep1() : validateStep2();
      if (!valid) return;
      currentStep++;
      showStep(currentStep);
    });

    backBtn.addEventListener('click', function () {
      currentStep--;
      showStep(currentStep);
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!validateStep3()) return;

      fetch(FORM_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        body: new FormData(form)
      }).then(function () {
        popupOverlay.style.display = 'flex';
        form.reset();
        currentStep = 1;
        showStep(currentStep);
      }).catch(function (error) {
        console.error('Error!', error.message);
      });
    });

    closePopup.addEventListener('click', function () {
      popupOverlay.style.display = 'none';
    });

    popupOverlay.addEventListener('click', function (e) {
      if (e.target === popupOverlay) {
        popupOverlay.style.display = 'none';
      }
    });
  }

  function mount() {
    var root = document.getElementById(MOUNT_ID);
    if (!root) {
      console.error('DMSS lead form: no element with id="' + MOUNT_ID + '" found on this page.');
      return;
    }
    init(root);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
