export class Notification{
    constructor(type,message){
        this.type=type;
        this.message=message
    }
    computeNotificationId(notifications){

        // If no tasks, start IDs from 1
        if (notifications.length === 0){
            this.id=1; 
            return this;
        } 

        let maxId = notifications[0].id;
        for (let i = 1; i < notifications.length; i++) {
            if (notifications[i].id > maxId) maxId = notifications[i].id;
        }
    
        this.id=maxId + 1; // Return new ID, incremented by 1
        return this;
    }
}