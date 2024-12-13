export default class NotificationMessage {
  static lastShownElementOfClass

  constructor (text, options) {
    const { duration, type } = { ...options }

    this.duration = duration
    this.element = this.createElement(this.createTemplate(text, type))
  }

  show(node) {
    if (NotificationMessage.lastShownElementOfClass) {
        NotificationMessage.lastShownElementOfClass.remove()
    }
    NotificationMessage.lastShownElementOfClass = this.element

    if (node) {
        node.appendChild(this.element)
        return setTimeout(() => this.destroy(), this.duration)
    }
    
    document.body.appendChild(this.element)
    setTimeout(() => this.destroy(), this.duration)
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

  createTemplate(text, type) {
    return `
      <div class="notification ${type}" style="--value:${this.duration / 1000}s">
        <div class="timer"></div>
          <div class="inner-wrapper">
            <div class="notification-header">${type}</div>
            <div class="notification-body">
            ${text}
            </div>
        </div>
      </div>`
  }


}
