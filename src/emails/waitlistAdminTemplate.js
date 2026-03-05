import { baseTemplate } from "./baseTemplate";

export const waitlistAdminTemplate = (email, source) =>
    baseTemplate({
        title: "New Waitlist Entry",
        body: `
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Source:</strong> ${source}</p>
      <p>Someone just joined the waitlist.</p>
    `,
    });
