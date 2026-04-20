document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("queryForm");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    const errors = [];
    const nameInput = document.getElementById("name");
    const contactPersonInput = document.getElementById("contactPerson");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const messageInput = document.getElementById("message");
    const alertBox = document.getElementById("errorBox");

    const name = nameInput ? nameInput.value.trim() : "";
    const contactPerson = contactPersonInput
      ? contactPersonInput.value.trim()
      : "";
    const email = emailInput ? emailInput.value.trim() : "";
    const phone = phoneInput ? phoneInput.value.trim() : "";
    const message = messageInput ? messageInput.value.trim() : "";

    if (name === "") errors.push("Name is required.");
    if (contactPersonInput && contactPerson === "")
      errors.push("Contact person is required.");
    if (email === "" || !email.includes("@"))
      errors.push("A valid email address is required.");
    if (phone === "" || !/^\d{8,10}$/.test(phone))
      errors.push("Phone number must contain 8 to 10 digits only.");
    if (message === "")
      errors.push("Please enter your query or feedback message.");

    if (errors.length > 0) {
      event.preventDefault();
      if (alertBox) {
        alertBox.style.display = "block";
        alertBox.innerHTML =
          "<strong>Please fix the following:</strong><ul><li>" +
          errors.join("</li><li>") +
          "</li></ul>";
      }
    } else {
      event.preventDefault();
      if (alertBox) {
        alertBox.style.display = "none";
        alertBox.innerHTML = "";
      }
      alert("Draft site only: form submission is disabled for Task 5.2D.");
    }
  });
});
