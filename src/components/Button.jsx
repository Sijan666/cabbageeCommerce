const Button = ({ btnText, className }) => {
  return (
    <button
      className={`${className} text-sm text-white py-4 px-7.5 bg-[#80B500] font-nuni font-bold cursor-pointer`}
    >
      {btnText}
    </button>
  );
};

export default Button;
