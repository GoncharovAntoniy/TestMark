import s from "./Column.module.scss";
import addTodo from "../image/kanbanColumn/addTodo.svg";
import settingColumn from "../image/kanbanColumn/settingColumn.svg";
import Todo from "./Todo";
import { useEffect, useState } from "react";

const Column = ({modalCardActivate, ...item }) => {
  const [todo, setTodo] = useState([]);
  const [currentTaskId, setCurrentTaskId] = useState(0);
  const [currentTaskTitle, setCurrentTaskTitle] = useState("");
  const [boolTaskInput, setBoolTaskInput] = useState(false);
  const [TaskDeadlineDay, setTaskDeadlineDay] = useState("");
  const [TaskDeadlineTime, setTaskDeadlineTime] = useState("");
  const [completedTask, setCompletedTask] = useState(false);

  const newDate = new Date(TaskDeadlineDay);
  const columnId = item.id;
  let month = newDate.getMonth() + 1;
  let day = newDate.getDate();

  if (month === 1) {
    month = "Января";
  }
  if (month === 2) {
    month = "Февраля";
  }
  if (month === 3) {
    month = "Марта";
  }
  if (month === 4) {
    month = "Апреля";
  }
  if (month === 5) {
    month = "Мая";
  }
  if (month === 6) {
    month = "Июня";
  }
  if (month === 7) {
    month = "Июля";
  }
  if (month === 8) {
    month = "Августа";
  }
  if (month === 9) {
    month = "Сентября";
  }
  if (month === 10) {
    month = "Октября";
  }
  if (month === 11) {
    month = "Ноября";
  }
  if (month === 12) {
    month = "Декабря";
  }

  let newTodo = {
    columnId: item.id,
    id: currentTaskId,
    title: currentTaskTitle,
    deadlineTime: TaskDeadlineTime,
    deadlineDay: day,
    deadlineMonth: month,
    completed: completedTask
  };

  function addTodoList(event) {
    event.preventDefault();
    setBoolTaskInput(false);

    setTodo((prevTodo) => {
      const upDateTodo = prevTodo.concat(newTodo);
      localStorage.setItem("todo", JSON.stringify(upDateTodo));
      return upDateTodo;
    });

    setCurrentTaskTitle("");
    setTaskDeadlineDay("");
    setTaskDeadlineTime("");
  }

  function handleBool() {
    setBoolTaskInput(true);
    setCurrentTaskId(currentTaskId + 1);
  }

  useEffect(() => {
    const storedTodo = JSON.parse(localStorage.getItem("todo"));
    if (storedTodo) {
      setTodo(storedTodo);
      setCurrentTaskId(
        storedTodo.map((item) => item.id)[storedTodo.length - 1]
      );
    }
  }, []);

  // console.log(todo);

  return (
    <div className={s.column}>
      <div className={s.column_header}>
        <p className={s.column_header_title}>{item.title}</p>
        <div className={s.column_header_list}>
          <span className={s.column_header_list_add}>
            <img onClick={handleBool} src={addTodo} alt="icon" />
          </span>
          <button className={s.column_header_list_settings}>
            <img src={settingColumn} alt="icon" />
          </button>
          {boolTaskInput ? (
            <>
              <div className={s.modal}>
                <form className={s.modal_form} onSubmit={addTodoList}>
                  <label className={s.modal_form_label}>
                    Введите имя задачи
                    <input
                      className={s.modal_form_label_input}
                      value={currentTaskTitle}
                      onChange={(event) =>
                      setCurrentTaskTitle(event.target.value)
                      }
                      type="text"
                      placeholder="Введите имя задачи"
                    />
                  </label>
                  <label className={s.modal_form_label}>
                    Время на выполнение задачи
                    <input
                      className={s.modal_form_label_input}
                      value={TaskDeadlineTime}
                      onChange={(event) =>
                      setTaskDeadlineTime(event.target.value)
                      }
                      type="number"
                      placeholder="Время на выполнение задачи"
                    />
                  </label>
                  <label className={s.modal_form_label}>
                    Срок
                    <input
                      className={s.modal_form_label_input}
                      value={TaskDeadlineDay}
                      onChange={(event) =>
                      setTaskDeadlineDay(event.target.value)
                      }
                      type="date"
                    />
                  </label>
                  <button type="submit"></button>
                </form>
              </div>
            </>
          ) : null}
        </div>
      </div>

      <div className={s.column_tasks}>
        {todo
          .filter((taskId) => taskId.columnId === item.id)
          .map((item) => (
            <Todo  modalCardActivate={modalCardActivate} columnId={columnId} key={item.id} {...item} />
          ))}
      </div>
    </div>
  );
};

export default Column;
