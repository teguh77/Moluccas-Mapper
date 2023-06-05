import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import LoginIcon from '@mui/icons-material/Login';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from './Link';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import Image from 'next/image';
import brand from '../public/images/shield.svg';

const pages = [
  { title: 'Home', link: '/' },
  { title: 'Maps', link: '/maps' },
  { title: 'Database', link: '/database' },
];

function ResponsiveAppBar() {
  const router = useRouter();
  const { status } = useSession();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      sx={{ top: 0, background: '#232228', marginBottom: '3rem' }}
      position="fixed"
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <TravelExploreIcon
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: "'Share Tech Mono', monospace",
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MOLUCCAS MAPPER
          </Typography>
          {/* </Link> */}

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map(({ title, link }) => (
                <Link
                  key={title}
                  href={link}
                  onClick={handleCloseNavMenu}
                  sx={{ textDecoration: 'none', color: '#fff' }}
                >
                  <MenuItem>
                    <Typography textAlign="center">{title}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <TravelExploreIcon
            sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: "'Share Tech Mono', monospace",
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MOLUCCAS MAPPER
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'flex-end',
              marginRight: '2rem',
            }}
          >
            {pages.map(({ title, link }) => (
              <Link
                key={title}
                href={link}
                onClick={handleCloseNavMenu}
                sx={{ textDecoration: 'none' }}
              >
                <Button
                  key={title}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {title}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {status !== 'authenticated' &&
              router.pathname !== '/auth/login' && (
                <Tooltip title="Login">
                  <IconButton
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                    style={{ marginRight: 0 }}
                    onClick={() => {
                      signIn();
                    }}
                  >
                    <LoginIcon color="primary" sx={{ width: 25, height: 25 }} />
                  </IconButton>
                </Tooltip>
              )}
            {status == 'authenticated' && router.pathname !== '/auth/login' && (
              <Tooltip title="Logout">
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  style={{ marginRight: 0 }}
                  onClick={() => {
                    signOut({ callbackUrl: '/auth/login' });
                  }}
                >
                  <ExitToAppIcon
                    color="primary"
                    sx={{ width: 25, height: 25 }}
                  />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
