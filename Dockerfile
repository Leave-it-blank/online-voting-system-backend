FROM node:18

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./

RUN npm install
# If you are building your code for production
#RUN npm ci --omit=dev
RUN npm install -g ts-node typescript '@types/node'

EXPOSE 8000
CMD [ "ts-node", "server.ts" ]