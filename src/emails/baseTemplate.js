export const baseTemplate = ({ title, body }) => `
  <div style="
      font-family: Arial, sans-serif;
      background: #f5f5f5;
      padding: 40px 0;
      color: #222;
  ">
      <div style="
          max-width: 520px;
          margin: auto;
          background: #ffffff;
          border-radius: 10px;
          padding: 30px;
          border: 1px solid #eee;
      ">
          <h2 style="text-align:center; margin-bottom:20px; color:#000;">${title}</h2>

          <div style="font-size:15px; line-height:1.6;">
              ${body}
          </div>

          <hr style="margin:30px 0; border:none; border-top:1px solid #ddd;" />

          <p style="text-align:center; font-size:13px; color:#777;">
              © ${new Date().getFullYear()} Synhostic. All rights reserved.
          </p>
      </div>
  </div>
`;
