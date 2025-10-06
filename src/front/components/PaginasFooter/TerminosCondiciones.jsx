import React from "react";
import "./TerminosCondiciones.css"; 

export default function TerminosCondiciones({ lastUpdated = "3 de octubre de 2025" }) {
  return (
    <div>
      <header className="tk-header">
        <div className="tk-container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div className="tk-brand" aria-label="CuatroK">
            <div className="tk-mark" aria-hidden="true" />
            <div>CuatroK</div>
          </div>
          <nav className="tk-crumbs" aria-label="Ruta">
            <span>Inicio</span> · <strong>Términos de uso</strong>
          </nav>
        </div>
      </header>

      <main className="tk-body">
        <div className="tk-container">
          <section className="tk-hero">
            <span className="tk-badge">Legal</span>
            <h1>Términos de uso &amp; Condiciones de venta</h1>
            <p>Última actualización: {lastUpdated}</p>
          </section>

          <article className="tk-card" role="article">
            <nav className="tk-toc" aria-label="Índice de contenidos">
              <h3>Contenido</h3>
              <ul>
                <li><a href="#titularidad">1. Titularidad del dominio</a></li>
                <li><a href="#objeto">2. Objeto y ámbito</a></li>
                <li><a href="#informacion">3. Información en el website</a></li>
                <li><a href="#propiedad">4. Propiedad intelectual e industrial</a></li>
                <li><a href="#responsabilidad">5. Responsabilidad</a></li>
                <li><a href="#errores-precio">Condiciones sobre errores de precio</a></li>
                <li><a href="#obligaciones">6. Obligaciones de usuarios</a></li>
                <li><a href="#privacidad">7. Privacidad y datos personales</a></li>
                <li><a href="#cookies">8. Cookies</a></li>
                <li><a href="#envios">9. Gastos de envío</a></li>
                <li><a href="#pedido">10. Realización del pedido</a></li>
                <li><a href="#devoluciones">11. Desistimiento y devoluciones</a></li>
                <li><a href="#desistimiento">12. Desistimiento (14 días)</a></li>
                <li><a href="#atencion">13. Atención al cliente</a></li>
                <li><a href="#disponibilidad">14. Disponibilidad</a></li>
                <li><a href="#plazos-envio">15. Modos y plazos de envío</a></li>
                <li><a href="#pago">16. Pago</a></li>
                <li><a href="#bonos">17. Bonos y descuentos</a></li>
                <li><a href="#garantia">18. Garantía de bienes de consumo</a></li>
                <li><a href="#legislacion">19. Legislación aplicable</a></li>
              </ul>
            </nav>

            <div className="tk-content">
              <section id="titularidad">
                <h2>1. Titularidad del dominio www.cuatrok.com</h2>
                <p>En cumplimiento de la Ley 34/2002 (LSSICE), la titularidad del dominio <strong>www.cuatrok.com</strong> corresponde a <strong>Masalt Time S.L.</strong>, CIF B18895730, inscrita en el Registro Mercantil de Granada (20.02.2009, tomo 1351, folio 1, hoja GR-36435, libro 0, inscripción 1). Contacto: <a href="mailto:web@cuatrok.com">web@cuatrok.com</a>.</p>
              </section>

              <section id="objeto">
                <h2>2. Objeto y ámbito de aplicación</h2>
                <p>Estas Condiciones regulan la información ofrecida en <strong>cuatrok.com</strong> y las transacciones entre <strong>CuatroK</strong> y los usuarios. Navegar o comprar implica la aceptación íntegra de estas condiciones. <strong>CuatroK</strong> podrá modificarlas publicándolas en el sitio.</p>
              </section>

              <section id="informacion">
                <h2>3. Información suministrada en el website</h2>
                <p>Trabajamos para ofrecer información veraz y sin errores tipográficos. Si se detecta un error ajeno a <strong>www.cuatrok.com</strong>, se corregirá de inmediato. La información contractual se muestra en español y la comunicación se realizará en dicho idioma.</p>
              </section>

              <section id="propiedad">
                <h2>4. Propiedad intelectual e industrial</h2>
                <p>Los contenidos (diseños, textos, gráficos, logotipos, software, marcas, etc.) están protegidos por derechos de <strong>CuatroK</strong> o de terceros autorizados. No se concede licencia ni cesión de derechos. Prohibida la reproducción, distribución o comunicación pública sin autorización expresa. Prohibidos hiperenlaces mercantiles desde sitios ajenos sin consentimiento previo.</p>
              </section>

              <section id="responsabilidad">
                <h2>5. Responsabilidad de CuatroK</h2>
                <p>Los productos cumplen la legislación española. No se responde por inconformidad con la legislación de otros países. Los clientes fuera de España deben verificar la importación/uso de los productos.</p>
                <p>El usuario asume la responsabilidad por el uso del sitio. <strong>CuatroK</strong> no responde por perjuicios por interferencias, virus, averías, desconexiones, sobrecargas de Internet u otras causas ajenas; ni por imposibilidad de prestar el servicio por causas no imputables a <strong>CuatroK</strong>.</p>
              </section>

              <section id="errores-precio" className="tk-note" aria-label="Condiciones sobre errores de precio">
                <strong>Condiciones sobre errores de precio en la web</strong>
                <p>En <strong>CuatroK</strong> buscamos una compra fiable y segura. En casos excepcionales puede mostrarse un precio 0 € o incorrecto. Si se compra con un precio claramente erróneo, <strong>CuatroK</strong> podrá cancelar el pedido y avisará al cliente. Estos errores son involuntarios y debidos a fallos técnicos.</p>
              </section>

              <section id="obligaciones">
                <h2>6. Obligaciones de clientes y usuarios</h2>
                <p>El usuario se compromete a cumplir estas condiciones, seguir instrucciones de uso, actuar conforme a la ley y la buena fe, y no dañar el sitio ni derechos de <strong>CuatroK</strong> o terceros. <strong>CuatroK</strong> no responde de la veracidad de los datos aportados por el usuario.</p>
                <ol>
                  <li>Facilitar información veraz y actualizada.</li>
                  <li>No difundir contenidos ilícitos o discriminatorios.</li>
                  <li>No introducir software malicioso o dañino.</li>
                  <li>Custodiar usuario y contraseña.</li>
                  <li>No realizar actividades publicitarias no autorizadas ni recopilar datos de terceros.</li>
                  <li>No suplantar identidades ni usar claves de terceros.</li>
                  <li>No destruir, alterar o dañar datos o documentos.</li>
                  <li>No infringir derechos de propiedad intelectual, industrial o secretos de terceros.</li>
                </ol>
                <p>El cliente facilitará una dirección válida para la entrega. En caso contrario, <strong>CuatroK</strong> no responde del retraso o imposibilidad de entrega. El uso de productos es responsabilidad del usuario, extremando precaución con menores.</p>
              </section>

              <section id="privacidad">
                <h2>7. Privacidad y protección de datos personales</h2>
                <p>Conforme a L.O. 15/1999 y R.D. 1720/2007, <strong>CuatroK</strong> mantiene un fichero de datos bajo su responsabilidad con la finalidad de gestionar la relación contractual y realizar acciones promocionales (SMS, email, correo). Para no recibir publicidad, desactiva la newsletter en tu cuenta.</p>
                <p>Derechos ARCO: por escrito a Masalt Time S.L., C/ Moral de la Magdalena Nº9, 18002 Granada, o por email a <a href="mailto:web@cuatrok.com">web@cuatrok.com</a> indicando nombre, apellidos, usuario y email, adjuntando copia del DNI. Si los datos están asociados a una compra, deberán conservarse al menos seis años.</p>
              </section>

              <section id="cookies">
                <h2>8. Cookies</h2>
                <p>Usamos cookies e IP para mejorar la experiencia (cesta, recomendaciones y ofertas). La cookie simplifica tu navegación en <strong>www.cuatrok.com</strong>, no contiene virus ni es ejecutable. Puede ser leída por ti y por <strong>CuatroK</strong>. Puedes borrarla en tu navegador.</p>
              </section>

              <section id="envios">
                <h2>9. Gastos de envío</h2>
                <ul>
                  <li>España peninsular: Gratis en pedidos &gt; 50€; 4,90€ en importes inferiores.</li>
                  <li>Baleares, Ceuta y Melilla: Gratis &gt; 100€; 10€ en inferiores.</li>
                  <li>Canarias: si &gt; 139€ → 57€; si &lt; 139€ → 39€.</li>
                  <li>UE: Francia 15€; Alemania, Bélgica, Holanda, Italia, Luxemburgo y Reino Unido 20€.</li>
                  <li>América: 55€.</li>
                </ul>
                <p>Fuera de la UE puede haber gastos por gestión aduanera según el país.</p>
              </section>

              <section id="pedido">
                <h2>10. Realización del pedido</h2>
                <p>Regístrate en <strong>www.cuatrok.com</strong>, añade productos a la cesta y valida el pedido. Los datos deben ser correctos, pues <strong>CuatroK</strong> reproducirá fielmente el texto facilitado.</p>
                <p>Datos de envío incorrectos: la reexpedición correrá a cargo del cliente.</p>
                <p>Las especificaciones del producto deben aportarse al hacer el pedido. Si no se especifica personalización, <strong>CuatroK</strong> aplicará valores por defecto. Si se detectan errores, <strong>CuatroK</strong> podrá solicitar aclaración por email; el plazo de entrega se suspende hasta respuesta. Pasados 60 días sin respuesta, el pedido se cancela sin reembolso.</p>
                <p>La validación del pedido implica aceptación de estas condiciones. Los registros de <strong>CuatroK</strong> son prueba de las transacciones. Tras la compra, se enviará confirmación e invoice por email.</p>
              </section>

              <section id="devoluciones">
                <h2>11. Derecho de desistimiento y devoluciones</h2>
                <p>Devoluciones en 30 días naturales para cambio o reembolso por el mismo medio de pago. Gastos de envío a cargo del cliente. No se aceptan devoluciones de productos personalizados (alianzas, anillos de compromiso o diamantes, colgantes o collares personalizados, esclavas o medallas).</p>
                <p>Cambios: podemos gestionar recogida; los gastos se abonan con el nuevo pedido o en bono. Devoluciones: los gastos se descuentan del reembolso. Reembolso en 5–7 días laborables.</p>
                <p>Solo se aceptan devoluciones autorizadas por <strong>CuatroK</strong> a través del formulario, adjuntando factura desde el área de cliente cuando sea aceptada.</p>
                <p>El reembolso se hará por el mismo medio de pago (excepto contra reembolso, que será por transferencia) y cuando la joya llegue en perfectas condiciones y sin uso.</p>
                <p><strong>CuatroK</strong> valorará el estado del producto para aceptar, rechazar o reembolsar parcialmente si no llega en perfecto estado.</p>
                <p>Si el producto no corresponde con el comprado, <strong>CuatroK</strong> asume los gastos de envío/devolución y el nuevo envío. Si el error es del comprador, éste asume los gastos.</p>
                <p>En tiendas físicas no se hacen cambios por vale ni reembolsos in situ: la gestión es online. Devoluciones desde Canarias, Ceuta, Melilla u otros países corren a cargo del cliente.</p>
              </section>

              <section id="desistimiento">
                <h2>12. Desistimiento</h2>
                <p>Derecho a desistir en 14 días naturales desde la posesión material. No aplica a artículos personalizados (joyas con grabaciones, personalizables, alianzas Argyor/Nexo grabadas, etc.).</p>
                <p>Para ejercerlo: notifica a <strong>Masalt Time S.L.</strong> (C/ Moral de la Magdalena nº9, 18002 Granada) en <a href="mailto:web@cuatrok.com">web@cuatrok.com</a> o por carta postal. Basta con enviar la comunicación antes del vencimiento del plazo.</p>
              </section>

              <section id="atencion">
                <h2>13. Atención al cliente</h2>
                <p>Contacto: <a href="mailto:web@cuatrok.com">web@cuatrok.com</a> · <a href="tel:+34958265512">958 26 55 12</a> (L–V, 09:00–14:00 y 15:00–18:00).</p>
                <p>Hojas de reclamaciones oficiales disponibles en establecimientos físicos y por email en <a href="mailto:atencionalcliente@cuatrok.com">atencionalcliente@cuatrok.com</a>.</p>
              </section>

              <section id="disponibilidad">
                <h2>14. Disponibilidad de los productos</h2>
                <p>Oferta válida mientras los productos estén visibles y haya stock. Con stock: envío en el siguiente día laborable (24–48 h). Sin stock: se solicita a proveedor y el plazo depende de éste.</p>
              </section>

              <section id="plazos-envio">
                <h2>15. Modos y plazos de envío</h2>
                <p>Con stock: envío siguiente día laborable (24–48 h). Sin stock: se pedirá a proveedor y se comunicará el plazo estimado. Personalizados (grabaciones/modificaciones) pueden sumar 24–48 h según carga de taller.</p>
              </section>

              <section id="pago">
                <h2>16. Pago</h2>
                <ul>
                  <li><strong>Tarjeta</strong> (Visa/Mastercard; tarjetas extranjeras deben cumplir CES).</li>
                  <li><strong>Transferencia</strong> (máx. 5 días; al hacerse efectiva se tramita el pedido).</li>
                  <li><strong>Contra reembolso</strong> (+3% gastos de gestión).</li>
                  <li><strong>PayPal</strong>.</li>
                  <li><strong>Bizum</strong>.</li>
                  <li><strong>Aplazame</strong> (desde 100€ en web; hasta 12 meses).</li>
                  <li><strong>seQura</strong> (desde 30€; cuota fija mensual).</li>
                </ul>
              </section>

              <section id="bonos">
                <h2>17. Bonos y descuentos</h2>
                <p><strong>CuatroK</strong> puede modificar o eliminar bonos de fidelidad. Caducan a 90 días y solo aplican a compras online. Los bonos de tiendas físicas se usan solo en tienda física.</p>
              </section>

              <section id="garantia">
                <h2>18. Garantía de bienes de consumo</h2>
                <p>Todas las joyas de <strong>CuatroK</strong> tienen 2 años de garantía desde la entrega. Procede reparación, sustitución, rebaja del precio o devolución del importe según corresponda. Contacto: <a href="mailto:web@cuatrok.com">web@cuatrok.com</a> o <a href="tel:+34958265512">958 26 55 12</a>. No cubre roturas o desgastes por mal uso. Debes informar de la falta de conformidad en 2 meses desde su conocimiento.</p>
              </section>

              <section id="legislacion">
                <h2>19. Legislación aplicable. Sumisión a fueros</h2>
                <p>Las compraventas en <strong>www.cuatrok.com</strong> se someten a la legislación española. Para conflictos, serán competentes los juzgados y tribunales que determine la normativa, atendiendo, tratándose de consumidores finales, al lugar del cumplimiento de la obligación o al domicilio del comprador.</p>
              </section>

              <details>
                <summary>¿Descargar en PDF?</summary>
                <p>Imprime esta página (Ctrl/Cmd + P) y guarda como PDF. El diseño está optimizado para impresión.</p>
              </details>
            </div>
          </article>
        </div>

        <footer className="tk-footer">
          <div className="tk-container tk-footer-grid">
            <div>
              <div className="tk-brand" style={{ marginBottom: 8 }}>
                <div className="tk-mark" aria-hidden="true" />
                <div>CuatroK</div>
              </div>
              <p>© {new Date().getFullYear()} CuatroK. Todos los derechos reservados.</p>
            </div>
            <div>
              <p><strong>Contacto</strong><br />
                <a href="mailto:web@cuatrok.com">web@cuatrok.com</a> · <a href="tel:+34958265512">958 26 55 12</a>
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
