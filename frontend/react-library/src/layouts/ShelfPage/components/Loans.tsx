import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import ShelfCurrentLoans from "../../../models/ShelfCurrentLoans";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { Link } from "react-router-dom";

export const Loans = () => {

  const { authState } = useOktaAuth();
  const [httpError, setHttpError] = useState(null);

  // Current Loans
  const [shelfCurrentLoans, setShelfCurrentLoans] = useState<ShelfCurrentLoans[]>([]);
  const [isLoadingUserLoans, setIsLoadingUserLoans] = useState(true);

  useEffect(() => {
    const fetchUserCurrentLoans = async () => {
      if (authState && authState.isAuthenticated) {
        const url = `http://localhost:8080/api/books/secure/currentLoans`;
        const requestOptions = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            'Content-Type': 'application/json'
          }
        };
        const shelfCurrentLoansResponse = await fetch(url, requestOptions);
        if (!shelfCurrentLoansResponse.ok) {
          throw new Error('Something went wrong')
        }
        const shelfCurrentLoansResponseJson = await shelfCurrentLoansResponse.json();
        setShelfCurrentLoans(shelfCurrentLoansResponseJson);
      }
      setIsLoadingUserLoans(false);
    }
    fetchUserCurrentLoans().catch((error: any) => {
      setIsLoadingUserLoans(false);
      setHttpError(error.message);
    })
    window.scrollTo(0, 0)
  }, [authState]);

  if (isLoadingUserLoans) {
    return (
      <SpinnerLoading />
    )
  }
  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    )
  }




  return (
    <div>
      {/* Desktop */}
      <div className="d-none d-lg-block mt-2">
        {
          shelfCurrentLoans.length > 0 ?
            <>
              <h5>Empréstimos atuais</h5>

              {shelfCurrentLoans.map(shelfCurrentLoan => (
                <div key={shelfCurrentLoan.book.id}>
                  <div className="row mt-3 mb-3">
                    <div className="col-4 col-md-4 container">
                      {
                        shelfCurrentLoan.book ?
                          <img
                            src={require('./../../../Images/BooksImages/' + shelfCurrentLoan.book?.img)}
                            alt="book"
                            width='226'
                            height='349' />
                          :
                          <img src={require('./../../../Images/BooksImages/livro-1.jpg')}
                            alt="book"
                            width='226'
                            height='349' />
                      }
                    </div>
                    <div className="card col-3 col-md-3 container d-flex">
                      <div className="card-body">
                        <div className="mt-3">
                          <h4>Opções de Empréstimo</h4>
                          {shelfCurrentLoan.daysLeft > 0 &&
                            <p className="text-secondary">
                              Vencimento em {shelfCurrentLoan.daysLeft} dias.
                            </p>
                          }
                          {shelfCurrentLoan.daysLeft == 0 &&
                            <p className="text-success">
                              Vencimento hoje.
                            </p>
                          }
                          {shelfCurrentLoan.daysLeft < 0 &&
                            <p className="text-danger">
                              Vencimento passou por {shelfCurrentLoan.daysLeft} dias.
                            </p>
                          }
                          <div className="list-group mt-3">
                            <button
                              className="list-group-item list-group-item-action"
                              aria-current="true"
                              data-bs-toggle="modal"
                              data-bs-target={`#modal${shelfCurrentLoan.book.id}`}
                            >
                              Gerenciar empréstimo
                            </button>
                            <Link to={'search'} className="list-group-item list-group-item-action">
                              Procura mais livros?
                            </Link>
                          </div>
                        </div>
                        <hr />
                        <p className="mt-3">
                          Ajude outros a encontrarem aventuras avaliando seus empréstimos.
                        </p>
                        <Link className="btn btn-primary" to={`/checkout/${shelfCurrentLoan.book.id}`}>
                          Deixe uma avaliação.
                        </Link>
                      </div>
                    </div>
                  </div>
                  <hr />

                </div>
              ))}
            </>
            :
            <>
              <h3 className="mt-3">
                Atualmente, nenhum empréstimo.
              </h3>
              <Link className="btn btn-primary" to={'search'}>
                Procure um novo livro.
              </Link>
            </>

        }
      </div>


      {/* Mobile */}
      <div className="container d-lg-none mt-2">
        {
          shelfCurrentLoans.length > 0 ?
            <>
              <h5 className="mb-3">Empréstimos atuais</h5>

              {shelfCurrentLoans.map(shelfCurrentLoan => (
                <div key={shelfCurrentLoan.book.id}>
                  <div className="d-flex justify-content-center align-items-center">
                    {
                      shelfCurrentLoan.book ?
                        <img
                          src={require('./../../../Images/BooksImages/' + shelfCurrentLoan.book?.img)}
                          alt="book"
                          width='226'
                          height='349' />
                        :
                        <img src={require('./../../../Images/BooksImages/livro-1.jpg')}
                          alt="book"
                          width='226'
                          height='349' />
                    }
                  </div>
                  <div className="card d-flex mt-5 mb-3">
                    <div className="card-body container">
                      <div className="mt-3">
                        <h4>Opções de Empréstimo</h4>
                        {shelfCurrentLoan.daysLeft > 0 &&
                          <p className="text-secondary">
                            Vencimento em {shelfCurrentLoan.daysLeft} dias.
                          </p>
                        }
                        {shelfCurrentLoan.daysLeft == 0 &&
                          <p className="text-success">
                            Vencimento hoje.
                          </p>
                        }
                        {shelfCurrentLoan.daysLeft < 0 &&
                          <p className="text-danger">
                            Vencimento passou por {shelfCurrentLoan.daysLeft} dias.
                          </p>
                        }
                        <div className="list-group mt-3">
                          <button
                            className="list-group-item list-group-item-action"
                            aria-current="true"
                            data-bs-toggle="modal"
                            data-bs-target={`#mobilemodal${shelfCurrentLoan.book.id}`}
                          >
                            Gerenciar empréstimo
                          </button>
                          <Link to={'search'} className="list-group-item list-group-item-action">
                            Procura mais livros?
                          </Link>
                        </div>
                      </div>
                      <hr />
                      <p className="mt-3">
                        Ajude outros a encontrarem aventuras avaliando seus empréstimos.
                      </p>
                      <Link className="btn btn-primary" to={`/checkout/${shelfCurrentLoan.book.id}`}>
                        Deixe uma avaliação.
                      </Link>
                    </div>
                  </div>

                  <hr />

                </div>
              ))}
            </>
            :
            <>
              <h3 className="mt-3">
                Atualmente, nenhum empréstimo.
              </h3>
              <Link className="btn btn-primary" to={'search'}>
                Procure um novo livro.
              </Link>
            </>

        }
      </div>


    </div>
  );
}