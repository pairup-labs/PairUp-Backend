import nodemailer from "nodemailer";

const sendEmail = async (options) => {
    console.log("Password being used by Nodemailer:", process.env.MAIL_PASS); // Add this line

    const transporter = nodemailer.createTransport({
        // These details should be stored in your .env file for security
        host: process.env.MAIL_HOST, // e.g., 'smtp.mailtrap.io' or 'smtp.gmail.com'
        port: process.env.MAIL_PORT, // e.g., 2525 or 587
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.MAIL_USER, // Your SMTP username
            pass: process.env.MAIL_PASS, // Your SMTP password
        },
    });

    // Determine the 'from' address, default to your main user if not provided
    const fromAddress = options.fromAddress || process.env.MAIL_USER;
    const fromName = options.fromName || "PairUp"; // A default sender name

    // 2. Define the email options.
    const mailOptions = {
        // Use your actual sending email address here
        from: `"${fromName}" <${fromAddress}>`,
        to: options.email,
        subject: options.subject,
        text: options.html.replace(/<[^>]*>?/gm, ""),
        html: options.html,
    };

    // 3. Send the email.
    // sendMail returns a promise, but since we're in an asyncHandler,
    // any errors will be automatically caught and passed to the error handling middleware.
    await transporter.sendMail(mailOptions);

    console.log(
        `Email sent successfully to ${options.email} from ${fromAddress}`
    );
};

export { sendEmail };
