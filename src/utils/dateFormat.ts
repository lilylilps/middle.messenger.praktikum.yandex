export const dateFormat = (date: string, toDays?: boolean, withFullDate?: boolean): string => {
    const formattedDate = new Date(date);
    const dateNow = new Date();
    
    if (dateNow.getFullYear() === formattedDate.getFullYear() &&
        dateNow.getMonth() === formattedDate.getMonth() &&
        dateNow.getDate() === formattedDate.getDate() ||
        !toDays) {
        const minutes = (formattedDate.getMinutes() < 10 ? '0' : '') + formattedDate.getMinutes();
        return formattedDate.getHours() + ':' + minutes;
    } else if (withFullDate) {
        return formattedDate.toLocaleDateString('ru-RU',
            {month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit'});
    } else {
        return formattedDate.toLocaleDateString('ru-RU', {month: 'short', day: '2-digit'});
    }
};
