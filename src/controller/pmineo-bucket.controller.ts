import { Request, Response } from "express";
import logger from "../utils/logger";
import { createBucket, minioClient, minioRegion,minioBucket } from "../middleware/mineoUploader";


export async function createBucketHandler(req: Request, res: Response) {

  try {
    
    const flag = req.params.flag ;

    console.log( '==== parameter flag', flag);
    //console.log('minioClient', minioClient);
    
    if (flag == 'true') {

     // console.log('Hello Brij');
      console.log('minioClient', minioClient);

      let isCreated = await createBucket();

      if (isCreated) {
        return res.status(200).send('Bucket created');
      } else {
        return res.status(409).send('Server error!');
      }

    } 



  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}


async function uploadImage() {


  


}


async function minioImageUpload(req: Request, res: Response){

console.log();


  //  const files = fileInput ; //req.raw.files;
  // ->CHANGED
  // minioClient.putObject(bucket, files.image.name, files.image.data, function(error, etag) {
  //     if(error) {
  //         return console.log(error);
  //     }
  //  return    res.send(`https://play.minio.io:9000/test/${files.image.name}`);
  // });


}





// app.post(
//   "/upload", 

// Multer({storage: Multer.memoryStorage()}).single("upload"),

// function(request, response) {
//   minioClient.putObject(
//     "test", 
//     request.file.originalname,
//      request.file.buffer, 
//      function(error, etag) {
//         if(error) {
//             return console.log(error);
//         }

//         response.send(request.file);

//   });
// }
// );






