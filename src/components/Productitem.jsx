import { useState, useEffect } from "react";
import { dbRef } from "../Utils/firebase";
import { CircularProgress } from "@material-ui/core";
import ReviewInput from "./ReviewInput";
import Reviews from "./Reviews";
const ProductItem = () => {
  const [loading, setLoading] = useState(true);
  const [reviewArr, setreviewArr] = useState();
  const [productName, setProductName] = useState();
  const [showModal, setShowModal] = useState(false);
  const productRef = dbRef.child("products/" + 2);
  const productItem = dbRef.child("products");
  const [averageReview, setAverageReview] = useState();
 
  useEffect(() => {
    productItem.on("child_added", (snap) => {
      let productItem = snap.val();
      setProductName(productItem.name);
    });
    const ref = productRef.on("value", (snap) => {
      console.log("reload");
      const productArray = [];
      snap.forEach((snapshot) => productArray.push(snapshot.val()));
      console.log(productArray, "productArray");
      if (productArray.length > 0) {
        setLoading(false);
        const productArr = Object.values(productArray[0]);
        let aveReview = productArr
          .flatMap((reviews) => reviews)
          .map(({ number }) => number)
          .reduce((a, b) => a + b, 0)
          .toFixed(2);
        let reviewArray = productArr.flatMap((reviews) => reviews);
        setreviewArr(reviewArray);

        setAverageReview(aveReview / productArr.length);
        console.log(averageReview, productArr);
      }
    });
    return () => {
      productRef.off("value", ref);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      {loading ? (
        <CircularProgress style={{margin:'10px auto'}} />
      ) : (
        <Reviews
          productName={productName}
          averageReview={averageReview}
          reviewArr={reviewArr}
          
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
      {showModal && <ReviewInput dbRef={dbRef} setShowModal={setShowModal} />}
    </div>
  );
};

export default ProductItem;
