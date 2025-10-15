
// contact.js

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      formStatus.textContent = "⚠️ Please fill in all fields.";
      formStatus.style.color = "red";
      return;
    }

    formStatus.textContent = "⏳ Sending your message...";
    formStatus.style.color = "gray";

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        contactForm.innerHTML = `
          <div class="success-message" style="text-align:center;">
            <h3>✅ Thank you!</h3>
            <p>Your message has been sent successfully.</p>
            <button id="newMessageBtn" class="btn" style="margin-top:10px;">Send Another Message</button>
          </div>
        `;

        document.getElementById("newMessageBtn").addEventListener("click", () => {
          window.location.reload();
        });
      } else {
        throw new Error("Server error");
      }
    } catch (error) {
      console.error(error);
      formStatus.textContent = "❌ Something went wrong. Please try again later.";
      formStatus.style.color = "red";
    }
  });
});



