const { StudentRepository, meo } = require('../repositories/student');
const { MajorRepository } = require('../repositories/major');
const { SettingsRepository } = require('../repositories/settings');

const ErrorList = require('../errors/list');
const { WrapError } = require('../errors/error');

class StudentService {
  constructor(studentRepository, majorRepository, settingsRepository) {
    if (!studentRepository) {
      throw new Error('studentRepository is required');
    }

    if (!(studentRepository instanceof StudentRepository)) {
      throw new Error(
        'studentRepository must be an instance of StudentRepository'
      );
    }

    if (!majorRepository) {
      throw new Error('majorRepository is required');
    }

    if (!(majorRepository instanceof MajorRepository)) {
      throw new Error('majorRepository must be an instance of MajorRepository');
    }

    if (!settingsRepository) {
      throw new Error('settingsRepository is required');
    }

    if (!(settingsRepository instanceof SettingsRepository)) {
      throw new Error(
        'settingsRepository must be an instance of SettingsRepository'
      );
    }

    Object.defineProperties(this, {
      studentRepository: {
        value: studentRepository,
        writable: false,
      },
      majorRepository: {
        value: majorRepository,
        writable: false,
      },
      settingsRepository: {
        value: settingsRepository,
        writable: false,
      },
    });
  }

  async get(id) {}
  async create(student) {}
  async update(student) {}
}

/**
 * @class
 * @constructor
 * @public
 */
class studentService extends StudentService {
  constructor(studentRepository, majorRepository, settingsRepository) {
    super(studentRepository, majorRepository, settingsRepository);

    /**
     * @type {StudentRepository}
     */
    this.studentRepository;

    /**
     * @type {MajorRepository}
     */
    this.majorRepository;

    /**
     * @type {SettingsRepository}
     */
    this.settingsRepository;
  }

  async get(id) {
    let [result, err] = await this.studentRepository.get(id);
    if (err != undefined) {
      return [undefined, WrapError(ErrorList.ErrorInternalServer, err.message)];
    }

    if (result == undefined) {
      return [undefined, ErrorList.ErrorNotFound];
    }

    // Fetch the major using the major_id from the result
    let [major, majorErr] = await this.majorRepository.get(result.major_id);
    if (majorErr != undefined) {
      return [
        undefined,
        WrapError(ErrorList.ErrorInternalServer, majorErr.message),
      ];
    }

    let keys = ['student_seminar', 'student_report', 'student_steps'];
    let values = {};

    for (let key of keys) {
      let [value, error] = await this.settingsRepository.getValueByKey(key);
      if (error != undefined) {
        return [
          undefined,
          WrapError(ErrorList.ErrorInternalServer, error.message),
        ];
      }
      values[key] = value;
    }

    let data = {
      name: result.name,
      code: result.code,
      attempt: result.attempt,
      intake: result.intake,
      credit: result.credit,
      status: result.status,
      major: major.name,
      seminar: values['student_seminar'].value,
      report: values['student_report'].value,
      step: values['student_steps'].value,
      ...result.data,
    };

    return [data, undefined];
  }

  async create(student) {
    let [result, err] = await this.studentRepository.create(student);
    return [result, err];
  }

  async update(req) {
    let [result, err] = [undefined, undefined];

    [result, err] = await this.studentRepository.get(req.id);
    if (err != undefined) {
      return [undefined, WrapError(ErrorList.ErrorInternalServer, err.message)];
    }

    if (result == undefined) {
      return [undefined, ErrorList.ErrorNotFound];
    }

    if (!result.data) {
      result.data = {};
    }

    result.name = req.name;
    result.data.sex = req.sex;
    result.data.address = req.address;
    result.data.phone = req.phone;
    result.data.email = req.email;
    result.data.nationality = req.nationality;
    result.data.birthday = req.birthday;

    [result, err] = await this.studentRepository.update(result);
    if (err != undefined) {
      return [undefined, WrapError(ErrorList.ErrorInternalServer, err.message)];
    }

    [result, err] = await this.studentRepository.get(req.id);
    if (err != undefined) {
      return [undefined, WrapError(ErrorList.ErrorInternalServer, err.message)];
    }

    return [result, undefined];
  }
}

function newStudentService(
  studentRepository,
  majorRepository,
  settingsRepository
) {
  return new studentService(
    studentRepository,
    majorRepository,
    settingsRepository
  );
}

module.exports = {
  StudentService,
  newStudentService,
};
