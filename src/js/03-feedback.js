import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onInput, 500));
const STORAGE_KEY = 'feedback-form-state';

populateData();

function onInput() {
  const data = {
    email: form.elements.email.value,
    message: form.elements.message.value,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function onFormSubmit(e) {
  e.preventDefault();
  const {
    elements: { email, message },
  } = e.currentTarget;
  const data = {
    email: email.value,
    message: message.value,
  };
  console.log(data);
  localStorage.removeItem(STORAGE_KEY);
  return form.reset();
}

function populateData() {
  const saveMassege = localStorage.getItem(STORAGE_KEY);

  if (saveMassege) {
    const { email, message } = JSON.parse(saveMassege);
    form.elements.email.value = email;
    form.elements.message.value = message;
  }
}

// Виконуй це завдання у файлах 03-feedback.html і 03-feedback.js. Розбий його на декілька підзавдань:

// Відстежуй на формі подію input, і щоразу записуй у локальне сховище об'єкт з полями email і message, у яких зберігай поточні значення полів форми. Нехай ключем для сховища буде рядок "feedback-form-state".
// Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані, заповнюй ними поля форми. В іншому випадку поля повинні бути порожніми.
// Під час сабміту форми очищуй сховище і поля форми, а також виводь у консоль об'єкт з полями email, message та їхніми поточними значеннями.
// Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд. Для цього додай до проекту і використовуй бібліотеку lodash.throttle.
