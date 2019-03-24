import React from 'react';
import { Link } from "react-router-dom";
import { Icon, Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core";
import FirebaseService from "../../services/FirebaseService";
import { privateUrls } from "../../utils/urlUtils";

export const DataTable = ({data}) => {
    const remove = (id) => {
        FirebaseService.remove(id, 'leituras');
    };

    return <React.Fragment>
        <Typography variant="headline" component="h2">Cadastro de Atendimento</Typography>
        <Table selectable="false">
            <TableHead>
                <TableRow>
                    <TableCell>Key</TableCell>
                    <TableCell>Temperature</TableCell>
                    <TableCell>Humidity</TableCell>
                    <TableCell>Client</TableCell>
                    <TableCell>Data</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    data.map((item, index) =>
                        <TableRow key={index}>
                            <TableCell>{item.key}</TableCell>
                            <TableCell>{item.temperatura}</TableCell>
                            <TableCell>{item.umidade}</TableCell>
                            <TableCell>{item.cliente}</TableCell>
                            <TableCell>{item.data}</TableCell>
                            <TableCell>
                                <Button  
                                    variant="contained" 
                                    component={
                                        props => <Link to={privateUrls.edit.pathWithouParam + item.key} 
                                        {...props}/>
                                    }
                                >
                                    <Icon>edit</Icon>
                                    {/* Edit */}
                                </Button>

                                <Button  
                                    variant="contained"
                                    onClick={() => remove(item.key)}
                                >
                                    <Icon>close</Icon>
                                    {/* Remove */}
                                </Button>
                            </TableCell>
                        </TableRow>
                    )
                }
            </TableBody>
        </Table>
    </React.Fragment>
};