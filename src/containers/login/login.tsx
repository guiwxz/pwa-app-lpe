import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Alert from '../../components/Alert';
import './login.style.css';
import jwt_decode from "jwt-decode";
import { getAuth, storeAuthentication } from '../../store/auth/auth';

function Login() {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [alerta, setAlerta] = useState({ status: "", message: "" });
  const [autenticado, setAutenticado] = useState(false);

  const acaoLogin = async (e: React.ChangeEvent<HTMLFormElement>) => {

    e.preventDefault();

    try {
      const body = {
        email: email,
        senha: senha
      };
      await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then(response => response.json())
        .then(json => {
          setAlerta({ status: "success", message: JSON.stringify(json) })
          if (json.auth === true) {
            setAutenticado(true);
            storeAuthentication(json);
          }
        });
    } catch (err: any) {
      console.error(err.message);
    }

    const autenticacao = getAuth();
    console.log(autenticacao);
    console.log("token: " + autenticacao.token);
    console.log("decoded: " + JSON.stringify(jwt_decode(autenticacao.token)));


  };

  useEffect(() => {
    const autenticacao = getAuth();
    if (autenticacao != null) {
      console.log("autenticação não é null");
      if (autenticacao.auth === true) {
        setAutenticado(true);
      }
    }
  }, []);

  if (autenticado === true) {
    return <Navigate to="/privado" />
  }

  return (
    <div>
      <body className="text-center">
        <Alert alert={alerta} />
        <main className="form-signin">
          <form onSubmit={acaoLogin}>
            <h1 className="h3 mb-3 fw-normal">Login de usuário</h1>

            <div className="form-floating">
              <input type="text" className="form-control" id="floatingInput" placeholder="Nome de usuário"
                value={email}
                name="email"
                onChange={e => setEmail(e.target.value)} />
              <label htmlFor="floatingInput">Email</label>
            </div>
            <div className="form-floating">
              <input type="password" className="form-control" id="floatingPassword" placeholder="Senha"
                value={senha}
                name="senha"
                onChange={e => setSenha(e.target.value)} />
              <label htmlFor="floatingPassword">Senha</label>
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">Efetuar login</button>
          </form>
        </main>
      </body>
    </div>
  )

}

export default Login;
