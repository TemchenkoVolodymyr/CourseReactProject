import {Helmet} from "react-helmet";
import React from 'react';

export const HelmetWrapper = ({ title }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        HelmetWrapper
      </Helmet>
    </>
  );
};