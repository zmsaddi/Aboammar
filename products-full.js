// Complete product catalog with ALL products
// This file contains all products from the CSV data with separated Arabic and English names

function parseProductName(name) {
    // Split by " - " to separate Arabic from English
    const parts = name.split(' - ');
    if (parts.length >= 2) {
        return {
            nameAr: parts[0].trim(),
            nameEn: parts[1].trim()
        };
    }
    // If no separator, check if it's mostly Arabic or English
    const arabicPattern = /[\u0600-\u06FF]/;
    if (arabicPattern.test(name)) {
        return { nameAr: name.trim(), nameEn: name.trim() };
    }
    return { nameAr: name.trim(), nameEn: name.trim() };
}

const rawProducts = `5025,GM,اكس او فكتوريا سكرت - XO Victoria's Secret
2038,GM,ديفن عود روبرتو كافالي - Divine Oud Roberto Cavalli
2527,GM,سويت بيا بوس ديليكيت بات & بادي 2 - SWEET PEA BOIS DELICAT Bath & Body 2
169/8753,GM,سويت بيا بوس ديليكيت بات & بادي 1 - SWEET PEA POIS DELICAT Bath & Body 1
170/8729,GM,ميدنايت بومجرانتي بات & بادي - Midnight Pomegranate Bath & Body
171/8730,GM,جابانيس تشيري بلوسوم بات & بادي - Japanese Cherry Blossom Bath & Body
172/8731,GM,دارك كيس بات & بادي - Dark Kiss Bath & Body
173/8732,GM,فورايفر ريد بات & بادي - FOREVER RED Bath & Body
174/8733,GM,فيلفت شوجر بات & بادي - VELVET SUGER Bath & Body
175/8734,GM,كشمير جلو بات & بادي - Cashmere Glow Bath & Body
176/8735,GM,فور ايفر ميدنايت بات & بادي - FOREVER MIDNIGHT Bath & Body
177/8736,GM,تشيفون بات & بادي - CHIFFON Bath & Body
178/8737,GM,دارك كيس بات & بادي - Dark Kiss Bath & Body
179/8738,GM,وايلد مدغشقر فانيلا بات & بادي 2024 - Wild Madagascar Vanilla Bath & Body 2024
180/8739,GM,وايلد مدغشقر فانيلا بات & بادي - Wild Madagascar Vanilla Bath & Body
181/8740,GM,وينتيري وندر بات & بادي - Winterberry Wonder Bath & Body
182/8741,GM,جينجل أول ذا واي بات & بادي - JINGLE ALL THE WAY Bath & Body
183/8742,GM,سنو كيسد شوجر بات & بادي - SNOW KISSED SUGER Bath & Body
184/8743,GM,ريد فيلفت تشير بات & بادي - RED VEVLET CHEER Bath & Body
185/8744,GM,فريش سباركينج سنو بات & بادي - Fresh Sparkling Snow Bath & Body
186/8745,GM,بون فوياج فرنش ريفييرا بات & بادي - Bon Voyage French Riviera Bath & Body
187/8747,GM,جينهام بودي ميست بات & بادي - GINGHAM BODY MIST Bath & Body
188/8748,GM,إنتو ذا نايت ميست بات & بادي - INTO THE NIGHT MIST Bath & Body
189/8748,GM,وورم فانيلا شوجر بات & بادي 2021 - Warm Vanilla Sugar Bath & Body 2021
190/8749,GM,بيرفكت بيوني بات & بادي 2020 - Perfect Peony Bath & Body Works 2020
191/8750,GM,إن ذا ستارز بات & بادي 2018 - In The Stars Bath & Body 2018
192/8751,GM,مارشملو بامبكين لات بات & بادي 2020 - Marshmallow Pumpkin Latte Bath & Body 2020
193/8752,GM,دارك فيلفت عود بات & بادي 2024 - Dark Velvet Oud Bath & Body 2024
194/8754,GM,جود جيرل بلاش الكسير او دي بارفيوم 2024 - Good Girl Blush Elixir Eau de Parfum 2024
213/8755,GM,باد بوي دارلينج جاردن 2023 - Bad Boy Dazzling Garden Carolina Herrera2023
205/8759,GM,جيان بلغاري - Gyan Bvlgari
227/8763,GM,انجيما روجا دوف 2013 - Enigma Roja Dove 2013
200/8764,GM,برسيوس دي مارلي 2024 - Perseus Parfums de Marly 2024
215/8765,GM,ميس ديور بارفيوم 2024 - Miss Dior Parfum 2024
216/8766,GM,ميس ديور بلومينج 2023 - Miss Dior Blooming Bouquet 2023
217/8767,GM,ميس ديور بارفيوم 2021 - Miss Dior Eau de Parfum 2021
218/8768,GM,فانيلا ديوراما 2021 - Vanilla Diorama Dior
2240968,ib,جوتشي عود انتنس منتج طبيعي - Intense Oud Gucci
1283711,ib,شيخ العود ارض الزعفران - Sheikh Al Oud Arde AL ZAAFRAN
75524,ib,مسك خاص ابراهيم القرشي - Special Musk Ibrahim Al-Qurashi
99699,ib,افترنون سويم لويس فيتون - Afternoon Swim Louis Vuitton
73101,GM,واي الكسير - Y Elixir 2024
10118,ib,يارا كاندي لطافة 2024 - Yara Candy Lattafa Perfumes 2024
19245,ib,يارا لطافة - Yara Lattafa
73087,ib,سكاندال ابسولو 2024 - Scandal Absolu Jean Paul Gaultier 2024
23999,ib,سكاندال بور هوم ابسولو 2024 - Scandal Pour Homme Absolu Jean Paul Gaultier 2024
13098,ib,جود جيرل بلاش الكسير 2024 - Good Girl Blush Elixir
46459,ib,امبريال فالي قصه - Imperial Valley Gissah
19244,ib,فانيلا 28 كيالي 2018 - Vanilla 28 Kayali
24012,ib,مضاوي جولد ايدشن 2024 - MADAWUI Gold Edition 2024
77018,ib,وودي العربية للعود - Woody Arabian Oud
73813,ib,مضاوي جولد ايدشن 2024 - MADAWUI Gold Edition
8780,GM,مضاوي جولد ايدشن منتج طبيعي 2024 - MADAWUI Gold Edition 2024
24053,ib,اكوا ديجيو بروفندو بارفيوم 2024 - Aqua di Gio' Profndo Parfum 2024
24054,ib,ارماني كود بارفيوم جورجيو ارماني 2024 - Armani Code Eau de Parfum Giorgio Armani 2024
202870,ib,ماجيستيك بلاتنيوم عود العربية للعود 2024 - Majestic Platinum Oud Arabian Oud 2024
202867,ib,ماجيستيك العربية للعود 2024 - Majestic Arabian Oud
60719,ib,فانتاستيكو جيفنشي 2024 - Fantastique Givenchy 2024
73103,ib,لو فيتيفر مسك نرسيسو رودريجز 2024 - For Him Veteuver Musk NARCISO RODRIGUES2024
24038,ib,شانديغار إكسبريس اكس نيهيلو 2024 - Chandigarh Express Ex Nihilo 2024
24039,ib,خود جازم سموكي 07 كيالي 2024 - Oudgasm Smoky Oud | 07 Kayali 2024
24047,ib,اسد زنجبار لطافة 2024 - ASAD Zanzibar 2024
24046,ib,افیکشن لطافة 2024 - Affection Lattafa 2024
73091,ib,عطر الفارس العربي العربية للعود 2024 - Arabian Knight Perfume Arabian Oud 2024
260/8786,GM,نوبلز العربية للعود 2024 - Nobles Arabian Oud 2024
307846,ib,ستروبيري ليتر بلور 2024 - Strawberry Letter Phlur 2024
65666,ib,فانتوم انتنس 2024 - Phantom Intense
26509,ib,ستاليون ليذر كارولينا هريرا 2023 - Stallion Leather Carolina Herrera
40941,ib,سيمفوني لويس فيتون 2021 - Simphony Louis Vitton 2021
35619,ib,ميتيوري لويس فيتون 2020 - Météore Louis Vitton 2020
40943,ib,سيتي اوف ساترز لويس فيتون 2022 - City of Satrs Louis Vitton 2022
3255,GM,تيرو نيشان 2022 - Tero Nishane
24043,ib,ديزيرو نيشان 2024 - Deziro Nishane 2024
73104,ib,توبيروزا اكس نيشان 2024 - Tuberoza X Nishane 2024
73094,ib,ذا ليجند اوف سكاي هوريزون السماء 2024 - The Legened of sky Horizon Gissah
73096,ib,ذا ليجند اوف سكاي سورا قصه - The Legend of sora Gissah
19410,ib,ذا ليجند اوف سكاي إيلورا 2024 - Shades of sky Ellora Gissah 2024
10120,ib,شاذز اوف لوف قصه 2023 - Shades of Love Gissah 2023
19407,ib,اطلنتس قصه لوست سيتي 2024 - ATLANTIS Gissah Lost City 2024
19412,ib,اطلنتس قصه اطلس 2024 - ATLANTIS Gissah Atlas 2024
19408,ib,اطلنتس قصه بلاتو 2024 - ATLANTIS Gissah Plato 2024
19416,ib,سافا قصه 2021 - Sava Gissah 2021
19415,ib,سند قصه 2024 - Sanad Gissah 2024
19409,ib,لالونا قصه 2023 - La Luna Gissah 2023
19418,ib,مودرن هاريتاج قصه 2024 - Modern Heritage Gissah 2024
19419,ib,مونتانا قصه 2024 - Montana Gissah 2024
19414,ib,كاستيلا قصه منتج طبيعي - Casstilla Gissah
19413,ib,کالابريا قصه 2021 - Calabria Gissah 2021
19417,ib,هودسون || قصه 2024 - Hudson II Gissah 2024
19411,ib,ام . انجل فالز قصه 2022 - M. Angel Falls Gissah 2022
23998,ib,هيلين قصه 2024 - Helen Gissah 2024
19420,ib,وان اند اونلي قصه 2024 - One&Only Gissah 2024
24055,ib,اکستریم ليذر مونت بلانك 2024 - Extreme Leather Montblanc 2024
2423,GM,عطر خمرة لطافة - Khamrah Lattafa Perfumes
2130509,ib,عطر خمرة لطافة - New Khamrah Lattafa Perfumes
EL 120413,GM,عطر خمرة لطافة - Khamrah Lattafa Perfumes
MMK 83/8645,GM,عطر خمرة قهوة 2023 - Khamrah Qahwa Lattafa 2023
3243,GM,عطر خمرة قهوة 2023 - KHAMRAH QAHWA Lattafa
KMR 2227,GM,عطر خمرة قهوة - KHAMRAH QAHWA Lattafa
KMR 2228,GM,عطر خمرة قهوة 2023 - New KHAMRAH QAHWA Lattafa
KMR 2229,GM,لطافة خمرة دخان 2022 - KHAMRAH DUKHAN 2022
3113,GM,جوتشي فلاور - Gucci FLOWER
28753,GM,جوتشي فلاور مركز - Gucci FLOWER
3056,GM,جوتشي عود - Gucci OUD
6073,GM,جوتشي عود - Gucci OUD
3240,GM,جوتشي عود انتنس - Gucci OUD Intense
5603,ib,جوتشي جيلتي - GUCCI GUILTY
259/8791,GM,جوتشي جيلتي - GUCCI GUILTY
61300,GM,جود جيرل - GOOD GIRL
1277685,ib,جود جيرل - GOOD GIRL
1277684,ib,جود جيرل - GOOD GIRL
24806,GM,جود جيرل - GOOD GIRL
1277683,ib,جود جيرل - GOOD GIRL
AF 4942,GM,جود جيرل جان باد كيليان 2012 - Good Girl Gone Bad By Kilian 2012
MM 46/8615,GM,جود جيرل جلازيوس جولد كولكتور 2019 - Good Girl Glorious Gold Collector 2019
82726,GM,جنتل مان - GENTLEMAN
3112,GM,جنتل مان - HLLLS Giorgio
3241,GM,جنتل مان - GENTLEMAN
57386,ib,جنتل مان - Gentleman GIVENCHY
33/8600,GM,جنتل مان ريسيرف برايف جيفنشي 2022 - GENTLEMAN GIVENCHY RESERVE PRIVEE 2022
42/66132-G,GM,جنتل مان ريسيرف برايف منتج طبيعي 2022 - GENTLEMAN Eau de Parfum Reserve Privée Givenchy 2022
3242,GM,جنتل مان إكستريم جيفنشي - Gentleman Extrême Givenchy`;

// Parse all products
const productsData = rawProducts.split('\n')
    .filter(line => line.trim())
    .map(line => {
        const parts = line.split(',');
        if (parts.length >= 3) {
            const code = parts[0].trim();
            const company = parts[1].trim();
            const fullName = parts.slice(2).join(',').trim();
            const { nameAr, nameEn } = parseProductName(fullName);

            return {
                code,
                company,
                nameAr,
                nameEn
            };
        }
        return null;
    })
    .filter(p => p !== null);

// Export for use in script.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = productsData;
}
