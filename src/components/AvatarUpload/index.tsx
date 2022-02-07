import AvatarEditor from 'components/AvatarEditor';
import AvatarUploadFailed from 'components/AvatarUploadFailed';
import { ImageIcon } from 'components/Icons';
import useDraggable from 'hooks/useDraggable';
import { useCallback, useMemo, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { Axis } from 'types/axis';
import { FilePreview } from 'types/file-preview';
import * as S from './styles';

type Props = {
	title?: string,
	subtitle?: string
} & typeof defaultProps;

const defaultProps = {
	title: 'Avatar Upload',
	subtitle: 'Drop the image here or click to browse',
};

const AvatarUpload = ({ title, subtitle }: Props) => {
	const [imageFile, setImageFile] = useState<FilePreview>();
	const [uploadFailed, setUploadFailed] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [avatarScale, setAvatarScale] = useState(1);
	const [avatarAxis, setAvatarAxis] = useState<Axis>({ x: 0, y: 0 });

	useDraggable({
		target: '#avatar',
		onDragMove: setAvatarAxis,
		canDrag: editMode,
		deps: imageFile,
	});

	const isUploadMode = useMemo(() => !(editMode || uploadFailed), [editMode, uploadFailed]);

	const onDrop = useCallback((files: File[]) => {
		if (!files || !files.length) return;
		setImageFile(Object.assign(files[0], {
			preview: URL.createObjectURL(files[0]),
		}));
		setEditMode(true);
		setAvatarScale(1);
		setAvatarAxis({ x: 0, y: 0 });
	}, []);

	const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
		setUploadFailed(fileRejections && fileRejections.length > 0);
		setEditMode(false);
		setImageFile(undefined);
	}, []);

	const {
		getRootProps,
		getInputProps,
		isDragActive,
	} = useDropzone({ accept: 'image/*', onDrop, onDropRejected });

	const onChangeZoom = useCallback((value: number) => setAvatarScale(value), []);

	const onCloseModal = useCallback(() => {
		setEditMode(false);
		setUploadFailed(false);
		setImageFile(undefined);
	}, []);

	const onSaveEditor = useCallback(() => setEditMode(false), []);

	const avatarComponent = useMemo(() => (imageFile || uploadFailed) && (
		<S.AvatarWrapper isEditMode={editMode}>
			{imageFile ? (
				<S.Avatar id="avatar"
									role="avatar"
									avatarAxis={avatarAxis}
									avatarScale={avatarScale}
									alt={imageFile.name}
									src={imageFile.preview} />
			) : uploadFailed && (
				<S.AvatarError role="avatarError">
					<S.AvatarIconError />
				</S.AvatarError>
			)}

		</S.AvatarWrapper>
	), [avatarAxis, avatarScale, editMode, imageFile, uploadFailed]);

	const avatarUploadComponent = useMemo(() => (!uploadFailed && !editMode &&
    <S.UploadZone {...getRootProps()}>
      <input role="imageInput" {...getInputProps()} />
      <S.Title role="title">
        <ImageIcon />
        <span>{title}</span>
      </S.Title>
      <S.Subtitle role="subtitle">
				{subtitle}
      </S.Subtitle>
    </S.UploadZone>
	), [editMode, getInputProps, getRootProps, subtitle, title, uploadFailed]);

	const uploadFailedComponent = useMemo(() => (uploadFailed && !editMode &&
    <AvatarUploadFailed onCloseUploadFailed={onCloseModal} />
	), [editMode, onCloseModal, uploadFailed]);

	const avatarEditorComponent = useMemo(() => (editMode && imageFile && !uploadFailed &&
    <AvatarEditor onCloseEditor={onCloseModal}
                  onSaveEditor={onSaveEditor}
                  onChangeZoom={onChangeZoom} />
	), [editMode, imageFile, onChangeZoom, onCloseModal, onSaveEditor, uploadFailed]);

	return (
		<S.Wrapper isUploadMode={isUploadMode} isDragActive={isDragActive}>
			{(imageFile || uploadFailed) && avatarComponent}
			{avatarUploadComponent}
			{uploadFailedComponent}
			{avatarEditorComponent}
		</S.Wrapper>
	);
};

AvatarUpload.defaultProps = defaultProps;

export default AvatarUpload;
