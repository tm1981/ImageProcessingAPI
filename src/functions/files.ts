import { promises as fsPromises } from 'fs'
import sharp, { OutputInfo } from 'sharp'
import express from 'express'
import errors from './errors'

// display image from disk as api response
const displayImage = (fileName: string, res: express.Response) :void => {
  fsPromises
    .readFile(`./src/images/thumb/${fileName}.jpg`)
    .then((image) => {
      res.writeHead(200, { 'Content-Type': 'image/gif' })
      res.end(image, 'binary')
    })
    .catch((e) => {
      errors.jsonErrorMsg('image was not found on the server', res)
    })
}
// resize image with sharp
const resizeImage = (filename: string, width: string, height: string) :Promise<OutputInfo> => {
  return fsPromises
    .readFile(`./src/images/full/${filename}.jpg`)
    .then((img) => {
      return sharp(img)
        .resize(parseInt(width), parseInt(height))
        .toFile(`./src/images/thumb/${filename}-${width}-${height}.jpg`)
    })
}
// check if file exists
const ifImageExists = async (imageName: string, folder: string): Promise<boolean> => {
  const path = `./src/images/${folder}/${imageName}.jpg`
  try {
    await fsPromises.access(path)
    return true
  } catch {
    return false
  }
}
// check width and height values
const checkWidthHeight = (width: string, height: string) : boolean | Array<number> => {
  const w = parseInt(width)
  const h = parseInt(height)
  if (isNaN(w) || isNaN(h)) {
    return false
  } else if (w > 9 && h > 9 && w <= 4000 && h <= 4000) {
    return [w, h]
  } else {
    return false
  }
}

export default {
  ifImageExists,
  checkWidthHeight,
  displayImage,
  resizeImage
}
