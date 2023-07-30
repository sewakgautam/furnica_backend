import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

const limits = {
  fileSize: 1024 * 1024 * 100, // accepts less than or equal to 100 MB
};

const imageFileFilter = (req: any, file: any, callback: any) => {
  if (!file.mimetype.match(/\/(jpg|jpeg|png|PNG|JPG|JPEG)$/)) {
    return callback(new Error('Only image is allowed.'), false);
  }
  callback(null, true);
};

const filename = (req: any, file: any, callback: any) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);

  callback(null, `${name}-${uuidv4()}${fileExtName}`);
};

const uuidFilename = (req: any, file: any, callback: any) => {
  const fileExtName = extname(file.originalname);

  callback(null, `${uuidv4()}${fileExtName}`);
};

export { limits, imageFileFilter, filename, uuidFilename };
