import React from 'react';
import styles from '../UserProfile.module.scss';
import FiltersComponent from '../FiltersComponent/FiltersComponent';

const NavComponentsHeader = ({ title, showFilters }) => {
  return (
    <section className={styles.titleHeader}>
      <h2>{title}</h2>
      {showFilters && <FiltersComponent/>}

    </section>
  );
};

export default NavComponentsHeader;