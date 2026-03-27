import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, AlertTriangle, Bug, Eye, Clock, CheckCircle, XCircle, Target, Zap, Activity, TrendingUp, Filter, Search, Calendar, MapPin, User, Globe, Database, Server, FileText, Settings, Play, Pause, Archive, Trash2, Edit, Plus, RefreshCw, Download, Upload, ChevronDown, ChevronRight } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useSecurityThreats, getThreatSeverityColor, getThreatSeverityLabel, getThreatStatusColor, getThreatStatusLabel } from '@/hooks/useSecurity'

const ThreatDetection = ({ className = '' }) => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedThreat, setSelectedThreat] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [severityFilter, setSeverityFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [expandedThreats, setExpandedThreats] = useState(new Set())
  
  const { threats, createThreat, updateThreat, resolveThreat } = useSecurityThreats()

  const severityOptions = [
    { value: 'all', label: 'Tümü', color: 'text-gray-400' },
    { value: 'info', label: 'Bilgi', color: 'text-blue-400' },
    { value: 'low', label: 'Düşük', color: 'text-green-400' },
    { value: 'medium', label: 'Orta', color: 'text-yellow-400' },
    { value: 'high', label: 'Yüksek', color: 'text-orange-400' },
    { value: 'critical', label: 'Kritik', color: 'text-red-400' }
  ]

  const statusOptions = [
    { value: 'all', label: 'Tümü', color: 'text-gray-400' },
    { value: 'detected', label: 'Tespit Edildi', color: 'text-yellow-400' },
    { value: 'investigating', label: 'İnceleniyor', color: 'text-blue-400' },
    { value: 'contained', label: 'Kontrol Altında', color: 'text-orange-400' },
    { value: 'resolved', label: 'Çözüldü', color: 'text-green-400' },
    { value: 'false_positive', label: 'Yanlış Pozitif', color: 'text-gray-400' },
    { value: 'ignored', label: 'Göz Ardı Edildi', color: 'text-gray-500' }
  ]

  const typeOptions = [
    { value: 'all', label: 'Tümü', icon: '🔍' },
    { value: 'malware', label: 'Kötü Amaçlı Yazılım', icon: '🦠' },
    { value: 'phishing', label: 'Oltalama', icon: '🎣' },
    { value: 'sql_injection', label: 'SQL Enjeksiyonu', icon: '💉' },
    { value: 'xss', label: 'XSS', icon: '⚡' },
    { value: 'ddos', label: 'DDoS', icon: '🌊' },
    { value: 'brute_force', label: 'Kaba Kuvvet', icon: '🔨' },
    { value: 'data_breach', label: 'Veri İhlali', icon: '📊' },
    { value: 'insider_threat', label: 'İç Tehdit', icon: '👤' },
    { value: 'social_engineering', label: 'Sosyal Mühendislik', icon: '🎭' },
    { value: 'zero_day', label: 'Sıfır Gün', icon: '🚀' },
    { value: 'ransomware', label: 'Fidye Yazılımı', icon: '🔒' },
    { value: 'botnet', label: 'Botnet', icon: '🤖' },
    { value: 'apt', label: 'APT', icon: '🎯' }
  ]

  const [newThreat, setNewThreat] = useState({
    title: '',
    description: '',
    type: 'malware',
    category: 'malicious_code',
    severity: 'medium',
    source: {
      type: 'external',
      ip_address: '',
      domain: '',
      email: '',
      location: {
        country: '',
        region: '',
        city: '',
        latitude: 0,
        longitude: 0,
        isp: ''
      },
      device: {
        type: 'desktop',
        os: '',
        fingerprint: '',
        trusted: false
      },
      network: {
        protocol: '',
        port: 0,
        vpn: false,
        proxy: false
      }
    },
    target: {
      type: 'system',
      resource: '',
      user_id: '',
      endpoint: '',
      data: '',
      system: ''
    },
    indicators: [],
    timeline: {
      detected_at: new Date().toISOString(),
      first_activity: '',
      last_activity: '',
      duration: 0,
      events: []
    },
    impact: {
      affected_systems: [],
      affected_users: [],
      data_exposed: {
        records_count: 0,
        data_types: [],
        sensitivity: 'internal',
        pii_involved: false
      },
      financial_impact: {
        estimated_loss: 0,
        currency: 'USD',
        response_cost: 0,
        recovery_cost: 0,
        regulatory_fines: 0
      },
      operational_impact: {
        downtime_hours: 0,
        systems_affected: [],
        productivity_loss: 0,
        customer_impact: ''
      },
      reputational_impact: {
        customer_trust: 'none',
        brand_image: 'none',
        market_position: 'none',
        stakeholder_confidence: 'none'
      }
    },
    metadata: {
      attack_vector: '',
      attack_complexity: 'medium',
      privileges_required: 'none',
      user_interaction: 'required',
      scope: 'unchanged',
      confidentiality: 'none',
      integrity: 'none',
      availability: 'none',
      cve_id: '',
      mitre_tactics: [],
      mitre_techniques: []
    }
  })

  const handleCreateThreat = async () => {
    try {
      await createThreat({
        ...newThreat,
        status: 'detected',
        confidence: 0.8,
        is_resolved: false
      })
      
      setNewThreat({
        title: '',
        description: '',
        type: 'malware',
        category: 'malicious_code',
        severity: 'medium',
        source: {
          type: 'external',
          ip_address: '',
          domain: '',
          email: '',
          location: {
            country: '',
            region: '',
            city: '',
            latitude: 0,
            longitude: 0,
            isp: ''
          },
          device: {
            type: 'desktop',
            os: '',
            fingerprint: '',
            trusted: false
          },
          network: {
            protocol: '',
            port: 0,
            vpn: false,
            proxy: false
          }
        },
        target: {
          type: 'system',
          resource: '',
          user_id: '',
          endpoint: '',
          data: '',
          system: ''
        },
        indicators: [],
        timeline: {
          detected_at: new Date().toISOString(),
          first_activity: '',
          last_activity: '',
          duration: 0,
          events: []
        },
        impact: {
          affected_systems: [],
          affected_users: [],
          data_exposed: {
            records_count: 0,
            data_types: [],
            sensitivity: 'internal',
            pii_involved: false
          },
          financial_impact: {
            estimated_loss: 0,
            currency: 'USD',
            response_cost: 0,
            recovery_cost: 0,
            regulatory_fines: 0
          },
          operational_impact: {
            downtime_hours: 0,
            systems_affected: [],
            productivity_loss: 0,
            customer_impact: ''
          },
          reputational_impact: {
            customer_trust: 'none',
            brand_image: 'none',
            market_position: 'none',
            stakeholder_confidence: 'none'
          }
        },
        metadata: {
          attack_vector: '',
          attack_complexity: 'medium',
          privileges_required: 'none',
          user_interaction: 'required',
          scope: 'unchanged',
          confidentiality: 'none',
          integrity: 'none',
          availability: 'none',
          cve_id: '',
          mitre_tactics: [],
          mitre_techniques: []
        }
      })
      setShowCreateModal(false)
    } catch (error) {
      console.error('Failed to create threat:', error)
    }
  }

  const handleResolveThreat = async (threatId) => {
    try {
      await resolveThreat(threatId)
    } catch (error) {
      console.error('Failed to resolve threat:', error)
    }
  }

  const toggleThreatExpansion = (threatId) => {
    const newExpanded = new Set(expandedThreats)
    if (newExpanded.has(threatId)) {
      newExpanded.delete(threatId)
    } else {
      newExpanded.add(threatId)
    }
    setExpandedThreats(newExpanded)
  }

  const filteredThreats = threats.filter(threat => {
    const matchesSearch = threat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         threat.description?.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesSeverity = severityFilter === 'all' || threat.severity === severityFilter
    const matchesStatus = statusFilter === 'all' || threat.status === statusFilter
    const matchesType = typeFilter === 'all' || threat.type === typeFilter
    
    return matchesSearch && matchesSeverity && matchesStatus && matchesType
  })

  const getThreatTypeIcon = (type) => {
    const found = typeOptions.find(t => t.value === type)
    return found ? found.icon : '🔍'
  }

  const getThreatTypeLabel = (type) => {
    const found = typeOptions.find(t => t.value === type)
    return found ? found.label : type
  }

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'info':
        return <Activity className="w-4 h-4" />
      case 'low':
        return <CheckCircle className="w-4 h-4" />
      case 'medium':
        return <AlertTriangle className="w-4 h-4" />
      case 'high':
        return <Zap className="w-4 h-4" />
      case 'critical':
        return <XCircle className="w-4 h-4" />
      default:
        return <Activity className="w-4 h-4" />
    }
  }

  const formatDuration = (seconds) => {
    if (!seconds) return '-'
    
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`
    } else {
      return `${secs}s`
    }
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Shield className="w-6 h-6 text-cyan-400" />
          <h2 className="text-2xl font-semibold text-white">Tehdit Tespiti</h2>
          <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-sm rounded-full">
            {threats.length} tehdit
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="secondary" onClick={() => setShowCreateModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Tehdit
          </Button>
          <Button variant="secondary">
            <RefreshCw className="w-4 h-4 mr-2" />
            Yenile
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card glass className="p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <Input
              placeholder="Tehdit ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
          >
            {severityOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
          >
            {typeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Threat List */}
      <div className="space-y-4">
        {filteredThreats.map((threat) => (
          <Card glass key={threat.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className={`mt-1 ${getThreatSeverityColor(threat.severity)}`}>
                  {getSeverityIcon(threat.severity)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-lg">{getThreatTypeIcon(threat.type)}</span>
                    <h3 className="text-lg font-semibold text-white">
                      {threat.title}
                    </h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${getThreatSeverityColor(threat.severity)} bg-opacity-20`}>
                      {getThreatSeverityLabel(threat.severity)}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getThreatStatusColor(threat.status)} bg-opacity-20`}>
                      {getThreatStatusLabel(threat.status)}
                    </span>
                  </div>
                  
                  <p className="text-gray-400 mb-3">
                    {threat.description}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                    <div className="flex items-center space-x-1">
                      <Target className="w-4 h-4" />
                      <span>{getThreatTypeLabel(threat.type)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(threat.created_at).toLocaleDateString('tr-TR')}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Activity className="w-4 h-4" />
                      <span>Güven: {Math.round((threat.confidence || 0) * 100)}%</span>
                    </div>
                  </div>

                  {/* Expandable Details */}
                  <div className="space-y-3">
                    <button
                      onClick={() => toggleThreatExpansion(threat.id)}
                      className="flex items-center space-x-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      {expandedThreats.has(threat.id) ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                      <span>Detaylar</span>
                    </button>

                    <AnimatePresence>
                      {expandedThreats.has(threat.id) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-4 pl-6 border-l-2 border-gray-700"
                        >
                          {/* Source Information */}
                          <div>
                            <h4 className="text-sm font-medium text-white mb-2">Kaynak Bilgisi</h4>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <span className="text-gray-400">Tip:</span>
                                <span className="text-white ml-2">{threat.source?.type}</span>
                              </div>
                              {threat.source?.ip_address && (
                                <div>
                                  <span className="text-gray-400">IP:</span>
                                  <span className="text-white ml-2">{threat.source.ip_address}</span>
                                </div>
                              )}
                              {threat.source?.domain && (
                                <div>
                                  <span className="text-gray-400">Domain:</span>
                                  <span className="text-white ml-2">{threat.source.domain}</span>
                                </div>
                              )}
                              {threat.source?.location?.country && (
                                <div>
                                  <span className="text-gray-400">Konum:</span>
                                  <span className="text-white ml-2">{threat.source.location.country}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Target Information */}
                          <div>
                            <h4 className="text-sm font-medium text-white mb-2">Hedef Bilgisi</h4>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <span className="text-gray-400">Tip:</span>
                                <span className="text-white ml-2">{threat.target?.type}</span>
                              </div>
                              {threat.target?.resource && (
                                <div>
                                  <span className="text-gray-400">Kaynak:</span>
                                  <span className="text-white ml-2">{threat.target.resource}</span>
                                </div>
                              )}
                              {threat.target?.system && (
                                <div>
                                  <span className="text-gray-400">Sistem:</span>
                                  <span className="text-white ml-2">{threat.target.system}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Timeline */}
                          {threat.timeline && (
                            <div>
                              <h4 className="text-sm font-medium text-white mb-2">Zaman Çizelgesi</h4>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                  <span className="text-gray-400">Tespit:</span>
                                  <span className="text-white ml-2">
                                    {new Date(threat.timeline.detected_at).toLocaleString('tr-TR')}
                                  </span>
                                </div>
                                {threat.timeline.duration && (
                                  <div>
                                    <span className="text-gray-400">Süre:</span>
                                    <span className="text-white ml-2">
                                      {formatDuration(threat.timeline.duration)}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Impact */}
                          {threat.impact && (
                            <div>
                              <h4 className="text-sm font-medium text-white mb-2">Etki</h4>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                {threat.impact.affected_systems.length > 0 && (
                                  <div>
                                    <span className="text-gray-400">Etkilen Sistemler:</span>
                                    <span className="text-white ml-2">
                                      {threat.impact.affected_systems.length}
                                    </span>
                                  </div>
                                )}
                                {threat.impact.affected_users.length > 0 && (
                                  <div>
                                    <span className="text-gray-400">Etkilen Kullanıcılar:</span>
                                    <span className="text-white ml-2">
                                      {threat.impact.affected_users.length}
                                    </span>
                                  </div>
                                )}
                                {threat.impact.financial_impact.estimated_loss > 0 && (
                                  <div>
                                    <span className="text-gray-400">Finansal Kayıp:</span>
                                    <span className="text-white ml-2">
                                      ${threat.impact.financial_impact.estimated_loss.toLocaleString()}
                                    </span>
                                  </div>
                                )}
                                {threat.impact.operational_impact.downtime_hours > 0 && (
                                  <div>
                                    <span className="text-gray-400">Kesinti Süresi:</span>
                                    <span className="text-white ml-2">
                                      {threat.impact.operational_impact.downtime_hours} saat
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Indicators */}
                          {threat.indicators && threat.indicators.length > 0 && (
                            <div>
                              <h4 className="text-sm font-medium text-white mb-2">Göstergeler</h4>
                              <div className="space-y-1">
                                {threat.indicators.slice(0, 3).map((indicator, index) => (
                                  <div key={index} className="text-sm">
                                    <span className="text-gray-400">{indicator.type}:</span>
                                    <span className="text-white ml-2">{indicator.value}</span>
                                    <span className="text-gray-500 ml-2">
                                      ({Math.round((indicator.confidence || 0) * 100)}% güven)
                                    </span>
                                  </div>
                                ))}
                                {threat.indicators.length > 3 && (
                                  <div className="text-sm text-gray-400">
                                    +{threat.indicators.length - 3} daha fazla gösterge
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 ml-4">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setSelectedThreat(threat)
                    setShowDetailsModal(true)
                  }}
                >
                  <Eye className="w-4 h-4" />
                </Button>
                
                {threat.status !== 'resolved' && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleResolveThreat(threat.id)}
                  >
                    <CheckCircle className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}

        {filteredThreats.length === 0 && (
          <Card glass className="p-12 text-center">
            <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Tehdit Bulunamadı</h3>
            <p className="text-gray-400">
              {searchQuery || severityFilter !== 'all' || statusFilter !== 'all' || typeFilter !== 'all'
                ? 'Filtre kriterlerinize uygun tehdit bulunamadı.'
                : 'Henüz tehdit kaydı bulunmuyor.'}
            </p>
          </Card>
        )}
      </div>

      {/* Create Threat Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gray-900 border border-gray-700 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold text-white mb-4">Yeni Tehdit</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Başlık
                  </label>
                  <Input
                    value={newThreat.title}
                    onChange={(e) => setNewThreat({ ...newThreat, title: e.target.value })}
                    placeholder="Tehdit başlığını girin"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Açıklama
                  </label>
                  <textarea
                    value={newThreat.description}
                    onChange={(e) => setNewThreat({ ...newThreat, description: e.target.value })}
                    placeholder="Tehdit açıklamasını girin"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none resize-none"
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Tehdit Tipi
                    </label>
                    <select
                      value={newThreat.type}
                      onChange={(e) => setNewThreat({ ...newThreat, type: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                    >
                      {typeOptions.slice(1).map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Şiddet Seviyesi
                    </label>
                    <select
                      value={newThreat.severity}
                      onChange={(e) => setNewThreat({ ...newThreat, severity: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                    >
                      {severityOptions.slice(1).map(severity => (
                        <option key={severity.value} value={severity.value}>
                          {severity.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Kaynak IP Adresi
                  </label>
                  <Input
                    value={newThreat.source.ip_address}
                    onChange={(e) => setNewThreat({ 
                      ...newThreat, 
                      source: { ...newThreat.source, ip_address: e.target.value }
                    })}
                    placeholder="IP adresini girin"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Hedef Sistem
                  </label>
                  <Input
                    value={newThreat.target.system}
                    onChange={(e) => setNewThreat({ 
                      ...newThreat, 
                      target: { ...newThreat.target, system: e.target.value }
                    })}
                    placeholder="Hedef sistemi girin"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-3 mt-6">
                <Button
                  variant="secondary"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1"
                >
                  İptal
                </Button>
                <Button
                  onClick={handleCreateThreat}
                  disabled={!newThreat.title.trim()}
                  className="flex-1"
                >
                  Oluştur
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Threat Details Modal */}
      <AnimatePresence>
        {showDetailsModal && selectedThreat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowDetailsModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gray-900 border border-gray-700 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Tehdit Detayları</h3>
                <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
                  <XCircle className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-6">
                {/* Basic Information */}
                <div>
                  <h4 className="text-lg font-medium text-white mb-3">Temel Bilgiler</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-gray-400">Başlık:</span>
                      <div className="text-white">{selectedThreat.title}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Tip:</span>
                      <div className="text-white">{getThreatTypeLabel(selectedThreat.type)}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Şiddet:</span>
                      <div className={`text-white ${getThreatSeverityColor(selectedThreat.severity)}`}>
                        {getThreatSeverityLabel(selectedThreat.severity)}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-400">Durum:</span>
                      <div className={`text-white ${getThreatStatusColor(selectedThreat.status)}`}>
                        {getThreatStatusLabel(selectedThreat.status)}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-400">Güven:</span>
                      <div className="text-white">{Math.round((selectedThreat.confidence || 0) * 100)}%</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Tespit Tarihi:</span>
                      <div className="text-white">
                        {new Date(selectedThreat.created_at).toLocaleString('tr-TR')}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                {selectedThreat.description && (
                  <div>
                    <h4 className="text-lg font-medium text-white mb-3">Açıklama</h4>
                    <p className="text-gray-300">{selectedThreat.description}</p>
                  </div>
                )}

                {/* Source Information */}
                {selectedThreat.source && (
                  <div>
                    <h4 className="text-lg font-medium text-white mb-3">Kaynak Bilgisi</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedThreat.source.type && (
                        <div>
                          <span className="text-gray-400">Tip:</span>
                          <div className="text-white">{selectedThreat.source.type}</div>
                        </div>
                      )}
                      {selectedThreat.source.ip_address && (
                        <div>
                          <span className="text-gray-400">IP Adresi:</span>
                          <div className="text-white">{selectedThreat.source.ip_address}</div>
                        </div>
                      )}
                      {selectedThreat.source.domain && (
                        <div>
                          <span className="text-gray-400">Domain:</span>
                          <div className="text-white">{selectedThreat.source.domain}</div>
                        </div>
                      )}
                      {selectedThreat.source.email && (
                        <div>
                          <span className="text-gray-400">E-posta:</span>
                          <div className="text-white">{selectedThreat.source.email}</div>
                        </div>
                      )}
                      {selectedThreat.source.location && (
                        <div>
                          <span className="text-gray-400">Konum:</span>
                          <div className="text-white">
                            {selectedThreat.source.location.city && `${selectedThreat.source.location.city}, `}
                            {selectedThreat.source.location.region && `${selectedThreat.source.location.region}, `}
                            {selectedThreat.source.location.country}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Target Information */}
                {selectedThreat.target && (
                  <div>
                    <h4 className="text-lg font-medium text-white mb-3">Hedef Bilgisi</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedThreat.target.type && (
                        <div>
                          <span className="text-gray-400">Tip:</span>
                          <div className="text-white">{selectedThreat.target.type}</div>
                        </div>
                      )}
                      {selectedThreat.target.resource && (
                        <div>
                          <span className="text-gray-400">Kaynak:</span>
                          <div className="text-white">{selectedThreat.target.resource}</div>
                        </div>
                      )}
                      {selectedThreat.target.system && (
                        <div>
                          <span className="text-gray-400">Sistem:</span>
                          <div className="text-white">{selectedThreat.target.system}</div>
                        </div>
                      )}
                      {selectedThreat.target.endpoint && (
                        <div>
                          <span className="text-gray-400">Endpoint:</span>
                          <div className="text-white">{selectedThreat.target.endpoint}</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Impact Assessment */}
                {selectedThreat.impact && (
                  <div>
                    <h4 className="text-lg font-medium text-white mb-3">Etki Değerlendirmesi</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedThreat.impact.affected_systems.length > 0 && (
                        <div>
                          <span className="text-gray-400">Etkilen Sistemler:</span>
                          <div className="text-white">{selectedThreat.impact.affected_systems.join(', ')}</div>
                        </div>
                      )}
                      {selectedThreat.impact.affected_users.length > 0 && (
                        <div>
                          <span className="text-gray-400">Etkilen Kullanıcılar:</span>
                          <div className="text-white">{selectedThreat.impact.affected_users.length} kullanıcı</div>
                        </div>
                      )}
                      {selectedThreat.impact.data_exposed.records_count > 0 && (
                        <div>
                          <span className="text-gray-400">İfşa Edilen Veri:</span>
                          <div className="text-white">{selectedThreat.impact.data_exposed.records_count} kayıt</div>
                        </div>
                      )}
                      {selectedThreat.impact.financial_impact.estimated_loss > 0 && (
                        <div>
                          <span className="text-gray-400">Finansal Kayıp:</span>
                          <div className="text-white">
                            ${selectedThreat.impact.financial_impact.estimated_loss.toLocaleString()}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center space-x-3 pt-4 border-t border-gray-700">
                  {selectedThreat.status !== 'resolved' && (
                    <Button
                      onClick={() => {
                        handleResolveThreat(selectedThreat.id)
                        setShowDetailsModal(false)
                      }}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Tehditi Çöz
                    </Button>
                  )}
                  <Button variant="secondary">
                    <Download className="w-4 h-4 mr-2" />
                    Rapor İndir
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ThreatDetection
