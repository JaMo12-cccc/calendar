// init
function render(time) {
    const year = time.getFullYear();
    const month = time.getMonth() + 1;

    initTime()
    generateDay()
    currentTime = time;

    function initTime() {
        const time = g('#time');
        time.textContent = `${year}年${month}月`
    }

    function generateDay() {
        // days
        const firstDayOfCurrentMonth = new Date(year, month - 1, 1);
        const weekdayOfFirstDayOfCurrentMonth = firstDayOfCurrentMonth.getDay();
        const endDayOfCurrentMonth = new Date(new Date(year, month, 1) - 86400 * 1000);
        const dateOfEndDayOfCurrentMonth = endDayOfCurrentMonth.getDate();
        const weekdayOfLastDayOfCurrentMonth = endDayOfCurrentMonth.getDay();

        // 铺垫
        const dayss = g('#days');
        dayss.innerHTML = "";
        let n = 0;
        for (let i = 1; i < weekdayOfFirstDayOfCurrentMonth; i++) {
            const li = document.createElement('li');
            const d = new Date(firstDayOfCurrentMonth - 86400 * 1000 * i);
            li.textContent = d.getDate();
            dayss.prepend(li);
            li.classList.add('calendar-days-disabled');
            n++;
        }
        // current month's days
        const days = dateOfEndDayOfCurrentMonth;
        const now = new Date();
        let selectLi;
        for (let i = 1; i <= days; i++) {
            const li = document.createElement('li');
            li.textContent = i;
            if (i === now.getDate() && month === now.getMonth() + 1 && year === now.getFullYear()) {
                li.classList.add("calendar-days-today");
            }
            li.onclick = () => {
                if (selectLi) { selectLi.classList.remove('calendar-days-selected') };
                li.classList.add("calendar-days-selected");
                selectLi = li;
            }
            dayss.append(li);
            n++;
        }
        // 铺垫
        let i = weekdayOfLastDayOfCurrentMonth + 1;
        for (let j = 0; j < 42 - n; j++) {
            const cha = i - weekdayOfLastDayOfCurrentMonth;
            const li = document.createElement('li');
            const d = new Date(dateOfEndDayOfCurrentMonth - 0 + 86400 * 1000 * (cha - 1));
            li.textContent = d.getDate();
            dayss.append(li);
            li.classList.add('calendar-days-disabled');
            i++;
        }
    }
}
let currentTime = new Date(2021, 7, 5);
render(currentTime)

g('#prevMonth').onclick = () => {
    const firstDayOfCurrentMonth = new Date(currentTime.getFullYear(), currentTime.getMonth(), 1);
    render(new Date(firstDayOfCurrentMonth - 86400 * 1000))
}
g('#nextMonth').onclick = () => {
    const LastDayOfCurrentMonth = new Date(currentTime.getFullYear(), currentTime.getMonth() + 1, 1);
    render(new Date(LastDayOfCurrentMonth - 0 + 86400 * 1000))
}
g('#today').onclick = () => {
    render(new Date())
}

// 帮助函数
function g(selector) {
    return document.querySelector(selector)
}

function gs(selector) {
    return document.querySelectorAll(selector)
}