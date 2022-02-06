import * as S from './styles';

interface Props {
	onCloseUploadFailed: () => void;
}

const AvatarUploadFailed = ({ onCloseUploadFailed }: Props) => (
	<S.Wrapper>
		<S.ErrorInfo>
			<span>Sorry, the upload failed</span>
			<a onClick={onCloseUploadFailed}>Try again</a>
		</S.ErrorInfo>
		<S.CloseButton onClick={onCloseUploadFailed} />
	</S.Wrapper>
);

export default AvatarUploadFailed;
