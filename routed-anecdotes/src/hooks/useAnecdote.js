import { useEffect, useState } from "react";
import noteService from "../services/anecdotes";

export const useAnecdote = () => {
  const [anecdotes, setAnecdotes] = useState([]);
  const getAll = async () => {
    const fetchedAnecdotes = await noteService.getAll();
    setAnecdotes(fetchedAnecdotes);
  };
  useEffect(() => {
    (async () => {
      await getAll();
    })();
  }, []);

  const addAnecdote = async (anecdote) => {
    const newAnecdote = await noteService.createNew(anecdote);
    setAnecdotes(anecdotes.concat(newAnecdote));
  };

  const deleteAnecdote = async (id) => {
    await noteService.deleteAnecdote(id);
    setAnecdotes(anecdotes.filter((anecdote) => anecdote.id !== id));
  };

  return {
    anecdotes,
    addAnecdote,
    deleteAnecdote,
  };
};
