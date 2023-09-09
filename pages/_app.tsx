import { App, Col, ConfigProvider, Grid, Layout, Row, theme } from 'antd';
import '../reset.css';
import { AppProps } from 'next/app';
import HeaderComponent from '../components/header';
import { useEffect, useState } from 'react';
import Head from "next/head";
import Column from 'antd/es/table/Column';
import i18n from '../data/i18n';

function Entry({ Component, pageProps }: AppProps) {
    const [dark, setDark] = useState(false);
    useEffect(() => {
        i18n.changeLanguage(navigator.language);
    }, [])
    const {
        token: { colorBgContainer }
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
                <Head>
                    <meta charSet="UTF-8" />
                    <link rel="icon" href="/logo.svg" type="image/svg+xml" />
                    <title>FloraCore | 聊天记录查看器</title>
                    <meta name="description" content="The Web Page of Chat-Record-Query for FloraCore by Next.js" />
                </Head>
                <Layout style={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh'
                }}>
                    <Layout.Header style={{
                        background: dark ? '#141414' : colorBgContainer,
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        position: 'fixed',
                        width: '100vw',
                        zIndex: 1000,
                        overflow: "hidden"
                    }}>
                        <HeaderComponent setDark={setDark} dark={dark} colorBgContainer={colorBgContainer}></HeaderComponent>
                    </Layout.Header>
                    <Layout.Content style={{
                        flexGrow: 1,
                        marginTop: '64px'
                    }}>
                        <Component {...pageProps} />
                    </Layout.Content>
                </Layout>
            </ConfigProvider>
        </App>
    )
}

export default Entry;