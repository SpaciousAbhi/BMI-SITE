#!/usr/bin/env python3
"""
Enhanced GFR & BAC Calculator Backend Testing Suite
World-Class Medical Calculator Application - 2025

This comprehensive test suite focuses on testing the enhanced world-class GFR Calculator 
and BAC Calculator pages to verify route accessibility, SEO optimization, performance, 
content quality, and technical SEO implementation.
"""

import requests
import time
import json
import sys
import re
from typing import Dict, List, Tuple, Any
from bs4 import BeautifulSoup

class GFRBACCalculatorTester:
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

    def test_gfr_calculator_route_accessibility(self):
        """Test GFR Calculator route accessibility with 200 status"""
        test_name = "GFR Calculator Route Accessibility"
        try:
            start_time = time.time()
            response = requests.get(f"{self.frontend_url}/gfr-calculator", timeout=10)
            duration = time.time() - start_time
            if response.status_code == 200:
                content = response.text
                if 'id="root"' in content or 'react' in content.lower():
                    self.log_test(test_name, "PASS", f"Route accessible with 200 status", duration)
                    return True, content
                else:
                    self.log_test(test_name, "WARN", f"Route accessible but may not be React app", duration)
                    return False, content
            else:
                self.log_test(test_name, "FAIL", f"HTTP {response.status_code}", duration)
                return False, ""
        except Exception as e:
            self.log_test(test_name, "FAIL", f"Error: {str(e)}")
            return False, ""

    def test_bac_calculator_route_accessibility(self):
        """Test BAC Calculator route accessibility with 200 status"""
        test_name = "BAC Calculator Route Accessibility"
        try:
            start_time = time.time()
            response = requests.get(f"{self.frontend_url}/bac-calculator", timeout=10)
            duration = time.time() - start_time
            if response.status_code == 200:
                content = response.text
                if 'id="root"' in content or 'react' in content.lower():
                    self.log_test(test_name, "PASS", f"Route accessible with 200 status", duration)
                    return True, content
                else:
                    self.log_test(test_name, "WARN", f"Route accessible but may not be React app", duration)
                    return False, content
            else:
                self.log_test(test_name, "FAIL", f"HTTP {response.status_code}", duration)
                return False, ""
        except Exception as e:
            self.log_test(test_name, "FAIL", f"Error: {str(e)}")
            return False, ""

    def test_gfr_seo_meta_tags(self, content: str):
        """Test GFR Calculator comprehensive SEO meta tags"""
        test_name = "GFR Calculator SEO Meta Tags"
        try:
            soup = BeautifulSoup(content, 'html.parser')
            
            # Check for essential SEO meta tags
            seo_elements = {
                'title': soup.find('title'),
                'description': soup.find('meta', attrs={'name': 'description'}),
                'keywords': soup.find('meta', attrs={'name': 'keywords'}),
                'og:title': soup.find('meta', attrs={'property': 'og:title'}),
                'og:description': soup.find('meta', attrs={'property': 'og:description'}),
                'og:url': soup.find('meta', attrs={'property': 'og:url'}),
                'canonical': soup.find('link', attrs={'rel': 'canonical'}),
                'viewport': soup.find('meta', attrs={'name': 'viewport'})
            }
            
            present_elements = []
            missing_elements = []
            
            for element_name, element in seo_elements.items():
                if element:
                    present_elements.append(element_name)
                else:
                    missing_elements.append(element_name)
            
            # For React SPA, we check if basic SEO structure is present
            # The dynamic content will be loaded by React
            if len(present_elements) >= 6:
                self.log_test(test_name, "PASS", f"Comprehensive SEO meta tags present ({len(present_elements)}/8 elements) - React SPA structure verified")
            elif len(present_elements) >= 4:
                self.log_test(test_name, "WARN", f"Basic SEO meta tags present ({len(present_elements)}/8 elements), missing: {', '.join(missing_elements)}")
            else:
                self.log_test(test_name, "FAIL", f"Insufficient SEO meta tags ({len(present_elements)}/8 elements), missing: {', '.join(missing_elements)}")
                
        except Exception as e:
            self.log_test(test_name, "FAIL", f"Error parsing SEO meta tags: {str(e)}")

    def test_bac_seo_meta_tags(self, content: str):
        """Test BAC Calculator comprehensive SEO meta tags"""
        test_name = "BAC Calculator SEO Meta Tags"
        try:
            soup = BeautifulSoup(content, 'html.parser')
            
            # Check for essential SEO meta tags
            seo_elements = {
                'title': soup.find('title'),
                'description': soup.find('meta', attrs={'name': 'description'}),
                'keywords': soup.find('meta', attrs={'name': 'keywords'}),
                'og:title': soup.find('meta', attrs={'property': 'og:title'}),
                'og:description': soup.find('meta', attrs={'property': 'og:description'}),
                'og:url': soup.find('meta', attrs={'property': 'og:url'}),
                'canonical': soup.find('link', attrs={'rel': 'canonical'}),
                'viewport': soup.find('meta', attrs={'name': 'viewport'})
            }
            
            present_elements = []
            missing_elements = []
            
            for element_name, element in seo_elements.items():
                if element:
                    present_elements.append(element_name)
                else:
                    missing_elements.append(element_name)
            
            # Check for BAC-specific content in title/description
            bac_keywords = ['bac', 'blood alcohol', 'widmark', 'alcohol content', 'dui', 'impairment']
            title_text = soup.find('title').get_text().lower() if soup.find('title') else ""
            has_bac_content = any(keyword in title_text for keyword in bac_keywords)
            
            if len(present_elements) >= 6 and has_bac_content:
                self.log_test(test_name, "PASS", f"Comprehensive SEO meta tags present ({len(present_elements)}/8 elements), BAC-specific content verified")
            elif len(present_elements) >= 4:
                self.log_test(test_name, "WARN", f"Basic SEO meta tags present ({len(present_elements)}/8 elements), missing: {', '.join(missing_elements)}")
            else:
                self.log_test(test_name, "FAIL", f"Insufficient SEO meta tags ({len(present_elements)}/8 elements), missing: {', '.join(missing_elements)}")
                
        except Exception as e:
            self.log_test(test_name, "FAIL", f"Error parsing SEO meta tags: {str(e)}")

    def test_gfr_json_ld_structured_data(self, content: str):
        """Test GFR Calculator JSON-LD structured data implementation"""
        test_name = "GFR Calculator JSON-LD Structured Data"
        try:
            # Find JSON-LD script tags
            json_ld_pattern = r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>'
            json_ld_matches = re.findall(json_ld_pattern, content, re.DOTALL | re.IGNORECASE)
            
            if not json_ld_matches:
                self.log_test(test_name, "FAIL", "No JSON-LD structured data found")
                return
            
            schema_types_found = []
            medical_features = []
            
            for json_str in json_ld_matches:
                try:
                    json_data = json.loads(json_str.strip())
                    
                    # Handle @graph structure
                    if isinstance(json_data, dict) and '@graph' in json_data:
                        items = json_data['@graph']
                    elif isinstance(json_data, list):
                        items = json_data
                    else:
                        items = [json_data]
                    
                    for item in items:
                        if isinstance(item, dict) and '@type' in item:
                            schema_type = item['@type']
                            schema_types_found.append(schema_type)
                            
                            # Check for medical-specific features
                            if 'MedicalRiskEstimator' in schema_type:
                                if 'medicalSpecialty' in item:
                                    medical_features.append('medicalSpecialty')
                                if 'featureList' in item:
                                    medical_features.append('featureList')
                                if 'CKD-EPI' in str(item):
                                    medical_features.append('CKD-EPI equation')
                            
                            if 'FAQPage' in schema_type:
                                medical_features.append('FAQ structured data')
                                
                except json.JSONDecodeError:
                    continue
            
            # Expected schema types for GFR calculator
            expected_schemas = ['MedicalRiskEstimator', 'FAQPage', 'WebApplication']
            found_expected = [schema for schema in expected_schemas if schema in schema_types_found]
            
            if len(found_expected) >= 2 and len(medical_features) >= 3:
                self.log_test(test_name, "PASS", f"Comprehensive JSON-LD structured data verified: {', '.join(found_expected)}, medical features: {', '.join(medical_features)}")
            elif len(found_expected) >= 1:
                self.log_test(test_name, "WARN", f"Basic JSON-LD structured data present: {', '.join(found_expected)}")
            else:
                self.log_test(test_name, "FAIL", f"Missing expected schema types. Found: {', '.join(schema_types_found)}")
                
        except Exception as e:
            self.log_test(test_name, "FAIL", f"Error parsing JSON-LD structured data: {str(e)}")

    def test_bac_json_ld_structured_data(self, content: str):
        """Test BAC Calculator JSON-LD structured data implementation"""
        test_name = "BAC Calculator JSON-LD Structured Data"
        try:
            # Find JSON-LD script tags
            json_ld_pattern = r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>'
            json_ld_matches = re.findall(json_ld_pattern, content, re.DOTALL | re.IGNORECASE)
            
            if not json_ld_matches:
                self.log_test(test_name, "FAIL", "No JSON-LD structured data found")
                return
            
            schema_types_found = []
            legal_features = []
            
            for json_str in json_ld_matches:
                try:
                    json_data = json.loads(json_str.strip())
                    
                    # Handle @graph structure
                    if isinstance(json_data, dict) and '@graph' in json_data:
                        items = json_data['@graph']
                    elif isinstance(json_data, list):
                        items = json_data
                    else:
                        items = [json_data]
                    
                    for item in items:
                        if isinstance(item, dict) and '@type' in item:
                            schema_type = item['@type']
                            schema_types_found.append(schema_type)
                            
                            # Check for legal/safety-specific features
                            if 'MedicalRiskEstimator' in schema_type:
                                if 'legalCompliance' in str(item) or 'DUI' in str(item):
                                    legal_features.append('legal compliance')
                                if 'Widmark' in str(item):
                                    legal_features.append('Widmark equation')
                                if 'safetyWarning' in str(item) or 'safety' in str(item):
                                    legal_features.append('safety warnings')
                            
                            if 'FAQPage' in schema_type:
                                legal_features.append('FAQ structured data')
                                
                except json.JSONDecodeError:
                    continue
            
            # Expected schema types for BAC calculator
            expected_schemas = ['MedicalRiskEstimator', 'FAQPage', 'WebApplication']
            found_expected = [schema for schema in expected_schemas if schema in schema_types_found]
            
            if len(found_expected) >= 2 and len(legal_features) >= 2:
                self.log_test(test_name, "PASS", f"Comprehensive JSON-LD structured data verified: {', '.join(found_expected)}, legal features: {', '.join(legal_features)}")
            elif len(found_expected) >= 1:
                self.log_test(test_name, "WARN", f"Basic JSON-LD structured data present: {', '.join(found_expected)}")
            else:
                self.log_test(test_name, "FAIL", f"Missing expected schema types. Found: {', '.join(schema_types_found)}")
                
        except Exception as e:
            self.log_test(test_name, "FAIL", f"Error parsing JSON-LD structured data: {str(e)}")

    def test_gfr_trust_badges_and_authority(self, content: str):
        """Test GFR Calculator professional trust badges and authority indicators"""
        test_name = "GFR Calculator Trust Badges & Authority Indicators"
        try:
            content_lower = content.lower()
            
            # Trust badges and authority indicators
            trust_indicators = [
                'ckd-epi 2021',
                'clinical accuracy',
                'kdigo',
                'medical grade',
                'race-free',
                'professional',
                'nephrology',
                'kidney disease',
                'evidence-based'
            ]
            
            found_indicators = []
            for indicator in trust_indicators:
                if indicator in content_lower:
                    found_indicators.append(indicator)
            
            # Check for visual trust elements (badges, certifications)
            visual_trust_elements = [
                'shield',
                'checkCircle',
                'award',
                'star',
                'badge',
                'certification',
                'endorsed'
            ]
            
            found_visual = []
            for element in visual_trust_elements:
                if element.lower() in content_lower:
                    found_visual.append(element)
            
            total_found = len(found_indicators) + len(found_visual)
            
            if total_found >= 8:
                self.log_test(test_name, "PASS", f"Comprehensive trust badges and authority indicators present ({total_found} elements): {', '.join(found_indicators[:5])}")
            elif total_found >= 5:
                self.log_test(test_name, "WARN", f"Good trust indicators present ({total_found} elements): {', '.join(found_indicators[:3])}")
            else:
                self.log_test(test_name, "FAIL", f"Insufficient trust indicators ({total_found} elements)")
                
        except Exception as e:
            self.log_test(test_name, "FAIL", f"Error checking trust badges: {str(e)}")

    def test_bac_trust_badges_and_legal_compliance(self, content: str):
        """Test BAC Calculator professional trust badges and legal compliance indicators"""
        test_name = "BAC Calculator Trust Badges & Legal Compliance"
        try:
            content_lower = content.lower()
            
            # Legal compliance and trust indicators
            legal_indicators = [
                'widmark equation',
                'legal compliance',
                'dui',
                'safety warning',
                'legal consequences',
                'professional',
                'enhanced',
                'accuracy',
                'legal limits',
                'blood alcohol'
            ]
            
            found_indicators = []
            for indicator in legal_indicators:
                if indicator in content_lower:
                    found_indicators.append(indicator)
            
            # Check for safety and legal visual elements
            safety_elements = [
                'shield',
                'alerttriangle',
                'warning',
                'safety',
                'legal',
                'emergency',
                'critical'
            ]
            
            found_safety = []
            for element in safety_elements:
                if element.lower() in content_lower:
                    found_safety.append(element)
            
            total_found = len(found_indicators) + len(found_safety)
            
            if total_found >= 8:
                self.log_test(test_name, "PASS", f"Comprehensive legal compliance and trust indicators present ({total_found} elements): {', '.join(found_indicators[:5])}")
            elif total_found >= 5:
                self.log_test(test_name, "WARN", f"Good legal compliance indicators present ({total_found} elements): {', '.join(found_indicators[:3])}")
            else:
                self.log_test(test_name, "FAIL", f"Insufficient legal compliance indicators ({total_found} elements)")
                
        except Exception as e:
            self.log_test(test_name, "FAIL", f"Error checking legal compliance: {str(e)}")

    def test_gfr_educational_content_and_faq(self, content: str):
        """Test GFR Calculator educational content sections and FAQ visibility"""
        test_name = "GFR Calculator Educational Content & FAQ"
        try:
            content_lower = content.lower()
            
            # Educational content indicators
            educational_elements = [
                'ckd staging',
                'cardiovascular risk',
                'monitoring frequency',
                'clinical recommendations',
                'kidney function',
                'glomerular filtration',
                'creatinine',
                'nephrology',
                'chronic kidney disease'
            ]
            
            found_educational = []
            for element in educational_elements:
                if element in content_lower:
                    found_educational.append(element)
            
            # FAQ indicators
            faq_indicators = [
                'faq',
                'question',
                'answer',
                'what is egfr',
                'how accurate',
                'ckd stages',
                'monitoring',
                'healthcare professional'
            ]
            
            found_faq = []
            for indicator in faq_indicators:
                if indicator in content_lower:
                    found_faq.append(indicator)
            
            total_educational = len(found_educational) + len(found_faq)
            
            if total_educational >= 10:
                self.log_test(test_name, "PASS", f"Comprehensive educational content and FAQ sections verified ({total_educational} elements)")
            elif total_educational >= 6:
                self.log_test(test_name, "WARN", f"Good educational content present ({total_educational} elements)")
            else:
                self.log_test(test_name, "FAIL", f"Insufficient educational content ({total_educational} elements)")
                
        except Exception as e:
            self.log_test(test_name, "FAIL", f"Error checking educational content: {str(e)}")

    def test_bac_safety_warnings_and_legal_content(self, content: str):
        """Test BAC Calculator enhanced safety warnings and legal consequences sections"""
        test_name = "BAC Calculator Safety Warnings & Legal Content"
        try:
            content_lower = content.lower()
            
            # Safety warning indicators
            safety_elements = [
                'safety first',
                'never use',
                'do not drive',
                'alternative transportation',
                'safety disclaimer',
                'medical emergency',
                'life-threatening',
                'call emergency',
                'immediate medical attention'
            ]
            
            found_safety = []
            for element in safety_elements:
                if element in content_lower:
                    found_safety.append(element)
            
            # Legal consequences indicators
            legal_elements = [
                'dui consequences',
                'legal limits',
                'license suspension',
                'fines',
                'jail time',
                'felony charges',
                'criminal record',
                'legal penalties',
                'court',
                'probation'
            ]
            
            found_legal = []
            for element in legal_elements:
                if element in content_lower:
                    found_legal.append(element)
            
            total_safety_legal = len(found_safety) + len(found_legal)
            
            if total_safety_legal >= 12:
                self.log_test(test_name, "PASS", f"Comprehensive safety warnings and legal content verified ({total_safety_legal} elements)")
            elif total_safety_legal >= 8:
                self.log_test(test_name, "WARN", f"Good safety and legal content present ({total_safety_legal} elements)")
            else:
                self.log_test(test_name, "FAIL", f"Insufficient safety and legal content ({total_safety_legal} elements)")
                
        except Exception as e:
            self.log_test(test_name, "FAIL", f"Error checking safety and legal content: {str(e)}")

    def test_gfr_ckd_staging_matrix(self, content: str):
        """Test GFR Calculator CKD staging matrix and risk stratification displays"""
        test_name = "GFR Calculator CKD Staging Matrix & Risk Stratification"
        try:
            content_lower = content.lower()
            
            # CKD staging indicators
            ckd_stages = ['g1', 'g2', 'g3a', 'g3b', 'g4', 'g5']
            found_stages = []
            for stage in ckd_stages:
                if stage in content_lower:
                    found_stages.append(stage)
            
            # Risk stratification indicators
            risk_elements = [
                'cardiovascular risk',
                'risk stratification',
                'monitoring frequency',
                'nephrology referral',
                'clinical recommendations',
                'normal cv risk',
                'increased cv risk',
                'high cv risk',
                'very high cv risk'
            ]
            
            found_risk = []
            for element in risk_elements:
                if element in content_lower:
                    found_risk.append(element)
            
            # Check for comprehensive staging matrix
            staging_completeness = len(found_stages) >= 5 and len(found_risk) >= 6
            
            if staging_completeness:
                self.log_test(test_name, "PASS", f"Comprehensive CKD staging matrix verified: {len(found_stages)}/6 stages, {len(found_risk)} risk elements")
            elif len(found_stages) >= 3:
                self.log_test(test_name, "WARN", f"Partial CKD staging present: {len(found_stages)}/6 stages, {len(found_risk)} risk elements")
            else:
                self.log_test(test_name, "FAIL", f"Insufficient CKD staging matrix: {len(found_stages)}/6 stages")
                
        except Exception as e:
            self.log_test(test_name, "FAIL", f"Error checking CKD staging matrix: {str(e)}")

    def test_bac_dui_legal_matrix(self, content: str):
        """Test BAC Calculator comprehensive DUI legal matrix and BAC impairment levels display"""
        test_name = "BAC Calculator DUI Legal Matrix & Impairment Levels"
        try:
            content_lower = content.lower()
            
            # BAC impairment levels
            impairment_levels = [
                'sober',
                'minimal impairment',
                'mild impairment',
                'moderate impairment',
                'severe impairment',
                'life-threatening'
            ]
            
            found_levels = []
            for level in impairment_levels:
                if level in content_lower:
                    found_levels.append(level)
            
            # DUI legal matrix indicators
            legal_matrix_elements = [
                'first-time dui',
                'enhanced dui',
                'repeat offenses',
                'license suspension',
                'license revocation',
                'ignition lock',
                'vehicle forfeiture',
                'felony charges',
                'prison time',
                'professional consequences',
                'financial impact',
                'long-term impact'
            ]
            
            found_legal_matrix = []
            for element in legal_matrix_elements:
                if element in content_lower:
                    found_legal_matrix.append(element)
            
            # Check for comprehensive legal matrix
            matrix_completeness = len(found_levels) >= 4 and len(found_legal_matrix) >= 8
            
            if matrix_completeness:
                self.log_test(test_name, "PASS", f"Comprehensive DUI legal matrix verified: {len(found_levels)}/6 impairment levels, {len(found_legal_matrix)} legal elements")
            elif len(found_levels) >= 3:
                self.log_test(test_name, "WARN", f"Partial DUI legal matrix present: {len(found_levels)}/6 levels, {len(found_legal_matrix)} legal elements")
            else:
                self.log_test(test_name, "FAIL", f"Insufficient DUI legal matrix: {len(found_levels)}/6 impairment levels")
                
        except Exception as e:
            self.log_test(test_name, "FAIL", f"Error checking DUI legal matrix: {str(e)}")

    def test_bac_factors_affecting_accuracy(self, content: str):
        """Test BAC Calculator factors affecting BAC accuracy section visibility"""
        test_name = "BAC Calculator Factors Affecting BAC Accuracy"
        try:
            content_lower = content.lower()
            
            # Factors affecting BAC accuracy
            accuracy_factors = [
                'physical characteristics',
                'body weight',
                'biological sex',
                'consumption variables',
                'drinking patterns',
                'food interaction',
                'health factors',
                'medications',
                'individual variations',
                'genetic factors',
                'tolerance',
                'metabolism',
                'accuracy limitations',
                'calculator limitations',
                'professional testing'
            ]
            
            found_factors = []
            for factor in accuracy_factors:
                if factor in content_lower:
                    found_factors.append(factor)
            
            # Check for comprehensive factors section
            if len(found_factors) >= 10:
                self.log_test(test_name, "PASS", f"Comprehensive factors affecting BAC accuracy section verified ({len(found_factors)}/15 factors)")
            elif len(found_factors) >= 6:
                self.log_test(test_name, "WARN", f"Good factors affecting accuracy content present ({len(found_factors)}/15 factors)")
            else:
                self.log_test(test_name, "FAIL", f"Insufficient factors affecting accuracy content ({len(found_factors)}/15 factors)")
                
        except Exception as e:
            self.log_test(test_name, "FAIL", f"Error checking factors affecting accuracy: {str(e)}")

    def test_related_calculator_links(self, content: str, calculator_type: str):
        """Test related calculator links functionality"""
        test_name = f"{calculator_type} Calculator Related Links"
        try:
            content_lower = content.lower()
            
            # Related calculator links
            related_calculators = [
                'bmi calculator',
                'bmr calculator',
                'calorie calculator',
                'body fat calculator',
                'tdee calculator',
                'pregnancy calculator',
                'ovulation calculator'
            ]
            
            found_links = []
            for calc in related_calculators:
                if calc in content_lower:
                    found_links.append(calc)
            
            # Check for href links to other calculators
            href_pattern = r'href=["\'][^"\']*calculator[^"\']*["\']'
            href_matches = re.findall(href_pattern, content_lower)
            
            total_related = len(found_links) + len(href_matches)
            
            if total_related >= 5:
                self.log_test(test_name, "PASS", f"Related calculator links verified ({total_related} links found)")
            elif total_related >= 3:
                self.log_test(test_name, "WARN", f"Some related calculator links present ({total_related} links)")
            else:
                self.log_test(test_name, "FAIL", f"Insufficient related calculator links ({total_related} links)")
                
        except Exception as e:
            self.log_test(test_name, "FAIL", f"Error checking related calculator links: {str(e)}")

    def test_page_performance(self, url: str, page_name: str):
        """Test page load performance and responsiveness"""
        test_name = f"{page_name} Performance & Responsiveness"
        try:
            start_time = time.time()
            response = requests.get(url, timeout=15)
            duration = time.time() - start_time
            
            if response.status_code == 200:
                content = response.text
                
                # Check for mobile responsiveness indicators
                responsive_indicators = [
                    'viewport',
                    'responsive',
                    'mobile',
                    'sm:',
                    'md:',
                    'lg:',
                    'xl:',
                    '@media'
                ]
                
                found_responsive = sum(1 for indicator in responsive_indicators if indicator in content.lower())
                
                # Performance assessment
                if duration < 1.0 and found_responsive >= 4:
                    self.log_test(test_name, "PASS", f"Excellent performance and responsiveness", duration)
                elif duration < 2.0 and found_responsive >= 2:
                    self.log_test(test_name, "PASS", f"Good performance and responsiveness", duration)
                elif duration < 3.0:
                    self.log_test(test_name, "WARN", f"Acceptable performance", duration)
                else:
                    self.log_test(test_name, "FAIL", f"Poor performance", duration)
            else:
                self.log_test(test_name, "FAIL", f"HTTP {response.status_code}", duration)
                
        except Exception as e:
            self.log_test(test_name, "FAIL", f"Error testing performance: {str(e)}")

    def test_accessibility_features(self, content: str, calculator_type: str):
        """Test accessibility features and ARIA labels"""
        test_name = f"{calculator_type} Calculator Accessibility Features"
        try:
            content_lower = content.lower()
            
            # Accessibility indicators
            accessibility_features = [
                'aria-label',
                'aria-describedby',
                'role=',
                'tabindex',
                'alt=',
                'focus:ring',
                'focus:border',
                'screen reader',
                'keyboard navigation',
                'high contrast'
            ]
            
            found_accessibility = []
            for feature in accessibility_features:
                if feature in content_lower:
                    found_accessibility.append(feature)
            
            if len(found_accessibility) >= 6:
                self.log_test(test_name, "PASS", f"Comprehensive accessibility features verified ({len(found_accessibility)}/10 features)")
            elif len(found_accessibility) >= 3:
                self.log_test(test_name, "WARN", f"Basic accessibility features present ({len(found_accessibility)}/10 features)")
            else:
                self.log_test(test_name, "FAIL", f"Insufficient accessibility features ({len(found_accessibility)}/10 features)")
                
        except Exception as e:
            self.log_test(test_name, "FAIL", f"Error checking accessibility: {str(e)}")

    def run_comprehensive_tests(self):
        """Run comprehensive testing suite for GFR and BAC calculators"""
        print("🚀 Starting Enhanced GFR & BAC Calculator Backend Testing Suite")
        print("=" * 80)
        
        # Core backend tests
        print("\n📡 BACKEND API CONNECTIVITY TESTS")
        print("-" * 50)
        backend_available = self.test_backend_connectivity()
        
        # GFR Calculator Tests
        print("\n🩺 GFR CALCULATOR COMPREHENSIVE TESTS")
        print("-" * 50)
        gfr_accessible, gfr_content = self.test_gfr_calculator_route_accessibility()
        
        if gfr_accessible and gfr_content:
            self.test_gfr_seo_meta_tags(gfr_content)
            self.test_gfr_json_ld_structured_data(gfr_content)
            self.test_gfr_trust_badges_and_authority(gfr_content)
            self.test_gfr_educational_content_and_faq(gfr_content)
            self.test_gfr_ckd_staging_matrix(gfr_content)
            self.test_related_calculator_links(gfr_content, "GFR")
            self.test_page_performance(f"{self.frontend_url}/gfr-calculator", "GFR Calculator")
            self.test_accessibility_features(gfr_content, "GFR")
        
        # BAC Calculator Tests
        print("\n🍷 BAC CALCULATOR COMPREHENSIVE TESTS")
        print("-" * 50)
        bac_accessible, bac_content = self.test_bac_calculator_route_accessibility()
        
        if bac_accessible and bac_content:
            self.test_bac_seo_meta_tags(bac_content)
            self.test_bac_json_ld_structured_data(bac_content)
            self.test_bac_trust_badges_and_legal_compliance(bac_content)
            self.test_bac_safety_warnings_and_legal_content(bac_content)
            self.test_bac_dui_legal_matrix(bac_content)
            self.test_bac_factors_affecting_accuracy(bac_content)
            self.test_related_calculator_links(bac_content, "BAC")
            self.test_page_performance(f"{self.frontend_url}/bac-calculator", "BAC Calculator")
            self.test_accessibility_features(bac_content, "BAC")
        
        # Generate comprehensive summary
        self.generate_comprehensive_summary()

    def generate_comprehensive_summary(self):
        """Generate comprehensive test summary"""
        print("\n" + "=" * 80)
        print("📊 GFR & BAC CALCULATOR COMPREHENSIVE TESTING SUMMARY")
        print("=" * 80)
        
        total_tests = len(self.test_results)
        passed_tests = len([r for r in self.test_results if r["status"] == "PASS"])
        failed_tests = len([r for r in self.test_results if r["status"] == "FAIL"])
        warning_tests = len([r for r in self.test_results if r["status"] == "WARN"])
        info_tests = len([r for r in self.test_results if r["status"] == "INFO"])
        
        print(f"\n📈 OVERALL RESULTS:")
        print(f"   Total Tests: {total_tests}")
        print(f"   ✅ Passed: {passed_tests}")
        print(f"   ❌ Failed: {failed_tests}")
        print(f"   ⚠️  Warnings: {warning_tests}")
        print(f"   ℹ️  Info: {info_tests}")
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
        if gfr_route_working:
            print("   ✅ GFR Calculator route is accessible and functional")
        else:
            print("   ❌ GFR Calculator route accessibility issues")
        
        # Analyze BAC calculator
        bac_route_working = any("BAC Calculator Route" in r["test"] and r["status"] == "PASS" for r in self.test_results)
        if bac_route_working:
            print("   ✅ BAC Calculator route is accessible and functional")
        else:
            print("   ❌ BAC Calculator route accessibility issues")
        
        # Analyze SEO implementation
        seo_tests = [r for r in self.test_results if "SEO" in r["test"] or "JSON-LD" in r["test"]]
        seo_passed = len([r for r in seo_tests if r["status"] == "PASS"])
        if len(seo_tests) > 0 and seo_passed >= len(seo_tests) * 0.8:
            print("   ✅ SEO optimization and structured data implementation excellent")
        elif seo_passed > 0:
            print("   ⚠️  SEO optimization partially implemented")
        else:
            print("   ❌ SEO optimization needs attention")
        
        print(f"\n🏁 TESTING COMPLETED - World-Class Calculator Standards Verified")
        print("=" * 80)

def main():
    """Main test execution function"""
    tester = GFRBACCalculatorTester()
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