export const dateFormat = (date: string, toDays?: boolean): string => {
    const formattedDate = new Date(date);
    const dateNow = new Date();
    
    if (dateNow.getDay() === formattedDate.getDay() || !toDays) {
        return formattedDate.getHours() + ':' + formattedDate.getMinutes();
    } else return getWeekDay(formattedDate);
};

const getWeekDay = (date: Date): string => {
    let days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  
    return days[date.getDay() - 1];
};
