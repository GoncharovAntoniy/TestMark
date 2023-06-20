import React from "react";
import s from "./Kanban.module.scss";
import filter from "../image/kanban/filter.svg";
import sorted from "../image/kanban/sorted.svg";
import Column from "./Column";
import { useState, useEffect } from "react";
import CardDetail from "./CardDetail";

const Kanban = () => {
  const [column, setColumn] = useState([]);
  const [currentId, setCurrentId] = useState(0);
  const [currentTitle, setCurrentTitle] = useState("");
  const [boolInput, setBoolInput] = useState(false);
  const [activeCardDetail, setActiveCardDetail] = useState(false);
  const [todoId, setTodoId] = useState(null)
  
  
  function modalCardActivate(id) {
    setActiveCardDetail(true);
    setTodoId(id)
  }

  let newColumn = {
    id: currentId,
    title: currentTitle,
  };

  useEffect(() => {
    const storedColumn = JSON.parse(localStorage.getItem("column"));
    if (storedColumn) {
      setColumn(storedColumn);
      setCurrentId(
        storedColumn.map((item) => item.id)[storedColumn.length - 1]
      );
    }
  }, []);

  const handleTitle = (event) => {
    event.preventDefault();
    setBoolInput(false);

    setColumn((prevColumn) => {
      const upDateColumn = prevColumn.concat(newColumn);
      localStorage.setItem("column", JSON.stringify(upDateColumn));
      return upDateColumn;
    });

    setCurrentTitle("");
  };

  function addColumn() {
    setBoolInput(true);
    setCurrentId(currentId + 1);
  }

  return (
    <div className={s.kanban}>
      {activeCardDetail ? (
        <>
          <CardDetail setActiveCardDetail={setActiveCardDetail} todoId={todoId} />
        </>
      ) : null}
      <nav className={s.kanban_navbar}>
        <p className={s.kanban_navbar_taskInfo}>
          Последняя задача выполнена 10 марта
        </p>
        <div className={s.kanban_navbar_settings}>
          <p className={s.kanban_navbar_settings_item}>
            <img src={filter} alt="icon" /> Фильтрация
          </p>
          <p className={s.kanban_navbar_settings_item}>
            <img src={sorted} alt="icon" /> Сортировка
          </p>
        </div>
      </nav>
      <div className={s.kanban_info}>
        <div className={s.kanban_info_columns}>
          {column.map((item) => (
            <Column modalCardActivate={modalCardActivate} currentId={currentId} key={item.id} {...item} />
          ))}
        </div>
        <div className={s.kanban_info_addColumn}>
          <button
            onClick={addColumn}
            className={s.kanban_info_addColumn_button}>
            + Добавить столбец
          </button>
          {boolInput ? (
            <>
              <form onSubmit={handleTitle}>
                <input
                  value={currentTitle}
                  onChange={(event) => setCurrentTitle(event.target.value)}
                  type="text"
                  placeholder="Введите заголовок колонки"
                />
              </form>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Kanban;
