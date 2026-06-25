/*
We are constantly generating and parsing URLs. 
-> Parsing incoming URLS to process user requests.
-> Creating URLs to communicate with databases, cache, third party apis etc. 


Old school method: 
Create regex to parse legal URLs. 
Con: Very difficult as URLs are quite complex. 


New methdo: 
Use URL API. */
/*INSTANTIATING THE URL OBJECT */
/*Method 1: 
hard code the url */

let url = new URL("https://admin:secret@api.example.com:8443/v1/users?status=active#profile");

console.log(url.href);
/*Method 2: 
Use relative URLs
In real systems, you rarely hard code urls, arther you save the base url in an env variable, and append 
relative paths to it. The engine is smart enough to add missing slashes and stuff.  */

let base_url = "https://api.stripe.com/v1/";

let rel_url = new URL("utility", base_url);

console.log(rel_url.href);

/*In method 2, if the first arg is an abs url, the second argument is ignored: */
let my_url = new URL("https://github.com/", base_url);
console.log(my_url.href);
/*Once you have a URL object, it acts as an intelligent parser. It instantly shatters the string into its distinct components and makes them available as properties.

If we look at our massive myApi URL from above:
https://admin:secret@api.example.com:8443/v1/users?status=active#profile
the full structure is:
protocol://username:password@hostname:port/path?query#hash

Here is exactly how the URL object breaks it down:

myApi.href: "https://admin:secret@api.example.com:8443/v1/users?status=active#profile" (The full string)

myApi.origin: "https://api.example.com:8443" (The core location. Read-only.)

myApi.protocol: "https:" (Note that it includes the colon)

myApi.username: "admin"

myApi.password: "secret"

myApi.host: "api.example.com:8443" (Includes the port)

myApi.hostname: "api.example.com" (Just the name)

myApi.port: "8443"

myApi.pathname: "/v1/users" (Always starts with a slash)

myApi.search: "?status=active" (The query string, including the question mark)

myApi.hash: "#profile" (The fragment identifier, including the hash) */

/*MUTATING URLS: 
Instead of manually mutating the URL string, which can lead to errors, URL API gives us a more a error-free
approach. */

url.password = "new_password";
url.port = "4534";
console.log(url.href);

/*
the URLSearchParameter API:
-> Query string: the string in the URL that comes after the ? Used for passing data like searchfilters, pagination
rules, or tracking codes: 
limit=50&sort=desc&category=shoes
URLSearchParamter api makes it easier to interact with and update the query part of a URL.*/

/*
INTERACTING WITH URLSearchParameter API:

1. Method 1: 
Using the URL constructor:
->When you create a URL object, js automatically attaches an instance of URLSearchParameter to the object's 
.searchParams property. 
-> This instsnce is linked with the URL stored in the url object. 
*/

let myapi = new URL("https://api.example.com/users?role=admin");

let params = myapi.searchParams;

/*Understanding the set method: 
-> Used to set a parameter in the query, and it's corresponding value. 
params.set(name, value)

-> THe parameters must be in string, however if you don't write them in string, js will coerce them any way. But 
depending on coercion is not a good practice. */

params.set(1, 3); 
console.log(typeof(params.get("1"))); // both 1, and 3 converted to string. 


/*
Scenario 1: The key does not exist:
THe key is added.  */

params.set("page", "20");
console.log(myapi.search); //?role=admin&1=3&page=20

/*
Scenario 2: 
The key already exists: 
it is replaced with the new one
 */
params.set("role", "guest");
console.log(myapi.search); //?role=guest&1=3&page=20
/*
Multiple instances exist: 
They all are replaced with the new one */
myapi.search = "?role=guest&1=3&page=20&tag=database&tag=node";
params.set("tag","auth");
console.log(myapi.search);  //?role=guest&1=3&page=20&tag=auth

/*What if I have multiple same named keys, and i want to add one more without replacing them all? 
I use append: */

myapi.search = "?role=guest&1=3&page=20&tag=database&tag=node";
params.append("tag", "auth");
console.log(myapi.search); //?role=guest&1=3&page=20&tag=database&tag=node&tag=auth


/*
Extracting keys, and validating whether keys exist:*/

console.log(params.get("role")); //guest
console.log(params.get("tag")); // will return the first key that matches:  database

console.log(params.has("shiit")); //returns false

/*Removing all instances of a specified key: */
params.delete("tag");
console.log(myapi.search); //?role=guest&1=3&page=20

/*Iterating: 
You can iterate over a URLSearchParam instance just like you do in sets, and maps: */

for (let [key, value] of params) {
    console.log(`Key: ${key}, Value: ${value}`);
}
/*
Key: role, Value: guest
Key: 1, Value: 3
Key: page, Value: 20 */

/**
 Sorting: 
 You can sort the URLSearchParam objects keys as well by alphabetical order. Why would we need this? 
 Client one requests: List=1&auth=admin,
 client 2 requests : auth=admin&List=1,
 before processing these requests, we can sort them so they become the same query, and we donthave to query the
 db, two separate times for the same request.  */
 params.sort()
 console.log(params);

 /*
 Exercise 1: The Analytics Sanitizer (Cache Normalization)
The Scenario:
Your Node.js server acts as a caching layer. Users frequently share links on social media that append tracking tags like utm_source or gclid to the URL. If User A requests ?item=4&utm_source=twitter and User B requests ?item=4&utm_source=facebook, your caching layer will treat them as two entirely different requests and hit the database twice for the exact same item.

Your Task:
Write a function sanitizeUrlForCache(rawUrlString) that strips out any marketing tags, sorts the remaining parameters alphabetically, and returns the clean URL string.

Test Data:

JavaScript
const dirtyUrl = "https://store.com/api/products?id=88&utm_medium=email&category=shoes&utm_source=newsletter";

// Expected Output:
// "https://store.com/api/products?category=shoes&id=88"
Hint: You will need to iterate over the search parameters to find keys starting with "utm_". Be careful when deleting items from an iterable while looping through it. */

const dirtyUrl = "https://store.com/api/products?id=88&utm_medium=email&category=shoes&utm_source=newsletter"
let url1 = new URL(dirtyUrl);
let params_url1 = url1.searchParams;
let url1_keys = [...params_url1.keys()];
for (let key of url1_keys) {
     if (key.startsWith('utm_')) {
        params_url1.delete(key);
     }
}

params_url1.sort();
console.log(url1.href);