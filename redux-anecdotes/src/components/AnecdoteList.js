import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import {
  setNotification,
  removeNotification,
} from "../reducers/notificationReducer";

const Anecdote = ({ voteHandler, anecdote }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={voteHandler}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    console.log("vote", anecdote.id);
    dispatch(voteAnecdote(anecdote));
    dispatch(setNotification(`you voted ${anecdote.content}`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };

  const anecdotes = useSelector((state) => {
    if (state.filter !== "") {
      return state.anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      );
    } else {
      return state.anecdotes;
    }
  });

  const sortedAnecdotes = [...anecdotes].sort(
    (anecdoteA, anecdoteB) => anecdoteB.votes - anecdoteA.votes
  );

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          voteHandler={() => vote(anecdote)}
        />
      ))}
    </div>
  );
};

export default AnecdoteList;
