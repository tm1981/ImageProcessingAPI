import express from 'express'
import errors from './errors'
import files from './files'

// middleware that check if query parameters are correct and if resized image exists
const validateQuery = async (
  req: express.Request,
  res: express.Response,
  next: Function
): Promise<void> => {
  const query = req.query
  const imageFile = req.query.filename
  // check if query are valid
  if (
    imageFile === undefined ||
    query.width === undefined ||
    query.height === undefined
  ) {
    errors.jsonErrorMsg('query parameters are missing', res)
    return
  }

  // check if the user input correct image width and height
  const imageSize = files.checkWidthHeight(
    query.width as string,
    query.height as string
  )
  let resizedFileName: string
  if (imageSize) {
    const size = imageSize as number[]
    resizedFileName = `${imageFile}-${size[0]}-${size[1]}`
    // check of orginal image found
    if (await files.ifImageExists(imageFile as string, 'full')) {
      // check if resized image found
      if (await files.ifImageExists(resizedFileName, 'thumb')) {
        console.log('resized found')
        req.query.resize = 'false'
        req.query.file = resizedFileName // sending back resized image filename
        next()
      } else {
        req.query.resize = 'true'
        req.query.file = imageFile
        // sending back image width and height to be used for resizing
        req.query.imgSizeW = String(size[0])
        req.query.imgSizeH = String(size[1])
        next()
      }
    } else {
      errors.jsonErrorMsg('file not found', res)
    }
  } else {
    errors.jsonErrorMsg(
      'width or height are not valid, width or height should be numbers and not exceed 4000px',
      res
    )
  }
}

export default validateQuery
