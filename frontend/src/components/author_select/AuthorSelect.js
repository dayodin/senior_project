import React, { useState } from 'react';
import { Button, FormControl } from '@mui/material';
import AuthorDropDown from './AuthorDropDown.js';
import AddAuthorForm from './AddAuthorForm';

const AuthorSelect = (props) => {
    const [showAddAuthor, setShowAddAuthor] = useState(false);
    const [refresh, setRefresh] = useState(0);

    const onClickAddAuthor = () => setShowAddAuthor(!showAddAuthor);

    const onAddAuthor = () => {
        setRefresh(refresh + 1);
        onClickAddAuthor();
    }

    return (
        <React.Fragment>
            <FormControl>
                <AuthorDropDown book={props.book} setId={props.setId} refresh={refresh} />
                <Button sx={{ m: 1, minWidth: 240 }} variant="outlined" onClick={onClickAddAuthor}>Add Author</Button>
                { showAddAuthor ? <AddAuthorForm onAddAuthor={onAddAuthor} /> : null } 
            </FormControl>
        </React.Fragment>
    );
};

export default AuthorSelect;