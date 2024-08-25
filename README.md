# My React Table of Contents (ToC) Component

A lightweight and customizable Table of Contents (ToC) component for React applications. This component automatically generates a table of contents from your headings (`h1`, `h2`, `h3` by default) and highlights the active section as you scroll.

## Features

- **Automatic Table of Contents**: Automatically generates a table of contents from the specified heading tags (`h1`, `h2`, `h3`, etc.).
- **Scroll-Based Highlighting**: Highlights the active heading based on the user's scroll position.
- **Customizable**: Allows customization of text color, text alignment, and targeted heading tags.

## Installation

Install the package via npm:

```bash
npm install my-react-toc
```

## Basic Usage
 Here’s how you can use the ToC component with default settings:
```js
import React from 'react';
import ToC from 'my-react-toc';

const App: React.FC = () => {
  return (
    <div>
      <ToC />
      <div style={{ padding: '0 20px' }}>
        <h1>Introduction</h1>
        <p>Some content for the introduction...</p>
        
        <h2>Chapter 1</h2>
        <p>Details of chapter 1...</p>
        
        <h3>Section 1.1</h3>
        <p>Details of section 1.1...</p>
        
        <h2>Chapter 2</h2>
        <p>Details of chapter 2...</p>
        
        <h1>Conclusion</h1>
        <p>Some content for the conclusion...</p>
      </div>
    </div>
  );
};

export default App;
```

## Customizing the ToC Component
### Props

The `ToC` component accepts the following props:

| Prop Name   | Type       | Default              | Description                                                |
|-------------|------------|----------------------|------------------------------------------------------------|
| `textColor` | `string`   | `"gray"`             | The color of the text in the ToC.                           |
| `textAlign` | `string`   | `"right"`            | The alignment of the text in the ToC (`left`, `right`, `center`). |
| `tagList`   | `string[]` | `['h1', 'h2', 'h3']` | An array of tag names to include in the ToC.                |

### Example
```tsx
<ToC 
  textColor="darkred" 
  textAlign="left" 
  tagList={['h1', 'h2', 'h3', 'h4']}
/>
```

```tsx
import React from 'react';
import ToC from 'my-react-toc';

const App: React.FC = () => {
  return (
    <div>
      <ToC 
        textColor="blue" 
        textAlign="left" 
        tagList={['h1', 'h2', 'h3', 'h4']} 
      />
      <div style={{ padding: '0 20px' }}>
        <h1>Introduction</h1>
        <p>Some content for the introduction...</p>
        
        <h2>Chapter 1</h2>
        <p>Details of chapter 1...</p>
        
        <h3>Section 1.1</h3>
        <p>Details of section 1.1...</p>
        
        <h4>Subsection 1.1.1</h4>
        <p>Details of subsection 1.1.1...</p>
        
        <h2>Chapter 2</h2>
        <p>Details of chapter 2...</p>
        
        <h1>Conclusion</h1>
        <p>Some content for the conclusion...</p>
      </div>
    </div>
  );
};

export default App;
```

## Contributing
If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request on GitHub.

## License
This project is licensed under the MIT License - see the LICENSE file for details.