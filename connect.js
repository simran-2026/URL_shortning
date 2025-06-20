const mongoose = require ('mongoose');
mongoose.set('strictQuery', true);
async function connectMongodb(url){
    return mongoose.connect(url);

}

module.exports = {connectMongodb};
