import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Tabs, Tab } from '@mui/material';

const Auth = ({ onAuth }) => {
  const [tab, setTab] = useState(0);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Введите имя пользователя');
      return;
    }
    if (tab === 1 && !email.trim()) {
      setError('Введите email');
      return;
    }
    // Сохраняем профиль в localStorage
    const profile = { username, email: tab === 1 ? email : '' };
    localStorage.setItem('mahaai_profile', JSON.stringify(profile));
    onAuth(profile);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f6fa' }}>
      <Paper elevation={6} sx={{ p: 4, minWidth: 320, maxWidth: 360 }}>
        <Typography variant="h5" align="center" gutterBottom>
          MAHA-AI
        </Typography>
        <Tabs value={tab} onChange={handleTabChange} centered sx={{ mb: 2 }}>
          <Tab label="Вход" />
          <Tab label="Регистрация" />
        </Tabs>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Имя пользователя"
            value={username}
            onChange={e => setUsername(e.target.value)}
            fullWidth
            margin="normal"
            autoFocus
          />
          {tab === 1 && (
            <TextField
              label="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              type="email"
            />
          )}
          {error && <Typography color="error" variant="body2">{error}</Typography>}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            {tab === 0 ? 'Войти' : 'Зарегистрироваться'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Auth; 