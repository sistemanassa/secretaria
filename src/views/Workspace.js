import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = {
  main: {
    margin: '16px',
    padding: '16px',
    height: 'calc(100vh - 6.7vh)',
  },
  gridRow: {
    display: 'grid',
    gridTemplateColumns: 'calc(100vw - 64px - 30vw) 30vw',
  },
  gridRowSup: {
    width: 'calc(100vw - 64px)',
    height: 'calc(100vh - 26.8vh)',
  },
  gridRowInf: {
    width: 'calc(100vw - 64px)',
    height: 'calc(100vh - 80vh)',
    borderTop: '1px solid darkgrey',
  },
  containerLeft: {
    width: 'calc(100vw - 64px - 30vw)',
  },
  containerRight: {
    width: '30vw',
    borderLeft: '1px solid darkgrey',
    overflowY: 'auto',
    paddingLeft: '10px',
    boxSizing: 'border-box',
  },
};

class Workspace extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
    };
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  renderVideo = () => {
    const { classes } = this.props;
    return (
      <div className={classes.containerLeft}>
        <p>Área de vídeo</p>
      </div>
    );
  };

  renderGuiche = () => {
    const { classes } = this.props;
    return (
      <div className={classes.containerRight}>
        <p>Ultimas Chamadas</p>
      </div>
    );
  };

  renderCurrentCall = () => {
    const { classes } = this.props;
    return (
      <div className={classes.containerLeft}>
        <p>Chamada Atual</p>
      </div>
    );
  };

  renderCompany = () => {
    const { classes } = this.props;
    return (
      <div className={classes.containerRight}>
        <p>Logo e Hora</p>
      </div>
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper elevation={4} className={classes.main}>
        <div className={classes.gridRow} style={styles.gridRowSup}>
          {this.renderVideo()}
          {this.renderGuiche()}
        </div>

        <div className={classes.gridRow} style={styles.gridRowInf}>
          {this.renderCurrentCall()}
          {this.renderCompany()}
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(Workspace);
