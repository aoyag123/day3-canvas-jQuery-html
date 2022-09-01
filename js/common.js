

// const canvas001 = document.getElementById("canvas001");
// const context001 = canvas001.getContext("2d");//2次元描画


// context001.fillStyle = 'skyblue';
// context001.fillRect(150, 50, 100, 100);

// context001.fillText("SUNABACO KOZA 台風なう", 0, 24, 200, 100);

$(function(){

    const canvas = document.getElementById("canvas001");
    const ctx = canvas.getContext("2d");


    const cnvWidth = 500;
    const cnvHeight = 400;
    let cnvColor = "black";
    let cnvLineWidth = 5;
    let clickFlag =0;
    let bgColor = "white"

    function setBgColor(){
        ctx.fillStyle = bgColor;
        ctx.fillRect(0,0,cnvWidth,cnvHeight);
    }

    setBgColor();

    $("#canvas001").mousedown(function(){
        clickFlag = 1;
    }).mouseup(function(){
        clickFlag = 0;
    }).mousemove(function(e){
        if(!clickFlag)return false;
        draw(e.offsetX,e.offsetY);
    });


    function draw(x,y){
        ctx.lineWidth = cnvLineWidth;
        ctx.strokeStyle = cnvColor;
        if(clickFlag=="1"){ //クリックした時
            clickFlag = "2"; //フラグを２にする
            ctx.beginPath(); //パスの開始 //パスのリセット
            ctx.lineCap ="round";  // 線の角を丸くする
            ctx.moveTo(x,y);
        }else{
            ctx.lineTo(x,y);
        }
        ctx.stroke();
    };

    $(".color a").on("click",function(){
        cnvColor = $(this).data("color");
        return false;
    });

    $(".weight a").on("click",function(){
        cnvLineWidth = $(this).data("weight");
        return false;
    });


    $("#clear").on("click",function(){
        ctx.clearRect(0,0,cnvWidth,cnvHeight);
        setBgColor();
    });

    $("#download").on("click",function(){
        const base64 = canvas.toDataURL();
        $("#download").attr("href",base64);
    });

    $("#twitUrl").on("click",function(){
        const base64 = canvas.toDataURL();
        $("#twitUrl").attr('href', `https://twitter.com/intent/tweet?url=${base64}`);
    });

    





});

function twitText() {
    var s, url;
    s = "お絵描きアプリをつくったよ!みんなで遊んでね！ %23sunabaco %23復習講座 %23canvas講座";
    url = document.location.href;
    
    if (s != "") {
        if (s.length > 140) {
            //文字数制限
            alert("テキストが140字を超えています");
        } else {
            //投稿画面を開く
            url = "http://twitter.com/share?url=" + escape(url) + "&text=" + s;
            window.open(url,"_blank","width=600,height=300");
        }
    }
}