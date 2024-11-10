# Sistema de Gestión de Inventario Dockerizado

Este proyecto incluye la dockerización de un **backend** desarrollado en **FastAPI** junto con una base de datos **PostgreSQL**, y un **frontend** en **React** servido por **Nginx**. Todo esto se gestiona mediante **Docker** y **Docker Compose** para facilitar su despliegue y garantizar la persistencia de datos.

## Tabla de Contenidos

- [Descripción](#descripción)
- [Requisitos Previos](#requisitos-previos)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Archivos Clave](#archivos-clave)
  - [Dockerfile del Backend](#dockerfile-del-backend)
  - [Dockerfile del Frontend](#dockerfile-del-frontend)
  - [docker-compose.yml](#docker-composeyml)
- [Explicación de la Configuración](#explicación-de-la-configuración)
  - [Backend](#backend)
  - [Frontend](#frontend)
  - [Base de Datos](#base-de-datos)
- [Instrucciones de Uso](#instrucciones-de-uso)
- [Notas Importantes](#notas-importantes)

## Descripción

El sistema de gestión de inventario se compone de un backend para manejar la lógica de negocio y la base de datos, y un frontend para interactuar con el usuario. Gracias a Docker, ambos servicios se pueden ejecutar en contenedores independientes, pero comunicados entre sí.

## Requisitos Previos

- **Docker** (v20.10 o superior)
- **Docker Compose** (v1.29 o superior)

## Estructura del Proyecto

```
project-root/
├── backend/
│   ├── main.py
│   ├──├── product.py
│   ├── database.py
│   ├── schemas.py
│   ├── main.py
│   ├── requirements.txt
│   ├── Dockerfile
│   └── wait-for-it.sh
├── frontend/
│   ├── public/
│   ├── src/
│   ├── Dockerfile
│   └── nginx.conf
├── docker-compose.yml
└── README.md
```

## Archivos Clave

### Dockerfile del Backend

```dockerfile
FROM python:3.10-slim

WORKDIR /app

COPY . .

RUN apt-get update && apt-get install -y netcat-traditional
RUN chmod +x wait-for-it.sh
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000

CMD ["./wait-for-it.sh", "db", "5432", "--", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Dockerfile del Frontend

```dockerfile
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### docker-compose.yml

```yaml
version: "3.9"

services:
  db:
    image: postgres:15
    container_name: postgres_db
    ports:
      - "5433:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: productos_db
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  web:
    build:
      context: ./backend
    container_name: microservicio_productos
    ports:
      - "8001:8000"
    depends_on:
      db:
        condition: service_healthy
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/productos_db

  frontend:
    build:
      context: ./frontend
    container_name: frontend_app
    ports:
      - "3000:80"
    depends_on:
      - web

volumes:
  postgres_data:
```

## Explicación de la Configuración

### Backend

- **FastAPI** se ejecuta en el contenedor `microservicio_productos`.
- La comunicación con la base de datos se realiza a través de `DATABASE_URL`.
- Usa `wait-for-it.sh` para asegurar que la base de datos esté lista antes de iniciar.

### Frontend

- Se construye la aplicación de React y luego se sirve con **Nginx**.
- Se usa el archivo `nginx.conf` para manejar las solicitudes.

### Base de Datos

- **PostgreSQL** se ejecuta en el contenedor `postgres_db`.
- Incluye un `healthcheck` para garantizar que esté operativo antes de que el backend intente conectarse.
- Los datos se almacenan de manera persistente usando `postgres_data`.

## Instrucciones de Uso

1. **Clonar el repositorio:**

   ```bash
   git
   cd
   ```

2. **Construir y levantar los contenedores:**

   ```bash
   docker-compose up --build
   ```

3. **Acceder a los servicios:**

   - Backend: [http://localhost:8001/docs](http://localhost:8001/docs)
   - Frontend: [http://localhost:3000](http://localhost:3000)

4. **Detener los contenedores:**

   ```bash
   docker-compose down
   ```

## Notas Importantes

- **Persistencia de Datos:**  
  El volumen `postgres_data` asegura que los datos de la base de datos no se pierdan incluso si el contenedor se detiene o elimina.

- **Cambio de Puertos:**
  - Backend: Mapeado en el puerto `8001` (host) al `8000` (contenedor).
  - Base de Datos: Mapeado en el puerto `5433` (host) al `5432` (contenedor).
  - Frontend: Mapeado en el puerto `3000` (host) al `80` (contenedor).


