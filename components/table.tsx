import {ChatData} from "../data/chatData";
import {Avatar, Card, CollapseProps, Descriptions, DescriptionsProps, message, Space, Tag, Tree} from "antd";
import ChatListComponent from "./list";
import type {DataNode} from 'antd/es/tree';
import {DownOutlined} from "@ant-design/icons";
import React, {MouseEventHandler, useState} from "react";
import i18n from "../data/i18n";
import randomColor from "../data/randomColor";
import copy from "copy-to-clipboard";


export default function ServerTableComponent({data, metadata}: ChatData) {
    const [messageApi, contextHolder] = message.useMessage();
    const [expanded, setExpanded] = useState<React.Key[]>([]);
    const { t } = i18n;

    const onExpand = (expandedKeysValue: React.Key[]) => {
        setExpanded(expandedKeysValue);
    }

    const getUploaderAvatar = (name: string) => {
        return (
            <div>
                <Avatar shape="square" size="small" src={"https://minotar.net/avatar/" + name}/>
            </div>
        );

    }

    const descriptionItems: DescriptionsProps['items'] = [
        {
            key: '1',
            label: t("records.uploader"),
            children: <Space>{getUploaderAvatar(metadata.uploader.name)}{metadata.uploader.name}</Space>,
        },
        {
            key: '2',
            label: t("records.target"),
            children: <Space>{getUploaderAvatar(metadata.target)}{metadata.target}</Space>,
        },
        {
            key: '3',
            label: t("records.time"),
            children: metadata.time,
        }
    ];

    const treeData: DataNode[] = [];

    const copyClick: MouseEventHandler<HTMLDivElement> = (e) => {
        if (e.target instanceof HTMLElement) {
            copy(e.target.innerHTML);
            messageApi.success(t("message.copied")).then(() => messageApi);
        }
    }

    for (let dataKey in data) {
        let chats = data[dataKey].content;
        let children: DataNode[] = [];
        for (let chatsKey in chats) {
            children.push({
                title: <div onClick={copyClick}>{chats[chatsKey]}</div>,
                key: dataKey + " - " + chatsKey
            })
        }

        treeData.push({
            title: <div><Tag color={randomColor(data[dataKey].type)}>{data[dataKey].type}</Tag>{data[dataKey].details}</div>,
            key: dataKey,
            children
        });
    }

    const listItems: CollapseProps['items'] = [];
    for (let dataKey in data) {
        listItems.push({
            key: dataKey,
            label: data[dataKey].type + " - " + data[dataKey].details,
            children: <ChatListComponent data={data[dataKey].content}/>
        })
    }

    return (
        <>
            <Space direction={"vertical"} style={{
                display: 'flex',
                alignItems: 'center',
                minHeight: '100vh',
            }}>
                {contextHolder}
                <Card title={t("records.information")} style={{maxWidth: 1000}}>
                    <Descriptions items={descriptionItems}/>
                </Card>

                <Card title={t("records.details")} style={{width: 1000}}>
                    <Tree
                        showLine
                        switcherIcon={<DownOutlined rev={undefined}></DownOutlined>}
                        treeData={treeData}
                        expandedKeys={expanded}
                        onExpand={onExpand}
                        selectable={false}
                    />
                </Card>
            </Space>
        </>
    )
}