import jwt_decode from 'jwt-decode';

const NOMEAPP: string = 'LPE';

export const getAuth = () => {
  const localStorageAutenticacao = localStorage.getItem(NOMEAPP + '/autenticacao');

  const autenticacao = localStorageAutenticacao ? JSON.parse(localStorageAutenticacao) : null;

  if (autenticacao == null) {
    return null;
  }

  if (autenticacao.auth === false) {
    return null;
  }

  let decoded: any = jwt_decode(autenticacao.token);

  //@ts-ignore
  if (decoded.exp <= Math.floor(new Date() / 1000)) {
    console.log('Token expirado');
    //logout();

    return null;
  } else {
    return autenticacao;
  }
}

type AuthApiProps = {
  email_usuario: string;
  nome_usuario: string;
  token?: string;
}

export const storeAuthentication = (json: any) => {
  const decodificado: AuthApiProps = jwt_decode(json.token);

  json.nome_usuario = decodificado.nome_usuario;
  json.email_usuario = decodificado.email_usuario;

  localStorage.setItem(NOMEAPP + '/autenticacao', JSON.stringify(json));
}

export const logout = () => {
  //limpando localstorage
  localStorage.setItem(NOMEAPP + '/autenticacao', JSON.stringify({
    auth: false,
    toke: ""
  }))
}
