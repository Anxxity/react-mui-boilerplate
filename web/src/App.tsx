import React, { useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import FormatListBulletedAddIcon from '@mui/icons-material/FormatListBulletedAdd';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CloseIcon from '@mui/icons-material/Close';
import { useLocales } from './providers/LocaleProvider';
import { useVisibility } from './providers/VisibilityProvider';
import { fetchNui } from './utils/fetchNui';
import { isEnvBrowser } from './utils/misc';
import { WidthFull } from '@mui/icons-material';

function App() {
  const { locale } = useLocales();
  const { setVisible } = useVisibility();
  const [money, setMoney] = useState<number | null>(null);
  const [value, setValue] = React.useState(0);

  const labels = useMemo(
    () => ({
      title: locale.ui_playerMoney || 'Player Money',
      button: locale.ui_buttonText || 'Get Player Money',
      reset: locale.ui_reset || 'Reset',
    }),
    [locale]
  );




  const getMoney = async () => {
    try {
      const playerMoney = await fetchNui<number>('getPlayerMoney', {}, 2500);
      setMoney(playerMoney);
    } catch {
      // Keep UI responsive even if callback is not yet implemented server-side.
      setMoney(0);
    }
  };

  const closeUi = async () => {
    if (isEnvBrowser()) {
      setVisible(false);
      return;
    }

    await fetchNui('hide-ui');
  };

  return (
    <Box className="screen">
      <Paper elevation={8} className="panel">
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" fontWeight={700}>
            FiveM MUI Example
          </Typography>
          <Button variant="text" color="inherit" startIcon={<CloseIcon />} onClick={closeUi}>
            Close
          </Button>
        </Stack>

        <Alert severity="info" sx={{ mt: 2 }}>
          Open this panel with <strong>/showui</strong>. Press <strong>ESC</strong> to close.
        </Alert>

        <Stack spacing={2} sx={{ mt: 3 }}>
          <Typography variant="body1">{labels.title}</Typography>
          <Chip
            icon={<AttachMoneyIcon />}
            label={money === null ? 'Not loaded' : `$${money.toLocaleString()}`}
            color="primary"
            variant="outlined"
          />
          <Stack direction="row" spacing={1}>
            
            <Button variant="contained" onClick={getMoney}>
              {labels.button}
            </Button>
            <Button variant="outlined" onClick={() => setMoney(null)}>
              {labels.reset}
            </Button>
          </Stack>
         
        </Stack>
      </Paper>
    </Box>
  );
}

export default App;
