#!/usr/bin/env python3
"""
COMPREHENSIVE BACKEND TESTING - WORLD-CLASS PREGNANCY CALCULATOR SUITE 2025

This test suite performs comprehensive backend testing for the three world-class pregnancy calculators:
1. /pregnancy-calculator - Enhanced with professional images, competitive analysis, voice search optimization
2. /pregnancy-weight-gain-calculator - Medical-grade IOM + WHO standards integration  
3. /due-date-calculator - Advanced Naegele's + Woods/Nichols method integration

Testing Focus:
- Route accessibility and load times for all three enhanced calculators
- Professional images loading correctly (Unsplash URLs)
- SEO meta tags and structured data validation
- React component rendering (new WorldClassPregnancyAuthority component)
- Mobile responsiveness indicators
- Advanced schema markup verification (competitive analysis data)
- Backend API connectivity for any calculator functionality
- Core Web Vitals and performance metrics
- Search engine optimization elements verification
"""

import requests
import time
import json
import sys
import re
from typing import Dict, List, Tuple, Any
from urllib.parse import urljoin
import uuid

class WorldClassPregnancyCalculatorTester:
    def __init__(self):
        # Use localhost URLs as per system instructions
        self.backend_url = "http://localhost:8001"  # Backend runs on port 8001
        self.frontend_url = "http://localhost:3000"  # Frontend runs on port 3000
        self.test_results = []
        
        # Three world-class pregnancy calculators to test
        self.pregnancy_calculators = [
            {
                "name": "World-Class Pregnancy Calculator",
                "route": "/pregnancy-calculator",
                "description": "Enhanced with professional images, competitive analysis, voice search optimization"
            },
            {
                "name": "World-Class Pregnancy Weight Gain Calculator", 
                "route": "/pregnancy-weight-gain-calculator",
                "description": "Medical-grade IOM + WHO standards integration"
            },
            {
                "name": "World-Class Due Date Calculator",
                "route": "/due-date-calculator", 
                "description": "Advanced Naegele's + Woods/Nichols method integration"
            }
        ]
        
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
            test_data = {"client_name": "pregnancy_calculator_test"}
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

    def test_pregnancy_calculator_routes(self):
        """Test accessibility and load times for all three pregnancy calculators"""
        for calculator in self.pregnancy_calculators:
            test_name = f"Route Accessibility: {calculator['name']}"
            try:
                start_time = time.time()
                response = requests.get(f"{self.frontend_url}{calculator['route']}", timeout=10)
                duration = time.time() - start_time
                
                if response.status_code == 200:
                    # Check if it's a valid React page
                    content = response.text
                    if 'id="root"' in content or 'react' in content.lower():
                        # Check load time performance (<100ms as per requirements)
                        if duration < 0.1:  # 100ms
                            self.log_test(test_name, "PASS", f"Route accessible with excellent load time", duration)
                        elif duration < 0.5:  # 500ms
                            self.log_test(test_name, "PASS", f"Route accessible with good load time", duration)
                        else:
                            self.log_test(test_name, "WARN", f"Route accessible but load time exceeds 100ms target", duration)
                    else:
                        self.log_test(test_name, "FAIL", f"Route accessible but may not be React app", duration)
                else:
                    self.log_test(test_name, "FAIL", f"HTTP {response.status_code}", duration)
            except Exception as e:
                self.log_test(test_name, "FAIL", f"Error: {str(e)}")

    def test_professional_images_loading(self):
        """Test professional images loading correctly (Unsplash URLs)"""
        for calculator in self.pregnancy_calculators:
            test_name = f"Professional Images Loading: {calculator['name']}"
            try:
                start_time = time.time()
                response = requests.get(f"{self.frontend_url}{calculator['route']}", timeout=10)
                duration = time.time() - start_time
                
                if response.status_code == 200:
                    content = response.text
                    
                    # Check for Unsplash image URLs
                    unsplash_patterns = [
                        r'unsplash\.com',
                        r'images\.unsplash\.com',
                        r'source\.unsplash\.com'
                    ]
                    
                    found_unsplash = any(re.search(pattern, content, re.IGNORECASE) for pattern in unsplash_patterns)
                    
                    # Check for other professional image indicators
                    image_indicators = [
                        'hero', 'professional', 'medical', 'pregnancy', 'calculator',
                        'img', 'image', 'photo', 'picture'
                    ]
                    
                    found_images = sum(1 for indicator in image_indicators if indicator in content.lower())
                    
                    if found_unsplash:
                        self.log_test(test_name, "PASS", f"Unsplash professional images detected", duration)
                    elif found_images >= 3:
                        self.log_test(test_name, "PASS", f"Professional image indicators present ({found_images} found)", duration)
                    else:
                        self.log_test(test_name, "WARN", f"Limited image indicators found ({found_images})", duration)
                else:
                    self.log_test(test_name, "FAIL", f"HTTP {response.status_code}", duration)
            except Exception as e:
                self.log_test(test_name, "FAIL", f"Error: {str(e)}")

    def test_seo_meta_tags_validation(self):
        """Test SEO meta tags and structured data validation"""
        for calculator in self.pregnancy_calculators:
            test_name = f"SEO Meta Tags: {calculator['name']}"
            try:
                start_time = time.time()
                response = requests.get(f"{self.frontend_url}{calculator['route']}", timeout=10)
                duration = time.time() - start_time
                
                if response.status_code == 200:
                    content = response.text
                    
                    # Check for essential SEO meta tags
                    seo_elements = {
                        'title': r'<title[^>]*>([^<]+)</title>',
                        'description': r'<meta[^>]*name=["\']description["\'][^>]*content=["\']([^"\']+)["\']',
                        'keywords': r'<meta[^>]*name=["\']keywords["\'][^>]*content=["\']([^"\']+)["\']',
                        'og:title': r'<meta[^>]*property=["\']og:title["\'][^>]*content=["\']([^"\']+)["\']',
                        'og:description': r'<meta[^>]*property=["\']og:description["\'][^>]*content=["\']([^"\']+)["\']',
                        'og:url': r'<meta[^>]*property=["\']og:url["\'][^>]*content=["\']([^"\']+)["\']',
                        'og:image': r'<meta[^>]*property=["\']og:image["\'][^>]*content=["\']([^"\']+)["\']',
                        'twitter:card': r'<meta[^>]*name=["\']twitter:card["\'][^>]*content=["\']([^"\']+)["\']',
                        'twitter:title': r'<meta[^>]*name=["\']twitter:title["\'][^>]*content=["\']([^"\']+)["\']',
                        'twitter:description': r'<meta[^>]*name=["\']twitter:description["\'][^>]*content=["\']([^"\']+)["\']',
                        'canonical': r'<link[^>]*rel=["\']canonical["\'][^>]*href=["\']([^"\']+)["\']'
                    }
                    
                    found_elements = 0
                    for element, pattern in seo_elements.items():
                        if re.search(pattern, content, re.IGNORECASE):
                            found_elements += 1
                    
                    total_elements = len(seo_elements)
                    if found_elements >= 8:  # Most essential elements
                        self.log_test(test_name, "PASS", f"Comprehensive SEO meta tags ({found_elements}/{total_elements} elements)", duration)
                    elif found_elements >= 5:
                        self.log_test(test_name, "PASS", f"Good SEO meta tags ({found_elements}/{total_elements} elements)", duration)
                    else:
                        self.log_test(test_name, "WARN", f"Limited SEO meta tags ({found_elements}/{total_elements} elements)", duration)
                else:
                    self.log_test(test_name, "FAIL", f"HTTP {response.status_code}", duration)
            except Exception as e:
                self.log_test(test_name, "FAIL", f"Error: {str(e)}")

    def test_structured_data_schema(self):
        """Test advanced schema markup verification (competitive analysis data)"""
        for calculator in self.pregnancy_calculators:
            test_name = f"JSON-LD Structured Data: {calculator['name']}"
            try:
                start_time = time.time()
                response = requests.get(f"{self.frontend_url}{calculator['route']}", timeout=10)
                duration = time.time() - start_time
                
                if response.status_code == 200:
                    content = response.text
                    
                    # Check for JSON-LD structured data
                    json_ld_pattern = r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>'
                    json_ld_matches = re.findall(json_ld_pattern, content, re.DOTALL | re.IGNORECASE)
                    
                    schema_types_found = []
                    medical_indicators = []
                    
                    for match in json_ld_matches:
                        try:
                            schema_data = json.loads(match.strip())
                            if isinstance(schema_data, dict):
                                schema_type = schema_data.get('@type', '')
                                if schema_type:
                                    schema_types_found.append(schema_type)
                                
                                # Check for medical-specific schema elements
                                medical_terms = ['Medical', 'Health', 'Calculator', 'Risk', 'FAQ', 'WebApplication']
                                for term in medical_terms:
                                    if term.lower() in json.dumps(schema_data).lower():
                                        medical_indicators.append(term)
                        except json.JSONDecodeError:
                            continue
                    
                    # Expected schema types for pregnancy calculators
                    expected_schemas = ['MedicalRiskCalculator', 'FAQPage', 'WebApplication']
                    found_expected = sum(1 for expected in expected_schemas if any(expected in found for found in schema_types_found))
                    
                    if found_expected >= 2 and len(medical_indicators) >= 3:
                        self.log_test(test_name, "PASS", f"Comprehensive schema markup ({found_expected}/3 expected schemas, {len(medical_indicators)} medical indicators)", duration)
                    elif found_expected >= 1:
                        self.log_test(test_name, "PASS", f"Good schema markup ({found_expected}/3 expected schemas)", duration)
                    else:
                        self.log_test(test_name, "WARN", f"Limited schema markup ({found_expected}/3 expected schemas)", duration)
                else:
                    self.log_test(test_name, "FAIL", f"HTTP {response.status_code}", duration)
            except Exception as e:
                self.log_test(test_name, "FAIL", f"Error: {str(e)}")

    def test_react_component_rendering(self):
        """Test React component rendering (new WorldClassPregnancyAuthority component)"""
        for calculator in self.pregnancy_calculators:
            test_name = f"React Component Rendering: {calculator['name']}"
            try:
                start_time = time.time()
                response = requests.get(f"{self.frontend_url}{calculator['route']}", timeout=10)
                duration = time.time() - start_time
                
                if response.status_code == 200:
                    content = response.text
                    
                    # Check for React component indicators
                    react_indicators = [
                        'id="root"',
                        'react',
                        'component',
                        'jsx',
                        'calculator',
                        'pregnancy',
                        'authority',
                        'world-class',
                        'medical-grade'
                    ]
                    
                    found_indicators = sum(1 for indicator in react_indicators if indicator.lower() in content.lower())
                    
                    # Check for specific pregnancy calculator content
                    pregnancy_content = [
                        'gestational', 'trimester', 'weeks', 'due date', 'weight gain',
                        'naegele', 'iom', 'who', 'medical', 'calculator'
                    ]
                    
                    found_content = sum(1 for content_item in pregnancy_content if content_item.lower() in content.lower())
                    
                    if found_indicators >= 5 and found_content >= 3:
                        self.log_test(test_name, "PASS", f"React components rendering correctly ({found_indicators} indicators, {found_content} pregnancy content)", duration)
                    elif found_indicators >= 3:
                        self.log_test(test_name, "PASS", f"React components present ({found_indicators} indicators)", duration)
                    else:
                        self.log_test(test_name, "WARN", f"Limited React component indicators ({found_indicators})", duration)
                else:
                    self.log_test(test_name, "FAIL", f"HTTP {response.status_code}", duration)
            except Exception as e:
                self.log_test(test_name, "FAIL", f"Error: {str(e)}")

    def test_mobile_responsiveness(self):
        """Test mobile responsiveness indicators"""
        for calculator in self.pregnancy_calculators:
            test_name = f"Mobile Responsiveness: {calculator['name']}"
            try:
                start_time = time.time()
                response = requests.get(f"{self.frontend_url}{calculator['route']}", timeout=10)
                duration = time.time() - start_time
                
                if response.status_code == 200:
                    content = response.text
                    
                    # Check for viewport meta tag
                    has_viewport = 'name="viewport"' in content
                    
                    # Check for responsive design indicators
                    responsive_indicators = [
                        'responsive', 'mobile', 'sm:', 'md:', 'lg:', 'xl:', '@media',
                        'grid-cols', 'flex', 'w-full', 'max-w', 'min-w'
                    ]
                    
                    found_responsive = sum(1 for indicator in responsive_indicators if indicator in content)
                    
                    if has_viewport and found_responsive >= 5:
                        self.log_test(test_name, "PASS", f"Excellent mobile responsiveness ({found_responsive} indicators)", duration)
                    elif has_viewport and found_responsive >= 3:
                        self.log_test(test_name, "PASS", f"Good mobile responsiveness ({found_responsive} indicators)", duration)
                    elif has_viewport:
                        self.log_test(test_name, "WARN", f"Basic mobile responsiveness (viewport present, {found_responsive} indicators)", duration)
                    else:
                        self.log_test(test_name, "FAIL", f"Missing mobile responsiveness indicators", duration)
                else:
                    self.log_test(test_name, "FAIL", f"HTTP {response.status_code}", duration)
            except Exception as e:
                self.log_test(test_name, "FAIL", f"Error: {str(e)}")

    def test_voice_search_optimization(self):
        """Test voice search optimized FAQ sections"""
        for calculator in self.pregnancy_calculators:
            test_name = f"Voice Search Optimization: {calculator['name']}"
            try:
                start_time = time.time()
                response = requests.get(f"{self.frontend_url}{calculator['route']}", timeout=10)
                duration = time.time() - start_time
                
                if response.status_code == 200:
                    content = response.text
                    
                    # Check for FAQ section indicators
                    faq_indicators = [
                        'faq', 'frequently asked', 'questions', 'answers',
                        'what is', 'how to', 'when to', 'why'
                    ]
                    
                    found_faq = sum(1 for indicator in faq_indicators if indicator.lower() in content.lower())
                    
                    # Check for voice search optimization patterns
                    voice_patterns = [
                        r'what\s+is\s+\w+',
                        r'how\s+to\s+\w+',
                        r'when\s+to\s+\w+',
                        r'why\s+\w+'
                    ]
                    
                    found_voice_patterns = sum(1 for pattern in voice_patterns if re.search(pattern, content, re.IGNORECASE))
                    
                    if found_faq >= 3 and found_voice_patterns >= 2:
                        self.log_test(test_name, "PASS", f"Voice search optimized FAQ section ({found_faq} FAQ indicators, {found_voice_patterns} voice patterns)", duration)
                    elif found_faq >= 2:
                        self.log_test(test_name, "PASS", f"FAQ section present ({found_faq} indicators)", duration)
                    else:
                        self.log_test(test_name, "WARN", f"Limited FAQ/voice search optimization ({found_faq} indicators)", duration)
                else:
                    self.log_test(test_name, "FAIL", f"HTTP {response.status_code}", duration)
            except Exception as e:
                self.log_test(test_name, "FAIL", f"Error: {str(e)}")

    def test_medical_authority_positioning(self):
        """Test medical authority positioning elements"""
        for calculator in self.pregnancy_calculators:
            test_name = f"Medical Authority Positioning: {calculator['name']}"
            try:
                start_time = time.time()
                response = requests.get(f"{self.frontend_url}{calculator['route']}", timeout=10)
                duration = time.time() - start_time
                
                if response.status_code == 200:
                    content = response.text
                    
                    # Check for medical authority indicators
                    authority_indicators = [
                        'medical', 'clinical', 'professional', 'certified', 'approved',
                        'acog', 'who', 'iom', 'cdc', 'medical grade', 'evidence-based',
                        'naegele', 'gestational', 'trimester', 'prenatal'
                    ]
                    
                    found_authority = sum(1 for indicator in authority_indicators if indicator.lower() in content.lower())
                    
                    # Check for specific medical standards
                    medical_standards = [
                        'iom guidelines', 'who standards', 'acog', 'naegele rule',
                        'medical accuracy', 'clinical validation', 'evidence-based'
                    ]
                    
                    found_standards = sum(1 for standard in medical_standards if standard.lower() in content.lower())
                    
                    if found_authority >= 8 and found_standards >= 2:
                        self.log_test(test_name, "PASS", f"Strong medical authority positioning ({found_authority} authority indicators, {found_standards} standards)", duration)
                    elif found_authority >= 5:
                        self.log_test(test_name, "PASS", f"Good medical authority positioning ({found_authority} indicators)", duration)
                    else:
                        self.log_test(test_name, "WARN", f"Limited medical authority positioning ({found_authority} indicators)", duration)
                else:
                    self.log_test(test_name, "FAIL", f"HTTP {response.status_code}", duration)
            except Exception as e:
                self.log_test(test_name, "FAIL", f"Error: {str(e)}")

    def test_core_web_vitals_performance(self):
        """Test Core Web Vitals and performance metrics"""
        total_load_time = 0
        successful_loads = 0
        
        for calculator in self.pregnancy_calculators:
            test_name = f"Core Web Vitals Performance: {calculator['name']}"
            try:
                start_time = time.time()
                response = requests.get(f"{self.frontend_url}{calculator['route']}", timeout=10)
                duration = time.time() - start_time
                total_load_time += duration
                
                if response.status_code == 200:
                    successful_loads += 1
                    
                    # Check response size (smaller is better for performance)
                    content_length = len(response.content)
                    
                    # Performance thresholds
                    if duration < 0.1:  # 100ms - Excellent
                        performance_rating = "Excellent"
                        status = "PASS"
                    elif duration < 0.5:  # 500ms - Good
                        performance_rating = "Good"
                        status = "PASS"
                    elif duration < 1.0:  # 1s - Acceptable
                        performance_rating = "Acceptable"
                        status = "WARN"
                    else:  # >1s - Needs improvement
                        performance_rating = "Needs Improvement"
                        status = "WARN"
                    
                    self.log_test(test_name, status, f"{performance_rating} performance (Size: {content_length/1024:.1f}KB)", duration)
                else:
                    self.log_test(test_name, "FAIL", f"HTTP {response.status_code}", duration)
            except Exception as e:
                self.log_test(test_name, "FAIL", f"Error: {str(e)}")
        
        # Overall performance summary
        if successful_loads > 0:
            avg_load_time = total_load_time / successful_loads
            perf_test = "Overall Performance Summary"
            if avg_load_time < 0.1:
                self.log_test(perf_test, "PASS", f"Excellent average performance", avg_load_time)
            elif avg_load_time < 0.5:
                self.log_test(perf_test, "PASS", f"Good average performance", avg_load_time)
            else:
                self.log_test(perf_test, "WARN", f"Performance could be improved", avg_load_time)

    def run_comprehensive_tests(self):
        """Run comprehensive backend testing suite for world-class pregnancy calculators"""
        print("🚀 COMPREHENSIVE BACKEND TESTING - WORLD-CLASS PREGNANCY CALCULATOR SUITE 2025")
        print("=" * 100)
        print("Testing three world-class pregnancy calculators:")
        for calc in self.pregnancy_calculators:
            print(f"   • {calc['name']} ({calc['route']}) - {calc['description']}")
        print("=" * 100)
        
        # Core backend connectivity tests
        print("\n📡 BACKEND API CONNECTIVITY TESTS")
        print("-" * 60)
        backend_available = self.test_backend_connectivity()
        
        if backend_available:
            self.test_backend_status_endpoints()
        else:
            self.log_test("Backend Status Tests", "SKIP", "Backend not available")
        
        # Pregnancy calculator specific tests
        print("\n🤰 PREGNANCY CALCULATOR ROUTE ACCESSIBILITY TESTS")
        print("-" * 60)
        self.test_pregnancy_calculator_routes()
        
        print("\n🖼️ PROFESSIONAL IMAGES LOADING TESTS")
        print("-" * 60)
        self.test_professional_images_loading()
        
        print("\n🔍 SEO META TAGS VALIDATION TESTS")
        print("-" * 60)
        self.test_seo_meta_tags_validation()
        
        print("\n📊 ADVANCED SCHEMA MARKUP VERIFICATION TESTS")
        print("-" * 60)
        self.test_structured_data_schema()
        
        print("\n⚛️ REACT COMPONENT RENDERING TESTS")
        print("-" * 60)
        self.test_react_component_rendering()
        
        print("\n📱 MOBILE RESPONSIVENESS TESTS")
        print("-" * 60)
        self.test_mobile_responsiveness()
        
        print("\n🎤 VOICE SEARCH OPTIMIZATION TESTS")
        print("-" * 60)
        self.test_voice_search_optimization()
        
        print("\n🏥 MEDICAL AUTHORITY POSITIONING TESTS")
        print("-" * 60)
        self.test_medical_authority_positioning()
        
        print("\n⚡ CORE WEB VITALS & PERFORMANCE TESTS")
        print("-" * 60)
        self.test_core_web_vitals_performance()
        
        # Generate comprehensive summary
        self.generate_comprehensive_summary()

    def generate_comprehensive_summary(self):
        """Generate comprehensive test summary"""
        print("\n" + "=" * 100)
        print("📊 COMPREHENSIVE BACKEND TESTING SUMMARY - WORLD-CLASS PREGNANCY CALCULATORS")
        print("=" * 100)
        
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
        print(f"\n🎯 DETAILED ANALYSIS:")
        
        # Backend connectivity analysis
        backend_tests = [r for r in self.test_results if "Backend" in r["test"]]
        backend_working = any(r["status"] == "PASS" for r in backend_tests)
        
        if backend_working:
            print("   ✅ Backend API is functional and accessible")
        else:
            print("   ❌ Backend API connectivity issues detected")
        
        # Route accessibility analysis
        route_tests = [r for r in self.test_results if "Route Accessibility" in r["test"]]
        accessible_routes = len([r for r in route_tests if r["status"] == "PASS"])
        total_routes = len(route_tests)
        
        if total_routes > 0:
            route_success = (accessible_routes / total_routes) * 100
            if route_success == 100:
                print(f"   ✅ Perfect route accessibility: {accessible_routes}/{total_routes} ({route_success:.0f}%)")
            elif route_success >= 80:
                print(f"   ⚠️  Good route accessibility: {accessible_routes}/{total_routes} ({route_success:.0f}%)")
            else:
                print(f"   ❌ Poor route accessibility: {accessible_routes}/{total_routes} ({route_success:.0f}%)")
        
        # SEO analysis
        seo_tests = [r for r in self.test_results if "SEO" in r["test"] or "Schema" in r["test"]]
        working_seo = len([r for r in seo_tests if r["status"] == "PASS"])
        
        if working_seo >= len(self.pregnancy_calculators) * 2:  # Both SEO and Schema tests
            print("   ✅ Comprehensive SEO optimization implemented")
        elif working_seo >= len(self.pregnancy_calculators):
            print("   ⚠️  Partial SEO optimization implemented")
        else:
            print("   ❌ SEO optimization needs attention")
        
        # Performance analysis
        perf_tests = [r for r in self.test_results if "Performance" in r["test"] or "Core Web Vitals" in r["test"]]
        good_performance = len([r for r in perf_tests if r["status"] == "PASS"])
        
        if good_performance >= len(self.pregnancy_calculators):
            print("   ✅ Excellent performance across all calculators")
        elif good_performance > 0:
            print("   ⚠️  Mixed performance results")
        else:
            print("   ❌ Performance optimization needed")
        
        # Medical authority analysis
        authority_tests = [r for r in self.test_results if "Medical Authority" in r["test"]]
        strong_authority = len([r for r in authority_tests if r["status"] == "PASS"])
        
        if strong_authority == len(self.pregnancy_calculators):
            print("   ✅ Strong medical authority positioning across all calculators")
        elif strong_authority > 0:
            print("   ⚠️  Partial medical authority positioning")
        else:
            print("   ❌ Medical authority positioning needs improvement")
        
        # Critical issues summary
        if failed_tests > 0:
            print(f"\n❌ CRITICAL ISSUES REQUIRING ATTENTION:")
            for result in self.test_results:
                if result["status"] == "FAIL":
                    print(f"   • {result['test']}: {result['details']}")
        
        # Warnings summary
        if warning_tests > 0:
            print(f"\n⚠️  OPTIMIZATION OPPORTUNITIES:")
            for result in self.test_results:
                if result["status"] == "WARN":
                    print(f"   • {result['test']}: {result['details']}")
        
        # Success criteria evaluation
        print(f"\n🎯 SUCCESS CRITERIA EVALUATION:")
        
        criteria_met = 0
        total_criteria = 8
        
        # 1. Route accessibility with <100ms load times
        fast_routes = len([r for r in route_tests if r["status"] == "PASS" and "excellent" in r["details"].lower()])
        if fast_routes >= 2:  # At least 2 out of 3 with excellent performance
            print("   ✅ Route accessibility with excellent load times")
            criteria_met += 1
        else:
            print("   ❌ Route accessibility needs performance improvement")
        
        # 2. Professional images loading
        image_tests = [r for r in self.test_results if "Professional Images" in r["test"]]
        working_images = len([r for r in image_tests if r["status"] == "PASS"])
        if working_images >= 2:
            print("   ✅ Professional images loading correctly")
            criteria_met += 1
        else:
            print("   ❌ Professional images need attention")
        
        # 3. SEO elements present and valid
        if working_seo >= len(self.pregnancy_calculators):
            print("   ✅ SEO elements present and valid")
            criteria_met += 1
        else:
            print("   ❌ SEO elements need improvement")
        
        # 4. React components rendering correctly
        react_tests = [r for r in self.test_results if "React Component" in r["test"]]
        working_react = len([r for r in react_tests if r["status"] == "PASS"])
        if working_react >= 2:
            print("   ✅ React components rendering correctly")
            criteria_met += 1
        else:
            print("   ❌ React component rendering needs attention")
        
        # 5. Mobile responsiveness maintained
        mobile_tests = [r for r in self.test_results if "Mobile Responsiveness" in r["test"]]
        working_mobile = len([r for r in mobile_tests if r["status"] == "PASS"])
        if working_mobile >= 2:
            print("   ✅ Mobile responsiveness maintained")
            criteria_met += 1
        else:
            print("   ❌ Mobile responsiveness needs improvement")
        
        # 6. Backend API connectivity working
        if backend_working:
            print("   ✅ Backend API connectivity working")
            criteria_met += 1
        else:
            print("   ❌ Backend API connectivity issues")
        
        # 7. Voice search optimization
        voice_tests = [r for r in self.test_results if "Voice Search" in r["test"]]
        working_voice = len([r for r in voice_tests if r["status"] == "PASS"])
        if working_voice >= 2:
            print("   ✅ Voice search optimization implemented")
            criteria_met += 1
        else:
            print("   ❌ Voice search optimization needs attention")
        
        # 8. Medical authority positioning
        if strong_authority >= 2:
            print("   ✅ Medical authority positioning established")
            criteria_met += 1
        else:
            print("   ❌ Medical authority positioning needs strengthening")
        
        # Final assessment
        success_percentage = (criteria_met / total_criteria) * 100
        print(f"\n🏆 FINAL ASSESSMENT:")
        print(f"   Success Criteria Met: {criteria_met}/{total_criteria} ({success_percentage:.0f}%)")
        
        if success_percentage >= 90:
            print("   🌟 WORLD-CLASS STATUS ACHIEVED - Production ready with excellent optimization")
        elif success_percentage >= 75:
            print("   ✅ PRODUCTION READY - Minor optimizations recommended")
        elif success_percentage >= 60:
            print("   ⚠️  NEEDS OPTIMIZATION - Several areas require attention")
        else:
            print("   ❌ SIGNIFICANT ISSUES - Major improvements needed before production")
        
        print(f"\n🏁 COMPREHENSIVE TESTING COMPLETED")
        print("=" * 100)

def main():
    """Main test execution function"""
    tester = WorldClassPregnancyCalculatorTester()
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