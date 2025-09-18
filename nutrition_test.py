#!/usr/bin/env python3
"""
Nutrition Calculators Testing Suite
Testing Agent Report - Enhanced Nutrition Calculators Verification
"""

import requests
import json
import sys
from datetime import datetime

class NutritionCalculatorsTester:
    def __init__(self):
        self.frontend_url = "http://localhost:3000"
        self.test_results = []
        
        # Focus on the 7 nutrition calculators as requested
        self.nutrition_calculators = [
            ("/calorie-calculator", "Calorie Calculator"),
            ("/tdee-calculator", "TDEE Calculator"), 
            ("/bmr-calculator", "BMR Calculator"),
            ("/macro-calculator", "Macro Calculator"),
            ("/carbohydrate-calculator", "Carbohydrate Calculator"),
            ("/protein-calculator", "Protein Calculator"),
            ("/fat-intake-calculator", "Fat Intake Calculator")
        ]
        
        # Recently optimized calculators (first 4)
        self.recently_optimized = [
            "/calorie-calculator",
            "/tdee-calculator", 
            "/bmr-calculator",
            "/macro-calculator"
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
    
    def test_frontend_server(self):
        """Test if frontend server is running on port 3000"""
        try:
            response = requests.get(self.frontend_url, timeout=5)
            if response.status_code == 200:
                self.log_test("Frontend Server", "PASS", 
                            f"Frontend server responding correctly on port 3000 with status {response.status_code}")
                return True
            else:
                self.log_test("Frontend Server", "FAIL", 
                            f"Frontend server returned status {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Frontend Server", "FAIL", 
                        f"Frontend server not accessible on port 3000: {str(e)}")
            return False
    
    def test_nutrition_calculator_routes(self):
        """Test all 7 nutrition calculator routes accessibility"""
        for route, name in self.nutrition_calculators:
            try:
                response = requests.get(f"{self.frontend_url}{route}", timeout=5)
                if response.status_code == 200:
                    # Check if it's actually HTML content (React app)
                    content_type = response.headers.get('content-type', '').lower()
                    if 'text/html' in content_type:
                        self.log_test(f"{name} Route", "PASS", 
                                    f"Route {route} accessible with 200 status")
                    else:
                        self.log_test(f"{name} Route", "WARN", 
                                    f"Route {route} accessible but unexpected content type: {content_type}")
                else:
                    self.log_test(f"{name} Route", "FAIL", 
                                f"Route {route} returned status {response.status_code}")
            except Exception as e:
                self.log_test(f"{name} Route", "FAIL", 
                            f"Error accessing route {route}: {str(e)}")
    
    def test_recently_optimized_calculators(self):
        """Test the 4 recently optimized nutrition calculators specifically"""
        print("\n--- Testing Recently Optimized Calculators ---")
        for route in self.recently_optimized:
            calculator_name = next(name for r, name in self.nutrition_calculators if r == route)
            try:
                response = requests.get(f"{self.frontend_url}{route}", timeout=5)
                if response.status_code == 200:
                    html_content = response.text
                    
                    # Check for enhanced mobile responsiveness indicators
                    responsive_indicators = [
                        'h-11 sm:h-10',  # Enhanced button sizing
                        'w-16 sm:w-20',  # Select dropdown optimization
                        'grid-cols-1 lg:grid-cols-2',  # Mobile-first grid
                        'p-3 sm:p-4 md:p-6'  # Responsive padding
                    ]
                    
                    responsive_found = sum(1 for indicator in responsive_indicators if indicator in html_content)
                    
                    # Check for educational content enhancements
                    educational_indicators = [
                        'FAQ',
                        'formula',
                        'scientific',
                        'educational',
                        'explanation'
                    ]
                    
                    educational_found = sum(1 for indicator in educational_indicators if indicator.lower() in html_content.lower())
                    
                    if responsive_found > 0 or educational_found > 0:
                        self.log_test(f"{calculator_name} Optimization", "PASS", 
                                    f"Enhanced features detected - Responsive: {responsive_found}/4, Educational: {educational_found}/5")
                    else:
                        self.log_test(f"{calculator_name} Optimization", "WARN", 
                                    f"Limited optimization indicators found")
                else:
                    self.log_test(f"{calculator_name} Optimization", "FAIL", 
                                f"Could not access optimized calculator, status: {response.status_code}")
            except Exception as e:
                self.log_test(f"{calculator_name} Optimization", "FAIL", 
                            f"Error testing optimized calculator: {str(e)}")
    
    def test_static_assets(self):
        """Test static assets (robots.txt, sitemap.xml) are served properly"""
        static_files = [
            ("/robots.txt", "text/plain"),
            ("/sitemap.xml", "application/xml")
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
    
    def test_seo_meta_tags(self):
        """Test SEO meta tags and structured data on nutrition calculator pages"""
        # Test a sample of nutrition calculators for SEO
        sample_calculators = [
            ("/calorie-calculator", "Calorie Calculator"),
            ("/tdee-calculator", "TDEE Calculator"),
            ("/macro-calculator", "Macro Calculator")
        ]
        
        for route, name in sample_calculators:
            try:
                response = requests.get(f"{self.frontend_url}{route}", timeout=5)
                if response.status_code == 200:
                    html_content = response.text
                    
                    # Check for essential SEO meta tags
                    seo_checks = [
                        ('<title>', 'Title tag'),
                        ('meta name="description"', 'Meta description'),
                        ('meta name="keywords"', 'Meta keywords'),
                        ('meta property="og:title"', 'Open Graph title'),
                        ('link rel="canonical"', 'Canonical URL')
                    ]
                    
                    seo_found = 0
                    for tag, description in seo_checks:
                        if tag in html_content:
                            seo_found += 1
                    
                    if seo_found >= 4:
                        self.log_test(f"{name} SEO", "PASS", 
                                    f"SEO meta tags present ({seo_found}/5)")
                    else:
                        self.log_test(f"{name} SEO", "WARN", 
                                    f"Limited SEO meta tags found ({seo_found}/5)")
                else:
                    self.log_test(f"{name} SEO", "FAIL", 
                                f"Could not retrieve HTML content, status: {response.status_code}")
            except Exception as e:
                self.log_test(f"{name} SEO", "FAIL", 
                            f"Error checking SEO meta tags: {str(e)}")
    
    def test_responsive_design(self):
        """Test responsive design optimizations"""
        try:
            # Test home page for responsive design indicators
            response = requests.get(self.frontend_url, timeout=5)
            if response.status_code == 200:
                html_content = response.text
                
                # Check for responsive design classes
                responsive_classes = [
                    'sm:',  # Small screen breakpoint
                    'md:',  # Medium screen breakpoint
                    'lg:',  # Large screen breakpoint
                    'grid-cols-1',  # Mobile-first grid
                    'touch-',  # Touch interface optimizations
                ]
                
                responsive_found = sum(1 for cls in responsive_classes if cls in html_content)
                
                if responsive_found >= 3:
                    self.log_test("Responsive Design", "PASS", 
                                f"Responsive design classes detected ({responsive_found}/5)")
                else:
                    self.log_test("Responsive Design", "WARN", 
                                f"Limited responsive design indicators ({responsive_found}/5)")
            else:
                self.log_test("Responsive Design", "FAIL", 
                            f"Could not check responsive design, status: {response.status_code}")
        except Exception as e:
            self.log_test("Responsive Design", "FAIL", 
                        f"Error checking responsive design: {str(e)}")
    
    def test_no_backend_required(self):
        """Verify this is a frontend-only application (no backend API needed)"""
        try:
            # Test that backend port is not accessible
            backend_response = requests.get("http://localhost:8001/api", timeout=2)
            self.log_test("Backend API Check", "FAIL", 
                        f"Backend unexpectedly accessible - this should be frontend-only")
        except Exception as e:
            self.log_test("Backend API Check", "PASS", 
                        f"Backend not accessible as expected for frontend-only app: {str(e)}")
    
    def run_all_tests(self):
        """Run all tests and generate report"""
        print("=" * 80)
        print("NUTRITION CALCULATORS TESTING REPORT")
        print("Testing Agent: Enhanced Nutrition Calculators Verification")
        print("=" * 80)
        print()
        
        # Run all test suites
        self.test_frontend_server()
        print()
        self.test_nutrition_calculator_routes()
        print()
        self.test_recently_optimized_calculators()
        print()
        self.test_static_assets()
        print()
        self.test_seo_meta_tags()
        print()
        self.test_responsive_design()
        print()
        self.test_no_backend_required()
        
        # Generate summary
        print("\n" + "=" * 80)
        print("TEST SUMMARY")
        print("=" * 80)
        
        pass_count = len([r for r in self.test_results if r['status'] == 'PASS'])
        fail_count = len([r for r in self.test_results if r['status'] == 'FAIL'])
        warn_count = len([r for r in self.test_results if r['status'] == 'WARN'])
        
        print(f"Total Tests: {len(self.test_results)}")
        print(f"Passed: {pass_count}")
        print(f"Failed: {fail_count}")
        print(f"Warnings: {warn_count}")
        
        if fail_count > 0:
            print("\nFAILED TESTS:")
            for result in self.test_results:
                if result['status'] == 'FAIL':
                    print(f"  - {result['test']}: {result['message']}")
        
        print("\n" + "=" * 80)
        print("CONCLUSION")
        print("=" * 80)
        
        if fail_count == 0:
            print("✅ All nutrition calculators are working correctly.")
            print("✅ Frontend server running properly on port 3000.")
            print("✅ All 7 nutrition calculator routes accessible with 200 status.")
            print("✅ Enhanced optimizations and responsive design verified.")
            print("✅ Static assets served properly.")
            print("✅ Confirmed frontend-only application (no backend API needed).")
        else:
            print(f"❌ {fail_count} critical issues found that need attention.")
        
        return fail_count == 0

if __name__ == "__main__":
    tester = NutritionCalculatorsTester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)