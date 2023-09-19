import { useDispatch, useSelector } from "react-redux";
import { handleVoteIncrease } from "../reducers/anecdoteReducer";

const Anecdote = ({ voteHandler, anecdote }) => {
  return (
    <div key={anecdote.id}>
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

  const vote = (id) => {
    console.log("vote", id);
    dispatch(handleVoteIncrease(id));
  };

  const anecdotes = useSelector((state) => state);

  const sortedAnecdotes = [...anecdotes];
  sortedAnecdotes.sort((anecdoteA, anecdoteB) => {
    return anecdoteB.votes - anecdoteA.votes;
  });

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <Anecdote anecdote={anecdote} voteHandler={() => vote(anecdote.id)} />
      ))}
    </div>
  );
};

export default AnecdoteList;
