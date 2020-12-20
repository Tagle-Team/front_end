import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// import Switch from '@material-ui/core/Switch';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

import ElevateAppBar from 'components/UI/organisms/Navigation';
import { fetchPosts } from 'api/post';

import Card from './Card';
import Post from './Post';
// import Folder from './Folder';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function MyTag() {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  // const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const searchVal = useRef('');

  const getSearchVal = () => {
    return searchVal.current;
  };

  const setSearchVal = (value) => {
    searchVal.current = value;
  };

  useEffect(() => {
    if (refresh) {
      const fetch = async () => {
        const res = await fetchPosts();

        if (res && res.data) {
          setPosts(res.data);
        }
      };

      fetch();
      setRefresh(false);
    }
  }, [refresh]);

  // const toggleChecked = () => {
  //   setChecked((prev) => !prev);
  // };

  const handleOpenPost = () => {
    setOpen(true);
  };

  const handleClosePost = () => {
    setOpen(false);
  };

  const handleSearchInputChange = (e) => {
    setSearchVal(e.target.value);
  };

  const handleSearchTag = () => {
    const search = getSearchVal().trim();

    if (search.length === 0) {
      setRefresh(true);
    } else {
      const tag = `#${search}`;
      const filteredPosts = posts.filter((item) => item.tags.indexOf(tag) >= 0);

      setPosts(filteredPosts);
    }
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleSearchTag();
    }
  };

  return (
    <>
      <ElevateAppBar>
        {/* <FormControlLabel
          control={<Switch checked={checked} onChange={toggleChecked} />}
          label="폴더로 보기"
        /> */}
        <TextField
          className={classes.margin}
          id="input-with-icon-textfield"
          label="태그 검색"
          onChange={handleSearchInputChange}
          onKeyDown={handleKeyDown}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={handleSearchTag}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <IconButton color="primary" onClick={handleOpenPost}>
          <AddCircleIcon />
        </IconButton>
        <div className={classes.root}>
          <Grid container spacing={3}>
            {
              // checked
              // ? myTags.map((item) => {
              //     const { tagId, name } = item;
              //     return (
              //       <Grid item key={tagId} xs={4} sm={2}>
              //         <Folder name={name} />
              //       </Grid>
              //     );
              //   })
              // :
              posts.map((item) => {
                const { seq } = item;
                return (
                  <Grid item key={seq} xs={6} sm={3}>
                    <Card {...item} setRefresh={setRefresh} />
                  </Grid>
                );
              })
            }
          </Grid>
        </div>
      </ElevateAppBar>
      {open && (
        <Post open={open} onClose={handleClosePost} setRefresh={setRefresh} />
      )}
    </>
  );
}
