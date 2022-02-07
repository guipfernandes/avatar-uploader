import Slider from 'components/Slider';
import * as S from './styles';

interface Props {
	onCloseEditor: () => void;
	onSaveEditor: () => void;
	onChangeZoom: (value: number) => void;
}

const AvatarEditor = ({ onCloseEditor, onSaveEditor, onChangeZoom }: Props) => (
	<S.Wrapper>
		<S.SliderCrop>
			<span>Crop</span>
			<Slider onChange={onChangeZoom} />
			<S.Button role="save" onClick={onSaveEditor}>Save</S.Button>
		</S.SliderCrop>
		<S.CloseButton role="close" onClick={onCloseEditor} />
	</S.Wrapper>
);

export default AvatarEditor;
