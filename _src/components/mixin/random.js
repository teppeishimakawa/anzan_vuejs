//  random関数
var random = {
  methods: {
    random (ary) {
      var num = ary.length
      return Math.floor(Math.random() * num)
    }
  }
}

export default random