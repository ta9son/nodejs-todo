const mongoose = require('mongoose');


const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, '名前を入力してください'],
        trim: true,
        maxlength: [20, '名前は20文字以内で入力してください']
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('Task', TaskSchema);