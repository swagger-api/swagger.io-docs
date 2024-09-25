
# <img src="https://raw.githubusercontent.com/swagger-api/swagger.io/wordpress/images/assets/SW-logo-clr.png" height="60">  

For general support questions, please refer to the [Community Forums](https://community.smartbear.com/t5/Swagger-Open-Source-Tools/bd-p/SwaggerOSTools).

# Swagger Open Source Documentation

Welcome to the Swagger Open Source Documentation repository. This repository contains all the documentation for Swagger, an open-source suite of tools for API development, and OpenAPI Specification (FKA Swagger). The content of this repository is published at https://swagger.io/docs/.


## Tech Stack

We use [Astro](https://astro.build) to build and maintain our documentation. Astro is a powerful static site generator that allows us to create performant, content-rich documentation sites with ease.

## Contributing

We welcome contributions from the community! To contribute:

1. Fork the repository by clicking the "Fork" button on the top right of the repo page (this creates a copy under your GitHub account).
2. Clone your fork (`git clone https://github.com/your-username/swagger.io-docs.git`).
3. Create a new branch for your feature (`git checkout -b feature-branch-name`).
4. Make your changes locally.
5. Commit your changes (`git commit -m 'Add some feature'`).
6. Push to your fork (`git push origin feature-branch-name`).
7. Open a pull request from your fork on GitHub.
8. A maintainer will review your changes and merge them if approved.

Please ensure your change adheres to best practices and is well-documented.

## Running the Documentation Locally

### Getting Started

To get started with contributing to the Swagger Open Source Docs, follow these steps:

#### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (version 14 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

#### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/swagger-api/swagger.io-docs.git
    cd swagger.io
    ```

2. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

#### Running the Development Server

To start the development server and view the documentation locally:

```bash
npm run dev
# or
yarn dev
```

This will start the development server at `http://localhost:4321`, where you can view and edit the documentation.

#### Building the Documentation

To build the documentation for production:

```bash
npm run build
# or
yarn build
```

The built files will be output to the `dist` directory.