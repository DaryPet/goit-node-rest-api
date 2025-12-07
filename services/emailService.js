import nodemailer from 'nodemailer';
import 'dotenv/config';

const { UKR_NET_EMAIL, UKR_NET_PASSWORD, BASE_URL } = process.env; 

const transporter = nodemailer.createTransport({
    host: 'smtp.ukr.net',
    port: 465,
    secure: true, 
    auth: {
        user: UKR_NET_EMAIL,
        pass: UKR_NET_PASSWORD,
    },
});

/**
 * Sends a verification email to the user.
 * @param {string} email - Recipient's email address.
 * @param {string} verificationToken - Verification token.
 */
export async function sendVerificationEmail(email, verificationToken) {
    if (!UKR_NET_EMAIL || !UKR_NET_PASSWORD) {
        console.error('UKR_NET_EMAIL or UKR_NET_PASSWORD is not set in .env!');
        throw new Error('Email service configuration error. Please check .env settings.');
    }
    
    const verificationLink = `${BASE_URL}/api/auth/verify/${verificationToken}`;

    const mailOptions = {
        from: UKR_NET_EMAIL,
        to: email,
        subject: 'Account Verification for Contact API',
        html: `
            <h1>Verify Your Email Address</h1>
            <p>Please click the link below to verify your email:</p>
            <p><a href="${verificationLink}">Verify My Account</a></p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Verification email sent successfully to: ${email}`);
    } catch (error) {
        console.error('Error sending verification email:', error.message);
        throw error;
    }
}