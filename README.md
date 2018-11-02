# Ekstra Bladet - Magic Shuffle Module

> Let the magic happen

Isotope-like grouping, sorting and filtering interface. This project was inspired by [Isotope](http://isotope.metafizzy.co/) and [d3.layout.grid](https://github.com/felixlaumon/d3.layout.grid)

![Demo of Magic Shuffle](https://eb-features.s3.amazonaws.com/shared/magic-shuffle-demo.gif)

## Table Of Content

* [Getting Started](#getting-started)
  * [Dependencies](#dependencies)
  * [Usage](#usage)
  * [Public functions](#public-functions)
  * [Examples](#examples)
* [Contributing](#contributing)
  * [Build](#build)
* [License](#license)

## Getting Started

### Dependencies

This module requires [Node.JS and NPM](https://www.npmjs.com/get-npm) for installation. The module use 'debounce' package to limit the number of invocations when resizing the browser. Add the module and install dependencies using NPM:

```sh
npm i eb-module-magic-shuffle
```

### Usage

Create a container in the HTML-file for the shuffle:

```html
<div class="grid-container"></div>
```

Reference the required stylesheet:

```css
@import 'eb-module-magic-shuffle/main.css';
```

Reference the module in the javascript:

```javascript
import EbGridLayout from 'eb-module-magic-shuffle';

/* Create a new instance */
const gridInstance = new EbGridLayout(document.querySelector('.grid-container'));

/* Create some elements for sorting */
gridInstance.createElem({
        attributes: {'color': 'blue', 'otherdata': 311},
        innerHTML: `<p style="color: blue;">Item 1</p>`
      });

gridInstance.createElem({
        attributes: {'color': 'blue', 'otherdata': 121},
        innerHTML: `<p style="color: blue;">Item 2</p>`
      });

gridInstance.createElem({
        attributes: {'color': 'red', 'otherdata': 411},
        innerHTML: `<p style="color: red;">Item 3</p>`
      });
```

The module creates corresponding DOM-elements every time `createElem()` function is invoked. The DOM-elements can be targeted by referencing the default classname `grid-item`.

```css
.grid-item {
  width: 33,3%;
  background: blue;
}
```

### Public functions

Grouping:
> Shows groupnames and sorts by item

```javascript
/* Group the created items by color and update layout */
gridInstance.groupBy('color');
```

Sorting:
> Hides groupname and sorts by attribute

```javascript
/* Sort items by otherdata attribute */
gridInstance.sortBy('otherdata');
```

Filter:
> Filters out elements by evaluating attributes using a boolean function

```javascript
/* Only show blue elements */
gridInstancer.filter((attr) => {
  return (attr.color !=== 'blue')
})
```

### Examples

* [Simple Example](example/index.html)
* [Demonstration (Custom design)](https://interactive.ekstrabladet.dk/2018/olsenbandentools/dist/index.html)

## Contributing

If you want to contribute to a project and make it better, your help is very welcome.

```sh
git clone git@github.com:EkstraBladetUdvikling/eb-module-magic-shuffle.git
cd eb-module-magic-shuffle
```

References:
[API Documentation](doc/classes/_index_.ebgridlayout.md)

### Build

Run build to output ES5 CommonJS-module for use with package manager (index.js). Typescript definitions is automatically created (index.d.js).

```node
npm run build
```

## License

Copyright © 2018, Ekstra Bladet

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.