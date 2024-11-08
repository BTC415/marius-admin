// project import
import Navigation from './Navigation';
import SimpleBar from 'components/third-party/SimpleBar';
import { useSelector } from 'store';

// ==============================|| DRAWER CONTENT ||============================== //

const DrawerContent = () => {
  const menu = useSelector((state) => state.menu);
  const { drawerOpen } = menu;

  return (
    <SimpleBar
      sx={{
        '& .simplebar-content': {
          display: 'flex',
          flexDirection: 'column'
        }
      }}
    >
      <Navigation />
      {drawerOpen}
    </SimpleBar>
  );
};

export default DrawerContent;
