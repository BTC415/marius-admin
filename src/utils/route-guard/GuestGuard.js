import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// project import
import { APP_DEFAULT_PATH } from 'config';
import useAuth from 'hooks/useAuth';

// ==============================|| GUEST GUARD ||============================== //

const GuestGuard = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoggedIn) {
      navigate(location?.state?.from ? location?.state?.from : APP_DEFAULT_PATH, {
        state: {
          from: ''
        },
        replace: true
      });
    }
  }, [isLoggedIn, navigate, location]);

  return children;
};

GuestGuard.propTypes = {
  children: PropTypes.node
};

export default GuestGuard;
