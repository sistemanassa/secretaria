import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";

import { urls } from "../../utils/urlUtils";

export const Menu = () => {
    return (
        <React.Fragment>
            <Typography variant="headline" component="h2">Menu</Typography>
            {
                Object.values(urls).map((url, index) => {
                    return (
                        <Button 
                            key={index} 
                            component={
                                props => <Link to={url.path} {...props}/>
                            }
                        >
                            {url.name}
                        </Button>
                    );
                })
            }
        </React.Fragment>
    )
};