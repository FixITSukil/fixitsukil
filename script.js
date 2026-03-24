document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("bookingForm");
  const responseText = document.getElementById("form-response");

  // Record page load time for bot timestamp check
  const pageLoadTime = Date.now();

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const submitBtn = form.querySelector("button[type='submit']");
    responseText.innerText = "⏳ Submitting your booking...";
    responseText.style.color = "#555";
    submitBtn.disabled = true;
    submitBtn.innerText = "Sending...";

    // Read values using querySelector to avoid form.name JS conflict
    const nameValue    = form.querySelector('[name="name"]').value.trim();
    const phoneValue   = form.querySelector('[name="phone"]').value.trim();
    const deviceValue  = form.querySelector('[name="device"]').value.trim();
    const messageValue = form.querySelector('[name="message"]').value.trim();
    const emailValue   = form.querySelector('[name="email"]').value.trim();
    const hpField      = form.querySelector('[name="_hp"]');
    const hpValue      = hpField ? hpField.value : "";

    const phonePattern = /^[0-9]{8,15}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameValue || !phoneValue || !deviceValue || !messageValue || !emailValue) {
      responseText.innerText = "❌ Please fill in all fields.";
      responseText.style.color = "red";
      submitBtn.disabled = false;
      submitBtn.innerText = "Submit Booking";
      return;
    }

    if (!phonePattern.test(phoneValue)) {
      responseText.innerText = "❌ Invalid phone number. Use 8–15 digits only.";
      responseText.style.color = "red";
      submitBtn.disabled = false;
      submitBtn.innerText = "Submit Booking";
      return;
    }

    if (!emailPattern.test(emailValue)) {
      responseText.innerText = "❌ Please enter a valid email address.";
      responseText.style.color = "red";
      submitBtn.disabled = false;
      submitBtn.innerText = "Submit Booking";
      return;
    }

    const formData = new FormData();
    formData.append("name",    nameValue);
    formData.append("phone",   phoneValue);
    formData.append("device",  deviceValue);
    formData.append("message", messageValue);
    formData.append("email",   emailValue);
    formData.append("remark",  "");
    formData.append("_hp",     hpValue);
    formData.append("_ts",     pageLoadTime.toString());

    const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbw9ypaMqWv3uGieEZiLuQ86FT5I35PP88XfgJP_69GUXuzYHMIRynYUsLYqzwvACoij/exec";

    fetch(WEB_APP_URL, {
      method: "POST",
      mode: "no-cors",
      body: formData
    })
      .then(() => {
        responseText.innerText = "✅ Booking submitted! Check your email for confirmation.";
        responseText.style.color = "green";
        form.reset();
      })
      .catch(err => {
        console.error("Fetch error:", err);
        responseText.innerText = "❌ Something went wrong. Please try again.";
        responseText.style.color = "red";
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerText = "Submit Booking";
      });
  });
});
