# Usar una imagen de Node para construir la aplicación
FROM node:18-alpine as build

WORKDIR /app

# Copia solo los archivos necesarios para el build
COPY package*.json ./

# Instala las dependencias usando npm
RUN npm install

COPY . .

# Compila la aplicación React
RUN npm run build

# Usar una imagen de Nginx para servir la aplicación
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
