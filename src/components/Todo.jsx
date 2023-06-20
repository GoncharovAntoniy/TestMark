import React, { useEffect, useState } from "react";
import s from "./Todo.module.scss";
import avatar from "../image/MenuTop/avatar.png";
import merge from "../image/columnTodo/merge.svg";
import compleate from "../image/columnTodo/buttonCompleate.svg";
import user from "../image/columnTodo/user.svg";
import plus from '../image/plus.svg'

const Todo = ({modalCardActivate, ...item }) => {
  const [subtask, setSubTask] = useState(false);
  const [taskId, setTaskId] = useState(1);
  const [tasks, setTasks] = useState("");
  const [storedTask, setStoredTask] = useState([]);
  const [time, setTime] = useState(0);
  const [timeBool, setTimeBool] = useState(false);

  const newTask = {
    id: taskId,
    todoId: item.id,
    title: tasks,
  };

  
  const timerId = item.id;

  useEffect(() => {
    const storedTime = localStorage.getItem(`timerTime_${timerId}`);

    if (storedTime) {
      setTime(parseInt(storedTime, 10));
    }
  }, []);
  useEffect(() => {
    const storedBoolean = localStorage.getItem(`timerActive_${timerId}`);

    if (storedBoolean) {
      setTimeBool(JSON.parse(storedBoolean));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(`timerTime_${timerId}`, time.toString());
  }, [time]);

  useEffect(() => {
    let intervalId = null;

    if (timeBool) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 3600000);
    } else {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [timeBool]);

  function timerActivate() {
    setTimeBool((prevBool) => {
      const upDateBool = !prevBool
      localStorage.setItem(`timerActive_${timerId}`, JSON.stringify(upDateBool))
      return upDateBool
      });
  }


  function newSubTaskAdd(event) {
    event.preventDefault();
    setTaskId(taskId + 1);
    setStoredTask((prevTask) => {
      const upDateTask = prevTask.concat(newTask);
      localStorage.setItem("tasks", JSON.stringify(upDateTask));
      return upDateTask;
    });

    setTasks("");
  }

  useEffect(() => {
    const storedTask = JSON.parse(localStorage.getItem("tasks"));
    if (storedTask) {
      setStoredTask(storedTask);
    }
  }, []);

  const [date, setDate] = useState(false);
  
  useEffect(() => {
    if (item.deadlineDay < new Date().getDate()) {
      setDate(true);
    }
  }, []);

  const subtaskActivate = () => {
    setSubTask(!subtask);
    
  };

  
  

  return (
    <div  className={s.todo}>
      <div className={s.todo_info}>
        <svg
          className={s.todo_info_compleate}
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill={item.completed ? `#8BC34A` : "none"}
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5.33333 7.5L6.77778 8.94444L9.66667 6.05555M14 7.5C14 8.35359 13.8319 9.19883 13.5052 9.98744C13.1786 10.7761 12.6998 11.4926 12.0962 12.0962C11.4926 12.6998 10.7761 13.1786 9.98744 13.5052C9.19883 13.8319 8.35359 14 7.5 14C6.64641 14 5.80117 13.8319 5.01256 13.5052C4.22394 13.1786 3.50739 12.6998 2.90381 12.0962C2.30022 11.4926 1.82144 10.7761 1.49478 9.98744C1.16813 9.19883 1 8.35359 1 7.5C1 5.77609 1.68482 4.12279 2.90381 2.90381C4.12279 1.68482 5.77609 1 7.5 1C9.22391 1 10.8772 1.68482 12.0962 2.90381C13.3152 4.12279 14 5.77609 14 7.5Z"
            stroke="#808080"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p id={item.id} onClick={(event) => modalCardActivate(event.currentTarget.id)} className={s.todo_info_title}>{item.title}</p>
      </div>
      <div className={s.todo_description}>
        <div className={s.todo_description_dedline}>
          <img
            className={s.todo_description_dedline_avatar}
            src={avatar}
            alt="icon"
          />
          <div className={s.todo_description_dedline_info}>
            <p className={s.todo_description_dedline_info_time}>
              {time} ч./{item.deadlineTime} ч.
            </p>
            <p
              className={
                date
                  ? `${s.todo_description_dedline_info_dayFalse}`
                  : `${s.todo_description_dedline_info_day}`
              }>
              до {`${item.deadlineDay} ${item.deadlineMonth}`}
            </p>
          </div>
        </div>
        <div className={s.todo_description_subtasks}>
          <div className={s.todo_description_subtasks_merge}>
            {storedTask.filter((idTask) => idTask.todoId === item.id).length}
            <img onClick={subtaskActivate} src={merge} alt="icon" />
          </div>
          <div className={timeBool ? `${s.todo_description_subtasks_play} ${s.playActive}`: `${s.todo_description_subtasks_play}`}>
            <svg
              onClick={timerActivate}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z"
                stroke="#4F6EA3"
                fill={timeBool ? "#4F6EA3" : "none"}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.752 11.168L11.555 9.03601C11.4043 8.93544 11.229 8.87771 11.048 8.86901C10.867 8.86031 10.687 8.90096 10.5274 8.98661C10.3677 9.07226 10.2342 9.19969 10.1414 9.35529C10.0485 9.51088 9.99961 9.6888 10 9.87001V14.133C9.99998 14.3141 10.0491 14.4917 10.1421 14.647C10.2352 14.8023 10.3686 14.9295 10.5282 15.0149C10.6879 15.1003 10.8677 15.1408 11.0485 15.132C11.2293 15.1232 11.4044 15.0655 11.555 14.965L14.752 12.833C14.889 12.7417 15.0013 12.618 15.0789 12.4728C15.1566 12.3277 15.1972 12.1656 15.1972 12.001C15.1972 11.8364 15.1566 11.6743 15.0789 11.5292C15.0013 11.3841 14.889 11.2603 14.752 11.169V11.168Z"
                stroke="#4F6EA3"
                fill="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
      {subtask ? (
        <>
          <div className={s.todo_tasks}>
            {storedTask
              .filter((idTask) => idTask.todoId === item.id)
              .map((item) => (
                <div className={s.subtask}>
                  <div className={s.todo_tasks_info}>
                    <img
                      className={s.todo_tasks_info_compleate}
                      src={compleate}
                      alt="icon"
                    />
                    <p className={s.todo_tasks_info_title}>{item.title}</p>
                  </div>
                  <img
                    className={s.todo_tasks_avatar}
                    src={avatar}
                    alt="icon"
                  />
                </div>
              ))}
          </div>
          <form onSubmit={newSubTaskAdd} className={s.todo_addTask}>
            <img src={plus} alt="icon" />
            <input
              value={tasks}
              onChange={(event) => setTasks(event.target.value)}
              className={s.todo_addTask_input}
              type="text"
              placeholder="Добавить подзадачу..."
            />
            
          </form>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Todo;
