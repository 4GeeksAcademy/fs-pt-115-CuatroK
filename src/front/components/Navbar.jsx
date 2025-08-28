import { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {

	const [showSearch, setShowSearch] = useState(false);
	return (
		<div>
			<nav className="navbar" style={{ backgroundColor: '#F8E8E8' }}>
				<div className="container">
					<ul className="nav nav-tabs">
						<li className="nav-item">
							<a className="nav-link active text-dark" aria-current="page" href="#">Productos</a>
						</li>
						<li className="nav-item">
							<a className="nav-link text-dark" href="#">Contactanos</a>
						</li>
					</ul>
					<a className="navbar-brand mx-auto" href="#">
						<img 
							src="https://images.genius.com/a71bb5846af63d55c41ad0951667af6f.1000x1000x1.png"
							alt="Bootstrap"
							style={{ width: 30, height: 24 }}
						/>
					</a>
					
				</div>
			</nav>
		</div>
	);
};
