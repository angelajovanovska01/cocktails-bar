FROM node:22 AS build

WORKDIR  /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:alpine

COPY --from=build /app/dist/cocktails-bar/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 88

CMD ["nginx", "-g", "daemon off;"]