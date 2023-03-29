import { updateClients } from './api.js';
import { createIconContact } from './clientContact.js';
import { createModalWindowDeleteClient, deleteClientId } from './deleteClient.js';
import { closeFormWithinBoundaries, rerenderTable } from './main.js';
import { createModalWindow } from './modalWindowUpdate.js';
import { addAnItem } from './selectContactOption.js';

const createTime = (date) => {
  const hours = new Date(date).getHours();
  const minutes = new Date(date).getMinutes();

  if (`${minutes}`.length < 2) {
    return `${hours}:0${minutes}`;
  }

  return `${hours}:${minutes}`;
};

// формат даты и время создания
const createDate = (updatedAt) => new Date(updatedAt).toLocaleDateString('ru-RU');

const dateSpanWrapper = (date) => `${createDate(date)} <span class="span-color">${createTime(date)}</span>`;

// создание клиента
export const createClientsItem = (client) => {
  const tr = document.createElement('tr');
  tr.classList.add('clients');
  tr.id = client.id;

  const tdId = document.createElement('td');
  tdId.classList.add('id-client');
  tdId.textContent = client.id;
  tr.append(tdId);

  const tdName = document.createElement('td');
  tdName.classList.add('name-client');
  tdName.innerHTML = `<p class="name-client">${client.surname} ${client.name} ${client.lastName}</p>`;
  tr.append(tdName);

  const tdCreatedAt = document.createElement('td');
  tdCreatedAt.classList.add('creation-date');
  tdCreatedAt.innerHTML = dateSpanWrapper(client.createdAt);
  tr.append(tdCreatedAt);

  const tdUpdatedAt = document.createElement('td');
  tdUpdatedAt.classList.add('head-edited');
  tdUpdatedAt.innerHTML = dateSpanWrapper(client.updatedAt);
  tr.append(tdUpdatedAt);

  // добавление значков в раздел контакты
  const tdContacts = document.createElement('td');
  tdContacts.classList.add('contacts-blog');
  const ul = document.createElement('ul');
  ul.classList.add('list-icon');

  tr.append(tdContacts);
  tdContacts.append(ul);
  createIconContact(client, ul);

  const tdEdit = document.createElement('td');
  const btnEdit = document.createElement('button');
  btnEdit.classList.add('edit');
  tdEdit.classList.add('delete-edit');
  btnEdit.textContent = 'Изменить';

  tr.append(tdEdit);
  tdEdit.append(btnEdit);

  btnEdit.addEventListener('click', () => {
    const editSection = createModalWindow();
    const editSurname = editSection.querySelector('.edit-surname');
    const editName = editSection.querySelector('.edit-name');
    const editLastname = editSection.querySelector('.edit-lastname');
    const editContacts = editSection.querySelector('.box-list');

    client.contacts.forEach((contact) => {
      const createContact = addAnItem(editContacts);
      const selectCustom = createContact.querySelector('.choices__item');
      selectCustom.setAttribute('data-value', `${contact.type}`);
      const dateValue = selectCustom.getAttribute('data-value');
      selectCustom.innerText = dateValue;
      createContact.querySelector('.input-contact').value = contact.value;
    });

    const textId = document.querySelector('.client-id');
    editSurname.value = client.surname;
    editName.value = client.name;
    editLastname.value = client.lastName;
    textId.textContent = `ID: ${client.id}`;
    // добавить контакты

    editSection.querySelector('.save-btn').addEventListener('click', async (e) => {
      e.preventDefault();
      const contacts = editContacts.querySelectorAll('.box-item');
      const dataClient = client;
      const testData = document.querySelector('.choices__item');
      document.querySelectorAll('option').value = testData.getAttribute('data-value');

      dataClient.surname = editSurname.value;
      dataClient.name = editName.value;
      dataClient.lastName = editLastname.value;
      dataClient.contacts = [...contacts].map((item) => ({
        type: document.querySelector('option').value,
        value: item.querySelector('.input-contact').value,
      }));
      await updateClients(dataClient);
      rerenderTable();
      editSection.remove(editSection);
    });

    editSection.querySelector('.btn-close').addEventListener('click', () => {
      editSection.remove(editSection);
    });

    editSection.querySelector('.delet-client').addEventListener('click', () => {
      createModalWindowDeleteClient(tr);
    });

    const closeModalWindow = () => {
      editSection.remove(editSection);
    };

    closeFormWithinBoundaries(editSection, closeModalWindow);
  });

  const btnDelete = document.createElement('button');
  btnDelete.classList.add('delete');
  btnDelete.textContent = 'Удалить';

  tr.append(tdEdit);
  tdEdit.append(btnDelete);

  deleteClientId(btnDelete);

  return tr;
};
