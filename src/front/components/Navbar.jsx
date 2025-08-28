
import { Link } from "react-router-dom";
import { Perfil } from "./NavbarComponentes/Perfil";
import { Buscador } from "./NavbarComponentes/Buscador";
import { CarritoCompra } from "./NavbarComponentes/CarritoCompra";
import { NavAndTabs } from "./NavbarComponentes/NavAndTabs";

export const Navbar = () => {


	return (
		<div>
			<nav className="navbar" style={{ backgroundColor: ' #5C3D2E' }}>
				<div className="container d-flex justify-content-between align-items-center">
					{/* Menú de navegación */}
					<NavAndTabs />

					{/* Logo centrado */}
					<div className="navbar-logo">
						<Link to="/">
							<img
								src="https://media.discordapp.net/attachments/1409165086697848872/1410329949633642556/LogoEntero.PNG?ex=68b1485e&is=68aff6de&hm=ac81bd38ba8f653cd93c7faabb712c27ffce1e41533e16870d2410bdb8a8b825&=&format=webp&quality=lossless&width=360&height=334"
								alt="Logo"
								style={{ width: 50, height: 44 }}
							/>
						</Link>
					</div>
					{/* Ícono de búsqueda con hover */}
					<div className="d-flex align-items-center gap-2">

						<Buscador />
						<CarritoCompra />
						<Perfil />

					</div>
				</div>
			</nav>
		</div>
	);
};
