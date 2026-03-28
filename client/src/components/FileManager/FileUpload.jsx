import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X, File, Image, FileText, Archive, Music, Video, AlertCircle, CheckCircle } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Progress from '@/components/ui/Progress'

const FileUpload = ({ 
  onUpload, 
  onRemove, 
  accept = '*/*',
  maxSize = 10 * 1024 * 1024, // 10MB
  maxFiles = 5,
  multiple = false,
  showPreview = true,
  showProgress = true,
  className = '',
  disabled = false
}) => {
  const [files, setFiles] = useState([])
  const [dragActive, setDragActive] = useState(false)
  const [uploadProgress, setUploadProgress] = useState({})
  const [uploadErrors, setUploadErrors] = useState({})
  const fileInputRef = useRef(null)

  // Get file icon based on type
  const getFileIcon = (file) => {
    if (file.type.startsWith('image/')) return <Image className="w-8 h-8" />
    if (file.type.startsWith('video/')) return <Video className="w-8 h-8" />
    if (file.type.startsWith('audio/')) return <Music className="w-8 h-8" />
    if (file.type.includes('pdf') || file.type.includes('document')) return <FileText className="w-8 h-8" />
    if (file.type.includes('zip') || file.type.includes('rar') || file.type.includes('tar')) return <Archive className="w-8 h-8" />
    return <File className="w-8 h-8" />
  }

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  // Validate file
  const validateFile = (file) => {
    const errors = []

    // Check file size
    if (file.size > maxSize) {
      errors.push(`Dosya boyutu çok büyük (${formatFileSize(file.size)} > ${formatFileSize(maxSize)})`)
    }

    // Check file type
    if (accept !== '*/*' && accept !== '*') {
      const acceptedTypes = accept.split(',').map(type => type.trim())
      const isAccepted = acceptedTypes.some(type => {
        if (type.startsWith('.')) {
          return file.name.toLowerCase().endsWith(type.toLowerCase())
        }
        return file.type.match(type.replace('*', '.*'))
      })

      if (!isAccepted) {
        errors.push(`Dosya türü desteklenmiyor: ${file.type}`)
      }
    }

    return errors
  }

  // Handle file selection
  const handleFileSelect = useCallback((selectedFiles) => {
    const newFiles = Array.from(selectedFiles)
    
    // Check file count limit
    if (!multiple && newFiles.length > 1) {
      newFiles.splice(1)
    } else if (multiple && files.length + newFiles.length > maxFiles) {
      newFiles.splice(maxFiles - files.length)
    }

    // Validate files
    const validFiles = []
    const errors = {}

    newFiles.forEach(file => {
      const fileErrors = validateFile(file)
      if (fileErrors.length === 0) {
        validFiles.push(file)
      } else {
        errors[file.name] = fileErrors
      }
    })

    // Update files and errors
    setFiles(prev => multiple ? [...prev, ...validFiles] : validFiles)
    setUploadErrors(prev => ({ ...prev, ...errors }))

    // Start upload for valid files
    validFiles.forEach(file => {
      uploadFile(file)
    })
  }, [files, maxFiles, maxSize, accept, multiple])

  // Upload file
  const uploadFile = async (file) => {
    const formData = new FormData()
    formData.append('file', file)

    try {
      setUploadProgress(prev => ({ ...prev, [file.name]: 0 }))

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const current = prev[file.name] || 0
          if (current < 90) {
            return { ...prev, [file.name]: current + 10 }
          }
          return prev
        })
      }, 200)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          setUploadProgress(prev => ({ ...prev, [file.name]: progress }))
        }
      })

      clearInterval(progressInterval)
      setUploadProgress(prev => ({ ...prev, [file.name]: 100 }))

      if (response.ok) {
        const result = await response.json()
        onUpload?.(file, result)
      } else {
        throw new Error('Upload failed')
      }
    } catch {
      setUploadErrors(prev => ({
        ...prev,
        [file.name]: ['Yükleme başarısız oldu']
      }))
    }
  }

  // Handle drag events
  const handleDrag = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  // Handle drop
  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (disabled) return

    const droppedFiles = e.dataTransfer.files
    handleFileSelect(droppedFiles)
  }, [disabled, handleFileSelect])

  // Remove file
  const removeFile = useCallback((fileName) => {
    setFiles(prev => prev.filter(f => f.name !== fileName))
    setUploadProgress(prev => {
      const newProgress = { ...prev }
      delete newProgress[fileName]
      return newProgress
    })
    setUploadErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[fileName]
      return newErrors
    })
    onRemove?.(fileName)
  }, [onRemove])

  // Clear all files
  const clearFiles = useCallback(() => {
    setFiles([])
    setUploadProgress({})
    setUploadErrors({})
  }, [])

  return (
    <Card glass className={`p-6 ${className}`}>
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${
          dragActive
            ? 'border-cyan-500 bg-cyan-500/10'
            : 'border-gray-600 hover:border-gray-500'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
          disabled={disabled}
        />

        <div className="space-y-4">
          <div className="flex justify-center">
            <Upload className="w-12 h-12 text-cyan-400" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Dosyaları Buraya Sürükleyin
            </h3>
            <p className="text-gray-400 text-sm">
              veya tıklayarak seçin
            </p>
          </div>

          <div className="text-xs text-gray-500 space-y-1">
            <p>Desteklenen formatlar: {accept === '*/*' ? 'Tüm formatlar' : accept}</p>
            <p>Maksimum boyut: {formatFileSize(maxSize)}</p>
            <p>Maksimum dosya sayısı: {maxFiles}</p>
          </div>
        </div>
      </div>

      {/* File List */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-gray-300">
                Dosyalar ({files.length}/{maxFiles})
              </h4>
              <Button
                variant="secondary"
                size="sm"
                onClick={clearFiles}
              >
                Temizle
              </Button>
            </div>

            <div className="space-y-3">
              {files.map((file) => {
                const progress = uploadProgress[file.name] || 0
                const errors = uploadErrors[file.name] || []
                const isComplete = progress === 100
                const hasError = errors.length > 0

                return (
                  <motion.div
                    key={file.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className={`flex items-center space-x-3 p-3 rounded-lg ${
                      hasError ? 'bg-red-500/10 border border-red-500/30' :
                      isComplete ? 'bg-green-500/10 border border-green-500/30' :
                      'bg-gray-800/50'
                    }`}
                  >
                    {/* File Icon */}
                    <div className={`flex-shrink-0 ${
                      hasError ? 'text-red-400' :
                      isComplete ? 'text-green-400' :
                      'text-gray-400'
                    }`}>
                      {getFileIcon(file)}
                    </div>

                    {/* File Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-white truncate">
                          {file.name}
                        </p>
                        <div className="flex items-center space-x-2">
                          {isComplete && <CheckCircle className="w-4 h-4 text-green-400" />}
                          {hasError && <AlertCircle className="w-4 h-4 text-red-400" />}
                          <button
                            onClick={() => removeFile(file.name)}
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>{formatFileSize(file.size)}</span>
                        <span>{progress}%</span>
                      </div>

                      {/* Progress Bar */}
                      {showProgress && !isComplete && !hasError && (
                        <Progress
                          value={progress}
                          max={100}
                          className="mt-2 h-1"
                          color={hasError ? 'red' : isComplete ? 'green' : 'cyan'}
                        />
                      )}

                      {/* Error Messages */}
                      {hasError && (
                        <div className="mt-2 text-xs text-red-400">
                          {errors.map((error, i) => (
                            <p key={i}>{error}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* File Preview */}
      {showPreview && files.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-300 mb-3">Önizleme</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {files.filter(file => file.type.startsWith('image/')).map((file) => (
              <div key={file.name} className="relative group">
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <button
                    onClick={() => removeFile(file.name)}
                    className="p-1 bg-red-500 rounded-full"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}

export default FileUpload
