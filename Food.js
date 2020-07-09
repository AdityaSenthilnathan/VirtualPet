class Food{
    constructor(x,y, foodStock, lastfed){
        this.milkImage = loadImage("images/Milk.png");
        this.body = Matter.Bodies.rectangle(x,y,20,20);

    }

    display(){
        var x = 0;
        var y = 0;
for (var i = 1; i <= foodS; i++){


        image(this.milkImage, this.body.position.x + x, this.body.position.y + y, 100,100);
        x = x + 40
        if (i === 10){
            y = y + 50
            x = 0
        }
  
}
       

    }

getFoodStock (){

    foodStock = firebase.database().ref("Food");
}

updateFoodStock(x){
       
    if (x >= 20) {
        x = 20;
      }
      else {
        x = x + 1;
      }
    firebase.database().ref('/').update({
        Food: x
      });

}

deductFood(x){
    
    if (x <= 0) {
        x = 0;
      }
      else {
        x = x - 1;
      }
    firebase.database().ref('/').update({
      Food: x
    }); 
}

/*bedroom(){
    background(bedroom, 550,500);

}
 
garden(){
    background(garden, 550,500);

}

washroom(){
    background(WashRoom, 550,500);

}*/




}
