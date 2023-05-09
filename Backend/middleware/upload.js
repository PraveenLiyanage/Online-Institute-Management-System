const path = require('path')
const multer = require('multer')


var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },

    filename: function(req, file, cb){
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
})

var upload = multer({
    storage: storage,
    fileFilter: function(req, file, callback) {
        if(
            file.mimetype == "video/mp4" ||
            file.mimetype == "video/webm" ||
            file.mimetype == "video/mkv"
        ){
            callback(null , true)
        } else {
            console.log ('Only .mp4, .webm and .mkv file supported!')
            callback(null, false)
        }
    },

    limits: {
        fileSize: 1024 * 1024 * 1024 * 3
    }
})


module.exports = {
    upload
}