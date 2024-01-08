import sprite from "./sprite.svg";
const Star = ({ color = "green", Hsize = 2, Wsize = 2, onRate, fullStarDisplay, onMouseHovering, onMouseLeaving }) => {
  const starStyles = {
    fill: color,
    height: `${Hsize}rem`,
    width: `${Wsize}rem`,
    cursor: "pointer",
    marginRight: "6px",
  };
  return (
    <span onClick={onRate} onMouseEnter={onMouseHovering} onMouseLeave={onMouseLeaving}>
      {fullStarDisplay ? (
        <svg  className="icon icon-star-full" style={starStyles}>
          <use xlinkHref={`${sprite}#icon-star-full`}></use>
        </svg>
      ):(
        <svg className="icon icon-star-empty" style={starStyles}>
          <use xlinkHref={`${sprite}#icon-star-empty`}></use>
        </svg>
      )}
    </span>
  );
};

export default Star;
