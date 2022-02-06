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
	initialValue: 1,
	min: 1,
	max: 10,
	step: 0.1,
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
		<S.Wrapper sliderThumbPosition={sliderThumbPosition}>
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
