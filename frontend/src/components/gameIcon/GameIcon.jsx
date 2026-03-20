import "./GameIcon.css";
import { useState } from "react";
import fallbackSrc from "../../assets/placeholder.svg";

const ImageWithFallback = ({ src, alt, className }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [error, setError] = useState(false);

  const handleError = () => {
    if (!error) {
      setImgSrc(fallbackSrc);
      setError(true);
    }
  };

  return (
    <img className={className} src={imgSrc} alt={alt} onError={handleError} />
  );
};

export default function GameIcon(props) {
  return (
    <ImageWithFallback
      className="gameCard-icon"
      src={`../../assets/${props.category}.svg`}
      alt={`${props.category} cover`}
    />
  );
}
