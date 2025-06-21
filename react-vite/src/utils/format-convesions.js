export function convDate(date) {
    return new Date(...date.split('-')).toDateString()
}

export function convDateFull(date) {
    return new Date(...date.split('-')).toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true // Use 12-hour format with AM/PM
      })
}

export function convTime(time) {
    return new Date(2025, 6, 1,...time.split(':')).toLocaleTimeString('en-US',
        {hour12:true,hour:'numeric',minute:'numeric'})
}

export function convLoc(loc) {
    return loc.split(',')
}