const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
const app = express();
const port = 5050;

require("dotenv").config();
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4dmVmbndka3llaWNzc2xkbXNyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY1NzEyMTMyNSwiZXhwIjoxOTcyNjk3MzI1fQ.QkSYjqPt8v1GrqdGJ-h8AXBXKsu60kvy1VJ08z8WkDA"
);
// app.use(
//   cors({
//     origin: "*",
//   })
// );
app.get("/", (req, res) => {
  res.send("hellow world");
});

app.get("/headlines/:from-:to", async (req, res) => {
  let days = [];
  let from = parseInt(req.params.from);
  let to = parseInt(req.params.to);
  let daysRequired = Math.floor((from - to) / (1000 * 60 * 60 * 24));
  let fromTmp = new Date(from).toISOString();
  let toTmp = new Date(to).toISOString();
  let headlines = [];

  for (let i = 1; i <= daysRequired; i++) {
    let tmpDate = new Date(toTmp);
    tmpDate.setDate(tmpDate.getDate() + i);
    days.push(tmpDate.toISOString().split("T")[0]);

    const { data, error } = await supabase
      .from("headlines")
      .select()
      .match({
        date: tmpDate.toISOString().split("T")[0],
      });

    headlines.push(data);
  }
  try {
    res.send(headlines);
  } catch (error) {
    console.log(error);
  }
});
app.get("/headlines/:source", async (req, res) => {
  const { data, error } = await supabase
    .from("headlines")
    .select()
    .match({
      source: req.params.source,
    })
    .range(0, 10);
  try {
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`server listening on port ${port}`);
});
