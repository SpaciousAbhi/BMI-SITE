import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Shield, Eye, Lock, Users, FileText, Database } from "lucide-react";

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
          <p className="text-xl text-gray-300">
            Your privacy is important to us. Learn how we protect your data.
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Last updated: January 2025
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Information We Collect */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-xl text-white">
                <Eye className="h-5 w-5 text-blue-400" />
                <span>Information We Collect</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-2">Personal Information</h4>
                <p>When you use our BMI calculator, we may collect:</p>
                <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                  <li>Height and weight measurements</li>
                  <li>Age and gender (for accurate calculations)</li>
                  <li>Browser information and device type</li>
                  <li>IP address and general location data</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Usage Data</h4>
                <p>We automatically collect information about how you interact with our website, including pages visited, time spent on the site, and features used.</p>
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
              <p>We use the collected information to:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Provide accurate BMI calculations and health insights</li>
                <li>Improve our calculator's accuracy and user experience</li>
                <li>Analyze website usage patterns to enhance functionality</li>
                <li>Ensure the security and proper functioning of our services</li>
                <li>Comply with legal obligations and prevent misuse</li>
              </ul>
              <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-800/50">
                <p className="text-blue-300">
                  <strong>Important:</strong> We never store your personal health data permanently. BMI calculations are performed in real-time and results are only displayed to you.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Data Protection */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-xl text-white">
                <Lock className="h-5 w-5 text-green-400" />
                <span>Data Protection & Security</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-2">Security Measures</h4>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>SSL encryption for all data transmission</li>
                  <li>Regular security audits and updates</li>
                  <li>Limited access to personal information</li>
                  <li>Secure hosting infrastructure</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Data Retention</h4>
                <p>We retain usage data for analytical purposes for a maximum of 24 months. Personal health information entered into the calculator is not stored permanently on our servers.</p>
              </div>
            </CardContent>
          </Card>

          {/* Third-Party Services */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-xl text-white">
                <FileText className="h-5 w-5 text-blue-400" />
                <span>Third-Party Services</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>Our website may use third-party services for:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Website analytics (anonymized data only)</li>
                <li>Content delivery and performance optimization</li>
                <li>Security monitoring and protection</li>
              </ul>
              <p className="text-sm">These services have their own privacy policies and we encourage you to review them.</p>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-xl text-white">Your Privacy Rights</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>You have the right to:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Access information about what data we collect</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal data</li>
                <li>Opt-out of certain data collection practices</li>
                <li>Receive a copy of your data in a portable format</li>
              </ul>
              <div className="bg-green-900/20 p-4 rounded-lg border border-green-800/50 mt-4">
                <p className="text-green-300">
                  To exercise any of these rights, please contact us using the information provided in our Contact Us page.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-xl text-white">Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>If you have any questions about this Privacy Policy or our data practices, please contact us through our Contact Us page or email us directly.</p>
              <p className="text-sm text-gray-400 mt-4">
                This Privacy Policy may be updated periodically. We will notify users of significant changes by posting the updated policy on this page.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;