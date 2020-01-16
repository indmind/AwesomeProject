const HOST = 'http://192.168.43.79:8080';

export async function login(body) {
  try {
    return await fetch(`${HOST}/login.php`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body,
    });
  } catch (e) {
    throw e;
  }
}

export async function register(body) {
  fetch(`${HOST}/register.php`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body,
  });
}
