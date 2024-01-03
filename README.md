# Unikasas Baceknd (Node.js)

Este repositorio contiene los archivos necesarios del desarrollo backend de la empresa Unikasas, esta construido con Node.js, usando MongoDB como base de datos, permitiendo la atenticación con Json web Token para los usuarios en las rutas protegidas.

## Instalación

1. Clona el repositorio: `git clone <URL_DEL_REPOSITORIO>`
2. Instala las dependencias: `npm install`

## Uso del sistema 

> [!NOTE]
> Estos si son los pasos necesarios para utilizar o trabajar en el proyecto 

1. Para iniciar la aplicación en entorno de desarrollo: `npm run dev`

## Librerias utilizadas en el proceso de desarrollo 

> [!IMPORTANT] 
> No es necesario intalarlas manualmente ya se intalaro si ejecutaste los comandos de instalación

Librerias utilizadas en el desarrollo
1. `npm i express`
2. `npm i nodemon -D`
3. `npm i morgan`
4. `npm install mongoose`
5. `npm i bcryptjs`
6. `npm i jsonwebtoken`
7. `npm i cookie-parser`
8. `npm i zod`
9. `npm i cors`
9. `npm i express pdfkit`
10. `npm i pdfkit-table`
11. `npm i exceljs`
12. `npm i nodemailer`

## Organizacion del proyecto - Directorios o carpetas

> [!TIP]
Las carpetas se encuentran distribuidas de la siguiente manera

1. src /: 
    - controller: Controladores de los diferentes modulos del sistema.
    - libs: Archivos con funciones que se usan en varios modulos del sistema.
    - middlewares: Archivos con funciones de validacion de campos y de Tokens.
    - models: Modelos de las colecciones en MongoDB.
    - routes: Rutas de cada uno de los modulos del sistema.
    - schemas: Archivos de validacion de campos antes de ingresar los datos a las colecciones

2. Documentos importantes

- config.js: Archivo con las variables que se leen desde el .env
- db.js: Archivo con la funcion de conexión de la base de datos.
- index.js: Archivo encargado de levantar el servidor.
- .env: Archivo de variables de entorno necesarioas para la ejecucion del servidor.
