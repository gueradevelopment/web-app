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

function getGuerabooksRequest() {
  const email = getCookieEmail();
  return instance
    .get(`/guerabooks/?userId=${email}`)
    .then(response => response.data[0])
    .then(async guerabooks => {
      if (guerabooks.length >= 1) {
        return guerabooks[0].id;
      } else {
        return await instance
          .post('/guerabooks/', {
            title: 'Guerabook',
            userId: email,
          })
          .then(response => response.data.id);
      }
    });
}

function getBoardsRequest() {
  const email = getCookieEmail();
  return instance
    .get(`/boards/?userId=${email}`)
    .then((response: any) => response.data[0]);
}

function getSingleBoardRequest(id: string) {
  return instance.get(`/boards/${id}`).then(response => response.data);
}

function deleteSingleBoardRequest(id: string) {
  return instance.delete(`/boards/${id}`).then(response => response.data);
}

function createBoardRequest(title: string, guerabookId: string) {
  const email = getCookieEmail();
  return instance
    .post(`/boards/`, {
      title,
      userId: email,
      isTeamContext: false,
      guerabookId,
    })
    .then(response => (response.status === 200 ? response.data.id : ''))
    .then(postedId => getSingleBoardRequest(postedId));
}

function updateBoardRequest(newBoard: any, guerabookId: any) {
  const email = getCookieEmail();
  return instance.put(`/boards/`, { ...newBoard, userId: email, guerabookId });
}

export {
  getGuerabooksRequest,
  getBoardsRequest,
  createBoardRequest,
  deleteSingleBoardRequest,
  updateBoardRequest,
};
