import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Plus, Mail, MoreVertical, Crown, Shield, Settings, User, UserX, ChevronDown } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useTeamMembers, useInvitations, usePermissions } from '@/hooks/useOrganization'

const TeamManagement = ({ className = '' }) => {
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState('viewer')
  const [showRoleDropdown, setShowRoleDropdown] = useState(null)
  
  const { teamMembers, isLoading: membersLoading, inviteMember, updateMemberRole, removeMember } = useTeamMembers()
  const { invitations, isLoading: invitationsLoading, fetchInvitations } = useInvitations()
  const { can, isOwner, isAdmin, isManager } = usePermissions()

  useEffect(() => {
    fetchInvitations()
  }, [fetchInvitations])

  const getRoleIcon = (role) => {
    switch (role) {
      case 'owner':
        return <Crown className="w-4 h-4 text-yellow-400" />
      case 'admin':
        return <Shield className="w-4 h-4 text-red-400" />
      case 'manager':
        return <Settings className="w-4 h-4 text-blue-400" />
      case 'developer':
        return <User className="w-4 h-4 text-green-400" />
      case 'analyst':
        return <User className="w-4 h-4 text-purple-400" />
      default:
        return <User className="w-4 h-4 text-gray-400" />
    }
  }

  const getRoleLabel = (role) => {
    const labels = {
      owner: 'Sahip',
      admin: 'Yönetici',
      manager: 'Yönetici',
      developer: 'Geliştirici',
      analyst: 'Analist',
      viewer: 'İzleyici'
    }
    return labels[role] || role
  }

  const handleInvite = async () => {
    if (!inviteEmail.trim()) return
    
    try {
      await inviteMember(inviteEmail, inviteRole)
      setInviteEmail('')
      setInviteRole('viewer')
      setShowInviteModal(false)
    } catch (error) {
      console.error('Failed to invite member:', error)
    }
  }

  const handleRoleUpdate = async (memberId, newRole) => {
    try {
      await updateMemberRole(memberId, newRole)
      setShowRoleDropdown(null)
    } catch (error) {
      console.error('Failed to update role:', error)
    }
  }

  const handleRemoveMember = async (memberId) => {
    if (!confirm('Bu üyeyi kaldırmak istediğinizden emin misiniz?')) return
    
    try {
      await removeMember(memberId)
    } catch (error) {
      console.error('Failed to remove member:', error)
    }
  }

  const canManageMember = (member) => {
    if (!isOwner && !isAdmin && !isManager) return false
    if (member.role === 'owner') return false
    if (member.role === 'admin' && !isOwner) return false
    if (member.role === 'manager' && !isOwner && !isAdmin) return false
    return true
  }

  const availableRoles = () => {
    const roles = ['viewer', 'analyst', 'developer']
    if (isManager || isAdmin || isOwner) roles.push('manager')
    if (isAdmin || isOwner) roles.push('admin')
    return roles
  }

  return (
    <Card glass className={`p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Users className="w-6 h-6 text-cyan-400" />
          <h3 className="text-xl font-semibold text-white">Ekip Yönetimi</h3>
          <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-sm rounded-full">
            {teamMembers.length} üye
          </span>
        </div>
        
        {can('team', 'invite') && (
          <Button onClick={() => setShowInviteModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Üye Davet
          </Button>
        )}
      </div>

      {/* Team Members List */}
      <div className="space-y-3">
        {teamMembers.map((member) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700"
          >
            <div className="flex items-center space-x-4">
              {/* User Avatar */}
              <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center">
                {member.user.avatar_url ? (
                  <img
                    src={member.user.avatar_url}
                    alt={member.user.full_name}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <span className="text-cyan-400 font-medium">
                    {member.user.full_name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              {/* User Info */}
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium text-white">{member.user.full_name}</h4>
                  {member.role === 'owner' && (
                    <Crown className="w-4 h-4 text-yellow-400" />
                  )}
                </div>
                <p className="text-sm text-gray-400">{member.user.email}</p>
                <div className="flex items-center space-x-2 mt-1">
                  {getRoleIcon(member.role)}
                  <span className="text-xs text-gray-400">{getRoleLabel(member.role)}</span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-500">
                    {member.status === 'active' ? 'Aktif' : 'Davet edildi'}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            {canManageMember(member) && (
              <div className="relative">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowRoleDropdown(showRoleDropdown === member.id ? null : member.id)}
                >
                  <MoreVertical className="w-4 h-4" />
                </Button>

                {/* Role Dropdown */}
                <AnimatePresence>
                  {showRoleDropdown === member.id && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-10"
                    >
                      <div className="p-2">
                        <div className="px-3 py-2 text-xs text-gray-400 font-medium mb-2">
                          Rol Değiştir
                        </div>
                        {availableRoles().map((role) => (
                          <button
                            key={role}
                            onClick={() => handleRoleUpdate(member.user_id, role)}
                            className={`w-full text-left px-3 py-2 rounded text-sm ${
                              member.role === role
                                ? 'bg-cyan-500/20 text-cyan-400'
                                : 'text-gray-300 hover:bg-gray-800'
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              {getRoleIcon(role)}
                              <span>{getRoleLabel(role)}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                      
                      <div className="border-t border-gray-700 p-2">
                        <button
                          onClick={() => handleRemoveMember(member.user_id)}
                          className="w-full text-left px-3 py-2 rounded text-sm text-red-400 hover:bg-red-500/10"
                        >
                          <div className="flex items-center space-x-2">
                            <UserX className="w-4 h-4" />
                            <span>Üyeyi Kaldır</span>
                          </div>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Pending Invitations */}
      {invitations.length > 0 && (
        <div className="mt-6">
          <h4 className="text-lg font-medium text-white mb-3">Bekleyen Davetler</h4>
          <div className="space-y-2">
            {invitations.map((invitation) => (
              <motion.div
                key={invitation.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-yellow-400" />
                  <div>
                    <p className="text-sm font-medium text-white">{invitation.email}</p>
                    <p className="text-xs text-gray-400">
                      {getRoleLabel(invitation.role)} olarak davet edildi
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-yellow-400">
                    {new Date(invitation.expires_at).toLocaleDateString('tr-TR')}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Invite Modal */}
      <AnimatePresence>
        {showInviteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowInviteModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gray-900 border border-gray-700 rounded-lg p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold text-white mb-4">Üye Davet Et</h3>
              
              <div className="space-y-4">
                <Input
                  label="E-posta Adresi"
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="ornek@email.com"
                  icon={<Mail className="w-4 h-4" />}
                />
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Rol
                  </label>
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                  >
                    {availableRoles().map((role) => (
                      <option key={role} value={role}>
                        {getRoleLabel(role)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 mt-6">
                <Button
                  variant="secondary"
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1"
                >
                  İptal
                </Button>
                <Button
                  onClick={handleInvite}
                  disabled={!inviteEmail.trim()}
                  className="flex-1"
                >
                  Davet Gönder
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

export default TeamManagement
