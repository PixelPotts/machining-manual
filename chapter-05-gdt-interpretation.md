# Chapter 5: GD&T Interpretation for Aerospace Applications

## Table of Contents
- [5.1 Introduction to Aerospace GD&T](#51-introduction-to-aerospace-gdt)
- [5.2 Fundamental GD&T Concepts](#52-fundamental-gdt-concepts)
- [5.3 Datum Systems in Aerospace](#53-datum-systems-in-aerospace)
- [5.4 Form Tolerances](#54-form-tolerances)
- [5.5 Orientation Tolerances](#55-orientation-tolerances)
- [5.6 Location Tolerances](#56-location-tolerances)
- [5.7 Profile Tolerances](#57-profile-tolerances)
- [5.8 Runout and Total Runout](#58-runout-and-total-runout)
- [5.9 Material Condition Modifiers](#59-material-condition-modifiers)
- [5.10 Composite Tolerances](#510-composite-tolerances)
- [5.11 Statistical Tolerancing](#511-statistical-tolerancing)

---

## 5.1 Introduction to Aerospace GD&T

### Why GD&T is Critical in Aerospace

Geometric Dimensioning and Tolerancing (GD&T) is the language of precision in aerospace manufacturing. Unlike traditional coordinate tolerancing, GD&T provides unambiguous communication of design intent, ensuring that parts function properly in assembly while maximizing manufacturing tolerance.

**Aerospace-Specific Benefits:**
- **Functional Design**: Tolerances relate directly to part function
- **Assembly Optimization**: Ensures proper fit and alignment in complex assemblies
- **Manufacturing Efficiency**: Larger tolerance zones mean reduced scrap rates
- **Quality Communication**: Unambiguous requirements between design and manufacturing
- **Cost Reduction**: Optimized tolerances reduce manufacturing costs
- **Regulatory Compliance**: Required for many FAA-certified components

### Aerospace Standards and Requirements

**ASME Y14.5-2018:**
- Current standard for geometric tolerancing
- Supersedes all previous versions
- Mandatory for most US aerospace companies
- Defines symbols, rules, and interpretation methods

**ISO 1101:**
- International equivalent to ASME Y14.5
- Used by European aerospace manufacturers
- Similar concepts with some notation differences
- Important for international aerospace supply chain

**Company-Specific Standards:**
- Boeing D6-51991: Boeing GD&T standard
- Airbus AIMS 02-07-001: Airbus geometric tolerancing
- Often more restrictive than ASME Y14.5
- May include additional symbols and requirements

### GD&T vs. Coordinate Tolerancing

**Traditional Coordinate Tolerancing:**
```
2.500 ±0.005
1.750 ±0.003
```
- Creates rectangular tolerance zones
- May not reflect functional requirements
- Often over-constrains manufacturing
- Difficult to verify with modern measurement systems

**GD&T Approach:**
```
⌖ ⌀0.010 Ⓜ | A | B | C |
```
- Creates cylindrical tolerance zone
- 57% larger than equivalent coordinate tolerance
- Directly relates to function (bolt hole location)
- Optimized for CMM verification

### Economic Impact of GD&T

**Cost Savings Examples:**
- **Position tolerance**: 57% larger tolerance zone than coordinate tolerancing
- **Profile tolerance**: Can control form, orientation, and location simultaneously
- **Maximum Material Condition**: Bonus tolerance as parts approach MMC
- **Statistical tolerancing**: Further tolerance increases with controlled processes

**Quality Improvements:**
- Reduced scrap and rework rates
- Improved assembly fit and function
- Fewer customer complaints and warranty issues
- Enhanced communication between departments

---

## 5.2 Fundamental GD&T Concepts

### The 14 Geometric Tolerances

#### Form Tolerances (No Datum Required)
1. **Straightness** ⎯: Line elements must lie within specified tolerance zone
2. **Flatness** ⊟: Surface must lie within two parallel planes
3. **Circularity** ○: Circular elements must lie within two concentric circles
4. **Cylindricity** ⌭: Surface must lie within two concentric cylinders

#### Orientation Tolerances (Require Datum)
5. **Perpendicularity** ⟂: Feature must be 90° to datum within specified tolerance
6. **Parallelism** ∥: Feature must be parallel to datum within specified tolerance
7. **Angularity** ∠: Feature must be at specified angle to datum within tolerance

#### Location Tolerances (Require Datum)
8. **Position** ⌖: Feature must be at specified location within tolerance zone
9. **Concentricity** ◎: Axis must coincide with datum axis within tolerance
10. **Symmetry** ≡: Feature must be symmetrical about datum plane within tolerance

#### Profile Tolerances (May Use Datums)
11. **Profile of a Line** ⌓: 2D profile must lie within specified tolerance zone
12. **Profile of a Surface** ⌒: 3D surface must lie within specified tolerance zone

#### Runout Tolerances (Require Datum Axis)
13. **Circular Runout** ↗: Circular elements must not exceed specified runout
14. **Total Runout** ↗↗: Entire surface must not exceed specified runout

### Tolerance Zone Concepts

#### Types of Tolerance Zones
**Cylindrical Zones:**
- Position tolerance with ⌀ symbol
- Concentricity and symmetry
- Cylindrical zone around true position
- Most common in aerospace applications

**Parallel Plane Zones:**
- Flatness, parallelism, perpendicularity
- Surface must lie between two parallel planes
- Thickness equals tolerance value

**Parallel Line Zones:**
- Straightness, parallelism of axes
- Feature must lie between two parallel lines
- Width equals tolerance value

**Between Two Concentric Cylinders:**
- Cylindricity and total runout
- Feature must lie between two coaxial cylinders
- Radial thickness equals tolerance value

#### Virtual Condition
**Definition**: The boundary generated by the collective effects of the specified MMC or LMC material condition and the applicable geometric tolerance.

**Calculation:**
- For external features: MMC size + geometric tolerance = Virtual Condition
- For internal features: MMC size - geometric tolerance = Virtual Condition

**Example:**
- Hole: ⌀0.500 +0.005/-0.000, Position ⌀0.010 Ⓜ
- MMC size: 0.500 (smallest hole)
- Virtual Condition: 0.500 - 0.010 = 0.490
- Any pin ≤ 0.490 diameter will always fit

### Rule #1: Individual Feature of Size

**The Rule**: The envelope of perfect form at Maximum Material Condition may not be exceeded.

**Implications:**
- No form tolerance may be larger than the size tolerance
- Parts at MMC must have perfect form
- As parts depart from MMC, form tolerance increases
- Automatically applies unless otherwise specified

**Example:**
- Shaft: ⌀1.000 +0.000/-0.005
- At MMC (⌀1.000): Perfect straightness required
- At 0.997: Straightness tolerance = 0.003
- At LMC (⌀0.995): Straightness tolerance = 0.005

### Feature Control Frames

#### Frame Construction
```
| Geometric Symbol | ⌀ | Tolerance | Material Modifier | | Datum A | Datum B | Datum C |
```

**Required Elements:**
- Geometric characteristic symbol
- Tolerance value (with ⌀ if cylindrical zone)

**Optional Elements:**
- Material condition modifiers (Ⓜ, Ⓛ, Ⓢ)
- Datum references
- Additional modifiers (projected tolerance zone, etc.)

#### Reading Feature Control Frames
**Position Example:**
```
| ⌖ | ⌀ | 0.010 | Ⓜ | | A | B Ⓜ | C |
```

**Translation:**
"True position tolerance of 0.010 diameter at Maximum Material Condition, relative to datum A (primary), datum B at MMC (secondary), and datum C (tertiary)."

---

## 5.3 Datum Systems in Aerospace

### Datum Hierarchy and Precedence

#### Primary Datum (First in DRF)
**Function**: Establishes the primary orientation of the part
**Typical Features**:
- Largest, most stable surface
- Mounting surface in assembly
- Critical functional surface

**Degrees of Freedom Constrained**: 3
- Rotation about two axes
- Translation along one axis perpendicular to datum

#### Secondary Datum (Second in DRF)
**Function**: Establishes orientation within the primary datum plane
**Typical Features**:
- Surface perpendicular to primary datum
- Centerline of mounting holes
- Critical alignment feature

**Additional Degrees of Freedom Constrained**: 2
- Rotation about remaining axis
- Translation along one axis

#### Tertiary Datum (Third in DRF)
**Function**: Completes the coordinate system establishment
**Typical Features**:
- Surface perpendicular to both primary and secondary datums
- Point or line feature
- Often for symmetry or alignment

**Final Degrees of Freedom Constrained**: 1
- Translation along remaining axis

### Datum Feature Symbols and References

#### Datum Feature Symbol
```
⌐A⌐  (Triangle with letter inside square frame)
```
**Application**: Applied to actual part feature
**Rules**:
- One letter per datum feature
- Letters used in alphabetical order (A, B, C, etc.)
- Same letter cannot be used twice on same drawing

#### Datum Reference in Feature Control Frame
```
| A |    Simple datum reference
| A Ⓜ |  Datum reference with MMC modifier
| A-B |   Compound datum (single datum from two features)
```

### Aerospace Datum Strategies

#### Functional Datums
**Principle**: Datums should simulate how part functions in assembly

**Common Aerospace Applications:**
- **Mounting surfaces**: Primary datum = mounting face
- **Bolt holes**: Secondary datum = centerline through mounting holes
- **Alignment features**: Tertiary datum = alignment pin or surface

**Example - Aircraft Bracket:**
- Datum A: Mounting face (contact with aircraft structure)
- Datum B: Centerline through mounting holes
- Datum C: Edge for alignment and orientation

#### Machining vs. Functional Datums
**Machining Datums**: Convenient for manufacturing setup
**Functional Datums**: Related to part function in service

**Best Practice**: Use functional datums on drawings, provide machining datum references in manufacturing instructions.

#### Compound Datums
**Application**: When single feature cannot provide adequate datum
**Notation**: A-B (single datum established from two features)

**Example**: 
- Two holes establishing single centerline datum
- Two surfaces establishing single plane datum
- Provides better stability and repeatability

### Datum Targets

#### When to Use Datum Targets
- Large surfaces with potential form errors
- Castings or forgings with rough surfaces  
- Flexible parts that might distort under clamping
- Assembly simulation requirements

#### Target Types
**Point Targets**: ⊗
- Specify exact contact location
- Minimum area of contact
- Often used with spherical contact points

**Line Targets**: ⊗ with line
- Linear contact along specified path
- Width of contact may be specified
- Common for cylindrical or curved surfaces

**Area Targets**: ⊗ with area outline
- Contact over specified area
- Shape and size defined
- Used when significant contact area needed

#### Target Application Rules
**3-2-1 Target Scheme:**
- Primary datum: 3 targets (minimum for plane)
- Secondary datum: 2 targets (line in primary plane)
- Tertiary datum: 1 target (point in space)

**Target Numbering:**
- A1, A2, A3 for primary datum targets
- B1, B2 for secondary datum targets
- C1 for tertiary datum target

### Special Datum Situations

#### Coaxial Datums
**Application**: When multiple cylindrical features establish single datum axis

**Example**: 
```
Datum A: Established from two coaxial bores
Notation: A (with leader to both bores)
```

**Benefits**:
- Better stability than single bore
- Simulates assembly condition
- Reduces measurement uncertainty

#### Moveable Datum Targets
**Application**: When part shape varies but function remains constant
**Symbol**: ⊗ with M modifier
**Usage**: Automotive/aerospace assemblies with intentional variation

#### Datum Feature at LMC or MMC
**MMC Datum Ⓜ**: 
- Datum established at Maximum Material Condition
- Provides bonus tolerance as datum feature departs from MMC
- Common for bolt holes and mating features

**LMC Datum Ⓛ**:
- Datum established at Least Material Condition
- Less common, used for specific functional requirements

---

## 5.4 Form Tolerances

### Straightness

#### Straightness of Surface Elements
**Symbol**: ⎯
**Definition**: Each line element of the surface must lie within two parallel lines separated by the tolerance value.

**Application Method:**
```
Feature Control Frame Applied to Surface:
Surface → | ⎯ | 0.005 |
```

**Interpretation:**
- Apply to each line element individually
- Direction of line elements implied by view
- No datum reference required
- Independent of feature size

**Measurement Approach:**
- Measure multiple line elements across surface
- Use coordinate measuring machine or straightedge
- Each line element evaluated separately
- Record maximum deviation for each line

**Aerospace Applications:**
- Sealing surfaces requiring smooth engagement
- Guide surfaces for sliding components
- Structural elements under bending loads

#### Straightness of Axis
**Application Method:**
```
Feature Control Frame Applied to Diameter:
⌀0.500 ±0.005 → | ⎯ | ⌀0.010 Ⓜ |
```

**Interpretation:**
- Axis must lie within cylindrical zone
- Diameter of zone equals tolerance value
- MMC modifier provides bonus tolerance
- Related to Rule #1 implications

**Calculation of Bonus Tolerance:**
- At MMC: Straightness tolerance = specified value
- As size departs from MMC: Additional tolerance allowed
- Maximum straightness tolerance = Size tolerance + specified geometric tolerance

**Example:**
- Shaft: ⌀1.000 +0.000/-0.005
- Straightness: ⌀0.002 Ⓜ
- At MMC (⌀1.000): Straightness = ⌀0.002
- At ⌀0.998: Straightness = ⌀0.002 + 0.002 = ⌀0.004
- At LMC (⌀0.995): Straightness = ⌀0.002 + 0.005 = ⌀0.007

### Flatness

#### Surface Flatness
**Symbol**: ⊟
**Definition**: Surface must lie within two parallel planes separated by tolerance value.

**Application Method:**
```
Surface → | ⊟ | 0.005 |
```

**Characteristics:**
- Applies to entire indicated surface
- No datum reference required
- Controls form only (not orientation or location)
- Most restrictive form tolerance

**Measurement Requirements:**
- Sufficient points to characterize entire surface
- Distributed across full surface area
- Mathematical plane fitting (least squares typical)
- Report maximum deviation from fitted plane

**Manufacturing Considerations:**
- Often limits achievable with standard machining
- May require precision grinding or lapping
- Consider surface finish interaction
- Tool deflection and machine accuracy critical

**Aerospace Applications:**
- Sealing surfaces (fuel system components)
- Optical mounting surfaces
- Precision bearing mounting surfaces
- Critical interface surfaces

#### Unit Flatness
**Application**: Large surfaces where local flatness more critical than overall flatness
**Notation**: Flatness tolerance with "per unit area" specification

**Example:**
```
| ⊟ | 0.002/25×25 |
```
**Interpretation**: 0.002 flatness tolerance over any 25mm × 25mm area

### Circularity (Roundness)

#### Basic Circularity
**Symbol**: ○
**Definition**: Each circular element must lie within two concentric circles separated by tolerance value.

**Application Method:**
```
Cylindrical Surface → | ○ | 0.003 |
```

**Measurement Requirements:**
- Single circular cross-section measurement
- Minimum 8 points around circumference
- Even angular distribution preferred
- Multiple cross-sections for complete evaluation

**Evaluation Methods:**
**Least Squares Circle** (Most Common):
- Minimizes sum of squared deviations
- Good for general applications
- Standard CMM default method

**Maximum Inscribed Circle**:
- Largest circle that fits inside measured points
- Conservative approach
- Used for shaft applications

**Minimum Circumscribed Circle**:
- Smallest circle that contains all measured points
- Used for hole applications
- More liberal interpretation

#### Circularity vs. Cylindricity
**Circularity**: Individual cross-sections only
**Cylindricity**: Combines all cross-sections into single evaluation

**When to Use Each:**
- **Circularity**: Local form control, bearing journals, sealing surfaces
- **Cylindricity**: Overall form control, hydraulic cylinders, precision fits

### Cylindricity

#### Complete Cylindrical Control
**Symbol**: ⌭
**Definition**: Surface must lie within two coaxial cylinders separated by tolerance value.

**Application Method:**
```
Cylindrical Surface → | ⌭ | 0.005 |
```

**Characteristics:**
- Most restrictive form control for cylinders
- Controls circularity, straightness, and taper simultaneously
- No datum reference required
- Expensive to measure and manufacture

**Measurement Strategy:**
- Multiple circular cross-sections
- Multiple line elements along length
- Helical scanning for complete coverage
- Best-fit cylinder evaluation

**Manufacturing Challenges:**
- Requires precision grinding or turning
- Tool deflection affects achievable tolerance
- Machine spindle accuracy critical
- Thermal effects significant

**Aerospace Applications:**
- Hydraulic and pneumatic cylinders
- Precision bearing bores
- High-pressure sealing surfaces
- Critical rotating components

---

## 5.5 Orientation Tolerances

### Perpendicularity

#### Surface Perpendicularity
**Symbol**: ⟂
**Definition**: Surface must be within specified tolerance zone perpendicular to datum.

**Application Methods:**

**Surface to Surface:**
```
Surface → | ⟂ | 0.005 | A |
```
- Tolerance zone: Two parallel planes perpendicular to datum A
- Zone separation equals tolerance value

**Surface to Axis:**
```
Surface → | ⟂ | 0.005 | A |
```
Where datum A is established from cylindrical feature
- Tolerance zone: Two parallel planes perpendicular to datum axis A

#### Axis Perpendicularity
**Feature of Size to Surface:**
```
⌀0.250 ±0.005 → | ⟂ | ⌀0.010 Ⓜ | A |
```

**Interpretation:**
- Axis must lie within cylindrical tolerance zone
- Zone diameter equals tolerance value
- Zone axis perpendicular to datum A
- MMC modifier provides bonus tolerance

**Calculation Example:**
- Hole: ⌀0.500 +0.005/-0.000, Perpendicularity: ⌀0.008 Ⓜ to datum A
- At MMC (⌀0.500): Perpendicularity = ⌀0.008
- At ⌀0.503: Perpendicularity = ⌀0.008 + 0.003 = ⌀0.011
- At LMC (⌀0.505): Perpendicularity = ⌀0.008 + 0.005 = ⌀0.013

### Parallelism

#### Surface Parallelism
**Application:**
```
Surface → | ∥ | 0.003 | A |
```

**Interpretation:**
- Surface must lie within two parallel planes
- Planes are parallel to datum A
- Separation equals tolerance value
- Controls orientation only (not distance from datum)

**Measurement Approach:**
1. Establish datum A coordinate system
2. Measure points across controlled surface
3. Fit best plane to measured points
4. Evaluate plane orientation relative to datum A
5. Calculate maximum deviation from parallel

#### Axis Parallelism
**Application:**
```
⌀0.750 ±0.003 → | ∥ | ⌀0.005 Ⓜ | A |
```

**Measurement Strategy:**
1. Establish datum axis A
2. Measure controlled cylindrical feature
3. Determine feature axis
4. Evaluate axis parallelism to datum axis
5. Apply MMC bonus tolerance calculations

### Angularity

#### Specified Angle Control
**Application:**
```
Surface → | ∠ | 0.008 | A |
```
With 30° basic angle dimension

**Interpretation:**
- Surface must be within tolerance zone at specified angle to datum
- Basic angle dimension specifies theoretical exact angle
- Tolerance zone: Two parallel planes at basic angle to datum

**Common Aerospace Angles:**
- 30°, 45°, 60° for structural brackets
- 15°, 75° for aerodynamic surfaces
- Custom angles for specific functional requirements

**Measurement Considerations:**
- Requires angle calculation capability
- CMM software typically handles automatically
- Manual measurement requires trigonometric calculations
- Reference datum critical for accurate results

---

## 5.6 Location Tolerances

### Position Tolerance

#### True Position Fundamentals
**Symbol**: ⌖
**Definition**: Establishes a tolerance zone within which the center, axis, or center plane of a feature may vary from true position.

**Basic Concept:**
- True position defined by basic dimensions
- Basic dimensions are theoretically exact (no tolerance)
- Position tolerance controls deviation from true position
- Typically creates cylindrical tolerance zone

#### Position Tolerance Advantages
**Compared to Coordinate Tolerancing:**

**Coordinate Method:**
```
2.000 ±0.005
1.500 ±0.005
```
- Creates square tolerance zone
- Zone area = 0.010 × 0.010 = 0.0001 sq in

**Position Method:**
```
⌖ ⌀0.014 Ⓜ
```
- Creates circular tolerance zone
- Zone area = π(0.007)² = 0.000154 sq in
- 54% larger tolerance zone!

#### Position Calculation

**2D Position Formula:**
```
Position Error = 2 × √[(X_measured - X_basic)² + (Y_measured - Y_basic)²]
```

**3D Position Formula:**
```
Position Error = 2 × √[(X_measured - X_basic)² + (Y_measured - Y_basic)² + (Z_measured - Z_basic)²]
```

**Why Factor of 2?**
- Formula calculates radius of position error
- Position tolerance specifies diameter of tolerance zone
- Factor of 2 converts radius to diameter

#### Position with MMC

**Standard Application:**
```
⌀0.500 +0.005/-0.000 → | ⌖ | ⌀0.010 Ⓜ | A | B | C |
```

**Bonus Tolerance Calculation:**
- At MMC (⌀0.500): Position tolerance = ⌀0.010
- At ⌀0.503: Position tolerance = ⌀0.010 + 0.003 = ⌀0.013
- At LMC (⌀0.505): Position tolerance = ⌀0.010 + 0.005 = ⌀0.015

**Functional Basis:**
- Larger holes provide more clearance for fasteners
- Bonus tolerance reflects increased assembly flexibility
- Virtual condition remains constant for worst-case design

### Concentricity and Symmetry

#### Concentricity
**Symbol**: ◎
**Definition**: Median points of all diametrically opposed elements of a surface of revolution must be within a cylindrical tolerance zone whose axis coincides with the datum axis.

**Application:**
```
⌀1.000 ±0.005 → | ◎ | ⌀0.005 | A |
```

**Measurement Challenges:**
- Requires measurement of median points
- Difficult and time-consuming to verify
- Often replaced with runout or position tolerances
- High measurement uncertainty

#### Symmetry
**Symbol**: ≡
**Definition**: Median points of all opposed elements of a feature must lie within two parallel planes separated by the tolerance value, which are symmetrically disposed about the datum plane.

**Application:**
```
Width Feature → | ≡ | 0.005 | A |
```

**Modern Practice:**
- Often replaced with position tolerance
- Easier to measure and verify
- Better reflects functional requirements
- Less ambiguous interpretation

### Position vs. Concentricity/Symmetry

**Recommendation**: Use position tolerance instead of concentricity or symmetry when possible.

**Advantages of Position:**
- Easier to measure with CMM
- Less measurement uncertainty
- Clearer functional meaning
- Compatible with statistical tolerancing
- Better manufacturing feedback

**Exception**: Use concentricity only when true median point control is functionally required (rare in aerospace applications).

---

## 5.7 Profile Tolerances

### Profile of a Line

#### 2D Profile Control
**Symbol**: ⌓
**Definition**: Each line element of the surface must be within the specified tolerance zone bounded by two curves that are the locus of centers of circles whose diameter equals the tolerance value.

**Application Methods:**

**Without Datum:**
```
Profile Element → | ⌓ | 0.005 |
```
- Controls form only
- Profile shape defined by basic dimensions
- No orientation or location control

**With Datums:**
```
Profile Element → | ⌓ | 0.005 | A | B | C |
```
- Controls form, orientation, and location
- Profile oriented and located relative to datum reference frame

#### Aerospace Applications
- **Airfoil sections**: Wing and blade profiles
- **Sealing surfaces**: O-ring grooves and gasket surfaces
- **Optical surfaces**: Lens and mirror profiles
- **Structural sections**: Complex bracket profiles

### Profile of a Surface

#### 3D Profile Control
**Symbol**: ⌒
**Definition**: Surface must be within specified tolerance zone bounded by two surfaces that are the locus of centers of spheres whose diameter equals the tolerance value.

**Most Powerful GD&T Control:**
- Can control size, form, orientation, and location simultaneously
- Replaces multiple individual tolerances
- Ideal for complex aerospace surfaces

#### Profile Applications in Aerospace

**Complex Surfaces:**
- Turbine blade surfaces
- Aircraft skin panels
- Antenna reflectors
- Aerodynamic fairings

**Advantages:**
- Single tolerance controls all geometric requirements
- Directly relates to CAD model
- Optimizes tolerance zones
- Reduces number of tolerances on drawing

#### Profile Measurement

**CMM Requirements:**
- High-density point measurement
- CAD model for comparison
- Advanced software for evaluation
- Skilled programming and setup

**Typical Parameters:**
- Point spacing: 0.1-1.0mm depending on surface complexity
- Coverage: Entire specified surface area
- Evaluation: Best-fit, constrained, or projected methods

### Profile Tolerance Zones

#### Bilateral Tolerance (Default)
```
| ⌒ | 0.010 | A | B | C |
```
- Equal tolerance on both sides of true profile
- ±0.005 from true profile
- Most common application

#### Unilateral Tolerance
```
| ⌒ | 0.010 ⊕ | A | B | C |    (Outside material)
| ⌒ | 0.010 ⊖ | A | B | C |    (Inside material)
```

**⊕ Symbol**: All tolerance on outside of material
- Prevents material removal beyond true profile
- Used for minimum material conditions

**⊖ Symbol**: All tolerance on inside of material  
- Prevents excess material beyond true profile
- Used for maximum material conditions

#### Combined Tolerance
```
| ⌒ | 0.015 ⊖ 0.005 | A | B | C |
```
- 0.015 total tolerance
- 0.005 outside material, 0.010 inside material
- Reflects machining and functional requirements

### Profile with Material Condition Modifiers

#### Profile at MMC
```
⌀0.500 +0.005/-0.000 → | ⌒ | 0.008 Ⓜ | A | B | C |
```

**Bonus Tolerance Application:**
- As feature size departs from MMC, profile tolerance increases
- Same calculation as position tolerance
- Functional basis: Larger features provide more assembly clearance

#### Profile and Composite Controls
**Two-Level Control System:**
```
| ⌒ | 0.020 | A | B | C |
| ⌒ | 0.005 |   | B | C |
```

**Upper Control**: Pattern location and orientation relative to all datums
**Lower Control**: Feature-to-feature relationship within pattern (refined orientation and form)

---

## 5.8 Runout and Total Runout

### Circular Runout

#### Definition and Application
**Symbol**: ↗
**Definition**: Each circular element must be within specified tolerance during one complete revolution about the datum axis.

**Application:**
```
Cylindrical Surface → | ↗ | 0.005 | A |
```

**Measurement Process:**
1. Rotate part about datum axis A
2. Hold indicator against single circular element
3. Record maximum indicator variation during one revolution
4. Repeat for multiple circular elements along surface
5. All readings must be within specified tolerance

#### Runout Characteristics
- **Point-by-point control**: Each circular element independent
- **Composite error**: Combines several error sources:
  - Form error (circularity)
  - Coaxiality error
  - Surface texture effects
- **Dynamic measurement**: Measured during rotation
- **Practical tolerance**: Easy to measure with dial indicator

#### Types of Circular Runout
**Radial Runout**: Applied to surfaces perpendicular to datum axis
- Cylindrical surfaces
- Shoulder faces
- Flange surfaces

**Axial Runout**: Applied to surfaces parallel to datum axis
- End faces
- Shoulder surfaces  
- Flange faces

### Total Runout

#### Definition and Application
**Symbol**: ↗↗
**Definition**: Entire surface must be within specified tolerance during rotation about datum axis, with indicator free to move along the surface.

**Application:**
```
Cylindrical Surface → | ↗↗ | 0.008 | A |
```

**Measurement Process:**
1. Rotate part continuously about datum axis A
2. Move indicator along entire surface during rotation
3. Record maximum indicator variation for entire surface
4. Single reading applies to entire controlled surface

#### Total Runout Characteristics
- **Complete surface control**: Single tolerance for entire surface
- **More restrictive**: Controls form, coaxiality, and surface texture
- **Comprehensive error detection**: Finds errors anywhere on surface
- **Manufacturing challenge**: Difficult to achieve tight tolerances

### Runout vs. Other Tolerances

#### Runout vs. Concentricity
**Runout Advantages:**
- Easy to measure with dial indicator
- Practical shop floor verification
- Clear pass/fail criteria
- Relates to functional requirements

**Concentricity Disadvantages:**
- Difficult to measure accurately
- Requires sophisticated equipment
- High measurement uncertainty
- Ambiguous interpretation

#### Runout vs. Position
**When to Use Runout:**
- Dynamic balancing requirements
- Assembly rotation about datum axis
- Simple measurement setup required
- Surface texture effects important

**When to Use Position:**
- Static assembly requirements
- CMM measurement preferred
- Statistical analysis needed
- Complex datum reference frames

### Aerospace Runout Applications

#### Engine Components
- **Turbine disks**: Critical for high-speed rotation
- **Compressor rotors**: Balance and vibration control
- **Bearing journals**: Smooth operation and life
- **Seal surfaces**: Prevent leakage during rotation

#### Landing Gear
- **Wheel hubs**: Tire mounting and balance
- **Actuator rods**: Smooth extension/retraction
- **Pivot pins**: Low friction operation

#### Control Surfaces
- **Hinge pins**: Smooth control surface movement
- **Actuator components**: Precise positioning
- **Bearing surfaces**: Long-life operation

---

## 5.9 Material Condition Modifiers

### Maximum Material Condition (MMC)

#### Definition and Symbol
**Symbol**: Ⓜ
**Definition**: The condition in which a feature of size contains the maximum amount of material within the stated limits of size.

**For External Features** (shafts, bosses):
- MMC = Maximum size = Upper limit of size tolerance
- Example: ⌀1.000 +0.005/-0.000, MMC = ⌀1.005

**For Internal Features** (holes, slots):
- MMC = Minimum size = Lower limit of size tolerance  
- Example: ⌀0.500 +0.005/-0.000, MMC = ⌀0.500

#### MMC Principle
**Fundamental Concept**: As the actual mating envelope of a feature departs from MMC toward LMC, an increase in the stated geometric tolerance equal to the amount of such departure is allowed.

**Bonus Tolerance Formula:**
```
Allowed Geometric Tolerance = Specified Tolerance + |Actual Size - MMC Size|
```

#### MMC Benefits
**Design Benefits:**
- Ensures worst-case fit conditions are met
- Provides additional tolerance for easier manufacturing
- Reflects functional assembly requirements
- Maintains virtual condition boundary

**Manufacturing Benefits:**
- Larger tolerance zones as parts depart from MMC
- Reduced scrap rates
- More economical production
- Easier quality control

### Least Material Condition (LMC)

#### Definition and Symbol  
**Symbol**: Ⓛ
**Definition**: The condition in which a feature of size contains the least amount of material within the stated limits of size.

**For External Features**:
- LMC = Minimum size = Lower limit of size tolerance
- Example: ⌀1.000 +0.005/-0.000, LMC = ⌀1.000

**For Internal Features**:
- LMC = Maximum size = Upper limit of size tolerance
- Example: ⌀0.500 +0.005/-0.000, LMC = ⌀0.505

#### LMC Applications
**When to Use LMC:**
- Minimum wall thickness requirements
- Structural strength considerations
- Maximum clearance limitations
- Weight control requirements

**Example Application:**
```
⌀0.500 +0.005/-0.000 → | ⌖ | ⌀0.010 Ⓛ | A | B | C |
```
- At LMC (⌀0.505): Position tolerance = ⌀0.010
- At ⌀0.503: Position tolerance = ⌀0.010 + 0.002 = ⌀0.012
- At MMC (⌀0.500): Position tolerance = ⌀0.010 + 0.005 = ⌀0.015

### Regardless of Feature Size (RFS)

#### Definition and Symbol
**Symbol**: Ⓢ (or no symbol - default condition)
**Definition**: Indicates that a geometric tolerance or datum reference applies at any increment of size of the feature within its size tolerance.

**Characteristics:**
- No bonus tolerance allowed
- Specified geometric tolerance applies at all sizes
- Default condition when no modifier specified
- Most restrictive material condition

#### When to Use RFS
**Applications:**
- Critical geometric relationships regardless of size
- Precise assembly requirements
- No functional benefit from bonus tolerance
- Measurement system limitations

**Example:**
```
⌀0.500 ±0.005 → | ⌖ | ⌀0.008 | A | B | C |
```
Position tolerance remains ⌀0.008 at all feature sizes.

### Material Condition Applications

#### Fastener Assembly Example
**Bolt and Hole Relationship:**

**Hole specification:**
```
⌀0.257 +0.005/-0.000 → | ⌖ | ⌀0.010 Ⓜ | A | B | C |
```

**Analysis:**
- Virtual Condition = 0.257 - 0.010 = 0.247
- Any bolt ≤ ⌀0.247 will always fit
- As hole gets larger, position tolerance increases
- Functional assembly guaranteed

#### Wall Thickness Control
**Thin Wall Section:**
```
⌀2.000 +0.000/-0.010 → | ⌖ | ⌀0.005 Ⓛ | A | B | C |
```

**Ensures minimum wall thickness:**
- At LMC (⌀2.000): Minimum wall thickness maintained
- As hole gets smaller, more position tolerance allowed
- Structural integrity preserved

### Datum References with Material Conditions

#### MMC Applied to Datums
```
| ⌖ | ⌀0.008 Ⓜ | A | B Ⓜ | C |
```

**Interpretation:**
- Datum B established at MMC
- As datum feature departs from MMC, datum shifts are allowed
- Provides bonus tolerance for controlled feature
- Reflects assembly conditions

#### Datum Shift Calculations
**Complex but powerful concept:**
- Datum shift = |Actual Size - MMC Size| of datum feature
- Controlled feature gets additional tolerance equal to datum shift
- Must consider all datum features with material condition modifiers

---

## 5.10 Composite Tolerances

### Composite Position Tolerancing

#### Two-Level Control System
**Purpose**: Control pattern location separately from feature-to-feature relationships within the pattern.

**Composite Frame Structure:**
```
| ⌖ | ⌀0.020 Ⓜ | A | B | C |  ← Pattern Locating Tolerance
| ⌖ | ⌀0.005 Ⓜ |   | B | C |  ← Feature Relating Tolerance
```

#### Upper Segment (Pattern Locating)
**Function**: Controls location and orientation of entire pattern relative to all specified datums.

**Characteristics:**
- Uses all datums in datum reference frame
- Larger tolerance value typical
- Establishes pattern as single unit
- Simulates assembly requirements

#### Lower Segment (Feature Relating)
**Function**: Controls feature-to-feature relationships within pattern.

**Characteristics:**
- Omits primary datum (shown by blank space)
- Smaller tolerance value typical
- Maintains pattern shape and orientation
- Controls hole-to-hole spacing

#### Aerospace Applications
**Aircraft Wing Bolt Pattern:**
- Upper segment: Positions pattern on wing structure (±0.020)
- Lower segment: Maintains bolt spacing for standard hardware (±0.005)

**Engine Mount Holes:**
- Upper segment: Engine position relative to aircraft (±0.030)  
- Lower segment: Hole pattern matches engine mount (±0.008)

### Composite Profile Tolerancing

#### Surface Profile Example
```
| ⌒ | 0.030 | A | B | C |  ← Size, form, orientation, location
| ⌒ | 0.008 |   | B | C |  ← Form and orientation refined
```

#### Multiple Level Control
**Upper Level**: Complete surface control relative to all datums
**Lower Level**: Refined form and orientation control relative to subset of datums

**Benefits:**
- Optimizes tolerance allocation
- Separates assembly requirements from manufacturing requirements
- Reduces manufacturing cost while maintaining function

### Composite vs. Multiple Single Segment

#### Single Segment Approach
```
| ⌖ | ⌀0.020 Ⓜ | A | B | C |  (Pattern location)
| ⌖ | ⌀0.005 Ⓜ | A | B | C |  (Feature location - WRONG!)
```

**Problems:**
- Each hole controlled independently to all datums
- No recognition of pattern relationship
- Unnecessarily restrictive
- Higher manufacturing cost

#### Composite Approach (Correct)
```
| ⌖ | ⌀0.020 Ⓜ | A | B | C |  (Pattern location)
| ⌖ | ⌀0.005 Ⓜ |   | B | C |  (Feature relating)
```

**Advantages:**
- Recognizes pattern as functional unit
- Optimized tolerance zones
- Lower manufacturing cost
- Better reflects assembly requirements

---

## 5.11 Statistical Tolerancing

### Introduction to Statistical Tolerancing

#### Traditional Worst-Case Analysis
**Assumption**: All parts will be at extreme tolerance conditions simultaneously
**Result**: Very conservative design with small tolerances
**Reality**: Statistical distribution makes extreme combinations unlikely

#### Statistical Approach
**Assumption**: Part dimensions follow normal distribution
**Method**: Use statistical combination of tolerances
**Result**: Larger individual tolerances while maintaining assembly function

### RSS (Root Sum Square) Method

#### Basic Formula
For independent, normally distributed dimensions:
```
Assembly Tolerance = √(T₁² + T₂² + T₃² + ... + Tₙ²)
```

Where T₁, T₂, etc. are individual component tolerances.

#### Comparison Example
**Worst-Case Stack-up:**
- 5 components, each ±0.005
- Assembly tolerance = 5 × 0.005 = ±0.025

**Statistical Stack-up:**
- Same 5 components, each ±0.005  
- Assembly tolerance = √(5 × 0.005²) = √0.000125 = ±0.011

**Individual Tolerance Increase:**
- To achieve same ±0.025 assembly tolerance statistically
- Individual tolerance = ±0.025/√5 = ±0.011 (120% increase!)

### Statistical GD&T Implementation

#### Requirements for Statistical Tolerancing
1. **Process Control**: Processes must be in statistical control (SPC implementation)
2. **Normal Distribution**: Part dimensions must follow approximately normal distribution
3. **Process Capability**: Cpk ≥ 1.67 for all critical characteristics  
4. **Independence**: Component variations must be independent
5. **Documentation**: Statistical methods must be documented and verified

#### Statistical GD&T Symbol
**Symbol**: Ⓢⓣ
**Application**: Added to feature control frame when statistical tolerancing applies

**Example:**
```
| ⌖ | ⌀0.015 Ⓜ Ⓢⓣ | A | B | C |
```

**Interpretation**: Position tolerance calculated using statistical methods rather than worst-case analysis.

### Aerospace Statistical Tolerancing

#### Implementation Requirements
**AS9100 Compliance:**
- Documented statistical methods
- Process capability verification
- Statistical control evidence
- Risk assessment documentation

**Customer Approval:**
- Many aerospace customers require approval before using statistical tolerancing
- May require capability studies and control plans
- Ongoing monitoring and reporting required

#### Benefits in Aerospace Manufacturing
**Cost Reduction:**
- Larger manufacturing tolerances
- Reduced scrap and rework
- Less expensive manufacturing processes
- Improved supplier capability

**Quality Improvement:**
- Focus on process control
- Continuous improvement emphasis  
- Better understanding of variation sources
- Proactive quality management

### Implementation Guidelines

#### Step-by-Step Process
1. **Identify Candidates**: Select assemblies suitable for statistical tolerancing
2. **Analyze Current State**: Evaluate existing process capability
3. **Design Statistical Stack-up**: Calculate new tolerance values
4. **Implement Controls**: Establish SPC and process controls
5. **Validate Results**: Verify assembly function and quality
6. **Document System**: Maintain statistical evidence and controls

#### Monitoring Requirements
**Ongoing Verification:**
- Monthly capability studies
- Control chart monitoring  
- Assembly function verification
- Customer satisfaction tracking
- Continuous improvement activities

**Documentation Maintenance:**
- Statistical method documentation
- Process capability reports
- Control chart data
- Assembly verification results
- Corrective action records

---

## Chapter Summary

This chapter provided comprehensive coverage of GD&T interpretation for aerospace applications:

1. **Fundamental Concepts**: Understanding the 14 geometric tolerances and their applications
2. **Datum Systems**: Proper establishment and use of datum reference frames  
3. **Form Tolerances**: Straightness, flatness, circularity, and cylindricity
4. **Orientation Tolerances**: Perpendicularity, parallelism, and angularity
5. **Location Tolerances**: Position, concentricity, and symmetry
6. **Profile Tolerances**: Line and surface profile for complex geometries
7. **Runout Controls**: Circular and total runout for rotating components
8. **Material Conditions**: MMC, LMC, and RFS applications
9. **Composite Tolerancing**: Two-level control for patterns and complex features
10. **Statistical Tolerancing**: Advanced methods for optimized tolerance allocation

**Key Aerospace Applications:**
- Engine components requiring precise fits and clearances
- Structural assemblies with bolt patterns and mounting interfaces
- Control surfaces with complex profiles and smooth operation requirements
- Landing gear components with critical safety and reliability needs

**Critical Success Factors:**
- Proper datum selection reflecting functional requirements
- Understanding of material condition modifiers and bonus tolerances
- Appropriate measurement methods and equipment selection
- Statistical process control for advanced tolerancing methods

**Remember**: GD&T is a powerful tool that must be applied correctly to achieve its benefits. Always consider functional requirements, manufacturing capabilities, and measurement systems when applying geometric tolerances.

---

**Next Chapter**: Chapter 6: Aluminum Alloys (2024, 6061, 7075) - Properties and Machining

*This chapter contains GD&T interpretation guidelines that must be followed for aerospace compliance. Consult your quality department for customer-specific requirements and interpretations.*