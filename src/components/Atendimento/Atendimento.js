import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { firebaseDatabase } from '../../utils/firebaseUtils';
import FirebaseService from '../../services/FirebaseService';

import { withStyles } from '@material-ui/core/styles';
import {
  Paper,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemText,
  // Divider,
  Avatar,
} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import Clock from 'react-live-clock';

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
      ultimonome: '',
      ultimoguiche: '',
      historico: [],
    };
  }

  componentDidMount = () => {
    FirebaseService.getUniqueDataBy('leituras', 'historico', data => {
      var historico = Object.values(data).sort(function(a, b) {
        var key1 = new Date(a.inicio);
        var key2 = new Date(b.inicio);

        if (key1 < key2) {
          return -1;
        } else if (key1 === key2) {
          return 0;
        } else {
          return 1;
        }
      });
      this.setState({ historico: historico.reverse() }, () => {
        var ultimoRec = Object.values(data);
        ultimoRec = historico[0];
        this.setState({ ultimonome: ultimoRec.nome });
        this.setState({ ultimoguiche: ultimoRec.guiche });
      });
    });
    firebaseDatabase.ref('leituras').on('child_changed', () => {
      window.location.reload();
    });
  };

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
        <List>
          {this.state.historico.map(node => (
            // eslint-disable-next-line react/jsx-key
            <ListItem>
              <ListItemText primary={node.guiche + ' - ' + node.nome} />
            </ListItem>
            // <Divider component="li" />
          ))}
        </List>
      </div>
    );
  };

  renderCurrentCall = () => {
    const { classes } = this.props;
    return (
      <div className={classes.containerLeft}>
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="subtitle1"
            color="inherit"
            className={classes.grow}
          >
            {this.state.ultimonome}
          </Typography>
          <Typography variant="subtitle1" color="inherit">
            Guichê {this.state.ultimoguiche}
          </Typography>
        </Toolbar>
      </div>
    );
  };

  renderCompany = () => {
    const { classes } = this.props;
    return (
      <div className={classes.containerRight}>
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
              <Clock format={'HH:mm:ss a'} ticking={true} />
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
