import classNames from 'classnames';
import React, { createElement, HTMLAttributes, ReactElement } from 'react';

enum ContainerTypes {
}

type NumberAttr =
  | number
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12';

interface ICol {
  xs?: NumberAttr;
  sm?: NumberAttr;
  md?: NumberAttr;
  lg?: NumberAttr;
  xl?: NumberAttr;
  xxl?: NumberAttr;
  [key: string]: any;
}

interface IGridContainer {
  ['container']?: boolean;
  ['container-fluid']?: boolean;
  ['container-xl']?: boolean;
  ['container-xxl']?: boolean;
  ['container-sm']?: boolean;
  ['container-md']?: boolean;
  ['container-lg']?: boolean;
  [key: string]: any;
}

enum BreakPoints {
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
  xxl = 'xxl',
}

function Grid(props: IGridContainer & HTMLAttributes<any>) {
  const {className} = props;
  const containerTypes = Object.keys(props).filter(c => c.includes('container'));
  const hasOuter = containerTypes.includes('container-outer');

  let ReturnComponent;

  const ContainerTarget = <div className={classNames(containerTypes[containerTypes.length - 1], className)}>
    {props.children}
  </div>;

  if (hasOuter) {
    ReturnComponent = createElement('div', { className: 'container-outer' }, ContainerTarget);
  } else {
    ReturnComponent = ContainerTarget;
  }

  return ReturnComponent
}

function Row(props) {
  const containerClass = props.fluid;
  return (
    <div className={classNames('row')}>
      {props.children}
    </div>
  )
}

const useBpsClass = (bps) => {
  const _bps: any = [];
  Object.keys(bps).forEach(bp => {
    if (!!BreakPoints[bp]) {
      _bps.push(`col-${bp}-${bps[bp]}`)
    }
  })
  return _bps;
}


function Col(props: ICol) {
  const getBps = useBpsClass(props);

  return (
    <div className={classNames(getBps)}>
      {props.children}
    </div>
  )
}

Grid.Row = Row;
Grid.Col = Col;

export default Grid;