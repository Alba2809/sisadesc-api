import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject, getBytes } from "firebase/storage";
import { v4 } from "uuid";
import dotenv from "dotenv";
import path from "path"

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
  appId: process.env.FIREBASE_APPID,
};

const app = initializeApp(firebaseConfig);

export async function uploadImagePerfile(image){
    const storageRef = ref(storage, "avatar/" + v4() + path.extname(image.originalname))
    const metatype = {
      contentType: image.mimetype,
    }
    await uploadBytes(storageRef, image.buffer, metatype)
    return await getDownloadURL(storageRef)
}

export async function deleteImagePerfile(image){
    const storageRef = ref(storage, image)
    return await deleteObject(storageRef)
}

/* upload file (pdf) */
export async function uploadFile(file){
  // v4() is used to generate a random ID
  // path.extname() is used to get the extension of the file
  const userId = "1"
  const storageRef = ref(storage, `chat/${userId}/` + v4() + path.extname(file.originalname))
    const metatype = {
      contentType: file.mimetype,
    }
    await uploadBytes(storageRef, file.buffer, metatype)
    return await getDownloadURL(storageRef)
}

/* export async function downloadFile(url, userId){
  try {
    const storageRef = ref(storage, url)
    const response = await fetch(url, {
      headers: {
        'auth': JSON.stringify({
          uid: userId,
          backend: true,
        }),
      },
      method: "GET",
    });
    const blob = await getBytes(storageRef);

    if (blob.status_ === 200) {
      console.log(blob)
      return blob
    }
  } catch (error) {
    console.log(error)
  }
} */

export const storage = getStorage(app);

export const TOKEN_SECRET = process.env.TOKEN_SECRET || "something secret";

export const PORT = process.env.PORT || 4000;

export const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost/bd_sisadesc";

export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

export const HOST_MYSQL = process.env.HOST_MYSQL || "localhost";

export const USER_MYSQL = process.env.USER_MYSQL || "root";

export const PASSWORD_MYSQL = process.env.PASSWORD_MYSQL || "";

export const DATABASE_MYSQL = process.env.DATABASE_MYSQL || "bd_sisadesc";

export const PORT_MYSQL = process.env.PORT_MYSQL || 3306;