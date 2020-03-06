var Square = function () {
    //方块数据
    this.data = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    //原点
    this.origin = {
        x: 0,//行
        y: 0//列
    }
    // 方向，旋转的索引
    this.dir = 0;
}
Square.prototype.canRotate = function (isValid) {//方块可以旋转
    var d = (this.dir + 1) % 4;
    var test = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    let arrData = this.data;
    arrData.forEach((itemI,i) => {
        arrData[0].forEach((itemJ,j)=>{
            test[i][j] = this.rotates[d][i][j];
        });
    });
    return isValid(this.origin, test);
}
Square.prototype.rotate = function (num) {//旋转
    if(!num) num = 1;
    this.dir = (this.dir + num) % 4;

    let arrData = this.data;
    arrData.forEach((itemI,i) => {
        arrData[0].forEach((itemJ,j)=>{
            this.data[i][j] = this.rotates[this.dir][i][j];
        });
    });
}
Square.prototype.canDown = function (isValid) {//方块可以下降
    var test = {};//原点位置
    test.x = this.origin.x + 1;
    test.y = this.origin.y;
    return isValid(test, this.data);
}
Square.prototype.down = function () {//下降
    this.origin.x = this.origin.x + 1;
}

Square.prototype.canLeft = function (isValid) {//方块可以左移
    var test = {};//原点位置
    test.x = this.origin.x;
    test.y = this.origin.y - 1;
    return isValid(test, this.data);
}
Square.prototype.left = function () {//左移
    this.origin.y = this.origin.y - 1;
}

Square.prototype.canRight = function (isValid) {//方块可以右移
    var test = {};//原点位置
    test.x = this.origin.x;
    test.y = this.origin.y + 1;
    return isValid(test, this.data);
}
Square.prototype.right = function () {//右移
    this.origin.y = this.origin.y + 1;
}