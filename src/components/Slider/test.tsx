import { fireEvent, render, screen } from '@testing-library/react';

import Slider from '.';

describe('<Slider />', () => {
	it('should call on change method', () => {
		const onChange = jest.fn();
		render(<Slider onChange={onChange} />);

		const sliderElement = screen.getByRole('slider');
		fireEvent.change(sliderElement, { target: { value: 5 } });

		expect(onChange).toHaveBeenCalledWith(5);
	});
});