import { addAnItem } from './selectContactOption.js';

export const createModalWindow = () => {
  // создание секции
  const mainContent = document.querySelector('.main-content');
  const section = document.createElement('section');
  section.classList.add('data-update');
  mainContent.after(section);

  // создание div-контейнер
  const formContainer = document.createElement('div');
  formContainer.classList.add('form-container');
  section.append(formContainer);

  // создание form в div-контейнер
  const form = document.createElement('form');
  form.classList.add('form');
  form.setAttribute('method', 'post');
  form.id = 'form';
  formContainer.append(form);

  // создание btn в div-контейнер
  const btnClose = document.createElement('button');
  btnClose.classList.add('btn-close');
  btnClose.innerHTML = '<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.2332 1.73333L15.2665 0.766664L8.49985 7.53336L1.73318 0.766696L0.766515 1.73336L7.53318 8.50003L0.766542 15.2667L1.73321 16.2333L8.49985 9.46669L15.2665 16.2334L16.2332 15.2667L9.46651 8.50003L16.2332 1.73333Z" fill="#B0B0B0" /></svg>';
  formContainer.append(btnClose);

  // блок с input
  const formInput = document.createElement('div');
  formInput.classList.add('form-input');
  form.append(formInput);

  // label
  const label = document.createElement('label');
  label.setAttribute('for', 'title');
  formInput.append(label);

  // создание заголовка
  const title = document.createElement('h2');
  title.id = 'title';
  title.textContent = 'Изменить данные';
  label.append(title);

  // создание <p> - id выбранного клиента
  const paragraph = document.createElement('p');
  paragraph.classList.add('client-id');
  paragraph.textContent = '';
  label.append(paragraph);

  // input surname
  const divBoxOne = document.createElement('div');
  divBoxOne.classList.add('box');
  formInput.append(divBoxOne);

  const labelSurname = document.createElement('label');
  labelSurname.classList.add('lab-edit');
  labelSurname.setAttribute('for', 'edit-surname');
  labelSurname.textContent = 'Фамилия*';
  divBoxOne.append(labelSurname);

  const inputSurname = document.createElement('input');
  inputSurname.classList.add('input', 'edit-surname');
  inputSurname.setAttribute('name', 'edit-surname');
  inputSurname.setAttribute('type', 'text');
  inputSurname.setAttribute('required', '');
  divBoxOne.append(inputSurname);

  // input name
  const divBoxTwo = document.createElement('div');
  divBoxTwo.classList.add('box');
  formInput.append(divBoxTwo);

  const labelName = document.createElement('label');
  labelName.classList.add('lab-edit');
  labelName.setAttribute('for', 'edit-name');
  labelName.textContent = 'Имя*';
  divBoxTwo.append(labelName);

  const inputName = document.createElement('input');
  inputName.classList.add('input', 'edit-name');
  inputName.setAttribute('name', 'edit-name');
  inputName.setAttribute('type', 'text');
  inputName.setAttribute('required', '');
  divBoxTwo.append(inputName);

  // input lastname
  const divBoxThree = document.createElement('div');
  divBoxThree.classList.add('box', 'li');
  formInput.append(divBoxThree);

  const labelLastname = document.createElement('label');
  labelLastname.classList.add('lab-edit');
  labelLastname.setAttribute('for', 'edit-lastname');
  labelLastname.textContent = 'Отчество';
  divBoxThree.append(labelLastname);

  const inputLastname = document.createElement('input');
  inputLastname.classList.add('input', 'edit-lastname');
  inputLastname.setAttribute('name', 'edit-lastname');
  inputLastname.setAttribute('type', 'text');
  divBoxThree.append(inputLastname);

  // блок контактов
  const divBoxContact = document.createElement('div');
  divBoxContact.classList.add('box-contact');
  form.append(divBoxContact);

  const listContacts = document.createElement('ul');
  listContacts.classList.add('box-list');
  divBoxContact.append(listContacts);

  const btnAddContact = document.createElement('button');
  btnAddContact.classList.add('add-contact');
  btnAddContact.innerHTML = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.99998 3.66659C6.63331 3.66659 6.33331 3.96659 6.33331 4.33325V6.33325H4.33331C3.96665 6.33325 3.66665 6.63325 3.66665 6.99992C3.66665 7.36659 3.96665 7.66659 4.33331 7.66659H6.33331V9.66659C6.33331 10.0333 6.63331 10.3333 6.99998 10.3333C7.36665 10.3333 7.66665 10.0333 7.66665 9.66659V7.66659H9.66665C10.0333 7.66659 10.3333 7.36659 10.3333 6.99992C10.3333 6.63325 10.0333 6.33325 9.66665 6.33325H7.66665V4.33325C7.66665 3.96659 7.36665 3.66659 6.99998 3.66659ZM6.99998 0.333252C3.31998 0.333252 0.333313 3.31992 0.333313 6.99992C0.333313 10.6799 3.31998 13.6666 6.99998 13.6666C10.68 13.6666 13.6666 10.6799 13.6666 6.99992C13.6666 3.31992 10.68 0.333252 6.99998 0.333252ZM6.99998 12.3333C4.05998 12.3333 1.66665 9.93992 1.66665 6.99992C1.66665 4.05992 4.05998 1.66659 6.99998 1.66659C9.93998 1.66659 12.3333 4.05992 12.3333 6.99992C12.3333 9.93992 9.93998 12.3333 6.99998 12.3333Z" fill="#9873FF"/></svg>  Добавить контакт';
  divBoxContact.append(btnAddContact);

  btnAddContact.addEventListener('click', (e) => {
    e.preventDefault();
    addAnItem(listContacts);
  });

  const buttons = document.createElement('div');
  buttons.classList.add('buttons');
  form.append(buttons);

  const buttonSave = document.createElement('button');
  buttonSave.classList.add('save-btn');
  buttonSave.textContent = 'Сохранить';
  buttons.append(buttonSave);

  const linkDelete = document.createElement('a');
  linkDelete.classList.add('delet-client');
  linkDelete.setAttribute('src', '#');
  linkDelete.textContent = 'Удалить клиента';
  buttons.append(linkDelete);

  return section;
};
