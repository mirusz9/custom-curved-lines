const width = 500;
const height = 300;

const lineEnd1 = { x: 100, y: 150 };
const lineEnd2 = { x: 400, y: 150 };
const anchor1 = { x: 100, y: 150, held: false };
const anchor2 = { x: 400, y: 150, held: false };

function setup() {
	createCanvas(width, height);
	background(50);
}

const average = (a, b) => {
	return createVector((a.x + b.x) / 2, (a.y + b.y) / 2);
};

const drawLine = () => {
	const vertexCount = 100;
	const segment1Length = dist(lineEnd1.x, lineEnd1.y, anchor1.x, anchor1.y);
	const segment2Length = dist(anchor1.x, anchor1.y, anchor2.x, anchor2.y);
	const segment3Length = dist(anchor2.x, anchor2.y, lineEnd2.x, lineEnd2.y);
	const lineLength = segment1Length + segment2Length + segment3Length;
	const segment1VertexCount = (vertexCount * segment1Length) / lineLength;
	const segment2VertexCount = (vertexCount * segment2Length) / lineLength;
	const segment3VertexCount = (vertexCount * segment3Length) / lineLength;
	let vertices = [];

	const segment1DX = (anchor1.x - lineEnd1.x) / segment1VertexCount;
	const segment1DY = (anchor1.y - lineEnd1.y) / segment1VertexCount;
	for (let i = 0; i < segment1VertexCount; i++) {
		vertices.push(createVector(lineEnd1.x + segment1DX * i, lineEnd1.y + segment1DY * i));
	}

	const segment2DX = (anchor2.x - anchor1.x) / segment2VertexCount;
	const segment2DY = (anchor2.y - anchor1.y) / segment2VertexCount;
	for (let i = 0; i < segment2VertexCount; i++) {
		vertices.push(createVector(anchor1.x + segment2DX * i, anchor1.y + segment2DY * i));
	}

	const segment3DX = (lineEnd2.x - anchor2.x) / segment3VertexCount;
	const segment3DY = (lineEnd2.y - anchor2.y) / segment3VertexCount;
	for (let i = 0; i < segment3VertexCount; i++) {
		vertices.push(createVector(anchor2.x + segment3DX * i, anchor2.y + segment3DY * i));
	}
	vertices.push(createVector(lineEnd2.x, lineEnd2.y));

	// Smoothing
	for (let i = 0; i < 150; i++) {
		const newVertices = [vertices[0]];
		for (let vertexIndex = 1; vertexIndex < vertices.length - 1; vertexIndex++) {
			const prev = vertices[vertexIndex - 1];
			const next = vertices[vertexIndex + 1];
			newVertices.push(average(prev, next));
		}
		newVertices.push(vertices[vertices.length - 1]);
		vertices = newVertices;
	}

	beginShape();
	stroke(0, 255, 0);
	noFill();
	for (const currentVertex of vertices) {
		vertex(currentVertex.x, currentVertex.y);
	}
	endShape();
};

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
	stroke(255, 0, 0);
	line(lineEnd1.x, lineEnd1.y, anchor1.x, anchor1.y);
	line(lineEnd2.x, lineEnd2.y, anchor2.x, anchor2.y);

	drawLine();

	noStroke();
	fill(255);
	ellipse(anchor1.x, anchor1.y, 15, 15);
	ellipse(anchor2.x, anchor2.y, 15, 15);
}

function mousePressed() {
	if ((mouseX - anchor1.x) ** 2 + (mouseY - anchor1.y) ** 2 < 64) {
		anchor1.held = true;
	} else if ((mouseX - anchor2.x) ** 2 + (mouseY - anchor2.y) ** 2 < 64) {
		anchor2.held = true;
	}
}

function mouseReleased() {
	anchor1.held = false;
	anchor2.held = false;
}
