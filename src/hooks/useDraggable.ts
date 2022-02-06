import interact from 'interactjs';
import { Target } from '@interactjs/types';
import { Axis } from 'types/Axis';
import { useEffect } from 'react';

const useDraggable = (target: Target, onDragMove: ({ x, y: number }: Axis) => void, deps: any) => {
	
	useEffect(() => {
		let x = 0;
		let y = 0;
		
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
	}, [deps, onDragMove, target]);
};

export default useDraggable;