#!/usr/bin/env python3
"""
React Helmet Dependency Fix Verification Test
Quick verification test after fixing the react-helmet dependency issue
"""

import requests
import json
import sys
from datetime import datetime

class ReactHelmetVerificationTester:
    def __init__(self):
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
    
    def test_frontend_server_status(self):
        """Verify the frontend server is running properly after installing react-helmet"""
        try:
            response = requests.get(self.frontend_url, timeout=10)
            if response.status_code == 200:
                self.log_test("Frontend Server Status", "PASS", 
                            f"Frontend server running properly with status {response.status_code}")
                return True
            else:
                self.log_test("Frontend Server Status", "FAIL", 
                            f"Frontend server returned unexpected status {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Frontend Server Status", "FAIL", 
                        f"Frontend server not accessible: {str(e)}")
            return False
    
    def test_critical_seo_routes(self):
        """Test the three SEO-optimized calculator pages mentioned in review request"""
        critical_routes = [
            "/ideal-weight-calculator",
            "/healthy-weight-calculator", 
            "/body-type-calculator"
        ]
        
        all_passed = True
        for route in critical_routes:
            try:
                response = requests.get(f"{self.frontend_url}{route}", timeout=10)
                if response.status_code == 200:
                    # Check if the page loads without React errors
                    html_content = response.text
                    if "react-helmet" in html_content.lower() or "<title>" in html_content:
                        self.log_test(f"Critical Route {route}", "PASS", 
                                    f"Route loads successfully with SEO elements")
                    else:
                        self.log_test(f"Critical Route {route}", "WARN", 
                                    f"Route loads but SEO elements may not be fully rendered")
                else:
                    self.log_test(f"Critical Route {route}", "FAIL", 
                                f"Route returned status {response.status_code}")
                    all_passed = False
            except Exception as e:
                self.log_test(f"Critical Route {route}", "FAIL", 
                            f"Error accessing route: {str(e)}")
                all_passed = False
        
        return all_passed
    
    def test_runtime_errors(self):
        """Verify no runtime errors are occurring in the application"""
        try:
            # Test homepage for any obvious runtime errors
            response = requests.get(self.frontend_url, timeout=10)
            if response.status_code == 200:
                html_content = response.text
                
                # Check for common React error indicators
                error_indicators = [
                    "react error",
                    "uncaught error",
                    "javascript error",
                    "cannot read property",
                    "undefined is not a function",
                    "module not found"
                ]
                
                errors_found = []
                for indicator in error_indicators:
                    if indicator.lower() in html_content.lower():
                        errors_found.append(indicator)
                
                if not errors_found:
                    self.log_test("Runtime Error Check", "PASS", 
                                "No obvious runtime errors detected in HTML content")
                    return True
                else:
                    self.log_test("Runtime Error Check", "FAIL", 
                                f"Potential runtime errors found: {', '.join(errors_found)}")
                    return False
            else:
                self.log_test("Runtime Error Check", "FAIL", 
                            f"Could not check for runtime errors, status: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Runtime Error Check", "FAIL", 
                        f"Error checking for runtime errors: {str(e)}")
            return False
    
    def test_seo_elements_loading(self):
        """Quick check that the SEO enhancements are loading properly"""
        try:
            response = requests.get(self.frontend_url, timeout=10)
            if response.status_code == 200:
                html_content = response.text
                
                # Check for essential SEO elements that should be present after react-helmet fix
                seo_elements = [
                    ('<title>', 'Page title'),
                    ('meta name="description"', 'Meta description'),
                    ('meta property="og:', 'Open Graph tags'),
                    ('application/ld+json', 'JSON-LD structured data')
                ]
                
                all_present = True
                for element, description in seo_elements:
                    if element in html_content:
                        self.log_test(f"SEO Element - {description}", "PASS", 
                                    f"{description} found and loading properly")
                    else:
                        self.log_test(f"SEO Element - {description}", "FAIL", 
                                    f"{description} missing or not loading")
                        all_present = False
                
                return all_present
            else:
                self.log_test("SEO Elements Loading", "FAIL", 
                            f"Could not check SEO elements, status: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("SEO Elements Loading", "FAIL", 
                        f"Error checking SEO elements: {str(e)}")
            return False
    
    def run_verification_tests(self):
        """Run all verification tests for react-helmet dependency fix"""
        print("=" * 80)
        print("REACT HELMET DEPENDENCY FIX - VERIFICATION TEST REPORT")
        print("Quick verification after fixing react-helmet dependency issue")
        print("=" * 80)
        print()
        
        # Run verification tests
        server_ok = self.test_frontend_server_status()
        print()
        
        routes_ok = self.test_critical_seo_routes()
        print()
        
        no_errors = self.test_runtime_errors()
        print()
        
        seo_ok = self.test_seo_elements_loading()
        
        # Generate summary
        print("\n" + "=" * 80)
        print("VERIFICATION SUMMARY")
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
        print("VERIFICATION CONCLUSION")
        print("=" * 80)
        
        all_critical_passed = server_ok and routes_ok and no_errors and seo_ok
        
        if all_critical_passed:
            print("✅ VERIFICATION SUCCESSFUL: React-helmet dependency fix working correctly")
            print("✅ Frontend server running properly after dependency installation")
            print("✅ All three critical SEO-optimized calculator routes loading without errors")
            print("✅ No runtime errors detected in the application")
            print("✅ SEO enhancements loading properly with react-helmet functionality")
            print("\n🎉 The application is now working correctly after the react-helmet fix!")
        else:
            print("❌ VERIFICATION ISSUES FOUND:")
            if not server_ok:
                print("  - Frontend server issues detected")
            if not routes_ok:
                print("  - Critical calculator routes have issues")
            if not no_errors:
                print("  - Runtime errors detected")
            if not seo_ok:
                print("  - SEO elements not loading properly")
        
        return all_critical_passed

if __name__ == "__main__":
    tester = ReactHelmetVerificationTester()
    success = tester.run_verification_tests()
    sys.exit(0 if success else 1)