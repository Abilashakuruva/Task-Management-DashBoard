import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';

const Column = ({ title, tasks=[],droppableId,users }) => (
  <div className='column'>
    <h3>{title}</h3>

    <Droppable droppableId={droppableId} >
      {provided => (
        <div ref={provided.innerRef} {...provided.droppableProps}  className='task-list'>
         

          {tasks.map((task, index) => (
            <TaskCard key={task.id} task={task} index={index} users={users} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </div>
);

export default Column;
