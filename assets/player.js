const Player = (name, marker) => {
  let points = 0;

  const getName = () => name;
  const getMarker = () => marker;
  const updateScore = () => points++;
  return { getName, getMarker, updateScore };
};

export default Player;
