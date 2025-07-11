export function convDate(date) {
    // return date
    const dateArr = date.split('-').map(val=>parseFloat(val));
    return new Date(dateArr[0], dateArr[1]-1, dateArr[2]).toDateString();
}

export function convDateFull(date) {
    const dateArr = date.split('-').map(val=>parseFloat(val));
    return new Date(dateArr[0], dateArr[1]-1, dateArr[2]).toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        // hour: 'numeric',
        // minute: 'numeric',
        // second: 'numeric',
        // hour12: true // Use 12-hour format with AM/PM
      })
}

export function convTime(time) {
    return new Date(2025, 6, 1,...time.split(':')).toLocaleTimeString('en-US',
        {hour12:true,hour:'numeric',minute:'numeric'})
}

export function convLoc(loc) {
    return loc.split(',')
}

export function sortGames(game1, game2) {
    const time1 = parseFloat(game1.start_time.slice(0,3));
    const time2 = parseFloat(game2.start_time.slice(0,3));

    return time1 - time2;
  }