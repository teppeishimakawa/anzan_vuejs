//  isMobile関数
var mobile = {
  methods: {
    isMobile () {
      function hantei () {
        var regexp = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
        return (window.navigator.userAgent.search(regexp) !== -1)
      }

      var kekka = hantei()
      return kekka
    }
  }
}

export default mobile
