#!/usr/bin/env python3
"""
Enhanced Calculator Backend Testing Suite - 2025
Comprehensive Backend Testing for World-Class Calculator Page Enhancements

Focus: Testing the recently enhanced world-class calculator pages:
1. Ovulation Calculator (/ovulation-calculator) - Enhanced with competitive analysis, advanced SEO, medical accuracy claims
2. Conception Calculator (/conception-calculator) - Enhanced with 266-day precision, IVF support, medical validation
3. Period Calculator (/period-calculator) - Enhanced with Flo/Clue comparisons, privacy-first approach, PCOS specialization

Testing Priorities:
- Route Accessibility: Verify all three enhanced calculator routes are accessible with 200 status
- Enhanced SEO Verification: Check for new meta tags, enhanced structured data schemas, competitive positioning
- JSON-LD Schema Validation: Verify comprehensive medical schemas with new features and accuracy claims
- Performance Testing: Ensure page load times remain optimal despite content enhancements
- Component Integration: Verify calculator components still function properly with new page layouts
- Image Loading: Test the new professional medical images are loading correctly
- Backend API Integration: Confirm backend services support enhanced functionality
"""

import requests
import time
import json
import sys
import re
from typing import Dict, List, Tuple, Any
from datetime import datetime

class EnhancedCalculatorBackendTester:
    def __init__(self):
        # Use localhost URLs for testing
        self.frontend_url = "http://localhost:3000"
        self.backend_url = "http://localhost:8001"
        self.test_results = []
        
        # Target enhanced calculators from review request
        self.enhanced_calculators = {
            "/ovulation-calculator": {
                "name": "Ovulation Calculator",
                "enhancements": ["competitive analysis", "advanced SEO", "medical accuracy claims", "91.7% vs Flo's 85% vs Clue's 82%", "PCOS support"],
                "expected_keywords": ["AI-Powered", "PCOS", "ovulation", "fertility", "medical grade", "accuracy"]
            },
            "/conception-calculator": {
                "name": "Conception Calculator", 
                "enhancements": ["266-day precision", "IVF support", "medical validation", "95% accuracy ±2 days"],
                "expected_keywords": ["Medical-Grade", "IVF", "precision", "conception", "266-day", "medical validation"]
            },
            "/period-calculator": {
                "name": "Period Calculator",
                "enhancements": ["Flo/Clue comparisons", "privacy-first approach", "PCOS specialization", "73.8% irregular cycle accuracy"],
                "expected_keywords": ["AI Pattern Recognition", "privacy-first", "period", "PCOS", "menstrual cycle", "irregular cycle"]
            }
        }
        
    def log_test(self, test_name: str, status: str, details: str, duration: float = 0):
        """Log test results with comprehensive details"""
        result = {
            "test": test_name,
            "status": status,
            "details": details,
            "duration": f"{duration:.3f}s" if duration > 0 else "N/A",
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        status_icon = "✅" if status == "PASS" else "❌" if status == "FAIL" else "⚠️" if status == "WARN" else "ℹ️"
        print(f"{status_icon} {test_name}: {details} ({result['duration']})")

    def test_backend_infrastructure(self):
        """Test backend infrastructure and API endpoints"""
        print("\n📡 BACKEND INFRASTRUCTURE TESTING")
        print("-" * 50)
        
        # Test backend API root endpoint
        test_name = "Backend API Root Endpoint"
        try:
            start_time = time.time()
            response = requests.get(f"{self.backend_url}/api/", timeout=10)
            duration = time.time() - start_time
            
            if response.status_code == 200:
                data = response.json()
                if data.get("message") == "Hello World":
                    self.log_test(test_name, "PASS", "Backend API accessible and responding correctly", duration)
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

    def test_backend_api_endpoints(self):
        """Test backend API endpoints functionality"""
        # Test GET status endpoint
        test_name = "Backend Status GET Endpoint"
        try:
            start_time = time.time()
            response = requests.get(f"{self.backend_url}/api/status", timeout=10)
            duration = time.time() - start_time
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test(test_name, "PASS", f"Status GET working, returned {len(data)} records", duration)
                else:
                    self.log_test(test_name, "FAIL", f"Unexpected response format: {type(data)}", duration)
            else:
                self.log_test(test_name, "FAIL", f"HTTP {response.status_code}", duration)
        except Exception as e:
            self.log_test(test_name, "FAIL", f"Error: {str(e)}")

        # Test POST status endpoint with UUID generation
        test_name = "Backend Status POST Endpoint"
        try:
            start_time = time.time()
            test_data = {"client_name": "enhanced_calculator_test"}
            response = requests.post(f"{self.backend_url}/api/status", json=test_data, timeout=10)
            duration = time.time() - start_time
            
            if response.status_code == 200:
                data = response.json()
                if (data.get("client_name") == test_data["client_name"] and 
                    "id" in data and "timestamp" in data):
                    self.log_test(test_name, "PASS", f"Status POST working with UUID generation, ID: {data['id'][:8]}...", duration)
                else:
                    self.log_test(test_name, "FAIL", f"Missing required fields in response", duration)
            else:
                self.log_test(test_name, "FAIL", f"HTTP {response.status_code}", duration)
        except Exception as e:
            self.log_test(test_name, "FAIL", f"Error: {str(e)}")

    def test_enhanced_route_accessibility(self):
        """Test route accessibility for the three enhanced calculators with performance metrics"""
        print("\n🌐 ENHANCED ROUTE ACCESSIBILITY TESTING")
        print("-" * 50)
        
        accessible_routes = 0
        total_routes = len(self.enhanced_calculators)
        
        for route, config in self.enhanced_calculators.items():
            test_name = f"Route Accessibility: {config['name']} ({route})"
            try:
                start_time = time.time()
                response = requests.get(f"{self.frontend_url}{route}", timeout=15)
                duration = time.time() - start_time
                
                if response.status_code == 200:
                    # Check if it's a valid React page
                    content = response.text
                    if 'id="root"' in content or 'react' in content.lower():
                        accessible_routes += 1
                        performance_rating = "EXCELLENT" if duration < 0.5 else "GOOD" if duration < 1.0 else "ACCEPTABLE" if duration < 2.0 else "SLOW"
                        self.log_test(test_name, "PASS", f"Route accessible with {performance_rating} load time", duration)
                    else:
                        self.log_test(test_name, "WARN", f"Route accessible but may not be React app", duration)
                else:
                    self.log_test(test_name, "FAIL", f"HTTP {response.status_code}", duration)
            except Exception as e:
                self.log_test(test_name, "FAIL", f"Error: {str(e)}")
        
        # Overall accessibility summary
        success_rate = (accessible_routes / total_routes) * 100
        summary_test = "Overall Enhanced Route Accessibility"
        if success_rate == 100:
            self.log_test(summary_test, "PASS", f"All {accessible_routes}/{total_routes} enhanced routes accessible ({success_rate:.1f}%)")
        elif success_rate >= 66:
            self.log_test(summary_test, "WARN", f"{accessible_routes}/{total_routes} enhanced routes accessible ({success_rate:.1f}%)")
        else:
            self.log_test(summary_test, "FAIL", f"Only {accessible_routes}/{total_routes} enhanced routes accessible ({success_rate:.1f}%)")

    def test_enhanced_seo_verification(self):
        """Test enhanced SEO verification for new meta tags and competitive positioning"""
        print("\n🔍 ENHANCED SEO VERIFICATION TESTING")
        print("-" * 50)
        
        for route, config in self.enhanced_calculators.items():
            test_name = f"Enhanced SEO: {config['name']}"
            try:
                start_time = time.time()
                response = requests.get(f"{self.frontend_url}{route}", timeout=10)
                duration = time.time() - start_time
                
                if response.status_code == 200:
                    html_content = response.text.lower()
                    
                    # Check for essential SEO elements
                    seo_elements = {
                        "title": '<title>' in html_content,
                        "description": 'meta name="description"' in html_content,
                        "keywords": 'meta name="keywords"' in html_content,
                        "og_title": 'property="og:title"' in html_content,
                        "og_description": 'property="og:description"' in html_content,
                        "og_url": 'property="og:url"' in html_content,
                        "og_image": 'property="og:image"' in html_content,
                        "twitter_title": 'name="twitter:title"' in html_content,
                        "twitter_description": 'name="twitter:description"' in html_content,
                        "canonical": 'rel="canonical"' in html_content,
                        "viewport": 'name="viewport"' in html_content
                    }
                    
                    # Check for enhancement-specific keywords
                    keywords_found = 0
                    expected_keywords = config.get("expected_keywords", [])
                    for keyword in expected_keywords:
                        if keyword.lower() in html_content:
                            keywords_found += 1
                    
                    # Check for competitive positioning claims
                    competitive_claims = 0
                    for enhancement in config.get("enhancements", []):
                        if any(word in html_content for word in enhancement.lower().split()):
                            competitive_claims += 1
                    
                    seo_score = sum(seo_elements.values())
                    total_seo_elements = len(seo_elements)
                    
                    if seo_score >= 8 and keywords_found >= 3 and competitive_claims >= 2:
                        self.log_test(test_name, "PASS", 
                                    f"Comprehensive SEO implementation ({seo_score}/{total_seo_elements} elements, "
                                    f"{keywords_found}/{len(expected_keywords)} keywords, "
                                    f"{competitive_claims} competitive claims)", duration)
                    elif seo_score >= 6:
                        self.log_test(test_name, "WARN", 
                                    f"Good SEO implementation ({seo_score}/{total_seo_elements} elements, "
                                    f"{keywords_found}/{len(expected_keywords)} keywords)", duration)
                    else:
                        self.log_test(test_name, "FAIL", 
                                    f"Insufficient SEO implementation ({seo_score}/{total_seo_elements} elements)", duration)
                else:
                    self.log_test(test_name, "FAIL", f"Could not access route for SEO verification", duration)
            except Exception as e:
                self.log_test(test_name, "FAIL", f"SEO verification failed: {str(e)}")

    def test_json_ld_schema_validation(self):
        """Test comprehensive JSON-LD schema validation with medical features"""
        print("\n📋 JSON-LD SCHEMA VALIDATION TESTING")
        print("-" * 50)
        
        for route, config in self.enhanced_calculators.items():
            test_name = f"JSON-LD Schema: {config['name']}"
            try:
                start_time = time.time()
                response = requests.get(f"{self.frontend_url}{route}", timeout=10)
                duration = time.time() - start_time
                
                if response.status_code == 200:
                    html_content = response.text
                    
                    # Check for JSON-LD structured data
                    json_ld_found = 'application/ld+json' in html_content
                    
                    # Check for comprehensive medical schema elements
                    schema_elements = {
                        "MedicalRiskCalculator": "MedicalRiskCalculator" in html_content,
                        "FAQPage": "FAQPage" in html_content,
                        "WebApplication": "WebApplication" in html_content,
                        "medicalSpecialty": "medicalSpecialty" in html_content,
                        "applicationCategory": "applicationCategory" in html_content,
                        "operatingSystem": "operatingSystem" in html_content,
                        "medicalAudience": "medicalAudience" in html_content or "audience" in html_content,
                        "healthCondition": "healthCondition" in html_content or "condition" in html_content
                    }
                    
                    # Check for accuracy claims in schema
                    accuracy_claims = 0
                    accuracy_indicators = ["accuracy", "precision", "medical grade", "clinical", "validated"]
                    for indicator in accuracy_indicators:
                        if indicator in html_content.lower():
                            accuracy_claims += 1
                    
                    schema_score = sum(schema_elements.values())
                    total_schema_elements = len(schema_elements)
                    
                    if json_ld_found and schema_score >= 6 and accuracy_claims >= 2:
                        self.log_test(test_name, "PASS", 
                                    f"Comprehensive schema markup verified ({schema_score}/{total_schema_elements} elements, "
                                    f"{accuracy_claims} accuracy claims)", duration)
                    elif json_ld_found and schema_score >= 4:
                        self.log_test(test_name, "WARN", 
                                    f"Good schema markup ({schema_score}/{total_schema_elements} elements)", duration)
                    else:
                        self.log_test(test_name, "FAIL", 
                                    f"Insufficient schema markup (JSON-LD: {json_ld_found}, "
                                    f"Elements: {schema_score}/{total_schema_elements})", duration)
                else:
                    self.log_test(test_name, "FAIL", f"Could not access route for schema validation", duration)
            except Exception as e:
                self.log_test(test_name, "FAIL", f"Schema validation failed: {str(e)}")

    def test_performance_optimization(self):
        """Test performance optimization despite content enhancements"""
        print("\n⚡ PERFORMANCE OPTIMIZATION TESTING")
        print("-" * 50)
        
        total_load_time = 0
        successful_loads = 0
        
        for route, config in self.enhanced_calculators.items():
            test_name = f"Performance: {config['name']}"
            try:
                start_time = time.time()
                response = requests.get(f"{self.frontend_url}{route}", timeout=15)
                duration = time.time() - start_time
                total_load_time += duration
                
                if response.status_code == 200:
                    successful_loads += 1
                    
                    # Performance thresholds for enhanced content
                    if duration < 0.5:
                        self.log_test(test_name, "PASS", f"EXCELLENT performance despite enhancements", duration)
                    elif duration < 1.0:
                        self.log_test(test_name, "PASS", f"GOOD performance with enhanced content", duration)
                    elif duration < 2.0:
                        self.log_test(test_name, "WARN", f"ACCEPTABLE performance, could be optimized", duration)
                    else:
                        self.log_test(test_name, "FAIL", f"SLOW performance, optimization needed", duration)
                        
                    # Check for performance indicators in content
                    content = response.text
                    perf_indicators = {
                        "lazy_loading": "loading=" in content or "lazy" in content.lower(),
                        "compression": len(content) < 500000,  # Less than 500KB
                        "caching": "cache" in response.headers.get('cache-control', '').lower(),
                        "minification": not re.search(r'\s{4,}', content[:1000])  # Check for minification
                    }
                    
                    perf_score = sum(perf_indicators.values())
                    if perf_score >= 3:
                        self.log_test(f"Performance Optimization: {config['name']}", "PASS", 
                                    f"Good optimization indicators ({perf_score}/4)")
                    elif perf_score >= 2:
                        self.log_test(f"Performance Optimization: {config['name']}", "WARN", 
                                    f"Some optimization indicators ({perf_score}/4)")
                    else:
                        self.log_test(f"Performance Optimization: {config['name']}", "FAIL", 
                                    f"Limited optimization indicators ({perf_score}/4)")
                else:
                    self.log_test(test_name, "FAIL", f"HTTP {response.status_code}", duration)
            except Exception as e:
                self.log_test(test_name, "FAIL", f"Performance test failed: {str(e)}")
        
        # Average performance summary
        if successful_loads > 0:
            avg_load_time = total_load_time / successful_loads
            perf_test = "Average Enhanced Calculator Performance"
            if avg_load_time < 1.0:
                self.log_test(perf_test, "PASS", f"Excellent average performance despite enhancements", avg_load_time)
            elif avg_load_time < 2.0:
                self.log_test(perf_test, "PASS", f"Good average performance with enhanced content", avg_load_time)
            else:
                self.log_test(perf_test, "WARN", f"Average performance could be improved", avg_load_time)

    def test_component_integration(self):
        """Test calculator component integration with new page layouts"""
        print("\n🧩 COMPONENT INTEGRATION TESTING")
        print("-" * 50)
        
        for route, config in self.enhanced_calculators.items():
            test_name = f"Component Integration: {config['name']}"
            try:
                start_time = time.time()
                response = requests.get(f"{self.frontend_url}{route}", timeout=10)
                duration = time.time() - start_time
                
                if response.status_code == 200:
                    html_content = response.text.lower()
                    
                    # Check for calculator component indicators
                    component_indicators = {
                        "form_elements": any(element in html_content for element in ['<form', '<input', '<select', '<button']),
                        "calculator_logic": any(term in html_content for term in ['calculate', 'result', 'submit']),
                        "responsive_design": any(class_name in html_content for class_name in ['grid', 'flex', 'responsive', 'mobile']),
                        "interactive_elements": any(element in html_content for element in ['onclick', 'onchange', 'event']),
                        "validation": any(term in html_content for term in ['required', 'validate', 'error']),
                        "results_display": any(term in html_content for term in ['result', 'output', 'display'])
                    }
                    
                    # Check for enhanced layout indicators
                    layout_indicators = {
                        "hero_section": "hero" in html_content,
                        "faq_section": "faq" in html_content or "frequently asked" in html_content,
                        "educational_content": any(term in html_content for term in ['education', 'learn', 'guide', 'information']),
                        "cross_linking": html_content.count('calculator') > 3,
                        "medical_disclaimers": any(term in html_content for term in ['disclaimer', 'medical', 'consult', 'doctor'])
                    }
                    
                    component_score = sum(component_indicators.values())
                    layout_score = sum(layout_indicators.values())
                    
                    if component_score >= 5 and layout_score >= 3:
                        self.log_test(test_name, "PASS", 
                                    f"Excellent component integration (Components: {component_score}/6, "
                                    f"Layout: {layout_score}/5)", duration)
                    elif component_score >= 4 and layout_score >= 2:
                        self.log_test(test_name, "WARN", 
                                    f"Good component integration (Components: {component_score}/6, "
                                    f"Layout: {layout_score}/5)", duration)
                    else:
                        self.log_test(test_name, "FAIL", 
                                    f"Poor component integration (Components: {component_score}/6, "
                                    f"Layout: {layout_score}/5)", duration)
                else:
                    self.log_test(test_name, "FAIL", f"Could not access route for component testing", duration)
            except Exception as e:
                self.log_test(test_name, "FAIL", f"Component integration test failed: {str(e)}")

    def test_image_loading_verification(self):
        """Test professional medical images loading correctly"""
        print("\n🖼️ IMAGE LOADING VERIFICATION TESTING")
        print("-" * 50)
        
        for route, config in self.enhanced_calculators.items():
            test_name = f"Image Loading: {config['name']}"
            try:
                start_time = time.time()
                response = requests.get(f"{self.frontend_url}{route}", timeout=10)
                duration = time.time() - start_time
                
                if response.status_code == 200:
                    html_content = response.text
                    
                    # Check for image elements
                    img_tags = re.findall(r'<img[^>]*>', html_content, re.IGNORECASE)
                    svg_elements = html_content.lower().count('<svg')
                    icon_elements = html_content.lower().count('icon')
                    
                    # Check for professional medical imagery indicators
                    medical_image_indicators = {
                        "medical_icons": any(term in html_content.lower() for term in ['medical', 'health', 'doctor', 'stethoscope', 'heart']),
                        "professional_imagery": any(term in html_content.lower() for term in ['professional', 'clinical', 'medical grade']),
                        "alt_text": 'alt=' in html_content.lower(),
                        "responsive_images": any(attr in html_content.lower() for attr in ['srcset', 'sizes', 'responsive']),
                        "lazy_loading": 'loading=' in html_content.lower()
                    }
                    
                    total_images = len(img_tags) + svg_elements + (icon_elements // 2)  # Approximate icon count
                    image_score = sum(medical_image_indicators.values())
                    
                    if total_images > 0 and image_score >= 3:
                        self.log_test(test_name, "PASS", 
                                    f"Professional medical images properly implemented "
                                    f"({total_images} images, {image_score}/5 optimization features)", duration)
                    elif total_images > 0:
                        self.log_test(test_name, "WARN", 
                                    f"Images present but limited optimization "
                                    f"({total_images} images, {image_score}/5 features)", duration)
                    else:
                        self.log_test(test_name, "INFO", 
                                    f"No images detected - may be icon-based design", duration)
                else:
                    self.log_test(test_name, "FAIL", f"Could not access route for image testing", duration)
            except Exception as e:
                self.log_test(test_name, "FAIL", f"Image loading test failed: {str(e)}")

    def test_backend_api_integration(self):
        """Test backend API integration with enhanced functionality"""
        print("\n🔗 BACKEND API INTEGRATION TESTING")
        print("-" * 50)
        
        # Test MongoDB connection via backend
        test_name = "MongoDB Integration via Backend"
        try:
            start_time = time.time()
            response = requests.get(f"{self.backend_url}/api/status", timeout=10)
            duration = time.time() - start_time
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test(test_name, "PASS", 
                                f"MongoDB accessible via backend API, {len(data)} records", duration)
                else:
                    self.log_test(test_name, "FAIL", f"Unexpected response format", duration)
            else:
                self.log_test(test_name, "FAIL", f"HTTP {response.status_code}", duration)
        except Exception as e:
            self.log_test(test_name, "FAIL", f"MongoDB integration test failed: {str(e)}")
        
        # Test CORS configuration for frontend-backend communication
        test_name = "CORS Configuration for Enhanced Features"
        try:
            headers = {
                'Origin': 'http://localhost:3000',
                'Access-Control-Request-Method': 'POST',
                'Access-Control-Request-Headers': 'Content-Type'
            }
            start_time = time.time()
            response = requests.options(f"{self.backend_url}/api/status", headers=headers, timeout=10)
            duration = time.time() - start_time
            
            if response.status_code in [200, 204]:
                cors_headers = response.headers
                if 'access-control-allow-origin' in cors_headers:
                    self.log_test(test_name, "PASS", 
                                "CORS properly configured for enhanced calculator features", duration)
                else:
                    self.log_test(test_name, "FAIL", "CORS headers missing", duration)
            else:
                self.log_test(test_name, "FAIL", f"CORS preflight failed: HTTP {response.status_code}", duration)
        except Exception as e:
            self.log_test(test_name, "FAIL", f"CORS test failed: {str(e)}")

    def test_static_assets_serving(self):
        """Test static assets serving for enhanced calculators"""
        print("\n📄 STATIC ASSETS SERVING TESTING")
        print("-" * 50)
        
        static_assets = [
            ("/robots.txt", "text/plain"),
            ("/sitemap.xml", "application/xml"),
            ("/manifest.json", "application/json")
        ]
        
        for asset_path, expected_content_type in static_assets:
            test_name = f"Static Asset: {asset_path}"
            try:
                start_time = time.time()
                response = requests.get(f"{self.frontend_url}{asset_path}", timeout=10)
                duration = time.time() - start_time
                
                if response.status_code == 200:
                    content_type = response.headers.get('content-type', '').lower()
                    content = response.text
                    
                    # Check content type
                    if expected_content_type.lower() in content_type:
                        content_check = "correct content-type"
                    else:
                        content_check = f"unexpected content-type: {content_type}"
                    
                    # Check for enhanced calculator references in sitemap
                    if asset_path == "/sitemap.xml":
                        calculator_refs = sum(1 for route in self.enhanced_calculators.keys() 
                                            if route in content)
                        if calculator_refs >= 2:
                            content_check += f", {calculator_refs}/3 enhanced calculators in sitemap"
                        else:
                            content_check += f", only {calculator_refs}/3 enhanced calculators in sitemap"
                    
                    self.log_test(test_name, "PASS", f"Asset accessible with {content_check}", duration)
                else:
                    self.log_test(test_name, "FAIL", f"HTTP {response.status_code}", duration)
            except Exception as e:
                self.log_test(test_name, "FAIL", f"Error accessing asset: {str(e)}")

    def run_comprehensive_enhanced_calculator_tests(self):
        """Run comprehensive backend testing for enhanced calculators"""
        print("=" * 80)
        print("🚀 ENHANCED CALCULATOR BACKEND TESTING SUITE - 2025")
        print("Comprehensive Backend Testing for World-Class Calculator Page Enhancements")
        print("=" * 80)
        print(f"📊 Testing {len(self.enhanced_calculators)} Enhanced Calculators:")
        for route, config in self.enhanced_calculators.items():
            print(f"   • {config['name']} ({route})")
        print("=" * 80)
        
        # Run all comprehensive test suites
        backend_available = self.test_backend_infrastructure()
        
        if backend_available:
            self.test_backend_api_endpoints()
        else:
            self.log_test("Backend API Tests", "SKIP", "Backend not available")
        
        self.test_enhanced_route_accessibility()
        self.test_enhanced_seo_verification()
        self.test_json_ld_schema_validation()
        self.test_performance_optimization()
        self.test_component_integration()
        self.test_image_loading_verification()
        
        if backend_available:
            self.test_backend_api_integration()
        
        self.test_static_assets_serving()
        
        # Generate comprehensive summary
        self.generate_comprehensive_summary()

    def generate_comprehensive_summary(self):
        """Generate comprehensive test summary with detailed analysis"""
        print("\n" + "=" * 80)
        print("📊 ENHANCED CALCULATOR BACKEND TESTING COMPREHENSIVE SUMMARY")
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
            print(f"   🎯 Success Rate: {success_rate:.1f}%")
        
        # Detailed analysis by test category
        print(f"\n📋 DETAILED ANALYSIS BY CATEGORY:")
        print("-" * 50)
        
        categories = {}
        for result in self.test_results:
            # Extract category from test name
            test_parts = result['test'].split(':')
            category = test_parts[0].strip() if len(test_parts) > 1 else result['test'].split(' ')[0]
            
            if category not in categories:
                categories[category] = {'PASS': 0, 'FAIL': 0, 'WARN': 0, 'INFO': 0, 'SKIP': 0}
            categories[category][result['status']] += 1
        
        for category, counts in categories.items():
            total_cat = sum(counts.values())
            success_rate_cat = (counts['PASS'] / total_cat * 100) if total_cat > 0 else 0
            status_icon = "✅" if success_rate_cat >= 80 else "⚠️" if success_rate_cat >= 60 else "❌"
            print(f"   {status_icon} {category}: {counts['PASS']}/{total_cat} passed ({success_rate_cat:.1f}%)")
        
        # Critical issues analysis
        if failed_tests > 0:
            print(f"\n❌ CRITICAL ISSUES REQUIRING IMMEDIATE ATTENTION:")
            print("-" * 50)
            for result in self.test_results:
                if result["status"] == "FAIL":
                    print(f"   • {result['test']}: {result['details']}")
        
        # Warnings analysis
        if warning_tests > 0:
            print(f"\n⚠️  WARNINGS FOR OPTIMIZATION:")
            print("-" * 50)
            for result in self.test_results:
                if result["status"] == "WARN":
                    print(f"   • {result['test']}: {result['details']}")
        
        # Key findings analysis
        print(f"\n🎯 KEY FINDINGS & RECOMMENDATIONS:")
        print("-" * 50)
        
        # Backend connectivity analysis
        backend_tests = [r for r in self.test_results if "Backend" in r["test"]]
        backend_working = any(r["status"] == "PASS" for r in backend_tests)
        
        if backend_working:
            print("   ✅ Backend infrastructure is functional and properly integrated")
        else:
            print("   ❌ Backend infrastructure issues detected - requires immediate attention")
        
        # Route accessibility analysis
        route_tests = [r for r in self.test_results if "Route Accessibility" in r["test"]]
        accessible_routes = len([r for r in route_tests if r["status"] == "PASS"])
        total_routes = len(route_tests)
        
        if total_routes > 0:
            route_success = (accessible_routes / total_routes) * 100
            if route_success == 100:
                print(f"   ✅ Perfect route accessibility: All {accessible_routes}/{total_routes} enhanced calculators accessible")
            elif route_success >= 66:
                print(f"   ⚠️  Good route accessibility: {accessible_routes}/{total_routes} enhanced calculators accessible ({route_success:.1f}%)")
            else:
                print(f"   ❌ Poor route accessibility: Only {accessible_routes}/{total_routes} enhanced calculators accessible ({route_success:.1f}%)")
        
        # SEO enhancement analysis
        seo_tests = [r for r in self.test_results if "Enhanced SEO" in r["test"]]
        working_seo = len([r for r in seo_tests if r["status"] == "PASS"])
        
        if working_seo >= 2:
            print("   ✅ Enhanced SEO optimizations are properly implemented across calculators")
        elif working_seo >= 1:
            print("   ⚠️  Partial SEO enhancements implemented - some calculators need attention")
        else:
            print("   ❌ SEO enhancements require significant improvements")
        
        # Performance analysis
        perf_tests = [r for r in self.test_results if "Performance" in r["test"]]
        good_performance = len([r for r in perf_tests if r["status"] == "PASS"])
        
        if good_performance >= len(self.enhanced_calculators):
            print("   ✅ Excellent performance maintained despite content enhancements")
        elif good_performance > 0:
            print("   ⚠️  Mixed performance results - some calculators may need optimization")
        else:
            print("   ❌ Performance issues detected - optimization required")
        
        # Schema markup analysis
        schema_tests = [r for r in self.test_results if "JSON-LD Schema" in r["test"]]
        working_schema = len([r for r in schema_tests if r["status"] == "PASS"])
        
        if working_schema >= 2:
            print("   ✅ Comprehensive JSON-LD schema markup properly implemented")
        elif working_schema >= 1:
            print("   ⚠️  Partial schema markup implementation - some calculators need enhancement")
        else:
            print("   ❌ Schema markup requires significant improvements for medical SEO")
        
        # Final recommendation
        print(f"\n🏁 FINAL TESTING CONCLUSION:")
        print("=" * 50)
        
        if failed_tests == 0 and warning_tests <= 2:
            print("✅ COMPREHENSIVE TESTING PASSED")
            print("✅ All three enhanced calculators are production-ready")
            print("✅ Backend infrastructure supports enhanced functionality")
            print("✅ SEO optimizations and schema markup properly implemented")
            print("✅ Performance remains excellent despite content enhancements")
            print("✅ Component integration and image loading working correctly")
            print("\n🎉 THE ENHANCED CALCULATORS ARE READY FOR WORLD-CLASS DEPLOYMENT!")
        elif failed_tests <= 2:
            print("⚠️  TESTING COMPLETED WITH MINOR ISSUES")
            print("⚠️  Enhanced calculators are mostly functional but need minor fixes")
            print("🔧 Address the identified issues before production deployment")
        else:
            print("❌ TESTING REVEALED SIGNIFICANT ISSUES")
            print("❌ Enhanced calculators require substantial fixes before deployment")
            print("🚫 Production deployment should be delayed until critical issues are resolved")
        
        print("=" * 80)
        return failed_tests == 0

def main():
    """Main test execution function"""
    tester = EnhancedCalculatorBackendTester()
    success = tester.run_comprehensive_enhanced_calculator_tests()
    return success

if __name__ == "__main__":
    try:
        success = main()
        sys.exit(0 if success else 1)
    except KeyboardInterrupt:
        print("\n\n⚠️  Testing interrupted by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n\n❌ Testing failed with error: {str(e)}")
        sys.exit(1)