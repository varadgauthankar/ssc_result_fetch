var axios = require("axios");
var qs = require("qs");
const fs = require("fs");

let seatNumber = 0;
const firstSeatNumber = 10002;
const lastSeatNumber = 13996;
var jsonResponse = [];

const url =
  "http://results.gbshsegoa.net/result_api/index.php/StudentApi/studentdatabyRollno";

async function fetchResults() {
  for (var i = firstSeatNumber; i <= lastSeatNumber; i++) {
    seatNumber = i;
    console.log(seatNumber);

    try {
      const res = await axios({
        method: "POST",
        url: url,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: qs.stringify({
          seat: seatNumber,
        }),
      });
      let formattedJson = formatJson(res);
      jsonResponse.push(formattedJson);
    } catch (err) {
      console.error(err);
    }
  }
  return JSON.stringify(jsonResponse);
}

function formatJson(res) {
  const centre = res.data.Data[0].Cname;
  const name = res.data.Data[0].Stname;
  const seat = seatNumber;
  const totalMarks = res.data.Data[0].TTL;
  const finalResult = res.data.Data[0].Result;

  const sub1name = res.data.Data[0].S1name;
  const sub1marks = res.data.Data[0].Sb1x;

  const sub2name = res.data.Data[0].S2name;
  const sub2marks = res.data.Data[0].Sb2x;

  const sub3name = res.data.Data[0].S3name;
  const sub3marks = res.data.Data[0].Sb3x;

  const sub4name = res.data.Data[0].S4name;
  const sub4marks = res.data.Data[0].Sb4x;

  const sub5name = res.data.Data[0].S5name;
  const sub5marks = res.data.Data[0].Sb5x;

  const sub6name = res.data.Data[0].S6name;
  const sub6marks = res.data.Data[0].Sb6x;

  const obj = {
    centre: centre.trim().toLowerCase(),
    name: name.trim(),
    seat,
    totalMarks,
    finalResult,

    subjects: [
      {
        subject: sub1name,
        marks: sub1marks,
      },
      {
        subject: sub2name,
        marks: sub2marks,
      },
      {
        subject: sub3name,
        marks: sub3marks,
      },
      {
        subject: sub4name,
        marks: sub4marks,
      },
      {
        subject: sub5name,
        marks: sub5marks,
      },
      {
        subject: sub6name,
        marks: sub6marks,
      },
    ],
  };

  return obj;
}

async function saveToFile(data) {
  fs.writeFileSync("results.json", data);
}

async function getData() {
  var results = await fetchResults();
  saveToFile(results);
}

getData();
