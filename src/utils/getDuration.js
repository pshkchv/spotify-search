export const getDuration = (ms) => {
  const duration = {
    minutes: Math.floor(ms / 60000),
    seconds: ((ms % 60000) / 1000).toFixed(0)
  }

  return `${duration.minutes}:${duration.seconds}`
};
