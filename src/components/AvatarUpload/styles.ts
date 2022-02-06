import styled from 'styled-components';
import { Axis } from 'types/Axis';
import { AlertIcon } from 'components/Icons';

interface PropsUpload {
	isDragActive: boolean;
}

interface PropsAvatar {
	isEditMode?: boolean;
	avatarScale?: number;
	avatarAxis?: Axis;
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

export const AvatarWrapper = styled.div`
  vertical-align: middle;
  width: 114px;
  height: 114px;
  min-width: 114px;
  min-height: 114px;
  margin-left: 30px;
  overflow: hidden;
  border-radius: 50%;
  cursor: ${({ isEditMode }: PropsAvatar) => isEditMode ? 'move' : 'auto'};
`;

export const Avatar = styled.img`
  vertical-align: middle;
  width: 100%;
  height: auto;
  object-fit: cover;
  -webkit-user-drag: none;
  transform: ${({
                  avatarAxis,
                  avatarScale,
                }: PropsAvatar) => `translate(${avatarAxis?.x}px, ${avatarAxis?.y}px) scale(${avatarScale})`};
`;

export const AvatarError = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #C3CBD5;
`;

export const AvatarIconError = styled(AlertIcon)`
  display: block;
  margin: auto;
`;

export const UploadZone = styled(Wrapper)`
  width: 100%;
  height: 100%;
  justify-content: flex-start;

  background: #F2F5F8;
  border-width: 2px;
  border-style: dashed;
  border-color: ${(props: PropsUpload) => props.isDragActive ? '#72ff58' : '#C7CDD3'};

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

