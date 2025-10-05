# Underwriting Demo

This is a React application that demonstrates a simple underwriting workflow. It allows users to upload an image, which is then processed by a backend service. The application then displays the results of the processing from an Airtable base.

## Features

*   Upload an image or take a picture.
*   Toggle between testing and production environments.
*   Fetches and displays data from an Airtable base.
*   Displays a summary, reasoning, and decision notes.

## Getting Started

### Prerequisites

*   Node.js and npm
*   An Airtable account and API key

### Installation and Setup

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/uwdemo.git
    cd uwdemo
    ```

2.  Install the dependencies:
    ```bash
    npm install
    ```

3.  Create a `.env` file in the root of the project and add the following environment variables:
    ```
    REACT_APP_AIRTABLE_API_KEY=your_airtable_api_key
    REACT_APP_PRODUCTION_URL=your_production_webhook_url
    REACT_APP_TESTING_URL=your_testing_webhook_url
    ```

### Available Scripts

In the project directory, you can run:

*   `npm start`: Runs the app in development mode.
*   `npm test`: Launches the test runner.
*   `npm run build`: Builds the app for production.
*   `npm run eject`: Ejects from Create React App.

## NGINX Configuration

The included `nginx.conf` file is configured to serve the production build of the application. It listens on port 80 and 443, and redirects HTTP traffic to HTTPS. The `root` is set to the `build` directory, and `try_files` is used to serve the `index.html` for all routes, which is necessary for single-page applications.