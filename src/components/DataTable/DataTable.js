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
  Typography,
  IconButton,
  Toolbar,
} from '@material-ui/core';
import FirebaseService from '../../services/FirebaseService';
import { privateUrls } from '../../utils/urlUtils';

// eslint-disable-next-line react/prop-types
export const DataTable = ({ data }) => {
  const remove = id => {
    FirebaseService.remove(id, 'leituras');
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
          {data.map((item, index) => (
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
        </TableBody>
      </Table>
    </React.Fragment>
  );
};
