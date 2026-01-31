
## file structure

```
root/
├── css/                   # All stylesheets
│   ├── components/        # Styles for reusable UI elements
│   │   └── navbar.css
│   ├── pages/             # Page-specific styling
│   │   └── landing-page.css
│   └── main.css           # Global styles and variables
├── img/                   # Static image assets and icons
│   ├── menu-icon.svg
│   └── search-icon.svg
├── js/                    # Client-side JavaScript logic
│   └── index.js           # Main entry point for scripts
└── views/                 # HTML templates/pages
    ├── directory.html
    └── landing-page.html
```

### notes

#### 1. make sure that you import the reusable component you are styling in main.css:
```css
/*
*   Component css imports
*/
@import url('components/navbar.css');
```
