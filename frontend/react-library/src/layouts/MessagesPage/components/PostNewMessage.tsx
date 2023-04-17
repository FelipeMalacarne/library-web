import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";
import MessageModel from "../../../models/MessageModel";

export const PostNewMessage = () => {

  const { authState } = useOktaAuth();
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [displayWarning, setDisplayWarning] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);

  async function submitNewQuestion(){
    const envUrl = process.env.REACT_APP_BASE_URL;
    const url = `${envUrl}/api/messages/secure/add/message`;
    console.log(title)
    console.log(question)
    if(authState?.isAuthenticated && title !== "" && question !== ""){
      const messageRequestModel: MessageModel = new MessageModel(title, question);
      const requestOptions = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authState.accessToken?.accessToken}`,  
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(messageRequestModel)
      };

      const submitNewQuestionResponse = await fetch(url, requestOptions);
      if(!submitNewQuestionResponse.ok){
        throw new Error('Something went wrong');
      }

      setTitle("");
      setQuestion("");
      setDisplaySuccess(true);
      setDisplayWarning(false);
    } else {
      setDisplayWarning(true);
      setDisplaySuccess(false);
    }

  }



  return (
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
        <form method="POST">
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
              placeholder="Title" onChange={e => setTitle(e.target.value)} value={title} />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Pergunta
            </label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows={3}
              onChange={e => setQuestion(e.target.value)} value={question}>
            </textarea>
          </div>
          <div>
            <button type="button" className="btn btn-primary mt-3" onClick={submitNewQuestion}>
              Enviar
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}