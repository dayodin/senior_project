import React, { useState } from 'react';
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
            <AuthorDropDown book={props.book} setId={props.setId} refresh={refresh} />
            <button onClick={onClickAddAuthor}>Add Author</button>
            { showAddAuthor ? <AddAuthorForm onAddAuthor={onAddAuthor} /> : null } 
        </React.Fragment>
    );
};

export default AuthorSelect;