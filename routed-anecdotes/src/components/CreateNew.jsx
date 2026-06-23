import { useNavigate } from "react-router-dom";
import { useField } from "../hooks/useField";
import { useAnecdote } from "../hooks/useAnecdote";

const CreateNew = () => {
  const { addAnecdote } = useAnecdote();
  const contentField = useField("text");
  const { reset: resetContent, ...content } = contentField;
  const authorField = useField("text");
  const { reset: resetAuthor, ...author } = authorField;
  const infoField = useField("text");
  const { reset: resetInfo, ...info } = infoField;
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addAnecdote({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    resetContent();
    resetAuthor();
    resetInfo();
    navigate("/");
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default CreateNew;
