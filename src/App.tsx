//Estilos
import './global.css';
import styles from './App.module.css';

//Componentes
import { Header } from './components/Header';
import { Item } from './components/Item';
import { PlusCircle } from 'phosphor-react';
import { EmptyList } from './components/EmptyList';

import { useState, FormEvent, ChangeEvent } from 'react';

function App() {
  //Estados
  const [tasks, setTasks] = useState(['']);
  const [newTask, setNewTask] = useState('');

  // Função para capturar a tarefa digitada no input
  function handleNewTask(event: ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value);
  }

  //Função para adicionar uma nova tarefa
  function handleAddTask(event: FormEvent) {
    event.preventDefault();

    setTasks([...tasks, newTask]);
    setNewTask('');
  }

  //Função para deletar a tarefa
  function handleDeleteTask(taskToRemove: string) {
    const taskWithoutDeleted = tasks.filter(task => {
      return task !== taskToRemove 
    })

    setTasks(taskWithoutDeleted);
  }

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
            <span>0</span>
          </div>
        </div>
        <div className={styles.task_box}>
          {
            // Condicional abaixo verifica se há tarefas, se houver mostra as tarefas, senão mostra um componente
            // que exibe uma mensagem que não há tarefas. 
            tasks.length > 0 ? tasks.map(task => { 
              return <Item onDelete={handleDeleteTask} title={task}/>
            }) : <EmptyList />}
        </div>
      </div>
    </div>
  );
}

export default App
