import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.VUE_APP_PERSONAL_HOST,
});

function getCookieEmail() {
  var name = 'email=';
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

function getTasksRequest() {
  const email = getCookieEmail();
  return instance
    .get(`/checklists/?userId=${email}`)
    .then((response: any) => response.data[0]);
}

function getSingleTaskRequest(id: string) {
  return instance.get(`/checklists/${id}`).then(response => response.data);
}

function deleteTaskRequest(id: string) {
  return instance.delete(`/checklists/${id}`);
}

async function createTaskRequest(task: any) {
  const email = getCookieEmail();
  return instance
    .post(`/checklists/`, {
      ...task,
      shortDescription: '',
      completionState: task.completionState,
      userId: email,
      isTeamContext: false,
    })
    .then(response => (response.status === 200 ? response.data.id : ''))
    .then(postedId => getSingleTaskRequest(postedId));
}

function getSingleMinitaskRequest(id: string) {
  return instance.get(`/tasks/${id}`).then(response => response.data);
}

function createMinitaskRequest(newMinitask: any) {
  const email = getCookieEmail();
  return instance
    .post('/tasks/', {
      userId: email,
      title: newMinitask.title,
      checklistId: newMinitask.checklistId,
      completionState: newMinitask.completionState,
    })
    .then(response => (response.status === 200 ? response.data.id : ''))
    .then(postedId => getSingleMinitaskRequest(postedId));
}

function getMinitasksRequest() {
  const email = getCookieEmail();
  return instance
    .get(`/tasks/?userId=${email}`)
    .then((response: any) => response.data[0]);
}

function updateMinitaskRequest(updatedMinitask: any) {
  const email = getCookieEmail();
  return instance.put('/tasks/', {
    userId: email,
    title: updatedMinitask.title,
    checklistId: updatedMinitask.checklistId,
    completionState: updatedMinitask.completionState,
    id: updatedMinitask.id,
  });
}

function deleteMinitasksRequest(id: any) {
  return instance.delete(`/tasks/${id}`).then(response => response.data);
}

export {
  getTasksRequest,
  getMinitasksRequest,
  createTaskRequest,
  deleteTaskRequest,
  createMinitaskRequest,
  updateMinitaskRequest,
  deleteMinitasksRequest,
};
