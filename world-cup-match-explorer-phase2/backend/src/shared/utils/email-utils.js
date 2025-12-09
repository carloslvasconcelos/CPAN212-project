// Email Simulation
export async function sendEmail(to, subject, body) {
  console.log(`
------------------ EMAIL SIMULATION ------------------
TO: ${to}
SUBJECT: ${subject}
BODY:
${body}
-------------------------------------------------------
`);
  return true;
}
