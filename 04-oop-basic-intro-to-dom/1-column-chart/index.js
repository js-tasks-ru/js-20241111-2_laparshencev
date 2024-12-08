export default class ColumnChart {
  chartHeight = 50

  constructor(initialData) {
    this.element = this.createElement(this.createTemplate(initialData))
  }

  update(data) {
    if (this.element) {
      this.element.querySelector('.column-chart__chart').innerHTML = this.createChartBodyTemplate(data)
    }
  }

  destroy() {
    if (this.element) {
      this.remove()
    }
  }

  remove() {
    this.element.remove();
  }

  createElement(template) {
    const element = document.createElement("div")

    element.innerHTML = template

    return element.firstElementChild
  }

  createTemplate(initialData) {
    const { data, label, link, value, formatHeading } = { ...initialData }

    return `
      <div class="${this.createColumnChartClasses(data)}" style="--chart-height: ${this.chartHeight}">
        <div class="column-chart__title">
          ${label}
          ${this.createLinkTemplate(link)}
        </div>
        <div class="column-chart__container">
          <div data-element="header" class="column-chart__header">
            ${this.createHeaderElement(value, formatHeading)}
          </div>
          <div data-element="body" class="column-chart__chart">
            ${this.createChartBodyTemplate(data)}
          </div>
        </div>
      </div>`
  }

  createColumnChartClasses(data) {
    return data?.length ? "column-chart" : "column-chart column-chart_loading"
  }

  createLinkTemplate(link) {
    return link ? `<a href="${link}" class="column-chart__link">View all</a>` : ""
  }

  createHeaderElement(value, formatHeading) {
    return formatHeading ? formatHeading(value) : value
  }

  createChartBodyTemplate(data) {
    if (!data) {
        return
    }

    return this.getColumnProps(data)
      .map(({ value, percent }) => `<div style="--value: ${value}" data-tooltip="${percent}"></div>`)
      .join("\n")
  }

  getColumnProps(data) {
    const maxValue = Math.max(...data)
    const factor = this.chartHeight / maxValue

    return data.map((value) => ({
      value: String(Math.floor(value * factor)),
      percent: `${((value / maxValue) * 100).toFixed(0)}%`,
    }))
  }
}
