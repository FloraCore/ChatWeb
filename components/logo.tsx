export default function Logo(props: LogoProps) {
    const { color, style, ...rest } = props;
    return (
        <>
            <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" id="mx_n_1685809311937" width="32" height="32" style={{ position: "relative", top: 10, ...(style || {}) }} {...rest}>
                <path
                    d="M993.28 793.6q11.264 21.504 10.752 40.448t-11.264 32.768-30.208 22.016-45.056 8.192l-395.264 0-263.168 0-138.24 0q-27.648 0-45.568-10.24t-26.112-26.112-7.168-35.84 11.264-40.448q14.336-27.648 31.232-59.392t34.304-64.512l34.816-65.536q17.408-32.768 33.792-62.464 37.888-70.656 76.8-141.312l130.048 254.976 256-475.136q68.608 120.832 132.096 236.544 27.648 49.152 56.32 101.888t56.832 103.424 53.248 97.28 44.544 83.456z"
                    fill={color}></path>
            </svg>
        </>
    )
}

export interface LogoProps {
    color: string,
    style?: any
}