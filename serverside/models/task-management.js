const mongoose = require('mongoose');

const teamsSchema = new mongoose.Schema({
    name:  { type: String, required: true,unique : true},
    description:  { type: String, required: false},
    email:  { type: String, required: false},
    users:  [{ type: String, required: false}]
});


module.exports = mongoose.model('TaskManagement', teamsSchema,'teams');
