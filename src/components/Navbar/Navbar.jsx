
import React from "react";

import { Link } from "react-router-dom";

  const Wilders_card = {
    justifyContent: 'center',
    height: "100px",
    backgroundImage: "",
  };

const Navbar = ({state}) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={Wilders_card}>
                <div className="container-fluid">
                    <Link className="navbar-brand" style={Wilders_card}>
                    <img src='/img/ICONO.png' width="150" height="100" />
                    </Link>
                    <div className="collapse navbar-collapse justify-content-md-end" id="navbarNav" style={Wilders_card}>
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item me-2" id='madera'>
                            </li>
                            <li className="nav-item me-2" id='madera'>
                                <Link className="nav-link h3 text-white" to="/mint" ><img src='/img/mint.png' width="200"  /></Link>
                            </li>
                            <li className="nav-item me-2" id='madera'>
                                <Link className="nav-link h3 text-white" to="/my-tokens" > <img src='/img/beast.png' width="200"  /></Link>
                            </li>
                            {(state.contractOwner === state.accountAddress) ?
                            <li className="nav-item" id='madera'>
                                <Link className="nav-link h3 text-white"  to="/change-price" ><img src='/img/owner.png' width="200"  /></Link>
                            </li>
                            : null}
                        </ul>
                    </div>
                </div>
            </nav>
  );
};

export default Navbar;
