import React, { useState } from 'react';
import Form from 'components/templates/auth/Form';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SlideDialog from 'components/UI/organisms/SlideDialog';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    margin: 'auto',
  },
  buttonWrap: {
    marginTop: theme.spacing(2),
  },
}));

function UploadProfileImg() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleUploadImgClick = () => {
    setOpen(true);
  };

  const handleUploadImgClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Form title="프로필">
        <Avatar className={classes.avatar} />
        <Button onClick={handleUploadImgClick}>프로필 사진 선택</Button>
        <Grid container spacing={2} className={classes.buttonWrap}>
          <Grid item xs={6}>
            <Button fullWidth variant="contained">
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              // className={classes.submitButton}
              // onClick={handleSignUpClick}
            >
              Ok
            </Button>
          </Grid>
        </Grid>
      </Form>
      <SlideDialog
        open={open}
        title="프로필 사진 선택"
        onClose={handleUploadImgClose}
      >
        파일 업로드 여역
      </SlideDialog>
    </>
  );
}

export default UploadProfileImg;
