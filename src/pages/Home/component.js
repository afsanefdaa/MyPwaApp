import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Theme,
  Typography,
} from '@material-ui/core';
import {
  createStyles, makeStyles, useTheme,
} from '@material-ui/core/styles';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import img from '../../live-from-space.jpg';


const useStyles = makeStyles((theme: Theme) => createStyles({
  card: {
    display: 'flex',
    background: '#e0e0e0',
    marginTop: '10px',
    justifyContent: 'space-between',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));


const Home = () => {
  const classes = useStyles();
  const theme = useTheme();
  const data = [{ title: 'book one', id: 1 }, { title: 'book two', id: 2 }, { title: 'book three', id: 3 }, { title: 'book four', id: 4 }];
  return (
    <div style={{
      background: 'pink',
      padding: '30px',
      display: 'flex',
      justifyContent: 'center',
      borderRadius: '4px',
      margin: '30px 0',
      flexDirection: 'column',
    }}
    >
      <Button style={{ marginBottom: '10px' }} variant="contained" color="primary">
        Hello World
      </Button>
      <Button style={{ marginBottom: '10px' }} variant="contained" color="default">
        I am material ui button
      </Button>
      <Button style={{ marginBottom: '10px' }} variant="contained" color="secondary">
        And my default color is awesome
      </Button>


      <>
        {
          data.map((el) => (
            <Link to={`/books/${el.id}`}>
              <Card className={classes.card}>
                <div className={classes.details}>
                  <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                      Live From Space
                      { el.title }
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      Mac Miller **
                      { el.title }
                    </Typography>
                  </CardContent>
                  <div className={classes.controls}>
                    <IconButton aria-label="previous">
                      {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                    </IconButton>
                    <IconButton aria-label="play/pause">
                      <PlayArrowIcon className={classes.playIcon} />
                    </IconButton>
                    <IconButton aria-label="next">
                      {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                    </IconButton>
                  </div>
                </div>
                <CardMedia
                  className={classes.cover}
                  image={img}
                  title="Live from space album cover"
                />
              </Card>
            </Link>
          ))
        }
      </>
    </div>
  );
};

export default Home;
