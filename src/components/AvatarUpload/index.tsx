import * as S from './styles';
import { ImageIcon } from 'components/Icons';
import { FileRejection, useDropzone } from 'react-dropzone';
import { useCallback, useMemo, useState } from 'react';
import { FilePreview } from 'types/FilePreview';
import AvatarEditor from 'components/AvatarEditor';

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

	const onDrop = useCallback((files: File[]) => {
		if (!files || !files.length) return;
		setImageFile(Object.assign(files[0], {
			preview: URL.createObjectURL(files[0]),
		}));
		setEditMode(true);
	}, []);

	const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
		setUploadFailed(fileRejections && fileRejections.length > 0);
	}, []);

	const onCloseEditor = useCallback(() => {
		setEditMode(false);
		setImageFile(undefined);
	}, []);

	const onSaveEditor = useCallback(() => setEditMode(false), []);

	const {
		getRootProps,
		getInputProps,
		isDragActive,
	} = useDropzone({ accept: 'image/*', onDrop, onDropRejected });

	const avatarComponent = useMemo(() => (imageFile && !uploadFailed &&
    <S.Avatar alt={imageFile.name} src={imageFile.preview} />), [imageFile, uploadFailed]);

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

	const uploadFailedComponent = useMemo(() => (uploadFailed && !editMode && 'FAILED'), [editMode, uploadFailed]);

	const avatarEditorComponent = useMemo(() => (editMode && imageFile && !uploadFailed &&
    <AvatarEditor onCloseEditor={onCloseEditor}
                  onSaveEditor={onSaveEditor} />
	), [editMode, imageFile, onCloseEditor, onSaveEditor, uploadFailed]);

	return (
		<S.Wrapper>
			{editMode && avatarComponent}
			{avatarUploadComponent}
			{uploadFailedComponent}
			{avatarEditorComponent}
		</S.Wrapper>
	);
};

AvatarUpload.defaultProps = defaultProps;

export default AvatarUpload;
