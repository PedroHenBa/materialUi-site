import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '3em',
  },
  tabContainer: {
    marginLeft: 'auto',
  },
  tab: {
    minWidth: 10,
    marginLeft: '25px',
    ...theme.typography.tab,
  },
}));
