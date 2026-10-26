FROM node:22-bookworm-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY server.mjs messages.mjs ./
USER node
CMD ["node","server.mjs"]
