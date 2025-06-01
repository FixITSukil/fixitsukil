// Ensure the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("bookingForm");
  const responseText = document.getElementById("form-response");

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
    const remarkValue  = ""; // Keep blank for now; you can add a remark input later if needed

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

    // 6) Build FormData (no custom headers → no preflight)
    const formData = new FormData();
    formData.append("name",    nameValue);
    formData.append("phone",   phoneValue);
    formData.append("device",  deviceValue);
    formData.append("message", messageValue);
    formData.append("email",   emailValue);
    formData.append("remark",  remarkValue);

    // 7) Your NEW Web App URL (ensure it matches exactly the deployed URL)
    const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbz9ksvhSp3tc7at2CaMI7ViOgsK5Qf9pOjOqsP6XOJ8w8-qdGRXWADj1Dtijd6muJSD/exec";

    // 8) Send the POST request in no-cors mode
    fetch(WEB_APP_URL, {
      method: "POST",
      mode: "no-cors",
      body: formData
    })
      .then(() => {
        // In no-cors mode we cannot read the server’s JSON response.
        // Assume success if no network error occurred.
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
