import fs from "fs"
import { promisify } from "util"

const unlinkAsync = promisify(fs.unlink)

export const deletefile = async (file) => {
  try{
    await unlinkAsync(file.path)
  }catch(error){
    return false
  }
};