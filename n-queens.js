
//input variables
var number;
var name;
var nn,nn1;
//array variables to
var queensplace = [];
var left = [];
var right = [];
var top = [];
var bottom = [];
var topleft = [];
var topright = [];
var bottomleft = [];
var bottomright = [];
var final = [];
var repeatindex = [];
//index of array varibles
var jqueen = 1;
var jtop = 1;
var jright = 1;
var jbottom = 1;
var jleft = 1;
var jtopleft = 1;
var jtopright = 1;
var jbottomleft = 1;
var jbottomright = 1;
//queens progress
var flag_queensplaced = [];
var queeensplaced = 0;

var nQueens = {

	init: function(){
		this.events();
	},

	events: function(){
		// CO\ount button click
		var countEle = document.getElementById("getCount");
		var _this = this;
		countEle.addEventListener('click', function(e) {
			name = document.getElementById("player-name").value;
			number = document.getElementById("box-size").value;
			if(number<=30 && number>3)
				_this.goToGame(name, number);
			 else
			 	window.alert("Entering number sholud be between 4 and 30.");
		});
	},

	goToGame: function(name, size){
		this.changeUI();
		this.setName(name, size);
		this.drawProgress(size);
		this.drawChessBoard(size);
	},

	changeUI: function(){
		document.getElementById("input-box").style.display = "none";
		document.getElementById("main-page").style.display = "block";
		document.getElementById("header").style.display = "block";
	},

	setName: function(name, size){
		document.getElementById("n1me").innerHTML="Welcome!!!  "+name;
		document.getElementById("message").innerHTML="Place "+size+" queeen's in bottom."
	},

	drawProgress: function(size){
		for(var i=1;i<=size;i++){
			this.addSpanElement(i);
		}
		this.setSpanElementName(size);
	},

	addSpanElement: function(i){
		var spanElement=document.createElement("span");
		spanElement.setAttribute("id","Q"+i);
		var queenindicator=document.getElementById("queen-indicator");
		queenindicator.appendChild(spanElement);
	},

	setSpanElementName: function(size){
		for(var i = 1; i <= size; i++){
			document.getElementById("Q"+i).innerHTML="Q"+i;
		}
	},

	drawChessBoard: function(size){
		for(var i=1;i<=size;i++){
			for(var j=1;j<=size;j++){
				this.addButton(i, j, size);
			}
			this.addBreak();
		}
		this.putCentre(size);
	},

	addButton: function(i, j, size){
		var _this=this;
		var dynbutton=document.createElement("input");
		dynbutton.setAttribute("type","button");
		dynbutton.setAttribute("id",(((i-1)*size)+j));
		dynbutton.setAttribute("class",(((i-1)*size)+j));
		dynbutton.setAttribute("value",(((i-1)*size)+j));
		dynbutton.setAttribute("float","left");
		//dynbutton.setAttribute('onclick',this+'.buttonClickHandler();');
		var chessboard=document.getElementById("chess-board");
		chessboard.appendChild(dynbutton);
		dynbutton.onclick = function() {
			_this.buttonClickHandler(size)
		};
	},

	addBreak: function(){
		var newline=document.createElement("br");
		var chessboard=document.getElementById("chess-board");
		chessboard.appendChild(newline);
	},

	putCentre: function(size){
		var element=document.getElementById("game-pane");
		var i = ((30-size)*20);
		element.style.padding="2% "+i+"px";
		element=document.getElementById("progress-pane");
		i=((20-size)*30)+25;
		element.style.padding="0 "+i+"px";
	},

	/*ACtions*/
	buttonClickHandler: function(size){
		var clickedButton = event.srcElement;
		if (flag_queensplaced[clickedButton.id] == undefined || flag_queensplaced[clickedButton.id] == 0){
			flag_queensplaced[clickedButton.id] = 1;
			queeensplaced++;
			this.changeQueenIndicator(queeensplaced);
			queensplace[jqueen++] = clickedButton.id;
			this.changeStyleOfButton(clickedButton);
			this.change_ClickedResult(clickedButton.id);
			this.blockButton(clickedButton.id,size);
			if(queeensplaced == size){
				this.showresults(size);
			}
		}
		else{
			window.alert(clickedButton.id+" already placed!");
		}
	},

	changeQueenIndicator: function(no){
			document.getElementById("Q"+no).style.background="#0f0";
	},

	changeStyleOfButton: function(clickedButton){
		clickedButton.style.background = '#006';
		clickedButton.style.color = '#fff';
	},

	change_ClickedResult: function(id){
		document.getElementById("clickedResult").innerHTML = id;
	},

	blockButton: function(id,size){
		this.blockTop(id,size);
		this.blockRight(id,size);
		this.blockBottom(id,size);
		this.blockLeft(id,size);

		this.blocktopleft(id,size);
		this.blocktopright(id,size);
		this.blockbottomleft(id,size);
		this.blockbottomright(id,size);
	},

	blockTop: function(clicked,size){
		var edge=clicked%size;
		if(edge == 0)
			edge = size;
		for(var i=clicked-size;i>=edge;i=i-size){
			top[jtop]=i;
			jtop++;
		}
	},

	blockRight: function(clicked, size){
		var a=clicked%size;
		if(a != 0){
			var clicked_mod_size=clicked-a;
			var edge=((clicked_mod_size/size)+1)*size;
		}
		else
			var edge=clicked;
		for(var i=clicked-1+2;i<=edge;i++){
			right[jright] = i;
			jright++;
		}
	},

	blockBottom: function(clicked, size){
		if((clicked % size) != 0)
			var edge=((size-1)*size)+(clicked%size);
		else
			var edge=size*size;
		for(var j=(clicked-size)+(2*size);j<=edge;j=(j-size)+(2*size)){
			bottom[jbottom] = j;
			jbottom++;
		}
	},

	blockLeft: function(clicked, size){
		var a = clicked % size;
		var clicked_mod_size=clicked-a;
		if(a != 0){
			var edge=((clicked_mod_size/size)*size)+1;
		}
		else{
			var edge=(((clicked_mod_size/size)-1)*size)+1;
		}
		for(var i=clicked-1;i>=edge;i--){
			left[jleft] = i;
			jleft++;
		}
	},

	blocktopleft: function(clicked, size){
		if ((clicked % size) == 1) {}
		else{
			for (var i = clicked-size-1; i>0 ; i = i-size-1) {
				if (this.checktopleft(i) == 0) {
					topleft[jtopleft] = i;
					jtopleft++;
					continue;
				}
				if (this.checktopleft(i) == 1) {
					topleft[jtopleft] = i;
					jtopleft++;
					break;
				}
			}
		}
	},

	checktopleft: function(i){
		if ((i % number) == 1 )
			return 1;
		else if (((i-1) / number) == 0)
			return 1;
		else
			return 0;
	},

	blocktopright: function(clicked, size){
		if ((clicked % size) == 0) {}
		else{
			for (var i = clicked-size+1; i>0 ; i = i-size+1) {
				if (this.checktopright(i) == 0) {
					topright[jtopright] = i;
					jtopright++;
					continue;
				}
				if (this.checktopright(i) == 1) {
					topright[jtopright] = i;
					jtopright++;
					break;
				}
			}
		}
	},

	checktopright: function(i){
		if ((i % number) == 0)
			return 1;
		else if (((i-1) / number) == 0)
			return 1;
		else
			return 0;
	},

	blockbottomleft: function(clicked, size){
		if ((clicked % size) == 1) {}
		else{
			var limit = number*number;
			var i = parseInt(clicked - 1);
			var k = parseInt(i + parseInt(number));
			//var i=clicked-size-1+size-1+size-1+2;
			//console.log(i);
			while(k<=limit){
				if (this.checkbottomleft(k) == 0) {
					bottomleft[jbottomleft] = k;
					jbottomleft++;
					k = parseInt(k-1+parseInt(number));
					continue;
				}
				if (this.checkbottomleft(k) == 1) {
					bottomleft[jbottomleft] = k;
					jbottomleft++;
					break;
				}

			}
		}
	},

	checkbottomleft: function(i){
		if ((i % number) == 1)
			return 1;
		else if (((i-1) / number) == (number-1))
			return 1;
		else
			return 0;
	},

	blockbottomright: function(clicked, size){
		if ((clicked % size) == 0) {}
		else{
			var limit = number*number;
			var i = parseInt(parseInt(clicked) + 1);
			var k = parseInt(i + parseInt(number));
			while(k<=limit){
				if (this.checkbottomright(k) == 0) {
					bottomright[jbottomright] = k;
					jbottomright++;
					k = parseInt(parseInt(k)+1+parseInt(number));
					continue;
				}
				if (this.checkbottomright(k) == 1) {
					bottomright[jbottomright] = k;
					jbottomright++;
					break;
				}

			}
		}
	},

	checkbottomright: function(i){
		if ((i % number) == 0)
			return 1;
		else if (((i-1) / number) == (number-1))
			return 1;
		else
			return 0;
	},

	showresults: function(size){
		nn = number*number;
		nn1 = number*(number-1);
		final = new Array((number*(number-1))+1);
		repeatindex = new Array((number*number)+1);
		for(var i = 1; i<=(number*(number-1)); i++){
			final[i] = 0;
		}
		for(var i = 1; i<=((number*number)); i++){
			repeatindex[i] = 0;
		}
		this.left2final();
		this.right2final();
		this.top2final();
		this.bottom2final();

		this.topleft2final();
		this.topright2final();
		this.bottomleft2final();
		this.bottomright2final();

		this.showOverlay();
		this.drawOverlayChessBoard(size);
		this.setGameResult();
	},

	left2final: function(){
		for(var i = 1; i <= jleft; i++){
			if(left[i] != undefined){
				final[i] = left[i];
				repeatindex[left[i]] += 1;
			}
		}
	},

	right2final: function(){
		var j = final.length;
		for(var i = 1; i <= jright; i++){
			if(right[i] != undefined){
				final[j] = right[i];
				j++;
				repeatindex[right[i]] += 1;
			}
		}
	},

	top2final: function(){
		var j = final.length;
		for(var i = 1; i <= jtop; i++){
			if(top[i] != undefined){
				final[j] = top[i];
				j++;
				repeatindex[top[i]] += 1;
			}
		}
	},

	bottom2final: function(){
		var j = final.length;
		for(var i = 1; i <= jbottom; i++){
			if(bottom[i] != undefined){
				final[j] = bottom[i];
				j++;
				repeatindex[bottom[i]] += 1;
			}
		}
	},

	topleft2final: function(){
		var j = final.length;
		for(var i = 1; i <= jtopleft; i++){
			if(topleft[i] != undefined){
				final[j] = topleft[i];
				j++;
				repeatindex[topleft[i]] += 1;
			}
		}
	},

	topright2final: function(){
		var j = final.length;
		for(var i = 1; i <= jtopright; i++){
			if(topright[i] != undefined){
				final[j] = topright[i];
				j++;
				repeatindex[topright[i]] += 1;
			}
		}
	},

	bottomleft2final: function(){
		var j = final.length;
		for(var i = 1; i <= jbottomleft; i++){
			if(bottomleft[i] != undefined){
				final[j] = bottomleft[i];
				j++;
				repeatindex[bottomleft[i]] += 1;
			}
		}
	},

	bottomright2final: function(){
		var j = final.length;
		for(var i = 1; i <= jbottomright; i++){
			if(bottomright[i] != undefined){
				final[j] = bottomright[i];
				j++;
				repeatindex[bottomright[i]] += 1;
			}
		}
	},

	showOverlay: function(){
		document.getElementById("overlay-res").style.display="block";
		document.getElementById("main-page").style.display = "none";
		document.getElementById("header").style.display="block";
	},


	drawOverlayChessBoard: function(size){
		for(var i=1;i<=size;i++){
			for(var j=1;j<=size;j++){
				this.addButton2(i, j, size);
			}
			this.addBreak2();
		}
		this.putCentre2(size);
	},

	addButton2: function(i, j, size){
		var _this=this;
		var dynbutton=document.createElement("input");
		dynbutton.setAttribute("type","button");
		dynbutton.setAttribute("id","b"+(((i-1)*size)+j));
		dynbutton.setAttribute("class",(((i-1)*size)+j));
		dynbutton.setAttribute("value",(((i-1)*size)+j));
		dynbutton.setAttribute("float","left");
		//dynbutton.setAttribute('onclick',this+'.buttonClickHandler();');
		var chessboard=document.getElementById("result-chess-board");
		chessboard.appendChild(dynbutton);
	},

	addBreak2: function(){
		var newline=document.createElement("br");
		var chessboard=document.getElementById("result-chess-board");
		chessboard.appendChild(newline);
	},

	putCentre2: function(size){
		var element=document.getElementById("overlay-res");
		var i = ((30-size)*20);
		element.style.padding="2% "+i+"px";
	},

	setGameResult: function(){
		var flag = 0;
		for(var i=1;i<=(number*number);i++){
			if(repeatindex[i] > 4 || repeatindex[i] == 1){
				flag = 1;
			}
		}
		var span_res=document.getElementById("res");
		if(flag == 0){
			span_res.innerHTML="Excellent!!! <br>You won the game.<br><br>";
		}
		else{
			span_res.innerHTML="You Lost the game.<br><br>";
		}
		this.differentColorIndication();
	},

	differentColorIndication: function(){
		for(var i=1;i<=number;i++){
			this.changeStyleOfButton01(queensplace[i],'#060');
		}
		for(var i=1;i<=number;i++){
			if (repeatindex[queensplace[i]] != 0) {
				this.changeStyleOfButton01(queensplace[i],'#f00');
			}
		}
	},

	changeStyleOfButton01: function(id,color){
		var element = document.getElementById("b"+id);
		element.style.background = color;
		element.style.color = '#fff';
	}
}

nQueens.init();
