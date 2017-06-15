export default function articleService() {
    return {
        dateObjToString(date) {
            const dateString = new Date(`${date.month} ${date.date}, ${date.year}`).toDateString();
            return dateString;
        },
        dateStringToObj(dateString) {
            const arr = dateString.split(' ');
            return {
                day: arr[0],
                month: arr[1],
                date: arr[2],
                year: arr [3]
            };
        },
        hourValuetoObj(i) {
            let hour = {};
            if(i > 0 & i < 12) {
                hour = {
                    time: i + ':00am',
                    value: i
                };
            } else if(i === 12) {
                hour = {
                    time: i  + ':00pm',
                    value: i
                };
            } else if(i > 12) {
                hour = {
                    time: i  - 12+ ':00pm',
                    value: i
                };
            } else {
                hour = {
                    time: '12:00am',
                    value: i
                };
            }
            return hour;
        },
        alphabetize(arr) {
            arr.sort((curr, next) => {
                const currName = curr.name.toUpperCase();
                const nextName = next.name.toUpperCase();

                if(currName < nextName) {
                    return -1;
                }
                if(currName > nextName) {
                    return 1;
                }
                return 0;
            });
            // return arr;
        }
    };
}