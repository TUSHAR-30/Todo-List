import { useContext } from 'react'
import NotificationContext from '../Context/NotificationContext';
import {Notification} from "../Classes/NotificationClass";

function useNotification() {
    const { notifications, setNotifications } = useContext(NotificationContext)

    function closeNotification(notificationId) {
        setNotifications((prevNotifications) => prevNotifications.filter((noti) => noti.id !== notificationId));
    }

    function addNotification(type,message) {
        const newNotification=new Notification(type,message);
        newNotification.computeNotificationId(notifications);
        setNotifications((prevNotifications)=>[newNotification,...prevNotifications])
        
        setTimeout(() => {
            setNotifications((prevNotifications) => prevNotifications.filter((noti) => noti.id !== newNotification.id));
        }, 4000);
    }

    return [notifications, closeNotification, addNotification]
}

export default useNotification