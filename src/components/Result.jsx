export function Result({ display }) {
  return (
    <tr>
      <th colSpan="5" className="textBox" id="resultBox">
        {display}
      </th>
    </tr>
  );
}