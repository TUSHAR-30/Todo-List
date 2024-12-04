//This function is used by FilterHeader.jsx file
export default function getValidDateFormat(startDate, endDate) {
    let computedStartDate, computedEndDate;

    if (startDate == null) {
        computedStartDate = null;
        computedEndDate = null;
        return "";
    }
    else if (startDate && endDate == null) {
        const d = new Date();
        endDate=d;
    }
    computedStartDate=computedDate(startDate),
    computedEndDate=computedDate(endDate)
    if(new Date(String(computedStartDate)) > new Date(String(computedEndDate))) return [computedEndDate,computedStartDate]
    return [computedStartDate,computedEndDate]
}

export function computedDate(incomingdate) {
    let date;
    if(!incomingdate){date=new Date()}
    else{date = new Date(incomingdate);} 
  

    // Extract the year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
    const day = String(date.getDate()).padStart(2, '0');

    // Format as "Year-Month-Date"
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate; // Output: "2024-10-30"
}

//convert YYYY-MM-DD (like 2024-02-20) to DD Month, YYYY (like 20 February, 2024) and currently this function is used by ProductDiscoveryResults.jsx file
export function convertDateFormat(dateString){
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
}

//It is used in Tasks.jsx file
export function filterTasksByDateRange(tasks, filterStartDate, filterEndDate) {
    if(filterStartDate=="")return tasks
    const startDate = new Date(filterStartDate);
    const endDate = new Date(filterEndDate);
    return tasks.filter(task => {
        const creationDate = new Date(task.taskCreationDate);
        return creationDate >= startDate && creationDate <= endDate;
    });
}

//It is used in Tasks.jsx file
export function sortedTasks_CreationDate_Descending(tasks){
    if(tasks.length == 0) return [];
    let result=tasks.sort((a, b) => new Date(b.taskCreationDate) - new Date(a.taskCreationDate));
    return result
}

//It is used in Tasks.jsx file
export function sortedTasks_Alphabatically_Ascending(tasks){
    if(tasks.length == 0) return [];
    let result=tasks.sort((a, b) => a.title.localeCompare(b.title));
    return result;
}