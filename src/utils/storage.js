import { isEmpty } from "lodash";
// used for retrieving and setting data in web and framework through a consistent api surface
export const getItem = (key, self) => {
  const data = localStorage.getItem(key) ? localStorage.getItem(key) : "{}";
  return JSON.parse(data);
};

export const setItem = (key, value) => {
  // set it on storage
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeItem = (key) => {
  // remove it from storage
  localStorage.removeItem(key);
};
