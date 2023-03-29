export const sortClients = (clients, key, order) => clients.sort((a, b) => {
  let dir;
  if (key === 'fullName') {
    const client1 = `${a.surname} ${a.name} ${a.lastName}`;
    const client2 = `${b.surname} ${b.name} ${b.lastName}`;
    dir = client1 < client2;
    if (order === 'desc') dir = client1 > client2;
  } else {
    dir = a[key] < b[key];
    if (order === 'desc') dir = a[key] > b[key];
  }

  return dir === true ? -1 : 1;
});

export const getOrder = (target) => {
  const btnId = target.querySelector('.icon');
  let order = target.getAttribute('order');
  if (order === 'asc') {
    order = 'desc';
    target.setAttribute('order', order);
    btnId.style.transform = 'rotate(180deg)';
  } else {
    order = 'asc';
    target.setAttribute('order', order);
    btnId.style.transform = 'none';
  }

  return order;
};
