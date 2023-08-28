import { App, ConfigProvider, Layout, theme } from 'antd';
import '../reset.css';
import {AppProps} from 'next/app';
import HeaderComponent from '../components/header';
import { useState } from 'react';

function Entry({Component, pageProps}: AppProps) {
    const [dark, setDark] = useState(false);
    const {
        token: {colorBgContainer}
    } = theme.useToken()
    return (
        <App>
            <ConfigProvider
                theme={{
                    algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm,
                    token: {
                        "borderRadius": 10,
                        "colorPrimary": "#009292",
                        "colorInfo": "#009292",
                        "colorError": "#da4648",
                    },
                }}
            >
                <Layout>
                    <Layout.Header style={{
                        background: dark ? '#141414' : colorBgContainer,
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr'
                    }}>
                        <HeaderComponent setDark={setDark} dark={dark} colorBgContainer={colorBgContainer}></HeaderComponent>
                    </Layout.Header>
                    <Layout.Content>
                        <Component {...pageProps}/>
                    </Layout.Content>
                </Layout>
            </ConfigProvider>
        </App>
    )
    // return <Component {...pageProps} />;
}

export default Entry;