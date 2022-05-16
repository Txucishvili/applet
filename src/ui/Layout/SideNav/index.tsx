import { NavigationStore } from '@/services/NavigationService';
import React, { useEffect } from 'react';
import { Link, LinkProps, NavLink, useMatch, useResolvedPath } from 'react-router-dom';
import NavItem from './NavItem';
import WidgetsSide from '../Widgets/WidgetsSide';

interface Props {
  isOpen: boolean
  children: any;
}

function CustomLink({ children, to, ...props }: LinkProps) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <div>
      <Link
        className={match ? 'active' : ''}
        to={to}
        {...props}
      >
        {children}
      </Link>
    </div>
  );
}



const SideNav: React.FC<Props> = (props: Props) => {
  const [navList, setNavList]: any = NavigationStore.use();

  useEffect(() => {
  }, [navList])

  return (
    <div className="side-nav side-nav--wrap">
      <div className="logo logo--wrap">
        <div className="logo--el">
          {/* {SharedIconList.dots} */}
        </div>
      </div>
      <div className="side-nav--side">
        <div className="side-nav--list">
          {!!navList.list.length ? navList.list.map((item, key) => {
            return <CustomLink key={key} to={item.path}><NavItem item={item} /></CustomLink>
          }) : null}
        </div>
      </div>
      <WidgetsSide />
    </div>
  );
};

export default SideNav;
