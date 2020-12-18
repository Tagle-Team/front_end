import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import Popper from '@material-ui/core/Popper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import FaceIcon from '@material-ui/icons/Face';

import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import routes from 'resources/routes';
import { logout } from 'modules/user';

const useStyles = makeStyles((theme) => ({
  // popper
  popperRoot: {
    zIndex: 10000,
  },
  userCardContent: {
    padding: theme.spacing(1),
  },
}));

function UserButton() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => ({
    user,
  }));
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  console.log(user);
  const handleClickPopper = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSignOutClick = () => {
    dispatch(logout());
  };

  const handleClickAway = (event) => {
    setAnchorEl(null);
  };

  const handleGoSignIn = () => {
    history.push(routes.signin);
  };

  return (
    <>
      {!!user.userName ? (
        <ClickAwayListener onClickAway={handleClickAway}>
          <div>
            <IconButton
              color="inherit"
              aria-label="View goals"
              onClick={handleClickPopper}
              aria-describedby="user-popper"
              type="button"
              edge="start"
            >
              <FaceIcon />
            </IconButton>
            <Popper
              id="user-popper"
              open={anchorEl !== null}
              anchorEl={anchorEl}
              transition
              className={classes.popperRoot}
              placement="bottom-start"
            >
              <Card>
                <CardContent className={classes.userCardContent}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="div"
                  >
                    <List>
                      <ListItem button>
                        <ListItemText
                          primary="Sign Out"
                          onClick={handleSignOutClick}
                        />
                      </ListItem>
                    </List>
                  </Typography>
                </CardContent>
              </Card>
            </Popper>
          </div>
        </ClickAwayListener>
      ) : (
        <Button onClick={handleGoSignIn}>로그인</Button>
      )}
    </>
  );
}

export default UserButton;
