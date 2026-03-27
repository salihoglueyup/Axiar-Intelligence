import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Shield, AlertTriangle } from 'lucide-react'
import Input from '@/components/ui/Input'
import { sanitizeInput, isValidEmail, isValidPhone } from '@/utils/security'

const SecureInput = ({ 
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  maxLength = 1000,
  validation,
  sanitize = true,
  showStrength = false,
  showToggle = false,
  className = '',
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isValid, setIsValid] = useState(true)
  const [validationMessage, setValidationMessage] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef(null)

  // Handle input change with sanitization
  const handleChange = (e) => {
    let newValue = e.target.value

    // Sanitize input if enabled
    if (sanitize) {
      newValue = sanitizeInput(newValue, {
        allowHTML: false,
        maxLength
      })
    }

    // Call original onChange
    if (onChange) {
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: newValue
        }
      }
      onChange(syntheticEvent)
    }
  }

  // Validation on blur
  const handleBlur = (e) => {
    setIsFocused(false)
    
    let newValue = e.target.value
    if (sanitize) {
      newValue = sanitizeInput(newValue)
    }

    // Built-in validation
    if (type === 'email') {
      const valid = isValidEmail(newValue)
      setIsValid(valid)
      setValidationMessage(valid ? '' : 'Geçerli bir e-posta adresi girin')
    } else if (type === 'tel') {
      const valid = isValidPhone(newValue)
      setIsValid(valid)
      setValidationMessage(valid ? '' : 'Geçerli bir telefon numarası girin')
    } else if (validation) {
      const result = validation(newValue)
      setIsValid(result.valid)
      setValidationMessage(result.message || '')
    } else {
      setIsValid(true)
      setValidationMessage('')
    }

    if (onBlur) {
      onBlur(e)
    }
  }

  // Password strength calculation
  const getPasswordStrength = () => {
    if (type !== 'password' || !showStrength) return null

    const { checkPasswordStrength } = require('@/utils/security')
    return checkPasswordStrength(value || '')
  }

  const passwordStrength = getPasswordStrength()

  // Get input type
  const getInputType = () => {
    if (type === 'password' && showToggle) {
      return showPassword ? 'text' : 'password'
    }
    return type
  }

  // Get security icon
  const getSecurityIcon = () => {
    if (!isFocused && !error) return null

    if (error) {
      return <AlertTriangle className="w-4 h-4 text-red-400" />
    }

    if (type === 'password' && showStrength && value) {
      const strengthColor = passwordStrength?.strength === 'weak' ? 'text-red-400' :
                          passwordStrength?.strength === 'medium' ? 'text-yellow-400' :
                          passwordStrength?.strength === 'strong' ? 'text-green-400' :
                          'text-green-500'
      return <Shield className={`w-4 h-4 ${strengthColor}`} />
    }

    if (isValid && value) {
      return <Shield className="w-4 h-4 text-green-400" />
    }

    return null
  }

  return (
    <div className={`relative ${className}`}>
      <Input
        ref={inputRef}
        type={getInputType()}
        label={label}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={() => setIsFocused(true)}
        maxLength={maxLength}
        required={required}
        error={error || validationMessage}
        icon={getSecurityIcon()}
        className={`${!isValid ? 'border-red-500' : ''} ${type === 'password' && showToggle ? 'pr-12' : ''}`}
        {...props}
      />

      {/* Password toggle */}
      {type === 'password' && showToggle && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          aria-label={showPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
      )}

      {/* Password strength indicator */}
      {type === 'password' && showStrength && value && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-2"
        >
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Şifre gücü:</span>
            <span className={`font-medium ${
              passwordStrength?.strength === 'weak' ? 'text-red-400' :
              passwordStrength?.strength === 'medium' ? 'text-yellow-400' :
              passwordStrength?.strength === 'strong' ? 'text-green-400' :
              'text-green-500'
            }`}>
              {passwordStrength?.strength === 'weak' ? 'Zayıf' :
               passwordStrength?.strength === 'medium' ? 'Orta' :
               passwordStrength?.strength === 'strong' ? 'Güçlü' :
               'Çok Güçlü'}
            </span>
          </div>
          
          {/* Strength bar */}
          <div className="mt-1 h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(passwordStrength?.score || 0) * 16.67}%` }}
              transition={{ duration: 0.3 }}
              className={`h-full ${
                passwordStrength?.strength === 'weak' ? 'bg-red-500' :
                passwordStrength?.strength === 'medium' ? 'bg-yellow-500' :
                passwordStrength?.strength === 'strong' ? 'bg-green-500' :
                'bg-green-600'
              }`}
            />
          </div>

          {/* Feedback */}
          {passwordStrength?.feedback && passwordStrength.feedback.length > 0 && (
            <div className="mt-2 text-xs text-gray-400">
              {passwordStrength.feedback.join(', ')}
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}

export default SecureInput
