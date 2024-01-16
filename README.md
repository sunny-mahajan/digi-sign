SignationModal Component
The SignationModal component is a versatile signature input component for React that provides users with the ability to draw or type their signatures. It offers options for customizing the appearance, such as font colors and styles. After capturing the signature, the component returns the generated image in the onSave callback as a base64-encoded string.

Installation
To use the SignationModal component, follow these steps:

Install the required dependencies:
npm install react-signature-canvas

Import the SignationModal component in your project:
import SignationModal from 'path/to/SignationModal';

Include the necessary styles:
Import the CSS file associated with the SignationModal component in your project:
import 'path/to/SignationModal.css';

Usage
Use the SignationModal component in your project:
import React, { useState } from 'react';
import SignationModal from 'path/to/SignationModal';

const [signatureImage, setSignatureImage] = useState(null);

const handleSaveSignature = (image) => {
    // Handle the generated signature image (base64-encoded) here
    setSignatureImage(image);
};

const handleCloseModal = () => {
    // Handle modal close or other actions
};

return (
<div>
    {/* Button to open the SignationModal */}
    {!signatureImage && <SignationModal onSave={handleSaveSignature} onClose={handleCloseModal} />}
</div>
);
}

Props
The SignationModal component accepts the following props:
onClose: A callback function invoked when the modal is closed.
onSave: A callback function invoked when the signature is saved. It receives the generated signature image as a base64-encoded string.
colorOptions: An array of color options for the signature font. Default is ["#000000", "#2293fb", "#4636e3"].
gooleFontUrls: An array of Google Font URLs for customizing the text signature. Default includes some sample fonts.
width: The width of the signature canvas. Default is "400px".
height: The height of the signature canvas. Default is "200px".

Features
Draw Signature: Use the drawing option to capture signatures with a freehand drawing.
Type Signature: Type a text-based signature with customizable fonts and colors.
Customization: Choose from a variety of font colors and Google Fonts for a personalized signature.
