import styled from 'styled-components';

interface Props {
	sliderThumbPosition: number;
}

export const Wrapper = styled.div`
  input[type=range] {
    background: ${({ sliderThumbPosition }: Props) => `linear-gradient(to right, #3F80FF 0%, #3F80FF ${sliderThumbPosition}%, #B9D1FF ${sliderThumbPosition}%, #B9D1FF 100%)`};
    border-radius: 1px;
    height: 2px;
    width: 276px;
    transition: background 450ms ease-in;
    -webkit-appearance: none;
  }

  input::-webkit-slider-thumb {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #3F80FF;
    border: none;
  }
`;
