import multer from "multer";
import multerS3 from "multer-s3";
import AWS from "aws-sdk";
import config from "config";



const aws_accessKeyId = config.get<string>("aws_accessKeyId");
const aws_secretAccessKey = config.get<string>("aws_secretAccessKey");
const aws_bucket = config.get<string>("aws_bucket");
const endpoint = config.get<string>("endpoint");


export const bucket = aws_bucket;

export const s3 = new AWS.S3({
  endpoint: endpoint,
  accessKeyId: aws_accessKeyId,
  secretAccessKey: aws_secretAccessKey,
  sslEnabled: false,
  s3ForcePathStyle: true,
});

const storage = multerS3({
  s3,
  bucket,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  metadata: (req, file, cb) => {
    cb(null, { fieldName: file.fieldname });
  },
  key: (req, file, cb) => {
    cb(null, Date.now().toString());
  },
});

export const upload = multer({ storage });