import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = () => {
  return axios.get(baseUrl).then((res) => res.data);
};

export const createAnecdote = (newAnecdote) => {
  if (newAnecdote.content.length < 5) {
    return Promise.reject(
      new Error(`Content length must be at least 5 charcters!`)
    );
  }
  return axios.post(baseUrl, newAnecdote).then((res) => res.data);
};

export const updateAnecdote = (updatedAnecdote) => {
  return axios
    .put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
    .then((res) => res.data);
};
