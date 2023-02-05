import {AppBar, Toolbar, Typography} from '@mui/material';


import DehazeIcon from "@mui/icons-material/Dehaze";


export const Header = () => {
    return (
        <AppBar position="relative">
            <Toolbar>
                <DehazeIcon sx={{mr: 2}}/>
                <Typography variant="h6" color="inherit" noWrap>
                    Country
                </Typography>
            </Toolbar>
        </AppBar>
    );
};
