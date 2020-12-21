import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * 컨펌창 및 post 등록, 수정 모달창에 쓰인 컴포넌트
 * @param {json} props
 */
export default function SlideDialog({
  open,
  onClose,
  title,
  children,
  fullWidth = false,
  onOkClick = (f) => f,
}) {
  const handleClose = () => {
    onClose();
  };

  const handleOkClick = () => {
    onOkClick();
    onClose();
  };

  return (
    <Dialog
      open={open}
      fullWidth={fullWidth}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description" component="div">
          {children}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleOkClick} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
