createMap();
createbutton();
var ChessPiece = false;
var Obj = new Array();       /*创建数组*/
var arr = new Array();		/*创建二维数组*/
for(var i=0;i<15;i++){			
	arr[i] = new Array();
}



/*创建棋盘*/
function createMap(){
	var chessboardBox = document.createElement('div'); /*创建div*/
	chessboardBox.className="chessboardBox"; 			/*添加样式到新建的div*/
	var body = document.getElementsByTagName('body')[0];
	body.style.background = "url('image/bg.jpg') ";
	body.appendChild(chessboardBox);
	var chessboard = document.createElement("table");   /*创建一个新的table元素*/
	chessboard.className = "chessboard";   /*对新table元素添加class样式*/
	chessboard.cellSpacing = 0;			   /*表格间隙设置为0*/
	var row,cell;
	for(var i=0;i<14;i++){                           
		row = chessboard.insertRow(i);   /*对table对象创建14行*/
		for(var j=0;j<14;j++){						
			cell = row.insertCell(j);    /*创建14个单元格*/
			cell.innerHTML=i+"*"+j;      /*对表格进行编号*/
		}
	}	
	chessboardBox.appendChild(chessboard);	/*将chessboard添加到chessboardBox下面*/
}



/*创建开始和重开按钮*/
function createbutton(){
	var ButtonBox = document.createElement('div');			/*创建div*/
	ButtonBox.className = "ButtonBox";						/*添加样式到新建的div中*/
	var button1 = document.createElement('button');			/*创建button*/
	var button2 = document.createElement('button');			/*创建button*/
	var body = document.getElementsByTagName('body')[0];	/*找到body标记*/
	body.appendChild(ButtonBox);		/*将div添加到body标记末尾*/
	ButtonBox.appendChild(button1);		/*将按钮添加到div末尾*/
	ButtonBox.appendChild(button2);
	button1.innerHTML = '开始';			/*在按钮中插入文本*/
	button2.innerHTML = '重开';
	button1.onclick = gamestart;			/*调用游戏开始gamestart函数*/
	button2.onclick = AgainGame;			/*调用AgainGame函数*/
}



/*点击开始按钮后,创建棋子和棋盘*/
function gamestart(){
	var chessboardBox = document.getElementsByClassName('chessboardBox')[0];/*找到chessboardBox节点*/
	var Box=document.createElement("div");    /*创建一个新的div*/
	Box.className="Box";         /*对新div添加class样式Box*/
	
	for(var i=0;i<15;i++){       /*利用循环新建一个15*15的表格*/
		for(var j=0;j<15;j++){
			Obj[i*15+j] = document.createElement("i");   /*创建新元素i*/
			Obj[i*15+j].style.left = j*41+1+"px";	/*对单元格进行横向定位*/
			Obj[i*15+j].style.top = i*41+1+"px";	/*对单元格进行纵向定位*/
			Box.appendChild(Obj[i*15+j]);			/*添加i标签到Box*/
			Obj[i*15+j].onclick = chess;			/*调用chess函数来创建棋子*/
			Obj[i*15+j].clicked = false;			/*设置每个单元格属性为false*/
			Obj[i*15+j].num = i*15+j;				/*给每个单元格编号*/
		}
	}
	chessboardBox.appendChild(Box);	        /*将Box添加到chessboardBox下面*/
}


/*Again Game start*/
function AgainGame(){
	var chessboardBox = document.getElementsByClassName('chessboardBox')[0];      /*找到chessboardBox节点*/
	var Box = document.getElementsByClassName('Box')[0];       /*找到chessboardBox节点*/
	chessboardBox.removeChild(Box);     /*删除Box节点来删除原有的棋盘*/
	for(var i=0;i<15;i++){				/*清空数组*/
		arr[i] = new Array();
	}
	gamestart();          /*调用gamestart()函数,重新创建棋盘*/

}



/*创建棋子*/
function chess(){
	if(this.clicked!=false){					  /*判断此单元格是否已有棋子存在*/
		alert('不可以重复');
		return;
	}
	this.clicked = ChessPiece ==true?'white':'black';  /*给每个棋子做标记如果是true就标记为black,反之则为white*/
	piece = document.createElement('div');		  /*新建一个div*/
	if(!ChessPiece){							  /*判断ChessPiece的boolean值*/
		piece.className = "piece black";		  /*值为false则黑子*/
		ChessPiece = true;						  /*为了不重复出现黑子，将ChessPiece值改为true*/
	}
	else{											
		piece.className = "piece white";		  /*值为false则白子*/
		ChessPiece = false;						  /*将ChessPiece的值改为false*/
	}
	this.appendChild(piece);					  /*将棋子添加到当前点击的单元格内*/
	var coordinate = Coordinate(this.num); 		  /*调用Coordinate()函数,并将单元格编号作为参数传递,返回x,y坐标*/
	WinLose(coordinate,this.clicked,this.num);	  /*调用判断胜负函数*/

}



/*对每一个棋子进行编号*/
function Coordinate(num){
	var coordinate = {};							/*生命变量*/
	coordinate.y = parseInt(num/15);			    /*通过单元格编号,计算横坐标，并进行赋值*/
	coordinate.x = num%15;							/*通过单元格编号,计算纵坐标，并进行赋值*/						
	return coordinate;								/*返回坐标值*/
}


/*胜负判断*/
function WinLose(coordinate,ChessPiece,num){
	console.log(coordinate);						/*打印坐标*/
	console.log(ChessPiece);					/*打印棋子颜色*/
	console.log(num);
	arr[coordinate.y][coordinate.x] = [ChessPiece];  /*存储棋子颜色*/	
	/*判断*/	
	if(arr[coordinate.y][coordinate.x] == 'black'){
		/*向右判断*/
		if(arr[coordinate.y][coordinate.x+1] == 'black'&&arr[coordinate.y][coordinate.x+2] == 'black'&&arr[coordinate.y][coordinate.x+3] == 'black'&& arr[coordinate.y][coordinate.x+4] == 'black'){
			alert('black win');
			cancel();
		}
		/*向左判断*/
		else if(arr[coordinate.y][coordinate.x-1] == 'black'&&arr[coordinate.y][coordinate.x-2] == 'black'&&arr[coordinate.y][coordinate.x-3] == 'black'&& arr[coordinate.y][coordinate.x-4] == 'black'){
			alert('black win');
			cancel();
		}
		/*向下*/
		else if(arr[coordinate.y+1][coordinate.x] == 'black'&&arr[coordinate.y+2][coordinate.x] == 'black'&&arr[coordinate.y+3][coordinate.x] == 'black'&& arr[coordinate.y+4][coordinate.x] == 'black'){
			alert('black win');
			cancel();
		}
		/*向上*/
		else if(arr[coordinate.y-1][coordinate.x] == 'black'&&arr[coordinate.y-2][coordinate.x] == 'black'&&arr[coordinate.y-3][coordinate.x] == 'black'&& arr[coordinate.y-4][coordinate.x] == 'black'){
			alert('black win');
			cancel();
		}
		/*右上*/
		else if(arr[coordinate.y-1][coordinate.x+1] == 'black'&&arr[coordinate.y-2][coordinate.x+2] == 'black'&&arr[coordinate.y-3][coordinate.x+3] == 'black'&& arr[coordinate.y-4][coordinate.x+4] == 'black'){
			alert('black win');
			cancel();
		}
		/*右下*/
		else if(arr[coordinate.y+1][coordinate.x+1] == 'black'&&arr[coordinate.y+2][coordinate.x+2] == 'black'&&arr[coordinate.y+3][coordinate.x+3] == 'black'&& arr[coordinate.y+4][coordinate.x+4] == 'black'){
			alert('black win');
			cancel();
		}
		/*左上*/
		else if(arr[coordinate.y-1][coordinate.x-1] == 'black'&&arr[coordinate.y-2][coordinate.x-2] == 'black'&&arr[coordinate.y-3][coordinate.x-3] == 'black'&& arr[coordinate.y-4][coordinate.x-4] == 'black'){
			alert('black win');
			cancel();
		}
		/*左下*/
		else if(arr[coordinate.y+1][coordinate.x-1] == 'black'&&arr[coordinate.y+2][coordinate.x-2] == 'black'&&arr[coordinate.y+3][coordinate.x-3] == 'black'&& arr[coordinate.y+4][coordinate.x-4] == 'black'){
			alert('black win');
			cancel();
		}
	}
	else if(arr[coordinate.y][coordinate.x] == 'white'){
		/*向右判断*/
		if(arr[coordinate.y][coordinate.x+1] == 'white'&&arr[coordinate.y][coordinate.x+2] == 'white'&&arr[coordinate.y][coordinate.x+3] == 'white'&& arr[coordinate.y][coordinate.x+4] == 'white'){
			alert('white win');
			cancel();
		}
		/*向左判断*/
		else if(arr[coordinate.y][coordinate.x-1] == 'white'&&arr[coordinate.y][coordinate.x-2] == 'white'&&arr[coordinate.y][coordinate.x-3] == 'white'&& arr[coordinate.y][coordinate.x-4] == 'white'){
			alert('white win');
			cancel();
		}
		/*向下*/
		else if(arr[coordinate.y+1][coordinate.x] == 'white'&&arr[coordinate.y+2][coordinate.x] == 'white'&&arr[coordinate.y+3][coordinate.x] == 'white'&& arr[coordinate.y+4][coordinate.x] == 'white'){
			alert('white win');
			cancel();
		}
		/*向上*/
		else if(arr[coordinate.y-1][coordinate.x] == 'white'&&arr[coordinate.y-2][coordinate.x] == 'white'&&arr[coordinate.y-3][coordinate.x] == 'white'&& arr[coordinate.y-4][coordinate.x] == 'white'){
			alert('white win');
			cancel();
		}
		/*右上*/
		else if(arr[coordinate.y-1][coordinate.x+1] == 'white'&&arr[coordinate.y-2][coordinate.x+2] == 'white'&&arr[coordinate.y-3][coordinate.x+3] == 'white'&& arr[coordinate.y-4][coordinate.x+4] == 'white'){
			alert('white win');
			cancel();
		}
		/*右下*/
		else if(arr[coordinate.y+1][coordinate.x+1] == 'white'&&arr[coordinate.y+2][coordinate.x+2] == 'white'&&arr[coordinate.y+3][coordinate.x+3] == 'white'&& arr[coordinate.y+4][coordinate.x+4] == 'white'){
			alert('white win');
			cancel();
		}
		/*左上*/
		else if(arr[coordinate.y-1][coordinate.x-1] == 'white'&&arr[coordinate.y-2][coordinate.x-2] == 'white'&&arr[coordinate.y-3][coordinate.x-3] == 'white'&& arr[coordinate.y-4][coordinate.x-4] == 'white'){
			alert('white win');
			cancel();
		}
		/*左下*/
		else if(arr[coordinate.y+1][coordinate.x-1] == 'white'&&arr[coordinate.y+2][coordinate.x-2] == 'white'&&arr[coordinate.y+3][coordinate.x-3] == 'white'&& arr[coordinate.y+4][coordinate.x-4] == 'white'){
			alert('white win');
			cancel();
		}
	}
}

/*取消onclic绑定*/
function cancel(){
	for(var i=0;i<15;i++){       /*利用循环新建一个15*15的表格*/
		for(var j=0;j<15;j++){
			Obj[i*15+j].onclick = null;			/*调用chess函数来创建棋子*/		
		}
	}
}









