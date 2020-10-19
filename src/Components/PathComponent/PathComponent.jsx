import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import {Link} from 'react-router-dom';
import {colors} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

function handleClick(event) {
    console.log(event);
}
const useStyles = makeStyles((theme) => ({

    labeltitle: {
        color:"black",
        display:"flex",
       textAlign:"center",
        backgroundColor:"lightgray",
        padding:10,
        borderRadius: 25
    },

}));

export default function PathComponent(props) {
    const classes = useStyles();
    return (
        <Breadcrumbs aria-label="breadcrumb" >
            {
                props.Path.map((r) => {
                    return(
                        <div key={props.Path.indexOf(r)}>
                            <label className={classes.labeltitle}>{r.PathName+":   "+ r.value}</label>
                        </div>
                    )
                })
            }

        </Breadcrumbs>
    );
}