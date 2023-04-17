import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";

export const PostNewMessage = () => {

  const { authState } = useOktaAuth();
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [displayWarning, setDisplayWarning] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);

  

  return(
    <div className="card mt-3">
      {displaySuccess && 
        <div className="alert alert-success" role="alert">
          Pergunta adicionada com sucesso.
        </div>
      }
      <div className="card-header">
        Faça uma pergunta para um admin da biblioteca
      </div>
      <div className="card-body">
      <form method="POST" action="">
        {displayWarning &&
          <div className="alert alert-danger" role="alert">
              Todos campos devem ser preenchidos
          </div>
        }
        <div className="mb-3">
          <label className="form-label">
            Titulo
          </label>
          <input type="text" className="form-control" id="exampleFormControlInput1" 
          placeholder="Title" onChange={e => setTitle(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Pergunta
          </label>
          <textarea className="form-control" id="exampleFormControlTextarea1" rows={3}
            onChange={e => setQuestion(e.target.value)} value={question}/>
        </div>
        <div>
          <button className="btn btn-primary mt-3">
            Enviar
          </button>
        </div>
      </form>
      </div>
      
    </div>
  );
}