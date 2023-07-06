import React, { useEffect, useRef } from 'react';

const CircleRating = ({ rating, size, displayAsPercentage }) => {
  const canvasRef = useRef(null);
  const radius = size * 0.4;
  const center = size / 2;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const text = displayAsPercentage ? `${rating}%` : `${rating}`;

    const percent = rating / 100;
    const startAngle = Math.PI * -0.5;
    const endAngle = startAngle + percent * Math.PI * 2;

    let color;
    if (rating >= 70) {
      color = 'green';
    } else if (rating >= 30) {
      color = 'orange';
    } else {
      color = 'red';
    }

    context.clearRect(0, 0, size, size);

    context.beginPath();

    context.arc(center, center, radius, 0, Math.PI * 2);
    context.strokeStyle = '#ddd';
    context.lineWidth = size * 0.1;
    context.fillStyle = '#000';
    context.fill();
    context.stroke();

    context.beginPath();
    context.arc(center, center, radius, startAngle, endAngle);
    context.strokeStyle = color;
    context.lineWidth = size * 0.1;
    context.stroke();

    context.fillStyle = 'white';
    context.font = `${size * 0.16}px Arial`;
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.fillText(text, center, center);
  }, [rating, size]);

  return (
    <>
      <canvas ref={canvasRef} width={size} height={size}></canvas>
    </>
  );
};

export default CircleRating;