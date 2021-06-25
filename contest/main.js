//contest
document.getElementById("bg").style.backgroundImage = "url('contest/image/bg_0.png')";

$(function(){
    //儲存答到第幾題
    var currentQuiz = null;

    //things happen after clicked button
    $("#startButton").on("click",function(){
        if(currentQuiz == null){//begining
            //show the question
            currentQuiz = 0;//start from Q0
            $("#question").text(questions[0].question);

            //answer
            $("options").empty();
            questions[0].answers.forEach(function(element,index,array){
                $("#options").append(`<input name='options' type='radio'
                value='${index}'><label>${element[0]}</label><br><br>`);
            });

            //button
            $("#startButton").attr("value","Next");
        }else{
            //查看那些已被選
            $.each($(":radio"),function(i,val){
                //根據隊伍換背景
                if(currentQuiz == 0){
                    if(i == 0)
                        document.getElementById("bg").style.backgroundImage = "url('contest/image/bg_2.png')";
                    else if(i == 1)
                        document.getElementById("bg").style.backgroundImage = "url('contest/image/bg_1.png')";
                    else if(i == 2)
                        document.getElementById("bg").style.backgroundImage = "url('contest/image/bg_3.png')";
                }
                
                if(val.checked){
                    //check是不是已經要出現結果
                    if(isNaN(questions[currentQuiz].answers[i][1])){
                        var finalResult = questions[currentQuiz].answers[i][1];
                        $("#question").text(finalAnswers[finalResult][0]);
                        $("#options").empty();
                        $("#options").append(`${finalAnswers[finalResult][1]}<br><br>`);
                        
                        //全部結束，設定重新開始
                        currentQuiz = null;
                        $("#startButton").attr("value","重新開始");
                       
                    }else{
                        currentQuiz = questions[currentQuiz].answers[i][1]-1; //code從0開始，so -1
                        //next question
                        $("#question").text(questions[currentQuiz].question);
                        $("#options").empty();
                        questions[currentQuiz].answers.forEach(function(element,index,array){
                            $("#options").append(`<input name='options' type='radio' value='${index
                            }'><label>${element[0]}</label><br><br>`);
                        });
                    }//else
                    
                    return false;//結束
                }
            });

        }//else
    });
});


