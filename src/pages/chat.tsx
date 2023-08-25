import {useParams} from "@@/exports";
import MetaData from "@/compoents/MetaData";

export default function HomePage() {
    const params = useParams();
    return (
        <div>
            <MetaData time={"2020-01-01 12:00:00 UTC"} target={"2424y8wgf8gg2"} uploader={"24124"}/>
        </div>
    );
}
