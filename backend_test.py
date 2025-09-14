#!/usr/bin/env python3
"""
Backend API Testing Suite
Tests all backend endpoints to ensure they're working properly after frontend changes.
"""

import requests
import json
import sys
from datetime import datetime
import uuid

# Backend URL - using localhost since we're testing internally
BACKEND_URL = "http://localhost:8001/api"

def test_backend_health():
    """Test if backend service is running and responding"""
    print("🔍 Testing Backend Health...")
    try:
        response = requests.get(f"{BACKEND_URL}/", timeout=10)
        if response.status_code == 200:
            data = response.json()
            if data.get("message") == "Hello World":
                print("✅ Backend health check passed")
                return True
            else:
                print(f"❌ Backend health check failed - unexpected response: {data}")
                return False
        else:
            print(f"❌ Backend health check failed - status code: {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Backend health check failed - connection error: {e}")
        return False

def test_create_status_check():
    """Test POST /api/status endpoint"""
    print("🔍 Testing Create Status Check...")
    try:
        test_data = {
            "client_name": "BMI Calculator Test Client"
        }
        
        response = requests.post(
            f"{BACKEND_URL}/status", 
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            # Verify response structure
            required_fields = ["id", "client_name", "timestamp"]
            if all(field in data for field in required_fields):
                if data["client_name"] == test_data["client_name"]:
                    print("✅ Create status check passed")
                    return True, data["id"]
                else:
                    print(f"❌ Create status check failed - client_name mismatch")
                    return False, None
            else:
                print(f"❌ Create status check failed - missing required fields: {data}")
                return False, None
        else:
            print(f"❌ Create status check failed - status code: {response.status_code}")
            print(f"Response: {response.text}")
            return False, None
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Create status check failed - connection error: {e}")
        return False, None

def test_get_status_checks():
    """Test GET /api/status endpoint"""
    print("🔍 Testing Get Status Checks...")
    try:
        response = requests.get(f"{BACKEND_URL}/status", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list):
                print(f"✅ Get status checks passed - returned {len(data)} records")
                return True
            else:
                print(f"❌ Get status checks failed - expected list, got: {type(data)}")
                return False
        else:
            print(f"❌ Get status checks failed - status code: {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Get status checks failed - connection error: {e}")
        return False

def test_cors_headers():
    """Test CORS headers are properly set"""
    print("🔍 Testing CORS Headers...")
    try:
        response = requests.options(f"{BACKEND_URL}/", timeout=10)
        headers = response.headers
        
        # Check for CORS headers
        cors_headers = [
            "Access-Control-Allow-Origin",
            "Access-Control-Allow-Methods",
            "Access-Control-Allow-Headers"
        ]
        
        cors_ok = True
        for header in cors_headers:
            if header not in headers:
                print(f"❌ Missing CORS header: {header}")
                cors_ok = False
        
        if cors_ok:
            print("✅ CORS headers test passed")
            return True
        else:
            print("❌ CORS headers test failed")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ CORS headers test failed - connection error: {e}")
        return False

def test_database_connectivity():
    """Test database connectivity by creating and retrieving data"""
    print("🔍 Testing Database Connectivity...")
    
    # Create a test record
    success, record_id = test_create_status_check()
    if not success:
        print("❌ Database connectivity test failed - could not create record")
        return False
    
    # Retrieve records to verify database read
    if test_get_status_checks():
        print("✅ Database connectivity test passed")
        return True
    else:
        print("❌ Database connectivity test failed - could not retrieve records")
        return False

def run_all_tests():
    """Run all backend tests"""
    print("=" * 60)
    print("🚀 Starting Backend API Test Suite")
    print("=" * 60)
    
    tests = [
        ("Backend Health Check", test_backend_health),
        ("CORS Headers", test_cors_headers),
        ("Database Connectivity", test_database_connectivity),
    ]
    
    results = []
    
    for test_name, test_func in tests:
        print(f"\n📋 Running: {test_name}")
        try:
            result = test_func()
            results.append((test_name, result))
        except Exception as e:
            print(f"❌ {test_name} failed with exception: {e}")
            results.append((test_name, False))
    
    # Summary
    print("\n" + "=" * 60)
    print("📊 TEST RESULTS SUMMARY")
    print("=" * 60)
    
    passed = 0
    failed = 0
    
    for test_name, result in results:
        status = "✅ PASSED" if result else "❌ FAILED"
        print(f"{test_name}: {status}")
        if result:
            passed += 1
        else:
            failed += 1
    
    print(f"\nTotal Tests: {len(results)}")
    print(f"Passed: {passed}")
    print(f"Failed: {failed}")
    
    if failed == 0:
        print("\n🎉 All backend tests passed! Backend service is working properly.")
        return True
    else:
        print(f"\n⚠️  {failed} test(s) failed. Backend service has issues.")
        return False

if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)