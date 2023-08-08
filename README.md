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

 Componente CardForm

Este componente es un formulario que se utiliza para gestionar tarjetas de crédito. Permite agregar nuevas tarjetas, validar los campos y mostrar una lista de tarjetas existentes.

## Uso

Para usar el componente, simplemente importa y renderiza `CardForm` en tu componente padre.

```javascript
import CardForm from './path/to/cardform';

// ...

return (
  <CardForm />
);
Funcionalidades
useState y useEffect
El estado del componente se maneja con el hook useState. Hay estados para las tarjetas, la tarjeta actual, y los errores de validación. useEffect se utiliza para obtener las tarjetas de la API al montar el componente.

Validación
La función handleInputChange valida los campos mientras el usuario los va completando, y actualiza tanto el estado del error como el de la tarjeta.

Agregar Tarjeta
handleAddCard es la función que maneja la adición de una nueva tarjeta. Realiza una petición POST a la API para agregar la tarjeta, enmascara el número de la tarjeta, y actualiza el estado con la nueva tarjeta.

Cancelar
La función handleCancel reinicia los campos del formulario, permitiendo al usuario cancelar la operación actual.

Estilos
Los estilos se manejan a través de la hoja de estilos card.css, la cual debe estar presente en la misma ubicación que el archivo del componente.

Componente Renderizado
El componente renderiza un formulario que permite al usuario ingresar los detalles de la tarjeta, junto con botones para agregar la tarjeta o cancelar la operación. También muestra una lista de tarjetas existentes debajo del formulario.

Dependencias
axios para realizar peticiones HTTP.

Este proyecto fue desarrollado como parte de un test para crear aplicación de gestion de tarjetas de credito. .


