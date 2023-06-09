export function Button({ display, write = display, color, callback }) {
  return (
    <td>
      <div className="displaytable-cell" id={`b${display}`}>
        <button className={`button ${color}`} type="button" onClick={() => callback(write)}>{display}</button>
      </div>
    </td>
  );
}