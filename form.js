// Variables & Elements
const nameFieldLimit = 200;
const subjectFieldLimit = 150;
const messageFieldLimit = 500;

const messageForm = document.querySelector("#contact-form");
const emailButton = document.querySelector("#email");
const emailCopied = document.querySelector("#email-copied");

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

function handleSubmit() {
  const nameField = {
    content: document.querySelector("#name").value.length,
    limit: nameFieldLimit,
  };
  const subjectField = {
    content: document.querySelector("#subject").value.length,
    limit: subjectFieldLimit,
  };
  const messageField = {
    content: document.querySelector("#message").value.length,
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
}

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  handleSubmit();
});

emailButton.addEventListener("click", () => {
  // copy email to clipboard
  navigator.clipboard
    .writeText("aurelien.lavanchy@gmailcom")
    .then(() => {
      emailCopied.classList.remove("hidden");
      setTimeout(() => {
        emailCopied.classList.add("hidden");
      }, 2400);
    })
    .catch((err) => {
      alert("Error: " + err);
    });
});
