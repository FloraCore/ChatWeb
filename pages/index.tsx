import {Button, Card, ConfigProvider, message, Space, theme} from "antd";
import copy from "copy-to-clipboard";
import HeaderComponent from "../components/header";
import {useState} from "react";
import {MappingAlgorithm} from "antd/es/theme/interface";

export default function IndexPage() {

    const [messageApi, contextHolder] = message.useMessage();
    const [dark, setDark] = useState(false);
    const { t } = i18n;
    const copyClick = () => {
        copy("/fc chat ");
            messageApi.success(t("message.copied")).then(() => messageApi);
    }


    return (
        <ConfigProvider
            theme={{
                algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm,
                token: {
                    "borderRadius": 14,
                    "colorPrimary": "#009292",
                    "colorInfo": "#009292",
                    "colorError": "#da4648",
                },
            }}
        >
            <HeaderComponent setDark={setDark}/>
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
        </ConfigProvider>
    )
}
