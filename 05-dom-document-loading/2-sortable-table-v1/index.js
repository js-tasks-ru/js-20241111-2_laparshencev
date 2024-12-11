export default class SortableTable {
  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;

    const header = this.createElement(this.createHeaderTemplate(headerConfig));
    const body = this.createElement(this.createBodyTemplate(data));

    this.subElements = { header, body };
    this.element = this.createContainer(header, body);
  }

  destroy() {
    if (this.element) {
      this.remove();
    }
  }

  remove() {
    this.element.remove();
  }

  sort(sortBy, order) {
    const { header, body } = this.subElements;
    const { sortType } = this.headerConfig.find(({ id }) => id === sortBy);

    header.innerHTML = this.createHeaderItems(this.headerConfig, sortBy, order);

    const sortedData = this.sortData(sortType, sortBy, order)
    body.innerHTML = this.createBodyItems(sortedData);
  }

  createElement(template) {
    const element = document.createElement("div");

    element.innerHTML = template;

    return element.firstElementChild;
  }

  createContainer(header, body) {
    const element = document.createElement("div");

    element.innerHTML = `
      <div data-element="productsContainer" class="products-list__container">
        <div class="sortable-table">
        </div>
      </div>`;

    const table = element.querySelector(".sortable-table");
    table.appendChild(header);
    table.appendChild(body);

    return element.firstElementChild;
  }

  createHeaderTemplate(data) {
    return `
      <div data-element="header" class="sortable-table__header sortable-table__row">
        ${this.createHeaderItems(data)}
      </div>`;
  }

  createHeaderItems(data, sortBy, order) {
    return data
      .map(
        ({ id, title, sortable }) => `
      <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}" ${
          order ? `data-order="${order}"` : ""
        }>
        <span>${title}</span>
        ${
          sortBy === id
            ? `<span data-element="arrow" class="sortable-table__sort-arrow">
              <span class="sort-arrow"></span>
            </span>`
            : ""
        }
      </div>`
      )
      .join("\n");
  }

  createBodyTemplate(data) {
    return `
      <div data-element="body" class="sortable-table__body">
        ${this.createBodyItems(data)}
      </div>`;
  }

  createBodyItems(data) {
    return data
      .map(
        (row) =>
          `<a class="sortable-table__row">
                ${this.headerConfig
                  .map(({ id, template }) => {
                    return template
                      ? template(row[id])
                      : `<div class="sortable-table__cell">${row[id]}</div>`;
                  })
                  .join("\n")}
            </a>`
      )
      .join("\n");
  }

  sortData(sortType, sortBy, order) {
    return sortType === "number"
        ? this.sortNums(this.data, sortBy, order)
        : this.sortStrings(this.data, sortBy, order);
  }

  sortNums(arr, sortBy, param) {
    switch (param) {
      case "asc":
        return [...arr].sort((a, b) => a[sortBy] - b[sortBy]);
      case "desc":
        return [...arr].sort((a, b) => b[sortBy] - a[sortBy]);
      default:
        return [...arr];
    }
  }

  sortStrings(arr, sortBy, param) {
    switch (param) {
      case "asc":
        return [...arr].sort((a, b) =>
          a[sortBy].localeCompare(b[sortBy], "ru", { caseFirst: "upper" })
        );
      case "desc":
        return [...arr].sort((a, b) =>
          b[sortBy].localeCompare(a[sortBy], "ru", { caseFirst: "upper" })
        );
      default:
        return [...arr];
    }
  }
}
