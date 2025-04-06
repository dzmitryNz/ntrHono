const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const url = "http://rutor.is/seriali";

axios
  .get(url)
  .then((response) => {
    const $ = cheerio.load(response.data);

    const data = [];

    $("div#index table tr:not(:first-child)").each((index, element) => {
      const parseFullName = (fullName) => {
        const parts = fullName.split(' ');
        let resolution = '';
        let quality = '';
        let namePart = '';
        let dubbing = '';
        let seasonFirst = null;
        let seasonLast = null;
        let episodFirst = null;
        let episodLast = null;
        let episodAll = null;
        let seasonLastFull = false;
      
        for (let i = 0; i < parts.length; i++) {
          if (parts[i].endsWith('p')) {
            resolution = parts[i];
          } else if (parts[i] === 'WEB-DL' || parts[i] === 'WEBRip') {
            quality = parts[i];
          } else if (parts[i] === 'от') {
            namePart = parts.slice(0, i).join(' ');
          } else if (parts[i] === 'D') {
            dubbing = 'Дубляж';
          } else if (parts[i].startsWith('S')) {
            const seasonMatch = parts[i].match(/S(\d+)/);
            if (seasonMatch) {
              seasonFirst = parseInt(seasonMatch[1]);
              seasonLast = parseInt(seasonMatch[1]);
              seasonLastFull = true;
            }
          } else if (parts[i].includes('x')) {
            const episodeMatch = parts[i].match(/(\d+)x(\d+)/);
            if (episodeMatch) {
              seasonFirst = parseInt(episodeMatch[1]);
              seasonLast = parseInt(episodeMatch[1]);
              episodFirst = parseInt(episodeMatch[2]);
              episodLast = parseInt(episodeMatch[2]);
              episodAll = parseInt(parts[i + 1].replace('из', '').trim());
              seasonLastFull = false;
            }
          }
        }
      
        return {
          resolution: resolution.replace('p', ''),
          quality,
          namePart,
          dubbing,
          seasonFirst,
          seasonLast,
          episodFirst,
          episodLast,
          episodAll,
          seasonLastFull
        };
      };

      const cols = $(element).find("td");

      const date = $(cols[0]).text().trim();
      const name = $(cols[2]).find("a").text().trim();
      const fileLink =
        "http://d.rutor.info" + $(cols[2]).find("a.downgif").attr("href");
      const magnetLink = $(cols[2]).find('a[href^="magnet:"]').attr("href");
      const hash = magnetLink.match(/btih:(\w+)/)[1];
      const descriptionLink =
        "http://rutor.info" + $(cols[2]).find("a").attr("href");
      const size = parseFloat(
        $(cols[3]).text().trim().replace(",", "").replace("&nbsp;GB", "")
      );
      const seeders = parseInt($(cols[4]).find("span.green").text().trim());
      const leechers = parseInt($(cols[4]).find("span.red").text().trim());
      const peers = seeders + leechers;
      const nameParts = parseFullName(fullName);

      const item = {
        date: new Date(date.replace(/\s/, " ")).toISOString(),
        name,
        fileLink,
        magnetLink,
        hash,
        descriptionLink,
        size: size * 1024 ** 3,
        seeders,
        leechers,
        peers,
        yearFirst: null,
        yearLast: null,
        rank: null,
        videoRank: null,
        audioRank: null,
        resolution: nameParts?.resolution || "",
        quality: nameParts?.quality || "",
        HEVC: false,
        seasonLastFull: trnameParts?.seasonLastFull || false,
        seasonFirst: nameParts?.seasonFirst || null,
        seasonLast: nameParts?.seasonLast || null,
        episodFirst: nameParts?.episodFirst || null,
        episodLast: nameParts?.episodLast || null,
        episodAll: nameParts?.episodAll || null,
        namePart: nameParts?.namePart || "",
        hdr10: false,
        dolbyVision: false,
        hfr: false,
        ru: false,
        dubbing: nameParts?.dubbing || "",
        studios: nameParts?.studios || "",
        hdr: "",
        imageFromDescription: "",
        kinopoiskID: "",
        imdbID: "",
      };

      data.push(item);
    });

    fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
  })
  .catch((error) => {
    console.error(error);
  });
