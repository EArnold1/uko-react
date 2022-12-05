import { Fragment, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

// component props interface
interface GuestGuardProps {
  children: ReactNode;
}
const GuestGuard = ({ children }: GuestGuardProps) => {
  if (localStorage.getItem('authToken')) {
    return <Navigate to="/dashboard" />;
  }

  return <Fragment>{children}</Fragment>;
};

export default GuestGuard;
