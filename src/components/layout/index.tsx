import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Header } from '../header';
import Container from '../container';
import { NavBar } from '../nav-bar';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUser } from '../../features/UserSlice';
import Profile from '../profile';
import { NavButton } from '../UI/nav-button';
import { MdNotificationsActive, MdNotificationsNone } from 'react-icons/md';

const Layout = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [newNotif, setNewNotif] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="bg-gradient-to-tr from-white to-indigo-50 min-h-screen justify-start">
      <Header />
      <Container>
        <div className="flex-2 p-4">
          <NavBar />
        </div>
        <div className="flex-1 p-4 w-1/3">
          <Outlet />
        </div>
        <div className="flex-col p-4 gap-2">
          <div className="flex-col flex gap-5">
            {!user && <Profile />}
            <NavButton
              href="notifications"
              icon={
                newNotif ? <MdNotificationsActive /> : <MdNotificationsNone />
              }
              className={
                newNotif ? ' border border-red-300 border-3 ' : 'bg-white'
              }
            >
              Уведомления
            </NavButton>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Layout;
