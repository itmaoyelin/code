let oCont  =  document.querySelector(".series .cont");
let oSimg = document.querySelector('#magnify .simg img');
let mov = document.querySelector('#magnify .simg .mov')
let oBigimg = document.querySelector('#magnify .bigimg img');
let oBig = oBigimg.parentNode;
let preHover = document.querySelector('.series .cont .hover');
oCont.addEventListener('mouseover',function(e){
   if(e.target.tagName == "IMG"){
        preHover.classList.remove('hover');
        e.target.parentNode.classList.add('hover');
        preHover = e.target.parentNode;
        oBigimg.src = oSimg.src = e.target.getAttribute('bigimages');
   }

});
let bigStyle = oBig.style;
let movStyle = mov.style;
let movH,movW;
const {clientHeight : simgH,clientWidth : simgW } = oSimg;
const {left:startX, top:startY} = oSimg.getBoundingClientRect();




oSimg.addEventListener('mousemove',e=>{
    bigStyle.display =  movStyle.display = 'block';
    movH = mov.clientHeight;
    movW = mov.clientWidth;
    move(e.clientX, e.clientY);
});

mov.addEventListener('mousemove',e=>{
    move(e.clientX, e.clientY);
});

mov.addEventListener('mouseleave',()=>{
    bigStyle.display =  movStyle.display = 'none';
})

function move(x, y){
    let _x = x - startX - movW /2;
    let _y = y - startY - movH /2;

    if(_x < 0){
        _x = 0;
    }else if(_x > simgW - movW){
        _x = simgW - movW;
    }

    if(_y<0) {
        _y=0;
    }
    else if(_y > simgH -movH){
         _y = simgH -movH;
    };


    movStyle.left = _x + 'px';
    movStyle.top  = _y + 'px';
    let ratioW = (oBigimg.clientWidth - oBig.clientWidth) / (simgW-movW);
    let ratioH = (oBigimg.clientHeight - oBig.clientHeight) / (simgH - movH);
    oBigimg.style.left = -_x*ratioW + 'px';
    oBigimg.style.top = -_y *ratioH+ 'px';
}








