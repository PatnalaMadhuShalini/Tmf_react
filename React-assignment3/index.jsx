import React from 'react';
import ReactDOM from 'react-dom/client';
import './header.css';

// 1. Nested Header Element using React.createElement
const nestedHeader = React.createElement("div", { className: "title" },
  React.createElement("h1", null, "Main Title"),
  React.createElement("h2", null, "Subtitle"),
  React.createElement("h3", null, "Sub-subtitle")
);

// 2. Same structure using JSX
const nestedHeaderJSX = (
  <div className="title">
    <h1>Main Title</h1>
    <h2>Subtitle</h2>
    <h3>Sub-subtitle</h3>
  </div>
);

// 3. Functional component of the same using JSX
const TitleComponent = () => (
  <div className="title">
    <h1>Main Title</h1>
    <h2>Subtitle</h2>
    <h3>Sub-subtitle</h3>
  </div>
);

// 4. Component Composition - Add a component inside another
const WrapperComponent = () => (
  <div className="wrapper">
    <TitleComponent />
    <p>This is additional content inside the wrapper.</p>
  </div>
);

// 5. Compare {TitleComponent} vs <TitleComponent/> vs <TitleComponent></TitleComponent> in JSX
const ComparisonComponent = () => (
  <div>
    <h4>Comparison of TitleComponent usage:</h4>
    <div>{TitleComponent()}</div> {/* Using as function */}
    <TitleComponent /> {/* Self-closing tag */}
    <TitleComponent></TitleComponent> {/* Opening and closing tags */}
  </div>
);

// 6. Header Component from Scratch using Functional Components with JSX
const Header = () => (
  <header className="header">
    <div className="logo">
      <img src="https://via.placeholder.com/50x50?text=Logo" alt="Logo" />
    </div>
    <div className="search-bar">
      <input type="text" placeholder="Search..." />
    </div>
    <div className="user-icon">
      <img src="https://via.placeholder.com/40x40?text=User" alt="User" />
    </div>
  </header>
);

// Additional Example Components
const ExampleList = () => (
  <ul>
    <li>Example 1: Basic nesting</li>
    <li>Example 2: With props</li>
    <li>Example 3: Event handling</li>
  </ul>
);

const StyledParagraph = () => (
  <p className="styled-para">This is a styled paragraph with additional content.</p>
);

// Enhanced Component Composition
const EnhancedWrapper = () => (
  <div className="enhanced-wrapper">
    <TitleComponent />
    <ExampleList />
    <StyledParagraph />
  </div>
);

// Main App Component
const App = () => (
  <div>
    <h1>React Assignment 3 - Enhanced Examples</h1>
    <section>
      <h2>1. Nested Header using React.createElement</h2>
      {nestedHeader}
      <p>Example: This demonstrates creating nested elements programmatically.</p>
    </section>
    <section>
      <h2>2. Same structure using JSX</h2>
      {nestedHeaderJSX}
      <p>Example: JSX provides a more readable way to define the same structure.</p>
    </section>
    <section>
      <h2>3. Functional Component using JSX</h2>
      <TitleComponent />
      <p>Example: Reusable component for consistent title sections.</p>
    </section>
    <section>
      <h2>4. Component Composition</h2>
      <WrapperComponent />
      <p>Example: Combining components to build complex UIs.</p>
    </section>
    <section>
      <h2>5. Comparison of Component Usage</h2>
      <ComparisonComponent />
      <p>Example: Different ways to render components in JSX.</p>
    </section>
    <section>
      <h2>6. Header Component</h2>
      <Header />
      <p>Example: A complete header with logo, search, and user icon.</p>
    </section>
    <section>
      <h2>7. Enhanced Examples</h2>
      <EnhancedWrapper />
      <p>Example: More complex composition with lists and styled elements.</p>
    </section>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
