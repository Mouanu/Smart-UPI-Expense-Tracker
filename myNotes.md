What is PapaParse?
PapaParse is a powerful JavaScript library that allows you to parse CSV files in the browser (or in Node.js) easily and efficiently.

It reads .csv files and turns them into JavaScript objects or arrays that you can then use in your app.


🔍 Why is PapaParse useful?
✅ No need for a backend to read CSV — works directly in-browser
✅ Supports large files (uses streaming)
✅ Can handle headers, quotes, delimiters, etc.
✅ Can convert CSV to JSON and vice versa
✅ Very fast and battle-tested

📌 What is complete in PapaParse?
The complete is a callback function that PapaParse calls once it finishes parsing the entire CSV file.

Why is Papa.parse() considered asynchronous?
PapaParse behaves asynchronously when parsing files like .csv from a file input, because:

Reading a file (especially large ones) takes time.

We don't want to freeze the UI while parsing.

So instead of blocking, PapaParse says:

“Let me handle this in the background.
When I'm done, I’ll call your complete() function.”

That’s asynchronous behavior using a callback



###
for (const [cat, words] of Object.entries(keywords)) {
Object.entries(keywords) turns the object into an array of [key, value] pairs like:

js
Copy
Edit
[
  ["Food & Dining", ["swiggy", "zomato", ...]],
  ["Transport", ["uber", "ola", ...]],
  ...
]
}
What is .some()?
.some() is an array method in JavaScript that checks:

🔹 “Does at least one item in this array make the given condition true?”

It stops as soon as it finds the first match — and returns true.
If none match, it returns false.


🧠 What is Object.entries()?
It takes an object and converts it into an array of key-value pairs.


This is such a **powerful and thoughtful** question, Anushila! 💡
You're now asking:

> “How does `.map()` know to return an array of objects? Does it decide that because objects are coming multiple times?”

Let’s break this down clearly and **deeply**. 👇

---

### 🧠 First: What does `.map()` do in JavaScript?

`.map()` is a **built-in Array method**.

Its job is very simple:

> 🧪 “Go through each element in an array, run a function on it, and collect all return values into a new array.”

---

### 📌 Important:

* `.map()` doesn’t care *what* the function returns.
* It just collects the returned value from **each iteration**.
* If your function returns an object → it collects objects
* If your function returns a number → it collects numbers
* If it returns JSX → it collects JSX (in React)
* If it returns nothing → it collects `undefined`

---

### 🔍 Your case:

```js
data.map(categorizeTransaction)
```

➡️ You pass a function (`categorizeTransaction`)
➡️ That function returns an object like:

```js
{
  ...row,
  Category: "Shopping",
  Direction: "Outflow"
}
```

So `.map()` builds:

```js
[
  { ... },  // ← from row 1
  { ... },  // ← from row 2
  ...
]
```

💥 So YES — **`map` creates an array** — but not *because* you’re returning objects.
It does that **by design**.

---

### 🧠 Analogy:

> Imagine `.map()` as a tray-moving robot:
> It visits every table (item in the array), takes whatever you give it, and puts it into a new tray (new array).
> Doesn’t matter if you give it:
>
> * 🍎 an apple (object)
> * 🔢 a number
> * 📝 a string

It’ll collect it and build:

```js
[apple, number, string]
```

---

### ✅ Summary:

* `map()` **always returns an array**
* Each element in that array is **whatever your callback returns**
* It doesn’t “know” the result is an object — it just **collects what you return**

---

### 🎁 Quick test:

```js
const nums = [1, 2, 3];

const result = nums.map(n => n * 2);   // [2, 4, 6]
const result2 = nums.map(n => ({ num: n }));  // [{num: 1}, {num: 2}, {num: 3}]
```

---

Let me know if you want to build a tiny custom `map()` yourself to understand this even deeper — it’s a fun micro-challenge 🔧✨
