import React, { FC, useState, useEffect, useRef } from 'react';
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

  const tabServices = useRef([
    { name: 'Services', route: '/services', value: 1 },
    { name: 'Custom Software Development', route: '/customsoftware', index: 0 },
    { name: 'Mobile App Development', route: '/mobileapps', index: 1 },
    { name: 'Website Development', route: '/websites', index: 2 },
  ]);

  const menuItems = useRef([
    { name: 'Home', route: '/', value: 0 },
    {
      name: 'Services',
      route: '/services',
      value: 1,
      ariaHaspopup: openServiceMenu ? true : undefined,
      ariaControls: 'menu-services',
      ariaExpanded: openServiceMenu ? true : undefined,
      onMouseOver: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => handleClick(e),
      id: 'tab-services',
    },
    { name: 'The Revolution', route: '/revolution', value: 2 },
    { name: 'About Us', route: '/about', value: 3 },
    { name: 'Contact Us', route: '/contact', value: 4 },
  ]);

  useEffect(() => {
    [...tabServices.current, ...menuItems.current].forEach((itemMenu) => {
      if (router.pathname === itemMenu.route) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (itemMenu?.index) {
          setValue(1);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          setSelectedIndex(itemMenu.index);
          return;
        } else {
          setValue(itemMenu.value as number);
          return;
        }
      }
    });
  }, [value, router, tabServices, menuItems]);

  const tabs = (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="inherit"
        aria-label="nav menu"
        className={classes.tabContainer}
      >
        {menuItems.current.map((menuItem) => {
          return (
            <Tab
              key={`id-${menuItem.name}`}
              label={menuItem.name}
              onClick={() => router.push(`${menuItem.route}`)}
              id={menuItem.id}
              aria-haspopup={menuItem.ariaHaspopup}
              aria-controls={menuItem.ariaControls}
              aria-expanded={menuItem.ariaExpanded}
              onMouseOver={() => menuItem.onMouseOver}
            />
          );
        })}
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
        keepMounted
      >
        {tabServices.current.map((tab, index) => (
          <Link key={`id-${tab.route}`} href={tab.route} shallow={true}>
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
        <div className={classes.toolbarMargin} />
        <List component="nav" aria-label="mobile-Menu" disablePadding>
          {menuItems.current.map((menuItem, index) => {
            return (
              <Link href={menuItem.route} key={`id-${menuItem.name}`}>
                <ListItemButton
                  className={classes.drawerItem}
                  divider
                  selected={value === menuItem.value}
                  onClick={(event) => handleChange(event, menuItem.value)}
                >
                  <ListItemText disableTypography primary={menuItem.name} />
                </ListItemButton>
              </Link>
            );
          })}
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
        <AppBar position="fixed" color="primary" className={classes.appBar}>
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
