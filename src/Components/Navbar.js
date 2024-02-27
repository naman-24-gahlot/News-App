import React, {useState} from "react";
import { Link } from 'react-router-dom';

export function Navbar (props) {

  const [searchText, setSearch] = useState('');

 const handleInputChange = async (event) => {
    const searchText = event.target.value;
    setSearch(searchText) ; // Update searchText state
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted with search text:", searchText);
    props.setText(searchText);
  }
  
    return (
      <div>
        <nav className={`Navbar navbar fixed top navbar-expand-lg bg-dark border-bottom border-body`} data-bs-theme="dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              Navbar
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/home">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/entertainment">
                    entertainment
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/science">
                    science
                  </Link>
                </li>{" "}
                <li className="nav-item">
                  <Link className="nav-link" to="/technology">
                    technology
                  </Link>
                </li>{" "}
                <li className="nav-item">
                  <Link className="nav-link" to="/sports">
                    sports
                  </Link>
                </li>{" "}
                <li className="nav-item">
                  <Link className="nav-link" to="/health">
                    health
                  </Link>
                </li>{" "}
                <li className="nav-item">
                  <Link className="nav-link" to="/business">
                    business
                  </Link>
                </li>
              </ul>
              <form className="d-flex" onSubmit={handleFormSubmit}>
  <input
    className="form-control me-2"
    name="searchbar"
    type="search"
    placeholder="Search"
    aria-label="Search"
    value={searchText}
    onChange={handleInputChange}
  />
  <button
    className="btn btn-outline-success"
    type="submit" // Change type to "submit"
  >
    Search
  </button>
</form>

            </div>
          </div>
        </nav>
      </div>
    );

}

export default Navbar;
