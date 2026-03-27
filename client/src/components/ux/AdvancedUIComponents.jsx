import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Palette, 
  Zap,
  Eye,
  EyeOff,
  Sun,
  Moon,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Accessibility,
  Type,
  TextCursor,
  Move,
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
  MoreVertical,
  MoreHorizontal,
  Settings,
  Sliders,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  Battery,
  BatteryCharging,
  Signal,
  SignalLow,
  SignalMedium,
  SignalHigh,
  Globe,
  Languages,
  User,
  Users,
  UserPlus,
  UserMinus,
  Heart,
  Star,
  Bookmark,
  Share2,
  Download,
  Upload,
  RefreshCw,
  RotateCcw,
  Undo,
  Redo,
  Copy,
  Clipboard,
  Scissors,
  Paste,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  Grid,
  List,
  Columns,
  Rows,
  Layout,
  LayoutGrid,
  LayoutList,
  LayoutColumns,
  LayoutRows,
  Layers,
  Package,
  Box,
  Container,
  Database,
  Server,
  Cloud,
  Shield,
  Lock,
  Unlock,
  Key,
  Fingerprint,
  Eye,
  EyeOff,
  Camera,
  CameraOff,
  Mic,
  MicOff,
  Video,
  VideoOff,
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
  Zip,
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

const AdvancedUIComponents = () => {
  const [theme, setTheme] = useState('dark');
  const [fontSize, setFontSize] = useState('medium');
  const [contrast, setContrast] = useState('normal');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [screenReaderMode, setScreenReaderMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [focusVisible, setFocusVisible] = useState(true);
  const [keyboardNavigation, setKeyboardNavigation] = useState(false);
  const [voiceControl, setVoiceControl] = useState(false);
  const [gestureControl, setGestureControl] = useState(false);
  const [deviceType, setDeviceType] = useState('desktop');
  const [orientation, setOrientation] = useState('landscape');
  const [viewport, setViewport] = useState({ width: 1920, height: 1080 });
  const [pixelRatio, setPixelRatio] = useState(1);
  const [colorScheme, setColorScheme] = useState('blue');
  const [layout, setLayout] = useState('grid');
  const [density, setDensity] = useState('comfortable');
  const [animations, setAnimations] = useState(true);
  const [transitions, setTransitions] = useState(true);
  const [hoverEffects, setHoverEffects] = useState(true);
  const [loading, setLoading] = useState(false);
  const [activeComponent, setActiveComponent] = useState('theme');
  const [customSettings, setCustomSettings] = useState({});

  // Motion values for interactive elements
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const scale = useSpring(1);
  const rotate = useSpring(0);
  const backgroundX = useTransform(mouseX, (value) => value / 50);
  const backgroundY = useTransform(mouseY, (value) => value / 50);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight
      });
      setPixelRatio(window.devicePixelRatio || 1);
      
      // Detect device type
      if (window.innerWidth < 768) {
        setDeviceType('mobile');
      } else if (window.innerWidth < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const themes = [
    { id: 'light', name: 'Light', icon: <Sun className="w-5 h-5" />, colors: { primary: '#3b82f6', background: '#ffffff', text: '#000000' } },
    { id: 'dark', name: 'Dark', icon: <Moon className="w-5 h-5" />, colors: { primary: '#60a5fa', background: '#111827', text: '#ffffff' } },
    { id: 'auto', name: 'Auto', icon: <Monitor className="w-5 h-5" />, colors: { primary: '#3b82f6', background: '#ffffff', text: '#000000' } }
  ];

  const fontSizes = [
    { id: 'small', name: 'Small', size: '14px' },
    { id: 'medium', name: 'Medium', size: '16px' },
    { id: 'large', name: 'Large', size: '18px' },
    { id: 'xlarge', name: 'Extra Large', size: '20px' }
  ];

  const colorSchemes = [
    { id: 'blue', name: 'Blue', primary: '#3b82f6', secondary: '#1e40af' },
    { id: 'green', name: 'Green', primary: '#10b981', secondary: '#047857' },
    { id: 'purple', name: 'Purple', primary: '#8b5cf6', secondary: '#6d28d9' },
    { id: 'red', name: 'Red', primary: '#ef4444', secondary: '#dc2626' },
    { id: 'yellow', name: 'Yellow', primary: '#f59e0b', secondary: '#d97706' },
    { id: 'pink', name: 'Pink', primary: '#ec4899', secondary: '#db2777' }
  ];

  const accessibilityFeatures = [
    { id: 'highContrast', name: 'High Contrast', icon: <Eye className="w-5 h-5" />, enabled: highContrast, toggle: setHighContrast },
    { id: 'reducedMotion', name: 'Reduced Motion', icon: <Zap className="w-5 h-5" />, enabled: reducedMotion, toggle: setReducedMotion },
    { id: 'screenReader', name: 'Screen Reader', icon: <Accessibility className="w-5 h-5" />, enabled: screenReaderMode, toggle: setScreenReaderMode },
    { id: 'focusVisible', name: 'Focus Visible', icon: <Eye className="w-5 h-5" />, enabled: focusVisible, toggle: setFocusVisible },
    { id: 'keyboardNav', name: 'Keyboard Navigation', icon: <Type className="w-5 h-5" />, enabled: keyboardNavigation, toggle: setKeyboardNavigation },
    { id: 'voiceControl', name: 'Voice Control', icon: <Mic className="w-5 h-5" />, enabled: voiceControl, toggle: setVoiceControl },
    { id: 'gestureControl', name: 'Gesture Control', icon: <Move className="w-5 h-5" />, enabled: gestureControl, toggle: setGestureControl }
  ];

  const components = [
    { id: 'theme', name: 'Theme', icon: <Palette className="w-5 h-5" /> },
    { id: 'typography', name: 'Typography', icon: <Type className="w-5 h-5" /> },
    { id: 'accessibility', name: 'Accessibility', icon: <Accessibility className="w-5 h-5" /> },
    { id: 'responsive', name: 'Responsive', icon: <Monitor className="w-5 h-5" /> },
    { id: 'interactions', name: 'Interactions', icon: <Zap className="w-5 h-5" /> },
    { id: 'layout', name: 'Layout', icon: <Layout className="w-5 h-5" /> }
  ];

  const getThemeClasses = () => {
    const baseClasses = 'min-h-screen transition-all duration-300';
    const themeClasses = {
      light: 'bg-gray-50 text-gray-900',
      dark: 'bg-gray-900 text-white',
      auto: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    };
    return `${baseClasses} ${themeClasses[theme]}`;
  };

  const getFontSizeClass = () => {
    const sizeClasses = {
      small: 'text-sm',
      medium: 'text-base',
      large: 'text-lg',
      xlarge: 'text-xl'
    };
    return sizeClasses[fontSize];
  };

  const getContrastClass = () => {
    const contrastClasses = {
      normal: '',
      high: 'contrast-125'
    };
    return contrastClasses[contrast];
  };

  return (
    <div className={`${getThemeClasses()} ${getFontSizeClass()} ${getContrastClass()}`}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
            Advanced UI Components
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive UI/UX system with accessibility and responsive design
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
                <Monitor className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium">{deviceType}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Maximize2 className="w-5 h-5 text-green-500" />
                <span className="text-sm">{viewport.width} × {viewport.height}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-purple-500" />
                <span className="text-sm">{pixelRatio}x</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Orientation:</span>
              <span className="text-sm font-medium capitalize">{orientation}</span>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-white dark:bg-gray-800 rounded-lg p-1 shadow-lg">
          {components.map((component) => (
            <button
              key={component.id}
              onClick={() => setActiveComponent(component.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                activeComponent === component.id
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {component.icon}
              <span>{component.name}</span>
            </button>
          ))}
        </div>

        {/* Component Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeComponent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeComponent === 'theme' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                  <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <Palette className="w-6 h-6 mr-2 text-blue-500" />
                    Theme Settings
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {themes.map((themeOption) => (
                      <motion.button
                        key={themeOption.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setTheme(themeOption.id)}
                        className={`p-6 rounded-lg border-2 transition-all ${
                          theme === themeOption.id
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <span className="font-medium">{themeOption.name}</span>
                          {themeOption.icon}
                        </div>
                        <div className="flex space-x-2">
                          <div 
                            className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600"
                            style={{ backgroundColor: themeOption.colors.primary }}
                          />
                          <div 
                            className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600"
                            style={{ backgroundColor: themeOption.colors.background }}
                          />
                          <div 
                            className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600"
                            style={{ backgroundColor: themeOption.colors.text }}
                          />
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                  <h3 className="text-xl font-bold mb-4">Color Schemes</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {colorSchemes.map((scheme) => (
                      <motion.button
                        key={scheme.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setColorScheme(scheme.id)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          colorScheme === scheme.id
                            ? 'border-blue-500 shadow-lg'
                            : 'border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <div className="flex space-x-1">
                            <div 
                              className="w-6 h-6 rounded-full"
                              style={{ backgroundColor: scheme.primary }}
                            />
                            <div 
                              className="w-6 h-6 rounded-full"
                              style={{ backgroundColor: scheme.secondary }}
                            />
                          </div>
                          <span className="text-sm font-medium">{scheme.name}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeComponent === 'typography' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                  <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <Type className="w-6 h-6 mr-2 text-blue-500" />
                    Typography Settings
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {fontSizes.map((size) => (
                      <motion.button
                        key={size.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFontSize(size.id)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          fontSize === size.id
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        <div className="text-center">
                          <div className="font-medium mb-2">{size.name}</div>
                          <div style={{ fontSize: size.size }}>Sample Text</div>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Font Family</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {['Inter', 'Roboto', 'Open Sans', 'Poppins', 'Noto Sans', 'System UI'].map((font) => (
                          <motion.button
                            key={font}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-all"
                            style={{ fontFamily: font }}
                          >
                            <div className="text-center">
                              <div className="font-medium mb-2">{font}</div>
                              <div className="text-sm">The quick brown fox</div>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Text Samples</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <h4 className="text-2xl font-bold mb-2">Heading 2</h4>
                          <p className="text-base leading-relaxed">
                            This is a paragraph of text that demonstrates the typography settings. 
                            It should be readable and well-spaced with appropriate line height and letter spacing.
                          </p>
                        </div>
                        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <h4 className="text-xl font-semibold mb-2">Heading 3</h4>
                          <p className="text-sm leading-relaxed">
                            Smaller text sample with different font size for comparison.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeComponent === 'accessibility' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                  <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <Accessibility className="w-6 h-6 mr-2 text-blue-500" />
                    Accessibility Features
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {accessibilityFeatures.map((feature) => (
                      <motion.div
                        key={feature.id}
                        whileHover={{ scale: 1.02 }}
                        className="p-6 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            {feature.icon}
                            <span className="font-medium">{feature.name}</span>
                          </div>
                          <button
                            onClick={() => feature.toggle(!feature.enabled)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              feature.enabled ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                feature.enabled ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {feature.enabled ? 'Enabled' : 'Disabled'} - {feature.name} helps improve user experience.
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                  <h3 className="text-xl font-bold mb-4">Keyboard Navigation</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all">
                        Focusable Button 1
                      </button>
                      <button className="p-4 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all">
                        Focusable Button 2
                      </button>
                      <button className="p-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all">
                        Focusable Button 3
                      </button>
                      <button className="p-4 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition-all">
                        Focusable Button 4
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Use Tab key to navigate between elements and Enter or Space to activate.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeComponent === 'responsive' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                  <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <Monitor className="w-6 h-6 mr-2 text-blue-500" />
                    Responsive Design
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                      { name: 'Mobile', icon: <Smartphone className="w-8 h-8" />, size: '320px' },
                      { name: 'Tablet', icon: <Tablet className="w-8 h-8" />, size: '768px' },
                      { name: 'Laptop', icon: <Laptop className="w-8 h-8" />, size: '1024px' },
                      { name: 'Desktop', icon: <Monitor className="w-8 h-8" />, size: '1920px' }
                    ].map((device) => (
                      <motion.div
                        key={device.name}
                        whileHover={{ scale: 1.05 }}
                        className="p-6 rounded-lg border-2 border-gray-200 dark:border-gray-700 text-center"
                      >
                        <div className="flex justify-center mb-4 text-blue-500">
                          {device.icon}
                        </div>
                        <div className="font-medium mb-2">{device.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{device.size}</div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Responsive Grid</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                          <motion.div
                            key={item}
                            whileHover={{ scale: 1.05 }}
                            className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg text-center font-medium"
                          >
                            Item {item}
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Flexible Layout</h3>
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 p-4 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                          <div className="font-medium mb-2">Sidebar</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Adapts to screen size
                          </div>
                        </div>
                        <div className="flex-1 md:flex-2 p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                          <div className="font-medium mb-2">Main Content</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Takes remaining space
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeComponent === 'interactions' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                  <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <Zap className="w-6 h-6 mr-2 text-blue-500" />
                    Interactive Elements
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Hover Effects</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {['Scale', 'Rotate', 'Lift'].map((effect, index) => (
                          <motion.button
                            key={effect}
                            whileHover={{ 
                              scale: effect === 'Scale' ? 1.1 : 1,
                              rotate: effect === 'Rotate' ? 5 : 0,
                              y: effect === 'Lift' ? -5 : 0
                            }}
                            className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium"
                          >
                            {effect} Effect
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Loading States</h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                          <span>Spinner Loading</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                          </div>
                          <span>Dots Loading</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                        </div>
                        <span>Progress Loading</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Micro-interactions</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          className="p-4 bg-blue-500 text-white rounded-lg font-medium"
                        >
                          Click Animation
                        </motion.button>
                        <motion.button
                          whileHover={{ x: 5 }}
                          className="p-4 bg-green-500 text-white rounded-lg font-medium"
                        >
                          Slide on Hover
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeComponent === 'layout' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                  <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <Layout className="w-6 h-6 mr-2 text-blue-500" />
                    Layout Systems
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Layout Options</h3>
                      <div className="flex space-x-2 mb-6">
                        {['grid', 'list', 'masonry'].map((layoutOption) => (
                          <button
                            key={layoutOption}
                            onClick={() => setLayout(layoutOption)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${
                              layout === layoutOption
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            {layoutOption.charAt(0).toUpperCase() + layoutOption.slice(1)}
                          </button>
                        ))}
                      </div>

                      <div className={`${
                        layout === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 gap-4' :
                        layout === 'list' ? 'space-y-4' :
                        'columns-1 md:columns-2 lg:columns-3 gap-4'
                      }`}>
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                          <motion.div
                            key={item}
                            whileHover={{ scale: 1.02 }}
                            className={`p-4 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg ${
                              layout === 'list' ? 'flex items-center justify-between' : ''
                            }`}
                            style={layout === 'masonry' ? { breakInside: 'avoid' } : {}}
                          >
                            <div className={layout === 'masonry' ? `h-${(item % 3 + 1) * 20}` : ''}>
                              <div className="font-medium">Item {item}</div>
                              <div className="text-sm opacity-90">
                                {layout === 'grid' ? 'Grid Layout' :
                                 layout === 'list' ? 'List Layout' :
                                 'Masonry Layout'}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Density Settings</h3>
                      <div className="flex space-x-2 mb-6">
                        {['compact', 'comfortable', 'spacious'].map((densityOption) => (
                          <button
                            key={densityOption}
                            onClick={() => setDensity(densityOption)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${
                              density === densityOption
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            {densityOption.charAt(0).toUpperCase() + densityOption.slice(1)}
                          </button>
                        ))}
                      </div>

                      <div className={`space-y-${density === 'compact' ? '2' : density === 'comfortable' ? '4' : '6'}`}>
                        {[1, 2, 3, 4].map((item) => (
                          <motion.div
                            key={item}
                            whileHover={{ scale: 1.02 }}
                            className={`p-${density === 'compact' ? '2' : density === 'comfortable' ? '4' : '6'} bg-gray-100 dark:bg-gray-700 rounded-lg`}
                          >
                            <div className="font-medium">Card {item}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Density: {density}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Floating Action Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-6 right-6 p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ArrowUp className="w-6 h-6" />
        </motion.button>
      </div>
    </div>
  );
};

export default AdvancedUIComponents;
