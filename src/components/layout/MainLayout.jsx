import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import { useUIStore } from '../../store/useUIStore.js';

export default function MainLayout() {
  const { pathname, hash } = useLocation();
  const notification = useUIStore((state) => state.notification);
  const hideNotification = useUIStore((state) => state.hideNotification);

  // Restore scroll position on route change or scroll to hash section
  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname, hash]);

  return (
    <div className="min-h-screen flex flex-col bg-surface text-body">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />

      {/* Centralized User Feedback Toast */}
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={hideNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={hideNotification}
          severity={notification.severity || 'success'}
          variant="filled"
          sx={{
            borderRadius: '16px',
            fontWeight: 600,
            boxShadow: '0 12px 28px rgba(34, 34, 34, 0.18)',
          }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
