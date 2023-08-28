import {ChatData} from "../data/chatData";
import {Avatar, Card, CollapseProps, Descriptions, DescriptionsProps, Space, Tag, Tree} from "antd";
import ChatListComponent from "./list";
import type {DataNode} from 'antd/es/tree';
import {DownOutlined} from "@ant-design/icons";
import React, {useState} from "react";

export default function ServerTableComponent({data, metadata}: ChatData) {
    const [expanded, setExpanded] = useState<React.Key[]>([]);

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
            label: '上传者',
            children: <Space>{getUploaderAvatar(metadata.uploader.name)}{metadata.uploader.name}</Space>,
        },
        {
            key: '2',
            label: '目标',
            children: <Space>{getUploaderAvatar(metadata.target)}{metadata.target}</Space>,
        },
        {
            key: '3',
            label: '上传时间',
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
            <Space direction={"vertical"} style={{
                display: 'flex',
                alignItems: 'center',
                minHeight: '100vh',
            }}>
                <Card title={"链接信息"} style={{maxWidth: 1000}}>
                    <Descriptions items={descriptionItems}/>
                </Card>

                <Card title={"详细信息"} style={{width: 1000}}>
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