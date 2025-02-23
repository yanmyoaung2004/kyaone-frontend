# Use a Debian-based Node.js image
FROM node:18-bullseye AS build

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production image
FROM node:18-bullseye-slim AS production
WORKDIR /app

COPY --from=build /app/dist ./dist
COPY package.json package-lock.json ./
RUN npm ci --only=production --legacy-peer-deps

EXPOSE 4173
CMD ["npm", "run", "preview"]
