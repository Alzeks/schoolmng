'use client'

//import Image from "next/image";
import { useRouter } from "next/navigation";
//import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece]

const events = {
    id: 1,
    title: 'title',
    time: '12:00 pm - 2:00 pm',
    disc: 'discretion'
}

const EventCalendar = () => {
    const [value, onChange] = useState<Value>(new Date())
    const router = useRouter()
    useEffect(() => {
        if (value instanceof Date) { router.push(`?date=${value}`) }
    }, [value])
    return <Calendar onChange={onChange} value={value} />

}

export default EventCalendar;