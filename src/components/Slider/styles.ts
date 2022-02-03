import styled from 'styled-components';

interface Props {
	sliderBackground: string;
}

export const Wrapper = styled.div`
  input[type=range] {
    background: ${(props: Props) => props.sliderBackground} ;
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
