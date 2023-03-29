import { createClients, loadClients } from './api.js';
import { createClientsItem } from './clientItem.js';
import { addAnItem } from './selectContactOption.js';
import { filterClients } from './filter.js';
import { getOrder, sortClients } from './sorting.js';
import { addModalWindow } from './modalWindowAdd.js';

// создание заголовка
const container = document.querySelector('.main-content');
const title = document.createElement('h1');
title.textContent = 'Клиенты';
container.prepend(title);

// тело списка
const renderClientsTable = async (clients) => {
  let newClients = clients;
  if (newClients === undefined) {
    newClients = await loadClients();
  }
  const table = document.querySelector('table');
  const tableBody = document.createElement('tbody');
  tableBody.classList.add('table__body');
  table.append(tableBody);
  newClients.forEach((client) => tableBody.append(createClientsItem(client)));
  tippy('[data-tippy-content]', {
    duration: 300,
    allowHTML: false,
  });
};

export const rerenderTable = () => {
  document.querySelector('tbody').remove('tbody');
  renderClientsTable();
};

const closeModalWindow = () => {
  document.querySelector('.data-update').remove('.data-update');
};

export const closeFormWithinBoundaries = (section, deleteModalWindow) => {
  section.addEventListener('click', (e) => {
    const form = document.querySelector('.form-container');
    const withinBoundaries = e.composedPath().includes(form);

    if (!withinBoundaries) {
      deleteModalWindow();
    }
  });
};

document.querySelector('.new-client').addEventListener('click', () => {
  addModalWindow();

  // сохранение в таблицу
  document.querySelector('.save-btn').addEventListener('click', async (e) => {
    e.preventDefault();

    const form = document.querySelector('.form');
    const surname = form.querySelector('.surname');
    const name = form.querySelector('.name');
    const lastname = form.querySelector('.lastname');
    const contacts = form.querySelectorAll('.box-item');

    const client = {
      surname: surname.value,
      name: name.value,
      lastName: lastname.value,
      contacts: [...contacts].map((item) => ({
        type: item.querySelector('option').value,
        value: item.querySelector('.input-contact').value,
      })),
    };

    await createClients(client);

    rerenderTable();

    // добавление списка контактов при нажатии на кнопку
    const boxList = document.querySelector('.box-list');
    addAnItem(boxList);

    closeModalWindow();
  });

  // закрытие модального окна
  document.querySelector('.btn-close').addEventListener('click', () => {
    closeModalWindow();
  });

  document.querySelector('.delet-client').addEventListener('click', () => {
    closeModalWindow();
  });

  // событие закрытие окна за границами модального окна
  const section = document.querySelector('.data-update');
  closeFormWithinBoundaries(section, closeModalWindow);
});

const sortingName = document.querySelector('.table-header');

sortingName.addEventListener('click', async (e) => {
  let clients = await loadClients();
  const currentOrder = getOrder(e.target);
  console.log(currentOrder);
  const key = e.target.getAttribute('name');
  clients = sortClients(clients, key, currentOrder);

  document.querySelector('tbody').remove('tbody');
  renderClientsTable(clients);
});

renderClientsTable();

// примерная функции вида стрелочки при нажатии на колонку
const iconTransform = (element) => {
  element.addEventListener('click', () => {
    element.classList.add('head-identifier--active');
  });
};

iconTransform(document.querySelector('.sort-btn'));

filterClients();
