// Ensure the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("bookingForm");
  const responseText = document.getElementById("form-response");

  // ── BOT PROTECTION: Record page load time ──────────────────────────────
  // This timestamp is sent with the form. If submitted in under 3 seconds,
  // the Apps Script will reject it as a bot.
  const pageLoadTime = Date.now();

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const submitBtn = form.querySelector("button");
    responseText.innerText = "⏳ Submitting your booking...";
    responseText.style.color = "#555";
    submitBtn.disabled = true;
    submitBtn.innerText = "Sending...";

    // 1) Read & trim values from the form
    const nameValue    = form.name.value.trim();
    const phoneValue   = form.phone.value.trim();
    const deviceValue  = form.device.value.trim();
    const messageValue = form.message.value.trim();
    const emailValue   = form.email.value.trim();
    const remarkValue  = "";

    // 2) Basic validation patterns
    const phonePattern = /^[0-9]{8,15}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 3) Check required fields
    if (!nameValue || !phoneValue || !deviceValue || !messageValue || !emailValue) {
      responseText.innerText = "❌ Please fill in all fields.";
      responseText.style.color = "red";
      submitBtn.disabled = false;
      submitBtn.innerText = "Submit Booking";
      return;
    }

    // 4) Validate phone
    if (!phonePattern.test(phoneValue)) {
      responseText.innerText = "❌ Invalid phone number. Use 8–15 digits only.";
      responseText.style.color = "red";
      submitBtn.disabled = false;
      submitBtn.innerText = "Submit Booking";
      return;
    }

    // 5) Validate email
    if (!emailPattern.test(emailValue)) {
      responseText.innerText = "❌ Please enter a valid email address.";
      responseText.style.color = "red";
      submitBtn.disabled = false;
      submitBtn.innerText = "Submit Booking";
      return;
    }

    // 6) Build FormData
    const formData = new FormData();
    formData.append("name",    nameValue);
    formData.append("phone",   phoneValue);
    formData.append("device",  deviceValue);
    formData.append("message", messageValue);
    formData.append("email",   emailValue);
    formData.append("remark",  remarkValue);

    // ── BOT PROTECTION: Append honeypot and timestamp ──────────────────
    // _hp: honeypot field -- humans leave it blank, bots fill it
    // _ts: page load timestamp -- Apps Script checks time elapsed
    formData.append("_hp", form._hp ? form._hp.value : "");
    formData.append("_ts", pageLoadTime.toString());

    // 7) Web App URL
    const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbw9ypaMqWv3uGieEZiLuQ86FT5I35PP88XfgJP_69GUXuzYHMIRynYUsLYqzwvACoij/exec";

    // 8) Send POST request
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
        console.error("❌ Fetch error:", err);
        responseText.innerText = "❌ Something went wrong. Please try again.";
        responseText.style.color = "red";
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerText = "Submit Booking";
      });
  });
});
