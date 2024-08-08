import React, { useRef, useEffect } from 'react';

const VirtualBackground = ({ stream, backgroundImage }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (stream && videoRef.current && canvasRef.current) {
      videoRef.current.srcObject = stream;
      const ctx = canvasRef.current.getContext('2d');
      const img = new Image();
      img.src = backgroundImage;
      img.onload = () => {
        const drawFrame = () => {
          ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
          ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
          requestAnimationFrame(drawFrame);
        };
        drawFrame();
      };
    }
  }, [stream, backgroundImage]);

  return (
    <div>
      <video ref={videoRef} style={{ display: 'none' }} autoPlay playsInline />
      <canvas ref={canvasRef} width={640} height={480} />
    </div>
  );
};

export default VirtualBackground;
