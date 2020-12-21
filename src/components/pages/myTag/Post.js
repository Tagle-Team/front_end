import React, { useRef, useState } from 'react';
import SlideDialog from 'components/UI/organisms/SlideDialog';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core/styles';

import { addPost, updatePost } from 'api/post';

const useStyles = makeStyles((theme) => ({
  textRoot: {
    width: '100%',
  },
}));

function PostDialog(props) {
  const classes = useStyles();
  const { open, onClose, _id: postId, /*seq,*/ setRefresh } = props;
  const [checked, setChecked] = useState(!!props.isPrivate);
  const contents = useRef(props.contents || '');

  const getContents = () => {
    return contents.current;
  };

  const setContents = (value) => {
    contents.current = value;
  };

  const handleChange = (e) => {
    setContents(e.target.value);
  };

  const handleOnOk = async () => {
    const contents = getContents();
    let res = null;
    if (!!postId) {
      res = await updatePost({
        contents,
        isPrivate: checked,
        /*seq,*/ id: postId,
      });
    } else {
      res = await addPost({ contents, isPrivate: checked });
    }

    if (res && res.data) {
      setRefresh(true);
    }
  };

  const toggleChecked = () => {
    setChecked((prev) => !prev);
  };

  return (
    <SlideDialog
      open={open}
      onClose={onClose}
      fullWidth={true}
      onOkClick={handleOnOk}
    >
      <TextField
        label="Contents"
        placeholder="#"
        multiline
        className={classes.textRoot}
        onChange={handleChange}
        defaultValue={props.contents || ''}
      />

      <FormControlLabel
        control={<Switch checked={checked} onChange={toggleChecked} />}
        label="나만보기"
      />
    </SlideDialog>
  );
}

export default PostDialog;
