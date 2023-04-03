import { Link } from "react-router-dom";
import BookModel from "../../models/BookModel";
import { LeaveReview } from "../Utils/LeaveReview";

export  const CheckoutAndReviewBox: React.FC<{
    book: BookModel | undefined,  
    mobile: boolean, 
    currentLoansCount: number,
    isAuthenticated: any,
    isCheckedOut: boolean,
    checkoutBook: any,
    isReviewLeft: boolean
    submitReview: any
}> 
= (props) => {

    function buttonRender(){
        if(props.isAuthenticated){
            if(!props.isCheckedOut && props.currentLoansCount < 5){
                return(
                    <button onClick={() => props.checkoutBook()} className="btn btn-success btn-lg">Retirar</button>
                );
            } else if(props.isCheckedOut){
                return(
                    <p><b>Livro retirado. Aproveite!</b></p>
                );
            } else if(!props.isCheckedOut){
                return(
                    <p className="text-danger">Muitos livros retirados.</p>
                );
            }
        }
        return (
            <Link to={'/login'} className="btn btn-success btn-lg">Sign in</Link>
        );
    }

    function reviewRender(){
        if(props.isAuthenticated && !props.isReviewLeft){
            return(
                <LeaveReview submitReview={props.submitReview}/>
                // <p>Leave a review Component here.</p>
            );
        } else if(props.isAuthenticated && props.isReviewLeft){
            return(
                <p><b>Obrigado pela sua avaliação!</b></p>
            )
        }
        return (
            <div><hr /><p>Sign in to be able to leave a review</p></div>
        );
    }

    return (
        <div className={props.mobile? 'd-flex mt-5' : 'card col-3 container d-flex mb-5'}>
            <div className="card-body container">
                <div className="mt-3">
                    <p>
                        <b>{props.currentLoansCount}/5 </b>
                        livros emprestados
                    </p>
                    <hr />
                    {props.book && props.book.copiesAvailable && 
                        props.book.copiesAvailable > 0 ? 
                            <h4 className='text-success'>
                                Disponível
                            </h4>
                            :
                            <h4 className="text-danger">
                                Lista de espera
                            </h4>
                    }
                    <div className="row">
                        <p className="col-6 lead">
                            <b>{props.book?.copies} </b>
                            cópias
                        </p>
                        <p className="col-6 lead">
                            <b>{props.book?.copiesAvailable} </b>
                            disponíveis
                        </p>
                    </div>
                </div>
                {buttonRender()}
                <hr />
                <p className="mt-3">
                    Esse número pode mudar até que a solicitação seja concuída.
                </p>
                {reviewRender()}
            </div>
        </div>
    );
}