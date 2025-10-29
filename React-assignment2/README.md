# Hello World in Three Ways

This project demonstrates "Hello World" using three different approaches: plain HTML, JavaScript DOM manipulation, and React via CDN.

## What We Did

1. **Created three HTML files** showing different ways to display "Hello World":
   - Plain HTML version
   - JavaScript DOM manipulation version
   - React via CDN version

2. **Set up development environment** with Parcel bundler

3. **Added viewport meta tags** to all HTML files for mobile compatibility

## Installation Commands Used

```bash
# Initialize npm project
npm init -y

# Install Parcel bundler as dev dependency
npm install -D parcel

# Install React and ReactDOM
npm install react react-dom

# Start development server
npx parcel hello-html.html --port 3000
npx parcel hello-js.html --port 3001
npx parcel hello-react.html --port 3002

# Build for production
npx parcel build index.html
```

## Files Created

- `hello-html.html` - Static HTML "Hello World"
- `hello-js.html` - Dynamic JavaScript DOM manipulation
- `hello-react.html` - React with CDN links
- `package.json` - Project configuration
- `README.md` - This documentation

## How to Run

1. Install dependencies: `npm install`
2. Open any `.html` file in browser or run development server
3. View "Hello World" in different implementations

## Learning Outcomes

- HTML document structure
- JavaScript DOM manipulation
- React fundamentals
- CDN usage
- Development workflow with Parcel
