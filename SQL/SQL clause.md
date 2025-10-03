# Hierarchical Queries

<img width="610" height="98" alt="image" src="https://github.com/user-attachments/assets/5d9180ff-cfa8-46b4-8115-6353d59dc455" />

---

## 1. START WITH
**What it does**: Tells SQL where to begin the tree (the root nodes).  
**Usually**: the row(s) that don’t have a parent.  

**Example**:
```sql
START WITH id IN (-16, -19)
```

## 2. CONNECT BY

What it does: Tells SQL how to walk from parent → child (the relationship rule).
Uses: PRIOR to say which side belongs to the parent row.

**Example:**
```sql
CONNECT BY PRIOR id = parent
-- Take the current row’s id and match it against the next row’s parent.
```

## 3. LEVEL

What it does: Built-in pseudo-column that shows how deep the row is in the tree.

Root = 1
Child = 2
Grandchild = 3

## 4. NOCYCLE 

What is does: prevent infinite loop.

## General Example:
```sql
SELECT LEVEL AS level, id
FROM MediaItemFolder
START WITH id IN (-16, -19)
CONNECT BY PRIOR id = parent;
```
