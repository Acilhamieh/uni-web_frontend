import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  styled,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import EventIcon from '@mui/icons-material/Event';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import BookIcon from '@mui/icons-material/Book';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import WorkIcon from '@mui/icons-material/Work';
import GroupIcon from '@mui/icons-material/Group';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open, isMobile }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: isMobile ? 0 : `-${drawerWidth}px`,
    width: '100%',
    minHeight: '100vh',
    overflow: 'auto',
    ...(open && !isMobile && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open, isMobile }) => ({
  backgroundColor: '#fff',
  color: 'var(--main-color2)',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  zIndex: theme.zIndex.drawer + 1,
  ...(open && !isMobile && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const menuItems = [
  { text: 'Users', icon: <PeopleIcon />, path: 'users' },
  { text: 'Courses', icon: <SchoolIcon />, path: 'courses' },
  { text: 'Sessions', icon: <EventIcon />, path: 'sessions' },
  { text: 'Doctors', icon: <LocalLibraryIcon />, path: 'doctors' },
  { text: 'References', icon: <BookIcon />, path: 'references' },
  { text: 'News', icon: <NewspaperIcon />, path: 'news' },
  { text: 'Projects', icon: <WorkIcon />, path: 'projects' },
  { text: 'Trainees', icon: <GroupIcon />, path: 'trainees' },
];

export default function AdminLayout({ children }) {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (isMobile) {
      setOpen(false);
    }
  }, [isMobile]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(`/admin/${path}`);
    if (isMobile) {
      setOpen(false);
    }
  };

  // Get the current path without the leading slash
  const currentPath = location.pathname.split('/').pop();

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <StyledAppBar position="fixed" open={open} isMobile={isMobile}>
        <Toolbar sx={{ 
          minHeight: { xs: '64px', sm: '70px' },
          display: 'flex',
          justifyContent: 'space-between',
          px: { xs: 2, sm: 3 }
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ 
                mr: 0,
                ...(open && !isMobile && { display: 'none' }),
                '&:hover': {
                  backgroundColor: 'rgba(13, 92, 145, 0.04)'
                }
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography 
              variant="h6" 
              noWrap 
              component="div" 
              className="medium-heading"
              sx={{
                fontSize: { xs: '1.1rem', sm: '1.3rem' },
                fontWeight: 600,
                color: 'var(--main-color2)',
                letterSpacing: '0.5px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              University Admin Dashboard
            </Typography>
          </Box>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2 
          }}>
            {/* Add any header actions here like notifications, profile, etc. */}
          </Box>
        </Toolbar>
      </StyledAppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#fff',
            color: 'var(--main-color2)',
            borderRight: '1px solid rgba(0, 0, 0, 0.08)',
            '& .MuiListItemButton-root': {
              borderRadius: '8px',
              mx: 1,
              my: 0.5,
              '&:hover': {
                backgroundColor: 'rgba(13, 92, 145, 0.04)',
                '& .MuiListItemIcon-root': {
                  color: 'var(--main-color2)',
                },
              },
              '&.Mui-selected': {
                backgroundColor: 'rgba(13, 92, 145, 0.08)',
                color: 'var(--main-color2)',
                '&:hover': {
                  backgroundColor: 'rgba(13, 92, 145, 0.12)',
                },
                '& .MuiListItemIcon-root': {
                  color: 'var(--main-color2)',
                },
              },
            },
            '& .MuiListItemIcon-root': {
              color: 'var(--main-color2)',
              minWidth: '45px',
            },
            '& .MuiDivider-root': {
              borderColor: 'rgba(0, 0, 0, 0.08)',
            },
          },
        }}
        variant={isMobile ? "temporary" : "persistent"}
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <DrawerHeader sx={{
          minHeight: { xs: '64px', sm: '70px' },
          px: 2,
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              color: 'var(--main-color2)',
            }}
          >
            Menu
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <List sx={{ p: 1 }}>
          {menuItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                selected={currentPath === item.path}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  primaryTypographyProps={{
                    sx: {
                      fontWeight: currentPath === item.path ? 600 : 400,
                    }
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open} isMobile={isMobile}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
} 