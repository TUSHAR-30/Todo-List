import React, { useContext, useEffect, useState } from 'react'
import "./Greetings.css"
import {convertDateFormat} from "../../utils"
import {computedDate} from "../../utils"
import TasksContext from '../../Context/TasksContext';

function Greetings() {
  const [today,setToday]=useState(null);
  const { userProfile } = useContext(TasksContext);

  useEffect(() => {
    let temp;
    temp=convertDateFormat(computedDate());
    setToday(temp);
  }, [today])
  return (
    <div className='greetings'>
      <div className='greetings-message'>Good morning,<span className='username'>{userProfile?.name || "User"}</span></div>
      <div className='date'>{ today}</div>
    </div>
  )
}

export default Greetings