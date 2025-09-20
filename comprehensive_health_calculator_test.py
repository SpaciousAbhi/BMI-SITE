#!/usr/bin/env python3
"""
Comprehensive Health Calculator Application Backend Testing Suite - 2025
Testing 30+ calculators across all categories for Netlify deployment readiness

This test suite comprehensively tests:
1. Backend Service Status - FastAPI backend, MongoDB connection, API endpoints
2. Frontend Routes - All calculator routes accessibility (30+ calculators)
3. SEO Optimization - Meta tags, structured data, technical SEO elements
4. Performance - Page load times and responsiveness
5. Netlify Deployment Readiness - Configuration verification

Categories tested:
- Body Composition (7 calculators)
- Nutrition (7 calculators) 
- Fitness (4 calculators)
- Pregnancy & Women's Health (6 calculators)
- Medical (2 calculators)
- Legal (3 pages)
"""

import requests
import time
import json
import sys
from typing import Dict, List, Tuple, Any
import uuid
import re
from urllib.parse import urljoin

class ComprehensiveHealthCalculatorTester:
    def __init__(self):
        # Use internal service URLs for testing
        self.backend_url = "http://localhost:8001"  # Backend internal port
        self.frontend_url = "http://localhost:3000"  # Frontend internal port
        self.test_results = []
        
        # Define all calculator routes by category
        self.calculator_routes = {
            "homepage": ["/"],
            "body_composition": [
                "/body-fat-calculator",
                "/army-body-fat-calculator", 
                "/lean-body-mass-calculator",
                "/ideal-weight-calculator",
                "/healthy-weight-calculator",
                "/body-type-calculator",
                "/body-surface-area-calculator"
            ],
            "nutrition": [
                "/carbohydrate-calculator",
                "/protein-calculator",
                "/fat-intake-calculator",
                "/calorie-calculator",
                "/tdee-calculator",
                "/bmr-calculator",
                "/macro-calculator"
            ],
            "fitness": [
                "/pace-calculator",
                "/calories-burned-calculator",
                "/one-rep-max-calculator",
                "/target-heart-rate-calculator"
            ],
            "pregnancy_womens_health": [
                "/pregnancy-calculator",
                "/pregnancy-weight-gain-calculator",
                "/due-date-calculator",
                "/ovulation-calculator",
                "/conception-calculator",
                "/period-calculator"
            ],
            "medical": [
                "/gfr-calculator",
                "/bac-calculator"
            ],
            "legal": [
                "/privacy-policy",
                "/terms-conditions",
                "/contact-us"
            ]
        }
        
    def log_test(self, test_name: str, status: str, details: str, duration: float = 0):
        """Log test results with enhanced formatting"""
        result = {
            "test": test_name,
            "status": status,
            "details": details,
            "duration": f"{duration:.3f}s" if duration > 0 else "N/A"
        }
        self.test_results.append(result)
        status_icon = "✅" if status == "PASS" else "❌" if status == "FAIL" else "⚠️" if status == "WARN" else "ℹ️"
        print(f"{status_icon} {test_name}: {details} ({result['duration']})")

    def test_backend_service_status(self):
        """Test FastAPI backend service and MongoDB connectivity"""
        print("\n🔧 BACKEND SERVICE STATUS TESTS")
        print("-" * 60)
        
        # Test basic backend connectivity
        test_name = "FastAPI Backend Connectivity"
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

    def test_mongodb_integration(self):
        """Test MongoDB connection through backend API endpoints"""
        # Test GET status endpoint (MongoDB read)
        test_name = "MongoDB Read Operations"
        try:
            start_time = time.time()
            response = requests.get(f"{self.backend_url}/api/status", timeout=10)
            duration = time.time() - start_time
            if response.status_code == 200:
                data = response.json()
                self.log_test(test_name, "PASS", f"MongoDB read working, {len(data)} records retrieved", duration)
            else:
                self.log_test(test_name, "FAIL", f"HTTP {response.status_code}", duration)
        except Exception as e:
            self.log_test(test_name, "FAIL", f"Error: {str(e)}")

        # Test POST status endpoint (MongoDB write)
        test_name = "MongoDB Write Operations"
        try:
            start_time = time.time()
            test_data = {"client_name": "comprehensive_health_test"}
            response = requests.post(f"{self.backend_url}/api/status", json=test_data, timeout=10)
            duration = time.time() - start_time
            if response.status_code == 200:
                data = response.json()
                if "id" in data and "timestamp" in data:
                    self.log_test(test_name, "PASS", f"MongoDB write working, ID: {data['id'][:8]}...", duration)
                else:
                    self.log_test(test_name, "FAIL", f"Missing required fields in response", duration)
            else:
                self.log_test(test_name, "FAIL", f"HTTP {response.status_code}", duration)
        except Exception as e:
            self.log_test(test_name, "FAIL", f"Error: {str(e)}")

    def test_all_calculator_routes(self):
        """Test accessibility of all 30+ calculator routes"""
        print("\n🌐 FRONTEND ROUTES ACCESSIBILITY TESTS")
        print("-" * 60)
        
        total_routes = 0
        accessible_routes = 0
        
        for category, routes in self.calculator_routes.items():
            print(f"\n📂 Testing {category.replace('_', ' ').title()} ({len(routes)} routes)")
            category_accessible = 0
            
            for route in routes:
                test_name = f"Route: {route}"
                try:
                    start_time = time.time()
                    response = requests.get(f"{self.frontend_url}{route}", timeout=10)
                    duration = time.time() - start_time
                    total_routes += 1
                    
                    if response.status_code == 200:
                        # Check if it's a valid React page
                        content = response.text
                        if 'id="root"' in content:
                            accessible_routes += 1
                            category_accessible += 1
                            self.log_test(test_name, "PASS", f"Route accessible", duration)
                        else:
                            self.log_test(test_name, "WARN", f"Route accessible but may not be React app", duration)
                    else:
                        self.log_test(test_name, "FAIL", f"HTTP {response.status_code}", duration)
                except Exception as e:
                    self.log_test(test_name, "FAIL", f"Error: {str(e)}")
            
            # Category summary
            category_success = (category_accessible / len(routes)) * 100 if routes else 0
            category_test = f"{category.replace('_', ' ').title()} Category Summary"
            if category_success == 100:
                self.log_test(category_test, "PASS", f"All {len(routes)} routes accessible")
            elif category_success >= 80:
                self.log_test(category_test, "WARN", f"{category_accessible}/{len(routes)} routes accessible ({category_success:.1f}%)")
            else:
                self.log_test(category_test, "FAIL", f"{category_accessible}/{len(routes)} routes accessible ({category_success:.1f}%)")
        
        # Overall route accessibility summary
        success_rate = (accessible_routes / total_routes) * 100 if total_routes > 0 else 0
        summary_test = "Overall Route Accessibility"
        if success_rate >= 95:
            self.log_test(summary_test, "PASS", f"{accessible_routes}/{total_routes} routes accessible ({success_rate:.1f}%)")
        elif success_rate >= 80:
            self.log_test(summary_test, "WARN", f"{accessible_routes}/{total_routes} routes accessible ({success_rate:.1f}%)")
        else:
            self.log_test(summary_test, "FAIL", f"{accessible_routes}/{total_routes} routes accessible ({success_rate:.1f}%)")

    def test_seo_optimization(self):
        """Test SEO optimization elements across key pages"""
        print("\n🔍 SEO OPTIMIZATION TESTS")
        print("-" * 60)
        
        # Test key pages for SEO elements
        key_pages = [
            "/",
            "/pregnancy-calculator", 
            "/body-fat-calculator",
            "/calorie-calculator",
            "/gfr-calculator"
        ]
        
        for page in key_pages:
            self.test_page_seo_elements(page)

    def test_page_seo_elements(self, page_route: str):
        """Test SEO elements for a specific page"""
        test_name = f"SEO Elements: {page_route}"
        try:
            start_time = time.time()
            response = requests.get(f"{self.frontend_url}{page_route}", timeout=10)
            duration = time.time() - start_time
            
            if response.status_code == 200:
                content = response.text
                seo_elements = {
                    "title": bool(re.search(r'<title[^>]*>.*?</title>', content, re.IGNORECASE)),
                    "meta_description": 'name="description"' in content,
                    "meta_keywords": 'name="keywords"' in content,
                    "canonical_url": 'rel="canonical"' in content,
                    "open_graph": 'property="og:' in content,
                    "twitter_cards": 'name="twitter:' in content,
                    "viewport": 'name="viewport"' in content,
                    "json_ld_schema": 'application/ld+json' in content,
                    "h1_tag": bool(re.search(r'<h1[^>]*>.*?</h1>', content, re.IGNORECASE)),
                    "meta_robots": 'name="robots"' in content or 'name="googlebot"' in content
                }
                
                present_elements = sum(seo_elements.values())
                total_elements = len(seo_elements)
                
                if present_elements >= 8:
                    self.log_test(test_name, "PASS", f"Excellent SEO: {present_elements}/{total_elements} elements present", duration)
                elif present_elements >= 6:
                    self.log_test(test_name, "WARN", f"Good SEO: {present_elements}/{total_elements} elements present", duration)
                else:
                    self.log_test(test_name, "FAIL", f"Poor SEO: {present_elements}/{total_elements} elements present", duration)
                
                # Test structured data specifically
                self.test_structured_data(page_route, content)
                
            else:
                self.log_test(test_name, "FAIL", f"HTTP {response.status_code}", duration)
        except Exception as e:
            self.log_test(test_name, "FAIL", f"Error: {str(e)}")

    def test_structured_data(self, page_route: str, content: str):
        """Test JSON-LD structured data implementation"""
        test_name = f"Structured Data: {page_route}"
        
        # Extract JSON-LD scripts
        json_ld_pattern = r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>'
        json_ld_matches = re.findall(json_ld_pattern, content, re.DOTALL | re.IGNORECASE)
        
        if json_ld_matches:
            schema_types = []
            for match in json_ld_matches:
                try:
                    data = json.loads(match.strip())
                    if isinstance(data, dict) and "@type" in data:
                        schema_types.append(data["@type"])
                    elif isinstance(data, list):
                        for item in data:
                            if isinstance(item, dict) and "@type" in item:
                                schema_types.append(item["@type"])
                except json.JSONDecodeError:
                    continue
            
            if schema_types:
                self.log_test(test_name, "PASS", f"Schema types found: {', '.join(set(schema_types))}")
            else:
                self.log_test(test_name, "WARN", f"JSON-LD present but no valid schema types detected")
        else:
            self.log_test(test_name, "FAIL", f"No JSON-LD structured data found")

    def test_performance_metrics(self):
        """Test performance metrics for key calculator pages"""
        print("\n⚡ PERFORMANCE TESTS")
        print("-" * 60)
        
        # Test performance for representative pages from each category
        performance_pages = [
            "/",  # Homepage
            "/body-fat-calculator",  # Body composition
            "/calorie-calculator",   # Nutrition
            "/pace-calculator",      # Fitness
            "/pregnancy-calculator", # Pregnancy
            "/gfr-calculator"        # Medical
        ]
        
        total_load_time = 0
        successful_loads = 0
        
        for page in performance_pages:
            test_name = f"Performance: {page}"
            try:
                start_time = time.time()
                response = requests.get(f"{self.frontend_url}{page}", timeout=15)
                duration = time.time() - start_time
                total_load_time += duration
                
                if response.status_code == 200:
                    successful_loads += 1
                    if duration < 0.5:
                        self.log_test(test_name, "PASS", f"Excellent load time", duration)
                    elif duration < 1.0:
                        self.log_test(test_name, "PASS", f"Good load time", duration)
                    elif duration < 2.0:
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
            perf_test = "Average Application Performance"
            if avg_load_time < 0.5:
                self.log_test(perf_test, "PASS", f"Excellent average load time", avg_load_time)
            elif avg_load_time < 1.0:
                self.log_test(perf_test, "PASS", f"Good average load time", avg_load_time)
            elif avg_load_time < 2.0:
                self.log_test(perf_test, "WARN", f"Acceptable average load time", avg_load_time)
            else:
                self.log_test(perf_test, "FAIL", f"Poor average load time", avg_load_time)

    def test_mobile_responsiveness(self):
        """Test mobile responsiveness indicators"""
        test_name = "Mobile Responsiveness"
        try:
            start_time = time.time()
            response = requests.get(f"{self.frontend_url}/", timeout=10)
            duration = time.time() - start_time
            if response.status_code == 200:
                content = response.text
                
                # Check for responsive design indicators
                responsive_indicators = {
                    "viewport_meta": 'name="viewport"' in content,
                    "responsive_css": any(indicator in content for indicator in [
                        'sm:', 'md:', 'lg:', 'xl:', '@media', 'responsive'
                    ]),
                    "mobile_friendly": any(indicator in content for indicator in [
                        'mobile', 'touch', 'device-width'
                    ])
                }
                
                present_indicators = sum(responsive_indicators.values())
                
                if present_indicators >= 2:
                    self.log_test(test_name, "PASS", f"Mobile responsiveness indicators present ({present_indicators}/3)", duration)
                elif present_indicators >= 1:
                    self.log_test(test_name, "WARN", f"Limited mobile responsiveness ({present_indicators}/3)", duration)
                else:
                    self.log_test(test_name, "FAIL", f"No mobile responsiveness indicators found", duration)
            else:
                self.log_test(test_name, "FAIL", f"HTTP {response.status_code}", duration)
        except Exception as e:
            self.log_test(test_name, "FAIL", f"Error: {str(e)}")

    def test_netlify_deployment_readiness(self):
        """Test Netlify deployment readiness"""
        print("\n🚀 NETLIFY DEPLOYMENT READINESS TESTS")
        print("-" * 60)
        
        # Test static assets
        static_assets = [
            "/robots.txt",
            "/sitemap.xml",
            "/_redirects"  # Netlify redirects file
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
                    self.log_test(test_name, "WARN", f"HTTP {response.status_code} - may be handled by build process", duration)
            except Exception as e:
                self.log_test(test_name, "FAIL", f"Error: {str(e)}")

        # Test SPA routing compatibility
        test_name = "SPA Routing Compatibility"
        try:
            # Test a calculator route to ensure SPA routing works
            response = requests.get(f"{self.frontend_url}/body-fat-calculator", timeout=10)
            if response.status_code == 200 and 'id="root"' in response.text:
                self.log_test(test_name, "PASS", "SPA routing working correctly")
            else:
                self.log_test(test_name, "FAIL", "SPA routing may have issues")
        except Exception as e:
            self.log_test(test_name, "FAIL", f"Error: {str(e)}")

    def test_technical_seo_elements(self):
        """Test technical SEO elements"""
        print("\n🔧 TECHNICAL SEO TESTS")
        print("-" * 60)
        
        # Test robots.txt
        test_name = "Robots.txt Configuration"
        try:
            response = requests.get(f"{self.frontend_url}/robots.txt", timeout=10)
            if response.status_code == 200:
                content = response.text
                if "User-agent:" in content and "Sitemap:" in content:
                    self.log_test(test_name, "PASS", "Robots.txt properly configured")
                else:
                    self.log_test(test_name, "WARN", "Robots.txt present but may need optimization")
            else:
                self.log_test(test_name, "FAIL", f"Robots.txt not accessible: HTTP {response.status_code}")
        except Exception as e:
            self.log_test(test_name, "FAIL", f"Error: {str(e)}")

        # Test sitemap.xml
        test_name = "XML Sitemap"
        try:
            response = requests.get(f"{self.frontend_url}/sitemap.xml", timeout=10)
            if response.status_code == 200:
                content = response.text
                if "<urlset" in content and "<url>" in content:
                    # Count URLs in sitemap
                    url_count = content.count("<url>")
                    self.log_test(test_name, "PASS", f"XML sitemap accessible with {url_count} URLs")
                else:
                    self.log_test(test_name, "WARN", "XML sitemap present but may be malformed")
            else:
                self.log_test(test_name, "FAIL", f"XML sitemap not accessible: HTTP {response.status_code}")
        except Exception as e:
            self.log_test(test_name, "FAIL", f"Error: {str(e)}")

    def run_comprehensive_tests(self):
        """Run all comprehensive tests"""
        print("🏥 COMPREHENSIVE HEALTH CALCULATOR APPLICATION TESTING SUITE - 2025")
        print("=" * 80)
        print("Testing 30+ calculators for Netlify deployment readiness")
        print("=" * 80)
        
        # 1. Backend Service Status
        backend_available = self.test_backend_service_status()
        if backend_available:
            self.test_mongodb_integration()
        else:
            self.log_test("MongoDB Integration Tests", "SKIP", "Backend not available")
        
        # 2. Frontend Routes - All calculator routes
        self.test_all_calculator_routes()
        
        # 3. SEO Optimization
        self.test_seo_optimization()
        
        # 4. Performance
        self.test_performance_metrics()
        self.test_mobile_responsiveness()
        
        # 5. Netlify Deployment Readiness
        self.test_netlify_deployment_readiness()
        self.test_technical_seo_elements()
        
        # Generate comprehensive summary
        self.generate_comprehensive_summary()

    def generate_comprehensive_summary(self):
        """Generate comprehensive test summary"""
        print("\n" + "=" * 80)
        print("📊 COMPREHENSIVE HEALTH CALCULATOR TESTING SUMMARY")
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
            success_rate = (passed_tests / total_tests) * 100
            print(f"   Success Rate: {success_rate:.1f}%")
        
        # Detailed analysis by category
        print(f"\n🎯 CATEGORY ANALYSIS:")
        
        # Backend analysis
        backend_tests = [r for r in self.test_results if any(keyword in r["test"] for keyword in ["Backend", "MongoDB", "FastAPI"])]
        backend_passed = len([r for r in backend_tests if r["status"] == "PASS"])
        if backend_tests:
            print(f"   🔧 Backend Services: {backend_passed}/{len(backend_tests)} tests passed")
        
        # Route accessibility analysis
        route_tests = [r for r in self.test_results if "Route:" in r["test"]]
        route_passed = len([r for r in route_tests if r["status"] == "PASS"])
        if route_tests:
            print(f"   🌐 Route Accessibility: {route_passed}/{len(route_tests)} routes accessible")
        
        # SEO analysis
        seo_tests = [r for r in self.test_results if any(keyword in r["test"] for keyword in ["SEO", "Structured Data", "Schema"])]
        seo_passed = len([r for r in seo_tests if r["status"] == "PASS"])
        if seo_tests:
            print(f"   🔍 SEO Optimization: {seo_passed}/{len(seo_tests)} SEO tests passed")
        
        # Performance analysis
        perf_tests = [r for r in self.test_results if "Performance" in r["test"]]
        perf_passed = len([r for r in perf_tests if r["status"] == "PASS"])
        if perf_tests:
            print(f"   ⚡ Performance: {perf_passed}/{len(perf_tests)} performance tests passed")
        
        # Netlify readiness analysis
        netlify_tests = [r for r in self.test_results if any(keyword in r["test"] for keyword in ["Static Asset", "SPA Routing", "Robots", "Sitemap"])]
        netlify_passed = len([r for r in netlify_tests if r["status"] == "PASS"])
        if netlify_tests:
            print(f"   🚀 Netlify Readiness: {netlify_passed}/{len(netlify_tests)} deployment tests passed")
        
        # Critical issues
        if failed_tests > 0:
            print(f"\n❌ CRITICAL ISSUES REQUIRING ATTENTION:")
            for result in self.test_results:
                if result["status"] == "FAIL":
                    print(f"   • {result['test']}: {result['details']}")
        
        # Warnings
        if warning_tests > 0:
            print(f"\n⚠️  WARNINGS FOR OPTIMIZATION:")
            for result in self.test_results:
                if result["status"] == "WARN":
                    print(f"   • {result['test']}: {result['details']}")
        
        # Final deployment readiness assessment
        print(f"\n🏁 NETLIFY DEPLOYMENT READINESS ASSESSMENT:")
        
        critical_failures = len([r for r in self.test_results if r["status"] == "FAIL" and any(keyword in r["test"] for keyword in ["Route:", "Backend", "SPA Routing"])])
        
        if critical_failures == 0 and success_rate >= 85:
            print("   ✅ READY FOR DEPLOYMENT - Application meets deployment standards")
        elif critical_failures == 0 and success_rate >= 70:
            print("   ⚠️  MOSTLY READY - Minor optimizations recommended before deployment")
        else:
            print("   ❌ NOT READY - Critical issues must be resolved before deployment")
        
        print(f"\n🏥 HEALTH CALCULATOR APPLICATION STATUS: {passed_tests}/{total_tests} tests passed")
        print("=" * 80)

def main():
    """Main test execution function"""
    tester = ComprehensiveHealthCalculatorTester()
    tester.run_comprehensive_tests()

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⚠️  Testing interrupted by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n\n❌ Testing failed with error: {str(e)}")
        sys.exit(1)