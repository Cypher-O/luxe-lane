import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
    AppBar, Toolbar, Typography, Box, IconButton, InputBase, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import LogoutIcon from '@mui/icons-material/Logout';
import debounce from 'lodash.debounce';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const Navbar = ({ username, loading, onLogout, onSearch, onSearchError }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);

    const debouncedSearch = useMemo(
        () =>
            debounce((query) => {
                try {
                    onSearch(query);
                } catch (error) {
                    if (onSearchError) {
                        onSearchError(error);
                    }
                }
            }, 300),
        [onSearch, onSearchError]
    );

    const handleSearchChange = useCallback(
        (event) => {
            const query = event.target.value;
            setSearchQuery(query);
            if (query) {
                debouncedSearch(query);
            } else {
                onSearch('');
            }
        },
        [debouncedSearch, onSearch]
    );

    const handleClearSearch = useCallback(() => {
        setSearchQuery('');
        onSearch('');
    }, [onSearch]);

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    const handleLogoutClick = () => {
        setLogoutModalOpen(true);
    };

    const handleLogoutConfirm = () => {
        setLogoutModalOpen(false);
        onLogout();
    };

    const handleLogoutCancel = () => {
        setLogoutModalOpen(false);
    };

    return (
        <>
            <AppBar position="sticky" style={{marginBottom: 30}}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                        CatalogCraft
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search products…"
                            inputProps={{ 'aria-label': 'search' }}
                            value={searchQuery}
                            onChange={handleSearchChange}
                            endAdornment={
                                searchQuery && (
                                    <IconButton onClick={handleClearSearch} sx={{ color: 'inherit' }}>
                                        <ClearIcon />
                                    </IconButton>
                                )
                            }
                        />
                    </Search>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                        <Typography variant="subtitle1" sx={{ mr: 2 }}>
                            Hi, {username}!
                        </Typography>
                        <IconButton color="inherit" onClick={handleLogoutClick} disabled={loading}>
                            <LogoutIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" color="inherit">
                            <AccountCircle />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Dialog open={logoutModalOpen} onClose={handleLogoutCancel}>
                <DialogTitle>Confirm Logout</DialogTitle>
                <DialogContent>
                    <DialogContentText>Do you really want to logout?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleLogoutCancel} color="primary">
                        No
                    </Button>
                    <Button onClick={handleLogoutConfirm} color="primary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Navbar;
