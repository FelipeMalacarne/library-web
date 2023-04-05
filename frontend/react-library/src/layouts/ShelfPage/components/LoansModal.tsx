import ShelfCurrentLoans from "../../../models/ShelfCurrentLoans";

export const LoansModal: React.FC<{ shelfCurrentLoan: ShelfCurrentLoans, mobile: boolean }> = (props) => {
  return (
    <div className="modal fade" id={props.mobile ? `mobiilemodal${props.shelfCurrentLoan.book.id}` :
      `modal${props.shelfCurrentLoan.book.id}`} data-bs-backdrop='static' data-bs-keyboard='false' aria-labelledby="staticBackdropLabel" aria-hidden='true' key={props.shelfCurrentLoan.book.id}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Opções de Empréstimo
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss='modal' aria-label="Close">
            </button>
          </div>
          <div className="modal-body">
            <div className="container">
              <div className="mt-3">
                <div className="row">
                  <div className="col-2">
                    {props.shelfCurrentLoan.book?.img ?
                      <img src={require('./../../../Images/BooksImages/' + props.shelfCurrentLoan.book?.img)} width='56' height='87' alt="Book" />
                      :
                      <img src={require('./../../../Images/BooksImages/default.jpg')} alt="Book" />
                    }
                  </div>
                  <div className="col-10">
                    <h6>{props.shelfCurrentLoan.book.author}</h6>
                    <h4>{props.shelfCurrentLoan.book.title}</h4>
                  </div>
                </div>
                <hr />
                {props.shelfCurrentLoan.daysLeft > 0 &&
                  <p className="text-secondary">
                    Vencimento em {props.shelfCurrentLoan.daysLeft} dias.
                  </p>
                }
                {props.shelfCurrentLoan.daysLeft == 0 &&
                  <p className="text-success">
                    Vencimento hoje.
                  </p>
                }
                {props.shelfCurrentLoan.daysLeft < 0 &&
                  <p className="text-danger">
                    Vencimento passou por {props.shelfCurrentLoan.daysLeft} dias.
                  </p>
                }
                <div className="list-group mt-3">
                  <button data-bs-dismiss='modal' className="list-group-item list-group-item-action" aria-current='true'>
                    Retornar Livro
                  </button>
                  <button data-bs-dismiss='modal'
                    className={
                      props.shelfCurrentLoan.daysLeft < 0 ?
                        'list-group-item list-group-item-action inactiveLink'
                        :
                        'list-group-item list-group-item-action'
                    }>
                      {props.shelfCurrentLoan.daysLeft < 0 ?
                        'Livros atrasados não podem ser renovados'
                        :
                        'Renove por 7 dias'  
                      }
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" type="button" data-bs-dismiss='modal'>
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}