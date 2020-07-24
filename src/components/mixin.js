//  親子関係にするには親のtemplateに子compいれる

var mixin = {
  methods: {
    random (num) {
      return Math.floor(Math.random() * num)
    }
  }
}

export default mixin
