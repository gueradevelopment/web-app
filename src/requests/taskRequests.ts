import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.VUE_APP_PERSONAL_HOST,
  timeout: 1000,
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
  return instance.get(`/tasks/${id}`).then(response => response.data);
}

async function createTaskRequest(task: any) {
  const email = getCookieEmail();
  return instance
    .post(`/tasks/`, {
      ...task,
      shortDescription: '',
      status: 'To-Do',
      userId: email,
      isTeamContext: false,
    })
    .then(response => (response.status === 200 ? response.data.id : ''))
    .then(postedId => getSingleTaskRequest(postedId));
}

export { getTasksRequest, createTaskRequest };
