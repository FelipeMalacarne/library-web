import { useState } from "react";
import { StarsReview } from "./StarsReview";

export const LeaveReview: React.FC<{submitReview: any}> = (props) => {
  
  const [starInput, setStarInput] = useState(0);
  const [displayInput, setDisplayInput] = useState(false);
  const [reviewDescription, setReviewDescription] = useState('');

  function starValue(value: number){
    setStarInput(value / 2);
    setDisplayInput(true);
  }

  
  return(
    <div className="dropdown" style={{cursor: 'pointer'}}>
      <h5 className="dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle='dropdown'>
        Leave a review?
      </h5>
      <ul id="submitReviewRating" className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        {[...Array(11)].map((_, i) =>
          <li key={i}><button onClick={() => starValue(i)} className="dropdown-item">{i/2} star</button></li>
        )}
      </ul>
      <StarsReview rating={starInput} size={32}/>

      {displayInput &&
        <form method="POST" action='#'>
          <hr />
          <div className="mb-3">
            <label className="form-label">
              Description
            </label>
            <textarea 
              className="form-control" 
              id="submitReviewDescription"
              placeholder="Optional"
              rows={3}
              onChange={e => setReviewDescription(e.target.value)}
              >
            </textarea>
          </div>
          <div>
            <button type="button" onClick={() => props.submitReview(starInput, reviewDescription)} className="btn btn-primary mt-3">
              Submit Review
            </button>
          </div>
        </form>
      }

    </div>
  );
}