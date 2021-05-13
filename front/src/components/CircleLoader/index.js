import PropTypes from 'prop-types';
import React from 'react';

const CircleLoader = ({
  duration, colour, radius, strokeWidth,
}) => {
  const size = radius + strokeWidth;
  const circ = 2 * Math.PI * radius;
  const styleSheet = Array.from(document.styleSheets).find((s) => !s.href);

  const animationName = `countdown-${duration}-${size}`;
  const keyframes = `
    @keyframes ${animationName} {
      0% {
        stroke-dashoffset: 0;
      }
      100% {
        stroke-dashoffset: ${circ};
      }
    }`;

  styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

  return (
    <svg width={size * 2} height={size * 2}>
      <circle
        style={{
          animation: `${animationName} ${duration}s infinite`,
          animationFillMode: 'forwards',
        }}
        cx={0}
        cy={size}
        r={radius}
        stroke={colour}
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeDasharray={`${circ}, ${circ}`}
        strokeDashoffset="0"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
};

CircleLoader.propTypes = {
  colour: PropTypes.string,
  radius: PropTypes.number,
  duration: PropTypes.number,
  strokeWidth: PropTypes.number,
};

CircleLoader.defaultProps = {
  colour: '#999',
  radius: 40,
  duration: 30,
  strokeWidth: 5,
};

export default CircleLoader;
