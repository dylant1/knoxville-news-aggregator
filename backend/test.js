let to = new Date().toISOString().split("T")[0];
let from = new Date(to);
from.setDate(from.getDate() - 5);
let isoFrom = from.toISOString().split("T")[0];
Date.parse(isoFrom);
console.log(Date.parse(isoFrom), to);
