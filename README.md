# Ecommerce

Este es un proyecto realizado en Node.js con servidor en Express utilizando plantillas de Handlebars para visualizar el contenido del lado del cliente y MongoDB como base de datos.

## Requisitos

Antes de comenzar, asegúrate de tener instalado [Node.js](https://nodejs.org/) en su versión v20.15.0 o superior.

En caso de no tener pnpm instalarlo con el siguiente comando:

```bash
npm install -g pnpm
```

## Instalación

### Clonar el repositorio

Para obtener el proyecto, utiliza el siguiente comando git para clonar el repositorio:

```bash
git clone https://github.com/najlepzy/EcommerceBackend.git
```

### Instalar dependencias

```bash
pnpm install
```

### Inicializar servidor de Express con nodemon

```bash
pnpm run dev
```

### Swagger

En el se encuentra documentación de cada uno de los endpoints de la API

```bash
http://localhost:8080/api-docs
```

### Artillery Test

Crea usuarios virtuales (simulaciones) que realizan acciones como si fueran personas reales utilizando la API y cada uno de sus flujos.

## Ejecuta la prueba con el siguiente comando:

```bash
pnpm run load:test
```

## Archivo de reporte:

```bash
artillery-results.json
```
