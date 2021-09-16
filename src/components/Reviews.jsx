import { StarRounded, StarHalfRounded } from "@material-ui/icons";

const Reviews = (props) => {
  const starRatingCalc = (str) => {
    let roundHalf = (num) => {
      return Math.round(num * 2) / 2;
    };
    if (str > 5.0) return "average rating greater than 5.00";

    let actualRating = roundHalf(str);
    const result = [];
    const style = { color: "gold", fontSize: "35px" };
    const emptyStyle = { color: "#d4d4d4", fontSize: "35px" };
    const rateMappings = {
      0: <StarRounded style={{ ...emptyStyle }} />,
      0.5: <StarHalfRounded style={{ ...style }} />,
      1: <StarRounded style={{ ...style }} />,
    };

    for (let i = 1; i <= 5; i++) {
      const difference = actualRating;
      actualRating = actualRating - 1;
      if (difference > 0.5) {
        result.push(rateMappings[1]);
      } else if (difference === 0.5) {
        result.push(rateMappings[0.5]);
      } else {
        result.push(rateMappings[0]);
      }
    }

    return result;
  };

  return (
    <div>
      <div className="productItem productDetail">
        <div className="productContainer">
          <h2 className="productName">{props.productName} </h2>
          <div className="ratingNumDiv">
            <div className="starRating">
              <span className="ratingNumber">
                {props.averageReview?.toFixed(1)}
              </span>
              <div className="ratingDiv">
                {props.averageReview && starRatingCalc(+props.averageReview)}
              </div>
            </div>
            <button
              className="show-modal"
              onClick={() => {
               
                props.setShowModal(!props.showModal);
              }}
            >
              Add review
            </button>
          </div>
        </div>
        <hr />
        <div className="reviews">
          <p>Reviews</p>
          {props.reviewArr &&
            props.reviewArr.map((reviews, i) => (
              <div key={i}>
                <div className="addedReviews">
                  <div className="ratingsStar">
                    {starRatingCalc(reviews.number)}
                  </div>
                  <div className="reviewTextDiv">
                    <span className="storedReviewNumber">{reviews.number}</span>
                    <span className="reviewText"> -{reviews.text}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
