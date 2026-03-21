# Code Quality Setup Guide

This document explains how to use the code quality tools integrated into the backend project.

## Tools Overview

### 1. **Spotless** - Code Formatting

Automatically formats your Java code to a consistent style using Eclipse JDT formatter configured through Spotless.

**Configuration:**

- Configuration file: `eclipse-formatter.xml` in the backend directory
- Spotless plugin configured in `pom.xml` to use Eclipse formatter
- Compatible with Java 17+

**Commands:**

```bash
# Check if files need formatting
mvn spotless:check

# Apply formatting to entire backend
mvn spotless:apply

# Check formatting in specific directory
mvn spotless:check -DspotlessFiles=src/main/java/com/example/appointment/
```

**What it does:**

- Enforces consistent indentation, spacing, and line breaks
- Uses Eclipse JDT formatter for reliable, proven formatting
- Can be integrated into your build process and CI/CD pipeline

**Optional: IDE Integration**

For convenience, you can also configure your IDE to use `eclipse-formatter.xml` for visual feedback while coding (though `mvn spotless:apply` is the source of truth):

**IntelliJ IDEA Setup:**

1. Go to Settings → Editor → Code Style → Java
2. Click the gear icon → Import Scheme → Eclipse XML Profile
3. Select `backend/eclipse-formatter.xml`

**VS Code Setup:**

1. Install "Extension Pack for Java" extension
2. The formatter can optionally be configured to use the Eclipse profile for preview

### 2. **Checkstyle** - Code Linting

Analyzes your code for violations of coding standards and best practices.

**Commands:**

```bash
# Run checkstyle analysis
mvn checkstyle:check

# Generate detailed HTML report
mvn checkstyle:checkstyle
```

**What it checks:**

- Naming conventions (classes, methods, variables)
- Import organization
- Code complexity (nested if/try depth)
- Method and parameter count
- JavaDoc compliance
- Whitespace and formatting issues

**Configuration:**

- Rules are defined in `checkstyle.xml`
- Modify this file to adjust strictness

### 3. **JUnit 5 + Mockito** - Unit Testing

Write comprehensive unit tests for your services and controllers.

**Key Dependencies:**

- `spring-boot-starter-test` - JUnit 5, Spring Test
- `mockito-core` - Mocking library
- `mockito-junit-jupiter` - JUnit 5 integration

**Commands:**

```bash
# Run all tests
mvn test

# Run a specific test class
mvn test -Dtest=UserServiceTest

# Run tests with coverage (if Maven Surefire Report is configured)
mvn test surefire-report:report
```

**Example Test Structure:**

```java
@ExtendWith(MockitoExtension.class)
class MyServiceTest {

    @Mock
    private MyRepository repository;

    @InjectMocks
    private MyService service;

    @Test
    void shouldDoSomething() {
        // Arrange
        when(repository.findById(1L)).thenReturn(Optional.of(entity));

        // Act
        MyResult result = service.doSomething(1L);

        // Assert
        assertEquals(expected, result);
        verify(repository).findById(1L);
    }
}
```

## Complete CI/CD Pipeline

Run all code quality checks in sequence:

```bash
# Format code
mvn spotless:apply

# Check formatting was applied
mvn spotless:check

# Run linting
mvn checkstyle:check

# Run tests
mvn test

# Build project
mvn clean package
```

Or use a single command:

```bash
mvn clean spotless:apply spotless:check checkstyle:check test package
```

## Best Practices

### For Formatting

- Always run `mvn spotless:apply` before committing
- Use `mvn spotless:check` in your pre-commit hooks to verify formatting
- Consider configuring your IDE to import `eclipse-formatter.xml` for visual consistency while coding
- Include spotless formatting in your CI/CD pipeline to catch formatting issues early

### For Linting

- Review checkstyle warnings and fix them
- Some projects treat warnings as errors - see `checkstyle.xml`
- Rules can be customized in `checkstyle.xml` to match team standards

### For Testing

- Aim for >80% code coverage
- Write tests for services and critical business logic
- Use meaningful test names with `@DisplayName`
- Follow the Arrange-Act-Assert pattern
- Mock external dependencies using `@Mock`
- Use descriptive assertions and error messages

## Test File Organization

```
src/test/java/com/example/appointment/
├── service/
│   ├── UserServiceTest.java
│   ├── AppointmentServiceTest.java
│   └── BranchServiceTest.java
├── controller/
│   ├── UserControllerTest.java
│   └── AppointmentControllerTest.java
└── repository/
    └── UserRepositoryTest.java
```

## Gradle alternative (if switching from Maven)

If you plan to switch to Gradle, these tools have Gradle equivalents:

- **Spotless**: `com.diffplug.gradle.spotless` plugin
- **Checkstyle**: `checkstyle` Gradle plugin
- **Testing**: Same JUnit 5 + Mockito dependencies

## Troubleshooting

**Issue: Spotless says "Needs formatting, but is read-only"**

- Solution: Ensure the file is not write-protected. Run `mvn spotless:apply` instead of `mvn spotless:check`

**Issue: Spotless fails to find eclipse-formatter.xml**

- Solution: Verify the file exists at `backend/eclipse-formatter.xml` and the path in `pom.xml` is correct
- Try running from the backend directory: `cd backend && mvn spotless:apply`

**Issue: Checkstyle fails on generated code**

- Solution: Add exclusions in `checkstyle.xml` for generated directories

**Issue: Tests fail with "MockitoExtension not found"**

- Solution: Ensure `mockito-junit-jupiter` is added as a test dependency

**Issue: IDE formatter conflicts with Spotless**

- Solution: Make sure your IDE's formatter imports `eclipse-formatter.xml`. The Maven command `mvn spotless:apply` is the source of truth, and the IDE formatter should match it.

## References

- [Spotless Documentation](https://github.com/diffplug/spotless)
- [Spotless Maven Plugin](https://github.com/diffplug/spotless/tree/main/plugin-maven)
- [Eclipse Formatter](https://www.eclipse.org/downloads/packages/)
- [Checkstyle Rules](https://checkstyle.org/checks.html)
- [JUnit 5 Documentation](https://junit.org/junit5/)
- [Mockito Documentation](https://javadoc.io/doc/org.mockito/mockito-core/latest/org/mockito/Mockito.html)
