# Use Node.js version 16.18 as the base image
FROM node:16.18

# Setup the environment variable PORT and set it to 3000
ENV PORT=3000

# Set the working directory inside the container to /frontend-react-js
WORKDIR /frontend-react-js

# Copy the package.json and package-lock.json files to the working directory
COPY package.json package-lock.json ./

# Install the dependencies defined in package.json
RUN npm install

# Copy the rest of the application files into the working directory
COPY . .

# Expose the application port (3000) to allow external access
EXPOSE ${PORT}

# Start the React application using npm when the container runs
CMD ["npm", "start"]

