import {ChatData} from "../data/chatData";
import {Avatar, Card, Col, CollapseProps, Descriptions, DescriptionsProps, message, Row, Space, Tag, Tree} from "antd";
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
    const {t} = i18n;

    const onExpand = (expandedKeysValue: React.Key[]): void => {
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
            const text = e.target.innerHTML;
            const match = text.match(/&gt; (.+)/);
            if (match) {
                const extractedText = match[1];
                copy(extractedText);
                messageApi.success(t("message.copied")).then(() => messageApi);
            }
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
            {contextHolder}
            <br/>
            <Row justify={"center"}>
                <Col span={18} sm={24} md={20}>
                    <Space size={'middle'} direction="vertical">
                        <Card title={t("records.information")} style={{width: 'fit-content', maxWidth: '100%'}}>
                            <Descriptions items={descriptionItems}/>
                        </Card>
                        <Card title={t("records.details")} bodyStyle={{wordBreak: 'break-all', width: '100%'}}>
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
                </Col>
            </Row>
        </>
    )
}