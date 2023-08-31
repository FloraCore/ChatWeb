import React from 'react';
import {Button, Card, message, Result} from 'antd';
import copy from "copy-to-clipboard";
import i18n from "../data/i18n";

export default function ErrorComponent() {
    const [messageApi, contextHolder] = message.useMessage();
    const {t} = i18n;

    const copyClick = () => {
        copy("/fcb ");
        messageApi.success(t("message.copied")).then(() => messageApi);
    }
    return (
        <>
            {contextHolder}
            <Result status="error" title={t("error.loading")} subTitle={t("error.prompts")}/>
            <Card style={{width: 400, margin: 'auto'}}>
                ◆ {t("home.instruction1")} <Button type="dashed" size={"small"} onClick={copyClick}>/fcb [ID]</Button><br/>
                ◆ {t("home.instruction2")}
            </Card>
        </>
    )
}