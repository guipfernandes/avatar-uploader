import interact from 'interactjs';
import { Target } from '@interactjs/types';
import { Axis } from 'types/axis';
import { useEffect } from 'react';

interface Options {
	target: Target;
	onDragMove: ({ x, y: number }: Axis) => void;
	canDrag: boolean | undefined;
	deps: any;
}

const useDraggable = (options: Options) => {
	const { target, onDragMove, canDrag, deps } = options;

	useEffect(() => {
		let x = 0;
		let y = 0;

		if (canDrag) {
			interact(target)
				.draggable({
					modifiers: [
						interact.modifiers.restrictRect({
							restriction: 'parent',
							endOnly: true,
						}),
					],
					inertia: true,
				})
				.on('dragmove', function (event) {
					x += event.dx;
					y += event.dy;
					onDragMove({ x, y });
				});
		} else {
			interact(target).unset();
		}

	}, [target, onDragMove, canDrag, deps]);
};

export default useDraggable;