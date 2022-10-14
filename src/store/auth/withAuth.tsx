import React from 'react';
import { Navigate } from 'react-router-dom';
import Container from '../../components/Container';
import { getAuth, logout, storeAuthentication } from './auth';

export const withAuth = (Component: React.FC): React.FC => {
  const AuthRoute: React.FC = () => {
    const isAuth = !!getAuth();

    if (isAuth) {
      return (
        <Container>
          <Component />
        </Container>
      );
    }
    return <Navigate to="/login" />

  }

  return AuthRoute;
}
