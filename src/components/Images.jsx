

const Images = ({imgSrc , className}) => {
    return (
        <img className={`${className}`} src={imgSrc} alt="" loading="lazy" />
    )
}

export default Images