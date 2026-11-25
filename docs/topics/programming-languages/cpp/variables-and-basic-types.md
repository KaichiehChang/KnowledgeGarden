---
layout: default
title: Variables and Basic Types
---

# Variables and Basic Types

## 1. Variables

A **variable** is a named entity associated with an object or reference. An object has a type and can store a value. Its value can be modified unless restricted, such as by `const`.

```cpp
int count{10};  // Definition and initialization
count = 20;     // Assignment
```

A variable's type determines:

- What values it can represent.
- What operations are supported.
- Its storage requirements and representation.

### Fundamental Types

| Type | Description | Typical Size |
|---|---|---|
| `bool` | Boolean (`true` or `false`) | 1 byte |
| `char` | Character / small integer type | 1 byte |
| `int` | Signed integer | 4 bytes |
| `long long` | Signed integer | 8 bytes |
| `float` | Single-precision floating-point | 4 bytes |
| `double` | Double-precision floating-point | 8 bytes |

**Important notes:**

- Type sizes are implementation-dependent. The table shows common implementations.
- `sizeof` returns an object's or type's size in bytes, with result type `std::size_t`.
- `sizeof(char)` is always `1`, although a C++ byte is not required to contain exactly 8 bits.
- The sizes listed above are typical values, not universal guarantees. The actual size of fundamental types is implementation-dependent and may vary across platforms, compilers, and ABIs. Use sizeof to determine the size of a type on a specific implementation.

```cpp
sizeof(int);
sizeof(double);
sizeof(count);
```

## 2. Initialization and Assignment

**Initialization** provides an initial value when an object is created. **Assignment** modifies an existing object.

```cpp
int a = 100;    // Copy initialization
int b(100);     // Direct initialization
int c{100};     // Direct-list initialization
int d = {100};  // Copy-list initialization
int e{};        // Value initialization (zero for int)

c = 200;        // Assignment
```

**Why prefer `{}`?**

Brace initialization was introduced in C++11 to provide a consistent initialization syntax and prevent narrowing conversions.

```cpp
int a = 3.9;  // Allowed: fractional part discarded
int b{3.9};   // Error: narrowing conversion
```

However, `=` initialization remains valid and useful. Braces are not universally better, because the initialization forms also differ in overload resolution and handling of `std::initializer_list`.

### Uninitialized Variables

```cpp
int a;    // Uninitialized local variable
int b{};  // Initialized to zero
```

Uninitialized local variables of fundamental types generally have no usable initial value. Reading them before initialization can result in undefined behavior (with additional rules in newer C++ standards).

**Prefer explicit initialization.**

## 3. Literals and Type Conversion

### Literal Types

Literal suffixes specify the type of a literal.

```cpp
123       // int
123L      // long
123LL     // long long
123U      // unsigned int
123UL     // unsigned long
123ULL    // unsigned long long

1.0       // double
1.0f      // float
1.0L      // long double

true      // bool
'a'       // char
```

### Implicit and Explicit Conversion

C++ supports implicit conversions and explicit casts.

```cpp
double a = 3.9;
int b = a;                       // Implicit conversion
int c = static_cast<int>(a);     // Explicit conversion
int d = (int)a;                  // C-style cast
```

For a finite floating-point value representable by the target integer type, conversion to an integer discards the fractional part (truncation toward zero).

Prefer `static_cast<T>(value)` over C-style casts because it makes the intended conversion more explicit and restricts the kinds of conversions allowed.

**Important:** `static_cast` does not automatically check whether a converted value is within the destination type's valid range.

Some conversions are lossless, while others may lose information.

### Floating-Point Precision

Floating-point values have limited precision. Common implementations use IEEE 754 binary floating-point formats, although C++ does not strictly require IEEE 754.

An IEEE 754 floating-point number consists of three fields:

| Field | `float` (32-bit) | `double` (64-bit) |
|---|---|---|
| Sign | 1 bit | 1 bit |
| Exponent | 8 bits | 11 bits |
| Fraction (Mantissa) | 23 bits | 52 bits |
| Exponent Bias | 127 | 1023 |
| Precision | ~7 decimal digits | ~15–16 decimal digits |

For a normalized finite number, its value is calculated as:

\[
(-1)^{Sign}\times(1+Fraction)\times 2^{Exponent-Bias}
\]

- **Sign:** Determines whether the number is positive or negative.
- **Exponent:** Determines the power of 2, using a biased representation.
- **Fraction:** Stores the fractional bits of the significand. Normalized numbers have an implicit leading `1`, providing 24 bits of precision for `float` and 53 bits for `double`.

**Example: Representing 3.5 as `float`**

```text
3.5 = 11.1 (binary)
    = 1.11 × 2^1

Sign     = 0
Exponent = 1 + 127 = 128
Fraction = 11000000000000000000000
```

### Precision Limitations

Floating-point precision is limited in two important ways:

1. **Fractional precision:** Many decimal fractions, such as `3.3`, cannot be represented exactly in binary.
2. **Large-value precision:** As the magnitude increases, the spacing between adjacent representable values also increases.

For IEEE 754 binary32 and binary64:

- `float` has 24 bits of significand precision and can represent every integer up to \(2^{24}\) exactly.
- `double` has 53 bits of significand precision and can represent every integer up to \(2^{53}\) exactly.
- Beyond these thresholds, not every consecutive integer is representable.

```cpp
float a = 3.3f;
double b = 3.3;
float c = static_cast<float>(b);

// Large-value precision
constexpr float x = 16777216.0f;             // 2^24
constexpr double y = 9007199254740992.0;    // 2^53

static_assert(x + 1.0f == x);
static_assert(y + 1.0 == y);
```

Converting `double` to `float` may lose precision. Floating-point precision is limited by the number of significand bits, so both small fractional differences and large integer differences may become unrepresentable.

**Note:** Zero, subnormal numbers, infinity, and NaN use special encodings and are not covered by the normalized-number formula above.

## 4. Operators and Expressions

### Arithmetic Operators

| Operator | Meaning |
|---|---|
| `+` | Addition |
| `-` | Subtraction |
| `*` | Multiplication |
| `/` | Division |
| `%` | Remainder |
| `++`, `--` | Increment / decrement |
| `+=`, `-=`, `*=`, `/=`, `%=` | Compound assignment |

```cpp
int a = 5 / 2;       // 2: integer division
double b = 5.0 / 2;  // 2.5: floating-point division
int c = 5 % 2;       // 1: remainder
```

- Integer division truncates toward zero.
- `%` operates on integral types.
- Integer division or remainder with a zero divisor causes undefined behavior.
- Signed integer overflow causes undefined behavior.

### Comparison Operators

```cpp
==  // Equal
!=  // Not equal
<   // Less than
<=  // Less than or equal
>   // Greater than
>=  // Greater than or equal
```

Comparison operators generally produce a `bool`.

### Logical and Bitwise Operators

| Logical | Meaning | Bitwise | Meaning |
|---|---|---|---|
| `&&` | AND | `&` | AND |
| `\|\|` | OR | `\|` | OR |
| `!` | NOT | `~` | NOT |
| | | `^` | XOR |
| | | `<<`, `>>` | Shift |

Logical operators operate on values converted to `bool`. `&&` and `||` use short-circuit evaluation.

Bitwise operators operate on the bit representations of integral values.

### Precedence and Evaluation Order

Use parentheses to clarify operator precedence and grouping.

```cpp
int a = 2 + 3 * 4;    // 14
int b = (2 + 3) * 4;  // 20
```

Parentheses control grouping, but do not necessarily determine evaluation order.

**Maximal Munch Rule:** The compiler generally recognizes the longest possible token, even if the resulting expression is invalid, with only a few explicitly defined exceptions.

```cpp
a+++b;       // Valid: a++ + b
a++++b;      // Error: tokens are a ++ ++ b
a+++++b;     // Error: tokens are a ++ ++ + b

a++ + ++b;   // Valid: modifies different variables
a++ + ++a;   // Undefined behavior: unsequenced modifications
a+++a;       // Undefined behavior: unsequenced modification and read
```

**Why does `a+++++b` fail?**

It is effectively parsed as `((a++)++) + b`. Postfix `a++` produces a prvalue, but the built-in increment operator requires a modifiable lvalue.

Avoid complex expressions that modify the same variable multiple times. Prefer separate statements for clarity.

## 5. Scope, Lifetime, and Storage Duration

### Scope

**Scope** determines where a name can be referenced.

```cpp
int globalCount{};  // Namespace scope

void example() {
    int x{10};

    {
        int y{20};
        x += y;  // Outer-scope variable is accessible
    }

    // y is out of scope
}
```

- **Local variables:** Declared inside a block or function.
- **Global variables:** Commonly refers to variables declared at namespace scope, outside functions.
- `extern`: Can declare a variable defined elsewhere, including another translation unit, provided the linkage and declarations are correct.

### Lifetime and Storage Duration

**Lifetime** determines when an object exists.

**Storage duration** determines how long storage for the object is maintained.

Common storage durations:

| Storage Duration | Description |
|---|---|
| Automatic | Typically local variables; storage lasts until block exit |
| Static | Storage exists for the entire program execution |
| Dynamic | Storage is explicitly allocated and deallocated, or managed by an allocator |
| Thread | Storage exists for the lifetime of a thread |

**Note:** Static storage duration is not the same as the `static` keyword. Namespace-scope variables, function-local `static` variables, and static data members generally have static storage duration, even when the `static` keyword is not explicitly used (e.g., global variables). The `static` keyword can also affect linkage or have other meanings depending on context. Variables declared with `thread_local` have thread storage duration instead, even when combined with `static`.

```cpp
int globalValue{};  // Static storage duration

void example() {
    int localValue{};         // Automatic storage duration
    static int counter{};     // Static storage duration

    {
        int temporary{10};    // Destroyed at block exit
    }
}
```

For ordinary automatic local objects, lifetime generally begins after initialization completes and ends when the block is exited.

Variables with static storage duration are zero-initialized before any applicable further initialization.

## 6. `const`, `constexpr`, and Compile-Time Constants

### `const`

Prevents modification through the declared object after initialization.

```cpp
int input = getValue();
const int value{input};
```

A `const` variable may be initialized with a runtime value.

### `constexpr`

Declares a variable that can be used in constant expressions and requires an appropriate constant-expression initializer.

```cpp
constexpr int count{10};
constexpr int doubled{count * 2};
```

**Guideline:**

- Use `const` when a value must not change after initialization.
- Use `constexpr` when a value is a compile-time constant.
- Prefer `constexpr` for values that are intentionally constant expressions, rather than using it indiscriminately for every immutable variable.

## 7. Type Deduction with `auto`

`auto` lets the compiler deduce a variable's type from its initializer.

```cpp
auto count = 10;       // int
auto price = 3.14;     // double
auto enabled = true;   // bool
auto size = 100ULL;    // unsigned long long
```

### Advantages

- Reduces verbose type declarations.
- Requires initialization.
- Useful with templates, iterators, and complex types.
- Makes code easier to maintain when expression result types change.

### Important Notes

- `auto` normally drops top-level `const` and references during type deduction.
- Use `const auto`, `auto&`, or `const auto&` when appropriate.
- Brace initialization can affect type deduction.

```cpp
const int value{10};

auto a = value;        // int
const auto b = value;  // const int
const auto& c = value; // const int&

auto x{10};            // int
auto y = {10};         // std::initializer_list<int>
```

Use `auto` when the type is obvious or verbose. Prefer an explicit type when it improves readability.

---

[Back to C++]({{ '/topics/programming-languages/cpp/' | relative_url }})