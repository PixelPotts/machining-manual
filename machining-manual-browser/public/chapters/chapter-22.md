# Chapter 22: Cost Analysis and Production Economics

## 22.1 Introduction to Manufacturing Cost Analysis

Cost analysis in aerospace machining requires sophisticated understanding of both direct and indirect cost drivers that impact profitability and competitiveness. This chapter provides comprehensive frameworks for analyzing manufacturing costs, optimizing production economics, and making data-driven decisions that improve both efficiency and profitability.

### Manufacturing Cost Structure Framework

**Direct Cost Categories:**
```
Material Costs:
- Raw material purchase price
- Material utilization efficiency  
- Scrap and waste material costs
- Material handling and storage costs
- Inventory carrying costs

Labor Costs:
- Direct machining labor
- Setup and changeover time
- Quality inspection time
- Material handling labor
- Supervision and support

Tooling Costs:
- Initial tool purchase price
- Tool replacement frequency
- Tool maintenance and reconditioning
- Tooling inventory and storage
- Special fixture and workholding costs
```

**Indirect Cost Categories:**
```
Machine and Equipment:
- Equipment depreciation
- Maintenance and repair costs
- Utilities (power, compressed air, coolant)
- Floor space allocation
- Insurance and taxes

Overhead Allocation:
- Facility costs (rent, utilities, maintenance)
- Administrative support
- Quality assurance systems
- Engineering support
- IT infrastructure and software

Support Services:
- Shipping and receiving
- Quality control and inspection
- Production planning and scheduling
- Customer service and sales support
- Research and development
```

### Cost Accounting Methodologies

**Activity-Based Costing (ABC):**
```
Cost Driver Identification:
Machine Setup Activity:
- Driver: Number of setups per period
- Rate: Setup cost per occurrence
- Assignment: Based on actual setup frequency

Quality Inspection Activity:
- Driver: Number of inspection hours
- Rate: Hourly inspection cost
- Assignment: Based on inspection time per part

Material Handling Activity:
- Driver: Number of material moves
- Rate: Cost per material handling transaction
- Assignment: Based on production complexity

Calculation Example:
Total Setup Costs: $50,000/month
Number of Setups: 200/month
Setup Rate: $250 per setup

Part A: 10 setups/month × $250 = $2,500 setup cost
Part B: 5 setups/month × $250 = $1,250 setup cost
```

**Standard Cost System Implementation:**
```
Standard Cost Development:
Material Standards:
- Standard quantity per unit
- Standard price per unit of material
- Scrap and yield factors
- Purchasing and handling allowances

Labor Standards:
- Standard time per operation
- Standard hourly rates by skill level
- Setup time allowances
- Learning curve considerations

Overhead Standards:
- Variable overhead rates
- Fixed overhead allocation bases
- Capacity utilization assumptions
- Activity-based overhead pools

Variance Analysis:
Material Variances:
- Price variance: (Actual Price - Standard Price) × Actual Quantity
- Quantity variance: (Actual Quantity - Standard Quantity) × Standard Price

Labor Variances:
- Rate variance: (Actual Rate - Standard Rate) × Actual Hours
- Efficiency variance: (Actual Hours - Standard Hours) × Standard Rate
```

## 22.2 Direct Cost Analysis and Optimization

### Material Cost Management

**Buy-to-Fly Ratio Optimization:**
```
Calculation Framework:
Buy-to-Fly Ratio = Raw Material Weight / Finished Part Weight

Industry Benchmarks:
Aluminum Parts: 3:1 to 8:1 typical
Titanium Parts: 10:1 to 20:1 typical
Inconel Parts: 15:1 to 25:1 typical

Cost Impact Analysis:
Raw Material Cost: $50/lb (titanium)
Part Weight: 2.5 lbs
Buy-to-Fly Ratio: 15:1

Raw Material Required: 2.5 × 15 = 37.5 lbs
Material Cost per Part: 37.5 × $50 = $1,875

Improvement Strategies:
- Near-net-shape manufacturing (forging, casting)
- Advanced material removal strategies
- Material recycling and reclamation
- Supplier partnership for material efficiency
```

**Material Utilization Improvement:**
```
Nesting and Programming Optimization:
Sheet Material Utilization:
- Computer-aided nesting software
- Remnant material tracking and reuse
- Batch cutting strategies
- Common line cutting techniques

Target Utilization Rates:
Sheet Metal: 75-85% typical
Bar Stock: 80-90% typical
Castings/Forgings: 90-95% typical

Cost Reduction Example:
Current Utilization: 70%
Improved Utilization: 82%
Material Savings: (82-70)/70 = 17.1%
Annual Material Cost: $2M
Annual Savings: $2M × 0.171 = $342,000
```

### Labor Cost Analysis

**Labor Rate Structure:**
```
Comprehensive Labor Cost Calculation:
Base Hourly Wage: $35.00
Benefits (35% of base): $12.25
Payroll Taxes (10% of base): $3.50
Overtime Premium (15% average): $5.25
Training and Development: $2.00
Total Loaded Labor Rate: $58.00/hour

Skill Level Differentiation:
Apprentice Machinist: $45.00/hour loaded
Journey-level Machinist: $58.00/hour loaded  
CNC Programmer/Setup: $68.00/hour loaded
Lead Machinist/Inspector: $72.00/hour loaded
```

**Labor Efficiency Analysis:**
```
Productivity Measurement:
Standard Hours vs. Actual Hours:
Efficiency = Standard Hours / Actual Hours × 100%

Example Analysis:
Part Standard Time: 2.5 hours
Actual Time Required: 3.1 hours
Labor Efficiency: 2.5/3.1 × 100% = 80.6%

Cost Impact:
Standard Labor Cost: 2.5 × $58 = $145.00
Actual Labor Cost: 3.1 × $58 = $179.80
Efficiency Loss Cost: $34.80 per part

Annual Volume: 5,000 parts
Annual Efficiency Loss: $174,000

Root Cause Analysis:
- Setup time optimization opportunities
- Training and skill development needs
- Tooling and fixture improvements
- Process standardization requirements
```

### Tooling Cost Optimization

**Tool Life Economics:**
```
Tool Cost per Part Calculation:
Tool Cost per Edge: $25.00
Tool Life: 150 parts per edge
Tool Changes per Part: 1/150 = 0.0067
Tool Cost per Part: $25 × 0.0067 = $0.167

Total Tool Cost Analysis:
Initial Tool Cost: $25.00
Reconditioning Cost: $8.00 (3 times)
Total Tool Investment: $49.00
Total Parts Produced: 150 + (3 × 120) = 510 parts
Tool Cost per Part: $49.00 ÷ 510 = $0.096

Optimization Strategies:
Higher-Performance Tools:
Initial Cost: $45.00 (+80%)
Tool Life: 275 parts (+83%)
Cost per Part: $45.00 ÷ 275 = $0.164
Decision: Standard tool more economical

Cutting Parameter Optimization:
Conservative Parameters: 150 parts tool life
Optimized Parameters: 200 parts tool life (+33%)
Cost per Part Reduction: 25%
```

**Tool Management System ROI:**
```
Investment Analysis:
Tool Management System Cost: $150,000
Implementation and Training: $25,000
Total Investment: $175,000

Annual Benefits:
Tool Inventory Reduction: $75,000
Setup Time Reduction: $45,000
Tool Life Improvement: $35,000
Quality Improvement: $25,000
Total Annual Benefits: $180,000

ROI Calculation:
Payback Period: $175,000 ÷ $180,000 = 0.97 years
5-Year NPV (10% discount): $507,000
Internal Rate of Return: 102%
```

## 22.3 Machine and Equipment Cost Analysis

### Machine Hour Rate Calculation

**Comprehensive Machine Cost Model:**
```
Annual Fixed Costs:
Equipment Depreciation:
Machine Cost: $500,000
Depreciation Period: 10 years
Annual Depreciation: $50,000

Facility Allocation:
Floor Space: 200 sq ft
Facility Cost: $25/sq ft/year
Annual Facility Cost: $5,000

Insurance and Taxes:
Equipment Value: $500,000
Rate: 1.5% annually
Annual Cost: $7,500

Total Annual Fixed Costs: $62,500

Annual Variable Costs:
Maintenance and Repair: $15,000
Utilities (power, air, coolant): $12,000
Tooling and consumables: $18,000
Total Annual Variable Costs: $45,000

Machine Utilization:
Available Hours: 8,760 hours/year
Planned Downtime: 1,500 hours (maintenance, holidays)
Unplanned Downtime: 500 hours (repairs, setup)
Productive Hours: 6,760 hours/year

Machine Hour Rate:
Fixed Cost Rate: $62,500 ÷ 6,760 = $9.25/hour
Variable Cost Rate: $45,000 ÷ 6,760 = $6.66/hour
Total Machine Rate: $15.91/hour
```

**Equipment Utilization Optimization:**
```
Overall Equipment Effectiveness (OEE):
OEE = Availability × Performance × Quality

Availability = Operating Time / Planned Production Time
Performance = Actual Production Rate / Theoretical Maximum Rate
Quality = Good Parts / Total Parts Produced

Current State Analysis:
Availability: 85% (downtime reduction opportunity)
Performance: 78% (speed optimization opportunity)  
Quality: 96% (defect reduction opportunity)
Current OEE: 85% × 78% × 96% = 63.6%

Improvement Targets:
Availability: 92% (+7 percentage points)
Performance: 88% (+10 percentage points)
Quality: 98% (+2 percentage points)
Target OEE: 92% × 88% × 98% = 79.3%

Financial Impact:
Current Productive Hours: 6,760 × 63.6% = 4,299 hours
Target Productive Hours: 6,760 × 79.3% = 5,361 hours
Additional Productive Capacity: 1,062 hours
Revenue Opportunity: 1,062 hours × $65/hour = $69,030
```

### Capital Investment Analysis

**Equipment Justification Methods:**
```
Net Present Value (NPV) Analysis:
Initial Investment: $750,000
Annual Cash Flows:
Year 1: $185,000
Year 2: $195,000  
Year 3: $205,000
Year 4: $210,000
Year 5: $215,000
Salvage Value: $150,000
Discount Rate: 12%

NPV Calculation:
NPV = Σ[CFt ÷ (1+r)^t] - Initial Investment
NPV = $185,000/1.12 + $195,000/1.12² + ... + $365,000/1.12⁵ - $750,000
NPV = $165,179 + $155,562 + $145,946 + $133,573 + $206,897 - $750,000
NPV = $57,157 (Positive NPV indicates profitable investment)

Internal Rate of Return (IRR):
IRR = Discount rate where NPV = 0
Trial and error or financial calculator: IRR = 14.2%
Decision: IRR > Cost of Capital (12%), Accept project

Payback Period:
Cumulative cash flows to recover initial investment:
Year 1: $185,000 (remaining: $565,000)
Year 2: $380,000 (remaining: $370,000)  
Year 3: $585,000 (remaining: $165,000)
Year 4: $165,000 ÷ $210,000 = 0.79 years

Payback Period: 3.79 years
```

**Lease vs. Buy Analysis:**
```
Purchase Option:
Equipment Cost: $500,000
Down Payment: $100,000  
Financing: $400,000 at 6% for 5 years
Annual Payment: $94,992
Maintenance: $15,000/year (after year 2)
Tax Depreciation: MACRS 7-year
Residual Value: $100,000

Lease Option:
Annual Lease Payment: $125,000
Includes maintenance and service
No residual value
Tax deductible as operating expense

Financial Analysis (5-year comparison):
Purchase Net Cost (PV): $428,500
Lease Net Cost (PV): $450,300
Purchase Advantage: $21,800

Non-Financial Considerations:
Purchase Benefits:
- Asset ownership and residual value
- Equipment modification flexibility
- Long-term cost control

Lease Benefits:
- Lower initial cash requirement
- Predictable operating costs
- Technology upgrade flexibility
- Reduced obsolescence risk
```

## 22.4 Quality Cost Analysis

### Cost of Quality Framework

**Quality Cost Categories:**
```
Prevention Costs:
Quality Planning: $45,000/year
- Process planning and design review
- Quality system development
- Training program development

Process Control: $65,000/year
- Statistical process control implementation
- Process capability studies
- Supplier qualification programs

Total Prevention: $110,000/year

Appraisal Costs:
Incoming Inspection: $35,000/year
- Material and component verification
- Supplier audit programs

In-Process Inspection: $85,000/year
- Dimensional inspection
- Process monitoring
- First article inspection

Final Inspection: $55,000/year
- Functional testing
- Final quality verification
- Packaging inspection

Total Appraisal: $175,000/year

Internal Failure Costs:
Scrap: $125,000/year
- Material waste
- Labor for scrapped parts
- Overhead allocation

Rework: $95,000/year
- Additional labor
- Material for repair
- Re-inspection costs

Total Internal Failure: $220,000/year

External Failure Costs:
Customer Returns: $65,000/year
- Transportation costs
- Investigation time
- Replacement costs

Warranty Claims: $45,000/year
- Field service costs
- Replacement parts
- Customer compensation

Total External Failure: $110,000/year

Total Quality Costs: $615,000/year
```

**Quality Cost Optimization:**
```
Current Quality Cost Distribution:
Prevention: 18% ($110,000)
Appraisal: 28% ($175,000)
Internal Failure: 36% ($220,000)
External Failure: 18% ($110,000)

Optimal Distribution Target:
Prevention: 50-60% of total quality costs
Appraisal: 25-30% of total quality costs
Internal Failure: 15-20% of total quality costs
External Failure: 5-10% of total quality costs

Investment Strategy:
Increase Prevention Investment: +$140,000
Expected Internal Failure Reduction: -$110,000
Expected External Failure Reduction: -$60,000
Expected Appraisal Reduction: -$25,000
Net Annual Savings: $55,000

ROI on Quality Investment:
Investment: $140,000 (first year)
Annual Savings: $55,000 (ongoing)
Payback Period: 2.5 years
5-Year NPV (10% discount): $68,500
```

### Defect Cost Impact Analysis

**Scrap Cost Calculation:**
```
Direct Scrap Costs:
Material Cost: $2,500 per part
Labor Investment: $1,850 per part  
Overhead Allocation: $925 per part
Total Direct Cost: $5,275 per part

Indirect Scrap Costs:
Setup Cost Allocation: $185 per part
Quality Investigation: $125 per part
Administrative Handling: $75 per part
Total Indirect Cost: $385 per part

Total Scrap Cost: $5,660 per part

Annual Impact:
Scrap Rate: 2.5%
Annual Production: 1,000 parts
Scrapped Parts: 25 parts
Annual Scrap Cost: 25 × $5,660 = $141,500

Improvement Opportunity:
Target Scrap Rate: 0.8%
Improved Scrap Parts: 8 parts
Improved Annual Scrap Cost: $45,280
Annual Savings Opportunity: $96,220
```

**Rework Cost Analysis:**
```
Rework Process Costs:
Additional Labor: 3.5 hours × $58/hour = $203
Additional Material: 15% of original = $375
Re-inspection Time: 0.5 hours × $45/hour = $22.50
Supervision and Planning: $35
Total Rework Cost: $635.50 per part

Quality Impact Assessment:
Rework Rate: 8.5% of production
Annual Production: 1,000 parts
Reworked Parts: 85 parts
Annual Rework Cost: 85 × $636 = $54,060

Process Improvement ROI:
Process Control Investment: $25,000
Target Rework Rate Reduction: 8.5% to 3.0%
Reworked Parts Reduction: 55 parts
Annual Savings: 55 × $636 = $34,980
Payback Period: 0.71 years
```

## 22.5 Total Cost of Ownership (TCO) Analysis

### Equipment Lifecycle Costing

**TCO Framework Development:**
```
Acquisition Costs:
Equipment Purchase Price: $650,000
Installation and Setup: $45,000
Initial Training: $15,000
Initial Tooling and Fixtures: $35,000
Total Acquisition: $745,000

Operating Costs (10-year life):
Annual Operating Costs:
- Operator Labor: $120,000/year
- Maintenance Labor: $25,000/year
- Utilities: $18,000/year
- Consumables: $12,000/year
- Insurance: $8,000/year
Total Annual Operating: $183,000
10-Year Operating Costs: $1,830,000

Maintenance and Support:
Annual Preventive Maintenance: $35,000
Annual Corrective Maintenance: $18,000
Software Licenses and Updates: $8,000
Training and Certification: $5,000
Total Annual Maintenance: $66,000
10-Year Maintenance Costs: $660,000

End-of-Life Costs:
Equipment Removal: $8,000
Environmental Disposal: $5,000
Lost Production During Changeover: $25,000
Total End-of-Life: $38,000

Total Cost of Ownership: $3,273,000
```

**TCO Optimization Strategies:**
```
Operating Cost Reduction:
Predictive Maintenance Implementation:
- Investment: $45,000
- Annual Maintenance Reduction: $15,000
- 10-Year Savings: $105,000 (net $60,000)

Energy Efficiency Improvements:
- Investment: $25,000  
- Annual Energy Savings: $5,000
- 10-Year Savings: $25,000 (break-even)

Operator Training Enhancement:
- Investment: $20,000
- Productivity Improvement: 8%
- Annual Value: $28,000
- 10-Year Value: $260,000 (net $240,000)

Total TCO Reduction Opportunity: $300,000
Optimized TCO: $2,973,000
```

### Supplier Total Cost Analysis

**Supplier Cost Evaluation Framework:**
```
Purchase Price Analysis:
Unit Price: $125.00
Annual Volume: 10,000 units
Annual Purchase Value: $1,250,000

Quality-Related Costs:
Incoming Inspection: $5.00 per unit
Supplier Audit Costs: $0.50 per unit
Quality Escapes: $2.00 per unit (average)
Total Quality Costs: $7.50 per unit = $75,000/year

Delivery and Service Costs:
Expediting and Rush Orders: $1.25 per unit
Inventory Carrying: $3.75 per unit
Transportation: $2.50 per unit
Administrative: $0.75 per unit
Total Service Costs: $8.25 per unit = $82,500/year

Risk and Flexibility Costs:
Supply Disruption Risk: $1.00 per unit
Change Order Flexibility: $0.50 per unit
Technology Support: $1.50 per unit
Total Risk Costs: $3.00 per unit = $30,000/year

Total Annual Supplier Cost: $1,437,500
True Cost per Unit: $143.75 (vs. $125.00 purchase price)

Supplier Comparison:
Supplier A: $125.00 purchase + $18.75 other = $143.75
Supplier B: $135.00 purchase + $8.50 other = $143.50
Supplier C: $140.00 purchase + $4.25 other = $144.25

Recommendation: Supplier B provides best total value
```

## 22.6 Cost Reduction and Value Engineering

### Value Engineering Methodology

**Value Engineering Process:**
```
Phase 1: Information Gathering
Function Analysis:
- Primary functions identification
- Secondary functions mapping
- Function cost allocation
- Performance requirements definition

Current Cost Breakdown:
Material: 45% of total cost
Labor: 30% of total cost  
Overhead: 20% of total cost
Profit: 5% of total cost

Phase 2: Creative Exploration
Alternative Approaches:
- Material substitution options
- Process simplification opportunities
- Design for manufacturability
- Make vs. buy analysis

Phase 3: Evaluation and Development
Cost-Benefit Analysis:
Alternative A: 15% cost reduction, $25k implementation
Alternative B: 22% cost reduction, $45k implementation  
Alternative C: 8% cost reduction, $5k implementation

Phase 4: Presentation and Implementation
Implementation Plan:
- Resource requirements
- Timeline and milestones
- Risk assessment and mitigation
- Success metrics and tracking
```

**Design for Manufacturability (DFM):**
```
Material Optimization:
Standard Material Usage:
- Reduce material grade varieties
- Utilize standard stock sizes
- Minimize exotic material requirements
- Design for material utilization efficiency

Tolerance Optimization:
- Apply appropriate tolerance levels
- Use standard machine capabilities
- Minimize inspection requirements
- Design for process capability

Geometric Simplification:
- Reduce setup requirements
- Minimize special tooling needs
- Design for standard processes
- Eliminate non-value-added features

Example DFM Impact:
Original Design Cost: $485 per part
DFM Improvements:
- Material standardization: -$45
- Tolerance relaxation: -$65
- Geometric simplification: -$85
Revised Design Cost: $290 per part
Cost Reduction: 40% ($195 per part)

Annual Volume: 2,500 parts
Annual Savings: $487,500
```

### Process Improvement Economics

**Setup Reduction ROI:**
```
Current State:
Setup Time: 4.5 hours
Setup Labor Rate: $68/hour
Setup Cost per Changeover: $306
Changeovers per Month: 45
Monthly Setup Cost: $13,770
Annual Setup Cost: $165,240

Improvement Investment:
Quick-Change Tooling: $85,000
Training and Implementation: $15,000
Total Investment: $100,000

Future State:
Target Setup Time: 1.2 hours
Setup Cost per Changeover: $82
Monthly Setup Cost: $3,690
Annual Setup Cost: $44,280

Economic Analysis:
Annual Savings: $120,960
Payback Period: 0.83 years
5-Year NPV (12% discount): $335,500
Internal Rate of Return: 118%

Additional Benefits:
Increased Flexibility: $45,000/year value
Reduced WIP Inventory: $75,000 one-time
Quality Improvement: $25,000/year value
Total Annual Benefits: $190,960
```

**Automation Investment Analysis:**
```
Manual Process Costs:
Operator Labor: 2.5 hours × $58/hour = $145
Setup Time: 0.5 hours × $68/hour = $34
Quality Inspection: 0.3 hours × $45/hour = $13.50
Total Manual Cost: $192.50 per part

Automated Process Investment:
Automation System: $485,000
Installation and Programming: $65,000
Training: $15,000
Total Investment: $565,000

Automated Process Costs:
Machine Time: 2.1 hours × $28/hour = $58.80
Operator Monitoring: 0.3 hours × $58/hour = $17.40
Maintenance: $12.50 per part
Total Automated Cost: $88.70 per part

Economics Analysis:
Cost Savings per Part: $103.80
Annual Volume: 5,000 parts
Annual Savings: $519,000
Payback Period: 1.09 years

Risk Factors:
Technology Risk: Medium
Volume Risk: Low (confirmed orders)
Obsolescence Risk: Low (10-year life)
Recommended: Proceed with automation
```

## 22.7 Financial Performance Metrics

### Key Performance Indicators (KPIs)

**Operational Efficiency Metrics:**
```
Overall Equipment Effectiveness (OEE):
Calculation: Availability × Performance × Quality
Target: >85% world-class performance
Current: 73.2%
Improvement Opportunity: 11.8 percentage points

Labor Productivity:
Standard Hours Earned / Actual Hours Worked
Target: >95% efficiency
Current: 87.4%
Improvement Opportunity: 7.6 percentage points

Material Utilization:
Finished Weight / Raw Material Weight
Target: >75% for aluminum, >60% for titanium
Current: 68.3% aluminum, 52.1% titanium

Quality Metrics:
First Pass Yield: Target >99%, Current 96.8%
Scrap Rate: Target <1%, Current 2.3%
Customer PPM: Target <100, Current 285

Cost Performance:
Actual Cost / Standard Cost
Target: <100%, Current 108.5%
Opportunity: 8.5% cost reduction
```

**Financial Performance Indicators:**
```
Gross Margin Analysis:
Revenue per Part: $2,850
Manufacturing Cost per Part: $1,980
Gross Margin: $870 (30.5%)
Industry Target: 35-40%

Return on Assets (ROA):
Net Income: $2.45M
Average Total Assets: $18.7M
ROA: 13.1%
Industry Average: 15-18%

Inventory Turnover:
Cost of Goods Sold: $24.5M
Average Inventory: $4.2M
Turnover: 5.8 times per year
Target: 8-12 times per year

Working Capital Efficiency:
Current Assets: $8.9M
Current Liabilities: $3.2M
Working Capital: $5.7M
Sales per Working Capital: 4.3x
Target: >6x
```

### Benchmarking and Competitive Analysis

**Industry Benchmarking:**
```
Manufacturing Cost Structure Comparison:
Company vs. Industry Average:

Material Costs:
Company: 52% of total cost
Industry: 47% of total cost
Gap: -5 percentage points (unfavorable)

Labor Costs:
Company: 28% of total cost
Industry: 25% of total cost
Gap: -3 percentage points (unfavorable)

Overhead Costs:
Company: 20% of total cost
Industry: 28% of total cost
Gap: +8 percentage points (favorable)

Performance Analysis:
Strengths: Lower overhead structure
Weaknesses: Material and labor efficiency
Opportunities: Material utilization, labor productivity
Threats: Competitive cost pressure
```

**Best Practice Identification:**
```
Leading Company Analysis:
Material Utilization:
Best Practice: 78% aluminum utilization
Achievement Method: Near-net-shape procurement
Implementation Cost: $125,000
Payback Period: 1.2 years

Labor Productivity:
Best Practice: 94% labor efficiency
Achievement Method: Lean manufacturing, automation
Implementation Cost: $350,000
Payback Period: 1.8 years

Quality Performance:
Best Practice: 99.5% first pass yield
Achievement Method: Statistical process control
Implementation Cost: $85,000
Payback Period: 0.9 years

Total Improvement Opportunity:
Investment Required: $560,000
Annual Benefits: $485,000
Net 5-Year Value: $1.28M
```

## 22.8 Investment Decision-Making Framework

### Capital Allocation Strategy

**Investment Priority Matrix:**
```
Project Evaluation Criteria:
Strategic Alignment (Weight: 30%):
- Customer requirements support
- Technology advancement
- Competitive positioning
- Market expansion capability

Financial Return (Weight: 40%):
- Net present value
- Internal rate of return
- Payback period
- Risk-adjusted return

Implementation Risk (Weight: 20%):
- Technical complexity
- Resource requirements
- Timeline uncertainty
- Integration challenges

Operational Impact (Weight: 10%):
- Capacity enhancement
- Quality improvement
- Safety enhancement
- Environmental compliance

Scoring System:
Scale: 1-5 (5 = highest value)
Weighted Score = Σ(Criteria Score × Weight)
Minimum Threshold: 3.5 for approval consideration

Example Project Evaluation:
Project A: Advanced CNC Machine
Strategic: 4 × 30% = 1.20
Financial: 5 × 40% = 2.00
Risk: 3 × 20% = 0.60
Operational: 4 × 10% = 0.40
Total Score: 4.20 (Approved)

Project B: Quality System Upgrade  
Strategic: 3 × 30% = 0.90
Financial: 3 × 40% = 1.20
Risk: 4 × 20% = 0.80
Operational: 5 × 10% = 0.50
Total Score: 3.40 (Rejected - below threshold)
```

### Risk Assessment and Management

**Investment Risk Analysis:**
```
Risk Categories:

Technical Risk:
- Technology maturity level
- Integration complexity
- Performance uncertainty
- Obsolescence potential

Market Risk:
- Demand volatility
- Customer concentration
- Competitive threats
- Economic sensitivity

Financial Risk:
- Cost overrun potential
- Revenue shortfall risk
- Currency exposure
- Interest rate sensitivity

Operational Risk:
- Implementation timeline
- Resource availability
- Skill requirements
- Change management

Risk Quantification:
Probability × Impact = Risk Score
Low Risk: 1-5
Medium Risk: 6-15
High Risk: 16-25

Risk Mitigation Strategies:
High-Risk Projects:
- Phase implementation approach
- Pilot program validation
- Enhanced due diligence
- Contingency planning

Medium-Risk Projects:
- Standard project management
- Regular milestone reviews
- Performance monitoring
- Corrective action protocols
```

**Scenario Analysis:**
```
Investment Sensitivity Analysis:
Base Case Assumptions:
- 100% capacity utilization
- Standard material costs
- 5% annual volume growth
- No competitive pricing pressure

Optimistic Scenario (+20% NPV):
- 110% capacity utilization
- 5% material cost reduction
- 8% annual volume growth
- 2% price premium

Pessimistic Scenario (-35% NPV):
- 85% capacity utilization
- 10% material cost increase
- 2% annual volume growth
- 8% price reduction pressure

Decision Analysis:
Probability weighting:
Optimistic: 25%
Base Case: 50%
Pessimistic: 25%

Expected NPV = (0.25 × $850k) + (0.50 × $625k) + (0.25 × $285k)
Expected NPV = $212.5k + $312.5k + $71.25k = $596.25k

Decision: Positive expected NPV, proceed with investment
```

This comprehensive approach to cost analysis and production economics provides aerospace manufacturers with the tools and frameworks necessary to make informed financial decisions, optimize manufacturing costs, and maintain competitive advantage in the global aerospace market.