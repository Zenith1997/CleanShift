document.addEventListener("DOMContentLoaded", function () {
  setActiveNavigation();
  setupGreeting();
  setupMobileMenu();
  setupAccordion();
  setupServiceSearch();
  setupFormValidation();
});

function setActiveNavigation() {
  const page = document.body.dataset.page;
  document.querySelectorAll(".nav-links a").forEach(function (link) {
    if (link.dataset.page === page) {
      link.classList.add("active");
    }
  });
}

function setupGreeting() {
  const greeting = document.getElementById("greeting");
  if (!greeting) return;

  const hour = new Date().getHours();
  let message = "Welcome to CleanFit Solutions";

  if (hour < 12) {
    message = "Good morning — welcome to CleanFit Solutions";
  } else if (hour < 18) {
    message = "Good afternoon — welcome to CleanFit Solutions";
  } else {
    message = "Good evening — welcome to CleanFit Solutions";
  }

  greeting.textContent = message;
}

function setupMobileMenu() {
  const button = document.getElementById("menuToggle");
  const nav = document.getElementById("navLinks");
  if (!button || !nav) return;

  button.addEventListener("click", function () {
    nav.classList.toggle("open");
    const isOpen = nav.classList.contains("open");
    button.setAttribute("aria-expanded", isOpen.toString());
  });
}

function setupAccordion() {
  const buttons = document.querySelectorAll(".accordion-btn");
  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      const panel = button.nextElementSibling;
      if (panel) {
        panel.classList.toggle("open");
      }
    });
  });
}

function setupServiceSearch() {
  const input = document.getElementById("serviceKeyword");
  const cards = document.querySelectorAll(".service-card");
  const message = document.getElementById("serviceSearchMessage");
  if (!input || cards.length === 0) return;

  input.addEventListener("input", function () {
    const keyword = input.value.trim().toLowerCase();
    let visibleCount = 0;

    cards.forEach(function (card) {
      const searchableText =
        card.dataset.service.toLowerCase() +
        " " +
        card.textContent.toLowerCase();
      const isMatch = searchableText.includes(keyword);
      card.style.display = isMatch ? "block" : "none";
      if (isMatch) visibleCount++;
    });

    if (message) {
      message.textContent =
        keyword === ""
          ? "Showing all services."
          : visibleCount + " matching service(s) found.";
    }
  });
}

function setupFormValidation() {
  const form = document.getElementById("queryForm");
  if (!form) return;

  const messageInput = document.getElementById("message");
  const counter = document.getElementById("messageCounter");

  if (messageInput && counter) {
    messageInput.addEventListener("input", function () {
      const maxLength = 250;
      const remaining = maxLength - messageInput.value.length;
      counter.textContent = remaining;
    });
  }

  form.addEventListener("reset", function () {
    setTimeout(clearValidationMessages, 0);
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    clearValidationMessages();

    const errors = validateForm();

    if (errors.length > 0) {
      showFormMessage(
        "Please fix the highlighted fields before submitting.",
        "error",
      );
      return;
    }

    showFormMessage(
      "Thank you. Your draft query has passed validation and is ready for processing.",
      "success",
    );
    form.reset();

    if (counter) {
      counter.textContent = "250";
    }
  });
}

function validateForm() {
  const errors = [];

  const name = document.getElementById("name");
  const contactPerson = document.getElementById("contactPerson");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const message = document.getElementById("message");

  if (name && name.value.trim() === "") {
    addFieldError(name, "nameError", "Name or business name is required.");
    errors.push("name");
  }

  if (contactPerson && contactPerson.value.trim() === "") {
    addFieldError(
      contactPerson,
      "contactPersonError",
      "Contact person is required.",
    );
    errors.push("contactPerson");
  }

  if (email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() === "" || !emailPattern.test(email.value.trim())) {
      addFieldError(
        email,
        "emailError",
        "Enter a valid email address, for example manager@example.com.",
      );
      errors.push("email");
    }
  }

  if (phone) {
    const phonePattern = /^\d{8,10}$/;
    if (phone.value.trim() === "" || !phonePattern.test(phone.value.trim())) {
      addFieldError(
        phone,
        "phoneError",
        "Phone number must contain digits only and be 8 to 10 characters long.",
      );
      errors.push("phone");
    }
  }

  if (message && message.value.trim().length < 10) {
    addFieldError(
      message,
      "messageError",
      "Please enter a query message with at least 10 characters.",
    );
    errors.push("message");
  }

  return errors;
}

function addFieldError(input, errorId, message) {
  input.classList.add("error");
  const errorElement = document.getElementById(errorId);
  if (errorElement) {
    errorElement.textContent = message;
  }
}

function clearValidationMessages() {
  document.querySelectorAll(".field-error").forEach(function (element) {
    element.textContent = "";
  });

  document.querySelectorAll(".error").forEach(function (element) {
    element.classList.remove("error");
  });

  const formMessage = document.getElementById("formMessage");
  if (formMessage) {
    formMessage.className = "alert";
    formMessage.textContent = "";
  }
}

function showFormMessage(message, type) {
  const formMessage = document.getElementById("formMessage");
  if (!formMessage) return;

  formMessage.className = "alert " + type;
  formMessage.textContent = message;
}
