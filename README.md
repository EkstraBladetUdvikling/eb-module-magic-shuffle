Optional Logo

# Ekstra Bladet - Magic Shuffle Module

> Let the magic happen

Isotope-like grouping, sorting and filtering interface. This project was inspired by [Isotope](http://isotope.metafizzy.co/) and [D3 Gridlayout](https://github.com/felixlaumon/d3.layout.grid)

## Table Of Content

* [Getting Started](#getting-started)
* [Usage](#usage)
* [Developing](#developing)
* [Build](#build)
* [Deployment](#deployment)
* [Questions](#questions)
* [License](#license)

## Getting Started

Start by installing the module using Node.JS:

```node
npm i eb-module-magic-shuffle
```

### Usage

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

/* Group the created items by color and update layout */
gridInstance.groupBy('color');
```

Reference the required stylesheet:

```css
@import 'eb-module-magic-shuffle/main.css';
```

### Examples

[Demonstration (Custom design)](https://interactive.ekstrabladet.dk/2018/olsenbandentools/dist/index.html)

## Developing

[Class definition and functions](doc/classes/_index_.ebgridlayout.md)

### Build

```node
npm run build
```

### Can I live debug it?

## Questions

## License
