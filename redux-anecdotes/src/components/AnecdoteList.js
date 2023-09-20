import { useDispatch, useSelector } from "react-redux";
import { handleVoteIncrease } from "../reducers/anecdoteReducer";

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

  const vote = (id) => {
    console.log("vote", id);
    dispatch(handleVoteIncrease(id));
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
          voteHandler={() => vote(anecdote.id)}
        />
      ))}
    </div>
  );
};

export default AnecdoteList;
