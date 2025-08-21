# ---- Build stage ----
FROM node:20-alpine AS builder

WORKDIR /app

# Copy only package files first to leverage Docker layer caching
COPY my-latest-product/package*.json my-latest-product/

WORKDIR /app/my-latest-product
RUN npm ci

# Copy the rest of the app
COPY my-latest-product/ .

# Build the static site
RUN npm run build

# ---- Runtime stage ----
FROM nginx:alpine AS runtime

# Copy built assets to Nginx html directory
COPY --from=builder /app/my-latest-product/dist /usr/share/nginx/html

# Expose default HTTP port
EXPOSE 80

# Use default Nginx start command
CMD ["nginx", "-g", "daemon off;"]

