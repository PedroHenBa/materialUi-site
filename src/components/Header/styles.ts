import { styled, makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

export const MyButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  height: 48,
  padding: '0 30px',
  color: theme.palette.common.white,
}));

export const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '3em',
  },
}));