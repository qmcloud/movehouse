(function () {
    var five = new Image();//5
    five.src = "https://www.58hongtu.com/assets/game/images/f1.png";

    var ten = new Image();//100
    ten.src = "https://www.58hongtu.com/assets/game/images/f2.png";
	
	var empty = new Image();//空的
    empty.src = "https://www.58hongtu.com/assets/game/images/f3.png";
	
	var zad = new Image();//炸弹
    zad.src = "https://www.58hongtu.com/assets/game/images/f0.png";



    var moneyEnum = {
        five: {
            image: five,
            speed: 12,
			value: 4,
			widths:127,
			heights:143,
        }, ten: {
            image: ten,
            speed: 12,
			value: 8,
			widths:127,
			heights:143,
        }, empty: {
            image: empty,
            speed: 12,
			value: 10,
			widths:127,
			heights:143,
		}, zad: {
            image: zad,
            speed: 8,
			value: -10,
			widths:83,
			heights:71,
		}
    };
	
	
	
	
    var money = function (x,type) {
        this.x = x;
        this.y = 0;
        this.type = type;
        this.status = 0;//0正在掉落，1接住 ，2没接住
		this.widths=moneyEnum[this.type].widths;
		this.heights=moneyEnum[this.type].heights;
		
       
    }

    money.prototype.draw = function () {
        if (this.status == 0) {
			 context.drawImage(moneyEnum[this.type].image, this.x, this.y, moneyEnum[this.type].widths, moneyEnum[this.type].heights);
        }
    }

  money.prototype.drop = function () {
    //速度叠加
    this.y += moneyEnum[this.type].speed;

  
    if (this.status == 0 && body.mainpen.y > this.y && body.mainpen.y <this.y + this.heights &&  body.mainpen.x > this.x &&  body.mainpen.x < this.x + this.widths) {//
	
      this.status = 1;
	  
	  		 score += moneyEnum[this.type].value;//记录总分数
	  	
		   if (moneyEnum[this.type].image == five) {
		       five_num += 1;
			   
		  } else if (moneyEnum[this.type].image == ten) {
				console.log('10元红包');
				ten_num += 1;
				time += 1;
			   
		  } else if (moneyEnum[this.type].image == empty) {  
				console.log('没有点中');
				empty_num += 1;
		  } else if (moneyEnum[this.type].image == zad) {  //炸弹
				console.log('炸弹');
				zad_num+= 1;
				time -=1;
		  } 

    } else if (this.y >= 1039) { 
      this.status = 2;
    }
    this.draw();
  }

  window.money = money;
})();