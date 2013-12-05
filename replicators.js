var unit = Math.round(window.innerHeight*0.05);
var picked_up = false;
var half_space = unit/2;
var frac = unit*.2;
var	pf = unit*.5;
var	of = unit*1.5;
var tu = unit*2;
var far_edge = (unit*16)-half_space;
var game_board = [];
var turn = 1;
var controller = 'player1';
var ini = false;
function all_cells(){ // returns an array with the cells for both players 
	return player1.cells.concat(player2.cells);
};
function draw_grid(can){ // renders the game grid
	for(var i=0;i<17;i++){
		can.moveTo(i*unit,0);
		can.lineTo(i*unit,16*unit);
		can.moveTo(0,i*unit);
		can.lineTo(16*unit,i*unit);
	};
};
function draw_box(box,can,color,dim){ // renders a rectangle based on passed parameters
	corns = box.corners();
	tcorn_x = corns[0][0];
	tcorn_y = corns[0][1];
	can.fillStyle = color;
	can.fillRect(tcorn_x,tcorn_y,dim,dim);
};
function disp_move(x,y,can,direction){ // displays orthogonal moves for the player
	if(direction == 'diag'){
		can.fillStyle = "#808080";
		can.fillRect(x+unit*.05,y+unit*.05,unit*.9,unit*.9);		
	}else if(direction == 'horiz'){
		can.fillStyle = "rgba(255,100,100,0.3)";
		can.fillRect(x+unit*.25,y-unit*.25,unit*1.5,unit*.5);
	}else{
		can.fillStyle = "rgba(255,100,100,0.3)";
		can.fillRect(x+unit*.25,y-unit*.25,unit*.5,unit*1.5);
	};
};
function within(box,mx,my){ // checks if the mouse is within a specific cell
	boks = box.corners();
	m_left = boks[0][0];
	m_right = boks[1][0];
	m_top = boks[1][1];
	m_bottom = boks[2][1];
	if(mx>m_left && mx<m_right && my<m_bottom && my>m_top){
		return box;
	}else{
		return false;
	};
};
function is_between(test,up,lw){ // checks if a number is within a given range
	low = test>lw;
	hi = test<up;
	if(low&&hi){
		return true;
	}else{
		return false;
	};
};
function player(name){
	this.name = name;
	this.cells = [];
	this.ids = 0;
	this.spawn = function(x,y){ // creates a new cell for a player object and stores is in the cells array
		this.cells.push(new Cell(x,y,this.ids++,this.name));
		return this;
	};
};
function Cell(x,y,id,owner){ // 
	this.id = id;
	this.dim = unit*.4;
	this.location = {'x':x,'y':y};
	this.origin = {'x':(x-1)*unit+unit/2,'y':(y-1)*unit+unit/2};
	this.anchor = {'x':(x-1)*unit+unit/2,'y':(y-1)*unit+unit/2};
	this.grown = false;
	this.age = 0;
	this.owner = owner;
	this.color = "#409090";
	this.moves = 1;
	this.vital = 1;
};
Cell.prototype.grow = function(){ // updates the status of a cell to grown allowing it to move ect.
	if(this.owner == 'player1'){
		this.color = "#204080";
	}else{
		this.color = "#804020";
	};
	this.dim = unit*.8;
	this.grown = true;
};
Cell.prototype.annihilate = function(target_cell){ // destroys two cells 
	if(this.owner == 'player1'){
		player2.cells.splice(player2.cells.indexOf(target_cell),1);
		player1.cells.splice(player1.cells.indexOf(this),1);
	}else{
		player1.cells.splice(player1.cells.indexOf(target_cell),1);
		player2.cells.splice(player2.cells.indexOf(this),1);
	};
};
Cell.prototype.move_anchor = function(){ // updates the positional data for the cell
	this.anchor = this.origin;
	this.location.x = Math.round(this.origin.x/unit);
	this.location.y = Math.round(this.origin.y/unit);
};
Cell.prototype.lat_move = function(shift_x,shift_y){ // performs a lateral shift on all adjacent cells
	lx = this.location.x+shift_x;
	ly = this.location.y+shift_y;
	if(is_occ(game_board,lx,ly)){
		if(find_box(lx,ly).owner != this.owner){
			this.annihilate(find_box(lx,ly));
		}else if(find_box(lx,ly).grown){
			find_box(lx,ly).lat_move(shift_x,shift_y);
		};
	};
	this.origin.x += unit*shift_x;
	this.origin.y += unit*shift_y;
	this.move_anchor();
};
Cell.prototype.move = function(mx,my){ // checks if player is attempting a legal move and if so performs that move
	this.clear = function(){
		this.moves = 0;
		this.vital = 0;
	};
	var co = [ // numerical data for checking move conditions
			-1*pf-frac, -1*pf+frac, pf+frac, pf-frac,
			-1*of-frac, -1*of+frac, of+frac, of-frac
			];
	var diag = { // data for all diagonal move conditions
				0:{1:co[0], 2:co[5], 3:co[0], 4:co[5], 5:-1, 6:-1},
				1:{1:co[7], 2:co[2], 3:co[0], 4:co[5], 5:1,  6:-1},
				2:{1:co[0], 2:co[5], 3:co[7], 4:co[2], 5:-1, 6:1 },
				3:{1:co[7], 2:co[2], 3:co[7], 4:co[2], 5:1,  6:1 }
				};
	var orth = { // data for all orthogonal move conditions
				0:{1:co[7], 2:co[2], 3:co[3], 4:co[1], 5:1,  6:0 },
				1:{1:co[0], 2:co[5], 3:co[3], 4:co[1], 5:-1, 6:0 },
				2:{1:co[3], 2:co[5], 3:co[7], 4:co[2], 5:0,  6:1 },
				3:{1:co[3], 2:co[1], 3:co[0], 4:co[5], 5:0,  6:-1}
				};
	for(d in diag){ // runs logic for checking all move conditions, compares mouse position with grid spaces adjacent to the cell
		if(this.moves && (is_between(mx,this.origin.x+diag[d][1],this.origin.x+diag[d][2]))&&(is_between(my,this.origin.y+diag[d][3],this.origin.y+diag[d][4]))){
			if(!is_occ(game_board,this.location.x+diag[d][5],this.location.y+diag[d][6])){
				this.origin.x += unit*diag[d][5];
				this.origin.y += unit*diag[d][6];
				this.clear();
			}else if(find_box(this.location.x+diag[d][5],this.location.y+diag[d][6]).owner != this.owner){
				this.annihilate(find_box(this.location.x+diag[d][5],this.location.y+diag[d][6]));
				this.clear();
			};	
		};	
		if(this.moves && (is_between(mx,this.origin.x+orth[d][1],this.origin.x+orth[d][2]))&&(is_between(my,this.origin.y+orth[d][3],this.origin.y+orth[d][4]))){	
			if(is_occ(game_board,this.location.x+orth[d][5],this.location.y+orth[d][6])&& find_box(this.location.x+orth[d][5],this.location.y+orth[d][6]).grown){
				this.lat_move(1*orth[d][5],1*orth[d][6]);
				this.clear();
			};
		};
	};
	this.move_anchor();
};
Cell.prototype.corners = function(){ // returns the corners of a cell based on its origin, used in the draw function
	hdim = this.dim/2
	return [[this.origin.x-hdim,this.origin.y-hdim], [this.origin.x+hdim,this.origin.y-hdim], [this.origin.x+hdim,this.origin.y+hdim], [this.origin.x-hdim,this.origin.y+hdim]];
};
Cell.prototype.align = function(){ // keeps the cell centered in grid spaces
	var newx = (Math.round((this.origin.x)/half_space))*half_space;
	if(newx%unit==0){
		newx+=half_space;
	};
	if(newx<=half_space){
		newx = half_space;
	}else if(newx>=far_edge){
		newx = far_edge;
	};
	var newy = (Math.round((this.origin.y)/half_space))*half_space;
	if(newy%unit==0){
		newy+=half_space;
	};
	if(newy<=half_space){
		newy = half_space;
	}else if(newy>=far_edge){
		newy = far_edge;
	};
	this.state();
	this.origin.x = newx;
	this.origin.y = newy;
};
Cell.prototype.display_moves = function(){ // shows the player what moves the currently selected cell can legally make
	diag = { // numerical data for legal diagonal moves to display
			0:{1:-of, 2:-of, 3:-1, 4:-1},
			1:{1:pf,  2:-of, 3:1,  4:-1},
			2:{1:pf,  2:pf,  3:1,  4:1 },
			3:{1:-of, 2:pf,  3:-1, 4:1 }
			};
	orth = { // numerical data for legal orthogonal moves to display
			0:{1:1,  2:0,  3: 0,   4: 0,   5:'horiz'},
			1:{1:-1, 2:0,  3: -tu, 4: 0,   5:'horiz'},
			2:{1:0,  2:1,  3: -pf, 4: pf,  5:'lat'  },
			3:{1:0,  2:-1, 3: -pf, 4: -of, 5:'lat'  }
			};
	for(d in diag){ // runs logic for checking for legal moves to display
		if(!is_occ(game_board,this.location.x+diag[d][3],this.location.y+diag[d][4])){
			disp_move(this.anchor.x+diag[d][1],this.anchor.y+diag[d][2],c1,'diag');
		};
		if(is_occ(game_board,this.location.x+(1*orth[d][1]),this.location.y+(1*orth[d][2]))){
			disp_move((this.anchor.x+(1*orth[d][1]))+(1*orth[d][3]),(this.anchor.y+(1*orth[d][2]))+(1*orth[d][4]),c1,orth[d][5]);
		};
	};
	return this;
};
Cell.prototype.state = function(){ // keeps track of the age of the cell and sets the appropriate color
	if(this.age<3){
		if(this.age==0){
			if(this.owner == 'player1'){
				this.color = "#8060c0";
			}else{
				this.color = "#7FA708";
			};
		}else if(this.age==1){
			if(this.owner == 'player1'){
				this.color = "#7050a0";
			}else{
				this.color = "#c07030";
			};
		}else{
			if(this.owner == 'player1'){
				this.color = "#402080";
			}else{
				this.color = "#A76D08";
			};
		};
	}else if(!this.moves || !this.vital){
		if(this.owner == 'player1'){
			this.color = "#208062";
		}else{
			this.color = "#802040";
		};
	}else{
		if(this.owner == 'player1'){
			this.color = "#204080";
		}else{
			this.color = "#804020";
		};
	};
};
function init(){ // sets initial gamestate 
	var p = [0,0,1,1];
	var q = [0,1,0,1];
	player2 = new player('player2');
	player1 = new player('player1');
	for(var i=0;i<4;i++){
		player2.spawn(15+p[i],15+q[i]);
		player1.spawn(1+p[i],1+q[i]);
	};
	for(box in player1.cells){
		player1.cells[box].age = 3;
		player2.cells[box].age = 3;
		player1.cells[box].grow();
		player2.cells[box].grow();
	};
};
function game(){ // main loop running game logic
	if(!ini){ // runs init function once
		init();
		ini = true;
	};
	c1 = set_c("canvas1",2);
	draw_grid(c1);
	existing = all_cells();
	game_board = board(existing);
	window.onmousemove = function(){
		mx = event.pageX-7;
		my = event.pageY-7;
		if(picked_up){
			if(mx<=half_space){
				mx = half_space;
			}else if(mx>=far_edge){
				mx = far_edge;
			};
			if(my<=half_space){
				my = half_space;
			}else if(my>=far_edge){
				my = far_edge;
			};
			if(controller == target_box.owner){
				target_box.display_moves().move(mx,my);
			};
		};
	};
	document.onmousedown = function(){ // checks if the user has clicked on a cell
		for(b in existing){
			target_box = within(existing[b],mx,my);
			if(target_box && controller == target_box.owner){
				if(target_box.grown){	
					picked_up = true;
				};
				break;
			};
		};	
	};
	document.onmouseup = function(){ // releases the cells targeted by the user
		picked_up = false;
	};
	for(bo in existing){ // corrects alignment for all cells and draws them to the canvas
		existing[bo].align();
		draw_box(existing[bo],c1,existing[bo].color,existing[bo].dim);
	};
	if(picked_up && target_box.moves){ // runs move display logic for the selected cell
		target_box.display_moves();
	};
	c1.stroke();
};
function set_c(id,lw){ // preps the canvas
	var can1 = document.getElementById(id);
	var ca = can1.getContext("2d");
	ca.canvas.width = unit*16;
	ca.canvas.height = unit*16;
	ca.lineWidth = lw;
	ca.beginPath();
	return ca;
};
function end_turn(){ // advances the gamestate by one turn
	generate();
	turn++;
	if(turn%2==0){
		for(c in player1.cells){
			player1.cells[c].age++;
			if(player1.cells[c].age>3 && !player1.cells[c].grown){
				player1.cells[c].grow();
			};
		};
		for(c in player2.cells){
			player2.cells[c].moves = 1;
			player2.cells[c].vital = 1;
		};
		controller = 'player2';
	}else{
		for(c in player2.cells){
			player2.cells[c].age++;
			if(player2.cells[c].age>3 && !player2.cells[c].grown){
				player2.cells[c].grow();
			};
			for(c in player1.cells){
				player1.cells[c].moves = 1;
				player1.cells[c].vital = 1;
			};
		};
		controller = 'player1';
	};
	bage();
	document.getElementById("disp_turn").innerHTML = Math.round(turn/2);
	document.getElementById("disp_controller").innerHTML = controller;
};

function generate(){ // locate grid spaces that can generate new cells and create new cells
	cells = all_cells();
	var n = {
			0:{1:1,  2:0,  3:1,  4:1,  5:1,  6:-1 },
         	1:{1:-1, 2:0,  3:-1, 4:1,  5:-1, 6:-1 },
         	2:{1:0,  2:1,  3:-1, 4:1,  5:1,  6:1  },
         	3:{1:0,  2:-1, 3:1,  4:-1, 5:-1, 6:-1 }
			};
	for(b in cells){
		loc_x = cells[b].location.x;
		loc_y = cells[b].location.y;
		if(cells[b].grown && cells[b].vital){
			for(i in n){
				if(!is_occ(game_board,loc_x+(1*n[i][1]),loc_y+(1*n[i][2])) && is_occ(game_board,loc_x+(2*n[i][1]),loc_y+(2*n[i][2])) && find_box(loc_x+(2*n[i][1]),loc_y+(2*n[i][2])).owner == cells[b].owner){
					if(is_occ(game_board,loc_x+n[i][3],loc_y+n[i][4]) || is_occ(game_board,loc_x+n[i][5],loc_y+n[i][6])){
						var pos1 = find_box(loc_x+n[i][3],loc_y+n[i][4]);
						var pos2 = find_box(loc_x+n[i][5],loc_y+n[i][6]);
						if(find_box(loc_x+(2*n[i][1]),loc_y+(2*n[i][2])).grown && ((pos1.grown && pos1.owner == cells[b].owner) || (pos2.grown && pos2.owner == cells[b].owner))){
							if(cells[b].owner == 'player1'){
								player1.spawn(loc_x+(1*n[i][1]),loc_y+(1*n[i][2]));
							}else if(cells[b].owner == 'player2'){
								player2.spawn(loc_x+(1*n[i][1]),loc_y+(1*n[i][2]));
							};
							cells[b].vital = 0;
						};
					};
				};
			};
		};//end of first condition
	};//end of for loop
};	
function board(cells){ // tracks the location of all the cells on the board
	function mk_board(){ // creates a empty board
		return {
				1:{'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'10':0,'11':0,'12':0,'13':0,'14':0,'15':0,'16':0},
				2:{'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'10':0,'11':0,'12':0,'13':0,'14':0,'15':0,'16':0},
				3:{'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'10':0,'11':0,'12':0,'13':0,'14':0,'15':0,'16':0},
				4:{'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'10':0,'11':0,'12':0,'13':0,'14':0,'15':0,'16':0},
				5:{'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'10':0,'11':0,'12':0,'13':0,'14':0,'15':0,'16':0},
				6:{'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'10':0,'11':0,'12':0,'13':0,'14':0,'15':0,'16':0},
				7:{'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'10':0,'11':0,'12':0,'13':0,'14':0,'15':0,'16':0},
				8:{'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'10':0,'11':0,'12':0,'13':0,'14':0,'15':0,'16':0},
				9:{'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'10':0,'11':0,'12':0,'13':0,'14':0,'15':0,'16':0},
				10:{'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'10':0,'11':0,'12':0,'13':0,'14':0,'15':0,'16':0},
				11:{'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'10':0,'11':0,'12':0,'13':0,'14':0,'15':0,'16':0},
				12:{'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'10':0,'11':0,'12':0,'13':0,'14':0,'15':0,'16':0},
				13:{'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'10':0,'11':0,'12':0,'13':0,'14':0,'15':0,'16':0},
				14:{'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'10':0,'11':0,'12':0,'13':0,'14':0,'15':0,'16':0},
				15:{'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'10':0,'11':0,'12':0,'13':0,'14':0,'15':0,'16':0},
				16:{'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'10':0,'11':0,'12':0,'13':0,'14':0,'15':0,'16':0},
			};
	};
	fboard = mk_board();
	for(bo in cells){
		var x_pos = cells[bo].location.x;
		var y_pos = cells[bo].location.y;
		fob = fboard[x_pos];
		fob[y_pos]=1;
	};
	return fboard;
};
function is_occ(tb,xx,yy){ // determines if a specific grid space is occupied or is off the grid
	if(xx<1||xx>16||yy<1||yy>16){ // return null if space if off the grid
		console.log(xx,yy);
		return null;
	}else if(tb[xx][yy]){ // return true if space is occupied
		return true;
	}else{ // return false otherwise
		return false;
	};
};
function find_box(x_co,y_co){
	cells = all_cells();
	for(b in cells){
		l = cells[b];
		var lx_pos = l.location.x;
		var ly_pos = l.location.y;
		if(lx_pos==x_co && ly_pos==y_co){
			return l;
		};
	};
	return false; 
};
function bage(){ // looks for duplicate cells in a single space and elminates them
	pl1 = player1.cells;
	for(p1 in pl1){
		for(pp1 in pl1){
			if(pl1[p1].location.x == pl1[pp1].location.x && pl1[p1].location.y == pl1[pp1].location.y && pl1[p1].id != pl1[pp1].id){
				if(p1>pp1){
					player1.cells.splice(p1,1);
				}else{
					player1.cells.splice(pp1,1);
				};
			};	
		};
	};
	pl2 = player2.cells;
	for(p1 in pl2){
		for(pp1 in pl2){
			if(pl2[p1].location.x == pl2[pp1].location.x && pl2[p1].location.y == pl2[pp1].location.y && pl2[p1].id != pl2[pp1].id){
				if(p1>pp1){
					player2.cells.splice(p1,1);
				}else{
					player2.cells.splice(pp1,1);
				};
			};	
		};
	};
};



