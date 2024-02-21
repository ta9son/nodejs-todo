const mongoose = require('mongoose');

const connectDB = (url) => {
    return mongoose.connect(url)
    .then( () => {
        console.log("データベースに接続しました");
    })
    .catch( (err) => {
        console.log("データベースに接続できませんでした", err);
    })
}


module.exports = connectDB;