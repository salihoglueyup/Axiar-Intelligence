import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Info, 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  EyeOff, 
  Lock, 
  Unlock, 
  Key, 
  Database, 
  Server, 
  Cloud, 
  Globe, 
  Wifi, 
  Users, 
  UserCheck, 
  UserX, 
  Clock, 
  Calendar, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  RefreshCw, 
  Settings, 
  Bell, 
  Mail, 
  MessageSquare, 
  FileText, 
  BarChart3, 
  LineChart, 
  PieChart, 
  Map, 
  Target, 
  Zap, 
  Cpu, 
  HardDrive, 
  MemoryStick, 
  Thermometer, 
  Wind, 
  Sun, 
  Moon, 
  CloudRain, 
  CloudSnow, 
  Bolt, 
  Power, 
  Gauge, 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  ArrowUp, 
  ArrowDown, 
  ArrowRight, 
  ArrowLeft, 
  ChevronUp, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  MoreVertical, 
  MoreHorizontal, 
  Expand, 
  Shrink, 
  Fullscreen, 
  Minimize, 
  Monitor, 
  Smartphone, 
  Tablet, 
  Laptop, 
  Router, 
  Network, 
  Cable, 
  Satellite, 
  Radio, 
  Signal, 
  WifiOff, 
  WifiOn, 
  Ethernet, 
  Usb, 
  Bluetooth, 
  BluetoothOff, 
  Nfc, 
  QrCode, 
  Fingerprint, 
  User, 
  UserPlus, 
  UserMinus, 
  Users, 
  Users2, 
  UserCheck, 
  UserX, 
  Shield, 
  ShieldCheck, 
  ShieldX, 
  ShieldAlert, 
  ShieldOff, 
  Lock, 
  Unlock, 
  Key, 
  KeyRound, 
  KeySquare, 
  Keyhole, 
  Password, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  AlertTriangle, 
  AlertOctagon, 
  AlertOctagon, 
  Info, 
  HelpCircle, 
  CheckCircle, 
  XCircle, 
  CheckSquare, 
  Square, 
  Circle, 
  Triangle, 
  Pentagon, 
  Hexagon, 
  Star, 
  Heart, 
  Zap, 
  ZapOff, 
  ZapOn, 
  Battery, 
  BatteryLow, 
  BatteryMedium, 
  BatteryFull, 
  BatteryCharging, 
  Cpu, 
  Cpu2, 
  HardDrive, 
  HardDrive2, 
  MemoryStick, 
  MemoryStick2, 
  SdCard, 
  SdCard2, 
  Usb, 
  Usb2, 
  Ethernet, 
  Ethernet2, 
  Wifi, 
  Wifi2, 
  Router, 
  Router2, 
  Server, 
  Server2, 
  Cloud, 
  Cloud2, 
  Cloud3, 
  Cloud4, 
  Cloud5, 
  Cloud6, 
  Cloud7, 
  Cloud8, 
  Cloud9, 
  Cloud10, 
  Cloud11, 
  Cloud12, 
  Cloud13, 
  Cloud14, 
  Cloud15, 
  Cloud16, 
  Cloud17, 
  Cloud18, 
  Cloud19, 
  Cloud20,
  Plus,
  Edit,
  Trash2,
  Copy,
  Share,
  Play,
  Pause,
  Globe,
  MapPin,
  Navigation,
  Compass,
  Map,
  Satellite,
  Radar,
  Scan,
  Search,
  Filter,
  SortAsc,
  SortDesc
} from 'lucide-react';

const ThreatIntelligence = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [threatFeeds, setThreatFeeds] = useState([]);
  const [indicators, setIndicators] = useState([]);
  const [actors, setActors] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [selectedThreat, setSelectedThreat] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'feeds', label: 'Threat Feeds', icon: Globe },
    { id: 'indicators', label: 'Indicators', icon: Target },
    { id: 'actors', label: 'Threat Actors', icon: Users },
    { id: 'campaigns', label: 'Campaigns', icon: Shield },
    { id: 'vulnerabilities', label: 'Vulnerabilities', icon: AlertTriangle }
  ];

  const threatTypes = {
    apt: { label: 'Advanced Persistent Threat', color: 'red', icon: Shield },
    malware: { label: 'Malware', color: 'orange', icon: AlertTriangle },
    phishing: { label: 'Phishing', color: 'yellow', icon: Eye },
    ddos: { label: 'DDoS', color: 'blue', icon: WifiOff },
    data_breach: { label: 'Data Breach', color: 'purple', icon: Database },
    social_engineering: { label: 'Social Engineering', color: 'pink', icon: Users },
    supply_chain: { label: 'Supply Chain', color: 'indigo', icon: Package },
    insider_threat: { label: 'Insider Threat', color: 'gray', icon: UserX }
  };

  const indicatorTypes = {
    ip: { label: 'IP Address', icon: Globe },
    domain: { label: 'Domain', icon: Globe },
    url: { label: 'URL', icon: Link },
    hash: { label: 'File Hash', icon: FileText },
    email: { label: 'Email', icon: Mail },
    certificate: { label: 'Certificate', icon: Shield },
    registry: { label: 'Registry', icon: Database },
    mutex: { label: 'Mutex', icon: Lock }
  };

  const actorTypes = {
    state_sponsored: { label: 'State Sponsored', color: 'red', icon: Shield },
    cybercrime: { label: 'Cybercrime', color: 'orange', icon: AlertTriangle },
    hacktivist: { label: 'Hacktivist', color: 'yellow', icon: Users },
    insider: { label: 'Insider', color: 'blue', icon: UserX },
    terrorist: { label: 'Terrorist', color: 'purple', icon: AlertOctagon },
    unknown: { label: 'Unknown', color: 'gray', icon: HelpCircle }
  };

  useEffect(() => {
    loadThreatFeeds();
    loadIndicators();
    loadActors();
    loadCampaigns();
    loadVulnerabilities();
  }, []);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        loadThreatFeeds();
        loadIndicators();
        loadActors();
        loadCampaigns();
        loadVulnerabilities();
      }, 60000); // Refresh every minute

      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const loadThreatFeeds = async () => {
    // Mock data - replace with actual API call
    const mockThreatFeeds = [
      {
        id: 'feed_1',
        name: 'MISP Community Feed',
        type: 'misp',
        description: 'Malware Information Sharing Platform & Threat Sharing',
        status: 'active',
        lastUpdated: '2024-03-23T14:30:00Z',
        indicatorsCount: 15420,
        confidence: 0.92,
        source: 'misp.org',
        category: 'malware',
        tags: ['malware', 'ioc', 'community'],
        reliability: 'high',
        tlp: 'white',
        pollingInterval: 300
      },
      {
        id: 'feed_2',
        name: 'AlienVault OTX',
        type: 'otx',
        description: 'Open Threat Exchange platform',
        status: 'active',
        lastUpdated: '2024-03-23T13:45:00Z',
        indicatorsCount: 28930,
        confidence: 0.88,
        source: 'otx.alienvault.com',
        category: 'general',
        tags: ['ioc', 'reputation', 'community'],
        reliability: 'high',
        tlp: 'white',
        pollingInterval: 600
      },
      {
        id: 'feed_3',
        name: 'VirusTotal Intelligence',
        type: 'virustotal',
        description: 'VirusTotal threat intelligence feed',
        status: 'active',
        lastUpdated: '2024-03-23T12:15:00Z',
        indicatorsCount: 45670,
        confidence: 0.95,
        source: 'virustotal.com',
        category: 'malware',
        tags: ['malware', 'reputation', 'sandbox'],
        reliability: 'high',
        tlp: 'white',
        pollingInterval: 900
      },
      {
        id: 'feed_4',
        name: 'CrowdStrike Falcon',
        type: 'crowdstrike',
        description: 'CrowdStrike threat intelligence feed',
        status: 'active',
        lastUpdated: '2024-03-23T11:30:00Z',
        indicatorsCount: 12450,
        confidence: 0.91,
        source: 'crowdstrike.com',
        category: 'apt',
        tags: ['apt', 'malware', 'campaign'],
        reliability: 'high',
        tlp: 'amber',
        pollingInterval: 300
      },
      {
        id: 'feed_5',
        name: 'PhishTank',
        type: 'phishtank',
        description: 'Phishing feed verification system',
        status: 'active',
        lastUpdated: '2024-03-23T10:00:00Z',
        indicatorsCount: 8920,
        confidence: 0.85,
        source: 'phishtank.com',
        category: 'phishing',
        tags: ['phishing', 'url', 'verification'],
        reliability: 'medium',
        tlp: 'white',
        pollingInterval: 1800
      }
    ];
    
    setThreatFeeds(mockThreatFeeds);
  };

  const loadIndicators = async () => {
    // Mock data - replace with actual API call
    const mockIndicators = [
      {
        id: 'ioc_1',
        type: 'ip',
        value: '203.0.113.1',
        description: 'Known malicious IP address',
        confidence: 0.95,
        severity: 'high',
        firstSeen: '2024-03-20T10:00:00Z',
        lastSeen: '2024-03-23T14:30:00Z',
        source: 'misp_feed',
        tags: ['malware', 'c2', 'apt'],
        context: {
          country: 'CN',
          asn: 'AS12345',
          organization: 'Malicious Hosting',
          reputation: 'malicious'
        },
        relatedThreats: ['apt_1', 'malware_1'],
        tlp: 'white',
        active: true
      },
      {
        id: 'ioc_2',
        type: 'domain',
        value: 'malicious.example.com',
        description: 'C2 domain for malware campaign',
        confidence: 0.92,
        severity: 'high',
        firstSeen: '2024-03-18T15:30:00Z',
        lastSeen: '2024-03-23T09:15:00Z',
        source: 'otx_feed',
        tags: ['c2', 'malware', 'phishing'],
        context: {
          registrar: 'GoDaddy',
          created: '2024-03-15',
          expires: '2025-03-15',
          dnsRecords: ['A', 'MX', 'NS']
        },
        relatedThreats: ['malware_2', 'phishing_1'],
        tlp: 'white',
        active: true
      },
      {
        id: 'ioc_3',
        type: 'hash',
        value: 'a1b2c3d4e5f6789012345678901234567890abcdef',
        description: 'Trojan downloader hash',
        confidence: 0.98,
        severity: 'critical',
        firstSeen: '2024-03-15T08:00:00Z',
        lastSeen: '2024-03-22T16:45:00Z',
        source: 'virustotal_feed',
        tags: ['trojan', 'downloader', 'malware'],
        context: {
          fileType: 'PE32',
          fileSize: '2.3 MB',
          fileName: 'installer.exe',
          detectedBy: 45,
          positives: 43
        },
        relatedThreats: ['malware_1', 'apt_1'],
        tlp: 'white',
        active: true
      },
      {
        id: 'ioc_4',
        type: 'url',
        value: 'https://phishing.example.com/login',
        description: 'Phishing URL targeting banking customers',
        confidence: 0.88,
        severity: 'medium',
        firstSeen: '2024-03-22T11:20:00Z',
        lastSeen: '2024-03-23T13:30:00Z',
        source: 'phishtank_feed',
        tags: ['phishing', 'banking', 'credential_theft'],
        context: {
          target: 'Bank of Example',
          method: 'Credential harvesting',
          ssl: true,
          hosted: 'Cloudflare'
        },
        relatedThreats: ['phishing_1', 'cybercrime_1'],
        tlp: 'white',
        active: true
      },
      {
        id: 'ioc_5',
        type: 'email',
        value: 'suspicious@malicious.com',
        description: 'Email address used in spear phishing campaign',
        confidence: 0.85,
        severity: 'medium',
        firstSeen: '2024-03-21T14:00:00Z',
        lastSeen: '2024-03-23T10:45:00Z',
        source: 'misp_feed',
        tags: ['phishing', 'spear_phishing', 'email'],
        context: {
          domain: 'malicious.com',
          provider: 'Gmail',
          reputation: 'suspicious',
          firstSeen: '2024-03-21'
        },
        relatedThreats: ['phishing_2', 'apt_2'],
        tlp: 'amber',
        active: true
      }
    ];
    
    setIndicators(mockIndicators);
  };

  const loadActors = async () => {
    // Mock data - replace with actual API call
    const mockActors = [
      {
        id: 'actor_1',
        name: 'APT29 (Cozy Bear)',
        type: 'state_sponsored',
        description: 'Russian state-sponsored threat group targeting diplomatic and government organizations',
        country: 'RU',
        firstSeen: '2008-01-01',
        lastSeen: '2024-03-23',
        confidence: 0.95,
        sophistication: 'advanced',
        motivation: 'espionage',
        capabilities: ['zero_day_exploits', 'custom_malware', 'social_engineering'],
        targets: ['government', 'diplomatic', 'think_tanks'],
        techniques: [
          'Spearphishing Attachment',
          'PowerShell',
          'Scheduled Task',
          'Data Staged',
          'Data Encrypted'
        ],
        indicators: 125,
        campaigns: 8,
        aliases: ['Cozy Bear', 'The Dukes', 'Yttrium'],
        attribution: 'high',
        tags: ['apt', 'russia', 'espionage']
      },
      {
        id: 'actor_2',
        name: 'APT28 (Fancy Bear)',
        type: 'state_sponsored',
        description: 'Russian military-affiliated threat group targeting government and military organizations',
        country: 'RU',
        firstSeen: '2007-01-01',
        lastSeen: '2024-03-22',
        confidence: 0.93,
        sophistication: 'advanced',
        motivation: 'espionage',
        capabilities: ['zero_day_exploits', 'custom_malware', 'watering_hole'],
        targets: ['government', 'military', 'defense'],
        techniques: [
          'Spearphishing Link',
          'Exploit for Privilege Escalation',
          'Valid Accounts',
          'Data from Local System'
        ],
        indicators: 189,
        campaigns: 12,
        aliases: ['Fancy Bear', 'Sofacy', 'Pawn Storm'],
        attribution: 'high',
        tags: ['apt', 'russia', 'military']
      },
      {
        id: 'actor_3',
        name: 'Lazarus Group',
        type: 'state_sponsored',
        description: 'North Korean state-sponsored threat group targeting financial institutions and cryptocurrency',
        country: 'KP',
        firstSeen: '2009-01-01',
        lastSeen: '2024-03-23',
        confidence: 0.91,
        sophistication: 'advanced',
        motivation: 'financial_gain',
        capabilities: ['custom_malware', 'supply_chain', 'cryptocurrency_theft'],
        targets: ['financial', 'cryptocurrency', 'banks'],
        techniques: [
          'Supply Chain Compromise',
          'Valid Accounts',
          'Data from Network Shared Drive',
          'Cryptocurrency Mining'
        ],
        indicators: 156,
        campaigns: 15,
        aliases: ['Hidden Cobra', 'Zinc', 'Nickel Academy'],
        attribution: 'high',
        tags: ['apt', 'north_korea', 'financial']
      },
      {
        id: 'actor_4',
        name: 'Conti Ransomware',
        type: 'cybercrime',
        description: 'Ransomware-as-a-service operation targeting healthcare and critical infrastructure',
        country: 'Unknown',
        firstSeen: '2020-05-01',
        lastSeen: '2024-03-22',
        confidence: 0.88,
        sophistication: 'moderate',
        motivation: 'financial_gain',
        capabilities: ['ransomware', 'double_extortion', 'data_leak'],
        targets: ['healthcare', 'critical_infrastructure', 'manufacturing'],
        techniques: [
          'Phishing',
          'Scripting',
          'Data Encrypted for Impact',
          'Ingress Tool Transfer'
        ],
        indicators: 89,
        campaigns: 23,
        aliases: ['Conti', 'LockBit', 'Ryuk'],
        attribution: 'medium',
        tags: ['ransomware', 'cybercrime', 'double_extortion']
      },
      {
        id: 'actor_5',
        name: 'Anonymous',
        type: 'hacktivist',
        description: 'Decentralized hacktivist collective conducting politically motivated attacks',
        country: 'Global',
        firstSeen: '2003-01-01',
        lastSeen: '2024-03-21',
        confidence: 0.75,
        sophistication: 'basic',
        motivation: 'political',
        capabilities: ['ddos', 'defacement', 'data_leaks'],
        targets: ['government', 'corporations', 'law_enforcement'],
        techniques: [
          'DDoS',
          'Web Shell',
          'Data from Network Shared Drive',
          'Defacement'
        ],
        indicators: 234,
        campaigns: 45,
        aliases: ['Anonymous', 'AnonOps', 'LulzSec'],
        attribution: 'low',
        tags: ['hacktivist', 'ddos', 'political']
      }
    ];
    
    setActors(mockActors);
  };

  const loadCampaigns = async () => {
    // Mock data - replace with actual API call
    const mockCampaigns = [
      {
        id: 'campaign_1',
        name: 'Operation Diplomatic Storm',
        description: 'Coordinated espionage campaign targeting diplomatic missions worldwide',
        status: 'active',
        startDate: '2024-02-15',
        endDate: null,
        confidence: 0.92,
        severity: 'high',
        actors: ['APT29', 'APT28'],
        techniques: [
          'Spearphishing Attachment',
          'PowerShell',
          'Scheduled Task',
          'Data Staged'
        ],
        targets: ['diplomatic_missions', 'government_agencies', 'think_tanks'],
        indicators: 45,
        affectedAssets: 23,
        impact: {
          dataExfiltrated: 'classified_documents',
          systemsCompromised: 15,
          estimatedLoss: '$2.5M',
          businessImpact: 'high'
        },
        timeline: [
          { date: '2024-02-15', event: 'Initial compromise detected' },
          { date: '2024-02-20', event: 'Lateral movement began' },
          { date: '2024-03-01', event: 'Data exfiltration started' },
          { date: '2024-03-15', event: 'Campaign expanded to new targets' }
        ],
        tags: ['espionage', 'diplomatic', 'apt']
      },
      {
        id: 'campaign_2',
        name: 'Healthcare Ransomware Wave',
        description: 'Series of ransomware attacks targeting healthcare organizations',
        status: 'ongoing',
        startDate: '2024-01-20',
        endDate: null,
        confidence: 0.88,
        severity: 'critical',
        actors: ['Conti', 'LockBit'],
        techniques: [
          'Phishing',
          'Scripting',
          'Data Encrypted for Impact',
          'Ingress Tool Transfer'
        ],
        targets: ['hospitals', 'healthcare_providers', 'medical_research'],
        indicators: 67,
        affectedAssets: 34,
        impact: {
          dataEncrypted: 'patient_records',
          systemsCompromised: 28,
          estimatedLoss: '$8.7M',
          businessImpact: 'critical'
        },
        timeline: [
          { date: '2024-01-20', event: 'First hospital infected' },
          { date: '2024-02-05', event: 'Multiple hospitals targeted' },
          { date: '2024-02-20', event: 'Double extortion tactics employed' },
          { date: '2024-03-10', event: 'New variant detected' }
        ],
        tags: ['ransomware', 'healthcare', 'double_extortion']
      },
      {
        id: 'campaign_3',
        name: 'Cryptocurrency Heist',
        description: 'Targeted attacks on cryptocurrency exchanges and wallets',
        status: 'investigating',
        startDate: '2024-03-01',
        endDate: '2024-03-18',
        confidence: 0.85,
        severity: 'high',
        actors: ['Lazarus Group'],
        techniques: [
          'Supply Chain Compromise',
          'Valid Accounts',
          'Data from Network Shared Drive',
          'Cryptocurrency Mining'
        ],
        targets: ['crypto_exchanges', 'wallet_providers', 'trading_platforms'],
        indicators: 34,
        affectedAssets: 12,
        impact: {
          cryptocurrencyStolen: '450 BTC',
          systemsCompromised: 8,
          estimatedLoss: '$28.5M',
          businessImpact: 'high'
        },
        timeline: [
          { date: '2024-03-01', event: 'Initial compromise detected' },
          { date: '2024-03-05', event: 'Wallet access gained' },
          { date: '2024-03-10', event: 'Cryptocurrency transferred' },
          { date: '2024-03-18', event: 'Campaign contained' }
        ],
        tags: ['cryptocurrency', 'theft', 'lazarus']
      }
    ];
    
    setCampaigns(mockCampaigns);
  };

  const loadVulnerabilities = async () => {
    // Mock data - replace with actual API call
    const mockVulnerabilities = [
      {
        id: 'vuln_1',
        name: 'CVE-2024-1234',
        description: 'Remote code execution vulnerability in web application framework',
        severity: 'critical',
        cvss: 9.8,
        category: 'remote_code_execution',
        status: 'active',
        discovered: '2024-03-15',
        published: '2024-03-18',
        affectedProducts: ['Apache Struts', 'Spring Framework'],
        exploitAvailable: true,
        exploitComplexity: 'low',
        authenticationRequired: false,
        impact: {
          confidentiality: 'high',
          integrity: 'high',
          availability: 'high'
        },
        remediation: {
          patchAvailable: true,
          patchVersion: '2.5.1',
          workaround: 'Update to latest version',
          mitigation: 'Network segmentation, WAF rules'
        },
        references: [
          'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-1234',
          'https://nvd.nist.gov/vuln/detail/CVE-2024-1234'
        ],
        tags: ['rce', 'web_application', 'critical']
      },
      {
        id: 'vuln_2',
        name: 'CVE-2024-5678',
        description: 'SQL injection vulnerability in database connector',
        severity: 'high',
        cvss: 8.5,
        category: 'sql_injection',
        status: 'active',
        discovered: '2024-03-10',
        published: '2024-03-12',
        affectedProducts: ['MySQL Connector', 'PostgreSQL Driver'],
        exploitAvailable: true,
        exploitComplexity: 'medium',
        authenticationRequired: false,
        impact: {
          confidentiality: 'high',
          integrity: 'medium',
          availability: 'low'
        },
        remediation: {
          patchAvailable: true,
          patchVersion: '8.0.33',
          workaround: 'Use parameterized queries',
          mitigation: 'Input validation, query monitoring'
        },
        references: [
          'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-5678',
          'https://nvd.nist.gov/vuln/detail/CVE-2024-5678'
        ],
        tags: ['sql_injection', 'database', 'high']
      },
      {
        id: 'vuln_3',
        name: 'CVE-2024-9012',
        description: 'Privilege escalation vulnerability in operating system kernel',
        severity: 'high',
        cvss: 7.8,
        category: 'privilege_escalation',
        status: 'active',
        discovered: '2024-03-08',
        published: '2024-03-11',
        affectedProducts: ['Linux Kernel', 'Windows Kernel'],
        exploitAvailable: false,
        exploitComplexity: 'high',
        authenticationRequired: true,
        impact: {
          confidentiality: 'medium',
          integrity: 'high',
          availability: 'medium'
        },
        remediation: {
          patchAvailable: true,
          patchVersion: '5.15.0',
          workaround: 'Limit user privileges',
          mitigation: 'System monitoring, access controls'
        },
        references: [
          'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-9012',
          'https://nvd.nist.gov/vuln/detail/CVE-2024-9012'
        ],
        tags: ['privilege_escalation', 'kernel', 'high']
      }
    ];
    
    setVulnerabilities(mockVulnerabilities);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-900/20 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <span className="text-red-500 text-sm">+12%</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">156</div>
          <div className="text-gray-400 text-sm">Active Threats</div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-900/20 rounded-lg">
              <Target className="w-6 h-6 text-orange-500" />
            </div>
            <span className="text-orange-500 text-sm">+8%</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">45,670</div>
          <div className="text-gray-400 text-sm">Indicators</div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-900/20 rounded-lg">
              <Users className="w-6 h-6 text-yellow-500" />
            </div>
            <span className="text-yellow-500 text-sm">+5%</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">23</div>
          <div className="text-gray-400 text-sm">Threat Actors</div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-900/20 rounded-lg">
              <Shield className="w-6 h-6 text-green-500" />
            </div>
            <span className="text-green-500 text-sm">-3%</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">89%</div>
          <div className="text-gray-400 text-sm">Coverage Rate</div>
        </div>
      </div>

      {/* Threat Landscape */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Threat Landscape</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-white font-medium mb-3">Threat Types Distribution</h4>
            <div className="space-y-2">
              {Object.entries(threatTypes).map(([key, type]) => {
                const count = actors.filter(a => a.type === key).length;
                return (
                  <div key={key} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {React.createElement(type.icon, { className: `w-4 h-4 text-${type.color}-500` })}
                      <span className="text-gray-300">{type.label}</span>
                    </div>
                    <span className="text-white font-medium">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-3">Recent Activity</h4>
            <div className="space-y-2">
              {[
                { activity: 'New APT campaign detected', time: '2 hours ago', severity: 'high' },
                { activity: 'Malware family updated', time: '4 hours ago', severity: 'medium' },
                { activity: 'Threat actor rebranded', time: '6 hours ago', severity: 'low' },
                { activity: 'New vulnerability disclosed', time: '8 hours ago', severity: 'critical' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-300">{item.activity}</span>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.severity === 'critical' ? 'bg-red-900/30 text-red-400' :
                      item.severity === 'high' ? 'bg-orange-900/30 text-orange-400' :
                      item.severity === 'medium' ? 'bg-yellow-900/30 text-yellow-400' :
                      'bg-blue-900/30 text-blue-400'
                    }`}>
                      {item.severity}
                    </span>
                    <span className="text-gray-400 text-sm">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Threats */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Top Threats This Week</h3>
        
        <div className="space-y-4">
          {actors.slice(0, 5).map(actor => (
            <div key={actor.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${
                  actorTypes[actor.type].color === 'red' ? 'bg-red-900/20' :
                  actorTypes[actor.type].color === 'orange' ? 'bg-orange-900/20' :
                  actorTypes[actor.type].color === 'yellow' ? 'bg-yellow-900/20' :
                  actorTypes[actor.type].color === 'blue' ? 'bg-blue-900/20' :
                  actorTypes[actor.type].color === 'purple' ? 'bg-purple-900/20' :
                  'bg-gray-900/20'
                }`}>
                  {React.createElement(actorTypes[actor.type].icon, { 
                    className: `w-5 h-5 text-${actorTypes[actor.type].color}-500` 
                  })}
                </div>
                <div>
                  <h4 className="text-white font-medium">{actor.name}</h4>
                  <p className="text-gray-400 text-sm">{actor.description}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="text-gray-400 text-sm">{actor.indicators} IOCs</span>
                <span className="text-gray-400 text-sm">{actor.campaigns} campaigns</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  actor.sophistication === 'advanced' ? 'bg-red-900/30 text-red-400' :
                  actor.sophistication === 'moderate' ? 'bg-yellow-900/30 text-yellow-400' :
                  'bg-blue-900/30 text-blue-400'
                }`}>
                  {actor.sophistication}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderThreatFeeds = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search threat feeds..."
              className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
          <select className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500">
            <option value="">All Types</option>
            <option value="misp">MISP</option>
            <option value="otx">OTX</option>
            <option value="virustotal">VirusTotal</option>
            <option value="crowdstrike">CrowdStrike</option>
            <option value="phishtank">PhishTank</option>
          </select>
        </div>
        
        <div className="flex items-center space-x-3">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
          </label>
          <span className="text-gray-400 text-sm">Auto Refresh</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {threatFeeds.map(feed => (
          <div key={feed.id} className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">{feed.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{feed.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    feed.status === 'active' ? 'bg-green-900/30 text-green-400' :
                    'bg-gray-900/30 text-gray-400'
                  }`}>
                    {feed.status}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    feed.reliability === 'high' ? 'bg-green-900/30 text-green-400' :
                    feed.reliability === 'medium' ? 'bg-yellow-900/30 text-yellow-400' :
                    'bg-orange-900/30 text-orange-400'
                  }`}>
                    {feed.reliability} reliability
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    feed.tlp === 'white' ? 'bg-white/20 text-white' :
                    feed.tlp === 'green' ? 'bg-green-900/30 text-green-400' :
                    feed.tlp === 'amber' ? 'bg-yellow-900/30 text-yellow-400' :
                    feed.tlp === 'red' ? 'bg-red-900/30 text-red-400' :
                    'bg-gray-900/30 text-gray-400'
                  }`}>
                    TLP:{feed.tlp.toUpperCase()}
                  </span>
                  {feed.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div>
                    <span className="text-gray-400">Type: </span>
                    <span className="text-white">{feed.type.toUpperCase()}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Source: </span>
                    <span className="text-white">{feed.source}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Indicators: </span>
                    <span className="text-white">{feed.indicatorsCount.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Confidence: </span>
                    <span className="text-white">{(feed.confidence * 100).toFixed(1)}%</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Last Updated: </span>
                    <span className="text-white">{new Date(feed.lastUpdated).toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Polling: </span>
                    <span className="text-white">{feed.pollingInterval}s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderIndicators = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search indicators..."
              className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
          <select className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500">
            <option value="">All Types</option>
            {Object.entries(indicatorTypes).map(([key, type]) => (
              <option key={key} value={key}>{type.label}</option>
            ))}
          </select>
          <select className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500">
            <option value="">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        
        <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Indicator</span>
        </button>
      </div>

      <div className="space-y-4">
        {indicators.map(indicator => (
          <div key={indicator.id} className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${
                  indicatorTypes[indicator.type] ? 'bg-cyan-900/20' : 'bg-gray-900/20'
                }`}>
                  {indicatorTypes[indicator.type] ? (
                    React.createElement(indicatorTypes[indicator.type].icon, { 
                      className: "w-6 h-6 text-cyan-500" 
                    })
                  ) : (
                    <Target className="w-6 h-6 text-gray-500" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">{indicator.value}</h3>
                  <p className="text-gray-400 mb-3">{indicator.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      indicator.severity === 'critical' ? 'bg-red-900/30 text-red-400' :
                      indicator.severity === 'high' ? 'bg-orange-900/30 text-orange-400' :
                      indicator.severity === 'medium' ? 'bg-yellow-900/30 text-yellow-400' :
                      'bg-blue-900/30 text-blue-400'
                    }`}>
                      {indicator.severity}
                    </span>
                    <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs">
                      {indicator.type.toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      indicator.tlp === 'white' ? 'bg-white/20 text-white' :
                      indicator.tlp === 'green' ? 'bg-green-900/30 text-green-400' :
                      indicator.tlp === 'amber' ? 'bg-yellow-900/30 text-yellow-400' :
                      indicator.tlp === 'red' ? 'bg-red-900/30 text-red-400' :
                      'bg-gray-900/30 text-gray-400'
                    }`}>
                      TLP:{indicator.tlp.toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      indicator.active ? 'bg-green-900/30 text-green-400' :
                      'bg-gray-900/30 text-gray-400'
                    }`}>
                      {indicator.active ? 'Active' : 'Inactive'}
                    </span>
                    {indicator.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Type: </span>
                      <span className="text-white">{indicator.type.toUpperCase()}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Confidence: </span>
                      <span className="text-white">{(indicator.confidence * 100).toFixed(1)}%</span>
                    </div>
                    <div>
                      <span className="text-gray-400">First Seen: </span>
                      <span className="text-white">{new Date(indicator.firstSeen).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Last Seen: </span>
                      <span className="text-white">{new Date(indicator.lastSeen).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Source: </span>
                      <span className="text-white">{indicator.source}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {indicator.context && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <h4 className="text-white font-medium mb-2">Context</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {Object.entries(indicator.context).map(([key, value]) => (
                    <div key={key}>
                      <span className="text-gray-400 capitalize">{key.replace(/_/g, ' ')}: </span>
                      <span className="text-white">{Array.isArray(value) ? value.join(', ') : value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {indicator.relatedThreats && indicator.relatedThreats.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <h4 className="text-white font-medium mb-2">Related Threats</h4>
                <div className="flex flex-wrap gap-2">
                  {indicator.relatedThreats.map((threat, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">
                      {threat}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderActors = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search threat actors..."
              className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
          <select className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500">
            <option value="">All Types</option>
            {Object.entries(actorTypes).map(([key, type]) => (
              <option key={key} value={key}>{type.label}</option>
            ))}
          </select>
          <select className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500">
            <option value="">All Sophistication</option>
            <option value="advanced">Advanced</option>
            <option value="moderate">Moderate</option>
            <option value="basic">Basic</option>
          </select>
        </div>
        
        <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Actor</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {actors.map(actor => (
          <div key={actor.id} className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${
                  actorTypes[actor.type].color === 'red' ? 'bg-red-900/20' :
                  actorTypes[actor.type].color === 'orange' ? 'bg-orange-900/20' :
                  actorTypes[actor.type].color === 'yellow' ? 'bg-yellow-900/20' :
                  actorTypes[actor.type].color === 'blue' ? 'bg-blue-900/20' :
                  actorTypes[actor.type].color === 'purple' ? 'bg-purple-900/20' :
                  'bg-gray-900/20'
                }`}>
                  {React.createElement(actorTypes[actor.type].icon, { 
                    className: `w-6 h-6 text-${actorTypes[actor.type].color}-500` 
                  })}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">{actor.name}</h3>
                  <p className="text-gray-400 text-sm mb-3">{actor.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      actor.sophistication === 'advanced' ? 'bg-red-900/30 text-red-400' :
                      actor.sophistication === 'moderate' ? 'bg-yellow-900/30 text-yellow-400' :
                      'bg-blue-900/30 text-blue-400'
                    }`}>
                      {actor.sophistication}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      actor.attribution === 'high' ? 'bg-red-900/30 text-red-400' :
                      actor.attribution === 'medium' ? 'bg-yellow-900/30 text-yellow-400' :
                      actor.attribution === 'low' ? 'bg-blue-900/30 text-blue-400' :
                      'bg-gray-900/30 text-gray-400'
                    }`}>
                      {actor.attribution} attribution
                    </span>
                    <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs">
                      {actor.country}
                    </span>
                    {actor.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div>
                      <span className="text-gray-400">Type: </span>
                      <span className="text-white">{actorTypes[actor.type].label}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Motivation: </span>
                      <span className="text-white">{actor.motivation.replace(/_/g, ' ')}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">First Seen: </span>
                      <span className="text-white">{actor.firstSeen}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Last Seen: </span>
                      <span className="text-white">{actor.lastSeen}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Confidence: </span>
                      <span className="text-white">{(actor.confidence * 100).toFixed(1)}%</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Indicators: </span>
                      <span className="text-white">{actor.indicators}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Campaigns: </span>
                      <span className="text-white">{actor.campaigns}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {actor.techniques && actor.techniques.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <h4 className="text-white font-medium mb-2">MITRE ATT&CK Techniques</h4>
                <div className="flex flex-wrap gap-2">
                  {actor.techniques.map((technique, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">
                      {technique}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {actor.capabilities && actor.capabilities.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <h4 className="text-white font-medium mb-2">Capabilities</h4>
                <div className="flex flex-wrap gap-2">
                  {actor.capabilities.map((capability, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">
                      {capability.replace(/_/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {actor.targets && actor.targets.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <h4 className="text-white font-medium mb-2">Targets</h4>
                <div className="flex flex-wrap gap-2">
                  {actor.targets.map((target, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">
                      {target.replace(/_/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {actor.aliases && actor.aliases.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <h4 className="text-white font-medium mb-2">Aliases</h4>
                <div className="flex flex-wrap gap-2">
                  {actor.aliases.map((alias, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">
                      {alias}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderCampaigns = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search campaigns..."
              className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
          <select className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500">
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="ongoing">Ongoing</option>
            <option value="investigating">Investigating</option>
            <option value="completed">Completed</option>
          </select>
          <select className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500">
            <option value="">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        
        <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>New Campaign</span>
        </button>
      </div>

      <div className="space-y-4">
        {campaigns.map(campaign => (
          <div key={campaign.id} className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${
                  campaign.severity === 'critical' ? 'bg-red-900/20' :
                  campaign.severity === 'high' ? 'bg-orange-900/20' :
                  campaign.severity === 'medium' ? 'bg-yellow-900/20' :
                  'bg-blue-900/20'
                }`}>
                  <Shield className={`w-6 h-6 text-${
                    campaign.severity === 'critical' ? 'red' :
                    campaign.severity === 'high' ? 'orange' :
                    campaign.severity === 'medium' ? 'yellow' :
                    'blue'
                  }-500`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">{campaign.name}</h3>
                  <p className="text-gray-400 mb-3">{campaign.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      campaign.status === 'active' ? 'bg-red-900/30 text-red-400' :
                      campaign.status === 'ongoing' ? 'bg-orange-900/30 text-orange-400' :
                      campaign.status === 'investigating' ? 'bg-yellow-900/30 text-yellow-400' :
                      campaign.status === 'completed' ? 'bg-green-900/30 text-green-400' :
                      'bg-gray-900/30 text-gray-400'
                    }`}>
                      {campaign.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      campaign.severity === 'critical' ? 'bg-red-900/30 text-red-400' :
                      campaign.severity === 'high' ? 'bg-orange-900/30 text-orange-400' :
                      campaign.severity === 'medium' ? 'bg-yellow-900/30 text-yellow-400' :
                      'bg-blue-900/30 text-blue-400'
                    }`}>
                      {campaign.severity}
                    </span>
                    <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs">
                      {(campaign.confidence * 100).toFixed(1)}% confidence
                    </span>
                    {campaign.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Start Date: </span>
                      <span className="text-white">{campaign.startDate}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">End Date: </span>
                      <span className="text-white">{campaign.endDate || 'Ongoing'}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Indicators: </span>
                      <span className="text-white">{campaign.indicators}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Affected Assets: </span>
                      <span className="text-white">{campaign.affectedAssets}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {campaign.actors && campaign.actors.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <h4 className="text-white font-medium mb-2">Threat Actors</h4>
                <div className="flex flex-wrap gap-2">
                  {campaign.actors.map((actor, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">
                      {actor}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {campaign.techniques && campaign.techniques.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <h4 className="text-white font-medium mb-2">Techniques</h4>
                <div className="flex flex-wrap gap-2">
                  {campaign.techniques.map((technique, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">
                      {technique}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {campaign.targets && campaign.targets.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <h4 className="text-white font-medium mb-2">Targets</h4>
                <div className="flex flex-wrap gap-2">
                  {campaign.targets.map((target, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">
                      {target.replace(/_/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {campaign.impact && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <h4 className="text-white font-medium mb-2">Impact Assessment</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {Object.entries(campaign.impact).map(([key, value]) => (
                    <div key={key}>
                      <span className="text-gray-400 capitalize">{key.replace(/_/g, ' ')}: </span>
                      <span className="text-white">{Array.isArray(value) ? value.join(', ') : value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {campaign.timeline && campaign.timeline.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <h4 className="text-white font-medium mb-2">Timeline</h4>
                <div className="space-y-2">
                  {campaign.timeline.map((event, index) => (
                    <div key={index} className="flex items-center space-x-3 text-sm">
                      <span className="text-gray-400">{event.date}</span>
                      <span className="text-white">{event.event}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderVulnerabilities = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search vulnerabilities..."
              className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
          <select className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500">
            <option value="">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500">
            <option value="">All Categories</option>
            <option value="remote_code_execution">Remote Code Execution</option>
            <option value="sql_injection">SQL Injection</option>
            <option value="privilege_escalation">Privilege Escalation</option>
            <option value="xss">Cross-Site Scripting</option>
          </select>
        </div>
        
        <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Vulnerability</span>
        </button>
      </div>

      <div className="space-y-4">
        {vulnerabilities.map(vulnerability => (
          <div key={vulnerability.id} className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${
                  vulnerability.severity === 'critical' ? 'bg-red-900/20' :
                  vulnerability.severity === 'high' ? 'bg-orange-900/20' :
                  vulnerability.severity === 'medium' ? 'bg-yellow-900/20' :
                  'bg-blue-900/20'
                }`}>
                  <AlertTriangle className={`w-6 h-6 text-${
                    vulnerability.severity === 'critical' ? 'red' :
                    vulnerability.severity === 'high' ? 'orange' :
                    vulnerability.severity === 'medium' ? 'yellow' :
                    'blue'
                  }-500`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">{vulnerability.name}</h3>
                  <p className="text-gray-400 mb-3">{vulnerability.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      vulnerability.status === 'active' ? 'bg-red-900/30 text-red-400' :
                      vulnerability.status === 'patched' ? 'bg-green-900/30 text-green-400' :
                      'bg-yellow-900/30 text-yellow-400'
                    }`}>
                      {vulnerability.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      vulnerability.severity === 'critical' ? 'bg-red-900/30 text-red-400' :
                      vulnerability.severity === 'high' ? 'bg-orange-900/30 text-orange-400' :
                      vulnerability.severity === 'medium' ? 'bg-yellow-900/30 text-yellow-400' :
                      'bg-blue-900/30 text-blue-400'
                    }`}>
                      {vulnerability.severity}
                    </span>
                    <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs">
                      CVSS: {vulnerability.cvss}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      vulnerability.exploitAvailable ? 'bg-red-900/30 text-red-400' :
                      'bg-green-900/30 text-green-400'
                    }`}>
                      {vulnerability.exploitAvailable ? 'Exploit Available' : 'No Exploit'}
                    </span>
                    {vulnerability.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Category: </span>
                      <span className="text-white">{vulnerability.category.replace(/_/g, ' ')}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Discovered: </span>
                      <span className="text-white">{vulnerability.discovered}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Published: </span>
                      <span className="text-white">{vulnerability.published}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Exploit Complexity: </span>
                      <span className="text-white">{vulnerability.exploitComplexity}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {vulnerability.affectedProducts && vulnerability.affectedProducts.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <h4 className="text-white font-medium mb-2">Affected Products</h4>
                <div className="flex flex-wrap gap-2">
                  {vulnerability.affectedProducts.map((product, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">
                      {product}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {vulnerability.impact && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <h4 className="text-white font-medium mb-2">Impact</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  {Object.entries(vulnerability.impact).map(([key, value]) => (
                    <div key={key}>
                      <span className="text-gray-400 capitalize">{key}: </span>
                      <span className="text-white">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {vulnerability.remediation && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <h4 className="text-white font-medium mb-2">Remediation</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {Object.entries(vulnerability.remediation).map(([key, value]) => (
                    <div key={key}>
                      <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}: </span>
                      <span className="text-white">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {vulnerability.references && vulnerability.references.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <h4 className="text-white font-medium mb-2">References</h4>
                <div className="space-y-2">
                  {vulnerability.references.map((reference, index) => (
                    <a key={index} href={reference} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 text-sm block">
                      {reference}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
            <Shield className="w-8 h-8 text-cyan-500" />
            <span>Threat Intelligence Platform</span>
          </h2>
          <p className="text-gray-400 mt-2">
            Advanced threat intelligence and vulnerability management
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2">
            <HelpCircle className="w-4 h-4" />
            <span>Documentation</span>
          </button>
          <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-800">
        <nav className="flex space-x-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-cyan-500 text-cyan-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'feeds' && renderThreatFeeds()}
        {activeTab === 'indicators' && renderIndicators()}
        {activeTab === 'actors' && renderActors()}
        {activeTab === 'campaigns' && renderCampaigns()}
        {activeTab === 'vulnerabilities' && renderVulnerabilities()}
      </div>
    </div>
  );
};

export default ThreatIntelligence;
