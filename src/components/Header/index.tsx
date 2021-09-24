import React, { FC, useState, useEffect } from 'react';
import { useStyles } from './styles';
import Link from 'next/link';
import { useRouter } from 'next/router';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { Tab } from './styles';
import Tabs from '@mui/material/Tabs';
import Button from '@material-ui/core/Button';

const nameTabs = ['Home', 'Services', 'The Revolution', 'About Us', 'Contact Us'];
const routesTab = ['/', '/services', '/revolution', '/about', '/contact'];

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
  const [value, setValue] = useState<number>(0);
  const classes = useStyles();
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<unknown>, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    const index = routesTab.indexOf(router.pathname);
    if (index) {
      setValue(index);
    }
    console.log('worked, well, i think');
  }, [router]);

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
              textColor="inherit"
              onChange={handleChange}
              aria-label="nav menu"
              className={classes.tabContainer}
            >
              {nameTabs.map((name, index) => (
                <Tab
                  key={`id-${name}`}
                  label={name}
                  {...a11yProps(index)}
                  onClick={() => router.push(`${routesTab[index]}`)}
                />
              ))}
            </Tabs>
            <Link href="/estimate">
              <Button variant="contained" color="secondary" className={classes.button}>
                Free estimate
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar className={classes.toolbarMargin} />
    </>
  );
};

export default Header;
