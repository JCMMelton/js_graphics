var PI = Math.PI;
var a = 1,
	b = 1,
	c = 1,
	d = 1,
	e = 1,
	f = 1,
	g = 1,
	x = 1,
	y = 1;

var screx = 0;
var screy = 0;

function f1(){
	b++;
	a = b%360;
	c = Math.sin((a/57)*PI);
	d = Math.cos((a/57)*PI);
	var can1 = document.getElementById("canvas1");
	var c1 = can1.getContext("2d");
	c1.canvas.width = window.innerWidth;
	c1.canvas.height = window.innerHeight;
	c1.lineWidth = "3";
	x = 600;
	y = 250;
	c1.moveTo(x,y);
	for(var i=1; i<50; i++){
		x += (i)*c;
		y += (i+100)/c;
		c1.lineTo(x,y);
		c1.lineTo(x+100,y);
		c1.lineTo(x/d,y*c);
		 // c4.lineTo(x-100*d,(y*c)+100);
	}
	c1.stroke();
}
// var i = 1;
function f2(){
	var can1 = document.getElementById("canvas1");
	var c1 = can1.getContext("2d");
	c1.canvas.width = window.innerWidth;
	c1.canvas.height = window.innerHeight;
	c1.lineWidth = "7";
	x = 600;
	y = 300;
	c1.moveTo(x,y);
	c1.beginPath();
	// i++;
	// limit(a,100,1);
	// limit(b,100,1);
	// limit(c,100,1);
	// limit(d,100,1);
	for(var i=1; i<5; i+=1){
		a += i%17;
		b += i%7;
		c += i;
		d += i%c;
		if(a>500){
			a=1;
		}
		if(b>300){
			b=1;
		}
	
		if(d>50){
			d=1;
		}
		
		e = i%2;
		
		c1.arc(x,y,(a*b)%753,b,d*PI,e);
		c1.arc(a+400/i,b+40+i,a,b*PI,b/PI);
	}
	c1.stroke();

} 
var ax=0;
var cx=0;
function f3(){
	var can1 = document.getElementById("canvas1");
	var c1 = can1.getContext("2d");
	c1.canvas.width = window.innerWidth;
	c1.canvas.height = window.innerHeight;
	c1.lineWidth = c;
	if(cx==0){
		c++;
	}else{
		c--;
	}
	if(c>30){
		cx=1;
	}
	if(c<2){
		cx=0;
	}
	//c1.moveTo(800,300);
	c1.beginPath();
	if(ax==1){
		a++;
	}else{
		a--;
	}
	if(a>100){
		ax=0;
	}
	if(a<-100){
		ax=1;
	}
	b++;
	d=(b%36)+1;
	// if(b>500){
	// 	b=1;
	// }
	for(var i=1;i<d;i++){
		c1.moveTo((d*i)+100,(d*i)+800);
		c1.quadraticCurveTo(i*d,i*a,800,100)
	}	
	c1.stroke();

}

function f4(){
	var can1 = document.getElementById("canvas1");
	var c1 = can1.getContext("2d");
	c1.canvas.width = window.innerWidth;
	c1.canvas.height = window.innerHeight;
	
	var rc = rotator();

	
	c1.beginPath();
	for(var i=1; i<100; i++){
		c1.moveTo(800,800);
		c1.lineTo((400%i)-rc[0],(400%i)-rc[1]);
		c1.lineTo((500%rc[0])+i*10,500%rc[1]);
		c1.lineTo(600,600);
		
	}
	c1.stroke();
	//c1.clear();

}


function f5(){
	var can1 = document.getElementById("canvas1");
	var c1 = can1.getContext("2d");
	c1.canvas.width = window.innerWidth;
	c1.canvas.height = window.innerHeight;
	var rc = rotator();
	c1.lineWidth = 3;
	e++;
	a = b = c = d = e;
	c1.beginPath();
	for(var i=0; i<100; i++){
		a += (i*2)%11;
		b += (i*3)%7;
		c += (i*7)%17;
		d += (i*4)%19;
		c1.bezierCurveTo(a*rc[0],b*rc[1],c*rc[1],d*rc[0],600,400);
	};
	c1.stroke();
};
var ttt = false;
function f6(){
	var can1 = document.getElementById("canvas1");
	var c1 = can1.getContext("2d");
	c1.canvas.width = window.innerWidth;
	c1.canvas.height = window.innerHeight;
	//e++;
	//a = b = c = d = 1;
	
	c1.beginPath();
	// for(var i=1; i<72; i+=2){
		e = Math.sin((b/57)*PI);
		f = Math.cos((d/57)*PI);
		//a += 10*e;
		b += 10*f;
		//c += i*e;
		d += 10*e;
		for(var i=100; i<200; i++){
			c1.bezierCurveTo(a,c,200,400,600-i,a);
		}
		// c1.bezierCurveTo(a,200,c,400,600,a);
		if(ttt){

			a+=10;
			c-=10;
			// point_b[0]-=2;
			// point_d[0]+=2;
			if(a>=800){
				ttt=false;
			}
		}else{
			a-=10;
			c+=10;
			// point_b[0]+=2;
			// point_d[0]-=2;
			if(a<=150){
				ttt=true;

			}
		}

	// };
	c1.stroke();
}
// = Math.sin((a/57)*PI);
// = Math.cos((a/57)*PI);

var dx = true;

function f7(){
	var can1 = document.getElementById("canvas1");
	var c1 = can1.getContext("2d");
	c1.canvas.width = window.innerWidth;
	c1.canvas.height = window.innerHeight;
	c1.lineWidth = 3;
	
	
	if(dx){
		a-=2;
		d++;
		if(d > 360){
			dx = false;
		}
	}else{
		a+=2;
		d--;
		if(d < 1){
			dx = true;
		}
	}
	
	console.log(d);
	e = Math.sin((a/57)*PI);
	f = Math.cos((d/57)*PI);
	var i = e*100;//(e*100)*(1/(f+1));
	var j = f*100;//(f*100)*(1/(e+1));
	c1.beginPath();
	//for(var i=0;i<d+10;i++){
		c1.moveTo(400-i,200+j);
		c1.lineTo(600-i,200+j);
		c1.lineTo(600-i,400+j);
		c1.lineTo(400-i,400+j);

		c1.lineTo(500+i,420-j);
		c1.lineTo(650+i,420-j);
		c1.lineTo(650+i,270-j);
		c1.lineTo(500+i,270-j);

		c1.lineTo(400-i,200+j);
		c1.lineTo(400-i,400+j);

		c1.moveTo(600-i,400+j);
		c1.lineTo(650+i,420-j);

		c1.moveTo(600-i,200+j);
		c1.lineTo(650+i,270-j);

		c1.moveTo(500+i,270-j);
		c1.lineTo(500+i,420-j);

	//}
	c1.stroke();
	//c1.lineTo(200,200);
	// c1.moveTo(200,200);
	// 	c1.lineTo(400,200);
	// 	c1.lineTo(400,400);
	// 	c1.lineTo(200,400);

	// 	c1.lineTo(300,420);
	// 	c1.lineTo(450,420);
	// 	c1.lineTo(450,270);
	// 	c1.lineTo(300,270);

	// 	c1.lineTo(200,200);
	// 	c1.lineTo(200,400);
	// 	c1.moveTo(400,400);
	// 	c1.lineTo(450,420);
	// 	c1.moveTo(400,200);
	// 	c1.lineTo(450,270);
	// 	c1.moveTo(300,270);
	// 	c1.lineTo(300,420);

	
}
var control = [0,0];

function f8(){
	
	var can1 = document.getElementById("canvas1");
	var c1 = can1.getContext("2d");
	c1.canvas.width = window.innerWidth;
	c1.canvas.height = window.innerHeight;
	c1.lineWidth = 3;

	//for(var i=1;i<10;i++){
		// a += i ;
		// b = i + a; 
		// c = i * c; 
		// d = i + d; 
		// console.log(a);//,b);
		// console.log(control[0]);
		if(control[0]==0 && control[1]==0){
			a++;
			b++;
		}else if(control[0]==1 && control[1]==0){
			a--;
			b++;
		}else if(control[0]==1 && control[1]==1){
			a--;
			b--;
		}else if(control[0]==0 && control[1]==1){
			a++;
			b--;
		}
		if(a > 100){
			control[0] = 1;
		}
		if(a < -100){
			control[0] = 0;
		}

		// if(control[1]==1){
		// 	b++;
			
		// }else{
		// 	b--;	
		// }
		if(b > 100){
			control[1] = 1;
		}
		if(b < -100){
			control[1] = 0;
		}

		c1.moveTo(200+a,200-b);
		c1.lineTo(400+a,200-b);
		c1.lineTo(400+a,400-b);
		c1.lineTo(200+a,400-b);

		c1.lineTo(300+a,420-b);
		c1.lineTo(450+a,420-b);
		c1.lineTo(450+a,270-b);
		c1.lineTo(300+a,270-b);

		c1.lineTo(200+a,200+b);
		c1.lineTo(200+a,400+b);
		c1.moveTo(400+a,400+b);
		c1.lineTo(450+a,420+b);
		c1.moveTo(400+a,200+b);
		c1.lineTo(450+a,270+b);
		c1.moveTo(300+a,270+b);
		c1.lineTo(300+a,420+b);
	//};	
		c1.stroke();

};

function f9(){
	var can1 = document.getElementById("canvas1");
	var c1 = can1.getContext("2d");
	c1.canvas.width = window.innerWidth;
	c1.canvas.height = window.innerHeight;
	
	c1.lineWidth = 3;
	c1.lineJoin="round";
	e = Math.sin((a/57)*PI)*71;
	f = Math.cos((b/57)*PI)*71;

	// if(control[0]==0){
	// 	a++;
	// }else{
	// 	a--;
	// }
	// if(control[1]==0){
	// 	b++;
	// }else{
	// 	b--;
	// }
	// if(a > 100){
	// 	control[0] = 1;
	// }
	// if(a < -100){
	// 	control[0] = 0;
	// }
	// if(b > 100){
	// 	control[1] = 1;
	// }
	// if(b < -100){
	// 	control[1] = 0;
	// }
	a++;
	b++;

	// for(var i = 3; i<7; i+=1){
	// 	for(var j=1;j<i;j+=1){
	// 	e += j;
	// 	f += j;
		c1.moveTo(400-e,400+f);

		c1.lineTo(400+e,400-f);
		c1.lineTo(600+e,400-f);
		c1.lineTo(600-e,400+f);
		c1.lineTo(400-e,400+f);

		c1.moveTo(600+f,400-e);

		c1.lineTo(600-f,400+e);
		c1.lineTo(800-f,400+e);
		c1.lineTo(800+f,400-e);
		c1.lineTo(600+f,400-e);

		c1.moveTo(400-e,100+f);
		c1.lineTo(500+e,100-f);
		c1.lineTo(500+e,200-f);
		c1.lineTo(400-e,200+f);
		c1.lineTo(400-e,100+f);

		c1.moveTo(1200-e,300+f);
		c1.lineTo(1100+e,400-f);
		c1.lineTo(1100-e,400+f);
		c1.moveTo(1100-e,400+f);
		c1.lineTo(1200+e,300-f);
		c1.lineTo(1200-e,300+f);
		c1.lineTo(1300-e,300+f);
		c1.lineTo(1200+e,400-f);
		c1.lineTo(1100-e,300+f);
		c1.lineTo(1000+e,300-f);
		c1.lineTo(1100+e,400-f);
	// 	}
	// 	// c1.clear();
	// }
	c1.stroke();
	// c1.lineTo(600-e,400+f);
	// c1.lineTo(400+e,200+f);
	// c1.lineTo(400-e,400+f);
	// //c1.moveTo(600-e,400+f);
	// c1.lineTo(600-e,200+f);
	
};

function f10(){
	var can1 = document.getElementById("canvas1");
	var c1 = can1.getContext("2d");
	c1.canvas.width = window.innerWidth;
	c1.canvas.height = window.innerHeight;
	c1.strokeStyle = '#';
	var ss='';
	for(var c=0;c<6;c++){
		ss += String(Math.round((Math.random())*9));
		}
		console.log(ss);
		c1.strokeStyle = '#'+ss;
	c1.lineWidth=7;
	c1.lineJoin = 'round';
	c1.beginPath();
	a %= 741;
	a++;
	for(var i=1; i<15; i+=1){
		a+=((i*i)/(15*i));
		// a+=i;
		//c1.moveTo(1000+i,1000+i);
		c1.moveTo(600+i,400-i);
		c1.arc(200+a,5+(i*11),200+a,100+a,a*PI,i*a);
		c1.lineTo(300-i,500+a);
		c1.arc((200*(i*i*i))/a,500+(i*5),700*(PI/a),10*i+a,i*PI,5/(i*a));
	};
	c1.stroke();
	
};

function f11(){
	var can1 = document.getElementById("canvas1");
	var c1 = can1.getContext("2d");
	c1.canvas.width = window.innerWidth;
	c1.canvas.height = window.innerHeight;
	e = Math.sin((a/57)*PI)*200;
	f = Math.sin(((a/57)*PI)+(4*PI)/3)*200;
	d = Math.sin(((a/57)*PI)+(2*PI)/3)*200;
	c1.lineWidth =3;
	// f = Math.cos((b/57)*PI)*100;
	c1.beginPath();
	a++;
	b++;
	// for(var i=1;i<7;i++){
	// 	e *= (2/i);

		c1.moveTo(0,400);
		c1.quadraticCurveTo(150,400+e,300,400);
		c1.quadraticCurveTo(450,400-e,600,400);

		c1.moveTo(600,400);
		c1.quadraticCurveTo(750,400+e,900,400);

		c1.moveTo(200,400);
		c1.quadraticCurveTo(350,400+f,500,400);
		c1.quadraticCurveTo(650,400-f,800,400);

		c1.moveTo(-100,400);
		c1.quadraticCurveTo(50,400-f,200,400);
		c1.moveTo(800,400);
		c1.quadraticCurveTo(950,400+f,1100,400);

		c1.moveTo(400,400);
		c1.quadraticCurveTo(550,400+d,700,400);
		c1.quadraticCurveTo(850,400-d,1000,400);

		c1.moveTo(100,400);
		c1.quadraticCurveTo(250,400-d,400,400);
	// // }
	c1.stroke();
};
function f12(){
	c1 = set_c(7);

	if(ax){
		a++;
		if(a > 1000){
			ax = false;
		}
	}else{
		a--;
		if(a < 1){
			ax = true;
		}
	}

	//a %= 771;
	//a++;
	for(var i=1; i<40; i++){
		c1.arc(700,400,i*10,(a/i)*PI,i*PI);
	}
	c1.stroke();
}
//
var con = true;
function f13(){
	// if(con = true){
	// 	ax = true;
	// 	con = false;
	// }
	c1 = set_c(8);
	e = Math.sin((a/57)*PI);
	if(ax){
		a++;
		if(a > 360){
			ax = false;
		}
	}else{
		a--;
		if(a < -360){
			ax = true;
		}
	}

	//a %= 771;
	//a++;
	for(var i=1; i<40; i++){
		c1.arc(700,400,i*10+e,(a/i)*PI,e*PI);
	}
	c1.stroke();
}
function f14(){
	if(control[0]==0 && control[1]==0){
			a++;
			b++;
		}else if(control[0]==1 && control[1]==0){
			a--;
			b++;
		}else if(control[0]==1 && control[1]==1){
			a--;
			b--;
		}else if(control[0]==0 && control[1]==1){
			a++;
			b--;
		}
		if(a > 200){
			control[0] = 1;
		}
		if(a < -200){
			control[0] = 0;
		}
		if(b > 2000){
			control[1] = 1;
		}
		if(b < 20){
			control[1] = 0;
		}


	c1 = set_c(2);
	
	for(var i=1; i<360; i++){
		e = Math.sin((i/57)*PI);
		f = Math.cos((i/57)*PI);
		c1.moveTo(600,400);
		var q = (600+a*f)+(i%17)+(i%a);//b+300*e;
		var w = (400+b*e)+(i%19)+(i%b);//300/i+a;
		var o = (600+b*f)-(i%19)-(i%a);//1600-i*e+a;
		var p = (400+a*e)-(i%17)-(i%b);//600*e+i+b;
		c1.bezierCurveTo(q,w,o,p,600,400);
	}
	c1.stroke();
}

function f15(){
	c1 = set_c(2);
	if(control[0]==0 && control[1]==0){
			a++;
			b++;
		}else if(control[0]==1 && control[1]==0){
			a--;
			b++;
		}else if(control[0]==1 && control[1]==1){
			a--;
			b--;
		}else if(control[0]==0 && control[1]==1){
			a++;
			b--;
		}
		if(a > 200){
			control[0] = 1;
		}
		if(a < -200){
			control[0] = 0;
		}
		if(b > 200){
			control[1] = 1;
		}
		if(b < -200){
			control[1] = 0;
		}
	x++;
	x %= 191;
	y++;
	y %= 117; 
	for(var i=1; i<360; i++){
		e = Math.sin((i/57)*PI);
		f = Math.cos((i/57)*PI);

		// = y+x*i*(e%x);
		// = x*i/f;
		c = x*i/e;
		d = x*i*f;
		g = i*PI;
		c1.lineTo(f*700-i/y,700+i*-1);
		c1.arcTo(a*17,b*e,c,d,g);

	}
	c1.stroke();
}

function f16(){
	c1 = set_c(2);
	// e = Math.sin((i/57)*PI);
	// f = Math.cos((i/57)*PI);
	if(control[0]==0 && control[1]==0){
			c++;
			d++;
		}else if(control[0]==1 && control[1]==0){
			c--;
			d++;
		}else if(control[0]==1 && control[1]==1){
			c--;
			d--;
		}else if(control[0]==0 && control[1]==1){
			c++;
			d--;
		}
		if(c > 300){
			control[0] = 1;
		}
		if(c < 2){
			control[0] = 0;
		}
		if(d > 100){
			control[1] = 1;
		}
		if(d < -100){
			control[1] = 0;
		}
	// x = 
	// y = 
	// b = Math.round(Math.random()*100);
	// b++;
	c1.moveTo(700,500);
	for(var i=1; i<Math.abs((c+(d/1.1))); i++){
		//for(var j=1; j<100; j++){
			// x += i;
			// y += j;
			if(i%17 == 0){
				a = 1;
				b = 1;
			}else if(i%5 == 0){
				a = -1;
				b = 1;
			}else if(i%7 == 0){
				a = -1;
				b = -1;
			}else if(i%c == 0){
				a = 1;
				b = -1;
			};
			e = Math.sin((c/57)*PI);
			f = Math.cos((d/57)*PI);
			g = Math.tan(((c+d)/57)*PI)+100;
			//c1.lineTo(700-(d*e),500+(c*f));

			c1.lineTo((700+(i*e*PI*a))+(i*a),(500+(i*f*PI*a))+(i/g));


			c1.lineTo((500+(i*f*PI*b))+((i/17)*i*b),(700+(i*e*PI*b))+((i/30)*i*a));

			c1.arcTo(400-(c*e),(b+400)-(i*f),700-(a*i*e),300-(b*i*e),Math.abs(i*PI*e));

		//}
	}
	c1.stroke();
}

function f17(){
	if(control[0]==0 && control[1]==0){
			x++;
			y++;
		}else if(control[0]==1 && control[1]==0){
			x--;
			y++;
		}else if(control[0]==1 && control[1]==1){
			x--;
			y--;
		}else if(control[0]==0 && control[1]==1){
			x++;
			y--;
		}
		if(x > 300){
			control[0] = 1;
		}
		if(x < 2){
			control[0] = 0;
		}
		if(y > 100){
			control[1] = 1;
		}
		if(y < -100){
			control[1] = 0;
		}
	c1 = set_c(3);
	c1.moveTo(500,300);
	for(var i=1;i<50;i++){
		a = Math.pow(i,1.1);
		b = Math.log(a*i);
		c += i/a;
		d += i*2;
		e = Math.sin((a/57)*PI);
		f = Math.sin((i/57)*PI);
		g = Math.tan((y/57)*PI);
		c1.arc(500,300,a+(c%7)+b*(c%9),f,(e*PI)*g);
		c1.bezierCurveTo((x*b)/(e*PI),y/(f*PI),(500-a)/b,300-x/(f*PI),500,300);
		//c1.lineTo(500+(b*i),600+(g*i));
	}
	c1.stroke();
}

function f18(){
	if(control[0]==0 && control[1]==0){
		x++;
		y++;
	}else if(control[0]==1 && control[1]==0){
		x--;
		y++;
	}else if(control[0]==1 && control[1]==1){
		x--;
		y--;
	}else if(control[0]==0 && control[1]==1){
		x++;
		y--;
	}
	if(x > 400){
		control[0] = 1;
	}
	if(x < -400){
		control[0] = 0;
	}
	if(y > 400){
		control[1] = 1;
	}
	if(y < -400){
		control[1] = 0;
	}
	c1 = set_c(2);
	c1.moveTo(600,400);
	for(var i=1;i<120;i++){
		e = Math.sin(((i)/57)*PI);
		f = Math.cos(((i)/57)*PI);
		//a %= 17;
		a = (300*((f*PI)+x)+(i%71))/(i+e*PI);
		//b %= 19;
		b = (200*((e*PI)+y)+(i%191))/(i+f*PI);
		//c %= 23;
		c = (300*((f*PI)-y)+(i%171))*(f*PI); 
		//d %= 31;
		d = (200*((e*PI)-x)+(i%119))*(e*PI);
		c1.bezierCurveTo(a,b,c,d,600,400);
	};
	c1.stroke();
};

function f19(){
	if(control[0]==0 && control[1]==0){
			x++;
			y++;
		}else if(control[0]==1 && control[1]==0){
			x--;
			y++;
		}else if(control[0]==1 && control[1]==1){
			x--;
			y--;
		}else if(control[0]==0 && control[1]==1){
			x++;
			y--;
		}
		if(x > 313){
			control[0] = 1;
		}
		if(x < 2){
			control[0] = 0;
		}
		if(y > 171){
			control[1] = 1;
		}
		if(y < 20){
			control[1] = 0;
		}
	c1 = set_c(2);
	c1.moveTo(600,400);
	for(var i=1;i<(360);i++){
		e = Math.sin(((i)/57)*PI);
		f = Math.cos(((i)/57)*PI);
		// a=600+i*((i*y)%(i-y))*e*PI;
		// b=400+i*((i*y)%(i-y))*f*PI;
		c=600+i*i*e*PI;
		d=400+i*i*f*PI;

		c1.lineTo(550+c%x,350+d%y);

	};
	c1.stroke();
};

	var an = 5;
	var bn = 25;
function f20(){
	c1 = set_c(2);
	// bn %= 171;
	// bn++;
	
	c1.moveTo(200,400);
	function eff(n){
		return ((2*n*n)-(n*n))*e;
	};
	for(var i=1;i<50;i++){
		e = Math.sin(((i)/57)*PI);
		x = ((bn-an)/6)*(eff(an)+(4*eff((a+bn)/2))+eff(bn+i));
		// console.log(x);
		// x = eff(i);
		c1.lineTo(200+10*i,200+x);
	};
	c1.stroke();
};

function f21(){
	
	c1 = set_c(2);
	// c1.moveTo(200,200);
	for(var i=1;i<360;i++){
		if(control[0]==0 && control[1]==0){
			x++;
			y++;
		}else if(control[0]==1 && control[1]==0){
			x--;
			y++;
		}else if(control[0]==1 && control[1]==1){
			x--;
			y--;
		}else if(control[0]==0 && control[1]==1){
			x++;
			y--;
		}
		if(x > 100){
			control[0] = 1;
		}
		if(x < -100){
			control[0] = 0;
		}
		if(y > 10){
			control[1] = 1;
		}
		if(y < -100){
			control[1] = 0;
		}
		// a = 200+x+i;
		// b = 200+y+i;
		e = Math.sin(((i)/57)*PI);
		f = Math.cos(((i)/57)*PI);
		a = 200*f;
		b = 200;
		c1.moveTo((a+x)+700,b+y);
		c1.lineTo((a*x+i)+900,b+y+i);
	};
	c1.stroke();
};

function f22(){
	c1 = set_c(2);

	// a += 2/10;
	// b += 2;
	for(var i=1; i<120;i++){
		if(control[0]==0 && control[1]==0){
			x++;
			y++;
		}else if(control[0]==1 && control[1]==0){
			x--;
			y++;
		}else if(control[0]==1 && control[1]==1){
			x--;
			y--;
		}else if(control[0]==0 && control[1]==1){
			x++;
			y--;
		}
		if(x > 1000){
			control[0] = 1;
		}
		if(x < 1){
			control[0] = 0;
		}
		if(y > 1000){
			control[1] = 1;
		}
		if(y < -1000){
			control[1] = 0;
		}
		// a%=771;
		// a++;
		e = Math.sin(((i)/57)*PI);
		f = Math.cos(((i)/57)*PI);

		c1.moveTo(300+100*e,300+100*f);
		// c1.lineTo(a,b*4*e);

		c1.lineTo(300+x*e,400+y*f);
	}
	for(var j=1; j<100; j++){
		c1.lineTo(j+x*e,j+y*f);
		c1.lineTo(j*e,j*f);
	}
	c1.stroke();
};

function f23(){
	c1 = set_c(4);
	moveTo(400,400);
	for(var j=1; j<30; j++){
		x = Math.tan(y++);
		e = Math.sin(((j)/57)*PI);
		f = Math.cos(((j)/57)*PI);
		// j+=10;
		a=(200+100*e)+((j+100+x)*e)*.25;
		b=(100+100*f)+((j+100+x)*f)*.26;
		c=(210+100*e)+((j+100+x)*e)*.27;
		d=(110+100*f)+((j+100+x)*f)*.28;
		c1.lineTo(a+200,b+200);
		c1.arc(a+200,b+200,c+200,d+200,e*PI)
		c1.lineTo(c+200,d+200);
	}

	c1.stroke();
}

function f24(){
	if(control[0]==0 && control[1]==0){
			a++;
			b++;
		}else if(control[0]==1 && control[1]==0){
			a--;
			b++;
		}else if(control[0]==1 && control[1]==1){
			a--;
			b--;
		}else if(control[0]==0 && control[1]==1){
			a++;
			b--;
		}
		if(a > 200){
			control[0] = 1;
		}
		if(a < -200){
			control[0] = 0;
		}
		if(b > 2000){
			control[1] = 1;
		}
		if(b < 20){
			control[1] = 0;
		};
	x = 400;	
	y = 400;
	c1 = set_c(2);
	// c%=300;
	// c++;
	for(var i=1; i<360; i++){
		e = Math.sin((i/57)*PI);
		f = Math.cos((i/57)*PI);
		c = Math.log(Math.pow(i,2)/2);
		c1.moveTo(x,y);
		var q = (x+a*f)+(i%17)+(i%a)*c;//b+300*e;
		var w = (y+b*e)+(i%19)+(i%b)*-c;//300/i+a;
		var o = (x+b*f)-(i%19)-(i%a);//1600-i*e+a;
		var p = (y+a*e)-(i%17)-(i%b);//600*e+i+b;
		c1.bezierCurveTo(q,w,o,p,x,y);
	};
	c1.stroke();
};

function f25(){
	
	c1 = set_c(2);
	for(var i=1; i<360; i++){
		e = Math.sin((i/57)*PI);
		f = Math.cos((i/57)*PI);
		b%=7+i;
		b++;
		d = Math.log(Math.pow(2,b));
		a = i*(3*i-1)/2;
		c1.lineTo(100+d,a*f);
		c1.lineTo(a*f,100+d*e);
	};
	c1.stroke();
};
function f26(){
	c1 = set_c(2);
	x+=1
	// y%=72
	// y++
	// y*=e+f
	for(var i=1;i<90;i++){
		e = Math.sin((i/57)*PI);
		f = Math.cos((i/57)*PI);
		a = (550+100*f) + i+x*(-2+(i%4))/(e+1);
		b = (300+100*e) + i+x*(-2+((i+2)%4))/(f+1);
		c = 500+Math.log(a*a*b);
		d = 300+Math.log(b*b*a);
		c1.lineTo(a,b);
		c1.lineTo(c,d);
		c1.lineTo(500+a-c,300+b-d);
	};
	c1.stroke();
};

function f27(){
	c1 = set_c(2);
	e = Math.sin((x++/57)*PI);
	f = Math.cos((x++/57)*PI);
	for(var i=1;i<10;i++){
		c1.moveTo(500,500);
		c1.lineTo(500+50*i*e,500+50*i*f);
		c1.lineTo(500-100*f,500-100*e);
		// c1.lineTo(500-100/f,500-100/e);
	}
	c1.stroke();
};

function f28(){
	c1 = set_c(2);
	x=100;
	y=100;
	a=400;
	b=400;
	c1.moveTo(x,y);
	for(var i=0; i<40;i++){
		var r = Math.random()*10
		if(r>5){
			x+=20;
		}else{
			y+=20;
		};
		c1.lineTo(x,y);
	};
	// for(var i=0;i<20;i++){
	// 	for(var j=0;j<20;j++){
	// 		a-=20;
	// 		c1.lineTo(x+a,y+b);

	// 	};
	// 	b-=20;

	// };
	c1.stroke();
};

function f29(){
	window.onmousemove = function(){
		screx = event.screenX;
		screy = event.screenY;
	};
	x = screx/3;
	y = screy/3;
	c1 = set_c(2);
	c1.moveTo(400,400);
	for(var i=10;i<100;i++){
		e = Math.sin((i/57)*PI);
		f = Math.cos((i/57)*PI);
		a = (x*e)%17;
		b = (y*f)%11;
		c = 500/(x*f);
		d = 500/(y*e);
		
		c1.arc(400+(3*b),400+(4*a),y,c,d);
		c1.arc(400-(2*a),400-(2*b),x,a,b);
	};

	c1.stroke();
};

function f30(){
	window.onmousemove = function(){
		screx = event.screenX;
		screy = event.screenY;
	};
	c1 = set_c(2);
	x = screx/3;
	y = screy/3;
	c1.moveTo(600,500);
	for(var i=1;i<200;i++){
		e = Math.sin((i/57)*PI);
		f = Math.cos((i/57)*PI);
		c1.lineTo(600+(x%i),500+(y%i));
		c1.arc(700,500,Math.abs(x-y),700,500);
	};
	c1.stroke();
};

function f31(){
	window.onmousemove = function(){
		screx = event.screenX;
		screy = event.screenY;
	};
	
	x = screx+120;
	y = screy+820;
	// x = 300;
	// y = 300;
	c1 = set_c(2);
	
	for(var i=1;i<10;i++){
		c1.arc(x,y,100,x+(200+i%7),y+200);
		// c1.moveTo(x+110,y);
		// c1.arc(x,y,120,x+200,y+(200+i%7));
		c1.moveTo(x+120,y);
		c1.arc(y,y,120,x+200,x+(200+i%7));
	}
	c1.stroke();
};

function f32(){
	window.onmousemove = function(){
		screx = event.screenX;
		screy = event.screenY;
	};
	x = screx+120;
	y = screy+820;
	c1 = set_c(2);
	c1.moveTo(x,y);
	for(var i=1;i<360;i+=3){
		e = Math.sin((i/57)*PI)+.5;
		f = Math.cos((i/57)*PI)+.5;
		a = x-(x%i)+(i*e);
		b = y-(y%i)+(i*f);
		c = x+(x%i)+(e*PI);
		d = y+(y%i)+(f*PI);
		c1.bezierCurveTo(a,b,c,d,x,y);
		c1.lineTo(a,b);
		c1.lineTo(c,d);
		// c1.bezierCurveTo(c,b,a,d,x+120,y+820);
	}
	c1.stroke();
};


function f33(){
	window.onmousemove = function(){
		screx = event.screenX;
		screy = event.screenY;
	};
	x = (screx+120)/11;
	y = (screy+820)/11;
	c1 = set_c(2);
	c1.translate(600,400);
	c1.moveTo(x,y);
	for(var i=1;i<100;i++){
		e = Math.sin((i/57)*PI);
		f = Math.cos((i/57)*PI);
		c1.lineTo((x-i),(y-i));
		c1.lineTo((y-i),(x-i));
		c1.rotate(((x-y)/71)*e);
		// Math.abs(x-y)
	}
	// c1.scale(1.5,1.5);
	c1.stroke();
}


function f34(){
	window.onmousemove = function(){
		screx = event.screenX;
		screy = event.screenY;
	};
	x=(window.innerWidth/1.1)-screx;
	y=(window.innerHeight/1.1)-screy;
	// console.log(x,y);
	c1 = set_c(2);
	b = (100/(screx));
	c = (100/(screy));
	a = 1;
	d = 1;
	// c1.transform(a,b,c,d,0,0);

	for(var i=1;i<100;i++){
		var lx = window.innerWidth/100;
		var ly = window.innerHeight;
		c1.moveTo(lx*i,0);
		// c1.lineTo(lx*i,ly);
		c1.quadraticCurveTo((lx*i - 50*(5/(x-(lx*i)) )),window.innerHeight/2,lx*i,ly);
	};
	
	for(var i=1;i<50;i++){
		var lx = window.innerWidth;
		var ly = window.innerHeight/50;
		c1.moveTo(0,ly*i);
		// c1.lineTo(lx,ly*i);
		// c1.bezierCurveTo(x,y,y,x,lx,ly*i);
		c1.quadraticCurveTo(window.innerWidth/2,(ly*i - 100*(1/((ly*i)-y))) ,lx,ly*i);
	};
	
	c1.stroke();
};

function f35(){
	window.onmousemove = function(){
		screx = event.screenX;
		screy = event.screenY;
	};
	sw = window.innerWidth;
	sh = window.innerHeight;
	c1 = set_c(2);
	a = (sw/2)-screx;
	b = (sh/2)-screy;
	
	// f = Math.acos((b/57)*PI);
	// b = (sh/2)/screy;
	// f = Math.cos((b/57)*PI)+.5;
	c1.lineTo(sw/2,sh/2);
	//c1.lineTo((sw/2+100*e),(sh/2)+100*f);
	for(var i=1;i<100;i++){
		e = Math.asin(((i)/57)*PI);
		f = Math.acos(((i)/57)*PI);
		c1.lineTo(screx+110-(10*i*e),screy+820-(10*i*f*PI));
	};
	console.log(screx,screy);
	// c1.rotate(e/7*PI);
	// console.log(e*180/PI);
	
	//c1.rotate(x++);
	c1.stroke();
};
y_mod = 0;
x_mod = 0;
function f36(){	
	sw = window.innerWidth;
	sh = window.innerHeight;
	c1 = set_c(2);
	window.onkeydown = function(k){
	switch(k.keyCode){
			case 38://up
				y_mod+=10;
				x_mod+=10;
				break;
			case 40://down
				y_mod-=10;
				x_mod-=10;
				break;
			case 37://left
				x_mod-=10;
				break;
			case 39://right
				x_mod+=10;
				break;
			default:

		};
	};
	c1.moveTo(0,0);
	c1.lineTo((sw/2)-(sw/10)+x_mod,sh/2-(sh/10)+y_mod);
	c1.lineTo((sw/2)+(sw/10)+x_mod,sh/2-(sh/10)+y_mod);

	c1.moveTo(sw,0);
	c1.lineTo((sw/2)+(sw/10)+x_mod,sh/2-(sh/10)+y_mod);

	c1.lineTo((sw/2)+(sw/10)+x_mod,sh/2+(sh/10)+y_mod);
	c1.moveTo(sw,sh);

	c1.lineTo((sw/2)+(sw/10)+x_mod,sh/2+(sh/10)+y_mod);
	c1.lineTo((sw/2)-(sw/10)+x_mod,sh/2+(sh/10)+y_mod);

	c1.moveTo(0,sh);
	c1.lineTo((sw/2)-(sw/10)+x_mod,sh/2+(sh/10)+y_mod);
	c1.lineTo((sw/2)-(sw/10)+x_mod,sh/2-(sh/10)+y_mod);

	c1.stroke();
};
// function mouse(event){
// 	screx = event.screenX;
// 	screy = event.screenY;
// };

function set_c(lw){
	var can1 = document.getElementById("canvas1");
	var ca = can1.getContext("2d");
	ca.canvas.width = window.innerWidth;
	ca.canvas.height = window.innerHeight;
	ca.lineWidth = lw;
	ca.beginPath();
	return ca;
};
// var can1 = document.getElementById("canvas1");
// var c1 = can1.getContext("2d");
// c1.canvas.width = window.innerWidth;
// c1.canvas.height = window.innerHeight;
// c1.lineWidth = 2;
// c1.beginPath();

// c1.stroke();



var rot=1;
rx = 0;
ry = 0;
var rotx = [0,0];
function rotator(){
	rot+=5;
	if(rot > 800){
		rot = -801;
	}
	if(rot < 800 && rot > 400){
		// rotx = [0,0];
		rx++;
		ry--;
	}
	if(rot > -800 && rot < -400){
		// rotx = [1,1];
		rx--;
		ry--;
	}
	if(rot > 0 && rot < 400){
		// rotx = [0,1];
		rx++;
		ry++;
	}
	if(rot > -400 && rot < 0){
		// rotx[1,0];
		rx--;
		ry++;
	}
	rotx = [rx,ry];
	return rotx;
}

function limit(n,lim,r){
	if(n>lim){
		n=r;
		console.log(n);
	}
	return n;
}