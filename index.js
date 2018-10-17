"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var debounce_1 = require("debounce");
var EbGridLayout = /** @class */ (function () {
    /**
     * EbGridLayout - Class for creating a filtering, grouping and sorting grid of items
     * @param {HTMLElement} gridContainer Target container for grid
     * @param callback Callback function when grid is drawn (returns object with height)
     * @param {IOptionsConfig} options Override default options object
     */
    function EbGridLayout(gridContainer, callback, options) {
        if (callback === void 0) { callback = function () { }; }
        if (options === void 0) { options = {
            gridContainerClass: 'grid-container',
            gridGroupClass: 'grid-group',
            gridItemClass: 'grid-item',
            refreshRate: 200
        }; }
        var _this = this;
        this.elements = [];
        this.state = {
            activeGroupBy: '',
            activeGroupElems: [],
            activeSort: '',
            activeSortAsc: true
        };
        this.options = options;
        this.gridContainer = gridContainer;
        this.gridContainer.classList.add(this.options.gridContainerClass);
        this.interfaceSortElems = document.querySelectorAll('[data-sort]');
        this.interfaceGroupElems = document.querySelectorAll('[data-groupby]');
        /* Update on window resize */
        window.addEventListener('resize', debounce_1.debounce(function () {
            _this.updateLayout();
        }, this.options.refreshRate));
        this.callbackFunction = callback;
        this.addEventListeners();
    }
    /**
     * Create element to show on grid - Require calling updateLayout() to display
     * @example
     * this.createElem({
     *  attributes: {
     *       'color': 'blue',
     *       'shape': 'Trekant'
     *     },
     *     innerHTML: `<p>Test element</p>`
     * });
     * @param {ElementConfig} elemObject Pass object with attributes and html
     */
    EbGridLayout.prototype.createElem = function (elemObject) {
        // Create DOM element
        var element = document.createElement('div');
        element.className = this.options.gridItemClass + ' invisible';
        element.innerHTML = elemObject.innerHTML;
        // Add to controls
        this.elements.push({
            active: true,
            attributes: elemObject.attributes,
            dom: element
        });
        this.gridContainer.appendChild(element);
        return element;
    };
    /**
     * Update layout with any active filters, sorting or grouping
     */
    EbGridLayout.prototype.updateLayout = function () {
        var containerWidth = this.gridContainer.clientWidth;
        var row = 0; // First row
        var rowWidth = 0; // Current width of iteration
        var rowMaxHeight = 0; // Current max height (larges element)
        var totalHeight = 0; // Total height of objects
        var activeGroup = ''; // The current group name
        // Remove any active groupelems
        this.removeGroupElems();
        // Traverse through each element
        for (var _i = 0, _a = this.elements; _i < _a.length; _i++) {
            var element = _a[_i];
            if (element.active) {
                var boundingRect = element.dom.getBoundingClientRect();
                var elemWidth = boundingRect.width;
                var elemHeight = boundingRect.height;
                // Check group
                if (this.state.activeGroupBy !== '' &&
                    element.attributes[this.state.activeGroupBy] &&
                    element.attributes[this.state.activeGroupBy] !== activeGroup) {
                    // Add new row - because of group
                    totalHeight += rowMaxHeight;
                    rowMaxHeight = elemHeight;
                    row += 1;
                    rowWidth = 0;
                    // Add grouping
                    var groupEntry = element.attributes[this.state.activeGroupBy];
                    activeGroup = groupEntry;
                    var groupElemHeight = this.createGroupElem(groupEntry, totalHeight);
                    totalHeight += groupElemHeight;
                }
                // Check if element fits within container
                if (rowWidth + elemWidth <= containerWidth) {
                    // Add element to current row
                    rowMaxHeight = elemHeight > rowMaxHeight ? elemHeight : rowMaxHeight;
                }
                else {
                    // Element is too wide - Create new row and add element
                    totalHeight += rowMaxHeight;
                    rowMaxHeight = elemHeight;
                    row += 1;
                    rowWidth = 0;
                }
                // Remove inactive class if set
                element.dom.className = this.options.gridItemClass;
                this.setPosition(element.dom, rowWidth, totalHeight);
                rowWidth += elemWidth;
            }
            else {
                // Element filtered - hide
                element.dom.classList.add('invisible');
            }
        }
        // Finished totalheight to container
        totalHeight += rowMaxHeight;
        this.gridContainer.style.height = totalHeight + 'px';
        this.callbackFunction({
            height: totalHeight
        });
    };
    /**
     * Public function for sorting elements by attribute
     * @param {string} attribute Attribute set on element on creation
     * @param {boolean} ascending Set direction to sort - default ascending (true)
     */
    EbGridLayout.prototype.sortBy = function (attribute, ascending) {
        if (ascending === void 0) { ascending = true; }
        // Remove any active grouping
        this.state.activeGroupBy = '';
        // If random attribute set, shuffle
        if (attribute === 'random') {
            this.shuffle();
            return 0;
        }
        // Check if sorting is already active and swap sorting direction
        if (attribute === this.state.activeSort) {
            ascending = !this.state.activeSortAsc;
        }
        this.sortElementsArray(attribute, ascending);
        this.updateLayout();
    };
    /**
     * Group elements by attribute
     * @param {string} attribute Attribute set on element on creation
     */
    EbGridLayout.prototype.groupBy = function (attribute) {
        /* Only update if different attribute */
        if (this.state.activeGroupBy !== attribute) {
            /* Group array by sorting */
            this.sortElementsArray(attribute, true);
            /* Remove existing grouping Elems */
            this.state.activeGroupBy = attribute;
            /* Update everything */
            this.updateLayout();
        }
    };
    /**
     * Persistent filter out specific elements and update
     * @example
     * // Only show circles:
     * this.filter((attr) => attr.shape === 'circle');
     * @param filterFunction Filterfunction evalulates attributes from element and returns boolean for filtering (true = visible)
     */
    EbGridLayout.prototype.filter = function (filterFunction) {
        for (var _i = 0, _a = this.elements; _i < _a.length; _i++) {
            var element = _a[_i];
            element.active = filterFunction(element.attributes);
        }
        this.updateLayout();
    };
    /**
     * Remove any active filter and update layout
     */
    EbGridLayout.prototype.clearFilter = function () {
        for (var _i = 0, _a = this.elements; _i < _a.length; _i++) {
            var element = _a[_i];
            element.active = true;
        }
        this.updateLayout();
    };
    /**
     * Create DOM element for display attribute key name (groupname)
     * @param {string} value Value for attribute (groupname)
     * @param {number} yPos Vertical position of DOM element in px
     */
    EbGridLayout.prototype.createGroupElem = function (value, yPos) {
        var element = document.createElement('div');
        element.className = this.options.gridGroupClass + " fade-in " + this.options.gridGroupClass + "-" + this.state.activeGroupBy + " " + this.options.gridGroupClass + "-" + this.sanitizeForCssClass(value);
        element.innerHTML = "<p>" + value + "</p>";
        this.state.activeGroupElems.push(element);
        this.gridContainer.appendChild(element);
        this.setPosition(element, 0, yPos);
        return element.getBoundingClientRect().height;
    };
    /**
     * Remove any DOM Elements displaying group names
     */
    EbGridLayout.prototype.removeGroupElems = function () {
        for (var _i = 0, _a = this.state.activeGroupElems; _i < _a.length; _i++) {
            var element = _a[_i];
            this.gridContainer.removeChild(element);
        }
        // Empty corresponding array
        this.state.activeGroupElems = [];
    };
    /**
     * Lowlevel array sorting (this.elements[]) by attribute
     * @param {string} attribute Attribute set on element on creation
     * @param {boolean} ascending Set direction to sort - default ascending (true)
     */
    EbGridLayout.prototype.sortElementsArray = function (attribute, ascending) {
        if (ascending === void 0) { ascending = true; }
        // Update current status
        this.state.activeSort = attribute;
        this.state.activeSortAsc = ascending;
        this.elements.sort(function (a, b) {
            var keyA = a.attributes[attribute];
            var keyB = b.attributes[attribute];
            if (!ascending) {
                keyB = [keyA, (keyA = keyB)][0];
            }
            if (keyA < keyB) {
                return -1;
            }
            if (keyA > keyB) {
                return 1;
            }
            return 0;
        });
    };
    /**
     * Shuffles array (elements) randomly and update layout
     */
    EbGridLayout.prototype.shuffle = function () {
        var currentIndex = this.elements.length;
        var temporaryValue;
        var randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = this.elements[currentIndex];
            this.elements[currentIndex] = this.elements[randomIndex];
            this.elements[randomIndex] = temporaryValue;
        }
        this.updateLayout();
    };
    /**
     * Searches for elements with data-sort or data-group attributes and add corresponding events
     * @example
     * <button data-sort="random">Sort randomly</button>
     */
    EbGridLayout.prototype.addEventListeners = function () {
        var _this = this;
        var _loop_1 = function (i) {
            var sortByString = this_1.interfaceSortElems[i].getAttribute('data-sort');
            this_1.interfaceSortElems[i].addEventListener('click', function () {
                _this.sortBy(sortByString);
                _this.deselectAllInterfaceElems();
                _this.interfaceSortElems[i].classList.add('eb-active');
            });
        };
        var this_1 = this;
        for (var i = 0; i < this.interfaceSortElems.length; i++) {
            _loop_1(i);
        }
        var _loop_2 = function (i) {
            var sortByString = this_2.interfaceGroupElems[i].getAttribute('data-groupby');
            this_2.interfaceGroupElems[i].addEventListener('click', function () {
                _this.groupBy(sortByString);
                _this.deselectAllInterfaceElems();
                _this.interfaceGroupElems[i].classList.add('eb-active');
            });
        };
        var this_2 = this;
        for (var i = 0; i < this.interfaceGroupElems.length; i++) {
            _loop_2(i);
        }
    };
    /**
     * Deselects all interface elements with eventlistners (removes eb-active class)
     */
    EbGridLayout.prototype.deselectAllInterfaceElems = function () {
        for (var i = 0; i < this.interfaceSortElems.length; i++) {
            this.interfaceSortElems[i].classList.remove('eb-active');
        }
        for (var i = 0; i < this.interfaceGroupElems.length; i++) {
            this.interfaceGroupElems[i].classList.remove('eb-active');
        }
    };
    /**
     * Move element by using to CSS3
     * @param {HTMLDivElement} element DOMElement to move
     * @param {number} x Horizontal position in px
     * @param {number} y Vertical position in px
     */
    EbGridLayout.prototype.setPosition = function (element, x, y) {
        element.style.transform = "translate3d(" + x + "px, " + y + "px, 0)";
    };
    /**
     * Sanitize string to CSS classname
     * @param name {string} String to sanitize to use for classname
     */
    EbGridLayout.prototype.sanitizeForCssClass = function (name) {
        // Remove HTML tags and sanitize
        return name
            .replace(/<[^>]+>/gi, '')
            .replace(/[^a-z0-9]/g, function (s) {
            var c = s.charCodeAt(0);
            if (c === 32) {
                return '-';
            }
            if (c >= 65 && c <= 90) {
                return '_' + s.toLowerCase();
            }
            return '';
        })
            .substring(0, 16);
    };
    return EbGridLayout;
}());
exports.default = EbGridLayout;
