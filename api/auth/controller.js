const authDao = require('./dao');
const bcrypt = require('bcrypt');
const { generateJwt } = require('../../helpers/jwt');
const { single } = require('./dto');
const { googleVerify } = require('../../helpers/google-verify');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUserByEmail = await authDao.getUserByEmail(email);
    if (!findUserByEmail) {
      return res.status(403).json({
        status: 403,
        messages: 'Email not exist',
      });
    }
    const validatePassword = bcrypt.compareSync(
      password,
      findUserByEmail.password
    );
    if (!validatePassword) {
      return res.status(400).json({
        status: 400,
        messages: 'Credentials not match',
      });
    }
    const token = await generateJwt(findUserByEmail._id);
    return res.status(200).json({
      status: 200,
      data: single(findUserByEmail, token),
    });
  } catch (error) {
    console.log(error);
    res.status(502).json({
      status: 502,
      messages: 'Error processing request!',
    });
  }
};

const googleSignIn = async (req, res) => {
  const { token } = req.body;
  try {
    const googleUser = await googleVerify(token);
    const findUserByEmail = await authDao.getUserByEmail(googleUser.email);
    let newUser;
    if (!findUserByEmail) {
      newUser = await authDao.createUser({
        ...googleUser,
        password: '@@@',
        google: true,
      });
    } else {
      newUser = await authDao.updateTypeSignIn({
        id: findUserByEmail._id,
        image: googleUser.picture,
      });
    }
    const tokenJwt = await generateJwt(newUser._id);
    return res.status(200).json({
      status: 200,
      data: single(newUser, tokenJwt),
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { login, googleSignIn };
