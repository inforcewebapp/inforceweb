const nodemailer = require("nodemailer");
const { IncomingForm } = require("formidable");



exports.handler = async (event, context) => {
  console.log("✅ [#0] Function triggered");

  try {
    // Paso 1: Verificar método
    console.log("✅ [#1] Método recibido:", event.httpMethod);
    if (event.httpMethod !== "POST") {
      console.log("❌ [#1.1] Método inválido");
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    // Paso 2: Parsear el formulario
    console.log("✅ [#2] Iniciando parse con formidable");
    const form = new IncomingForm({ multiples: false });

    const data = await new Promise((resolve, reject) => {
      form.parse(event, (err, fields, files) => {
        if (err) {
          console.log("❌ [#2.1] Error al parsear form:", err);
          reject(err);
        } else {
          console.log("✅ [#2.2] Form parseado:", { fields, filesKeys: Object.keys(files) });
          resolve({ fields, files });
        }
      });
    });

    // Paso 3: Config SMTP
    console.log("✅ [#3] Configurando nodemailer con HOST:", process.env.SMTP_HOST);
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Paso 4: Envío de mail
    console.log("✅ [#4] Enviando mail con datos:", data.fields);
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: `Nueva postulación de ${data.fields.nombre}`,
      text: `Email: ${data.fields.email}\nTel: ${data.fields.telefono}`,
      attachments: [
        {
          filename: data.files.cv.originalFilename,
          path: data.files.cv.filepath,
        },
      ],
    });

    console.log("✅ [#5] Email enviado correctamente, ID:", info.messageId);

    // Paso 5: Respuesta OK
    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true }),
    };

  } catch (err) {
    console.error("🔥 [#ERR] ERROR en sendMail:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: err.message }),
    };
  }
};
