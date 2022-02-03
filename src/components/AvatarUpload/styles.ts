import styled from 'styled-components';

interface Props {
	isDragActive: boolean;
}

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 553px;
  height: 177px;

  background: #F2F5F8;
  border-radius: 8px;

  font-size: 14px;
  line-height: 180%;
`;

export const Avatar = styled.img`
  vertical-align: middle;
  width: 114px;
  height: 114px;
  min-width: 114px;
  min-height: 114px;
  border-radius: 50%;
  object-fit: cover;
  margin-left: 30px;
`;

export const UploadZone = styled(Wrapper)`
  width: 100%;
  height: 100%;
  justify-content: flex-start;

  background: #F2F5F8;
  border-width: 2px;
  border-style: dashed;
  border-color: ${(props: Props) => props.isDragActive ? '#72ff58' : '#C7CDD3'};

  cursor: pointer;
`;

export const UploadZoneDescription = styled.div`
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 100%;
`;

export const Title = styled.div`
  justify-content: center;
  font-weight: 500;
  color: #495567;

  span {
    margin-left: 12px;
    vertical-align: middle;
  }

  svg {
    vertical-align: middle;
  }
`;

export const Subtitle = styled.span`
  color: #677489;
`;

