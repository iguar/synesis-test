import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 345,
    margin: 5
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
};

function VideoCard(props) {
  const {classes, video, embedVideo} = props;
  return (
    <Card className={classes.card}>
      <CardActionArea
        onClick={() => {
          embedVideo(video.id.videoId)
        }}
      >
        <CardMedia
          component="img"
          alt={video.snippet.title}
          className={classes.media}
          height="140"
          image={video.snippet.thumbnails.default.url}
          title={video.snippet.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {video.snippet.title}
          </Typography>
          <Typography component="p">
            {video.snippet.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

VideoCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VideoCard);