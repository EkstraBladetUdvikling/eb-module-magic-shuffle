[Ekstra Bladet - Magic Shuffle Module](../README.md) > ["index"](../modules/_index_.md) > [EbGridLayout](../classes/_index_.ebgridlayout.md)

# Class: EbGridLayout

## Hierarchy

**EbGridLayout**

## Index

### Constructors

* [constructor](_index_.ebgridlayout.md#constructor)

### Properties

* [callbackFunction](_index_.ebgridlayout.md#callbackfunction)
* [elements](_index_.ebgridlayout.md#elements)
* [gridContainer](_index_.ebgridlayout.md#gridcontainer)
* [interfaceGroupElems](_index_.ebgridlayout.md#interfacegroupelems)
* [interfaceSortElems](_index_.ebgridlayout.md#interfacesortelems)
* [options](_index_.ebgridlayout.md#options)

### Methods

* [addEventListeners](_index_.ebgridlayout.md#addeventlisteners)
* [clearFilter](_index_.ebgridlayout.md#clearfilter)
* [createElem](_index_.ebgridlayout.md#createelem)
* [createGroupElem](_index_.ebgridlayout.md#creategroupelem)
* [deselectAllInterfaceElems](_index_.ebgridlayout.md#deselectallinterfaceelems)
* [filter](_index_.ebgridlayout.md#filter)
* [groupBy](_index_.ebgridlayout.md#groupby)
* [removeGroupElems](_index_.ebgridlayout.md#removegroupelems)
* [sanitizeForCssClass](_index_.ebgridlayout.md#sanitizeforcssclass)
* [setPosition](_index_.ebgridlayout.md#setposition)
* [shuffle](_index_.ebgridlayout.md#shuffle)
* [sortBy](_index_.ebgridlayout.md#sortby)
* [sortElementsArray](_index_.ebgridlayout.md#sortelementsarray)
* [updateLayout](_index_.ebgridlayout.md#updatelayout)

### Object literals

* [state](_index_.ebgridlayout.md#state)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new EbGridLayout**(gridContainer: *`HTMLElement`*, callback: *`function`*, options?: *[IOptionsConfig](../interfaces/_index_.ioptionsconfig.md)*): [EbGridLayout](_index_.ebgridlayout.md)

*Defined in [index.ts:40](https://github.com/EkstraBladetUdvikling/eb-module-magic-shuffle/blob/ee63f9e/src/scripts/index.ts#L40)*

EbGridLayout - Class for creating a filtering, grouping and sorting grid of items

**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| gridContainer | `HTMLElement` | - |  Target container for grid |
| callback | `function` | - |  Callback function when grid is drawn (returns object with height) |
| `Default value` options | [IOptionsConfig](../interfaces/_index_.ioptionsconfig.md) |  {gridContainerClass: &#x27;grid-container&#x27;,gridGroupClass: &#x27;grid-group&#x27;,gridItemClass: &#x27;grid-item&#x27;,refreshRate: 200} |  Override default options object |

**Returns:** [EbGridLayout](_index_.ebgridlayout.md)

___

## Properties

<a id="callbackfunction"></a>

### `<Private>` callbackFunction

**● callbackFunction**: *`function`*

*Defined in [index.ts:40](https://github.com/EkstraBladetUdvikling/eb-module-magic-shuffle/blob/ee63f9e/src/scripts/index.ts#L40)*

#### Type declaration
▸(status: *[IStatusObject](../interfaces/_index_.istatusobject.md)*): `void`

**Parameters:**

| Param | Type |
| ------ | ------ |
| status | [IStatusObject](../interfaces/_index_.istatusobject.md) |

**Returns:** `void`

___
<a id="elements"></a>

### `<Private>` elements

**● elements**: *[IGridObject](../interfaces/_index_.igridobject.md)[]* =  []

*Defined in [index.ts:30](https://github.com/EkstraBladetUdvikling/eb-module-magic-shuffle/blob/ee63f9e/src/scripts/index.ts#L30)*

___
<a id="gridcontainer"></a>

### `<Private>` gridContainer

**● gridContainer**: *`HTMLElement`*

*Defined in [index.ts:31](https://github.com/EkstraBladetUdvikling/eb-module-magic-shuffle/blob/ee63f9e/src/scripts/index.ts#L31)*

___
<a id="interfacegroupelems"></a>

### `<Private>` interfaceGroupElems

**● interfaceGroupElems**: *`NodeListOf`<`HTMLElement`>*

*Defined in [index.ts:39](https://github.com/EkstraBladetUdvikling/eb-module-magic-shuffle/blob/ee63f9e/src/scripts/index.ts#L39)*

___
<a id="interfacesortelems"></a>

### `<Private>` interfaceSortElems

**● interfaceSortElems**: *`NodeListOf`<`HTMLElement`>*

*Defined in [index.ts:38](https://github.com/EkstraBladetUdvikling/eb-module-magic-shuffle/blob/ee63f9e/src/scripts/index.ts#L38)*

___
<a id="options"></a>

### `<Private>` options

**● options**: *[IOptionsConfig](../interfaces/_index_.ioptionsconfig.md)*

*Defined in [index.ts:29](https://github.com/EkstraBladetUdvikling/eb-module-magic-shuffle/blob/ee63f9e/src/scripts/index.ts#L29)*

___

## Methods

<a id="addeventlisteners"></a>

### `<Private>` addEventListeners

▸ **addEventListeners**(): `void`

*Defined in [index.ts:334](https://github.com/EkstraBladetUdvikling/eb-module-magic-shuffle/blob/ee63f9e/src/scripts/index.ts#L334)*

Searches for elements with data-sort or data-group attributes and add corresponding events
*__example__*: Sort randomly

**Returns:** `void`

___
<a id="clearfilter"></a>

###  clearFilter

▸ **clearFilter**(): `void`

*Defined in [index.ts:239](https://github.com/EkstraBladetUdvikling/eb-module-magic-shuffle/blob/ee63f9e/src/scripts/index.ts#L239)*

Remove any active filter and update layout

**Returns:** `void`

___
<a id="createelem"></a>

###  createElem

▸ **createElem**(elemObject: *[IElementConfig](../interfaces/_index_.ielementconfig.md)*): `HTMLDivElement`

*Defined in [index.ts:92](https://github.com/EkstraBladetUdvikling/eb-module-magic-shuffle/blob/ee63f9e/src/scripts/index.ts#L92)*

Create element to show on grid - Require calling updateLayout() to display
*__example__*: this.createElem({ attributes: { 'color': 'blue', 'shape': 'Trekant' }, innerHTML: `<p>Test element</p>` });

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| elemObject | [IElementConfig](../interfaces/_index_.ielementconfig.md) |  Pass object with attributes and html |

**Returns:** `HTMLDivElement`

___
<a id="creategroupelem"></a>

### `<Private>` createGroupElem

▸ **createGroupElem**(value: *`string`*, yPos: *`number`*): `number`

*Defined in [index.ts:251](https://github.com/EkstraBladetUdvikling/eb-module-magic-shuffle/blob/ee63f9e/src/scripts/index.ts#L251)*

Create DOM element for display attribute key name (groupname)

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| value | `string` |  Value for attribute (groupname) |
| yPos | `number` |  Vertical position of DOM element in px |

**Returns:** `number`

___
<a id="deselectallinterfaceelems"></a>

### `<Private>` deselectAllInterfaceElems

▸ **deselectAllInterfaceElems**(): `void`

*Defined in [index.ts:356](https://github.com/EkstraBladetUdvikling/eb-module-magic-shuffle/blob/ee63f9e/src/scripts/index.ts#L356)*

Deselects all interface elements with eventlistners (removes eb-active class)

**Returns:** `void`

___
<a id="filter"></a>

###  filter

▸ **filter**(filterFunction: *`function`*): `void`

*Defined in [index.ts:228](https://github.com/EkstraBladetUdvikling/eb-module-magic-shuffle/blob/ee63f9e/src/scripts/index.ts#L228)*

Persistent filter out specific elements and update
*__example__*: // Only show circles: this.filter((attr) => attr.shape === 'circle');

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| filterFunction | `function` |  Filterfunction evalulates attributes from element and returns boolean for filtering (true = visible) |

**Returns:** `void`

___
<a id="groupby"></a>

###  groupBy

▸ **groupBy**(attribute: *`string`*): `void`

*Defined in [index.ts:207](https://github.com/EkstraBladetUdvikling/eb-module-magic-shuffle/blob/ee63f9e/src/scripts/index.ts#L207)*

Group elements by attribute

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| attribute | `string` |  Attribute set on element on creation |

**Returns:** `void`

___
<a id="removegroupelems"></a>

### `<Private>` removeGroupElems

▸ **removeGroupElems**(): `void`

*Defined in [index.ts:268](https://github.com/EkstraBladetUdvikling/eb-module-magic-shuffle/blob/ee63f9e/src/scripts/index.ts#L268)*

Remove any DOM Elements displaying group names

**Returns:** `void`

___
<a id="sanitizeforcssclass"></a>

### `<Private>` sanitizeForCssClass

▸ **sanitizeForCssClass**(name: *`string`*): `string`

*Defined in [index.ts:379](https://github.com/EkstraBladetUdvikling/eb-module-magic-shuffle/blob/ee63f9e/src/scripts/index.ts#L379)*

Sanitize string to CSS classname

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| name | `string` |  String to sanitize to use for classname |

**Returns:** `string`

___
<a id="setposition"></a>

### `<Private>` setPosition

▸ **setPosition**(element: *`HTMLDivElement`*, x: *`number`*, y: *`number`*): `void`

*Defined in [index.ts:371](https://github.com/EkstraBladetUdvikling/eb-module-magic-shuffle/blob/ee63f9e/src/scripts/index.ts#L371)*

Move element by using to CSS3

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| element | `HTMLDivElement` |  DOMElement to move |
| x | `number` |  Horizontal position in px |
| y | `number` |  Vertical position in px |

**Returns:** `void`

___
<a id="shuffle"></a>

### `<Private>` shuffle

▸ **shuffle**(): `void`

*Defined in [index.ts:309](https://github.com/EkstraBladetUdvikling/eb-module-magic-shuffle/blob/ee63f9e/src/scripts/index.ts#L309)*

Shuffles array (elements) randomly and update layout

**Returns:** `void`

___
<a id="sortby"></a>

###  sortBy

▸ **sortBy**(attribute: *`string`*, ascending?: *`boolean`*):  `undefined` &#124; `0`

*Defined in [index.ts:184](https://github.com/EkstraBladetUdvikling/eb-module-magic-shuffle/blob/ee63f9e/src/scripts/index.ts#L184)*

Public function for sorting elements by attribute

**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| attribute | `string` | - |  Attribute set on element on creation |
| `Default value` ascending | `boolean` | true |  Set direction to sort - default ascending (true) |

**Returns:**  `undefined` &#124; `0`

___
<a id="sortelementsarray"></a>

### `<Private>` sortElementsArray

▸ **sortElementsArray**(attribute: *`string`*, ascending?: *`boolean`*): `void`

*Defined in [index.ts:281](https://github.com/EkstraBladetUdvikling/eb-module-magic-shuffle/blob/ee63f9e/src/scripts/index.ts#L281)*

Lowlevel array sorting (this.elements\[\]) by attribute

**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| attribute | `string` | - |  Attribute set on element on creation |
| `Default value` ascending | `boolean` | true |  Set direction to sort - default ascending (true) |

**Returns:** `void`

___
<a id="updatelayout"></a>

###  updateLayout

▸ **updateLayout**(): `void`

*Defined in [index.ts:112](https://github.com/EkstraBladetUdvikling/eb-module-magic-shuffle/blob/ee63f9e/src/scripts/index.ts#L112)*

Update layout with any active filters, sorting or grouping

**Returns:** `void`

___

## Object literals

<a id="state"></a>

### `<Private>` state

**state**: *`object`*

*Defined in [index.ts:32](https://github.com/EkstraBladetUdvikling/eb-module-magic-shuffle/blob/ee63f9e/src/scripts/index.ts#L32)*

<a id="state.activegroupby"></a>

####  activeGroupBy

**● activeGroupBy**: *`string`* = ""

*Defined in [index.ts:33](https://github.com/EkstraBladetUdvikling/eb-module-magic-shuffle/blob/ee63f9e/src/scripts/index.ts#L33)*

___
<a id="state.activegroupelems"></a>

####  activeGroupElems

**● activeGroupElems**: *`never`[]* =  []

*Defined in [index.ts:34](https://github.com/EkstraBladetUdvikling/eb-module-magic-shuffle/blob/ee63f9e/src/scripts/index.ts#L34)*

___
<a id="state.activesort"></a>

####  activeSort

**● activeSort**: *`string`* = ""

*Defined in [index.ts:35](https://github.com/EkstraBladetUdvikling/eb-module-magic-shuffle/blob/ee63f9e/src/scripts/index.ts#L35)*

___
<a id="state.activesortasc"></a>

####  activeSortAsc

**● activeSortAsc**: *`true`* = true

*Defined in [index.ts:36](https://github.com/EkstraBladetUdvikling/eb-module-magic-shuffle/blob/ee63f9e/src/scripts/index.ts#L36)*

___

___

