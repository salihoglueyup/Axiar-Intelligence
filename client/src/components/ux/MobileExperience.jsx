import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Smartphone,
  Tablet,
  Laptop,
  Monitor,
  Wifi,
  WifiOff,
  Battery,
  BatteryCharging,
  Signal,
  SignalLow,
  SignalMedium,
  SignalHigh,
  Navigation,
  MapPin,
  Compass,
  Map,
  Globe,
  Cloud,
  CloudDownload,
  CloudUpload,
  CloudOff,
  Download,
  Upload,
  RefreshCw,
  RotateCw,
  Maximize2,
  Minimize2,
  Expand,
  Shrink,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Move,
  Hand,
  Touch,
  Swipe,
  Pinch,
  ZoomIn,
  ZoomOut,
  RotateCw,
  RotateCcw,
  Volume2,
  VolumeX,
  Volume1,
  Volume,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Camera,
  CameraOff,
  Phone,
  PhoneOff,
  MessageSquare,
  MessageCircle,
  Mail,
  MailOpen,
  Send,
  Paperclip,
  File,
  FileText,
  FileImage,
  FileVideo,
  FileAudio,
  FileCode,
  Folder,
  FolderOpen,
  Archive,
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

const MobileExperience = () => {
  const [deviceInfo, setDeviceInfo] = useState({
    type: 'mobile',
    orientation: 'portrait',
    viewport: { width: 375, height: 812 },
    pixelRatio: 2,
    platform: 'iOS',
    version: '15.0',
    model: 'iPhone 12',
    battery: 85,
    charging: false,
    wifi: true,
    signal: 4,
    location: { enabled: true, accuracy: 10 },
    camera: { available: true, permission: 'granted' },
    microphone: { available: true, permission: 'granted' },
    notifications: { enabled: true, permission: 'granted' },
    storage: { total: 128, used: 64, available: 64 },
    memory: { total: 6, used: 3.2, available: 2.8 },
    network: { type: 'wifi', speed: 50, latency: 20 }
  });

  const [touchGestures, setTouchGestures] = useState({
    enabled: true,
    swipe: true,
    pinch: true,
    rotate: true,
    longPress: true,
    doubleTap: true,
    drag: true
  });

  const [responsiveMode, setResponsiveMode] = useState('mobile');
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showNavigationBar, setShowNavigationBar] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [screenReader, setScreenReader] = useState(false);

  const [activeDemo, setActiveDemo] = useState('home');
  const [notifications, setNotifications] = useState([]);
  const [appState, setAppState] = useState('active');
  const [onlineStatus, setOnlineStatus] = useState(true);
  const [syncStatus, setSyncStatus] = useState('synced');

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchStartTime = useRef(0);
  const lastTap = useRef(0);

  useEffect(() => {
    // Detect device type and capabilities
    detectDeviceCapabilities();
    
    // Add event listeners for mobile features
    window.addEventListener('online', () => setOnlineStatus(true));
    window.addEventListener('offline', () => setOnlineStatus(false));
    window.addEventListener('devicemotion', handleDeviceMotion);
    window.addEventListener('deviceorientation', handleDeviceOrientation);
    
    // Request permissions
    requestPermissions();
    
    return () => {
      window.removeEventListener('online', () => setOnlineStatus(true));
      window.removeEventListener('offline', () => setOnlineStatus(false));
      window.removeEventListener('devicemotion', handleDeviceMotion);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, []);

  const detectDeviceCapabilities = () => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTablet = /iPad|Android/i.test(navigator.userAgent) && window.innerWidth > 768;
    
    setDeviceInfo(prev => ({
      ...prev,
      type: isTablet ? 'tablet' : isMobile ? 'mobile' : 'desktop',
      viewport: { width: window.innerWidth, height: window.innerHeight },
      pixelRatio: window.devicePixelRatio || 1,
      platform: navigator.platform || 'Unknown',
      battery: 'getBattery' in navigator ? prev.battery : null,
      camera: 'mediaDevices' in navigator ? prev.camera : null,
      microphone: 'mediaDevices' in navigator ? prev.microphone : null,
      notifications: 'Notification' in window ? prev.notifications : null,
      location: 'geolocation' in navigator ? prev.location : null
    }));
  };

  const requestPermissions = async () => {
    // Camera permission
    if ('mediaDevices' in navigator) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        stream.getTracks().forEach(track => track.stop());
        setDeviceInfo(prev => ({
          ...prev,
          camera: { ...prev.camera, permission: 'granted' }
        }));
      } catch (error) {
        setDeviceInfo(prev => ({
          ...prev,
          camera: { ...prev.camera, permission: 'denied' }
        }));
      }
    }

    // Microphone permission
    if ('mediaDevices' in navigator) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop());
        setDeviceInfo(prev => ({
          ...prev,
          microphone: { ...prev.microphone, permission: 'granted' }
        }));
      } catch (error) {
        setDeviceInfo(prev => ({
          ...prev,
          microphone: { ...prev.microphone, permission: 'denied' }
        }));
      }
    }

    // Notification permission
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setDeviceInfo(prev => ({
        ...prev,
        notifications: { ...prev.notifications, permission }
      }));
    }

    // Location permission
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setDeviceInfo(prev => ({
            ...prev,
            location: { ...prev.location, permission: 'granted' }
          }));
        },
        () => {
          setDeviceInfo(prev => ({
            ...prev,
            location: { ...prev.location, permission: 'denied' }
          }));
        }
      );
    }

    // Battery API
    if ('getBattery' in navigator) {
      try {
        const battery = await navigator.getBattery();
        setDeviceInfo(prev => ({
          ...prev,
          battery: Math.round(battery.level * 100),
          charging: battery.charging
        }));
      } catch (error) {
        console.log('Battery API not available');
      }
    }
  };

  const handleDeviceMotion = (event) => {
    // Handle device motion for gestures
    const acceleration = event.accelerationIncludingGravity;
    if (acceleration) {
      // Detect shake gesture
      const shakeThreshold = 15;
      if (Math.abs(acceleration.x || 0) > shakeThreshold ||
          Math.abs(acceleration.y || 0) > shakeThreshold ||
          Math.abs(acceleration.z || 0) > shakeThreshold) {
        handleShakeGesture();
      }
    }
  };

  const handleDeviceOrientation = (event) => {
    // Handle device orientation
    const { alpha, beta, gamma } = event;
    setDeviceInfo(prev => ({
      ...prev,
      orientation: {
        alpha: Math.round(alpha || 0),
        beta: Math.round(beta || 0),
        gamma: Math.round(gamma || 0)
      }
    }));
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
    touchStartTime.current = Date.now();
  };

  const handleTouchEnd = (e) => {
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartX.current;
    const deltaY = touch.clientY - touchStartY.current;
    const deltaTime = Date.now() - touchStartTime.current;

    // Detect swipe
    if (Math.abs(deltaX) > 50 && deltaTime < 300) {
      if (deltaX > 0) {
        handleSwipe('right');
      } else {
        handleSwipe('left');
      }
    }

    if (Math.abs(deltaY) > 50 && deltaTime < 300) {
      if (deltaY > 0) {
        handleSwipe('down');
      } else {
        handleSwipe('up');
      }
    }

    // Detect double tap
    const currentTime = Date.now();
    if (currentTime - lastTap.current < 300) {
      handleDoubleTap();
    }
    lastTap.current = currentTime;
  };

  const handleSwipe = (direction) => {
    if (!touchGestures.swipe) return;
    
    // Handle swipe navigation
    switch (direction) {
      case 'left':
        // Navigate to next screen
        break;
      case 'right':
        // Navigate to previous screen
        break;
      case 'up':
        // Scroll up or open details
        break;
      case 'down':
        // Scroll down or close modal
        break;
    }
  };

  const handleDoubleTap = () => {
    if (!touchGestures.doubleTap) return;
    
    // Handle double tap action (zoom, like, etc.)
    console.log('Double tap detected');
  };

  const handleShakeGesture = () => {
    // Handle shake gesture (undo, refresh, etc.)
    console.log('Shake detected');
  };

  const sendNotification = (title, body, icon = null) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification(title, {
        body,
        icon: icon || '/favicon.ico',
        badge: '/favicon.ico',
        tag: 'mobile-app',
        renotify: true,
        requireInteraction: false
      });

      setNotifications(prev => [...prev, { id: Date.now(), title, body, timestamp: new Date() }]);
      
      setTimeout(() => {
        notification.close();
      }, 5000);
    }
  };

  const vibrate = (pattern) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  };

  const shareContent = async (title, text, url) => {
    if ('share' in navigator) {
      try {
        await navigator.share({ title, text, url });
      } catch (error) {
        console.log('Share cancelled or failed');
      }
    }
  };

  const deviceFrames = {
    mobile: {
      width: 375,
      height: 812,
      borderRadius: 40,
      statusBar: 44,
      navigationBar: 83
    },
    tablet: {
      width: 768,
      height: 1024,
      borderRadius: 20,
      statusBar: 24,
      navigationBar: 0
    },
    desktop: {
      width: 1920,
      height: 1080,
      borderRadius: 0,
      statusBar: 0,
      navigationBar: 0
    }
  };

  const currentFrame = deviceFrames[responsiveMode];

  const demos = [
    { id: 'home', name: 'Home', icon: <Smartphone className="w-5 h-5" /> },
    { id: 'camera', name: 'Camera', icon: <Camera className="w-5 h-5" /> },
    { id: 'maps', name: 'Maps', icon: <Map className="w-5 h-5" /> },
    { id: 'messages', name: 'Messages', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'settings', name: 'Settings', icon: <Settings className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
            Mobile Experience
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Advanced mobile UI/UX with touch gestures and device integration
          </p>
        </motion.div>

        {/* Device Info Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Smartphone className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium">{deviceInfo.type}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Maximize2 className="w-5 h-5 text-green-500" />
                <span className="text-sm">{deviceInfo.viewport.width} × {deviceInfo.viewport.height}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-purple-500" />
                <span className="text-sm">{deviceInfo.pixelRatio}x</span>
              </div>
              <div className="flex items-center space-x-2">
                <Battery className="w-5 h-5 text-yellow-500" />
                <span className="text-sm">{deviceInfo.battery}%</span>
              </div>
              <div className="flex items-center space-x-2">
                {onlineStatus ? (
                  <Wifi className="w-5 h-5 text-green-500" />
                ) : (
                  <WifiOff className="w-5 h-5 text-red-500" />
                )}
                <span className="text-sm">{onlineStatus ? 'Online' : 'Offline'}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Platform:</span>
              <span className="text-sm font-medium">{deviceInfo.platform}</span>
            </div>
          </div>
        </motion.div>

        {/* Responsive Mode Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex space-x-2">
            {Object.keys(deviceFrames).map((mode) => (
              <button
                key={mode}
                onClick={() => setResponsiveMode(mode)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  responsiveMode === mode
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Mobile Device Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center"
        >
          <div
            className="relative bg-black dark:bg-gray-900 shadow-2xl overflow-hidden"
            style={{
              width: currentFrame.width,
              height: currentFrame.height,
              borderRadius: currentFrame.borderRadius,
              transform: 'scale(0.8)',
              transformOrigin: 'top center'
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Status Bar */}
            {showStatusBar && (
              <div className="absolute top-0 left-0 right-0 bg-black dark:bg-gray-900 text-white z-50">
                <div className="flex items-center justify-between px-6 py-2 text-xs">
                  <span className="font-medium">9:41</span>
                  <div className="flex items-center space-x-1">
                    <Signal className="w-3 h-3" />
                    <Wifi className="w-3 h-3" />
                    <Battery className="w-3 h-3" />
                  </div>
                </div>
              </div>
            )}

            {/* App Content */}
            <div
              className="bg-white dark:bg-gray-800 overflow-y-auto"
              style={{
                height: currentFrame.height - (showStatusBar ? currentFrame.statusBar : 0) - (showNavigationBar ? currentFrame.navigationBar : 0),
                marginTop: showStatusBar ? currentFrame.statusBar : 0
              }}
            >
              {/* Demo Content */}
              <div className="p-4">
                <AnimatePresence mode="wait">
                  {activeDemo === 'home' && (
                    <motion.div
                      key="home"
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="space-y-4"
                    >
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Home</h2>
                      
                      {/* App Grid */}
                      <div className="grid grid-cols-4 gap-4">
                        {demos.map((demo) => (
                          <motion.button
                            key={demo.id}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setActiveDemo(demo.id)}
                            className="flex flex-col items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg"
                          >
                            <div className="text-blue-500 mb-2">{demo.icon}</div>
                            <span className="text-xs text-gray-700 dark:text-gray-300">{demo.name}</span>
                          </motion.button>
                        ))}
                      </div>

                      {/* Quick Actions */}
                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Actions</h3>
                        <div className="space-y-2">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => sendNotification('Test Notification', 'This is a test notification from the mobile experience demo')}
                            className="w-full p-3 bg-blue-500 text-white rounded-lg text-left"
                          >
                            Send Notification
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => vibrate([200, 100, 200])}
                            className="w-full p-3 bg-green-500 text-white rounded-lg text-left"
                          >
                            Vibrate Device
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => shareContent('Mobile Experience', 'Check out this mobile UI demo', window.location.href)}
                            className="w-full p-3 bg-purple-500 text-white rounded-lg text-left"
                          >
                            Share Content
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeDemo === 'camera' && (
                    <motion.div
                      key="camera"
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="space-y-4"
                    >
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Camera</h2>
                      
                      <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center">
                        <Camera className="w-16 h-16 text-gray-600" />
                      </div>
                      
                      <div className="flex justify-center space-x-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-4 bg-white dark:bg-gray-700 rounded-full"
                        >
                          <Camera className="w-6 h-6" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-4 bg-white dark:bg-gray-700 rounded-full"
                        >
                          <Video className="w-6 h-6" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-4 bg-white dark:bg-gray-700 rounded-full"
                        >
                          <ImageIcon className="w-6 h-6" />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {activeDemo === 'maps' && (
                    <motion.div
                      key="maps"
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="space-y-4"
                    >
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Maps</h2>
                      
                      <div className="bg-gray-200 dark:bg-gray-700 rounded-lg aspect-video flex items-center justify-center">
                        <Map className="w-16 h-16 text-gray-400" />
                      </div>
                      
                      <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-5 h-5 text-red-500" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Current Location</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeDemo === 'messages' && (
                    <motion.div
                      key="messages"
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="space-y-4"
                    >
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Messages</h2>
                      
                      <div className="space-y-3">
                        {[
                          { name: 'John Doe', message: 'Hey, how are you?', time: '2m ago', unread: true },
                          { name: 'Jane Smith', message: 'See you tomorrow!', time: '1h ago', unread: false },
                          { name: 'Bob Johnson', message: 'Thanks for the help', time: '3h ago', unread: false }
                        ].map((chat, index) => (
                          <motion.div
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            className="p-3 bg-white dark:bg-gray-700 rounded-lg"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-gray-900 dark:text-white">{chat.name}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">{chat.message}</div>
                              </div>
                              <div className="text-right">
                                <div className="text-xs text-gray-500">{chat.time}</div>
                                {chat.unread && <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeDemo === 'settings' && (
                    <motion.div
                      key="settings"
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="space-y-4"
                    >
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
                      
                      <div className="space-y-3">
                        <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-900 dark:text-white">Dark Mode</span>
                            <button
                              onClick={() => setDarkMode(!darkMode)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                darkMode ? 'bg-blue-500' : 'bg-gray-300'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  darkMode ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                        </div>
                        
                        <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-900 dark:text-white">Notifications</span>
                            <button className="text-gray-400">
                              <ChevronRight className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-900 dark:text-white">Privacy</span>
                            <button className="text-gray-400">
                              <ChevronRight className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Navigation Bar */}
            {showNavigationBar && currentFrame.navigationBar > 0 && (
              <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-around py-2">
                  {demos.slice(0, 4).map((demo) => (
                    <motion.button
                      key={demo.id}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setActiveDemo(demo.id)}
                      className={`flex flex-col items-center p-2 ${
                        activeDemo === demo.id ? 'text-blue-500' : 'text-gray-400'
                      }`}
                    >
                      {demo.icon}
                      <span className="text-xs mt-1">{demo.name}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Touch Gestures Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
        >
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <Touch className="w-6 h-6 mr-2 text-blue-500" />
            Touch Gestures
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(touchGestures).map(([gesture, enabled]) => (
              <motion.div
                key={gesture}
                whileHover={{ scale: 1.02 }}
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium capitalize">{gesture.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <button
                    onClick={() => setTouchGestures(prev => ({ ...prev, [gesture]: !prev[gesture] }))}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      enabled ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                        enabled ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {enabled ? 'Enabled' : 'Disabled'}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Device Capabilities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
        >
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <Smartphone className="w-6 h-6 mr-2 text-green-500" />
            Device Capabilities
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <Camera className="w-5 h-5 text-blue-500" />
                <span className="font-medium">Camera</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {deviceInfo.camera?.available ? 'Available' : 'Not Available'} • 
                {deviceInfo.camera?.permission || 'Unknown'}
              </p>
            </div>
            
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <Mic className="w-5 h-5 text-green-500" />
                <span className="font-medium">Microphone</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {deviceInfo.microphone?.available ? 'Available' : 'Not Available'} • 
                {deviceInfo.microphone?.permission || 'Unknown'}
              </p>
            </div>
            
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <MapPin className="w-5 h-5 text-red-500" />
                <span className="font-medium">Location</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {deviceInfo.location?.enabled ? 'Enabled' : 'Disabled'} • 
                {deviceInfo.location?.permission || 'Unknown'}
              </p>
            </div>
            
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <Battery className="w-5 h-5 text-yellow-500" />
                <span className="font-medium">Battery</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {deviceInfo.battery !== null ? `${deviceInfo.battery}% • ${deviceInfo.charging ? 'Charging' : 'Not Charging'}` : 'Not Available'}
              </p>
            </div>
            
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <Wifi className="w-5 h-5 text-purple-500" />
                <span className="font-medium">Network</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {deviceInfo.network?.type || 'Unknown'} • 
                {deviceInfo.network?.speed ? `${deviceInfo.network.speed} Mbps` : ''}
              </p>
            </div>
            
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <HardDrive className="w-5 h-5 text-orange-500" />
                <span className="font-medium">Storage</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {deviceInfo.storage?.used ? `${deviceInfo.storage.used}GB used of ${deviceInfo.storage.total}GB` : 'Not Available'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MobileExperience;
