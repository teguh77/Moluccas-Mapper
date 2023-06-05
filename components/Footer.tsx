import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'inherit',
        width: '100%',
        marginBottom: '3rem',
        display: 'flex',
        justifyItems: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="textSecondary" align="center">
          {'© KPPBC TMP C Ambon '}
          {new Date().getFullYear()}
        </Typography>
      </Container>
    </footer>
  );
}
