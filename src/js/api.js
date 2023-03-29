const url = 'http://localhost:3000/api/clients';

export const loadClients = async () => {
  const response = await fetch(url);
  return response.json();
};

export const createClients = async (client) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(client),
  });
  return response.json();
};

export const updateClients = async (client) => {
  const response = await fetch(`${url}/${client.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(client),
  });
  return response.json();
};

export const deleteClients = async (id) => {
  const response = await fetch(`${url}/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};
