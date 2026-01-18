
import { IoIosArrowBack } from "react-icons/io";

const PrevArrow = (props) => {
    const { onClick } = props;

    return (
        <div className="absolute top-[50%] -left-55 -translate-y-[30%] shadow-lg z-10 cursor-pointer p-4 rounded-full hover:bg-[#80B500] bg-white duration-300 text-[#80B500] hover:text-white" onClick={onClick}>
            <IoIosArrowBack  className="text-4xl "/>
        </div>
    );
};

export default PrevArrow;