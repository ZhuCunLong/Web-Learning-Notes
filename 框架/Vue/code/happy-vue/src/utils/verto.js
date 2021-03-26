export default class Verto {
  constructor (opts) {
    const { name, age, id } = opts
    this.name = name
    this.age = age
    this.id = id
    this.instance = null
  }

  static getInstance (opts) {
    if (!this.instance && opts) {
      this.instance = new Verto(opts)
    }
    return this.instance
  }
}
