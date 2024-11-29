const CLASS_NAMES = {
  COLUMN_CHART: "column-chart",
  COLUMN_CHART_CHART: "column-chart__chart",
  COLUMN_CHART_CONTAINER: "column-chart__container",
  COLUMN_CHART_HEADER: "column-chart__header",
  COLUMN_CHART_LINK: "column-chart__link",
  COLUMN_CHART_LOADING: "column-chart column-chart_loading",
  COLUMN_CHART_TITLE: "column-chart__title",
};

const TAGS = {
  DIV: "div",
  LINK: "a",
};

const ATTRIBUTES = {
  CLASS: "class",
  STYLE: "style",
  HREF: "href",
};

export default class ColumnChart {
  constructor(initialData) {
    this.chartHeight = 50;

    this._render(initialData);
  }

  destroy() {
    if (this.element) {
      this.remove();
    }
  }

  remove() {
    this.element.remove();
  }

  update(data) {
    const columnChart = document.querySelector(`.${CLASS_NAMES.COLUMN_CHART}`);
    columnChart.removeAttribute(ATTRIBUTES.CLASS);
    columnChart.setAttribute(ATTRIBUTES.CLASS, CLASS_NAMES.COLUMN_CHART);

    if (!data) {
      columnChart.setAttribute(
        ATTRIBUTES.CLASS,
        CLASS_NAMES.COLUMN_CHART_LOADING
      );

      return;
    }

    const columnChartContainer = document.querySelector(
      `.${CLASS_NAMES.COLUMN_CHART_CONTAINER}`
    );
    const columnChartBody = this._createChartBodyNode(data);
    columnChartContainer.append(columnChartBody);
  }

  _render(initialData) {
    const { data, label, value, link, formatHeading } = { ...initialData };

    const columnChartBody = this._createChartBodyNode(
      CLASS_NAMES.COLUMN_CHART_CHART,
      data
    );
    const columnChartHeader = this._createChartHeaderNode(
      CLASS_NAMES.COLUMN_CHART_HEADER,
      value,
      formatHeading
    );

    const columnChartContainer = this._makeContainerWithClass(
      CLASS_NAMES.COLUMN_CHART_CONTAINER
    );
    columnChartContainer.append(columnChartBody);
    columnChartContainer.append(columnChartHeader);

    const columnChartTitle = this._createTitleNode(
      { className: CLASS_NAMES.COLUMN_CHART_TITLE, label },
      { className: CLASS_NAMES.COLUMN_CHART_LINK, link }
    );

    const columnChart = this._makeContainerWithClass(CLASS_NAMES.COLUMN_CHART);
    columnChart.append(columnChartContainer);
    columnChart.append(columnChartTitle);

    if (!data?.length) {
      columnChart.setAttribute(
        ATTRIBUTES.CLASS,
        CLASS_NAMES.COLUMN_CHART_LOADING
      );
    }

    this.element = columnChart;
  }

  _createChartBodyNode(className, data) {
    if (!data) {
      return;
    }

    const columnChartBody = this._makeContainerWithClass(className);
    const maxValue = Math.max(...data);
    const factor = this.chartHeight / maxValue;

    for (const value of data) {
      const currentItem = this._makeContainerWithClass();

      currentItem.setAttribute(
        ATTRIBUTES.STYLE,
        `--value: ${Math.floor(factor * value)}`
      );
      currentItem.dataset.tooltip = `${((value / maxValue) * 100).toFixed(0)}%`;

      columnChartBody.append(currentItem);
    }

    return columnChartBody;
  }

  _createChartHeaderNode(className, value, formatHeading) {
    const header = this._makeContainerWithClass(className);

    if (value) {
      header.append(formatHeading ? formatHeading(value) : value);
    }

    return header;
  }

  _createTitleNode(
    { className: labelClassName, label },
    { className: linkClassName, link }
  ) {
    const title = this._makeContainerWithClass(labelClassName);

    title.append(label);

    if (link) {
      const linkNode = this._createLinkNode(linkClassName, link);
      title.append(linkNode);
    }

    return title;
  }

  _createLinkNode(className, href) {
    const link = this._makeContainerWithClass(className, TAGS.LINK);

    link.setAttribute(ATTRIBUTES.HREF, href);
    link.append("View all");

    return link;
  }

  _makeContainerWithClass(className, tag = TAGS.DIV) {
    const container = document.createElement(tag);

    if (className) {
      container.setAttribute(ATTRIBUTES.CLASS, className);
    }

    return container;
  }
}
