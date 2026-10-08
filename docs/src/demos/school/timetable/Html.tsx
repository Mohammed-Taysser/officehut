// Plain HTML: an ordinary table. A booking that runs two hours is a rowspan.
export default function Html() {
  return (
    <div className='timetable-wrap'>
      <table className='timetable'>
        <caption className='visually-hidden'>Parking bay rota</caption>
        <thead>
          <tr>
            <th scope='col' className='timetable-time'>
              <span className='visually-hidden'>Time</span>
            </th>
            <th scope='col'>Bay 1</th>
            <th scope='col' className='is-today' aria-current='date'>
              Bay 2
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope='row' className='timetable-time'>
              08:00
            </th>
            <td rowSpan={2}>
              <div className='lesson lesson-primary'>
                <span className='lesson-title'>Courier van</span>
                <span className='lesson-meta'>Nile Freight</span>
              </div>
            </td>
            <td>
              <div className='lesson lesson-free'>
                <span className='lesson-title'>Free</span>
              </div>
            </td>
          </tr>
          <tr>
            <th scope='row' className='timetable-time'>
              10:00
            </th>
            <td>
              <div className='lesson lesson-success'>
                <span className='lesson-title'>Visitor</span>
                <span className='lesson-meta'>Delta Print</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
