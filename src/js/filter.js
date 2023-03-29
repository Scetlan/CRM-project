export const filterClients = () => {
  const container = document.querySelector('.header-container');
  const filter = document.createElement('input');
  filter.setAttribute('type', 'text');
  filter.setAttribute('placeholder', 'Введите запрос');
  filter.setAttribute('name', 'search');
  filter.classList.add('search-box');
  container.appendChild(filter);

  filter.addEventListener('keyup', function () {
    setTimeout(() => {
      const filterValue = this.value.toLowerCase();
      const tr = document.getElementsByTagName('tr');
      for (let i = 1; i < tr.length; i += 1) {
        const td = tr[i].getElementsByTagName('td');
        let flag = false;
        for (let j = 0; j < td.length; j += 1) {
          if (td[j].innerHTML.toLowerCase().indexOf(filterValue) > -1) {
            flag = true;
          }
        }
        if (flag) {
          tr[i].style.display = '';
        } else {
          tr[i].style.display = 'none';
        }
      }
    }, 300);
  });
};
