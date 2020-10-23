(function () {
    var Body = function () {
        var that = this;
        this.moneyList = [];
        this.mainpen = new pen();


	    document.addEventListener('touchstart', touch, false);
        document.addEventListener('touchend', touch, false); 
        var touchx;
		var touchy;
        function touch(event) {//点击 
            var event = event || window.event;
            switch (event.type) {
                case "touchstart":
					that.mainpen.x = event.touches[0].clientX; 
                    that.mainpen.y = event.touches[0].clientY;
                    break;
                    
                case "touchend":
					that.mainpen.x = 0;
                    that.mainpen.y = 0;
                    break;
            }
        }
		
		
        var addInterval = setInterval(function () {
            if (!isEnd) {
                that.addMoney(Math.random() * 470 + 50);
            } else {
                clearInterval(addInterval);
            }
        }, 500);

    }
	
	

    Body.prototype.clear = function () {//清屏
        context.clearRect(0, 0, canvasWidth, canvasHeight);
    }

    Body.prototype.addMoney = function (x) {//掉钱
        var random = Math.floor(Math.random() * 4);
        if (random == 0 && five_num_left >= 0 && !isEnd) {
            this.moneyList.push(new money(x, "five"));  
        } else if (random == 1 && ten_num_left >= 0 && !isEnd) {
            this.moneyList.push(new money(x, "ten"));
        } else if (random == 2 && empty_num_left >= 0 && !isEnd) {
            this.moneyList.push(new money(x, "empty"));
        } else if (random == 3 && empty_num_left >= 0 && !isEnd) {
            this.moneyList.push(new money(x, "zad"));
        } 
    }

    Body.prototype.draw = function () {
        this.moneyList.forEach(function (item) {
            item.drop();
        });
		
		context.font = "24px 微软雅黑";
        context.fillStyle = "red";
        context.fillText("score:" + score, 10, 50);
        context.fillText("5元× " + five_num, 30, 918);
        context.fillText("10元× " + ten_num, 180, 918);
        context.fillText("空× " + empty_num, 350, 918);
	    context.fillText("炸弹× " + zad_num, 500, 918);
        
    }

    window.Body = Body;
})();