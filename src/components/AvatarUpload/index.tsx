import * as S from './styles';
import { ImageIcon } from 'components/Icons';
import { FileRejection, useDropzone } from 'react-dropzone';
import { useCallback, useMemo, useState } from 'react';
import { FilePreview } from 'types/FilePreview';
import AvatarEditor from 'components/AvatarEditor';
import { Axis } from 'types/Axis';
import useDraggable from 'hooks/useDraggable';
import AvatarUploadFailed from 'components/AvatarUploadFailed';

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

	useDraggable('#avatar', setAvatarAxis, imageFile);

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
									avatarAxis={avatarAxis}
									avatarScale={avatarScale}
									alt={imageFile.name}
									src={imageFile.preview} />
			) : uploadFailed && (
				<S.AvatarError>
					<S.AvatarIconError />
				</S.AvatarError>
			)}

		</S.AvatarWrapper>
	), [avatarAxis, avatarScale, editMode, imageFile, uploadFailed]);

	const avatarUploadComponent = useMemo(() => (!uploadFailed && !editMode &&
    <S.UploadZone {...getRootProps({ isDragActive })}>
			{avatarComponent}
      <S.UploadZoneDescription>
        <input {...getInputProps()} />
        <S.Title>
          <ImageIcon />
          <span>{title}</span>
        </S.Title>
        <S.Subtitle>
					{subtitle}
        </S.Subtitle>
      </S.UploadZoneDescription>
    </S.UploadZone>
	), [avatarComponent, editMode, getInputProps, getRootProps, isDragActive, subtitle, title, uploadFailed]);

	const uploadFailedComponent = useMemo(() => (uploadFailed && !editMode &&
    <AvatarUploadFailed onCloseUploadFailed={onCloseModal} />
	), [editMode, onCloseModal, uploadFailed]);

	const avatarEditorComponent = useMemo(() => (editMode && imageFile && !uploadFailed &&
    <AvatarEditor onCloseEditor={onCloseModal}
                  onSaveEditor={onSaveEditor}
                  onChangeZoom={onChangeZoom} />
	), [editMode, imageFile, onChangeZoom, onCloseModal, onSaveEditor, uploadFailed]);

	return (
		<S.Wrapper>
			{(editMode || uploadFailed) && avatarComponent}
			{avatarUploadComponent}
			{uploadFailedComponent}
			{avatarEditorComponent}
		</S.Wrapper>
	);
};

AvatarUpload.defaultProps = defaultProps;

export default AvatarUpload;
