let questions = [
    {//1.選隊
        "question":"請選擇您所代表的隊伍",
        "answers":[
            ["青葉城西高中",2],
            ["烏野高中",7],
            ["白鳥澤學園",12]
        ]
    },
    {//2.青葉，首戰
        "question":"青葉城西高中，首戰，請選擇對手:",
        "answers":[
            ["伊達工業高中",3],
            ["新山工高中",4]
        ]
    },
    {//3.青葉贏伊達工，二戰
        "question":"青葉城西勝，伊達工敗，請選擇第二戰對手:",
        "answers":[
            ["烏野高中",5],
            ["白鳥澤學園","B"]
        ]
    },
    {//4.青葉贏新山工，二戰
        "question":"青葉城西勝，新山工敗，請選擇第二戰對手:",
        "answers":[
            ["烏野高中",5],
            ["伊達工業高中",6]
        ]
    },
    {//5.青葉贏烏野，三戰
        "question":"青葉城西勝，烏野敗，請選擇第三戰對手:",
        "answers":[
            ["九谷南高中","A"],
            ["白鳥澤學園","B"]
        ]
    },
    {//6.青葉贏伊達工，三戰
        "question":"青葉城西勝，伊達工敗，請選擇第三戰對手:",
        "answers":[
            ["烏野高中","B"],
            ["白鳥澤","A"]
        ]
    },
    {//7.烏野，首戰
        "question":"烏野高中，首戰，請選擇對手:",
        "answers":[
            ["扇南高中",8],
            ["九谷南高中",9]
        ]
    },
    {//8.烏野，贏扇南，二戰
        "question":"烏野勝，扇南敗，請選擇第二戰對手:",
        "answers":[
            ["伊達工業高中",10],
            ["条善寺高中",11]
        ]
    },
    {//9.烏野，贏九谷南，二戰
        "question":"烏野勝，九谷南敗，請選擇第二戰對手:",
        "answers":[
            ["伊達工業高中",10],
            ["白鳥澤學園","B"]
        ]
    },
    {//10.烏野，贏伊達工，三戰
        "question":"烏野勝，伊達工敗，請選擇第三戰對手:",
        "answers":[
            ["青葉城西高中","B"],
            ["白鳥澤學園","A"]
        ]
    },
    {//11.烏野，贏善条寺，三戰
        "question":"烏野勝，善条四敗，請選擇第三戰對手:",
        "answers":[
            ["青葉城西高中","A"],
            ["白鳥澤學園","B"]
        ]
    },
    {//12.白鳥澤，首戰
        "question":"白鳥澤學園，首戰，請選擇對手:",
        "answers":[
            ["烏野高中",13],
            ["新井川高中",14]
        ]
    },
    {//13.白鳥澤，贏烏野，二戰
        "question":"白鳥澤勝，烏野敗，請選擇第二戰對手:",
        "answers":[
            ["青葉城西","A"],
            ["伊達工","A"]
        ]
    },
    {//14.白鳥澤，贏新井川，二戰
        "question":"白鳥澤勝，新井川敗，請選擇第二戰對手:",
        "answers":[
            ["青葉城西高中","A"],
            ["烏野高中","B"]
        ]
    }   
];

let finalAnswers={
    "A":["獲勝!恭喜晉級","您將代表宮城縣參加春高!"],
    "B":["晉級失敗!","很遺憾，請明年再接再勵!"],
};
