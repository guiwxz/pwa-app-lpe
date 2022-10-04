import { useEffect, useState } from "react";

const Alert: React.FC<{ alert: { status: string, message: string } }> = ({ alert }) => {

  const [exibir, setExibir] = useState(false);

  const handleClassName = () => {
    if (alert.status === 'error') {
      return 'alert alert-danger'
    }
      
    return 'alert alert-success'
    
  }

  useEffect(() => {
    setExibir(true);

    const id = setTimeout(() => {
      setExibir(false);
    }, 5000);

    return () => clearTimeout(id);

  }, [alert]);

  return (
    <div>
      {(alert.message.length > 0 && exibir) &&
        <div className={handleClassName()} role="alert">
          {alert.message}
        </div>
      }
    </div>
  )

}

export default Alert;