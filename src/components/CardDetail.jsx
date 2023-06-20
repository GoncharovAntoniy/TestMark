import React, { useEffect, useRef, useState } from "react";
import s from "./CardDetail.module.scss";
import play from "../image/columnTodo/play.svg";
import copy from "../image/cardDetail/Copy.png";
import rollUp from "../image/cardDetail/rollUp.png";
import completed from "../image/cardDetail/comleted.png";
import avatar from "../image/MenuTop/avatar.png";
import data from "../image/cardDetail/data.svg";
import user from "../image/columnTodo/user.svg";
import complete from "../image/columnTodo/buttonCompleate.svg";
import plus from "../image/plus.svg";
import submit from "../image/cardDetail/submit.svg";

const CardDetail = ({ todoId, setActiveCardDetail }) => {
  const [cardTodo, setCardTodo] = useState(null);
  const [cardSubtask, setCardSubtask] = useState(null);
  const [cardTimer, setCardTimer] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setCardTodo(JSON.parse(localStorage.getItem("todo")));
    setCardSubtask(JSON.parse(localStorage.getItem("tasks")));

    const storedTime = localStorage.getItem(`timerTime_${todoId}`);

    if (storedTime) {
      setCardTimer(parseInt(storedTime, 10));
    }
  }, [todoId]);

  let title = cardTodo
    ? cardTodo.filter((item) => item.id == todoId).map((i) => i.title)
    : "";
  let completedTodo = cardTodo
    ? cardTodo.filter((item) => item.id == todoId).map((i) => i.completed)
    : "";
  let deadlineDay = cardTodo
    ? cardTodo.filter((item) => item.id == todoId).map((i) => i.deadlineDay)
    : "";
  let deadlineMonth = cardTodo
    ? cardTodo.filter((item) => item.id == todoId).map((i) => i.deadlineMonth)
    : "";
  let deadlineTime = cardTodo
    ? cardTodo.filter((item) => item.id == todoId).map((i) => i.deadlineTime)
    : "";

  let subTasks = cardSubtask
    ? cardSubtask.filter((item) => item.todoId == todoId)
    : "";
  

  let commentaries = {
    id: todoId,
    title: newComment,
  };

  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem("comments"));
    if (storedComments) {
      setComments(storedComments);
    }
  }, [todoId]);

  function addComment(event) {
    event.preventDefault();

    setComments((prevComment) => {
      const updateComment = prevComment.concat(commentaries);
      localStorage.setItem("comments", JSON.stringify(updateComment));
      return updateComment;
    });

    setNewComment("");
  }

  

  return (
    <div className={s.cardDetail}>
      <header className={s.cardDetail_header}>
        <div className={s.cardDetail_header_work}>
          <div className={s.cardDetail_header_work_info}>
            <img
              className={s.cardDetail_header_work_info_play}
              src={play}
              alt="icon"
            />
            <p className={s.cardDetail_header_work_info_text}>
              Работать над задачей
            </p>
          </div>
          <p className={s.cardDetail_header_work_time}>
            {cardTimer} ч. / {deadlineTime} ч.
          </p>
        </div>
        <div className={s.cardDetail_header_task}>
          <p className={s.cardDetail_header_task_text}>
            <img
              className={s.cardDetail_header_task_completed}
              src={completed}
              alt="icon"
            />{" "}
            Завершить задачу
          </p>
          <img
            className={s.cardDetail_header_task_copy}
            src={copy}
            alt="icon"
          />
          <img
            onClick={() => setActiveCardDetail(false)}
            className={s.cardDetail_header_task_rollUp}
            src={rollUp}
            alt="icon"
          />
        </div>
      </header>

      <main className={s.cardDetail_desctiption}>
        <h3 className={s.cardDetail_desctiption_title}>{title}</h3>
        <div className={s.cardDetail_desctiption_info}>
          <div className={s.cardDetail_desctiption_info_items}>
            <div className={s.cardDetail_desctiption_info_items_item}>
              <p className={s.cardDetail_desctiption_info_items_item_user}>
                Исполнитель
              </p>
            </div>
            <div className={s.cardDetail_desctiption_info_items_item}>
              <p className={s.cardDetail_desctiption_info_items_item_date}>
                Даты
              </p>
            </div>
            <div className={s.cardDetail_desctiption_info_items_item}>
              <p className={s.cardDetail_desctiption_info_items_item_project}>
                Проект
              </p>
            </div>
            <div className={s.cardDetail_desctiption_info_items_item}>
              <p className={s.cardDetail_desctiption_info_items_item_desc}>
                Описание
              </p>
            </div>
          </div>
          <div className={s.cardDetail_desctiption_info_items}>
            <div className={s.cardDetail_desctiption_info_items_item}>
              <img
                className={s.cardDetail_desctiption_info_items_item_avatar}
                src={avatar}
                alt="icon"
              />
              <p className={s.cardDetail_desctiption_info_items_item_name}>
                Никита Хаецкий
              </p>
            </div>
            <div className={s.cardDetail_desctiption_info_items_item}>
              <img
                className={s.cardDetail_desctiption_info_items_item_data}
                src={data}
                alt="icon"
              />
              <p className={s.cardDetail_desctiption_info_items_item_date}>
                {deadlineDay ? `${deadlineDay} ${deadlineMonth}` : "Нет даты"}
              </p>
            </div>
            <div className={s.cardDetail_desctiption_info_items_item}>
              <button
                className={s.cardDetail_desctiption_info_items_item_button}>
                Добавить проект
              </button>
            </div>
            <div
              className={`${s.cardDetail_desctiption_info_items_item} ${s.cardDetail_input}`}>
              <input
                className={s.cardDetail_desctiption_info_items_item_input}
                type="text"
                placeholder="Добавить описание к задаче"
              />
            </div>
          </div>
        </div>

        <div className={s.cardDetail_desctiption_subtask}>
          <p className={s.cardDetail_desctiption_subtask_title}>Подзадачи</p>
          {subTasks &&
            subTasks.map((task) => (
              <>
                <div
                  key={task.id}
                  className={s.cardDetail_desctiption_subtask_info}>
                  <div className={s.cardDetail_desctiption_subtask_info_item}>
                    <img
                      className={
                        s.cardDetail_desctiption_subtask_info_item_icon
                      }
                      src={complete}
                      alt="icon"
                    />
                    <p
                      className={
                        s.cardDetail_desctiption_subtask_info_item_text
                      }>
                      {task.title}
                    </p>
                  </div>
                  <div className={s.cardDetail_desctiption_subtask_info_item}>
                    <img
                      className={
                        s.cardDetail_desctiption_subtask_info_item_icon
                      }
                      src={data}
                      alt="icon"
                    />
                    <img
                      className={
                        s.cardDetail_desctiption_subtask_info_item_icon
                      }
                      src={user}
                      alt="icon"
                    />
                  </div>
                </div>
              </>
            ))}

          <form className={s.cardDetail_desctiption_subtask_info_item}>
            <img src={plus} alt="icon" />
            <input
              className={s.cardDetail_desctiption_subtask_info_item_input}
              type="text"
              placeholder="Добавить подзадачу"
            />
          </form>
        </div>

        <div className={s.cardDetail_desctiption_comments} >
          {comments &&
            comments
              .filter((item) => item.id == todoId)
              .map((i) => (
                <div className={s.cardDetail_desctiption_comments_item}>
                  <img
                    className={s.cardDetail_desctiption_comments_item_avatar}
                    src={avatar}
                    alt="icon"
                  />
                  <div className={s.cardDetail_desctiption_comments_item_info}>
                    <p
                      className={
                        s.cardDetail_desctiption_comments_item_info_title
                      }>
                      Nick Khaetsky
                      <span
                        className={
                          s.cardDetail_desctiption_comments_item_info_title_time
                        }>
                        25 минут назад
                      </span>
                    </p>
                    <p
                      className={
                        s.cardDetail_desctiption_comments_item_info_subtitle
                      }>
                      {i.title}
                    </p>
                  </div>
                </div>
              ))}

          <div className={s.cardDetail_desctiption_comments_item}>
            <form
              onSubmit={addComment}
              className={s.cardDetail_desctiption_comments_item_form}>
              <img
                className={s.cardDetail_desctiption_comments_item_form_avatar}
                src={avatar}
                alt="icon"
              />
              <label
                className={s.cardDetail_desctiption_comments_item_form_desc}>
                <input
                  className={
                    s.cardDetail_desctiption_comments_item_form_desc_input
                  }
                  value={newComment}
                  onChange={(event) => setNewComment(event.target.value)}
                  type="text"
                  placeholder="Задайте вопрос или напишите комментарий..."
                />
                <button
                  className={
                    s.cardDetail_desctiption_comments_item_form_desc_button
                  }
                  type="submit">
                  <img
                    className={
                      s.cardDetail_desctiption_comments_item_form_desc_button_image
                    }
                    src={submit}
                    alt=""
                  />
                </button>
              </label>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CardDetail;
