// ============================================================
//  SINGLE CONFIG FILE. Change this file + 3 photos to reuse the template.
//  Any empty value ('' / null / missing) is simply not shown.
// ============================================================
export const weddingData = {
  theme: { maroon: '#5a0f14', red: '#9b1c1f', gold: '#b88a2e', 'gold-light': '#e2c26a', ivory: '#fbf3e2', sandal: '#ecd9b4' },
  fonts: { serif: '"Noto Serif Tamil", serif', sans: '"Noto Sans Tamil", sans-serif' }, // fonts must also be loaded in index.html

  // Photos live in /public/images. Give a name with extension, or without to auto-try the extensions list.
  images: {
    dir: '/images/',
    extensions: ['jpg', 'jpeg', 'png', 'webp'],
    bride: 'kavya', groom: 'anirudh', couple: 'bothimg',
    position: { bride: 'center 25%', groom: 'center 25%', couple: 'center 30%' }, // CSS object-position
  },

  opening: {
    instruction: 'அழைப்பிதழைத் திறக்க கயிற்றை அவிழ்க்கவும்',
    ariaLabel: 'கயிற்றை அவிழ்க்க',
    cardTitle: 'திருமண அழைப்பிதழ்',
  },

  titleSmall: 'ஸ்ரீ',
  title: 'திருமண அழைப்பிதழ்',
  blessingLine: 'இறைவன் திருவருளால்',
  connector: 'திருமணத்தில்',

  bride: { name: 'காவ்யா கலாநிதி மாறன்', tagline: 'நிர்வாக இயக்குநர், சன் டிவி நெட்வொர்க் • தலைமைச் செயல் அதிகாரி, சன்ரைசர்ஸ் ஹைதராபாத்' },
  groom: { name: 'அனிருத் ரவிச்சந்தர்', tagline: 'இசையமைப்பாளர் • பாடகர் • இசைத் தயாரிப்பாளர்' },

  family: {
    intro: '',
    brideSide: { label: 'மணமகள் இல்லத்தார்', parents: 'திரு. கலாநிதி மாறன் மற்றும் திருமதி. காவேரி கலாநிதி மாறன்' },
    groomSide: null,   // e.g. { label: 'மணமகன் இல்லத்தார்', parents: '...' } -- only add verified details
    invite: '',
  },

  bloom: {
    greeting: 'இனிய இல்லற வாழ்வில் இணையும் இவ்விருவரையும் வாழ்த்தி மகிழ்வோம்',
    hint: 'மலரைத் தொட்டுப் பாருங்கள்',
    names: 'காவ்யா & அனிருத்',
    photoPlaceholder: 'புகைப்படம்',
    openLabel: 'மலரைத் திறக்க',
    closeLabel: 'மலரை மூட',
  },

  wedding: {
    heading: 'திருமண விழா',
    date: '11 நவம்பர் 2026',
    day: 'புதன்கிழமை',
    celebrations: '10–11 நவம்பர் 2026',
    tamilMonth: '', tamilDate: '', nakshatram: '', muhurtham: '', time: '',
    ceremony: 'தனிப்பட்ட சுயமரியாதை திருமணம்',
    location: 'கிரீஸ்',
    venue: '', address: '',
    mapQuery: 'Greece',   // Google Maps search text
    mapUrl: '',           // optional: full Google Maps link, overrides mapQuery
  },

  reception: {
    heading: 'திருமண வரவேற்பு',
    date: '21 நவம்பர் 2026',
    day: 'சனிக்கிழமை',
    time: '',
    location: 'சென்னை, தமிழ்நாடு',
    venue: '', address: '',
    mapQuery: 'Chennai Tamil Nadu India',
    mapUrl: '',
  },

  labels: {
    date: 'நாள்', day: 'கிழமை', celebrations: 'கொண்டாட்டங்கள்', tamilDate: 'தமிழ் தேதி',
    nakshatram: 'நட்சத்திரம்', muhurtham: 'முகூர்த்தம்', time: 'நேரம்', ceremony: 'நிகழ்வு',
    location: 'இடம்', venue: 'அரங்கம்',
  },

  closing: {
    blessing: 'இவ்விருவரின் இனிய இல்லற வாழ்வில் அன்பும் மகிழ்ச்சியும் என்றும் நிறைந்திருக்க வாழ்த்துகிறோம்.',
    message: 'தங்கள் வருகையையும் வாழ்த்துகளையும் அன்புடன் எதிர்பார்க்கிறோம்.',
    from: '',
  },
}
