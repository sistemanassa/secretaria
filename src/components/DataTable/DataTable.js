import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  IconButton,
  Toolbar,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import FirebaseService from '../../services/FirebaseService';
import { privateUrls } from '../../utils/urlUtils';

const styles = {
  btn: {
    textTransform: 'none',
    padding: '1px 5px',
    width: '5em',
    minHeight: '1em',
    display: 'block',
    textAlign: 'center',
    lineHeight: '2',
    boxShadow:
      '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  btnGreen: {
    backgroundColor: 'green',
    color: '#fff',
  },
  btnRed: {
    backgroundColor: 'red',
    color: '#fff',
  },
  btnYellow: {
    backgroundColor: '#ffba01',
    color: '#000',
  },
  btnBlack: {
    backgroundColor: '#000',
    color: '#fff',
  },
};

// eslint-disable-next-line react/prop-types
const DataTable = ({ data }) => {
  const [value, setValue] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  const remove = id => {
    FirebaseService.remove(id, 'leituras/aguardando');
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRadio = event => {
    setValue(event.target.value);
  };

  return (
    <div>
      <Toolbar
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h5" component="h2">
          Cadastro de Atendimento
        </Typography>
      </Toolbar>

      <Table selectable="false">
        <TableHead>
          <TableRow>
            {/* <TableCell>Key</TableCell> */}
            <TableCell></TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>CPF</TableCell>
            <TableCell>Matrícula</TableCell>
            <TableCell>Assunto</TableCell>
            <TableCell>E-mail</TableCell>
            <TableCell>Status</TableCell>
            <TableCell />
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item, index) => (
              <TableRow key={index}>
                {/* <TableCell>{item.key}</TableCell> */}
                <TableCell>
                  <FormControl
                    component="fieldset"
                    className={styles.formControl}
                  >
                    <RadioGroup
                      aria-label="gender"
                      name="gender2"
                      className={styles.group}
                      value={value}
                      onChange={handleChangeRadio}
                    >
                      <FormControlLabel
                        value="item"
                        control={<Radio color="primary" />}
                        // label="Female"
                        labelPlacement="start"
                      />
                    </RadioGroup>
                  </FormControl>
                </TableCell>
                <TableCell>{item.nome}</TableCell>
                <TableCell>{item.cpf}</TableCell>
                <TableCell>{item.matricula}</TableCell>
                <TableCell>{item.assunto}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell style={{ padding: '4px' }}>
                  <IconButton
                    aria-label="Edit"
                    color="primary"
                    title="Editar"
                    component={props => (
                      <Link
                        to={privateUrls.edit.pathWithouParam + item.key}
                        {...props}
                      />
                    )}
                  >
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell style={{ padding: '4px' }}>
                  <IconButton
                    aria-label="Delete"
                    color="primary"
                    title="Remover"
                    onClick={() => remove(item.key)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 49 * emptyRows }}>
              <TableCell colSpan={8} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
};

DataTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DataTable);
