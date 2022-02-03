import styled from 'styled-components';
import { CloseIcon } from 'components/Icons';

export const Wrapper = styled.div`
  display: grid;
  align-items: center;
  padding: 30px;
  width: 553px;
  height: 177px;
  background: #F2F5F8;
  border-radius: 8px;
  grid-template-columns: 1fr 1fr;
`;

export const SliderCrop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  font-weight: normal;
  font-size: 16px;
  line-height: 180%;
  letter-spacing: -0.02em;
  color: #677489;
`;

export const Button = styled.button`
  background: #3D485F;
  border-radius: 16px;
  border: none;
  padding: 5px 42px;
  margin-top: 35px;
  align-self: flex-end;

  font-weight: 500;
  font-size: 14px;
  line-height: 180%;
  letter-spacing: -0.02em;
  color: #FFFFFF;
  user-select: none;

  :active {
    opacity: .7;
  }
`;

export const CloseButton = styled(CloseIcon)`
  align-self: flex-start;
  justify-self: flex-end;

  :active {
    background: #e0e0e0;
    border-radius: 50%;
  }
`;
