import React, { useState } from 'react'
import s from './MenuTop.module.scss'
import { NavLink } from 'react-router-dom'
import avatar from '../image/MenuTop/avatar.png'
import messages from '../image/MenuTop/messages.png'
import nightMode from '../image/MenuTop/nightMode.png'
import notifications from '../image/MenuTop/notifications.png'

const MenuTop = () => {
  const activeLink = ({isActive}) => isActive ? `${s.menuTop_info_links_active}` : `${s.menuTop_info_links_item}`;

  return (
    <div className={s.menuTop}>
      <div className={s.menuTop_info}>
        <div className={s.menuTop_info_state}>
          <p className={s.menuTop_info_state_title}>Электротовары</p>
          <p className={s.menuTop_info_state_subtitle}><span className={s.menuTop_info_state_subtitle_active}></span> В работе</p>
        </div>
        <div className={s.menuTop_info_links}>
          <NavLink to="/plug" className={activeLink}>Описание</NavLink>
          <NavLink to="/plug" className={activeLink}>Список</NavLink>
          <NavLink to="/kanban" className={activeLink}>Канбан</NavLink>
          <NavLink to="/plug" className={activeLink}>Планирование</NavLink>
          <NavLink to="/plug" className={activeLink}>Дашборд</NavLink>
          <NavLink to="/plug" className={activeLink}>Команда</NavLink>
        </div>

      </div>
      <div className={s.menuTop_settings}>
        <img src={nightMode} alt="icon" />
        <img src={messages} alt="icon" />
        <img src={notifications} alt="icon" />
        <img src={avatar} alt="icon" />
      </div>
    </div>
  )
}

export default MenuTop