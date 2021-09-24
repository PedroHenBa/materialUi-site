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
  },
  tabContainer: {
    marginLeft: 'auto',
  },
  logo: {
    height: '8em',
  },
  logoContainer: {
    padding: 0,
  },
  button: {
    borderRadius: '50px',
    margin: '0px 25px',
    ...theme.typography.estimate,
  },
}));
