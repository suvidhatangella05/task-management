const mongoose = require('mongoose');

//define a schema/ blueprint NOTE: id is not a part of the schema 
const listsschema = new mongoose.Schema({
    UserName:  { type: String},
    Email:  { type: String}
});

//use the blueprint to create the model 
//Parameters: (model_name, schema_to_use, collection_name)
//module.exports is used to allow external access to the model  
module.exports = mongoose.model('users', listsschema,'users');
//note capital S in the collection name
                    