#!/usr/bin/env python3
"""
Backend Testing Suite for BMI Calculator Article SEO Performance and Functionality
Testing the enhanced BMI calculator article for SEO performance and functionality
"""

import requests
import time
import json
import re
from urllib.parse import urljoin
import sys
from typing import Dict, List, Tuple, Optional

class BMIArticleBackendTester:
    def __init__(self):
        # Get backend URL from environment or use default
        self.backend_url = "http://localhost:8001"
        self.frontend_url = "http://localhost:3000"
        self.api_base = f"{self.backend_url}/api"
        
        # Test results storage
        self.test_results = []
        self.failed_tests = []
        self.passed_tests = []
        
        print("🔍 BMI Calculator Article Backend Testing Suite")
        print("=" * 60)
        print(f"Backend URL: {self.backend_url}")
        print(f"Frontend URL: {self.frontend_url}")
        print(f"API Base: {self.api_base}")
        print("=" * 60)

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
            test_data = {"client_name": "BMI_Article_Test_Client"}
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

    def test_bmi_article_route_accessibility(self) -> bool:
        """Test BMI calculator article route accessibility"""
        article_url = f"{self.frontend_url}/blogs-articles/ultimate-guide-bmi-calculator"
        
        try:
            start_time = time.time()
            response = requests.get(article_url, timeout=15)
            response_time = time.time() - start_time
            
            if response.status_code == 200:
                content = response.text
                
                # Check for key BMI article content
                content_checks = {
                    "BMI Calculator": "BMI calculator" in content.lower(),
                    "Calculate BMI": "calculate bmi" in content.lower(),
                    "BMI Chart": "bmi chart" in content.lower(),
                    "Free BMI Calculator": "free bmi calculator" in content.lower(),
                    "Body Mass Index": "body mass index" in content.lower()
                }
                
                passed_checks = sum(content_checks.values())
                total_checks = len(content_checks)
                
                if passed_checks >= 3:  # At least 3 out of 5 key terms
                    self.log_test("BMI Article Route Accessibility", "PASS", 
                                f"Route accessible (200 OK) with {passed_checks}/{total_checks} key terms - Time: {response_time:.3f}s", response_time)
                    return True
                else:
                    self.log_test("BMI Article Route Accessibility", "FAIL", 
                                f"Route accessible but missing key content ({passed_checks}/{total_checks} terms found)")
                    return False
            else:
                self.log_test("BMI Article Route Accessibility", "FAIL", 
                            f"Route returned {response.status_code} status")
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("BMI Article Route Accessibility", "FAIL", 
                        f"Connection error: {str(e)}")
            return False

    def test_seo_content_verification(self) -> bool:
        """Test SEO content verification for BMI article"""
        article_url = f"{self.frontend_url}/blogs-articles/ultimate-guide-bmi-calculator"
        
        try:
            start_time = time.time()
            response = requests.get(article_url, timeout=15)
            response_time = time.time() - start_time
            
            if response.status_code != 200:
                self.log_test("SEO Content Verification", "FAIL", 
                            f"Article not accessible (Status: {response.status_code})")
                return False
            
            content = response.text
            
            # SEO Elements to check
            seo_checks = {
                "Title Tag": bool(re.search(r'<title[^>]*>.*BMI.*Calculator.*</title>', content, re.IGNORECASE)),
                "Meta Description": bool(re.search(r'<meta[^>]*name=["\']description["\'][^>]*content=["\'][^"\']*BMI[^"\']*["\']', content, re.IGNORECASE)),
                "Meta Keywords": bool(re.search(r'<meta[^>]*name=["\']keywords["\'][^>]*content=["\'][^"\']*BMI[^"\']*["\']', content, re.IGNORECASE)),
                "H1 Tag": bool(re.search(r'<h1[^>]*>.*BMI.*</h1>', content, re.IGNORECASE)),
                "Canonical URL": bool(re.search(r'<link[^>]*rel=["\']canonical["\']', content, re.IGNORECASE)),
                "Open Graph": bool(re.search(r'<meta[^>]*property=["\']og:', content, re.IGNORECASE)),
                "JSON-LD Schema": bool(re.search(r'<script[^>]*type=["\']application/ld\+json["\']', content, re.IGNORECASE)),
                "Viewport Meta": bool(re.search(r'<meta[^>]*name=["\']viewport["\']', content, re.IGNORECASE))
            }
            
            passed_seo = sum(seo_checks.values())
            total_seo = len(seo_checks)
            
            # Check for specific BMI keywords
            keyword_checks = {
                "BMI calculator": "bmi calculator" in content.lower(),
                "calculate BMI": "calculate bmi" in content.lower(),
                "BMI chart": "bmi chart" in content.lower(),
                "free BMI calculator": "free bmi calculator" in content.lower()
            }
            
            passed_keywords = sum(keyword_checks.values())
            total_keywords = len(keyword_checks)
            
            if passed_seo >= 6 and passed_keywords >= 3:
                self.log_test("SEO Content Verification", "PASS", 
                            f"SEO elements: {passed_seo}/{total_seo}, Keywords: {passed_keywords}/{total_keywords} - Time: {response_time:.3f}s", response_time)
                return True
            else:
                self.log_test("SEO Content Verification", "FAIL", 
                            f"Insufficient SEO optimization - SEO: {passed_seo}/{total_seo}, Keywords: {passed_keywords}/{total_keywords}")
                return False
                
        except Exception as e:
            self.log_test("SEO Content Verification", "FAIL", f"Error: {str(e)}")
            return False

    def test_mobile_responsiveness(self) -> bool:
        """Test mobile responsiveness indicators"""
        article_url = f"{self.frontend_url}/blogs-articles/ultimate-guide-bmi-calculator"
        
        try:
            start_time = time.time()
            response = requests.get(article_url, timeout=15)
            response_time = time.time() - start_time
            
            if response.status_code != 200:
                self.log_test("Mobile Responsiveness", "FAIL", 
                            f"Article not accessible (Status: {response.status_code})")
                return False
            
            content = response.text
            
            # Mobile responsiveness indicators
            mobile_checks = {
                "Viewport Meta Tag": bool(re.search(r'<meta[^>]*name=["\']viewport["\'][^>]*width=device-width', content, re.IGNORECASE)),
                "Responsive CSS Classes": bool(re.search(r'class=["\'][^"\']*(?:sm:|md:|lg:|xl:)', content)),
                "Mobile-First Design": bool(re.search(r'class=["\'][^"\']*(?:flex|grid|responsive)', content, re.IGNORECASE)),
                "Touch-Friendly Elements": bool(re.search(r'class=["\'][^"\']*(?:touch|tap|mobile)', content, re.IGNORECASE))
            }
            
            passed_mobile = sum(mobile_checks.values())
            total_mobile = len(mobile_checks)
            
            if passed_mobile >= 2:  # At least 2 mobile indicators
                self.log_test("Mobile Responsiveness", "PASS", 
                            f"Mobile indicators found: {passed_mobile}/{total_mobile} - Time: {response_time:.3f}s", response_time)
                return True
            else:
                self.log_test("Mobile Responsiveness", "FAIL", 
                            f"Insufficient mobile optimization: {passed_mobile}/{total_mobile}")
                return False
                
        except Exception as e:
            self.log_test("Mobile Responsiveness", "FAIL", f"Error: {str(e)}")
            return False

    def test_content_structure(self) -> bool:
        """Test content structure for BMI article"""
        article_url = f"{self.frontend_url}/blogs-articles/ultimate-guide-bmi-calculator"
        
        try:
            start_time = time.time()
            response = requests.get(article_url, timeout=15)
            response_time = time.time() - start_time
            
            if response.status_code != 200:
                self.log_test("Content Structure", "FAIL", 
                            f"Article not accessible (Status: {response.status_code})")
                return False
            
            content = response.text
            
            # Content structure checks
            structure_checks = {
                "H1 Heading": bool(re.search(r'<h1[^>]*>', content, re.IGNORECASE)),
                "H2 Headings": bool(re.search(r'<h2[^>]*>', content, re.IGNORECASE)),
                "FAQ Section": bool(re.search(r'(?:faq|frequently.*asked|questions)', content, re.IGNORECASE)),
                "BMI Information": bool(re.search(r'(?:body mass index|bmi.*formula|bmi.*calculation)', content, re.IGNORECASE)),
                "Health Categories": bool(re.search(r'(?:underweight|normal.*weight|overweight|obese)', content, re.IGNORECASE)),
                "WHO Standards": bool(re.search(r'(?:who|world health organization)', content, re.IGNORECASE))
            }
            
            passed_structure = sum(structure_checks.values())
            total_structure = len(structure_checks)
            
            if passed_structure >= 4:  # At least 4 structure elements
                self.log_test("Content Structure", "PASS", 
                            f"Content structure elements: {passed_structure}/{total_structure} - Time: {response_time:.3f}s", response_time)
                return True
            else:
                self.log_test("Content Structure", "FAIL", 
                            f"Insufficient content structure: {passed_structure}/{total_structure}")
                return False
                
        except Exception as e:
            self.log_test("Content Structure", "FAIL", f"Error: {str(e)}")
            return False

    def test_performance(self) -> bool:
        """Test page load performance"""
        article_url = f"{self.frontend_url}/blogs-articles/ultimate-guide-bmi-calculator"
        
        try:
            # Test multiple requests to get average
            response_times = []
            
            for i in range(3):
                start_time = time.time()
                response = requests.get(article_url, timeout=15)
                response_time = time.time() - start_time
                
                if response.status_code == 200:
                    response_times.append(response_time)
                else:
                    self.log_test("Performance", "FAIL", 
                                f"Request {i+1} failed with status {response.status_code}")
                    return False
            
            avg_response_time = sum(response_times) / len(response_times)
            
            # Performance thresholds
            if avg_response_time < 2.0:  # Under 2 seconds is good
                performance_rating = "Excellent"
            elif avg_response_time < 5.0:  # Under 5 seconds is acceptable
                performance_rating = "Good"
            else:
                performance_rating = "Needs Improvement"
            
            self.log_test("Performance", "PASS", 
                        f"Average load time: {avg_response_time:.3f}s ({performance_rating})", avg_response_time)
            return True
                
        except Exception as e:
            self.log_test("Performance", "FAIL", f"Error: {str(e)}")
            return False

    def test_blogs_articles_main_page(self) -> bool:
        """Test the main blogs/articles page"""
        blogs_url = f"{self.frontend_url}/blogs-articles"
        
        try:
            start_time = time.time()
            response = requests.get(blogs_url, timeout=15)
            response_time = time.time() - start_time
            
            if response.status_code == 200:
                content = response.text
                
                # Check for blog page elements
                blog_checks = {
                    "Articles List": bool(re.search(r'(?:articles|blog|guides)', content, re.IGNORECASE)),
                    "BMI Article Link": "ultimate-guide-bmi-calculator" in content,
                    "Search Functionality": bool(re.search(r'(?:search|filter)', content, re.IGNORECASE)),
                    "Navigation": bool(re.search(r'(?:nav|menu|header)', content, re.IGNORECASE))
                }
                
                passed_blog = sum(blog_checks.values())
                total_blog = len(blog_checks)
                
                if passed_blog >= 3:
                    self.log_test("Blogs Articles Main Page", "PASS", 
                                f"Blog page elements: {passed_blog}/{total_blog} - Time: {response_time:.3f}s", response_time)
                    return True
                else:
                    self.log_test("Blogs Articles Main Page", "FAIL", 
                                f"Missing blog elements: {passed_blog}/{total_blog}")
                    return False
            else:
                self.log_test("Blogs Articles Main Page", "FAIL", 
                            f"Status: {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Blogs Articles Main Page", "FAIL", f"Error: {str(e)}")
            return False

    def run_all_tests(self):
        """Run all backend tests for BMI article"""
        print("\n🚀 Starting BMI Calculator Article Backend Testing...")
        print("=" * 60)
        
        # Test sequence
        tests = [
            ("Backend Connectivity", self.test_backend_connectivity),
            ("Backend API Endpoints", self.test_backend_api_endpoints),
            ("Blogs Articles Main Page", self.test_blogs_articles_main_page),
            ("BMI Article Route Accessibility", self.test_bmi_article_route_accessibility),
            ("SEO Content Verification", self.test_seo_content_verification),
            ("Mobile Responsiveness", self.test_mobile_responsiveness),
            ("Content Structure", self.test_content_structure),
            ("Performance", self.test_performance)
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
        """Print test summary"""
        print("\n" + "=" * 60)
        print("🏁 BMI CALCULATOR ARTICLE BACKEND TEST SUMMARY")
        print("=" * 60)
        
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
            print("-" * 40)
            for test in self.failed_tests:
                print(f"• {test['test']}: {test['details']}")
        
        if self.passed_tests:
            print(f"\n✅ PASSED TESTS ({len(self.passed_tests)}):")
            print("-" * 40)
            for test in self.passed_tests:
                print(f"• {test['test']}: {test['details']}")
        
        # Performance summary
        response_times = [t['response_time'] for t in self.test_results if t['response_time'] > 0]
        if response_times:
            avg_response_time = sum(response_times) / len(response_times)
            print(f"\n⚡ Average Response Time: {avg_response_time:.3f}s")
        
        print("\n" + "=" * 60)
        
        # Return success status
        return success_rate >= 75  # 75% success rate threshold

def main():
    """Main test execution"""
    tester = BMIArticleBackendTester()
    success = tester.run_all_tests()
    
    if success:
        print("🎉 BMI Calculator Article Backend Testing COMPLETED SUCCESSFULLY!")
        sys.exit(0)
    else:
        print("⚠️  BMI Calculator Article Backend Testing completed with issues.")
        sys.exit(1)

if __name__ == "__main__":
    main()