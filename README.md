
# Swagger Open Source Docs

Welcome to the Swagger Open Source Documentation repository. This repository contains all the documentation for Swagger, an open-source suite of tools for API development.

## Tech Stack

We use [Starlight by Astro](https://astro.build/starlight) to build and maintain our documentation. Starlight is a powerful static site generator that allows us to create performant, content-rich documentation sites with ease.

## Getting Started

To get started with contributing to the Swagger Open Source Docs, follow these steps:

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (version 14 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/swagger-api/swagger.io.git
    cd swagger.io
    ```

2. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Development Server

To start the development server and view the documentation locally:

```bash
npm run dev
# or
yarn dev
```

This will start the development server at `http://localhost:4321`, where you can view and edit the documentation.

### Building the Documentation

To build the documentation for production:

```bash
npm run build
# or
yarn build
```

The built files will be output to the `dist` directory.

## Contributing

We welcome contributions from the community! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch-name`).
6. Open a pull request.

Please ensure your code adheres to our coding standards and is well-documented.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For any questions or feedback, please reach out to us at [support@swagger.io](mailto:support@swagger.io).
