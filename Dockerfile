# Stage 1: Build the application
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the source code and build the app
COPY . .
RUN npm run build

# Stage 2: Serve the production build using the "serve" npm package
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
RUN npm install -g serve

# Expose Cloud Run's expected port
EXPOSE 8080

# Serve the build output on port 8080
CMD ["serve", "-s", "dist", "-l", "8080"]
