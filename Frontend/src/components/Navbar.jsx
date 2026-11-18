import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { AppContext } from '../context/App_Context';

const Navbar = () => {
  const { isAuthenticated, logOut } = useContext(AppContext)
  return (
    <>
      <nav className="app-navbar">
        <Link
          to={"/"}
          className="navbar-brand"
        >
          <h2>FOOD INSIGHTS</h2>
        </Link>
        <div className="nav-links">
          {isAuthenticated && (
            <>
              <Link to={"/add"} className="btn-accent">
                Add
              </Link>
              <Link to={"/profile"} className="app-link">
                Profile
              </Link>
              <button type="button" className="btn-danger-quiet" onClick={logOut}>LogOut</button>
            </>
          )}
          {!isAuthenticated && (
            <>
              <Link to={"/login"} className="app-link">
                Login
              </Link>
              <Link to={"/register"} className="btn-accent">
                Register
              </Link>
            </>
          )}
          <Link to={"/saved"} className="app-link">
            Saved
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
