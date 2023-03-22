import { Link } from "react-router-dom"

export const ExploreTopBooks = () => {
    return (
        <div className="p-5 mb-4 bg-dark header">
            <div className="container-fluid py-5 text-white d-flex justify-content-center align-items-center d-flex">
                <div>
                    <h1 className="display-5 fw-bold">Encontre sua próxima aventura</h1>
                    <p className="col-md-8 fs-4">Onde você gostaria de ir?</p>
                    <Link type="button" className="btn main-color btn-lg text-white" to={"/search"}>
                        Explore os livros</Link>
                </div>
            </div>
        </div>
    )
}