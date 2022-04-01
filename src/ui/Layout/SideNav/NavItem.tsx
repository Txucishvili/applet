import React from 'react';

export interface NavigationItem {
	path: string,
	name: string,
	icon: string | null,
	label: string,
}

interface Props {
	item: NavigationItem
}

const NavItem = (props: Props) => {
	const { name } = props.item;
	return <div className='navItem navItem--wrap'>
		<div className='navItem--el'>
			{props.item.icon}
		</div>
	</div>;
};

export default NavItem;
