export default {
  port: 1337,
  dbUri: "mongodb+srv://new-test-1:BbBb100685@cluster0.jalkq.mongodb.net/social-media-app",
  saltWorkFactor: 10,
  accessTokenTtl: "15m",
  refreshTokenTtl: "1y",
  accessTokenPrivateKey: ``,
  accessTokenPublicKey: ``,
  refreshTokenPrivateKey: ``,
  refreshTokenPublicKey: ``,
  // for smtp configuration settings
  smtpHostname : 'smtp.gmail.com',
  smtpUsername : 'your email',
  smtpPassword : 'passwordhere',
  // aws s3 configuration
  aws_accessKeyId : 'ly1y6iMtYf',
  aws_secretAccessKey : 'VNcmMuDARGGstqzkXF1Van1Mlki5HGU9',
  aws_bucket : 'dev-multer-s3-bucket',
  endpoint :'http://localhost:1337',
  // for minio
  minio_endPoint: 'play.min.io',
  minio_port: 9000,
  minio_useSSL: true,
  minio_accessKey: 'Q3AM3UQ867SPQQA43P2F',
  minio_secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG',
  minio_pathStyle: true,
  minio_bucket: 'social-media-content01',
  minio_region:  'us-east-1',
};


// {
//   name: 'social-media-content01',
//   creationDate: 2022-09-01T08:42:40.380Z
// },
