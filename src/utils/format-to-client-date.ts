export const formatToClientDate = (date?: Date, withHourAndMinutes: boolean = false) => {
    if(!date) {
        return ''
    }

    if (withHourAndMinutes) {
        return new Date(date).toLocaleString();
    } else {
        return new Date(date).toLocaleDateString();
    }
}