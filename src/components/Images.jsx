const Images = ({ imgSrc, className, alt = "", loading = "lazy", fetchPriority }) => {
    return (
        <img className={`${className}`} src={imgSrc} alt={alt} loading={loading} fetchpriority={fetchPriority} />
    )
}

export default Images