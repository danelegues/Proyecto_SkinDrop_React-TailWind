FROM node:23.6.0
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "run", "build"]
CMD ["npm", "start"]
