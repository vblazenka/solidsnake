export const useAnimationFrame = (callback) => {
  let animationLoop;
  let init = performance.now();
  let last = performance.now();

  const animate = (now) => {
    callback({
      time: (now - init) / 1000,
      delta: (now - last) / 1000,
    });

    last = now;
    animationLoop = requestAnimationFrame(animate);
  };

  animationLoop = requestAnimationFrame(animate);
};
