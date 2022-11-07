(function () {

    /*=============================== Grid =============================*/
    let Grid = function() {
        let X,Y,Z;
        return index=>{
            X = index % 5 - 2;
            Y = Math.floor(index%25/5) - 2;
            Z = 2 - Math.floor(index/25) ;
            return `transform: translate3d(${X*400}px,${Y*400}px,${Z*750}px)`;
        };
    }();
    /*=============================== Helix =============================*/
    let Helix = function () {
        let RY;
        const deg = 360/(125/4);
        return index=>{
            RY = index*deg;
            return `transform: rotateY(${RY}deg) translate3d(0px,${(index-62)*10}px,800px)`;
        }
    }();
    /*=============================== Table =============================*/
    let Table =  function() {
        let x,y;
        let coordinate = [
            {x:0,y:0},
            {x:17,y:0},
            {x:0,y:1},
            {x:1,y:1},
            {x:12,y:1},
            {x:13,y:1},
            {x:14,y:1},
            {x:15,y:1},
            {x:16,y:1},
            {x:17,y:1},
            {x:0,y:2},
            {x:1,y:2},
            {x:12,y:2},
            {x:13,y:2},
            {x:14,y:2},
            {x:15,y:2},
            {x:16,y:2},
            {x:17,y:2}
        ];
        return index=> {
            if (index < 18) {
                x = coordinate[index].x;
                y = coordinate[index].y;
            } else if (index < 90) {
                x = index % 18;
                y = Math.floor(index / 18) + 2;
            } else if (index < 105) {
                x = index % 18 + 1.5;
                y = Math.floor(index / 18) + 2;
            } else if (index < 120) {
                x = (index + 3) % 18 + 1.5;
                y = Math.floor((index + 3) / 18) + 2;
            } else {
                x = 17;
                y = 6;
            }
            return `transform: translate(${(x - 8.5) * 150}px,${(y - 4) * 200}px)`;
        }
    }();
    /*=============================== Sphere =============================*/
    let Sphere = function(){
        let list = [1,3,7,9,11,14,21,16,12,10,9,7,4,1];
        let xdeg=180/(list.length-1);
        let row,col,x,y;
        return index=> {
            let sum = 0;
            for (let i = 0; i < list.length; i++) {
                sum += list[i];
                if (sum >= (index + 1)) {
                    row = i;
                    col = list[i] - (sum - index);
                    break;
                }
            }
            x = 90 - row * xdeg;
            y = col * 360 / list[row] + list[row] * 10;
            return `transform: rotateY(${y}deg) rotateX(${x}deg) translateZ(1000px)`;
        }
    }();


    let rX=0,rY=0,z=-1500;
    let oul = document.querySelector('.random');
    let oStyle = document.getElementById('style');
    let fragment = document.createDocumentFragment();
    let style = '';

    for (let i = 0;i<125;i++){
        let d = data[i] || {"order":"118","name":"Uuo","mass":""};
        let oli = document.createElement('li');
        oli.innerHTML = `
        <p>${d['name']}</p>
        <p>${d['order']}</p>
        <p>${d['mass']}</p>
        `;
        fragment.appendChild(oli);
        style += `
        #list ul.random li:nth-child(${i+1}){transform: translate3d(${Math.random()*2200-1100}px,${Math.random()*2200-1100}px,${Math.random()*6000-2000}px)} 
        #list ul.Grid li:nth-child(${i+1}){${Grid(i)}}
        #list ul.Helix li:nth-child(${i+1}){${Helix(i)}}
        #list ul.Sphere li:nth-child(${i+1}){${Sphere(i)}}
        #list ul.Table li:nth-child(${i+1}){${Table(i)}}
        `;

    }
    oStyle.innerHTML = style;
    oul.appendChild(fragment);
    oul.offsetLeft;//让浏览器先重绘
    oul.className = 'Grid';

    /*=============================== 点击事件 =============================*/
    (function () {
        let oTab = document.getElementById('tab');
        oTab.addEventListener('click',ev => {
            oul.className = ev.target.innerText;
        })
    })();

    /*=============================== 鼠标拖动 =============================*/
    (function () {
        let x,y,x_=0,y_=0,lastTime=0;
        document.addEventListener('mousedown',e=>{
            x = e.clientX;
            y = e.clientY;
            document.addEventListener('mousemove',move);
        });
        document.addEventListener('mouseup',e=>{
                document.removeEventListener('mousemove',move);
                inertia();
            }
        );
        window.onmousewheel = function (ev) {
            z += ev.wheelDelta;
            z = Math.max(z,-7000);
            z = Math.min(z,800);
            oul.style.transform = `translateZ(${z}px) rotateX(${rX}deg) rotateY(${rY}deg)`;
        };
        //惯性函数
        function inertia() {
            if (new Date().getTime() - lastTime>100) return;
            rX += y_/12;
            rY += -x_/12;
            if (Math.abs(x_) < 12 && Math.abs(y_) < 12) return;
            oul.style.transform = `translateZ(${z}px) rotateX(${rX}deg) rotateY(${rY}deg)`;
            x_ *= 0.95;
            y_ *=0.95;
            requestAnimationFrame(inertia);
        }
        function move(ev) {
            lastTime = new Date().getTime();
            x_ = x - ev.clientX;
            y_ = y - ev.clientY;
            rX += y_/12;
            rY += -x_/12;
            oul.style.transform = `translateZ(${z}px) rotateX(${rX}deg) rotateY(${rY}deg)`;
            x = ev.clientX;
            y = ev.clientY;
        }
    })();
})();






