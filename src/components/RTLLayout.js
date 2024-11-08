import PropTypes from 'prop-types';
import { useEffect } from 'react';

// material-ui
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

// third-party
import rtlPlugin from 'stylis-plugin-rtl';

// project import
import { ThemeDirection } from 'config';
import useConfig from 'hooks/useConfig';

// ==============================|| RTL LAYOUT ||============================== //

const RTLLayout = ({ children }) => {
  const { themeDirection } = useConfig();

  useEffect(() => {
    document.dir = themeDirection;
  }, [themeDirection]);

  const cacheRtl = createCache({
    key: themeDirection === ThemeDirection.RTL ? 'rtl' : 'css',
    prepend: true,
    stylisPlugins: themeDirection === ThemeDirection.RTL ? [rtlPlugin] : []
  });

  return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
};

RTLLayout.propTypes = {
  children: PropTypes.node
};

export default RTLLayout;
