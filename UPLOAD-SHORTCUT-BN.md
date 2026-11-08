# ছবি আপলোড — সবচেয়ে ছোট নিয়ম (৩ ধাপ)

**লাইভ গ্যালারি:** https://iamatiq7.github.io/Portfolio/#gallery

---

## ১. সরাসরি আপলোড লিংক (ব্রাউজারে লগইন থাকলেই কাজ করবে)

| অ্যালবাম | আপলোড লিংক |
|---|---|
| Thesis / Research | `https://github.com/iamatiq7/Portfolio/upload/main/src/assets/gallery/thesis` |
| Project teams | `https://github.com/iamatiq7/Portfolio/upload/main/src/assets/gallery/projects` |
| Workshops / Events | `https://github.com/iamatiq7/Portfolio/upload/main/src/assets/gallery/events` |
| University life | `https://github.com/iamatiq7/Portfolio/upload/main/src/assets/gallery/campus` |

## ২. তিন ধাপ

1. উপরের লিংক খুলুন → **Choose your files** → ছবি সিলেক্ট করুন (বা ড্র্যাগ করে ছেড়ে দিন)।
2. নিচে **Commit changes** চাপুন (message লেখার দরকার নেই)।
3. ১–২ মিনিট অপেক্ষা করুন → সাইট নিজে থেকে rebuild হবে → `Ctrl + F5` দিয়ে রিফ্রেশ।

**কোনো কোড, টার্মিনাল বা ডেভেলপার লাগবে না।**

## ৩. ছবির নিয়ম (শুধু ৪টি)

| নিয়ম | মান |
|---|---|
| ফরম্যাট | `.jpg` / `.png` / `.webp` (বড় হাতের `.JPG`-ও এখন কাজ করে) |
| সাইজ | ১৬০০px চওড়া, **৪০০KB-এর নিচে** (সর্বোচ্চ ৬০০KB) |
| নাম | `01-thesis-team.jpg`, `02-presentation.jpg` — নাম্বার দিলে ক্রম ঠিক থাকবে |
| ক্যাপশন | ফাইলের নাম থেকেই অটো হয়; বদলাতে `src/data/portfolio.js` → `gallery.captions` |

## ৪. নতুন অ্যালবাম

`src/assets/gallery/` এ নতুন নামে ফোল্ডার বানালেই সেটি আলাদা অ্যালবাম হয়ে যাবে — কোড বদলাতে হবে না।
(নতুন ফোল্ডার বানাতে: উপরের লিংকে গিয়ে ফাইলের নাম লিখে `new-folder/01.jpg` দিলে ফোল্ডার তৈরি হবে।)

## ৫. আপলোডের আগে চেক (ঐচ্ছিক)

```bash
npm run gallery:check
```

ফরম্যাট ভুল হলে বা ছবি ৮MB-এর বেশি হলে error দেবে; ৬০০KB-এর বেশি হলে warning দেবে।

## ৬. ক্যাপশন বদলানো

`src/data/portfolio.js`:

```js
gallery: {
  captions: {
    'thesis/01-thesis-group.jpg': 'Thesis group — final year, AUST',
    'projects/02-rack-build.jpg': 'Rack build — Square Group backup project',
  }
}
```

## ৭. সমস্যা হলে

| লক্ষণ | কারণ |
|---|---|
| ছবি দেখাচ্ছে না | ফোল্ডারের ভেতরে রাখা হয়নি, বা ফরম্যাট সাপোর্টেড নয় |
| সাইট আপডেট হয়নি | GitHub → **Actions** ট্যাব দেখুন; rebuild শেষ হয়েছে কি না |
| পুরনো ছবি দেখাচ্ছে | `Ctrl + F5` (hard refresh) |
| ক্রম উল্টো | ফাইলের নামে `01-`, `02-` যোগ করুন |
