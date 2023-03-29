// import Choices from 'choices.js';

// массив вариантов типов контактов
const contactTypeArray = (revealingListSelect) => {
  const typeArray = ['Телефон', 'Доп.телефон', 'Email', 'Vk', 'Facebook'];

  return typeArray.forEach((type) => {
    const option = document.createElement('option');
    option.value = type;
    option.text = type;
    revealingListSelect.add(option);
  });
};

// создание списка типов контактов
export const addAnItem = (box) => {
  // создаём пункт (li)
  const liItem = document.createElement('li');
  liItem.classList.add('box-item');
  box.append(liItem);

  // добавляем select и option с вариантами типа контакта
  const revealingListSelect = document.createElement('select');
  revealingListSelect.classList.add('select-сustom');

  liItem.appendChild(revealingListSelect);
  contactTypeArray(revealingListSelect);

  // создание input - поле ввода контакта
  const input = document.createElement('input');
  input.classList.add('input-contact');
  input.setAttribute('type', 'text');
  input.setAttribute('placeholder', 'Введите данные контакта');

  liItem.append(input);

  // создание кнопки удаления
  const btnDelet = document.createElement('button');
  btnDelet.classList.add('delet-btn');
  btnDelet.innerHTML = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M6 0C2.682 0 0 2.682 0 6C0 9.318 2.682 12 6 12C9.318 12 12 9.318 12 6C12 2.682 9.318 0 6 0ZM6 10.8C3.354 10.8 1.2 8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8 6C10.8 8.646 8.646 10.8 6 10.8ZM8.154 3L6 5.154L3.846 3L3 3.846L5.154 6L3 8.154L3.846 9L6 6.846L8.154 9L9 8.154L6.846 6L9 3.846L8.154 3Z" fill="#B0B0B0"/></svg>';

  liItem.append(btnDelet);

  // кнопка удаления li
  btnDelet.addEventListener('click', (e) => {
    e.preventDefault();
    box.removeChild(liItem);
  });

  const choises = new Choices(revealingListSelect, {
    searchEnabled: false,
    itemSelectText: '',
  });

  const btnAddContact = document.querySelector('.add-contact');
  if (box.childNodes.length > 9) {
    btnAddContact.remove(btnAddContact);
  }
  return liItem;
};
