const mongoose = require('mongoose');

const teamsTaskSchema = new mongoose.Schema({
    name:  { type: String, required: true,unique : true},
    description:  { type: String, required: true},
    priority:  { type: Number, required: true},
    teamName:  { type: String, required: true},
    dueDate: { type: Date, required: true},
    state:  { type: String, required: true}
});


module.exports = mongoose.model('teamtasks', teamsTaskSchema,'teamtasks');
