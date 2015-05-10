// JavaScript Document
var groceryList = [];

document.addEventListener('deviceready', function(ev) {
//document.addEventListener("DOMContentLoaded", function(ev){
  //this runs when the page loads
  
  if(localStorage.getItem("grocery-harv0116")){
    groceryList = JSON.parse(localStorage.getItem("grocery-harv0116"));
    //convert from String to Array
  }
  
  showList();
  
  
  // put hammer here for add button
  var addButton = document.querySelector("#btnAdd");
  
   var mchammertime = new Hammer(addButton);	
			var Tap2 = new Hammer.Tap({event: 'tap' });
			mchammertime.add([Tap2]);

			mchammertime.on('tap', function(ev) {
				ev.preventDefault();
				console.log(ev);				
				var newItem = document.querySelector("#item").value;
				groceryList.push( newItem );
				localStorage.setItem("grocery-harv0116", JSON.stringify(groceryList) );
				//convert from Array to String.
				document.getElementById('item').value='';
				
				showList();
				return false;
			});

});

function removeItem(ev){
  var txt = ev.target.firstChild.nodeValue;
  
  for(var i=0;i<groceryList.length;i++){
  	if(groceryList[i] == txt){
      //found the match
      groceryList.splice(i, 1);
    }
  }
  localStorage.setItem("grocery-harv0116", JSON.stringify(groceryList) );
  showList();
}

function changeItem(ev){
// turn colour to grey

	if (ev.target.className == "tagged") {
		ev.target.className = "";
	} else {
		ev.target.className = "tagged";
	}
}

function showList(){
  var output = document.getElementById("output");
  output.innerHTML = "";
  var ul = document.createElement("ul");
  ul.className = "listview";
  output.appendChild(ul);
  
  for(var i=0;i<groceryList.length;i++){
    var li = document.createElement("li");
    li.innerHTML = groceryList[i]; 
    ul.appendChild(li);
  }
  
  var listview = document.querySelector('ul');		
		
	var hammertime = new Hammer.Manager(listview);	
	var singleTap = new Hammer.Tap({ event: 'singletap' });
	var swiperight = new Hammer.Swipe({event: 'swiperight' });
	hammertime.add([swiperight]);
	hammertime.add([singleTap]);
	
	 hammertime.on('singletap', function(ev) {
		ev.preventDefault();
		
		changeItem(ev);
	});
	hammertime.on('swiperight', function(ev) {
		ev.preventDefault();
		
		removeItem(ev);
	}); 
}