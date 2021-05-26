const { OAuth2Client } = require('google-auth-library');
// eslint-disable-next-line no-undef
const googleId = process.env.GOOGLE_ID;
const client = new OAuth2Client(googleId);
const googleVerify = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: googleId,
  });
  const payload = ticket.getPayload();
  const { name, email, picture } = payload;
  return { name, email, picture };
};

module.exports = { googleVerify };
