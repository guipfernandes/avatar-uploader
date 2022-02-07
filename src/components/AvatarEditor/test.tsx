import { fireEvent, render, screen } from '@testing-library/react';

import AvatarEditor from '.';

describe('<AvatarEditor />', () => {
	it('handle close editor button', () => {
		const onCloseEditor = jest.fn();
		render(<AvatarEditor onCloseEditor={onCloseEditor} onSaveEditor={jest.fn()} onChangeZoom={jest.fn()} />);

		const closeButtonElement = screen.getByRole('close');
		fireEvent.click(closeButtonElement);

		expect(onCloseEditor).toHaveBeenCalledTimes(1);
	});

	it('handle save editor button', () => {
		const onSaveEditor = jest.fn();
		render(<AvatarEditor onCloseEditor={jest.fn()} onSaveEditor={onSaveEditor} onChangeZoom={jest.fn()} />);

		const saveButtonElement = screen.getByRole('save');
		fireEvent.click(saveButtonElement);

		expect(onSaveEditor).toHaveBeenCalledTimes(1);
	});
});