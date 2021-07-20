import express from 'express'
import files from '../../functions/files'
import validateQuery from '../../functions/middleware'
const images = express.Router()

images.get('/', validateQuery, (req, res): void => {
  if (req.query.resize === 'true') {
    files
      .resizeImage(
        req.query.filename as string,
        req.query.imgSizeW as string,
        req.query.imgSizeH as string
      )
      .then(() => {
        const resizedImg = `${req.query.filename}-${req.query.imgSizeW}-${req.query.imgSizeH}`
        files.displayImage(resizedImg, res)
        console.log('resizing and displaying new image')
      })
  } else {
    files.displayImage(req.query.file as string, res)
    console.log('displaying saved image')
  }
})

export default images
