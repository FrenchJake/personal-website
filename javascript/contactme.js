function sendMail() {
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;
  const statusEl = document.getElementById("form-status");

  const params = { email, subject, message };

  const serviceID = "service_1232728";
  const templateID = "template_y3hoejg";

  emailjs.send(serviceID, templateID, params)
    .then(res => {
      document.getElementById("email").value = "";
      document.getElementById("subject").value = "";
      document.getElementById("message").value = "";

      statusEl.textContent = "Your message has been sent successfully!";
      statusEl.style.color = "green";
    })
    .catch(err => {
      console.error("EmailJS Error:", err);
      statusEl.textContent = "Failed to send message. Please try again.";
      statusEl.style.color = "red";
    });
}
