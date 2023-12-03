const mongoose = require('mongoose');

//define a schema/ blueprint NOTE: id is not a part of the schema 
const employeeSchema = new mongoose.Schema({
    list_name:  { type: String},
    list_desc:  { type: String},
    list_priority : { type : String}
});

//use the blueprint to create the model 
//Parameters: (model_name, schema_to_use, collection_name)
//module.exports is used to allow external access to the model  
module.exports = mongoose.model('lists', employeeSchema,'lists');


//use the blueprint to create the model 
//Parameters: (model_name, schema_to_use, collection_name)
//module.exports is used to allow external access to the model  
//note capital S in the collection name
                    