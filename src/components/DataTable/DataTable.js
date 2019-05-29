import React from 'react';
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
} from '@material-ui/core';
import FirebaseService from '../../services/FirebaseService';
import { privateUrls } from '../../utils/urlUtils';

// eslint-disable-next-line react/prop-types
export const DataTable = ({ data }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  const remove = id => {
    FirebaseService.remove(id, 'leituras');
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <React.Fragment>
      <Toolbar
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="headline" component="h2">
          Cadastro de Atendimento
        </Typography>
      </Toolbar>

      <Table selectable="false">
        <TableHead>
          <TableRow>
            <TableCell>Key</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>CPF</TableCell>
            <TableCell>Matrícula</TableCell>
            <TableCell>Assunto</TableCell>
            <TableCell>E-mail</TableCell>
            <TableCell />
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.key}</TableCell>
                <TableCell>{item.nome}</TableCell>
                <TableCell>{item.cpf}</TableCell>
                <TableCell>{item.matricula}</TableCell>
                <TableCell>{item.assunto}</TableCell>
                <TableCell>{item.email}</TableCell>
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
                    // className={classes.button}
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
    </React.Fragment>
  );
};
