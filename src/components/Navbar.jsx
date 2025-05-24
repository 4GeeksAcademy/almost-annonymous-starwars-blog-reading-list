import { Link } from "react-router-dom";
import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {

	const {store, dispatch} = useGlobalReducer();
	const favorites = store.favorites;
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container-fluid">
				<Link to="/">
					<img 
					src="https://pngimg.com/d/star_wars_logo_PNG34.png" 
					className="d-inline-block align-text-top" 
					alt="star wars logo"
					style={{ 
						width: "5rem",
						height: "3rem",
					}}
					/>
				</Link>
				<div className="dropdown ms-auto">
          <button
            className="btn btn-warning dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Favorites ({favorites.length})
          </button>

          <ul className="dropdown-menu dropdown-menu-end">
            {favorites.length === 0 ? (
              <li className="dropdown-item text-muted">No favorites yet</li>
            ) : (
              favorites.map((name, index) => (
                <li
                  key={index}
                  className="dropdown-item d-flex justify-content-between align-items-center"
                >
                  {name}
                  <button
                    className="btn btn-sm btn-outline-danger ms-2"
                    onClick={() =>
                      dispatch({ type: "REMOVE_FAVORITE", payload: name })
                    }
                    title="Remove favorite"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
			</div>
		</nav>
	);
};