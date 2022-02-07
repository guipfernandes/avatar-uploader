import { fireEvent, render, screen } from '@testing-library/react';

import AvatarUploadFailed from '.';

describe('<AvatarUploadFailed />', () => {
	it('should call close method', () => {
		const onCloseUploadFailed = jest.fn();
		render(<AvatarUploadFailed onCloseUploadFailed={onCloseUploadFailed} />);

		const closeButtonElement = screen.getByRole('close');
		const tryAgainElement = screen.getByText('Try again');
		fireEvent.click(closeButtonElement);
		fireEvent.click(tryAgainElement);

		expect(onCloseUploadFailed).toHaveBeenCalledTimes(2);
	});
});