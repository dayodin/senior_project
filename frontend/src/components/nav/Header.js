// Filename - Header.js
import * as React from "react";
import { NavLink } from "react-router-dom";

// importing material UI components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

export default function Header() {
	return (
		<AppBar position="static">
			<Toolbar>
                <nav>
                    <NavLink to='/manga' >
                        <Button  sx={{ m: 1, minWidth: 60 }} variant='contained'>
                            Manga
                        </Button>
                    </NavLink>
                    <NavLink to='manga/add_mult' >
                        <Button  sx={{ m: 1, minWidth: 60 }} variant='contained'>
                            Add Manga
                        </Button>
                    </NavLink>
                    <NavLink to='/deals' >
                        <Button  sx={{ m: 1, minWidth: 60 }} variant='contained'>
                            Deals
                        </Button>
                    </NavLink>
                </nav>
            </Toolbar>
		</AppBar>
	);
}
