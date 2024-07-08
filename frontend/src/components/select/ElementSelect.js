import React, { useState } from 'react';
import { FormControl, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ElementSelect = (props) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    return (
        <FormControl>
            <props.DropDown refresh={open} />    
            <Button sx={{ m: 1, minWidth: 240 }} variant="outlined" onClick={handleOpen}>{props.addText}</Button>
            <Modal
                open={open}
                onClose={handleOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} >
                    <props.AddForm handleOpen={handleOpen} />
                </Box>
            </ Modal>
        </FormControl>
    );
}

export default ElementSelect;