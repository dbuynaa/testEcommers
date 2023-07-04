import React, { useState } from 'react';
import RateComponent from './RateComponent';

function getType(rate, value) {
  if (rate <= value) return 'full';
  if (rate - 0.5 <= value) return 'half';
  return 'empty';
}

const Rate = ({ value, onChange }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleRatingClick = (ratingOnHover: number) => {
    onChange(ratingOnHover);
  };

  return (
    <div className="flex items-center" onMouseLeave={() => setHoverRating(0)}>
      {Array(5)
        .fill(0)
        .map((_, index) => {
          index = index + 1;
          return (
            <React.Fragment key={index}>
              <RateComponent
                color={'#ffc107'}
                size={24}
                type={getType(index, hoverRating || value)}
                onClick={(v) => handleRatingClick(v)}
                rate={index}
                onMouseEnter={(v) => setHoverRating(v)}
              />
            </React.Fragment>
          );
        })}
    </div>
  );
};

export default Rate;

// <svg
//   key={index}
//   aria-hidden="true"
//   className={`w-5 h-5 ${
//     index < (hoverRating || value)
//       ? 'text-yellow-400'
//       : 'text-gray-400 hover:text-yellow-400'
//   }`}
//   fill="currentColor"
//   viewBox="0 0 20 20"
//   xmlns="http://www.w3.org/2000/svg"
//   onClick={() => handleRatingClick(idx + 1)}
//   onMouseEnter={() => setHoverRating(idx + 1)}

// >
//   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
// </svg>
