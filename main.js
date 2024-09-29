// Variables & Elements
const nameFieldLimit = 200;
const subjectFieldLimit = 150;
const messageFieldLimit = 500;

const messageForm = document.querySelector("#contact-form");
const emailButton = document.querySelector("#email");
const emailCopied = document.querySelector("#email-copied");
const emailSentMessage = document.querySelector("#message-sent");

// Logic
async function sendData(name, subject, message) {
  const formData = new FormData();

  formData.append("name", name);
  formData.append("subject", subject);
  formData.append("message", message);

  try {
    await fetch("https://usebasin.com/f/75000cad16f9", {
      method: "POST",
      body: formData,
    });
  } catch (error) {
    emailSentMessage.classList.remove("hidden");
    emailSentMessage.classList.add("shown");
    emailSentMessage.classList.add("error");
    emailSentMessage.textContent = "Une erreur est survenue...";

    setTimeout(() => {
      emailSentMessage.classList.remove("shown");
      emailSentMessage.classList.remove("error");
      emailSentMessage.classList.add("hidden");
      emailSentMessage.textContent = "Message envoyé !";
    }, 4000);
  }
}

function resetForm() {
  messageForm.reset();
}

function handleSubmit() {
  const nameField = {
    length: document.querySelector("#name").value.length,
    value: document.querySelector("#name").value,
    limit: nameFieldLimit,
  };
  const subjectField = {
    length: document.querySelector("#subject").value.length,
    value: document.querySelector("#subject").value,
    limit: subjectFieldLimit,
  };
  const messageField = {
    length: document.querySelector("#message").value.length,
    value: document.querySelector("#message").value,
    limit: messageFieldLimit,
  };

  sendData(nameField.value, subjectField.value, messageField.value);

  resetForm();

  emailSentMessage.classList.remove("hidden");
  emailSentMessage.classList.add("shown");
  setTimeout(() => {
    emailSentMessage.classList.remove("shown");
    emailSentMessage.classList.add("hidden");
  }, 2400);
}

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  handleSubmit();
});

emailButton.addEventListener("click", () => {
  navigator.clipboard.writeText("lavanchy.aurelien@gmailcom").then(() => {
    emailCopied.classList.remove("hidden");
    setTimeout(() => {
      emailCopied.classList.add("hidden");
    }, 2400);
  });
});
