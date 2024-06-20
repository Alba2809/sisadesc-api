# SISADESC - Sistema de Administración Escolar (Backend)
Este es el backend del Sistema de Administración Escolar, desarrollado con Node.js y Express.

## Descripción
Este proyecto es el backend de un Sistema de Administración Escolar que permite administrar la comunicación entre los padres de familia y la institución educativa de manera veraz y eficiente. 
Da clic en este link para dirigirte al [Frontend](https://github.com/Alba2809/sisadesc) del proyecto.

## Librerías Utilizadas
- **Node.js**: Entorno de ejecución de JavaScript del lado del servidor.
- **Express**: Framework web rápido, no opinativo y minimalista para Node.js que facilita la creación de API web y aplicaciones.
- **bcryptjs**: Librería para el hashing de contraseñas.
- **cookie-parser**: Parseador de cookies para Node.js.
- **cors**: Middleware para Node.js que acepta solicitudes HTTP de otros dominios.
- **dotenv**: Librería para la gestión de variables de entorno.
- **jsonwebtoken**: Librería para la creación de tokens JWT.
- **morgan**: Middleware de logging para Express.
- **multer**: Middleware de Node.js para el manejo de formularios multiparte, especialmente para cargar archivos.
- **mysql2**: Librería para conectar Node.js a MySQL.
- **nodemon**: Librería que reinicia automáticamente el servidor cuando se detectan cambios en el código.
- **socket-io**: Biblioteca que permite la comunicación bidireccional en tiempo real entre clientes web y servidores.
- **uuid**: Librería para generar UUID.
- **zod**: Librería para validación de esquemas de datos en TypeScript y JavaScript.

## Instalación
1. **Clonar repositorio**:
   ```bash
   git clone https://github.com/Alba2809/sisadesc-api
   cd sisadesc-api
   ```
2. **Instalar dependencias**:
   ```bash
   npm install
   ```
3. **Crear la base de datos**.
4. **Configurar las variables de entorno**:
   - **TOKEN_SECRET**: Valor secreto para la creación de tokens JWT. Puedes ocupar `openssl rand -hex 32` en windows para crear un a cadena aleatoria.
   - **PORT**: Puerto en el que se ejecutará el servidor.
   - **FRONTEND_URL**: URL del frontend.
   - **HOST_MYSQL**: Host de la base de datos.
   - **USER_MYSQL**: Usuario de la base de datos.
   - **PASSWORD_MYSQL**: Contraseña de la base de datos.
   - **DATABASE_MYSQL**: Nombre de la base de datos.
   - **PORT_MYSQL**: Puerto de la base de datos.

   El archivo `config.js` ya contiene valores por defecto, por lo que puedes cambiarlos desde ese archivo.

5. **Ejecutar el servidor**:
   ```bash
   npm run dev
   ```

## Uso
- Por defecto el servidor estará corriendo en `http://localhost:4000`.
- El [frontend](https://github.com/Alba2809/sisadesc) se comunicará con este servidor para gestionar la información del sistema de administración escolar.


COPYRIGHT © 2024 SISADESC.