
const Container = ({children , className}) => {
    return (
        <div className={`max-w-292.5 mx-auto ${className}`}>{children}</div>
    )
}

export default Container