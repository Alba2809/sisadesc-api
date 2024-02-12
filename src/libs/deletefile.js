import { promisify } from "util"
import fs from "fs"

const unlinkAsync = promisify(fs.unlink)

export const deletefile = async (file) => {
  try{
    await unlinkAsync(file.path)
  }catch(error){
    return false
  }
};