import { Trash } from 'phosphor-react';
import { ChangeEvent, useState } from 'react';
import style from './Item.module.css';

type ItemProps = {
  title: string,
  onDelete: (data: string) => void
}

export function Item({ title, onDelete }: ItemProps) {
  const [isChecked, setIsChecked] = useState(false)

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setIsChecked(event.target.checked);
  }

  function deleteTask() {
    onDelete(title);
  }
  
  return (
    <div className={style.item_container}>
      <div className={style.item_elements}>
        <div className={style.checkbox_area}>
          <input 
            type="checkbox" 
            name='input_checkbox'
            onChange={handleChange}
            checked={isChecked}
          />
        </div>
        <label 
          htmlFor='input_checkbox' 
          className={isChecked ? style.item_text_checked : style.item_text}
        >
          {title}
        </label>
        <div className={style.trash_area} onClick={deleteTask}>
          <Trash size={18}/>
        </div>
      </div>
    </div>
  );
}