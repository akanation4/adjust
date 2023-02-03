import React from 'react';


export default function Adjustment() {
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
    };
}