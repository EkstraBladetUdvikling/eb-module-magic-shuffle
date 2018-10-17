interface ElementConfig {
    attributes: object;
    innerHTML: string;
}
interface OptionsConfig {
    gridContainerClass: string;
    gridGroupClass: string;
    gridItemClass: string;
    refreshRate: number;
}
interface StatusObject {
    height: number;
}
declare class EbGridLayout {
    private options;
    private elements;
    private gridContainer;
    private state;
    private interfaceSortElems;
    private interfaceGroupElems;
    private callbackFunction;
    /**
     * EbGridLayout - Class for creating a filtering, grouping and sorting grid of items
     * @param {HTMLElement} gridContainer Target container for grid
     * @param callback Callback function when grid is drawn (returns object with height)
     * @param {IOptionsConfig} options Override default options object
     */
    constructor(gridContainer: HTMLElement, callback?: (state?: StatusObject) => void, options?: OptionsConfig);
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
    createElem(elemObject: ElementConfig): HTMLDivElement;
    /**
     * Update layout with any active filters, sorting or grouping
     */
    updateLayout(): void;
    /**
     * Public function for sorting elements by attribute
     * @param {string} attribute Attribute set on element on creation
     * @param {boolean} ascending Set direction to sort - default ascending (true)
     */
    sortBy(attribute: string, ascending?: boolean): 0 | undefined;
    /**
     * Group elements by attribute
     * @param {string} attribute Attribute set on element on creation
     */
    groupBy(attribute: string): void;
    /**
     * Persistent filter out specific elements and update
     * @example
     * // Only show circles:
     * this.filter((attr) => attr.shape === 'circle');
     * @param filterFunction Filterfunction evalulates attributes from element and returns boolean for filtering (true = visible)
     */
    filter(filterFunction: (attributes: object) => boolean): void;
    /**
     * Remove any active filter and update layout
     */
    clearFilter(): void;
    /**
     * Create DOM element for display attribute key name (groupname)
     * @param {string} value Value for attribute (groupname)
     * @param {number} yPos Vertical position of DOM element in px
     */
    private createGroupElem;
    /**
     * Remove any DOM Elements displaying group names
     */
    private removeGroupElems;
    /**
     * Lowlevel array sorting (this.elements[]) by attribute
     * @param {string} attribute Attribute set on element on creation
     * @param {boolean} ascending Set direction to sort - default ascending (true)
     */
    private sortElementsArray;
    /**
     * Shuffles array (elements) randomly and update layout
     */
    private shuffle;
    /**
     * Searches for elements with data-sort or data-group attributes and add corresponding events
     * @example
     * <button data-sort="random">Sort randomly</button>
     */
    private addEventListeners;
    /**
     * Deselects all interface elements with eventlistners (removes eb-active class)
     */
    private deselectAllInterfaceElems;
    /**
     * Move element by using to CSS3
     * @param {HTMLDivElement} element DOMElement to move
     * @param {number} x Horizontal position in px
     * @param {number} y Vertical position in px
     */
    private setPosition;
    /**
     * Sanitize string to CSS classname
     * @param name {string} String to sanitize to use for classname
     */
    private sanitizeForCssClass;
}
export default EbGridLayout;
