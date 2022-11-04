let chars = [
    "aki minoriko",
    "aki shizuha",
    "alice margatroid",
    "asakura rikako",
    "chen",
    "cirno",
    "daiyousei",
    "elis (touhou)",
    "ellen (touhou)",
    "elly (touhou)",
    "evil eye sigma",
    "flandre scarlet",
    "fujiwara no mokou",
    "futatsuiwa mamizou",
    "gengetsu (touhou)",
    "genjii (touhou)",
    "hakurei reimu",
    "hieda no akyuu",
    "hijiri byakuren",
    "himekaidou hatate",
    "hinanawi tenshi",
    "hong meiling",
    "hoshiguma yuugi",
    "houjuu nue",
    "hourai doll",
    "houraisan kaguya",
    "ibaraki kasen",
    "ibuki suika",
    "inaba tewi",
    "inubashiri momiji",
    "izayoi sakuya",
    "kaenbyou rin",
    "kagiyama hina",
    "kaku seiga",
    "kamishirasawa keine",
    "kana anaberal",
    "kasodani kyouko",
    "kawashiro nitori",
    "kazami yuuka",
    "kikuri (touhou)",
    "kirisame marisa",
    "kisume",
    "kitashirakawa chiyuri",
    "koakuma",
    "kochiya sanae",
    "komeiji koishi",
    "komeiji satori",
    "konngara (touhou)",
    "konpaku youki",
    "konpaku youki (ghost)",
    "konpaku youmu",
    "konpaku youmu (ghost)",
    "kotohime (touhou)",
    "kumoi ichirin",
    "kurodani yamame",
    "kurumi (touhou)",
    "layla prismriver",
    "letty whiterock",
    "lily black",
    "lily white",
    "louise (touhou)",
    "luna child",
    "lunasa prismriver",
    "lyrica prismriver",
    "mai (touhou)",
    "maribel hearn",
    "medicine melancholy",
    "meira (touhou)",
    "merlin prismriver",
    "mima (touhou)",
    "mimi-chan",
    "miyako yoshika",
    "mizuhashi parsee",
    "mononobe no futo",
    "morichika rinnosuke",
    "moriya suwako",
    "motoori kosuzu",
    "mugetsu (touhou)",
    "murasa minamitsu",
    "mystia lorelei",
    "nagae iku",
    "namazu",
    "nazrin",
    "okazaki yumemi",
    "onozuka komachi",
    "orange (touhou)",
    "patchouli knowledge",
    "reisen",
    "reisen udongein inaba",
    "reiuji utsuho",
    "remilia scarlet",
    "rika (touhou)",
    "rumia",
    "ruukoto",
    "saigyou ayakashi",
    "saigyouji yuyuko",
    "sara (touhou)",
    "sariel (touhou)",
    "satsuki rin",
    "shameimaru aya",
    "shanghai doll",
    "shiki eiki",
    "shingyoku (male)",
    "shingyoku (touhou)",
    "shinki (touhou)",
    "soga no tojiko",
    "sokrates (touhou)",
    "star sapphire",
    "sunny milk",
    "tatara kogasa",
    "tokiko (touhou)",
    "toramaru shou",
    "toyosatomimi no miko",
    "unzan",
    "usami renko",
    "watatsuki no toyohime",
    "watatsuki no yorihime",
    "wriggle nightbug",
    "yagokoro eirin",
    "yakumo ran",
    "yakumo yukari",
    "yasaka kanako",
    "yuki (touhou)",
    "yumeko (touhou)",
    "yuugenmagan"
];

let fixed = chars
    .map((char) => char.split(" (touhou)")[0])
    .map((name) =>
        name
            .split(" ")
            .map((part) => `${part[0].toUpperCase()}${part.slice(1)}`)
            .join(" ")
    );

console.log(fixed);