import { baseTemplate } from "./baseTemplate.js";
export const waitlistEmailTemplate = (email) =>
    baseTemplate({
        title: "You're on the Waitlist!",
        body: `
      <p>Hi,</p>
      <p>Thank you for joining the waitlist. You're now one of the early supporters shaping the next generation of our platform.</p>

      <p>
        We'll notify you as soon as we roll out early access.  
        Keep an eye on <strong>${email}</strong>.
      </p>

      <p>We're excited to have you on board!</p>
    `,
    });
