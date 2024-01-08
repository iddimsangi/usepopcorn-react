import { useState } from "react";
import Star from "./Star";
const StarRating = ({ maxRatings }) => {
  const [rating, setRating] = useState(0);
  const[mouseRating, setMouseRating] = useState(0);
  return (
    <div className="StarRating">
      {Array.from({ length: maxRatings }, (_, i) => (
        <Star
          onRate={() => setRating(i + 1)}
          key={i}
          color="yellow"
          Hsize={1.5}
          Wsize={1.5}
          fullStarDisplay={mouseRating ? mouseRating >= i + 1 : rating >= i + 1}
          onMouseHovering={() => setMouseRating(i + 1)}
          onMouseLeaving={() => setMouseRating(0)}
        />
      ))}
      <p className="textstyle">{mouseRating||rating || ""}</p>
    </div>
  );
};

export default StarRating;
