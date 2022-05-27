import useSWR from 'swr'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { updateTypes } from './plantsSlice'
import { inspect } from 'util'
import styles from '../../styles/Home.module.css'
import Loader from '../../components/loader'


const fetcher = async (
    input: RequestInfo,
    init: RequestInit,
    ...args: any[]
) => {
    const res = await fetch(input, init)
    return res.json()
}

const Plants = () => {
    const {data, error} = useSWR('/api/powerplants', fetcher)
    const types = useAppSelector((state) => state.plants.types)
    const dispatch = useAppDispatch()
    const [isLoading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        setLoading(true)
        if (data) {
            dispatch(updateTypes(data.types))
            setLoading(false)
        }
    }, [data, error])

    if (isLoading)
        return (
            <div className={styles.loader}>
                <Loader />
            </div>
        )

    if (!types.length) return <p>NO data</p>

    return (
        <ul className={styles.list}>
            {types.map((value, idx) => (
                <li
                className={styles.listItem}
                key={`${value}-${idx}`}
                onClick={() => router.push(`/webmap?type=${value}`)}
                >
                    {value}
                </li>
            ))}
        </ul>
    )
}

export default Plants
