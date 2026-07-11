FROM node:20-slim AS builder
WORKDIR /app

COPY package*.json ./

RUN npm ci --quiet

COPY . .

RUN npx ng build Monetary --configuration production

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/Monetary/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]