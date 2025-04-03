# Fontaine - Custom Font Generation Tool

A Next.js application for a custom font generation tool that creates unique typography to match a user's brand identity.

## Features

- Modern, component-based UI with Next.js
- Light and dark mode support with theme persistence
- Responsive design that works on all devices
- Server-side rendering for better performance and SEO
- Custom components without relying on UI libraries
- SVG icons and illustrations
- API routes for backend integrations (coming soon)

## Tech Stack

- **Next.js** - React framework with server components
- **TypeScript** - For type safety
- **CSS Variables** - For theming
- **Next.js Image Optimization** - For optimized image loading
- **React Server Components** - For better performance

## Getting Started

First, clone the repository and install dependencies:

```bash
git clone <your-repo-url>
cd fontaine-next
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/app` - Next.js app directory with layout and page components
- `/components` - React components organized by type
  - `/layout` - Layout components like Header, Footer, etc.
  - `/ui` - Reusable UI components
- `/public` - Static assets including images

## Development

### Adding New Features

To add new features to the application:

1. Create appropriate components in the `/components` directory
2. Import and use them in relevant pages
3. Add necessary styles to the global CSS or component-specific CSS

### Styling

The project uses CSS variables for theming, defined in `app/globals.css`. To modify the theme:

1. Update the variables in the `:root` selector for light mode
2. Update the variables in the `[data-theme="dark"]` selector for dark mode

## Deployment

The application can be deployed on Vercel or any other platform that supports Next.js:

```bash
npm run build
```

## Future Enhancements

- Add font generation API integration
- Implement user authentication
- Create a dashboard for font management
- Add font preview and customization tools

## License

[MIT](LICENSE)
