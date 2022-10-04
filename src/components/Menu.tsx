import { NavLink } from 'react-router-dom';

const Menu = () => (

  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
          {/*@ts-ignore */}
          <NavLink className="navbar-brand" aria-current="page" exact to="/">COMÉRCIO DE COMBUSTÍVEIS DAVID</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    {/*@ts-ignore */}
                      <NavLink className="nav-link active" aria-current="page" exact to="/">Home</NavLink>
                  </li>
                  <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                          Manutenções
                      </a>
                      <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        {/*@ts-ignore */}
                          <li><NavLink className="dropdown-item" exact to="/produtos">Produtos</NavLink></li>
                          {/*@ts-ignore */}
                          <li><NavLink className="dropdown-item" exact to="/vendas">Vendas</NavLink></li>
                      </ul>
                      
                  </li>

              </ul>
          </div>
      </div>
  </nav>
);

export default Menu;