import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <div>
        <nav
          className="navbar navbar-expand-md navbar-dark bg-success"
          style={{ padding: "1em" }}
        >
          <div class="container-fluid">
            <Link to="/" className="navbar-brand" aria-current="page">
              ICTACK
            </Link>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <Link to="/" className="nav-link  active" aria-current="page">
                    Home
                  </Link>
                </li>
                <li class="nav-item">
                  <Link
                    to="/login"
                    className="nav-link  active"
                    aria-current="page"
                  >
                    Login
                  </Link>
                </li>
                <li class="nav-item">
                  <Link
                    to="/signup"
                    className="nav-link  active"
                    aria-current="page"
                  >
                    Sign UP
                  </Link>
                </li>
                <li class="nav-item">
                  <Link
                    to="/requirements"
                    className="nav-link  active"
                    aria-current="page"
                  >
                    Add Requirements
                  </Link>
                </li>

                <li class="nav-item">
                  <Link
                    to="/view"
                    className="nav-link  active"
                    aria-current="page"
                  >
                    View Curriculum
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
