FROM node:10

WORKDIR /usr/src/app

ENV PORT 8080
ENV HOST 0.0.0.0

COPY package*.json ./

RUN npm install --only=production

# Copy the local code to the container
COPY . .

# Building app
# RUN npm run build // not working, so please build it before deploying

# Start the service
CMD npm start