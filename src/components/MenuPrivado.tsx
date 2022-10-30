import { NavLink, Outlet } from 'react-router-dom';
import { getAuth, logout } from '../store/auth/auth';
const MenuPrivado = () => {

  const autenticacao = getAuth();

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" aria-current="page" to="/privado">SISGEE</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/privado">Home</NavLink>
              </li>
              {autenticacao &&
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="/privado" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Manutenções
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><NavLink className="dropdown-item" to="produtos">Produtos</NavLink></li>
                    <li><NavLink className="dropdown-item" to="vendas">Vendas</NavLink></li>
                  </ul>
                </li>
              }
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {autenticacao ? "Usuário: " + autenticacao.nome_usuario : "Usuário"}
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>{autenticacao ?
                    <NavLink className="dropdown-item" to="/"
                      onClick={() => logout()}>Logout</NavLink>
                    :
                    <NavLink className="dropdown-item" to="/login">Login</NavLink>}</li>

                </ul>
              </li>

            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>)
};

export default MenuPrivado;