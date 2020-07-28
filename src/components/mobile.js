// mobile判定

function isMobile () {
  var regexp = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
  return (window.navigator.userAgent.search(regexp) !== -1)
}

// 実行結果を代入しないとNG
var mobile = isMobile()

export { mobile }
