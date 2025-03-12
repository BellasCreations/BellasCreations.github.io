# Bella's Creations Website - EmailJS Setup Instructions

This document provides instructions on how to set up the automatic email sending functionality for the Bella's Creations website using EmailJS.

## EmailJS Setup

The website uses EmailJS to send emails from the contact and order forms. Follow these steps to set it up:

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create a new email service (e.g., Gmail, Outlook, etc.)
3. Create two email templates:
   - One for the order form (name it "order_template")
   - One for the contact form (name it "contact_template")
   - Optionally, create a third template for file uploads (name it "file_template")

4. In each template, use the following variables:
 
   **Order Template Variables:**
   - {{to_email}} - The recipient email (bella.creations.bg@gmail.com)
   - {{from_name}} - The name of the person placing the order
   - {{from_email}} - The email of the person placing the order
   - {{phone}} - The phone number (if provided)
   - {{order_type}} - The type of order (Caricature or 3D Printed Figure)
   - {{style}} - The style selected
   - {{size}} - The size selected
   - {{quantity}} - The quantity ordered
   - {{delivery_method}} - The delivery method selected
   - {{message}} - The order description
   - {{instagram_link}} - The Instagram link (if provided)
   - {{file_uploaded}} - Whether a file was uploaded
   - {{subject}} - The email subject

   **Contact Template Variables:**
   - {{to_email}} - The recipient email (bella.creations.bg@gmail.com)
   - {{from_name}} - The name of the person contacting
   - {{from_email}} - The email of the person contacting
   - {{subject}} - The subject of the message
   - {{message}} - The message content
   - {{instagram_link}} - The Instagram link (if provided)

   **File Template Variables (optional):**
   - {{to_email}} - The recipient email (bella.creations.bg@gmail.com)
   - {{from_name}} - The name of the person who uploaded the file
   - {{from_email}} - The email of the person who uploaded the file
   - {{subject}} - The email subject
   - {{message}} - A message about the file
   - {{file_url}} - The URL of the uploaded file

5. Get your EmailJS User ID from the dashboard
6. Update the following files with your EmailJS User ID:
   - js/order.js
   - js/contact.js

   Replace the placeholder "YOUR_USER_ID" with your actual EmailJS User ID in both files.

7. If you want to handle file uploads, you'll need to set up a Cloudinary account:
   - Create an account at [Cloudinary](https://cloudinary.com/)
   - Get your Cloud Name
   - Create an upload preset (set it to "unsigned" for client-side uploads)
   - Update the Cloudinary upload URL in js/order.js with your Cloud Name
   - Replace "YOUR_CLOUD_NAME" with your actual Cloudinary cloud name
   - Replace "bella_creations" with your actual upload preset name

## Testing

After setting up EmailJS, test both forms to ensure emails are being sent correctly to bella.creations.bg@gmail.com.

If you encounter any issues, check the browser console for error messages.

## Security Considerations

While this implementation is secure enough for a small business website, please note:

1. The EmailJS User ID is visible to users who inspect the page source. This is not a security risk as the User ID alone cannot be used to send emails from other domains.

2. For file uploads, consider implementing server-side validation if you expect large files or need more security.

3. For a high-traffic website, you might want to consider a server-side solution for better reliability and security.

