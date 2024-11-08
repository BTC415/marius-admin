// assets
import { RightOutlined } from '@ant-design/icons';

// ==============================|| OVERRIDES - ALERT TITLE ||============================== //

export default function AccordionSummary(theme) {
  const { palette, spacing } = theme;

  return {
    MuiAccordionSummary: {
      defaultProps: {
        expandIcon: <RightOutlined style={{ fontSize: '0.75rem' }} />
      },
      styleOverrides: {
        root: {
          backgroundColor: palette.secondary.lighter,
          flexDirection: 'row-reverse',
          minHeight: 46
        },
        expandIconWrapper: {
          '&.Mui-expanded': {
            transform: 'rotate(90deg)'
          }
        },
        content: {
          marginTop: spacing(1.25),
          marginBottom: spacing(1.25),
          marginLeft: spacing(1)
        }
      }
    }
  };
}
