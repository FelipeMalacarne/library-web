import { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import MessageModel from "../../../models/MessageModel";
import { error } from "console";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";

export const Messages = () => {
  
  const { authState } = useOktaAuth();
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const [httpError, setHttpError] = useState(null);

  // Messages
  const [messages, setMessages] = useState<MessageModel[]>([]);

  // Pagination
  const [messagesPerPage, setMessagesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() =>{
    const fetchUserMessages = async () => {
      if(authState && authState?.isAuthenticated){
        const envUrl = process.env.REACT_APP_BASE_URL;
        const url = `${envUrl}/api/messages/search/findByUserEmail?email=${authState?.accessToken?.claims.sub }&page=${currentPage - 1}&size=${messagesPerPage}`;

        const requestOptions = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            'Content-Type': 'application/json'
          }
        };
        const messagesResponse = await fetch(url, requestOptions);
        if(!messagesResponse.ok){
          throw new Error('Something went wrong');
        }
        const messagesResponseJson = await messagesResponse.json();
        setMessages(messagesResponseJson._embedded.messages);
        setTotalPages(messagesResponseJson.page.totalPages);
      }
      setIsLoadingMessages(false);
    }
    fetchUserMessages().catch((error: any) => {
      setIsLoadingMessages(false);
      setHttpError(error.messages);
    });
    window.scrollTo(0, 0);

  },[authState, currentPage])

  if(isLoadingMessages){
    return(
      <SpinnerLoading/>
    );
  }

  if(httpError){
    return (
      <div className="alert alert-danger" role="alert">
        {httpError}
      </div>
    );
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (

  );
}