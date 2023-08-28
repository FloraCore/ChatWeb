import { App, Button, Card, ConfigProvider, Layout, message, theme } from "antd";
import copy from "copy-to-clipboard";
import HeaderComponent from "../components/header";
import React, { useState } from "react";
import i18n from "../data/i18n";
import Link from "next/link";

export default function IndexPage() {

    const [messageApi, contextHolder] = message.useMessage();
    const [dark, setDark] = useState(false);
    const { t } = i18n;
    const copyClick = () => {
        copy("/fc chat ");
        messageApi.success(t("message.copied")).then(() => messageApi);
    }
    const {
        token: { colorBgContainer }
    } = theme.useToken()

    return (
        <>
            {contextHolder}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
            }}>
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}>
                    <Card title={t("home.title")} extra={
                        <Link href="/demo">
                            {t("home.demo")}
                        </Link>
                    } style={{ width: 400, margin: 'auto' }}>
                        <p>{t("home.generate")}</p>
                        · {t("home.instruction1")} <Button type="dashed" size={"small"} onClick={copyClick}>/fc
                            chat [displayName]</Button><br />
                        · {t("home.instruction2")}
                    </Card>
                </div>
            </div>
        </>
    )
}
