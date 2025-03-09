export const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 256); // Random Red
    const g = Math.floor(Math.random() * 256); // Random Green
    const b = Math.floor(Math.random() * 256); // Random Blue
    return `rgba(${r}, ${g}, ${b}, 0.2)`
  };