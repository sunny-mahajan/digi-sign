# Getting Started with Digi Sign
The SignationModal component is a versatile signature input component for React that provides users with the ability to draw or type their signatures. It offers options for customizing the appearance, such as font colors and styles. After capturing the signature, the component returns the generated image in the onSave callback as a base64-encoded string.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## The SignationModal component accepts the following props:
- onClose: A callback function invoked when the modal is closed.
- onSave: A callback function invoked when the signature is saved. It receives the generated signature image as a base64-encoded string
- colorOptions: An array of color options for the signature font. Default is ["#000000", "#2293fb", "#4636e3"].
- gooleFontUrls: An array of Google Font URLs for customizing the text signature. Default includes some sample fonts.
- width: The width of the signature canvas. Default is "400px".
- height: The height of the signature canvas. Default is "200px".

## Features
- Draw Signature: Use the drawing option to capture signatures with a freehand drawing.
- Type Signature: Type a text-based signature with customizable fonts and colors.
- Customization: Choose from a variety of font colors and Google Fonts for a personalized signature.
