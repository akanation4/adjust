import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import DatePicker, { registerLocale } from 'react-datepicker';
import ja from 'date-fns/locale/ja';
const useStyles = makeStyles(() =>
    createStyles({
        cover: {
        opacity: 0,
        visibility: 'hidden',
        position: 'fixed',
        width: '100%',
        height: '100%',
        zIndex: 1000,
        top: 0,
        left: 0,
        background: 'rgba(0, 0, 0, 0.3)'
    },
    form: {
        opacity: 0,
        visibility: 'hidden',
        position: 'fixed',
        top: '30%',
        left: '40%',
        fontWeight: 'bold',
        background: 'rgba(255, 255, 255)',
        width: '400px',
        height: '300px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2000,
    },
        inView: { // cover, formを表示する時に適用するStyle。
        opacity: 1,
        visibility: 'visible'
    },
    })
);

registerLocale('ja', ja);

var myEventsType = {
    id: 0,
    title: '',
    start: new Date(),
    end: new Date()
};

export default function Adjustment() {

    const classes = useStyles();

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

    const startElement = (
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

    const endElement = (
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
                plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
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
        eventClick={handleCLick}
        select={handleSelect}
      />
    </div>
  )
}
