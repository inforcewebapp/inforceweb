import formidable from "formidable";
import fs from "fs";
import nodemailer from "nodemailer";

export const config = {
  api: {
    bodyParser: false, // muy importante: desactiva parser JSON
  },
};

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Método no permitido" });
  }

  const form = formidable({ multiples: false });

  try {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Error parseando form:", err);
        return res
          .status(400)
          .json({ ok: false, error: "No se pudo procesar el formulario" });
      }

      const nombre = fields.nombre?.[0] || "";
      const email = fields.email?.[0] || "";
      const telefono = fields.telefono?.[0] || "";
      const cv = files.cv?.[0];

      if (!cv) {
        return res.status(400).json({ ok: false, error: "No se recibió archivo" });
      }

      // Configuración SMTP (usar las env vars de Netlify)
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "465"),
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: process.env.SMTP_USER,
        to: process.env.SMTP_USER, // te lo envías a vos mismo
        subject: "Nueva postulación recibida",
        text: `Nombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono}`,
        attachments: [
          {
            filename: cv.originalFilename,
            content: fs.createReadStream(cv.filepath),
          },
        ],
      };

      try {
        await transporter.sendMail(mailOptions);
        return res.json({ ok: true });
      } catch (e) {
        console.error("Error enviando mail:", e);
        return res
          .status(500)
          .json({ ok: false, error: "Error al enviar el correo" });
      }
    });
  } catch (e) {
    console.error("Error general:", e);
    return res
      .status(500)
      .json({ ok: false, error: "Error interno del servidor" });
  }
};
