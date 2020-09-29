function mapRow(headings) {
  return function mapRowToObject({ cells }) {
    return [...cells].reduce(function(result, cell, i) {
      var value;
      value = cell.innerText;

      return Object.assign(result, { [headings[i]]: value });
    }, {});
  };
}

function parseTable(table) {
  var headings = [...table.tHead.rows[0].cells].map(
    heading => heading.innerText
  );

  return [...table.tBodies[0].rows].map(mapRow(headings));
}
