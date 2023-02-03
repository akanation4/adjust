import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import DatePicker, { registerLocale } from 'react-datepicker';
import ja from 'date-fns/locale/ja';

registerLocale('ja', ja);

var myEventsType = {
    id: 0,
    title: '',
    start: new Date(),
    end: new Date()
};

export default function Adjustment() {}

    const ref = React.createRef();
    const [inputTitle, setInputTitle] = useState('');
    const [inputStart, setInputStart] = useState(new Date());
    const [inputEnd, setInputEnd] = useState(new Date());
    const [inView, setInView] = useState(false);
    const [myEvents, setMyEvents] = useState([]);

    const handleClick= (info) => {
        const event = myEvents[info.event.id];
        const title = event.title;
        const start = event.start;
        const end = event.end;

        setInputTitle(title);
        setInputStart(start);
        setInputEnd(end);
        setInView(true);
    }

    const handleSelect = (selectInfo) => {
        const start = new Date(selectInfo.start);
        const end = new Date(selectInfo.end);
        start.setHours(start.getHours());
        end.setHours(end.getHours());

        setInputTitle('');
        setInputStart(start);
        setInputEnd(end);
        setInView(true);
    }

    const onAddEvent = () => {
        const startTime = inputStart;
        const endTime = inputEnd;

        if(startTime >= endTime) {
            alert('終了時間は開始時間より後に設定してください。');
            return;
        }
        const event = {
            id: myEvents.length,
            title: inputTitle,
            start: startTime,
            end: endTime
        }
        setMyEvents([...myEvents, event]);

        ref.current.getApi().addEvent(event);
    }
    
    const coverElement = (
    <div onClick={() => setInView(false)} className={inView ? `${classes.cover} ${classes.inView}`:classes.cover} />
    );

    const titleElement = (
        <div>
            <label>タイトル</label>
            <input type="text" value={inputTitle} onChange={(e) => setInputTitle(e.target.value)} />
        </div>
    );

    const startTimeElement = (
        <div>
            <label>開始</label>
            <DatePicker
                locale="ja"
                dateFormat="yyyy/MM/d HH:mm"
                selected={inputStart}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={10}
                todayButton="today"
                name="inputStart"
                onChange={(time) => {
                    setInputStart(time)
                }}
            />
        </div>
    );

    const endTimeElement = (
        <div>
            <label>終了</label>
            <DatePicker
                locale="ja"
                dateFormat="yyyy/MM/d HH:mm"
                selected={inputEnd}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={10}
                todayButton="today"
                name="inputEnd"
                onChange={(time) => {
                    setInputEnd(time)
                }}
            />
        </div>
    );

    const btnElement = (
        <div>
            <input
                type="button"
                value="キャンセル"
                onClick={() => {
                setInView(false)
                }}
            />
            <input
                type="button"
                value="保存"
                onClick={() => onAddEvent()}
            />
        </div>
    );

    const formElement = (
        <div
            className={
                inView ? `${classes.form} ${classes.inView}`: classes.form
            }
        >
        <form>
            <div>予定を入力</div>
                {titleElement}
                {startTimeElement}
                {endTimeElement}
                {btnElement}
        </form>
        </div>
    );



    return (
        <div>
            {coverElement}
            {formElement}
            <FullCalendar
                locale="ja"
                plugins={[timeGridPlugin, dayGridPlugin]}
                initialView="timeGridWeek"
                slotDuration="00:30:00"
                selectable={true}
                businessHours={{
                    daysOfWeek: [1, 2, 3, 4, 5],
                    startTime: '00:00',
                    endTIme: '24:00'
                }}
                weekends={true}
                titleFormat={{
                year: 'numeric',
                month: 'short'
                }}
                headerToolbar={{
                    start: 'title',
                    center: 'prev, next, today',
                    end: 'dayGridMonth,timeGridWeek'
                }}
                ref={ref}
                eventClick={handleClick}
                select={handleSelect}
            />
        </div>
    )
}
