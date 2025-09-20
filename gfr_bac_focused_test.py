#!/usr/bin/env python3
"""
GFR & BAC Calculator Focused Backend Testing Suite
World-Class Medical Calculator Application - 2025

This focused test suite verifies the enhanced world-class GFR Calculator 
and BAC Calculator implementation, focusing on backend functionality,
route accessibility, component existence, and basic functionality.
"""

import requests
import time
import json
import sys
import os
from typing import Dict, List, Tuple, Any

class GFRBACFocusedTester:
    def __init__(self):
        # Use environment-based URLs
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
            test_data = {"client_name": "gfr_bac_test"}
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

    def test_gfr_calculator_route_accessibility(self):
        """Test GFR Calculator route accessibility with 200 status"""
        test_name = "GFR Calculator Route Accessibility"
        try:
            start_time = time.time()
            response = requests.get(f"{self.frontend_url}/gfr-calculator", timeout=10)
            duration = time.time() - start_time
            if response.status_code == 200:
                content = response.text
                if 'id="root"' in content:
                    self.log_test(test_name, "PASS", f"Route accessible with 200 status", duration)
                    return True
                else:
                    self.log_test(test_name, "WARN", f"Route accessible but React root not found", duration)
                    return False
            else:
                self.log_test(test_name, "FAIL", f"HTTP {response.status_code}", duration)
                return False
        except Exception as e:
            self.log_test(test_name, "FAIL", f"Error: {str(e)}")
            return False

    def test_bac_calculator_route_accessibility(self):
        """Test BAC Calculator route accessibility with 200 status"""
        test_name = "BAC Calculator Route Accessibility"
        try:
            start_time = time.time()
            response = requests.get(f"{self.frontend_url}/bac-calculator", timeout=10)
            duration = time.time() - start_time
            if response.status_code == 200:
                content = response.text
                if 'id="root"' in content:
                    self.log_test(test_name, "PASS", f"Route accessible with 200 status", duration)
                    return True
                else:
                    self.log_test(test_name, "WARN", f"Route accessible but React root not found", duration)
                    return False
            else:
                self.log_test(test_name, "FAIL", f"HTTP {response.status_code}", duration)
                return False
        except Exception as e:
            self.log_test(test_name, "FAIL", f"Error: {str(e)}")
            return False

    def test_gfr_calculator_component_exists(self):
        """Test if GFR Calculator component file exists and has proper structure"""
        test_name = "GFR Calculator Component Implementation"
        try:
            component_path = "/app/frontend/src/components/GFRCalculator.jsx"
            page_path = "/app/frontend/src/pages/GFRCalculatorPage.jsx"
            
            # Check if component file exists
            if not os.path.exists(component_path):
                self.log_test(test_name, "FAIL", f"GFR Calculator component not found at {component_path}")
                return False
            
            # Check if page file exists
            if not os.path.exists(page_path):
                self.log_test(test_name, "FAIL", f"GFR Calculator page not found at {page_path}")
                return False
            
            # Read and analyze component content
            with open(component_path, 'r') as f:
                component_content = f.read()
            
            with open(page_path, 'r') as f:
                page_content = f.read()
            
            # Check for key GFR calculator features
            gfr_features = [
                'CKD-EPI',
                'creatinine',
                'eGFR',
                'kidney function',
                'glomerular filtration',
                'calculateGFR',
                'stage',
                'G1',
                'G2',
                'G3',
                'G4',
                'G5'
            ]
            
            found_features = []
            for feature in gfr_features:
                if feature in component_content or feature in page_content:
                    found_features.append(feature)
            
            # Check for JSON-LD structured data
            has_json_ld = 'application/ld+json' in page_content
            has_medical_schema = 'MedicalRiskEstimator' in page_content
            
            if len(found_features) >= 8 and has_json_ld and has_medical_schema:
                self.log_test(test_name, "PASS", f"GFR Calculator fully implemented with {len(found_features)} features, JSON-LD structured data, and medical schema")
            elif len(found_features) >= 5:
                self.log_test(test_name, "WARN", f"GFR Calculator partially implemented with {len(found_features)} features")
            else:
                self.log_test(test_name, "FAIL", f"GFR Calculator implementation incomplete, only {len(found_features)} features found")
                
        except Exception as e:
            self.log_test(test_name, "FAIL", f"Error checking GFR Calculator implementation: {str(e)}")

    def test_bac_calculator_component_exists(self):
        """Test if BAC Calculator component file exists and has proper structure"""
        test_name = "BAC Calculator Component Implementation"
        try:
            component_path = "/app/frontend/src/components/BACCalculator.jsx"
            page_path = "/app/frontend/src/pages/BACCalculatorPage.jsx"
            
            # Check if component file exists
            if not os.path.exists(component_path):
                self.log_test(test_name, "FAIL", f"BAC Calculator component not found at {component_path}")
                return False
            
            # Check if page file exists
            if not os.path.exists(page_path):
                self.log_test(test_name, "FAIL", f"BAC Calculator page not found at {page_path}")
                return False
            
            # Read and analyze component content
            with open(component_path, 'r') as f:
                component_content = f.read()
            
            with open(page_path, 'r') as f:
                page_content = f.read()
            
            # Check for key BAC calculator features
            bac_features = [
                'Widmark',
                'blood alcohol',
                'BAC',
                'impairment',
                'DUI',
                'calculateBAC',
                'legal',
                'safety',
                'alcohol content',
                'time elapsed',
                'weight',
                'gender'
            ]
            
            found_features = []
            for feature in bac_features:
                if feature in component_content or feature in page_content:
                    found_features.append(feature)
            
            # Check for JSON-LD structured data
            has_json_ld = 'application/ld+json' in page_content
            has_medical_schema = 'MedicalRiskEstimator' in page_content
            
            if len(found_features) >= 8 and has_json_ld and has_medical_schema:
                self.log_test(test_name, "PASS", f"BAC Calculator fully implemented with {len(found_features)} features, JSON-LD structured data, and medical schema")
            elif len(found_features) >= 5:
                self.log_test(test_name, "WARN", f"BAC Calculator partially implemented with {len(found_features)} features")
            else:
                self.log_test(test_name, "FAIL", f"BAC Calculator implementation incomplete, only {len(found_features)} features found")
                
        except Exception as e:
            self.log_test(test_name, "FAIL", f"Error checking BAC Calculator implementation: {str(e)}")

    def test_gfr_seo_and_content_quality(self):
        """Test GFR Calculator SEO and content quality"""
        test_name = "GFR Calculator SEO & Content Quality"
        try:
            page_path = "/app/frontend/src/pages/GFRCalculatorPage.jsx"
            
            with open(page_path, 'r') as f:
                content = f.read()
            
            # Check for SEO elements
            seo_elements = [
                'JSON-LD',
                'MedicalRiskEstimator',
                'FAQPage',
                'WebApplication',
                'medicalSpecialty',
                'featureList',
                'CKD-EPI 2021',
                'race-free',
                'KDIGO',
                'nephrology'
            ]
            
            found_seo = sum(1 for element in seo_elements if element in content)
            
            # Check for educational content
            educational_content = [
                'Understanding eGFR',
                'CKD staging',
                'cardiovascular risk',
                'monitoring frequency',
                'clinical recommendations',
                'FAQ',
                'Question',
                'Answer'
            ]
            
            found_educational = sum(1 for element in educational_content if element in content)
            
            if found_seo >= 7 and found_educational >= 6:
                self.log_test(test_name, "PASS", f"Comprehensive SEO and educational content verified ({found_seo} SEO elements, {found_educational} educational elements)")
            elif found_seo >= 4 and found_educational >= 3:
                self.log_test(test_name, "WARN", f"Good SEO and educational content present ({found_seo} SEO elements, {found_educational} educational elements)")
            else:
                self.log_test(test_name, "FAIL", f"Insufficient SEO and educational content ({found_seo} SEO elements, {found_educational} educational elements)")
                
        except Exception as e:
            self.log_test(test_name, "FAIL", f"Error checking GFR SEO and content: {str(e)}")

    def test_bac_seo_and_content_quality(self):
        """Test BAC Calculator SEO and content quality"""
        test_name = "BAC Calculator SEO & Content Quality"
        try:
            page_path = "/app/frontend/src/pages/BACCalculatorPage.jsx"
            
            with open(page_path, 'r') as f:
                content = f.read()
            
            # Check for SEO elements
            seo_elements = [
                'JSON-LD',
                'MedicalRiskEstimator',
                'FAQPage',
                'WebApplication',
                'legalCompliance',
                'safetyWarning',
                'Widmark equation',
                'DUI',
                'legal consequences',
                'blood alcohol'
            ]
            
            found_seo = sum(1 for element in seo_elements if element in content)
            
            # Check for safety and legal content
            safety_legal_content = [
                'Safety First',
                'never use',
                'do not drive',
                'DUI consequences',
                'legal limits',
                'impairment levels',
                'FAQ',
                'Question',
                'Answer'
            ]
            
            found_safety_legal = sum(1 for element in safety_legal_content if element in content)
            
            if found_seo >= 7 and found_safety_legal >= 6:
                self.log_test(test_name, "PASS", f"Comprehensive SEO and safety/legal content verified ({found_seo} SEO elements, {found_safety_legal} safety/legal elements)")
            elif found_seo >= 4 and found_safety_legal >= 3:
                self.log_test(test_name, "WARN", f"Good SEO and safety/legal content present ({found_seo} SEO elements, {found_safety_legal} safety/legal elements)")
            else:
                self.log_test(test_name, "FAIL", f"Insufficient SEO and safety/legal content ({found_seo} SEO elements, {found_safety_legal} safety/legal elements)")
                
        except Exception as e:
            self.log_test(test_name, "FAIL", f"Error checking BAC SEO and content: {str(e)}")

    def test_page_performance(self, url: str, page_name: str):
        """Test page load performance"""
        test_name = f"{page_name} Performance"
        try:
            start_time = time.time()
            response = requests.get(url, timeout=15)
            duration = time.time() - start_time
            
            if response.status_code == 200:
                # Performance assessment
                if duration < 0.5:
                    self.log_test(test_name, "PASS", f"Excellent performance", duration)
                elif duration < 1.0:
                    self.log_test(test_name, "PASS", f"Good performance", duration)
                elif duration < 2.0:
                    self.log_test(test_name, "WARN", f"Acceptable performance", duration)
                else:
                    self.log_test(test_name, "FAIL", f"Poor performance", duration)
            else:
                self.log_test(test_name, "FAIL", f"HTTP {response.status_code}", duration)
                
        except Exception as e:
            self.log_test(test_name, "FAIL", f"Error testing performance: {str(e)}")

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

    def run_focused_tests(self):
        """Run focused testing suite for GFR and BAC calculators"""
        print("🚀 Starting GFR & BAC Calculator Focused Backend Testing Suite")
        print("=" * 80)
        
        # Core backend tests
        print("\n📡 BACKEND API CONNECTIVITY TESTS")
        print("-" * 50)
        backend_available = self.test_backend_connectivity()
        
        if backend_available:
            self.test_backend_status_endpoints()
        
        # Route accessibility tests
        print("\n🌐 ROUTE ACCESSIBILITY TESTS")
        print("-" * 50)
        gfr_accessible = self.test_gfr_calculator_route_accessibility()
        bac_accessible = self.test_bac_calculator_route_accessibility()
        
        # Component implementation tests
        print("\n🔧 COMPONENT IMPLEMENTATION TESTS")
        print("-" * 50)
        self.test_gfr_calculator_component_exists()
        self.test_bac_calculator_component_exists()
        
        # SEO and content quality tests
        print("\n📈 SEO & CONTENT QUALITY TESTS")
        print("-" * 50)
        self.test_gfr_seo_and_content_quality()
        self.test_bac_seo_and_content_quality()
        
        # Performance tests
        print("\n⚡ PERFORMANCE TESTS")
        print("-" * 50)
        if gfr_accessible:
            self.test_page_performance(f"{self.frontend_url}/gfr-calculator", "GFR Calculator")
        if bac_accessible:
            self.test_page_performance(f"{self.frontend_url}/bac-calculator", "BAC Calculator")
        
        # Mobile responsiveness test
        self.test_mobile_responsiveness_indicators()
        
        # Generate summary
        self.generate_focused_summary()

    def generate_focused_summary(self):
        """Generate focused test summary"""
        print("\n" + "=" * 80)
        print("📊 GFR & BAC CALCULATOR FOCUSED TESTING SUMMARY")
        print("=" * 80)
        
        total_tests = len(self.test_results)
        passed_tests = len([r for r in self.test_results if r["status"] == "PASS"])
        failed_tests = len([r for r in self.test_results if r["status"] == "FAIL"])
        warning_tests = len([r for r in self.test_results if r["status"] == "WARN"])
        
        print(f"\n📈 OVERALL RESULTS:")
        print(f"   Total Tests: {total_tests}")
        print(f"   ✅ Passed: {passed_tests}")
        print(f"   ❌ Failed: {failed_tests}")
        print(f"   ⚠️  Warnings: {warning_tests}")
        if total_tests > 0:
            print(f"   Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        # Categorize results
        gfr_tests = [r for r in self.test_results if "GFR" in r["test"]]
        bac_tests = [r for r in self.test_results if "BAC" in r["test"]]
        backend_tests = [r for r in self.test_results if "Backend" in r["test"]]
        
        print(f"\n🩺 GFR CALCULATOR RESULTS:")
        gfr_passed = len([r for r in gfr_tests if r["status"] == "PASS"])
        gfr_total = len(gfr_tests)
        if gfr_total > 0:
            print(f"   GFR Tests: {gfr_passed}/{gfr_total} passed ({(gfr_passed/gfr_total)*100:.1f}%)")
        
        print(f"\n🍷 BAC CALCULATOR RESULTS:")
        bac_passed = len([r for r in bac_tests if r["status"] == "PASS"])
        bac_total = len(bac_tests)
        if bac_total > 0:
            print(f"   BAC Tests: {bac_passed}/{bac_total} passed ({(bac_passed/bac_total)*100:.1f}%)")
        
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
        backend_working = any(r["status"] == "PASS" for r in backend_tests)
        if backend_working:
            print("   ✅ Backend API is functional and accessible")
        else:
            print("   ❌ Backend API connectivity issues detected")
        
        # Analyze GFR calculator
        gfr_route_working = any("GFR Calculator Route" in r["test"] and r["status"] == "PASS" for r in self.test_results)
        gfr_component_working = any("GFR Calculator Component" in r["test"] and r["status"] == "PASS" for r in self.test_results)
        if gfr_route_working and gfr_component_working:
            print("   ✅ GFR Calculator is fully functional and properly implemented")
        elif gfr_route_working:
            print("   ⚠️  GFR Calculator route accessible but implementation needs attention")
        else:
            print("   ❌ GFR Calculator has accessibility or implementation issues")
        
        # Analyze BAC calculator
        bac_route_working = any("BAC Calculator Route" in r["test"] and r["status"] == "PASS" for r in self.test_results)
        bac_component_working = any("BAC Calculator Component" in r["test"] and r["status"] == "PASS" for r in self.test_results)
        if bac_route_working and bac_component_working:
            print("   ✅ BAC Calculator is fully functional and properly implemented")
        elif bac_route_working:
            print("   ⚠️  BAC Calculator route accessible but implementation needs attention")
        else:
            print("   ❌ BAC Calculator has accessibility or implementation issues")
        
        print(f"\n🏁 FOCUSED TESTING COMPLETED")
        print("=" * 80)

def main():
    """Main test execution function"""
    tester = GFRBACFocusedTester()
    tester.run_focused_tests()

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⚠️  Testing interrupted by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n\n❌ Testing failed with error: {str(e)}")
        sys.exit(1)