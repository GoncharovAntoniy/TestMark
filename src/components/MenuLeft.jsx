import React from 'react'
import s from './MenuLeft.module.scss'
import dashbord from '../image/list/Vector.svg'
import clock from '../image/list/clock.svg'
import projectimg from '../image/list/project.svg'
import strelka from '../image/listCommand/strelka.svg'

const MenuLeft = () => {
  return (
    <div className={s.menuLeft}>
        <div className={s.info}>
            <p className={s.info_title}>Captain</p>
            <div className={s.info_burger}> 
                <span className={s.info_burger_btn}></span>
                <span className={s.info_burger_btn}></span>
                <span className={s.info_burger_btn}></span>
            </div>
        </div>
        <ul className={s.list}>
            <li className={s.list_item}><img src={dashbord} alt="icon" />Дашборд</li>
            <li className={s.list_item}><img src={clock} alt="icon" /> Мои задачи</li>
            <li className={s.list_item}><img src={projectimg} alt="icon" />Проекты</li>
        </ul>
        <p className={s.favorites}>Избранное</p>
        <ul className={s.favorites_list}>
            <li className={s.favorites_list_item}> <span className={`${s.favorites_list_item_round}`}></span>Автошкола "Автолицей"</li>
            <li className={s.favorites_list_item}> <span className={`${s.favorites_list_item_round}`}></span>Электротовары</li>
            <li className={s.favorites_list_item}> <span className={`${s.favorites_list_item_round}`}></span>Лесхозснаб</li>
            <li className={s.favorites_list_item}> <span className={`${s.favorites_list_item_round} ${s.active_rounde}`}></span>Посуда-Сити</li>
        </ul>
        <p className={s.command}>Команды</p>
        <ul className={s.command_list}>
            <li className={s.command_list_item}><img src={strelka} alt="" />Программисты</li>
            <li className={s.command_list_item}><img src={strelka} alt="" />Маркетологи</li>
            <li className={s.command_list_item}><img src={strelka} alt="" />Дизайнеры</li>
        </ul>
    </div>
  )
}

export default MenuLeft