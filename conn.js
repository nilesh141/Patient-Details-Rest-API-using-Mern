
const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb://localhost:27017/patientDtls", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
}).then(() => {
    console.log("connection successful");

}).catch((e) => {
    console.log("no connection");
});