const fs = require('fs');
const dataFile = require('../dist/2018/marathon.json');

function parseSeconds(timeString) {
  if (timeString === null) return '';
  if (timeString.includes('/M')) timeString = timeString.replace('/M', '');

  const hoursMinSec = timeString.split(':');
  let seconds = 0;

  if (hoursMinSec.length === 3) {
    seconds =
      +hoursMinSec[0] * 60 * 60 + +hoursMinSec[1] * 60 + +hoursMinSec[2];
  } else if (hoursMinSec.length === 2) {
    seconds = +hoursMinSec[0] * 60 + +hoursMinSec[1];
  } else {
    seconds = 0;
  }

  return seconds;
}

function cleanValues(dirtyObj) {}

function cleanKeys(dirtyObj) {}

function cleanJSON(oldData) {
  return oldData.map((item, index) => {
    let newKeys = Object.keys(item).map((key, index) => {
      return key
        .toLowerCase()
        .trim()
        .replace(/\n/g, '_')
        .replace(/\s/g, '_');
    });

    let newValues = Object.values(item).map((value, index) => {
      // if value contains numbers only, convert to integer
      if (value.match(/^\d+$/)) return parseInt(value);

      // if value contains numbers and ":" symbol, convert to seconds
      if (/\d/.test(value) && value.includes(':')) return parseSeconds(value);

      // if value is just text return string
      return value;
    });

    return Object.assign(
      ...newKeys.map((key, index) => ({ [key]: newValues[index] }))
    );
  });
}

function customFormatData(oldData) {
  return oldData.map((item, index) => {
    return {
      gun_time: parseSeconds(item['Gun Time..']),
      chip_time: parseSeconds(item['Chip Time']),
      bib: parseInt(item['Bib']),
      name: `${item['First Name']} ${item['Last Name']}`,
      city: item['City'],
      state: item['State'],
      division: item['Division'],
      class_position: item['Class\nPosition'],
      overall_place: item['Overall\nPlace'],
      team: item['Team\n'],
      age: parseInt(item['Age']),
      zip: parseInt(item['Zip']),
      gender_place: parseInt(item['Gen\nPlace']),
      overall_pace: item['Total\nPace'],
      total_division: item['Tot\nDiv'],
      total_gender: item['Tot\nGend'],
      total_age: item['Tot\nAG'],
      time_5k: parseSeconds(item['5K\n']),
      pace_5k: parseSeconds(item['5K\nPace']),
      time_10k: parseSeconds(item['10K\n']),
      pace_10k: parseSeconds(item['10K\nPace']),
      time_15k: parseSeconds(item['15K\n']),
      pace_15k: item['15K\nPace'],
      time_20k: parseSeconds(item['20K\n']),
      pace_20k: parseSeconds(item['20K\nPace']),
      time_halfway: parseSeconds(item['13.1M\n']),
      pace_halfway: parseSeconds(item['13.1M\nPace']),
      time_25k: parseSeconds(item['25K\n']),
      pace_25k: parseSeconds(item['25K\nPace']),
      time_30k: parseSeconds(item['30K\n']),
      pace_30k: parseSeconds(item['30K\nPace']),
      time_24k: parseSeconds(item['24.5M\n']),
      pace_24k: parseSeconds(item['24.5M\nPace']),
      time_finish: parseSeconds(item['FINISH\n']),
      pace_finish: parseSeconds(item['FINISH\nPace'])
    };
  });
}

fs.writeFileSync(
  './dist/2018/marathon.json',
  JSON.stringify(customFormatData(dataFile))
);
