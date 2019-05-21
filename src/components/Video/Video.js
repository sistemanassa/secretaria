import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import video from '../../assets/video/movie.mp4';

const styles = {
  media: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    minWidth: '100%',
    minHeight: '100%',
    width: 'auto',
    height: 'auto',
    zIndex: '-100',
    transform: 'translateX(-50%) translateY(-50%)',
    // background: 'url('seuthumbnail.jpg') no-repeat',
    backgroundSize: 'cover',
    transition: '1s opacity',
  },
};

class Video extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  render() {
    const { classes } = this.props;
    return (
      <video autoPlay loop muted className={classes.media}>
        <source src={video} type="video/mp4" />
      </video>
    );
  }
}

export default withStyles(styles)(Video);
