// grab the things we need
const mongoose = require('mongoose');  
const Schema = mongoose.Schema;

// create a schema
const messageSchema = new Schema({  
    // You can set up complex rules like so:
    message: {
        type: String,
        required: true,
        unique: true
    },
    // You can ayto-fill data
    added: {
        type: Date,
        default: new Date()
    },
    // Or just declare a simple type.
    active: Boolean,
    username: String,
    // Or force from a range of values
    message_type: {
        type: String,
        enum: ['normal', 'urgent']
    }
});

/**
 * Here's how to create a Schema method
 */
messageSchema.methods.talk = function () {
    var m = this.message
    ? "I'm going to say " + this.message
    : "I don't have anything to say.";
    console.log(m);
}
// Turn the schema you created into a "Model".
// mongoose.model("ModelNameSingular", modelSchema);
// "ModelNameSingular" will automatically be pluralized for you, and that pluralized version of the model name will also become the name of the MongoDB collection.

module.exports = mongoose.model("Message", messageSchema);  