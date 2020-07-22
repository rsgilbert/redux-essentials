import React from 'react' 
import { parseISO, formatDistanceToNow } from 'date-fns'

export const TimeAgo = ({ dateIso }) => {
    let timeAgo = ''
    if(dateIso) {
        const date = parseISO(dateIso)
        const timePeriod = formatDistanceToNow(date)
        timeAgo = `${timePeriod} ago`
    }

    return (
        <span title={dateIso}>&nbsp; <i>{timeAgo}</i></span>
    )
}