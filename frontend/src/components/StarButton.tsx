import { Star } from "lucide-react";
import { useState } from "react";

interface Props {
  initialStarred: boolean | undefined;
  onToggle: (value: boolean) => void;
}

function StarButton({ initialStarred, onToggle }: Props) {
  const [starred, setStarred] = useState(initialStarred);

  const handleClick = () => {
    const newValue = !starred;
    setStarred(newValue);
    onToggle(newValue); // notify parent
  };
  return (
    <button
      className="text-amber-600 cursor-pointer hover:text-amber-800"
      title={starred ? "Unstar" : "Star"}
      onClick={handleClick}
      type="button"
    >
      {starred ? (
        <Star className="h-5 w-5 fill-amber-600" />
      ) : (
        <Star className="h-5 w-5 fill-white stroke-amber-600" />
      )}
    </button>
  );
}

export default StarButton;
