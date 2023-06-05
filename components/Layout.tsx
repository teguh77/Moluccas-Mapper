import Container from '@mui/material/Container';
import Navbar from './Navbar';
import Footer from './Footer';
import Box from '@mui/material/Box';

type Props = {
  children?: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <Box
      style={{
        display: 'flex',
        background:
          'linear-gradient(0deg, rgba(38,59,64,1) 0%, rgba(35,34,40,1) 100%)',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <Navbar />
      <main style={{ width: '100%', position: 'relative', paddingTop: '3rem' }}>
        <Container
          maxWidth="lg"
          sx={{ paddingTop: '4rem', paddingBottom: '4rem' }}
        >
          {children}
        </Container>
        <Footer />
      </main>
    </Box>
  );
}
