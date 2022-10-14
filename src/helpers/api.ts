
export const parseResponse = (response: any) => {
  if (response.ok) {
    return response.json();
  }
  throw new Error('Erro no código: ' + response.status)
}