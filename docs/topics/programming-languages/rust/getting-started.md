---
layout: default
title: Rust — Getting Started
---


# Rust — Getting Started

## 1. Rust Source Files and Naming Conventions

Rust source files use the `.rs` extension.

For filenames containing multiple words, the convention is **snake_case**, with words separated by underscores (`_`).

For example:

- `hello_world.rs`
- `file_manager.rs`
- `student_record.rs`

The `snake_case` convention is also commonly used for Rust variables and functions.

## 2. Hello, World!

A simple Rust program:

**File: `hello_world.rs`**

```rust
fn main() {
    println!("Hello, World!");
}
```

### 2.1 Basic Syntax

**Function Definition**

The `fn` keyword declares a function.

```rust
fn main() {
    // Function body
}
```

- `main` is the entry point of a Rust executable program.
- `()` contains the function's parameter list. This `main` function takes no parameters.
- `{}` encloses the function body.
- A function without an explicitly declared return type returns the unit type `()` by default.

**Macros**

```rust
println!("Hello, World!");
```

`println!` is a macro that prints text to standard output, followed by a newline.

The exclamation mark (`!`) indicates a **macro invocation**, rather than a normal function call. The name `println!` does not imply that an ordinary function named `println` exists.

Macros can generate code during compilation and accept syntax that ordinary functions cannot.

**Semicolons**

Semicolons (`;`) are commonly used to terminate statements in Rust.

Rust distinguishes between **statements** and **expressions**. Unlike C/C++, Rust blocks can evaluate to a value.

When a block ends with an expression without a semicolon (a *tail expression*), that expression determines the block's value and type. Adding a semicolon makes it an expression statement and discards its value; a block that then completes normally without a tail expression evaluates to the unit value `()`.

These concepts will be covered in more detail in later notes.

## 3. Compiling with rustc

`rustc` is the Rust compiler. It compiles Rust source code into executable or library artifacts.

Compile a Rust program:

```bash
rustc hello_world.rs
```

For this program, the compiler produces an executable in the current working directory.

Compiler options can control the output name, optimization, debug information, and other settings. For example:

```bash
rustc --edition 2024 hello_world.rs
```

**Note:** When `rustc` is invoked directly without specifying an edition, it defaults to Rust 2015 Edition for backward compatibility. Cargo uses the edition specified in `Cargo.toml`.

## 4. Cargo — Rust Build System and Package Manager

Cargo is Rust's build system and package manager.

Its responsibilities include:

- Creating and organizing Rust projects.
- Building Rust applications and libraries.
- Resolving and downloading external dependencies.
- Managing dependency versions.
- Running tests and development tools.
- Configuring build profiles and compiler settings.

Cargo invokes `rustc` to compile Rust code; it does not replace the compiler.

### 4.1 Creating a Cargo Project

Create a new project:

```bash
cargo new project_name
```

Cargo creates a project directory with a structure similar to:

```text
project_name/
├── src/
│   └── main.rs
├── Cargo.toml
├── .gitignore
└── .git/
```

By default, Cargo initializes a Git repository for a new standalone project. If the project is created inside an existing Git repository, Cargo does not initialize another repository by default.

After development and release builds, additional files and directories appear:

```text
project_name/
├── src/
│   └── main.rs
├── Cargo.toml
├── Cargo.lock
└── target/
    ├── debug/
    └── release/
```

`Cargo.lock` is generated when Cargo resolves dependencies. The `target/debug/` and `target/release/` directories hold artifacts from their respective builds.

**Important files:**

| File / Directory | Purpose |
|---|---|
| `src/main.rs` | Entry point of the executable |
| `Cargo.toml` | Package manifest and configuration |
| `Cargo.lock` | Records exact resolved dependency versions |
| `target/` | Stores generated build artifacts |
| `.gitignore` | Specifies files ignored by Git |

To initialize a Cargo project in an existing directory:

```bash
cargo init
```

### 4.2 Cargo.toml

Cargo uses **TOML (Tom's Obvious, Minimal Language)** for its package manifest.

Example:

```toml
[package]
name = "project_name"
version = "0.1.0"
edition = "2024"

[dependencies]
```

**`[package]`**

Defines package metadata:

- `name`: Package name.
- `version`: Package version.
- `edition`: Rust language edition used to compile the package.

The Rust edition controls language compatibility and available language features. It is not the same as the compiler version.

**`[dependencies]`**

Lists the dependencies required by the package.

For example, add the `regex` crate:

```bash
cargo add regex
```

Cargo updates `Cargo.toml` with the dependency and its version requirement. When needed, Cargo resolves dependency versions, downloads missing crates, and compiles them.

### 4.3 Cargo.lock

`Cargo.toml` specifies **dependency requirements**, while `Cargo.lock` records the **exact versions selected by Cargo**, including transitive (indirect) dependencies.

For example, `regex = "1.10.0"` in `Cargo.toml` normally permits compatible `1.x` releases starting from `1.10.0`; it does not require exactly version `1.10.0`. `Cargo.lock` records the version actually selected.

As long as the lockfile remains compatible with the manifest, Cargo generally reuses those resolved versions instead of selecting newer compatible releases on every build.

For application projects, `Cargo.lock` should generally be committed to version control. This helps keep dependency resolution consistent across development environments and CI, although it does not guarantee identical binaries across different toolchains or build settings.

## 5. Common Cargo Commands

| Command | Description |
|---|---|
| `cargo new project_name` | Create a new package |
| `cargo init` | Initialize a package in an existing directory |
| `cargo build` | Compile using the default development (`dev`) profile |
| `cargo run` | Build and execute the project |
| `cargo check` | Check the code without generating the final executable |
| `cargo build --release` | Build using the release profile |
| `cargo run --release` | Build and execute the release version |
| `cargo add crate_name` | Add an external dependency |
| `cargo test` | Compile and run tests |
| `cargo clean` | Remove generated build artifacts |
| `cargo fmt` | Format Rust source code |
| `cargo clippy` | Run additional Rust lint checks |
| `cargo doc --open` | Generate HTML documentation and open it in a browser |

### cargo build

```bash
cargo build
```

Compiles the project using the default development (`dev`) profile and places the resulting executable under `target/debug/`.

### cargo run

```bash
cargo run
```

Compiles the project if necessary and executes the resulting binary. Cargo reuses existing build artifacts when possible to avoid unnecessary recompilation.

### cargo check

```bash
cargo check
```

Checks the code for compilation errors without generating the final executable. It is generally faster than `cargo build` because it skips final machine-code generation for the checked code.

This is useful for frequent checks during development.

### cargo build --release

```bash
cargo build --release
```

Compiles the project using the release profile and places the resulting executable under `target/release/`.

Release builds generally take longer to compile but may run faster due to additional optimizations. Use optimized builds for meaningful performance benchmarks.

### cargo doc --open

```bash
cargo doc --open
```

Uses **rustdoc** to generate HTML API documentation for the package and its dependencies, stores the output in `target/doc/`, and opens the package documentation in a web browser. Running `cargo doc` without `--open` generates the documentation without opening it.

Rust documentation comments become part of the generated documentation:

- `///` documents the item that follows it, such as a function or struct.
- `//!` documents the enclosing module or crate.

For example:

**File: `src/lib.rs`**

```rust
//! Basic arithmetic utilities.

/// Returns the sum of two integers.
pub fn add(left: i32, right: i32) -> i32 {
    left + right
}
```

To generate documentation only for the current package, without building dependency documentation:

```bash
cargo doc --no-deps --open
```

## 6. Development (Debug) vs. Release Builds

Rust supports **build profiles** that configure how the compiler generates code. Cargo's default development profile is named `dev`; its optimized release profile is named `release`.

### 6.1 Default Profile Comparison

| Setting | Development (`dev`) | Release (`release`) |
|---|---|---|
| Cargo command | `cargo build` | `cargo build --release` |
| Optimization level | `0` | `3` |
| Debug information | Enabled | Disabled |
| Debug assertions | Enabled | Disabled |
| Integer overflow checks | Enabled | Disabled |
| Incremental compilation | Enabled | Disabled |
| Compilation time | Usually shorter | Usually longer |
| Runtime performance | Usually lower | Usually higher |
| Output directory | `target/debug/` | `target/release/` |

These are Cargo's **default** profile settings; they can be customized. Cargo also provides a separately named `debug` profile, which currently inherits the `dev` settings by default.

**Optimization level (`opt-level`)**

Controls the compiler's optimization level:

- `0`: No optimization.
- `1`: Basic optimization.
- `2`: More optimization.
- `3`: Aggressive optimization.
- `s`: Optimize for binary size.
- `z`: More aggressive optimization for binary size.

**Debug information (`debug`)**

Controls whether debug information is generated for tools such as GDB and LLDB. Debug information can also be enabled in release builds.

**Debug assertions (`debug-assertions`)**

Controls checks such as `debug_assert!`. Normal `assert!` checks remain enabled in both profiles.

**Overflow checks (`overflow-checks`)**

Controls runtime checks for integer overflow in operations covered by these checks. They are enabled by default in development builds and disabled by default in release builds.

The difference can affect program behavior when integer arithmetic overflows.

**Incremental compilation (`incremental`)**

Allows the compiler to reuse previously generated compilation artifacts, reducing rebuild time during development.

### 6.2 Customizing Cargo Build Profiles

Build profile settings can be customized in `Cargo.toml`:

```toml
[profile.dev]
opt-level = 1
debug = true
overflow-checks = true

[profile.release]
opt-level = 3
debug = true
overflow-checks = true
```

This example enables debug information and integer overflow checks even in release builds.

A release build does **not** necessarily mean that debugging is disabled. Optimization, debug information, assertions, and overflow checks are configurable settings.

## 7. Development and Release Compilation Without Cargo

When using `rustc` directly, specify the relevant compiler options manually.

### 7.1 Development-Oriented Compilation

```bash
rustc --edition 2024 -g -C opt-level=0 -C debug-assertions=yes -C overflow-checks=yes hello_world.rs
```

| Option | Meaning |
|---|---|
| `--edition 2024` | Use the Rust 2024 Edition |
| `-g` | Generate debug information |
| `-C opt-level=0` | Disable optimization |
| `-C debug-assertions=yes` | Enable debug assertions |
| `-C overflow-checks=yes` | Enable integer overflow checks |

### 7.2 Release-Oriented Compilation

```bash
rustc --edition 2024 -O -C debug-assertions=no -C overflow-checks=no hello_world.rs
```

| Option | Meaning |
|---|---|
| `--edition 2024` | Use the Rust 2024 Edition |
| `-O` | Equivalent to `-C opt-level=3` |
| `-C debug-assertions=no` | Disable debug assertions |
| `-C overflow-checks=no` | Disable integer overflow checks |

These examples illustrate the main differences but do not reproduce every Cargo profile setting.

**Important:** `rustc -g` enables debug information, but does not reproduce the entire Cargo development profile. Likewise, `rustc -O` enables optimization, but is not a complete equivalent of Cargo's release profile.

## 8. Modules and Crates Without Cargo

A **crate** is Rust's fundamental compilation unit. It consists of a **crate root** and its associated modules, which are compiled together as a single unit by `rustc`. A crate can be a **binary crate**, compiled into an executable, or a **library crate**, compiled for use by other crates.

A **module** organizes code within a crate. One crate can contain multiple modules defined across several `.rs` files. **Crate boundaries are determined by the compilation structure, not by file or directory locations.** Multiple files can belong to the same crate, while files in the same directory can belong to separate crates.

A **package** is managed by Cargo and can contain one or more crates. A package can have at most one library crate and multiple binary crates.
### 8.1 Multiple Source Files in One Crate

Modules let a program be split across multiple source files without creating separate crates.

```text
project/
├── main.rs
└── greetings.rs
```

**greetings.rs**

```rust
pub fn greet() {
    println!("Hello from a module!");
}
```

**main.rs**

```rust
mod greetings;

fn main() {
    greetings::greet();
}
```

Compile:

```bash
rustc --edition 2024 main.rs
```

`mod greetings;` declares a module loaded from `greetings.rs`. The `pub` keyword makes `greet` accessible from the parent module. Both files are compiled as part of the same binary crate, so `--extern` is not needed.

### 8.2 Compiling and Linking a Separate Crate

A library can be compiled independently and then used by another crate. The source files and compiled library do not need to be in the same directory as the executable's source file.

**greetings.rs**

```rust
pub fn greet() {
    println!("Hello from a library crate!");
}
```

Compile the library:

```bash
rustc --edition 2024 --crate-type=lib greetings.rs
```

This produces `libgreetings.rlib`, a compiled Rust library artifact, in the current working directory.

Assuming all commands are executed from `project/`, the directory structure is:

```text
project/
├── main.rs
├── greetings.rs
└── libgreetings.rlib
```

The library and executable are **two separate crates**:

- `greetings.rs` is compiled independently as a library crate.
- `main.rs` is compiled as a binary crate that uses the library as an external dependency.

Unlike `mod`, which declares a module within the current crate, `--extern` makes an external crate available to the compiler.

Since Rust 2018, external crates can be accessed directly by their crate names without an explicit `extern crate` declaration.

**main.rs**

```rust
fn main() {
    greetings::greet();
}
```

Compile the executable, specifying the library file:

```bash
rustc --edition 2024 main.rs --extern greetings=libgreetings.rlib
```

**Using a Custom Library Directory**

Alternatively, compiled libraries can be stored in a separate directory.

For example, create a `libs/` directory inside `project/`:

```bash
mkdir libs
```

Compile the library into that directory using `--out-dir`:

```bash
rustc --edition 2024 --crate-type=lib greetings.rs --out-dir libs
```

The resulting structure is:

```text
project/
├── main.rs
├── greetings.rs
└── libs/
    └── libgreetings.rlib
```

The executable can reference the library in either of two ways.

Specify the library path directly:

```bash
rustc --edition 2024 main.rs --extern greetings=libs/libgreetings.rlib
```

Or specify the library search directory:

```bash
rustc --edition 2024 main.rs -L libs --extern greetings
```

All relative paths in these examples are resolved from the current working directory (`project/`).

- `--out-dir PATH` specifies where compiled artifacts are written.
- `--extern NAME=PATH` specifies an external crate and its compiled artifact.
- `-L PATH` adds a library search directory; one directory can contain multiple libraries.
- `--extern NAME` makes an external crate available by name through the search path.
- `-L dependency=PATH` searches for transitive dependencies rather than the direct dependency in this example.

A separate `--extern` argument is normally supplied for each directly used external crate. Cargo handles these compiler arguments automatically during a Cargo build.

## 9. rustc vs. Cargo — Summary

| Aspect | rustc | Cargo |
|---|---|---|
| Primary role | Rust compiler | Build system and package manager |
| Compile Rust code | Yes | Invokes `rustc` |
| Download dependencies | No | Yes |
| Resolve dependency versions | No | Yes |
| Link external Rust crates | Manual configuration | Automatic configuration |
| Configure builds | Compiler arguments | Build profiles and project settings |
| Manage multi-crate builds | Manual coordination | Automatic coordination |
| Recommended usage | Simple programs, experiments, custom builds | General Rust development |

**Key Takeaway**

`rustc` performs the actual compilation of Rust source code.

Cargo organizes and automates the wider development workflow, including dependency resolution, compilation, testing, and build configuration.

For most Rust projects, Cargo should be the default choice. Direct use of `rustc` remains useful for learning how Rust compilation and linking work.

## References

- [The Rust Programming Language — Hello, World!](https://doc.rust-lang.org/book/ch01-02-hello-world.html)
- [The Rust Programming Language — Hello, Cargo!](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)
- [The Rust Programming Language — Functions](https://doc.rust-lang.org/book/ch03-03-how-functions-work.html)
- [The Rust Programming Language — Packages and Crates](https://doc.rust-lang.org/book/ch07-01-packages-and-crates.html)
- [The Cargo Book — Profiles](https://doc.rust-lang.org/cargo/reference/profiles.html)
- [The Cargo Book — cargo doc](https://doc.rust-lang.org/cargo/commands/cargo-doc.html)
- [The rustdoc Book — What is rustdoc?](https://doc.rust-lang.org/rustdoc/what-is-rustdoc.html)
- [The Cargo Book — Cargo.toml vs. Cargo.lock](https://doc.rust-lang.org/cargo/guide/cargo-toml-vs-cargo-lock.html)
- [The Cargo Book — Dependencies](https://doc.rust-lang.org/cargo/guide/dependencies.html)
- [The rustc Book — Command-line Arguments](https://doc.rust-lang.org/rustc/command-line-arguments.html)

---

[Back to Rust]({{ '/topics/programming-languages/rust/' | relative_url }})