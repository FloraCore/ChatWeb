import {ChatData} from "../data/chatData";
import {Descriptions, DescriptionsProps} from "antd";

export default function ServerTableComponent({data, metadata}: ChatData) {
    const items: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'UserName',
            children: 'Zhou Maomao',
        },
        {
            key: '2',
            label: 'Telephone',
            children: '1810000000',
        },
        {
            key: '3',
            label: 'Live',
            children: 'Hangzhou, Zhejiang',
        },
        {
            key: '4',
            label: 'Remark',
            children: 'empty',
        },
        {
            key: '5',
            label: 'Address',
            children: 'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China',
        },
    ];

    return (
        <>
            <Descriptions title="User Info" items={items} style={{width: 1000,}} />
        </>
    )
}