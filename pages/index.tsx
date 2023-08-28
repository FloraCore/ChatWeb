import {App, Button, Card, ConfigProvider, Layout, message, theme} from "antd";
import copy from "copy-to-clipboard";
import HeaderComponent from "../components/header";
import React, {useState} from "react";
import i18n from "../data/i18n";

export default function IndexPage() {

    const [messageApi, contextHolder] = message.useMessage();
    const [dark, setDark] = useState(false);
    const { t } = i18n;
    const copyClick = () => {
        copy("/fc chat ");
            messageApi.success(t("message.copied")).then(() => messageApi);
    }
    const {
        token: { colorBgContainer}
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
                    <Layout.Header style={{ background: dark ? '#141414' : colorBgContainer, display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                        <HeaderComponent setDark={setDark} dark={dark} colorBgContainer={colorBgContainer}></HeaderComponent>
                    </Layout.Header>
                    <Layout.Content>
                        {contextHolder}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minHeight: '100vh',
                        }}>
                            <Card title={t("home.title")} extra={<a href="/demo">{t("home.demo")}</a>}
                                style={{width: 400, margin: 'auto'}}>
                                <p>{t("home.generate")}</p>
                                · {t("home.instruction1")} <Button type="dashed" size={"small"} onClick={copyClick}>/fc chat [displayName]</Button><br/>
                                · {t("home.instruction2")}
                            </Card>
                        </div>
                    </Layout.Content>
                </Layout>
            </ConfigProvider>
        </App>
    )
}
