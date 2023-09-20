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

  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === "") {
      return anecdotes.sort((anecdoteA, anecdoteB) => {
        return anecdoteB.votes - anecdoteA.votes;
      });
    } else {
      return anecdotes.filter((anecdote) =>
        anecdote.content
          .toLowerCase()
          .includes(filter.toLowerCase())
          .sort((anecdoteA, anecdoteB) => {
            return anecdoteB.votes - anecdoteA.votes;
          })
      );
    }
  });

  return (
    <div>
      {anecdotes.map((anecdote) => (
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
