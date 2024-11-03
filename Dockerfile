# Stage 1: Build Stage
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies (including devDependencies in this build stage)
RUN npm install

# Copy the entire application code
COPY . .

# Stage 2: Production Stage
FROM node:20-alpine

# Set the working directory in the final image
WORKDIR /usr/src/app

# Copy only the production node_modules and necessary files from the build stage
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/src ./src

# Expose the port your app runs on
EXPOSE 3000

# Define the environment variable for production
ENV NODE_ENV=production

# Start the application
CMD ["node", "src/app.js"]