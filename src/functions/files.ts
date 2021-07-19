import { promises as fsPromises } from 'fs'
import sharp from 'sharp'
import express from 'express'
import errors from './errors'

// display image from disk as api response
const displayImage = (fileName: string, res: express.Response) => {
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
const resizeImage = (filename: string, width: string, height: string) => {
  return fsPromises
    .readFile(`./src/images/full/${filename}.jpg`)
    .then((img) => {
      return sharp(img)
        .resize(parseInt(width), parseInt(height))
        .toFile(`./src/images/thumb/${filename}-${width}-${height}.jpg`)
    })
}
// check if file exists
const ifImageExists = async (imageName: string, folder: string) => {
  const path = `./src/images/${folder}/${imageName}.jpg`
  try {
    await fsPromises.access(path)
    return true
  } catch {
    return false
  }
}
// check width and height values
const checkWidthHeight = (width: string, height: string) => {
  const w = parseInt(width)
  const h = parseInt(height)
  if (isNaN(w) || isNaN(h)) {
    return false
  } else if (w > 9 && h > 9 && w <= 4000 && h <= 4000) {
    return [w, h]
  }
}

const myFunc = (num: number): number => {
  return num * num
}

export default {
  ifImageExists,
  checkWidthHeight,
  displayImage,
  resizeImage,
  myFunc,
}
