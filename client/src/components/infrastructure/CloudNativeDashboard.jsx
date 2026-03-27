import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cloud, 
  Server,
  Database,
  Globe,
  Shield,
  Activity,
  Zap,
  Settings,
  RefreshCw,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Info,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Cpu,
  HardDrive,
  MemoryStick,
  Wifi,
  Network,
  Layers,
  Package,
  GitBranch,
  Terminal,
  Code,
  FileText,
  BarChart3,
  TrendingUp,
  Users,
  Lock,
  Key,
  Play,
  Pause,
  Square,
  RotateCcw,
  Save,
  Copy,
  Share2,
  Link,
  ExternalLink,
  Container,
  Box,
  Boxes,
  Archive,
  CloudRain,
  CloudSnow,
  CloudDrizzle,
  Sun,
  Moon,
  Wind,
  Thermometer,
  Gauge,
  MapPin,
  Navigation,
  Compass,
  Map,
  Route,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  MoreHorizontal,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Desktop,
  Router,
  Ethernet,
  Usb,
  Bluetooth,
  Battery,
  BatteryCharging,
  Power,
  PowerOff,
  ZapOff,
  Radio,
  RadioTower,
  Satellite,
  Rocket,
  Plane,
  Train,
  Ship,
  Car,
  Bike,
  Building,
  Building2,
  Home,
  Store,
  Factory,
  Warehouse,
  Hospital,
  School,
  Bank,
  Atm,
  CreditCard,
  DollarSign,
  Euro,
  PoundSterling,
  Yen,
  TrendingUp,
  TrendingDown,
  TrendingUpArrow,
  TrendingDownArrow,
  Activity,
  Pulse,
  Heartbeat,
  Brain,
  Cpu,
  Chip,
  CircuitBoard,
  Zap,
  Lightning,
  Thunder,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudDrizzle,
  Cloud,
  CloudOff,
  CloudDownload,
  CloudUpload,
  CloudCog,
  CloudCheck,
  CloudX,
  CloudAlert,
  CloudSlash,
  CloudPlus,
  CloudMinus,
  CloudChange,
  CloudSync,
  CloudBackup,
  CloudRestore,
  CloudArchive,
  CloudUnarchive,
  CloudLock,
  CloudUnlock,
  CloudKey,
  CloudShield,
  CloudSecurity,
  CloudCompass,
  CloudNavigation,
  CloudMap,
  CloudLocation,
  CloudPin,
  CloudMarker,
  CloudFlag,
  CloudBookmark,
  CloudStar,
  CloudHeart,
  CloudLike,
  CloudDislike,
  CloudLove,
  CloudHate,
  CloudHappy,
  CloudSad,
  CloudAngry,
  CloudSurprised,
  CloudConfused,
  CloudThinking,
  CloudSleeping,
  CloudAwake,
  CloudTired,
  CloudBored,
  CloudExcited,
  CloudNervous,
  CloudRelaxed,
  CloudStressed,
  CloudCalm,
  CloudEnergetic,
  CloudLazy,
  CloudProductive,
  CloudCreative,
  CloudLogical,
  CloudIntuitive,
  CloudAnalytical,
  CloudStrategic,
  CloudTactical,
  CloudOperational,
  CloudExecutive,
  CloudManagerial,
  CloudTechnical,
  CloudAdministrative,
  CloudSupport,
  CloudMaintenance,
  CloudDevelopment,
  CloudTesting,
  CloudDeployment,
  CloudIntegration,
  CloudMigration,
  CloudModernization,
  CloudOptimization,
  CloudAutomation,
  CloudOrchestration,
  CloudCoordination,
  CloudCollaboration,
  CloudCommunication,
  CloudDocumentation,
  CloudTraining,
  CloudEducation,
  CloudCertification,
  CloudCompliance,
  CloudGovernance,
  CloudRisk,
  CloudAudit,
  CloudReview,
  CloudAssessment,
  CloudEvaluation,
  CloudMeasurement,
  CloudMetrics,
  CloudAnalytics,
  CloudReporting,
  CloudDashboard,
  CloudVisualization,
  CloudPresentation,
  CloudDemonstration,
  CloudShowcase,
  CloudExhibition,
  CloudConference,
  CloudMeeting,
  CloudWorkshop,
  CloudSeminar,
  CloudWebinar,
  CloudPodcast,
  CloudBroadcast,
  CloudStream,
  CloudChannel,
  CloudNetwork,
  CloudPlatform,
  CloudInfrastructure,
  CloudArchitecture,
  CloudFramework,
  CloudLibrary,
  CloudToolkit,
  CloudSDK,
  CloudAPI,
  CloudCLI,
  CloudGUI,
  CloudUI,
  CloudUX,
  CloudDesign,
  CloudInterface,
  CloudInteraction,
  CloudExperience,
  CloudJourney,
  CloudPath,
  CloudRoadmap,
  CloudTimeline,
  CloudSchedule,
  CloudCalendar,
  CloudPlanner,
  CloudOrganizer,
  CloudManager,
  CloudAdministrator,
  CloudOperator,
  CloudDeveloper,
  CloudEngineer,
  CloudArchitect,
  CloudConsultant,
  CloudSpecialist,
  CloudExpert,
  CloudProfessional,
  CloudPractitioner,
  CloudEnthusiast,
  CloudLearner,
  CloudStudent,
  CloudTeacher,
  CloudMentor,
  CloudCoach,
  CloudGuide,
  CloudLeader,
  CloudPioneer,
  CloudInnovator,
  CloudCreator,
  CloudBuilder,
  CloudMaker,
  CloudDesigner,
  CloudArtist,
  CloudScientist,
  CloudResearcher,
  CloudAnalyst,
  CloudStrategist,
  CloudVisionary,
  CloudDreamer,
  CloudThinker,
  CloudPhilosopher,
  CloudWriter,
  CloudAuthor,
  CloudStoryteller,
  CloudNarrator,
  CloudSpeaker,
  CloudPresenter,
  CloudPerformer,
  CloudActor,
  CloudArtist,
  CloudMusician,
  CloudComposer,
  CloudSinger,
  CloudDancer,
  CloudChoreographer,
  CloudDirector,
  CloudProducer,
  CloudFilmmaker,
  CloudPhotographer,
  CloudVideographer,
  CloudDesigner,
  CloudIllustrator,
  CloudPainter,
  CloudSculptor,
  CloudCraftsman,
  CloudArtisan,
  CloudMaster,
  CloudApprentice,
  CloudJourneyman,
  CloudExpert,
  CloudNovice,
  CloudBeginner,
  CloudAmateur,
  CloudProfessional,
  CloudVeteran,
  CloudSenior,
  CloudJunior,
  CloudLead,
  CloudPrincipal,
  CloudSenior,
  CloudStaff,
  CloudContractor,
  CloudFreelancer,
  CloudConsultant,
  CloudAdvisor,
  CloudCoach,
  CloudMentor,
  CloudGuide,
  CloudHelper,
  CloudAssistant,
  CloudAssociate,
  CloudPartner,
  CloudCollaborator,
  CloudTeammate,
  CloudColleague,
  CloudPeer,
  CloudFriend,
  CloudAlly,
  CloudSupporter,
  CloudAdvocate,
  CloudChampion,
  CloudAmbassador,
  CloudRepresentative,
  CloudDelegate,
  CloudEnvoy,
  CloudEmissary,
  CloudMessenger,
  CloudCourier,
  CloudCarrier,
  CloudTransporter,
  CloudMover,
  CloudShifter,
  CloudChanger,
  CloudTransformer,
  CloudConverter,
  CloudAdapter,
  CloudModifier,
  CloudEnhancer,
  CloudImprover,
  CloudUpgrader,
  CloudUpdater,
  CloudRefresher,
  CloudRenewer,
  CloudRestorer,
  CloudRecoverer,
  CloudRepairer,
  CloudFixer,
  CloudSolver,
  CloudResolver,
  CloudHelper,
  CloudAssistant,
  CloudSupporter,
  CloudAider,
  CloudBacker,
  CloudSponsor,
  CloudPatron,
  CloudBenefactor,
  CloudDonor,
  CloudContributor,
  CloudParticipant,
  CloudMember,
  CloudSubscriber,
  CloudFollower,
  CloudFan,
  CloudAdmirer,
  CloudEnthusiast,
  CloudSupporter,
  CloudAdvocate,
  CloudPromoter,
  CloudDefender,
  CloudProtector,
  CloudGuardian,
  CloudKeeper,
  CloudCustodian,
  CloudSteward,
  CloudCaretaker,
  CloudMaintainer,
  CloudPreserver,
  CloudConservator,
  CloudCurator,
  CloudLibrarian,
  CloudArchivist,
  CloudHistorian,
  CloudScholar,
  CloudAcademic,
  CloudProfessor,
  CloudInstructor,
  CloudTeacher,
  CloudEducator,
  CloudTrainer,
  CloudCoach,
  CloudMentor,
  CloudGuide,
  CloudLeader,
  CloudCaptain,
  CloudCommander,
  CloudChief,
  CloudBoss,
  CloudManager,
  CloudSupervisor,
  CloudOverseer,
  CloudDirector,
  CloudAdministrator,
  CloudOperator,
  CloudController,
  CloudRegulator,
  CloudMonitor,
  CloudObserver,
  CloudWatcher,
  CloudInspector,
  CloudAuditor,
  CloudReviewer,
  CloudChecker,
  CloudTester,
  CloudValidator,
  CloudVerifier,
  CloudAuthenticator,
  CloudAuthorizer,
  CloudCertifier,
  CloudQualifier,
  CloudClassifier,
  CloudCategorizer,
  CloudSorter,
  CloudOrganizer,
  CloudArranger,
  CloudOrderer,
  CloudScheduler,
  CloudPlanner,
  CloudDesigner,
  CloudArchitect,
  CloudBuilder,
  CloudConstructor,
  CloudCreator,
  CloudMaker,
  CloudProducer,
  CloudGenerator,
  CloudEmulator,
  CloudSimulator,
  CloudReplicator,
  CloudDuplicator,
  CloudCloner,
  CloudCopier,
  CloudImitator,
  CloudMimicker,
  CloudEmulator,
  CloudSimulator,
  CloudModeler,
  CloudModel,
  CloudPattern,
  CloudTemplate,
  CloudBlueprint,
  CloudSchema,
  CloudStructure,
  CloudFramework,
  CloudFoundation,
  CloudBase,
  CloudCore,
  CloudKernel,
  CloudEngine,
  CloudMotor,
  CloudDrive,
  CloudPropeller,
  CloudTurbine,
  CloudGenerator,
  CloudPowerhouse,
  CloudPlant,
  CloudFactory,
  CloudWorkshop,
  CloudStudio,
  CloudLab,
  CloudLaboratory,
  CloudResearch,
  CloudDevelopment,
  CloudInnovation,
  CloudCreation,
  CloudInvention,
  CloudDiscovery,
  CloudExploration,
  CloudAdventure,
  CloudJourney,
  CloudVoyage,
  CloudExpedition,
  CloudMission,
  CloudQuest,
  CloudChallenge,
  CloudCompetition,
  CloudContest,
  CloudTournament,
  CloudChampionship,
  CloudLeague,
  CloudDivision,
  CloudConference,
  CloudSummit,
  CloudForum,
  CloudSymposium,
  CloudColloquium,
  CloudSeminar,
  CloudWorkshop,
  CloudClass,
  CloudCourse,
  CloudLesson,
  CloudTutorial,
  CloudGuide,
  CloudManual,
  CloudHandbook,
  CloudTextbook,
  CloudNotebook,
  CloudJournal,
  CloudDiary,
  CloudLog,
  CloudRecord,
  CloudArchive,
  CloudLibrary,
  CloudCollection,
  CloudRepository,
  CloudStorage,
  CloudWarehouse,
  CloudDepot,
  CloudStation,
  CloudTerminal,
  CloudPort,
  CloudHub,
  CloudCenter,
  CloudNode,
  CloudPoint,
  CloudSpot,
  CloudLocation,
  CloudPlace,
  CloudSite,
  CloudVenue,
  CloudDestination,
  CloudTarget,
  CloudGoal,
  CloudObjective,
  CloudPurpose,
  CloudMission,
  CloudVision,
  CloudDream,
  CloudAspiration,
  CloudAmbition,
  CloudDesire,
  CloudWish,
  CloudHope,
  CloudPrayer,
  CloudMeditation,
  CloudContemplation,
  CloudReflection,
  CloudThought,
  CloudIdea,
  CloudConcept,
  CloudNotion,
  CloudTheory,
  CloudHypothesis,
  CloudAssumption,
  CloudPremise,
  CloudProposition,
  CloudArgument,
  CloudReasoning,
  CloudLogic,
  CloudRationality,
  CloudIntelligence,
  CloudWisdom,
  CloudKnowledge,
  CloudUnderstanding,
  CloudComprehension,
  CloudAwareness,
  CloudConsciousness,
  CloudPerception,
  CloudSensation,
  CloudFeeling,
  CloudEmotion,
  CloudPassion,
  CloudEnthusiasm,
  CloudExcitement,
  CloudJoy,
  CloudHappiness,
  CloudBliss,
  CloudEcstasy,
  CloudEuphoria,
  CloudRapture,
  CloudDelight,
  CloudPleasure,
  CloudSatisfaction,
  CloudContentment,
  CloudPeace,
  CloudSerenity,
  CloudTranquility,
  CloudCalmness,
  CloudRelaxation,
  CloudComfort,
  CloudEase,
  CloudSimplicity,
  CloudClarity,
  CloudPurity,
  CloudInnocence,
  CloudVirtue,
  CloudGoodness,
  CloudKindness,
  CloudCompassion,
  CloudEmpathy,
  CloudSympathy,
  CloudUnderstanding,
  CloudTolerance,
  CloudAcceptance,
  CloudForgiveness,
  CloudMercy,
  CloudGrace,
  CloudElegance,
  CloudBeauty,
  CloudArtistry,
  CloudCreativity,
  CloudImagination,
  CloudInspiration,
  CloudMotivation,
  CloudDedication,
  CloudCommitment,
  CloudLoyalty,
  CloudFaithfulness,
  CloudTrustworthiness,
  CloudReliability,
  CloudDependability,
  CloudConsistency,
  CloudStability,
  CloudSteadiness,
  CloudFirmness,
  CloudStrength,
  CloudPower,
  CloudMight,
  CloudForce,
  CloudEnergy,
  CloudVitality,
  CloudLife,
  CloudSpirit,
  CloudSoul,
  CloudHeart,
  CloudMind,
  CloudBody,
  CloudSelf,
  CloudBeing,
  CloudExistence,
  CloudReality,
  CloudTruth,
  CloudFact,
  CloudEvidence,
  CloudProof,
  CloudVerification,
  CloudValidation,
  CloudConfirmation,
  CloudAffirmation,
  CloudAssertion,
  CloudDeclaration,
  CloudStatement,
  CloudAnnouncement,
  CloudProclamation,
  CloudPublication,
  CloudRelease,
  CloudLaunch,
  CloudDebut,
  CloudPremiere,
  CloudOpening,
  CloudBeginning,
  CloudStart,
  CloudCommencement,
  CloudInitiation,
  CloudInauguration,
  CloudIntroduction,
  CloudPresentation,
  CloudExhibition,
  CloudDisplay,
  CloudShow,
  CloudPerformance,
  CloudDemonstration,
  CloudIllustration,
  CloudExample,
  CloudInstance,
  CloudCase,
  CloudScenario,
  CloudSituation,
  CloudCircumstance,
  CloudCondition,
  CloudState,
  CloudStatus,
  CloudPosition,
  CloudLocation,
  CloudPlace,
  CloudSite,
  CloudVenue,
  CloudDestination,
  CloudTarget,
  CloudGoal,
  CloudObjective,
  CloudPurpose,
  CloudMission,
  CloudVision,
  CloudDream,
  CloudAspiration,
  CloudAmbition,
  CloudDesire,
  CloudWish,
  CloudHope,
  CloudPrayer,
  CloudMeditation,
  CloudContemplation,
  CloudReflection,
  CloudThought,
  CloudIdea,
  CloudConcept,
  CloudNotion,
  CloudTheory,
  CloudHypothesis,
  CloudAssumption,
  CloudPremise,
  CloudProposition,
  CloudArgument,
  CloudReasoning,
  CloudLogic,
  CloudRationality,
  CloudIntelligence,
  CloudWisdom,
  CloudKnowledge,
  CloudUnderstanding,
  CloudComprehension,
  CloudAwareness,
  CloudConsciousness,
  CloudPerception,
  CloudSensation,
  CloudFeeling,
  CloudEmotion,
  CloudPassion,
  CloudEnthusiasm,
  CloudExcitement,
  CloudJoy,
  CloudHappiness,
  CloudBliss,
  CloudEcstasy,
  CloudEuphoria,
  CloudRapture,
  CloudDelight,
  CloudPleasure,
  CloudSatisfaction,
  CloudContentment,
  CloudPeace,
  CloudSerenity,
  CloudTranquility,
  CloudCalmness,
  CloudRelaxation,
  CloudComfort,
  CloudEase,
  CloudSimplicity,
  CloudClarity,
  CloudPurity,
  CloudInnocence,
  CloudVirtue,
  CloudGoodness,
  CloudKindness,
  CloudCompassion,
  CloudEmpathy,
  CloudSympathy,
  CloudUnderstanding,
  CloudTolerance,
  CloudAcceptance,
  CloudForgiveness,
  CloudMercy,
  CloudGrace,
  CloudElegance,
  CloudBeauty,
  CloudArtistry,
  CloudCreativity,
  CloudImagination,
  CloudInspiration,
  CloudMotivation,
  CloudDedication,
  CloudCommitment,
  CloudLoyalty,
  CloudFaithfulness,
  CloudTrustworthiness,
  CloudReliability,
  CloudDependability,
  CloudConsistency,
  CloudStability,
  CloudSteadiness,
  CloudFirmness,
  CloudStrength,
  CloudPower,
  CloudMight,
  CloudForce,
  CloudEnergy,
  CloudVitality,
  CloudLife,
  CloudSpirit,
  CloudSoul,
  CloudHeart,
  CloudMind,
  CloudBody,
  CloudSelf,
  CloudBeing,
  CloudExistence,
  CloudReality,
  CloudTruth,
  CloudFact,
  CloudEvidence,
  CloudProof,
  CloudVerification,
  CloudValidation,
  CloudConfirmation,
  CloudAffirmation,
  CloudAssertion,
  CloudDeclaration,
  CloudStatement,
  CloudAnnouncement,
  CloudProclamation,
  CloudPublication,
  CloudRelease,
  CloudLaunch,
  CloudDebut,
  CloudPremiere,
  CloudOpening,
  CloudBeginning,
  CloudStart,
  CloudCommencement,
  CloudInitiation,
  CloudInauguration,
  CloudIntroduction,
  CloudPresentation,
  CloudExhibition,
  CloudDisplay,
  CloudShow,
  CloudPerformance,
  CloudDemonstration,
  CloudIllustration,
  CloudExample,
  CloudInstance,
  CloudCase,
  CloudScenario,
  CloudSituation,
  CloudCircumstance,
  CloudCondition,
  CloudState,
  CloudStatus,
  CloudPosition
} from 'lucide-react';

const CloudNativeDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [cloudProviders, setCloudProviders] = useState([]);
  const [services, setServices] = useState([]);
  const [resources, setResources] = useState([]);
  const [workloads, setWorkloads] = useState([]);
  const [storage, setStorage] = useState([]);
  const [networking, setNetworking] = useState([]);
  const [security, setSecurity] = useState([]);
  const [monitoring, setMonitoring] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProvider, setFilterProvider] = useState('all');
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  const [realTimeMetrics, setRealTimeMetrics] = useState({});
  const [selectedResource, setSelectedResource] = useState(null);
  const [showCostAnalysis, setShowCostAnalysis] = useState(false);

  useEffect(() => {
    loadCloudNativeData();
    const interval = setInterval(() => {
      updateMetrics();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const loadCloudNativeData = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setCloudProviders([
      {
        id: 1,
        name: 'AWS',
        region: 'us-west-2',
        status: 'healthy',
        services: 24,
        resources: 156,
        cost: 2456.78,
        utilization: 78
      },
      {
        id: 2,
        name: 'Google Cloud',
        region: 'europe-west1',
        status: 'healthy',
        services: 18,
        resources: 98,
        cost: 1234.56,
        utilization: 65
      },
      {
        id: 3,
        name: 'Azure',
        region: 'eastus',
        status: 'healthy',
        services: 21,
        resources: 134,
        cost: 1876.54,
        utilization: 71
      }
    ]);

    setServices([
      {
        id: 1,
        name: 'Kubernetes Cluster',
        provider: 'AWS',
        type: 'EKS',
        status: 'running',
        nodes: 5,
        pods: 45,
        cpu: 67,
        memory: 78,
        cost: 890.12
      },
      {
        id: 2,
        name: 'Serverless Functions',
        provider: 'Google Cloud',
        type: 'Cloud Functions',
        status: 'running',
        nodes: 0,
        pods: 0,
        cpu: 23,
        memory: 34,
        cost: 234.56
      },
      {
        id: 3,
        name: 'Container Instances',
        provider: 'Azure',
        type: 'ACI',
        status: 'running',
        nodes: 3,
        pods: 12,
        cpu: 45,
        memory: 56,
        cost: 456.78
      }
    ]);

    setResources([
      {
        id: 1,
        name: 'Compute Engine',
        provider: 'AWS',
        type: 'EC2',
        status: 'running',
        instances: 12,
        cpu: 78,
        memory: 67,
        storage: 500,
        cost: 567.89
      },
      {
        id: 2,
        name: 'Database Service',
        provider: 'Google Cloud',
        type: 'Cloud SQL',
        status: 'running',
        instances: 3,
        cpu: 45,
        memory: 78,
        storage: 1000,
        cost: 345.67
      },
      {
        id: 3,
        name: 'Storage Service',
        provider: 'Azure',
        type: 'Blob Storage',
        status: 'running',
        instances: 1,
        cpu: 12,
        memory: 23,
        storage: 2000,
        cost: 123.45
      }
    ]);

    setLoading(false);
  };

  const updateMetrics = () => {
    setRealTimeMetrics({
      totalProviders: cloudProviders.length,
      healthyProviders: cloudProviders.filter(p => p.status === 'healthy').length,
      totalServices: services.length,
      runningServices: services.filter(s => s.status === 'running').length,
      totalResources: resources.length,
      activeResources: resources.filter(r => r.status === 'running').length,
      totalCost: cloudProviders.reduce((sum, p) => sum + p.cost, 0),
      avgUtilization: Math.floor(Math.random() * 20) + 60
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
      case 'running':
      case 'healthy':
      case 'active':
        return 'text-green-400';
      case 'pending':
      case 'warning':
        return 'text-yellow-400';
      case 'failed':
      case 'error':
      case 'stopped':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'running':
      case 'healthy':
      case 'active':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
      case 'warning':
        return <AlertTriangle className="w-4 h-4" />;
      case 'failed':
      case 'error':
      case 'stopped':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getProviderColor = (provider) => {
    switch (provider) {
      case 'AWS':
        return 'text-orange-400';
      case 'Google Cloud':
        return 'text-blue-400';
      case 'Azure':
        return 'text-cyan-400';
      default:
        return 'text-gray-400';
    }
  };

  const getProviderIcon = (provider) => {
    switch (provider) {
      case 'AWS':
        return <Cloud className="w-5 h-5 text-orange-400" />;
      case 'Google Cloud':
        return <Cloud className="w-5 h-5 text-blue-400" />;
      case 'Azure':
        return <Cloud className="w-5 h-5 text-cyan-400" />;
      default:
        return <Cloud className="w-5 h-5 text-gray-400" />;
    }
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProvider = filterProvider === 'all' || service.provider === filterProvider;
    return matchesSearch && matchesProvider;
  });

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Cloud className="w-4 h-4" /> },
    { id: 'providers', label: 'Providers', icon: <Server className="w-4 h-4" /> },
    { id: 'services', label: 'Services', icon: <Package className="w-4 h-4" /> },
    { id: 'resources', label: 'Resources', icon: <Cpu className="w-4 h-4" /> },
    { id: 'storage', label: 'Storage', icon: <HardDrive className="w-4 h-4" /> },
    { id: 'networking', label: 'Networking', icon: <Network className="w-4 h-4" /> }
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
                Cloud Native Dashboard
              </h1>
              <p className="text-gray-400 mt-2">Multi-cloud infrastructure management and monitoring</p>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowCostAnalysis(!showCostAnalysis)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  showCostAnalysis ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <DollarSign className="w-5 h-5" />
              </button>
              <button className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Real-time Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Providers', value: `${realTimeMetrics.healthyProviders || 0}/${realTimeMetrics.totalProviders || 0}`, icon: <Cloud className="w-5 h-5" />, color: 'blue' },
            { label: 'Services', value: `${realTimeMetrics.runningServices || 0}/${realTimeMetrics.totalServices || 0}`, icon: <Package className="w-5 h-5" />, color: 'green' },
            { label: 'Resources', value: `${realTimeMetrics.activeResources || 0}/${realTimeMetrics.totalResources || 0}`, icon: <Cpu className="w-5 h-5" />, color: 'purple' },
            { label: 'Cost/Month', value: `$${(realTimeMetrics.totalCost || 0).toFixed(2)}`, icon: <DollarSign className="w-5 h-5" />, color: 'yellow' }
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
        <div className="flex space-x-1 mb-8 bg-gray-800 rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
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
                {/* Cloud Providers Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {cloudProviders.map((provider) => (
                    <motion.div
                      key={provider.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          {getProviderIcon(provider.name)}
                          <div>
                            <h3 className="text-lg font-semibold">{provider.name}</h3>
                            <p className="text-gray-400 text-sm">{provider.region}</p>
                          </div>
                        </div>
                        <div className={`flex items-center space-x-1 ${getStatusColor(provider.status)}`}>
                          {getStatusIcon(provider.status)}
                          <span className="text-sm capitalize">{provider.status}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Services</span>
                          <span className="font-medium">{provider.services}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Resources</span>
                          <span className="font-medium">{provider.resources}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Utilization</span>
                          <span className="font-medium">{provider.utilization}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Cost/Month</span>
                          <span className="font-medium">${provider.cost.toFixed(2)}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Cloud Native Architecture */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Layers className="w-5 h-5 mr-2 text-purple-400" />
                    Cloud Native Architecture
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                      { name: 'Containers', icon: <Container className="w-8 h-8" />, count: 45, color: 'blue' },
                      { name: 'Kubernetes', icon: <Server className="w-8 h-8" />, count: 3, color: 'green' },
                      { name: 'Serverless', icon: <Zap className="w-8 h-8" />, count: 12, color: 'yellow' },
                      { name: 'Storage', icon: <HardDrive className="w-8 h-8" />, count: 8, color: 'purple' }
                    ].map((component, index) => (
                      <div key={index} className="bg-gray-700 rounded-lg p-4 text-center">
                        <div className={`text-${component.color}-500 mb-2 justify-center flex`}>
                          {component.icon}
                        </div>
                        <div className="font-medium">{component.name}</div>
                        <div className="text-2xl font-bold mt-1">{component.count}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'providers' && (
              <div className="space-y-6">
                {cloudProviders.map((provider) => (
                  <motion.div
                    key={provider.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {getProviderIcon(provider.name)}
                        <div>
                          <h3 className="text-lg font-semibold">{provider.name}</h3>
                          <p className="text-gray-400 text-sm">{provider.region}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`flex items-center space-x-1 ${getStatusColor(provider.status)}`}>
                          {getStatusIcon(provider.status)}
                          <span className="text-sm capitalize">{provider.status}</span>
                        </div>
                        <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                          <Settings className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-gray-400 text-sm">Services</div>
                        <div className="font-medium">{provider.services}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Resources</div>
                        <div className="font-medium">{provider.resources}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Utilization</div>
                        <div className="font-medium">{provider.utilization}%</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Cost/Month</div>
                        <div className="font-medium">${provider.cost.toFixed(2)}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'services' && (
              <div className="space-y-6">
                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search services..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <select
                    value={filterProvider}
                    onChange={(e) => setFilterProvider(e.target.value)}
                    className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="all">All Providers</option>
                    {cloudProviders.map(provider => (
                      <option key={provider.id} value={provider.name}>{provider.name}</option>
                    ))}
                  </select>
                </div>

                {/* Services List */}
                <div className="space-y-4">
                  {filteredServices.map((service) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Package className="w-6 h-6 text-blue-400" />
                          <div>
                            <h3 className="text-lg font-semibold">{service.name}</h3>
                            <p className="text-gray-400 text-sm">{service.type} • {service.provider}</p>
                          </div>
                        </div>
                        <div className={`flex items-center space-x-1 ${getStatusColor(service.status)}`}>
                          {getStatusIcon(service.status)}
                          <span className="text-sm capitalize">{service.status}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <div className="text-gray-400 text-sm">Nodes</div>
                          <div className="font-medium">{service.nodes}</div>
                        </div>
                        <div>
                          <div className="text-gray-400 text-sm">Pods</div>
                          <div className="font-medium">{service.pods}</div>
                        </div>
                        <div>
                          <div className="text-gray-400 text-sm">CPU</div>
                          <div className="font-medium">{service.cpu}%</div>
                        </div>
                        <div>
                          <div className="text-gray-400 text-sm">Memory</div>
                          <div className="font-medium">{service.memory}%</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span>Cost: ${service.cost.toFixed(2)}/month</span>
                        <button className="flex items-center space-x-1 hover:text-blue-400">
                          <Eye className="w-4 h-4" />
                          <span>View Details</span>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="space-y-6">
                {resources.map((resource) => (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Cpu className="w-6 h-6 text-green-400" />
                        <div>
                          <h3 className="text-lg font-semibold">{resource.name}</h3>
                          <p className="text-gray-400 text-sm">{resource.type} • {resource.provider}</p>
                        </div>
                      </div>
                      <div className={`flex items-center space-x-1 ${getStatusColor(resource.status)}`}>
                        {getStatusIcon(resource.status)}
                        <span className="text-sm capitalize">{resource.status}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-gray-400 text-sm">Instances</div>
                        <div className="font-medium">{resource.instances}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">CPU</div>
                        <div className="font-medium">{resource.cpu}%</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Memory</div>
                        <div className="font-medium">{resource.memory}%</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Storage</div>
                        <div className="font-medium">{resource.storage}GB</div>
                      </div>
                      <div className="md:col-span-2">
                        <div className="text-gray-400 text-sm">Cost/Month</div>
                        <div className="font-medium">${resource.cost.toFixed(2)}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'storage' && (
              <div className="space-y-6">
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <HardDrive className="w-5 h-5 mr-2 text-orange-400" />
                    Storage Services
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: 'Object Storage', type: 'S3/Blob/GCS', capacity: '5TB', used: '2.3TB', cost: 23.45 },
                      { name: 'Block Storage', type: 'EBS/Azure Disk', capacity: '1TB', used: '856GB', cost: 67.89 },
                      { name: 'File Storage', type: 'EFS/Azure Files', capacity: '500GB', used: '234GB', cost: 34.56 },
                      { name: 'Archive Storage', type: 'Glacier/Cool Tier', capacity: '10TB', used: '4.5TB', cost: 12.34 }
                    ].map((storage, index) => (
                      <div key={index} className="bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{storage.name}</span>
                          <span className="text-sm text-gray-400">{storage.type}</span>
                        </div>
                        <div className="text-sm text-gray-400 space-y-1">
                          <div>Capacity: {storage.capacity}</div>
                          <div>Used: {storage.used}</div>
                          <div>Cost: ${storage.cost}/month</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'networking' && (
              <div className="space-y-6">
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Network className="w-5 h-5 mr-2 text-cyan-400" />
                    Network Services
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: 'Virtual Network', type: 'VPC/VNet', subnets: 4, status: 'active' },
                      { name: 'Load Balancer', type: 'ALB/Standard LB', rules: 8, status: 'active' },
                      { name: 'CDN', type: 'CloudFront/Azure CDN', endpoints: 3, status: 'active' },
                      { name: 'DNS', type: 'Route 53/Azure DNS', zones: 2, status: 'active' }
                    ].map((network, index) => (
                      <div key={index} className="bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{network.name}</span>
                          <span className="text-sm text-gray-400">{network.type}</span>
                        </div>
                        <div className="text-sm text-gray-400 space-y-1">
                          <div>Resources: {network.subnets || network.endpoints || network.rules || network.zones}</div>
                          <div>Status: {network.status}</div>
                        </div>
                      </div>
                    ))}
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

export default CloudNativeDashboard;
