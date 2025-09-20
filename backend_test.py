#!/usr/bin/env python3
"""
Enhanced Header and Footer Backend Testing Suite
Advanced BMI Calculator Application - 2025

This test suite focuses on backend API testing for the enhanced header and footer improvements.
Tests backend connectivity, route accessibility, and performance for the comprehensive calculator application.
"""

import requests
import time
import json
import sys
from typing import Dict, List, Tuple, Any
import uuid

class HeaderFooterBackendTester:
    def __init__(self):
        # Use environment-based backend URL or fallback to localhost
        self.backend_url = "http://localhost:8001"  # Backend runs on port 8001
        self.frontend_url = "http://localhost:3000"  # Frontend runs on port 3000
        self.test_results = []
        
    def log_test(self, test_name: str, status: str, details: str, duration: float = 0):
        """Log test results"""
        result = {
            "test": test_name,
            "status": status,
            "details": details,
            "duration": f"{duration:.3f}s" if duration > 0 else "N/A"
        }
        self.test_results.append(result)
        status_icon = "✅" if status == "PASS" else "❌" if status == "FAIL" else "⚠️" if status == "WARN" else "ℹ️"
        print(f"{status_icon} {test_name}: {details} ({result['duration']})")

    def test_backend_connectivity(self):
        """Test basic backend API connectivity"""
        test_name = "Backend API Connectivity"
        try:
            start_time = time.time()
            response = requests.get(f"{self.backend_url}/api/", timeout=10)
            duration = time.time() - start_time
            if response.status_code == 200:
                data = response.json()
                if data.get("message") == "Hello World":
                    self.log_test(test_name, "PASS", f"Backend API accessible, response: {data}", duration)
                    return True
                else:
                    self.log_test(test_name, "FAIL", f"Unexpected response: {data}", duration)
                    return False
            else:
                self.log_test(test_name, "FAIL", f"HTTP {response.status_code}", duration)
                return False
        except Exception as e:
            self.log_test(test_name, "FAIL", f"Connection error: {str(e)}")
            return False

    def test_backend_status_endpoints(self):
        """Test backend status check endpoints"""
        # Test GET status endpoint
        test_name = "Backend Status GET Endpoint"
        try:
            start_time = time.time()
            response = requests.get(f"{self.backend_url}/api/status", timeout=10)
            duration = time.time() - start_time
            if response.status_code == 200:
                data = response.json()
                self.log_test(test_name, "PASS", f"Status GET working, {len(data)} records", duration)
            else:
                self.log_test(test_name, "FAIL", f"HTTP {response.status_code}", duration)
        except Exception as e:
            self.log_test(test_name, "FAIL", f"Error: {str(e)}")

        # Test POST status endpoint
        test_name = "Backend Status POST Endpoint"
        try:
            start_time = time.time()
            test_data = {"client_name": "header_footer_test"}
            response = requests.post(f"{self.backend_url}/api/status", json=test_data, timeout=10)
            duration = time.time() - start_time
            if response.status_code == 200:
                data = response.json()
                if "id" in data and "timestamp" in data:
                    self.log_test(test_name, "PASS", f"Status POST working, ID: {data['id'][:8]}...", duration)
                else:
                    self.log_test(test_name, "FAIL", f"Missing required fields in response", duration)
            else:
                self.log_test(test_name, "FAIL", f"HTTP {response.status_code}", duration)
        except Exception as e:
            self.log_test(test_name, "FAIL", f"Error: {str(e)}")

    def test_calculator_routes_accessibility(self):
        """Test accessibility of all calculator routes mentioned in header navigation"""
        calculator_routes = [
            # Home route
            "/",
            
            # Body Composition calculators
            "/body-fat-calculator",
            "/army-body-fat-calculator", 
            "/lean-body-mass-calculator",
            "/ideal-weight-calculator",
            "/healthy-weight-calculator",
            "/body-type-calculator",
            "/body-surface-area-calculator",
            
            # Nutrition & Diet calculators
            "/calorie-calculator",
            "/tdee-calculator",
            "/bmr-calculator",
            "/macro-calculator",
            "/carbohydrate-calculator",
            "/protein-calculator",
            "/fat-intake-calculator",
            
            # Fitness & Performance calculators
            "/pace-calculator",
            "/calories-burned-calculator",
            "/one-rep-max-calculator",
            "/target-heart-rate-calculator",
            
            # Pregnancy & Women's Health calculators
            "/pregnancy-calculator",
            "/pregnancy-weight-gain-calculator",
            "/due-date-calculator",
            "/ovulation-calculator",
            "/conception-calculator",
            "/period-calculator",
            
            # Medical & Health calculators
            "/gfr-calculator",
            "/bac-calculator",
            
            # Support pages
            "/privacy-policy",
            "/terms-conditions",
            "/contact-us"
        ]
        
        accessible_routes = 0
        total_routes = len(calculator_routes)
        
        for route in calculator_routes:
            test_name = f"Route Accessibility: {route}"
            try:
                start_time = time.time()
                response = requests.get(f"{self.frontend_url}{route}", timeout=10)
                duration = time.time() - start_time
                if response.status_code == 200:
                    # Check if it's a valid React page (contains React app div)
                    content = response.text
                    if 'id="root"' in content or 'react' in content.lower():
                        accessible_routes += 1
                        self.log_test(test_name, "PASS", f"Route accessible", duration)
                    else:
                        self.log_test(test_name, "WARN", f"Route accessible but may not be React app", duration)
                else:
                    self.log_test(test_name, "FAIL", f"HTTP {response.status_code}", duration)
            except Exception as e:
                self.log_test(test_name, "FAIL", f"Error: {str(e)}")
        
        # Summary test
        success_rate = (accessible_routes / total_routes) * 100
        summary_test = "Overall Route Accessibility"
        if success_rate >= 95:
            self.log_test(summary_test, "PASS", f"{accessible_routes}/{total_routes} routes accessible ({success_rate:.1f}%)")
        elif success_rate >= 80:
            self.log_test(summary_test, "WARN", f"{accessible_routes}/{total_routes} routes accessible ({success_rate:.1f}%)")
        else:
            self.log_test(summary_test, "FAIL", f"{accessible_routes}/{total_routes} routes accessible ({success_rate:.1f}%)")

    def test_search_functionality_backend_support(self):
        """Test if search functionality has any backend support"""
        test_name = "Search Functionality Backend Support"
        
        # Check if there are any search-related endpoints
        search_endpoints = ["/api/search", "/api/calculators", "/api/search/calculators"]
        
        backend_search_support = False
        for endpoint in search_endpoints:
            try:
                response = requests.get(f"{self.backend_url}{endpoint}", timeout=5)
                if response.status_code == 200:
                    backend_search_support = True
                    data = response.json()
                    self.log_test(test_name, "PASS", f"Backend search support found at {endpoint}")
                    break
            except:
                continue
        
        if not backend_search_support:
            self.log_test(test_name, "INFO", "Search functionality is client-side only (no backend endpoints found)")

    def test_newsletter_backend_support(self):
        """Test if newsletter functionality has backend support"""
        test_name = "Newsletter Backend Support"
        
        # Check if there are newsletter-related endpoints
        newsletter_endpoints = ["/api/newsletter", "/api/subscribe", "/api/newsletter/subscribe"]
        
        backend_newsletter_support = False
        for endpoint in newsletter_endpoints:
            try:
                response = requests.post(f"{self.backend_url}{endpoint}", 
                                       json={"email": "test@example.com"}, timeout=5)
                if response.status_code in [200, 201, 400]:  # 400 might be validation error
                    backend_newsletter_support = True
                    self.log_test(test_name, "PASS", f"Backend newsletter support found at {endpoint}")
                    break
            except:
                continue
        
        if not backend_newsletter_support:
            self.log_test(test_name, "INFO", "Newsletter functionality is client-side simulation (no backend endpoints found)")

    def test_frontend_performance(self):
        """Test frontend performance for key pages"""
        key_pages = ["/", "/body-fat-calculator", "/pregnancy-calculator", "/calorie-calculator"]
        
        total_load_time = 0
        successful_loads = 0
        
        for page in key_pages:
            test_name = f"Performance Test: {page}"
            try:
                start_time = time.time()
                response = requests.get(f"{self.frontend_url}{page}", timeout=10)
                duration = time.time() - start_time
                total_load_time += duration
                
                if response.status_code == 200:
                    successful_loads += 1
                    if duration < 1.0:
                        self.log_test(test_name, "PASS", f"Fast load time", duration)
                    elif duration < 3.0:
                        self.log_test(test_name, "WARN", f"Acceptable load time", duration)
                    else:
                        self.log_test(test_name, "FAIL", f"Slow load time", duration)
                else:
                    self.log_test(test_name, "FAIL", f"HTTP {response.status_code}", duration)
            except Exception as e:
                self.log_test(test_name, "FAIL", f"Error: {str(e)}")
        
        # Average performance summary
        if successful_loads > 0:
            avg_load_time = total_load_time / successful_loads
            perf_test = "Average Page Performance"
            if avg_load_time < 1.0:
                self.log_test(perf_test, "PASS", f"Excellent average load time", avg_load_time)
            elif avg_load_time < 2.0:
                self.log_test(perf_test, "PASS", f"Good average load time", avg_load_time)
            else:
                self.log_test(perf_test, "WARN", f"Average load time could be improved", avg_load_time)

    def test_mobile_responsiveness_indicators(self):
        """Test for mobile responsiveness indicators in HTML"""
        test_name = "Mobile Responsiveness Indicators"
        try:
            start_time = time.time()
            response = requests.get(f"{self.frontend_url}/", timeout=10)
            duration = time.time() - start_time
            if response.status_code == 200:
                content = response.text
                
                # Check for viewport meta tag
                has_viewport = 'name="viewport"' in content
                # Check for responsive design indicators
                has_responsive_css = any(indicator in content for indicator in [
                    'responsive', 'mobile', 'sm:', 'md:', 'lg:', 'xl:', '@media'
                ])
                
                if has_viewport and has_responsive_css:
                    self.log_test(test_name, "PASS", "Mobile responsiveness indicators present", duration)
                elif has_viewport:
                    self.log_test(test_name, "WARN", "Viewport meta tag present but limited responsive indicators", duration)
                else:
                    self.log_test(test_name, "FAIL", "Missing mobile responsiveness indicators", duration)
            else:
                self.log_test(test_name, "FAIL", f"HTTP {response.status_code}", duration)
        except Exception as e:
            self.log_test(test_name, "FAIL", f"Error: {str(e)}")

    def test_static_assets(self):
        """Test static assets accessibility"""
        static_assets = [
            "/robots.txt",
            "/sitemap.xml"
        ]
        
        for asset in static_assets:
            test_name = f"Static Asset: {asset}"
            try:
                start_time = time.time()
                response = requests.get(f"{self.frontend_url}{asset}", timeout=10)
                duration = time.time() - start_time
                if response.status_code == 200:
                    content_type = response.headers.get('content-type', '')
                    if asset.endswith('.xml') and 'xml' in content_type:
                        self.log_test(test_name, "PASS", f"XML asset accessible with correct content-type", duration)
                    elif asset.endswith('.txt') and 'text' in content_type:
                        self.log_test(test_name, "PASS", f"Text asset accessible with correct content-type", duration)
                    else:
                        self.log_test(test_name, "PASS", f"Asset accessible", duration)
                else:
                    self.log_test(test_name, "FAIL", f"HTTP {response.status_code}", duration)
            except Exception as e:
                self.log_test(test_name, "FAIL", f"Error: {str(e)}")

    def test_header_navigation_structure(self):
        """Test if header navigation structure is properly implemented"""
        test_name = "Header Navigation Structure"
        try:
            start_time = time.time()
            response = requests.get(f"{self.frontend_url}/", timeout=10)
            duration = time.time() - start_time
            if response.status_code == 200:
                content = response.text
                
                # Check for navigation indicators
                nav_indicators = [
                    'Body Composition', 'Nutrition & Diet', 'Fitness & Performance', 
                    'Pregnancy & Women\'s Health', 'Medical & Health', 'Support'
                ]
                
                found_categories = sum(1 for indicator in nav_indicators if indicator in content)
                
                if found_categories >= 5:
                    self.log_test(test_name, "PASS", f"Enhanced navigation structure present ({found_categories}/6 categories found)", duration)
                elif found_categories >= 3:
                    self.log_test(test_name, "WARN", f"Partial navigation structure ({found_categories}/6 categories found)", duration)
                else:
                    self.log_test(test_name, "FAIL", f"Navigation structure incomplete ({found_categories}/6 categories found)", duration)
            else:
                self.log_test(test_name, "FAIL", f"HTTP {response.status_code}", duration)
        except Exception as e:
            self.log_test(test_name, "FAIL", f"Error: {str(e)}")

    def test_footer_enhancements(self):
        """Test if footer enhancements are properly implemented"""
        test_name = "Footer Enhancements"
        try:
            start_time = time.time()
            response = requests.get(f"{self.frontend_url}/", timeout=10)
            duration = time.time() - start_time
            if response.status_code == 200:
                content = response.text
                
                # Check for footer enhancement indicators
                footer_indicators = [
                    'newsletter', 'subscribe', 'social', 'facebook', 'twitter', 
                    'instagram', 'linkedin', 'youtube', 'trust', 'privacy'
                ]
                
                found_indicators = sum(1 for indicator in footer_indicators if indicator.lower() in content.lower())
                
                if found_indicators >= 7:
                    self.log_test(test_name, "PASS", f"Footer enhancements present ({found_indicators}/10 indicators found)", duration)
                elif found_indicators >= 4:
                    self.log_test(test_name, "WARN", f"Partial footer enhancements ({found_indicators}/10 indicators found)", duration)
                else:
                    self.log_test(test_name, "FAIL", f"Footer enhancements incomplete ({found_indicators}/10 indicators found)", duration)
            else:
                self.log_test(test_name, "FAIL", f"HTTP {response.status_code}", duration)
        except Exception as e:
            self.log_test(test_name, "FAIL", f"Error: {str(e)}")

    def run_all_tests(self):
        """Run comprehensive backend testing suite"""
        print("🚀 Starting Enhanced Header and Footer Backend Testing Suite")
        print("=" * 80)
        
        # Core backend tests
        print("\n📡 BACKEND API CONNECTIVITY TESTS")
        print("-" * 50)
        backend_available = self.test_backend_connectivity()
        
        if backend_available:
            self.test_backend_status_endpoints()
        else:
            self.log_test("Backend Status Tests", "SKIP", "Backend not available")
        
        # Frontend route accessibility tests
        print("\n🌐 FRONTEND ROUTE ACCESSIBILITY TESTS")
        print("-" * 50)
        self.test_calculator_routes_accessibility()
        
        # Header and Footer specific tests
        print("\n🎨 HEADER & FOOTER ENHANCEMENT TESTS")
        print("-" * 50)
        self.test_header_navigation_structure()
        self.test_footer_enhancements()
        
        # Feature-specific backend support tests
        print("\n🔍 FEATURE BACKEND SUPPORT TESTS")
        print("-" * 50)
        self.test_search_functionality_backend_support()
        self.test_newsletter_backend_support()
        
        # Performance and responsiveness tests
        print("\n⚡ PERFORMANCE & RESPONSIVENESS TESTS")
        print("-" * 50)
        self.test_frontend_performance()
        self.test_mobile_responsiveness_indicators()
        
        # Static assets tests
        print("\n📄 STATIC ASSETS TESTS")
        print("-" * 50)
        self.test_static_assets()
        
        # Generate summary
        self.generate_test_summary()

    def generate_test_summary(self):
        """Generate comprehensive test summary"""
        print("\n" + "=" * 80)
        print("📊 ENHANCED HEADER & FOOTER BACKEND TESTING SUMMARY")
        print("=" * 80)
        
        total_tests = len(self.test_results)
        passed_tests = len([r for r in self.test_results if r["status"] == "PASS"])
        failed_tests = len([r for r in self.test_results if r["status"] == "FAIL"])
        warning_tests = len([r for r in self.test_results if r["status"] == "WARN"])
        info_tests = len([r for r in self.test_results if r["status"] == "INFO"])
        skip_tests = len([r for r in self.test_results if r["status"] == "SKIP"])
        
        print(f"\n📈 OVERALL RESULTS:")
        print(f"   Total Tests: {total_tests}")
        print(f"   ✅ Passed: {passed_tests}")
        print(f"   ❌ Failed: {failed_tests}")
        print(f"   ⚠️  Warnings: {warning_tests}")
        print(f"   ℹ️  Info: {info_tests}")
        print(f"   ⏭️  Skipped: {skip_tests}")
        if total_tests > 0:
            print(f"   Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if failed_tests > 0:
            print(f"\n❌ FAILED TESTS:")
            for result in self.test_results:
                if result["status"] == "FAIL":
                    print(f"   • {result['test']}: {result['details']}")
        
        if warning_tests > 0:
            print(f"\n⚠️  WARNINGS:")
            for result in self.test_results:
                if result["status"] == "WARN":
                    print(f"   • {result['test']}: {result['details']}")
        
        print(f"\n🎯 KEY FINDINGS:")
        
        # Analyze backend connectivity
        backend_tests = [r for r in self.test_results if "Backend" in r["test"]]
        backend_working = any(r["status"] == "PASS" for r in backend_tests)
        
        if backend_working:
            print("   ✅ Backend API is functional and accessible")
        else:
            print("   ❌ Backend API connectivity issues detected")
        
        # Analyze route accessibility
        route_tests = [r for r in self.test_results if "Route Accessibility" in r["test"]]
        accessible_routes = len([r for r in route_tests if r["status"] == "PASS"])
        total_routes = len(route_tests)
        
        if total_routes > 0:
            route_success = (accessible_routes / total_routes) * 100
            if route_success >= 95:
                print(f"   ✅ Excellent route accessibility: {accessible_routes}/{total_routes} ({route_success:.1f}%)")
            elif route_success >= 80:
                print(f"   ⚠️  Good route accessibility: {accessible_routes}/{total_routes} ({route_success:.1f}%)")
            else:
                print(f"   ❌ Poor route accessibility: {accessible_routes}/{total_routes} ({route_success:.1f}%)")
        
        # Analyze header/footer enhancements
        enhancement_tests = [r for r in self.test_results if "Navigation Structure" in r["test"] or "Footer Enhancements" in r["test"]]
        working_enhancements = len([r for r in enhancement_tests if r["status"] == "PASS"])
        
        if working_enhancements >= 2:
            print("   ✅ Header and footer enhancements are properly implemented")
        elif working_enhancements >= 1:
            print("   ⚠️  Partial header/footer enhancements implemented")
        else:
            print("   ❌ Header/footer enhancements need attention")
        
        # Analyze performance
        perf_tests = [r for r in self.test_results if "Performance" in r["test"]]
        good_performance = len([r for r in perf_tests if r["status"] == "PASS"])
        
        if good_performance > 0:
            print("   ✅ Application performance is satisfactory")
        elif len(perf_tests) > 0:
            print("   ⚠️  Application performance needs optimization")
        
        print(f"\n🏁 TESTING COMPLETED")
        print("=" * 80)

def main():
    """Main test execution function"""
    tester = HeaderFooterBackendTester()
    tester.run_all_tests()

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⚠️  Testing interrupted by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n\n❌ Testing failed with error: {str(e)}")
        sys.exit(1)