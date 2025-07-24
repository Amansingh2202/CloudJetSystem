# Base image
FROM node:18

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Set the port (match with your service)
EXPOSE 3002  

# Start the server
CMD ["node", "index.js"]
