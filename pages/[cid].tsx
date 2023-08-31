import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {demoStr} from "../data/demo";
import {message} from "antd";
import ErrorComponent from "../components/error";
import {ChatData} from "../data/chatData";
import ServerTableComponent from "../components/table";
import i18n from "../data/i18n";

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
    const {t} = i18n;

    const [data, setData] = useState<ChatData>();
    const [state, setLoadingState] = useState(Status.Init);
    const [messageApi, contextHolder] = message.useMessage();
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
                content: t("prompt-box.loading")
            }).then(() => {
            });

            messageApi.open({
                key: messageKey,
                type: "loading",
                content: t("prompt-box.loading")
            }).then(() => {
            });

            if (cid == "demo") {
                setData(JSON.parse(demoStr()));
                messageApi.open({
                    key: messageKey,
                    type: 'success',
                    content: t("prompt-box.load-successful"),
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
                                content: t("prompt-box.load-successful"),
                                duration: 2,
                            }).then(() => {
                            });
                            setLoadingState(Status.Success)
                        } else {
                            messageApi.open({
                                key: messageKey,
                                type: 'error',
                                content: t("prompt-box.load-failed-link"),
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
                            content: t("prompt-box.load-failed") + reason,
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
            {contextHolder}
            <div style={{position: "relative", top: 20}}>
                {getComponent()}
            </div>
        </>
    )
}