import { useState } from "react";
import "./Footer.css";
import {
  FaFacebookF, FaInstagram, FaPinterestP, FaYoutube,
  FaCcVisa, FaCcMastercard, FaCcAmex, FaCcPaypal
} from "react-icons/fa";
import { FiPhone, FiMail, FiHeadphones } from "react-icons/fi";
import { Link } from "react-router-dom";
import { sendEmail } from "../../services/serviceApi";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    await sendEmail(email)
    setStatus("ok");
    setEmail("");
    setTimeout(() => setStatus(null), 2500);
  };

  return (
    <footer className="ft ft--dark" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Información del sitio</h2>

      <div className="ft-top">
        <div className="ft-grid">

          <section className="ft-col">
            <h3 className="ft-title">Contacto</h3>
            <ul className="ft-list">
              <li><FiPhone aria-hidden="true" /> <span>Atención: </span><a href="tel:935703748">935 703 748</a></li>
              <li><FiMail aria-hidden="true" /> <a href="mailto:CuatroK@gmail.com">CuatroK@gmail.com</a></li>
            </ul>

            <div className="support" role="group" aria-label="Atención al cliente">
              <div className="support-icon" aria-hidden="true"><FiHeadphones /></div>
              <div>
                <div className="muted">Atención al cliente</div>
                <a className="tel" href="tel:935703748">935 703 748</a>
              </div>
            </div>
          </section>

          <section className="ft-col">
            <h3 className="ft-title">Información</h3>
            <ul className="ft-list">
              <li><Link to="../terminos">Términos de uso</Link></li>
              <li><a href="/cookies">Política de cookies</a></li>
              <li><a href="/privacidad">Privacidad</a></li>
            </ul>
          </section>

          <section className="ft-col">
            <h3 className="ft-title">Newsletter</h3>
            <p className="muted">Recibe ofertas y novedades (1–2/mes).</p>

            <form className="newsletter" onSubmit={submit} noValidate>
              <label htmlFor="nl-email" className="sr-only">Correo electrónico</label>
              <input
                id="nl-email"
                type="email"
                placeholder="Tu correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" disabled={!email}>Suscribirse</button>
            </form>

            {status === "ok" && <div className="nl-alert ok">¡Gracias por suscribirte!</div>}
            {status === "error" && <div className="nl-alert error">Debes aceptar la privacidad.</div>}

            <div className="payments" aria-label="Métodos de pago">
              <span title="VISA"><FaCcVisa /></span>
              <span title="American Express"><FaCcAmex /></span>
              <span title="Mastercard"><FaCcMastercard /></span>
              <span title="PayPal"><FaCcPaypal /></span>
            </div>
          </section>
        </div>
      </div>

      <div className="ft-bottom">
        <div className="ft-bottom-wrap">
          <div>© {new Date().getFullYear()} CuatroK</div>
          <div className="social" aria-label="Redes sociales">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube /></a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest"><FaPinterestP /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
