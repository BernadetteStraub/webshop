# Stage 1: Build the Angular application
FROM node:16 AS build
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY ./src ./src

# Build the application
RUN npm run build -- --prod --outputPath=./dist

# Stage 2: Serve the application with Nginx
FROM nginx:1.7.9-alpine

# Copy the built application from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the Nginx configuration
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
