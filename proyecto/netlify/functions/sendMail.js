import nodemailer from "nodemailer";
import parser from "lambda-multipart-parser";
import dotenv from 'dotenv';

// Cargar variables de entorno (solo afecta desarrollo local)
dotenv.config();

export const handler = async (event) => {
  console.log("✅ Function triggered:", event.httpMethod);

  // --- CORS ---
  if (event.httpMethod === "OPTIONS") {
    console.log("⚡ OPTIONS preflight recibido");
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    console.log("❌ Método inválido:", event.httpMethod);
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    // --- Paso 1: parsear multipart ---
    console.log("✅ [#1] Parseando multipart con lambda-multipart-parser");
    const { files = [], ...fields } = await parser.parse(event);
    console.log("👉 Fields recibidos:", fields);
    console.log("👉 Files recibidos:", files.map(f => f.filename || 'sin nombre'));

    // --- Paso 2: configurar transporter ---
    console.log("✅ [#2] Configurando transporter con host:", process.env.SMTP_HOST);
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,                 // ej: 'smtp.gmail.com'
      port: Number(process.env.SMTP_PORT) || 465,  // 465 SSL
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // --- Paso 3: preparar adjuntos ---
    const attachments = files.map((f) => ({
      filename: f.filename || "cv",
      content: Buffer.from(f.content),
      contentType: f.contentType,
    }));
    console.log("👉 Adjuntos preparados:", attachments.map(a => a.filename));

    // --- Paso 4: enviar email ---
    console.log("✅ [#3] Enviando email...");
    console.log("👉 Config email:", { 
      from: process.env.FROM_EMAIL || process.env.SMTP_USER,
      to: process.env.TO_EMAIL || process.env.SMTP_USER,
      replyTo: fields.email
    });
    
    const info = await transporter.sendMail({
      from: process.env.FROM_EMAIL || process.env.SMTP_USER,
      to: process.env.TO_EMAIL || process.env.SMTP_USER, 
      subject: `Nueva postulación de ${fields.nombre || "Sin nombre"}`,
      text: `Email: ${fields.email || 'No proporcionado'}\nTel: ${fields.telefono || 'No proporcionado'}`,
      attachments,
      replyTo: fields.email || undefined,
    });

    console.log("✅ [#4] Email enviado con ID:", info.messageId);

    // --- Paso 5: responder OK ---
    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ ok: true }),
    };

  } catch (err) {
    console.error("🔥 [#ERR] ERROR en sendMail:", err);
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ ok: false, error: err.message }),
    };
  }
};
