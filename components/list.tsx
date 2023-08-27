import {List} from "antd";

export default function ChatListComponent(data: chatListProps) {
    return(
        <>
            <List
                size="small"
                dataSource={data.data}
                renderItem={(item) => <List.Item>{item}</List.Item>}
            />
        </>
    )
}

export interface chatListProps {
    data: string[]
}