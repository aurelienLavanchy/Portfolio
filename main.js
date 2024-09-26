// Variables & Elements
const nameFieldLimit = 200;
const subjectFieldLimit = 150;
const messageFieldLimit = 500;

const messageForm = document.querySelector("#contact-form");
const emailButton = document.querySelector("#email");
const emailCopied = document.querySelector("#email-copied");
const emailSentMessage = document.querySelector("#message-sent");

// Logic
function checkFieldLimit(field, limit) {
  if (field > limit) {
    throw new Error(`Le nombre maximum de caractères est ${limit}`);
  } else if (field === 0) {
    throw new Error("Ce champ est obligatoire");
  } else {
    return 0;
  }
}

function resetFieldError(field, limit) {
  field.classList.remove("error");
  field.textContent = `Max. ${limit} caractères`;
}

function checkFieldError(field) {
  if (field.classList.contains("error")) {
    return true;
  } else {
    return false;
  }
}

function checkForErrors(field, fieldCheck, limit) {
  if (checkFieldError(field) && !fieldCheck) {
    resetFieldError(field, limit);
  }
}

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
    content: document.querySelector("#name").value.length,
    textContent: document.querySelector("#name").value,
    limit: nameFieldLimit,
  };
  const subjectField = {
    content: document.querySelector("#subject").value.length,
    textContent: document.querySelector("#subject").value,
    limit: subjectFieldLimit,
  };
  const messageField = {
    content: document.querySelector("#message").value.length,
    textContent: document.querySelector("#message").value,
    limit: messageFieldLimit,
  };

  const nameFieldInfo = document.querySelector(".field-info.name");
  const subjectFieldInfo = document.querySelector(".field-info.subject");
  const messageFieldInfo = document.querySelector(".field-info.message");

  let nameFieldCheckFailed = false;
  let subjectFieldCheckFailed = false;
  let messageFieldCheckFailed = false;

  try {
    checkFieldLimit(nameField.content, nameField.limit);
  } catch (error) {
    nameFieldInfo.textContent = error.message;
    nameFieldInfo.classList.add("error");
    nameFieldCheckFailed = true;
  }

  try {
    checkFieldLimit(subjectField.content, subjectField.limit);
  } catch (error) {
    subjectFieldInfo.textContent = error.message;
    subjectFieldInfo.classList.add("error");
    subjectFieldCheckFailed = true;
  }

  try {
    checkFieldLimit(messageField.content, messageField.limit);
  } catch (error) {
    messageFieldInfo.textContent = error.message;
    messageFieldInfo.classList.add("error");
    messageFieldCheckFailed = true;
  }

  const fields = [
    {
      field: nameFieldInfo,
      fieldCheck: nameFieldCheckFailed,
      limit: nameField.limit,
    },
    {
      field: subjectFieldInfo,
      fieldCheck: subjectFieldCheckFailed,
      limit: subjectField.limit,
    },
    {
      field: messageFieldInfo,
      fieldCheck: messageFieldCheckFailed,
      limit: messageField.limit,
    },
  ];

  for (const item of fields) {
    checkForErrors(item.field, item.fieldCheck, item.limit);
  }

  const allChecksPassed =
    !nameFieldCheckFailed &&
    !subjectFieldCheckFailed &&
    !messageFieldCheckFailed;

  if (allChecksPassed) {
    sendData(
      nameField.textContent,
      subjectField.textContent,
      messageField.textContent
    );
    resetForm();
    emailSentMessage.classList.remove("hidden");
    emailSentMessage.classList.add("shown");
    setTimeout(() => {
      emailSentMessage.classList.remove("shown");
      emailSentMessage.classList.add("hidden");
    }, 2400);
  }
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
