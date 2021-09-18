import React, { FC, useState } from 'react';
import { useStyles } from './styles';
import logoIcon from '../../../public/assets/logo.svg';
import Image from 'next/image';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { Tab } from './styles';
import Tabs from '@material-ui/core/Tabs';

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
            <Image src={logoIcon} alt="company logo" height={110} width={380} />
            <Tabs value={value} onChange={handleChange} aria-label="nav menu" className={classes.tabContainer}>
              <Tab label="Home" {...a11yProps(0)} />
              <Tab label="Services" {...a11yProps(1)} />
              <Tab label="The Revolution" {...a11yProps(2)} />
              <Tab label="About Us" {...a11yProps(3)} />
              <Tab label="Contact Us" {...a11yProps(4)} />
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
