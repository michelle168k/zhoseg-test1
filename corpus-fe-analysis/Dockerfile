FROM node:lts-alpine

# make the 'app' folder the current working directory
WORKDIR /app

# Install node-gyp dependencies
RUN apk add --no-cache python3 make g++

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

CMD [ "npm", "run", "serve" ]
