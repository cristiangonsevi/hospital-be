const searchDao = require('./dao');
const { multipleHospitals, multipleMedics, multipleUsers } = require('./dto');

const searchAll = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(404).json({
        status: 404,
        messages: 'Please write something',
      });
    }
    const regEx = new RegExp(query, 'i');
    const search = await searchDao.searchAll(regEx);
    res.status(200).json({
      status: 200,
      data: {
        users: multipleUsers(search.users),
        medics: multipleMedics(search.medics),
        hospitals: multipleHospitals(search.hospitals),
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      messages: 'Error processing request',
    });
  }
};
const searchCollection = async (req, res) => {
  try {
    const { query } = req.query;
    const { collection } = req.params;
    if (!query) {
      return res.status(404).json({
        status: 404,
        messages: 'Please write something',
      });
    }
    const regEx = new RegExp(query, 'i');
    let search;
    switch (collection) {
      case 'users':
        search = multipleUsers(await searchDao.searchUsers(regEx));
        break;
      case 'medics':
        search = multipleMedics(await searchDao.searchMedics(regEx));
        break;
      case 'hospitals':
        search = multipleHospitals(await searchDao.searchHospitals(regEx));
        break;
      default:
        return res.status(404).json({
          status: 404,
          messages: 'Collections allow users/medics/hospitals',
        });
    }
    res.status(200).json({
      status: 200,
      data: search,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      messages: 'Error processing request',
    });
  }
};

module.exports = {
  searchAll,
  searchCollection,
};
