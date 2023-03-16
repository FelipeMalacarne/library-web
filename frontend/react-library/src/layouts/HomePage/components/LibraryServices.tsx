export const LibraryServices = () => {
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
                        <a className="btn main-color btn-large text-white" href="#">
                            Sign Up
                        </a>
                    </div>
                </div>  
                <div className="col-lg-4 offset-lg-1 shadow lost-image"></div>
            </div>
        </div>
    );
}