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
  const open = Boolean(anchorEl);
  const classes = useStyles();
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(0);

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
                aria-expanded={open ? 'true' : undefined}
                onMouseOver={(e) => handleClick(e)}
              />
              <Tab label="The Revolution" {...a11yProps(2)} onClick={() => router.push(`/revolution`)} />
              <Tab label="About Us" {...a11yProps(3)} onClick={() => router.push(`/about`)} />
              <Tab label="Contact Us" {...a11yProps(4)} onClick={() => router.push(`/contact`)} />
            </Tabs>

            <Link href="/estimate">
              <Button variant="contained" color="secondary" className={classes.button}>
                Free estimate
              </Button>
            </Link>

            <Menu
              id="menu-services"
              open={open}
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
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar className={classes.toolbarMargin} />
    </>
  );
};

export default Header;
