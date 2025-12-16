import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';


const TaskCard = ({ task, users,index}) => {
   const assignee = users.find(u => u.id === task.assigneeId);
   return(
    

  <Draggable draggableId={String(task.id)} index={index}>
    {provided => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps} className='task-card'>
        <strong>{task.title}</strong>
        <p>{task.description}</p>
        <p><em>Assigned to: {assignee ? assignee.username : "Unassigned"}</em></p>

        <p>Status: {task.status}</p>
      </div>
    )}
  </Draggable>
);
}
export default TaskCard;
