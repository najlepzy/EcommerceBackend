# Ecommerce

This project is built with Node.js using an Express server, Handlebars templates for client-side content rendering, and MongoDB as the database.

## Requirements

Before starting, ensure you have [Node.js](https://nodejs.org/) installed, version v20.15.0 or higher.

If you don't have pnpm installed, you can install it using the following command:

```bash
npm install -g pnpm
```

## Installation

### Clone the Repository

To obtain the project, use the following git command to clone the repository:

```bash
git clone https://github.com/najlepzy/EcommerceBackend.git
```

### Install Dependencies

```bash
pnpm install
```

### Start the Express Server with Nodemon

```bash
pnpm run dev
```

## Swagger

API documentation for each endpoint is available at:

```bash
http://localhost:8080/api-docs
```

## Artillery Test

Simulates virtual users performing actions as if they were real users, interacting with the API and its workflows.

### Run the Test

Use the following command to execute the test:

```bash
pnpm run load:test
```

### Report Files

```bash
artillery-results.json
report.html
```

## Docker

Simulates virtual users performing actions as if they were real users, interacting with the API and its workflows.

### Image

Use the following script to build the Docker image:

```bash
docker build -t coder-backend-dev .
```

Then, use the following scripts to verify that the build was created successfully and to view active containers:

```bash
docker images
docker ps
```

### Scripts to Run the Image Locally, on Docker Hub, and to Stop It

Locally:

```bash
pnpm run docker:dev
```

Stop the container:

```bash
docker stop CONTAINER-ID
```

Docker Hub:

```bash
docker run -p 8080:8080 --env-file .env lautanaj/coder-backend:latest
```

### Run UTest:

Locally:

```bash
npx jest
```
