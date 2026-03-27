import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, ChevronDown, Plus, Settings, Users, BarChart3, Crown, Shield, Eye } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useOrganization, useOrganizationList, usePermissions } from '@/hooks/useOrganization'

const OrganizationSelector = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { organization, userRole, switchOrganization } = useOrganization()
  const { organizations } = useOrganizationList()
  const { can } = usePermissions()

  const getRoleIcon = (role) => {
    switch (role) {
      case 'owner':
        return <Crown className="w-4 h-4" />
      case 'admin':
        return <Shield className="w-4 h-4" />
      case 'manager':
        return <Users className="w-4 h-4" />
      case 'developer':
        return <BarChart3 className="w-4 h-4" />
      case 'analyst':
        return <BarChart3 className="w-4 h-4" />
      default:
        return <Eye className="w-4 h-4" />
    }
  }

  const getRoleColor = (role) => {
    switch (role) {
      case 'owner':
        return 'text-yellow-400'
      case 'admin':
        return 'text-red-400'
      case 'manager':
        return 'text-blue-400'
      case 'developer':
        return 'text-green-400'
      case 'analyst':
        return 'text-purple-400'
      default:
        return 'text-gray-400'
    }
  }

  const getPlanColor = (plan) => {
    switch (plan) {
      case 'free':
        return 'text-gray-400'
      case 'starter':
        return 'text-blue-400'
      case 'pro':
        return 'text-purple-400'
      case 'enterprise':
        return 'text-yellow-400'
      default:
        return 'text-gray-400'
    }
  }

  const handleOrganizationSwitch = async (orgId) => {
    await switchOrganization(orgId)
    setIsOpen(false)
  }

  if (!organization) {
    return (
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Building2 className="w-5 h-5 text-gray-400" />
            <span className="text-gray-400">Organizasyon seçilmedi</span>
          </div>
          <Button size="sm" variant="secondary">
            <Plus className="w-4 h-4 mr-2" />
            Organizasyon Oluştur
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {/* Current Organization Display */}
      <Button
        variant="secondary"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-between"
      >
        <div className="flex items-center space-x-3">
          {organization.logo_url ? (
            <img
              src={organization.logo_url}
              alt={organization.name}
              className="w-6 h-6 rounded"
            />
          ) : (
            <Building2 className="w-5 h-5 text-cyan-400" />
          )}
          
          <div className="text-left">
            <div className="font-medium text-white">{organization.name}</div>
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <span className={`capitalize ${getPlanColor(organization.plan)}`}>
                {organization.plan}
              </span>
              <span>•</span>
              <span className={`flex items-center space-x-1 ${getRoleColor(userRole)}`}>
                {getRoleIcon(userRole)}
                <span className="capitalize">{userRole}</span>
              </span>
            </div>
          </div>
        </div>
        
        <ChevronDown
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </Button>

      {/* Organization Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full left-0 right-0 mt-2 z-50"
          >
            <Card glass className="shadow-2xl max-h-96 overflow-y-auto">
              {/* Organization List */}
              <div className="p-2">
                {organizations.map((org) => (
                  <motion.button
                    key={org.id}
                    whileHover={{ backgroundColor: 'rgba(6, 182, 212, 0.1)' }}
                    onClick={() => handleOrganizationSwitch(org.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      org.id === organization.id ? 'bg-cyan-500/20' : 'hover:bg-gray-800/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {org.logo_url ? (
                          <img
                            src={org.logo_url}
                            alt={org.name}
                            className="w-6 h-6 rounded"
                          />
                        ) : (
                          <Building2 className="w-5 h-5 text-cyan-400" />
                        )}
                        
                        <div>
                          <div className="font-medium text-white">{org.name}</div>
                          <div className="flex items-center space-x-2 text-xs text-gray-400">
                            <span className={`capitalize ${getPlanColor(org.plan)}`}>
                              {org.plan}
                            </span>
                            <span>•</span>
                            <span>{org.team_members?.length || 0} üye</span>
                          </div>
                        </div>
                      </div>
                      
                      {org.id === organization.id && (
                        <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-gray-700" />

              {/* Action Buttons */}
              <div className="p-2 space-y-1">
                {can('organizations', 'create') && (
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      setIsOpen(false)
                      // TODO: Open create organization modal
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Yeni Organizasyon
                  </Button>
                )}
                
                {can('organizations', 'update') && (
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      setIsOpen(false)
                      // TODO: Open organization settings
                    }}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Organizasyon Ayarları
                  </Button>
                )}
                
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setIsOpen(false)}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Üye Davet
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}

export default OrganizationSelector
