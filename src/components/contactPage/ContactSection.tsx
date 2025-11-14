'use client'
import { LoaderCircle, Mail, Phone, User, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'

interface ContactBlock {
  block: { title: string; description: string }
}

export default function ContactForm({ block }: ContactBlock) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [formData, setFormData] = useState<any>(null)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    fetch('/api/get-form')
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
      form: formData.id,
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

  if (!formData)
    return (
      <section className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="bg-[#800000] border border-[#fecc02] rounded-lg p-6 sm:p-8 text-center flex flex-col items-center space-y-4 shadow-md max-w-md mx-auto">
          <LoaderCircle className="w-10 h-10 text-white animate-spin" />
          <h3 className="text-lg sm:text-xl font-semibold text-white">Please Wait!</h3>
          <p className="text-gray-50 text-sm sm:text-base">
            We{"'"}re loading the contact form for you.
          </p>
        </div>
      </section>
    )

  if (success)
    return (
      <section className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="bg-white border-l-4 border-[#fecc02] rounded-lg p-8 text-center shadow-lg">
          <div className="bg-[#fecc02] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-[#800000]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-[#800000] mb-3">Thank You!</h3>
          <p className="text-gray-600 mb-4">
            Your message has been received. We{"'"}ll be in touch shortly.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="inline-flex items-center px-4 py-2 bg-[#800000] text-white rounded-md hover:bg-[#0f4579] transition duration-150"
          >
            Send Another Message
          </button>
        </div>
      </section>
    )

  return (
    <section className="py-8 md:py-16 bg-gray-50 px-4 md:px-16">
      <div className="max-w-7xl mx-auto px-8 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#800000] mb-4">Get In Touch</h2>
          <div className="w-24 h-1 bg-[#fecc02] mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions or need assistance? Our team is here to help with your inquiries.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Left Column - Form */}
            <div className="p-6 sm:p-10">
              <h3 className="text-2xl font-semibold text-[#800000] mb-6">Send Us a Message</h3>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {formData.fields.map(
                  (field: {
                    id: string
                    blockType: string
                    label: string
                    name: string
                    required: boolean
                  }) => {
                    const fieldId = `field-${field.id}`

                    switch (field.blockType) {
                      case 'text':
                        return (
                          <div key={field.id} className="relative col-span-2 md:col-span-1">
                            <label
                              htmlFor={fieldId}
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              {field.label}{' '}
                              {field.required && <span className="text-red-500">*</span>}
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User size={18} className="text-gray-400" />
                              </div>
                              <input
                                id={fieldId}
                                name={field.name}
                                type="text"
                                required={field.required}
                                className="block w-full pl-10 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#800000] focus:border-transparent transition duration-150"
                                placeholder={`Your ${field.label}`}
                              />
                            </div>
                            {errors[field.name] && (
                              <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>
                            )}
                          </div>
                        )
                      case 'email':
                        return (
                          <div key={field.id} className="relative col-span-2 md:col-span-1">
                            <label
                              htmlFor={fieldId}
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              {field.label}{' '}
                              {field.required && <span className="text-red-500">*</span>}
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail size={18} className="text-gray-400" />
                              </div>
                              <input
                                id={fieldId}
                                name={field.name}
                                type="email"
                                required={field.required}
                                className="block w-full pl-10 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#800000] focus:border-transparent transition duration-150"
                                placeholder="your@email.com"
                              />
                            </div>
                            {errors[field.name] && (
                              <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>
                            )}
                          </div>
                        )
                      case 'textarea':
                        return (
                          <div key={field.id} className="relative col-span-2">
                            <label
                              htmlFor={fieldId}
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              {field.label}{' '}
                              {field.required && <span className="text-red-500">*</span>}
                            </label>
                            <textarea
                              id={fieldId}
                              name={field.name}
                              required={field.required}
                              rows={4}
                              className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#800000] focus:border-transparent transition duration-150"
                              placeholder="How can we help you?"
                            />
                            {errors[field.name] && (
                              <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>
                            )}
                          </div>
                        )
                      case 'number':
                        return (
                          <div key={field.id} className="relative col-span-2 md:col-span-1">
                            <label
                              htmlFor={fieldId}
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              {field.label}{' '}
                              {field.required && <span className="text-red-500">*</span>}
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Phone size={18} className="text-gray-400" />
                              </div>
                              <input
                                id={fieldId}
                                name={field.name}
                                type="tel"
                                required={field.required}
                                className="block w-full pl-10 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#800000] focus:border-transparent transition duration-150"
                                placeholder="Your phone number"
                              />
                            </div>
                            {errors[field.name] && (
                              <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>
                            )}
                          </div>
                        )

                      default:
                        return null
                    }
                  },
                )}

                {errors.form && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 mt-4">
                    <p className="text-red-700">{errors.form}</p>
                  </div>
                )}

                <div className="pt-2 col-span-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full px-6 py-3 bg-[#800000] text-white font-medium rounded-md shadow-sm transition duration-150 flex items-center justify-center cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <span className="flex items-center hover:scale-105 transition-transform">
                        Submit Message <ArrowRight size={18} className="ml-2" />
                      </span>
                    )}
                  </button>

                  <p className="text-sm text-gray-500 mt-4 text-center">
                    Your information is kept confidential and secure
                  </p>
                </div>
              </form>
            </div>

            {/* Right Column - Content */}
            <div className="bg-[#800000] text-white p-6 sm:p-10 flex flex-col justify-center items-center gap-8">
              <div className="flex justify-between items-center mb-8"></div>
              <div className="mb-8">
                <h3 className="text-4xl font-bold mb-4">{block.title}</h3>
                <div className="w-16 h-1 bg-[#fecc02] mb-6"></div>
                <p className="text-gray-100 mb-6 text-lg">{block.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
