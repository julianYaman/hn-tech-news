# build stage
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Accept the API URL as a build argument and set it as an environment variable
ARG PRIVATE_API_BASE_URL
ENV PRIVATE_API_BASE_URL=$PRIVATE_API_BASE_URL

RUN npm run build

# final stage
FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules

EXPOSE 4173

CMD ["node", "build"]