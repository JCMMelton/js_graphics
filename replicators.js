var unit = 25;
var picked_up = false;
var half_space = unit/2;
var far_edge = (unit*16)-half_space;
var game_board = [];
var turn = 1;
var controller = 'player1';
function all_cells(){
	return player1.cells.concat(player2.cells);
};
function draw_grid(can){
	for(var i=0;i<17;i++){
		can.moveTo(i*unit,0);
		can.lineTo(i*unit,16*unit);
		can.moveTo(0,i*unit);
		can.lineTo(16*unit,i*unit);
	};
};
function draw_box(box,can,color,dim){
	corns = box.corners();
	tcorn_x = corns[0][0];
	tcorn_y = corns[0][1];
	can.fillStyle = color;
	can.fillRect(tcorn_x,tcorn_y,dim,dim);
};
function disp_move(x,y,can,direction){
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
function within(box,mx,my){
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
function is_between(test,up,lw){
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
	this.spawn = function(x,y){
		this.cells.push(new Cell(x,y,this.ids++,this.name));
		return this;
	};
};
function Cell(x,y,id,owner){
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
Cell.prototype.grow = function(){
	if(this.owner == 'player1'){
		this.color = "#204080";
	}else{
		this.color = "#804020";
	};
	this.dim = unit*.8;
	this.grown = true;
};
Cell.prototype.annihilate = function(target_cell){
	if(this.owner == 'player1'){
		player2.cells.splice(player2.cells.indexOf(target_cell.owner),1);
		player1.cells.splice(player1.cells.indexOf(this),1);
	}else{
		player1.cells.splice(player1.cells.indexOf(target_cell.owner),1);
		player2.cells.splice(player2.cells.indexOf(this),1);
	};
};
Cell.prototype.move_anchor = function(){
	this.anchor.x = this.origin.x;
	this.anchor.y = this.origin.y;
	this.location.x = Math.round(this.origin.x/unit);
	this.location.y = Math.round(this.origin.y/unit);
};
Cell.prototype.lat_move = function(shift_x,shift_y){
	lx = this.location.x+shift_x;
	ly = this.location.y+shift_y;
	if(is_occ(game_board,lx,ly)){
		if(find_box(lx,ly).owner != this.owner){
			this.annihilate(find_box(lx,ly));
		}else{
			find_box(lx,ly).lat_move(shift_x,shift_y);
		};
	};
	this.origin.x += unit*shift_x;
	this.origin.y += unit*shift_y;
	this.move_anchor();
};
Cell.prototype.move = function(mx,my){
	frac = unit*.2;
	if(this.moves){
		if((is_between(mx,this.origin.x-(unit*.5)-frac,this.origin.x-(unit*1.5)+frac))&&(is_between(my,this.origin.y-(unit*.5)-frac,this.origin.y-(unit*1.5)+frac))){
			if(!is_occ(game_board,this.location.x-1,this.location.y-1)){
				this.origin.x -= unit;
				this.origin.y -= unit;
				this.moves = 0;
			}else if(find_box(this.location.x-1,this.location.y-1).owner != this.owner){
				this.annihilate(find_box(this.location.x-1,this.location.y-1));
			};
		}else if((is_between(mx,this.origin.x+(unit*1.5)-frac,this.origin.x+(unit*.5)+frac))&&(is_between(my,this.origin.y-(unit*.5)-frac,this.origin.y-(unit*1.5)+frac))){
			if(!is_occ(game_board,this.location.x+1,this.location.y-1)){
				this.origin.x += unit;
				this.origin.y -= unit;
				this.moves = 0;
			}else if(find_box(this.location.x+1,this.location.y-1).owner != this.owner){
				this.annihilate(find_box(this.location.x+1,this.location.y-1));
			};
		}else if((is_between(mx,this.origin.x-(unit*.5)-frac,this.origin.x-(unit*1.5)+frac))&&(is_between(my,this.origin.y+(unit*1.5)-frac,this.origin.y+(unit*.5)+frac))){
			if(!is_occ(game_board,this.location.x-1,this.location.y+1)){
				this.origin.x -= unit;
				this.origin.y += unit;
				this.moves = 0;
			}else if(find_box(this.location.x-1,this.location.y+1).owner != this.owner){
				this.annihilate(find_box(this.location.x-1,this.location.y+1));
			};
		}else if((is_between(mx,this.origin.x+(unit*1.5)-frac,this.origin.x+(unit*.5)+frac))&&(is_between(my,this.origin.y+(unit*1.5)-frac,this.origin.y+(unit*.5)+frac))){
			if(!is_occ(game_board,this.location.x+1,this.location.y+1)){
				this.origin.x += unit;
				this.origin.y += unit;
				this.moves = 0;
			}else if(find_box(this.location.x+1,this.location.y+1).owner != this.owner){
				this.annihilate(find_box(this.location.x+1,this.location.y+1));
			};
		}else if((is_between(mx,this.origin.x+(unit*1.5)-frac,this.origin.x+(unit*.5)+frac))&&(is_between(my,this.origin.y+(unit*.5)-frac,this.origin.y-(unit*.5)+frac))){
			if(is_occ(game_board,this.location.x+1,this.location.y)){
				this.lat_move(1,0);
				this.moves = 0;
			};
		}else if((is_between(mx,this.origin.x-(unit*.5)-frac,this.origin.x-(unit*1.5)+frac))&&(is_between(my,this.origin.y+(unit*.5)-frac,this.origin.y-(unit*.5)+frac))){
			if(is_occ(game_board,this.location.x-1,this.location.y)){
				this.lat_move(-1,0);
				this.moves = 0;
			};
		}else if((is_between(mx,this.origin.x+(unit*.5)-frac,this.origin.x-(unit*.5)+frac))&&(is_between(my,this.origin.y+(unit*1.5)-frac,this.origin.y+(unit*.5)+frac))){
			if(is_occ(game_board,this.location.x,this.location.y+1)){
				this.lat_move(0,1);
				this.moves = 0;
			};
		}else if((is_between(mx,this.origin.x+(unit*.5)-frac,this.origin.x-(unit*.5)+frac))&&(is_between(my,this.origin.y-(unit*.5)-frac,this.origin.y-(unit*1.5)+frac))){
			if(is_occ(game_board,this.location.x,this.location.y-1)){
				this.lat_move(0,-1);
				this.moves = 0;
			};
		};
	};
	this.move_anchor();
};
Cell.prototype.corners = function(){
	hdim = this.dim/2
	return [[this.origin.x-hdim,this.origin.y-hdim], [this.origin.x+hdim,this.origin.y-hdim], [this.origin.x+hdim,this.origin.y+hdim], [this.origin.x-hdim,this.origin.y+hdim]];
};
Cell.prototype.align = function(){
	var half_space = unit/2;
	var far_edge = (unit*16)-half_space;
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
Cell.prototype.display_moves = function(){
	if(!is_occ(game_board,this.location.x-1,this.location.y-1)){
		disp_move(this.anchor.x-1.5*unit,this.anchor.y-1.5*unit,c1,'diag');
	};
	if(!is_occ(game_board,this.location.x+1,this.location.y-1)){
		disp_move(this.anchor.x+.5*unit,this.anchor.y-1.5*unit,c1,'diag');
	};
	if(!is_occ(game_board,this.location.x+1,this.location.y+1)){
		disp_move(this.anchor.x+.5*unit,this.anchor.y+.5*unit,c1,'diag');
	};
	if(!is_occ(game_board,this.location.x-1,this.location.y+1)){
		disp_move(this.anchor.x-1.5*unit,this.anchor.y+.5*unit,c1,'diag');
	};
	if(is_occ(game_board,this.location.x+1,this.location.y)){
		disp_move((this.anchor.x+1),this.anchor.y,c1,'horiz');
	};
	if(is_occ(game_board,this.location.x-1,this.location.y)){
		disp_move((this.anchor.x-1)-unit*2,this.anchor.y,c1,'horiz');
	};
	if(is_occ(game_board,this.location.x,this.location.y+1)){
		disp_move((this.anchor.x)-unit*.5,(this.anchor.y+1)+unit*.5,c1,'lat');
	};
	if(is_occ(game_board,this.location.x,this.location.y-1)){
		disp_move((this.anchor.x)-unit*.5,(this.anchor.y-1)-unit*1.5,c1,'lat');
	};
	return this;
};
Cell.prototype.scan = function(){
	res = [false,false,false,false];
	lx = this.location.x;
	ly = this.location.y;
	if(is_occ(game_board,lx,ly+1)){
		res[0] = {'x':0,'y':1};
	};
	if(is_occ(game_board,lx+1,ly)){
		res[1] = {'x':1,'y':0};
	};
	if(is_occ(game_board,lx,ly-1)){
		res[2] = {'x':0,'y':-1};
	};
	if(is_occ(game_board,lx-1,ly)){
		res[3] = {'x':-1,'y':0};
	};
	return res;
};
Cell.prototype.state = function(){
	if(!this.moves || !this.vital){
		if(this.owner == 'player1'){
			this.color = "#402080";
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

player2 = new player('player2');
player2.spawn(15,15);
player2.spawn(15,16);
player2.spawn(16,15);
player2.spawn(16,16);
player1 = new player('player1');
player1.spawn(2,2);
player1.spawn(1,2);
player1.spawn(2,1);
player1.spawn(1,1);
for(box in player1.cells){
	player1.cells[box].grow();
	player2.cells[box].grow();
};
function drag(){
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
	document.onmousedown = function(){
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
	document.onmouseup = function(){
		picked_up = false;
	};
	for(bo in existing){
		existing[bo].align();
		draw_box(existing[bo],c1,existing[bo].color,existing[bo].dim);
	};
	if(picked_up && target_box.moves){
		target_box.display_moves();
	};
	c1.stroke();
};
function set_c(id,lw){
	var can1 = document.getElementById(id);
	var ca = can1.getContext("2d");
	ca.canvas.width = unit*16;
	ca.canvas.height = unit*16;
	ca.lineWidth = lw;
	ca.beginPath();
	return ca;
};
function end_turn(){
	generate();
	turn++;
	if(turn%2==0){
		for(c in player1.cells){
			player2.cells[c].moves = 1;
			player2.cells[c].vital = 1;
			player1.cells[c].age++;
			if(player1.cells[c].age>3 && !player1.cells[c].grown){
				player1.cells[c].grow();
			};
		};
		controller = 'player2';
	}else{
		for(c in player2.cells){
			player1.cells[c].moves = 1;
			player1.cells[c].vital = 1;
			player2.cells[c].age++;
			if(player2.cells[c].age>3 && !player2.cells[c].grown){
				player2.cells[c].grow();
			};
		};
		controller = 'player1';
	};
	document.getElementById("disp_controller").innerHTML = controller;
};
function generate(){
	cells = all_cells();
	for(b in cells){
		loc_x = cells[b].location.x;
		loc_y = cells[b].location.y;
		if(cells[b].grown && cells[b].vital){
			if(!is_occ(game_board,loc_x+1,loc_y) && is_occ(game_board,loc_x+2,loc_y)){
				if(is_occ(game_board,loc_x+1,loc_y+1) || is_occ(game_board,loc_x+1,loc_y-1)){
				// if((is_occ(game_board,loc_x+1,loc_y+1) && (is_occ(game_board,loc_x+1,loc_y+1)!=null))||(is_occ(game_board,loc_x+1,loc_y-1 && (is_occ(game_board,loc_x+1,loc_y+1)!=null)))){
					if(find_box(loc_x+2,loc_y).grown && (find_box(loc_x+1,loc_y+1).grown || find_box(loc_x+1,loc_y-1).grown)){
						if(cells[b].owner == 'player1'){
							player1.spawn(loc_x+1,loc_y);
						}else if(cells[b].owner == 'player2'){
							player2.spawn(loc_x+1,loc_y);
						};
						cells[b].vital = 0;
						break;
					};
				};
			};
			if(!is_occ(game_board,loc_x-1,loc_y) && is_occ(game_board,loc_x-2,loc_y)){
				if(is_occ(game_board,loc_x-1,loc_y+1) || is_occ(game_board,loc_x-1,loc_y-1)){
				// if((is_occ(game_board,loc_x-1,loc_y+1) && (is_occ(game_board,loc_x-1,loc_y+1)!=null))||(is_occ(game_board,loc_x-1,loc_y-1 && (is_occ(game_board,loc_x-1,loc_y-1)!=null)))){
					if(find_box(loc_x-2,loc_y).grown && (find_box(loc_x-1,loc_y+1).grown || find_box(loc_x-1,loc_y-1).grown)){
						if(cells[b].owner == 'player1'){
							player1.spawn(loc_x-1,loc_y);
						}else if(cells[b].owner == 'player2'){
							player2.spawn(loc_x-1,loc_y);
						};
						cells[b].vital = 0;
						break;
					};
				};
			};
			if(!is_occ(game_board,loc_x,loc_y+1) && is_occ(game_board,loc_x,loc_y+2)){
				if(is_occ(game_board,loc_x+1,loc_y+1) || is_occ(game_board,loc_x-1,loc_y+1)){
				// if((is_occ(game_board,loc_x+1,loc_y+1) && (is_occ(game_board,loc_x-1,loc_y+1)!=null))||(is_occ(game_board,loc_x-1,loc_y+1 && (is_occ(game_board,loc_x-1,loc_y+1)!=null)))){
					if(find_box(loc_x,loc_y+2).grown && (find_box(loc_x-1,loc_y+1).grown || find_box(loc_x+1,loc_y+1).grown)){
						if(cells[b].owner == 'player1'){
							player1.spawn(loc_x,loc_y+1);
						}else if(cells[b].owner == 'player2'){
							player2.spawn(loc_x,loc_y+1);
						};
						cells[b].vital = 0;
						break;
					};
				};
			};
			if(!is_occ(game_board,loc_x,loc_y-1) && is_occ(game_board,loc_x,loc_y-2)){
				if(is_occ(game_board,loc_x+1,loc_y-1) || is_occ(game_board,loc_x-1,loc_y-1)){
				// if((is_occ(game_board,loc_x+1,loc_y-1) && (is_occ(game_board,loc_x+1,loc_y-1)!=null))||(is_occ(game_board,loc_x-1,loc_y-1 && (is_occ(game_board,loc_x-1,loc_y-1)!=null)))){
					if(find_box(loc_x,loc_y-2).grown && (find_box(loc_x+1,loc_y-1).grown || find_box(loc_x-1,loc_y-1).grown)){
						if(cells[b].owner == 'player1'){
							player1.spawn(loc_x,loc_y-1);
						}else if(cells[b].owner == 'player2'){
							player2.spawn(loc_x,loc_y-1);
						};
						cells[b].vital = 0;
						break;
					};
				};
			};
		};//end of first condition
	};//end of for loop
};	
function board(cells){
	function mk_board(){
		return {
				'1':{'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'10':0,'11':0,'12':0,'13':0,'14':0,'15':0,'16':0},
				'2':{'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'10':0,'11':0,'12':0,'13':0,'14':0,'15':0,'16':0},
				'3':{'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'10':0,'11':0,'12':0,'13':0,'14':0,'15':0,'16':0},
				'4':{'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'10':0,'11':0,'12':0,'13':0,'14':0,'15':0,'16':0},
				'5':{'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'10':0,'11':0,'12':0,'13':0,'14':0,'15':0,'16':0},
				'6':{'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'10':0,'11':0,'12':0,'13':0,'14':0,'15':0,'16':0},
				'7':{'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'10':0,'11':0,'12':0,'13':0,'14':0,'15':0,'16':0},
				'8':{'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'10':0,'11':0,'12':0,'13':0,'14':0,'15':0,'16':0},
				'9':{'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'10':0,'11':0,'12':0,'13':0,'14':0,'15':0,'16':0},
				'10':{'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'10':0,'11':0,'12':0,'13':0,'14':0,'15':0,'16':0},
				'11':{'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'10':0,'11':0,'12':0,'13':0,'14':0,'15':0,'16':0},
				'12':{'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'10':0,'11':0,'12':0,'13':0,'14':0,'15':0,'16':0},
				'13':{'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'10':0,'11':0,'12':0,'13':0,'14':0,'15':0,'16':0},
				'14':{'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'10':0,'11':0,'12':0,'13':0,'14':0,'15':0,'16':0},
				'15':{'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'10':0,'11':0,'12':0,'13':0,'14':0,'15':0,'16':0},
				'16':{'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'10':0,'11':0,'12':0,'13':0,'14':0,'15':0,'16':0},
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
function is_occ(tb,xx,yy){
	if(xx<1||xx>16||yy<1||yy>16){
		return null
	}else if(tb[xx][yy]){
		return true;
	}else{
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




