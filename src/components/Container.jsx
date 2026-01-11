

const Container = ({children , className}) => {
    return (
        <div className={` mx-auto ${className}`}>{children}</div>
    )
}

export default Container