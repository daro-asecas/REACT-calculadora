export function WrittingBox({ display }) {
  return (
    <tr>
      <th colSpan="5" className="textBox" id="writtingBox">
        {display}
      </th>
    </tr>
  );
}