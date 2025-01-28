const Spinner = ({ size = "50px", color = "#000", loading = true }) => {
  if (!loading) return null;

  const spinnerStyle = {
    width: size,
    height: size,
    borderColor: `${color} transparent ${color} transparent`,
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className="animate-spin rounded-full border-4 border-solid"
        style={spinnerStyle}
      ></div>
    </div>
  );
};

export default Spinner;
