import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  motion,
  AnimatePresence } from 'framer-motion';
import { 
  Blocks,
  Link,
  Network,
  Shield,
  Wallet,
  CreditCard,
  TrendingUp,
  TrendingDown,
  Activity,
  Zap,
  Globe,
  Lock,
  Unlock,
  Key,
  Fingerprint,
  Hash,
  Database,
  Server,
  Cloud,
  HardDrive,
  Cpu,
  MemoryStick,
  Wifi,
  Settings,
  RefreshCw,
  Plus,
  Minus,
  Eye,
  EyeOff,
  Copy,
  Share2,
  Download,
  Upload,
  Search,
  Filter,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  MoreVertical,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  Clock,
  Calendar,
  MapPin,
  Navigation,
  Compass,
  Target,
  Crosshair,
  Scan,
  ScanLine,
  Barcode,
  QrCode,
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
  Save,
  SaveAs,
  Print,
  Printer,
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

const BlockchainDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [networks, setNetworks] = useState([]);
  const [wallets, setWallets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [tokens, setTokens] = useState([]);
  const [nfts, setNfts] = useState([]);
  const [defi, setDefi] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterNetwork, setFilterNetwork] = useState('all');
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  const [realTimeData, setRealTimeData] = useState({});
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
  const [gasPrice, setGasPrice] = useState(0);
  const [blockHeight, setBlockHeight] = useState(0);
  const [miningDifficulty, setMiningDifficulty] = useState(0);

  useEffect(() => {
    loadBlockchainData();
    const interval = setInterval(() => {
      updateRealTimeData();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadBlockchainData = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setNetworks([
      {
        id: 1,
        name: 'Ethereum Mainnet',
        symbol: 'ETH',
        type: 'mainnet',
        status: 'active',
        blockHeight: 18456789,
        gasPrice: 25,
        hashRate: 850000,
        difficulty: 1523456789012345,
        nodes: 15000,
        validators: 450000,
        totalSupply: 120528389.5,
        marketCap: 245678901234,
        price: 2034.56,
        change24h: 2.34
      },
      {
        id: 2,
        name: 'Polygon',
        symbol: 'MATIC',
        type: 'layer2',
        status: 'active',
        blockHeight: 45678901,
        gasPrice: 30,
        hashRate: 450000,
        difficulty: 123456789012345,
        nodes: 5000,
        validators: 100000,
        totalSupply: 10000000000,
        marketCap: 8901234567,
        price: 0.89,
        change24h: -1.23
      },
      {
        id: 3,
        name: 'Binance Smart Chain',
        symbol: 'BNB',
        type: 'mainnet',
        status: 'active',
        blockHeight: 34567890,
        gasPrice: 5,
        hashRate: 650000,
        difficulty: 987654321098765,
        nodes: 8000,
        validators: 26000,
        totalSupply: 200000000,
        marketCap: 45678901234,
        price: 312.45,
        change24h: 0.67
      }
    ]);

    setWallets([
      {
        id: 1,
        name: 'Main Wallet',
        address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        type: 'hardware',
        provider: 'Ledger',
        balance: 15.234,
        value: 31023.45,
        tokens: 12,
        nfts: 8,
        transactions: 234,
        lastActivity: new Date().toISOString(),
        security: 'high'
      },
      {
        id: 2,
        name: 'Trading Wallet',
        address: '0x8ba1f109551bD432803012645Hac136c',
        type: 'software',
        provider: 'MetaMask',
        balance: 5.678,
        value: 11567.89,
        tokens: 8,
        nfts: 3,
        transactions: 567,
        lastActivity: new Date().toISOString(),
        security: 'medium'
      },
      {
        id: 3,
        name: 'Cold Storage',
        address: '0x3C44CdDdB6a900fa2b585dd299e03d12F4A445e6',
        type: 'cold',
        provider: 'Trezor',
        balance: 45.123,
        value: 91890.12,
        tokens: 5,
        nfts: 15,
        transactions: 89,
        lastActivity: new Date(Date.now() - 86400000).toISOString(),
        security: 'maximum'
      }
    ]);

    setTransactions([
      {
        id: 1,
        hash: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        type: 'send',
        from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        to: '0x8ba1f109551bD432803012645Hac136c',
        amount: 1.5,
        gasUsed: 21000,
        gasPrice: 25,
        status: 'confirmed',
        blockNumber: 18456789,
        timestamp: new Date().toISOString(),
        network: 'Ethereum Mainnet'
      },
      {
        id: 2,
        hash: '0x8ba1f109551bD432803012645Hac136c',
        type: 'receive',
        from: '0x3C44CdDdB6a900fa2b585dd299e03d12F4A445e6',
        to: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        amount: 0.75,
        gasUsed: 21000,
        gasPrice: 25,
        status: 'pending',
        blockNumber: null,
        timestamp: new Date(Date.now() - 300000).toISOString(),
        network: 'Ethereum Mainnet'
      },
      {
        id: 3,
        hash: '0x3C44CdDdB6a900fa2b585dd299e03d12F4A445e6',
        type: 'contract',
        from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        to: '0x8ba1f109551bD432803012645Hac136c',
        amount: 0,
        gasUsed: 150000,
        gasPrice: 30,
        status: 'failed',
        blockNumber: 18456788,
        timestamp: new Date(Date.now() - 600000).toISOString(),
        network: 'Ethereum Mainnet'
      }
    ]);

    setContracts([
      {
        id: 1,
        name: 'ERC20 Token Contract',
        address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        type: 'ERC20',
        standard: 'ERC20',
        verified: true,
        audits: 3,
        totalSupply: 1000000000,
        holders: 125000,
        transactions: 567890,
        created: '2023-01-15',
        network: 'Ethereum Mainnet'
      },
      {
        id: 2,
        name: 'NFT Marketplace',
        address: '0x8ba1f109551bD432803012645Hac136c',
        type: 'ERC721',
        standard: 'ERC721',
        verified: true,
        audits: 2,
        totalSupply: 10000,
        holders: 3456,
        transactions: 12345,
        created: '2023-03-20',
        network: 'Ethereum Mainnet'
      },
      {
        id: 3,
        name: 'DeFi Protocol',
        address: '0x3C44CdDdB6a900fa2b585dd299e03d12F4A445e6',
        type: 'DeFi',
        standard: 'Custom',
        verified: false,
        audits: 0,
        totalSupply: 0,
        holders: 0,
        transactions: 0,
        created: '2023-06-10',
        network: 'Polygon'
      }
    ]);

    setTokens([
      {
        id: 1,
        name: 'USDC',
        symbol: 'USDC',
        type: 'stablecoin',
        balance: 5000,
        value: 5000,
        price: 1.00,
        change24h: 0.01,
        network: 'Ethereum Mainnet',
        contract: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
      },
      {
        id: 2,
        name: 'Chainlink',
        symbol: 'LINK',
        type: 'utility',
        balance: 100,
        value: 1456.78,
        price: 14.56,
        change24h: 3.45,
        network: 'Ethereum Mainnet',
        contract: '0x8ba1f109551bD432803012645Hac136c'
      },
      {
        id: 3,
        name: 'Uniswap',
        symbol: 'UNI',
        type: 'governance',
        balance: 250,
        value: 1234.56,
        price: 4.94,
        change24h: -2.34,
        network: 'Ethereum Mainnet',
        contract: '0x3C44CdDdB6a900fa2b585dd299e03d12F4A445e6'
      }
    ]);

    setNfts([
      {
        id: 1,
        name: 'CryptoPunk #1234',
        collection: 'CryptoPunks',
        tokenId: '1234',
        image: '/images/nft1.jpg',
        owner: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        price: 50.5,
        lastSale: 45.2,
        rarity: 'legendary',
        attributes: {
          background: 'Blue',
          type: 'Alien',
          accessory: '3D Glasses'
        },
        network: 'Ethereum Mainnet'
      },
      {
        id: 2,
        name: 'Bored Ape #5678',
        collection: 'BAYC',
        tokenId: '5678',
        image: '/images/nft2.jpg',
        owner: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        price: 25.3,
        lastSale: 22.1,
        rarity: 'epic',
        attributes: {
          background: 'Orange',
          fur: 'Golden',
          eyes: 'Laser'
        },
        network: 'Ethereum Mainnet'
      },
      {
        id: 3,
        name: 'Azuki #9012',
        collection: 'Azuki',
        tokenId: '9012',
        image: '/images/nft3.jpg',
        owner: '0x8ba1f109551bD432803012645Hac136c',
        price: 15.7,
        lastSale: 12.3,
        rarity: 'rare',
        attributes: {
          background: 'Purple',
          hair: 'Pink',
          clothing: 'Kimono'
        },
        network: 'Polygon'
      }
    ]);

    setDefi([
      {
        id: 1,
        name: 'Aave',
        type: 'lending',
        tvl: 5678901234,
        apy: 4.5,
        deposited: 1000,
        borrowed: 500,
        collateral: 1500,
        network: 'Ethereum Mainnet'
      },
      {
        id: 2,
        name: 'Uniswap',
        type: 'dex',
        tvl: 3456789012,
        apy: 12.3,
        liquidity: 2000,
        fees: 45.67,
        network: 'Ethereum Mainnet'
      },
      {
        id: 3,
        name: 'Compound',
        type: 'lending',
        tvl: 2345678901,
        apy: 3.8,
        deposited: 500,
        borrowed: 200,
        collateral: 700,
        network: 'Polygon'
      }
    ]);

    setLoading(false);
  };

  const updateRealTimeData = () => {
    setRealTimeData({
      totalValueLocked: Math.floor(Math.random() * 1000000000) + 500000000,
      activeValidators: Math.floor(Math.random() * 1000) + 400000,
      pendingTransactions: Math.floor(Math.random() * 5000) + 10000,
      averageGasPrice: Math.floor(Math.random() * 50) + 20,
      networkHashRate: Math.floor(Math.random() * 100000) + 700000,
      blockTime: Math.floor(Math.random() * 5) + 12,
      marketCap: Math.floor(Math.random() * 100000000000) + 200000000000,
      dailyVolume: Math.floor(Math.random() * 1000000000) + 500000000
    });
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
      case 'confirmed':
      case 'verified':
        return 'text-green-400';
      case 'pending':
      case 'warning':
        return 'text-yellow-400';
      case 'failed':
      case 'error':
      case 'inactive':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
      case 'confirmed':
      case 'verified':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
      case 'warning':
        return <AlertTriangle className="w-4 h-4" />;
      case 'failed':
      case 'error':
      case 'inactive':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getSecurityColor = (security) => {
    switch (security) {
      case 'maximum':
        return 'text-purple-400';
      case 'high':
        return 'text-green-400';
      case 'medium':
        return 'text-yellow-400';
      case 'low':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tx.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tx.to.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesNetwork = filterNetwork === 'all' || tx.network === filterNetwork;
    return matchesSearch && matchesNetwork;
  });

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Blocks className="w-4 h-4" /> },
    { id: 'wallets', label: 'Wallets', icon: <Wallet className="w-4 h-4" /> },
    { id: 'transactions', label: 'Transactions', icon: <Activity className="w-4 h-4" /> },
    { id: 'contracts', label: 'Contracts', icon: <FileCode className="w-4 h-4" /> },
    { id: 'tokens', label: 'Tokens', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'nfts', label: 'NFTs', icon: <Package className="w-4 h-4" /> },
    { id: 'defi', label: 'DeFi', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                Blockchain Dashboard
              </h1>
              <p className="text-gray-400 mt-2">Decentralized finance and blockchain analytics</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-green-400">${(realTimeData.marketCap || 0).toLocaleString()}</div>
                <div className="text-sm text-gray-400">Market Cap</div>
              </div>
              <button className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Real-time Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'TVL', value: `$${(realTimeData.totalValueLocked || 0).toLocaleString()}`, icon: <Database className="w-5 h-5" />, color: 'blue' },
            { label: 'Validators', value: (realTimeData.activeValidators || 0).toLocaleString(), icon: <Shield className="w-5 h-5" />, color: 'green' },
            { label: 'Pending TX', value: (realTimeData.pendingTransactions || 0).toLocaleString(), icon: <Activity className="w-5 h-5" />, color: 'yellow' },
            { label: 'Gas Price', value: `${realTimeData.averageGasPrice || 0} Gwei`, icon: <Zap className="w-5 h-5" />, color: 'purple' }
          ].map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gray-800 rounded-lg p-4 border border-gray-700`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gray-400 text-sm">{metric.label}</div>
                  <div className="text-2xl font-bold mt-1">{metric.value}</div>
                </div>
                <div className={`text-${metric.color}-500`}>{metric.icon}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-800 rounded-lg p-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Network Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {networks.map((network) => (
                    <motion.div
                      key={network.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Blocks className="w-6 h-6 text-blue-400" />
                          <div>
                            <h3 className="text-lg font-semibold">{network.name}</h3>
                            <p className="text-gray-400 text-sm">{network.type}</p>
                          </div>
                        </div>
                        <div className={`flex items-center space-x-1 ${getStatusColor(network.status)}`}>
                          {getStatusIcon(network.status)}
                          <span className="text-sm capitalize">{network.status}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Price</span>
                          <span className="font-medium">${network.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">24h Change</span>
                          <span className={`font-medium ${network.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {network.change24h >= 0 ? '+' : ''}{network.change24h}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Gas Price</span>
                          <span className="font-medium">{network.gasPrice} Gwei</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Block Height</span>
                          <span className="font-medium">{network.blockHeight.toLocaleString()}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Quick Stats */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-green-400" />
                    Network Activity
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                      { name: 'Hash Rate', value: `${(realTimeData.networkHashRate || 0).toLocaleString()} TH/s` },
                      { name: 'Block Time', value: `${realTimeData.blockTime || 0}s` },
                      { name: 'Daily Volume', value: `$${(realTimeData.dailyVolume || 0).toLocaleString()}` },
                      { name: 'Validators', value: (realTimeData.activeValidators || 0).toLocaleString() }
                    ].map((stat, index) => (
                      <div key={index} className="bg-gray-700 rounded-lg p-4">
                        <div className="text-gray-400 text-sm">{stat.name}</div>
                        <div className="text-xl font-bold mt-1">{stat.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'wallets' && (
              <div className="space-y-6">
                {wallets.map((wallet) => (
                  <motion.div
                    key={wallet.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Wallet className="w-6 h-6 text-purple-400" />
                        <div>
                          <h3 className="text-lg font-semibold">{wallet.name}</h3>
                          <p className="text-gray-400 text-sm font-mono">{wallet.address}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`text-sm ${getSecurityColor(wallet.security)}`}>
                          {wallet.security.toUpperCase()}
                        </div>
                        <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <div className="text-gray-400 text-sm">Balance</div>
                        <div className="font-medium">{wallet.balance} ETH</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Value</div>
                        <div className="font-medium">${wallet.value.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Tokens</div>
                        <div className="font-medium">{wallet.tokens}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">NFTs</div>
                        <div className="font-medium">{wallet.nfts}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>{wallet.provider} • {wallet.type}</span>
                      <span>{wallet.transactions} transactions</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'transactions' && (
              <div className="space-y-6">
                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search transactions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <select
                    value={filterNetwork}
                    onChange={(e) => setFilterNetwork(e.target.value)}
                    className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="all">All Networks</option>
                    {networks.map(network => (
                      <option key={network.id} value={network.name}>{network.name}</option>
                    ))}
                  </select>
                </div>

                {/* Transactions List */}
                <div className="space-y-4">
                  {filteredTransactions.map((tx) => (
                    <motion.div
                      key={tx.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(tx.status)}
                          <div>
                            <h3 className="text-lg font-semibold font-mono">{tx.hash}</h3>
                            <p className="text-gray-400 text-sm">{tx.network}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{tx.amount} ETH</div>
                          <div className="text-sm text-gray-400">{tx.type}</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <div className="text-gray-400 text-sm">From</div>
                          <div className="font-medium font-mono text-sm">{tx.from.slice(0, 10)}...</div>
                        </div>
                        <div>
                          <div className="text-gray-400 text-sm">To</div>
                          <div className="font-medium font-mono text-sm">{tx.to.slice(0, 10)}...</div>
                        </div>
                        <div>
                          <div className="text-gray-400 text-sm">Gas Used</div>
                          <div className="font-medium">{tx.gasUsed.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-gray-400 text-sm">Gas Price</div>
                          <div className="font-medium">{tx.gasPrice} Gwei</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'contracts' && (
              <div className="space-y-6">
                {contracts.map((contract) => (
                  <motion.div
                    key={contract.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <FileCode className="w-6 h-6 text-orange-400" />
                        <div>
                          <h3 className="text-lg font-semibold">{contract.name}</h3>
                          <p className="text-gray-400 text-sm font-mono">{contract.address}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`flex items-center space-x-1 ${getStatusColor(contract.verified ? 'verified' : 'unverified')}`}>
                          {getStatusIcon(contract.verified ? 'verified' : 'unverified')}
                          <span className="text-sm">{contract.verified ? 'Verified' : 'Unverified'}</span>
                        </div>
                        <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-gray-400 text-sm">Type</div>
                        <div className="font-medium">{contract.type}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Standard</div>
                        <div className="font-medium">{contract.standard}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Audits</div>
                        <div className="font-medium">{contract.audits}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Holders</div>
                        <div className="font-medium">{contract.holders.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Transactions</div>
                        <div className="font-medium">{contract.transactions.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Created</div>
                        <div className="font-medium">{contract.created}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'tokens' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tokens.map((token) => (
                    <motion.div
                      key={token.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{token.name}</h3>
                          <p className="text-gray-400 text-sm">{token.symbol}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">${token.value.toLocaleString()}</div>
                          <div className={`text-sm ${token.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {token.change24h >= 0 ? '+' : ''}{token.change24h}%
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Balance</span>
                          <span className="font-medium">{token.balance.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Price</span>
                          <span className="font-medium">${token.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Type</span>
                          <span className="font-medium capitalize">{token.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Network</span>
                          <span className="font-medium">{token.network}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'nfts' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {nfts.map((nft) => (
                    <motion.div
                      key={nft.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700"
                    >
                      <div className="aspect-square bg-gray-700 flex items-center justify-center">
                        <Package className="w-16 h-16 text-gray-600" />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">{nft.name}</h3>
                        <p className="text-gray-400 text-sm mb-3">{nft.collection}</p>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Price</span>
                            <span className="font-medium">{nft.price} ETH</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Rarity</span>
                            <span className="font-medium capitalize">{nft.rarity}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Network</span>
                            <span className="font-medium">{nft.network}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'defi' && (
              <div className="space-y-6">
                {defi.map((protocol) => (
                  <motion.div
                    key={protocol.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <TrendingUp className="w-6 h-6 text-green-400" />
                        <div>
                          <h3 className="text-lg font-semibold">{protocol.name}</h3>
                          <p className="text-gray-400 text-sm capitalize">{protocol.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{protocol.apy}% APY</div>
                        <div className="text-sm text-gray-400">TVL: ${(protocol.tvl / 1000000000).toFixed(2)}B</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-gray-400 text-sm">TVL</div>
                        <div className="font-medium">${(protocol.tvl / 1000000).toFixed(0)}M</div>
                      </div>
                      {protocol.deposited && (
                        <div>
                          <div className="text-gray-400 text-sm">Deposited</div>
                          <div className="font-medium">${protocol.deposited}</div>
                        </div>
                      )}
                      {protocol.borrowed && (
                        <div>
                          <div className="text-gray-400 text-sm">Borrowed</div>
                          <div className="font-medium">${protocol.borrowed}</div>
                        </div>
                      )}
                      {protocol.liquidity && (
                        <div>
                          <div className="text-gray-400 text-sm">Liquidity</div>
                          <div className="font-medium">${protocol.liquidity}</div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-yellow-400" />
                    Blockchain Analytics
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-700 rounded-lg p-4">
                      <h4 className="text-lg font-medium mb-3">Network Performance</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Average Block Time</span>
                          <span className="font-medium">{realTimeData.blockTime || 0}s</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Hash Rate</span>
                          <span className="font-medium">{(realTimeData.networkHashRate || 0).toLocaleString()} TH/s</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Difficulty</span>
                          <span className="font-medium">{miningDifficulty.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-700 rounded-lg p-4">
                      <h4 className="text-lg font-medium mb-3">Market Metrics</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Market Cap</span>
                          <span className="font-medium">${(realTimeData.marketCap || 0).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">24h Volume</span>
                          <span className="font-medium">${(realTimeData.dailyVolume || 0).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Active Validators</span>
                          <span className="font-medium">{(realTimeData.activeValidators || 0).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BlockchainDashboard;
