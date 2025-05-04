import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';

const Profile = ({ profile, onLogout }) => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f6fa' }}>
      <Paper elevation={6} sx={{ p: 4, minWidth: 320, maxWidth: 360, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Профиль
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          <b>Имя пользователя:</b> {profile.username}
        </Typography>
        {profile.email && (
          <Typography variant="subtitle1">
            <b>Email:</b> {profile.email}
          </Typography>
        )}
        <Button variant="outlined" color="secondary" sx={{ mt: 4 }} onClick={onLogout}>
          Выйти
        </Button>
      </Paper>
    </Box>
  );
};

export default Profile; 