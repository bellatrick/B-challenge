import {useState} from 'react'
import ReactStars from "react-rating-stars-component";
import {
  StarRounded,
  StarHalfRounded,
} from "@material-ui/icons";
  const Reviews=(props)=>{
    const [ratingValue, setRatingValue] = useState();
    const [reviewText, setReviewText] = useState("");
    const [error, setError] = useState(false);
    const [productNumber]=useState(2)
    
   
    const handleSubmit = (e) => {
      e.preventDefault();
    
      setRatingValue(0);
      const productRef = props.dbRef.child(`products/${productNumber}/Reviews`);
      const ratingObj = [
        {
          text: reviewText,
          number: ratingValue,
        },
      ];
      if (!ratingValue) {
        setError("Rating value must contain at least half star");
        return;
      }
      !error&& setReviewText("");
      productRef.push(ratingObj);
      props.setShowModal(false);
    };
      return(
        <div>
  <div className="ratingInput">
          <div className="modalContent">
            <div className="ratingHead">
              {" "}
              <h3>What's your rating?</h3>
            </div>
            <p>Rating</p>
            <span>
              <ReactStars
                {...{
                  size: 60,
                  color:'#d4d4d4',
                  activeColor:'gold',
                  emptyIcon:<StarRounded style={{fontSize:'35px'}} />,
                  halfIcon:<StarHalfRounded style={{fontSize:'35px'}}/>,
                  filledIcon:<StarRounded style={{fontSize:'35px'}}/>,
                  onChange: (newValue) => {
                    setRatingValue(newValue);
                  },
                  isHalf: true,
                  edit: true,
                  value: 0,
                }}
              />
            </span>
            <p>Review</p>
            <form onSubmit={handleSubmit} className="form">
              <div>
                <input
                  required
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="review"
                  type="text"
                  placeholder="Start typing..."
                />
              </div>
              <button className="close-modal" type="submit">
                Submit Review
              </button>
              {error && <p className="error">{error}</p>}
            </form>
          </div>
        </div>

        </div>
      )
  }

  export default Reviews