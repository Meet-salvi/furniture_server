const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: `"${options.name}" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER,
        subject: options.subject,
        text: options.message,
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #1A1A1A; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">New Contact Message</h2>
                <p><strong>From:</strong> ${options.name} (${options.email})</p>
                <p><strong>Subject:</strong> ${options.subject}</p>
                <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 10px;">
                    <p><strong>Message:</strong></p>
                    <p>${options.message}</p>
                </div>
                <p style="font-size: 12px; color: #888; margin-top: 20px;">This message was sent from the Lumière Furniture contact form.</p>
            </div>
        `,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
