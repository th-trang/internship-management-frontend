const { StudentRepository, meo } = require('../repositories/student');

const ErrorList = require('../errors/list');
const {WrapError} = require('../errors/error');

class StudentService {
    constructor(studentRepository) {
        if (!studentRepository) {
            throw new Error('studentRepository is required');
        }

        if (!(studentRepository instanceof StudentRepository)) {
            throw new Error('studentRepository must be an instance of StudentRepository');
        }

        Object.defineProperties(this, {

            studentRepository: {
                value: studentRepository,
                writable: false
            }

        });
    }

    async get(id) { }
    async create(student) { }
    async update(student) { }
}

/**
 * @class
 * @constructor
 * @public
 */
class studentService extends StudentService {
    constructor(studentRepository) {
        super(studentRepository);

        /**
         * @type {StudentRepository}
         */
        this.studentRepository;
    }

    async get(id) {
        let [result, err] = await this.studentRepository.get(id);
        if (err != undefined) {
            return [undefined, WrapError(ErrorList.ErrorInternalServer, err.message)];
        }

        if (result == undefined) {
            return [undefined, ErrorList.ErrorNotFound];
        }

        let data = {
            name: result.name,
            ...result.data
        }

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


function newStudentService(studentRepository) {
    return new studentService(studentRepository);
}

module.exports = {
    StudentService,
    newStudentService,
}