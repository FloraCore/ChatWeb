import {ChatData} from "../data/chatData";
import {Avatar, Card, Col, CollapseProps, Descriptions, DescriptionsProps, Row, Space, Tag, Tree} from "antd";
import ChatListComponent from "./list";
import type {DataNode} from 'antd/es/tree';
import {DownOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import i18n from "../data/i18n";


export default function ServerTableComponent({data, metadata}: ChatData) {
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

    for (let dataKey in data) {
        let chats = data[dataKey].content;
        let children: DataNode[] = [];
        for (let chatsKey in chats) {
            children.push({
                title: chats[chatsKey],
                key: dataKey + " - " + chatsKey
            })
        }

        treeData.push({
            title: <div><Tag>{data[dataKey].type}</Tag>{data[dataKey].details}</div>,
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
            <br />
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