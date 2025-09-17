import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { FileCheck, AlertTriangle, Scale, UserCheck, Ban } from "lucide-react";

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
          <p className="text-xl text-gray-300">
            Please read these terms carefully before using our BMI calculator service.
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Last updated: January 2025
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
                By accessing and using Advanced BMI Calculator ("the Service"), you accept and agree to be bound by the terms and provisions of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
              <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-800/50">
                <p className="text-blue-300">
                  <strong>Important:</strong> These terms constitute a legally binding agreement between you and Advanced BMI Calculator.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Medical Disclaimer */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-xl text-white">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                <span>Medical Disclaimer</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-800/50">
                <p className="text-yellow-300 font-semibold">
                  IMPORTANT MEDICAL DISCLAIMER
                </p>
              </div>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>BMI calculations are for informational purposes only and should not replace professional medical advice</li>
                <li>Results may not accurately reflect health status for athletes, pregnant women, elderly, or children</li>
                <li>Always consult with qualified healthcare professionals before making health-related decisions</li>
                <li>BMI does not measure body fat directly and may not account for muscle mass, bone density, or body composition</li>
                <li>We are not responsible for any health decisions made based on BMI calculations from this tool</li>
              </ul>
            </CardContent>
          </Card>

          {/* Use License */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-xl text-white">
                <Scale className="h-5 w-5 text-green-400" />
                <span>Use License</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-2">Permission is granted to:</h4>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Use the BMI calculator for personal, non-commercial purposes</li>
                  <li>Access and view website content</li>
                  <li>Share results for personal health tracking</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">This license does NOT permit you to:</h4>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Modify or copy the materials without permission</li>
                  <li>Use the materials for commercial purposes</li>
                  <li>Attempt to reverse engineer any software</li>
                  <li>Remove any copyright or proprietary notations</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* User Responsibilities */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-xl text-white">User Responsibilities</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>By using our service, you agree to:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Provide accurate information when using the calculator</li>
                <li>Use the service only for lawful purposes</li>
                <li>Not attempt to disrupt or interfere with the service</li>
                <li>Respect the intellectual property rights of the service</li>
                <li>Not use automated systems to access the service excessively</li>
              </ul>
            </CardContent>
          </Card>

          {/* Prohibited Uses */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-xl text-white">
                <Ban className="h-5 w-5 text-red-400" />
                <span>Prohibited Uses</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>You may not use our service:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>To submit false or misleading information</li>
                <li>To upload or transmit viruses or any other type of malicious code</li>
              </ul>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-xl text-white">Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                In no event shall BMI Pro, nor its directors, employees, partners, agents, suppliers, or affiliates, 
                be liable for any indirect, incidental, punitive, special, or consequential damages, including without 
                limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use 
                of the service.
              </p>
              <div className="bg-red-900/20 p-4 rounded-lg border border-red-800/50">
                <p className="text-red-300">
                  <strong>Maximum Liability:</strong> Our total liability to you for all damages shall not exceed 
                  the amount you paid us, if any, for accessing the service.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Accuracy of Materials */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-xl text-white">Accuracy of Materials</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                The materials appearing on BMI Pro could include technical, typographical, or photographic errors. 
                BMI Pro does not warrant that any of the materials on its website are accurate, complete, or current. 
                BMI Pro may make changes to the materials contained on its website at any time without notice.
              </p>
            </CardContent>
          </Card>

          {/* Modifications */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-xl text-white">Modifications</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                BMI Pro may revise these terms of service at any time without notice. By using this website, 
                you are agreeing to be bound by the then current version of these terms of service.
              </p>
              <p className="text-sm text-gray-400">
                We recommend checking this page periodically for any changes to our terms and conditions.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-xl text-white">Questions & Contact</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>
                If you have any questions about these Terms & Conditions, please contact us through our Contact Us page. 
                We are committed to resolving any concerns you may have about these terms.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;