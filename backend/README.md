# API de Gestión de Productos

Este es un microservicio API para la gestión de productos, desarrollado con **FastAPI** y **PostgreSQL**. Permite realizar operaciones CRUD sobre productos y gestionar la base de datos asociada a ellos.

## Requisitos

- Python 3.9+
- PostgreSQL
- Thunder Client (para probar los endpoints)

## Instrucciones de instalación

### 1. Clonar el repositorio

Primero, clona este repositorio en tu máquina local:

```bash
git clone https://github.com/andresalmeida/product-api.git
```

### 2. Crear la base de datos

Antes de ejecutar la API, asegúrate de tener una base de datos PostgreSQL corriendo. Si estás utilizando pgAdmin4:

#### 1. Inicia pgAdmin4 y conecta a tu servidor de PostgreSQL.
#### 2. Crea una base de datos llamada productos_db.

### 3. Configuración de la base de datos
Asegúrate de que los parámetros de conexión a la base de datos estén correctamente configurados en el archivo de configuración de tu aplicación (main.py & database.py).

### 4. Ejecutar la aplicación FastAPI
Una vez que hayas configurado la base de datos, ejecuta la aplicación de FastAPI:
```bash
uvicorn main:app --reload
```
Esto iniciará el servidor en http://localhost:8000.

### 5. Probar los endopoints con Thunder Client
Para probar los endpoints de la API, usa Thunder Client o cualquier otra herramienta de tu preferencia, como Postman.

Endpoints disponibles

- GET /products: Obtiene la lista de todos los productos.
  - Método: GET
  - URL: http://localhost:8000/products

- GET /products/{product_id}: Obtiene un producto por su ID.
  - Método: GET
  - URL: http://localhost:8000/products/{product_id}

- POST /products: Crea un nuevo producto.
  - Método: POST
  - URL: http://localhost:8000/products
  - Cuerpo de la solicitud (JSON):
```bash
{
  "name": "Nuevo Producto",
  "description": "Descripción del producto",
  "price": 100.0
}
```
- PUT /products/{product_id}: Actualiza un producto existente.
  - Método: PUT
  - URL: http://localhost:8000/products/{product_id}
  - Cuerpo de la solicitud (JSON):
```bash
{
  "name": "Producto Actualizado",
  "description": "Descripción actualizada",
  "price": 120.0
}
```
- DELETE /products/{product_id}: Elimina un producto por su ID.
  - Método: DELETE
  - URL: http://localhost:8000/products/{product_id}

## Estructura del Proyecto

```bash
.
├── main.py               # Archivo principal de la API
├── models
│   └── product.py        # Modelo de Producto en la base de datos
└── requirements.txt      # Dependencias de Python
```

## Requerimientos de dependencias

Este proyecto utiliza las siguientes dependencias:

- fastapi: Framework para la construcción de la API.
- uvicorn: Servidor ASGI para ejecutar FastAPI.
- psycopg2: Adaptador para la conexión con PostgreSQL.

Para instalar las dependencias, ejecuta:

```bash
pip install -r requirements.txt
```

## Contribución
Si deseas contribuir, por favor realiza un fork del repositorio, crea una rama con tus cambios y envía un pull request.

## Licencia
Este proyecto está bajo la Licencia MIT.

## Contacto
Si tienes alguna pregunta, no dudes en contactarme a través de almeidaandres12@gmail.com.


