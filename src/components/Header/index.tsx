import React, { FC, useState } from 'react';
import { useStyles } from './styles';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

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
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<unknown>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <ElevationScroll {...props}>
        <AppBar position="fixed" color="primary">
          <Toolbar disableGutters>
            <img src="/assets/logo.svg" alt="company logo" className={classes.logo} />
            <Tabs
              value={value}
              textColor="inherit"
              onChange={handleChange}
              aria-label="nav menu"
              className={classes.tabContainer}
            >
              <Tab label="Home" {...a11yProps(0)} className={classes.tab} />
              <Tab label="Services" {...a11yProps(1)} className={classes.tab} />
              <Tab label="The Revolution" {...a11yProps(2)} className={classes.tab} />
              <Tab label="About Us" {...a11yProps(3)} className={classes.tab} />
              <Tab label="Contact Us" {...a11yProps(4)} className={classes.tab} />
            </Tabs>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar className={classes.toolbarMargin} />
      asdasddasdas
    </>
  );
};

export default Header;
