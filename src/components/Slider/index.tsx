import React, { useEffect, useState } from 'react';
import * as S from './styles';

type Props = {
	initialValue?: number,
	min?: number,
	max?: number,
	step?: number,
	onChange: (value: number) => void,
} & typeof defaultProps;

const defaultProps = {
	initialValue: 50,
	min: 0,
	max: 100,
	step: 1,
};

const Slider = ({ initialValue, min, max, step, onChange }: Props) => {
	const [value, setValue] = useState(initialValue);
	const [sliderThumbPosition, setSliderThumbPosition] = useState(initialValue);

	useEffect(() => onChange(+value), [value, onChange]);

	const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSliderThumbPosition((+e.target.value - min) / (max - min) * 100);
		setValue(+e.target.value ?? initialValue);
	};

	return (
		<S.Wrapper
			sliderBackground={`linear-gradient(to right, #3F80FF 0%, #3F80FF ${sliderThumbPosition}%, #B9D1FF ${sliderThumbPosition}%, #B9D1FF 100%)`}>
			<input id="slider"
						 type="range"
						 value={value}
						 min={min}
						 max={max}
						 onChange={onChangeValue}
						 step={step} />
		</S.Wrapper>
	);
};

Slider.defaultProps = defaultProps;

export default Slider;
