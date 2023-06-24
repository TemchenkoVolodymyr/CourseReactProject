import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import Navigations from './Navigations';
import ProfileSection from "./ProfileSection";


const SectionNavigation = () => {

  const { isAuth, isAdmin } = useAuth();

  return (
    <>
      <Navigations isAuth={isAuth} isAdmin={isAdmin}></Navigations>
      <ProfileSection/>
    </>
  );
};

export default SectionNavigation;