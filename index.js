const width = 500;
const height = 300;

const lineEnd1 = { x: 100, y: 150 };
const lineEnd2 = { x: 400, y: 150 };
const anchor1 = { x: 10, y: 10, held: false };
const anchor2 = { x: 490, y: 10, held: false };

function setup() {
	createCanvas(width, height);
	background(50);
}

function draw() {
	if (anchor1.held) {
		anchor1.x = mouseX;
		anchor1.y = mouseY;
	} else if (anchor2.held) {
		anchor2.x = mouseX;
		anchor2.y = mouseY;
	}
	background(50);
	strokeWeight(1);
	stroke(255);
	line(lineEnd1.x, lineEnd1.y, anchor1.x, anchor1.y);
	line(lineEnd2.x, lineEnd2.y, anchor2.x, anchor2.y);
	noStroke();
	fill(255);
	ellipse(anchor1.x, anchor1.y, 15, 15);
	ellipse(anchor2.x, anchor2.y, 15, 15);
}

function mousePressed() {
	if ((mouseX - anchor1.x) ** 2 + (mouseY - anchor1.y) ** 2 < 64) {
		anchor1.held = true;
	}
	if ((mouseX - anchor2.x) ** 2 + (mouseY - anchor2.y) ** 2 < 64) {
		anchor2.held = true;
	}
}

function mouseReleased() {
	anchor1.held = false;
	anchor2.held = false;
}
