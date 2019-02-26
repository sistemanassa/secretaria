import React, { Component } from 'react';
import PropTypes from 'prop-types';

import video from '../../assets/video/movie.mp4';

class Video extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div>
        <p>Área de vídeo</p>
        <video autoPlay loop muted width="100%" height="100%">
          <source src={video} type="video/mp4" />
        </video>
      </div>
    );
  }
}

export default Video;
