#!/usr/bin/env python3
"""
Backend Testing Suite for BMI Calculator Website
Testing Agent Report - Comprehensive Backend & Frontend Service Analysis
"""

import requests
import json
import sys
import time
from datetime import datetime

class BMICalculatorTester:
    def __init__(self):
        self.frontend_url = "http://localhost:3000"
        self.backend_url = "http://localhost:8001"
        self.test_results = []
        
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
    
    def test_frontend_server(self):
        """Test if frontend server is running and responding"""
        try:
            response = requests.get(self.frontend_url, timeout=5)
            if response.status_code == 200:
                self.log_test("Frontend Server", "PASS", 
                            f"Frontend server responding with status {response.status_code}")
                return True
            else:
                self.log_test("Frontend Server", "FAIL", 
                            f"Frontend server returned status {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Frontend Server", "FAIL", 
                        f"Frontend server not accessible: {str(e)}")
            return False
    
    def test_static_files(self):
        """Test static file serving"""
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
                        self.log_test(f"Static File {file_path}", "PASS", 
                                    f"File accessible with correct content type: {content_type}")
                    else:
                        self.log_test(f"Static File {file_path}", "WARN", 
                                    f"File accessible but unexpected content type: {content_type}")
                else:
                    self.log_test(f"Static File {file_path}", "FAIL", 
                                f"File not accessible, status: {response.status_code}")
            except Exception as e:
                self.log_test(f"Static File {file_path}", "FAIL", 
                            f"Error accessing file: {str(e)}")
    
    def test_routing(self):
        """Test all frontend routes"""
        routes = [
            "/",
            "/body-fat-calculator",
            "/army-body-fat-calculator",
            "/lean-body-mass-calculator", 
            "/ideal-weight-calculator",
            "/healthy-weight-calculator",
            "/body-type-calculator",
            "/body-surface-area-calculator",
            "/calorie-calculator",
            "/tdee-calculator",
            "/bmr-calculator",
            "/macro-calculator",
            "/carbohydrate-calculator",
            "/protein-calculator",
            "/fat-intake-calculator",
            "/pace-calculator",
            "/calories-burned-calculator",
            "/one-rep-max-calculator",
            "/target-heart-rate-calculator",
            "/privacy-policy", 
            "/terms-conditions",
            "/contact-us"
        ]
        
        for route in routes:
            try:
                response = requests.get(f"{self.frontend_url}{route}", timeout=5)
                if response.status_code == 200:
                    self.log_test(f"Route {route}", "PASS", 
                                f"Route accessible with status {response.status_code}")
                else:
                    self.log_test(f"Route {route}", "FAIL", 
                                f"Route returned status {response.status_code}")
            except Exception as e:
                self.log_test(f"Route {route}", "FAIL", 
                            f"Error accessing route: {str(e)}")
    
    def test_seo_meta_tags(self):
        """Test SEO meta tags in HTML head"""
        try:
            response = requests.get(self.frontend_url, timeout=5)
            if response.status_code == 200:
                html_content = response.text
                
                # Check for essential SEO meta tags
                seo_checks = [
                    ('<title>', 'Title tag'),
                    ('meta name="description"', 'Meta description'),
                    ('meta name="keywords"', 'Meta keywords'),
                    ('meta property="og:title"', 'Open Graph title'),
                    ('meta property="og:description"', 'Open Graph description'),
                    ('meta property="twitter:title"', 'Twitter Card title'),
                    ('link rel="canonical"', 'Canonical URL')
                ]
                
                for tag, description in seo_checks:
                    if tag in html_content:
                        self.log_test(f"SEO Meta Tag - {description}", "PASS", 
                                    f"{description} found in HTML")
                    else:
                        self.log_test(f"SEO Meta Tag - {description}", "FAIL", 
                                    f"{description} missing from HTML")
            else:
                self.log_test("SEO Meta Tags", "FAIL", 
                            f"Could not retrieve HTML content, status: {response.status_code}")
        except Exception as e:
            self.log_test("SEO Meta Tags", "FAIL", 
                        f"Error checking SEO meta tags: {str(e)}")
    
    def test_structured_data(self):
        """Test JSON-LD structured data"""
        try:
            response = requests.get(self.frontend_url, timeout=5)
            if response.status_code == 200:
                html_content = response.text
                
                # Check for JSON-LD structured data
                if 'application/ld+json' in html_content:
                    self.log_test("Structured Data", "PASS", 
                                "JSON-LD structured data found in HTML")
                    
                    # Check for specific schema types
                    schema_checks = [
                        ('MedicalRiskCalculator', 'Medical Risk Calculator schema'),
                        ('FAQPage', 'FAQ Page schema'),
                        ('WebApplication', 'Web Application schema')
                    ]
                    
                    for schema_type, description in schema_checks:
                        if schema_type in html_content:
                            self.log_test(f"Schema - {description}", "PASS", 
                                        f"{description} found in structured data")
                        else:
                            self.log_test(f"Schema - {description}", "WARN", 
                                        f"{description} not found in structured data")
                else:
                    self.log_test("Structured Data", "FAIL", 
                                "No JSON-LD structured data found")
            else:
                self.log_test("Structured Data", "FAIL", 
                            f"Could not retrieve HTML content, status: {response.status_code}")
        except Exception as e:
            self.log_test("Structured Data", "FAIL", 
                        f"Error checking structured data: {str(e)}")
    
    def test_backend_api_endpoints(self):
        """Test backend API endpoints functionality"""
        print("Testing Backend API Endpoints...")
        
        # Test root API endpoint
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
        
        # Test POST status endpoint
        try:
            test_data = {"client_name": "BMI_Calculator_Test_Client"}
            response = requests.post(f"{self.backend_url}/api/status", 
                                   json=test_data, timeout=5)
            if response.status_code == 200:
                data = response.json()
                if data.get("client_name") == test_data["client_name"] and "id" in data:
                    self.log_test("Backend POST Status", "PASS", 
                                "Status creation endpoint working correctly")
                else:
                    self.log_test("Backend POST Status", "FAIL", 
                                f"Unexpected response structure: {data}")
            else:
                self.log_test("Backend POST Status", "FAIL", 
                            f"Status POST returned status {response.status_code}")
        except Exception as e:
            self.log_test("Backend POST Status", "FAIL", 
                        f"Status POST endpoint error: {str(e)}")
    
    def test_service_status_verification(self):
        """Test service status as requested in review"""
        print("Testing Service Status Verification...")
        
        # Test frontend service
        try:
            response = requests.get(self.frontend_url, timeout=5)
            if response.status_code == 200:
                self.log_test("Frontend Service Status", "PASS", 
                            "Frontend service running properly on port 3000")
            else:
                self.log_test("Frontend Service Status", "FAIL", 
                            f"Frontend service returned status {response.status_code}")
        except Exception as e:
            self.log_test("Frontend Service Status", "FAIL", 
                        f"Frontend service not accessible: {str(e)}")
        
        # Test backend service
        try:
            response = requests.get(f"{self.backend_url}/api/", timeout=5)
            if response.status_code == 200:
                self.log_test("Backend Service Status", "PASS", 
                            "Backend service running properly on port 8001")
            else:
                self.log_test("Backend Service Status", "FAIL", 
                            f"Backend service returned status {response.status_code}")
        except Exception as e:
            self.log_test("Backend Service Status", "FAIL", 
                        f"Backend service not accessible: {str(e)}")
        
        # Test MongoDB service (should be running but not directly accessible)
        try:
            # Test via backend API which uses MongoDB
            response = requests.get(f"{self.backend_url}/api/status", timeout=5)
            if response.status_code == 200:
                self.log_test("MongoDB Service Status", "PASS", 
                            "MongoDB service accessible via backend API")
            else:
                self.log_test("MongoDB Service Status", "FAIL", 
                            "MongoDB not accessible via backend API")
        except Exception as e:
            self.log_test("MongoDB Service Status", "FAIL", 
                        f"MongoDB service test failed: {str(e)}")
    
    def test_flagship_calculator_routes(self):
        """Test the three flagship calculator routes specifically mentioned in review"""
        print("Testing Flagship Calculator Routes...")
        
        flagship_routes = [
            "/ideal-weight-calculator",
            "/healthy-weight-calculator", 
            "/body-type-calculator"
        ]
        
        for route in flagship_routes:
            try:
                response = requests.get(f"{self.frontend_url}{route}", timeout=5)
                if response.status_code == 200:
                    # Check if SEO enhancements are loading
                    html_content = response.text
                    if '<title>' in html_content and 'meta name="description"' in html_content:
                        self.log_test(f"Flagship Route {route}", "PASS", 
                                    f"Route accessible with SEO enhancements loaded")
                    else:
                        self.log_test(f"Flagship Route {route}", "WARN", 
                                    f"Route accessible but SEO enhancements may not be loading")
                else:
                    self.log_test(f"Flagship Route {route}", "FAIL", 
                                f"Route returned status {response.status_code}")
            except Exception as e:
                self.log_test(f"Flagship Route {route}", "FAIL", 
                            f"Error accessing route: {str(e)}")
    
    def test_performance_metrics(self):
        """Test page load times for flagship calculators"""
        print("Testing Performance Metrics...")
        
        flagship_routes = [
            "/ideal-weight-calculator",
            "/healthy-weight-calculator", 
            "/body-type-calculator"
        ]
        
        for route in flagship_routes:
            try:
                start_time = time.time()
                response = requests.get(f"{self.frontend_url}{route}", timeout=10)
                load_time = time.time() - start_time
                
                if response.status_code == 200:
                    if load_time < 2.0:  # Under 2 seconds is good
                        self.log_test(f"Performance {route}", "PASS", 
                                    f"Page loaded in {load_time:.3f}s (excellent)")
                    elif load_time < 5.0:  # Under 5 seconds is acceptable
                        self.log_test(f"Performance {route}", "WARN", 
                                    f"Page loaded in {load_time:.3f}s (acceptable)")
                    else:
                        self.log_test(f"Performance {route}", "FAIL", 
                                    f"Page loaded in {load_time:.3f}s (too slow)")
                else:
                    self.log_test(f"Performance {route}", "FAIL", 
                                f"Route returned status {response.status_code}")
            except Exception as e:
                self.log_test(f"Performance {route}", "FAIL", 
                            f"Performance test failed: {str(e)}")
    
    def test_technical_seo_verification(self):
        """Test technical SEO elements as requested in review"""
        print("Testing Technical SEO Verification...")
        
        flagship_routes = [
            "/ideal-weight-calculator",
            "/healthy-weight-calculator", 
            "/body-type-calculator"
        ]
        
        for route in flagship_routes:
            try:
                response = requests.get(f"{self.frontend_url}{route}", timeout=5)
                if response.status_code == 200:
                    html_content = response.text
                    
                    # Check meta tags
                    meta_checks = [
                        ('<title>', 'Title tag'),
                        ('meta name="description"', 'Meta description'),
                        ('meta property="og:title"', 'Open Graph title'),
                        ('link rel="canonical"', 'Canonical URL')
                    ]
                    
                    route_seo_score = 0
                    for tag, description in meta_checks:
                        if tag in html_content:
                            route_seo_score += 1
                        
                    # Check JSON-LD structured data
                    if 'application/ld+json' in html_content:
                        route_seo_score += 1
                        
                    if route_seo_score >= 4:  # At least 4 out of 5 SEO elements
                        self.log_test(f"Technical SEO {route}", "PASS", 
                                    f"SEO elements present ({route_seo_score}/5)")
                    else:
                        self.log_test(f"Technical SEO {route}", "FAIL", 
                                    f"Missing SEO elements ({route_seo_score}/5)")
                else:
                    self.log_test(f"Technical SEO {route}", "FAIL", 
                                f"Could not access route for SEO verification")
            except Exception as e:
                self.log_test(f"Technical SEO {route}", "FAIL", 
                            f"SEO verification failed: {str(e)}")
    
    def test_backend_cors_configuration(self):
        """Test CORS configuration for backend API"""
        print("Testing Backend CORS Configuration...")
        
        try:
            # Test preflight request
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
                    self.log_test("Backend CORS", "PASS", 
                                "CORS properly configured for frontend access")
                else:
                    self.log_test("Backend CORS", "FAIL", 
                                "CORS headers missing in preflight response")
            else:
                self.log_test("Backend CORS", "FAIL", 
                            f"CORS preflight returned status {response.status_code}")
        except Exception as e:
            self.log_test("Backend CORS", "FAIL", 
                        f"CORS test failed: {str(e)}")
    
    def run_comprehensive_backend_tests(self):
        """Run comprehensive backend and service tests as requested in review"""
        print("=" * 80)
        print("BMI CALCULATOR WEBSITE - COMPREHENSIVE BACKEND TESTING REPORT")
        print("Testing Agent: Backend API & Service Verification Analysis")
        print("=" * 80)
        print()
        
        # Run all test suites as requested in review
        self.test_service_status_verification()
        print()
        self.test_flagship_calculator_routes()
        print()
        self.test_static_files()
        print()
        self.test_technical_seo_verification()
        print()
        self.test_performance_metrics()
        print()
        self.test_backend_api_endpoints()
        print()
        self.test_backend_cors_configuration()
        print()
        self.test_structured_data()
        
        # Generate summary
        print("\n" + "=" * 80)
        print("COMPREHENSIVE TEST SUMMARY")
        print("=" * 80)
        
        pass_count = len([r for r in self.test_results if r['status'] == 'PASS'])
        fail_count = len([r for r in self.test_results if r['status'] == 'FAIL'])
        warn_count = len([r for r in self.test_results if r['status'] == 'WARN'])
        info_count = len([r for r in self.test_results if r['status'] == 'INFO'])
        
        print(f"Total Tests: {len(self.test_results)}")
        print(f"Passed: {pass_count}")
        print(f"Failed: {fail_count}")
        print(f"Warnings: {warn_count}")
        print(f"Info: {info_count}")
        
        if fail_count > 0:
            print("\nCRITICAL ISSUES FOUND:")
            for result in self.test_results:
                if result['status'] == 'FAIL':
                    print(f"  ❌ {result['test']}: {result['message']}")
        
        if warn_count > 0:
            print("\nWARNINGS:")
            for result in self.test_results:
                if result['status'] == 'WARN':
                    print(f"  ⚠️  {result['test']}: {result['message']}")
        
        print("\n" + "=" * 80)
        print("BACKEND TESTING CONCLUSION")
        print("=" * 80)
        
        if fail_count == 0:
            print("✅ All critical backend and service tests passed.")
            print("✅ Backend API endpoints working correctly.")
            print("✅ Frontend service running properly with SEO optimizations.")
            print("✅ Three flagship calculator routes accessible and optimized.")
            print("✅ Static file serving and technical SEO verified.")
            print("✅ Performance metrics within acceptable ranges.")
        else:
            print(f"❌ {fail_count} critical issues found that need immediate attention.")
            print("🔧 Backend functionality requires fixes before production deployment.")
        
        return fail_count == 0

if __name__ == "__main__":
    tester = BMICalculatorTester()
    success = tester.run_comprehensive_backend_tests()
    sys.exit(0 if success else 1)