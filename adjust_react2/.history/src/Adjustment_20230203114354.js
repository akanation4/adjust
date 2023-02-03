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
    <div onClick={() => setInView(false)} className=inView{`${classes.cover} ${inView ? classes.inView : ''}`}></div>

    return (
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            locale="ja" // 日本語化
            events={[
                { title: "event 1", start: "2021-06-01" },
                // endに指定した日付は含まないので注意
                { title: "event 2", start: "2021-06-03", end: "2021-06-05" },
                {
                    title: "event 3",
                    start: "2021-06-07T10:00:00", // 時間を指定するときはISO 8601の形式で。
                },
            ]}
        />
        );
}
