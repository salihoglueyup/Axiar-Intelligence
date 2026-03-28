import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Building2, Users, TrendingUp, Activity, DollarSign, Server, Clock, ArrowUp, ArrowDown } from 'lucide-react'
import Card from '@/components/ui/Card'
import { useOrganization, useOrganizationUsage, useOrganizationAnalytics } from '@/hooks/useOrganization'

const OrganizationDashboard = ({ className = '' }) => {
  const { organization } = useOrganization()
  const { usage } = useOrganizationUsage()
  const { analytics, fetchAnalytics } = useOrganizationAnalytics()

  useEffect(() => {
    fetchAnalytics()
  }, [fetchAnalytics])

  const formatNumber = (num) => {
    return new Intl.NumberFormat('tr-TR').format(num)
  }

  const formatBytes = (bytes) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) return '0 Bytes'
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  }



  const getUsagePercentage = (used, limit) => {
    return Math.round((used / limit) * 100)
  }

  const getUsageColor = (percentage) => {
    if (percentage > 90) return 'text-red-400'
    if (percentage > 75) return 'text-yellow-400'
    return 'text-green-400'
  }

  const getTrendIcon = (value) => {
    if (value > 0) return <ArrowUp className="w-4 h-4 text-green-400" />
    if (value < 0) return <ArrowDown className="w-4 h-4 text-red-400" />
    return <div className="w-4 h-4" />
  }

  if (!organization) {
    return (
      <Card className="p-6">
        <div className="text-center text-gray-400">
          <Building2 className="w-12 h-12 mx-auto mb-4" />
          <p>Organizasyon seçilmedi</p>
        </div>
      </Card>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Organization Header */}
      <Card glass className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {organization.logo_url ? (
              <img
                src={organization.logo_url}
                alt={organization.name}
                className="w-16 h-16 rounded-lg"
              />
            ) : (
              <div className="w-16 h-16 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                <Building2 className="w-8 h-8 text-cyan-400" />
              </div>
            )}
            
            <div>
              <h1 className="text-2xl font-bold text-white">{organization.name}</h1>
              <p className="text-gray-400">{organization.description}</p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-sm rounded-full">
                  {organization.plan}
                </span>
                <span className="text-sm text-gray-400">
                  {organization.industry}
                </span>
                <span className="text-sm text-gray-400">
                  {organization.size}
                </span>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-gray-400">Kuruluş</div>
            <div className="text-white">
              {new Date(organization.created_at).toLocaleDateString('tr-TR')}
            </div>
          </div>
        </div>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card glass className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-cyan-400" />
              <div className="text-right">
                <div className="text-2xl font-bold text-white">
                  {usage?.users_count || 0}
                </div>
                <div className="text-sm text-gray-400">Toplam Üye</div>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Limit: {usage?.limits?.max_users || 0}</span>
              <span className={getUsageColor(getUsagePercentage(usage?.users_count || 0, usage?.limits?.max_users || 1))}>
                {getUsagePercentage(usage?.users_count || 0, usage?.limits?.max_users || 1)}%
              </span>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card glass className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Server className="w-8 h-8 text-purple-400" />
              <div className="text-right">
                <div className="text-2xl font-bold text-white">
                  {usage?.projects_count || 0}
                </div>
                <div className="text-sm text-gray-400">Aktif Projeler</div>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Limit: {usage?.limits?.max_projects || 0}</span>
              <span className={getUsageColor(getUsagePercentage(usage?.projects_count || 0, usage?.limits?.max_projects || 1))}>
                {getUsagePercentage(usage?.projects_count || 0, usage?.limits?.max_projects || 1)}%
              </span>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card glass className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-green-400" />
              <div className="text-right">
                <div className="text-2xl font-bold text-white">
                  {formatNumber(usage?.api_calls || 0)}
                </div>
                <div className="text-sm text-gray-400">API Çağrıları</div>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Aylık Limit</span>
              <span className={getUsageColor(getUsagePercentage(usage?.api_calls || 0, usage?.limits?.max_api_calls_per_month || 1))}>
                {getUsagePercentage(usage?.api_calls || 0, usage?.limits?.max_api_calls_per_month || 1)}%
              </span>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card glass className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Server className="w-8 h-8 text-yellow-400" />
              <div className="text-right">
                <div className="text-2xl font-bold text-white">
                  {formatBytes(usage?.storage_used || 0)}
                </div>
                <div className="text-sm text-gray-400">Depolama</div>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Limit: {usage?.limits?.max_storage_gb || 0}GB</span>
              <span className={getUsageColor(getUsagePercentage(usage?.storage_used || 0, (usage?.limits?.max_storage_gb || 1) * 1024 * 1024 * 1024))}>
                {getUsagePercentage(usage?.storage_used || 0, (usage?.limits?.max_storage_gb || 1) * 1024 * 1024 * 1024)}%
              </span>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Analytics Overview */}
      {analytics && (
        <Card glass className="p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Performans Analizi</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Kullanıcı Aktivitesi</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Aktif Kullanıcılar</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium">
                      {analytics.metrics.active_users}
                    </span>
                    {getTrendIcon(analytics.metrics.active_users)}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Yeni Kullanıcılar</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium">
                      {analytics.metrics.new_users}
                    </span>
                    {getTrendIcon(analytics.metrics.new_users)}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Oturum Süresi</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium">
                      {Math.round(analytics.metrics.session_duration / 60)}dk
                    </span>
                    {getTrendIcon(analytics.metrics.session_duration)}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Projeler</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Tamamlanan Projeler</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium">
                      {analytics.metrics.completed_projects}
                    </span>
                    {getTrendIcon(analytics.metrics.completed_projects)}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Toplam Projeler</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium">
                      {analytics.metrics.total_projects}
                    </span>
                    {getTrendIcon(analytics.metrics.total_projects)}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Tamamlanma Oranı</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium">
                      {analytics.metrics.total_projects > 0 
                        ? Math.round((analytics.metrics.completed_projects / analytics.metrics.total_projects) * 100)
                        : 0}%
                    </span>
                    {getTrendIcon(analytics.metrics.completed_projects)}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Sistem Performansı</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Sayfa Görüntüleme</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium">
                      {formatNumber(analytics.metrics.page_views)}
                    </span>
                    {getTrendIcon(analytics.metrics.page_views)}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Bounce Rate</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium">
                      {Math.round(analytics.metrics.bounce_rate)}%
                    </span>
                    {getTrendIcon(-analytics.metrics.bounce_rate)}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">API Kullanımı</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium">
                      {formatNumber(analytics.metrics.api_calls)}
                    </span>
                    {getTrendIcon(analytics.metrics.api_calls)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Top Users */}
      {analytics?.top_users && analytics.top_users.length > 0 && (
        <Card glass className="p-6">
          <h2 className="text-xl font-semibold text-white mb-6">En Aktif Kullanıcılar</h2>
          
          <div className="space-y-3">
            {analytics.top_users.slice(0, 5).map((user, index) => (
              <motion.div
                key={user.user_id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center">
                    <span className="text-cyan-400 font-medium text-sm">
                      {user.user_name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-white">{user.user_name}</div>
                    <div className="text-sm text-gray-400">{user.user_email}</div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm text-white">{user.login_count} giriş</div>
                  <div className="text-xs text-gray-400">
                    {Math.round(user.session_duration / 60)}dk oturum
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}

export default OrganizationDashboard
