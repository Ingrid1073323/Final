//計時器
let timer = document.getElementById("timer");
var count = 0;
timer.innerHTML = count;
let myVar = setInterval(myTimer, 1000);//一秒呼叫一次

function myTimer(){
    count++;
    timer.innerHTML = count;
}
function get_count(){
    return count;
}

//mapArray:地圖的九個格子裡有甚麼、ctx:HTML5 Canvas用、currentImgMain:座標
let mapArray, ctx, currentImgMain, p_enemy1, p_enemy2;
let imgMountain, imgMain, imgEnemy, imgGold, imgEnd;
let b_gold = false, d_enemy = false;
const gridLength = 150;//一格的寬度
//初始化
$(function(){
    //0:可走、1:障礙、2:終點、3:敵人 4:寶物
    //$("#talkBox").text(Math.floor(Math.random()*4)); 
    let map_n = Math.floor(Math.random()*3);
    mapArray = [
        [0,0,1,0],//row1
        [0,4,0,1],//row2
        [3,1,0,0],//row3
        [0,2,3,0] //row4
        
    ]
    ctx = $("#myCanvas")[0].getContext("2d");

    //主角
    imgMain = new Image();
    imgMain.src = "RPG/images/main.png";
    currentImgMain = {//座標
        "x" : 0,
        "y" : 0
    };
    imgMain.onload = function(){
        ctx.drawImage(imgMain, 290,170,325,325,currentImgMain.x,currentImgMain.y,gridLength,gridLength);
    }
    
    //山
    imgMountain = new Image();
    imgMountain.src = "RPG/images/ball.png";//material.png";
    
    //寶物
    imgGold = new Image();
    imgGold.src = "RPG/images/assis.png";

    //敵人
    imgEnemy = new Image();
    imgEnemy.src = "RPG/images/chi.png";
    imgEnemy.onload = function(){
        ctx.drawImage(imgEnemy,0*gridLength,2*gridLength,gridLength-20,gridLength);
        ctx.drawImage(imgEnemy,2*gridLength,3*gridLength,gridLength-20,gridLength);
        /*ctx.drawImage(imgEnemy, 630,40,104,135,0*gridLength,2*gridLength,gridLength,gridLength);
        ctx.drawImage(imgEnemy, 630,40,104,135,2*gridLength,3*gridLength,gridLength,gridLength);*/
    }
    p_enemy1 = {
        "x": 0,//0*gridLength,
        "y": 300//2*gridLength
    };
    p_enemy2 = {
        "x": 300,//2*gridLength
        "y": 450//3*gridLength
    };

    //因為敵人位置受山位置影響，所以enemy包在mountain裡?
    imgMountain.onload = function(){
        imgGold.onload = function(){
                for(var x in mapArray){ //row
                    for(var y in mapArray[x]){ //col
                        if(mapArray[x][y] == 1){ //1:障礙
                            //ctx.drawImage(imgMountain, 32,65,32,32,y*gridLength,x*gridLength,gridLength,gridLength);
                            ctx.drawImage(imgMountain,y*gridLength,x*gridLength,gridLength-10,gridLength-10);
                        }
                        else if(mapArray[x][y] == 4){//4:寶物
                            //ctx.drawImage(imgGold, 130,155,32,32,y*gridLength,x*gridLength,gridLength,gridLength);
                            ctx.drawImage(imgGold,y*gridLength,x*gridLength,gridLength-50,gridLength-30);
                        }
                    }
                }
        }//imgGold.onload
    }//imgMountain.onload

    imgEnd = new Image();
    imgEnd.src = "RPG/images/end.png";
    imgEnd.onload = function(){
        ctx.drawImage(imgEnd,gridLength,3*gridLength,gridLength,gridLength);
    }
    
});

//keyboard事件
$(document).on("keydown",function(event){
    let targetImg, targetBlock, cutImagePositionX;//cutImagePositionX: 決定主角臉方向
     
    //主角的目標座標
    targetImg = {
        "x": -1,
        "y": -1
    };

    //主角的目標(對應2維陣列)
    targetBlock = {
        "x": -1,
        "y": -1
    };

    event.preventDefault();//避免鍵盤預設行為發生，如捲動/放大/換頁..

    //判斷user按下什麼並推算目標座標
    switch(event.code){
        case "ArrowLeft": 
            targetImg.x = currentImgMain.x - gridLength;//向左
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 40;//臉朝左
            break;
        case "ArrowUp":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y - gridLength;//向上
            cutImagePositionX = 570;//臉朝上
            break;
        case "ArrowRight":
            targetImg.x = currentImgMain.x + gridLength;//向右
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 830;//臉朝右
            break;
        case "ArrowDown":
            targetImg.x = currentImgMain.x; 
            targetImg.y = currentImgMain.y + gridLength;//向下
            cutImagePositionX = 290;//臉朝下
            break;       
        default:       
            return;
    }

    //確認目標位置不會超過地圖
    if(targetImg.x<=550 && targetImg.x>=0 && targetImg.y<=550 && targetImg.y>=0){
        targetBlock.x = targetImg.y / gridLength;
        targetBlock.y = targetImg.x / gridLength;
    }else{
        targetBlock.x = -1;
        targetBlock.y = -1;
    }
    
    //清空主角本來在的位置
    ctx.clearRect(currentImgMain.x, currentImgMain.y, gridLength, gridLength);
 
    if(targetBlock.x != -1 && targetBlock.y != -1){//還在九宮格內
        switch(mapArray[targetBlock.x][targetBlock.y]){//0:可走、1:障礙、2:終點、3:敵人
            case 0:
                $("#talkBox").text("");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 1:
                $("#talkBox").text("球來了");
                break;
            case 2:
                if(count <= 5 )$("#talkBox").text("烏野得分!");
                else if(count <= 10)$("#talkBox").text("速度有點慢，青葉城西得分!");
                else currentPlay = 2;("速度太慢!青葉城西得分!");
                
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                clearInterval(myVar);//關掉計時器
                onPlayerStateChange();
                onYouTubeIframeAPIReady();
                //$("#talkBox").text(count.toString());
                break;
            case 3:
                $("#talkBox").text("青葉王牌");
                if(b_gold && d_enemy == false){
                    let confirmAnswer = confirm("是否聯手影山對付及川?");
                    if(confirmAnswer){//情除敵人
                        currentImgMain.x = targetImg.x;
                        currentImgMain.y = targetImg.y;
                        if(targetBlock.x == 2)//enemy1
                            ctx.clearRect(p_enemy1.x,p_enemy1.y,104,135);
                        else 
                            ctx.clearRect(p_enemy2.x,p_enemy2.y,104,135);
                        
                        mapArray[targetBlock.x][targetBlock.y] = 0;    
                        $("#talkBox").text("聯手成功");
                        d_enemy = true;
                    }
                }
               
                break;
            case 4:
                /*if(b_gold)
                 $("#talkBox").text("已獲得影山舉球");
                else*/
                if(!b_gold){
                    $("#talkBox").text("獲得影山舉球");
                    b_gold = true;
                }
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;  
        }
    }
    else{
        $("#talkBox").text("邊界");
    }

    //重新繪製主角
    ctx.drawImage(imgMain, cutImagePositionX,170,325,325,currentImgMain.x,currentImgMain.y,gridLength,gridLength);

});


let player; //Youtube Player
let currentPlay = 0; //紀錄目前撥到第幾首
//Youtube API Ready

function onYouTubeIframeAPIReady(){//youtube api 固定好的函示名稱
    player = new YT.Player("player",{
        height:"390",
        width:"640",
        videoId:playList[currentPlay],
        playerVars:{//常常變動，功能可能一陣子會被改
            autoplay:0, //是否自動撥放
            controls:0, //是否顯示控制
            start:playTime[currentPlay][0],//開始秒數
            end:playTime[currentPlay][1],//結束秒數
            iv_load_policy:3
        },
        events:{
            onReady:onPlayerReady,
            onStateChange:onPlayerStateChange

        }
    });
}

//Youtube Player ready後 設定按鈕
function onPlayerReady(event){
    $("#playButton").on("click",function(){
        //$("h2").text(player.getVideoData().title);
        player.playVideo();
    });
}

function onPlayerStateChange(event){
    //最後一首要載入第一首但不撥放，所以分兩種狀況
    if(count <= 5 ){
        currentPlay = 0;
        $("h2").text("烏野得分!讚!");
    }
    else if(count <= 10){
        currentPlay = 1;
        $("h2").text("青葉城西得分，被及川挑釁了");
    }
    else{
        currentPlay = 2;
        $("h2").text("青葉城西得分，被強力扣殺");
    }
    player.loadVideoById({
        videoId: playList[currentPlay],
        startSeconds: playTime[currentPlay][0],
        endSeconds: playTime[currentPlay][1],
        suggestedQuality: "large"
    });
}
