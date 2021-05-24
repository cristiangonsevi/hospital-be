const userDao = require('./dao');
const bcrypt = require('bcrypt');
const { generateJwt } = require('../../helpers/jwt');

const { multiple, createdUser } = require('./dto');

const getUsers = async (req, res) => {
  const since = Number(req.query.since) || 0;
  const limit = Number(req.query.limit) || 5;
  const users = await userDao.getUsers(since, limit);
  return res.status(201).json({
    status: 200,
    data: multiple(users),
  });
};
const createUsers = async (req, res) => {
  try {
    const findUser = await userDao.getUserByEmail(req.body.email);
    if (findUser) {
      return res.status(403).json({
        status: 403,
        messages: 'User already exist',
      });
    }
    const salt = bcrypt.genSaltSync();
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    // eslint-disable-next-line no-unused-vars
    const newUser = await userDao.createUsers(req.body);
    const token = await generateJwt(newUser.id);
    return res.status(201).json({
      status: 201,
      messages: 'User created succesfully',
      data: createdUser(newUser, token),
    });
  } catch (error) {
    console.log(error);
    res.status(502).json({
      status: 502,
      messages: 'Error creating user!',
    });
  }
};
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    // eslint-disable-next-line no-unused-vars
    const { google, password, email, ...body } = req.body;
    const findUserById = await userDao.getUserById(id);
    if (!findUserById) {
      return res.status(404).json({
        status: 404,
        messages: 'User not found',
      });
    }
    if (email !== findUserById.email) {
      const findUserByEmail = await userDao.getUserByEmail(email);
      if (findUserByEmail) {
        return res.status(403).json({
          status: 403,
          messages: 'Email has been taken',
        });
      }
    }
    body.email = email;
    await userDao.updateUser(id, body);
    return res.status(200).json({
      status: 200,
      message: 'User updated succesfully!',
    });
  } catch (error) {
    console.log(error);
    res.status(502).json({
      status: 502,
      messages: 'Error creating user!',
    });
  }
};
const desactivateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const findUserById = await userDao.getUserById(id);
    if (!findUserById) {
      return res.status(404).json({
        status: 404,
        messages: 'User not found',
      });
    }
    await userDao.inactiveUser(id);
    return res.status(200).json({
      status: 200,
      message: 'User desactivated succesfully!',
    });
  } catch (error) {
    console.log(error);
    res.status(502).json({
      status: 502,
      messages: 'Error creating user!',
    });
  }
};
module.exports = {
  getUsers,
  createUsers,
  updateUser,
  desactivateUser,
};
