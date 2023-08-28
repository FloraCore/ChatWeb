import {Button, Card, ConfigProvider, Layout, message, Space, theme, Menu, App} from "antd";
import copy from "copy-to-clipboard";
import HeaderComponent from "../components/header";
import {useState} from "react";

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
                    <Layout.Header style={{background: dark ? '#141414' : colorBgContainer}}>
                        <HeaderComponent setDark={setDark}/>
                    </Layout.Header>
                    <Layout.Content>
                        {contextHolder}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minHeight: '100vh',
                        }}>
                            {contextHolder}
                            <Card title="FloraCore 聊天查看器" extra={<a href="/demo">查看演示</a>}
                                style={{width: 400, margin: 'auto'}}>
                                <p>要生成详细聊天报告，请执行以下操作：</p>
                                · 在游戏内或控制台中输入 <Button type="dashed" size={"small"} onClick={copyClick}>/fc chat [玩家名]</Button><br/>
                                · 执行需要权限到操作<br/>
                                · 打开生成到URL
                            </Card>
                        </div>
                    </Layout.Content>
                </Layout>
            </ConfigProvider>
        </App>
    )
}
