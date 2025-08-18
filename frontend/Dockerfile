# --- Build stage ---
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies (including devDeps for build)
COPY package*.json ./
RUN npm ci

# Copy the rest of the source
COPY . .

# Accept the API URL as a build argument (if needed during build)
ARG PRIVATE_API_BASE_URL
ENV PRIVATE_API_BASE_URL=$PRIVATE_API_BASE_URL

# Build SvelteKit (adapter-node will output to /app/build)
RUN npm run build


# --- Production stage ---
FROM node:20-alpine AS runtime
WORKDIR /app

# Copy only the package.json (for production deps)
COPY package*.json ./

# Install only production deps
RUN npm ci --omit=dev

# Copy the built app from the build stage
COPY --from=build /app/build ./build

# (optional) copy static files if you need them, e.g. /app/static
# COPY --from=build /app/static ./static

# Expose the port your app will run on
EXPOSE 3000

# Run the app
CMD ["node", "build"]
