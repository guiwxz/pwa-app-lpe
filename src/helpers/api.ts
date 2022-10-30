import { NavigateFunction } from 'react-router-dom';

export const parseResponse = (response: Response, navigate: NavigateFunction) => {

  if (response.ok) {
    return response.json();
  }
  if (response.status === 401) {
    window.location.reload();
    navigate('/login', { replace: true });
  }
  throw new Error('Erro no código: ' + response.status, { cause: response.status })
}