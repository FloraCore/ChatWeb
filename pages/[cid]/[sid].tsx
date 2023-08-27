import {useRouter} from "next/router";

export default function IndexPage() {
    const router = useRouter()
    const {cid, sid} = router.query;


    return (
        <>
            {cid}: {sid}
        </>
    )
}