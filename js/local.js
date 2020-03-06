var Local = function(){
    //游戏对象
    var game;
    // 时间间隔
    var INTERVAL = 500;
    // 定时器
    var timer = null;
    // 时间计数器
    var timeCount = 0;
    // 时间
    var time = 0;
    var bindKeyEvent = function(){
        document.onkeydown = function(e){
            switch(e.keyCode){
                case 38:
                    // 上，旋转
                    game.rotate();
                    break;
                case 39:
                    // 右
                    game.right();
                    break;
                case 40:
                    // 下
                    game.down();
                    break;
                case 37:
                    // 左
                    game.left();
                    break;
                case 32:
                    // 空格，落下
                    game.fall();
                    break;
            }
        }
    }
    // 自动下降
    var move = function(){
        timeFunc();
        if(!game.down()){
            game.fixed();//落地固定方块
            var line = game.checkClear();
            if(line){
                game.addScore(line);//加分
            }
            let gameOver = game.checkGameOver();//游戏结束
            if(gameOver){
                game.gameOver(false);
                stop();
            }else{
                game.performNext(generateType(),generateDir());//生成方块
            }
        };
    }
    // 随机生成干扰行
    var generataBottomLine = function(lineNum){
        var lines = [];
        for(var i=0;i<lineNum;i++){
            var line = [];
            for(var j=0;j<10;j++){
                line.push(Math.ceil(Math.random()*2)-1);
            }
            lines.push(line);
        }
        return lines;
    }
    // 计时函数
    var timeFunc = function(){
        timeCount = timeCount + 1;
        if(timeCount == 5){
            timeCount = 0;
            time = time + 1;
            game.setTime(time);
            // if(time % 10 ==0){
            //     game.addTailLines(generataBottomLine(1));//生成干扰
            // }
        }
    }
    // 随机生成方块种类
    var generateType = function(){
        return Math.ceil(Math.random()*7)-1;
    }
    // 随机生成方块旋转次数
    var generateDir = function(){
        return Math.ceil(Math.random()*4)-1;
    }
    // 开始
    var start = function(){
        var doms = {
            gameDiv:document.getElementById('local-game'),
            nextDiv:document.getElementById('local-next'),
            timeDiv:document.getElementById('local-time'),
            scoreDiv:document.getElementById('local-score'),
            resultDiv:document.getElementById('local-gameOver'),
        }
        game = new Game();
        game.init(doms,generateType(),generateDir());
        bindKeyEvent();

        game.performNext(generateType(),generateDir());
        timer = setInterval(move,INTERVAL);//自动下降
    }
    // 结束游戏
    var stop = function(){
        if(timer){
            clearInterval(timer);
            timer = null;
        }
        document.onkeydown = null;
    }
    this.start = start;
}