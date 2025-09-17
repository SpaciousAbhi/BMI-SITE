import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Shield, Eye, Lock, Users, FileText, Database, Globe, Server, Mail, Calendar } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-blue-500/10">
              <Shield className="h-16 w-16 text-blue-400" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            Your privacy and data security are fundamental to our BMI calculator service
          </p>
          <p className="text-sm text-gray-400">
            Last updated: January 15, 2025 | Effective Date: January 15, 2025
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Introduction */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-xl text-white">
                <div className="p-2 rounded-full bg-green-500/10">
                  <FileText className="h-5 w-5 text-green-400" />
                </div>
                <span>Introduction</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                Welcome to the BMI Calculator service operated by <strong className="text-white">Venom Stone Network</strong>. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
                BMI (Body Mass Index) calculator website and related services.
              </p>
              <p>
                We are committed to protecting your privacy and handling your personal information in accordance with 
                the Digital Personal Data Protection Act, 2023 (DPDP Act) of India and other applicable data protection laws.
              </p>
              <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-800/50">
                <p className="text-blue-300">
                  <strong>Important:</strong> By using our BMI calculator service, you consent to the collection and use of 
                  information in accordance with this Privacy Policy. If you do not agree with our policies and practices, 
                  please do not use our service.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-xl text-white">
                <div className="p-2 rounded-full bg-blue-500/10">
                  <Database className="h-5 w-5 text-blue-400" />
                </div>
                <span>Information We Collect</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-3">1. Personal Health Information</h4>
                <p className="mb-2">When you use our BMI calculator, we may collect the following health-related data:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Height measurements (in centimeters, feet/inches)</li>
                  <li>Weight measurements (in kilograms, pounds)</li>
                  <li>Age (for enhanced BMI analysis)</li>
                  <li>Gender (for accurate BMI categorization)</li>
                  <li>BMI calculation results and health recommendations</li>
                </ul>
                <div className="bg-green-900/20 p-3 rounded-lg border border-green-800/50 mt-3">
                  <p className="text-green-300 text-sm">
                    <strong>Data Protection:</strong> Your health data is processed locally in your browser and is not permanently 
                    stored on our servers unless you explicitly choose to save results.
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-3">2. Technical Information</h4>
                <p className="mb-2">We automatically collect certain technical information:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>IP address and approximate geographic location</li>
                  <li>Browser type, version, and operating system</li>
                  <li>Device information (mobile, tablet, desktop)</li>
                  <li>Screen resolution and browser settings</li>
                  <li>Referral source and search terms used to find our site</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3">3. Usage Analytics Data</h4>
                <p className="mb-2">Through Google Analytics, we collect:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Pages visited and time spent on each page</li>
                  <li>User interactions with BMI calculator features</li>
                  <li>Popular health information sections accessed</li>
                  <li>Navigation patterns and user flow analysis</li>
                  <li>Performance metrics and error reports</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3">4. Contact Form Information</h4>
                <p className="mb-2">When you contact us, we collect:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Full name and email address</li>
                  <li>Subject matter and message content</li>
                  <li>Inquiry category and contact preferences</li>
                  <li>Communication history and response records</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-xl text-white">
                <Users className="h-5 w-5 text-green-400" />
                <span>How We Use Your Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-3">Primary Uses</h4>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li><strong>BMI Calculations:</strong> Process your height and weight to provide accurate BMI results and health insights</li>
                  <li><strong>Health Recommendations:</strong> Generate personalized health tips based on your BMI category</li>
                  <li><strong>Service Improvement:</strong> Analyze usage patterns to enhance calculator accuracy and user experience</li>
                  <li><strong>Customer Support:</strong> Respond to your inquiries and provide technical assistance</li>
                  <li><strong>Legal Compliance:</strong> Meet obligations under Indian data protection and healthcare regulations</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3">Analytics and Optimization</h4>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Monitor website performance and identify technical issues</li>
                  <li>Understand user preferences for health information content</li>
                  <li>Optimize calculator interface for better accessibility</li>
                  <li>Generate anonymized statistics for service improvements</li>
                </ul>
              </div>

              <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-800/50">
                <h4 className="text-blue-300 font-semibold mb-2">Data Minimization Principle</h4>
                <p className="text-blue-300">
                  We collect only the minimum data necessary to provide our BMI calculator service effectively. 
                  Health calculations are performed in real-time, and personal health data is not retained longer than necessary.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Data Protection & Security */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-xl text-white">
                <Lock className="h-5 w-5 text-green-400" />
                <span>Data Protection & Security Measures</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-3">Technical Safeguards</h4>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li><strong>SSL/TLS Encryption:</strong> All data transmission protected with industry-standard encryption</li>
                  <li><strong>Secure Hosting:</strong> Website hosted on Netlify with enterprise-grade security infrastructure</li>
                  <li><strong>Access Controls:</strong> Restricted access to personal information on need-to-know basis</li>
                  <li><strong>Regular Security Audits:</strong> Ongoing monitoring and vulnerability assessments</li>
                  <li><strong>Data Backup:</strong> Secure backup systems with encryption at rest</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-3">Organizational Safeguards</h4>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Staff training on data protection and privacy best practices</li>
                  <li>Clear data handling procedures and incident response protocols</li>
                  <li>Regular privacy impact assessments and policy reviews</li>
                  <li>Compliance monitoring with DPDP Act requirements</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3">Data Retention Policy</h4>
                <p className="mb-2">We retain different types of data for varying periods:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li><strong>Health Data:</strong> Not permanently stored; processed in real-time only</li>
                  <li><strong>Analytics Data:</strong> Anonymized data retained for up to 26 months</li>
                  <li><strong>Contact Information:</strong> Retained for up to 3 years or until deletion requested</li>
                  <li><strong>Technical Logs:</strong> Automatically purged after 12 months</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Third-Party Services */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-xl text-white">
                <Globe className="h-5 w-5 text-blue-400" />
                <span>Third-Party Services & Data Sharing</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-3">Service Providers We Use</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Server className="h-5 w-5 text-green-400 mt-1" />
                    <div>
                      <p className="text-white font-medium">Netlify (Hosting Provider)</p>
                      <p className="text-sm text-gray-400">
                        Provides website hosting, CDN services, and performance optimization. 
                        <a href="https://www.netlify.com/privacy/" className="text-blue-400 hover:text-blue-300 ml-1">View Privacy Policy</a>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Eye className="h-5 w-5 text-blue-400 mt-1" />
                    <div>
                      <p className="text-white font-medium">Google Analytics</p>
                      <p className="text-sm text-gray-400">
                        Provides website analytics and user behavior insights using anonymized data. 
                        <a href="https://policies.google.com/privacy" className="text-blue-400 hover:text-blue-300 ml-1">View Privacy Policy</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3">Data Sharing Principles</h4>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>We never sell or rent your personal information to third parties</li>
                  <li>Health data is never shared with external organizations</li>
                  <li>Only anonymized, aggregated analytics data may be used for service improvement</li>
                  <li>We comply with data localization requirements under Indian data protection laws</li>
                </ul>
              </div>

              <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-800/50">
                <h4 className="text-yellow-300 font-semibold mb-2">Legal Disclosure</h4>
                <p className="text-yellow-300 text-sm">
                  We may disclose your information only when required by Indian law, court order, or to protect 
                  the rights, property, or safety of our users or the public.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Your Rights Under DPDP Act */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-xl text-white">
                <Scale className="h-5 w-5 text-green-400" />
                <span>Your Rights Under DPDP Act 2023</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p className="text-white">
                As a data principal under India's Digital Personal Data Protection Act, 2023, you have the following rights:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <h5 className="font-semibold text-white">Right to Information</h5>
                    <p className="text-sm">Know what personal data we process and how we use it</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white">Right to Correction</h5>
                    <p className="text-sm">Request correction of inaccurate or incomplete data</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white">Right to Erasure</h5>
                    <p className="text-sm">Request deletion of your personal data</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <h5 className="font-semibold text-white">Right to Data Portability</h5>
                    <p className="text-sm">Receive your data in a structured, commonly used format</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white">Right to Grievance Redressal</h5>
                    <p className="text-sm">File complaints about data processing practices</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white">Right to Nominate</h5>
                    <p className="text-sm">Nominate someone to exercise your rights in case of death or incapacity</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-900/20 p-4 rounded-lg border border-green-800/50 mt-4">
                <h4 className="text-green-300 font-semibold mb-2">How to Exercise Your Rights</h4>
                <p className="text-green-300 text-sm mb-2">
                  To exercise any of these rights, please contact us at <strong>venomstonenetwork@gmail.com</strong> with:
                </p>
                <ul className="list-disc list-inside ml-4 text-green-300 text-sm space-y-1">
                  <li>Clear description of your request</li>
                  <li>Proof of identity for verification</li>
                  <li>Specific data or processing activity in question</li>
                </ul>
                <p className="text-green-300 text-sm mt-2">
                  We will respond to your request within 30 days as required by the DPDP Act.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Cookies and Tracking */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-xl text-white">
                <FileText className="h-5 w-5 text-blue-400" />
                <span>Cookies and Tracking Technologies</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-3">Types of Cookies We Use</h4>
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-white">Essential Cookies</h5>
                    <p className="text-sm">Required for basic website functionality and BMI calculator operation</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white">Analytics Cookies (Google Analytics)</h5>
                    <p className="text-sm">Help us understand how visitors use our site to improve user experience</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white">Performance Cookies</h5>
                    <p className="text-sm">Monitor website performance and optimize loading times</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3">Managing Your Cookie Preferences</h4>
                <p className="mb-2">You can control cookies through:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Browser settings to block or delete cookies</li>
                  <li>Google Analytics opt-out browser add-on</li>
                  <li>Our cookie consent banner (when available)</li>
                  <li>Contacting us directly for specific preferences</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-xl text-white">
                <Mail className="h-5 w-5 text-green-400" />
                <span>Contact Information & Data Protection Officer</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-3">For Privacy-Related Inquiries</h4>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <p><strong className="text-white">Business Name:</strong> Venom Stone Network</p>
                  <p><strong className="text-white">Email:</strong> <a href="mailto:venomstonenetwork@gmail.com" className="text-blue-400 hover:text-blue-300">venomstonenetwork@gmail.com</a></p>
                  <p><strong className="text-white">Jurisdiction:</strong> India</p>
                  <p className="text-sm text-gray-400 mt-2">For privacy policy questions, data requests, or DPDP Act compliance matters</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3">Response Timeline</h4>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>General privacy inquiries: Within 2-3 business days</li>
                  <li>Data subject requests: Within 30 days (DPDP Act requirement)</li>
                  <li>Data breach notifications: Immediate processing</li>
                  <li>Urgent privacy concerns: Within 24 hours</li>
                </ul>
              </div>

              <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-800/50">
                <h4 className="text-blue-300 font-semibold mb-2">Policy Updates</h4>
                <p className="text-blue-300 text-sm">
                  This Privacy Policy may be updated periodically to reflect changes in our practices or legal requirements. 
                  We will notify users of significant changes by posting the updated policy on this page and updating the 
                  "Last Updated" date. We encourage you to review this policy regularly.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;