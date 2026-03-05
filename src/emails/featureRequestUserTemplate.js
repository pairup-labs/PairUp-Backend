import { baseTemplate } from "./baseTemplate";

export const featureRequestUserTemplate = (feature, description) =>
    baseTemplate({
        title: "Feature Request Received",
        body: `
      <p>Thank you for taking the time to share your idea.</p>

      <p style="margin-top:20px;">
        <strong>Requested Feature:</strong><br/>
        ${feature}
      </p>

      ${
          description
              ? `<p>
                <strong>Description:</strong><br/>
                ${description}
            </p>`
              : ""
      }

      <p>
        We review every feature request carefully.
        If this gets added to our roadmap, you’ll be informed.
      </p>

      <p>We appreciate your contribution.</p>
    `,
    });
