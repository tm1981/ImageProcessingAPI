# Project Title

Image Processing API

## Description

Image Processing API is the first project in Udacity FullStack JavaScript Developer Program

## Getting Started

    clone this repo and run "npm install" to install all necessary npm packages
    
### Scripts Avalibe

```
npm run build //build the project
npm run test //run the test built for the project
npm run a //build & run the server with nodemon

```

### Endpoint
server:3000/api/images

query parametters are:
filename = an image filename
width = the required width for the image
height = the required height for the image

* width and height can be between 10px to 4000px

example:
```
http://localhost:3000/api/images?filename=image1&width=200&height=200
```
### Importent Notes
images that should be resize should be in the ./src/images/full folder 

