import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Fab from '@material-ui/core/Fab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Card, CardTitle, CardText, Row, Col } from 'reactstrap';


function rand() {
    return Math.round(Math.random() * 30) - 20;
}

function getModalStyle() {
    const top = 75+ rand();
    const left = 75 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 750,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function ShowModel(props) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        console.log("react")
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <Row>
      <Col sm="6">
        <Card body>
    <CardTitle>{props.app.APP_NAME}</CardTitle>
    <CardText>{props.app.APP_DESC}</CardText>
        </Card>
      </Col>
    </Row>

    );

    return (
        <div>
            <Fab  aria-label="like" >
        <FavoriteIcon onClick= {handleOpen} />
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
