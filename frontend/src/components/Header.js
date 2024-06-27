// Filename - Header.js

import * as React from "react";
import { NavLink } from "react-router-dom";

// importing material UI components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { FormControl } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default function Header() {
	return (
		<AppBar position="static">
			<Toolbar>
                <nav>
                    {/* <Button  sx={{ m: 1, minWidth: 60 }} variant='contained'>
                        <NavLink to='/manga' style={({ isActive }) => ({
                                color: isActive
                                    ? "grey"
                                    : "white",
                                textDecoration: 'none'
                            })}>Add Manga</NavLink>
                    </Button>
                    <Button sx={{ m: 1, minWidth: 60 }} variant='contained'>
                        <NavLink to='/deals' style={({ isActive }) => ({
                                color: isActive
                                    ? "grey"
                                    : "white",
                                textDecoration: 'none'
                            })}>Deals</NavLink>
                    </Button> */}
                    <NavLink to='/manga' >
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
