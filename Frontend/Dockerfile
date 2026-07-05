# Stage 1: Build Angular app
FROM node:20-slim AS builder
WORKDIR /app

COPY package*.json ./

RUN npm ci --quiet

COPY . .

RUN npm run build --configuration production

FROM nginx:alpine
COPY --from=builder /app/dist/monetary/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]