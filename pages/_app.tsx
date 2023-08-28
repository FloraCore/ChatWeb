import '../reset.css';
import {AppProps} from 'next/app';

function Entry({Component, pageProps}: AppProps) {
    return <Component {...pageProps} />;
}

export default Entry;