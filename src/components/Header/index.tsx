import React, { FC, useState, useEffect } from 'react';
import { useStyles } from './styles';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Tab } from './styles';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Tabs from '@mui/material/Tabs';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import MenuIcon from '@material-ui/icons/Menu';

const tabServices = [
  { name: 'Services', route: '/services' },
  { name: 'Custom Software Development', route: '/customsoftware' },
  { name: 'Mobile App Development', route: '/mobileapps' },
  { name: 'Website Development', route: '/websites' },
];

interface Props {
  children: React.ReactElement;
}

function ElevationScroll(props: Props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Header: FC = (props) => {
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false);

  const theme = useTheme();
  const router = useRouter();
  const matches = useMediaQuery(theme.breakpoints.down('lg'));

  const openServiceMenu = Boolean(anchorEl);
  const classes = useStyles();
  const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const handleServicesClick = (event: React.SyntheticEvent, index: number) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    switch (router.pathname) {
      case '/':
        setValue(0);
        break;
      case '/services':
        setSelectedIndex(0);
        setValue(1);
        break;
      case '/revolution':
        setValue(2);
        break;
      case '/about':
        setValue(3);
        break;
      case '/contact':
        setValue(4);
        break;
      case '/estimate':
        setValue(5);
        break;
      case '/customsoftware':
        setSelectedIndex(1);
        setValue(1);
        break;
      case '/mobileapps':
        setSelectedIndex(2);
        setValue(1);
        break;
      case '/websites':
        setSelectedIndex(3);
        setValue(1);
        break;
      default:
        setValue(0);
    }
  }, [value, router]);

  const tabs = (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="inherit"
        aria-label="nav menu"
        className={classes.tabContainer}
      >
        <Tab label="Home" {...a11yProps(0)} onClick={() => router.push(`/`)} />
        <Tab
          {...a11yProps(1)}
          label="Services"
          id="tab-services"
          aria-haspopup="true"
          aria-controls="menu-services"
          aria-expanded={openServiceMenu ? 'true' : undefined}
          onMouseOver={(e) => handleClick(e)}
        />
        <Tab label="The Revolution" {...a11yProps(2)} onClick={() => router.push(`/revolution`)} />
        <Tab label="About Us" {...a11yProps(3)} onClick={() => router.push(`/about`)} />
        <Tab label="Contact Us" {...a11yProps(4)} onClick={() => router.push(`/contact`)} />
      </Tabs>
      <Button variant="contained" color="secondary" className={classes.button} onClick={() => router.push(`/estimate`)}>
        Free estimate
      </Button>

      <Menu
        id="menu-services"
        open={openServiceMenu}
        anchorEl={anchorEl}
        onClose={handleClose}
        classes={{ paper: classes.menu }}
        MenuListProps={{
          'aria-labelledby': 'tab-services',
          onMouseLeave: handleClose,
        }}
      >
        {tabServices.map((tab, index) => (
          <Link key={`key-${tab.route}`} href={tab.route} shallow={true}>
            <MenuItem
              selected={index === selectedIndex && value === 1}
              key={`key-${tab.route}`}
              onClick={(event) => {
                handleServicesClick(event, index);
                setValue(1);
              }}
              classes={{ root: classes.menuItem }}
            >
              {tab.name}
            </MenuItem>
          </Link>
        ))}
      </Menu>
    </>
  );

  const drawer = (
    <>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <List component="nav" aria-label="mobile-Menu" disablePadding>
          <Link href="/">
            <ListItemButton
              className={classes.drawerItem}
              divider
              selected={value === 0}
              onClick={(event) => handleChange(event, 0)}
            >
              <ListItemText disableTypography primary="Home" />
            </ListItemButton>
          </Link>
          <Link href="/services">
            <ListItemButton
              className={classes.drawerItem}
              divider
              selected={value === 1}
              onClick={(event) => handleChange(event, 1)}
            >
              <ListItemText disableTypography primary="Services" />
            </ListItemButton>
          </Link>
          <Link href="/revolution">
            <ListItemButton
              className={classes.drawerItem}
              divider
              selected={value === 2}
              onClick={(event) => handleChange(event, 2)}
            >
              <ListItemText disableTypography primary="The Revolution" />
            </ListItemButton>
          </Link>
          <Link href="/about">
            <ListItemButton
              className={classes.drawerItem}
              divider
              selected={value === 3}
              onClick={(event) => handleChange(event, 3)}
            >
              <ListItemText disableTypography primary="About Us" />
            </ListItemButton>
          </Link>
          <Link href="/contact">
            <ListItemButton
              className={classes.drawerItem}
              divider
              selected={value === 4}
              onClick={(event) => handleChange(event, 4)}
            >
              <ListItemText disableTypography primary="Contact Us" />
            </ListItemButton>
          </Link>
          <Link href="/estimate">
            <ListItemButton
              divider
              className={`${classes.drawerItemEstimate} ${classes.drawerItem}`}
              selected={value === 5}
              onClick={(event) => handleChange(event, 5)}
            >
              <ListItemText disableTypography primary="Free estimate" />
            </ListItemButton>
          </Link>
        </List>
      </SwipeableDrawer>
      <IconButton className={classes.drawerIconContainer} onClick={() => setOpenDrawer(!openDrawer)} disableRipple>
        <MenuIcon className={classes.drawerMenuIcon} />
      </IconButton>
    </>
  );

  return (
    <>
      <ElevationScroll {...props}>
        <AppBar position="fixed" color="primary">
          <Toolbar disableGutters>
            <Link href="/">
              <Button className={classes.logoContainer} disableRipple>
                <img src="/assets/logo.svg" alt="company logo" className={classes.logo} />
              </Button>
            </Link>
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar className={classes.toolbarMargin} />
    </>
  );
};

export default Header;
