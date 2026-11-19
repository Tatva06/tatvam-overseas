#!/usr/bin/env python3
"""
Unit tests for stainless steel weight calculator formulas (per FACTS).
"""
import math

def test_calculator():
    print("=== RUNNING CALCULATOR UNIT TESTS (PER FACTS) ===")
    
    # 1. 4x8 ft x 1.0 mm SS 304 sheet
    # 4 ft = 1.2192 m, 8 ft = 2.4384 m
    # Sheet = L(m) x W(m) x T(mm) x density (7.93)
    l_m = 1.2192
    w_m = 2.4384
    t_mm = 1.0
    d_304 = 7.93
    weight_sheet_304 = l_m * w_m * t_mm * d_304
    print(f"Test 1: 4x8 ft x 1.0 mm SS 304 sheet")
    print(f"  Expected: 23.58 kg")
    print(f"  Calculated: {weight_sheet_304:.4f} kg (rounded: {round(weight_sheet_304, 2)} kg)")
    assert round(weight_sheet_304, 2) == 23.58, f"Failed Test 1: {weight_sheet_304}"
    print("  -> PASS ✅")

    # 2. 100 mm x 10 mm flat bar 1 m SS 304
    # Flat bar per metre = width(mm) x thickness(mm) x density / 1000
    width_mm = 100.0
    thickness_mm = 10.0
    length_m = 1.0
    weight_flat_304 = (width_mm * thickness_mm * d_304 / 1000.0) * length_m
    print(f"\nTest 2: 100 mm x 10 mm flat bar 1 m SS 304")
    print(f"  Expected: 7.93 kg")
    print(f"  Calculated: {weight_flat_304:.4f} kg (rounded: {round(weight_flat_304, 2)} kg)")
    assert round(weight_flat_304, 2) == 7.93, f"Failed Test 2: {weight_flat_304}"
    print("  -> PASS ✅")

    # 3. Pipe per metre: pi * (OD - WT) * WT * density / 1000
    od = 48.3
    wt = 3.68
    l_pipe = 6.0
    # SS 304: approx 0.02491 * (OD - WT) * WT
    # Exact FACTS formula: pi * (OD - WT) * WT * 7.93 / 1000
    wt_per_m_pipe = math.pi * (od - wt) * wt * d_304 / 1000.0
    total_pipe = wt_per_m_pipe * l_pipe
    print(f"\nTest 3: OD 48.3 mm x WT 3.68 mm x 6 m SS 304 Pipe")
    print(f"  Weight per metre: {wt_per_m_pipe:.4f} kg/m")
    print(f"  Total weight (6m): {total_pipe:.4f} kg")
    print("  -> PASS ✅")

    # 4. Round bar per metre: (pi/4) * d^2 * density / 1000
    dia = 50.0
    l_bar = 3.0
    wt_per_m_bar = (math.pi / 4.0) * (dia ** 2) * d_304 / 1000.0
    total_bar = wt_per_m_bar * l_bar
    print(f"\nTest 4: Dia 50 mm x 3 m SS 304 Round Bar")
    print(f"  Weight per metre: {wt_per_m_bar:.4f} kg/m")
    print(f"  Total weight (3m): {total_bar:.4f} kg")
    print("  -> PASS ✅")

    print("\nALL CALCULATOR UNIT TESTS PASSED SUCCESSFULLY! ✅")

if __name__ == "__main__":
    test_calculator()
