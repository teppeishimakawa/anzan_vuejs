<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.canlook
{
visibility: visible;
}

.canpoint
{
pointer-events: auto;
}

.notlook
{
visibility: hidden;
}

.notpoint
{
pointer-events: none;
}

.red
{
transition: filter 0s;
}

.green
{
transition: filter 0s;
}

.red:active {
    filter: invert(15%) sepia(95%) saturate(6932%) hue-rotate(358deg) brightness(95%) contrast(112%);
}

.green:active {
    filter: invert(17%) sepia(91%) saturate(7085%) hue-rotate(128deg) brightness(100%) contrast(106%);
}

.textred
{
color:red
}

.textblack
{
color:black
}

button {
    display: inline-block;
    color: #fff;
    background-color: #42b983;
    border-color: #2e6da4;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
    width:80px;
    margin:10px;

}
button[disabled] {
    cursor: not-allowed;
    filter: alpha(opacity=65);
    -webkit-box-shadow: none;
    box-shadow: none;
    opacity: .65;
}

.btn_all {
position: fixed;
bottom: 1%;
left: 50%;
transform: translate(-50%, 0%);
}

.key_all
{
text-align: center; /*align centerは親要素に設定する*/
position: fixed;
bottom: 6%;
left: 50%;
transform: translate(-50%, 0%);
width:330px;
}

.key
{
display:inline;
width:100px;
margin: 5px 5px;
padding: 15px;
z-index: 100;
}

.zero
{
margin-left:-215px
}

.enter
{
display:inline;
width:200px;
margin: 5px 0px;
padding: 25px 0px 25px 0px;
margin:0px 0px 20px 0px;
z-index: 100;
}

</style>
