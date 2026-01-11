import Images from "../Images"

import Button from "../Button"
import { Link } from "react-router-dom"


const Error = () => {
    return (
        <div className="relative">
            {/* <Images imgSrc={} className={'mx-auto mt-[100px]'}/> */}
            <div className="errorBtn text-center absolute left-[50%] -translate-x-[50%] bottom-[70px] ">
                <Link to={"/"}>
                <Button btnText={"Back To Homepage"} className={"cursor-pointer text-[#39AD31]! font-semibold! bg-transparent hover:bg-[#39AD31]! border boder-1 border-[#39AD31]! hover:border-transparent hover:text-white! duration-300"}/>
                </Link>
            </div>
        </div>
    )
}

export default Error