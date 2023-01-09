import style from './EmptyList.module.css';

import { ClipboardText } from 'phosphor-react'

export function EmptyList() {
  return (
    <div className={style.empty_message}>
      <ClipboardText size={56} weight='light'/>
      <strong>Você ainda não tem tarefas cadastradas</strong>
      <span>Crie tarefas e organize seus itens a fazer</span>
    </div>
  )
}