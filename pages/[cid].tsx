import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {demoStr} from "../data/demo";
import {ConfigProvider, Layout, message, theme} from "antd";
import ErrorComponent from "../components/error";
import {ChatData} from "../data/chatData";
import ServerTableComponent from "../components/table";
import HeaderComponent from "../components/header";


enum Status {
    Init,
    Loading,
    Success,
    Error
}

export default function IndexPage() {
    const router = useRouter()
    const {cid} = router.query;
    const messageKey = "loading";

    const [data, setData] = useState<ChatData>();
    const [state, setLoadingState] = useState(Status.Init);
    const [messageApi, contextHolder] = message.useMessage();
    const [dark, setDark] = useState(false);

    const {
        token: { colorBgContainer}
    } = theme.useToken()

    const getComponent = () => {
        switch (state) {
            case Status.Error:
                return <ErrorComponent/>;
            case Status.Success:
                return <ServerTableComponent metadata={data!.metadata} data={data!.data}/>
            default:
                return null;
        }
    }

    useEffect(() => {
        if (data == undefined && cid != undefined && state == Status.Init) {
            setLoadingState(Status.Loading);
            messageApi.open({
                key: messageKey,
                type: "loading",
                content: "加载中..."
            }).then(() => {
            });

            messageApi.open({
                key: messageKey,
                type: "loading",
                content: "加载中..."
            }).then(() => {
            });

            if (cid == "demo") {
                setData(JSON.parse(demoStr()));
                messageApi.open({
                    key: messageKey,
                    type: 'success',
                    content: '加载成功',
                    duration: 2,
                }).then(() => {
                });
                setLoadingState(Status.Success);
            } else {
                fetch("https://bytebin.floracore.cc/" + cid)
                    .then(promise => promise.text())
                    .then((text) => {
                        if (text != "Invalid path") {
                            setData(JSON.parse(text));
                            messageApi.open({
                                key: messageKey,
                                type: 'success',
                                content: '加载成功',
                                duration: 2,
                            }).then(() => {
                            });
                            setLoadingState(Status.Success)
                        } else {
                            messageApi.open({
                                key: messageKey,
                                type: 'error',
                                content: '加载失败: 链接无效',
                                duration: 2,
                            }).then(() => {
                            });
                            setLoadingState(Status.Error);
                        }

                    })
                    .catch((reason) => {
                        messageApi.open({
                            key: messageKey,
                            type: 'error',
                            content: '加载失败: ' + reason,
                            duration: 2,
                        }).then(() => {
                        });
                        setLoadingState(Status.Error);
                    })
            }
        }
    }, [cid]);


    return (
        <>
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
                        <HeaderComponent setDark={setDark} dark={dark} colorBgContainer={colorBgContainer}/>
                    </Layout.Header>
                    <Layout.Content>
                {contextHolder}
                <div style={{position: "relative", top: 20}}>
                    {getComponent()}
                </div>
                    </Layout.Content>
                </Layout>
            </ConfigProvider>
        </>
    )
}