'use client'
import { LoaderCircle, ArrowRight, CheckCircle, MapPin, Calendar } from 'lucide-react'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// Option interface for selects
interface FieldOption {
  id: string
  label: string
  value: string
}

// A single field in the form
interface FormField {
  id: string
  name: string
  label: string
  width: number | null
  required: boolean
  defaultValue?: string | null
  placeholder?: string | null
  blockName?: string
  blockType: 'text' | 'email' | 'number' | 'textarea' | 'select'
  options?: FieldOption[]
}

// The full form structure from the API
interface FormData {
  id: number
  title: string
  fields: FormField[]
  submitButtonLabel: string
  confirmationType: 'message' | 'redirect'
  confirmationMessage?: string
  redirect?: { type: string; url: string | null }
  emails?: string
}

export default function RegistrationForm() {
  const [formData, setFormData] = useState<FormData | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [eventType, setEventType] = useState('model-un')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [events, setEvent] = useState<any[]>([])
  interface Program {
    id: number
    slug: string
    title: string
    description: string
  }

  const [programs, setPrograms] = useState<Program[]>([])

  // Inside useEffect
  useEffect(() => {
    const fetchPrograms = async () => {
      const res = await fetch('/api/programs')
      const data = await res.json()
      setPrograms(data)
    }
    fetchPrograms()
  }, [])

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch('/api/events')
      const data = await res.json()
      setEventType(data)
      setEvent(data.slice(0, 4))
    }
    fetchEvents()
  }, [])

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  useEffect(() => {
    fetch('/api/register')
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch(() => console.error('Could not load form data'))
  }, [])

  const validateForm = (elements: HTMLFormControlsCollection) => {
    const newErrors: Record<string, string> = {}
    let isValid = true

    Array.from(elements)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((el: any) => el.name && el.required)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .forEach((el: any) => {
        if (!el.value.trim()) {
          newErrors[el.name] = `${el.name} is required`
          isValid = false
        } else if (el.type === 'email' && !/^\S+@\S+\.\S+$/.test(el.value)) {
          newErrors[el.name] = 'Please enter a valid email address'
          isValid = false
        }
      })

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formEl = e.currentTarget

    if (!validateForm(formEl.elements)) return

    const payload = {
      form: formData?.id ?? 0,
      submissionData: Array.from(formEl.elements)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .filter((el: any) => el.name)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((el: any) => ({ field: el.name, value: el.value })),
    }

    setSubmitting(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/form-submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setSuccess(true)
        formEl.reset()
      } else {
        throw new Error('Form submission failed')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setErrors({ form: 'There was a problem submitting your form. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  const getEventTitle = () => {
    const program = programs.find((p) => p.slug === eventType)
    return program?.title || 'Global Youth Program'
  }

  const getEventDescription = () => {
    const program = programs.find((p) => p.slug === eventType)
    return (
      program?.description ||
      'Register for our global youth programs that foster international understanding, leadership, and personal growth.'
    )
  }

  if (!formData)
    return (
      <section className="max-w-6xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <motion.div
          className="bg-gradient-to-br from-blue-950 to-blue-900 rounded-lg p-6 sm:p-8 text-center flex flex-col items-center space-y-4 shadow-lg max-w-md mx-auto border border-blue-800"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <LoaderCircle className="w-10 h-10 text-yellow-400 animate-spin" />
          <h3 className="text-lg sm:text-xl font-semibold text-white">Loading Registration Form</h3>
          <p className="text-blue-100 text-sm sm:text-base">
            Please wait while we prepare your registration form.
          </p>
        </motion.div>
      </section>
    )

  if (success)
    return (
      <section className="max-w-6xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <motion.div
          className="bg-gradient-to-br from-blue-950 to-blue-900 rounded-lg p-8 text-center shadow-lg border border-blue-800 max-w-md"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-yellow-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 shadow-md shadow-yellow-400/20">
            <CheckCircle className="w-8 h-8 text-blue-900" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Registration Complete!</h3>
          <p className="text-blue-100 mb-6">Thank you for registering!</p>
          <button
            onClick={() => setSuccess(false)}
            className="inline-flex items-center px-6 py-3 bg-yellow-400 text-blue-900 font-medium rounded-lg hover:bg-yellow-500 transition duration-150 shadow-md"
          >
            Register for Another Event
          </button>
        </motion.div>
      </section>
    )

  return (
    <section className="py-8 sm:py-16 bg-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">
            Global Youth Programs Registration
          </h2>
          <p className="text-blue-700 max-w-2xl mx-auto">
            Register for our world-class Model UN conferences, international summer camps, and youth
            Olympic programs
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {programs.map((type) => (
              <button
                key={type.id}
                onClick={() => setEventType(type.slug)}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  eventType === type.slug
                    ? 'bg-blue-900 text-white shadow-md'
                    : 'bg-white text-blue-900 border border-blue-200 hover:bg-blue-100'
                }`}
              >
                {type.title}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          className="bg-white rounded-xl shadow-xl overflow-hidden border border-blue-100"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          key={eventType}
        >
          <div className="grid md:grid-cols-5">
            {/* Left Column - Decorative */}
            <div className="hidden md:block md:col-span-2 bg-gradient-to-br from-blue-950 to-blue-900 p-8 relative overflow-hidden">
              <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-yellow-400 opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-blue-400 opacity-20 blur-3xl"></div>

              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="mb-8">
                  <div className="inline-flex items-center bg-blue-800/70 backdrop-blur-sm rounded-full px-3 py-1 border border-blue-700/50 mb-4">
                    <span className="flex items-center text-xs font-medium text-blue-100">
                      <MapPin size={12} className="mr-2 text-yellow-400" />
                      International Events
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{getEventTitle()}</h3>
                  <p className="text-blue-100 text-sm">{getEventDescription()}</p>
                </div>

                <div className="space-y-6">
                  <div className="bg-blue-800/50 backdrop-blur-sm rounded-lg p-4 border border-blue-700/50">
                    <h4 className="font-medium text-white mb-2">Upcoming Events</h4>
                    <ul className="space-y-3 text-sm">
                      {events.map((event) => {
                        return (
                          <li key={eventType} className="flex items-start">
                            <Calendar
                              size={16}
                              className="text-blue-100 mr-2 mt-0.5 flex-shrink-0"
                            />
                            <div>
                              <p className="text-white">{event.title}</p>
                              <p className="text-blue-200">{event.date}</p>
                            </div>
                          </li>
                        )
                      })}
                    </ul>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center shadow-lg shadow-yellow-400/20">
                      <CheckCircle size={16} className="text-blue-900" />
                    </div>
                    <p className="text-sm text-blue-100">Expert-led programs</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center shadow-lg shadow-yellow-400/20">
                      <CheckCircle size={16} className="text-blue-900" />
                    </div>
                    <p className="text-sm text-blue-100">Global network of participants</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="p-6 sm:p-8 md:col-span-3">
              <div className="md:hidden mb-6">
                <h3 className="text-2xl font-bold text-blue-900 mb-2">{getEventTitle()}</h3>
                <p className="text-blue-600 text-sm mb-6">{getEventDescription()}</p>

                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <h4 className="font-medium text-blue-900 mb-2">Upcoming Events</h4>
                  <ul className="space-y-3 text-sm">
                    {events.map((event) => {
                      return (
                        <li key={eventType} className="flex items-start">
                          <Calendar size={16} className="text-blue-100 mr-2 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-white">{event.title}</p>
                            <p className="text-blue-200">{event.date}</p>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {formData?.fields.map((field) => {
                  const fieldId = `field-${field.id}`
                  const hasError = errors[field.name]

                  const commonProps = {
                    id: fieldId,
                    name: field.name,
                    required: field.required,
                    placeholder: field.placeholder || '',
                    className: `w-full border ${hasError ? 'border-red-400' : 'border-gray-300'} rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`,
                  }

                  const containerClass = field.width === 50 ? 'col-span-1' : 'col-span-2'

                  switch (field.blockType) {
                    case 'text':
                    case 'email':
                    case 'number':
                      return (
                        <div key={field.id} className={containerClass}>
                          <label
                            htmlFor={fieldId}
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            {field.label}
                            {field.required && <span className="text-red-500 ml-1">*</span>}
                          </label>
                          <input type={field.blockType} {...commonProps} />
                          {hasError && <p className="mt-1 text-sm text-red-500">{hasError}</p>}
                        </div>
                      )

                    case 'select':
                      return (
                        <div key={field.id} className={containerClass}>
                          <label
                            htmlFor={fieldId}
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            {field.label}
                            {field.required && <span className="text-red-500 ml-1">*</span>}
                          </label>
                          <select {...commonProps}>
                            <option value="">Select...</option>
                            {field.options?.map((option) => (
                              <option key={option.id} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          {hasError && <p className="mt-1 text-sm text-red-500">{hasError}</p>}
                        </div>
                      )

                    case 'textarea':
                      return (
                        <div key={field.id} className="col-span-2">
                          <label
                            htmlFor={fieldId}
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            {field.label}
                            {field.required && <span className="text-red-500 ml-1">*</span>}
                          </label>
                          <textarea rows={4} {...commonProps} />
                          {hasError && <p className="mt-1 text-sm text-red-500">{hasError}</p>}
                        </div>
                      )

                    default:
                      return null
                  }
                })}

                {errors.form && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 mt-2 col-span-2">
                    <p className="text-red-700 text-sm">{errors.form}</p>
                  </div>
                )}

                <div className="pt-2 col-span-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white font-medium rounded-lg shadow transition duration-150 flex items-center justify-center"
                  >
                    {submitting ? (
                      <>
                        <LoaderCircle className="animate-spin mr-3 h-5 w-5 text-white" />
                        Processing...
                      </>
                    ) : (
                      <span className="flex items-center">
                        Register Now <ArrowRight size={18} className="ml-2" />
                      </span>
                    )}
                  </button>

                  <p className="text-xs text-gray-500 mt-4 text-center">
                    By registering, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
