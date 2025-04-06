
https://kinozal.tv/get_srv_details.php?id=2078970&action=2

Инфо хеш: ED707A7A0D0E1B7706D687DFE1EF0ECE1F4F052A
Размер части торрента: 4 МБ
1923.S02.2160p.AMZN.WEB-DL.H.265.SDR
    1923.S02E01.2160p.AMZN.WEB-DL.H.265.RGzsRutracker.mkv 7.45 ГБ (7996621788)
    1923.S02E02.2160p.AMZN.WEB-DL.H.265.RGzsRutracker.mkv 6.87 ГБ (7380993313)
    1923.S02E03.2160p.AMZN.WEB-DL.H.265.RGzsRutracker.mkv 7.51 ГБ (8068202642)
    1923.S02E04.2160p.AMZN.WEB-DL.H.265.RGzsRutracker.mkv 7.47 ГБ (8023703009)
    1923.S02E05.2160p.AMZN.WEB-DL.H.265.RGzsRutracker.mkv 6.5 ГБ (6981078711)
    1923.S02E06.2160p.AMZN.WEB-DL.H.265.RGzsRutracker.mkv 6.21 ГБ (6670973154)

var rplintrID;
function rplhe() {
    var el = document.getElementById('containerdata');
    var rplstr = el.innerHTML;
    if (rplstr.length>15) {
        el.innerHTML = rplstr.replace(/Инфо хеш:\s(.*?)</, 'Magnet-ссылка: <a href=magnet:?xt=urn:btih:$1>magnet:?xt=urn:btih:$1</a><');
        clearInterval(rplintrID);
    }
}
window.startrplhe = function(){rplintrID = setInterval(rplhe, 50)};

var link = document.querySelector('a[onclick*="Список файлов"]');
link.setAttribute('onclick',link.getAttribute('onclick').replace(/(.*?)(return false)/,'$1startrplhe();$2'));

if (document.getElementsByClassName('bx1 justify')[0].innerHTML.match(/Раздача заблокирована/)){link.click()};