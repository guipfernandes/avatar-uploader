import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import AvatarUpload from '.';

describe('<AvatarUpload />', () => {
	it('should render the title', () => {
		render(<AvatarUpload title="Organization Logo" />);

		const titleElement = screen.getByRole('title');

		expect(titleElement).toHaveTextContent(/Organization Logo/i);
	});

	it('should render the subtitle', () => {
		render(<AvatarUpload subtitle="test subtitle" />);

		const subtitleElement = screen.getByRole('subtitle');

		expect(subtitleElement).toHaveTextContent(/test subtitle/i);
	});

	it('should render preview after image has been selected', async () => {
		render(<AvatarUpload />);
		window.URL.createObjectURL = jest.fn();

		const file = new File(['dummy content'], 'test.png', { type: 'image/png' });
		const imageInput = screen.getByRole('imageInput', { hidden: true });
		fireEvent.change(imageInput, { target: { files: [file] } });

		await waitFor(() => expect(screen.getByRole('avatar')).toBeInTheDocument());
	});

	it('should render avatar error on failed', async () => {
		render(<AvatarUpload />);
		window.URL.createObjectURL = jest.fn();

		const file = new File(['dummy content'], 'test.xml', { type: 'text/xml' });
		const imageInput = screen.getByRole('imageInput', { hidden: true });
		fireEvent.change(imageInput, { target: { files: [file] } });

		await waitFor(() => expect(screen.getByRole('avatarError')).toBeInTheDocument());
	});
});