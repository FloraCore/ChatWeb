import {ChatData} from "../data/chatData";
import {Card, CollapseProps, Descriptions, DescriptionsProps, Space, Tag, Tree} from "antd";
import {Collapse} from "antd/lib";
import ChatListComponent from "./list";
import type { DataNode, TreeProps } from 'antd/es/tree';
import {DownOutlined} from "@ant-design/icons";
import React, {useState} from "react";

export default function ServerTableComponent({data, metadata}: ChatData) {
    const [expanded, setExpanded] = useState([]);

    const onExpand = (expandedKeysValue: React.Key[]) => {
        setExpanded(expandedKeysValue);

    }

    const descriptionItems: DescriptionsProps['items'] = [
        {
            key: '1',
            label: '上传者',
            children: metadata.uploader.name,
        },
        {
            key: '2',
            label: '目标',
            children: metadata.target,
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
                key: dataKey + " - " +chatsKey
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
                    <Descriptions items={descriptionItems} />
                </Card>

                    {/*<Collapse style={{width: 1000}} items={listItems} />*/}
                <Card title={"详细信息"} style={{width: 1000}}>
                    <Tree
                        showLine
                        switcherIcon={<DownOutlined />}
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