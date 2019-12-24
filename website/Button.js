var cnt = 0;
function CountFun() {
    document.getElementById('btn').style.left = Math.floor(Math.random()*screen.width % 1000).toString() + 'px';
    document.getElementById('btn').style.top = Math.floor(Math.random()*screen.height % 550).toString() + 'px';
    cnt = cnt + 1;
    var divData = document.getElementById("count");
    divData.innerHTML = "Click Count: "  + cnt.toString();
}