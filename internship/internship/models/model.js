const { defineAssignment } = require('./assigment');
const { defineUser } = require('./user');
const { defineClass, defineClassAssociation } = require('./class');
const { defineReport } = require('./report');
const { defineTeacher } = require('./teacher');
const { defineStudent } = require('./student');
const { defineMeeting } = require('./meeting');
const { defineMajor } = require('./major');
const { defineSettings } = require('./settings');

function DefineModel(sequelize) {
  defineAssignment(sequelize);
  defineUser(sequelize);
  defineClass(sequelize);
  defineReport(sequelize);
  defineTeacher(sequelize);
  defineStudent(sequelize);
  defineMeeting(sequelize);
  defineMajor(sequelize);
  defineSettings(sequelize);

  defineClassAssociation(sequelize);
}

module.exports = {
  DefineModel,
};
