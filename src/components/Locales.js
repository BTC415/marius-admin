import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// third-party
import { IntlProvider } from 'react-intl';

// project import
import useConfig from 'hooks/useConfig';

// load locales files
const loadLocaleData = () => {
  return import('utils/locales/en.json');
};

// ==============================|| LOCALIZATION ||============================== //

const Locales = ({ children }) => {
  const { i18n } = useConfig();

  const [messages, setMessages] = useState();

  useEffect(() => {
    loadLocaleData(i18n).then((d) => {
      setMessages(d.default);
    });
  }, [i18n]);

  return (
    <>
      {messages && (
        <IntlProvider locale={i18n} defaultLocale="en" messages={messages}>
          {children}
        </IntlProvider>
      )}
    </>
  );
};

Locales.propTypes = {
  children: PropTypes.node
};

export default Locales;
