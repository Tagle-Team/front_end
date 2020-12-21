import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import logo from 'images/tagle-logo.png';

const useStyles = makeStyles((theme) => ({
  background: {
    // background: `linear-gradient(90deg, ${deepPurple[800]} 9%, ${blue[500]} 93%)`,
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
    boxShadow: `0 20px 40px 0 rgba(0,0,0,.15)`,
    // zIndex: 10,
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
  logo: {
    position: 'fixed',
    width: '15%',
  },
}));

/**
 * 로그인폼, 비밀번호 확인폼, 회원가입폼, 회원정보 수정 폼 등의 템플릿으로 사용
 * @param {json} param0
 */
function Form({ title, children }) {
  const classes = useStyles();

  /**
   * form의 input 창에서 enter클릭시 form submit 방지
   * @param {} event
   */
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  };

  return (
    <div className={classes.background}>
      <img src={logo} alt="logo" className={classes.logo} />
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
          <form
            autoComplete="off"
            className={classes.form}
            onKeyDown={handleKeyDown}
          >
            {children}
          </form>
        </div>
      </Container>
    </div>
  );
}

export default Form;
