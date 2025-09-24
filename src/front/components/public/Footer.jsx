import { useState } from "react";
import "./Footer.css";


import { FaFacebookF, FaInstagram, FaPinterestP, FaYoutube, FaHandshake, FaCcVisa, FaCcMastercard, FaCcAmex, FaCcPaypal } from "react-icons/fa";
import { FiPhone, FiMail, FiBriefcase, FiHeadphones } from "react-icons/fi";

export default function Footer() {
	const [email, setEmail] = useState("");

	const handleSubscribe = (e) => {
		e.preventDefault();
		alert("Gracias por suscribirte: " + email);
		setEmail("");
	};

	return (
		<footer className="ft">


			<div className="ft-wrap">

				<div className="col">
					<h4>Contacto</h4>
					<ul>
						<li><FiPhone className="ico" /> Atención: <a href="tel:935703748">935 703 748</a></li>
						<li><FiMail className="ico" /> <a href="mailto:CuatroK@gmail.com">CuatroK@gmail.com</a></li>
						<li><FiBriefcase className="ico" /> <a href="/trabaja">Trabaja con nosotros</a></li>
						<li><FaHandshake className="ico" /> <a href="/colabora">Colaboraciones</a></li>
					</ul>
				</div>


				<div className="col">
					<h4>Información</h4>
					<ul>
						<li><a href="/terminos">Términos de uso</a></li>
						<li><a href="/cookies">Política de cookies</a></li>
						<li><a href="/envios">Gastos de envío</a></li>
						<li><a href="/devoluciones">Devoluciones</a></li>
						<li><a href="/privacidad">Privacidad</a></li>
						<li><a href="/sostenibilidad">Sostenibilidad</a></li>
					</ul>
				</div>


				<div className="col">
					<h4>Nuestras joyerías</h4>
					<ul className="small">
						<li>Serrallo Plaza (GR) — <a href="tel:958164353">958 164 353</a></li>
						<li>Carrefour Pulianas — <a href="tel:958040890">958 040 890</a></li>
						<li>Nevada Shopping — <a href="tel:958179705">958 179 705</a></li>
						<li>Jaén Plaza — <a href="tel:953790390">953 790 390</a></li>
						<li>Plaza Mayor (MLG) — <a href="tel:952026033">952 026 033</a></li>
					</ul>
				</div>


				<div className="col">
					<h4>Newsletter</h4>
					<p className="muted">Recibe ofertas y novedades (1–2/mes).</p>

					<form className="newsletter" onSubmit={handleSubscribe}>
						<input
							type="email"
							placeholder="Tu correo"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						<button type="submit">Suscribirse</button>
					</form>

					<label className="muted agree">
						<input type="checkbox" required /> Acepto la política de privacidad
					</label>

					<div className="payments" aria-label="Métodos de pago">
						<span title="VISA"><FaCcVisa /></span>
						<span title="American Express"><FaCcAmex /></span>
						<span title="Mastercard"><FaCcMastercard /></span>
						<span title="PayPal"><FaCcPaypal /></span>
						<span>Aplázame</span>
						<span>Sequra</span>
					</div>

					<div className="support">
						<div className="head"><FiHeadphones /></div>
						<div>
							<div className="muted">Atención al cliente</div>
							<a className="tel" href="tel:935703748">935 703 748</a>
						</div>
					</div>
				</div>
			</div>


			<div className="ft-bottom">
				<div className="ft-bottom-wrap">
					<div>© {new Date().getFullYear()} CuatroK</div>
					<div className="social">
						<a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebookF /></a>
						<a href="https://youtube.com" target="_blank" rel="noreferrer"><FaYoutube /></a>
						<a href="https://pinterest.com" target="_blank" rel="noreferrer"><FaPinterestP /></a>
						<a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
					</div>
				</div>
			</div>
		</footer>
	);
}
