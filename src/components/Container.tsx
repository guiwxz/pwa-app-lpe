import React from 'react';

const Container: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div style={{ display: 'flex', margin: '1vw 10vw 0 10vw', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
        {children}
      </div>
    </div>
  )
}

export default Container;