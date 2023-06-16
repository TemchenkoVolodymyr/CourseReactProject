import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const MySkeleton = () => {
  return (
    <SkeletonTheme baseColor="#000" highlightColor="#444" width={200} height={200}>
      <Skeleton circle={true}/>
    </SkeletonTheme>
  );
};

export default MySkeleton;