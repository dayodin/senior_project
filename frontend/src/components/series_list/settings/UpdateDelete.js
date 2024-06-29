import React, { useState } from "react";
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Card from '@mui/material/Card';
import CardActions from "@mui/material/CardActions";
import { Button } from "@mui/material";
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';

const UpdateDelete = (props) => {
    const [open, setOpen] = useState(false);
    const [anchor, setAnchor] = useState(null);
    
    const handleClick = (event) => {
        setAnchor(anchor ? null : event.currentTarget);
        setOpen(!open);
    };

    const id = open ? 'simple-popper' : undefined;

    return (
        <React.Fragment>
            <IconButton aria-label="settings" onClick={handleClick}>
                <MoreVertIcon sx={{ }} />
            </IconButton>
            <BasePopup id={id} open={open} anchor={anchor}>
                <Card>
                        <CardActions>
                            <Button sx={{ }} variant="outlined" size="small">Update</Button>
                        </CardActions>
                        <CardActions>
                            <Button sx={{ mt: -1, color: "red" }} size="small" onClick={props.onDelete}>Delete</Button>
                        </CardActions>
                </Card>
            </BasePopup>
        </React.Fragment>
    );
}

export default UpdateDelete;