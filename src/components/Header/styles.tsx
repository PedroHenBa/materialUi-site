import { styled, makeStyles } from '@material-ui/styles';
import TabComponent, { TabProps } from '@material-ui/core/Tab';

export const Tab = styled(({ ...other }: TabProps) => <TabComponent {...other} />)(({ theme }) => ({
  minWidth: 10,
  marginLeft: '25px',
  ...theme.typography.tab,
}));

export const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '3em',
  },
  tabContainer: {
    marginLeft: 'auto',
  },
}));
