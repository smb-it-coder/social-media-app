import config from "config";
import Minio = require('minio');
//import * as fs from 'fs';
//import { Readable as ReadableStream } from 'stream';


const minioEndPoint = config.get<string>("minio_endPoint");
const minioPort = config.get<number>("minio_port");
const minioUseSSL = config.get<boolean>("minio_useSSL");
const minioAccessKey = config.get<string>("minio_accessKey");
const minioSecretKey = config.get<string>("minio_secretKey");
const minioPathStyle = config.get<boolean>("minio_pathStyle");

export const minioBucket = config.get<string>("minio_bucket");
export const minioRegion = config.get<string>("minio_region");

export const minioClient = new Minio.Client({
    endPoint: minioEndPoint,
    port: minioPort,
    useSSL: minioUseSSL,
    accessKey: minioAccessKey,
    secretKey: minioSecretKey,
    pathStyle: minioPathStyle,
});


export function createBucket() {

   // console.log('Step 1 :- Bucket creation started process -->  ' + minioBucket);
   // let listBuckets =  minioClient.listBuckets();

   // minioClient.listBuckets((error: Error|null, bucketList: Minio.BucketItemFromList[]) => { console.log(error, bucketList); });
    //let listBuckets =  minioClient.listBuckets();

   // console.log('===========listBuckets======== >  ', listBuckets);
   // return listBuckets;
    minioClient.makeBucket(minioBucket, 'us-east-1', function (err) {
        if (err) {
            console.log('Error creating bucket.', err);
        } 
        
      //  console.log('step 3 : - Bucket created successfully in ' + minioRegion);
       console.log(`https://play.minio.io:9000/${minioBucket}`);

        return true;
    });


    // if (!minioClient.bucketExists(bucket)) {
    //     minioClient.makeBucket(bucket, region, function (err) {
    //         if (err) {
    //             console.log('Error creating bucket.', err);
    //             return false;
    //         } 
            
    //         console.log('Bucket created successfully in ' + region);
    //         return true;
    //     });

    // } else {
    //     console.log('Bucket existing  ' + region);
    //     return false;
    // }

}


// function minioImageUpload(fileInput :any){
//     const files = fileInput ; //req.raw.files;
//     // ->CHANGED
//     minioClient.putObject(bucket, files.image.name, files.image.data, function(error, etag) {
//         if(error) {
//             return console.log(error);
//         }
//      return    res.send(`https://play.minio.io:9000/test/${files.image.name}`);
//     });
// }


//     // ->CHANGED
//     minioClient.putObject("test", files.image.name, files.image.data, function(error, etag) {
//         if(error) {
//             return console.log(error);
//         }
//         res.send(`https://play.minio.io:9000/test/${files.image.name}`);
//     });




// minioClient.makeBucket(minioBucket, minioRegion, (error: Error|null) => { console.log(error); });

