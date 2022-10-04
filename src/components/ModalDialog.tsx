import React from 'react';

interface ModalProps extends React.PropsWithChildren {
  id: string;
  title: string;
}

const ModalDialog: React.FC<ModalProps> = ({ id, title, children }) => {

  return (
    <div className="modal fade" id={id} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default ModalDialog;
  
