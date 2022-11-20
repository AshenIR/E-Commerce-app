import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const MainListItems = ({ setHeader, setView }) => {

    return (
        <React.Fragment>
            <ListItemButton onClick={() => {
                setHeader('Categories')
                setView('ViewCategory')
            }}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Categories" />
            </ListItemButton>
            <ListItemButton onClick={() => {
                setHeader('Products')
                setView('ViewProduct')
            }}>
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Products" />
            </ListItemButton>
        </React.Fragment>
    )
};

export default MainListItems
