const login = async (body: any): Promise<any> =>
  await fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((response) => response.json());

const verifyToken = async (body: any): Promise<any> =>
  await fetch('/api/users/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((response) => response.json());

export const UserService = {
  login,
  verifyToken,
};
