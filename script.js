const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbw9ypaMqWv3uGieEZiLuQ86FT5I35PP88XfgJP_69GUXuzYHMIRynYUsLYqzwvACoij/exec";

// ── BOOKING FORM (index.html) ──────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", function () {
  const bookingForm = document.getElementById("bookingForm");
  if (bookingForm) {
    const responseText = document.getElementById("form-response");
    const pageLoadTime = Date.now();

    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const submitBtn = bookingForm.querySelector("button[type='submit']") || bookingForm.querySelector("button");
      responseText.innerText = "⏳ Submitting your booking...";
      responseText.style.color = "#555";
      submitBtn.disabled = true;
      submitBtn.innerText = "Sending...";

      const nameValue    = bookingForm.querySelector('[name="name"]').value.trim();
      const phoneValue   = bookingForm.querySelector('[name="phone"]').value.trim();
      const deviceValue  = bookingForm.querySelector('[name="device"]').value.trim();
      const messageValue = bookingForm.querySelector('[name="message"]').value.trim();
      const emailValue   = bookingForm.querySelector('[name="email"]').value.trim();
      const hpField      = bookingForm.querySelector('[name="_hp"]');
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

      fetch(WEB_APP_URL, { method: "POST", mode: "no-cors", body: formData })
        .then(() => {
          responseText.innerText = "✅ Booking submitted! Check your email for confirmation.";
          responseText.style.color = "green";
          bookingForm.reset();
        })
        .catch(() => {
          responseText.innerText = "❌ Something went wrong. Please try again.";
          responseText.style.color = "red";
        })
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.innerText = "Submit Booking";
        });
    });
  }

  // ── CONTACT FORM (contact.html) ──────────────────────────────────────────
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    const contactResponse = document.getElementById("contact-response");
    const pageLoadTime = Date.now();

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const submitBtn = contactForm.querySelector("button");
      contactResponse.innerText = "⏳ Sending your message...";
      contactResponse.style.color = "#555";
      submitBtn.disabled = true;
      submitBtn.innerText = "Sending...";

      const nameValue    = contactForm.querySelector('[name="name"]').value.trim();
      const emailValue   = contactForm.querySelector('[name="email"]').value.trim();
      const phoneValue   = contactForm.querySelector('[name="phone"]').value.trim();
      const messageValue = contactForm.querySelector('[name="message"]').value.trim();
      const hpField      = contactForm.querySelector('[name="_hp"]');
      const hpValue      = hpField ? hpField.value : "";

      const phonePattern = /^[0-9]{8,15}$/;
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!nameValue || !emailValue || !phoneValue || !messageValue) {
        contactResponse.innerText = "❌ Please fill in all fields.";
        contactResponse.style.color = "red";
        submitBtn.disabled = false;
        submitBtn.innerText = "Submit";
        return;
      }
      if (!phonePattern.test(phoneValue)) {
        contactResponse.innerText = "❌ Invalid phone number. Use 8–15 digits only.";
        contactResponse.style.color = "red";
        submitBtn.disabled = false;
        submitBtn.innerText = "Submit";
        return;
      }
      if (!emailPattern.test(emailValue)) {
        contactResponse.innerText = "❌ Please enter a valid email address.";
        contactResponse.style.color = "red";
        submitBtn.disabled = false;
        submitBtn.innerText = "Submit";
        return;
      }

      const formData = new FormData();
      formData.append("name",    nameValue);
      formData.append("phone",   phoneValue);
      formData.append("email",   emailValue);
      formData.append("message", messageValue);
      formData.append("device",  "");
      formData.append("remark",  "Contact Form");
      formData.append("_hp",     hpValue);
      formData.append("_ts",     pageLoadTime.toString());

      fetch(WEB_APP_URL, { method: "POST", mode: "no-cors", body: formData })
        .then(() => {
          contactResponse.innerText = "✅ Message sent! We'll get back to you soon.";
          contactResponse.style.color = "green";
          contactForm.reset();
        })
        .catch(() => {
          contactResponse.innerText = "❌ Something went wrong. Please try again.";
          contactResponse.style.color = "red";
        })
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.innerText = "Submit";
        });
    });
  }
});
