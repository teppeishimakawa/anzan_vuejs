//  shuffle関数
var shuffle = {
  methods: {
    shuffleAry (ary) {
      var i = ary.length
      while (i) { //  arr.lengthが10なら10回以下を回す
        var j = Math.floor(Math.random() * i) //  i:1-10で変化,i=1,j=0  i=2,j=0 or 1  i=3,j=0 or 1 or 2
        var t = ary[--i]//  i:1,t=ary[0]  i:2,t=ary[1]  i:3,t=ary[2]
        ary[i] = ary[j]// ary[1]=ary[0]  ary[2]=ary[0] or ary[1]  ary[3]=ary[0] or ary[1] or ary[2]
        ary[j] = t//  ary[0]= ary[0]  ary[0] or ary[1] = ary[1]   ary[0] or ary[1] or ary[2] = ary[2]
      }
      return ary
    }
  }
}

export default shuffle
