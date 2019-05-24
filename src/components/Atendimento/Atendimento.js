import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import {
  Paper,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';

import Video from '../Video/Video';

const styles = {
  main: {
    margin: '16px',
    padding: '16px',
    height: 'calc(100vh - 6.7vh)',
  },
  gridRow: {
    display: 'grid',
    gridTemplateColumns: 'calc(100vw - 79px - 40vw) 40vw',
    width: 'calc(100vw - 79px)',
  },
  gridRowSup: {
    height: 'calc(100vh - 26.8vh)',
  },
  gridRowInf: {
    height: 'calc(100vh - 80vh)',
    borderTop: '1px solid darkgrey',
  },
  containerLeft: {
    width: 'calc(100vw - 79px - 40vw)',
    position: 'relative',
  },
  containerRight: {
    width: '40vw',
    borderLeft: '1px solid darkgrey',
    overflowY: 'auto',
    paddingLeft: '10px',
    boxSizing: 'border-box',
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  dividerFullWidth: {
    margin: '0 0 0 70px',
  },
  root: {
    width: '100%',
    maxWidth: 360,
  },
};

class Attendance extends Component {
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
      <div className={classes.containerLeft} style={{ overflow: 'hidden' }}>
        <Video />
      </div>
    );
  };

  renderRecentCalls = () => {
    const { classes } = this.props;
    return (
      <div className={classes.containerRight}>
        {/* <p>Ultimas Chamadas</p> */}
        <List>
          <ListItem>
            <ListItemText primary="G1 - Nome" />
          </ListItem>
          <Divider component="li" />
        </List>
        <List>
          <ListItem>
            <ListItemText primary="G2 - Nome" />
          </ListItem>
          <Divider component="li" />
        </List>
        <List>
          <ListItem>
            <ListItemText primary="G3 - Nome" />
          </ListItem>
        </List>
      </div>
    );
  };

  renderCurrentCall = () => {
    const { classes } = this.props;
    return (
      <div className={classes.containerLeft}>
        {/* <p>Chamada Atual</p> */}
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="subtitle1"
            color="inherit"
            className={classes.grow}
          >
            Nome
          </Typography>
          <Typography variant="subtitle1" color="inherit">
            Guichê 3
          </Typography>
        </Toolbar>
      </div>
    );
  };

  renderCompany = () => {
    const { classes } = this.props;
    return (
      <div className={classes.containerRight}>
        {/* <p>Logo e Hora</p> */}
        <List className={classes.root}>
          <ListItem>
            <Avatar>
              <ImageIcon />
            </Avatar>
            <ListItemText primary="Estácio" secondary="Nova América" />
          </ListItem>
          <li>
            <Typography
              className={classes.dividerFullWidth}
              color="textSecondary"
              variant="caption"
            >
              16:35
            </Typography>
          </li>
        </List>
      </div>
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper elevation={4} className={classes.main}>
        <div className={classes.gridRow} style={styles.gridRowSup}>
          {this.renderVideo()}
          {this.renderRecentCalls()}
        </div>

        <div className={classes.gridRow} style={styles.gridRowInf}>
          {this.renderCurrentCall()}
          {this.renderCompany()}
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(Attendance);
