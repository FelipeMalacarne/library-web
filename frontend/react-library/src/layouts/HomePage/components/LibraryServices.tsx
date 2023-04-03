import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";

export const LibraryServices = () => {

    const { authState } = useOktaAuth();


    return (
        <div className="container my-5">
            <div className="row p-4 align-items-center border shadow-lg">
                <div className="col-lg-7 p-3">
                    <h1 className="display-4 fw-bold">
                        Não encontra o que procura?
                    </h1>
                    <p className="lead">
                        Se você não consegue encontrar o que procura,
                        envie uma mensagem para nosso admin da biblioteca!
                    </p>
                    <div className="d-grid gap-2 justify-content-md-start mb-4 mb-lg-3">
                        {
                            authState?.isAuthenticated ?
                                <Link to="#" className="btn main-color btn-lg px-4 me-md-2 fw-bold text-white">Serviços da Biblioteca</Link>
                                :
                                <Link to='/login' className="btn main-color btn-large text-white">
                                    Sign Up
                                </Link>
                        }

                    </div>
                </div>
                <div className="col-lg-4 offset-lg-1 shadow lost-image"></div>
            </div>
        </div>
    );
}