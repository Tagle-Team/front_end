import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { useDropzone } from 'react-dropzone';

const useStyles = makeStyles((theme) => ({
  root: {
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

function AvatarDropzone({ onChangeAvatar }) {
  const classes = useStyles();
  const [avatar, setAvatar] = useState({
    // file: null,
    preview: null,
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

          setAvatar({
            // file,
            preview: binaryStr,
          });

          onChangeAvatar(file);
        };

        reader.readAsDataURL(file);
      });
    },
    [onChangeAvatar]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ['image/*'],
    maxFiles: 1,
  });

  return (
    <div {...getRootProps()} className={classes.root}>
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
  );
}

export default AvatarDropzone;
