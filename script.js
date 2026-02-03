document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("astro-form");
  const formMessages = document.getElementById("form-messages");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearErrors();
    formMessages.textContent = "";
    formMessages.className = "form-messages";

    const data = getFormData();
    const validationErrors = validate(data);

    if (Object.keys(validationErrors).length > 0) {
      showErrors(validationErrors);
      formMessages.textContent = "Please correct the highlighted fields.";
      formMessages.classList.add("error");
      return;
    }

    // SEND TO N8N
    try {
      const webhookUrl = "https://ramsankar.app.n8n.cloud/webhook/astro-form";

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Webhook failed");

      formMessages.textContent = "Success! You’ll receive your AI prediction by email shortly.";
      formMessages.classList.add("success");

    } catch (error) {
      console.log(error);
      formMessages.textContent = "Something went wrong. Please try again.";
      formMessages.classList.add("error");
    }
  });

  function getFormData() {
    return {
      fullName: form.fullName.value.trim(),
      dob: form.dob.value,
      tob: form.tob.value,
      pob: form.pob.value.trim(),
      gender: form.gender.value,
      focus: form.focus.value,
      email: form.email.value.trim(),
      notes: form.notes.value.trim(),
      agree: form.agree.checked
    };
  }

  function validate(data) {
    const errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!data.fullName) errors.fullName = "Full name is required.";
    if (!data.dob) errors.dob = "Date of birth is required.";
    if (!data.tob) errors.tob = "Time of birth is required.";
    if (!data.pob) errors.pob = "Place of birth is required.";
    if (!data.gender) errors.gender = "Please select your gender.";
    if (!data.focus) errors.focus = "Please select a focus area.";
    if (!emailPattern.test(data.email)) errors.email = "Enter a valid email.";
    if (!data.notes) errors.notes = "Please ask your question.";
    if (!data.agree) errors.agree = "Please agree to continue.";

    return errors;
  }

  function showErrors(errors) {
    Object.entries(errors).forEach(([field, msg]) => {
      const element = document.querySelector(`[name="${field}"]`);
      if (element) element.classList.add("error");

      const messageEl = document.querySelector(`.error-message[data-error-for="${field}"]`);
      if (messageEl) messageEl.textContent = msg;
    });
  }

  function clearErrors() {
    form.querySelectorAll("input, select, textarea").forEach(el => el.classList.remove("error"));
    form.querySelectorAll(".error-message").forEach(el => el.textContent = "");
  }

});


