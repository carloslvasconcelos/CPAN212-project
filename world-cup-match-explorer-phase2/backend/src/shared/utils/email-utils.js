export const sendEmail = async (to, subject, body) => {
  console.log(`
--- EMAIL SIMULATION ---
To: ${to}
Subject: ${subject}
Body:
${body}
-------------------------
`);
  return true;
};
