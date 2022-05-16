import React from 'react';
import '@/sass/components/page-head.scss';

interface Props {
}

const PageHead = (props: any) => {
  const { children, title } = props;
  return <div className="page-head page-head--wrap">
    {children}
  </div>;
};

const PageHeadLeft = (props: any) => {
  const { children, title } = props;
  return <div className="page-head--left">
    {children}
  </div>;
};

const PageHeadRight = (props: any) => {
  const { children, title } = props;
  return <div className="page-head--right">
    {children}
  </div>;
};

const PageHeadTitle = (props: any) => {
  const { children, title } = props;
  return <div className="page-head--title">
    {children}
  </div>;
};

PageHead.Left = PageHeadLeft;
PageHead.Right = PageHeadRight;
PageHead.Title = PageHeadTitle;

export default PageHead;
