from datetime import date, time

def convert_date(date): 
    date_convert = date.split('-')
    return date(int(date_convert[0]), int(date_convert[1]), int(date_convert[2]))

def convert_time(time): 
    time_convert = time.split('-')
    return time(int(time_convert[0]), int(time_convert[1]), int(time_convert[2]))
