import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  badgeRoot: {
    justifyContent: 'center',
  },
  folderIcon: {
    fontSize: `${theme.spacing(1)}rem`,
  },
  title: {
    textAlign: 'center',
  },
  rightCircle: {
    right: '22%',
  },
}));

const SmallAvatar = withStyles((theme) => ({
  root: {
    border: `2px solid ${theme.palette.background.paper}`,
  },
}))(Avatar);

function Folder({ name, count = 0 }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Badge
        className={classes.badgeRoot}
        classes={{ anchorOriginBottomRightCircle: classes.rightCircle }}
        overlap="circle"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        badgeContent={<SmallAvatar alt="Count">{count}</SmallAvatar>}
      >
        <IconButton color="primary" aria-label="">
          <FolderOpenIcon className={classes.folderIcon} />
        </IconButton>
      </Badge>
      <Typography
        className={classes.title}
        variant="button"
        display="block"
        gutterBottom
        component="div"
      >
        {name}
      </Typography>
    </div>
  );
}

export default Folder;
