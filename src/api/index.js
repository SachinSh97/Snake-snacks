import { API_Base_URL } from "../constants/global";

export const createUserApi = (userName) => {
  const Header = new Headers();
  Header.append("Content-Type", "application/json");
  const userObj = {
    userName: userName,
  };
  const raw = JSON.stringify(userObj);
  const requestObj = {
    method: "POST",
    headers: Header,
    body: raw,
    redirect: "follow",
  };

  return fetch(`${API_Base_URL}/user`, requestObj)
    .then((response) => response.json())
    .catch((errorResponse) => errorResponse);
};

export const getTopTenPlayerApi = () => {
  const Header = new Headers();
  Header.append("Content-Type", "application/json");
  const requestObj = {
    method: "GET",
    headers: Header,
    body: null,
    redirect: "follow",
  };
  return fetch(`${API_Base_URL}/user/topScores`, requestObj)
    .then((response) => response.json())
    .catch((errorResponse) => errorResponse);
};

export const getTopTenScoreApi = (userId) => {
  const Header = new Headers();
  Header.append("Content-Type", "application/json");
  const requestObj = {
    method: "GET",
    headers: Header,
    body: null,
    redirect: "follow",
  };
  return fetch(`${API_Base_URL}/user/topScores/${userId}`, requestObj)
    .then((response) => response.json())
    .catch((errorResponse) => errorResponse);
};

export const updateScoreApi = (scoreObj) => {
  const Header = new Headers();
  Header.append("Content-Type", "application/json");

  const raw = JSON.stringify(scoreObj);
  const requestObj = {
    method: "PUT",
    headers: Header,
    body: raw,
    redirect: "follow",
  };

  return fetch(`${API_Base_URL}/user/score`, requestObj)
    .then((response) => response.json())
    .catch((errorResponse) => errorResponse);
};
