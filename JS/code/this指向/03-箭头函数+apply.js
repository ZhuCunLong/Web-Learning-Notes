this.a = 'test'
function func (cb) {
  const obj = {
    a: 'aaaa'
  }
  cb.apply(obj)
  cb()
}
func(() => {
  console.log(this.a)
})
