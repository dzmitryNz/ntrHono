import requests
from bs4 import BeautifulSoup
import json
import re
from datetime import datetime

url = "http://rutor.is/seriali"
response = requests.get(url)
soup = BeautifulSoup(response.content, "html.parser")

table = soup.find("div", {"id": "index"}).find("table")

data = []

for row in table.find_all("tr")[1:]:
    cols = row.find_all("td")
    
    date = cols[0].text.strip()
    name = cols[2].find("a").text.strip()
    file_link = "http://d.rutor.info" + cols[2].find("a", {"class": "downgif"}).get("href")
    magnet_link = cols[2].find("a", {"href": lambda x: x and x.startswith("magnet:")}).get("href")
    hash_value = re.search(r"btih:(\w+)", magnet_link).group(1)
    description_link = "http://rutor.info" + cols[2].find("a").get("href")
    size = float(cols[3].text.strip().replace(",", "").replace("&nbsp;GB", ""))
    seeders = int(cols[4].find("span", {"class": "green"}).text.strip())
    leechers = int(cols[4].find("span", {"class": "red"}).text.strip())
    peers = seeders + leechers
    
    item = {
        "date": datetime.strptime(date, "%d %b %y").isoformat(),
        "name": name,
        "fileLink": file_link,
        "magnetLink": magnet_link,
        "hash": hash_value,
        "descriptionLink": description_link,
        "size": size * 1024 ** 3,
        "seeders": seeders,
        "leechers": leechers,
        "peers": peers,
        "yearFirst": 2025,
        "yearLast": 2025,
        "rank": 10,
        "videoRank": 5,
        "audioRank": 5,
        "resolution": "1080",
        "quality": "WEB-DL",
        "HEVC": False,
        "seasonLastFull": True,
        "seasonFirst": 2,
        "seasonLast": 2,
        "episodFirst": 1,
        "episodLast": 10,
        "episodAll": 0,
        "namePart": "Разделение / Severance",
        "hdr10": False,
        "dolbyVision": False,
        "hfr": False,
        "ru": False,
        "dubbing": "Дубляж",
        "studios": "Red Head Sound",
        "hdr": "",
        "imageFromDescription": "https://6.i.getapic.me/dg0a.png",
        "kinopoiskID": "1343318",
        "imdbID": "tt11280740"
    }
    
    data.append(item)

with open("data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
