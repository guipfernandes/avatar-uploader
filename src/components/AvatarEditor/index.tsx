import * as S from './styles';
import Slider from 'components/Slider';

interface Props {
	onCloseEditor: () => void;
	onSaveEditor: () => void;
}

const AvatarEditor = ({ onCloseEditor, onSaveEditor }: Props) => {
	const onChangeZoom = (value: number) => {
		console.log('===> ' + value);
	};

	return (
		<S.Wrapper>
			<S.SliderCrop>
				<span>Crop</span>
				<Slider onChange={onChangeZoom} />
				<S.Button onClick={onSaveEditor}>Save</S.Button>
			</S.SliderCrop>
			<S.CloseButton onClick={onCloseEditor} />
		</S.Wrapper>
	);
};

export default AvatarEditor;
