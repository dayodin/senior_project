import React, { useState } from "react";
import { Box, Card, CardHeader, Modal, CardMedia } from '@mui/material';
import { deleteData } from "../../helpers/apiHelpers";
import UpdateMangaForm from "./updates/UpdateMangaForm";
import UpdateDelete from "./settings/UpdateDelete";

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

const SeriesSubItem = (props) => {
    const [manga, setManga] = useState(props.value);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    const onClickDelete = async () => {
        deleteData(`manga/${props.value._id}`);
        props.refresh()
    }

    return (
        <React.Fragment>
            <Modal
                open={open}
                onClose={handleOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} >
                    <UpdateMangaForm manga={manga} setMangaItem={setManga} handleUpdate={handleOpen} />
                </Box>
            </ Modal>
            <Box sx={{ m: 1, minWidth: 250,  }}>  
                <Card variant="outlined" sx={{ m: 1, display: 'flex' }}>
                    <CardMedia
                        component="img"
                        sx={{ width: 150 }}
                        image={manga.image}
                        alt="cover"
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: "100%" }}>
                        <CardHeader 
                            action={
                                <UpdateDelete onDelete={onClickDelete} onUpdate={handleOpen} />
                            }
                            title={`Vol. ${manga.volume}`} 
                            subheader={`Market value: ${manga.market_value}`} />
                    </Box>
                </Card>
            </Box>
        </React.Fragment>
    )

}

export default SeriesSubItem;