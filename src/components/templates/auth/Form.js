import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import deepPurple from '@material-ui/core/colors/deepPurple';
import blue from '@material-ui/core/colors/blue';

const useStyles = makeStyles((theme) => ({
  background: {
    background: `linear-gradient(90deg, ${deepPurple[800]} 9%, ${blue[500]} 93%)`,
  },
  title: {
    fontWeight: 400,
  },
  inner: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: '60px 50px 90px',
    marginBottom: '50px',
    borderRadius: '10px',
    boxShadow: '14px 18px 5px 0px rgba(0,0,0,0.3)',
  },
  root: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      marginTop: '15px',
    },
  },
}));

function Form({ title, children }) {
  const classes = useStyles();

  return (
    <div className={classes.background}>
      <Container maxWidth="sm" classes={{ root: classes.root }}>
        <div className={classes.inner}>
          <Typography
            variant="h2"
            component="h2"
            color="textPrimary"
            align="center"
            gutterBottom
            className={classes.title}
          >
            {title}
          </Typography>
          <form autoComplete="off" className={classes.form}>
            {children}
          </form>
        </div>
      </Container>
    </div>
  );
}

export default Form;
