var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PollSchema = new Schema({
    title: {
        type: String, 
        required: true
    },
    options: [
        {
            type: String,
            //required: true
        }
    ]
});

mongoose.model('Poll', PollSchema);