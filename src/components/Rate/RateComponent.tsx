const RateComponent = ({
  color,
  size = 24,
  type,
  onClick,
  onMouseEnter,
  rate
}) => {
  const fill = color;
  const width = type === 'full' ? size : type === 'half' ? size / 2 : 0;
  return (
    <div
      style={{ width: size, height: size }}
      className="relative text-gray-300"
    >
      <div
        className="absolute top-0 left-0 h-full w-1/2 z-10"
        onMouseEnter={() => onMouseEnter(rate - 0.5)}
        onClick={() => onClick(rate - 0.5)}
      ></div>
      <div
        className="absolute top-0 left-0 h-full w-1/2 translate-x-full z-10"
        onMouseEnter={() => onMouseEnter(rate)}
        onClick={() => onClick(rate)}
      ></div>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        className="absolute top-0 left-0 -z-10  fill-current"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10.788 3.21009C11.236 2.13309 12.764 2.13309 13.212 3.21009L15.294 8.21709L20.698 8.65009C21.862 8.74309 22.334 10.1951 21.447 10.9551L17.33 14.4821L18.587 19.7551C18.858 20.8911 17.623 21.7881 16.627 21.1801L12 18.3541L7.373 21.1801C6.377 21.7881 5.142 20.8901 5.413 19.7551L6.67 14.4821L2.553 10.9551C1.666 10.1951 2.138 8.74309 3.302 8.65009L8.706 8.21709L10.788 3.21009Z"
        />
      </svg>
      <svg
        width={width}
        height={size}
        viewBox={`0 0 ${width} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_1049_12981)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.788 3.21009C11.236 2.13309 12.764 2.13309 13.212 3.21009L15.294 8.21709L20.698 8.65009C21.862 8.74309 22.334 10.1951 21.447 10.9551L17.33 14.4821L18.587 19.7551C18.858 20.8911 17.623 21.7881 16.627 21.1801L12 18.3541L7.373 21.1801C6.377 21.7881 5.142 20.8901 5.413 19.7551L6.67 14.4821L2.553 10.9551C1.666 10.1951 2.138 8.74309 3.302 8.65009L8.706 8.21709L10.788 3.21009Z"
            fill={fill}
          />
        </g>
        <defs>
          <clipPath id="clip0_1049_12981">
            <rect width={width} height={size} fill={fill} />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default RateComponent;
