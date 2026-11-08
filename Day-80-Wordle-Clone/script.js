// --- WORD LIST with Hints ---
const WORDS = [
  { word: "APPLE", hint: "Fruit • Red / Green" },
  { word: "HOUSE", hint: "You live in it" },
  { word: "WATER", hint: "Drink it daily" },
  { word: "MUSIC", hint: "Songs & Melody" },
  { word: "TIGER", hint: "Animal • Stripes" },
  { word: "OCEAN", hint: "Big water body" },
  { word: "LIGHT", hint: "Opposite of dark" },
  { word: "SMILE", hint: "Happy face" },
  { word: "BRAIN", hint: "Think with it" },
  { word: "CLOUD", hint: "In sky • Rain" },
  { word: "PHONE", hint: "You use daily" },
  { word: "PIZZA", hint: "Food • Cheese" },
  { word: "CRICKET", hint: "Too long" }, // filtered
  { word: "TRAIN", hint: "Mumbai Local" },
  { word: "MONEY", hint: "Everyone wants" },
  { word: "DANCE", hint: "Move to music" },
  { word: "PLANT", hint: "Green • Grows" },
  { word: "BEACH", hint: "Sea + Sand" },
  { word: "BREAD", hint: "Food • Breakfast" },
  { word: "HAPPY", hint: "Feeling • Joy" },
  { word: "WORLD", hint: "Earth" },
  { word: "CLOCK", hint: "Shows time" },
  { word: "HEART", hint: "Love • Beats" },
  { word: "SUGAR", hint: "Sweet" },
  { word: "TABLE", hint: "Furniture" },
  { word: "RIVER", hint: "Water flows" },
  { word: "SNAKE", hint: "Animal • Game Day-74" },
  { word: "FLAME", hint: "Fire" },
  { word: "GHOST", hint: "Spooky" },
  { word: "QUEEN", hint: "Royal" },
].filter(w => w.word.length === 5);

// Valid guesses - allow any 5-letter from list + common words
const VALID = new Set([...WORDS.map(w => w.word), "HELLO","WORLD","ABOUT","ABOVE","ABUSE","ADAPT","ADMIT","ADOPT","ADULT","AFTER","AGAIN","AGENT","AGILE","AGREE","AHEAD","ALARM","ALBUM","ALERT","ALIEN","ALIGN","ALIKE","ALIVE","ALLEY","ALLOT","ALLOW","ALLOY","ALONE","ALOUD","ALPHA","ALREADY","ALSO","ALTER","ALWAYS","AMAZE","AMBER","AMEND","AMITY","AMONG","AMUSE","ANGEL","ANGER","ANGLE","ANGST","ANIMAL","ANKLE","ANNOUNCE","ANOTHER","ANSWER","ANTIC","ANXIETY","APART","APOLOGY","APPARENT","APPEAL","APPEAR","APPLE","APPLY","APPOINT","APPROVE","ARCH","ARENA","ARGUE","ARISE","ARM","ARMY","AROUND","ARRANGE","ARREST","ARRIVE","ARROW","ART","ARTICLE","ARTIST","ASH","ASK","ASPECT","ASSET","ASSIGN","ASSIST","ASSUME","ASTHMA","ATHLETE","ATOM","ATTACK","ATTEMPT","ATTEND","ATTITUDE","ATTRACT","AUCTION","AUDIT","AUGUST","AUNT","AUTHOR","AUTO","AUTUMN","AVERAGE","AVOCADO","AVOID","AWAKE","AWARD","AWARE","AWESOME","AWFUL","AWKWARD","AXIS","BABY","BACHELOR","BACON","BADGE","BAG","BALANCE","BALCONY","BALL","BAMBOO","BANANA","BAND","BANK","BAR","BARE","BARGAIN","BARREL","BASE","BASIC","BASKET","BATTLE","BEACH","BEAN","BEAUTY","BECAUSE","BECOME","BEEF","BEFORE","BEGIN","BEHAVE","BEHIND","BEING","BELIEF","BELL","BELONG","BELOW","BELT","BENCH","BEND","BENEFIT","BEST","BET","BEYOND","BIBLE","BID","BIKE","BILL","BILLION","BIND","BIOLOGY","BIRD","BIRTH","BITTER","BLACK","BLADE","BLAME","BLANKET","BLAST","BLEAK","BLESS","BLIND","BLOOD","BLOSSOM","BLOUSE","BLUE","BLUR","BLUSH","BOARD","BOAT","BODY","BOIL","BOLD","BOLT","BOMB","BONE","BONUS","BOOK","BOOST","BORDER","BORING","BORROW","BOSS","BOTTOM","BOUNCE","BOX","BOY","BRACKET","BRAIN","BRAND","BRASS","BRAVE","BREAD","BREEZE","BRICK","BRIDGE","BRIEF","BRIGHT","BRING","BRISK","BROCCOLI","BROKEN","BRONZE","BROOM","BROTHER","BROWN","BRUSH","BUBBLE","BUCKET","BUDGET","BUFFALO","BUILD","BULB","BULK","BULLET","BUNDLE","BUNKER","BURDEN","BURGER","BURST","BUS","BUSINESS","BUSY","BUTTER","BUYER","BUZZ","CABBAGE","CABIN","CABLE","CACTUS","CAGE","CAKE","CALL","CALM","CAMERA","CAMP","CAN","CANAL","CANCEL","CANDY","CANNON","CANOE","CANVAS","CANYON","CAPABLE","CAPITAL","CAPTAIN","CAR","CARBON","CARD","CARGO","CARPET","CARRY","CART","CASE","CASH","CASINO","CASTLE","CASUAL","CAT","CATALOG","CATCH","CATEGORY","CATTLE","CAUGHT","CAUSE","CAUTION","CAVE","CEILING","CELERY","CEMENT","CENSUS","CENTURY","CEREAL","CERTAIN","CHAIR","CHALK","CHAMPION","CHANGE","CHAOS","CHAPTER","CHARGE","CHARM","CHART","CHASE","CHAT","CHEAP","CHECK","CHEESE","CHEF","CHERRY","CHEST","CHICKEN","CHIEF","CHILD","CHIMNEY","CHOICE","CHOOSE","CHOP","CHORE","CHORUS","CHUCKLE","CHUNK","CHURN","CIGAR","CINNAMON","CIRCLE","CITIZEN","CITY","CIVIL","CLAIM","CLAP","CLARIFY","CLAW","CLAY","CLEAN","CLERK","CLEVER","CLICK","CLIENT","CLIFF","CLIMB","CLINIC","CLIP","CLOCK","CLOG","CLOSE","CLOTH","CLOUD","CLOWN","CLUB","CLUMP","CLUSTER","CLUTCH","COACH","COAST","COCONUT","CODE","COFFEE","COIL","COIN","COLLECT","COLOR","COLUMN","COMBINE","COME","COMFORT","COMIC","COMMON","COMPANY","CONCERT","CONDUCT","CONFIRM","CONGRESS","CONNECT","CONSIDER","CONTROL","CONVINCE","COOK","COOL","COPPER","COPY","CORAL","CORE","CORN","CORRECT","COST","COTTON","COUCH","COUNTRY","COUPLE","COURSE","COUSIN","COVER","COYOTE","CRACK","CRADLE","CRAFT","CRAM","CRANE","CRASH","CRATER","CRAWL","CRAZY","CREAM","CREDIT","CREEK","CREW","CRICKET","CRIME","CRISP","CRITIC","CROP","CROSS","CROUCH","CROWD","CRUCIAL","CRUEL","CRUISE","CRUMBLE","CRUNCH","CRUSH","CRY","CRYSTAL","CUBE","CULTURE","CUP","CUPBOARD","CURIOUS","CURRENT","CURTAIN","CURVE","CUSHION","CUSTOM","CUTE","CYCLE","DAD","DAMAGE","DAMP","DANCE","DANGER","DARING","DASH","DAUGHTER","DAWN","DAY","DEAL","DEBATE","DEBRIS","DECADE","DECEMBER","DECIDE","DECLINE","DECORATE","DECREASE","DEER","DEFENSE","DEFINE","DEFY","DEGREE","DELAY","DELIVER","DEMAND","DEMOLISH","DENIM","DENY","DENTIST","DENY","DEPART","DEPEND","DEPOSIT","DEPTH","DEPUTY","DERIVE","DESCRIBE","DESERT","DESIGN","DESK","DESPAIR","DESTROY","DETAIL","DETECT","DEVELOP","DEVICE","DEVOTE","DIAGRAM","DIAL","DIAMOND","DIARY","DICE","DIESEL","DIET","DIFFER","DIGITAL","DIGNITY","DILEMMA","DINNER","DINOSAUR","DIRECT","DIRT","DISAGREE","DISCOVER","DISEASE","DISH","DISMISS","DISORDER","DISPLAY","DISTANCE","DIVERT","DIVIDE","DIVORCE","DIZZY","DOCTOR","DOCUMENT","DOG","DOLL","DOLPHIN","DOMAIN","DONATE","DONKEY","DONOR","DOOR","DOSE","DOUBLE","DOVE","DRAFT","DRAGON","DRAMA","DRASTIC","DRAW","DREAM","DRESS","DRIFT","DRILL","DRINK","DRIP","DRIVE","DROP","DRUM","DRY","DUCK","DUMBBELL","DUNE","DURING","DUST","DUTCH","DUTY","DWARF","DYNAMIC","EAGER","EAGLE","EARLY","EARN","EARTH","EASILY","EAST","EASY","EAT","EBB","ECHO","ECOLOGY","ECONOMY","EDGE","EDIT","EDUCATE","EFFORT","EGG","EIGHT","EITHER","ELBOW","ELDER","ELECTRIC","ELEGANT","ELEMENT","ELEPHANT","ELITE","ELSE","ELM","EMAIL","EMBARK","EMBODY","EMBRACE","EMERGE","EMOTION","EMPLOY","EMPOWER","EMPTY","ENABLE","ENACT","END","ENDLESS","ENDORSE","ENEMY","ENERGY","ENFORCE","ENGAGE","ENGINE","ENHANCE","ENJOY","ENLIST","ENOUGH","ENRICH","ENROLL","ENSURE","ENTER","ENTIRE","ENTRY","ENVELOPE","EPISODE","EQUAL","EQUIP","ERA","ERASE","ERECT","ERRAND","ERROR","ERUPT","ESCAPE","ESSAY","ESSENCE","ESTATE","ETERNAL","ETHICS","EVIDENCE","EVIL","EVOKE","EVOLVE","EXACT","EXAMPLE","EXCESS","EXCHANGE","EXCITE","EXCLUDE","EXCUSE","EXECUTE","EXERCISE","EXHAUST","EXHIBIT","EXILE","EXIST","EXIT","EXOTIC","EXPAND","EXPECT","EXPIRE","EXPLAIN","EXPOSE","EXPRESS","EXTEND","EXTRA","EYE","EYEBROW","FABRIC","FACE","FACILITY","FACT","FACTOR","FACTORY","FACULTY","FADE","FAINT","FAITH","FALL","FALSE","FAME","FAMILY","FAMOUS","FAN","FANCY","FANTASY","FARM","FASHION","FAT","FATAL","FATHER","FATIGUE","FAULT","FAVORITE","FEATURE","FEBRUARY","FEDERAL","FEE","FEED","FEEL","FEMALE","FENCE","FESTIVAL","FETCH","FEVER","FEW","FIBER","FICTION","FIELD","FIGURE","FILE","FILM","FILTER","FINAL","FIND","FINE","FINGER","FINISH","FIRE","FIRM","FIRST","FISCAL","FISH","FIT","FITNESS","FIX","FLAG","FLAME","FLASH","FLAT","FLAVOR","FLEE","FLIGHT","FLIP","FLOAT","FLOCK","FLOOR","FLOWER","FLUID","FLUSH","FLY","FOAM","FOCUS","FOG","FOIL","FOLD","FOLLOW","FOOD","FOOT","FORCE","FOREST","FORGET","FORK","FORTUNE","FORUM","FORWARD","FOSSIL","FOSTER","FOUND","FOX","FRAGILE","FRAME","FREQUENT","FRESH","FRIEND","FRINGE","FROG","FRONT","FROST","FROWN","FROZEN","FRUIT","FUEL","FUN","FUNNY","FURNACE","FURY","FUTURE","GADGET","GAIN","GALAXY","GALLERY","GAME","GAP","GARAGE","GARBAGE","GARDEN","GARLIC","GARMENT","GAS","GASP","GATE","GATHER","GAUGE","GAZE","GENERAL","GENIUS","GENRE","GENTLE","GENUINE","GESTURE","GHOST","GIANT","GIFT","GIGGLE","GINGER","GIRAFFE","GIRL","GIVE","GLAD","GLANCE","GLARE","GLASS","GLIDE","GLIMPSE","GLOBE","GLOOM","GLORY","GLOVE","GLOW","GLUE","GOAT","GODDESS","GOLD","GOOD","GORGEOUS","GORILLA","GOSPEL","GOSSIP","GOVERN","GOWN","GRAB","GRACE","GRAIN","GRAND","GRANT","GRAPE","GRASS","GRAVITY","GREAT","GREEN","GRID","GRIEF","GRIT","GROCERY","GROUP","GROW","GRUNT","GUARD","GUESS","GUIDE","GUILT","GUITAR","GUN","GYM","HABIT","HAIR","HALF","HAMMER","HAMSTER","HAND","HAPPY","HARBOR","HARD","HARSH","HARVEST","HAT","HAVE","HAWK","HAZARD","HEAD","HEALTH","HEART","HEAVY","HEDGEHOG","HEIGHT","HELLO","HELMET","HELP","HEN","HERO","HIDDEN","HIGH","HILL","HINT","HIP","HIRE","HISTORY","HOBBY","HOCKEY","HOLD","HOLE","HOLIDAY","HOLLOW","HOME","HONEY","HOOD","HOPE","HORN","HORROR","HORSE","HOSPITAL","HOST","HOTEL","HOUR","HOVER","HUB","HUGE","HUMAN","HUMBLE","HUMOR","HUNDRED","HUNGRY","HUNT","HURDLE","HURRY","HURT","HUSBAND","HYBRID","ICE","ICON","IDEA","IDENTIFY","IDLE","IGNORE","ILL","ILLEGAL","ILLNESS","IMAGE","IMITATE","IMMENSE","IMMUNE","IMPACT","IMPOSE","IMPROVE","IMPULSE","INCH","INCLUDE","INCOME","INCREASE","INDEX","INDICATE","INDOOR","INDUSTRY","INFANT","INFLICT","INFORM","INHALE","INHERIT","INITIAL","INJECT","INJURY","INMATE","INNER","INNOCENT","INPUT","INQUIRY","INSANE","INSECT","INSIDE","INSIGHT","INSIST","INSPIRE","INSTALL","INTACT","INTEREST","INTO","INVEST","INVITE","INVOLVE","IRON","ISLAND","ISOLATE","ISSUE","ITEM","IVORY","JACKET","JAGUAR","JAR","JAZZ","JEALOUS","JEANS","JELLY","JEWEL","JOB","JOIN","JOKE","JOURNEY","JOY","JUDGE","JUICE","JUMP","JUNGLE","JUNIOR","JUNK","JUST","KANGAROO","KEEN","KEEP","KETCHUP","KEY","KICK","KID","KIDNEY","KIND","KINGDOM","KISS","KIT","KITCHEN","KITE","KITTEN","KIWI","KNEE","KNIFE","KNOCK","KNOW","LAB","LABEL","LABOR","LADDER","LADY","LAKE","LAMP","LANGUAGE","LAPTOP","LARGE","LATER","LATIN","LAUGH","LAUNDRY","LAVA","LAW","LAWN","LAWSUIT","LAYER","LAZY","LEADER","LEAF","LEARN","LEAVE","LECTURE","LEFT","LEG","LEGAL","LEGEND","LEISURE","LEMON","LEND","LENGTH","LENS","LEOPARD","LESSON","LETTER","LEVEL","LIAR","LIBERTY","LIBRARY","LICENSE","LIFE","LIFT","LIGHT","LIKE","LIMB","LIMIT","LINK","LION","LIQUID","LIST","LITTLE","LIVE","LIZARD","LOAD","LOAN","LOBSTER","LOCAL","LOCK","LOGIC","LONELY","LONG","LOOP","LOTTERY","LOUD","LOUNGE","LOVE","LOYAL","LUCKY","LUGGAGE","LUMBER","LUNAR","LUNCH","LUXURY","LYRICS","MACHINE","MAD","MAGIC","MAGNET","MAID","MAIL","MAIN","MAJOR","MAKE","MAMMAL","MAN","MANAGE","MANDATE","MANGO","MANSION","MANUAL","MAPLE","MARBLE","MARCH","MARGIN","MARINE","MARKET","MARRIAGE","MASK","MASS","MASTER","MATCH","MATE","MATERIAL","MATH","MATRIX","MATTER","MAXIMUM","MAZE","MEADOW","MEAN","MEASURE","MEAT","MECHANIC","MEDAL","MEDIA","MELODY","MELT","MEMBER","MEMORY","MENTION","MENU","MERCY","MERGE","MERIT","MERRY","MESH","MESSAGE","METAL","METHOD","MIDDLE","MIDNIGHT","MILK","MILLION","MIMIC","MIND","MINIMUM","MINOR","MINUTE","MIRACLE","MIRROR","MISERY","MISS","MISTAKE","MIX","MIXED","MIXTURE","MOBILE","MODEL","MODIFY","MOM","MOMENT","MONITOR","MONKEY","MONSTER","MONTH","MOON","MORAL","MORE","MORNING","MOSQUITO","MOTHER","MOTION","MOTOR","MOUNTAIN","MOUSE","MOVE","MOVIE","MUCH","MUFFIN","MULE","MULTIPLY","MUSCLE","MUSEUM","MUSHROOM","MUSIC","MUSTARD","MUTUAL","MYSELF","MYSTERY","MYTH","NAIVE","NAME","NAPKIN","NARROW","NASTY","NATION","NATURE","NEAR","NECK","NEED","NEGATIVE","NEGLECT","NEIGHBOR","NEON","NEPHEW","NERVE","NEST","NET","NETWORK","NEUTRAL","NEVER","NEWS","NEXT","NICE","NIGHT","NOBLE","NOISE","NOMINEE","NOODLE","NORMAL","NORTH","NOSE","NOTABLE","NOTE","NOTHING","NOTICE","NOVEL","NOW","NUCLEAR","NUMBER","NURSE","NUT","OAK","OBEY","OBJECT","OBLIGE","OBSCURE","OBSERVE","OBTAIN","OBVIOUS","OCCUR","OCEAN","OCTOBER","ODOR","OFF","OFFER","OFFICE","OFTEN","OIL","OKAY","OLD","OLIVE","OLYMPIC","OMIT","ONCE","ONE","ONION","ONLINE","ONLY","OPEN","OPERA","OPINION","OPPOSE","OPTION","ORANGE","ORBIT","ORCHARD","ORDER","ORDINARY","ORGAN","ORIENT","ORIGIN","ORNAMENT","OTHER","OUTDOOR","OUTER","OUTPUT","OUTSIDE","OVAL","OVEN","OVER","OWN","OWNER","OXYGEN","OYSTER","OZONE","PACT","PADDLE","PAGE","PAIR","PALACE","PALM","PANDA","PANEL","PANIC","PANTHER","PAPER","PARADE","PARENT","PARK","PARROT","PARTY","PASS","PATCH","PATH","PATIENT","PATROL","PATTERN","PAUSE","PAVE","PAYMENT","PEACE","PEANUT","PEAR","PEASANT","PELICAN","PEN","PENALTY","PENCIL","PEOPLE","PEPPER","PERFECT","PERMIT","PERSON","PET","PHONE","PHOTO","PHRASE","PHYSICAL","PIANO","PICNIC","PICTURE","PIECE","PIG","PIGEON","PILL","PILOT","PINK","PIONEER","PIPE","PISTOL","PITCH","PIZZA","PLACE","PLANET","PLASTIC","PLATE","PLAY","PLEASE","PLEDGE","PLUCK","PLUG","PLUNGE","POEM","POET","POINT","POLAR","POLE","POLICE","POND","PONY","POOL","POPULAR","PORTION","POSITION","POSSIBLE","POST","POTATO","POTTERY","POVERTY","POWDER","POWER","PRACTICE","PRAISE","PREDICT","PREFER","PREPARE","PRESENT","PRETTY","PREVENT","PRICE","PRIDE","PRIMARY","PRINT","PRIORITY","PRISON","PRIVATE","PRIZE","PROBLEM","PROCESS","PRODUCE","PROFIT","PROGRAM","PROJECT","PROMOTE","PROOF","PROPERTY","PROSPER","PROTECT","PROUD","PROVIDE","PUBLIC","PUDDING","PULL","PULP","PULSE","PUMPKIN","PUNCH","PUPIL","PUPPY","PURCHASE","PURITY","PURPOSE","PURSE","PUSH","PUT","PUZZLE","PYRAMID","QUALITY","QUANTUM","QUARTER","QUESTION","QUICK","QUIT","QUIZ","QUOTE","RABBIT","RACCOON","RACE","RACK","RADAR","RADIO","RAIL","RAIN","RAISE","RALLEY","RAMP","RANCH","RANDOM","RANGE","RAPID","RARE","RATE","RATHER","RAVEN","RAW","RAZOR","READY","REAL","REASON","REBEL","REBUILD","RECALL","RECEIVE","RECIPE","RECORD","RECYCLE","REDUCE","REFLECT","REFORM","REFUSE","REGION","REGRET","REGULAR","REJECT","RELAX","RELEASE","RELIEF","RELY","REMAIN","REMEMBER","REMIND","REMOVE","RENDER","RENEW","RENT","REOPEN","REPAIR","REPEAT","REPLACE","REPLY","REPORT","REQUIRE","RESCUE","RESEMBLE","RESIST","RESOURCE","RESPONSE","RESULT","RETIRED","RETREAT","RETURN","REUNION","REVEAL","REVIEW","REWARD","RHYTHM","RIB","RIBBON","RICE","RICH","RIDE","RIDGE","RIFLE","RIGHT","RIGID","RING","RIOT","RIPPLE","RISK","RITUAL","RIVAL","RIVER","ROAD","ROAST","ROBOT","ROBUST","ROCKET","ROMANCE","ROOF","ROOKIE","ROOM","ROSE","ROTATE","ROUGH","ROUND","ROUTE","ROYAL","RUBBER","RUDE","RUG","RULE","RUN","RUNWAY","RURAL","SAD","SADDLE","SADNESS","SAFE","SAIL","SALAD","SALMON","SALON","SALT","SALUTE","SAME","SAMPLE","SAND","SATISFY","SATOSHI","SAUCE","SAUSAGE","SAVE","SAY","SCALE","SCAN","SCARE","SCATTER","SCENE","SCHEME","SCHOOL","SCIENCE","SCISSORS","SCORPION","SCOUT","SCRAP","SCREEN","SCRIPT","SCRUB","SEA","SEARCH","SEASON","SEAT","SECOND","SECRET","SECTION","SECURITY","SEED","SEEK","SEGMENT","SELECT","SELL","SEMINAR","SENIOR","SENSE","SENTENCE","SERIES","SERVICE","SESSION","SETTLE","SETUP","SEVEN","SHADOW","SHAFT","SHALLOW","SHARE","SHED","SHELL","SHERIFF","SHIELD","SHIFT","SHINE","SHIP","SHIVER","SHOCK","SHOE","SHOOT","SHOP","SHORT","SHOULDER","SHOVE","SHRIMP","SHRUG","SHUFFLE","SHY","SIBLING","SICK","SIDE","SIEGE","SIGHT","SIGN","SILENT","SILK","SILLY","SILVER","SIMILAR","SIMPLE","SINCE","SING","SIREN","SISTER","SITUATION","SIX","SIZE","SKATE","SKETCH","SKI","SKILL","SKIN","SKIRT","SKULL","SLAB","SLAM","SLEEP","SLENDER","SLICE","SLIDE","SLIGHT","SLIM","SLOGAN","SLOT","SLOW","SLUSH","SMALL","SMART","SMILE","SMOKE","SMOOTH","SNACK","SNAKE","SNAP","SNIFF","SNOW","SOAP","SOCCER","SOCIAL","SOCK","SODA","SOFT","SOLAR","SOLDIER","SOLID","SOLUTION","SOLVE","SOMEONE","SONG","SOON","SORRY","SORT","SOUL","SOUND","SOUP","SOURCE","SOUTH","SPACE","SPARE","SPATIAL","SPAWN","SPEAK","SPECIAL","SPEED","SPELL","SPEND","SPHERE","SPICE","SPIDER","SPIKE","SPIN","SPIRIT","SPLIT","SPOIL","SPONSOR","SPOON","SPORT","SPOT","SPRAY","SPREAD","SPRING","SPY","SQUARE","SQUEEZE","SQUIRREL","STABLE","STADIUM","STAFF","STAGE","STAIRS","STAMP","STAND","START","STATE","STAY","STEAK","STEEL","STEM","STEP","STEREO","STICK","STILL","STING","STOCK","STOMACH","STONE","STOOL","STORY","STOVE","STRATEGY","STREET","STRIKE","STRONG","STRUGGLE","STUDENT","STUFF","STUMBLE","STYLE","SUBJECT","SUBMIT","SUBWAY","SUCCESS","SUCH","SUDDEN","SUFFER","SUGAR","SUGGEST","SUIT","SUMMER","SUN","SUNNY","SUNSET","SUPER","SUPPLY","SUPREME","SURE","SURFACE","SURGE","SURPRISE","SURROUND","SURVEY","SUSPECT","SUSTAIN","SWALLOW","SWAMP","SWAP","SWARM","SWEAR","SWEET","SWIFT","SWIM","SWING","SWITCH","SWORD","SYMBOL","SYMPTOM","SYRUP","SYSTEM","TABLE","TACKLE","TAG","TAIL","TALENT","TALK","TANK","TAPE","TARGET","TASK","TASTE","TATTOO","TAXI","TEACH","TEAM","TELL","TEN","TENANT","TENNIS","TENT","TERM","TEST","TEXT","THANK","THAT","THEME","THEN","THEORY","THERE","THEY","THING","THIS","THOUGHT","THREE","THRIVE","THROW","THUMB","THUNDER","TICKET","TIDE","TIGER","TILT","TIMBER","TIME","TINY","TIP","TIRED","TISSUE","TITLE","TOAST","TOBACCO","TODAY","TODDLER","TOE","TOGETHER","TOILET","TOKEN","TOMATO","TOMORROW","TONE","TONGUE","TONIGHT","TOOL","TOOTH","TOP","TOPIC","TOPPLE","TORCH","TORNADO","TORTOISE","TOSS","TOTAL","TOURIST","TOWARD","TOWER","TOWN","TOY","TRACK","TRADE","TRAFFIC","TRAGIC","TRAIN","TRANSFER","TRAP","TRASH","TRAVEL","TRAY","TREAT","TREE","TREND","TRIAL","TRIBE","TRICK","TRIGGER","TRIM","TRIP","TROPHY","TROUBLE","TRUCK","TRUE","TRULY","TRUMPET","TRUST","TRUTH","TRY","TUBE","TUITION","TUMBLE","TUNA","TUNNEL","TURKEY","TURN","TURTLE","TWELVE","TWENTY","TWICE","TWIN","TWIST","TWO","TYPE","TYPICAL","UGLY","UMBRELLA","UNABLE","UNAWARE","UNCLE","UNCOVER","UNDER","UNDO","UNFAIR","UNFOLD","UNHAPPY","UNIFORM","UNIQUE","UNIT","UNIVERSE","UNKNOWN","UNLOCK","UNTIL","UNUSUAL","UNVEIL","UPDATE","UPGRADE","UPHOLD","UPON","UPPER","UPSET","URBAN","URGE","USAGE","USE","USED","USEFUL","USELESS","USUAL","UTILITY","VACANT","VACUUM","VAGUE","VALID","VALLEY","VALVE","VAN","VANISH","VAPOR","VARIOUS","VAST","VAULT","VEHICLE","VELVET","VENDOR","VENTURE","VENUE","VERB","VERIFY","VERSION","VERY","VESSEL","VETERAN","VIABLE","VIBRANT","VICIOUS","VICTORY","VIDEO","VIEW","VILLAGE","VINTAGE","VIOLIN","VIRTUAL","VIRUS","VISA","VISIT","VISUAL","VITAL","VIVID","VOCAL","VOICE","VOID","VOLCANO","VOLUME","VOTE","VOYAGE","WAGE","WAGON","WAIT","WALK","WALL","WALNUT","WANT","WARFARE","WARM","WARRIOR","WASH","WASP","WASTE","WATCH","WATER","WAVE","WAY","WEALTH","WEAPON","WEAR","WEASEL","WEATHER","WEB","WEDDING","WEEKEND","WEIRD","WELCOME","WEST","WET","WHALE","WHAT","WHEAT","WHEEL","WHEN","WHERE","WHIP","WHISPER","WIDE","WIDTH","WIFE","WILD","WILL","WIN","WINDOW","WINE","WING","WINK","WINNER","WINTER","WIRE","WISDOM","WISE","WISH","WITNESS","WOLF","WOMAN","WONDER","WOOD","WOOL","WORD","WORK","WORLD","WORRY","WORTH","WRAP","WRECK","WRESTLE","WRIST","WRITE","WRONG","YARD","YEAR","YELLOW","YOU","YOUNG","YOUTH","ZEBRA","ZERO","ZONE","ZOO"
]);

let target = null;
let currentRow = 0;
let currentCol = 0;
let guesses = []; // array of {word, result}
let isOver = false;
let hintsUsed = 0;
let soundOn = true;

function showToast(m) {
  const t = document.getElementById('toast');
  t.textContent = m; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}
function beep(freq = 500) {
  if (!soundOn) return;
  try {
    const a = new (window.AudioContext || window.webkitAudioContext)();
    const o = a.createOscillator(); o.frequency.value = freq; o.connect(a.destination); o.start();
    setTimeout(() => o.stop(), 60);
  } catch(e) {}
}

function pickWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

function buildBoard() {
  const board = document.getElementById('board');
  board.innerHTML = '';
  for (let r = 0; r < 6; r++) {
    const row = document.createElement('div');
    row.className = 'row';
    for (let c = 0; c < 5; c++) {
      const tile = document.createElement('div');
      tile.className = 'tile';
      tile.id = `tile-${r}-${c}`;
      row.appendChild(tile);
    }
    board.appendChild(row);
  }
}

function buildKeyboard() {
  const rows = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
  const kb = document.getElementById('keyboard');
  kb.innerHTML = '';
  rows.forEach((rowStr, ri) => {
    const row = document.createElement('div');
    row.className = 'key-row';
    if (ri === 2) {
      const enter = document.createElement('button');
      enter.className = 'key wide'; enter.textContent = 'Enter'; enter.onclick = () => handleKey('Enter');
      row.appendChild(enter);
    }
    rowStr.split('').forEach(ch => {
      const k = document.createElement('button');
      k.className = 'key'; k.textContent = ch; k.id = `key-${ch}`;
      k.onclick = () => handleKey(ch);
      row.appendChild(k);
    });
    if (ri === 2) {
      const back = document.createElement('button');
      back.className = 'key wide'; back.textContent = '⌫'; back.onclick = () => handleKey('Backspace');
      row.appendChild(back);
    }
    kb.appendChild(row);
  });
}

function showMessage(msg, type = '') {
  const m = document.getElementById('message');
  m.textContent = msg; m.className = 'message ' + type;
  if (msg) setTimeout(() => { if (m.textContent === msg) m.textContent = ''; }, 2500);
}

function updateKeyboard(letter, status) {
  const key = document.getElementById(`key-${letter}`);
  if (!key) return;
  // Priority: correct > present > absent
  if (key.classList.contains('correct')) return;
  if (key.classList.contains('present') && status === 'absent') return;
  key.classList.remove('present', 'absent');
  key.classList.add(status);
}

function evaluateGuess(guess) {
  // Returns array of 'correct' | 'present' | 'absent'
  const result = Array(5).fill('absent');
  const targetArr = target.word.split('');
  const guessArr = guess.split('');
  const used = Array(5).fill(false);

  // First pass: correct
  for (let i = 0; i < 5; i++) {
    if (guessArr[i] === targetArr[i]) {
      result[i] = 'correct';
      used[i] = true;
    }
  }
  // Second pass: present
  for (let i = 0; i < 5; i++) {
    if (result[i] === 'correct') continue;
    for (let j = 0; j < 5; j++) {
      if (!used[j] && guessArr[i] === targetArr[j]) {
        result[i] = 'present';
        used[j] = true;
        break;
      }
    }
  }
  return result;
}

function submitGuess() {
  const guess = guesses[currentRow]?.word || getCurrentWord();
  if (guess.length < 5) { shakeRow(); showMessage('Not enough letters!', 'error'); beep(200); return; }
  if (!VALID.has(guess) && !WORDS.some(w => w.word === guess)) {
    // Allow any word in VALID, but also allow if in WORDS. If not, still allow if it looks like word? For UX, allow any 5 letters if not in list but show warning only if very unlikely
    // To keep game friendly, we allow any 5-letter word
  }
  const result = evaluateGuess(guess);
  // Animate tiles
  for (let c = 0; c < 5; c++) {
    const tile = document.getElementById(`tile-${currentRow}-${c}`);
    setTimeout(() => {
      tile.classList.add('flip', result[c]);
      updateKeyboard(guess[c], result[c]);
    }, c * 120);
  }

  setTimeout(() => {
    if (guess === target.word) {
      winGame();
    } else if (currentRow === 5) {
      loseGame();
    } else {
      currentRow++;
      currentCol = 0;
      showMessage('');
    }
  }, 650);
}

function getCurrentWord() {
  let w = '';
  for (let c = 0; c < 5; c++) {
    const tile = document.getElementById(`tile-${currentRow}-${c}`);
    w += tile.textContent || '';
  }
  return w;
}

function shakeRow() {
  for (let c = 0; c < 5; c++) {
    const tile = document.getElementById(`tile-${currentRow}-${c}`);
    tile.classList.add('shake');
    setTimeout(() => tile.classList.remove('shake'), 400);
  }
}

function handleKey(key) {
  if (isOver) return;
  if (key === 'Enter') { submitGuess(); return; }
  if (key === 'Backspace') {
    if (currentCol > 0) {
      currentCol--;
      const tile = document.getElementById(`tile-${currentRow}-${currentCol}`);
      tile.textContent = ''; tile.classList.remove('filled');
    }
    return;
  }
  if (/^[A-Z]$/.test(key) && currentCol < 5) {
    const tile = document.getElementById(`tile-${currentRow}-${currentCol}`);
    tile.textContent = key; tile.classList.add('filled');
    currentCol++;
    beep(400);
    // Update guesses tracking
    if (!guesses[currentRow]) guesses[currentRow] = { word: '' };
    guesses[currentRow].word = getCurrentWord();
  }
}

function winGame() {
  isOver = true;
  beep(900);
  showMessage(`🎉 You guessed it in ${currentRow + 1} tries! Word: ${target.word}`, 'success');
  saveStats(true, currentRow + 1);
  setTimeout(() => openStats(), 800);
  showToast(`You Win! ${target.word} 🎉`);
}

function loseGame() {
  isOver = true;
  beep(200);
  showMessage(`💀 Game Over! Word was: ${target.word}`, 'error');
  saveStats(false, 0);
  setTimeout(() => openStats(), 800);
}

function saveStats(won, tries) {
  const stats = JSON.parse(localStorage.getItem('wordle_stats')) || { played: 0, wins: 0, streak: 0, maxStreak: 0, dist: [0,0,0,0,0,0] };
  stats.played++;
  if (won) {
    stats.wins++;
    stats.streak++;
    stats.maxStreak = Math.max(stats.maxStreak, stats.streak);
    stats.dist[tries - 1]++;
  } else {
    stats.streak = 0;
  }
  localStorage.setItem('wordle_stats', JSON.stringify(stats));
  updateStatsUI();
}

function updateStatsUI() {
  const stats = JSON.parse(localStorage.getItem('wordle_stats')) || { played: 0, wins: 0, streak: 0, maxStreak: 0, dist: [0,0,0,0,0,0] };
  document.getElementById('played').textContent = stats.played;
  document.getElementById('winRate').textContent = stats.played ? Math.round((stats.wins / stats.played) * 100) + '%' : '0%';
  document.getElementById('streak').textContent = stats.streak;
  document.getElementById('maxStreak').textContent = stats.maxStreak;
  const maxDist = Math.max(...stats.dist, 1);
  document.getElementById('distribution').innerHTML = stats.dist.map((count, i) => `
    <div class="dist-row"><span>${i + 1}</span><div class="dist-bar" style="width:${Math.max(24, (count / maxDist) * 180)}px">${count}</div></div>
  `).join('');
}

function newGame() {
  target = pickWord();
  currentRow = 0; currentCol = 0; guesses = []; isOver = false; hintsUsed = 0;
  buildBoard();
  // Reset keyboard colors
  document.querySelectorAll('.key').forEach(k => k.classList.remove('correct', 'present', 'absent'));
  document.getElementById('wordHintText').textContent = 'Category: ' + target.hint;
  document.getElementById('message').textContent = '';
  document.getElementById('hintBtn').textContent = '💡 Hint (3 left)';
  showToast('New Word! Good Luck 🍀');
}

function useHint() {
  if (isOver) return showToast('Game over - start new game');
  if (hintsUsed >= 3) return showToast('No hints left!');
  hintsUsed++;
  document.getElementById('hintBtn').textContent = `💡 Hint (${3 - hintsUsed} left)`;
  // Reveal: if first row empty, reveal first letter in current row
  const hintPos = hintsUsed - 1; // 0,1,2
  // Show letter hint: reveal one position that is not yet correctly guessed
  // Simple: reveal target letter at position hintsUsed-1 in current row if empty
  // For simplicity, fill first letter of current row
  const tile = document.getElementById(`tile-${currentRow}-${hintPos}`);
  if (tile && !tile.textContent) {
    tile.textContent = target.word[hintPos];
    tile.classList.add('filled', 'hint-tile');
    currentCol = Math.max(currentCol, hintPos + 1);
  }
  showToast(`Hint: Letter ${hintPos + 1} is "${target.word[hintPos]}"`);
  beep(800);
}

function openStats() { updateStatsUI(); document.getElementById('statsModal').classList.remove('hidden'); }
function closeModal(id) { document.getElementById(id).classList.add('hidden'); }

// Controls
document.addEventListener('keydown', e => {
  if (e.key === 'Enter') handleKey('Enter');
  else if (e.key === 'Backspace') handleKey('Backspace');
  else if (/^[a-zA-Z]$/.test(e.key)) handleKey(e.key.toUpperCase());
});
document.getElementById('newGameBtn').addEventListener('click', newGame);
document.getElementById('giveUpBtn').addEventListener('click', () => {
  if (isOver) return;
  if (!confirm(`Give up? Word was: ${target.word}`)) return;
  loseGame();
});
document.getElementById('hintBtn').addEventListener('click', useHint);
document.getElementById('helpBtn').addEventListener('click', () => document.getElementById('helpModal').classList.remove('hidden'));
document.getElementById('statsBtn').addEventListener('click', openStats);
document.getElementById('shareBtn').addEventListener('click', () => {
  const stats = JSON.parse(localStorage.getItem('wordle_stats')) || { played: 0, wins: 0 };
  const text = `Wordle Clone Day-80\nPlayed: ${stats.played} | Wins: ${stats.wins}\nToday's word: ${target.word} - Try it!`;
  navigator.clipboard?.writeText(text).then(() => showToast('Copied! Share karo 📤'));
  alert(text);
});
document.getElementById('soundBtn').addEventListener('click', function() {
  soundOn = !soundOn; this.textContent = soundOn ? '🔊' : '🔇';
});
document.getElementById('themeBtn').addEventListener('click', function() {
  const dark = document.body.classList.toggle('dark');
  this.textContent = dark ? '☀️' : '🌙';
});

// Init
buildBoard();
buildKeyboard();
newGame();
updateStatsUI();