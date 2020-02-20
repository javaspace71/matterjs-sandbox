const {
	Engine,
	Render,
	Runner,
	World,
	Bodies,
	MouseConstraint,
	Mouse
} = Matter;

const engine = Engine.create();

const { world } = engine;

const width = 800;
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

World.add(
	world,
	MouseConstraint.create(engine, {
		mouse: Mouse.create(render.canvas)
	})
);

//Borders

const borders = [
	Bodies.rectangle(400, 600, 800, 100, {
		isStatic: true
	}),
	Bodies.rectangle(400, 0, 800, 100, {
		isStatic: true
	}),
	Bodies.rectangle(0, 300, 100, 600, {
		isStatic: true
	}),
	Bodies.rectangle(800, 300, 100, 600, {
		isStatic: true
	})
];

World.add(world, borders);

//Random shapes

for (let i = 0; i < 30; i++) {
	if (Math.random() > 0.5) {
		World.add(
			world,
			Bodies.rectangle(Math.random() * width, Math.random() * height, 50, 50)
		);
	} else {
		World.add(
			world,
			Bodies.trapezoid(Math.random() * width, Math.random() * height, 50, 50, 1)
		);
	}
}