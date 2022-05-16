import { Modal, ModalProps } from '@restart/ui'
import { BaseModalProps, ModalHandle } from '@restart/ui/cjs/Modal'
import React, { Children } from 'react';
import '@sass/components/_modal.scss';

interface AppModal extends BaseModalProps, React.RefAttributes<ModalHandle> {
  preventBackdropClick?: boolean;
  size?: 'small' | 'medium' | 'large' | 'auto';
  width?: string | number;
}

enum ModalSizes {
  small = '550px',
  medium = '900px',
  large = '1100px'
}

interface IModalBody {
  size?: 'small' | 'medium' | 'large' | 'auto';
  width?: string | number;
}

function AppModal(props: AppModal & { children: any }) {
  const { width, size, preventBackdropClick = false, children, ...modalProps } = props;

  return (
    <Modal
      renderBackdrop={(_props) => {
        return <div {..._props} className='modal--backdrop'></div>
      }}
      className="AppModal"
      {...modalProps}>
      {children}
    </Modal>
  )
}

const ModalSizeBase = ({ size = 'small', children }: IModalBody & { children: any }) => {
  const modalSize = size !== 'auto' ? { minWidth: ModalSizes[size] } : {}
  return <div
    style={{ ...modalSize, width: '100%' }}
    className="modal--wrap">
    <div className="modal--content">
      <div className="modal--body" >
        {children}
      </div>
    </div>
  </div>

}

const ModalHead = (props) => {
  return <div className="modal--head">
    {props.children}
  </div>
}

AppModal.Head = ModalHead;
AppModal.Body = ModalSizeBase;

export default AppModal;