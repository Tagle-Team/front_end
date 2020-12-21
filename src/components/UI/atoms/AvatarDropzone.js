import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { useDropzone } from 'react-dropzone';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  dropzoneWrap: {
    padding: theme.spacing(1),
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    margin: 'auto',
  },
  textCenter: {
    textAlign: 'center',
  },
}));

/**
 * 회원 정보 수정, 회원가입 에서 프로필 사진 등록, 수정 삭제에 쓰이는 컴포넌트
 * @param {json} param0
 */
function AvatarDropzone({ onChangeAvatar, src }) {
  const classes = useStyles();
  const [avatar, setAvatar] = useState({
    // file: null,
    preview: src,
  });

  const onDrop = useCallback(
    (acceptedFiles) => {
      // Do something with the files
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');
        reader.onload = (...args) => {
          // Do whatever you want with the file contents
          const binaryStr = reader.result;
          // 파일 업로드 전 미리보기 파일 set
          setAvatar({
            // file,
            preview: binaryStr,
          });
          // 서버에 업로드할 파일 정보 부모 컴포넌트로
          onChangeAvatar(file);
        };

        reader.readAsDataURL(file);
      });
    },
    [onChangeAvatar]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    // 이미지 파일만 선택 되도록
    accept: ['image/*'],
    maxFiles: 1,
  });

  /**
   * 프로필 사진 삭제시
   */
  const handleDelAvatar = () => {
    onChangeAvatar(null);
    setAvatar({
      ...avatar,
      preview: null,
    });
  };

  return (
    <div className={classes.root}>
      <div {...getRootProps()} className={classes.dropzoneWrap}>
        <Avatar className={classes.avatar} src={avatar.preview} />
        <input {...getInputProps()} />
        <div className={classes.textCenter}>
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>프로필 사진 업로드</p>
          )}
        </div>
      </div>
      {avatar.preview && (
        <Button onClick={handleDelAvatar}>프로필 사진 제거</Button>
      )}
    </div>
  );
}

export default AvatarDropzone;
