import React, { useState } from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import EditIcon from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';

import { updatePrivate, deletePost } from 'api/post';

import Post from './Post';
import SlideDialog from 'components/UI/organisms/SlideDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    // minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginTop: 12,
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.text.secondary,
  },
}));

export default function CardItem(props) {
  const classes = useStyles();
  const {
    _id,
    contents,
    createdAt,
    tags,
    updatedAt,
    /*seq,*/ setRefresh,
  } = props;
  //공개 비공개 여부
  const [isPrivate, setIsPrivate] = useState(props.isPrivate);
  // 게시글 수정 모달 open 관련 state
  const [open, setOpen] = useState(false);
  // 삭제 관련 confirm창 open state
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleTogglePrivate = async () => {
    const res = await updatePrivate({ id: _id, isPrivate: !isPrivate });

    if (res && res.data) {
      setIsPrivate((prev) => !prev);
    }
  };

  const handleOpenPost = () => {
    setOpen(true);
  };

  const handleClosePost = () => {
    setOpen(false);
  };

  const handleOpenConfirm = () => {
    setConfirmOpen(true);
  };

  const handleCloseConfirm = () => {
    setConfirmOpen(false);
  };

  const handleDeletePost = async () => {
    const res = await deletePost({ /*seq,*/ id: _id });

    if (res && res.data) {
      setRefresh(true);
    }
  };

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <Tooltip title={moment(createdAt).format('LLL')}>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              component="div"
            >
              작성일 : {moment(createdAt).fromNow()}
            </Typography>
          </Tooltip>
          {createdAt !== updatedAt && (
            <Tooltip title={moment(updatedAt).format('LLL')}>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
                component="div"
              >
                수정일 : {moment(updatedAt).fromNow()}
              </Typography>
            </Tooltip>
          )}
          <Divider className={classes.divider} />
          <Typography variant="body2" component="div">
            {contents}
            <br />
          </Typography>
          <Typography className={classes.pos} color="primary" component="div">
            {!!tags && `(${tags.join(' ')})`}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton size="small" onClick={handleTogglePrivate}>
            {isPrivate ? <LockIcon /> : <LockOpenIcon />}
          </IconButton>
          <IconButton size="small" onClick={handleOpenPost}>
            <EditIcon />
          </IconButton>
          <IconButton size="small" onClick={handleOpenConfirm}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
      {open && <Post open={open} onClose={handleClosePost} {...props} />}
      <SlideDialog
        open={confirmOpen}
        onClose={handleCloseConfirm}
        onOkClick={handleDeletePost}
      >
        삭제 하시겠습니까?
      </SlideDialog>
    </>
  );
}
