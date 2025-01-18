# Use Node.js version 16.18 as the base image
FROM node:16.18

# Setup the environment variable PORT and set it to 3000
ENV PORT=3000

# Copy the package.json and package-lock.json files first
COPY package.json package-lock.json ./

# Set the working directory inside the container
WORKDIR /frontend-react-js

# Install dependencies
RUN npm install

# Expose port 3000
EXPOSE ${PORT}

# Start the React application
CMD ["npm", "start"]


