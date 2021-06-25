let player; //Youtube Player
let currentPlay = 0; //紀錄目前撥到第幾首
let currentList = l_u;//預設清單:烏野
let playTime = t_u;
let song = document.getElementById("new");//新歌
let start = document.getElementById("start");//開始秒數
let end = document.getElementById("end");//結束秒數

let str="";

function updateList(){
    str="";
    for(let i=0; i<currentList.length; i++){
        str = str + (i+1) +". " + currentList[i][1] + "\n";
    }
    document.getElementById("name").value = str ;
}
//加歌
$("#enter").on("click",function(){
    let tmp = song.value.split(".");
    let id = tmp[1].split("/")[1];
    let title =$("#title").val();
    let addList = $("#school").val();
    let l =[id,title];
    let t =[$("#start").val(),$("#end").val()];
    if(addList == 0){
        l_u.push(l);
        t_u.push(t);
    }
    else if(addList == 1){
        l_c.push(l);
        t_c.push(t);
    }
    else if(addList == 2){
        l_b.push(l);
        t_b.push(t);
    }
    updateList();
});
//下一手
$("#nextButton").on("click",function(){
    if(currentPlay < currentList.length-1)
        currentPlay++;
    else
        currentPlay = 0;

    player.loadVideoById({
        videoId: currentList[currentPlay][0],
        startSeconds: playTime[currentPlay][0],
        endSeconds: playTime[currentPlay][1],
        suggestedQuality: "large"
    });
});
//上一首
$("#prevButton").on("click",function(){
    if(currentPlay != 0)
        currentPlay--;

    player.loadVideoById({
        videoId: currentList[currentPlay][0],
        startSeconds: playTime[currentPlay][0],
        endSeconds: playTime[currentPlay][1],
        suggestedQuality: "large"
    });
});

//Youtube API Ready
function onYouTubeIframeAPIReady(){//youtube api 固定好的函示名稱
    player = new YT.Player("player",{
        height:"390",
        width:"640",
        videoId:currentList[currentPlay][0],
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
    updateList();
}
//換歌單
$("#list").change(function(){
    currentList = l_all[$("#list").val()];
    playTime = t_all[$("#list").val()];
    currentPlay = 0;
    player.cueVideoById({
        videoId:currentList[currentPlay][0],
        startSeconds:playTime[currentPlay][0],
        endSeconds:playTime[currentPlay][1],
        suggestedQuality:"large"
    });
    /*str = "";
    for(let i=0; i<currentList.length; i++){
        str = str + (i+1) +". " + currentList[i][1] + "\n";
    }
    document.getElementById("name").value = str ;*/
    updateList();
    $("h2").text(player.getVideoData().title);
});
//Youtube Player ready後 設定按鈕
function onPlayerReady(event){
    $("#playButton").on("click",function(){
        $("h2").text(player.getVideoData().title);
        player.playVideo();
    });
}

//player state change 一首播完就跳下一首
function onPlayerStateChange(event){
    //最後一首要載入第一首但不撥放，所以分兩種狀況
    if(Math.floor(player.getCurrentTime()) == playTime[currentPlay][1]){
        if(currentPlay < currentList.length-1){
            currentPlay++;
            player.loadVideoById({
                videoId: currentList[currentPlay][0],
                startSeconds: playTime[currentPlay][0],
                endSeconds: playTime[currentPlay][1],
                suggestedQuality: "large"
            });
        }
        else{
                currentPlay = 0;
                player.cueVideoById({
                videoId:currentList[currentPlay][0],
                startSeconds:playTime[currentPlay][0],
                endSeconds:playTime[currentPlay][1],
                suggestedQuality:"large"
            });
        }
    }
    $("h2").text(player.getVideoData().title);
}