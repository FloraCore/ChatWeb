import React from 'react';
import {Button, Card, message, Result} from 'antd';
import copy from "copy-to-clipboard";

export default function ErrorComponent() {
    const [messageApi, contextHolder] = message.useMessage();

    const copyClick = () => {
        copy("/fc chat ");
        messageApi.success("已复制到剪贴板").then(() => messageApi);
    }
    return (
        <>
            {contextHolder}
            <Result status="error" title="加载失败" subTitle="请参阅下面的提示重新获取"/>
            <Card style={{width: 400, margin: 'auto'}}>
                · 在游戏内或控制台中输入 <Button type="dashed" size={"small"} onClick={copyClick}>/fc chat
                [玩家名]</Button><br/>
                · 执行需要权限到操作<br/>
                · 打开生成到URL
            </Card>
        </>
    )
}