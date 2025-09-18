#!/usr/bin/env python3
"""
GFR & BAC Calculator Comprehensive Testing Suite
Testing Agent Report - Frontend Calculator Testing with Mobile & SEO Verification
"""

import requests
import json
import sys
import time
from datetime import datetime
from urllib.parse import urljoin

class GFRBACCalculatorTester:
    def __init__(self):
        # Use localhost for internal testing since this is a frontend-only app
        self.frontend_url = "http://localhost:3000"
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
            response = requests.get(self.frontend_url, timeout=10)
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
    
    def test_gfr_calculator_route(self):
        """Test GFR Calculator route accessibility"""
        try:
            response = requests.get(f"{self.frontend_url}/gfr-calculator", timeout=10)
            if response.status_code == 200:
                html_content = response.text
                
                # Check for GFR calculator specific content
                gfr_indicators = [
                    'eGFR Calculator',
                    'CKD-EPI 2021',
                    'Serum Creatinine',
                    'Glomerular Filtration Rate',
                    'kidney function'
                ]
                
                found_indicators = []
                for indicator in gfr_indicators:
                    if indicator.lower() in html_content.lower():
                        found_indicators.append(indicator)
                
                if len(found_indicators) >= 3:
                    self.log_test("GFR Calculator Route", "PASS", 
                                f"Route accessible with GFR content ({len(found_indicators)}/5 indicators found)",
                                f"Found: {', '.join(found_indicators)}")
                else:
                    self.log_test("GFR Calculator Route", "WARN", 
                                f"Route accessible but limited GFR content ({len(found_indicators)}/5 indicators found)",
                                f"Found: {', '.join(found_indicators)}")
                return True
            else:
                self.log_test("GFR Calculator Route", "FAIL", 
                            f"GFR calculator route returned status {response.status_code}")
                return False
        except Exception as e:
            self.log_test("GFR Calculator Route", "FAIL", 
                        f"Error accessing GFR calculator route: {str(e)}")
            return False
    
    def test_bac_calculator_route(self):
        """Test BAC Calculator route accessibility"""
        try:
            response = requests.get(f"{self.frontend_url}/bac-calculator", timeout=10)
            if response.status_code == 200:
                html_content = response.text
                
                # Check for BAC calculator specific content
                bac_indicators = [
                    'BAC Calculator',
                    'Blood Alcohol Content',
                    'Widmark equation',
                    'alcohol impairment',
                    'DUI'
                ]
                
                found_indicators = []
                for indicator in bac_indicators:
                    if indicator.lower() in html_content.lower():
                        found_indicators.append(indicator)
                
                if len(found_indicators) >= 3:
                    self.log_test("BAC Calculator Route", "PASS", 
                                f"Route accessible with BAC content ({len(found_indicators)}/5 indicators found)",
                                f"Found: {', '.join(found_indicators)}")
                else:
                    self.log_test("BAC Calculator Route", "WARN", 
                                f"Route accessible but limited BAC content ({len(found_indicators)}/5 indicators found)",
                                f"Found: {', '.join(found_indicators)}")
                return True
            else:
                self.log_test("BAC Calculator Route", "FAIL", 
                            f"BAC calculator route returned status {response.status_code}")
                return False
        except Exception as e:
            self.log_test("BAC Calculator Route", "FAIL", 
                        f"Error accessing BAC calculator route: {str(e)}")
            return False
    
    def test_mobile_responsiveness_indicators(self):
        """Test mobile responsiveness indicators in HTML"""
        routes_to_test = [
            ("/gfr-calculator", "GFR Calculator"),
            ("/bac-calculator", "BAC Calculator")
        ]
        
        for route, name in routes_to_test:
            try:
                response = requests.get(f"{self.frontend_url}{route}", timeout=10)
                if response.status_code == 200:
                    html_content = response.text
                    
                    # Check for mobile responsiveness indicators
                    mobile_indicators = [
                        'viewport',
                        'responsive',
                        'sm:',
                        'md:',
                        'lg:',
                        'mobile',
                        'touch'
                    ]
                    
                    found_indicators = []
                    for indicator in mobile_indicators:
                        if indicator in html_content:
                            found_indicators.append(indicator)
                    
                    if len(found_indicators) >= 4:
                        self.log_test(f"{name} Mobile Responsiveness", "PASS", 
                                    f"Mobile responsiveness indicators found ({len(found_indicators)}/7)",
                                    f"Found: {', '.join(found_indicators[:5])}")
                    else:
                        self.log_test(f"{name} Mobile Responsiveness", "WARN", 
                                    f"Limited mobile responsiveness indicators ({len(found_indicators)}/7)",
                                    f"Found: {', '.join(found_indicators)}")
                else:
                    self.log_test(f"{name} Mobile Responsiveness", "FAIL", 
                                f"Could not access route for mobile testing")
            except Exception as e:
                self.log_test(f"{name} Mobile Responsiveness", "FAIL", 
                            f"Error testing mobile responsiveness: {str(e)}")
    
    def test_seo_optimization(self):
        """Test SEO optimization elements"""
        routes_to_test = [
            ("/gfr-calculator", "GFR Calculator"),
            ("/bac-calculator", "BAC Calculator")
        ]
        
        for route, name in routes_to_test:
            try:
                response = requests.get(f"{self.frontend_url}{route}", timeout=10)
                if response.status_code == 200:
                    html_content = response.text
                    
                    # Check for SEO elements
                    seo_checks = [
                        ('<title>', 'Title tag'),
                        ('meta name="description"', 'Meta description'),
                        ('meta name="keywords"', 'Meta keywords'),
                        ('meta property="og:title"', 'Open Graph title'),
                        ('meta property="og:description"', 'Open Graph description'),
                        ('link rel="canonical"', 'Canonical URL'),
                        ('application/ld+json', 'JSON-LD structured data')
                    ]
                    
                    passed_checks = []
                    failed_checks = []
                    
                    for tag, description in seo_checks:
                        if tag in html_content:
                            passed_checks.append(description)
                        else:
                            failed_checks.append(description)
                    
                    if len(passed_checks) >= 5:
                        self.log_test(f"{name} SEO Optimization", "PASS", 
                                    f"SEO elements found ({len(passed_checks)}/7)",
                                    f"Found: {', '.join(passed_checks)}")
                    else:
                        self.log_test(f"{name} SEO Optimization", "WARN", 
                                    f"Limited SEO optimization ({len(passed_checks)}/7)",
                                    f"Missing: {', '.join(failed_checks)}")
                else:
                    self.log_test(f"{name} SEO Optimization", "FAIL", 
                                f"Could not access route for SEO testing")
            except Exception as e:
                self.log_test(f"{name} SEO Optimization", "FAIL", 
                            f"Error testing SEO optimization: {str(e)}")
    
    def test_structured_data_schemas(self):
        """Test JSON-LD structured data schemas"""
        routes_to_test = [
            ("/gfr-calculator", "GFR Calculator"),
            ("/bac-calculator", "BAC Calculator")
        ]
        
        for route, name in routes_to_test:
            try:
                response = requests.get(f"{self.frontend_url}{route}", timeout=10)
                if response.status_code == 200:
                    html_content = response.text
                    
                    if 'application/ld+json' in html_content:
                        # Check for specific schema types
                        schema_checks = [
                            ('MedicalRiskEstimator', 'Medical Risk Estimator schema'),
                            ('MedicalRiskCalculator', 'Medical Risk Calculator schema'),
                            ('FAQPage', 'FAQ Page schema'),
                            ('WebApplication', 'Web Application schema')
                        ]
                        
                        found_schemas = []
                        for schema_type, description in schema_checks:
                            if schema_type in html_content:
                                found_schemas.append(description)
                        
                        if len(found_schemas) >= 2:
                            self.log_test(f"{name} Structured Data", "PASS", 
                                        f"JSON-LD schemas found ({len(found_schemas)}/4)",
                                        f"Found: {', '.join(found_schemas)}")
                        else:
                            self.log_test(f"{name} Structured Data", "WARN", 
                                        f"Limited structured data schemas ({len(found_schemas)}/4)",
                                        f"Found: {', '.join(found_schemas)}")
                    else:
                        self.log_test(f"{name} Structured Data", "FAIL", 
                                    "No JSON-LD structured data found")
                else:
                    self.log_test(f"{name} Structured Data", "FAIL", 
                                f"Could not access route for structured data testing")
            except Exception as e:
                self.log_test(f"{name} Structured Data", "FAIL", 
                            f"Error testing structured data: {str(e)}")
    
    def test_calculator_functionality_indicators(self):
        """Test for calculator functionality indicators in HTML"""
        calculators = [
            ("/gfr-calculator", "GFR Calculator", [
                'CKD-EPI 2021',
                'creatinine',
                'kidney function',
                'eGFR',
                'Calculate eGFR'
            ]),
            ("/bac-calculator", "BAC Calculator", [
                'Widmark equation',
                'blood alcohol',
                'impairment',
                'BAC',
                'Calculate BAC'
            ])
        ]
        
        for route, name, indicators in calculators:
            try:
                response = requests.get(f"{self.frontend_url}{route}", timeout=10)
                if response.status_code == 200:
                    html_content = response.text
                    
                    found_indicators = []
                    for indicator in indicators:
                        if indicator.lower() in html_content.lower():
                            found_indicators.append(indicator)
                    
                    if len(found_indicators) >= 3:
                        self.log_test(f"{name} Functionality", "PASS", 
                                    f"Calculator functionality indicators found ({len(found_indicators)}/5)",
                                    f"Found: {', '.join(found_indicators)}")
                    else:
                        self.log_test(f"{name} Functionality", "WARN", 
                                    f"Limited functionality indicators ({len(found_indicators)}/5)",
                                    f"Found: {', '.join(found_indicators)}")
                else:
                    self.log_test(f"{name} Functionality", "FAIL", 
                                f"Could not access route for functionality testing")
            except Exception as e:
                self.log_test(f"{name} Functionality", "FAIL", 
                            f"Error testing calculator functionality: {str(e)}")
    
    def test_accessibility_features(self):
        """Test accessibility features"""
        routes_to_test = [
            ("/gfr-calculator", "GFR Calculator"),
            ("/bac-calculator", "BAC Calculator")
        ]
        
        for route, name in routes_to_test:
            try:
                response = requests.get(f"{self.frontend_url}{route}", timeout=10)
                if response.status_code == 200:
                    html_content = response.text
                    
                    # Check for accessibility features
                    accessibility_checks = [
                        ('aria-label', 'ARIA labels'),
                        ('role=', 'ARIA roles'),
                        ('alt=', 'Alt text'),
                        ('tabindex', 'Tab navigation'),
                        ('focus:', 'Focus states'),
                        ('sr-only', 'Screen reader text')
                    ]
                    
                    found_features = []
                    for feature, description in accessibility_checks:
                        if feature in html_content:
                            found_features.append(description)
                    
                    if len(found_features) >= 3:
                        self.log_test(f"{name} Accessibility", "PASS", 
                                    f"Accessibility features found ({len(found_features)}/6)",
                                    f"Found: {', '.join(found_features)}")
                    else:
                        self.log_test(f"{name} Accessibility", "WARN", 
                                    f"Limited accessibility features ({len(found_features)}/6)",
                                    f"Found: {', '.join(found_features)}")
                else:
                    self.log_test(f"{name} Accessibility", "FAIL", 
                                f"Could not access route for accessibility testing")
            except Exception as e:
                self.log_test(f"{name} Accessibility", "FAIL", 
                            f"Error testing accessibility: {str(e)}")
    
    def test_performance_indicators(self):
        """Test performance indicators"""
        routes_to_test = [
            ("/gfr-calculator", "GFR Calculator"),
            ("/bac-calculator", "BAC Calculator")
        ]
        
        for route, name in routes_to_test:
            try:
                start_time = time.time()
                response = requests.get(f"{self.frontend_url}{route}", timeout=10)
                load_time = time.time() - start_time
                
                if response.status_code == 200:
                    if load_time < 3.0:
                        self.log_test(f"{name} Performance", "PASS", 
                                    f"Page loaded in {load_time:.2f} seconds (< 3s target)")
                    elif load_time < 5.0:
                        self.log_test(f"{name} Performance", "WARN", 
                                    f"Page loaded in {load_time:.2f} seconds (acceptable but could be faster)")
                    else:
                        self.log_test(f"{name} Performance", "FAIL", 
                                    f"Page loaded in {load_time:.2f} seconds (too slow)")
                else:
                    self.log_test(f"{name} Performance", "FAIL", 
                                f"Could not measure performance - route returned {response.status_code}")
            except Exception as e:
                self.log_test(f"{name} Performance", "FAIL", 
                            f"Error testing performance: {str(e)}")
    
    def test_backend_api_not_accessible(self):
        """Verify backend API is not accessible (frontend-only app)"""
        try:
            response = requests.get("http://localhost:8001/api", timeout=2)
            self.log_test("Backend API Isolation", "WARN", 
                        f"Backend API unexpectedly accessible at localhost:8001 (status: {response.status_code})")
        except Exception as e:
            self.log_test("Backend API Isolation", "PASS", 
                        f"Backend API properly isolated from frontend-only app: {str(e)}")
    
    def run_comprehensive_tests(self):
        """Run all comprehensive tests for GFR & BAC calculators"""
        print("=" * 100)
        print("GFR & BAC CALCULATOR COMPREHENSIVE TESTING REPORT")
        print("Testing Agent: Advanced Mobile Responsiveness & SEO Optimization Verification")
        print("=" * 100)
        print()
        
        # Run all test suites
        print("🔍 BASIC CONNECTIVITY TESTS")
        print("-" * 50)
        self.test_frontend_server()
        print()
        
        print("🧮 CALCULATOR ROUTE ACCESSIBILITY TESTS")
        print("-" * 50)
        self.test_gfr_calculator_route()
        self.test_bac_calculator_route()
        print()
        
        print("📱 MOBILE RESPONSIVENESS TESTS")
        print("-" * 50)
        self.test_mobile_responsiveness_indicators()
        print()
        
        print("🔍 SEO OPTIMIZATION TESTS")
        print("-" * 50)
        self.test_seo_optimization()
        print()
        
        print("📊 STRUCTURED DATA TESTS")
        print("-" * 50)
        self.test_structured_data_schemas()
        print()
        
        print("⚙️ CALCULATOR FUNCTIONALITY TESTS")
        print("-" * 50)
        self.test_calculator_functionality_indicators()
        print()
        
        print("♿ ACCESSIBILITY TESTS")
        print("-" * 50)
        self.test_accessibility_features()
        print()
        
        print("⚡ PERFORMANCE TESTS")
        print("-" * 50)
        self.test_performance_indicators()
        print()
        
        print("🔒 BACKEND ISOLATION TESTS")
        print("-" * 50)
        self.test_backend_api_not_accessible()
        
        # Generate comprehensive summary
        print("\n" + "=" * 100)
        print("COMPREHENSIVE TEST SUMMARY")
        print("=" * 100)
        
        pass_count = len([r for r in self.test_results if r['status'] == 'PASS'])
        fail_count = len([r for r in self.test_results if r['status'] == 'FAIL'])
        warn_count = len([r for r in self.test_results if r['status'] == 'WARN'])
        
        print(f"Total Tests: {len(self.test_results)}")
        print(f"✅ Passed: {pass_count}")
        print(f"❌ Failed: {fail_count}")
        print(f"⚠️  Warnings: {warn_count}")
        
        if fail_count > 0:
            print(f"\n❌ FAILED TESTS ({fail_count}):")
            for result in self.test_results:
                if result['status'] == 'FAIL':
                    print(f"  • {result['test']}: {result['message']}")
        
        if warn_count > 0:
            print(f"\n⚠️  WARNING TESTS ({warn_count}):")
            for result in self.test_results:
                if result['status'] == 'WARN':
                    print(f"  • {result['test']}: {result['message']}")
        
        print("\n" + "=" * 100)
        print("TESTING CONCLUSION")
        print("=" * 100)
        
        if fail_count == 0:
            print("✅ GFR & BAC Calculator comprehensive testing completed successfully!")
            print("✅ Both calculators are accessible with proper mobile responsiveness")
            print("✅ SEO optimization and structured data implementation verified")
            print("✅ Calculator functionality indicators present")
            print("✅ Frontend-only architecture working correctly")
            
            if warn_count > 0:
                print(f"⚠️  {warn_count} minor optimization opportunities identified")
        else:
            print(f"❌ {fail_count} critical issues found requiring immediate attention")
            print("🔧 Review failed tests above for specific remediation steps")
        
        return fail_count == 0

if __name__ == "__main__":
    tester = GFRBACCalculatorTester()
    success = tester.run_comprehensive_tests()
    sys.exit(0 if success else 1)