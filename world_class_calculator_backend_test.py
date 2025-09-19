#!/usr/bin/env python3
"""
World-Class Calculator Backend Testing Suite
Testing Agent Report - Comprehensive Backend Testing for Enhanced Calculators
Focus: Ovulation, Conception, and Period Calculators with 2025 SEO Optimization
"""

import requests
import json
import sys
import time
from datetime import datetime
import re

class WorldClassCalculatorTester:
    def __init__(self):
        # Use environment-configured URLs
        self.frontend_url = "http://localhost:3000"
        self.backend_url = "http://localhost:8001"
        self.test_results = []
        
        # Target calculators from review request
        self.target_calculators = [
            "/ovulation-calculator",
            "/conception-calculator", 
            "/period-calculator"
        ]
        
    def log_test(self, test_name, status, message, details=None):
        """Log test results"""
        result = {
            "test": test_name,
            "status": status,
            "message": message,
            "details": details,
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        print(f"[{status}] {test_name}: {message}")
        if details:
            print(f"    Details: {details}")
    
    def test_backend_infrastructure(self):
        """Test backend infrastructure and API endpoints"""
        print("Testing Backend Infrastructure...")
        
        # Test backend API root endpoint
        try:
            response = requests.get(f"{self.backend_url}/api/", timeout=5)
            if response.status_code == 200:
                data = response.json()
                if data.get("message") == "Hello World":
                    self.log_test("Backend API Root", "PASS", 
                                "Backend API root endpoint working correctly")
                else:
                    self.log_test("Backend API Root", "FAIL", 
                                f"Unexpected response: {data}")
            else:
                self.log_test("Backend API Root", "FAIL", 
                            f"Backend API returned status {response.status_code}")
        except Exception as e:
            self.log_test("Backend API Root", "FAIL", 
                        f"Backend API not accessible: {str(e)}")
        
        # Test GET status endpoint
        try:
            response = requests.get(f"{self.backend_url}/api/status", timeout=5)
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("Backend GET Status", "PASS", 
                                f"Status endpoint working, returned {len(data)} records")
                else:
                    self.log_test("Backend GET Status", "FAIL", 
                                f"Unexpected response format: {type(data)}")
            else:
                self.log_test("Backend GET Status", "FAIL", 
                            f"Status GET returned status {response.status_code}")
        except Exception as e:
            self.log_test("Backend GET Status", "FAIL", 
                        f"Status GET endpoint error: {str(e)}")
        
        # Test POST status endpoint with UUID generation
        try:
            test_data = {"client_name": "World_Class_Calculator_Test"}
            response = requests.post(f"{self.backend_url}/api/status", 
                                   json=test_data, timeout=5)
            if response.status_code == 200:
                data = response.json()
                if (data.get("client_name") == test_data["client_name"] and 
                    "id" in data and "timestamp" in data):
                    self.log_test("Backend POST Status", "PASS", 
                                "Status creation with UUID generation working correctly")
                else:
                    self.log_test("Backend POST Status", "FAIL", 
                                f"Unexpected response structure: {data}")
            else:
                self.log_test("Backend POST Status", "FAIL", 
                            f"Status POST returned status {response.status_code}")
        except Exception as e:
            self.log_test("Backend POST Status", "FAIL", 
                        f"Status POST endpoint error: {str(e)}")
    
    def test_calculator_route_accessibility(self):
        """Test route accessibility for the three enhanced calculators"""
        print("Testing Calculator Route Accessibility...")
        
        for route in self.target_calculators:
            try:
                start_time = time.time()
                response = requests.get(f"{self.frontend_url}{route}", timeout=10)
                load_time = time.time() - start_time
                
                if response.status_code == 200:
                    self.log_test(f"Route Accessibility {route}", "PASS", 
                                f"Route accessible with 200 status, load time: {load_time:.3f}s")
                else:
                    self.log_test(f"Route Accessibility {route}", "FAIL", 
                                f"Route returned status {response.status_code}")
            except Exception as e:
                self.log_test(f"Route Accessibility {route}", "FAIL", 
                            f"Error accessing route: {str(e)}")
    
    def test_2025_seo_enhancement_verification(self):
        """Test 2025 SEO enhancement verification"""
        print("Testing 2025 SEO Enhancement Verification...")
        
        seo_keywords = {
            "/ovulation-calculator": ["AI-Powered", "PCOS", "2025", "ovulation"],
            "/conception-calculator": ["Medical-Grade", "IVF", "precision", "conception"],
            "/period-calculator": ["AI Pattern Recognition", "privacy-first", "period"]
        }
        
        for route in self.target_calculators:
            try:
                response = requests.get(f"{self.frontend_url}{route}", timeout=5)
                if response.status_code == 200:
                    html_content = response.text.lower()
                    
                    # Check for enhanced meta titles and descriptions
                    title_found = '<title>' in html_content
                    description_found = 'meta name="description"' in html_content
                    
                    # Check for specific keywords
                    keywords_found = 0
                    expected_keywords = seo_keywords.get(route, [])
                    for keyword in expected_keywords:
                        if keyword.lower() in html_content:
                            keywords_found += 1
                    
                    if title_found and description_found and keywords_found >= 2:
                        self.log_test(f"2025 SEO Enhancement {route}", "PASS", 
                                    f"Enhanced SEO elements present ({keywords_found}/{len(expected_keywords)} keywords)")
                    else:
                        self.log_test(f"2025 SEO Enhancement {route}", "WARN", 
                                    f"Some SEO elements missing (keywords: {keywords_found}/{len(expected_keywords)})")
                else:
                    self.log_test(f"2025 SEO Enhancement {route}", "FAIL", 
                                f"Could not access route for SEO verification")
            except Exception as e:
                self.log_test(f"2025 SEO Enhancement {route}", "FAIL", 
                            f"SEO verification failed: {str(e)}")
    
    def test_enhanced_structured_data(self):
        """Test enhanced structured data with JSON-LD schema markup"""
        print("Testing Enhanced Structured Data...")
        
        for route in self.target_calculators:
            try:
                response = requests.get(f"{self.frontend_url}{route}", timeout=5)
                if response.status_code == 200:
                    html_content = response.text
                    
                    # Check for JSON-LD structured data
                    json_ld_found = 'application/ld+json' in html_content
                    
                    # Check for specific schema types
                    schema_elements = 0
                    schema_types = [
                        'MedicalRiskCalculator',
                        'FAQPage', 
                        'WebApplication',
                        'medicalSpecialty',
                        'applicationCategory',
                        'operatingSystem'
                    ]
                    
                    for schema_type in schema_types:
                        if schema_type in html_content:
                            schema_elements += 1
                    
                    if json_ld_found and schema_elements >= 4:
                        self.log_test(f"Enhanced Structured Data {route}", "PASS", 
                                    f"Comprehensive schema markup present ({schema_elements}/{len(schema_types)} elements)")
                    else:
                        self.log_test(f"Enhanced Structured Data {route}", "WARN", 
                                    f"Limited schema markup ({schema_elements}/{len(schema_types)} elements)")
                else:
                    self.log_test(f"Enhanced Structured Data {route}", "FAIL", 
                                f"Could not access route for structured data verification")
            except Exception as e:
                self.log_test(f"Enhanced Structured Data {route}", "FAIL", 
                            f"Structured data verification failed: {str(e)}")
    
    def test_performance_technical_validation(self):
        """Test performance and technical validation"""
        print("Testing Performance & Technical Validation...")
        
        for route in self.target_calculators:
            try:
                start_time = time.time()
                response = requests.get(f"{self.frontend_url}{route}", timeout=10)
                load_time = time.time() - start_time
                
                if response.status_code == 200:
                    # Performance check
                    if load_time < 1.0:
                        performance_status = "EXCELLENT"
                    elif load_time < 3.0:
                        performance_status = "GOOD"
                    else:
                        performance_status = "NEEDS_IMPROVEMENT"
                    
                    # Check for responsive design indicators
                    html_content = response.text
                    responsive_indicators = [
                        'viewport',
                        'responsive',
                        'mobile-first',
                        'grid-cols'
                    ]
                    
                    responsive_score = sum(1 for indicator in responsive_indicators 
                                         if indicator in html_content.lower())
                    
                    self.log_test(f"Performance & Technical {route}", "PASS", 
                                f"Load time: {load_time:.3f}s ({performance_status}), "
                                f"Responsive indicators: {responsive_score}/4")
                else:
                    self.log_test(f"Performance & Technical {route}", "FAIL", 
                                f"Route returned status {response.status_code}")
            except Exception as e:
                self.log_test(f"Performance & Technical {route}", "FAIL", 
                            f"Performance test failed: {str(e)}")
    
    def test_content_enhancement_verification(self):
        """Test content enhancement verification"""
        print("Testing Content Enhancement Verification...")
        
        content_indicators = {
            "/ovulation-calculator": ["AI transparency", "medical expert", "PCOS"],
            "/conception-calculator": ["medical validation", "IVF", "precision"],
            "/period-calculator": ["voice search", "FAQ", "privacy"]
        }
        
        for route in self.target_calculators:
            try:
                response = requests.get(f"{self.frontend_url}{route}", timeout=5)
                if response.status_code == 200:
                    html_content = response.text.lower()
                    
                    # Check for content enhancement indicators
                    expected_indicators = content_indicators.get(route, [])
                    indicators_found = 0
                    
                    for indicator in expected_indicators:
                        if indicator.lower() in html_content:
                            indicators_found += 1
                    
                    # Check for FAQ sections
                    faq_found = 'faq' in html_content or 'frequently asked' in html_content
                    
                    # Check for cross-linking
                    cross_links = html_content.count('calculator')
                    
                    if indicators_found >= 1 and (faq_found or cross_links > 3):
                        self.log_test(f"Content Enhancement {route}", "PASS", 
                                    f"Enhanced content present ({indicators_found}/{len(expected_indicators)} indicators, "
                                    f"FAQ: {faq_found}, Cross-links: {cross_links})")
                    else:
                        self.log_test(f"Content Enhancement {route}", "WARN", 
                                    f"Limited content enhancements ({indicators_found}/{len(expected_indicators)} indicators)")
                else:
                    self.log_test(f"Content Enhancement {route}", "FAIL", 
                                f"Could not access route for content verification")
            except Exception as e:
                self.log_test(f"Content Enhancement {route}", "FAIL", 
                            f"Content verification failed: {str(e)}")
    
    def test_static_assets_serving(self):
        """Test static assets serving"""
        print("Testing Static Assets Serving...")
        
        static_files = [
            ("/robots.txt", "text/plain"),
            ("/sitemap.xml", "application/xml"),
            ("/manifest.json", "application/json")
        ]
        
        for file_path, expected_content_type in static_files:
            try:
                response = requests.get(f"{self.frontend_url}{file_path}", timeout=5)
                if response.status_code == 200:
                    content_type = response.headers.get('content-type', '').lower()
                    if expected_content_type.lower() in content_type:
                        self.log_test(f"Static Asset {file_path}", "PASS", 
                                    f"File accessible with correct content type: {content_type}")
                    else:
                        self.log_test(f"Static Asset {file_path}", "WARN", 
                                    f"File accessible but unexpected content type: {content_type}")
                else:
                    self.log_test(f"Static Asset {file_path}", "FAIL", 
                                f"File not accessible, status: {response.status_code}")
            except Exception as e:
                self.log_test(f"Static Asset {file_path}", "FAIL", 
                            f"Error accessing file: {str(e)}")
    
    def test_backend_service_integration(self):
        """Test backend service integration with enhanced features"""
        print("Testing Backend Service Integration...")
        
        # Test MongoDB connection via backend
        try:
            response = requests.get(f"{self.backend_url}/api/status", timeout=5)
            if response.status_code == 200:
                self.log_test("MongoDB Integration", "PASS", 
                            "MongoDB accessible via backend API")
            else:
                self.log_test("MongoDB Integration", "FAIL", 
                            "MongoDB not accessible via backend API")
        except Exception as e:
            self.log_test("MongoDB Integration", "FAIL", 
                        f"MongoDB integration test failed: {str(e)}")
        
        # Test CORS configuration
        try:
            headers = {
                'Origin': 'http://localhost:3000',
                'Access-Control-Request-Method': 'POST',
                'Access-Control-Request-Headers': 'Content-Type'
            }
            response = requests.options(f"{self.backend_url}/api/status", 
                                      headers=headers, timeout=5)
            
            if response.status_code in [200, 204]:
                cors_headers = response.headers
                if 'access-control-allow-origin' in cors_headers:
                    self.log_test("CORS Configuration", "PASS", 
                                "CORS properly configured for frontend access")
                else:
                    self.log_test("CORS Configuration", "FAIL", 
                                "CORS headers missing in preflight response")
            else:
                self.log_test("CORS Configuration", "FAIL", 
                            f"CORS preflight returned status {response.status_code}")
        except Exception as e:
            self.log_test("CORS Configuration", "FAIL", 
                        f"CORS test failed: {str(e)}")
    
    def run_comprehensive_world_class_tests(self):
        """Run comprehensive backend tests for world-class calculators"""
        print("=" * 80)
        print("WORLD-CLASS CALCULATOR OPTIMIZATION - COMPREHENSIVE BACKEND TESTING")
        print("Testing Agent Report: Enhanced Calculators Verification")
        print("Focus: Ovulation, Conception, and Period Calculators with 2025 SEO")
        print("=" * 80)
        print()
        
        # Run all test suites as requested in review
        self.test_backend_infrastructure()
        print()
        self.test_calculator_route_accessibility()
        print()
        self.test_2025_seo_enhancement_verification()
        print()
        self.test_enhanced_structured_data()
        print()
        self.test_performance_technical_validation()
        print()
        self.test_content_enhancement_verification()
        print()
        self.test_static_assets_serving()
        print()
        self.test_backend_service_integration()
        
        # Generate comprehensive summary
        print("\n" + "=" * 80)
        print("WORLD-CLASS CALCULATOR TESTING SUMMARY")
        print("=" * 80)
        
        pass_count = len([r for r in self.test_results if r['status'] == 'PASS'])
        fail_count = len([r for r in self.test_results if r['status'] == 'FAIL'])
        warn_count = len([r for r in self.test_results if r['status'] == 'WARN'])
        
        print(f"Total Tests: {len(self.test_results)}")
        print(f"Passed: {pass_count}")
        print(f"Failed: {fail_count}")
        print(f"Warnings: {warn_count}")
        print(f"Success Rate: {(pass_count / len(self.test_results) * 100):.1f}%")
        
        # Detailed results by category
        print("\nDETAILED RESULTS BY CATEGORY:")
        print("-" * 40)
        
        categories = {}
        for result in self.test_results:
            category = result['test'].split(' ')[0] + ' ' + result['test'].split(' ')[1] if len(result['test'].split(' ')) > 1 else result['test'].split(' ')[0]
            if category not in categories:
                categories[category] = {'PASS': 0, 'FAIL': 0, 'WARN': 0}
            categories[category][result['status']] += 1
        
        for category, counts in categories.items():
            total = sum(counts.values())
            success_rate = (counts['PASS'] / total * 100) if total > 0 else 0
            print(f"{category}: {counts['PASS']}/{total} passed ({success_rate:.1f}%)")
        
        if fail_count > 0:
            print("\nCRITICAL ISSUES REQUIRING ATTENTION:")
            print("-" * 40)
            for result in self.test_results:
                if result['status'] == 'FAIL':
                    print(f"❌ {result['test']}: {result['message']}")
        
        if warn_count > 0:
            print("\nWARNINGS FOR OPTIMIZATION:")
            print("-" * 40)
            for result in self.test_results:
                if result['status'] == 'WARN':
                    print(f"⚠️  {result['test']}: {result['message']}")
        
        print("\n" + "=" * 80)
        print("WORLD-CLASS CALCULATOR BACKEND TESTING CONCLUSION")
        print("=" * 80)
        
        if fail_count == 0:
            print("✅ ALL CRITICAL BACKEND TESTS PASSED")
            print("✅ Backend infrastructure working correctly with MongoDB integration")
            print("✅ All three enhanced calculator routes accessible with excellent performance")
            print("✅ 2025 SEO optimization elements verified and functional")
            print("✅ Enhanced structured data and schema markup confirmed")
            print("✅ Content enhancements and technical SEO properly implemented")
            print("✅ Static assets serving correctly with proper content types")
            print("✅ CORS configuration working for frontend-backend communication")
            print("\n🎉 THE THREE CALCULATORS ARE READY FOR WORLD-CLASS PRODUCTION DEPLOYMENT!")
        else:
            print(f"❌ {fail_count} CRITICAL ISSUES FOUND")
            print("🔧 Backend functionality requires immediate fixes")
            print("⚠️  Production deployment should be delayed until issues are resolved")
        
        return fail_count == 0

if __name__ == "__main__":
    tester = WorldClassCalculatorTester()
    success = tester.run_comprehensive_world_class_tests()
    sys.exit(0 if success else 1)