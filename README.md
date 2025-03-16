
# XML Form Craft

A dynamic form builder and renderer that uses XML to define form structure and fields.

## What technologies are used for this project?

This project is built with:

- Vite - Fast build tool and development server
- TypeScript - Typed JavaScript for better developer experience
- React - UI component library
- shadcn-ui - Component library built on Radix UI
- Tailwind CSS - Utility-first CSS framework

## Features

- Parse XML form definitions
- Render dynamic forms based on XML structure
- Support for multiple field types:
  - Text fields
  - Date fields
  - Radio button groups
  - Drawing fields
  - Textarea fields
- Form validation
- Responsive design

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Visit `http://localhost:8080` in your browser

## XML Form Structure

Forms are defined using XML with the following structure:

```xml
<form title="Sample Form">
  <textfield id="name" label="Full Name" required="true" />
  <datefield id="birthdate" label="Date of Birth" />
  <radiofield id="gender" label="Gender">
    <option value="male">Male</option>
    <option value="female">Female</option>
    <option value="other">Other</option>
  </radiofield>
  <drawingfield id="signature" label="Signature" />
  <textareafield id="comments" label="Additional Comments" />
</form>
```

