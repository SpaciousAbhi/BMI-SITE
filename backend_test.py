#!/usr/bin/env python3
"""
Backend Testing Suite for BMI Calculator Website
Testing Agent Report - Frontend-Only Application Analysis
"""

import requests
import json
import sys
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
        """Test that backend API endpoints are NOT accessible (as expected for frontend-only app)"""
        api_endpoints = [
            "/api",
            "/api/status"
        ]
        
        # Test on frontend port (should return React app, not API)
        for endpoint in api_endpoints:
            try:
                response = requests.get(f"{self.frontend_url}{endpoint}", timeout=5)
                if response.status_code == 200:
                    content_type = response.headers.get('content-type', '').lower()
                    if 'text/html' in content_type:
                        self.log_test(f"Frontend API Route {endpoint}", "PASS", 
                                    "Route returns React app (frontend-only behavior as expected)")
                    else:
                        self.log_test(f"Frontend API Route {endpoint}", "WARN", 
                                    f"Unexpected content type for frontend route: {content_type}")
                else:
                    self.log_test(f"Frontend API Route {endpoint}", "INFO", 
                                f"Route returned status {response.status_code} (expected for frontend-only)")
            except Exception as e:
                self.log_test(f"Frontend API Route {endpoint}", "INFO", 
                            f"Route not accessible: {str(e)} (expected for frontend-only)")
        
        # Test backend port (should not be accessible)
        try:
            response = requests.get(f"{self.backend_url}/api", timeout=2)
            self.log_test("Backend Server", "FAIL", 
                        f"Backend server unexpectedly accessible at {self.backend_url}")
        except Exception as e:
            self.log_test("Backend Server", "PASS", 
                        f"Backend server not accessible as expected for frontend-only app: {str(e)}")
    
    def run_all_tests(self):
        """Run all tests and generate report"""
        print("=" * 80)
        print("BMI CALCULATOR WEBSITE - BACKEND TESTING REPORT")
        print("Testing Agent: Comprehensive Frontend-Only Application Analysis")
        print("=" * 80)
        print()
        
        # Run all test suites
        self.test_frontend_server()
        print()
        self.test_static_files()
        print()
        self.test_routing()
        print()
        self.test_seo_meta_tags()
        print()
        self.test_structured_data()
        print()
        self.test_backend_api_endpoints()
        
        # Generate summary
        print("\n" + "=" * 80)
        print("TEST SUMMARY")
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
            print("\nFAILED TESTS:")
            for result in self.test_results:
                if result['status'] == 'FAIL':
                    print(f"  - {result['test']}: {result['message']}")
        
        print("\n" + "=" * 80)
        print("CONCLUSION")
        print("=" * 80)
        
        if fail_count == 0:
            print("✅ All critical tests passed. Frontend-only BMI calculator is working correctly.")
            print("✅ SEO optimization and structured data implementation verified.")
            print("✅ Static file serving and routing functioning properly.")
            print("✅ No backend API endpoints accessible (correct for frontend-only app).")
        else:
            print(f"❌ {fail_count} critical issues found that need attention.")
        
        return fail_count == 0

if __name__ == "__main__":
    tester = BMICalculatorTester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)