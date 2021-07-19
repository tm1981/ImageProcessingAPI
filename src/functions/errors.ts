import express from 'express'
// function to display error messages in json for the api
const jsonErrorMsg = (msg: string, res: express.Response): void => {
  res.setHeader('Content-Type', 'application/json')
  res.status(400).end(JSON.stringify({ error: msg }))
}

export default { jsonErrorMsg }
