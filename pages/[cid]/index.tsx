import {useRouter} from "next/router";
import {useState} from "react";
import {demoStr} from "../../data/demo";
import {message} from "antd";
import ErrorComponent from "../../components/error";

export default function IndexPage() {
    const router = useRouter()
    const {cid} = router.query;
    const messageKey = "loading";

    const [dataStr, setDataStr] = useState("");
    const [state, setState] = useState("init");
    const [messageApi, contextHolder] = message.useMessage();

    if (state == "init") {
        messageApi.open({
            key: messageKey,
            type: "loading",
            content: "加载中..."
        }).then(() => {
        });
    }

    if (dataStr == "" && cid != undefined && state == "init") {
        setState("loading");

        if (cid == "demo") {
            setDataStr(demoStr);
            messageApi.open({
                key: messageKey,
                type: 'success',
                content: '加载成功',
                duration: 2,
            }).then(() => {
            });
            setState("success");
        } else {
            fetch("https://bytebin.floracore.cc/" + cid)
                .then(promise => promise.text())
                .then((text) => {
                    if (text != "Invalid path") {
                        setDataStr(text);
                        messageApi.open({
                            key: messageKey,
                            type: 'success',
                            content: '加载成功',
                            duration: 2,
                        }).then(() => {
                        });
                        setState("success")
                    } else {
                        messageApi.open({
                            key: messageKey,
                            type: 'error',
                            content: '加载失败: 不存在',
                            duration: 2,
                        }).then(() => {
                        });
                        setState("error");
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
                    setState("error");
                })
        }
    }

    return (
        <>
            {contextHolder}
            {cid}<br/>
            {dataStr}
            <ErrorComponent/>
        </>
    )
}