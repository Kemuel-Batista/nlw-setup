import { useEffect, useState } from "react";
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning"
import { HabitDay } from "./HabitDay"
import { api } from "../lib/axios";
import dayjs from "dayjs";

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

const summaryDates = generateDatesFromYearBeginning()

const minimumSummaryDatesSize = 18 * 7;
const amountOfDayToFill = minimumSummaryDatesSize - summaryDates.length

type SummaryProps = {
    id: string;
    date: string;
    amount: number;
    completed: number;
}[]

export function SummaryTable(){
    const [summary, setSummary] = useState<SummaryProps>([]);

    useEffect(() => {
        api.get('summary').then(response => {
            setSummary(response.data);
        })
    }, [])

    return (
        <div className="w-fulll flex">
            <div className="grid grid-rows-7 grid-flow-row gap-3">
                {weekDays.map((weekday, i) => {
                    return (
                        <div key={`${weekday}-${i}`} className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center">
                            {weekday}
                        </div>
                    )
                })}
            </div>

            <div className="grid grid-rows-7 grid-flow-col gap-3">
                {summary.length > 0 && summaryDates.map(date => {
                    const dayInSummary = summary.find(day => {
                        return dayjs(date).isSame(day.date, 'day');
                    })

                    return (
                        <HabitDay 
                            key={date.toString()}
                            date={date}
                            amount={dayInSummary?.amount} 
                            defaultCompleted={dayInSummary?.completed} 
                        />
                    )
                })}

                {amountOfDayToFill > 0 && Array.from({ length: amountOfDayToFill }).map((_, i) => {
                    return (
                        <div key={i} className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"/>
                    )
                })}
            </div>
        </div>
    )
}