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

  return {
    anecdotes,
  };
};
