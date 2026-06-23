import { useAnecdote } from "../hooks/useAnecdote";

const AnecdoteList = () => {
  const { anecdotes, deleteAnecdote } = useAnecdote();

  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <li>{anecdote.content}</li>
            <button onClick={() => deleteAnecdote(anecdote.id)}>delete</button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default AnecdoteList;
