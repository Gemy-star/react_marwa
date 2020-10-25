import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import {Link, NavLink} from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        color:"#da4482",
    },
    navclass:{
        margin:10,
        color:"white",
    }
}));
function handleClick(event) {
    console.log(event);
}

export default function BreadCrumbComp(props) {
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);

    };

    return (
        <div>


            <div className={classes.root}>

                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            <Breadcrumbs aria-label="breadcrumb">
                                {
                                    props.routes.map((r) => {
                                        return(
                                            <div key={props.routes.indexOf(r)}>
                                                <Link className={classes.title} to={{
                                                    pathname: r.routePath,
                                                    state: { fromDashboard: true }
                                                }} onClick={handleClick}>
                                                    {r.routeName}
                                                </Link>

                                            </div>
                                        )
                                    })
                                }

                            </Breadcrumbs>
                        </Typography>

                            <NavLink className={classes.navclass} to="/CRUDTYPES" >CRUD_TYPES  </NavLink>
                            <NavLink className={classes.navclass}  to="/DependancyTypePage" >DEPENDANCY_TYPES</NavLink>
                            <NavLink className={classes.navclass} to="/ReturnTypePage" >Return_Type</NavLink>

                            <NavLink className={classes.navclass} to="/CompTypePage" >Comp_Type_Page</NavLink>

                        {auth && (
                            <div>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={handleClose}
                                >


                                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={handleClose}>My account</MenuItem>
                                </Menu>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        </div>
    );
}