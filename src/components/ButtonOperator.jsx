export function ButtonOperator({ operator , display, putAtStart = false, callback }) {
  return (
    <td>
      <div className="displaytable-cell" id={`b${operator}`}>
        <button className="button greenbutton" type="button" onClick={() => callback(operator)}>{display}</button>
      </div>
    </td>
  );
}