import classNames from "classnames";
import React from "react";

// 
interface IMenu {
  type?: 'lined' | 'simple';
}

interface IMenuItem {
  color?: any;
}

const Menu = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, any> & IMenu) => {
  const { children, type } = props;

  let _classNames = {
    'menu-list menu-list--wrap': true,
    [`type-${type}`]: !!type
  };


  return <div className={
    classNames(_classNames)
  }>
    {children}
  </div>
}

const ListItem = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, any> & IMenuItem) => {
  const { color, children, className, ...otherProps } = props;
  return <div className={classNames('menu-list--item', className)} {...otherProps}>
    {children}
  </div>
}

Menu.ListItem = ListItem;

export default Menu;