import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';
import * as R from 'ramda'
import VideoCard from './VideoCard'

const styles = theme => ({
  root: {
    height: 180,
  },
  container: {
    display: 'flex',
  },
});

class VideoList extends React.Component {
  render() {
    const {classes, videos, embedVideo} = this.props;
    const mapIndexed = R.addIndex(R.map)

    return (
      <div className={classes.container}>
        {mapIndexed((video, index) => (
          <Grow
            in={true}
            timeout={index * 3000}
            key={index}
          >
            <VideoCard video={video} embedVideo={embedVideo}/>
          </Grow>
        ), videos)}
      </div>
    );
  }
}

VideoList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VideoList);