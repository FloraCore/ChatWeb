import React from 'react';
import { Result } from 'antd';
import copy from "copy-to-clipboard";

export default function ErrorComponent() {

    
    const copyClick = () => {
        copy("/fc chat ");
        messageApi.success("已复制到剪贴板").then(() => messageApi);
    }
    return (
        <>
            <Result status="error" title="加载失败" subTitle="请使用下面的代码重新获取">

            </Result>
        </>
    )
}