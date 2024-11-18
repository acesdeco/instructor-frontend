const Toggle = ({
  isToggled,
  toggle,
}: {
  isToggled: boolean;
  toggle: () => void;
}) => {
  return (
    <div className="flex items-center">
      <button
        onClick={toggle}
        className={`w-12 h-6 flex items-center rounded-full p-1 transition-all duration-300 ${
          isToggled ? "bg-green-500" : "bg-gray-300"
        }`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
            isToggled ? "translate-x-6" : "translate-x-0"
          }`}
        ></div>
      </button>
    </div>
  );
};

export default Toggle;
