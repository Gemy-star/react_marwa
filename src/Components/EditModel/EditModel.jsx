 import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import EditForm from '../EditForm/EditForm';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function EditModel(props) {

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [app, setApp] = React.useState(props.app);


  const handleOpen = () => {
    setOpen(true);
    sessionStorage.setItem("pro", props.app.APP_ID)
    //alert(props.app.APP_ID)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
        <EditForm  currentPage={props.currentPage}  app ={app} handleEdit = {props.onClick} onclose={handleClose}/>
    );

  return (
    <div>
         <Fab color="info" aria-label="add" onClick={handleOpen}>
  <EditIcon  />
</Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
