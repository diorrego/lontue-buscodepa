# Build stage
FROM node:20-alpine AS build
WORKDIR /usr/src

# Install dependencies first for better caching. This layer will only be rebuilt when dependency files change.
COPY package*.json ./
RUN npm ci

# Copy the actual source code and build it
COPY . .
ENV NODE_ENV=production
RUN npm run build

# Include node_modules/ as the server side needs it, but prune it to remove development dependencies.
RUN npm prune --production

# Start with a fresh layer and include only the necessary files
FROM node:20-alpine AS distribution
WORKDIR /opt/lontue-buscodepa
ENV NODE_ENV=production

# Copy required files from the build stage
COPY --from=build /usr/src/node_modules node_modules
COPY --from=build /usr/src/.next .next
COPY --from=build /usr/src/public public
COPY --from=build /usr/src/server.js server.js
COPY --from=build /usr/src/next-i18next.config.js next-i18next.config.js
COPY --from=build /usr/src/next.config.js next.config.js

# Expose the port and run the application
EXPOSE 8080
CMD ["node", "server.js"]