
import { IoIosArrowForward } from "react-icons/io";



const NextArrow = (props) => {
    const { onClick } = props;

    return (
        <div className="absolute top-[50%] -right-55 -translate-y-[30%] shadow-lg z-10 cursor-pointer p-4 rounded-full hover:bg-[#80B500] bg-white duration-300 text-[#80B500] hover:text-white" onClick={onClick}>
            <IoIosArrowForward  className="text-4xl" />
        </div>
    );
}

export default NextArrow 