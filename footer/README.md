# Footer

## How to implement

---

### 1. HTML

Copy all code starting from footer tag to the end of it from `index.html` and paste it to your page.

```html
<footer>...</footer>
```

### 2. SASS

Styling related to footer is in the `scss` folder. Either copy all the content from `_footer.scss` to your `main.scss` or include this line of code

```css
@use 'footer';
```

assuming they are both in the same folder and compile it to CSS.

### 3. Javascript

The javascript file is located in `assets/javascript/footer.js` and needs to be included in your page.

You will also need to include this line of code to make icons show up

```html
<script
  src="https://kit.fontawesome.com/9e640bf9f4.js"
  crossorigin="anonymous"
></script>
```
