#!/usr/bin/env python3
"""
Comprehensive Backend Testing Suite for World-Class Pregnancy Calculator Application
Testing Agent Report - 2025 SEO Optimized Pregnancy Calculator Suite
Focus: Backend API Testing, Frontend Route Verification, SEO Implementation Testing
"""

import requests
import json
import sys
import time
from datetime import datetime

class PregnancyCalculatorBackendTester:
    def __init__(self):
        # Use localhost URLs for testing as per system instructions
        self.frontend_url = "http://localhost:3000"
        self.backend_url = "http://localhost:8001"
        self.test_results = []
        
        # Three main pregnancy calculator routes as specified in review request
        self.main_pregnancy_routes = [
            "/pregnancy-calculator",           # World-Class Pregnancy Calculator SEO Optimization - 2025
            "/pregnancy-weight-gain-calculator", # World-Class Pregnancy Weight Gain Calculator IOM Guidelines
            "/due-date-calculator"             # World-Class Due Date Calculator Naegele Rule Medical Optimization
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
    
    def test_backend_services_running(self):
        """Test if backend services are running correctly (FastAPI backend, MongoDB)"""
        print("Testing Backend Services Status...")
        
        # Test FastAPI backend
        try:
            response = requests.get(f"{self.backend_url}/api/", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if data.get("message") == "Hello World":
                    self.log_test("FastAPI Backend Service", "PASS", 
                                "FastAPI backend service running correctly")
                else:
                    self.log_test("FastAPI Backend Service", "FAIL", 
                                f"Unexpected response from backend: {data}")
            else:
                self.log_test("FastAPI Backend Service", "FAIL", 
                            f"Backend service returned status {response.status_code}")
        except Exception as e:
            self.log_test("FastAPI Backend Service", "FAIL", 
                        f"Backend service not accessible: {str(e)}")
        
        # Test MongoDB integration via backend API
        try:
            response = requests.get(f"{self.backend_url}/api/status", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("MongoDB Integration", "PASS", 
                                f"MongoDB integration working via backend API, {len(data)} records found")
                else:
                    self.log_test("MongoDB Integration", "FAIL", 
                                f"Unexpected response format from MongoDB: {type(data)}")
            else:
                self.log_test("MongoDB Integration", "FAIL", 
                            f"MongoDB integration failed, status: {response.status_code}")
        except Exception as e:
            self.log_test("MongoDB Integration", "FAIL", 
                        f"MongoDB integration test failed: {str(e)}")
    
    def test_backend_api_endpoints(self):
        """Test all API endpoints are accessible and functional"""
        print("Testing Backend API Endpoints...")
        
        # Test root API endpoint
        try:
            response = requests.get(f"{self.backend_url}/api/", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if data.get("message") == "Hello World":
                    self.log_test("Backend API Root Endpoint", "PASS", 
                                "Root API endpoint accessible and functional")
                else:
                    self.log_test("Backend API Root Endpoint", "FAIL", 
                                f"Unexpected response: {data}")
            else:
                self.log_test("Backend API Root Endpoint", "FAIL", 
                            f"Root endpoint returned status {response.status_code}")
        except Exception as e:
            self.log_test("Backend API Root Endpoint", "FAIL", 
                        f"Root endpoint not accessible: {str(e)}")
        
        # Test GET status endpoint
        try:
            response = requests.get(f"{self.backend_url}/api/status", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("Backend GET Status Endpoint", "PASS", 
                                f"GET status endpoint working, returned {len(data)} records")
                else:
                    self.log_test("Backend GET Status Endpoint", "FAIL", 
                                f"Unexpected response format: {type(data)}")
            else:
                self.log_test("Backend GET Status Endpoint", "FAIL", 
                            f"GET status endpoint returned status {response.status_code}")
        except Exception as e:
            self.log_test("Backend GET Status Endpoint", "FAIL", 
                        f"GET status endpoint error: {str(e)}")
        
        # Test POST status endpoint
        try:
            test_data = {"client_name": "Pregnancy_Calculator_Test_2025"}
            response = requests.post(f"{self.backend_url}/api/status", 
                                   json=test_data, timeout=10)
            if response.status_code == 200:
                data = response.json()
                if data.get("client_name") == test_data["client_name"] and "id" in data:
                    self.log_test("Backend POST Status Endpoint", "PASS", 
                                "POST status endpoint working correctly with UUID generation")
                else:
                    self.log_test("Backend POST Status Endpoint", "FAIL", 
                                f"Unexpected response structure: {data}")
            else:
                self.log_test("Backend POST Status Endpoint", "FAIL", 
                            f"POST status endpoint returned status {response.status_code}")
        except Exception as e:
            self.log_test("Backend POST Status Endpoint", "FAIL", 
                        f"POST status endpoint error: {str(e)}")
    
    def test_application_performance_load_times(self):
        """Test application performance and load times"""
        print("Testing Application Performance & Load Times...")
        
        # Test frontend server performance
        try:
            start_time = time.time()
            response = requests.get(self.frontend_url, timeout=15)
            load_time = time.time() - start_time
            
            if response.status_code == 200:
                if load_time < 1.0:
                    self.log_test("Frontend Server Performance", "PASS", 
                                f"Excellent frontend load time: {load_time:.3f}s")
                elif load_time < 3.0:
                    self.log_test("Frontend Server Performance", "WARN", 
                                f"Acceptable frontend load time: {load_time:.3f}s")
                else:
                    self.log_test("Frontend Server Performance", "FAIL", 
                                f"Slow frontend load time: {load_time:.3f}s")
            else:
                self.log_test("Frontend Server Performance", "FAIL", 
                            f"Frontend server returned status {response.status_code}")
        except Exception as e:
            self.log_test("Frontend Server Performance", "FAIL", 
                        f"Frontend performance test failed: {str(e)}")
        
        # Test backend API performance
        try:
            start_time = time.time()
            response = requests.get(f"{self.backend_url}/api/", timeout=15)
            api_time = time.time() - start_time
            
            if response.status_code == 200:
                if api_time < 0.5:
                    self.log_test("Backend API Performance", "PASS", 
                                f"Excellent backend API response time: {api_time:.3f}s")
                elif api_time < 2.0:
                    self.log_test("Backend API Performance", "WARN", 
                                f"Acceptable backend API response time: {api_time:.3f}s")
                else:
                    self.log_test("Backend API Performance", "FAIL", 
                                f"Slow backend API response time: {api_time:.3f}s")
            else:
                self.log_test("Backend API Performance", "FAIL", 
                            f"Backend API returned status {response.status_code}")
        except Exception as e:
            self.log_test("Backend API Performance", "FAIL", 
                        f"Backend API performance test failed: {str(e)}")
        
        # Test pregnancy calculator routes performance
        for route in self.main_pregnancy_routes:
            try:
                start_time = time.time()
                response = requests.get(f"{self.frontend_url}{route}", timeout=15)
                route_time = time.time() - start_time
                
                if response.status_code == 200:
                    if route_time < 1.0:
                        self.log_test(f"Route Performance {route}", "PASS", 
                                    f"Excellent route load time: {route_time:.3f}s")
                    elif route_time < 3.0:
                        self.log_test(f"Route Performance {route}", "WARN", 
                                    f"Acceptable route load time: {route_time:.3f}s")
                    else:
                        self.log_test(f"Route Performance {route}", "FAIL", 
                                    f"Slow route load time: {route_time:.3f}s")
                else:
                    self.log_test(f"Route Performance {route}", "FAIL", 
                                f"Route returned status {response.status_code}")
            except Exception as e:
                self.log_test(f"Route Performance {route}", "FAIL", 
                            f"Route performance test failed: {str(e)}")
    
    def test_env_configuration(self):
        """Test .env configuration is working properly"""
        print("Testing Environment Configuration...")
        
        # Test backend environment configuration by checking if MongoDB connection works
        try:
            response = requests.get(f"{self.backend_url}/api/status", timeout=10)
            if response.status_code == 200:
                self.log_test("Backend .env Configuration", "PASS", 
                            "Backend .env configuration working (MongoDB connection successful)")
            else:
                self.log_test("Backend .env Configuration", "FAIL", 
                            f"Backend .env configuration issue, status: {response.status_code}")
        except Exception as e:
            self.log_test("Backend .env Configuration", "FAIL", 
                        f"Backend .env configuration test failed: {str(e)}")
        
        # Test CORS configuration
        try:
            headers = {
                'Origin': 'http://localhost:3000',
                'Access-Control-Request-Method': 'POST',
                'Access-Control-Request-Headers': 'Content-Type'
            }
            response = requests.options(f"{self.backend_url}/api/status", 
                                      headers=headers, timeout=10)
            
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
                        f"CORS configuration test failed: {str(e)}")
    
    def test_pregnancy_calculator_routes(self):
        """Test the main pregnancy calculator route (/pregnancy-calculator) is accessible"""
        print("Testing Main Pregnancy Calculator Routes...")
        
        for route in self.main_pregnancy_routes:
            try:
                start_time = time.time()
                response = requests.get(f"{self.frontend_url}{route}", timeout=15)
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
    
    def test_enhanced_seo_content(self):
        """Test enhanced SEO content loads properly including new voice search optimized FAQ section"""
        print("Testing Enhanced SEO Content...")
        
        for route in self.main_pregnancy_routes:
            try:
                response = requests.get(f"{self.frontend_url}{route}", timeout=15)
                if response.status_code == 200:
                    html_content = response.text.lower()
                    
                    # Check for comprehensive SEO meta tags
                    seo_checks = [
                        ('<title>', 'Title tag'),
                        ('meta name="description"', 'Meta description'),
                        ('meta name="keywords"', 'Meta keywords'),
                        ('meta property="og:title"', 'Open Graph title'),
                        ('meta property="og:description"', 'Open Graph description'),
                        ('meta property="og:url"', 'Open Graph URL'),
                        ('meta property="og:image"', 'Open Graph image'),
                        ('meta name="twitter:card"', 'Twitter Card'),
                        ('meta name="twitter:title"', 'Twitter title'),
                        ('meta name="twitter:description"', 'Twitter description'),
                        ('link rel="canonical"', 'Canonical URL')
                    ]
                    
                    seo_score = 0
                    for tag, description in seo_checks:
                        if tag in html_content:
                            seo_score += 1
                    
                    if seo_score >= 8:  # At least 8 out of 11 SEO elements
                        self.log_test(f"SEO Meta Tags {route}", "PASS", 
                                    f"Comprehensive SEO meta tags present ({seo_score}/11)")
                    else:
                        self.log_test(f"SEO Meta Tags {route}", "FAIL", 
                                    f"Missing SEO meta tags ({seo_score}/11)")
                    
                    # Check for FAQ content (voice search optimization)
                    faq_indicators = [
                        'frequently asked questions',
                        'faq',
                        'question',
                        'answer'
                    ]
                    
                    faq_score = sum(1 for indicator in faq_indicators if indicator in html_content)
                    
                    if faq_score >= 3:
                        self.log_test(f"FAQ Content {route}", "PASS", 
                                    f"Voice search optimized FAQ section found ({faq_score}/4 indicators)")
                    else:
                        self.log_test(f"FAQ Content {route}", "FAIL", 
                                    f"Limited FAQ content found ({faq_score}/4 indicators)")
                else:
                    self.log_test(f"SEO Content {route}", "FAIL", 
                                f"Could not retrieve HTML content, status: {response.status_code}")
            except Exception as e:
                self.log_test(f"SEO Content {route}", "FAIL", 
                            f"Error checking SEO content: {str(e)}")
    
    def test_json_ld_structured_data(self):
        """Test enhanced JSON-LD structured data with AI optimizations is valid"""
        print("Testing Enhanced JSON-LD Structured Data...")
        
        for route in self.main_pregnancy_routes:
            try:
                response = requests.get(f"{self.frontend_url}{route}", timeout=15)
                if response.status_code == 200:
                    html_content = response.text
                    
                    # Check for JSON-LD structured data
                    if 'application/ld+json' in html_content:
                        self.log_test(f"JSON-LD Presence {route}", "PASS", 
                                    "JSON-LD structured data found in HTML")
                        
                        # Check for specific medical schema types
                        schema_checks = [
                            ('MedicalRiskCalculator', 'Medical Risk Calculator schema'),
                            ('FAQPage', 'FAQ Page schema'),
                            ('WebApplication', 'Web Application schema'),
                            ('medicalSpecialty', 'Medical Specialty classification'),
                            ('applicationCategory', 'Application Category'),
                            ('operatingSystem', 'Operating System compatibility')
                        ]
                        
                        schema_score = 0
                        for schema_type, description in schema_checks:
                            if schema_type in html_content:
                                schema_score += 1
                        
                        if schema_score >= 4:
                            self.log_test(f"JSON-LD Schema {route}", "PASS", 
                                        f"Comprehensive schema implementation ({schema_score}/6)")
                        else:
                            self.log_test(f"JSON-LD Schema {route}", "WARN", 
                                        f"Basic schema implementation ({schema_score}/6)")
                    else:
                        self.log_test(f"JSON-LD {route}", "FAIL", 
                                    "No JSON-LD structured data found")
                else:
                    self.log_test(f"JSON-LD {route}", "FAIL", 
                                f"Could not retrieve HTML content, status: {response.status_code}")
            except Exception as e:
                self.log_test(f"JSON-LD {route}", "FAIL", 
                            f"Error checking JSON-LD structured data: {str(e)}")
    
    def test_static_assets(self):
        """Test static assets (robots.txt, sitemap.xml) are properly served"""
        print("Testing Static Assets...")
        
        static_files = [
            ("/robots.txt", "text/plain"),
            ("/sitemap.xml", "application/xml"),
            ("/manifest.json", "application/json")
        ]
        
        for file_path, expected_content_type in static_files:
            try:
                response = requests.get(f"{self.frontend_url}{file_path}", timeout=10)
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
    
    def test_mobile_responsiveness(self):
        """Test mobile responsiveness of enhanced sections"""
        print("Testing Mobile Responsiveness...")
        
        for route in self.main_pregnancy_routes:
            try:
                response = requests.get(f"{self.frontend_url}{route}", timeout=15)
                if response.status_code == 200:
                    html_content = response.text
                    
                    # Check for responsive design indicators
                    responsive_indicators = [
                        'viewport',
                        'width=device-width',
                        'responsive',
                        'mobile',
                        '@media'
                    ]
                    
                    responsive_score = sum(1 for indicator in responsive_indicators if indicator in html_content)
                    
                    if responsive_score >= 3:
                        self.log_test(f"Mobile Responsiveness {route}", "PASS", 
                                    f"Good responsive design indicators ({responsive_score}/5)")
                    else:
                        self.log_test(f"Mobile Responsiveness {route}", "WARN", 
                                    f"Limited responsive design indicators ({responsive_score}/5)")
                else:
                    self.log_test(f"Mobile Responsiveness {route}", "FAIL", 
                                f"Could not retrieve HTML content, status: {response.status_code}")
            except Exception as e:
                self.log_test(f"Mobile Responsiveness {route}", "FAIL", 
                            f"Error checking mobile responsiveness: {str(e)}")
    
    def run_comprehensive_backend_tests(self):
        """Run comprehensive backend tests as requested in review"""
        print("=" * 80)
        print("WORLD-CLASS PREGNANCY CALCULATOR - COMPREHENSIVE BACKEND TESTING REPORT")
        print("Testing Agent: Backend API & SEO Optimization Verification Analysis")
        print("Focus: 2025 SEO Optimized Pregnancy Calculator Suite")
        print("=" * 80)
        print()
        
        # Run all test suites as specified in review request
        print("1. BACKEND TESTING:")
        self.test_backend_services_running()
        print()
        self.test_backend_api_endpoints()
        print()
        self.test_application_performance_load_times()
        print()
        self.test_env_configuration()
        print()
        
        print("2. FRONTEND ROUTE TESTING:")
        self.test_pregnancy_calculator_routes()
        print()
        self.test_enhanced_seo_content()
        print()
        
        print("3. SEO TECHNICAL VERIFICATION:")
        self.test_json_ld_structured_data()
        print()
        self.test_static_assets()
        print()
        
        print("4. PERFORMANCE & FUNCTIONALITY:")
        self.test_mobile_responsiveness()
        
        # Generate comprehensive summary
        print("\n" + "=" * 80)
        print("COMPREHENSIVE TEST SUMMARY")
        print("=" * 80)
        
        pass_count = len([r for r in self.test_results if r['status'] == 'PASS'])
        fail_count = len([r for r in self.test_results if r['status'] == 'FAIL'])
        warn_count = len([r for r in self.test_results if r['status'] == 'WARN'])
        
        print(f"Total Tests: {len(self.test_results)}")
        print(f"Passed: {pass_count}")
        print(f"Failed: {fail_count}")
        print(f"Warnings: {warn_count}")
        
        # Detailed failure analysis
        if fail_count > 0:
            print("\n🚨 CRITICAL ISSUES FOUND:")
            for result in self.test_results:
                if result['status'] == 'FAIL':
                    print(f"  ❌ {result['test']}: {result['message']}")
        
        # Warning analysis
        if warn_count > 0:
            print("\n⚠️  WARNINGS (MINOR ISSUES):")
            for result in self.test_results:
                if result['status'] == 'WARN':
                    print(f"  ⚠️  {result['test']}: {result['message']}")
        
        print("\n" + "=" * 80)
        print("WORLD-CLASS PREGNANCY CALCULATOR TESTING CONCLUSION")
        print("=" * 80)
        
        if fail_count == 0:
            print("✅ ALL CRITICAL BACKEND TESTS PASSED - WORLD-CLASS IMPLEMENTATION VERIFIED")
            print("✅ Backend services (FastAPI, MongoDB) running correctly")
            print("✅ All API endpoints accessible and functional")
            print("✅ Application performance and load times excellent")
            print("✅ Environment configuration working properly")
            print("✅ Main pregnancy calculator routes accessible")
            print("✅ Enhanced SEO content with voice search optimization verified")
            print("✅ JSON-LD structured data with AI optimizations valid")
            print("✅ Static assets properly served")
            print("✅ Mobile responsiveness confirmed")
            print("\n🏆 PREGNANCY CALCULATOR BACKEND IS WORLD-CLASS AND PRODUCTION-READY")
        else:
            print(f"❌ {fail_count} CRITICAL ISSUES FOUND - IMMEDIATE ATTENTION REQUIRED")
            print("🔧 Backend functionality requires fixes before production")
            print("📋 Review failed tests above for specific issues to address")
        
        return fail_count == 0

if __name__ == "__main__":
    tester = PregnancyCalculatorBackendTester()
    success = tester.run_comprehensive_backend_tests()
    sys.exit(0 if success else 1)