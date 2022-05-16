import { useRootClose } from '@restart/ui';
import React, { cloneElement, createElement, useEffect, useRef, useState } from 'react'
import { getChildrenByType } from 'react-nanny';
import Button from '../Button/Button';

export function DropDownDropper(props) {
  return (
    <div>
      {props.children}
    </div>
  )
}

export function DropDownBody(props) {
  return (
    <div>
      {props.children}
    </div>
  )
}


export function DropDown(props): any {
  const {open = false} = props;
  const ref: any = useRef();
  const [show, setShow] = useState(open);
  const handleRootClose = () => setShow(false);
  const DroperBody = getChildrenByType(props.children, [DropDownBody])[0];
  const Dropper: any = getChildrenByType(props.children, DropDownDropper)[0];

  useRootClose(ref, handleRootClose, {
    disabled: !show,
  });

  const DropperEl: any = (): JSX.Element => {
    return createElement('div', {onClick: () => setShow(true)}, <div>{Dropper}</div>);
  }

  return (
    <div>
      <DropperEl />
      {show && (
        <div
          ref={ref}
        >
          {DroperBody}
        </div>
      )}
    </div>
  )
};

// Object.defineProperties(DropDown, {
//   Body: {
//     configurable: true,
//     enumerable: true,
//     value: DropDownBody,
//     writable: true,
//   },
//   Dropper: {
//     configurable: true,
//     enumerable: true,
//     value: DropDownDropper,
//     writable: true,
//   }
// });

DropDown.Body = DropDownBody;
DropDown.Dropper = DropDownDropper;


export default DropDown;
