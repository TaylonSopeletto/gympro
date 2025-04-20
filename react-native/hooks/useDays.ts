import { useEffect, useState } from "react";
import { useSession } from "@/ctx";
import { dayService, IDay } from "@/services/fetchDay";

export const useDays = () => {
    const [days, setDays] = useState<IDay[]>([])
    const [error, setError] = useState<string>('')
    const { session } = useSession();

    useEffect(() => {
        if (session) {
            dayService({ token: session })
                .then(res => {
                    setDays(res.data)
                })
                .catch(e => {
                    setError(e.message)
                })
        }
    }, [session])

    return { days, error }
}