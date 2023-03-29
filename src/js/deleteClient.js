import { deleteClients } from './api.js';

export const createModalWindowDeleteClient = (tr) => {
  // создание секции
  const mainContent = document.querySelector('.main-content');
  const newSection = document.createElement('section');
  newSection.classList.add('delete-data-update');
  mainContent.after(newSection);

  // создание div-контейнер
  const modalContainer = document.createElement('div');
  modalContainer.classList.add('modal-content');
  newSection.append(modalContainer);

  // создание btn в div-контейнер
  const btnClose = document.createElement('button');
  btnClose.classList.add('btn-close');
  btnClose.innerHTML = '<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.2332 1.73333L15.2665 0.766664L8.49985 7.53336L1.73318 0.766696L0.766515 1.73336L7.53318 8.50003L0.766542 15.2667L1.73321 16.2333L8.49985 9.46669L15.2665 16.2334L16.2332 15.2667L9.46651 8.50003L16.2332 1.73333Z" fill="#B0B0B0" /></svg>';
  modalContainer.append(btnClose);

  const divTitle = document.createElement('h2');
  divTitle.classList.add('title-delet');
  divTitle.textContent = 'Удалить клиента';
  modalContainer.append(divTitle);

  const divDesc = document.createElement('p');
  divDesc.textContent = 'Вы действительно хотите удалить данного клиента?';
  modalContainer.append(divDesc);

  const buttonDelete = document.createElement('button');
  buttonDelete.classList.add('delete-button');
  buttonDelete.textContent = 'Удалить';
  modalContainer.append(buttonDelete);

  buttonDelete.addEventListener('click', async () => {
    const tbody = tr.parentElement;
    await deleteClients(tr.id);
    tbody.removeChild(tr);
    newSection.remove(newSection);
    const sectionUpdate = document.querySelector('.data-update');
    if (sectionUpdate) {
      sectionUpdate.remove(sectionUpdate);
    }
  });

  btnClose.addEventListener('click', () => {
    newSection.remove(newSection);
  });

  const cancel = document.createElement('a');
  cancel.classList.add('cancel-delete');
  cancel.setAttribute('src', '#');
  cancel.textContent = 'Отмена';
  modalContainer.append(cancel);

  cancel.addEventListener('click', () => {
    newSection.remove(newSection);
  });

  const closeModalWindow = () => {
    newSection.remove(newSection);
  };
  newSection.addEventListener('click', (e) => {
    const withinBoundaries = e.composedPath().includes(modalContainer);
    if (!withinBoundaries) {
      closeModalWindow();
    }
  });

  return newSection;
};

export const deleteClientId = (btnDelete) => {
  btnDelete.addEventListener('click', (e) => {
    const tr = e.target.parentElement.parentElement;
    createModalWindowDeleteClient(tr);
  });
};
