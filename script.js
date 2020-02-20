const { Engine, Render, Runner, World, Bodies } = Matter;

const engine = Engine.create();

const { world } = engine;

const width = 600;
const height = 600;

const render = Render.create({
	element: document.body,
	engine: engine,
	options: {
		wireframes: false,
		width,
		height
	}
});

Render.run(render);

Runner.run(Runner.create(), engine);

//**********************************/

//Borders

const borders = [
	//Top border
	Bodies.rectangle(width / 2, 0, width, 40, {
		isStatic: true
	}),
	//Bottom border
	Bodies.rectangle(width / 2, height, width, 40, {
		isStatic: true
	}),
	//Left border
	Bodies.rectangle(0, height / 2, 40, height, {
		isStatic: true
	}),
	//Right border
	Bodies.rectangle(width, height / 2, 40, height, {
		isStatic: true
	})
];
World.add(world, borders);

//**********************************/

//Maze Generation

//A 2 dimensional array representing celss, each existing cell is set to false. Once a cell is visited, it will be set to true. The first cell to be visited will be picked at random.

//  grid = [
// 	[false, false, false],
// 	[false, false, false],
// 	[false, false, false]
// ];

const cells = 3;

const grid = Array(cells)
	.fill(null)
	.map(() => Array(cells).fill(false));

//Verticals

//Each false represents an existing vertical wall, each true represents a removed vertical wall.

const verticals = Array(cells)
	.fill(null)
	.map(() => Array(cells - 1).fill(false));

console.log(verticals);

//Horizontals

//Each false represents an existing horizontal wall, each true represents a removed horizontal wall.

const horizontals = Array(cells - 1)
	.fill(null)
	.map(() => Array(cells).fill(false));

console.log(horizontals);

//Random starting location

const startRow = Math.floor(Math.random() * cells);
const startCollumn = Math.floor(Math.random() * cells);
const shuffle = arr => {
	let counter = arr.length;
	while (counter > 0) {
		const index = Math.floor(Math.random() * counter);
		counter--;

		const temp = arr[counter];
		arr[counter] = arr[index];
		arr[index] = temp;
	}
	return arr;
};

const cellsIterator = (row, column) => {
	//If cell is visited, return
	if (grid[row][column]) {
		return;
	}
	//Mark cell as visited
	grid[row][column] = true;
	//Create a list of neighbours and randomize it to make a randomized maze as a result
	const neighbours = shuffle([
		[row - 1, column, 'up'],
		[row, column + 1, 'right'],
		[row + 1, column, 'down'],
		[row, column - 1, 'left']
	]);

	console.log(neighbours);
	//For each neighbour: see if neighbour is out of bound

	for (let neighbour of neighbours) {
		const [nextRow, nextColumn, direction] = neighbour;

		//Check for out of bound cell

		if (nextRow < 0 || nextRow >= cells || nextColumn < 0 || nextColumn >= 0) {
			continue;
		} else {
		}

		//If neighbour is visited, continue to next neighbour
		if (grid[nextRow][nextColumn]) {
			continue;
		}
		//Remove wall from horizontal or vertical

		//Visit the next cell
	}
};

cellsIterator(startRow, startCollumn);

console.log(grid);
