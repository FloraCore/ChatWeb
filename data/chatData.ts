export interface ChatData {
    metadata: Metadata;
    data: ServerData[];
}

export interface Count {
    matched: number;
    total: number;
}

export interface Uploader {
    name: string;
    uuid: string;
}

export interface Metadata {
    time: string;
    count: Count;
    uploader: Uploader;
    target: string;
    truncated: boolean;
}

export interface ServerData {
    type: string;
    details: string;
    content: string[];
}