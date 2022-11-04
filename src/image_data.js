
//https://twitter.com/coco_1758/status/1555922787356839938
import cirno from "./assets/characters/cirno.jpg";
//https://twitter.com/hacoho378/status/1558348750447263744
import reimu from "./assets/characters/reimu.jpg";
//https://www.pixiv.net/en/artworks/100691924
import marisa from "./assets/characters/marisa.jpg";
//https://twitter.com/e_sdss/status/1520392516519927808
import rumia from "./assets/characters/rumia.jpg";
//https://twitter.com/e_sdss/status/1550855339083321344
import alice from "./assets/characters/alice.jpg";
//https://twitter.com/e_sdss/status/1529470330049179648
import chen from "./assets/characters/chen.jpg";
//https://twitter.com/e_sdss/status/1548681531324977152
import ibarakiKasen from "./assets/characters/ibaraki_kasen.jpg";
//https://twitter.com/syoboikarasu/status/1500962048863129602
import ibukiSuika from "./assets/characters/ibuki_suika.jpg";
//https://www.pixiv.net/en/artworks/67462004
import futatsuiwaMamizou from "./assets/characters/futatsuiwa_mamizou.png";
//www.pixiv.net/artworks/102392400
import kawashiroNitori from "./assets/characters/kawashiro_nitori.png";
//https://twitter.com/e_sdss/status/1541071693833113600
import yakumoYukari from "./assets/characters/yakumo_yukari.jpg"

const images = [
    {
        name: "Cirno",
        image: cirno,
        sauce: "https://twitter.com/coco_1758/status/1555922787356839938"
    },
    {
        name: "Reimu Hakurei",
        image: reimu,
        sauce: "https://twitter.com/hacoho378/status/1558348750447263744"

    },
    {
        name: "Marisa Kirisame",
        image: marisa,
        sauce: "https://www.pixiv.net/en/artworks/100691924"
    },
    {
        name: "Rumia",
        image: rumia,
        sauce: "https://twitter.com/e_sdss/status/1520392516519927808"
    },
    {
        name: "Alice Margatroid",
        image: alice,
        sauce: "https://twitter.com/e_sdss/status/1550855339083321344"
    },
    {
        name: "Chen",
        image: chen,
        sauce: "https://twitter.com/e_sdss/status/1529470330049179648"
    },
    {
        name: "Kasen Ibaraki",
        image: ibarakiKasen,
        sauce: "https://twitter.com/e_sdss/status/1548681531324977152"
    }
    ,
    {
        name: "Suika Ibuki",
        image: ibukiSuika,
        sauce: "https://twitter.com/syoboikarasu/status/1500962048863129602"
    },
    {
        name: "Mamizou Futatsuiwa",
        image: futatsuiwaMamizou,
        sauce: "https://www.pixiv.net/en/artworks/67462004"
    },
    {
        name: "Nitori Kawashiro",
        image: kawashiroNitori,
        sauce: "https://www.pixiv.net/artworks/102392400"
    },
    {
        name: "Yukari Yakumo",
        image: yakumoYukari,
        sauce: "https://twitter.com/e_sdss/status/1541071693833113600"
    }
];

export function get_image_url(char) {
    return new Promise((resolve) =>
        setTimeout(
            () => resolve(images.find((item) => item.name === char)),
            500
        )
    );
}
