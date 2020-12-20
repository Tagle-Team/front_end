import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import logo from 'images/tagle-logo.png';

import UserButton from 'components/UI/organisms/UserButton';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    color: '#3E3E3E',
    fontFamily: 'Noto Sans',
    fontWeight: 900,
    letterSpacing: 1.2,
  },
  toolbar: {
    padding: '0 50px',
  },
  toolbarButtons: {
    flexGrow: 1,
  },
  toolbarUser: {
    marginLeft: 'auto',
  },
  logo: {
    maxWidth: '40px',
    marginRight: '8px',
  },
}));

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });
  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function ElevateAppBar(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar position="static" color="transparent">
          <Toolbar className={classes.toolbar}>
            <img src={logo} alt="logo" className={classes.logo} />
            <Typography className={classes.title} variant="h6">
              tagle
            </Typography>
            {/* <div className={classes.toolbarButtons}>
              <Button color="inherit">홈</Button>
              <Button color="inherit">소개</Button>
              <Button color="inherit">태그</Button>
              <Button color="inherit">공유</Button>
              <Button color="inherit">바로가기</Button>
            </div> */}
            <div className={classes.toolbarUser}>
              {/* <Button>로그인</Button> */}
              <UserButton />
            </div>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      <Container>{props.children}</Container>
    </React.Fragment>
  );
}
