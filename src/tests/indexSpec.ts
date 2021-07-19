import files from '../functions/files'
import supertest from 'supertest'
import app from '../index'

describe('test files functions', () => {
  it('expect checkWidthHeight to return false for string', () => {
    expect(files.checkWidthHeight('test1', 'test2')).toEqual(false)
  })

  it('expect checkWidthHeight to return false for string with number in the end', () => {
    expect(files.checkWidthHeight('1000', 'test200')).toEqual(false)
  })

  it('expect ifImageExists to return true when a file found', async () => {
    const result = await files.ifImageExists('image1', 'full')
    expect(result).toEqual(true)
  })

  it('expect ifImageExists to return false when a file not found', async () => {
    const result = await files.ifImageExists('image-not-found', 'full')
    expect(result).toEqual(false)
  })
})

const request = supertest(app)

describe('Test endpoints responses', () => {
  it('test image api response to be 200', async (done) => {
    const response = await request.get(
      '/api/images?filename=image1&width=100&height=100'
    )
    expect(response.status).toBe(200)
    done()
  })

  it('test image api response to be 400', async (done) => {
    const response = await request.get(
      '/api/images?filename=image1&width=100&height=aaa'
    )
    expect(response.status).toBe(400)
    done()
  })
})
