var Game = function () {
    var gameDiv;
    var nextDiv;
    var timeDiv;
    var scoreDiv;
    var score = 0;//分数
    var resultDiv;
    // 游戏矩阵
    var gameData = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    // 当前方块
    var cur;
    // 下一个方块
    var next;
    var nextDivs = [];
    var gameDivs = [];
    // 初始化div
    var initDiv = function (container, data, divs) {//初始化游戏框里
        for (var i = 0; i < data.length; i++) {//行
            var div = [];//每一小块
            for (var j = 0; j < data[0].length; j++) {//列
                let newNode = document.createElement('div');
                newNode.className = 'none';
                newNode.style.top = (i * 20) + 'px';
                newNode.style.left = (j * 20) + 'px';
                container.appendChild(newNode);//加入
                div.push(newNode);
            }
            divs.push(div);
        }
    }
    // 刷新div
    var refreshDiv = function (data, divs) {//计算里面方块位置
        for (var i = 0; i < data.length; i++) {//行
            for (var j = 0; j < data[0].length; j++) {//列
                if (data[i][j] == 0) {
                    divs[i][j].className = 'none';
                } else if (data[i][j] == 1) {
                    divs[i][j].className = 'done';
                } else {
                    divs[i][j].className = 'current';
                }
            }
        }
    }
    // 检查点是否合法
    var check = function (pos, x, y) {
        if (pos.x + x < 0) {
            return false;
        } else if (pos.x + x >= gameData.length) {
            return false;
        } else if (pos.y + y < 0) {
            return false;
        } else if (pos.y + y >= gameData[0].length) {
            return false;
        } else if (gameData[pos.x + x][pos.y + y] == 1) {//撞到已固定的方块
            return false;
        } else {
            return true;
        }
    }
    // 检查数据是否合法
    var isValid = function (pos, data) {
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[0].length; j++) {
                if (data[i][j] != 0) {
                    if (!check(pos, i, j)) {
                        return false;//foreach无法中途return
                    }
                }
            }
        }
        return true;
    }
    //清除数据
    var clearData = function () {
        let curData = cur.data;
        curData.forEach((itemI, i) => {
            curData[0].forEach((itemJ, j) => {
                if (check(cur.origin, i, j)) {
                    // 把小框里面的拷贝到大框相对应位置
                    gameData[cur.origin.x + i][cur.origin.y + j] = 0;
                }
            });
        });
    }
    // 设置数据
    var setData = function () {
        let curData = cur.data;
        curData.forEach((itemI, i) => {
            curData[0].forEach((itemJ, j) => {
                if (check(cur.origin, i, j)) {
                    // 把小框里面的拷贝到大框相对应位置
                    gameData[cur.origin.x + i][cur.origin.y + j] = cur.data[i][j];
                }
            });
        });
    }
    // 下移
    var down = function () {
        if (cur.canDown(isValid)) {
            clearData();
            cur.down();
            setData();
            refreshDiv(gameData, gameDivs);
            return true;//能下降
        } else {
            return false;//到底了
        }
    }
    // 左移
    var left = function () {
        if (cur.canLeft(isValid)) {
            clearData();
            cur.left();
            setData();
            refreshDiv(gameData, gameDivs);
        }
    }
    // 右移
    var right = function () {
        if (cur.canRight(isValid)) {
            clearData();
            cur.right();
            setData();
            refreshDiv(gameData, gameDivs);
        }
    }
    // 旋转
    var rotate = function () {
        if (cur.canRotate(isValid)) {
            clearData();
            cur.rotate();
            setData();
            refreshDiv(gameData, gameDivs);
        }
    }
    //方块到底部固定
    var fixed = function () {
        let arrData = cur.data;
        arrData.forEach((itemI, i) => {
            arrData[0].forEach((itemJ, j) => {
                if (check(cur.origin, i, j)) {
                    if (gameData[cur.origin.x + i][cur.origin.y + j] == 2) {
                        gameData[cur.origin.x + i][cur.origin.y + j] = 1;//固定
                    }
                }
            });
        });
        refreshDiv(gameData, gameDivs);//重置div
    }
    // 生成下一个方块
    var performNext = function (type, dir) {
        cur = next;
        setData();
        next = SquareFactory.prototype.make(type, dir);
        refreshDiv(gameData, gameDivs);
        refreshDiv(next.data, nextDivs);
    }
    // 消行
    var checkClear = function () {
        var line = 0;//消了几行
        for (var i = gameData.length - 1; i >= 0; i--) {
            var clear = true;
            for (var j = 0; j < gameData[0].length; j++) {
                if (gameData[i][j] != 1) {
                    clear = false;//不消
                    break;
                }
            }
            if (clear) {
                line = line + 1;
                for (var m = i; m > 0; m--) {
                    for (var n = 0; n < gameData[0].length; n++) {
                        gameData[m][n] = gameData[m - 1][n];
                    }
                }
                for (var n = 0; n < gameData[0].length; n++) {
                    gameData[0][n] = 0;
                }
                i++;
            }
        }
        return line;
    }
    // 加分
    var addScore = function (line) {
        var s = 0;
        switch (line) {
            case 1:
                s = 10;
                break;
            case 2:
                s = 30;
                break;
            case 3:
                s = 60;
                break;
            case 4:
                s = 100;
                break;
        }
        score = score + s;
        scoreDiv.innerHTML = score;
    }
    // 检查游戏结束
    var checkGameOver = function () {
        var gameOver = false;
        gameData[0].forEach((itemI, i) => {
            if (gameData[1][i] == 1) {
                gameOver = true;
            }
        });
        return gameOver;
    }
    // 设置时间
    var setTime = function (time) {
        timeDiv.innerHTML = time;
    }
    // 游戏结束
    var gameOver = function(win){
        if(win){
            resultDiv.innerHTML = '你赢了';
        }else{
            resultDiv.innerHTML = '你输了';
        }
    }
    // 底部增加行
    var addTailLines = function(lines){
        for(let i=0;i<gameData.length-lines.length;i++){
            gameData[i] = gameData[i+lines.length];
        }
        for(let i=0;i<lines.length;i++){
            gameData[gameData.length-lines.length+i] = lines[i];
        }
        cur.origin.x = cur.origin.x - lines.length;
        if(cur.origin.x < 0){
            cur.origin.x = 0;
        }
        refreshDiv(gameData,gameDivs);
    }
    // 初始化
    var init = function (doms, type, dir) {
        gameDiv = doms.gameDiv;
        nextDiv = doms.nextDiv;
        timeDiv = doms.timeDiv;
        scoreDiv = doms.scoreDiv;
        resultDiv = doms.resultDiv;
        next = SquareFactory.prototype.make(type, dir);
        initDiv(gameDiv, gameData, gameDivs);
        initDiv(nextDiv, next.data, nextDivs);
        refreshDiv(next.data, nextDivs);
    }
    // 到处api
    this.init = init;
    this.down = down;
    this.left = left;
    this.right = right;
    this.rotate = rotate;
    this.fixed = fixed;
    this.performNext = performNext;
    this.checkClear = checkClear;
    this.checkGameOver = checkGameOver;
    this.setTime = setTime;
    this.addScore = addScore;
    this.gameOver = gameOver;
    this.addTailLines = addTailLines;
    this.fall = () => { while (down()); };
}