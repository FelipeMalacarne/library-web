import { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { StarsReview } from "../Utils/StarsReview";
import { CheckoutAndReviewBox } from "./CheckoutAndReviewBox";
import ReviewModel from "../../models/ReviewModel";
import { LatestReviews } from "./LatestReviews";
import { useOktaAuth } from "@okta/okta-react";

export const BookCheckoutPage = () => {

    const { authState } = useOktaAuth();

    const [book, setBook] = useState<BookModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    // Review state
    const [reviews, setReviews] = useState<ReviewModel[]>([]);
    const [totalStars, setTotalStars] = useState(0);
    const [isLoadingReview, setIsLoadingReview] = useState(true);

    const [isReviewLeft, setIsReviewLeft] = useState(false);
    const [isLoadingUserReview, setIsLoadingUserReview] = useState(true);

    // Loans Count state
    const [currentLoansCount, setCurrentLoansCount] = useState(0);
    const [isLoadingCurrentLoansCount, setIsLoadingCurrentLoansCount] = useState(true);

    // Is Book Checked Out?
    const [isCheckedOut, setIsCheckedOut] = useState(false);
    const [isLoadingCheckedOut, setIsLoadingCheckedOut] = useState(true);

    
    // Fetch Books
    const bookId = (window.location.pathname).split('/')[2];
    useEffect(() => {
        const fetchBook = async () => {
            const baseUrl: string = `http://localhost:8080/api/books/${bookId}`;

            const response = await fetch(baseUrl);
            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            const responseJson = await response.json();

            const loadedBook: BookModel = {
                id: responseJson.idBook,
                title: responseJson.title,
                author: responseJson.author,
                copies: responseJson.copies,
                copiesAvailable: responseJson.copiesAvailable,
                category: responseJson.category,
                description: responseJson.description,
                img: responseJson.img
            };

            setBook(loadedBook);
            setIsLoading(false);
        };

        fetchBook().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, [isCheckedOut]);

    // Fetch Reviews
    useEffect(() => {
        const fetchBookReviews = async () => {
            const reviewUrl: string = `http://localhost:8080/api/reviews/search/findByBookId?bookId=${bookId}`;

            const responseReviews = await fetch(reviewUrl);

            if (!responseReviews.ok) {
                throw new Error('Something went wrong!')
            }

            const responseJsonReviews = await responseReviews.json();

            const responseData = responseJsonReviews._embedded.reviews;

            const loadedReviews: ReviewModel[] = [];

            let weightedStarReviews: number = 0;

            for (const key in responseData) {
                loadedReviews.push({
                    id: responseData[key].id,
                    userEmail: responseData[key].userEmail,
                    date: responseData[key].date,
                    rating: responseData[key].rating,
                    bookId: responseData[key].bookId,
                    reviewDescription: responseData[key].reviewDescription

                })
                weightedStarReviews += responseData[key].rating;
            }

            if (loadedReviews) {
                const round = (Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2).toFixed(1);
                setTotalStars(Number(round));
            }

            setReviews(loadedReviews);
            setIsLoadingReview(false);

        };

        fetchBookReviews().catch((error: any) => {
            setIsLoadingReview(false);
            setHttpError(error.message);
        })

    }, [isReviewLeft]);

    // Fetch User Review
    useEffect(() => {
        const fetchUserReviewBook = async () => {
            if(authState && authState.isAuthenticated){
                const url = `http://localhost:8080/api/reviews/secure/user/book/?bookId=${bookId}`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-type': 'application/json'
                    }
                };
                const userReview = await fetch(url, requestOptions)
                if(!userReview.ok){
                    throw new Error('Something went wrong');
                }
                const userReviewResponseJson = await userReview.json();
                setIsReviewLeft(userReviewResponseJson);
            }
            setIsLoadingUserReview(false);
        }
        fetchUserReviewBook().catch((error: any) => {
            setIsLoadingUserReview(false);
            setHttpError(error.message);
        })
    },[authState]);

    // Fetch User Current Loans
    useEffect(() => {
        const fetchUserCurrentLoansCount = async () => {
            // secure endpoint needs auth
            if (authState && authState.isAuthenticated) {
                const url = `http://localhost:8080/api/books/secure/currentLoans/count`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const currentLoansResponse = await fetch(url, requestOptions);
                if (!currentLoansResponse.ok) {
                    throw new Error('Something went wrong');
                }
                const currentLoansCountResponseJson = await currentLoansResponse.json();
                setCurrentLoansCount(currentLoansCountResponseJson);
            }
            setIsLoadingCurrentLoansCount(false);

        }
        fetchUserCurrentLoansCount().catch((error: any) => {
            setIsLoadingCurrentLoansCount(false);
            setHttpError(error.message);
        })

    }, [authState, isCheckedOut]);

    // Fetch User Check Out Book
    useEffect(() => {
        const fecthUserCheckedOutBook = async () => {
            // secure endpoint needs auth
            if (authState && authState.isAuthenticated){
                const url = `http://localhost:8080/api/books/secure/isCheckedOutByUser/?bookId=${bookId}`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const bookCheckedOut = await fetch(url, requestOptions);

                if(!bookCheckedOut.ok){
                    throw new Error('Something went wrong!');
                }

                const bookCheckedOutResponseJson = await bookCheckedOut.json();
                setIsCheckedOut(bookCheckedOutResponseJson)
            }
            setIsLoadingCheckedOut(false);
        }
        fecthUserCheckedOutBook().catch((error: any) => {
            setIsLoadingCheckedOut(false);
            setHttpError(error.message);
        });

    }, [authState]);


    if (
        isLoading || 
        isLoadingReview || 
        isLoadingCurrentLoansCount || 
        isLoadingCheckedOut || 
        isLoadingUserReview
        ) {
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

    async function checkoutBook(){
        const url = `http://localhost:8080/api/books/secure/checkout/?bookId=${bookId}`;
        const requestOptions = {
            method: 'PUT',
            headers:{
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };
        const checkoutResponse = await fetch(url, requestOptions);
        if(!checkoutResponse.ok){
            throw new Error("Something went wrong!");
        }
        setIsCheckedOut(true);
    } 



    return (
        <div>
            <div className="container d-none d-lg-block">
                <div className="row mt-5">
                    <div className="col-sm-2 col-md-2">
                        {book?.img ?
                            <img src={require('./../../Images/BooksImages/' + book?.img)}
                                width='226' height='349' alt="book" />
                            :
                            <img src={require('./../../Images/BooksImages/livro-1.jpg')}
                                width='226' height='349' alt="book" />
                        }
                    </div>
                    <div className="col-4 col-md-4 container">
                        <div className="ml-2">
                            <h2>{book?.title}</h2>
                            <h5 className="text-primary">{book?.author}</h5>
                            <p className="lead">{book?.description}</p>
                            <StarsReview rating={totalStars} size={32} />
                        </div>
                    </div>
                    <CheckoutAndReviewBox 
                        book={book}  
                        mobile={false} 
                        currentLoansCount={currentLoansCount}
                        isAuthenticated={authState?.isAuthenticated}
                        isCheckedOut={isCheckedOut}
                        checkoutBook={checkoutBook}
                    />  
                </div>
                <hr />
                <LatestReviews reviews={reviews} bookId={book?.id} mobile={false} />
            </div>
            {/* Mobile */}
            <div className="container d-lg-none mt-5">
                <div className="d-flex justify-content-center align-items-center">
                    {book?.img ?
                        <img src={require('./../../Images/BooksImages/' + book?.img)}
                            width='226' height='349' alt="book" />
                        :
                        <img src={require('./../../Images/BooksImages/livro-1.jpg')}
                            width='226' height='349' alt="book" />
                    }
                </div>
                <div className="mt-4">
                    <div className="ml-2">
                        <h2>{book?.title}</h2>
                        <h5 className="text-primary">{book?.author}</h5>
                        <p className="lead">{book?.description}</p>
                        <StarsReview rating={totalStars} size={28} />
                    </div>
                </div>
                <CheckoutAndReviewBox 
                    book={book}
                    mobile={true}
                    currentLoansCount={currentLoansCount}
                    isAuthenticated={authState?.isAuthenticated}
                    isCheckedOut={isCheckedOut}
                    checkoutBook={checkoutBook}
                />
                <hr />
                <LatestReviews reviews={reviews} bookId={book?.id} mobile={true} />
            </div>
        </div>
    );
}