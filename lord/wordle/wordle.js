'use strict';

// Death's Door - by Jep

require("../jep/colors.js", 'Color');
require("../jep/attributes.js", 'Attribute');
require("../jep/screen.js", 'read');
require("../jep/screen.js", 'write');
require("../jep/screen.js", 'waitForUser');
require('../jep/math.js', 'getExponentialScaleFactor');
require('../recorddefs.js', 'Player_Def');

// globals
var playerFile;
var dataFile;
var data;
// end globals


const ANSWER_POOL = ["aback", "about", "above", "abuse", "acute", "admit", "adopt", "adorn", "adult", "afoot", "afoul", "after", "again", "agape", "agent", "agree", "ahead", "alike", "aline", "alive", "allow", "aloft", "alone", "along", "aloof", "aloud", "alter", "amiss", "among", "amply", "amuck", "anger", "angry", "apart", "apple", "apply", "aptly", "arear", "argue", "arise", "aside", "askew", "avoid", "award", "aware", "awful", "badly", "basic", "basis", "beach", "begin", "below", "birth", "black", "blame", "blind", "block", "blood", "board", "brain", "brave", "bread", "break", "brief", "bring", "broad", "brown", "build", "burst", "buyer", "canny", "carry", "catch", "cause", "chain", "chair", "cheap", "check", "chest", "chief", "child", "circa", "civil", "claim", "class", "clean", "clear", "climb", "clock", "close", "coach", "coast", "count", "court", "cover", "crazy", "cream", "crime", "cross", "crowd", "crown", "cycle", "daily", "dance", "death", "depth", "dirty", "ditto", "doubt", "draft", "drama", "dream", "dress", "drink", "drive", "early", "earth", "empty", "enemy", "enjoy", "enter", "entry", "equal", "error", "event", "exact", "exist", "extra", "faint", "faith", "false", "fault", "field", "fifth", "fight", "final", "first", "floor", "focus", "force", "forte", "forth", "frame", "frank", "fresh", "front", "fruit", "funny", "giant", "glass", "grand", "grant", "grass", "great", "green", "gross", "group", "guess", "guide", "happy", "harsh", "heart", "heavy", "hence", "horse", "hotel", "house", "human", "ideal", "image", "imply", "index", "infra", "inner", "input", "issue", "joint", "jolly", "judge", "knife", "large", "laugh", "layer", "learn", "leave", "legal", "level", "light", "limit", "local", "loose", "lucky", "lunch", "magic", "major", "march", "marry", "match", "maybe", "metal", "minor", "minus", "model", "money", "month", "moral", "motor", "mouth", "music", "naked", "nasty", "naval", "never", "night", "noise", "north", "novel", "nurse", "occur", "offer", "often", "order", "other", "outer", "owner", "panel", "paper", "party", "peace", "phase", "phone", "piano", "piece", "pilot", "pitch", "place", "plain", "plane", "plant", "plate", "plumb", "point", "pound", "power", "press", "price", "pride", "prime", "prior", "prize", "proof", "proud", "prove", "queen", "queer", "quick", "quiet", "quite", "radio", "raise", "ramen", "range", "rapid", "ratio", "reach", "ready", "refer", "relax", "reply", "right", "river", "roman", "rough", "round", "route", "royal", "rugby", "rural", "sadly", "scale", "scene", "scope", "score", "sense", "serve", "shall", "shape", "share", "sharp", "sheep", "sheer", "sheet", "shift", "shirt", "shock", "shoot", "short", "sight", "silly", "since", "sixth", "skill", "slash", "sleek", "sleep", "small", "smart", "smile", "smith", "smoke", "solid", "solve", "sorry", "sound", "south", "space", "spare", "speak", "speed", "spend", "spite", "split", "sport", "squad", "staff", "stage", "stand", "stark", "start", "state", "steam", "steel", "steep", "stick", "still", "stock", "stone", "store", "study", "stuff", "style", "sugar", "super", "sweet", "table", "tally", "taste", "teach", "thank", "theme", "there", "thick", "thine", "thing", "think", "third", "throw", "tight", "title", "today", "total", "touch", "tough", "tower", "track", "trade", "train", "treat", "trend", "trial", "truly", "trust", "truth", "twice", "uncle", "under", "union", "unity", "until", "upper", "upset", "urban", "usual", "utter", "vague", "valid", "value", "video", "visit", "vital", "voice", "waste", "watch", "water", "wetly", "where", "which", "while", "white", "whole", "whose", "woman", "world", "worry", "would", "write", "wrong", "young", "yours", "youth"];
const VALID_WORDS = ["aahed", "aalii", "aapas", "aargh", "aarti", "abaca", "abaci", "abacs", "abaft", "abaht", "abaka", "abamp", "aband", "abash", "abask", "abaya", "abbas", "abbed", "abbes", "abcee", "abeam", "abear", "abeat", "abeer", "abele", "abeng", "abers", "abets", "abeys", "abies", "abius", "abjad", "abjud", "abler", "ables", "ablet", "ablow", "abmho", "abnet", "abohm", "aboil", "aboma", "aboon", "abord", "abore", "aborn", "abram", "abray", "abrim", "abrin", "abris", "absey", "absit", "abuna", "abune", "abura", "aburn", "abuts", "abuzz", "abyes", "abysm", "acais", "acara", "acari", "accas", "accha", "accoy", "accra", "acedy", "acene", "acerb", "acers", "aceta", "achar", "ached", "acher", "aches", "achey", "achoo", "acids", "acidy", "acies", "acing", "acini", "ackee", "acker", "acmes", "acmic", "acned", "acnes", "acock", "acoel", "acold", "acone", "acral", "acred", "acres", "acron", "acros", "acryl", "actas", "acted", "actin", "acton", "actus", "acyls", "adats", "adawn", "adaws", "adays", "adbot", "addas", "addax", "added", "adder", "addin", "addio", "addle", "addra", "adead", "adeem", "adhan", "adhoc", "adieu", "adios", "adits", "adlib", "adman", "admen", "admix", "adnex", "adobo", "adoon", "adorb", "adown", "adoze", "adrad", "adraw", "adred", "adret", "adrip", "adsum", "aduki", "adunc", "adust", "advew", "advts", "adyta", "adyts", "adzed", "adzes", "aecia", "aedes", "aeger", "aegis", "aeons", "aerie", "aeros", "aesir", "aevum", "afald", "afanc", "afara", "afars", "afear", "affly", "afion", "afizz", "aflaj", "aflap", "aflow", "afoam", "afore", "afret", "afrit", "afros", "aftos", "agals", "agama", "agami", "agamy", "agars", "agasp", "agast", "agaty", "agave", "agaze", "agbas", "agene", "agers", "aggag", "agger", "aggie", "aggri", "aggro", "aggry", "aghas", "agidi", "agila", "agios", "agism", "agist", "agita", "aglee", "aglet", "agley", "agloo", "aglus", "agmas", "agoge", "agogo", "agone", "agons", "agood", "agora", "agria", "agrin", "agros", "agrum", "agued", "agues", "aguey", "aguna", "agush", "aguti", "aheap", "ahent", "ahigh", "ahind", "ahing", "ahint", "ahold", "ahole", "ahull", "ahuru", "aidas", "aided", "aides", "aidoi", "aidos", "aiery", "aigas", "aight", "ailed", "aimag", "aimak", "aimed", "aimer", "ainee", "ainga", "aioli", "aired", "airer", "airns", "airth", "airts", "aitch", "aitus", "aiver", "aixes", "aiyah", "aiyee", "aiyoh", "aiyoo", "aizle", "ajies", "ajiva", "ajuga", "ajupa", "ajwan", "akara", "akees", "akela", "akene", "aking", "akita", "akkas", "akker", "akoia", "akoja", "akoya", "aksed", "akses", "alaap", "alack", "alala", "alamo", "aland", "alane", "alang", "alans", "alant", "alapa", "alaps", "alary", "alata", "alate", "alays", "albas", "albee", "albid", "alcea", "alces", "alcid", "alcos", "aldea", "alder", "aldol", "aleak", "aleck", "alecs", "aleem", "alefs", "aleft", "aleph", "alews", "aleye", "alfas", "algal", "algas", "algid", "algin", "algor", "algos", "algum", "alias", "alick", "alifs", "alims", "aline", "alios", "alist", "aliya", "alkie", "alkin", "alkos", "alkyd", "alkyl", "allan", "allee", "allel", "allen", "aller", "allin", "allis", "allod", "allus", "allyl", "almah", "almas", "almeh", "almes", "almud", "almug", "alods", "aloed", "aloes", "aloha", "aloin", "aloos", "alose", "alowe", "altho", "altos", "alula", "alums", "alumy", "alure", "alurk", "alvar", "alway", "amahs", "amain", "amari", "amaro", "amate", "amaut", "amban", "ambit", "ambos", "ambry", "ameba", "ameer", "amene", "amens", "ament", "amias", "amice", "amici", "amide", "amido", "amids", "amies", "amiga", "amigo", "amine", "amino", "amins", "amirs", "amlas", "amman", "ammas", "ammon", "ammos", "amnia", "amnic", "amnio", "amoks", "amole", "amore", "amort", "amour", "amove", "amowt", "amped", "ampul", "amrit", "amuck", "amyls", "anana", "anata", "ancho", "ancle", "ancon", "andic", "andro", "anear", "anele", "anent", "angas", "anglo", "anigh", "anile", "anils", "anima", "animi", "anion", "anise", "anker", "ankhs", "ankus", "anlas", "annal", "annan", "annas", "annat", "annum", "annus", "anoas", "anole", "anomy", "ansae", "ansas", "antae", "antar", "antas", "anted", "antes", "antis", "antra", "antre", "antsy", "anura", "anyon", "apace", "apage", "apaid", "apayd", "apays", "apeak", "apeek", "apers", "apert", "apery", "apgar", "aphis", "apian", "apiol", "apish", "apism", "apode", "apods", "apols", "apoop", "aport", "appal", "appam", "appay", "appel", "appro", "appts", "appui", "appuy", "apres", "apses", "apsis", "apsos", "apted", "apter", "aquae", "aquas", "araba", "araks", "arame", "arars", "arbah", "arbas", "arced", "archi", "arcos", "arcus", "ardeb", "ardri", "aread", "areae", "areal", "arear", "areas", "areca", "aredd", "arede", "arefy", "areic", "arene", "arepa", "arere", "arete", "arets", "arett", "argal", "argan", "argil", "argle", "argol", "argon", "argot", "argus", "arhat", "arias", "ariel", "ariki", "arils", "ariot", "arish", "arith", "arked", "arled", "arles", "armed", "armer", "armet", "armil", "arnas", "arnis", "arnut", "aroba", "aroha", "aroid", "arpas", "arpen", "arrah", "arras", "arret", "arris", "arroz", "arsed", "arses", "arsey", "arsis", "artal", "artel", "arter", "artic", "artis", "artly", "aruhe", "arums", "arval", "arvee", "arvos", "aryls", "asada", "asana", "ascon", "ascus", "asdic", "ashed", "ashes", "ashet", "asity", "askar", "asked", "asker", "askoi", "askos", "aspen", "asper", "aspic", "aspie", "aspis", "aspro", "assai", "assam", "assed", "asses", "assez", "assot", "aster", "astir", "astun", "asura", "asway", "aswim", "asyla", "ataps", "ataxy", "atigi", "atilt", "atimy", "atlas", "atman", "atmas", "atmos", "atocs", "atoke", "atoks", "atoms", "atomy", "atony", "atopy", "atria", "atrip", "attap", "attar", "attas", "atter", "atuas", "aucht", "audad", "audax", "augen", "auger", "auges", "aught", "aulas", "aulic", "auloi", "aulos", "aumil", "aunes", "aunts", "aurae", "aural", "aurar", "auras", "aurei", "aures", "auric", "auris", "aurum", "autos", "auxin", "avale", "avant", "avast", "avels", "avens", "avers", "avgas", "avine", "avion", "avise", "aviso", "avize", "avows", "avyze", "awari", "awarn", "awato", "awave", "aways", "awdls", "aweel", "aweto", "awing", "awkin", "awmry", "awned", "awner", "awols", "awork", "axels", "axile", "axils", "axing", "axite", "axled", "axles", "axman", "axmen", "axoid", "axone", "axons", "ayahs", "ayaya", "ayelp", "aygre", "ayins", "aymag", "ayont", "ayres", "ayrie", "azans", "azide", "azido", "azine", "azlon", "azoic", "azole", "azons", "azote", "azoth", "azuki", "azurn", "azury", "azygy", "azyme", "azyms", "baaed", "baals", "baaps", "babas", "babby", "babel", "babes", "babka", "baboo", "babul", "babus", "bacca", "bacco", "baccy", "bacha", "bachs", "backs", "backy", "bacne", "badam", "baddy", "baels", "baffs", "baffy", "bafta", "bafts", "baghs", "bagie", "bagsy", "bagua", "bahts", "bahus", "bahut", "baiks", "baile", "bails", "bairn", "baisa", "baith", "baits", "baiza", "baize", "bajan", "bajra", "bajri", "bajus", "baked", "baken", "bakes", "bakra", "balas", "balds", "baldy", "baled", "bales", "balks", "balky", "ballo", "balls", "bally", "balms", "baloi", "balon", "baloo", "balot", "balsa", "balti", "balun", "balus", "balut", "bamas", "bambi", "bamma", "bammy", "banak", "banco", "bancs", "banda", "bandh", "bands", "bandy", "baned", "banes", "bangs", "bania", "banks", "banky", "banns", "bants", "bantu", "banty", "bantz", "banya", "baons", "baozi", "bappu", "bapus", "barbe", "barbs", "barby", "barca", "barde", "bardo", "bards", "bardy", "bared", "barer", "bares", "barfi", "barfs", "barfy", "baric", "barks", "barky", "barms", "barmy", "barns", "barny", "barps", "barra", "barre", "barro", "barry", "barye", "basan", "basas", "based", "basen", "baser", "bases", "basha", "basho", "basij", "basks", "bason", "basse", "bassi", "basso", "bassy", "basta", "basti", "basto", "basts", "bated", "bates", "baths", "batik", "batos", "batta", "batts", "battu", "bauds", "bauks", "baulk", "baurs", "bavin", "bawds", "bawks", "bawls", "bawns", "bawrs", "bawty", "bayas", "bayed", "bayer", "bayes", "bayle", "bayts", "bazar", "bazas", "bazoo", "bball", "bdays", "beads", "beaks", "beaky", "beals", "beams", "beamy", "beano", "beans", "beany", "beare", "bears", "beath", "beats", "beaty", "beaus", "beaut", "beaux", "bebop", "becap", "becke", "becks", "bedad", "bedel", "bedes", "bedew", "bedim", "bedye", "beedi", "beefs", "beeps", "beers", "beery", "beets", "befog", "begad", "begar", "begem", "begob", "begot", "begum", "beige", "beigy", "beins", "beira", "beisa", "bekah", "belah", "belar", "belay", "belee", "belga", "belit", "belli", "bello", "bells", "belon", "belts", "belve", "bemad", "bemas", "bemix", "bemud", "bends", "bendy", "benes", "benet", "benga", "benis", "benji", "benne", "benni", "benny", "bento", "bents", "benty", "bepat", "beray", "beres", "bergs", "berko", "berks", "berme", "berms", "berob", "beryl", "besat", "besaw", "besee", "beses", "besit", "besom", "besot", "besti", "bests", "betas", "beted", "betes", "beths", "betid", "beton", "betta", "betty", "bevan", "bever", "bevor", "bevue", "bevvy", "bewdy", "bewet", "bewig", "bezes", "bezil", "bezzy", "bhais", "bhaji", "bhang", "bhats", "bhava", "bhels", "bhoot", "bhuna", "bhuts", "biach", "biali", "bialy", "bibbs", "bibes", "bibis", "biccy", "bices", "bicky", "bided", "bider", "bides", "bidet", "bidis", "bidon", "bidri", "bield", "biers", "biffo", "biffs", "biffy", "bifid", "bigae", "biggs", "biggy", "bigha", "bight", "bigly", "bigos", "bihon", "bijou", "biked", "biker", "bikes", "bikie", "bikky", "bilal", "bilat", "bilbo", "bilby", "biled", "biles", "bilgy", "bilks", "bills", "bimah", "bimas", "bimbo", "binal", "bindi", "binds", "biner", "bines", "bings", "bingy", "binit", "binks", "binky", "bints", "biogs", "bions", "biont", "biose", "biota", "biped", "bipod", "bippy", "birdo", "birds", "biris", "birks", "birle", "birls", "biros", "birrs", "birse", "birsy", "birze", "birzz", "bises", "bisks", "bisom", "bitch", "biter", "bites", "bitey", "bitos", "bitou", "bitsy", "bitte", "bitts", "bivia", "bivvy", "bizes", "bizzo", "bizzy", "blabs", "blads", "blady", "blaer", "blaes", "blaff", "blags", "blahs", "blain", "blams", "blanc", "blart", "blase", "blash", "blate", "blats", "blatt", "blaud", "blawn", "blaws", "blays", "bleah", "blear", "blebs", "blech", "blees", "blent", "blert", "blest", "blets", "bleys", "blimy", "bling", "blini", "blins", "bliny", "blips", "blist", "blite", "blits", "blive", "blobs", "blocs", "blogs", "blonx", "blook", "bloop", "blore", "blots", "blows", "blowy", "blubs", "blude", "bluds", "bludy", "blued", "blues", "bluet", "bluey", "bluid", "blume", "blunk", "blurs", "blype", "boabs", "boaks", "boars", "boart", "boats", "boaty", "bobac", "bobak", "bobas", "bobol", "bobos", "bocca", "bocce", "bocci", "boche", "bocks", "boded", "bodes", "bodge", "bodgy", "bodhi", "bodle", "bodoh", "boeps", "boers", "boeti", "boets", "boeuf", "boffo", "boffs", "bogan", "bogey", "boggy", "bogie", "bogle", "bogue", "bogus", "bohea", "bohos", "boils", "boing", "boink", "boite", "boked", "bokeh", "bokes", "bokos", "bolar", "bolas", "boldo", "bolds", "boles", "bolet", "bolix", "bolks", "bolls", "bolos", "bolts", "bolus", "bomas", "bombe", "bombo", "bombs", "bomoh", "bomor", "bonce", "bonds", "boned", "boner", "bones", "bongs", "bonie", "bonks", "bonne", "bonny", "bonum", "bonza", "bonze", "booai", "booay", "boobs", "boody", "booed", "boofy", "boogy", "boohs", "books", "booky", "bools", "booms", "boomy", "boong", "boons", "boord", "boors", "boose", "boots", "boppy", "borak", "boral", "boras", "borde", "bords", "bored", "boree", "borek", "borel", "borer", "bores", "borgo", "boric", "borks", "borms", "borna", "boron", "borts", "borty", "bortz", "bosey", "bosie", "bosks", "bosky", "boson", "bossa", "bosun", "botas", "boteh", "botel", "botes", "botew", "bothy", "botos", "botte", "botts", "botty", "bouge", "bouks", "boult", "bouns", "bourd", "bourg", "bourn", "bouse", "bousy", "bouts", "boutu", "bovid", "bowat", "bowed", "bower", "bowes", "bowet", "bowie", "bowls", "bowne", "bowrs", "bowse", "boxed", "boxen", "boxes", "boxla", "boxty", "boyar", "boyau", "boyed", "boyey", "boyfs", "boygs", "boyla", "boyly", "boyos", "boysy", "bozos", "braai", "brach", "brack", "bract", "brads", "braes", "brags", "brahs", "brail", "braks", "braky", "brame", "brane", "brank", "brans", "brant", "brast", "brats", "brava", "bravi", "braws", "braxy", "brays", "braza", "braze", "bream", "brede", "breds", "breem", "breer", "brees", "breid", "breis", "breme", "brens", "brent", "brere", "brers", "breve", "brews", "breys", "brier", "bries", "brigs", "briki", "briks", "brill", "brims", "brins", "brios", "brise", "briss", "brith", "brits", "britt", "brize", "broch", "brock", "brods", "brogh", "brogs", "brome", "bromo", "bronc", "brond", "brool", "broos", "brose", "brosy", "brows", "bruck", "brugh", "bruhs", "bruin", "bruit", "bruja", "brujo", "brule", "brume", "brung", "brusk", "brust", "bruts", "bruvs", "buats", "buaze", "bubal", "bubas", "bubba", "bubbe", "bubby", "bubus", "buchu", "bucko", "bucks", "bucku", "budas", "buded", "budes", "budis", "budos", "buena", "buffa", "buffe", "buffi", "buffo", "buffs", "buffy", "bufos", "bufty", "bugan", "buhls", "buhrs", "buiks", "buist", "bukes", "bukos", "bulbs", "bulgy", "bulks", "bulla", "bulls", "bulse", "bumbo", "bumfs", "bumph", "bumps", "bumpy", "bunas", "bunce", "bunco", "bunde", "bundh", "bunds", "bundt", "bundu", "bundy", "bungs", "bungy", "bunia", "bunje", "bunjy", "bunko", "bunks", "bunns", "bunts", "bunty", "bunya", "buoys", "buppy", "buran", "buras", "burbs", "burds", "buret", "burfi", "burgh", "burgs", "burin", "burka", "burke", "burks", "burls", "burns", "buroo", "burps", "burqa", "burra", "burro", "burrs", "burry", "bursa", "burse", "busby", "buses", "busks", "busky", "bussu", "busti", "busts", "busty", "buteo", "butes", "butle", "butoh", "butts", "butty", "butut", "butyl", "buyin", "buzzy", "bwana", "bwazi", "byded", "bydes", "byked", "bykes", "byres", "byrls", "byssi", "bytes", "byway", "caaed", "cabas", "caber", "cabob", "caboc", "cabre", "cacas", "cacks", "cacky", "cadee", "cades", "cadge", "cadgy", "cadie", "cadis", "cadre", "caeca", "caese", "cafes", "caffe", "caffs", "caged", "cager", "cages", "cagot", "cahow", "caids", "cains", "caird", "cajon", "cajun", "caked", "cakes", "cakey", "calfs", "calid", "calif", "calix", "calks", "calla", "calle", "calls", "calms", "calmy", "calos", "calpa", "calps", "calve", "calyx", "caman", "camas", "cames", "camis", "camos", "campi", "campo", "camps", "campy", "camus", "cando", "caned", "caneh", "caner", "canes", "cangs", "canid", "canna", "canns", "canso", "canst", "canti", "canto", "cants", "canty", "capas", "capax", "caped", "capes", "capex", "caphs", "capiz", "caple", "capon", "capos", "capot", "capri", "capul", "carap", "carbo", "carbs", "carby", "cardi", "cards", "cardy", "cared", "carer", "cares", "caret", "carex", "carks", "carle", "carls", "carne", "carns", "carny", "carob", "carom", "caron", "carpe", "carpi", "carps", "carrs", "carse", "carta", "carte", "carts", "carvy", "casas", "casco", "cased", "caser", "cases", "casks", "casky", "casts", "casus", "cates", "cauda", "cauks", "cauld", "cauls", "caums", "caups", "cauri", "causa", "cavas", "caved", "cavel", "caver", "caves", "cavie", "cavus", "cawed", "cawks", "caxon", "ceaze", "cebid", "cecal", "cecum", "ceded", "ceder", "cedes", "cedis", "ceiba", "ceili", "ceils", "celeb", "cella", "celli", "cells", "celly", "celom", "celts", "cense", "cento", "cents", "centu", "ceorl", "cepes", "cerci", "cered", "ceres", "cerge", "ceria", "ceric", "cerne", "ceroc", "ceros", "certs", "certy", "cesse", "cesta", "cesti", "cetes", "cetyl", "cezve", "chaap", "chaat", "chace", "chack", "chaco", "chado", "chads", "chaft", "chais", "chals", "chams", "chana", "chang", "chank", "chape", "chaps", "chapt", "chara", "chare", "chark", "charr", "chars", "chary", "chats", "chava", "chave", "chavs", "chawk", "chawl", "chaws", "chaya", "chays", "cheba", "chedi", "cheeb", "cheep", "cheet", "chefs", "cheka", "chela", "chelp", "chemo", "chems", "chere", "chert", "cheth", "chevy", "chews", "chewy", "chiao", "chias", "chiba", "chibs", "chica", "chich", "chico", "chics", "chiel", "chiko", "chiks", "chile", "chimb", "chimo", "chimp", "chine", "ching", "chink", "chino", "chins", "chips", "chirk", "chirl", "chirm", "chiro", "chirr", "chirt", "chiru", "chiti", "chits", "chiva", "chive", "chivs", "chivy", "chizz", "choco", "chocs", "chode", "chogs", "choil", "choko", "choky", "chola", "choli", "cholo", "chomp", "chons", "choof", "chook", "choom", "choon", "chops", "choss", "chota", "chott", "chout", "choux", "chowk", "chows", "chubs", "chufa", "chuff", "chugs", "chums", "churl", "churr", "chuse", "chuts", "chyle", "chyme", "chynd", "cibol", "cided", "cides", "ciels", "ciggy", "cilia", "cills", "cimar", "cimex", "cinct", "cines", "cinqs", "cions", "cippi", "circs", "cires", "cirls", "cirri", "cisco", "cissy", "cists", "cital", "cited", "citee", "citer", "cites", "cives", "civet", "civie", "civvy", "clach", "clade", "clads", "claes", "clags", "clair", "clame", "clams", "clans", "claps", "clapt", "claro", "clart", "clary", "clast", "clats", "claut", "clave", "clavi", "claws", "clays", "cleck", "cleek", "cleep", "clefs", "clegs", "cleik", "clems", "clepe", "clept", "cleve", "clews", "clied", "clies", "clift", "clime", "cline", "clint", "clipe", "clips", "clipt", "clits", "cloam", "clods", "cloff", "clogs", "cloke", "clomb", "clomp", "clonk", "clons", "cloop", "cloot", "clops", "clote", "clots", "clour", "clous", "clows", "cloye", "cloys", "cloze", "clubs", "clues", "cluey", "clunk", "clype", "cnida", "coact", "coady", "coala", "coals", "coaly", "coapt", "coarb", "coate", "coati", "coats", "cobbs", "cobby", "cobia", "coble", "cobot", "cobza", "cocas", "cocci", "cocco", "cocks", "cocky", "cocos", "cocus", "codas", "codec", "coded", "coden", "coder", "codes", "codex", "codon", "coeds", "coffs", "cogie", "cogon", "cogue", "cohab", "cohen", "cohoe", "cohog", "cohos", "coifs", "coign", "coils", "coins", "coirs", "coits", "coked", "cokes", "cokey", "colas", "colby", "colds", "coled", "coles", "coley", "colic", "colin", "colle", "colls", "colly", "colog", "colts", "colza", "comae", "comal", "comas", "combe", "combi", "combo", "combs", "comby", "comer", "comes", "comix", "comme", "commo", "comms", "commy", "compo", "comps", "compt", "comte", "comus", "coned", "cones", "conex", "coney", "confs", "conga", "conge", "congo", "conia", "conin", "conks", "conky", "conne", "conns", "conte", "conto", "conus", "convo", "cooch", "cooed", "cooee", "cooer", "cooey", "coofs", "cooks", "cooky", "cools", "cooly", "coomb", "cooms", "coomy", "coons", "coops", "coopt", "coost", "coots", "cooty", "cooze", "copal", "copay", "coped", "copen", "coper", "copes", "copha", "coppy", "copra", "copsy", "coqui", "coram", "corbe", "corby", "corda", "cords", "cored", "cores", "corey", "corgi", "coria", "corks", "corky", "corms", "corni", "corno", "corns", "cornu", "corps", "corse", "corso", "cosec", "cosed", "coses", "coset", "cosey", "cosie", "costa", "coste", "costs", "cotan", "cotch", "coted", "cotes", "coths", "cotta", "cotts", "coude", "coups", "courb", "courd", "coure", "cours", "couta", "couth", "coved", "coves", "covin", "cowal", "cowan", "cowed", "cowks", "cowls", "cowps", "cowry", "coxae", "coxal", "coxed", "coxes", "coxib", "coyau", "coyed", "coyer", "coypu", "cozed", "cozen", "cozes", "cozey", "cozie", "craal", "crabs", "crags", "craic", "craig", "crake", "crame", "crams", "crans", "crape", "craps", "crapy", "crare", "craws", "crays", "creds", "creel", "crees", "crein", "crema", "crems", "crena", "creps", "crepy", "crewe", "crews", "crias", "cribo", "cribs", "cries", "crims", "crine", "crink", "crins", "crios", "cripe", "crips", "crise", "criss", "crith", "crits", "croci", "crocs", "croft", "crogs", "cromb", "crome", "cronk", "crons", "crool", "croon", "crops", "crore", "crost", "crout", "crowl", "crows", "croze", "cruck", "crudo", "cruds", "crudy", "crues", "cruet", "cruft", "crunk", "cruor", "crura", "cruse", "crusy", "cruve", "crwth", "cryer", "cryne", "ctene", "cubby", "cubeb", "cubed", "cuber", "cubes", "cubit", "cucks", "cudda", "cuddy", "cueca", "cuffo", "cuffs", "cuifs", "cuing", "cuish", "cuits", "cukes", "culch", "culet", "culex", "culls", "cully", "culms", "culpa", "culti", "cults", "culty", "cumec", "cundy", "cunei", "cunit", "cunny", "cunts", "cupel", "cupid", "cuppa", "cuppy", "cupro", "curat", "curbs", "curch", "curds", "curdy", "cured", "curer", "cures", "curet", "curfs", "curia", "curie", "curli", "curls", "curns", "curny", "currs", "cursi", "curst", "cusec", "cushy", "cusks", "cusps", "cuspy", "cusso", "cusum", "cutch", "cuter", "cutes", "cutey", "cutin", "cutis", "cutto", "cutty", "cutup", "cuvee", "cuzes", "cwtch", "cyano", "cyans", "cycad", "cycas", "cyclo", "cyder", "cylix", "cymae", "cymar", "cymas", "cymes", "cymol", "cysts", "cytes", "cyton", "czars", "daals", "dabba", "daces", "dacha", "dacks", "dadah", "dadas", "dadis", "dadla", "dados", "daffs", "daffy", "dagga", "daggy", "dagos", "dahis", "dahls", "daiko", "daine", "daint", "daker", "daled", "dalek", "dales", "dalis", "dalle", "dalts", "daman", "damar", "dames", "damme", "damna", "damns", "damps", "dampy", "dancy", "danda", "dangs", "danio", "danks", "danny", "danse", "dants", "dappy", "daraf", "darbs", "darcy", "dared", "darer", "dares", "darga", "dargs", "daric", "daris", "darks", "darky", "darls", "darns", "darre", "darts", "darzi", "dashi", "dashy", "datal", "dated", "dater", "dates", "datil", "datos", "datto", "daube", "daubs", "dauby", "dauds", "dault", "daurs", "dauts", "daven", "davit", "dawah", "dawds", "dawed", "dawen", "dawgs", "dawks", "dawns", "dawts", "dayal", "dayan", "daych", "daynt", "dazed", "dazer", "dazes", "dbags", "deads", "deair", "deals", "deans", "deare", "dearn", "dears", "deary", "deash", "deave", "deaws", "deawy", "debag", "debby", "debel", "debes", "debts", "debud", "debur", "debus", "debye", "decad", "decaf", "decan", "decim", "decko", "decks", "decos", "decyl", "dedal", "deeds", "deedy", "deely", "deems", "deens", "deeps", "deere", "deers", "deets", "deeve", "deevs", "defat", "deffo", "defis", "defog", "degas", "degum", "degus", "deice", "deids", "deify", "deils", "deink", "deism", "deist", "deked", "dekes", "dekko", "deled", "deles", "delfs", "delft", "delis", "della", "dells", "delly", "delos", "delph", "delts", "deman", "demes", "demic", "demit", "demob", "demoi", "demos", "demot", "dempt", "denar", "denay", "dench", "denes", "denet", "denis", "dente", "dents", "deoch", "deoxy", "derat", "deray", "dered", "deres", "derig", "derma", "derms", "derns", "derny", "deros", "derpy", "derro", "derry", "derth", "dervs", "desex", "deshi", "desis", "desks", "desse", "detag", "devas", "devel", "devis", "devon", "devos", "devot", "dewan", "dewar", "dewax", "dewed", "dexes", "dexie", "dexys", "dhaba", "dhaks", "dhals", "dhikr", "dhobi", "dhole", "dholl", "dhols", "dhoni", "dhoti", "dhows", "dhuti", "diact", "dials", "diana", "diane", "diazo", "dibbs", "diced", "dicer", "dices", "dicht", "dicks", "dicky", "dicot", "dicta", "dicto", "dicts", "dictu", "dicty", "diddy", "didie", "didis", "didos", "didst", "diebs", "diels", "diene", "diets", "diffs", "dight", "dikas", "diked", "diker", "dikes", "dikey", "dildo", "dilli", "dills", "dimbo", "dimer", "dimes", "dimps", "dinar", "dined", "dines", "dinge", "dings", "dinic", "dinks", "dinky", "dinlo", "dinna", "dinos", "dints", "dioch", "diols", "diota", "dippy", "dipso", "diram", "direr", "dirke", "dirks", "dirls", "dirts", "disas", "disci", "discs", "dishy", "disks", "disme", "dital", "ditas", "dited", "dites", "ditsy", "ditts", "ditzy", "divan", "divas", "dived", "dives", "divey", "divis", "divna", "divos", "divot", "divvy", "diwan", "dixie", "dixit", "diyas", "dizen", "djinn", "djins", "doabs", "doats", "dobby", "dobes", "dobie", "dobla", "doble", "dobra", "dobro", "docht", "docks", "docos", "docus", "doddy", "dodos", "doeks", "doers", "doest", "doeth", "doffs", "dogal", "dogan", "doges", "dogey", "doggo", "doggy", "dogie", "dogly", "dohyo", "doilt", "doily", "doits", "dojos", "dolce", "dolci", "doled", "dolee", "doles", "doley", "dolia", "dolie", "dolls", "dolma", "dolor", "dolos", "dolts", "domal", "domed", "domes", "domic", "donah", "donas", "donee", "doner", "donga", "dongs", "donko", "donna", "donne", "donny", "donsy", "doobs", "dooce", "doody", "doofs", "dooks", "dooky", "doole", "dools", "dooly", "dooms", "doomy", "doona", "doorn", "doors", "doozy", "dopas", "doped", "doper", "dopes", "doppe", "dorad", "dorba", "dorbs", "doree", "dores", "doric", "doris", "dorje", "dorks", "dorky", "dorms", "dormy", "dorps", "dorrs", "dorsa", "dorse", "dorts", "dorty", "dosai", "dosas", "dosed", "doseh", "doser", "doses", "dosha", "dotal", "doted", "doter", "dotes", "dotty", "douar", "douce", "doucs", "douks", "doula", "douma", "doums", "doups", "doura", "douse", "douts", "doved", "doven", "dover", "doves", "dovie", "dowak", "dowar", "dowds", "dowed", "dower", "dowfs", "dowie", "dowle", "dowls", "dowly", "downa", "downs", "dowps", "dowse", "dowts", "doxed", "doxes", "doxie", "doyen", "doyly", "dozed", "dozer", "dozes", "drabs", "drack", "draco", "draff", "drags", "drail", "drams", "drant", "draps", "drapy", "drats", "drave", "draws", "drays", "drear", "dreck", "dreed", "dreer", "drees", "dregs", "dreks", "drent", "drere", "drest", "dreys", "dribs", "drice", "dries", "drily", "drips", "dript", "drock", "droid", "droil", "droke", "drole", "drome", "drony", "droob", "droog", "drook", "drops", "dropt", "drouk", "drows", "drubs", "drugs", "drums", "drupe", "druse", "drusy", "druxy", "dryad", "dryas", "dsobo", "dsomo", "duads", "duals", "duans", "duars", "dubbo", "dubby", "ducal", "ducat", "duces", "ducks", "ducky", "ducti", "ducts", "duddy", "duded", "dudes", "duels", "duets", "duett", "duffs", "dufus", "duing", "duits", "dukas", "duked", "dukes", "dukka", "dukun", "dulce", "dules", "dulia", "dulls", "dulse", "dumas", "dumbo", "dumbs", "dumka", "dumky", "dumps", "dunam", "dunch", "dunes", "dungs", "dungy", "dunks", "dunno", "dunny", "dunsh", "dunts", "duomi", "duomo", "duped", "duper", "dupes", "duple", "duply", "duppy", "dural", "duras", "dured", "dures", "durgy", "durns", "duroc", "duros", "duroy", "durra", "durrs", "durry", "durst", "durum", "durzi", "dusks", "dusts", "duxes", "dwaal", "dwale", "dwalm", "dwams", "dwamy", "dwang", "dwaum", "dweeb", "dwile", "dwine", "dyads", "dyers", "dyked", "dykes", "dykey", "dykon", "dynel", "dynes", "dynos", "dzhos", "eagly", "eagre", "ealed", "eales", "eaned", "eards", "eared", "earls", "earns", "earnt", "earst", "eased", "easer", "eases", "easle", "easts", "eathe", "eatin", "eaved", "eaver", "eaves", "ebank", "ebbed", "ebbet", "ebena", "ebene", "ebike", "ebons", "ebook", "ecads", "ecard", "ecash", "eched", "eches", "echos", "ecigs", "ecole", "ecrus", "edema", "edged", "edger", "edges", "edile", "edits", "educe", "educt", "eejit", "eensy", "eeven", "eever", "eevns", "effed", "effer", "efits", "egads", "egers", "egest", "eggar", "egged", "egger", "egmas", "ehing", "eider", "eidos", "eigne", "eiked", "eikon", "eilds", "eiron", "eisel", "ejido", "ekdam", "ekkas", "elain", "eland", "elans", "elchi", "eldin", "eleet", "elemi", "elfed", "eliad", "elint", "elmen", "eloge", "elogy", "eloin", "elops", "elpee", "elsin", "elute", "elvan", "elven", "elver", "elves", "emacs", "embar", "embay", "embog", "embow", "embox", "embus", "emeer", "emend", "emerg", "emery", "emeus", "emics", "emirs", "emits", "emmas", "emmer", "emmet", "emmew", "emmys", "emoji", "emong", "emote", "emove", "empts", "emule", "emure", "emyde", "emyds", "enarm", "enate", "ended", "ender", "endew", "endue", "enews", "enfix", "eniac", "enlit", "enmew", "ennog", "enoki", "enols", "enorm", "enows", "enrol", "ensew", "ensky", "entia", "entre", "enure", "enurn", "envoi", "enzym", "eolid", "eorls", "eosin", "epact", "epees", "epena", "epene", "ephah", "ephas", "ephod", "ephor", "epics", "epode", "epopt", "eppie", "epris", "eques", "equid", "erbia", "erevs", "ergon", "ergos", "ergot", "erhus", "erica", "erick", "erics", "ering", "erned", "ernes", "erose", "erred", "erses", "eruct", "erugo", "eruvs", "erven", "ervil", "escar", "escot", "esile", "eskar", "esker", "esnes", "esrog", "esses", "estoc", "estop", "estro", "etage", "etape", "etats", "etens", "ethal", "ethne", "ethyl", "etics", "etnas", "etrog", "ettin", "ettle", "etuis", "etwee", "etyma", "eughs", "euked", "eupad", "euros", "eusol", "evegs", "evens", "evert", "evets", "evhoe", "evils", "evite", "evohe", "ewers", "ewest", "ewhow", "ewked", "exams", "exeat", "execs", "exeem", "exeme", "exfil", "exier", "exies", "exine", "exing", "exite", "exits", "exode", "exome", "exons", "expat", "expos", "exude", "exuls", "exurb", "eyass", "eyers", "eyots", "eyras", "eyres", "eyrie", "eyrir", "ezine", "fabbo", "fabby", "faced", "facer", "faces", "facey", "facia", "facie", "facta", "facto", "facts", "facty", "faddy", "faded", "fader", "fades", "fadge", "fados", "faena", "faery", "faffs", "faffy", "faggy", "fagin", "fagot", "faiks", "fails", "faine", "fains", "faire", "fairs", "faked", "faker", "fakes", "fakey", "fakie", "fakir", "falaj", "fales", "falls", "falsy", "famed", "fames", "fanal", "fands", "fanes", "fanga", "fango", "fangs", "fanks", "fanon", "fanos", "fanum", "faqir", "farad", "farci", "farcy", "fards", "fared", "farer", "fares", "farle", "farls", "farms", "faros", "farro", "farse", "farts", "fasci", "fasti", "fasts", "fated", "fates", "fatly", "fatso", "fatwa", "fauch", "faugh", "fauld", "fauns", "faurd", "faute", "fauts", "fauve", "favas", "favel", "faver", "faves", "favus", "fawns", "fawny", "faxed", "faxes", "fayed", "fayer", "fayne", "fayre", "fazed", "fazes", "feals", "feard", "feare", "fears", "feart", "fease", "feats", "feaze", "feces", "fecht", "fecit", "fecks", "fedai", "fedex", "feebs", "feeds", "feels", "feely", "feens", "feers", "feese", "feeze", "fehme", "feint", "feist", "felch", "felid", "felix", "fells", "felly", "felts", "felty", "femal", "femes", "femic", "femmy", "fends", "fendy", "fenis", "fenks", "fenny", "fents", "feods", "feoff", "ferer", "feres", "feria", "ferly", "fermi", "ferms", "ferns", "ferny", "ferox", "fesse", "festa", "fests", "festy", "fetas", "feted", "fetes", "fetor", "fetta", "fetts", "fetwa", "feuar", "feuds", "feued", "feyed", "feyer", "feyly", "fezes", "fezzy", "fiars", "fiats", "fibre", "fibro", "fices", "fiche", "fichu", "ficin", "ficos", "ficta", "fides", "fidge", "fidos", "fidus", "fiefs", "fient", "fiere", "fieri", "fiers", "fiest", "fifed", "fifer", "fifes", "fifis", "figgy", "figos", "fiked", "fikes", "filar", "filch", "filed", "files", "filii", "filks", "fille", "fillo", "fills", "filmi", "films", "filon", "filos", "filum", "finca", "finds", "fined", "fines", "finis", "finks", "finny", "finos", "fiord", "fiqhs", "fique", "fired", "firer", "fires", "firie", "firks", "firma", "firms", "firni", "firns", "firry", "firth", "fiscs", "fisho", "fisks", "fists", "fisty", "fitch", "fitly", "fitna", "fitte", "fitts", "fiver", "fives", "fixed", "fixes", "fixie", "fixit", "fjeld", "flabs", "flaff", "flags", "flaks", "flamm", "flams", "flamy", "flane", "flans", "flaps", "flary", "flats", "flava", "flawn", "flaws", "flawy", "flaxy", "flays", "fleam", "fleas", "fleek", "fleer", "flees", "flegs", "fleme", "fleur", "flews", "flexi", "flexo", "fleys", "flics", "flied", "flies", "flimp", "flims", "flips", "flirs", "flisk", "flite", "flits", "flitt", "flobs", "flocs", "floes", "flogs", "flong", "flops", "flore", "flors", "flory", "flosh", "flota", "flote", "flows", "flowy", "flubs", "flued", "flues", "fluey", "fluky", "flump", "fluor", "flurr", "fluty", "fluyt", "flyby", "flyin", "flype", "flyte", "fnarr", "foals", "foams", "foehn", "fogey", "fogie", "fogle", "fogos", "fogou", "fohns", "foids", "foils", "foins", "folds", "foley", "folia", "folic", "folie", "folks", "folky", "fomes", "fonda", "fonds", "fondu", "fones", "fonio", "fonly", "fonts", "foods", "foody", "fools", "foots", "footy", "foram", "forbs", "forby", "fordo", "fords", "forel", "fores", "forex", "forks", "forky", "forma", "forme", "forms", "forts", "forza", "forze", "fossa", "fosse", "fouat", "fouds", "fouer", "fouet", "foule", "fouls", "fount", "fours", "fouth", "fovea", "fowls", "fowth", "foxed", "foxes", "foxie", "foyle", "foyne", "frabs", "frack", "fract", "frags", "fraim", "frais", "franc", "frape", "fraps", "frass", "frate", "frati", "frats", "fraus", "frays", "frees", "freet", "freit", "fremd", "frena", "freon", "frere", "frets", "fribs", "frier", "fries", "frigs", "frise", "frist", "frita", "frite", "frith", "frits", "fritt", "frize", "frizz", "froes", "frogs", "fromm", "frons", "froom", "frore", "frorn", "frory", "frosh", "frows", "frowy", "froyo", "frugs", "frump", "frush", "frust", "fryer", "fubar", "fubby", "fubsy", "fucks", "fucus", "fuddy", "fudgy", "fuels", "fuero", "fuffs", "fuffy", "fugal", "fuggy", "fugie", "fugio", "fugis", "fugle", "fugly", "fugus", "fujis", "fulla", "fulls", "fulth", "fulwa", "fumed", "fumer", "fumes", "fumet", "funda", "fundi", "fundo", "funds", "fundy", "fungo", "fungs", "funic", "funis", "funks", "funsy", "funts", "fural", "furan", "furca", "furls", "furol", "furos", "furrs", "furth", "furze", "furzy", "fused", "fusee", "fusel", "fuses", "fusil", "fusks", "fusts", "fusty", "futon", "fuzed", "fuzee", "fuzes", "fuzil", "fyces", "fyked", "fykes", "fyles", "fyrds", "fytte", "gabba", "gabby", "gable", "gaddi", "gades", "gadge", "gadgy", "gadid", "gadis", "gadje", "gadjo", "gadso", "gaffs", "gaged", "gager", "gages", "gaids", "gains", "gairs", "gaita", "gaits", "gaitt", "gajos", "galah", "galas", "galax", "galea", "galed", "gales", "galia", "galis", "galls", "gally", "galop", "galut", "galvo", "gamas", "gamay", "gamba", "gambe", "gambo", "gambs", "gamed", "games", "gamey", "gamic", "gamin", "gamme", "gammy", "gamps", "ganch", "gandy", "ganef", "ganev", "gangs", "ganja", "ganks", "ganof", "gants", "gaols", "gaped", "gaper", "gapes", "gapos", "gappy", "garam", "garba", "garbe", "garbo", "garbs", "garda", "garde", "gares", "garis", "garms", "garni", "garre", "garri", "garth", "garum", "gases", "gashy", "gasps", "gaspy", "gasts", "gatch", "gated", "gater", "gates", "gaths", "gator", "gauch", "gaucy", "gauds", "gauje", "gault", "gaums", "gaumy", "gaups", "gaurs", "gauss", "gauzy", "gavot", "gawcy", "gawds", "gawks", "gawps", "gawsy", "gayal", "gazal", "gazar", "gazed", "gazes", "gazon", "gazoo", "geals", "geans", "geare", "gears", "geasa", "geats", "gebur", "gecks", "geeks", "geeps", "geest", "geist", "geits", "gelds", "gelee", "gelid", "gelly", "gelts", "gemel", "gemma", "gemmy", "gemot", "genae", "genal", "genas", "genes", "genet", "genic", "genii", "genin", "genio", "genip", "genny", "genoa", "genom", "genro", "gents", "genty", "genua", "genus", "geode", "geoid", "gerah", "gerbe", "geres", "gerle", "germs", "germy", "gerne", "gesse", "gesso", "geste", "gests", "getas", "getup", "geums", "geyan", "geyer", "ghast", "ghats", "ghaut", "ghazi", "ghees", "ghest", "ghusl", "ghyll", "gibed", "gibel", "giber", "gibes", "gibli", "gibus", "gifts", "gigas", "gighe", "gigot", "gigue", "gilas", "gilds", "gilet", "gilia", "gills", "gilly", "gilpy", "gilts", "gimel", "gimme", "gimps", "gimpy", "ginch", "ginga", "ginge", "gings", "ginks", "ginny", "ginzo", "gipon", "gippo", "gippy", "girds", "girlf", "girls", "girns", "giron", "giros", "girrs", "girsh", "girts", "gismo", "gisms", "gists", "gitch", "gites", "giust", "gived", "gives", "gizmo", "glace", "glads", "glady", "glaik", "glair", "glamp", "glams", "glans", "glary", "glatt", "glaum", "glaur", "glazy", "gleba", "glebe", "gleby", "glede", "gleds", "gleed", "gleek", "glees", "gleet", "gleis", "glens", "glent", "gleys", "glial", "glias", "glibs", "gliff", "glift", "glike", "glime", "glims", "glisk", "glits", "glitz", "gloam", "globi", "globs", "globy", "glode", "glogg", "gloms", "gloop", "glops", "glost", "glout", "glows", "glowy", "gloze", "glued", "gluer", "glues", "gluey", "glugg", "glugs", "glume", "glums", "gluon", "glute", "gluts", "gnapi", "gnarl", "gnarr", "gnars", "gnats", "gnawn", "gnaws", "gnows", "goads", "goafs", "goaft", "goals", "goary", "goats", "goaty", "goave", "goban", "gobar", "gobbe", "gobbi", "gobbo", "gobby", "gobis", "gobos", "godet", "godso", "goels", "goers", "goest", "goeth", "goety", "gofer", "goffs", "gogga", "gogos", "goier", "gojis", "gokes", "golds", "goldy", "goles", "golfs", "golpe", "golps", "gombo", "gomer", "gompa", "gonch", "gonef", "gongs", "gonia", "gonif", "gonks", "gonna", "gonof", "gonys", "gonzo", "gooby", "goodo", "goods", "goofs", "googs", "gooks", "gooky", "goold", "gools", "gooly", "goomy", "goons", "goony", "goops", "goopy", "goors", "goory", "goosy", "gopak", "gopik", "goral", "goras", "goray", "gorbs", "gordo", "gored", "gores", "goris", "gorms", "gormy", "gorps", "gorse", "gorsy", "gosht", "gosse", "gotch", "goths", "gothy", "gotta", "gouch", "gouks", "goura", "gouts", "gouty", "goved", "goves", "gowan", "gowds", "gowfs", "gowks", "gowls", "gowns", "goxes", "goyim", "goyle", "graal", "grabs", "grads", "graff", "graip", "grama", "grame", "gramp", "grams", "grana", "grano", "grans", "grapy", "grata", "grats", "gravs", "grays", "grebe", "grebo", "grece", "greek", "grees", "grege", "grego", "grein", "grens", "greps", "grese", "greve", "grews", "greys", "grice", "gride", "grids", "griff", "grift", "grigs", "grike", "grins", "griot", "grips", "gript", "gripy", "grise", "grist", "grisy", "grith", "grits", "grize", "groat", "grody", "grogs", "groks", "groma", "groms", "grone", "groof", "grosz", "grots", "grouf", "grovy", "grows", "grrls", "grrrl", "grubs", "grued", "grues", "grufe", "grume", "grump", "grund", "gryce", "gryde", "gryke", "grype", "grypt", "guaco", "guana", "guano", "guans", "guars", "gubba", "gucks", "gucky", "gudes", "guffs", "gugas", "guggl", "guido", "guids", "guimp", "guiro", "gulab", "gulag", "gular", "gulas", "gules", "gulet", "gulfs", "gulfy", "gulls", "gulph", "gulps", "gulpy", "gumma", "gummi", "gumps", "gunas", "gundi", "gundy", "gunge", "gungy", "gunks", "gunky", "gunny", "guqin", "gurdy", "gurge", "gurks", "gurls", "gurly", "gurns", "gurry", "gursh", "gurus", "gushy", "gusla", "gusle", "gusli", "gussy", "gusts", "gutsy", "gutta", "gutty", "guyed", "guyle", "guyot", "guyse", "gwine", "gyals", "gyans", "gybed", "gybes", "gyeld", "gymps", "gynae", "gynie", "gynny", "gynos", "gyoza", "gypes", "gypos", "gyppo", "gyppy", "gyral", "gyred", "gyres", "gyron", "gyros", "gyrus", "gytes", "gyved", "gyver", "gyves", "haafs", "haars", "haats", "hable", "habus", "hacek", "hacks", "hacky", "hadal", "haded", "hades", "hadji", "hadst", "haems", "haere", "haets", "haffs", "hafiz", "hafta", "hafts", "haggs", "haham", "hahas", "haick", "haika", "haiks", "haiku", "hails", "haily", "hains", "haint", "hairs", "haith", "hajes", "hajis", "hajji", "hakam", "hakas", "hakea", "hakes", "hakim", "hakus", "halal", "haldi", "haled", "haler", "hales", "halfa", "halfs", "halid", "hallo", "halls", "halma", "halms", "halon", "halos", "halse", "halsh", "halts", "halva", "halwa", "hamal", "hamba", "hamed", "hamel", "hames", "hammy", "hamza", "hanap", "hance", "hanch", "handi", "hands", "hangi", "hangs", "hanks", "hanky", "hansa", "hanse", "hants", "haole", "haoma", "hapas", "hapax", "haply", "happi", "hapus", "haram", "hards", "hared", "hares", "harim", "harks", "harls", "harms", "harns", "haros", "harps", "harts", "hashy", "hasks", "hasps", "hasta", "hated", "hates", "hatha", "hathi", "hatty", "hauds", "haufs", "haugh", "haugo", "hauld", "haulm", "hauls", "hault", "hauns", "hause", "havan", "havel", "haver", "haves", "hawed", "hawks", "hawms", "hawse", "hayed", "hayer", "hayey", "hayle", "hazan", "hazed", "hazer", "hazes", "hazle", "heads", "heald", "heals", "heame", "heaps", "heapy", "heare", "hears", "heast", "heats", "heaty", "heben", "hebes", "hecht", "hecks", "heder", "hedgy", "heeds", "heedy", "heels", "heeze", "hefte", "hefts", "heiau", "heids", "heigh", "heils", "heirs", "hejab", "hejra", "heled", "heles", "helio", "hella", "hells", "helly", "helms", "helos", "helot", "helps", "helve", "hemal", "hemes", "hemic", "hemin", "hemps", "hempy", "hench", "hends", "henge", "henna", "henny", "henry", "hents", "hepar", "herbs", "herby", "herds", "heres", "herls", "herma", "herms", "herns", "heros", "herps", "herry", "herse", "hertz", "herye", "hesps", "hests", "hetes", "heths", "heuch", "heugh", "hevea", "hevel", "hewed", "hewer", "hewgh", "hexad", "hexed", "hexer", "hexes", "hexyl", "heyed", "hiant", "hibas", "hicks", "hided", "hider", "hides", "hiems", "hifis", "highs", "hight", "hijab", "hijra", "hiked", "hiker", "hikes", "hikoi", "hilar", "hilch", "hillo", "hills", "hilsa", "hilts", "hilum", "hilus", "himbo", "hinau", "hinds", "hings", "hinky", "hinny", "hints", "hiois", "hiped", "hiper", "hipes", "hiply", "hired", "hiree", "hirer", "hires", "hissy", "hists", "hithe", "hived", "hiver", "hives", "hizen", "hoach", "hoaed", "hoagy", "hoars", "hoary", "hoast", "hobos", "hocks", "hocus", "hodad", "hodja", "hoers", "hogan", "hogen", "hoggs", "hoghs", "hogoh", "hogos", "hohed", "hoick", "hoied", "hoiks", "hoing", "hoise", "hokas", "hoked", "hokes", "hokey", "hokis", "hokku", "hokum", "holds", "holed", "holes", "holey", "holks", "holla", "hollo", "holme", "holms", "holon", "holos", "holts", "homas", "homed", "homes", "homey", "homie", "homme", "homos", "honan", "honda", "honds", "honed", "honer", "hones", "hongi", "hongs", "honks", "honky", "hooch", "hoods", "hoody", "hooey", "hoofs", "hoogo", "hooha", "hooka", "hooks", "hooky", "hooly", "hoons", "hoops", "hoord", "hoors", "hoosh", "hoots", "hooty", "hoove", "hopak", "hoped", "hoper", "hopes", "hoppy", "horah", "horal", "horas", "horis", "horks", "horme", "horns", "horst", "horsy", "hosed", "hosel", "hosen", "hoser", "hoses", "hosey", "hosta", "hosts", "hotch", "hoten", "hotis", "hotte", "hotty", "houff", "houfs", "hough", "houri", "hours", "houts", "hovea", "hoved", "hoven", "hoves", "howay", "howbe", "howes", "howff", "howfs", "howks", "howls", "howre", "howso", "howto", "hoxed", "hoxes", "hoyas", "hoyed", "hoyle", "hubba", "hubby", "hucks", "hudna", "hudud", "huers", "huffs", "huffy", "huger", "huggy", "huhus", "huias", "huies", "hukou", "hulas", "hules", "hulks", "hulky", "hullo", "hulls", "hully", "humas", "humfs", "humic", "humps", "humpy", "hundo", "hunks", "hunts", "hurds", "hurls", "hurly", "hurra", "hurst", "hurts", "hurty", "hushy", "husks", "husos", "hutia", "huzza", "huzzy", "hwyls", "hydel", "hydra", "hyens", "hygge", "hying", "hykes", "hylas", "hyleg", "hyles", "hylic", "hymns", "hynde", "hyoid", "hyped", "hypes", "hypha", "hyphy", "hypos", "hyrax", "hyson", "hythe", "iambi", "iambs", "ibrik", "icers", "iched", "iches", "ichor", "icier", "icker", "ickle", "icons", "ictal", "ictic", "ictus", "idant", "iddah", "iddat", "iddut", "ideas", "idees", "ident", "idled", "idles", "idlis", "idola", "idols", "idyls", "iftar", "igapo", "igged", "iglus", "ignis", "ihram", "iiwis", "ikans", "ikats", "ikons", "ileac", "ileal", "ileum", "ileus", "iliad", "ilial", "ilium", "iller", "illth", "imago", "imagy", "imams", "imari", "imaum", "imbar", "imbed", "imbos", "imide", "imido", "imids", "imine", "imino", "imlis", "immew", "immit", "immix", "imped", "impis", "impot", "impro", "imshi", "imshy", "inapt", "inarm", "inbye", "incas", "incel", "incle", "incog", "incus", "incut", "indew", "india", "indie", "indol", "indow", "indri", "indue", "inerm", "infix", "infos", "infra", "ingan", "ingle", "inion", "inked", "inker", "inkle", "inned", "innie", "innit", "inorb", "inros", "inrun", "insee", "inset", "inspo", "intel", "intil", "intis", "intra", "inula", "inure", "inurn", "inust", "invar", "inver", "inwit", "iodic", "iodid", "iodin", "ioras", "iotas", "ippon", "irade", "irids", "iring", "irked", "iroko", "irone", "irons", "isbas", "ishes", "isled", "isles", "isnae", "issei", "istle", "items", "ither", "ivied", "ivies", "ixias", "ixnay", "ixora", "ixtle", "izard", "izars", "izzat", "jaaps", "jabot", "jacal", "jacet", "jacks", "jacky", "jaded", "jades", "jafas", "jaffa", "jagas", "jager", "jaggs", "jaggy", "jagir", "jagra", "jails", "jaker", "jakes", "jakey", "jakie", "jalap", "jaleo", "jalop", "jambe", "jambo", "jambs", "jambu", "james", "jammy", "jamon", "jamun", "janes", "janky", "janns", "janny", "janty", "japan", "japed", "japer", "japes", "jarks", "jarls", "jarps", "jarta", "jarul", "jasey", "jaspe", "jasps", "jatha", "jatis", "jatos", "jauks", "jaune", "jaups", "javas", "javel", "jawan", "jawed", "jawns", "jaxie", "jeans", "jeats", "jebel", "jedis", "jeels", "jeely", "jeeps", "jeera", "jeers", "jeeze", "jefes", "jeffs", "jehad", "jehus", "jelab", "jello", "jells", "jembe", "jemmy", "jenny", "jeons", "jerid", "jerks", "jerry", "jesse", "jessy", "jests", "jesus", "jetee", "jetes", "jeton", "jeune", "jewed", "jewie", "jhala", "jheel", "jhils", "jiaos", "jibba", "jibbs", "jibed", "jiber", "jibes", "jiffs", "jiggy", "jigot", "jihad", "jills", "jilts", "jimmy", "jimpy", "jingo", "jings", "jinks", "jinne", "jinni", "jinns", "jirds", "jirga", "jirre", "jisms", "jitis", "jitty", "jived", "jiver", "jives", "jivey", "jnana", "jobed", "jobes", "jocko", "jocks", "jocky", "jocos", "jodel", "joeys", "johns", "joins", "joked", "jokes", "jokey", "jokol", "joled", "joles", "jolie", "jollo", "jolls", "jolts", "jolty", "jomon", "jomos", "jones", "jongs", "jonty", "jooks", "joram", "jorts", "jorum", "jotas", "jotty", "jotun", "joual", "jougs", "jouks", "joule", "jours", "jowar", "jowed", "jowls", "jowly", "joyed", "jubas", "jubes", "jucos", "judas", "judgy", "judos", "jugal", "jugum", "jujus", "juked", "jukes", "jukus", "julep", "julia", "jumar", "jumby", "jumps", "junco", "junks", "junky", "jupes", "jupon", "jural", "jurat", "jurel", "jures", "juris", "juste", "justs", "jutes", "jutty", "juves", "juvie", "kaama", "kabab", "kabar", "kabob", "kacha", "kacks", "kadai", "kades", "kadis", "kafir", "kagos", "kagus", "kahal", "kaiak", "kaids", "kaies", "kaifs", "kaika", "kaiks", "kails", "kaims", "kaing", "kains", "kajal", "kakas", "kakis", "kalam", "kalas", "kales", "kalif", "kalis", "kalpa", "kalua", "kamas", "kames", "kamik", "kamis", "kamme", "kanae", "kanal", "kanas", "kanat", "kandy", "kaneh", "kanes", "kanga", "kangs", "kanji", "kants", "kanzu", "kaons", "kapai", "kapas", "kapha", "kaphs", "kapok", "kapow", "kapur", "kapus", "kaput", "karai", "karas", "karat", "karee", "karez", "karks", "karns", "karoo", "karos", "karri", "karst", "karsy", "karts", "karzy", "kasha", "kasme", "katal", "katas", "katis", "katti", "kaugh", "kauri", "kauru", "kaury", "kaval", "kavas", "kawas", "kawau", "kawed", "kayle", "kayos", "kazis", "kazoo", "kbars", "kcals", "keaki", "kebar", "kebob", "kecks", "kedge", "kedgy", "keech", "keefs", "keeks", "keels", "keema", "keeno", "keens", "keeps", "keets", "keeve", "kefir", "kehua", "keirs", "kelep", "kelim", "kells", "kelly", "kelps", "kelpy", "kelts", "kelty", "kembo", "kembs", "kemps", "kempt", "kempy", "kenaf", "kench", "kendo", "kenos", "kente", "kents", "kepis", "kerbs", "kerel", "kerfs", "kerky", "kerma", "kerne", "kerns", "keros", "kerry", "kerve", "kesar", "kests", "ketas", "ketch", "ketes", "ketol", "kevel", "kevil", "kexes", "keyed", "keyer", "khadi", "khads", "khafs", "khana", "khans", "khaph", "khats", "khaya", "khazi", "kheda", "kheer", "kheth", "khets", "khirs", "khoja", "khors", "khoum", "khuds", "khula", "khyal", "kiaat", "kiack", "kiaki", "kiang", "kiasu", "kibbe", "kibbi", "kibei", "kibes", "kibla", "kicks", "kicky", "kiddo", "kiddy", "kidel", "kideo", "kidge", "kiefs", "kiers", "kieve", "kievs", "kight", "kikay", "kikes", "kikoi", "kiley", "kilig", "kilim", "kills", "kilns", "kilos", "kilps", "kilts", "kilty", "kimbo", "kimet", "kinas", "kinda", "kinds", "kindy", "kines", "kings", "kingy", "kinin", "kinks", "kinos", "kiore", "kipah", "kipas", "kipes", "kippa", "kipps", "kipsy", "kirby", "kirks", "kirns", "kirri", "kisan", "kissy", "kists", "kitab", "kited", "kiter", "kites", "kithe", "kiths", "kitke", "kitul", "kivas", "kiwis", "klang", "klaps", "klett", "klick", "klieg", "kliks", "klong", "kloof", "kluge", "klutz", "knags", "knaps", "knarl", "knars", "knaur", "knawe", "knees", "knell", "knick", "knish", "knits", "knive", "knobs", "knoop", "knops", "knosp", "knots", "knoud", "knout", "knowd", "knowe", "knows", "knubs", "knule", "knurl", "knurr", "knurs", "knuts", "koans", "koaps", "koban", "kobos", "koels", "koffs", "kofta", "kogal", "kohas", "kohen", "kohls", "koine", "koiwi", "kojis", "kokam", "kokas", "koker", "kokra", "kokum", "kolas", "kolos", "kombi", "kombu", "konbu", "kondo", "konks", "kooks", "kooky", "koori", "kopek", "kophs", "kopje", "koppa", "korai", "koran", "koras", "korat", "kores", "koris", "korma", "koros", "korun", "korus", "koses", "kotch", "kotos", "kotow", "koura", "kraal", "krabs", "kraft", "krais", "krait", "krang", "krans", "kranz", "kraut", "krays", "kreef", "kreen", "kreep", "kreng", "krewe", "kriol", "krona", "krone", "kroon", "krubi", "krump", "krunk", "ksars", "kubie", "kudos", "kudus", "kudzu", "kufis", "kugel", "kuias", "kukri", "kukus", "kulak", "kulan", "kulas", "kulfi", "kumis", "kumys", "kunas", "kunds", "kuris", "kurre", "kurta", "kurus", "kusso", "kusti", "kutai", "kutas", "kutch", "kutis", "kutus", "kuyas", "kuzus", "kvass", "kvell", "kwaai", "kwela", "kwink", "kwirl", "kyack", "kyaks", "kyang", "kyars", "kyats", "kybos", "kydst", "kyles", "kylie", "kylin", "kylix", "kyloe", "kynde", "kynds", "kypes", "kyrie", "kytes", "kythe", "kyudo", "laarf", "laari", "labda", "labia", "labis", "labne", "labra", "laccy", "laced", "lacer", "laces", "lacet", "lacey", "lacis", "lacka", "lacks", "lacky", "laddu", "laddy", "laded", "ladee", "lader", "lades", "ladoo", "laers", "laevo", "lagan", "lagar", "laggy", "lahal", "lahar", "laich", "laics", "laide", "laids", "laigh", "laika", "laiks", "laird", "lairs", "lairy", "laith", "laity", "laked", "laker", "lakes", "lakhs", "lakin", "laksa", "laldy", "lalls", "lamas", "lambs", "lamby", "lamed", "lamer", "lames", "lamia", "lammy", "lamps", "lanai", "lanas", "lanch", "lande", "lands", "laned", "lanes", "lanks", "lants", "lapas", "lapin", "lapis", "lapje", "lappa", "lappy", "larch", "lards", "lardy", "laree", "lares", "larfs", "larga", "largo", "laris", "larks", "larky", "larns", "larnt", "larum", "lased", "laser", "lases", "lassi", "lassu", "lassy", "lasts", "latah", "lated", "laten", "latex", "lathi", "laths", "lathy", "latke", "latus", "lauan", "lauch", "laude", "lauds", "laufs", "laund", "laura", "laval", "lavas", "laved", "laver", "laves", "lavra", "lavvy", "lawed", "lawer", "lawin", "lawks", "lawns", "lawny", "lawsy", "laxed", "laxer", "laxes", "laxly", "layby", "layed", "layin", "layup", "lazar", "lazed", "lazes", "lazos", "lazzi", "lazzo", "leads", "leady", "leafs", "leaks", "leams", "leans", "leany", "leaps", "leare", "lears", "leary", "leats", "leavy", "leaze", "leben", "leccy", "leche", "ledes", "ledgy", "ledum", "leear", "leeks", "leeps", "leers", "leese", "leets", "leeze", "lefte", "lefts", "leger", "leges", "legge", "leggo", "legit", "legno", "lehrs", "lehua", "leirs", "leish", "leman", "lemed", "lemel", "lemes", "lemma", "lemme", "lends", "lenes", "lengs", "lenis", "lenos", "lense", "lenti", "lento", "leone", "lepak", "lepid", "lepra", "lepta", "lered", "leres", "lerps", "lesbo", "leses", "lesos", "lests", "letch", "lethe", "letty", "letup", "leuch", "leuco", "leuds", "leugh", "levas", "levee", "leves", "levin", "levis", "lewis", "lexes", "lexis", "lezes", "lezza", "lezzo", "lezzy", "liana", "liane", "liang", "liard", "liars", "liart", "liber", "libor", "libra", "libre", "libri", "licet", "lichi", "licht", "licit", "licks", "lidar", "lidos", "liefs", "liens", "liers", "lieus", "lieve", "lifer", "lifes", "lifey", "lifts", "ligan", "liger", "ligge", "ligne", "liked", "liker", "likes", "likin", "lills", "lilos", "lilts", "lilty", "liman", "limas", "limax", "limba", "limbi", "limbs", "limby", "limed", "limen", "limes", "limey", "limma", "limns", "limos", "limpa", "limps", "linac", "linch", "linds", "lindy", "lined", "lines", "liney", "linga", "lings", "lingy", "linin", "links", "linky", "linns", "linny", "linos", "lints", "linty", "linum", "linux", "lions", "lipas", "lipes", "lipin", "lipos", "lippy", "liras", "lirks", "lirot", "lises", "lisks", "lisle", "lisps", "lists", "litai", "litas", "lited", "litem", "liter", "lites", "litho", "liths", "litie", "litre", "lived", "liven", "lives", "livor", "livre", "liwaa", "liwas", "llano", "loach", "loads", "loafs", "loams", "loans", "loast", "loave", "lobar", "lobed", "lobes", "lobos", "lobus", "loche", "lochs", "lochy", "locie", "locis", "locks", "locky", "locos", "locum", "loden", "lodes", "loess", "lofts", "logan", "loges", "loggy", "logia", "logie", "logoi", "logon", "logos", "lohan", "loids", "loins", "loipe", "loirs", "lokes", "lokey", "lokum", "lolas", "loled", "lollo", "lolls", "lolly", "lolog", "lolos", "lomas", "lomed", "lomes", "loner", "longa", "longe", "longs", "looby", "looed", "looey", "loofa", "loofs", "looie", "looks", "looky", "looms", "loons", "loony", "loops", "loord", "loots", "loped", "loper", "lopes", "loppy", "loral", "loran", "lords", "lordy", "lorel", "lores", "loric", "loris", "losed", "losel", "losen", "loses", "lossy", "lotah", "lotas", "lotes", "lotic", "lotos", "lotsa", "lotta", "lotte", "lotto", "lotus", "loued", "lough", "louie", "louis", "louma", "lound", "louns", "loupe", "loups", "loure", "lours", "loury", "louts", "lovat", "loved", "lovee", "loves", "lovey", "lovie", "lowan", "lowed", "lowen", "lowes", "lownd", "lowne", "lowns", "lowps", "lowry", "lowse", "lowth", "lowts", "loxed", "loxes", "lozen", "luach", "luaus", "lubed", "lubes", "lubra", "luces", "lucks", "lucre", "ludes", "ludic", "ludos", "luffa", "luffs", "luged", "luger", "luges", "lulls", "lulus", "lumas", "lumbi", "lumme", "lummy", "lumps", "lunas", "lunes", "lunet", "lungi", "lungs", "lunks", "lunts", "lupin", "lured", "lurer", "lures", "lurex", "lurgi", "lurgy", "lurks", "lurry", "lurve", "luser", "lushy", "lusks", "lusts", "lusus", "lutea", "luted", "luter", "lutes", "luvvy", "luxed", "luxer", "luxes", "lweis", "lyams", "lyard", "lyart", "lyase", "lycea", "lycee", "lycra", "lymes", "lynch", "lynes", "lyres", "lysed", "lyses", "lysin", "lysis", "lysol", "lyssa", "lyted", "lytes", "lythe", "lytic", "lytta", "maaed", "maare", "maars", "maban", "mabes", "macas", "macca", "maced", "macer", "maces", "mache", "machi", "machs", "macka", "macks", "macle", "macon", "macte", "madal", "madar", "maddy", "madge", "madid", "mados", "madre", "maedi", "maerl", "mafic", "mafts", "magas", "mages", "maggs", "magna", "magot", "magus", "mahal", "mahem", "mahis", "mahoe", "mahrs", "mahua", "mahwa", "maids", "maiko", "maiks", "maile", "maill", "mailo", "mails", "maims", "mains", "maire", "mairs", "maise", "maist", "majas", "majat", "majoe", "majos", "makaf", "makai", "makan", "makar", "makee", "makes", "makie", "makis", "makos", "malae", "malai", "malam", "malar", "malas", "malax", "maleo", "males", "malic", "malik", "malis", "malky", "malls", "malms", "malmy", "malts", "malty", "malus", "malva", "malwa", "mamak", "mamas", "mamba", "mambu", "mamee", "mamey", "mamie", "mamil", "manas", "manat", "mandi", "mands", "mandy", "maneb", "maned", "maneh", "manes", "manet", "mangi", "mangs", "manie", "manis", "manks", "manky", "manna", "manny", "manoa", "manos", "manse", "manso", "manta", "mante", "manto", "mants", "manty", "manul", "manus", "manzo", "mapau", "mapes", "mapou", "mappy", "maqam", "maqui", "marae", "marah", "maral", "maran", "maras", "maray", "marcs", "mards", "mardy", "mares", "marga", "marge", "margo", "margs", "maria", "marid", "maril", "marka", "marks", "marle", "marls", "marly", "marma", "marms", "maron", "maror", "marra", "marri", "marse", "marts", "marua", "marvy", "masas", "mased", "maser", "mases", "masha", "mashy", "masks", "massa", "massy", "masts", "masty", "masur", "masus", "masut", "matai", "mated", "mater", "mates", "mathe", "maths", "matin", "matlo", "matra", "matsu", "matte", "matts", "matty", "matza", "matzo", "mauby", "mauds", "mauka", "maula", "mauls", "maums", "maumy", "maund", "maunt", "mauri", "mausy", "mauts", "mauvy", "mauzy", "maven", "mavie", "mavin", "mavis", "mawed", "mawks", "mawky", "mawla", "mawns", "mawps", "mawrs", "maxed", "maxes", "maxis", "mayan", "mayas", "mayed", "mayos", "mayst", "mazac", "mazak", "mazar", "mazas", "mazed", "mazel", "mazer", "mazes", "mazet", "mazey", "mazut", "mbari", "mbars", "mbila", "mbira", "mbret", "mbube", "mbuga", "meads", "meake", "meaks", "meals", "meane", "means", "meany", "meare", "mease", "meath", "meats", "mebbe", "mebos", "mecha", "mechs", "mecks", "mecum", "medii", "medin", "medle", "meech", "meeds", "meeja", "meeps", "meers", "meets", "meffs", "meids", "meiko", "meils", "meins", "meint", "meiny", "meism", "meith", "mekka", "melam", "melas", "melba", "melch", "melds", "meles", "melic", "melik", "mells", "meloe", "melos", "melts", "melty", "memes", "memic", "memos", "menad", "mence", "mends", "mened", "menes", "menge", "mengs", "menil", "mensa", "mense", "mensh", "menta", "mento", "ments", "menus", "meous", "meows", "merch", "mercs", "merde", "merds", "mered", "merel", "merer", "meres", "meril", "meris", "merks", "merle", "merls", "merse", "mersk", "mesad", "mesal", "mesas", "mesca", "mesel", "mesem", "meses", "meshy", "mesia", "mesic", "mesne", "meson", "messy", "mesto", "mesyl", "metas", "meted", "meteg", "metel", "metes", "methi", "metho", "meths", "methy", "metic", "metif", "metis", "metol", "metre", "metta", "meums", "meuse", "meved", "meves", "mewed", "mewls", "meynt", "mezes", "mezza", "mezze", "mezzo", "mgals", "mhorr", "miais", "miaou", "miaow", "miasm", "miaul", "micas", "miche", "michi", "micht", "micks", "micky", "micos", "micra", "middy", "midgy", "midis", "miens", "mieux", "mieve", "miffs", "miffy", "mifty", "miggs", "migma", "migod", "mihas", "mihis", "mikan", "miked", "mikes", "mikos", "mikra", "mikva", "milch", "milds", "miler", "miles", "milfs", "milia", "milko", "milks", "mille", "mills", "milly", "milor", "milos", "milpa", "milts", "milty", "miltz", "mimed", "mimeo", "mimer", "mimes", "mimis", "mimsy", "minae", "minar", "minas", "mincy", "mindi", "minds", "mined", "mines", "minge", "mingi", "mings", "mingy", "minis", "minke", "minks", "minny", "minos", "minse", "mints", "minxy", "miraa", "mirah", "mirch", "mired", "mires", "mirex", "mirid", "mirin", "mirkn", "mirks", "mirky", "mirls", "mirly", "miros", "mirrl", "mirrs", "mirvs", "mirza", "misal", "misch", "misdo", "mises", "misgo", "misky", "misls", "misos", "missa", "misto", "mists", "misty", "mitas", "mitch", "miter", "mites", "mitey", "mitie", "mitis", "mitre", "mitry", "mitta", "mitts", "mivey", "mivvy", "mixed", "mixen", "mixer", "mixes", "mixie", "mixis", "mixte", "mixup", "miyas", "mizen", "mizes", "mizzy", "mmkay", "mneme", "moais", "moaky", "moals", "moana", "moans", "moany", "moars", "moats", "mobby", "mobed", "mobee", "mobes", "mobey", "mobie", "moble", "mobos", "mocap", "mochi", "mochs", "mochy", "mocks", "mocky", "mocos", "mocus", "moder", "modes", "modge", "modii", "modin", "modoc", "modom", "modus", "moeni", "moers", "mofos", "mogar", "mogas", "moggy", "mogos", "mogra", "mogue", "mohar", "mohel", "mohos", "mohrs", "mohua", "mohur", "moile", "moils", "moira", "moire", "moits", "moity", "mojos", "moker", "mokes", "mokey", "mokis", "mokky", "mokos", "mokus", "molal", "molas", "molds", "moled", "moler", "moles", "moley", "molie", "molla", "molle", "mollo", "molls", "molly", "moloi", "molos", "molto", "molts", "molue", "molvi", "molys", "momes", "momie", "momma", "momme", "mommy", "momos", "mompe", "momus", "monad", "monal", "monas", "monde", "mondo", "moner", "mongo", "mongs", "monic", "monie", "monks", "monos", "monpe", "monte", "monty", "moobs", "mooch", "moods", "mooed", "mooey", "mooks", "moola", "mooli", "mools", "mooly", "moong", "mooni", "moons", "moony", "moops", "moors", "moory", "mooth", "moots", "moove", "moped", "moper", "mopes", "mopey", "moppy", "mopsy", "mopus", "morae", "morah", "moran", "moras", "morat", "moray", "moree", "morel", "mores", "morgy", "moria", "morin", "mormo", "morna", "morne", "morns", "moror", "morra", "morro", "morse", "morts", "moruk", "mosed", "moses", "mosey", "mosks", "mosso", "moste", "mosto", "mosts", "moted", "moten", "motes", "motet", "motey", "moths", "mothy", "motis", "moton", "motte", "motts", "motty", "motus", "motza", "mouch", "moues", "moufs", "mould", "moule", "mouls", "mouly", "moups", "moust", "mousy", "moved", "moves", "mowas", "mowed", "mowie", "mowra", "moxas", "moxie", "moyas", "moyle", "moyls", "mozed", "mozes", "mozos", "mpret", "mrads", "msasa", "mtepe", "mucho", "mucic", "mucid", "mucin", "mucko", "mucks", "mucor", "mucro", "mudar", "mudge", "mudif", "mudim", "mudir", "mudra", "muffs", "muffy", "mufti", "mugga", "muggs", "muggy", "mugho", "mugil", "mugos", "muhly", "muids", "muils", "muirs", "muiry", "muist", "mujik", "mukim", "mukti", "mulai", "mulct", "muled", "mules", "muley", "mulga", "mulie", "mulla", "mulls", "mulse", "mulsh", "mumbo", "mumms", "mumph", "mumps", "mumsy", "mumus", "munds", "mundu", "munga", "munge", "mungi", "mungo", "mungs", "mungy", "munia", "munis", "munja", "munjs", "munts", "muntu", "muons", "muras", "mured", "mures", "murex", "murgh", "murgi", "murid", "murks", "murls", "murly", "murra", "murre", "murri", "murrs", "murry", "murth", "murti", "muruk", "murva", "musar", "musca", "mused", "musee", "muser", "muses", "muset", "musha", "musit", "musks", "musos", "musse", "mussy", "musta", "musth", "musts", "mutas", "mutch", "muted", "muter", "mutes", "mutha", "mutic", "mutis", "muton", "mutti", "mutts", "mutum", "muvva", "muxed", "muxes", "muzak", "muzzy", "mvula", "mvule", "mvuli", "myall", "myals", "mylar", "mynah", "mynas", "myoid", "myoma", "myons", "myope", "myops", "myopy", "mysid", "mysie", "mythi", "myths", "mythy", "myxos", "mzees", "naams", "naans", "naats", "nabam", "nabby", "nabes", "nabis", "nabks", "nabla", "nabob", "nache", "nacho", "nacre", "nadas", "naeve", "naevi", "naffs", "nagar", "nagas", "nages", "naggy", "nagor", "nahal", "naiad", "naibs", "naice", "naids", "naieo", "naifs", "naiks", "nails", "naily", "nains", "naios", "naira", "nairu", "najib", "nakas", "naked", "naker", "nakfa", "nalas", "naled", "nalla", "namad", "namak", "namaz", "named", "namer", "names", "namma", "namus", "nanas", "nance", "nancy", "nandu", "nanna", "nanos", "nante", "nanti", "nanto", "nants", "nanty", "nanua", "napas", "naped", "napes", "napoh", "napoo", "nappa", "nappe", "nappy", "naras", "narco", "narcs", "nards", "nares", "naric", "naris", "narks", "narky", "narod", "narra", "narre", "nashi", "nasho", "nasis", "nason", "nasus", "natak", "natch", "nates", "natis", "natto", "natty", "natya", "nauch", "naunt", "navar", "naved", "naves", "navew", "navvy", "nawab", "nawal", "nazar", "nazes", "nazir", "nazis", "nazzy", "nduja", "neafe", "neals", "neant", "neaps", "nears", "neath", "neato", "neats", "nebby", "nebek", "nebel", "neche", "necks", "neddy", "neebs", "needs", "neefs", "neeld", "neele", "neemb", "neems", "neeps", "neese", "neeze", "nefie", "negri", "negro", "negus", "neifs", "neist", "neive", "nelia", "nelis", "nelly", "nemas", "nemic", "nemns", "nempt", "nenes", "nenta", "neons", "neosa", "neoza", "neper", "nepit", "neral", "neram", "nerds", "nerfs", "nerka", "nerks", "nerol", "nerts", "nertz", "nervy", "neski", "nests", "nesty", "netas", "netes", "netop", "netta", "netts", "netty", "neuks", "neume", "neums", "nevel", "neves", "nevis", "nevus", "nevvy", "newbs", "newed", "newel", "newie", "newsy", "newts", "nexal", "nexin", "nexts", "nexum", "nexus", "ngaio", "ngaka", "ngana", "ngapi", "ngati", "ngege", "ngoma", "ngoni", "ngram", "ngwee", "nibby", "nicad", "niced", "nicey", "nicht", "nicks", "nicky", "nicol", "nidal", "nided", "nides", "nidor", "nidus", "niefs", "niess", "nieve", "nifes", "niffs", "niffy", "nifle", "nifty", "niger", "nigga", "nighs", "nigre", "nigua", "nihil", "nikab", "nikah", "nikau", "nilas", "nills", "nimbi", "nimbs", "nimby", "nimps", "niner", "nines", "ninon", "ninta", "niopo", "nioza", "nipas", "nipet", "nippy", "niqab", "nirls", "nirly", "nisei", "nisin", "nisse", "nisus", "nital", "niter", "nites", "nitid", "niton", "nitre", "nitro", "nitry", "nitta", "nitto", "nitty", "nival", "nivas", "nivel", "nixed", "nixer", "nixes", "nixie", "nizam", "njirl", "nkosi", "nmoli", "nmols", "noahs", "nobby", "nocks", "nodal", "noddy", "noded", "nodes", "nodum", "nodus", "noels", "noema", "noeme", "nogal", "noggs", "noggy", "nohow", "noias", "noils", "noily", "noint", "noire", "noirs", "nokes", "noles", "nolle", "nolls", "nolos", "nomas", "nomen", "nomes", "nomic", "nomoi", "nomos", "nonan", "nonas", "nonce", "noncy", "nonda", "nondo", "nones", "nonet", "nongs", "nonic", "nonis", "nonna", "nonno", "nonny", "nonyl", "noobs", "noois", "nooit", "nooks", "nooky", "noone", "noons", "noops", "noove", "nopal", "noria", "norie", "noris", "norks", "norma", "norms", "nosed", "noser", "noses", "noshi", "nosir", "notal", "notam", "noted", "noter", "notes", "notum", "nougs", "nouja", "nould", "noule", "nouls", "nouns", "nouny", "noups", "noust", "novae", "novas", "novia", "novio", "novum", "noway", "nowds", "nowed", "nowls", "nowts", "nowty", "noxal", "noxas", "noxes", "noyau", "noyed", "noyes", "nrtta", "nrtya", "nsima", "nubby", "nubia", "nucha", "nucin", "nuddy", "nuder", "nudes", "nudgy", "nudie", "nudzh", "nuevo", "nuffs", "nugae", "nujol", "nuked", "nukes", "nulla", "nullo", "nulls", "nully", "numbs", "numen", "nummy", "numps", "nunks", "nunky", "nunny", "nunus", "nuque", "nurds", "nurdy", "nurls", "nurrs", "nurts", "nurtz", "nused", "nuses", "nutso", "nutsy", "nyaff", "nyala", "nyams", "nying", "nyong", "nyssa", "nyung", "nyuse", "nyuze", "oafos", "oaked", "oaker", "oakum", "oared", "oarer", "oasal", "oases", "oasis", "oasts", "oaten", "oater", "oaths", "oaves", "obang", "obbos", "obeah", "obeli", "obeys", "obias", "obied", "obiit", "obits", "objet", "oboes", "obole", "oboli", "obols", "occam", "ocher", "oches", "ochre", "ochry", "ocker", "ocote", "ocrea", "octad", "octan", "octas", "octic", "octli", "octyl", "oculi", "odahs", "odals", "odeon", "odeum", "odism", "odist", "odium", "odoom", "odors", "odour", "odums", "odyle", "odyls", "ofays", "offed", "offie", "oflag", "ofter", "ofuro", "ogams", "ogeed", "ogees", "oggin", "ogham", "ogive", "ogled", "ogler", "ogles", "ogmic", "ogres", "ohelo", "ohias", "ohing", "ohmic", "ohone", "oicks", "oidia", "oiled", "oiler", "oilet", "oinks", "oints", "oiran", "ojime", "okapi", "okays", "okehs", "okies", "oking", "okole", "okras", "okrug", "oktas", "olate", "oldie", "oldly", "olehs", "oleic", "olein", "olent", "oleos", "oleum", "oleyl", "oligo", "olios", "oliva", "ollas", "ollav", "oller", "ollie", "ology", "olona", "olpae", "olpes", "omasa", "omber", "ombus", "omdah", "omdas", "omdda", "omdeh", "omees", "omens", "omers", "omiai", "omits", "omlah", "ommel", "ommin", "omnes", "omovs", "omrah", "omuls", "oncer", "onces", "oncet", "oncus", "ondes", "ondol", "onely", "oners", "onery", "ongon", "onium", "onkus", "onlap", "onlay", "onmun", "onned", "onsen", "ontal", "ontic", "ooaas", "oobit", "oohed", "ooids", "oojah", "oomph", "oonts", "oopak", "ooped", "oopsy", "oorie", "ooses", "ootid", "ooyah", "oozed", "oozes", "oozie", "oozle", "opahs", "opals", "opens", "opepe", "opery", "opgaf", "opihi", "oping", "oppos", "opsat", "opsin", "opsit", "opted", "opter", "opzit", "orach", "oracy", "orals", "orang", "orans", "orant", "orate", "orbat", "orbed", "orbic", "orcas", "orcin", "ordie", "ordos", "oread", "orfes", "orful", "orgia", "orgic", "orgue", "oribi", "oriel", "origo", "orixa", "orles", "orlon", "orlop", "ormer", "ornee", "ornis", "orped", "orpin", "orris", "ortet", "ortho", "orval", "orzos", "osars", "oscar", "osetr", "oseys", "oshac", "osier", "oskin", "oslin", "osmic", "osmol", "osone", "ossia", "ostia", "otaku", "otary", "othyl", "otium", "ottar", "ottos", "oubit", "ouche", "oucht", "oueds", "ouens", "ouija", "oulks", "oumas", "oundy", "oupas", "ouped", "ouphe", "ouphs", "ourey", "ourie", "ousel", "ousia", "ousts", "outby", "outed", "outen", "outie", "outre", "outro", "outta", "ouzel", "ouzos", "ovals", "ovels", "ovens", "overs", "ovism", "ovist", "ovoli", "ovolo", "ovule", "oware", "owari", "owche", "owers", "owies", "owled", "owler", "owlet", "owned", "ownio", "owres", "owrie", "owsen", "oxbow", "oxeas", "oxers", "oxeye", "oxids", "oxies", "oxime", "oxims", "oxine", "oxlip", "oxman", "oxmen", "oxter", "oyama", "oyers", "ozeki", "ozena", "ozzie", "paaho", "paals", "paans", "pacai", "pacas", "pacay", "paced", "pacer", "paces", "pacey", "pacha", "packs", "packy", "pacos", "pacta", "pacts", "padam", "padas", "paddo", "padis", "padle", "padma", "padou", "padre", "padri", "paean", "paedo", "paeon", "paged", "pager", "pages", "pagle", "pagne", "pagod", "pagri", "pahit", "pahos", "pahus", "paiks", "pails", "pains", "paipe", "paips", "paire", "pairs", "paisa", "paise", "pakay", "pakka", "pakki", "pakua", "pakul", "palak", "palar", "palas", "palay", "palea", "paled", "pales", "palet", "palis", "palki", "palla", "palls", "pallu", "pally", "palms", "palmy", "palpi", "palps", "palsa", "palus", "pamby", "pampa", "panax", "pance", "panch", "panda", "pands", "pandy", "paned", "panes", "panga", "pangs", "panim", "panir", "panko", "panks", "panna", "panne", "panni", "panny", "panto", "pants", "panty", "paoli", "paolo", "papad", "papas", "papaw", "papes", "papey", "pappi", "pappy", "papri", "parae", "paras", "parch", "parcs", "pardi", "pards", "pardy", "pared", "paren", "pareo", "pares", "pareu", "parev", "parge", "pargo", "parid", "paris", "parki", "parks", "parky", "parle", "parly", "parma", "parmo", "parms", "parol", "parps", "parra", "parrs", "parte", "parti", "parts", "parve", "parvo", "pasag", "pasar", "pasch", "paseo", "pases", "pasha", "pashm", "paska", "pasmo", "paspy", "passe", "passu", "pasts", "patas", "pated", "patee", "patel", "paten", "pater", "pates", "paths", "patia", "patin", "patka", "patly", "patta", "patte", "pattu", "patus", "pauas", "pauls", "pauxi", "pavan", "pavas", "paved", "paven", "paver", "paves", "pavid", "pavie", "pavin", "pavis", "pavon", "pavvy", "pawas", "pawaw", "pawed", "pawer", "pawks", "pawky", "pawls", "pawns", "paxes", "payed", "payor", "paysd", "peage", "peags", "peake", "peaks", "peaky", "peals", "peans", "peare", "pears", "peart", "pease", "peasy", "peats", "peaty", "peavy", "peaze", "pebas", "pechs", "pecia", "pecke", "pecks", "pecky", "pects", "pedes", "pedis", "pedon", "pedos", "pedro", "peece", "peeks", "peeky", "peels", "peely", "peens", "peent", "peeoy", "peepe", "peeps", "peepy", "peers", "peery", "peeve", "peevo", "peggy", "peghs", "pegma", "pegos", "peine", "peins", "peise", "peisy", "peize", "pekan", "pekau", "pekea", "pekes", "pekid", "pekin", "pekoe", "pelas", "pelau", "pelch", "peles", "pelfs", "pells", "pelma", "pelog", "pelon", "pelsh", "pelta", "pelts", "pelus", "pends", "pendu", "pened", "penes", "pengo", "penie", "penis", "penks", "penna", "penni", "pense", "pensy", "pents", "peola", "peons", "peony", "pepla", "peple", "pepon", "pepos", "peppy", "pepsi", "pequi", "perae", "perai", "perce", "percs", "perdu", "perdy", "perea", "peres", "perfs", "peris", "perks", "perle", "perls", "perms", "permy", "perne", "perns", "perog", "perps", "perry", "perse", "persp", "perst", "perts", "perve", "pervo", "pervs", "pervy", "pesch", "pesos", "pesta", "pests", "pesty", "petar", "peter", "petit", "petos", "petre", "petri", "petti", "petto", "pewed", "pewee", "pewit", "peyse", "pfftt", "phage", "phang", "phare", "pharm", "phasm", "pheer", "pheme", "phene", "pheon", "phese", "phial", "phies", "phish", "phizz", "phlox", "phobe", "phoca", "phono", "phons", "phooh", "phooo", "phota", "phots", "photy", "phpht", "phubs", "phuts", "phutu", "phwat", "phyla", "phyle", "phyma", "phynx", "physa", "piais", "piani", "pians", "pibal", "pical", "picas", "piccy", "picey", "pichi", "picks", "picon", "picot", "picra", "picul", "pieds", "piend", "piers", "piert", "pieta", "piets", "piezo", "pight", "pigly", "pigmy", "piing", "pikas", "pikau", "piked", "pikel", "piker", "pikes", "pikey", "pikis", "pikul", "pilae", "pilaf", "pilao", "pilar", "pilau", "pilaw", "pilch", "pilea", "piled", "pilei", "piler", "piles", "piley", "pilin", "pilis", "pills", "pilon", "pilow", "pilum", "pilus", "pimas", "pimps", "pinas", "pinax", "pince", "pinda", "pinds", "pined", "piner", "pines", "pinga", "pinge", "pingo", "pings", "pinko", "pinks", "pinna", "pinny", "pinol", "pinon", "pinot", "pinta", "pints", "pinup", "pions", "piony", "pious", "pioye", "pioys", "pipal", "pipas", "piped", "pipes", "pipet", "pipid", "pipis", "pipit", "pippy", "pipul", "piqui", "pirai", "pirks", "pirls", "pirns", "pirog", "pirre", "pirri", "pirrs", "pisco", "pises", "pisky", "pisos", "pissy", "piste", "pitas", "piths", "piton", "pitot", "pitso", "pitsu", "pitta", "pittu", "piuma", "piums", "pivos", "pixes", "piyut", "pized", "pizer", "pizes", "plaas", "plack", "plaga", "plage", "plaig", "planc", "planh", "plans", "plaps", "plash", "plasm", "plast", "plats", "platt", "platy", "plaud", "plaur", "plavs", "playa", "plays", "pleas", "plebe", "plebs", "pleck", "pleep", "plein", "plena", "plene", "pleno", "pleon", "plesh", "plets", "plews", "plexi", "plica", "plies", "pligs", "plims", "pling", "plink", "plips", "plish", "ploat", "ploce", "plock", "plods", "ploit", "plomb", "plong", "plonk", "plook", "ploot", "plops", "plore", "plots", "plotz", "plouk", "plout", "plows", "plowt", "ploye", "ploys", "pluds", "plues", "pluff", "plugs", "pluke", "plums", "plumy", "plung", "pluot", "plups", "plute", "pluto", "pluty", "plyer", "pneus", "poach", "poaka", "poake", "poalo", "pobby", "poboy", "pocan", "poche", "pocho", "pocks", "pocky", "podal", "poddy", "podex", "podge", "podgy", "podia", "podos", "podus", "poems", "poena", "poeps", "poete", "poets", "pogey", "pogge", "poggy", "pogos", "pogue", "pohed", "poilu", "poind", "poire", "pokal", "poked", "pokes", "pokey", "pokie", "pokit", "poled", "poler", "poles", "poley", "polio", "polis", "polje", "polks", "pollo", "polls", "polly", "polos", "polts", "polys", "pomas", "pombe", "pomes", "pomme", "pommy", "pomos", "pompa", "pomps", "ponce", "poncy", "ponds", "pondy", "pones", "poney", "ponga", "pongo", "pongs", "pongy", "ponks", "ponor", "ponto", "ponts", "ponty", "ponzu", "pooay", "poods", "pooed", "pooey", "poofs", "poofy", "poohs", "poohy", "pooja", "pooka", "pooks", "pools", "pooly", "poons", "poopa", "poops", "poopy", "poori", "poort", "poots", "pooty", "poove", "poovy", "popes", "popia", "popos", "poppa", "popsy", "popup", "porae", "poral", "pored", "porer", "pores", "porey", "porge", "porgy", "porin", "porks", "porky", "porno", "porns", "porny", "porta", "porte", "porth", "ports", "porty", "porus", "posca", "posed", "poses", "poset", "posey", "posho", "posol", "poste", "posts", "potae", "potai", "potch", "poted", "potes", "potin", "potoo", "potro", "potsy", "potto", "potts", "potty", "pouce", "pouff", "poufs", "poufy", "pouis", "pouke", "pouks", "poule", "poulp", "poult", "poupe", "poupt", "pours", "pousy", "pouts", "povos", "powan", "powie", "powin", "powis", "powlt", "pownd", "powns", "powny", "powre", "powsy", "poxed", "poxes", "poyas", "poynt", "poyou", "poyse", "pozzy", "praam", "prads", "prags", "prahu", "prams", "prana", "prang", "praos", "praps", "prase", "prate", "prats", "pratt", "praty", "praus", "prays", "preak", "predy", "preed", "preem", "prees", "preif", "preke", "prems", "premy", "prent", "preon", "preop", "preps", "presa", "prese", "prest", "preta", "preux", "preve", "prexy", "preys", "prial", "prian", "pricy", "pridy", "prief", "prier", "pries", "prigs", "prill", "prima", "primi", "primp", "prims", "primy", "pring", "prink", "prion", "prise", "priss", "prius", "proal", "proas", "probs", "proby", "prodd", "prods", "proem", "profs", "progs", "proin", "proke", "prole", "proll", "promo", "proms", "pronk", "prook", "proot", "props", "prora", "prore", "proso", "pross", "prost", "prosy", "proto", "proul", "prowk", "prows", "proyn", "pruno", "prunt", "pruny", "pruta", "pryan", "pryer", "pryse", "pseud", "pshaw", "pshut", "psias", "psion", "psoae", "psoai", "psoas", "psora", "psych", "psyop", "ptish", "ptype", "pubby", "pubco", "pubes", "pubis", "pubsy", "pucan", "pucer", "puces", "pucka", "pucks", "puddy", "pudge", "pudic", "pudor", "pudsy", "pudus", "puers", "puffa", "puffs", "puggy", "pugil", "puhas", "pujah", "pujas", "pukas", "puked", "puker", "pukes", "pukey", "pukka", "pukus", "pulao", "pulas", "puled", "puler", "pules", "pulik", "pulis", "pulka", "pulks", "pulli", "pulls", "pully", "pulmo", "pulps", "pulus", "pulut", "pumas", "pumie", "pumps", "pumpy", "punas", "punce", "punga", "pungi", "pungo", "pungs", "pungy", "punim", "punji", "punka", "punks", "punky", "punny", "punto", "punts", "punty", "pupae", "pupal", "pupas", "puppa", "pupus", "purao", "purau", "purda", "purdy", "pured", "pures", "purga", "purin", "puris", "purls", "puros", "purps", "purpy", "purre", "purrs", "purry", "pursy", "purty", "puses", "pusle", "pussy", "putas", "puter", "putid", "putin", "puton", "putos", "putti", "putto", "putts", "puttu", "putza", "puuko", "puyas", "puzel", "puzta", "pwned", "pyats", "pyets", "pygal", "pyins", "pylon", "pyned", "pynes", "pyoid", "pyots", "pyral", "pyran", "pyres", "pyrex", "pyric", "pyros", "pyrus", "pyuff", "pyxed", "pyxes", "pyxie", "pyxis", "pzazz", "qadis", "qaids", "qajaq", "qanat", "qapik", "qibla", "qilas", "qipao", "qophs", "qorma", "quabs", "quads", "quaff", "quags", "quair", "quais", "quaky", "quale", "qualy", "quank", "quant", "quare", "quarl", "quass", "quate", "quats", "quawk", "quaws", "quayd", "quays", "qubit", "quean", "queck", "queek", "queem", "queme", "quena", "quern", "queso", "quete", "queyn", "queys", "queyu", "quibs", "quich", "quids", "quies", "quiff", "quila", "quims", "quina", "quine", "quink", "quino", "quins", "quint", "quipo", "quips", "quipu", "quire", "quirl", "quirt", "quist", "quits", "quoad", "quods", "quoif", "quoin", "quois", "quoit", "quoll", "quonk", "quops", "quork", "quorl", "quouk", "quoys", "quran", "qursh", "quyte", "raads", "raake", "rabat", "rabic", "rabis", "raced", "races", "rache", "racks", "racon", "raddi", "raddy", "radge", "radgy", "radif", "radix", "radon", "rafee", "raffs", "raffy", "rafik", "rafiq", "rafts", "rafty", "ragas", "ragde", "raged", "ragee", "rager", "rages", "ragga", "raggs", "raggy", "ragis", "ragus", "rahed", "rahui", "raiah", "raias", "raids", "raike", "raiks", "raile", "rails", "raine", "rains", "raird", "raita", "raith", "raits", "rajas", "rajes", "raked", "rakee", "raker", "rakes", "rakhi", "rakia", "rakis", "rakki", "raksi", "rakus", "rales", "ralli", "ramal", "ramee", "rames", "ramet", "ramie", "ramin", "ramis", "rammy", "ramon", "ramps", "ramse", "ramsh", "ramus", "ranas", "rance", "rando", "rands", "raned", "ranee", "ranes", "ranga", "rangi", "rangs", "rangy", "ranid", "ranis", "ranke", "ranks", "ranns", "ranny", "ranse", "rants", "ranty", "raped", "rapee", "raper", "rapes", "raphe", "rapin", "rappe", "rapso", "rared", "raree", "rares", "rarks", "rasam", "rasas", "rased", "raser", "rases", "rasps", "rasse", "rasta", "ratal", "ratan", "ratas", "ratch", "rated", "ratel", "rater", "rates", "ratha", "rathe", "raths", "ratoo", "ratos", "ratti", "ratus", "rauli", "rauns", "raupo", "raved", "ravel", "raver", "raves", "ravey", "ravin", "rawdy", "rawer", "rawin", "rawks", "rawly", "rawns", "raxed", "raxes", "rayah", "rayas", "rayed", "rayle", "rayls", "rayne", "razai", "razed", "razee", "razer", "razes", "razet", "razoo", "readd", "reads", "reais", "reaks", "realo", "reals", "reame", "reams", "reamy", "reans", "reaps", "reard", "rears", "reast", "reata", "reate", "reave", "rebab", "rebbe", "rebec", "rebid", "rebit", "rebop", "rebud", "rebuy", "recal", "recce", "recco", "reccy", "recep", "recit", "recks", "recon", "recta", "recte", "recti", "recto", "recue", "redan", "redds", "reddy", "reded", "redes", "redia", "redid", "redif", "redig", "redip", "redly", "redon", "redos", "redox", "redry", "redub", "redug", "redux", "redye", "reeaf", "reech", "reede", "reeds", "reefs", "reefy", "reeks", "reeky", "reels", "reely", "reems", "reens", "reerd", "reest", "reeve", "reeze", "refan", "refed", "refel", "reffo", "refis", "refix", "refly", "refry", "regar", "reges", "reget", "regex", "reggo", "regia", "regie", "regle", "regma", "regna", "regos", "regot", "regur", "rehem", "reifs", "reify", "reiki", "reiks", "reine", "reing", "reink", "reins", "reird", "reist", "reive", "rejas", "rejig", "rejon", "reked", "rekes", "rekey", "relet", "relie", "relit", "rello", "relos", "reman", "remap", "remen", "remet", "remex", "remix", "remou", "renay", "rends", "rendu", "reney", "renga", "rengs", "renig", "renin", "renks", "renne", "renos", "rente", "rents", "reoil", "reorg", "repas", "repat", "repeg", "repen", "repin", "repla", "repos", "repot", "repps", "repro", "repun", "reput", "reran", "rerig", "resam", "resat", "resaw", "resay", "resee", "reses", "resew", "resid", "resit", "resod", "resol", "resow", "resto", "rests", "resty", "resue", "resus", "retag", "retam", "retax", "retem", "retia", "retie", "retin", "retip", "retox", "reune", "reups", "revet", "revie", "revow", "rewan", "rewax", "rewed", "rewet", "rewin", "rewon", "rewth", "rexes", "rezes", "rhabd", "rheas", "rheid", "rheme", "rheum", "rhies", "rhime", "rhine", "rhody", "rhomb", "rhone", "rhumb", "rhymy", "rhyne", "rhyta", "riads", "rials", "riant", "riata", "riato", "ribas", "ribby", "ribes", "riced", "ricer", "rices", "ricey", "riche", "richt", "ricin", "ricks", "rides", "ridgy", "ridic", "riels", "riems", "rieve", "rifer", "riffs", "riffy", "rifte", "rifts", "rifty", "riggs", "rigmo", "rigol", "rikka", "rikwa", "riled", "riles", "riley", "rille", "rills", "rilly", "rimae", "rimed", "rimer", "rimes", "rimon", "rimus", "rince", "rinds", "rindy", "rines", "ringe", "rings", "ringy", "rinks", "rioja", "rione", "riots", "rioty", "riped", "ripes", "ripps", "riqqs", "rises", "rishi", "risks", "risps", "rists", "risus", "rites", "rithe", "ritts", "ritzy", "rivas", "rived", "rivel", "riven", "rives", "riyal", "rizas", "roads", "roady", "roake", "roaky", "roams", "roans", "roany", "roars", "roary", "roate", "robbo", "robed", "rober", "robes", "roble", "robug", "robur", "roche", "rocks", "roded", "rodes", "rodny", "roers", "rogan", "roguy", "rohan", "rohes", "rohun", "rohus", "roids", "roils", "roily", "roins", "roist", "rojak", "rojis", "roked", "roker", "rokes", "rokey", "rokos", "rolag", "roleo", "roles", "rolfs", "rolls", "rolly", "romal", "roman", "romeo", "romer", "romps", "rompu", "rompy", "ronde", "rondo", "roneo", "rones", "ronin", "ronne", "ronte", "ronts", "ronuk", "roods", "roofs", "roofy", "rooks", "rooky", "rooms", "roons", "roops", "roopy", "roosa", "roose", "roots", "rooty", "roped", "roper", "ropes", "ropey", "roque", "roral", "rores", "roric", "rorid", "rorie", "rorts", "rorty", "rosal", "rosco", "rosed", "roses", "roset", "rosha", "roshi", "rosin", "rosit", "rosps", "rossa", "rosso", "rosti", "rosts", "rotal", "rotan", "rotas", "rotch", "roted", "rotes", "rotis", "rotls", "roton", "rotos", "rotta", "rotte", "rotto", "rotty", "rouen", "roues", "rouet", "roufs", "rougy", "rouks", "rouky", "roule", "rouls", "roums", "roups", "roupy", "roust", "routh", "routs", "roved", "roven", "roves", "rowan", "rowed", "rowel", "rowen", "rowet", "rowie", "rowme", "rownd", "rowns", "rowth", "rowts", "royet", "royne", "royst", "rozes", "rozet", "rozit", "ruach", "ruana", "rubai", "ruban", "rubby", "rubel", "rubes", "rubin", "rubio", "ruble", "rubli", "rubor", "rubus", "ruche", "ruchy", "rucks", "rudas", "rudds", "rudes", "rudie", "rudis", "rueda", "ruers", "ruffe", "ruffs", "ruffy", "rufus", "rugae", "rugal", "rugas", "ruggy", "ruice", "ruing", "ruins", "rukhs", "ruled", "rules", "rully", "rumal", "rumbo", "rumen", "rumes", "rumly", "rummy", "rumpo", "rumps", "rumpy", "runce", "runch", "runds", "runed", "runer", "runes", "rungs", "runic", "runny", "runos", "runts", "runty", "runup", "ruote", "rupia", "rurps", "rurus", "rusas", "ruses", "rushy", "rusks", "rusky", "rusma", "russe", "rusts", "ruths", "rutin", "rutty", "ruvid", "ryals", "rybat", "ryiji", "ryijy", "ryked", "rykes", "rymer", "rymme", "rynds", "ryoti", "ryots", "ryper", "rypin", "rythe", "ryugi", "saags", "sabal", "sabed", "saber", "sabes", "sabha", "sabin", "sabir", "sabji", "sable", "sabos", "sabot", "sabra", "sabre", "sabzi", "sacks", "sacra", "sacre", "saddo", "saddy", "sades", "sadhe", "sadhu", "sadic", "sadis", "sados", "sadza", "saeta", "safed", "safes", "sagar", "sagas", "sager", "sages", "saggy", "sagos", "sagum", "sahab", "saheb", "sahib", "saice", "saick", "saics", "saids", "saiga", "sails", "saims", "saine", "sains", "sairs", "saist", "saith", "sajou", "sakai", "saker", "sakes", "sakia", "sakis", "sakti", "salal", "salas", "salat", "salep", "sales", "salet", "salic", "salis", "salix", "salle", "salmi", "salol", "salop", "salpa", "salps", "salse", "salto", "salts", "salud", "salue", "salut", "saman", "samas", "samba", "sambo", "samek", "samel", "samen", "sames", "samey", "samfi", "samfu", "sammy", "sampi", "samps", "sanad", "sands", "saned", "sanes", "sanga", "sangh", "sango", "sangs", "sanko", "sansa", "santo", "sants", "saola", "sapan", "sapid", "sapor", "saran", "sards", "sared", "saree", "sarge", "sargo", "sarin", "sarir", "saris", "sarks", "sarky", "sarod", "saros", "sarus", "sarvo", "saser", "sasin", "sasse", "satai", "satay", "sated", "satem", "sater", "sates", "satis", "sauba", "sauch", "saugh", "sauls", "sault", "saunf", "saunt", "saury", "sauts", "sauve", "saved", "saver", "saves", "savey", "savin", "sawah", "sawed", "sawer", "saxes", "sayas", "sayed", "sayee", "sayer", "sayid", "sayne", "sayon", "sayst", "sazes", "scabs", "scads", "scaff", "scags", "scail", "scala", "scall", "scams", "scand", "scans", "scapa", "scape", "scapi", "scarp", "scars", "scart", "scath", "scats", "scatt", "scaud", "scaup", "scaur", "scaws", "sceat", "scena", "scend", "schav", "schif", "schmo", "schul", "schwa", "scifi", "scind", "scire", "sclim", "scobe", "scody", "scogs", "scoog", "scoot", "scopa", "scops", "scorp", "scote", "scots", "scoug", "scoup", "scowp", "scows", "scrab", "scrae", "scrag", "scran", "scrat", "scraw", "scray", "scrim", "scrip", "scrob", "scrod", "scrog", "scroo", "scrow", "scudi", "scudo", "scuds", "scuff", "scuft", "scugs", "sculk", "scull", "sculp", "sculs", "scums", "scups", "scurf", "scurs", "scuse", "scuta", "scute", "scuts", "scuzz", "scyes", "sdayn", "sdein", "seals", "seame", "seams", "seamy", "seans", "seare", "sears", "sease", "seats", "seaze", "sebum", "secco", "sechs", "sects", "seder", "sedes", "sedge", "sedgy", "sedum", "seeds", "seeks", "seeld", "seels", "seely", "seems", "seeps", "seepy", "seers", "sefer", "segar", "segas", "segni", "segno", "segol", "segos", "sehri", "seifs", "seils", "seine", "seirs", "seise", "seism", "seity", "seiza", "sekos", "sekts", "selah", "seles", "selfs", "selfy", "selky", "sella", "selle", "sells", "selva", "semas", "semee", "semes", "semie", "semis", "senas", "sends", "senes", "senex", "sengi", "senna", "senor", "sensa", "sensi", "sensu", "sente", "senti", "sents", "senvy", "senza", "sepad", "sepal", "sepic", "sepoy", "seppo", "septa", "septs", "serac", "serai", "seral", "sered", "serer", "seres", "serfs", "serge", "seria", "seric", "serin", "serir", "serks", "seron", "serow", "serra", "serre", "serrs", "serry", "servo", "sesey", "sessa", "setae", "setal", "seter", "seths", "seton", "setts", "sevak", "sevir", "sewan", "sewar", "sewed", "sewel", "sewen", "sewin", "sexed", "sexer", "sexes", "sexor", "sexto", "sexts", "seyen", "sezes", "shads", "shags", "shahs", "shaka", "shako", "shakt", "shalm", "shaly", "shama", "shams", "shand", "shans", "shaps", "sharn", "shart", "shash", "shaul", "shawm", "shawn", "shaws", "shaya", "shays", "shchi", "sheaf", "sheal", "sheas", "sheds", "sheel", "shend", "sheng", "shent", "sheol", "sherd", "shere", "shero", "shets", "sheva", "shewn", "shews", "shiai", "shiel", "shier", "shies", "shill", "shily", "shims", "shins", "shiok", "ships", "shirr", "shirs", "shish", "shiso", "shist", "shite", "shits", "shiur", "shiva", "shive", "shivs", "shlep", "shlub", "shmek", "shmoe", "shoat", "shoed", "shoer", "shoes", "shogi", "shogs", "shoji", "shojo", "shola", "shonk", "shool", "shoon", "shoos", "shope", "shops", "shorl", "shote", "shots", "shott", "shoud", "showd", "shows", "shoyu", "shred", "shris", "shrow", "shtar", "shtik", "shtum", "shtup", "shuba", "shule", "shuln", "shuls", "shuns", "shura", "shute", "shuts", "shwas", "shyer", "sials", "sibbs", "sibia", "sibyl", "sices", "sicht", "sicko", "sicks", "sicky", "sidas", "sided", "sider", "sides", "sidey", "sidha", "sidhe", "sidle", "sield", "siens", "sient", "sieth", "sieur", "sifts", "sighs", "sigil", "sigla", "signa", "signs", "sigri", "sijos", "sikas", "siker", "sikes", "silds", "siled", "silen", "siler", "siles", "silex", "silks", "sills", "silos", "silts", "silty", "silva", "simar", "simas", "simba", "simis", "simps", "simul", "sinds", "sined", "sines", "sings", "sinhs", "sinks", "sinky", "sinsi", "sinus", "siped", "sipes", "sippy", "sired", "siree", "sires", "sirih", "siris", "siroc", "sirra", "sirup", "sisal", "sises", "sista", "sists", "sitar", "sitch", "sited", "sites", "sithe", "sitka", "situp", "situs", "siver", "sixer", "sixes", "sixmo", "sixte", "sizar", "sized", "sizel", "sizer", "sizes", "skags", "skail", "skald", "skank", "skarn", "skart", "skats", "skatt", "skaws", "skean", "skear", "skeds", "skeed", "skeef", "skeen", "skeer", "skees", "skeet", "skeev", "skeez", "skegg", "skegs", "skein", "skelf", "skell", "skelm", "skelp", "skene", "skens", "skeos", "skeps", "skerm", "skers", "skets", "skews", "skids", "skied", "skies", "skiey", "skimo", "skims", "skink", "skins", "skint", "skios", "skips", "skirl", "skirr", "skite", "skits", "skive", "skivy", "sklim", "skoal", "skobe", "skody", "skoff", "skofs", "skogs", "skols", "skool", "skort", "skosh", "skran", "skrik", "skroo", "skuas", "skugs", "skyed", "skyer", "skyey", "skyfs", "skyre", "skyrs", "skyte", "slabs", "slade", "slaes", "slags", "slaid", "slake", "slams", "slane", "slank", "slaps", "slart", "slats", "slaty", "slave", "slaws", "slays", "slebs", "sleds", "sleer", "slews", "sleys", "slier", "slily", "slims", "slipe", "slips", "slipt", "slish", "slits", "slive", "sloan", "slobs", "sloes", "slogs", "sloid", "slojd", "sloka", "slomo", "sloom", "sloot", "slops", "slopy", "slorm", "slots", "slove", "slows", "sloyd", "slubb", "slubs", "slued", "slues", "sluff", "slugs", "sluit", "slums", "slurb", "slurs", "sluse", "sluts", "slyer", "slype", "smaak", "smaik", "smalm", "smalt", "smarm", "smaze", "smeek", "smees", "smeik", "smeke", "smerk", "smews", "smick", "smily", "smirr", "smirs", "smits", "smize", "smogs", "smoko", "smolt", "smoor", "smoot", "smore", "smorg", "smout", "smowt", "smugs", "smurs", "smush", "smuts", "snabs", "snafu", "snags", "snaps", "snarf", "snark", "snars", "snary", "snash", "snath", "snaws", "snead", "sneap", "snebs", "sneck", "sneds", "sneed", "snees", "snell", "snibs", "snick", "snied", "snies", "snift", "snigs", "snips", "snipy", "snirt", "snits", "snive", "snobs", "snods", "snoek", "snoep", "snogs", "snoke", "snood", "snook", "snool", "snoot", "snots", "snowk", "snows", "snubs", "snugs", "snush", "snyes", "soaks", "soaps", "soare", "soars", "soave", "sobas", "socas", "soces", "socia", "socko", "socks", "socle", "sodas", "soddy", "sodic", "sodom", "sofar", "sofas", "softa", "softs", "softy", "soger", "sohur", "soils", "soily", "sojas", "sojus", "sokah", "soken", "sokes", "sokol", "solah", "solan", "solas", "solde", "soldi", "soldo", "solds", "soled", "solei", "soler", "soles", "solon", "solos", "solum", "solus", "soman", "somas", "sonce", "sonde", "sones", "songo", "songs", "songy", "sonly", "sonne", "sonny", "sonse", "sonsy", "sooey", "sooks", "sooky", "soole", "sools", "sooms", "soops", "soote", "soots", "sophs", "sophy", "sopor", "soppy", "sopra", "soral", "soras", "sorbi", "sorbo", "sorbs", "sorda", "sordo", "sords", "sored", "soree", "sorel", "sorer", "sores", "sorex", "sorgo", "sorns", "sorra", "sorta", "sorts", "sorus", "soths", "sotol", "sotto", "souce", "souct", "sough", "souks", "souls", "souly", "soums", "soups", "soupy", "sours", "souse", "souts", "sowar", "sowce", "sowed", "sowff", "sowfs", "sowle", "sowls", "sowms", "sownd", "sowne", "sowps", "sowse", "sowth", "soxes", "soyas", "soyle", "soyuz", "sozin", "spack", "spacy", "spado", "spads", "spaed", "spaer", "spaes", "spags", "spahi", "spail", "spain", "spait", "spake", "spald", "spale", "spall", "spalt", "spams", "spane", "spang", "spans", "spard", "spars", "spart", "spate", "spats", "spaul", "spawl", "spaws", "spayd", "spays", "spaza", "spazz", "speal", "spean", "speat", "specs", "spect", "speel", "speer", "speil", "speir", "speks", "speld", "spelk", "speos", "spesh", "spets", "speug", "spews", "spewy", "spial", "spica", "spick", "spics", "spide", "spier", "spies", "spiff", "spifs", "spiks", "spile", "spims", "spina", "spink", "spins", "spirt", "spiry", "spits", "spitz", "spivs", "splay", "splog", "spode", "spods", "spoom", "spoor", "spoot", "spork", "sposa", "sposh", "sposo", "spots", "sprad", "sprag", "sprat", "spred", "sprew", "sprit", "sprod", "sprog", "sprue", "sprug", "spuds", "spued", "spuer", "spues", "spugs", "spule", "spume", "spumy", "spurs", "sputa", "spyal", "spyre", "squab", "squaw", "squee", "squeg", "squid", "squit", "squiz", "srsly", "stabs", "stade", "stags", "stagy", "staig", "stane", "stang", "stans", "staph", "staps", "starn", "starr", "stars", "stary", "stats", "statu", "staun", "staws", "stays", "stean", "stear", "stedd", "stede", "steds", "steek", "steem", "steen", "steez", "steik", "steil", "stela", "stele", "stell", "steme", "stems", "stend", "steno", "stens", "stent", "steps", "stept", "stere", "stets", "stews", "stewy", "steys", "stich", "stied", "sties", "stilb", "stile", "stime", "stims", "stimy", "stipa", "stipe", "stire", "stirk", "stirp", "stirs", "stive", "stivy", "stoae", "stoai", "stoas", "stoat", "stobs", "stoep", "stogs", "stogy", "stoit", "stoln", "stoma", "stond", "stong", "stonk", "stonn", "stook", "stoor", "stope", "stops", "stopt", "stoss", "stots", "stott", "stoun", "stoup", "stour", "stown", "stowp", "stows", "strad", "strae", "strag", "strak", "strep", "strew", "stria", "strig", "strim", "strop", "strow", "stroy", "strum", "stubs", "stucs", "stude", "studs", "stull", "stulm", "stumm", "stums", "stuns", "stupa", "stupe", "sture", "sturt", "stush", "styed", "styes", "styli", "stylo", "styme", "stymy", "styre", "styte", "subah", "subak", "subas", "subby", "suber", "subha", "succi", "sucks", "sucky", "sucre", "sudan", "sudds", "sudor", "sudsy", "suede", "suent", "suers", "suete", "suets", "suety", "sugan", "sughs", "sugos", "suhur", "suids", "suint", "suits", "sujee", "sukhs", "sukis", "sukuk", "sulci", "sulfa", "sulfo", "sulks", "sulls", "sulph", "sulus", "sumis", "summa", "sumos", "sumph", "sumps", "sunis", "sunks", "sunna", "sunns", "sunts", "sunup", "suona", "suped", "supes", "supra", "surah", "sural", "suras", "surat", "surds", "sured", "sures", "surfs", "surfy", "surgy", "surra", "sused", "suses", "susus", "sutor", "sutra", "sutta", "swabs", "swack", "swads", "swage", "swags", "swail", "swain", "swale", "swaly", "swamy", "swang", "swank", "swans", "swaps", "swapt", "sward", "sware", "swarf", "swart", "swats", "swayl", "sways", "sweal", "swede", "sweed", "sweel", "sweer", "swees", "sweir", "swelt", "swerf", "sweys", "swies", "swigs", "swile", "swims", "swink", "swipe", "swire", "swiss", "swith", "swits", "swive", "swizz", "swobs", "swole", "swoll", "swoln", "swops", "swopt", "swots", "swoun", "sybbe", "sybil", "syboe", "sybow", "sycee", "syces", "sycon", "syeds", "syens", "syker", "sykes", "sylis", "sylph", "sylva", "symar", "synch", "syncs", "synds", "syned", "synes", "synth", "syped", "sypes", "syphs", "syrah", "syren", "sysop", "sythe", "syver", "taals", "taata", "tabac", "taber", "tabes", "tabid", "tabis", "tabla", "tabls", "tabor", "tabos", "tabun", "tabus", "tacan", "taces", "tacet", "tache", "tachi", "tacho", "tachs", "tacks", "tacos", "tacts", "tadah", "taels", "tafia", "taggy", "tagma", "tagua", "tahas", "tahrs", "taiga", "taigs", "taiko", "tails", "tains", "taira", "taish", "taits", "tajes", "takas", "takes", "takhi", "takht", "takin", "takis", "takky", "talak", "talaq", "talar", "talas", "talcs", "talcy", "talea", "taler", "tales", "talik", "talks", "talky", "talls", "talma", "talpa", "taluk", "talus", "tamal", "tamas", "tamed", "tames", "tamin", "tamis", "tammy", "tamps", "tanas", "tanga", "tangi", "tangs", "tanhs", "tania", "tanka", "tanks", "tanky", "tanna", "tansu", "tansy", "tante", "tanti", "tanto", "tanty", "tapas", "taped", "tapen", "tapes", "tapet", "tapis", "tappa", "tapus", "taras", "tardo", "tards", "tared", "tares", "targa", "targe", "tarka", "tarns", "taroc", "tarok", "taros", "tarps", "tarre", "tarry", "tarse", "tarsi", "tarte", "tarts", "tarty", "tarzy", "tasar", "tasca", "tased", "taser", "tases", "tasks", "tassa", "tasse", "tasso", "tasto", "tatar", "tater", "tates", "taths", "tatie", "tatou", "tatts", "tatus", "taube", "tauld", "tauon", "taupe", "tauts", "tauty", "tavah", "tavas", "taver", "tawaf", "tawai", "tawas", "tawed", "tawer", "tawie", "tawse", "tawts", "taxed", "taxer", "taxes", "taxis", "taxol", "taxon", "taxor", "taxus", "tayra", "tazza", "tazze", "teade", "teads", "teaed", "teaks", "teals", "teams", "tears", "teats", "teaze", "techs", "techy", "tecta", "tecum", "teels", "teems", "teend", "teene", "teens", "teeny", "teers", "teets", "teffs", "teggs", "tegua", "tegus", "tehee", "tehrs", "teiid", "teils", "teind", "teins", "tekke", "telae", "telco", "teles", "telex", "telia", "telic", "tells", "telly", "teloi", "telos", "temed", "temes", "tempi", "temps", "tempt", "temse", "tench", "tends", "tendu", "tenes", "tenge", "tenia", "tenne", "tenno", "tenny", "tenon", "tents", "tenty", "tenue", "tepal", "tepas", "tepoy", "terai", "teras", "terce", "terek", "teres", "terfe", "terfs", "terga", "terms", "terne", "terns", "terre", "terry", "terts", "terza", "tesla", "testa", "teste", "tests", "tetes", "teths", "tetra", "tetri", "teuch", "teugh", "tewed", "tewel", "tewit", "texas", "texes", "texta", "texts", "thack", "thagi", "thaim", "thale", "thali", "thana", "thane", "thang", "thans", "thanx", "tharm", "thars", "thaws", "thawt", "thawy", "thebe", "theca", "theed", "theek", "thees", "thegn", "theic", "thein", "thelf", "thema", "thens", "theor", "theow", "therm", "thesp", "thete", "thews", "thewy", "thigs", "thilk", "thill", "thine", "thins", "thiol", "thirl", "thoft", "thole", "tholi", "thoro", "thorp", "thots", "thous", "thowl", "thrae", "thraw", "thrid", "thrip", "throe", "thuds", "thugs", "thuja", "thunk", "thurl", "thuya", "thymi", "thymy", "tians", "tiare", "tiars", "tical", "ticca", "ticed", "tices", "tichy", "ticks", "ticky", "tiddy", "tided", "tides", "tiefs", "tiers", "tiffs", "tifos", "tifts", "tiges", "tigon", "tikas", "tikes", "tikia", "tikis", "tikka", "tilak", "tiled", "tiler", "tiles", "tills", "tilly", "tilth", "tilts", "timbo", "timed", "times", "timon", "timps", "tinas", "tinct", "tinds", "tinea", "tined", "tines", "tinge", "tings", "tinks", "tinny", "tinto", "tints", "tinty", "tipis", "tippy", "tipup", "tired", "tires", "tirls", "tiros", "tirrs", "tirth", "titar", "titas", "titch", "titer", "tithi", "titin", "titir", "titis", "titre", "titty", "titup", "tiyin", "tiyns", "tizes", "tizzy", "toads", "toady", "toaze", "tocks", "tocky", "tocos", "todde", "todea", "todos", "toeas", "toffs", "toffy", "tofts", "tofus", "togae", "togas", "toged", "toges", "togue", "tohos", "toidy", "toile", "toils", "toing", "toise", "toits", "toity", "tokay", "toked", "toker", "tokes", "tokos", "tolan", "tolar", "tolas", "toled", "toles", "tolls", "tolly", "tolts", "tolus", "tolyl", "toman", "tombo", "tombs", "tomen", "tomes", "tomia", "tomin", "tomme", "tommy", "tomos", "tomoz", "tondi", "tondo", "toned", "toner", "tones", "toney", "tongs", "tonka", "tonks", "tonne", "tonus", "tools", "tooms", "toons", "toots", "toped", "topee", "topek", "toper", "topes", "tophe", "tophi", "tophs", "topis", "topoi", "topos", "toppy", "toque", "torah", "toran", "toras", "torcs", "tores", "toric", "torii", "toros", "torot", "torrs", "torse", "torsi", "torsk", "torta", "torte", "torts", "tosas", "tosed", "toses", "toshy", "tossy", "tosyl", "toted", "toter", "totes", "totty", "touks", "touns", "tours", "touse", "tousy", "touts", "touze", "touzy", "towai", "towed", "towie", "towno", "towns", "towny", "towse", "towsy", "towts", "towze", "towzy", "toyed", "toyer", "toyon", "toyos", "tozed", "tozes", "tozie", "trabs", "trads", "trady", "traga", "tragi", "trags", "tragu", "traik", "trams", "trank", "tranq", "trans", "trant", "trape", "trapo", "traps", "trapt", "trass", "trats", "tratt", "trave", "trayf", "trays", "treck", "treed", "treen", "trees", "trefa", "treif", "treks", "trema", "trems", "tress", "trest", "trets", "trews", "treyf", "treys", "triac", "tride", "trier", "tries", "trifa", "triff", "trigo", "trigs", "trike", "trild", "trill", "trims", "trine", "trins", "triol", "trior", "trios", "trips", "tripy", "trist", "troad", "troak", "troat", "trock", "trode", "trods", "trogs", "trois", "troke", "tromp", "trona", "tronc", "trone", "tronk", "trons", "trooz", "tropo", "troth", "trots", "trows", "troys", "trued", "trues", "trugo", "trugs", "trull", "tryer", "tryke", "tryma", "tryps", "tsade", "tsadi", "tsars", "tsked", "tsuba", "tsubo", "tuans", "tuart", "tuath", "tubae", "tubar", "tubas", "tubby", "tubed", "tubes", "tucks", "tufas", "tuffe", "tuffs", "tufts", "tufty", "tugra", "tuile", "tuina", "tuism", "tuktu", "tules", "tulpa", "tulps", "tulsi", "tumid", "tummy", "tumps", "tumpy", "tunas", "tunds", "tuned", "tuner", "tunes", "tungs", "tunny", "tupek", "tupik", "tuple", "tuque", "turds", "turfs", "turfy", "turks", "turme", "turms", "turns", "turnt", "turon", "turps", "turrs", "tushy", "tusks", "tusky", "tutee", "tutes", "tutti", "tutty", "tutus", "tuxes", "tuyer", "twaes", "twain", "twals", "twank", "twats", "tways", "tweel", "tween", "tweep", "tweer", "twerk", "twerp", "twier", "twigs", "twill", "twilt", "twink", "twins", "twiny", "twire", "twirk", "twirp", "twite", "twits", "twocs", "twoer", "twonk", "twyer", "tyees", "tyers", "tyiyn", "tykes", "tyler", "tymps", "tynde", "tyned", "tynes", "typal", "typed", "types", "typey", "typic", "typos", "typps", "typto", "tyran", "tyred", "tyres", "tyros", "tythe", "tzars", "ubacs", "ubity", "udals", "udons", "udyog", "ugali", "ugged", "uhlan", "uhuru", "ukase", "ulama", "ulans", "ulema", "ulmin", "ulmos", "ulnad", "ulnae", "ulnar", "ulnas", "ulpan", "ulvas", "ulyie", "ulzie", "umami", "umbel", "umber", "umble", "umbos", "umbre", "umiac", "umiak", "umiaq", "ummah", "ummas", "ummed", "umped", "umphs", "umpie", "umpty", "umrah", "umras", "unagi", "unais", "unapt", "unarm", "unary", "unaus", "unbag", "unban", "unbar", "unbed", "unbid", "unbox", "uncap", "unces", "uncia", "uncos", "uncoy", "uncus", "undam", "undee", "undos", "undug", "uneth", "unfix", "ungag", "unget", "ungod", "ungot", "ungum", "unhat", "unhip", "unica", "unios", "units", "unjam", "unked", "unket", "unkey", "unkid", "unkut", "unlap", "unlaw", "unlay", "unled", "unleg", "unlet", "unlid", "unmad", "unman", "unmew", "unmix", "unode", "unold", "unown", "unpay", "unpeg", "unpen", "unpin", "unply", "unpot", "unput", "unred", "unrid", "unrig", "unrip", "unsaw", "unsay", "unsee", "unsew", "unsex", "unsod", "unsub", "untag", "untax", "untin", "unwet", "unwit", "unwon", "upbow", "upbye", "updos", "updry", "upend", "upful", "upjet", "uplay", "upled", "uplit", "upped", "upran", "uprun", "upsee", "upsey", "uptak", "upter", "uptie", "uraei", "urali", "uraos", "urare", "urari", "urase", "urate", "urbex", "urbia", "urdee", "ureal", "ureas", "uredo", "ureic", "ureid", "urena", "urent", "urged", "urger", "urges", "urial", "urite", "urman", "urnal", "urned", "urped", "ursae", "ursid", "urson", "urubu", "urupa", "urvas", "usens", "users", "useta", "usnea", "usnic", "usque", "ustad", "uster", "usure", "usury", "uteri", "utero", "uveal", "uveas", "uvula", "vacas", "vacay", "vacua", "vacui", "vacuo", "vadas", "vaded", "vades", "vadge", "vagal", "vagus", "vaids", "vails", "vaire", "vairs", "vairy", "vajra", "vakas", "vakil", "vales", "valis", "valli", "valse", "vamps", "vampy", "vanda", "vaned", "vanes", "vanga", "vangs", "vants", "vaped", "vaper", "vapes", "varan", "varas", "varda", "vardo", "vardy", "varec", "vares", "varia", "varix", "varna", "varus", "varve", "vasal", "vases", "vasts", "vasty", "vatas", "vatha", "vatic", "vatje", "vatos", "vatus", "vauch", "vaute", "vauts", "vawte", "vaxes", "veale", "veals", "vealy", "veena", "veeps", "veers", "veery", "vegas", "veges", "veggo", "vegie", "vegos", "vehme", "veils", "veily", "veins", "veiny", "velar", "velds", "veldt", "veles", "vells", "velum", "venae", "venal", "venas", "vends", "vendu", "veney", "venge", "venin", "venti", "vents", "venus", "verba", "verbs", "verde", "verra", "verre", "verry", "versa", "verst", "verte", "verts", "vertu", "vespa", "vesta", "vests", "vetch", "veuve", "veves", "vexed", "vexer", "vexes", "vexil", "vezir", "vials", "viand", "vibed", "vibes", "vibex", "vibey", "viced", "vices", "vichy", "vicus", "viers", "vieux", "views", "viewy", "vifda", "viffs", "vigas", "vigia", "vilde", "viler", "ville", "villi", "vills", "vimen", "vinal", "vinas", "vinca", "vined", "viner", "vines", "vinew", "vinho", "vinic", "vinny", "vinos", "vints", "viold", "viols", "vired", "vireo", "vires", "virga", "virge", "virgo", "virid", "virls", "virtu", "visas", "vised", "vises", "visie", "visna", "visne", "vison", "visto", "vitae", "vitas", "vitex", "vitro", "vitta", "vivas", "vivat", "vivda", "viver", "vives", "vivos", "vivre", "vizir", "vizor", "vlast", "vleis", "vlies", "vlogs", "voars", "vobla", "vocab", "voces", "voddy", "vodou", "vodun", "voema", "vogie", "voici", "voids", "voile", "voips", "volae", "volar", "voled", "voles", "volet", "volke", "volks", "volta", "volte", "volti", "volts", "volva", "volve", "vomer", "voted", "votes", "vouge", "voulu", "vowed", "vower", "voxel", "voxes", "vozhd", "vraic", "vrils", "vroom", "vrous", "vrouw", "vrows", "vuggs", "vuggy", "vughs", "vughy", "vulgo", "vulns", "vulva", "vutty", "vygie", "waacs", "wacke", "wacko", "wacks", "wadas", "wadds", "waddy", "waded", "wader", "wades", "wadge", "wadis", "wadts", "waffs", "wafts", "waged", "wages", "wagga", "wagyu", "wahay", "wahey", "wahoo", "waide", "waifs", "waift", "wails", "wains", "wairs", "waite", "waits", "wakas", "waked", "waken", "waker", "wakes", "wakfs", "waldo", "walds", "waled", "waler", "wales", "walie", "walis", "walks", "walla", "walls", "wally", "walty", "wamed", "wames", "wamus", "wands", "waned", "wanes", "waney", "wangs", "wanks", "wanky", "wanle", "wanly", "wanna", "wanta", "wants", "wanty", "wanze", "waqfs", "warbs", "warby", "wards", "wared", "wares", "warez", "warks", "warms", "warns", "warps", "warre", "warst", "warts", "wases", "washi", "washy", "wasms", "wasps", "waspy", "wasts", "watap", "watts", "wauff", "waugh", "wauks", "waulk", "wauls", "waurs", "waved", "waves", "wavey", "wawas", "wawes", "wawls", "waxed", "waxer", "waxes", "wayed", "wazir", "wazoo", "weald", "weals", "weamb", "weans", "wears", "webby", "weber", "wecht", "wedel", "wedgy", "weeds", "weeis", "weeke", "weeks", "weels", "weems", "weens", "weeny", "weeps", "weepy", "weest", "weete", "weets", "wefte", "wefts", "weids", "weils", "weirs", "weise", "weize", "wekas", "welds", "welke", "welks", "welkt", "wells", "welly", "welts", "wembs", "wench", "wends", "wenge", "wenny", "wents", "werfs", "weros", "wersh", "wests", "wetas", "wetly", "wexed", "wexes", "whamo", "whams", "whang", "whaps", "whare", "whata", "whats", "whaup", "whaur", "wheal", "whear", "wheek", "wheen", "wheep", "wheft", "whelk", "whelm", "whens", "whets", "whews", "wheys", "whids", "whies", "whift", "whigs", "whilk", "whims", "whins", "whios", "whips", "whipt", "whirr", "whirs", "whish", "whiss", "whist", "whits", "whity", "whizz", "whomp", "whoof", "whoot", "whops", "whore", "whorl", "whort", "whoso", "whows", "whump", "whups", "whyda", "wicca", "wicks", "wicky", "widdy", "wides", "wiels", "wifed", "wifes", "wifey", "wifie", "wifts", "wifty", "wigan", "wigga", "wiggy", "wikis", "wilco", "wilds", "wiled", "wiles", "wilga", "wilis", "wilja", "wills", "wilts", "wimps", "winds", "wined", "wines", "winey", "winge", "wings", "wingy", "winks", "winky", "winna", "winns", "winos", "winze", "wiped", "wiper", "wipes", "wired", "wirer", "wires", "wirra", "wirri", "wised", "wises", "wisha", "wisht", "wisps", "wists", "witan", "wited", "wites", "withe", "withs", "withy", "wived", "wiver", "wives", "wizen", "wizes", "wizzo", "woads", "woady", "woald", "wocks", "wodge", "wodgy", "woful", "wojus", "woker", "wokka", "wolds", "wolfs", "wolly", "wolve", "womas", "wombs", "womby", "womyn", "wonga", "wongi", "wonks", "wonky", "wonts", "woods", "wooed", "woofs", "woofy", "woold", "wools", "woons", "woops", "woopy", "woose", "woosh", "wootz", "words", "works", "worky", "worms", "wormy", "worts", "wowed", "wowee", "wowse", "woxen", "wrang", "wraps", "wrapt", "wrast", "wrate", "wrawl", "wrens", "wrick", "wried", "wrier", "wries", "writs", "wroke", "wroot", "wroth", "wryer", "wuddy", "wudus", "wuffs", "wulls", "wunga", "wurst", "wuses", "wushu", "wussy", "wuxia", "wyled", "wyles", "wynds", "wynns", "wyted", "wytes", "wythe", "xebec", "xenia", "xenic", "xenon", "xeric", "xerox", "xerus", "xoana", "xolos", "xrays", "xviii", "xylan", "xylem", "xylic", "xylol", "xylyl", "xysti", "xysts", "yaars", "yaass", "yabas", "yabba", "yabby", "yacca", "yacka", "yacks", "yadda", "yaffs", "yager", "yages", "yagis", "yagna", "yahoo", "yaird", "yajna", "yakka", "yakow", "yales", "yamen", "yampa", "yampy", "yamun", "yandy", "yangs", "yanks", "yapok", "yapon", "yapps", "yappy", "yarak", "yarco", "yards", "yarer", "yarfa", "yarks", "yarns", "yarra", "yarrs", "yarta", "yarto", "yates", "yatra", "yauds", "yauld", "yaups", "yawed", "yawey", "yawls", "yawns", "yawny", "yawps", "yayas", "ybore", "yclad", "ycled", "ycond", "ydrad", "ydred", "yeads", "yeahs", "yealm", "yeans", "yeard", "years", "yecch", "yechs", "yechy", "yedes", "yeeds", "yeeek", "yeesh", "yeggs", "yelks", "yells", "yelms", "yelps", "yelts", "yenta", "yente", "yerba", "yerds", "yerks", "yeses", "yesks", "yests", "yesty", "yetis", "yetts", "yeuch", "yeuks", "yeuky", "yeven", "yeves", "yewen", "yexed", "yexes", "yfere", "yiked", "yikes", "yills", "yince", "yipes", "yippy", "yirds", "yirks", "yirrs", "yirth", "yites", "yitie", "ylems", "ylide", "ylids", "ylike", "ylkes", "ymolt", "ympes", "yobbo", "yobby", "yocks", "yodel", "yodhs", "yodle", "yogas", "yogee", "yoghs", "yogic", "yogin", "yogis", "yohah", "yohay", "yoick", "yojan", "yokan", "yoked", "yokeg", "yokel", "yoker", "yokes", "yokul", "yolks", "yolky", "yolps", "yomim", "yomps", "yonic", "yonis", "yonks", "yonny", "yoofs", "yoops", "yopos", "yoppo", "yores", "yorga", "yorks", "yorps", "youks", "yourn", "yours", "yourt", "youse", "yowed", "yowes", "yowie", "yowls", "yowsa", "yowza", "yoyos", "yrapt", "yrent", "yrivd", "yrneh", "ysame", "ytost", "yuans", "yucas", "yucca", "yucch", "yucko", "yucks", "yucky", "yufts", "yugas", "yuked", "yukes", "yukky", "yukos", "yulan", "yules", "yummo", "yummy", "yumps", "yupon", "yuppy", "yurta", "yurts", "yuzus", "zabra", "zacks", "zaida", "zaide", "zaidy", "zaire", "zakat", "zamac", "zamak", "zaman", "zambo", "zamia", "zamis", "zanja", "zante", "zanza", "zanze", "zappy", "zarda", "zarfs", "zaris", "zatis", "zawns", "zaxes", "zayde", "zayin", "zazen", "zeals", "zebec", "zebub", "zebus", "zedas", "zeera", "zeins", "zendo", "zerda", "zerks", "zeros", "zests", "zetas", "zexes", "zezes", "zhomo", "zhush", "zhuzh", "zibet", "ziffs", "zigan", "zikrs", "zilas", "zilch", "zilla", "zills", "zimbi", "zimbs", "zinco", "zincs", "zincy", "zineb", "zines", "zings", "zingy", "zinke", "zinky", "zinos", "zippo", "zippy", "ziram", "zitis", "zitty", "zizel", "zizit", "zlote", "zloty", "zoaea", "zobos", "zobus", "zocco", "zoeae", "zoeal", "zoeas", "zoism", "zoist", "zokor", "zolle", "zombi", "zonae", "zonda", "zoned", "zoner", "zones", "zonks", "zooea", "zooey", "zooid", "zooks", "zooms", "zoomy", "zoons", "zooty", "zoppa", "zoppo", "zoril", "zoris", "zorro", "zorse", "zouks", "zowee", "zowie", "zulus", "zupan", "zupas", "zuppa", "zurfs", "zuzim", "zygal", "zygon", "zymes", "zymic", "cigar", "rebut", "sissy", "humph", "awake", "blush", "focal", "evade", "naval", "serve", "heath", "dwarf", "model", "karma", "stink", "grade", "quiet", "bench", "abate", "feign", "major", "death", "fresh", "crust", "stool", "colon", "abase", "marry", "react", "batty", "pride", "floss", "helix", "croak", "staff", "paper", "unfed", "whelp", "trawl", "outdo", "adobe", "crazy", "sower", "repay", "digit", "crate", "cluck", "spike", "mimic", "pound", "maxim", "linen", "unmet", "flesh", "booby", "forth", "first", "stand", "belly", "ivory", "seedy", "print", "yearn", "drain", "bribe", "stout", "panel", "crass", "flume", "offal", "agree", "error", "swirl", "argue", "bleed", "delta", "flick", "totem", "wooer", "front", "shrub", "parry", "biome", "lapel", "start", "greet", "goner", "golem", "lusty", "loopy", "round", "audit", "lying", "gamma", "labor", "islet", "civic", "forge", "corny", "moult", "basic", "salad", "agate", "spicy", "spray", "essay", "fjord", "spend", "kebab", "guild", "aback", "motor", "alone", "hatch", "hyper", "thumb", "dowry", "ought", "belch", "dutch", "pilot", "tweed", "comet", "jaunt", "enema", "steed", "abyss", "growl", "fling", "dozen", "boozy", "erode", "world", "gouge", "click", "briar", "great", "altar", "pulpy", "blurt", "coast", "duchy", "groin", "fixer", "group", "rogue", "badly", "smart", "pithy", "gaudy", "chill", "heron", "vodka", "finer", "surer", "radio", "rouge", "perch", "retch", "wrote", "clock", "tilde", "store", "prove", "bring", "solve", "cheat", "grime", "exult", "usher", "epoch", "triad", "break", "rhino", "viral", "conic", "masse", "sonic", "vital", "trace", "using", "peach", "champ", "baton", "brake", "pluck", "craze", "gripe", "weary", "picky", "acute", "ferry", "aside", "tapir", "troll", "unify", "rebus", "boost", "truss", "siege", "tiger", "banal", "slump", "crank", "gorge", "query", "drink", "favor", "abbey", "tangy", "panic", "solar", "shire", "proxy", "point", "robot", "prick", "wince", "crimp", "knoll", "sugar", "whack", "mount", "perky", "could", "wrung", "light", "those", "moist", "shard", "pleat", "aloft", "skill", "elder", "frame", "humor", "pause", "ulcer", "ultra", "robin", "cynic", "aroma", "caulk", "shake", "dodge", "swill", "tacit", "other", "thorn", "trove", "bloke", "vivid", "spill", "chant", "choke", "rupee", "nasty", "mourn", "ahead", "brine", "cloth", "hoard", "sweet", "month", "lapse", "watch", "today", "focus", "smelt", "tease", "cater", "movie", "saute", "allow", "renew", "their", "slosh", "purge", "chest", "depot", "epoxy", "nymph", "found", "shall", "stove", "lowly", "snout", "trope", "fewer", "shawl", "natal", "comma", "foray", "scare", "stair", "black", "squad", "royal", "chunk", "mince", "shame", "cheek", "ample", "flair", "foyer", "cargo", "oxide", "plant", "olive", "inert", "askew", "heist", "shown", "zesty", "trash", "larva", "forgo", "story", "hairy", "train", "homer", "badge", "midst", "canny", "shine", "gecko", "farce", "slung", "tipsy", "metal", "yield", "delve", "being", "scour", "glass", "gamer", "scrap", "money", "hinge", "album", "vouch", "asset", "tiara", "crept", "bayou", "atoll", "manor", "creak", "showy", "phase", "froth", "depth", "gloom", "flood", "trait", "girth", "piety", "goose", "float", "donor", "atone", "primo", "apron", "blown", "cacao", "loser", "input", "gloat", "awful", "brink", "smite", "beady", "rusty", "retro", "droll", "gawky", "hutch", "pinto", "egret", "lilac", "sever", "field", "fluff", "agape", "voice", "stead", "berth", "madam", "night", "bland", "liver", "wedge", "roomy", "wacky", "flock", "angry", "trite", "aphid", "tryst", "midge", "power", "elope", "cinch", "motto", "stomp", "upset", "bluff", "cramp", "quart", "coyly", "youth", "rhyme", "buggy", "alien", "smear", "unfit", "patty", "cling", "glean", "label", "hunky", "khaki", "poker", "gruel", "twice", "twang", "shrug", "treat", "waste", "merit", "woven", "needy", "clown", "irony", "ruder", "gauze", "chief", "onset", "prize", "fungi", "charm", "gully", "inter", "whoop", "taunt", "leery", "class", "theme", "lofty", "tibia", "booze", "alpha", "thyme", "doubt", "parer", "chute", "stick", "trice", "alike", "recap", "saint", "glory", "grate", "admit", "brisk", "soggy", "usurp", "scald", "scorn", "leave", "twine", "sting", "bough", "marsh", "sloth", "dandy", "vigor", "howdy", "enjoy", "valid", "ionic", "equal", "floor", "catch", "spade", "stein", "exist", "quirk", "denim", "grove", "spiel", "mummy", "fault", "foggy", "flout", "carry", "sneak", "libel", "waltz", "aptly", "piney", "inept", "aloud", "photo", "dream", "stale", "unite", "snarl", "baker", "there", "glyph", "pooch", "hippy", "spell", "folly", "louse", "gulch", "vault", "godly", "threw", "fleet", "grave", "inane", "shock", "crave", "spite", "valve", "skimp", "claim", "rainy", "musty", "pique", "daddy", "quasi", "arise", "aging", "valet", "opium", "avert", "stuck", "recut", "mulch", "genre", "plume", "rifle", "count", "incur", "total", "wrest", "mocha", "deter", "study", "lover", "safer", "rivet", "funny", "smoke", "mound", "undue", "sedan", "pagan", "swine", "guile", "gusty", "equip", "tough", "canoe", "chaos", "covet", "human", "udder", "lunch", "blast", "stray", "manga", "melee", "lefty", "quick", "paste", "given", "octet", "risen", "groan", "leaky", "grind", "carve", "loose", "sadly", "spilt", "apple", "slack", "honey", "final", "sheen", "eerie", "minty", "slick", "derby", "wharf", "spelt", "coach", "erupt", "singe", "price", "spawn", "fairy", "jiffy", "filmy", "stack", "chose", "sleep", "ardor", "nanny", "niece", "woozy", "handy", "grace", "ditto", "stank", "cream", "usual", "diode", "valor", "angle", "ninja", "muddy", "chase", "reply", "prone", "spoil", "heart", "shade", "diner", "arson", "onion", "sleet", "dowel", "couch", "palsy", "bowel", "smile", "evoke", "creek", "lance", "eagle", "idiot", "siren", "built", "embed", "award", "dross", "annul", "goody", "frown", "patio", "laden", "humid", "elite", "lymph", "edify", "might", "reset", "visit", "gusto", "purse", "vapor", "crock", "write", "sunny", "loath", "chaff", "slide", "queer", "venom", "stamp", "sorry", "still", "acorn", "aping", "pushy", "tamer", "hater", "mania", "awoke", "brawn", "swift", "exile", "birch", "lucky", "freer", "risky", "ghost", "plier", "lunar", "winch", "snare", "nurse", "house", "borax", "nicer", "lurch", "exalt", "about", "savvy", "toxin", "tunic", "pried", "inlay", "chump", "lanky", "cress", "eater", "elude", "cycle", "kitty", "boule", "moron", "tenet", "place", "lobby", "plush", "vigil", "index", "blink", "clung", "qualm", "croup", "clink", "juicy", "stage", "decay", "nerve", "flier", "shaft", "crook", "clean", "china", "ridge", "vowel", "gnome", "snuck", "icing", "spiny", "rigor", "snail", "flown", "rabid", "prose", "thank", "poppy", "budge", "fiber", "moldy", "dowdy", "kneel", "track", "caddy", "quell", "dumpy", "paler", "swore", "rebar", "scuba", "splat", "flyer", "horny", "mason", "doing", "ozone", "amply", "molar", "ovary", "beset", "queue", "cliff", "magic", "truce", "sport", "fritz", "edict", "twirl", "verse", "llama", "eaten", "range", "whisk", "hovel", "rehab", "macaw", "sigma", "spout", "verve", "sushi", "dying", "fetid", "brain", "buddy", "thump", "scion", "candy", "chord", "basin", "march", "crowd", "arbor", "gayly", "musky", "stain", "dally", "bless", "bravo", "stung", "title", "ruler", "kiosk", "blond", "ennui", "layer", "fluid", "tatty", "score", "cutie", "zebra", "barge", "matey", "bluer", "aider", "shook", "river", "privy", "betel", "frisk", "bongo", "begun", "azure", "weave", "genie", "sound", "glove", "braid", "scope", "wryly", "rover", "assay", "ocean", "bloom", "irate", "later", "woken", "silky", "wreck", "dwelt", "slate", "smack", "solid", "amaze", "hazel", "wrist", "jolly", "globe", "flint", "rouse", "civil", "vista", "relax", "cover", "alive", "beech", "jetty", "bliss", "vocal", "often", "dolly", "eight", "joker", "since", "event", "ensue", "shunt", "diver", "poser", "worst", "sweep", "alley", "creed", "anime", "leafy", "bosom", "dunce", "stare", "pudgy", "waive", "choir", "stood", "spoke", "outgo", "delay", "bilge", "ideal", "clasp", "seize", "hotly", "laugh", "sieve", "block", "meant", "grape", "noose", "hardy", "shied", "drawl", "daisy", "putty", "strut", "burnt", "tulip", "crick", "idyll", "vixen", "furor", "geeky", "cough", "naive", "shoal", "stork", "bathe", "aunty", "check", "prime", "brass", "outer", "furry", "razor", "elect", "evict", "imply", "demur", "quota", "haven", "cavil", "swear", "crump", "dough", "gavel", "wagon", "salon", "nudge", "harem", "pitch", "sworn", "pupil", "excel", "stony", "cabin", "unzip", "queen", "trout", "polyp", "earth", "storm", "until", "taper", "enter", "child", "adopt", "minor", "fatty", "husky", "brave", "filet", "slime", "glint", "tread", "steal", "regal", "guest", "every", "murky", "share", "spore", "hoist", "buxom", "inner", "otter", "dimly", "level", "sumac", "donut", "stilt", "arena", "sheet", "scrub", "fancy", "slimy", "pearl", "silly", "porch", "dingo", "sepia", "amble", "shady", "bread", "friar", "reign", "dairy", "quill", "cross", "brood", "tuber", "shear", "posit", "blank", "villa", "shank", "piggy", "freak", "which", "among", "fecal", "shell", "would", "algae", "large", "rabbi", "agony", "amuse", "bushy", "copse", "swoon", "knife", "pouch", "ascot", "plane", "crown", "urban", "snide", "relay", "abide", "viola", "rajah", "straw", "dilly", "crash", "amass", "third", "trick", "tutor", "woody", "blurb", "grief", "disco", "where", "sassy", "beach", "sauna", "comic", "clued", "creep", "caste", "graze", "snuff", "frock", "gonad", "drunk", "prong", "lurid", "steel", "halve", "buyer", "vinyl", "utile", "smell", "adage", "worry", "tasty", "local", "trade", "finch", "ashen", "modal", "gaunt", "clove", "enact", "adorn", "roast", "speck", "sheik", "missy", "grunt", "snoop", "party", "touch", "mafia", "emcee", "array", "south", "vapid", "jelly", "skulk", "angst", "tubal", "lower", "crest", "sweat", "cyber", "adore", "tardy", "swami", "notch", "groom", "roach", "hitch", "young", "align", "ready", "frond", "strap", "puree", "realm", "venue", "swarm", "offer", "seven", "dryer", "diary", "dryly", "drank", "acrid", "heady", "theta", "junto", "pixie", "quoth", "bonus", "shalt", "penne", "amend", "datum", "build", "piano", "shelf", "lodge", "suing", "rearm", "coral", "ramen", "worth", "psalm", "infer", "overt", "mayor", "ovoid", "glide", "usage", "poise", "randy", "chuck", "prank", "fishy", "tooth", "ether", "drove", "idler", "swath", "stint", "while", "begat", "apply", "slang", "tarot", "radar", "credo", "aware", "canon", "shift", "timer", "bylaw", "serum", "three", "steak", "iliac", "shirk", "blunt", "puppy", "penal", "joist", "bunny", "shape", "beget", "wheel", "adept", "stunt", "stole", "topaz", "chore", "fluke", "afoot", "bloat", "bully", "dense", "caper", "sneer", "boxer", "jumbo", "lunge", "space", "avail", "short", "slurp", "loyal", "flirt", "pizza", "conch", "tempo", "droop", "plate", "bible", "plunk", "afoul", "savoy", "steep", "agile", "stake", "dwell", "knave", "beard", "arose", "motif", "smash", "broil", "glare", "shove", "baggy", "mammy", "swamp", "along", "rugby", "wager", "quack", "squat", "snaky", "debit", "mange", "skate", "ninth", "joust", "tramp", "spurn", "medal", "micro", "rebel", "flank", "learn", "nadir", "maple", "comfy", "remit", "gruff", "ester", "least", "mogul", "fetch", "cause", "oaken", "aglow", "meaty", "gaffe", "shyly", "racer", "prowl", "thief", "stern", "poesy", "rocky", "tweet", "waist", "spire", "grope", "havoc", "patsy", "truly", "forty", "deity", "uncle", "swish", "giver", "preen", "bevel", "lemur", "draft", "slope", "annoy", "lingo", "bleak", "ditty", "curly", "cedar", "dirge", "grown", "horde", "drool", "shuck", "crypt", "cumin", "stock", "gravy", "locus", "wider", "breed", "quite", "chafe", "cache", "blimp", "deign", "fiend", "logic", "cheap", "elide", "rigid", "false", "renal", "pence", "rowdy", "shoot", "blaze", "envoy", "posse", "brief", "never", "abort", "mouse", "mucky", "sulky", "fiery", "media", "trunk", "yeast", "clear", "skunk", "scalp", "bitty", "cider", "koala", "duvet", "segue", "creme", "super", "grill", "after", "owner", "ember", "reach", "nobly", "empty", "speed", "gipsy", "recur", "smock", "dread", "merge", "burst", "kappa", "amity", "shaky", "hover", "carol", "snort", "synod", "faint", "haunt", "flour", "chair", "detox", "shrew", "tense", "plied", "quark", "burly", "novel", "waxen", "stoic", "jerky", "blitz", "beefy", "lyric", "hussy", "towel", "quilt", "below", "bingo", "wispy", "brash", "scone", "toast", "easel", "saucy", "value", "spice", "honor", "route", "sharp", "bawdy", "radii", "skull", "phony", "issue", "lager", "swell", "urine", "gassy", "trial", "flora", "upper", "latch", "wight", "brick", "retry", "holly", "decal", "grass", "shack", "dogma", "mover", "defer", "sober", "optic", "crier", "vying", "nomad", "flute", "hippo", "shark", "drier", "obese", "bugle", "tawny", "chalk", "feast", "ruddy", "pedal", "scarf", "cruel", "bleat", "tidal", "slush", "semen", "windy", "dusty", "sally", "igloo", "nerdy", "jewel", "shone", "whale", "hymen", "abuse", "fugue", "elbow", "crumb", "pansy", "welsh", "syrup", "terse", "suave", "gamut", "swung", "drake", "freed", "afire", "shirt", "grout", "oddly", "tithe", "plaid", "dummy", "broom", "blind", "torch", "enemy", "again", "tying", "pesky", "alter", "gazer", "noble", "ethos", "bride", "extol", "decor", "hobby", "beast", "idiom", "utter", "these", "sixth", "alarm", "erase", "elegy", "spunk", "piper", "scaly", "scold", "hefty", "chick", "sooty", "canal", "whiny", "slash", "quake", "joint", "swept", "prude", "heavy", "wield", "femme", "lasso", "maize", "shale", "screw", "spree", "smoky", "whiff", "scent", "glade", "spent", "prism", "stoke", "riper", "orbit", "cocoa", "guilt", "humus", "shush", "table", "smirk", "wrong", "noisy", "alert", "shiny", "elate", "resin", "whole", "hunch", "pixel", "polar", "hotel", "sword", "cleat", "mango", "rumba", "puffy", "filly", "billy", "leash", "clout", "dance", "ovate", "facet", "chili", "paint", "liner", "curio", "salty", "audio", "snake", "fable", "cloak", "navel", "spurt", "pesto", "balmy", "flash", "unwed", "early", "churn", "weedy", "stump", "lease", "witty", "wimpy", "spoof", "saner", "blend", "salsa", "thick", "warty", "manic", "blare", "squib", "spoon", "probe", "crepe", "knack", "force", "debut", "order", "haste", "teeth", "agent", "widen", "icily", "slice", "ingot", "clash", "juror", "blood", "abode", "throw", "unity", "pivot", "slept", "troop", "spare", "sewer", "parse", "morph", "cacti", "tacky", "spool", "demon", "moody", "annex", "begin", "fuzzy", "patch", "water", "lumpy", "admin", "omega", "limit", "tabby", "macho", "aisle", "skiff", "basis", "plank", "verge", "botch", "crawl", "lousy", "slain", "cubic", "raise", "wrack", "guide", "foist", "cameo", "under", "actor", "revue", "fraud", "harpy", "scoop", "climb", "refer", "olden", "clerk", "debar", "tally", "ethic", "cairn", "tulle", "ghoul", "hilly", "crude", "apart", "scale", "older", "plain", "sperm", "briny", "abbot", "rerun", "quest", "crisp", "bound", "befit", "drawn", "suite", "itchy", "cheer", "bagel", "guess", "broad", "axiom", "chard", "caput", "leant", "harsh", "curse", "proud", "swing", "opine", "taste", "lupus", "gumbo", "miner", "green", "chasm", "lipid", "topic", "armor", "brush", "crane", "mural", "abled", "habit", "bossy", "maker", "dusky", "dizzy", "lithe", "brook", "jazzy", "fifty", "sense", "giant", "surly", "legal", "fatal", "flunk", "began", "prune", "small", "slant", "scoff", "torus", "ninny", "covey", "viper", "taken", "moral", "vogue", "owing", "token", "entry", "booth", "voter", "chide", "elfin", "ebony", "neigh", "minim", "melon", "kneed", "decoy", "voila", "ankle", "arrow", "mushy", "tribe", "cease", "eager", "birth", "graph", "odder", "terra", "weird", "tried", "clack", "color", "rough", "weigh", "uncut", "ladle", "strip", "craft", "minus", "dicey", "titan", "lucid", "vicar", "dress", "ditch", "gypsy", "pasta", "taffy", "flame", "swoop", "aloof", "sight", "broke", "teary", "chart", "sixty", "wordy", "sheer", "leper", "nosey", "bulge", "savor", "clamp", "funky", "foamy", "toxic", "brand", "plumb", "dingy", "butte", "drill", "tripe", "bicep", "tenor", "krill", "worse", "drama", "hyena", "think", "ratio", "cobra", "basil", "scrum", "bused", "phone", "court", "camel", "proof", "heard", "angel", "petal", "pouty", "throb", "maybe", "fetal", "sprig", "spine", "shout", "cadet", "macro", "dodgy", "satyr", "rarer", "binge", "trend", "nutty", "leapt", "amiss", "split", "myrrh", "width", "sonar", "tower", "baron", "fever", "waver", "spark", "belie", "sloop", "expel", "smote", "baler", "above", "north", "wafer", "scant", "frill", "awash", "snack", "scowl", "frail", "drift", "limbo", "fence", "motel", "ounce", "wreak", "revel", "talon", "prior", "knelt", "cello", "flake", "debug", "anode", "crime", "salve", "scout", "imbue", "pinky", "stave", "vague", "chock", "fight", "video", "stone", "teach", "cleft", "frost", "prawn", "booty", "twist", "apnea", "stiff", "plaza", "ledge", "tweak", "board", "grant", "medic", "bacon", "cable", "brawl", "slunk", "raspy", "forum", "drone", "women", "mucus", "boast", "toddy", "coven", "tumor", "truer", "wrath", "stall", "steam", "axial", "purer", "daily", "trail", "niche", "mealy", "juice", "nylon", "plump", "merry", "flail", "papal", "wheat", "berry", "cower", "erect", "brute", "leggy", "snipe", "sinew", "skier", "penny", "jumpy", "rally", "umbra", "scary", "modem", "gross", "avian", "greed", "satin", "tonic", "parka", "sniff", "livid", "stark", "trump", "giddy", "reuse", "taboo", "avoid", "quote", "devil", "liken", "gloss", "gayer", "beret", "noise", "gland", "dealt", "sling", "rumor", "opera", "thigh", "tonga", "flare", "wound", "white", "bulky", "etude", "horse", "circa", "paddy", "inbox", "fizzy", "grain", "exert", "surge", "gleam", "belle", "salvo", "crush", "fruit", "sappy", "taker", "tract", "ovine", "spiky", "frank", "reedy", "filth", "spasm", "heave", "mambo", "right", "clank", "trust", "lumen", "borne", "spook", "sauce", "amber", "lathe", "carat", "corer", "dirty", "slyly", "affix", "alloy", "taint", "sheep", "kinky", "wooly", "mauve", "flung", "yacht", "fried", "quail", "brunt", "grimy", "curvy", "cagey", "rinse", "deuce", "state", "grasp", "milky", "bison", "graft", "sandy", "baste", "flask", "hedge", "girly", "swash", "boney", "coupe", "endow", "abhor", "welch", "blade", "tight", "geese", "miser", "mirth", "cloud", "cabal", "leech", "close", "tenth", "pecan", "droit", "grail", "clone", "guise", "ralph", "tango", "biddy", "smith", "mower", "payee", "serif", "drape", "fifth", "spank", "glaze", "allot", "truck", "kayak", "virus", "testy", "tepee", "fully", "zonal", "metro", "curry", "grand", "banjo", "axion", "bezel", "occur", "chain", "nasal", "gooey", "filer", "brace", "allay", "pubic", "raven", "plead", "gnash", "flaky", "munch", "dully", "eking", "thing", "slink", "hurry", "theft", "shorn", "pygmy", "ranch", "wring", "lemon", "shore", "mamma", "froze", "newer", "style", "moose", "antic", "drown", "vegan", "chess", "guppy", "union", "lever", "lorry", "image", "cabby", "druid", "exact", "truth", "dopey", "spear", "cried", "chime", "crony", "stunk", "timid", "batch", "gauge", "rotor", "crack", "curve", "latte", "witch", "bunch", "repel", "anvil", "soapy", "meter", "broth", "madly", "dried", "scene", "known", "magma", "roost", "woman", "thong", "punch", "pasty", "downy", "knead", "whirl", "rapid", "clang", "anger", "drive", "goofy", "email", "music", "stuff", "bleep", "rider", "mecca", "folio", "setup", "verso", "quash", "fauna", "gummy", "happy", "newly", "fussy", "relic", "guava", "ratty", "fudge", "femur", "chirp", "forte", "alibi", "whine", "petty", "golly", "plait", "fleck", "felon", "gourd", "brown", "thrum", "ficus", "stash", "decry", "wiser", "junta", "visor", "daunt", "scree", "impel", "await", "press", "whose", "turbo", "stoop", "speak", "mangy", "eying", "inlet", "crone", "pulse", "mossy", "staid", "hence", "pinch", "teddy", "sully", "snore", "ripen", "snowy", "attic", "going", "leach", "mouth", "hound", "clump", "tonal", "bigot", "peril", "piece", "blame", "haute", "spied", "undid", "intro", "basal", "rodeo", "guard", "steer", "loamy", "scamp", "scram", "manly", "hello", "vaunt", "organ", "feral", "knock", "extra", "condo", "adapt", "willy", "polka", "rayon", "skirt", "faith", "torso", "match", "mercy", "tepid", "sleek", "riser", "twixt", "peace", "flush", "catty", "login", "eject", "roger", "rival", "untie", "refit", "aorta", "adult", "judge", "rower", "artsy", "rural", "shave", "bobby", "eclat", "fella", "gaily", "harry", "hasty", "hydro", "liege", "octal", "ombre", "payer", "sooth", "unset", "unlit", "vomit", "fanny", "fetus", "butch", "stalk", "flack", "widow", "augur"];


var wordleSchema = [
    {
        prop: 'day',
        type: 'SignedInteger',
        def: -1
    },
    {
        prop: 'played',
        type: 'Array:150:Boolean',
        def: eval('var aret = []; while(aret.length < 150) aret.push(false); aret;')
    },
    {
        prop: 'completed',
        type: 'Array:150:Boolean',
        def: eval('var aret = []; while(aret.length < 150) aret.push(false); aret;')
    },

    // Can't do a string for some reason
    {
        prop: 'answer0',
        type: 'Array:150:Integer',
        def: eval('var aret = []; while(aret.length < 150) aret.push(0); aret;')
    },
    {
        prop: 'answer1',
        type: 'Array:150:Integer',
        def: eval('var aret = []; while(aret.length < 150) aret.push(0); aret;')
    },
    {
        prop: 'answer2',
        type: 'Array:150:Integer',
        def: eval('var aret = []; while(aret.length < 150) aret.push(0); aret;')
    },
    {
        prop: 'answer3',
        type: 'Array:150:Integer',
        def: eval('var aret = []; while(aret.length < 150) aret.push(0); aret;')
    },
    {
        prop: 'answer4',
        type: 'Array:150:Integer',
        def: eval('var aret = []; while(aret.length < 150) aret.push(0); aret;')
    },

    // Existing guesses
    {
        prop: 'guess00',
        type: 'Array:150:Integer',
        def: eval('var aret = []; while(aret.length < 150) aret.push(0); aret;')
    },
    {
        prop: 'guess01',
        type: 'Array:150:Integer',
        def: eval('var aret = []; while(aret.length < 150) aret.push(0); aret;')
    },
    {
        prop: 'guess02',
        type: 'Array:150:Integer',
        def: eval('var aret = []; while(aret.length < 150) aret.push(0); aret;')
    },
    {
        prop: 'guess03',
        type: 'Array:150:Integer',
        def: eval('var aret = []; while(aret.length < 150) aret.push(0); aret;')
    },
    {
        prop: 'guess04',
        type: 'Array:150:Integer',
        def: eval('var aret = []; while(aret.length < 150) aret.push(0); aret;')
    },
    {
        prop: 'guess10',
        type: 'Array:150:Integer',
        def: eval('var aret = []; while(aret.length < 150) aret.push(0); aret;')
    },
    {
        prop: 'guess11',
        type: 'Array:150:Integer',
        def: eval('var aret = []; while(aret.length < 150) aret.push(0); aret;')
    },
    {
        prop: 'guess12',
        type: 'Array:150:Integer',
        def: eval('var aret = []; while(aret.length < 150) aret.push(0); aret;')
    },
    {
        prop: 'guess13',
        type: 'Array:150:Integer',
        def: eval('var aret = []; while(aret.length < 150) aret.push(0); aret;')
    },
    {
        prop: 'guess14',
        type: 'Array:150:Integer',
        def: eval('var aret = []; while(aret.length < 150) aret.push(0); aret;')
    },
    {
        prop: 'guess20',
        type: 'Array:150:Integer',
        def: eval('var aret = []; while(aret.length < 150) aret.push(0); aret;')
    },
    {
        prop: 'guess21',
        type: 'Array:150:Integer',
        def: eval('var aret = []; while(aret.length < 150) aret.push(0); aret;')
    },
    {
        prop: 'guess22',
        type: 'Array:150:Integer',
        def: eval('var aret = []; while(aret.length < 150) aret.push(0); aret;')
    },
    {
        prop: 'guess23',
        type: 'Array:150:Integer',
        def: eval('var aret = []; while(aret.length < 150) aret.push(0); aret;')
    },
    {
        prop: 'guess24',
        type: 'Array:150:Integer',
        def: eval('var aret = []; while(aret.length < 150) aret.push(0); aret;')
    },
    {
        prop: 'guess30',
        type: 'Array:150:Integer',
        def: eval('var aret = []; while(aret.length < 150) aret.push(0); aret;')
    },
    {
        prop: 'guess31',
        type: 'Array:150:Integer',
        def: eval('var aret = []; while(aret.length < 150) aret.push(0); aret;')
    },
    {
        prop: 'guess32',
        type: 'Array:150:Integer',
        def: eval('var aret = []; while(aret.length < 150) aret.push(0); aret;')
    },
    {
        prop: 'guess33',
        type: 'Array:150:Integer',
        def: eval('var aret = []; while(aret.length < 150) aret.push(0); aret;')
    },
    {
        prop: 'guess34',
        type: 'Array:150:Integer',
        def: eval('var aret = []; while(aret.length < 150) aret.push(0); aret;')
    },
    {
        prop: 'guess40',
        type: 'Array:150:Integer',
        def: eval('var aret = []; while(aret.length < 150) aret.push(0); aret;')
    },
    {
        prop: 'guess41',
        type: 'Array:150:Integer',
        def: eval('var aret = []; while(aret.length < 150) aret.push(0); aret;')
    },
    {
        prop: 'guess42',
        type: 'Array:150:Integer',
        def: eval('var aret = []; while(aret.length < 150) aret.push(0); aret;')
    },
    {
        prop: 'guess43',
        type: 'Array:150:Integer',
        def: eval('var aret = []; while(aret.length < 150) aret.push(0); aret;')
    },
    {
        prop: 'guess44',
        type: 'Array:150:Integer',
        def: eval('var aret = []; while(aret.length < 150) aret.push(0); aret;')
    },
    {
        prop: 'guess50',
        type: 'Array:150:Integer',
        def: eval('var aret = []; while(aret.length < 150) aret.push(0); aret;')
    },
    {
        prop: 'guess51',
        type: 'Array:150:Integer',
        def: eval('var aret = []; while(aret.length < 150) aret.push(0); aret;')
    },
    {
        prop: 'guess52',
        type: 'Array:150:Integer',
        def: eval('var aret = []; while(aret.length < 150) aret.push(0); aret;')
    },
    {
        prop: 'guess53',
        type: 'Array:150:Integer',
        def: eval('var aret = []; while(aret.length < 150) aret.push(0); aret;')
    },
    {
        prop: 'guess54',
        type: 'Array:150:Integer',
        def: eval('var aret = []; while(aret.length < 150) aret.push(0); aret;')
    },
];

function run_maintenance(data) {
    var i;
    for (var i = 0; i < data.played.length; i++) {
        data.played[i] = false;
        data.completed[i] = false;
        data.answer0[i] = 0;
        data.answer1[i] = 0;
        data.answer2[i] = 0;
        data.answer3[i] = 0;
        data.answer4[i] = 0;
        data.guess00[i] = 0;
        data.guess01[i] = 0;
        data.guess02[i] = 0;
        data.guess03[i] = 0;
        data.guess04[i] = 0;
        data.guess10[i] = 0;
        data.guess11[i] = 0;
        data.guess12[i] = 0;
        data.guess13[i] = 0;
        data.guess14[i] = 0;
        data.guess20[i] = 0;
        data.guess21[i] = 0;
        data.guess22[i] = 0;
        data.guess23[i] = 0;
        data.guess24[i] = 0;
        data.guess30[i] = 0;
        data.guess31[i] = 0;
        data.guess32[i] = 0;
        data.guess33[i] = 0;
        data.guess34[i] = 0;
        data.guess40[i] = 0;
        data.guess41[i] = 0;
        data.guess42[i] = 0;
        data.guess43[i] = 0;
        data.guess44[i] = 0;
        data.guess50[i] = 0;
        data.guess51[i] = 0;
        data.guess52[i] = 0;
        data.guess53[i] = 0;
        data.guess54[i] = 0;
    }
    data.day = state.days;
    data.put();
}

function gamedir(fname) {
    // Not sure how this works. Taken from lord.js

    var gpre;

    if (settings.game_prefix.length > 0) {
        if (settings.game_prefix[0] === '/' || settings.game_prefix[0] === '\\'
            || (settings.game_prefix[1] === ':' && (settings.game_prefix[2] === '\\' || settings.game_prefix[2] === '/'))) {
            gpre = settings.game_prefix;
        }
        else {
            gpre = js.exec_dir + settings.game_prefix;
        }
    }
    else {
        gpre = js.exec_dir;
    }
    if (file_isdir(gpre)) {
        gpre = backslash(gpre);
    }
    return (gpre + fname);
}

function good_bye() {
    write.slowly("Thank you for playing!", 25);
    write.line();
    waitForUser();
    exit(0);
}

const CellState = {
    Unknown: 0,
    Wrong: 1,
    Misplaced: 2,
    Correct: 3,
}

const CharCodes = {
    Backspace: 8,
    Enter: 13,
    Escape: 27,
    Space: 32,
}

const GameState = {
    NotStarted: 0,
    Playing: 1,
    Won: 2,
    Lost: 3,
    Quit: 4,
    Archived: 5,
}

function Cell(letter, state) {
    this.letter = letter || "";
    this.state = state || CellState.Unknown;
}

function Row() {
    this.cells = [
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
        new Cell(),
    ];
    this.locked = false;
}

function Grid() {
    this.rows = [
        new Row(),
        new Row(),
        new Row(),
        new Row(),
        new Row(),
        new Row(),
    ];
}

var grid = new Grid();

function getColor(state) {
    switch (state) {
        case CellState.Unknown:
            return Color.White;
            
        case CellState.Wrong:
            return Color.DarkRed;
            
        case CellState.Misplaced:
            return Color.Yellow;
            
        case CellState.Correct:
            return Color.LightGreen;
    }
}

const game = {
    state: GameState.NotStarted,

    selectedAnswer: "",

    drawGrid: function () {
        for (var rowIndex = 0; rowIndex < grid.rows.length; rowIndex++) {
            var row = grid.rows[rowIndex];
    
            write.line("---------------------")
            write("| ");
            for (var cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
                var cell = row.cells[cellIndex];
    
                write(cell.letter || " ", getColor(cell.state));
                write(" | ");
            }
            write.blankline();
        }
        write.line("---------------------")
    },

    drawAlphabet: function () {
        var letters = {};

        for (var rowIndex = 0; rowIndex < grid.rows.length; rowIndex++) {
            var row = grid.rows[rowIndex];

            for (var colIndex = 0; colIndex < row.cells.length; colIndex++) {
                var cell = row.cells[colIndex];

                var existingLetterState = letters[cell.letter] || CellState.Unknown;;
                letters[cell.letter] = Math.max(cell.state, existingLetterState);
            }
        }

        for (var charCode = 65; charCode <= 90; charCode++){
            var letter = String.fromCharCode(charCode);
            var letterState = letters[letter] || CellState.Unknown;
            write(" ");
            write(letter, getColor(letterState));
        }
        write.blankline();
    },

    drawBoard: function () {
        write.header("Wordle");

        if (game.state === GameState.Playing) {
            write.line("Press esc to leave. You can pick up where you left off later.", Color.LightGray);
        }
        else {
            write.line("");
        }
        write.blankline();

        game.drawGrid();
        write.blankline();
        game.drawAlphabet();
        write.blankline();

        switch (game.state) {
            case GameState.Lost:
                write.line("The correct answer was " + game.selectedAnswer);
                waitForUser();
                break;

            case GameState.Won:
                write.line("Congratulations!");
                waitForUser();
                break;
        }
    },

    getActiveRowIndex: function () {
        for (var rowIndex = 0; rowIndex < grid.rows.length; rowIndex++) {
            if (!grid.rows[rowIndex].locked) {
                return rowIndex;
            }
        }

        return null;
    },

    getActiveRow: function () {
        var rowIndex = game.getActiveRowIndex();

        if (rowIndex >= 0) {
            return grid.rows[rowIndex];
        }

        return null;
    },

    getActiveCellIndex: function (row) {
        for (var cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
            if (row.cells[cellIndex].letter === "") {
                return cellIndex;
            }
        }

        return row.cells.length;
    },

    getActiveCell: function (row) {
        var activeRow = row || game.getActiveRow();
        var cellIndex = game.getActiveCellIndex(activeRow);

        if (cellIndex >= 0 && cellIndex <= 5) {
            return activeRow.cells[cellIndex];
        }

        return null;
    },

    getPreviousActiveCell: function (row) {
        var activeRow = row || game.getActiveRow();
        var cellIndex = game.getActiveCellIndex(activeRow);

        if (cellIndex > 0 && cellIndex <= 6) {
            return activeRow.cells[cellIndex - 1];
        }

        return null;
    },

    getActiveRowText: function (row) {
        var text = "";

        var activeRow = row || game.getActiveRow();
        
        for (var cellIndex = 0; cellIndex < activeRow.cells.length; cellIndex++) {
            var cell = activeRow.cells[cellIndex];

            text += cell.letter;
        }

        return text;
    },

    addCharacter: function (char) {
        var cell = game.getActiveCell();

        if (cell) {
            cell.letter = char;
        }
    },

    removeCharacter: function () {
        var cell = game.getPreviousActiveCell();

        if (cell) {
            cell.letter = "";
        }
    },

    submitGuess: function (loading) {
        var text = game.getActiveRowText();
        
        if (!loading && VALID_WORDS.indexOf(text.toLowerCase()) < 0) {
            write.blankline();
            write.line("That's not a valid word", Color.DarkRed);
            waitForUser();
            return;
        }

        var activeRow = game.getActiveRow();

        if (game.getActiveCellIndex(activeRow) <= 4) {
            // This guess is not complete
            return;
        }
        
        activeRow.locked = true;
        var unassignedAnswerLetters = game.selectedAnswer.split("");

        // Isolate correct letters first
        for (var cellIndex = 0; cellIndex < activeRow.cells.length; cellIndex++) {
            var cell = activeRow.cells[cellIndex];

            if (game.selectedAnswer[cellIndex] === cell.letter) {
                cell.state = CellState.Correct;
                
                // Remove letter from the queue
                unassignedAnswerLetters[cellIndex] = "";
            }
        }

        // Check for win condition
        if (!unassignedAnswerLetters.filter(function (x) { return x !== "" }).length) {
            game.state = GameState.Won;
            return;
        }

        // Mark misplaced and wrong - Be sure to account for multiple letters
        for (var cellIndex = 0; cellIndex < activeRow.cells.length; cellIndex++) {
            var cell = activeRow.cells[cellIndex];

            if (cell.state === CellState.Unknown) {
                var foundIndex = unassignedAnswerLetters.indexOf(cell.letter);
                if (foundIndex >= 0) {
                    cell.state = CellState.Misplaced;
                
                    // Remove letter from the queue
                    unassignedAnswerLetters[foundIndex] = "";
                }
                else {
                    cell.state = CellState.Wrong;
                }
            }
        }

        // Check for lose condition
        if (!game.getActiveRow()) {
            game.state = GameState.Lost;
        }
    },

    quit: function () {
        game.state = GameState.Quit;
    },

    storeAnswer: function () {
        data.answer0[player.Record] = game.selectedAnswer[0].charCodeAt(0);
        data.answer1[player.Record] = game.selectedAnswer[1].charCodeAt(0);
        data.answer2[player.Record] = game.selectedAnswer[2].charCodeAt(0);
        data.answer3[player.Record] = game.selectedAnswer[3].charCodeAt(0);
        data.answer4[player.Record] = game.selectedAnswer[4].charCodeAt(0);
        data.put();
    },

    storeGuesses: function () {
        var activeRowIndex = game.getActiveRowIndex();

        for (var rowIndex = 0; rowIndex < activeRowIndex; rowIndex++) {
            var row = grid.rows[rowIndex];

            if (row.locked) {
                for (var colIndex = 0; colIndex < row.cells.length; colIndex++) {
                    data['guess' + rowIndex + colIndex][player.Record] = row.cells[colIndex].letter.charCodeAt(0);
                }
            }
        }
        data.put();
    },

    getAnswerFromStorage: function () {
        var answer = null;

        try {
            answer = 
                String.fromCharCode(data.answer0[player.Record]) +
                String.fromCharCode(data.answer1[player.Record]) +
                String.fromCharCode(data.answer2[player.Record]) +
                String.fromCharCode(data.answer3[player.Record]) +
                String.fromCharCode(data.answer4[player.Record]);
        }
        catch (ex) {
            answer = null;
        }

        game.selectedAnswer = answer;
        return answer;
    },

    getGuessesFromStorage: function () {
        for (var rowIndex = 0; rowIndex < 6; rowIndex++) {
            var row = grid.rows[rowIndex];

            for (var colIndex = 0; colIndex < row.cells.length; colIndex++) {
                var charCode = data['guess' + rowIndex + colIndex][player.Record];
                if (charCode === 0) {
                    break;
                }

                var letter = String.fromCharCode(charCode);
                row.cells[colIndex].letter = letter;
            }

            if (charCode !== 0) {
                // Set "loading" mode
                game.submitGuess(true);
            }
        }
    },

    play: function (overrideSelectedAnswer) {
        if (overrideSelectedAnswer) {
            game.selectedAnswer = overrideSelectedAnswer;
        }
        else {
            game.selectedAnswer = ANSWER_POOL[random(ANSWER_POOL.length)].toUpperCase();
            game.storeAnswer();
        }
    
        if (game.state === GameState.NotStarted) {
            game.state = GameState.Playing;
        }

        while (game.state === GameState.Playing) {
            game.drawBoard();
            var input = read.key("What's your guess?: ").toUpperCase();
    
            if ("ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(input) >= 0) {
                game.addCharacter(input);
            }
            else {
                switch (input.charCodeAt(0)) {
                    case CharCodes.Backspace:
                        game.removeCharacter();
                        break;
                        
                    case CharCodes.Enter:
                        game.submitGuess();
                        break;
                        
                    case CharCodes.Escape:
                        game.quit();
                        break;
                        
                    default:
                        break;
                }
            }
        }

        game.drawBoard();
        game.modifyUser();
        game.storeGuesses();
        good_bye();
    },

    rewards: [
        {
            attribute: Attribute.ATTRIBUTE.experience,
            guessValues: [24000000, 6000000, 3000000, 1500000, 1000000, 500000],
            scale: true,
        },
        {
            attribute: Attribute.ATTRIBUTE.charm,
            guessValues: [80, 20, 10, 3, 2, 1],
            scale: false,
        },
        {
            attribute: Attribute.ATTRIBUTE.gems,
            guessValues: [80, 20, 10, 3, 2, 1],
            scale: false,
        },
        {
            attribute: Attribute.ATTRIBUTE.goldInHand,
            guessValues: [48000000, 12000000, 6000000, 3000000, 2000000, 1000000],
            scale: true,
        },
        {
            attribute: Attribute.ATTRIBUTE.children,
            guessValues: [16, 4, 2, 1, 1, 1],
            scale: false,
        },
        {
            attribute: Attribute.ATTRIBUTE.forestFights,
            guessValues: [80, 20, 10, 3, 2, 1],
            scale: false,
        },
    ],

    modifyUser: function () {
        if (game.state == GameState.Won) {
            var guessesMade = game.getActiveRowIndex() || 6;

            var reward = game.rewards[random(game.rewards.length)];
            var scaleFactor = reward.scale ? getExponentialScaleFactor(12, 2.848, player.level) : 1;
            var maxValue = reward.guessValues[guessesMade - 1];
            var amount = parseInt(scaleFactor * maxValue);

            data.completed[player.Record];
            Attribute.modifyPlayer(player, reward.attribute, player[reward.attribute.key] + amount);
            data.put();

            write.line("Your reward is " + amount + " " + reward.attribute.text);
            waitForUser();
        }
    }
}

function main() {
    foreground(2);
    background(0);

    write.header("Wordle");

    dataFile = new RecordFile(js.exec_dir + 'wordle.dat', wordleSchema);
    js.on_exit('dataFile.locks.forEach(function(x) {dataFile.unLock(x); dataFile.file.close()});');
    
    if (dataFile.length < 1) {
        data = dataFile.new();
    }
    else {
        data = dataFile.get(0);
    }

    if (data.day !== state.days) {
        run_maintenance(data);
    }

    if (data.completed[player.Record]) {
        write.line("You've already played today")
        good_bye();
    }

    var userAlreadyStartedPlaying = data.played[player.Record];
    if (!userAlreadyStartedPlaying && player[Attribute.forestFights] <= 0) {
        write.line("You don't have any more forest fights in order to play")
        good_bye();
    }

    playerFile = new RecordFile(gamedir('..\\player.bin'), Player_Def);

    write.header("Wordle");

    var choice = read.key("Would you like to play? [Y]: ");
    if (choice.toLowerCase() === 'y') {
        var existingAnswer = null;
        if (userAlreadyStartedPlaying) {
            existingAnswer = game.getAnswerFromStorage();
            game.getGuessesFromStorage();
            if (game.state === GameState.Won || game.state === GameState.Lost) {
                game.state = GameState.Archived;
            }
        }
        else {
            Attribute.modifyPlayer(player, Attribute.ATTRIBUTE.forestFights, player[Attribute.forestFights] - 1);
        }
        data.played[player.Record] = true;
        data.put();

        game.play(existingAnswer);
    }
    
    write.blankline();
    good_bye();
}

if (argc == 1 && argv[0] == 'INSTALL') {
    var install = {
        desc: "Wordle",
    }
    exit(0);
}
else {
    main();
    exit(0);
}
