import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { FileCheck, AlertTriangle, Scale, UserCheck, Ban, Shield, Gavel, Clock, Mail } from "lucide-react";

const TermsConditions = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-green-500/10">
              <FileCheck className="h-16 w-16 text-green-400" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
            Terms & Conditions
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            Legal terms governing your use of our BMI calculator and health information service
          </p>
          <p className="text-sm text-gray-400">
            Last updated: January 15, 2025 | Effective Date: January 15, 2025
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Acceptance of Terms */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-xl text-white">
                <UserCheck className="h-5 w-5 text-blue-400" />
                <span>Acceptance of Terms</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                Welcome to the BMI Calculator service operated by <strong className="text-white">Venom Stone Network</strong> 
                ("we," "our," or "us"). These Terms and Conditions ("Terms") govern your use of our BMI calculator website, 
                mobile application, and related services (collectively, the "Service").
              </p>
              <p>
                By accessing, browsing, or using our Service, you acknowledge that you have read, understood, and agree to be 
                bound by these Terms and our Privacy Policy. If you do not agree with any part of these Terms, you must not 
                use our Service.
              </p>
              <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-800/50">
                <p className="text-blue-300">
                  <strong>Legal Agreement:</strong> These Terms constitute a legally binding agreement between you and 
                  Venom Stone Network, governed by the laws of India. By continuing to use our Service, you affirm that 
                  you are at least 18 years old or have parental/guardian consent.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Medical Disclaimer */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-xl text-white">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                <span>Important Medical Disclaimer</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-800/50">
                <p className="text-yellow-300 font-semibold text-lg mb-2">
                  CRITICAL HEALTH INFORMATION DISCLAIMER
                </p>
                <p className="text-yellow-300 text-sm">
                  This BMI calculator and all related health information are provided for educational and informational purposes only.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-3">Medical Limitations & Warnings</h4>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li><strong>Not Medical Advice:</strong> BMI calculations do not constitute professional medical advice, diagnosis, or treatment recommendations</li>
                  <li><strong>No Doctor-Patient Relationship:</strong> Use of this Service does not create any doctor-patient or healthcare provider relationship</li>
                  <li><strong>BMI Limitations:</strong> BMI does not directly measure body fat percentage, muscle mass, bone density, or overall body composition</li>
                  <li><strong>Population Variability:</strong> BMI standards may not accurately reflect health status for athletes, pregnant women, elderly individuals, children, or certain ethnic populations</li>
                  <li><strong>Individual Health Factors:</strong> Results do not account for individual medical conditions, medications, or unique health circumstances</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3">Professional Medical Consultation Required</h4>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Always consult qualified healthcare professionals before making health-related decisions</li>
                  <li>Seek immediate medical attention for any health concerns or symptoms</li>
                  <li>Do not rely solely on BMI calculations for health assessments</li>
                  <li>Discuss BMI results with your doctor for personalized interpretation</li>
                </ul>
              </div>

              <div className="bg-red-900/20 p-4 rounded-lg border border-red-800/50">
                <p className="text-red-300 font-semibold">
                  LIABILITY LIMITATION: Venom Stone Network is not responsible for any health decisions, medical outcomes, 
                  or consequences resulting from the use of BMI calculations or health information provided through this Service.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Service Description */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-xl text-white">
                <Scale className="h-5 w-5 text-green-400" />
                <span>Service Description & Features</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-3">What We Provide</h4>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Advanced BMI calculator with multiple unit support (metric/imperial)</li>
                  <li>Age and gender-specific BMI analysis and categorization</li>
                  <li>Health insights based on WHO and medical guidelines</li>
                  <li>Educational content about BMI, health, and wellness</li>
                  <li>Responsive web-based tool accessible across devices</li>
                  <li>Frequently asked questions and health tips</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3">Service Availability</h4>
                <p className="mb-2">We strive to provide reliable service, but we do not guarantee:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Uninterrupted access to the Service (maintenance, technical issues may occur)</li>
                  <li>Error-free operation or complete accuracy of all features</li>
                  <li>Compatibility with all devices, browsers, or operating systems</li>
                  <li>Permanent availability of any specific feature or content</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* User License & Permitted Uses */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-xl text-white">
                <Shield className="h-5 w-5 text-green-400" />
                <span>User License & Permitted Uses</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-3">Granted Permissions</h4>
                <p className="mb-2">Subject to these Terms, we grant you a limited, non-exclusive, non-transferable license to:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Access and use the BMI calculator for personal, non-commercial health monitoring</li>
                  <li>View, read, and reference educational health content provided</li>
                  <li>Share your BMI results for personal health tracking or with healthcare providers</li>
                  <li>Access the Service through supported web browsers and devices</li>
                  <li>Contact our support team for technical assistance</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3">Restrictions & Prohibited Uses</h4>
                <p className="mb-2">You may NOT use our Service to:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Provide medical advice or offer healthcare services to others</li>
                  <li>Modify, copy, distribute, or create derivative works of our content</li>
                  <li>Use the Service for commercial purposes without written permission</li>
                  <li>Reverse engineer, decompile, or attempt to extract source code</li>
                  <li>Remove copyright, trademark, or other proprietary notices</li>
                  <li>Interfere with or disrupt the Service's operation or security</li>
                </ul>
              </div>

              <div className="bg-green-900/20 p-4 rounded-lg border border-green-800/50">
                <p className="text-green-300">
                  <strong>Educational Use:</strong> Healthcare professionals and educators may reference our Service 
                  for educational purposes with proper attribution to Venom Stone Network.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* User Responsibilities */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-xl text-white">User Responsibilities & Conduct</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-3">Your Obligations</h4>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li><strong>Accurate Information:</strong> Provide truthful and accurate measurements when using the calculator</li>
                  <li><strong>Lawful Use:</strong> Use the Service only for lawful purposes and in accordance with these Terms</li>
                  <li><strong>Security:</strong> Maintain the security of your device and internet connection</li>
                  <li><strong>Respect:</strong> Respect the intellectual property rights and terms of service</li>
                  <li><strong>Responsible Sharing:</strong> If sharing results, include appropriate medical disclaimers</li>
                  <li><strong>Compliance:</strong> Comply with all applicable local, state, and national laws</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3">Age Requirements</h4>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Users must be at least 18 years old to accept these Terms independently</li>
                  <li>Users under 18 must have parental or guardian consent and supervision</li>
                  <li>We do not knowingly collect personal information from children under 13</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Prohibited Activities */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-xl text-white">
                <Ban className="h-5 w-5 text-red-400" />
                <span>Prohibited Activities</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-3">Strictly Forbidden Uses</h4>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li><strong>Illegal Activities:</strong> Any unlawful purpose or encouraging others to engage in illegal acts</li>
                  <li><strong>Medical Practice:</strong> Providing medical diagnoses, treatments, or professional healthcare services</li>
                  <li><strong>Harmful Content:</strong> Harassment, abuse, discrimination, or spreading false health information</li>
                  <li><strong>System Abuse:</strong> Automated systems, bots, or excessive requests that may disrupt service</li>
                  <li><strong>Security Violations:</strong> Attempting to breach security, access unauthorized areas, or distribute malware</li>
                  <li><strong>Intellectual Property Theft:</strong> Unauthorized copying, distribution, or commercial use of our content</li>
                  <li><strong>Impersonation:</strong> Misrepresenting yourself as a healthcare professional or our organization</li>
                </ul>
              </div>

              <div className="bg-red-900/20 p-4 rounded-lg border border-red-800/50">
                <h4 className="text-red-300 font-semibold mb-2">Enforcement Actions</h4>
                <p className="text-red-300 text-sm">
                  Violation of these Terms may result in immediate termination of your access to the Service, 
                  legal action, and cooperation with law enforcement authorities as required by Indian law.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-xl text-white">Intellectual Property Rights</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-3">Our Proprietary Rights</h4>
                <p className="mb-2">The Service and all related content are owned by Venom Stone Network and protected by:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Copyright laws protecting original text, graphics, and software code</li>
                  <li>Trademark rights in our business name, logos, and branding</li>
                  <li>Trade secrets in our algorithms and proprietary calculations</li>
                  <li>Database rights in our compiled health information and content</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3">Third-Party Content</h4>
                <p className="mb-2">Our Service may include content from third parties:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>WHO (World Health Organization) BMI guidelines and standards</li>
                  <li>Medical research citations and health information sources</li>
                  <li>Third-party libraries, fonts, and technical components</li>
                  <li>Analytics and performance monitoring tools</li>
                </ul>
                <p className="text-sm text-gray-400 mt-2">
                  All third-party content remains the property of their respective owners.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-xl text-white">
                <Gavel className="h-5 w-5 text-blue-400" />
                <span>Limitation of Liability & Disclaimers</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-3">Service Disclaimers</h4>
                <p className="mb-2">The Service is provided "AS IS" and "AS AVAILABLE" without warranties of any kind:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>We disclaim all warranties, express or implied, including merchantability and fitness for purpose</li>
                  <li>We do not warrant that the Service will be uninterrupted, error-free, or completely secure</li>
                  <li>We make no guarantees about the accuracy, reliability, or completeness of any health information</li>
                  <li>Results may vary based on individual factors and calculation methods</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3">Liability Limitations</h4>
                <p className="mb-2">To the maximum extent permitted by Indian law:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Venom Stone Network shall not be liable for indirect, incidental, or consequential damages</li>
                  <li>Our total liability for any claims shall not exceed ₹1,000 (Indian Rupees One Thousand)</li>
                  <li>We are not liable for health decisions or medical outcomes based on Service use</li>
                  <li>We are not responsible for third-party content, links, or services</li>
                </ul>
              </div>

              <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-800/50">
                <h4 className="text-yellow-300 font-semibold mb-2">Health-Related Liability Disclaimer</h4>
                <p className="text-yellow-300 text-sm">
                  <strong>IMPORTANT:</strong> We expressly disclaim any liability for health decisions, medical treatments, 
                  weight management actions, or health outcomes that result from using our BMI calculator or health information. 
                  Always consult healthcare professionals for medical advice.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Data Accuracy & Updates */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-xl text-white">Data Accuracy & Content Updates</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-3">Information Accuracy</h4>
                <p className="mb-2">While we strive for accuracy, please note:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Health information may contain technical, typographical, or calculation errors</li>
                  <li>BMI standards and health guidelines may change based on new medical research</li>
                  <li>We do not warrant that all materials are current, accurate, or complete</li>
                  <li>Users should verify important health information with medical professionals</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3">Content Updates</h4>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>We may update health information, calculations, or features without notice</li>
                  <li>Changes reflect current medical guidelines and user feedback</li>
                  <li>Historical results may differ from current calculation methods</li>
                  <li>We recommend checking for updates regularly</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-xl text-white">
                <Clock className="h-5 w-5 text-red-400" />
                <span>Service Termination</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-3">Termination Rights</h4>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>You may stop using the Service at any time without notice</li>
                  <li>We may terminate or suspend access immediately for Terms violations</li>
                  <li>We may discontinue the Service with reasonable advance notice</li>
                  <li>We reserve the right to refuse service to anyone for any lawful reason</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3">Effect of Termination</h4>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Your right to access and use the Service ends immediately</li>
                  <li>Disclaimers, liability limitations, and dispute resolution provisions survive</li>
                  <li>Any data you provided may be deleted according to our Privacy Policy</li>
                  <li>You remain responsible for any breaches of these Terms</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Governing Law & Dispute Resolution */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-xl text-white">Governing Law & Dispute Resolution</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-3">Applicable Law</h4>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>These Terms are governed by the laws of India</li>
                  <li>Any disputes will be subject to the jurisdiction of Indian courts</li>
                  <li>We comply with Indian digital privacy and healthcare regulations</li>
                  <li>International users agree to Indian jurisdiction for any legal matters</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3">Dispute Resolution Process</h4>
                <ol className="list-decimal list-inside ml-4 space-y-1">
                  <li><strong>Informal Resolution:</strong> Contact us directly to resolve issues amicably</li>
                  <li><strong>Mediation:</strong> Attempt mediation through recognized Indian mediation services</li>
                  <li><strong>Arbitration:</strong> Binding arbitration under Indian Arbitration and Conciliation Act</li>
                  <li><strong>Court Proceedings:</strong> As a last resort, through appropriate Indian courts</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          {/* Terms Modifications */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-xl text-white">Terms Modifications & Updates</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                Venom Stone Network reserves the right to modify these Terms at any time to reflect changes in our 
                services, legal requirements, or business practices. Updates will be effective immediately upon posting 
                to this page.
              </p>
              
              <div>
                <h4 className="font-semibold text-white mb-3">Notification Process</h4>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Material changes will be highlighted on our website</li>
                  <li>The "Last Updated" date will reflect the most recent modifications</li>
                  <li>Continued use of the Service constitutes acceptance of updated Terms</li>
                  <li>Users who disagree with changes should discontinue use of the Service</li>
                </ul>
              </div>
              
              <p className="text-sm text-gray-400">
                We recommend reviewing these Terms periodically to stay informed of any changes.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-xl text-white">
                <Mail className="h-5 w-5 text-green-400" />
                <span>Questions & Legal Contact</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-3">For Terms-Related Inquiries</h4>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <p><strong className="text-white">Business Name:</strong> Venom Stone Network</p>
                  <p><strong className="text-white">Email:</strong> <a href="mailto:venomstonenetwork@gmail.com" className="text-blue-400 hover:text-blue-300">venomstonenetwork@gmail.com</a></p>
                  <p><strong className="text-white">Jurisdiction:</strong> India</p>
                  <p className="text-sm text-gray-400 mt-2">For questions about these Terms, licensing, or legal compliance matters</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3">What to Include in Your Inquiry</h4>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Specific section or term you're asking about</li>
                  <li>Nature of your question or concern</li>
                  <li>Your contact information for response</li>
                  <li>Any relevant context or use case</li>
                </ul>
              </div>

              <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-800/50">
                <p className="text-blue-300 text-sm">
                  <strong>Response Time:</strong> We aim to respond to legal and terms-related inquiries within 
                  3-5 business days. For urgent legal matters, please clearly mark your email as "URGENT - LEGAL."
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;