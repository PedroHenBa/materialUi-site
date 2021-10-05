import { makeStyles, styled } from '@material-ui/styles';
import TabComponent, { TabProps } from '@mui/material/Tab';

export const Tab = styled(({ ...other }: TabProps) => <TabComponent {...other} />)(({ theme }) => ({
  minWidth: 10,
  marginLeft: '20px',
  ...theme.typography.tab,
}));

export const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '3.4em',
    [theme.breakpoints.down('lg')]: {
      marginBottom: '2.4em',
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: '1.2em',
    },
  },
  tabContainer: {
    marginLeft: 'auto',
  },
  logo: {
    height: '8em',
    [theme.breakpoints.down('lg')]: {
      height: '7em',
    },
    [theme.breakpoints.down('sm')]: {
      height: '5em',
    },
  },
  logoContainer: {
    padding: 0,
  },
  button: {
    borderRadius: '50px',
    margin: '0px 20px',
    whiteSpace: 'nowrap',
    ...theme.typography.estimate,
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: theme.palette.common.white,
    borderRadius: '0',
  },
  menuItem: {
    '&.Mui-selected': {
      backgroundColor: 'rgba(0,0,0,0.09)',
    },
    opacity: 0.7,
    ...theme.typography.tab,
    '&:hover': {
      opacity: 1,
    },
  },
  drawerIconContainer: {
    marginLeft: 'auto',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  drawerMenuIcon: {
    height: '50px',
    width: '50px',
  },
  drawer: {
    backgroundColor: theme.palette.common.blue,
  },
  drawerItem: {
    '&.Mui-selected': {
      backgroundColor: 'rgba(0,0,0,0.09)',

      '& .MuiListItemText-root': {
        opacity: 1,
      },
    },
    ...theme.typography.tab,
    color: theme.palette.common.white,

    '& .MuiListItemText-root': {
      opacity: 0.7,
    },
  },
  drawerItemEstimate: {
    backgroundColor: theme.palette.common.orange,
  },
  appBar: {
    zIndex: theme.zIndex.modal + 1,
  },
}));
