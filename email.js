const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Send reservation confirmation email
const sendReservationEmail = async (reservation) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: reservation.email,
    subject: 'Reservation Confirmed - Alice Poulain CafÃ©',
    html: `
      <div style="font-family: 'Libre Baskerville', Arial; background: #fcf6ec; padding: 40px;">
        <div style="max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 12px;">
          <h2 style="color: #2e2521; font-size: 28px; margin-bottom: 20px;">Thank You, ${reservation.name}!</h2>
          <p style="color: #2e2521; font-size: 16px; line-height: 1.6;">
            We've received your reservation request for <strong>Alice Poulain CafÃ©</strong>.
          </p>
          <div style="background: #f3ede2; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #a82e2e; margin-top: 0;">Reservation Details:</h3>
            <p><strong>Name:</strong> ${reservation.name}</p>
            <p><strong>Email:</strong> ${reservation.email}</p>
            ${reservation.phone ? `<p><strong>Phone:</strong> ${reservation.phone}</p>` : ''}
            ${reservation.preferredDate ? `<p><strong>Preferred Date:</strong> ${new Date(reservation.preferredDate).toLocaleDateString()}</p>` : ''}
            ${reservation.message ? `<p><strong>Message:</strong> ${reservation.message}</p>` : ''}
          </div>
          <p style="color: #2e2521; font-size: 16px; line-height: 1.6;">
            Our team will contact you shortly to confirm your reservation.
          </p>
          <p style="color: #b2a28b; font-size: 14px;">
            <strong>Alice Poulain CafÃ©</strong><br>
            2214 S 1st Street, Austin, TX 78704<br>
            (512) 555-CAFÃ‰ (2233)
          </p>
        </div>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
};

// Send owner notification email
const sendOwnerNotification = async (reservation) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.OWNER_EMAIL,
    subject: `New Reservation Request - ${reservation.name}`,
    html: `
      <div style="font-family: 'Libre Baskerville', Arial; background: #fcf6ec; padding: 40px;">
        <div style="max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 12px;">
          <h2 style="color: #a82e2e; font-size: 28px; margin-bottom: 20px;">ðŸŽ‰ New Reservation Request!</h2>
          <div style="background: #f3ede2; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${reservation.name}</p>
            <p><strong>Email:</strong> ${reservation.email}</p>
            <p><strong>Phone:</strong> ${reservation.phone || 'Not provided'}</p>
            <p><strong>Preferred Date:</strong> ${reservation.preferredDate ? new Date(reservation.preferredDate).toLocaleDateString() : 'Not specified'}</p>
            <p><strong>Message:</strong> ${reservation.message || 'No message'}</p>
          </div>
          <p style="color: #2e2521;">Log in to your dashboard to manage this reservation.</p>
        </div>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
};
module.exports = {
  sendReservationEmail,
  sendOwnerNotification
};
