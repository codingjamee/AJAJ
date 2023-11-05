import AWS from 'aws-sdk'
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');


AWS.config.update({
    region: 'ap-northeast-2',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACESS_KEY
});

const s3 = new AWS.S3();

const allowedExtensions = ['.png', '.jpg', 'jpeg', '.bmp']

const imageUploader = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'elice-ajaj',
        key: (req, file, callback) => {
            console.log('file', file);
            const uploadDirectory = req.query.directory ?? ''
            
            const extension = path.extname(file.originalname)
            console.log('extension', extension);
            if (!allowedExtensions.includes(extension)){
                return callback(new Error('파일의 확장자가 잘못되었습니다.'))
            }
            callback(null, `${uploadDirectory}/${Date.now()}_${file.originalname}`)
        },
        acl: 'public-read-write'
    }),
})

export { imageUploader };