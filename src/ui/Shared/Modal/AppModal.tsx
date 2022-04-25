import { Modal, ModalProps } from '@restart/ui'
import { ModalHandle } from '@restart/ui/cjs/Modal'
import React from 'react';
import '@sass/components/_modal.scss';

interface AppModal extends ModalProps, React.RefAttributes<ModalHandle> {
  preventBackdropClick?: boolean;
}

export default function AppModal(props: AppModal) {
  const { preventBackdropClick = false, ...modalProps } = props;

  console.log("appmodal")

  return (
    <Modal
      renderBackdrop={(_props) => {
        // console.log(_props);

        return <div {..._props} className='modal--backdrop'></div>
      }}
      className="AppModal"
      {...modalProps}>
      <div className="modal--wrap">
        <div className="modal--content">
          {props.children}
        </div>
      </div>
    </Modal>
  )
}
