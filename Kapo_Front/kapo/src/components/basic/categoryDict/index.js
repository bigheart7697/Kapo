const dict = {
    'electronics' : "وسایل الکترونیکی",
    'personal': 'بهداشت و شخصی',
    'businesses': 'تجاری',
    'vehicle': 'وسایل نقلیه',
    'home-appliance': 'ابزار آلات خانه',
    'leisure-and-hobbies': 'تفریح و سرگرمی',
    'furniture-and-home-decor': 'مبلمان و دکور خانه',
    'cars': 'اتومبیل',
    'baby-and-toys': 'نوزاد و اسباب بازی',
    'parts-accessories': 'قطعات و لوازم جانبی',
    'utensils-and-appliances': 'وسایل و ظروف',
    'clothing-and-shoes': 'کفش و لباس',
    'mobile-tablet': 'تبلت و گوشی',
    'children-clothing-and-shoe': 'کفش و لباس کودکان',
    'game-consoles-and-video-games': 'کنسول و بازی ویدئویی',
    'audio-video': 'صوتی و تصویری',
    'building-and-garden': 'باغچه و ساختمان',
    'jewelry-and-watches': 'ساعت و جواهرات',
    'equipments-and-machinery': 'تجهیزات و ماشین‌آلات',
    'bicycle': 'دوچرخه',
    'animals': 'حیوانات',
    'musical-instruments': 'ابزار آلات موسیقی',
    'health-beauty': 'زیبایی و سلامت',
    'motorcycles': 'موتور سیکلت',
    'computers': 'کامپیوتر',
    'sport-leisure': 'تفریح و ورزش',
    'book-student-literature': 'کتاب و ادبیات',
    'utility': 'ابزار',
    'travel-packages': 'وسایل مسافرت',
    'hobby-collectibles': 'سرگرمی‌های کلکسیونی',
    'leisure-hobbies-toys': 'اسباب بازی‌های سرگرمی',
    'phone': 'تلفن',
    'sofa-armchair': 'مبل و صندلی',
    'antiques-and-art': 'هنر و عتیقه',
    'heavy': 'وسایل نقلیه سنگین',
    'personal-toys': 'اسباب بازی شخصی',
    'cookware-tableware': 'وسایل آشپزی',
    'light': 'چراغ',
    'clothing': 'لباس',
    'mobile-phones': 'تلفن موبایل',
    'tv-projector': 'پروژکتور',
    'garden-and-patio': 'پاسیو و باغچه',
    'watches': 'ساعت',
    'offices': 'وسایل اداری',
    'kitchen': 'آشپزخانه',
    'farm-animals': 'حیوانات مزرعه',
    'cat': 'گربه',
    'video-dvd-player': 'پخش کننده‌ی ویدئو و دی‌وی‌دی',
    'shoes-belt-bag': 'کفش، کوله پشتی و کمربند',
    'industrial': 'وسایل صنعتی',
    'tv-and-stereo-furniture': 'لوازم تلویزیون و استریو',
    'birds': 'پرندگان',
    'guitar-bass-amplifier': 'تقویت‌کننده گیتار باس',
    'beds-bedroom': 'وسایل اتاق خواب',
    'carpets': 'فرش',
    'mobile-tablet-accessories': 'وسایل جانبی گوشی و تبلت',
    'fridge-and-freezer': 'یخچال و فریزر',
    'lighting': 'روشنایی',
    'tables-and-chairs': 'میز و صندلی',
    'strollers-and-accessories': 'چرخ دستی و لوازم جانبی',
    'modem-and-network-equipment': 'مودم و وسایل شبکه',
    'jewelry': 'جواهر آلات',
    'stereo-surround': 'وسایل استریو',
    'camera-cam-coders': 'رمزگذاری دوربین',
    'training': 'وسایل تمرینات ورزشی',
    'storage': 'انبار',
    'stove-and-heating': 'اجاق و گرمایش',
    'barbershop-and-beauty-salon': 'وسایل پیرایش و آرایشگری',
    'dishwasher': 'ماشین ظرف‌شویی',
    'parts-and-accessories': 'قطعات و لوازم جانبی',
    'cafe-and-restaurant': 'کافه و رستوران',
    'microwave-stove': 'اجاق مایکروویو',
    'washer-dryer': 'ماشین ظرفشویی و خشک‌کننده',
    'educational': 'کتب آموزشی',
    'children-furniture': 'اثاثیه کودک',
    'piano-keyboard': 'پیانو و کیبورد',
    'desktops': 'صفحه نمایش',
    'shop-and-cash': 'فروشگاه و پول نقد',
    'laptops': 'لپتاپ',
    'rhinestones': 'بدلیجات',
    'bathroom-wc-sauna': 'سرویس بهداشتی، سونا و حمام',
    'textile-ornaments': 'زیور آلات نساجی',
    'tablet': 'تبلت',
    'historical-objects': 'اشیای تاریخی',
    'instrument-cleaning-tailoring': 'ابزار تمیز کردن',
    'fish': 'ماهی',
    'accessories': 'تجهیزات جانبی',
    'camping-outdoor': 'وسایل کمپ',
    'traditional': 'سنتی',
    'child-car-seat': 'صندلی اتوموبیل کودک',
    'printer-scanner-copier': 'پرینتر، اسکنر و کپی',
    'rodents-rabbits': 'خرگوش و جوندگان',
    'coin-stamp': 'سکه و مهر',
    'ball-sports': 'ورزش‌های با توپ',
    'repair-tool': 'ابزار تعمیر',
    'winter-sports': 'ورزش‌های زمستانی',
    'drums-percussion': 'طبل و کوبه'

}

export const catDict = catHierarchy => {
    let cat = null;
    let cat1 = null;
    let cat2 = null;
    for (cat in catHierarchy.categories) {
        if (catHierarchy.categories[cat].text in dict) {
            catHierarchy.categories[cat].text = dict[catHierarchy.categories[cat].text];
        }
        for (cat1 in catHierarchy.categories[cat].categories) {
            if (catHierarchy.categories[cat].categories[cat1].text in dict) {
                catHierarchy.categories[cat].categories[cat1].text = dict[catHierarchy.categories[cat].categories[cat1].text];
            }
            for (cat2 in catHierarchy.categories[cat].categories[cat1].categories) {
                if (catHierarchy.categories[cat].categories[cat1].categories[cat2].text in dict) {
                    catHierarchy.categories[cat].categories[cat1].categories[cat2].text = dict[catHierarchy.categories[cat].categories[cat1].categories[cat2].text];
                }
            }
        }
    }
    return catHierarchy
}

export const translate = originWord => {
    if (!originWord) {
        return ""
    }

    if (originWord in dict) {
        return dict[originWord];
    }
    else {
        return originWord
    }
}
        