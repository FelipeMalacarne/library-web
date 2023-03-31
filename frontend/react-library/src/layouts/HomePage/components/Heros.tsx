import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";

export const Heros = () => {

    const { authState } = useOktaAuth();

    return (
        <div>
            <div className="d-none d-lg-block">
                <div className="row g-0 mt-5">
                    <div className="col-sm-6 col-md-6">
                        <div className="col-image-left"></div>
                    </div>

                    <div className="col-4 col-md-4 container d-flex justify-content-center align-items-center">
                        <div className="ml-2">
                            <h1>O quê você anda lendo?</h1>
                            <p className="lead">
                                A equipe da biblioteca adoraria saber o que você gosta de ler.
                                Seja para aprender uma nova habilidade ou aperfeicoar outras,
                                nós disponibilizaremos o melhor conteudo para você!
                            </p>
                            {authState?.isAuthenticated ?

                                <Link className="btn main-color btn-lg text-white" to="search">Explore top Books</Link>
                                :
                                <Link className="btn main-color btn-lg text-white" to="/login">Sign Up</Link>
                            }
                        </div>
                    </div>
                </div>
                <div className="row g-0">
                    <div className="col-4 col-md-4 container d-flex justify-content-center align-items-center">
                        <div className="ml-2">
                            <h1>Nossa coleção está sempre mudando!</h1>
                            <p className="lead">
                                Lembre-se de checar nossa coleção todos os dias!
                                Nós trabalhamos sem parar a fim de prover a melhor coleção de livros possível
                                para os estudantes! Sempre tratamos com zelo nossa seleção de livros
                                e a qualidade de nossos livros sempre será a prioridade nº1.
                            </p>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-6">
                        <div className="col-image-right"></div>
                    </div>
                </div>
            </div>


            {/*  Heros*/}
            <div className="d-lg-none">
                <div className="container">
                    <div className="m-2">
                        <div className="col-image-left"></div>
                        <div className="mt-2">
                            <h1>O quê você anda lendo?</h1>
                            <p className="lead">
                                A equipe da biblioteca adoraria saber o que você gosta de ler.
                                Seja para aprender uma nova habilidade ou aperfeicoar outras,
                                nós disponibilizaremos o melhor conteudo para você!
                            </p>
                            {authState?.isAuthenticated ?

                                <Link className="btn main-color btn-lg text-white" to="search">Explore top Books</Link>
                                :
                                <Link className="btn main-color btn-lg text-white" to="/login">Sign Up</Link>
                            }
                        </div>
                    </div>
                    <div className="m-2">
                        <div className="col-image-right"></div>
                        <div className="mt-2">
                            <h1>Nossa coleção está sempre mudando!</h1>
                            <p className="lead">
                                Lembre-se de checar nossa coleção todos os dias!
                                Nós trabalhamos sem parar a fim de prover a melhor coleção de livros possível
                                para os estudantes! Sempre tratamos com zelo nossa seleção de livros
                                e a qualidade de nossos livros sempre será a prioridade nº1.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}