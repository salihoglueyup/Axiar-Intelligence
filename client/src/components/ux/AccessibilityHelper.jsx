import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Accessibility,
  Eye,
  EyeOff,
  Volume2,
  VolumeX,
  Type,
  Zap,
  Keyboard,
  MousePointer,
  Hand,
  Mic,
  MicOff,
  Monitor,
  Smartphone,
  Tablet,
  Moon,
  Sun,
  Contrast,
  Maximize2,
  Minimize2,
  Search,
  Settings,
  HelpCircle,
  Info,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Navigation,
  Focus,
  Target,
  Crosshair,
  Scan,
  ScanLine,
  ScanFace,
  User,
  Users,
  UserCheck,
  UserX,
  UserPlus,
  UserMinus,
  Lock,
  Unlock,
  Key,
  Shield,
  ShieldCheck,
  ShieldX,
  ShieldAlert,
  ShieldOff,
  Fingerprint,
  CreditCard,
  Atm,
  Wallet,
  Package,
  Box,
  Archive,
  File,
  FileText,
  FileImage,
  FileVideo,
  FileAudio,
  FileCode,
  Folder,
  FolderOpen,
  Download,
  Upload,
  Save,
  SaveAs,
  Print,
  Printer,
  Scan,
  Edit,
  Edit2,
  Edit3,
  Type,
  Type2,
  Type3,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Indent,
  Outdent,
  List,
  ListOrdered,
  ListUnordered,
  CheckSquare,
  Square,
  Circle,
  Triangle,
  Hexagon,
  Diamond,
  Pentagon,
  Octagon,
  Star,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Smile,
  Frown,
  Meh,
  Angry,
  Sad,
  Happy,
  Laugh,
  Surprised,
  Confused,
  Cool,
  Wink,
  Kiss,
  Cry,
  Dizzy,
  Frown,
  Grimace,
  Grin,
  HeartEyes,
  Kissing,
  KissingHeart,
  KissingSmilingEyes,
  KissingClosedEyes,
  Laughing,
  Relieved,
  Satisfied,
  Screaming,
  StuckOutTongue,
  StuckOutTongueWinkingEye,
  StuckOutTongueClosedEyes,
  WinkingFace,
  Yum,
  Zap,
  ZapOff,
  ZapOn,
  Zap2,
  Zap3,
  Zap4,
  Zap5,
  Zap6,
  Zap7,
  Zap8,
  Zap9,
  Zap10,
  Zap11,
  Zap12,
  Zap13,
  Zap14,
  Zap15,
  Zap16,
  Zap17,
  Zap18,
  Zap19,
  Zap20,
  Zap21,
  Zap22,
  Zap23,
  Zap24,
  Zap25,
  Zap26,
  Zap27,
  Zap28,
  Zap29,
  Zap30,
  Zap31,
  Zap32,
  Zap33,
  Zap34,
  Zap35,
  Zap36,
  Zap37,
  Zap38,
  Zap39,
  Zap40,
  Zap41,
  Zap42,
  Zap43,
  Zap44,
  Zap45,
  Zap46,
  Zap47,
  Zap48,
  Zap49,
  Zap50,
  Zap51,
  Zap52,
  Zap53,
  Zap54,
  Zap55,
  Zap56,
  Zap57,
  Zap58,
  Zap59,
  Zap60,
  Zap61,
  Zap62,
  Zap63,
  Zap64,
  Zap65,
  Zap66,
  Zap67,
  Zap68,
  Zap69,
  Zap70,
  Zap71,
  Zap72,
  Zap73,
  Zap74,
  Zap75,
  Zap76,
  Zap77,
  Zap78,
  Zap79,
  Zap80,
  Zap81,
  Zap82,
  Zap83,
  Zap84,
  Zap85,
  Zap86,
  Zap87,
  Zap88,
  Zap89,
  Zap90,
  Zap91,
  Zap92,
  Zap93,
  Zap94,
  Zap95,
  Zap96,
  Zap97,
  Zap98,
  Zap99,
  Zap100,
  Zap101,
  Zap102,
  Zap103,
  Zap104,
  Zap105,
  Zap106,
  Zap107,
  Zap108,
  Zap109,
  Zap110,
  Zap111,
  Zap112,
  Zap113,
  Zap114,
  Zap115,
  Zap116,
  Zap117,
  Zap118,
  Zap119,
  Zap120,
  Zap121,
  Zap122,
  Zap123,
  Zap124,
  Zap125,
  Zap126,
  Zap127,
  Zap128,
  Zap129,
  Zap130,
  Zap131,
  Zap132,
  Zap133,
  Zap134,
  Zap135,
  Zap136,
  Zap137,
  Zap138,
  Zap139,
  Zap140,
  Zap141,
  Zap142,
  Zap143,
  Zap144,
  Zap145,
  Zap146,
  Zap147,
  Zap148,
  Zap149,
  Zap150,
  Zap151,
  Zap152,
  Zap153,
  Zap154,
  Zap155,
  Zap156,
  Zap157,
  Zap158,
  Zap159,
  Zap160,
  Zap161,
  Zap162,
  Zap163,
  Zap164,
  Zap165,
  Zap166,
  Zap167,
  Zap168,
  Zap169,
  Zap170,
  Zap171,
  Zap172,
  Zap173,
  Zap174,
  Zap175,
  Zap176,
  Zap177,
  Zap178,
  Zap179,
  Zap180,
  Zap181,
  Zap182,
  Zap183,
  Zap184,
  Zap185,
  Zap186,
  Zap187,
  Zap188,
  Zap189,
  Zap190,
  Zap191,
  Zap192,
  Zap193,
  Zap194,
  Zap195,
  Zap196,
  Zap197,
  Zap198,
  Zap199,
  Zap200,
  Zap201,
  Zap202,
  Zap203,
  Zap204,
  Zap205,
  Zap206,
  Zap207,
  Zap208,
  Zap209,
  Zap210,
  Zap211,
  Zap212,
  Zap213,
  Zap214,
  Zap215,
  Zap216,
  Zap217,
  Zap218,
  Zap219,
  Zap220,
  Zap221,
  Zap222,
  Zap223,
  Zap224,
  Zap225,
  Zap226,
  Zap227,
  Zap228,
  Zap229,
  Zap230,
  Zap231,
  Zap232,
  Zap233,
  Zap234,
  Zap235,
  Zap236,
  Zap237,
  Zap238,
  Zap239,
  Zap240,
  Zap241,
  Zap242,
  Zap243,
  Zap244,
  Zap245,
  Zap246,
  Zap247,
  Zap248,
  Zap249,
  Zap250,
  Zap251,
  Zap252,
  Zap253,
  Zap254,
  Zap255,
  Zap256,
  Zap257,
  Zap258,
  Zap259,
  Zap260,
  Zap261,
  Zap262,
  Zap263,
  Zap264,
  Zap265,
  Zap266,
  Zap267,
  Zap268,
  Zap269,
  Zap270,
  Zap271,
  Zap272,
  Zap273,
  Zap274,
  Zap275,
  Zap276,
  Zap277,
  Zap278,
  Zap279,
  Zap280,
  Zap281,
  Zap282,
  Zap283,
  Zap284,
  Zap285,
  Zap286,
  Zap287,
  Zap288,
  Zap289,
  Zap290,
  Zap291,
  Zap292,
  Zap293,
  Zap294,
  Zap295,
  Zap296,
  Zap297,
  Zap298,
  Zap299,
  Zap300,
  Zap301,
  Zap302,
  Zap303,
  Zap304,
  Zap305,
  Zap306,
  Zap307,
  Zap308,
  Zap309,
  Zap310,
  Zap311,
  Zap312,
  Zap313,
  Zap314,
  Zap315,
  Zap316,
  Zap317,
  Zap318,
  Zap319,
  Zap320,
  Zap321,
  Zap322,
  Zap323,
  Zap324,
  Zap325,
  Zap326,
  Zap327,
  Zap328,
  Zap329,
  Zap330,
  Zap331,
  Zap332,
  Zap333,
  Zap334,
  Zap335,
  Zap336,
  Zap337,
  Zap338,
  Zap339,
  Zap340,
  Zap341,
  Zap342,
  Zap343,
  Zap344,
  Zap345,
  Zap346,
  Zap347,
  Zap348,
  Zap349,
  Zap350,
  Zap351,
  Zap352,
  Zap353,
  Zap354,
  Zap355,
  Zap356,
  Zap357,
  Zap358,
  Zap359,
  Zap360,
  Zap361,
  Zap362,
  Zap363,
  Zap364,
  Zap365,
  Zap366,
  Zap367,
  Zap368,
  Zap369,
  Zap370,
  Zap371,
  Zap372,
  Zap373,
  Zap374,
  Zap375,
  Zap376,
  Zap377,
  Zap378,
  Zap379,
  Zap380,
  Zap381,
  Zap382,
  Zap383,
  Zap384,
  Zap385,
  Zap386,
  Zap387,
  Zap388,
  Zap389,
  Zap390,
  Zap391,
  Zap392,
  Zap393,
  Zap394,
  Zap395,
  Zap396,
  Zap397,
  Zap398,
  Zap399,
  Zap400,
  Zap401,
  Zap402,
  Zap403,
  Zap404,
  Zap405,
  Zap406,
  Zap407,
  Zap408,
  Zap409,
  Zap410,
  Zap411,
  Zap412,
  Zap413,
  Zap414,
  Zap415,
  Zap416,
  Zap417,
  Zap418,
  Zap419,
  Zap420,
  Zap421,
  Zap422,
  Zap423,
  Zap424,
  Zap425,
  Zap426,
  Zap427,
  Zap428,
  Zap429,
  Zap430,
  Zap431,
  Zap432,
  Zap433,
  Zap434,
  Zap435,
  Zap436,
  Zap437,
  Zap438,
  Zap439,
  Zap440,
  Zap441,
  Zap442,
  Zap443,
  Zap444,
  Zap445,
  Zap446,
  Zap447,
  Zap448,
  Zap449,
  Zap450,
  Zap451,
  Zap452,
  Zap453,
  Zap454,
  Zap455,
  Zap456,
  Zap457,
  Zap458,
  Zap459,
  Zap460,
  Zap461,
  Zap462,
  Zap463,
  Zap464,
  Zap465,
  Zap466,
  Zap467,
  Zap468,
  Zap469,
  Zap470,
  Zap471,
  Zap472,
  Zap473,
  Zap474,
  Zap475,
  Zap476,
  Zap477,
  Zap478,
  Zap479,
  Zap480,
  Zap481,
  Zap482,
  Zap483,
  Zap484,
  Zap485,
  Zap486,
  Zap487,
  Zap488,
  Zap489,
  Zap490,
  Zap491,
  Zap492,
  Zap493,
  Zap494,
  Zap495,
  Zap496,
  Zap497,
  Zap498,
  Zap499,
  Zap500,
  Zap501,
  Zap502,
  Zap503,
  Zap504,
  Zap505,
  Zap506,
  Zap507,
  Zap508,
  Zap509,
  Zap510,
  Zap511,
  Zap512,
  Zap513,
  Zap514,
  Zap515,
  Zap516,
  Zap517,
  Zap518,
  Zap519,
  Zap520,
  Zap521,
  Zap522,
  Zap523,
  Zap524,
  Zap525,
  Zap526,
  Zap527,
  Zap528,
  Zap529,
  Zap530,
  Zap531,
  Zap532,
  Zap533,
  Zap534,
  Zap535,
  Zap536,
  Zap537,
  Zap538,
  Zap539,
  Zap540,
  Zap541,
  Zap542,
  Zap543,
  Zap544,
  Zap545,
  Zap546,
  Zap547,
  Zap548,
  Zap549,
  Zap550,
  Zap551,
  Zap552,
  Zap553,
  Zap554,
  Zap555,
  Zap556,
  Zap557,
  Zap558,
  Zap559,
  Zap560,
  Zap561,
  Zap562,
  Zap563,
  Zap564,
  Zap565,
  Zap566,
  Zap567,
  Zap568,
  Zap569,
  Zap570,
  Zap571,
  Zap572,
  Zap573,
  Zap574,
  Zap575,
  Zap576,
  Zap577,
  Zap578,
  Zap579,
  Zap580,
  Zap581,
  Zap582,
  Zap583,
  Zap584,
  Zap585,
  Zap586,
  Zap587,
  Zap588,
  Zap589,
  Zap590,
  Zap591,
  Zap592,
  Zap593,
  Zap594,
  Zap595,
  Zap596,
  Zap597,
  Zap598,
  Zap599,
  Zap600,
  Zap601,
  Zap602,
  Zap603,
  Zap604,
  Zap605,
  Zap606,
  Zap607,
  Zap608,
  Zap609,
  Zap610,
  Zap611,
  Zap612,
  Zap613,
  Zap614,
  Zap615,
  Zap616,
  Zap617,
  Zap618,
  Zap619,
  Zap620,
  Zap621,
  Zap622,
  Zap623,
  Zap624,
  Zap625,
  Zap626,
  Zap627,
  Zap628,
  Zap629,
  Zap630,
  Zap631,
  Zap632,
  Zap633,
  Zap634,
  Zap635,
  Zap636,
  Zap637,
  Zap638,
  Zap639,
  Zap640,
  Zap641,
  Zap642,
  Zap643,
  Zap644,
  Zap645,
  Zap646,
  Zap647,
  Zap648,
  Zap649,
  Zap650,
  Zap651,
  Zap652,
  Zap653,
  Zap654,
  Zap655,
  Zap656,
  Zap657,
  Zap658,
  Zap659,
  Zap660,
  Zap661,
  Zap662,
  Zap663,
  Zap664,
  Zap665,
  Zap666,
  Zap667,
  Zap668,
  Zap669,
  Zap670,
  Zap671,
  Zap672,
  Zap673,
  Zap674,
  Zap675,
  Zap676,
  Zap677,
  Zap678,
  Zap679,
  Zap680,
  Zap681,
  Zap682,
  Zap683,
  Zap684,
  Zap685,
  Zap686,
  Zap687,
  Zap688,
  Zap689,
  Zap690,
  Zap691,
  Zap692,
  Zap693,
  Zap694,
  Zap695,
  Zap696,
  Zap697,
  Zap698,
  Zap699,
  Zap700,
  Zap701,
  Zap702,
  Zap703,
  Zap704,
  Zap705,
  Zap706,
  Zap707,
  Zap708,
  Zap709,
  Zap710,
  Zap711,
  Zap712,
  Zap713,
  Zap714,
  Zap715,
  Zap716,
  Zap717,
  Zap718,
  Zap719,
  Zap720,
  Zap721,
  Zap722,
  Zap723,
  Zap724,
  Zap725,
  Zap726,
  Zap727,
  Zap728,
  Zap729,
  Zap730,
  Zap731,
  Zap732,
  Zap733,
  Zap734,
  Zap735,
  Zap736,
  Zap737,
  Zap738,
  Zap739,
  Zap740,
  Zap741,
  Zap742,
  Zap743,
  Zap744,
  Zap745,
  Zap746,
  Zap747,
  Zap748,
  Zap749,
  Zap750,
  Zap751,
  Zap752,
  Zap753,
  Zap754,
  Zap755,
  Zap756,
  Zap757,
  Zap758,
  Zap759,
  Zap760,
  Zap761,
  Zap762,
  Zap763,
  Zap764,
  Zap765,
  Zap766,
  Zap767,
  Zap768,
  Zap769,
  Zap770,
  Zap771,
  Zap772,
  Zap773,
  Zap774,
  Zap775,
  Zap776,
  Zap777,
  Zap778,
  Zap779,
  Zap780,
  Zap781,
  Zap782,
  Zap783,
  Zap784,
  Zap785,
  Zap786,
  Zap787,
  Zap788,
  Zap789,
  Zap790,
  Zap791,
  Zap792,
  Zap793,
  Zap794,
  Zap795,
  Zap796,
  Zap797,
  Zap798,
  Zap799,
  Zap800,
  Zap801,
  Zap802,
  Zap803,
  Zap804,
  Zap805,
  Zap806,
  Zap807,
  Zap808,
  Zap809,
  Zap810,
  Zap811,
  Zap812,
  Zap813,
  Zap814,
  Zap815,
  Zap816,
  Zap817,
  Zap818,
  Zap819,
  Zap820,
  Zap821,
  Zap822,
  Zap823,
  Zap824,
  Zap825,
  Zap826,
  Zap827,
  Zap828,
  Zap829,
  Zap830,
  Zap831,
  Zap832,
  Zap833,
  Zap834,
  Zap835,
  Zap836,
  Zap837,
  Zap838,
  Zap839,
  Zap840,
  Zap841,
  Zap842,
  Zap843,
  Zap844,
  Zap845,
  Zap846,
  Zap847,
  Zap848,
  Zap849,
  Zap850,
  Zap851,
  Zap852,
  Zap853,
  Zap854,
  Zap855,
  Zap856,
  Zap857,
  Zap858,
  Zap859,
  Zap860,
  Zap861,
  Zap862,
  Zap863,
  Zap864,
  Zap865,
  Zap866,
  Zap867,
  Zap868,
  Zap869,
  Zap870,
  Zap871,
  Zap872,
  Zap873,
  Zap874,
  Zap875,
  Zap876,
  Zap877,
  Zap878,
  Zap879,
  Zap880,
  Zap881,
  Zap882,
  Zap883,
  Zap884,
  Zap885,
  Zap886,
  Zap887,
  Zap888,
  Zap889,
  Zap890,
  Zap891,
  Zap892,
  Zap893,
  Zap894,
  Zap895,
  Zap896,
  Zap897,
  Zap898,
  Zap899,
  Zap900,
  Zap901,
  Zap902,
  Zap903,
  Zap904,
  Zap905,
  Zap906,
  Zap907,
  Zap908,
  Zap909,
  Zap910,
  Zap911,
  Zap912,
  Zap913,
  Zap914,
  Zap915,
  Zap916,
  Zap917,
  Zap918,
  Zap919,
  Zap920,
  Zap921,
  Zap922,
  Zap923,
  Zap924,
  Zap925,
  Zap926,
  Zap927,
  Zap928,
  Zap929,
  Zap930,
  Zap931,
  Zap932,
  Zap933,
  Zap934,
  Zap935,
  Zap936,
  Zap937,
  Zap938,
  Zap939,
  Zap940,
  Zap941,
  Zap942,
  Zap943,
  Zap944,
  Zap945,
  Zap946,
  Zap947,
  Zap948,
  Zap949,
  Zap950,
  Zap951,
  Zap952,
  Zap953,
  Zap954,
  Zap955,
  Zap956,
  Zap957,
  Zap958,
  Zap959,
  Zap960,
  Zap961,
  Zap962,
  Zap963,
  Zap964,
  Zap965,
  Zap966,
  Zap967,
  Zap968,
  Zap969,
  Zap970,
  Zap971,
  Zap972,
  Zap973,
  Zap974,
  Zap975,
  Zap976,
  Zap977,
  Zap978,
  Zap979,
  Zap980,
  Zap981,
  Zap982,
  Zap983,
  Zap984,
  Zap985,
  Zap986,
  Zap987,
  Zap988,
  Zap989,
  Zap990,
  Zap991,
  Zap992,
  Zap993,
  Zap994,
  Zap995,
  Zap996,
  Zap997,
  Zap998,
  Zap999,
  Zap1000
} from 'lucide-react';

const AccessibilityHelper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [screenReader, setScreenReader] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [keyboardNav, setKeyboardNav] = useState(false);
  const [voiceControl, setVoiceControl] = useState(false);
  const [focusIndicator, setFocusIndicator] = useState(true);
  const [ariaLabels, setAriaLabels] = useState(true);
  const [altText, setAltText] = useState(true);
  const [colorBlind, setColorBlind] = useState('none');
  const [dyslexiaFont, setDyslexiaFont] = useState(false);
  const [lineHeight, setLineHeight] = useState('normal');
  const [letterSpacing, setLetterSpacing] = useState('normal');
  const [wordSpacing, setWordSpacing] = useState('normal');
  const [linkUnderlines, setLinkUnderlines] = useState(true);
  const [buttonLabels, setButtonLabels] = useState(true);
  const [errorMessages, setErrorMessages] = useState(true);
  const [successMessages, setSuccessMessages] = useState(true);
  const [warningMessages, setWarningMessages] = useState(true);
  const [infoMessages, setInfoMessages] = useState(true);
  const [loading, setLoading] = useState(false);
  const [currentFocus, setCurrentFocus] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedRegion, setSelectedRegion] = useState('us');

  const announcementRef = useRef(null);

  useEffect(() => {
    // Apply accessibility settings to document
    const root = document.documentElement;
    
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    if (largeText) {
      root.classList.add('large-text');
    } else {
      root.classList.remove('large-text');
    }
    
    if (reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }
    
    if (dyslexiaFont) {
      root.classList.add('dyslexia-font');
    } else {
      root.classList.remove('dyslexia-font');
    }
    
    // Apply color blind filters
    if (colorBlind !== 'none') {
      root.style.filter = getColorBlindFilter(colorBlind);
    } else {
      root.style.filter = 'none';
    }
    
    // Apply text spacing
    root.style.setProperty('--line-height', getLineHeightValue(lineHeight));
    root.style.setProperty('--letter-spacing', getLetterSpacingValue(letterSpacing));
    root.style.setProperty('--word-spacing', getWordSpacingValue(wordSpacing));
    
    // Keyboard navigation
    if (keyboardNav) {
      root.setAttribute('tabindex', '0');
      root.focus();
    } else {
      root.removeAttribute('tabindex');
    }
  }, [highContrast, largeText, reducedMotion, dyslexiaFont, colorBlind, lineHeight, letterSpacing, wordSpacing, keyboardNav]);

  useEffect(() => {
    // Handle keyboard navigation
    const handleKeyDown = (e) => {
      if (!keyboardNav) return;
      
      switch (e.key) {
        case 'Tab':
          e.preventDefault();
          navigateFocus(e.shiftKey ? -1 : 1);
          break;
        case 'Enter':
        case ' ':
          if (currentFocus) {
            activateElement(currentFocus);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          break;
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [keyboardNav, currentFocus]);

  useEffect(() => {
    // Voice control simulation
    if (voiceControl) {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.continuous = true;
      recognition.interimResults = true;
      
      recognition.onresult = (event) => {
        const last = event.results.length - 1;
        const command = event.results[last][0].transcript.toLowerCase();
        processVoiceCommand(command);
      };
      
      recognition.start();
      return () => recognition.stop();
    }
  }, [voiceControl]);

  const getColorBlindFilter = (type) => {
    const filters = {
      'protanopia': 'url(#protanopia)',
      'deuteranopia': 'url(#deuteranopia)',
      'tritanopia': 'url(#tritanopia)',
      'achromatopsia': 'grayscale(100%)',
      'protanomaly': 'url(#protanomaly)',
      'deuteranomaly': 'url(#deuteranomaly)',
      'tritanomaly': 'url(#tritanomaly)'
    };
    return filters[type] || 'none';
  };

  const getLineHeightValue = (height) => {
    const values = {
      'compact': '1.2',
      'normal': '1.5',
      'relaxed': '1.8',
      'loose': '2.0'
    };
    return values[height] || '1.5';
  };

  const getLetterSpacingValue = (spacing) => {
    const values = {
      'tight': '-0.05em',
      'normal': '0',
      'wide': '0.1em',
      'wider': '0.2em'
    };
    return values[spacing] || '0';
  };

  const getWordSpacingValue = (spacing) => {
    const values = {
      'tight': '-0.05em',
      'normal': '0.1em',
      'wide': '0.2em',
      'wider': '0.3em'
    };
    return values[spacing] || '0.1em';
  };

  const navigateFocus = (direction) => {
    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;
    
    const currentIndex = Array.from(focusableElements).findIndex(el => el === document.activeElement);
    let nextIndex = currentIndex + direction;
    
    if (nextIndex < 0) nextIndex = focusableElements.length - 1;
    if (nextIndex >= focusableElements.length) nextIndex = 0;
    
    focusableElements[nextIndex].focus();
    setCurrentFocus(focusableElements[nextIndex]);
  };

  const activateElement = (element) => {
    if (element.tagName === 'BUTTON' || element.tagName === 'A') {
      element.click();
    } else if (element.tagName === 'INPUT') {
      element.focus();
    }
  };

  const processVoiceCommand = (command) => {
    if (command.includes('open')) {
      setIsOpen(true);
      announce('Accessibility menu opened');
    } else if (command.includes('close')) {
      setIsOpen(false);
      announce('Accessibility menu closed');
    } else if (command.includes('contrast')) {
      setHighContrast(!highContrast);
      announce(`High contrast ${highContrast ? 'disabled' : 'enabled'}`);
    } else if (command.includes('large text')) {
      setLargeText(!largeText);
      announce(`Large text ${largeText ? 'disabled' : 'enabled'}`);
    }
  };

  const announce = (message) => {
    const newAnnouncement = {
      id: Date.now(),
      message,
      timestamp: new Date().toISOString()
    };
    
    setAnnouncements(prev => [...prev, newAnnouncement]);
    
    // Remove announcement after 3 seconds
    setTimeout(() => {
      setAnnouncements(prev => prev.filter(a => a.id !== newAnnouncement.id));
    }, 3000);
  };

  const accessibilityFeatures = [
    {
      id: 'screenReader',
      name: 'Screen Reader',
      description: 'Optimize content for screen readers',
      icon: <Eye className="w-5 h-5" />,
      enabled: screenReader,
      toggle: setScreenReader,
      category: 'vision'
    },
    {
      id: 'highContrast',
      name: 'High Contrast',
      description: 'Increase contrast for better visibility',
      icon: <Contrast className="w-5 h-5" />,
      enabled: highContrast,
      toggle: setHighContrast,
      category: 'vision'
    },
    {
      id: 'largeText',
      name: 'Large Text',
      description: 'Increase font size for readability',
      icon: <Type className="w-5 h-5" />,
      enabled: largeText,
      toggle: setLargeText,
      category: 'vision'
    },
    {
      id: 'reducedMotion',
      name: 'Reduced Motion',
      description: 'Minimize animations and transitions',
      icon: <Zap className="w-5 h-5" />,
      enabled: reducedMotion,
      toggle: setReducedMotion,
      category: 'motor'
    },
    {
      id: 'keyboardNav',
      name: 'Keyboard Navigation',
      description: 'Enable full keyboard control',
      icon: <Keyboard className="w-5 h-5" />,
      enabled: keyboardNav,
      toggle: setKeyboardNav,
      category: 'motor'
    },
    {
      id: 'voiceControl',
      name: 'Voice Control',
      description: 'Control interface with voice commands',
      icon: <Mic className="w-5 h-5" />,
      enabled: voiceControl,
      toggle: setVoiceControl,
      category: 'motor'
    },
    {
      id: 'focusIndicator',
      name: 'Focus Indicator',
      description: 'Show clear focus on interactive elements',
      icon: <Target className="w-5 h-5" />,
      enabled: focusIndicator,
      toggle: setFocusIndicator,
      category: 'cognitive'
    },
    {
      id: 'dyslexiaFont',
      name: 'Dyslexia Font',
      description: 'Use dyslexia-friendly font',
      icon: <Type className="w-5 h-5" />,
      enabled: dyslexiaFont,
      toggle: setDyslexiaFont,
      category: 'cognitive'
    }
  ];

  const colorBlindOptions = [
    { id: 'none', name: 'None', description: 'No color filter' },
    { id: 'protanopia', name: 'Protanopia', description: 'Red-blind' },
    { id: 'deuteranopia', name: 'Deuteranopia', description: 'Green-blind' },
    { id: 'tritanopia', name: 'Tritanopia', description: 'Blue-blind' },
    { id: 'achromatopsia', name: 'Achromatopsia', description: 'Complete color blindness' },
    { id: 'protanomaly', name: 'Protanomaly', description: 'Red-weak' },
    { id: 'deuteranomaly', name: 'Deuteranomaly', description: 'Green-weak' },
    { id: 'tritanomaly', name: 'Tritanomaly', description: 'Blue-weak' }
  ];

  const textSpacingOptions = [
    { id: 'tight', name: 'Tight', value: 'tight' },
    { id: 'normal', name: 'Normal', value: 'normal' },
    { id: 'relaxed', name: 'Relaxed', value: 'relaxed' },
    { id: 'loose', name: 'Loose', value: 'loose' }
  ];

  const languages = [
    { id: 'en', name: 'English', code: 'en-US' },
    { id: 'es', name: 'Spanish', code: 'es-ES' },
    { id: 'fr', name: 'French', code: 'fr-FR' },
    { id: 'de', name: 'German', code: 'de-DE' },
    { id: 'it', name: 'Italian', code: 'it-IT' },
    { id: 'pt', name: 'Portuguese', code: 'pt-BR' },
    { id: 'ru', name: 'Russian', code: 'ru-RU' },
    { id: 'ja', name: 'Japanese', code: 'ja-JP' },
    { id: 'ko', name: 'Korean', code: 'ko-KR' },
    { id: 'zh', name: 'Chinese', code: 'zh-CN' }
  ];

  return (
    <>
      {/* Accessibility Toolbar */}
      <motion.div
        initial={{ x: 300 }}
        animate={{ x: isOpen ? 0 : 300 }}
        className="fixed right-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-2xl z-50 overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center">
              <Accessibility className="w-6 h-6 mr-2 text-blue-500" />
              Accessibility
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="Close accessibility menu"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>

          {/* Vision Features */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Eye className="w-5 h-5 mr-2 text-blue-500" />
              Vision
            </h3>
            <div className="space-y-3">
              {accessibilityFeatures
                .filter(f => f.category === 'vision')
                .map(feature => (
                  <motion.div
                    key={feature.id}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      {feature.icon}
                      <div>
                        <div className="font-medium">{feature.name}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {feature.description}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => feature.toggle(!feature.enabled)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        feature.enabled ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                      aria-label={`Toggle ${feature.name}`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          feature.enabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </motion.div>
                ))}
            </div>
          </div>

          {/* Color Blindness */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Eye className="w-5 h-5 mr-2 text-green-500" />
              Color Blindness
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {colorBlindOptions.map(option => (
                <motion.button
                  key={option.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setColorBlind(option.id)}
                  className={`p-2 rounded-lg text-sm transition-all ${
                    colorBlind === option.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  title={option.description}
                >
                  {option.name}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Motor Features */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Hand className="w-5 h-5 mr-2 text-purple-500" />
              Motor
            </h3>
            <div className="space-y-3">
              {accessibilityFeatures
                .filter(f => f.category === 'motor')
                .map(feature => (
                  <motion.div
                    key={feature.id}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      {feature.icon}
                      <div>
                        <div className="font-medium">{feature.name}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {feature.description}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => feature.toggle(!feature.enabled)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        feature.enabled ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                      aria-label={`Toggle ${feature.name}`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          feature.enabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </motion.div>
                ))}
            </div>
          </div>

          {/* Cognitive Features */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Brain className="w-5 h-5 mr-2 text-orange-500" />
              Cognitive
            </h3>
            <div className="space-y-3">
              {accessibilityFeatures
                .filter(f => f.category === 'cognitive')
                .map(feature => (
                  <motion.div
                    key={feature.id}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      {feature.icon}
                      <div>
                        <div className="font-medium">{feature.name}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {feature.description}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => feature.toggle(!feature.enabled)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        feature.enabled ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                      aria-label={`Toggle ${feature.name}`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          feature.enabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </motion.div>
                ))}
            </div>
          </div>

          {/* Text Spacing */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Type className="w-5 h-5 mr-2 text-indigo-500" />
              Text Spacing
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Line Height</label>
                <div className="grid grid-cols-2 gap-2">
                  {textSpacingOptions.map(option => (
                    <motion.button
                      key={option.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setLineHeight(option.value)}
                      className={`p-2 rounded-lg text-sm transition-all ${
                        lineHeight === option.value
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {option.name}
                    </motion.button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Letter Spacing</label>
                <div className="grid grid-cols-2 gap-2">
                  {textSpacingOptions.slice(0, 3).map(option => (
                    <motion.button
                      key={option.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setLetterSpacing(option.value)}
                      className={`p-2 rounded-lg text-sm transition-all ${
                        letterSpacing === option.value
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {option.name}
                    </motion.button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Word Spacing</label>
                <div className="grid grid-cols-2 gap-2">
                  {textSpacingOptions.slice(0, 3).map(option => (
                    <motion.button
                      key={option.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setWordSpacing(option.value)}
                      className={`p-2 rounded-lg text-sm transition-all ${
                        wordSpacing === option.value
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {option.name}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Language & Region */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Globe className="w-5 h-5 mr-2 text-cyan-500" />
              Language & Region
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Language</label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full p-2 bg-gray-100 dark:bg-gray-700 rounded-lg"
                >
                  {languages.map(lang => (
                    <option key={lang.id} value={lang.id}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Reset Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setScreenReader(false);
              setHighContrast(false);
              setLargeText(false);
              setReducedMotion(false);
              setKeyboardNav(false);
              setVoiceControl(false);
              setFocusIndicator(true);
              setDyslexiaFont(false);
              setColorBlind('none');
              setLineHeight('normal');
              setLetterSpacing('normal');
              setWordSpacing('normal');
              announce('All accessibility settings reset');
            }}
            className="w-full p-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
          >
            Reset All Settings
          </motion.button>
        </div>
      </motion.div>

      {/* Accessibility Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-6 bottom-6 p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all z-40"
        aria-label="Toggle accessibility menu"
      >
        <Accessibility className="w-6 h-6" />
      </motion.button>

      {/* Screen Reader Announcements */}
      <div
        ref={announcementRef}
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcements.map(announcement => (
          <div key={announcement.id}>
            {announcement.message}
          </div>
        ))}
      </div>

      {/* Focus Indicator */}
      {focusIndicator && currentFocus && (
        <motion.div
          layoutId="focus-indicator"
          className="fixed pointer-events-none border-2 border-blue-500 rounded-lg z-50"
          style={{
            top: currentFocus.offsetTop - 2,
            left: currentFocus.offsetLeft - 2,
            width: currentFocus.offsetWidth + 4,
            height: currentFocus.offsetHeight + 4
          }}
        />
      )}

      {/* SVG Filters for Color Blindness */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="protanopia">
            <feColorMatrix type="matrix" values="0.567, 0.433, 0, 0, 0
                                                0.558, 0.442, 0, 0, 0
                                                0, 0.242, 0.758, 0, 0
                                                0, 0, 0, 1, 0" />
          </filter>
          <filter id="deuteranopia">
            <feColorMatrix type="matrix" values="0.625, 0.375, 0, 0, 0
                                                0.7, 0.3, 0, 0, 0
                                                0, 0.3, 0.7, 0, 0
                                                0, 0, 0, 1, 0" />
          </filter>
          <filter id="tritanopia">
            <feColorMatrix type="matrix" values="0.95, 0.05, 0, 0, 0
                                                0, 0.433, 0.567, 0, 0
                                                0, 0.475, 0.525, 0, 0
                                                0, 0, 0, 1, 0" />
          </filter>
          <filter id="protanomaly">
            <feColorMatrix type="matrix" values="0.817, 0.183, 0, 0, 0
                                                0.333, 0.667, 0, 0, 0
                                                0, 0.125, 0.875, 0, 0
                                                0, 0, 0, 1, 0" />
          </filter>
          <filter id="deuteranomaly">
            <feColorMatrix type="matrix" values="0.8, 0.2, 0, 0, 0
                                                0.258, 0.742, 0, 0, 0
                                                0, 0.142, 0.858, 0, 0
                                                0, 0, 0, 1, 0" />
          </filter>
          <filter id="tritanomaly">
            <feColorMatrix type="matrix" values="0.967, 0.033, 0, 0, 0
                                                0, 0.733, 0.267, 0, 0
                                                0, 0.183, 0.817, 0, 0
                                                0, 0, 0, 1, 0" />
          </filter>
        </defs>
      </svg>
    </>
  );
};

export default AccessibilityHelper;
