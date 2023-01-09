import { Trash } from 'phosphor-react';
import { ChangeEvent, useState } from 'react';
import style from './Item.module.css';


//Propriedades recebidas da tela principal
type ItemProps = {
  title: string,
  onDelete: (data: string) => void
}

export function Item({ title, onDelete }: ItemProps) {
  //Estados
  const [isChecked, setIsChecked] = useState(false)

  // Função que captura a mudança do checkbox de marcado ou desmarcado
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setIsChecked(event.target.checked);
  }

  // Função que recebe a propriedade de deletar a tarefa lá de App
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

          //Condicional que muda o estilo de acordo com o estado do checkbox, marcado ou desmarcado
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