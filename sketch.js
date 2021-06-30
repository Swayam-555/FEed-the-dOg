var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
// var feed,lastFeed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();
  
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  //  feed = new food();

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feedTheDog = createButton("Feed Dog");
  feedTheDog.position(720,95);
  feedTheDog.mousePressed(feedDog)

}

function draw() {
  background(46,139,87);
  foodObj.display();

 // write code to read fedtime value from the database 
  if (lastFeed >=12){
    text("Last Feed : 7 PM",350,30)
  }else if(lastFeed==0){
    text("Last Feed : 12 AM",350,30)
  }else if(lastFeed<=11){
     text("Last Feed : 7 AM",350,30)
  }
 
  //write code to display text lastFed time here

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  foodS--;
  database.ref('/').update({
    Food:foodS
})
}

//function to add food in stock
function addFoods(){
  dog.addImage(sadDog)
  
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
