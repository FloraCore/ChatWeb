import {Button, Card, ConfigProvider, message} from "antd";
import copy from "copy-to-clipboard";

export default function IndexPage() {
    const [messageApi, contextHolder] = message.useMessage();
    const copyClick = () => {
        copy("/fc chat ");
        messageApi.success("已复制到剪贴板").then(() => messageApi);
    }

    return (
        <ConfigProvider
            theme={{
                token: {
                    "borderRadius": 14,
                    "colorPrimary": "#009292",
                    "colorInfo": "#009292",
                    "colorError": "#da4648",
                },
            }}
        >
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
        }}>
            {contextHolder}
                <Card title="FloraCore 聊天查看器" extra={<a href="/demo">查看演示</a>} style={{ width: 400, margin: 'auto'}}>
                    <p>要生成详细聊天报告，请执行以下操作：</p>
                    · 在游戏内或控制台中输入 <Button type="dashed" size={"small"} onClick={copyClick}>/fc chat [玩家名]</Button><br/>
                    · 执行需要权限到操作<br/>
                    · 打开生成到URL
                </Card>
        </div>
        </ConfigProvider>
    )
}
