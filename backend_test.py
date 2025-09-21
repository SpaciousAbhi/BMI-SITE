#!/usr/bin/env python3
"""
Backend Testing Suite for 5 Enhanced BMI Blog Articles - Comprehensive SEO & Content Testing
Testing all 5 enhanced BMI blog articles for SEO optimization, content enhancement, and responsive design
"""

import requests
import time
import json
import re
from urllib.parse import urljoin
import sys
from typing import Dict, List, Tuple, Optional

class BMIArticlesBackendTester:
    def __init__(self):
        # Get backend URL from environment or use default
        self.backend_url = "http://localhost:8001"
        self.frontend_url = "http://localhost:3000"
        self.api_base = f"{self.backend_url}/api"
        
        # Test results storage
        self.test_results = []
        self.failed_tests = []
        self.passed_tests = []
        
        # 5 Enhanced BMI Blog Articles to test
        self.articles_to_test = [
            {
                'slug': 'ultimate-guide-bmi-calculator',
                'title': 'Ultimate Guide to BMI Calculator',
                'url': f"{self.frontend_url}/blogs-articles/ultimate-guide-bmi-calculator",
                'expected_content': ['BMI calculator', 'body mass index', 'WHO standards', 'health categories']
            },
            {
                'slug': 'is-bmi-accurate-athletes-seniors-ethnicities',
                'title': 'BMI Accuracy Analysis',
                'url': f"{self.frontend_url}/blogs-articles/is-bmi-accurate-athletes-seniors-ethnicities",
                'expected_content': ['BMI accuracy', 'athletes', 'seniors', 'ethnic groups']
            },
            {
                'slug': 'bmi-health-risks-what-your-number-means',
                'title': 'BMI Health Risks Guide',
                'url': f"{self.frontend_url}/blogs-articles/bmi-health-risks-what-your-number-means",
                'expected_content': ['health risks', 'diabetes', 'heart disease', 'mortality']
            },
            {
                'slug': 'how-to-change-bmi-safely-weight-loss-gain-strategies',
                'title': 'Safe Weight Management Strategies',
                'url': f"{self.frontend_url}/blogs-articles/how-to-change-bmi-safely-weight-loss-gain-strategies",
                'expected_content': ['weight loss', 'weight gain', 'safe strategies', 'nutrition']
            },
            {
                'slug': 'bmi-alternatives-body-fat-waist-height-bmr',
                'title': 'BMI Alternatives Guide',
                'url': f"{self.frontend_url}/blogs-articles/bmi-alternatives-body-fat-waist-height-bmr",
                'expected_content': ['body fat percentage', 'waist to height', 'BMR', 'alternatives']
            }
        ]
        
        print("🔍 5 ENHANCED BMI BLOG ARTICLES COMPREHENSIVE TESTING SUITE")
        print("=" * 70)
        print(f"Backend URL: {self.backend_url}")
        print(f"Frontend URL: {self.frontend_url}")
        print(f"API Base: {self.api_base}")
        print(f"Articles to Test: {len(self.articles_to_test)}")
        print("=" * 70)

    def log_test(self, test_name: str, status: str, details: str = "", response_time: float = 0):
        """Log test results"""
        result = {
            'test': test_name,
            'status': status,
            'details': details,
            'response_time': response_time
        }
        self.test_results.append(result)
        
        if status == "PASS":
            self.passed_tests.append(result)
            print(f"✅ {test_name}: {details}")
        else:
            self.failed_tests.append(result)
            print(f"❌ {test_name}: {details}")

    def test_backend_connectivity(self) -> bool:
        """Test basic backend connectivity"""
        try:
            start_time = time.time()
            response = requests.get(f"{self.api_base}/", timeout=10)
            response_time = time.time() - start_time
            
            if response.status_code == 200:
                self.log_test("Backend Connectivity", "PASS", 
                            f"Backend accessible (200 OK) - Response time: {response_time:.3f}s", response_time)
                return True
            else:
                self.log_test("Backend Connectivity", "FAIL", 
                            f"Backend returned {response.status_code}")
                return False
        except requests.exceptions.RequestException as e:
            self.log_test("Backend Connectivity", "FAIL", f"Connection error: {str(e)}")
            return False

    def test_backend_api_endpoints(self) -> bool:
        """Test backend API endpoints"""
        endpoints_passed = 0
        total_endpoints = 0
        
        # Test GET /api/
        try:
            start_time = time.time()
            response = requests.get(f"{self.api_base}/", timeout=10)
            response_time = time.time() - start_time
            total_endpoints += 1
            
            if response.status_code == 200:
                data = response.json()
                if "message" in data:
                    endpoints_passed += 1
                    self.log_test("API Root Endpoint", "PASS", 
                                f"GET /api/ working - Response: {data} - Time: {response_time:.3f}s", response_time)
                else:
                    self.log_test("API Root Endpoint", "FAIL", "Missing message in response")
            else:
                self.log_test("API Root Endpoint", "FAIL", f"Status: {response.status_code}")
        except Exception as e:
            self.log_test("API Root Endpoint", "FAIL", f"Error: {str(e)}")
            total_endpoints += 1

        # Test GET /api/status
        try:
            start_time = time.time()
            response = requests.get(f"{self.api_base}/status", timeout=10)
            response_time = time.time() - start_time
            total_endpoints += 1
            
            if response.status_code == 200:
                data = response.json()
                endpoints_passed += 1
                self.log_test("API Status GET", "PASS", 
                            f"GET /api/status working - Found {len(data)} status checks - Time: {response_time:.3f}s", response_time)
            else:
                self.log_test("API Status GET", "FAIL", f"Status: {response.status_code}")
        except Exception as e:
            self.log_test("API Status GET", "FAIL", f"Error: {str(e)}")
            total_endpoints += 1

        # Test POST /api/status
        try:
            start_time = time.time()
            test_data = {"client_name": "BMI_Articles_Test_Client"}
            response = requests.post(f"{self.api_base}/status", json=test_data, timeout=10)
            response_time = time.time() - start_time
            total_endpoints += 1
            
            if response.status_code == 200:
                data = response.json()
                if "id" in data and "client_name" in data:
                    endpoints_passed += 1
                    self.log_test("API Status POST", "PASS", 
                                f"POST /api/status working - Created ID: {data.get('id', 'N/A')} - Time: {response_time:.3f}s", response_time)
                else:
                    self.log_test("API Status POST", "FAIL", "Missing required fields in response")
            else:
                self.log_test("API Status POST", "FAIL", f"Status: {response.status_code}")
        except Exception as e:
            self.log_test("API Status POST", "FAIL", f"Error: {str(e)}")
            total_endpoints += 1

        return endpoints_passed == total_endpoints

    def test_all_articles_route_accessibility(self) -> bool:
        """Test all 5 BMI articles route accessibility"""
        all_accessible = True
        accessible_count = 0
        
        for article in self.articles_to_test:
            try:
                start_time = time.time()
                response = requests.get(article['url'], timeout=15)
                response_time = time.time() - start_time
                
                if response.status_code == 200:
                    content = response.text
                    
                    # Check for expected content
                    content_found = 0
                    for expected in article['expected_content']:
                        if expected.lower() in content.lower():
                            content_found += 1
                    
                    if content_found >= 2:  # At least 2 out of expected terms
                        accessible_count += 1
                        self.log_test(f"Route Accessibility - {article['title']}", "PASS", 
                                    f"Accessible (200 OK) with {content_found}/{len(article['expected_content'])} expected terms - Time: {response_time:.3f}s", response_time)
                    else:
                        all_accessible = False
                        self.log_test(f"Route Accessibility - {article['title']}", "FAIL", 
                                    f"Missing expected content ({content_found}/{len(article['expected_content'])} terms found)")
                else:
                    all_accessible = False
                    self.log_test(f"Route Accessibility - {article['title']}", "FAIL", 
                                f"Route returned {response.status_code} status")
                    
            except requests.exceptions.RequestException as e:
                all_accessible = False
                self.log_test(f"Route Accessibility - {article['title']}", "FAIL", 
                            f"Connection error: {str(e)}")
        
        # Overall accessibility summary
        if accessible_count == len(self.articles_to_test):
            self.log_test("All Articles Route Accessibility", "PASS", 
                        f"All {accessible_count}/{len(self.articles_to_test)} articles accessible")
        else:
            self.log_test("All Articles Route Accessibility", "FAIL", 
                        f"Only {accessible_count}/{len(self.articles_to_test)} articles accessible")
        
        return all_accessible

    def test_comprehensive_seo_optimization(self) -> bool:
        """Test comprehensive SEO optimization across all articles"""
        seo_passed = 0
        total_articles = len(self.articles_to_test)
        
        for article in self.articles_to_test:
            try:
                start_time = time.time()
                response = requests.get(article['url'], timeout=15)
                response_time = time.time() - start_time
                
                if response.status_code != 200:
                    self.log_test(f"SEO Optimization - {article['title']}", "FAIL", 
                                f"Article not accessible (Status: {response.status_code})")
                    continue
                
                content = response.text
                
                # Enhanced SEO Elements to check
                seo_checks = {
                    "Title Tag": bool(re.search(r'<title[^>]*>.*BMI.*</title>', content, re.IGNORECASE)),
                    "Meta Description": bool(re.search(r'<meta[^>]*name=["\']description["\'][^>]*content=["\'][^"\']*BMI[^"\']*["\']', content, re.IGNORECASE)),
                    "Meta Keywords": bool(re.search(r'<meta[^>]*name=["\']keywords["\'][^>]*content=["\'][^"\']*["\']', content, re.IGNORECASE)),
                    "H1 Tag": bool(re.search(r'<h1[^>]*>.*</h1>', content, re.IGNORECASE)),
                    "H2 Tags": bool(re.search(r'<h2[^>]*>.*</h2>', content, re.IGNORECASE)),
                    "Canonical URL": bool(re.search(r'<link[^>]*rel=["\']canonical["\']', content, re.IGNORECASE)),
                    "Open Graph": bool(re.search(r'<meta[^>]*property=["\']og:', content, re.IGNORECASE)),
                    "JSON-LD Schema": bool(re.search(r'<script[^>]*type=["\']application/ld\+json["\']', content, re.IGNORECASE)),
                    "Viewport Meta": bool(re.search(r'<meta[^>]*name=["\']viewport["\']', content, re.IGNORECASE)),
                    "Medical Content": bool(re.search(r'(?:medical|health|WHO|evidence|research)', content, re.IGNORECASE)),
                    "FAQ Section": bool(re.search(r'(?:faq|frequently.*asked|questions)', content, re.IGNORECASE))
                }
                
                passed_seo = sum(seo_checks.values())
                total_seo = len(seo_checks)
                
                if passed_seo >= 8:  # At least 8 out of 11 SEO elements
                    seo_passed += 1
                    self.log_test(f"SEO Optimization - {article['title']}", "PASS", 
                                f"SEO elements: {passed_seo}/{total_seo} - Time: {response_time:.3f}s", response_time)
                else:
                    self.log_test(f"SEO Optimization - {article['title']}", "FAIL", 
                                f"Insufficient SEO optimization - SEO: {passed_seo}/{total_seo}")
                    
            except Exception as e:
                self.log_test(f"SEO Optimization - {article['title']}", "FAIL", f"Error: {str(e)}")
        
        # Overall SEO summary
        if seo_passed == total_articles:
            self.log_test("Comprehensive SEO Optimization", "PASS", 
                        f"All {seo_passed}/{total_articles} articles have excellent SEO")
        else:
            self.log_test("Comprehensive SEO Optimization", "FAIL", 
                        f"Only {seo_passed}/{total_articles} articles have adequate SEO")
        
        return seo_passed >= (total_articles * 0.8)  # 80% threshold

    def test_mobile_responsiveness_all_articles(self) -> bool:
        """Test mobile responsiveness across all articles"""
        mobile_passed = 0
        total_articles = len(self.articles_to_test)
        
        for article in self.articles_to_test:
            try:
                start_time = time.time()
                response = requests.get(article['url'], timeout=15)
                response_time = time.time() - start_time
                
                if response.status_code != 200:
                    self.log_test(f"Mobile Responsiveness - {article['title']}", "FAIL", 
                                f"Article not accessible (Status: {response.status_code})")
                    continue
                
                content = response.text
                
                # Mobile responsiveness indicators
                mobile_checks = {
                    "Viewport Meta Tag": bool(re.search(r'<meta[^>]*name=["\']viewport["\'][^>]*width=device-width', content, re.IGNORECASE)),
                    "Responsive CSS Classes": bool(re.search(r'class=["\'][^"\']*(?:sm:|md:|lg:|xl:)', content)),
                    "Mobile-First Design": bool(re.search(r'class=["\'][^"\']*(?:flex|grid|responsive)', content, re.IGNORECASE)),
                    "Touch-Friendly Elements": bool(re.search(r'class=["\'][^"\']*(?:touch|tap|mobile)', content, re.IGNORECASE)),
                    "Responsive Tables": bool(re.search(r'(?:overflow-x-auto|table-responsive)', content, re.IGNORECASE))
                }
                
                passed_mobile = sum(mobile_checks.values())
                total_mobile = len(mobile_checks)
                
                if passed_mobile >= 3:  # At least 3 mobile indicators
                    mobile_passed += 1
                    self.log_test(f"Mobile Responsiveness - {article['title']}", "PASS", 
                                f"Mobile indicators: {passed_mobile}/{total_mobile} - Time: {response_time:.3f}s", response_time)
                else:
                    self.log_test(f"Mobile Responsiveness - {article['title']}", "FAIL", 
                                f"Insufficient mobile optimization: {passed_mobile}/{total_mobile}")
                    
            except Exception as e:
                self.log_test(f"Mobile Responsiveness - {article['title']}", "FAIL", f"Error: {str(e)}")
        
        # Overall mobile responsiveness summary
        if mobile_passed == total_articles:
            self.log_test("Mobile Responsiveness All Articles", "PASS", 
                        f"All {mobile_passed}/{total_articles} articles are mobile responsive")
        else:
            self.log_test("Mobile Responsiveness All Articles", "FAIL", 
                        f"Only {mobile_passed}/{total_articles} articles are adequately mobile responsive")
        
        return mobile_passed >= (total_articles * 0.8)  # 80% threshold

    def test_content_enhancement_verification(self) -> bool:
        """Test content enhancement verification across all articles"""
        enhanced_passed = 0
        total_articles = len(self.articles_to_test)
        
        for article in self.articles_to_test:
            try:
                start_time = time.time()
                response = requests.get(article['url'], timeout=15)
                response_time = time.time() - start_time
                
                if response.status_code != 200:
                    self.log_test(f"Content Enhancement - {article['title']}", "FAIL", 
                                f"Article not accessible (Status: {response.status_code})")
                    continue
                
                content = response.text
                
                # Content enhancement indicators
                enhancement_checks = {
                    "Comprehensive Content": len(content) > 10000,  # Substantial content
                    "Medical References": bool(re.search(r'(?:WHO|medical|research|study|evidence|clinical)', content, re.IGNORECASE)),
                    "Interactive Elements": bool(re.search(r'(?:table|chart|calculator|interactive)', content, re.IGNORECASE)),
                    "Professional Images": bool(re.search(r'(?:images|img|medical.*image)', content, re.IGNORECASE)),
                    "Structured Headings": bool(re.search(r'<h[1-6][^>]*>.*</h[1-6]>', content, re.IGNORECASE)),
                    "FAQ Section": bool(re.search(r'(?:faq|frequently.*asked|questions)', content, re.IGNORECASE)),
                    "Citations": bool(re.search(r'(?:reference|citation|source|study)', content, re.IGNORECASE)),
                    "Reading Time": bool(re.search(r'(?:reading.*time|minutes.*read)', content, re.IGNORECASE)),
                    "Table of Contents": bool(re.search(r'(?:table.*contents|contents|navigation)', content, re.IGNORECASE))
                }
                
                passed_enhancement = sum(enhancement_checks.values())
                total_enhancement = len(enhancement_checks)
                
                if passed_enhancement >= 6:  # At least 6 out of 9 enhancement indicators
                    enhanced_passed += 1
                    self.log_test(f"Content Enhancement - {article['title']}", "PASS", 
                                f"Enhancement indicators: {passed_enhancement}/{total_enhancement} - Time: {response_time:.3f}s", response_time)
                else:
                    self.log_test(f"Content Enhancement - {article['title']}", "FAIL", 
                                f"Insufficient content enhancement: {passed_enhancement}/{total_enhancement}")
                    
            except Exception as e:
                self.log_test(f"Content Enhancement - {article['title']}", "FAIL", f"Error: {str(e)}")
        
        # Overall content enhancement summary
        if enhanced_passed == total_articles:
            self.log_test("Content Enhancement Verification", "PASS", 
                        f"All {enhanced_passed}/{total_articles} articles have comprehensive enhancements")
        else:
            self.log_test("Content Enhancement Verification", "FAIL", 
                        f"Only {enhanced_passed}/{total_articles} articles have adequate enhancements")
        
        return enhanced_passed >= (total_articles * 0.8)  # 80% threshold

    def test_performance_all_articles(self) -> bool:
        """Test performance across all articles"""
        performance_passed = 0
        total_articles = len(self.articles_to_test)
        all_response_times = []
        
        for article in self.articles_to_test:
            try:
                # Test 2 requests per article for average
                response_times = []
                
                for i in range(2):
                    start_time = time.time()
                    response = requests.get(article['url'], timeout=15)
                    response_time = time.time() - start_time
                    
                    if response.status_code == 200:
                        response_times.append(response_time)
                        all_response_times.append(response_time)
                    else:
                        self.log_test(f"Performance - {article['title']}", "FAIL", 
                                    f"Request {i+1} failed with status {response.status_code}")
                        break
                
                if len(response_times) == 2:
                    avg_response_time = sum(response_times) / len(response_times)
                    
                    # Performance thresholds
                    if avg_response_time < 3.0:  # Under 3 seconds is good for enhanced content
                        performance_rating = "Excellent"
                        performance_passed += 1
                        self.log_test(f"Performance - {article['title']}", "PASS", 
                                    f"Average load time: {avg_response_time:.3f}s ({performance_rating})", avg_response_time)
                    elif avg_response_time < 6.0:  # Under 6 seconds is acceptable
                        performance_rating = "Good"
                        performance_passed += 1
                        self.log_test(f"Performance - {article['title']}", "PASS", 
                                    f"Average load time: {avg_response_time:.3f}s ({performance_rating})", avg_response_time)
                    else:
                        performance_rating = "Needs Improvement"
                        self.log_test(f"Performance - {article['title']}", "FAIL", 
                                    f"Slow load time: {avg_response_time:.3f}s ({performance_rating})")
                    
            except Exception as e:
                self.log_test(f"Performance - {article['title']}", "FAIL", f"Error: {str(e)}")
        
        # Overall performance summary
        if all_response_times:
            overall_avg = sum(all_response_times) / len(all_response_times)
            if performance_passed == total_articles:
                self.log_test("Performance All Articles", "PASS", 
                            f"All {performance_passed}/{total_articles} articles have good performance - Overall avg: {overall_avg:.3f}s")
            else:
                self.log_test("Performance All Articles", "FAIL", 
                            f"Only {performance_passed}/{total_articles} articles have adequate performance - Overall avg: {overall_avg:.3f}s")
        
        return performance_passed >= (total_articles * 0.8)  # 80% threshold

    def test_blogs_articles_main_page(self) -> bool:
        """Test the main blogs/articles page"""
        blogs_url = f"{self.frontend_url}/blogs-articles"
        
        try:
            start_time = time.time()
            response = requests.get(blogs_url, timeout=15)
            response_time = time.time() - start_time
            
            if response.status_code == 200:
                content = response.text
                
                # Check for all 5 articles on the main page
                articles_found = 0
                for article in self.articles_to_test:
                    if article['slug'] in content:
                        articles_found += 1
                
                # Check for blog page elements
                blog_checks = {
                    "Articles List": bool(re.search(r'(?:articles|blog|guides)', content, re.IGNORECASE)),
                    "All 5 Articles Present": articles_found == 5,
                    "Search Functionality": bool(re.search(r'(?:search|filter)', content, re.IGNORECASE)),
                    "Navigation": bool(re.search(r'(?:nav|menu|header)', content, re.IGNORECASE)),
                    "BMI Content": bool(re.search(r'BMI', content, re.IGNORECASE))
                }
                
                passed_blog = sum(blog_checks.values())
                total_blog = len(blog_checks)
                
                if passed_blog >= 4:
                    self.log_test("Blogs Articles Main Page", "PASS", 
                                f"Blog page elements: {passed_blog}/{total_blog}, Articles found: {articles_found}/5 - Time: {response_time:.3f}s", response_time)
                    return True
                else:
                    self.log_test("Blogs Articles Main Page", "FAIL", 
                                f"Missing blog elements: {passed_blog}/{total_blog}, Articles found: {articles_found}/5")
                    return False
            else:
                self.log_test("Blogs Articles Main Page", "FAIL", 
                            f"Status: {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Blogs Articles Main Page", "FAIL", f"Error: {str(e)}")
            return False

    def run_all_tests(self):
        """Run all comprehensive tests for 5 BMI articles"""
        print("\n🚀 Starting 5 Enhanced BMI Blog Articles Comprehensive Testing...")
        print("=" * 70)
        
        # Test sequence
        tests = [
            ("Backend Connectivity", self.test_backend_connectivity),
            ("Backend API Endpoints", self.test_backend_api_endpoints),
            ("Blogs Articles Main Page", self.test_blogs_articles_main_page),
            ("All Articles Route Accessibility", self.test_all_articles_route_accessibility),
            ("Comprehensive SEO Optimization", self.test_comprehensive_seo_optimization),
            ("Mobile Responsiveness All Articles", self.test_mobile_responsiveness_all_articles),
            ("Content Enhancement Verification", self.test_content_enhancement_verification),
            ("Performance All Articles", self.test_performance_all_articles)
        ]
        
        for test_name, test_func in tests:
            print(f"\n📋 Running: {test_name}")
            try:
                test_func()
            except Exception as e:
                self.log_test(test_name, "FAIL", f"Unexpected error: {str(e)}")
            time.sleep(0.5)  # Brief pause between tests
        
        self.print_summary()

    def print_summary(self):
        """Print comprehensive test summary"""
        print("\n" + "=" * 70)
        print("🏁 5 ENHANCED BMI BLOG ARTICLES COMPREHENSIVE TEST SUMMARY")
        print("=" * 70)
        
        total_tests = len(self.test_results)
        passed_count = len(self.passed_tests)
        failed_count = len(self.failed_tests)
        success_rate = (passed_count / total_tests * 100) if total_tests > 0 else 0
        
        print(f"📊 Total Tests: {total_tests}")
        print(f"✅ Passed: {passed_count}")
        print(f"❌ Failed: {failed_count}")
        print(f"📈 Success Rate: {success_rate:.1f}%")
        
        if self.failed_tests:
            print(f"\n❌ FAILED TESTS ({len(self.failed_tests)}):")
            print("-" * 50)
            for test in self.failed_tests:
                print(f"• {test['test']}: {test['details']}")
        
        if self.passed_tests:
            print(f"\n✅ PASSED TESTS ({len(self.passed_tests)}):")
            print("-" * 50)
            for test in self.passed_tests:
                print(f"• {test['test']}: {test['details']}")
        
        # Performance summary
        response_times = [t['response_time'] for t in self.test_results if t['response_time'] > 0]
        if response_times:
            avg_response_time = sum(response_times) / len(response_times)
            print(f"\n⚡ Average Response Time: {avg_response_time:.3f}s")
        
        print("\n" + "=" * 70)
        
        # Return success status
        return success_rate >= 75  # 75% success rate threshold

def main():
    """Main test execution"""
    tester = BMIArticlesBackendTester()
    success = tester.run_all_tests()
    
    if success:
        print("🎉 5 Enhanced BMI Blog Articles Testing COMPLETED SUCCESSFULLY!")
        sys.exit(0)
    else:
        print("⚠️  5 Enhanced BMI Blog Articles Testing completed with issues.")
        sys.exit(1)

if __name__ == "__main__":
    main()