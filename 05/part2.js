const fs = require('fs');

const file = fs.readFileSync('./input.txt', 'utf-8');

const lines = file.split('\n').map((line) => line.trim());

let seeds = lines[0]
  .slice(7)
  .split(' ')
  .map((str) => +str);

const seedRanges = [];

for (i = 0; i < seeds.length; i += 2) {
  seedRanges.push({ start: seeds[i], range: seeds[i + 1] });
}

const maps = {
  seedToSoil: [],
  soilToFertilizer: [],
  fertilizerToWater: [],
  waterToLight: [],
  lightToTemperature: [],
  temperatureToHumidity: [],
  humidityToLocation: [],
};

lines
  .join('\n')
  .match(/seed-to-soil map:(.*?)(?=\n\s*\n|$)/s)[1]
  .trim()
  .split('\n')
  .forEach((line) => {
    maps.seedToSoil.push({ destStart: +line.split(' ')[0], sourceStart: +line.split(' ')[1], range: +line.split(' ')[2] });
  });

lines
  .join('\n')
  .match(/soil-to-fertilizer map:(.*?)(?=\n\s*\n|$)/s)[1]
  .trim()
  .split('\n')
  .forEach((line) => {
    maps.soilToFertilizer.push({ destStart: +line.split(' ')[0], sourceStart: +line.split(' ')[1], range: +line.split(' ')[2] });
  });

lines
  .join('\n')
  .match(/fertilizer-to-water map:(.*?)(?=\n\s*\n|$)/s)[1]
  .trim()
  .split('\n')
  .forEach((line) => {
    maps.fertilizerToWater.push({ destStart: +line.split(' ')[0], sourceStart: +line.split(' ')[1], range: +line.split(' ')[2] });
  });

lines
  .join('\n')
  .match(/water-to-light map:(.*?)(?=\n\s*\n|$)/s)[1]
  .trim()
  .split('\n')
  .forEach((line) => {
    maps.waterToLight.push({ destStart: +line.split(' ')[0], sourceStart: +line.split(' ')[1], range: +line.split(' ')[2] });
  });

lines
  .join('\n')
  .match(/light-to-temperature map:(.*?)(?=\n\s*\n|$)/s)[1]
  .trim()
  .split('\n')
  .forEach((line) => {
    maps.lightToTemperature.push({ destStart: +line.split(' ')[0], sourceStart: +line.split(' ')[1], range: +line.split(' ')[2] });
  });

lines
  .join('\n')
  .match(/temperature-to-humidity map:(.*?)(?=\n\s*\n|$)/s)[1]
  .trim()
  .split('\n')
  .forEach((line) => {
    maps.temperatureToHumidity.push({ destStart: +line.split(' ')[0], sourceStart: +line.split(' ')[1], range: +line.split(' ')[2] });
  });

lines
  .join('\n')
  .match(/humidity-to-location map:(.*?)(?=\n\s*\n|$)/s)[1]
  .trim()
  .split('\n')
  .forEach((line) => {
    maps.humidityToLocation.push({ destStart: +line.split(' ')[0], sourceStart: +line.split(' ')[1], range: +line.split(' ')[2] });
  });

let lowest = Infinity;

seedRanges.forEach(({ start, range }) => {
  console.log(`start: ${start}, range: ${range}`);
  for (let seed = start; seed < start + range - 1; seed++) {
    let map;
    let soil = 0;
    let fertilizer = 0;
    let water = 0;
    let light = 0;
    let temperature = 0;
    let humidity = 0;
    let location = 0;

    maps.seedToSoil.forEach((_map) => {
      if (seed == _map.sourceStart) {
        map = _map;
      } else if (seed >= _map.sourceStart && seed <= _map.sourceStart + _map.range - 1) {
        map = _map;
      }
    });

    if (map) {
      soil = seed + (map.destStart - map.sourceStart);
    } else {
      soil = seed;
    }

    map = null;

    maps.soilToFertilizer.forEach((_map) => {
      if (soil == _map.sourceStart) {
        map = _map;
      } else if (soil >= _map.sourceStart && soil <= _map.sourceStart + _map.range - 1) {
        map = _map;
      }
    });

    if (map) {
      fertilizer = soil + (map.destStart - map.sourceStart);
    } else {
      fertilizer = soil;
    }

    map = null;

    maps.fertilizerToWater.forEach((_map) => {
      if (fertilizer == _map.sourceStart) {
        map = _map;
      } else if (fertilizer >= _map.sourceStart && fertilizer <= _map.sourceStart + _map.range - 1) {
        map = _map;
      }
    });

    if (map) {
      water = fertilizer + (map.destStart - map.sourceStart);
    } else {
      water = fertilizer;
    }

    map = null;

    maps.waterToLight.forEach((_map) => {
      if (water == _map.sourceStart) {
        map = _map;
      } else if (water >= _map.sourceStart && water <= _map.sourceStart + _map.range - 1) {
        map = _map;
      }
    });

    if (map) {
      light = water + (map.destStart - map.sourceStart);
    } else {
      light = water;
    }

    map = null;

    maps.lightToTemperature.forEach((_map) => {
      if (light == _map.sourceStart) {
        map = _map;
      } else if (light >= _map.sourceStart && light <= _map.sourceStart + _map.range - 1) {
        map = _map;
      }
    });

    if (map) {
      temperature = light + (map.destStart - map.sourceStart);
    } else {
      temperature = light;
    }

    map = null;

    maps.temperatureToHumidity.forEach((_map) => {
      if (temperature == _map.sourceStart) {
        map = _map;
      } else if (temperature >= _map.sourceStart && temperature <= _map.sourceStart + _map.range - 1) {
        map = _map;
      }
    });

    if (map) {
      humidity = temperature + (map.destStart - map.sourceStart);
    } else {
      humidity = temperature;
    }

    map = null;

    maps.humidityToLocation.forEach((_map) => {
      if (humidity == _map.sourceStart) {
        map = _map;
      } else if (humidity >= _map.sourceStart && humidity <= _map.sourceStart + _map.range - 1) {
        map = _map;
      }
    });

    if (map) {
      location = humidity + (map.destStart - map.sourceStart);
    } else {
      location = humidity;
    }

    map = null;

    if (location < lowest) {
      lowest = location;
    }
  }
});

console.log(lowest);
