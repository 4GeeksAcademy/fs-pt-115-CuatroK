import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { useAuth } from "../../../hooks/useAuth";
import { Link } from "react-router-dom";

export const AdminNavbar = () => {
    const { logoutUser } = useAuth()
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
            {/* Texto centrado */}
            <Navbar.Collapse className="justify-content-center">
                <Link to={"/admin-home"} className="text-reset text-decoration-none">
                    <Navbar.Text className="text-white fw-bold fs-2">
                        ADMIN
                    </Navbar.Text>
                </Link>
            </Navbar.Collapse>

            {/* Dropdown de perfil a la derecha */}
            <Nav className="ms-auto">
                <Dropdown align="end">
                    <Dropdown.Toggle
                        variant="dark"
                        id="dropdown-profile"
                        className="btn btn-outline-dark mt-2"
                        style={{ width: 50, height: 50 }}
                    >
                        <i className="fa-sharp fa-regular fa-circle-user text-warning"></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Link to={"/login"}>
                            <Dropdown.Item onClick={logoutUser}>Logout</Dropdown.Item>
                        </Link>
                    </Dropdown.Menu>
                </Dropdown>
            </Nav>
        </Navbar>
    );
};

