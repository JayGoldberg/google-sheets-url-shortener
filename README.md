[![Status](https://img.shields.io/github/license/sampathbalivada/google-sheets-url-shortener.svg?style=plastic)]()

# Google Sheets URL Shortener

## A serverless URL shortener

This URL shortener uses the Google Sheets [Data Visualisation API](https://developers.google.com/chart/interactive/docs/querylanguage) as a backing store for hash to destination URL mapping. No server (Go, Javascript, Python) is necessary, can be statically hosted. Redirects are done by updating `window.location.href` instead of server-issued HTTP `301/302`.

> Disclaimer:
> * sheet needs to be publicly viewable, otherwise the user needs to be logged into a Google account that has READ access to the sheet
> * link format is `yourdomain.tld/#hash`.

## Instructions

### Method 1: Hosting `main.js` yourself

1. At the bottom of `index.html` add:

```javascript
<script>
    //Replace 'YOUR_DOCUMENT_KEY' with the document key of your Google sheet
    let document_key = "YOUR_DOCUMENT_KEY";
    //DEFAULT: 0
    let sheet_number = 0;
</script>
```

### Method 2: Hosting `main.js` on CDN

1. Change the `<script src="main.js">` to:  `<script src="https://cdn.jsdelivr.net/gh/<your_username>/google-sheets-url-shortener/main.js">` (modify for your Github repo)
1. At the bottom of `index.html` add:

```javascript
<script>
    //Replace 'YOUR_DOCUMENT_KEY' with the document key of your Google sheet
    let document_key = "YOUR_DOCUMENT_KEY";
    //DEFAULT: 0
    let sheet_number = 0;
</script>
```

### Getting the `document_key` and `sheet_number` values

1. Get the shareable link of the Google sheet. <br> Example: `https://docs.google.com/spreadsheets/d/1md58QgRgGI-PdmZMY_GJj-fXoX0L78D9AeK2NqOFiqY/edit?usp=sharing`
2. The link is in this format: <br> `https://docs.google.com/spreadsheets/d/{DOCUMENT_KEY}/{PARAMETERS}`
3. The `sheet_number` is `0` if there is only one sheet in the document.

### Sheet Format

The sheet must to be in the below format

ColA | ColB
--- | ---
`r6udix` | `www.google.com`

## Sample Implementation

https://chlorinated-intermediate-sleep.glitch.me/
https://chlorinated-intermediate-sleep.glitch.me/#d6s --> https://javascript.info/promise-chaining#returning-promises
https://chlorinated-intermediate-sleep.glitch.me/#38d --> https://time.com/

## Apps script code for generating random shortlinks

You can use this code via formula `=randomString(3)` in a Google Sheet cell to generate random 3 char shortlink hashes.

```
function randomString(desiredLength) {
  // let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' // 62-variant (238328 combinations), use this one for CAPS chars in the generated string
  let chars = '0123456789abcdefghijklmnopqrstuvwxyz' // 36-variant, 46,656 possible combinations
  let result = '';
  for (let i = desiredLength; i > 0; --i) result += chars[Math.floor(Math.random() * chars.desiredLength)];
  return result;
}
```
