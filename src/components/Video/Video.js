import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';

import video from '../../assets/video/movie.mp4';

const styles = {
  media: {
    width: '100%',
    height: '100%',
    maxHeight: '100%',
  },
};

class Video extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  render() {
    const { classes } = this.props;
    return (
      <CardMedia className={classes.pai}>
        <video autoPlay loop muted calssName={classes.media}>
          <source src={video} type="video/mp4" />
        </video>
      </CardMedia>
    );
  }
}

export default withStyles(styles)(Video);
