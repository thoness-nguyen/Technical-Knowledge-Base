# 🧠 JS Concept: Dictionary-Based Data Structure (Record)

## 🔹 Concept
In TypeScript (or modern JavaScript with typing tools), you can use `Record<key, value>` to define a dictionary-style object where:

- `key`: defines the key type (usually `string` or a specific string literal union).
- `value`: defines the value type for each key.
- You can also nest `Record` with objects to group multiple values per key.

## 💡 Example:
```ts
const gtmFieldMapping: Record<string, { percentageField: string; amountField: string }> = {
  creation: {
    percentageField: "custrecord_gtm_creation_percentage",
    amountField: "custrecord_gtm_amount_at_create",
  },
  closed: {
    percentageField: "custrecord_gtm_closed_percentage",
    amountField: "custrecord_gtm_amount_at_closed",
  },
};
```

## ✅ Use Case
This is helpful when you need to map specific field names to structured field sets. It improves code readability and maintainability.

---

# 🧠 JS Concept: Encapsulation (Object-Oriented Programming)

## 🔹 Concept
Encapsulation is an OOP principle where related data and behavior are grouped together inside a class. This hides internal logic and exposes only what is necessary.

## 💡 Simple Example:
```ts
class Person {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  greet() {
    return \`Hello, my name is \${this.name}\`;
  }
}

const john = new Person("John");
console.log(john.greet()); // Hello, my name is John
```

## ✅ Use Case
Use encapsulation to structure complex logic in a maintainable way, especially in large applications (e.g., services, controllers, etc.).

---

# 🧠 JS Concept: API REST Service

## 🔹 Concept
API (Application Programming Interface) allows different software systems to communicate. REST (Representational State Transfer) is a common style of API using HTTP methods to interact with data.

## 📋 Common HTTP Methods

| Method | Purpose           | Example Route | Description                          |
|--------|-------------------|---------------|--------------------------------------|
| GET    | Retrieve data     | `/customers`  | Fetch data from server               |
| POST   | Create new data   | `/orders`     | Send new data (usually with JSON body) |
| PUT    | Update all data   | `/user/123`   | Replace existing data completely     |
| PATCH  | Update partial data | `/user/123` | Update part of an object             |
| DELETE | Remove data       | `/product/999`| Delete data from server              |

## ✅ Use Case
Used in frontend or backend applications to interact with a database, CRM, ERP, etc.
