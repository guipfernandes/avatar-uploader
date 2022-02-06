import * as S from './styles';
import Slider from 'components/Slider';

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
			<S.Button onClick={onSaveEditor}>Save</S.Button>
		</S.SliderCrop>
		<S.CloseButton onClick={onCloseEditor} />
	</S.Wrapper>
);

export default AvatarEditor;
