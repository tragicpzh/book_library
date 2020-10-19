import React, {useCallback, useEffect, useState} from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button, Icon } from 'antd';
import { history } from 'umi';
import styles from './index.less';
import {useSelector} from "dva";
const Todo = () => {
  const {todos}=useSelector(({todo}:any)=>({todos:todo.todos}))
  const [items, setItems] = useState([]);

  useEffect(()=>{
    setItems(todos)
  },[todos])

  const sort = useCallback(
    (start, end) => {
      const [item] = items.splice(start, 1);
      items.splice(end, 0, item);
      return items;
    },
    [items],
  );

  const onDragEnd = useCallback(
    result => {
      if (!result.destination) {
        return;
      }
      const newItems = sort(result.source.index, result.destination.index);
      setItems(newItems);
    },
    [setItems,sort],
  );

  const toPage = useCallback(to => {
    history.push(to);
  }, []);

  const getItemStyle = useCallback(
    (isDragging, draggableStyle) => ({
      ...draggableStyle,
      background: isDragging ? 'blue' : 'grey',
      padding: 16,
      marginBottom: 8,
      display: 'flex',
    }),
    [],
  );

  const getListStyle = useCallback(
    isDraggingOver => ({
      background: isDraggingOver ? 'lightblue' : 'lightgrey',
      padding: 8,
    }),
    [],
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="TodoList">
        {(provided, snapshot) => {
          return (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {items.map((item, index) => {
                return (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style,
                        )}
                      >
                        <div className={styles.prefix}>
                          <Icon
                            type="info-circle"
                            theme="filled"
                            style={{ color: item.color }}
                          />
                          <span>{item.name}</span>
                        </div>
                        <div className={styles.content}>{item.todo}</div>
                        <div className={styles.suffix}>
                          <Button onClick={() => toPage(item.to)}>
                            detail
                          </Button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};
export default Todo;
