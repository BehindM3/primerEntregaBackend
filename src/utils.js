import { fileURLToPath } from 'url'
import { dirname } from 'path'
import multer from 'multer';

//Configuracion y exportacion de __dirname

const __filename = fileURLToPath(import.meta.url)

export const __dirname = dirname(__filename)


//Configuracion y exportacion de multer

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, __dirname + '/public/img/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

export const uploader = multer({ storage });