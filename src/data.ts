export default {
  boards: [
    {
      id: 0,
      title: 'House',
    },
    {
      id: 1,
      title: 'School',
    },
  ],
  tasks: [
    {
      boardId: 0,
      id: 0,
      title: 'Clean my room',
      description: 'Get some nice soap',
      shortDescription: '',
      status: 'To-Do',
    },
    {
      boardId: 0,
      id: 1,
      title: 'Clean another room',
      description: 'Get some nice soap',
      shortDescription: '',
      status: 'Done',
    },
    {
      boardId: 1,
      id: 2,
      title: 'Do my homework',
      status: 'To-Do',
    },
    {
      boardId: 1,
      id: 3,
      title: 'Do other homework',
      description: 'Get some nice soap',
      shortDescription: '',
      status: 'To-Do',
    },
  ],
  miniTasks: [
    {
      id: 0,
      checklistId: 2,
      title: 'Math homework',
      status: 'To-Do',
    },
    {
      id: 1,
      checklistId: 2,
      title: 'Biology homework',
      status: 'Done',
    },
  ],
};
