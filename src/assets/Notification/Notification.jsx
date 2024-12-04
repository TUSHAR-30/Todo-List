import React from 'react'
import { GrStatusGood } from "react-icons/gr";
import { IoIosCloseCircleOutline } from "react-icons/io";
import "./Notification.css"
import useNotification from '../../Hooks/useNotification';
function Notification() {
  const [notifications, closeNotification] = useNotification();

  return (
    <div className="notification-container">
      {
        notifications.map((item) => {
          return (
            <div className='notification-item' key={item.id}>
              {/* <GrStatusGood size={20} /> */}
              <span>{item.message}</span>
              <IoIosCloseCircleOutline className='notification-closeicon' onClick={() => closeNotification(item.id)} size={23} />
            </div>
          )
        })
      }
    </div>
  )
}

export default Notification