import debounce from 'debounce';

interface IElementConfig {
  attributes: object;
  innerHTML: string;
}
interface IOptionsConfig {
  gridContainerClass: string,
  gridGroupClass: string,
  gridItemClass: string,
  refreshRate: number
}
interface IStateObject {
  activeGroupBy: string;
  activeGroupElems: HTMLDivElement[];
  activeSort: string;
  activeSortAsc: boolean;
}
interface IStatusObject {
  height: number;
}
interface IGridObject {
  active: boolean;
  attributes: object,
  dom: HTMLDivElement
}

class EbGridLayout {
  private options: IOptionsConfig;
  private elements: IGridObject[] = [];
  private gridContainer: HTMLElement;
  private state: IStateObject = {
    activeGroupBy: '',
    activeGroupElems: [],
    activeSort: '',
    activeSortAsc: true
  };
  private interfaceSortElems: NodeListOf<HTMLElement>;
  private interfaceGroupElems: NodeListOf<HTMLElement>;
  private callbackFunction: (status: IStatusObject) => void;

  /**
   * EbGridLayout - Class for creating a filtering, grouping and sorting grid of items
   * @param {HTMLElement} gridContainer Target container for grid
   * @param callback Callback function when grid is drawn (returns object with height)
   * @param {IOptionsConfig} options Override default options object
   */
  constructor(
    gridContainer: HTMLElement,
    callback: (state?: IStatusObject) => void,
    options: IOptionsConfig = {
      gridContainerClass: 'grid-container',
      gridGroupClass: 'grid-group',
      gridItemClass: 'grid-item',
      refreshRate: 200
    }
  ) {
    this.options = options
    this.gridContainer = gridContainer;
    this.gridContainer.classList.add(this.options.gridContainerClass);
    this.interfaceSortElems  = document.querySelectorAll<HTMLElement>(
      '[data-sort]'
    );
    this.interfaceGroupElems = document.querySelectorAll<HTMLElement>(
      '[data-groupby]'
    );

    /* Update on window resize */
    window.addEventListener(
      'resize',
      debounce(() => {
        this.updateLayout();
      }, this.options.refreshRate)
    );

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
   * @param {IElementConfig} elemObject Pass object with attributes and html
   */
  public createElem(elemObject: IElementConfig): HTMLDivElement {
    // Create DOM element
    const element = document.createElement('div');
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
  }

  /**
   * Update layout with any active filters, sorting or grouping
   */
  public updateLayout() {
    const containerWidth = this.gridContainer.clientWidth;
    let row: number = 0; // First row
    let rowWidth: number = 0; // Current width of iteration
    let rowMaxHeight: number = 0; // Current max height (larges element)
    let totalHeight: number = 0; // Total height of objects
    let activeGroup: string = ''; // The current group name

    // Remove any active groupelems
    this.removeGroupElems();

    // Traverse through each element
    for (const element of this.elements) {
      if (element.active) {
        const boundingRect = element.dom.getBoundingClientRect();
        const elemWidth = boundingRect.width;
        const elemHeight = boundingRect.height;

        // Check group
        if (
          this.state.activeGroupBy !== '' &&
          element.attributes[this.state.activeGroupBy as keyof object] &&
          element.attributes[this.state.activeGroupBy as keyof object] !== activeGroup
        ) {
          // Add new row - because of group
          totalHeight += rowMaxHeight;
          rowMaxHeight = elemHeight;
          row += 1;
          rowWidth = 0;

          // Add grouping
          const groupEntry = element.attributes[this.state.activeGroupBy as keyof object];
          activeGroup = groupEntry;
          const groupElemHeight = this.createGroupElem(groupEntry, totalHeight);
          totalHeight += groupElemHeight;
        }

        // Check if element fits within container
        if (rowWidth + elemWidth <= containerWidth) {
          // Add element to current row
          rowMaxHeight = elemHeight > rowMaxHeight ? elemHeight : rowMaxHeight;
        } else {
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
      } else {
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
  }

  /**
   * Public function for sorting elements by attribute
   * @param {string} attribute Attribute set on element on creation
   * @param {boolean} ascending Set direction to sort - default ascending (true)
   */
  public sortBy(attribute: string, ascending: boolean = true) {
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
  }

  /**
   * Group elements by attribute
   * @param {string} attribute Attribute set on element on creation
   */
  public groupBy(attribute: string): void {
    /* Only update if different attribute */
    if (this.state.activeGroupBy !== attribute) {
      /* Group array by sorting */
      this.sortElementsArray(attribute, true);

      /* Remove existing grouping Elems */
      this.state.activeGroupBy = attribute;

      /* Update everything */
      this.updateLayout();
    }
  }

  /**
   * Persistent filter out specific elements and update
   * @example
   * // Only show circles:
   * this.filter((attr) => attr.shape === 'circle');
   * @param filterFunction Filterfunction evalulates attributes from element and returns boolean for filtering (true = visible)
   */
  public filter(filterFunction: (attributes: object) => boolean): void {
    for (const element of this.elements) {
      element.active = filterFunction(element.attributes);
    }

    this.updateLayout();
  }

  /**
   * Remove any active filter and update layout
   */
  public clearFilter(): void {
    for (const element of this.elements) {
      element.active = true;
    }
    this.updateLayout();
  }

  /**
   * Create DOM element for display attribute key name (groupname)
   * @param {string} value Value for attribute (groupname)
   * @param {number} yPos Vertical position of DOM element in px
   */
  private createGroupElem(value: string, yPos: number): number {
    const element = document.createElement('div');
    element.className = `${this.options.gridGroupClass} fade-in ${this.options.gridGroupClass}-${
      this.state.activeGroupBy
    } ${this.options.gridGroupClass}-${this.sanitizeForCssClass(value)}`;
    element.innerHTML = `<p>${value}</p>`;
    this.state.activeGroupElems.push(element);
    this.gridContainer.appendChild(element);

    this.setPosition(element, 0, yPos);

    return element.getBoundingClientRect().height;
  }

  /**
   * Remove any DOM Elements displaying group names
   */
  private removeGroupElems(): void {
    for (const element of this.state.activeGroupElems) {
      this.gridContainer.removeChild(element);
    }
    // Empty corresponding array
    this.state.activeGroupElems = [];
  }

  /**
   * Lowlevel array sorting (this.elements[]) by attribute
   * @param {string} attribute Attribute set on element on creation
   * @param {boolean} ascending Set direction to sort - default ascending (true)
   */
  private sortElementsArray(
    attribute: string,
    ascending: boolean = true
  ): void {
    // Update current status
    this.state.activeSort = attribute;
    this.state.activeSortAsc = ascending;

    this.elements.sort((a: any, b: any) => {
      let keyA = a.attributes[attribute];
      let keyB = b.attributes[attribute];

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
  }

  /**
   * Shuffles array (elements) randomly and update layout
   */
  private shuffle(): void {
    let currentIndex = this.elements.length;
    let temporaryValue;
    let randomIndex;

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
  }

  /**
   * Searches for elements with data-sort or data-group attributes and add corresponding events
   * @example
   * <button data-sort="random">Sort randomly</button>
   */
  private addEventListeners(): void {
    for (const interfaceElem of this.interfaceSortElems) {
      const sortByString = interfaceElem.getAttribute('data-sort') as string;
      interfaceElem.addEventListener('click', () => {
        this.sortBy(sortByString);
        this.deselectAllInterfaceElems();
        interfaceElem.classList.add('eb-active');
      });
    }

    for (const interfaceElem of this.interfaceGroupElems) {
      const sortByString = interfaceElem.getAttribute('data-groupby') as string;
      interfaceElem.addEventListener('click', () => {
        this.groupBy(sortByString);
        this.deselectAllInterfaceElems();
        interfaceElem.classList.add('eb-active');
      });
    }
  }
  /**
   * Deselects all interface elements with eventlistners (removes eb-active class)
   */
  private deselectAllInterfaceElems(): void {
    for (const elem of this.interfaceSortElems) {
      elem.classList.remove('eb-active');
    }
    for (const elem of this.interfaceGroupElems) {
      elem.classList.remove('eb-active');
    }
  }

  /**
   * Move element by using to CSS3
   * @param {HTMLDivElement} element DOMElement to move
   * @param {number} x Horizontal position in px
   * @param {number} y Vertical position in px
   */
  private setPosition(element: HTMLDivElement, x: number, y: number): void {
    element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  /**
   * Sanitize string to CSS classname
   * @param name {string} String to sanitize to use for classname
   */
  private sanitizeForCssClass(name: string): string {
    // Remove HTML tags and sanitize
    return name
      .replace(/<[^>]+>/gi, '')
      .replace(/[^a-z0-9]/g, s => {
        const c = s.charCodeAt(0);
        if (c === 32) {
          return '-';
        }
        if (c >= 65 && c <= 90) {
          return '_' + s.toLowerCase();
        }
        return '';
      })
      .substring(0, 16);
  }
}

export default EbGridLayout;
