//Estilos
import './global.css';
import styles from './App.module.css';

import uuid from 'react-uuid';

//Componentes
import { Header } from './components/Header/Header';
import { Item } from './components/Item/Item';
import { PlusCircle } from 'phosphor-react';
import { EmptyList } from './components/EmptyList/EmptyList';

import { useState, FormEvent, ChangeEvent } from 'react';

type Task = {
  id: string,
  description: string,
  isCompleted: boolean
}

function App() {
  //Estados
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  // Função para capturar a tarefa digitada no input
  function handleNewTask(event: ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value);
  }

  //Função para adicionar uma nova tarefa
  function handleAddTask(event: FormEvent) {
    event.preventDefault();

    setTasks([...tasks, {
      id: uuid(),
      description: newTask,
      isCompleted: false
    }]);
    setNewTask('');
  }

  //Função para deletar a tarefa
  function handleDeleteTask(id: string) {

    const taskWithoutDeleted = tasks.filter(task => {
      return task.id !== id;
    })

    setTasks(taskWithoutDeleted);
  }

  function handleToggleTask(id: string) {
    const withCompletedTask = tasks.map(task => {
      if(task.id === id) {
        task.isCompleted = !task.isCompleted;
      }

      return task;
    });

    setTasks(withCompletedTask);
  }

  // Retorna todas as tarefas completadas
  const completedTasks = tasks.filter(task => {
    return task.isCompleted === true;
  });

  // variavel controla se o input ta preenchido
  const isInputEmpty = newTask.length === 0;

  return (
    <div className={styles.container}>
      <Header />     
      <div className={styles.content}> 
        <form className={styles.task_form}>
          <input 
            type="text"
            placeholder='Adicione uma nova tarefa' 
            value={newTask}
            onChange={handleNewTask}   
               
          />
          <button
            disabled={isInputEmpty} 
            type='submit'
            onClick={handleAddTask}
          >
            Criar
            <PlusCircle size={16}/>
          </button>
        </form>
        <div className={styles.task_title}>
          <div className={styles.task_header}>
            <strong className={styles.created_task}>Tarefas criadas</strong>
            <span>{tasks.length}</span>
          </div>

          <div className={styles.task_header}>
            <strong className={styles.completed_task}>Concluidas</strong>
            {tasks.length > 0 ? <span>{completedTasks.length} de {tasks.length}</span> : <span>0</span>}
          </div>
        </div>
        <div className={styles.task_box}>
          {
            // Condicional abaixo verifica se há tarefas, se houver mostra as tarefas, senão mostra um componente
            // que exibe uma mensagem que não há tarefas. 
            tasks.length > 0 ? tasks.map(task => { 
              return <Item onDelete={handleDeleteTask} task={task} onCheck={handleToggleTask}/>
            },) : <EmptyList />}
        </div>
      </div>
    </div>
  );
}

export default App
