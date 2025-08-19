import nodemailer from "nodemailer";

export async function handler(event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ ok: false, error: "Método no permitido" }),
    };
  }

  try {
    const data = JSON.parse(event.body);

    // Validaciones básicas
    if (!data.name || !data.email || !data.message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ ok: false, error: "Faltan campos obligatorios" }),
      };
    }

    // Configurar transporter SMTP con tus variables de entorno
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_PORT === "465", // true para 465, false para 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Enviar el mail (de la misma casilla a la misma casilla)
    let info = await transporter.sendMail({
      from: `"Web App" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: "Nueva postulación",
      text: `Nombre: ${data.name}\nEmail: ${data.email}\nTeléfono: ${data.phone}\n\nMensaje:\n${data.message}`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, messageId: info.messageId }),
    };
  } catch (err) {
    console.error("Error en sendMail:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: err.message }),
    };
  }
}
