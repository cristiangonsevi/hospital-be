const fs = require('fs');
const path = require('path');
const uploadDao = require('./dao');
const showImages = (req, res) => {
  try {
    const { collection, image } = req.params;
    const imagePath = path.join(
      // eslint-disable-next-line no-undef
      __dirname,
      '../../public/'
    );
    if (!fs.existsSync(imagePath + collection + '/' + image)) {
      return res.sendFile(imagePath + 'no-image.jpg');
    }
    return res.sendFile(imagePath + collection + '/' + image);
  } catch (error) {
    console.log(error);
  }
};
const fileUpload = async (req, res) => {
  const { collection, id } = req.params;
  const validTypes = ['users', 'medics', 'hospitals'];
  if (!validTypes.includes(collection)) {
    return res.status(400).json({
      status: 400,
      messages: 'Collection not found',
    });
  }
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      status: 400,
      messages: 'No files were uploaded',
    });
  }
  const file = req.files.image;
  const fileType = file.name.split('.').pop();
  const validFileType = ['png', 'jpg', 'jpeg', 'gif'];
  try {
    if (!validFileType.includes(fileType)) {
      return res.status(400).json({
        status: 400,
        messages: 'File type not allowed. must be like png, jpg, jpeg, gif',
      });
    }
    const fileName = Date.now() + '.' + fileType;
    const path = './public/' + collection + '/' + fileName;
    file.mv(path, async (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          status: 500,
          messages: 'Error uploading file' + id,
        });
      }
      if (!(await validateIdRecordUploadImage(collection, id, fileName))) {
        return res.status(404).json({
          status: 404,
          messages: 'Record with id:' + id + ' Not found',
        });
      }
      return res.status(200).json({
        status: 200,
        messages: 'File upload successfully!',
      });
    });
  } catch (error) {
    console.log(error);
  }
};
const validateIdRecordUploadImage = async (collection, id, fileName) => {
  let findUserById;
  let findMedicById;
  let findHospitalById;
  let path = './public/' + collection + '/';
  try {
    switch (collection) {
      case 'users':
        findUserById = await uploadDao.findUserById(id);
        if (!findUserById) {
          return false;
        }
        deleteFile(path + findUserById.image);
        findUserById.image = fileName;
        findUserById.save();
        return true;
      case 'medics':
        findMedicById = await uploadDao.findMedicById(id);
        if (!findMedicById) {
          return false;
        }
        deleteFile(path + findMedicById.image);
        findMedicById.image = fileName;
        findMedicById.save();
        return true;
      case 'hospitals':
        findHospitalById = await uploadDao.findHospitallById(id);
        if (!findHospitalById) {
          return false;
        }
        deleteFile(path + findHospitalById);
        findHospitalById.image = fileName;
        findHospitalById.save();
        return true;
    }
  } catch (error) {
    console.log(error);
  }
};
const deleteFile = (path) => {
  try {
    const pathFile = path;
    fs.unlinkSync(pathFile);
  } catch (error) {
    console.log(error);
  }
};
module.exports = { fileUpload, showImages };
