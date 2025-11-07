import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT || 587),
  secure: process.env.MAIL_SECURE === 'true',
  auth: process.env.MAIL_USER
    ? {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      }
    : undefined,
});

export async function sendContactEmail({ artisan, payload }) {
  if (!artisan.email) {
    throw new Error("L'artisan ne possède pas d'adresse email dans la base de données");
  }

  const from = process.env.MAIL_FROM || 'no-reply@trouve-ton-artisan.fr';
  const message = {
    from,
    to: artisan.email,
    subject: `[Trouve ton artisan] ${payload.subject}`,
    replyTo: payload.email,
    text: `Bonjour ${artisan.name},\n\n${payload.name} vous a contacté via la plateforme Trouve ton artisan.\n\nMessage :\n${payload.message}\n\nCoordonnées :\n- Email : ${payload.email}\n- Téléphone : ${payload.phone || 'non renseigné'}\n\nBien cordialement,\nLa plateforme Trouve ton artisan`,
  };

  await transporter.sendMail(message);
}
