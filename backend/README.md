# Tarjeta de Credito API

Este proyecto proporciona una API RESTful para gestionar tarjetas de credito. Las tarjetas se almacenan en un archivo `cards.json`, actuando como una base de datos simple.

## Instalacion

1. Clonar el repositorio
2. Instalar las dependencias con `npm install`
3. Iniciar el servidor con `npm run dev`
4. Asegurarse de que el servidor este corriendo en el puerto 3000. Puede configurar esto en el archivo de configuracion del servidor.


## Endpoints

### GET /cards

Muestra todas las tarjetas de credito almacenadas en `cards.json`.

### POST /cards

Agrega una nueva tarjeta de credito. Espera un cuerpo JSON con los siguientes campos:

- `cardNumber`: String, debe contener el número de la tarjeta enmascarado (mostrando los 2 primeros números y los últimos 4).
- `holderName`: String, nombre del titular de la tarjeta.
- `expiryDate`: String, fecha de vencimiento de la tarjeta.

### PUT /cards/:id

Actualiza una tarjeta de credito existente por ID. Espera un cuerpo JSON con los campos que se quieran actualizar.

### DELETE /cards/:id

Elimina una tarjeta de credito existente por ID.

## Estructura del Proyecto

- `app.js`: Contiene la configuracion del servidor y las rutas de la API.
- `cards.json`: Almacena las tarjetas de credito en formato JSON.

## Tecnologías Utilizadas

- Node.js
- Express
- Cors
- Nodemon

---

Este proyecto fue desarrollado como parte de un test para crear aplicación de gestion de tarjetas de credito. .
