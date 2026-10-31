/* =========================================================
   SAARA CONTENT YAHAN HAI — sirf ye file edit karo ✏️
   ---------------------------------------------------------
   • song:     "songs/level1.mp3" jaisa path daalo (bday/songs/ folder mein file rakho).
               Khaali chhodoge ("") toh music-box wala Happy Birthday bajega.
   • photo:    "img/xyz.jpg" (bday/img/ folder mein file rakho).
   • question: { q: "sawaal", a: "jawab" }
               a: ""                -> koi bhi jawab chalega
               a: "pizza"           -> sirf ye (capital/small aur spaces ignore)
               a: ["pizza","momos"] -> inme se koi bhi
   ========================================================= */

window.BDAY = {
  herName: "BKL",
  from: "— wahi purana pagal 🙃",
  defaultPhoto: "img/her.jpg",
  homeSong: "",

  stages: [
    {
      height: "1'",
      title: "BKL ka birth 👶",
      subtitle: "1 November 2006 🎂",
      type: "photos",
      song: "",
      songName: "",
      photos: [
        { src: "img/baby1.jpg", caption: "itti si BKL 🪔 (side-eye tab se 😤)" },
      ],
      text: [
        "1 November 2006 — duniya ki sabse gori insaan paida hui (ig 😂🤍)",
        "Aur pakka gussa karte hue hi paida hui hogi. Kitnaaaa gussa karti hai yaar… kitnaaaaaaaaaaa 😤 But theek hai 🙄",
        "Doctor ne bhi bola hoga — \"Congratulations, ladki hui hai… height baad mein aayegi.\" (Spoiler: nahi aayi 😂📏)",
        "Itni si thi, par nakhre tab se hi full size the 😌",
        "But genuinely… God ka bahut shukriya ki tum mili 🙏 Unhone tumhe neeche bheja obvious reason se — upar bhi sabko tang hi kar rahi hogi lmaooo 😂",
        "Naraz rehne ke alawa (jo tum 24/7 rehti ho 🙄)… agar tum nahi milti na, toh pata nahi kya hota.",
        "Aur haan, tum mujhse badi ho — nahiiii 🙅‍♂️ sirf AGE mein. Height mein toh main lowkey poora 1 feet bada hoon hahahahahahaha 📏😂",
        "But yeahhhh… thanks for getting on earth 🌍💗",
      ],
      question: {
        q: "Warm-up sawaal: agar tum paida hote waqt worm 🪱 hoti, toh kya tumhari height human wali jitni hi hoti? 🤔",
        a: "",
        yay: "Jawab jo bhi ho… worm bhi shayad tumse lamba hota 🪱😂",
      },
    },

    {
      height: "2'",
      title: "10 cheezein jo mujhe tumhare baare mein pasand hai 💌",
      type: "ten",
      song: "",
      songName: "",
      photo: "img/scooty.jpg",
      caption: "scooty gang 🛵💗",
      text: ["Har card pe tap karo. Saare 10 kholne padenge, koi shortcut nahi 😤"],
      items: [
        { t: "Tumhara dil ❤️", d: "Sach mein abhi tak nahi pata tumne mujh mein kya dekha 🥲 But tumhara dil bahut bada hai. Sab kuch ke baad bhi tum mere saath thi, mujhe pyaar diya. Shayad main kabhi deserve nahi karta tha… but thank you, itna saara pyaar dene ke liye. Aur idk itni chhoti si body mein itna bada dil fit kaise hota hai lmaoooo 😂" },
        { t: "Chhoti but sexy height 📏", d: "Tbh tumhari height duniya ki sabse perfect height hai. Itni cute 🥹 Bataya tha na — ek reason jiski wajah se main tumhari taraf attract hua, wo yahi chhoti si height hai 🤏" },
        { t: "Tumhara helpful nature 🤝", d: "Broooo mujhe abhi bhi yaad hai jab humne baat karna shuru kiya tha, tumne elections mein kitni help ki thi (jo kabhi hue hi nahi 😂). Har cheez mein. Mujhe ek bhi baar yaad nahi jab maine msg ya call kiya ho aur tumne help na ki ho — pehle ki baat hai, abhi toh call karte raho phir bhi nahi uthati 🙄😂 But haan, tum hamesha helpful thi. Exams mein bhi tumne apni cheezein sacrifice ki mere liye. Pata nahi wo sab kabhi kaise repay karunga." },
        { t: "Forehead 🛬", d: "Big asss forehead — poora plane land kar sakta hoon ispe hahahahahahahaha 😂 jk… bangs ke saath ye sabse cute cheez hai jo maine kabhi dekhi hai. Aur wo Dussehra ground wala hairstyle — do balls Mickey Mouse jaise, upar se bangs… perfecttttt 🐭💗" },
        { t: "Tumhari smile 😊", d: "Yaad hai jab 3 din lagaatar humara same colour aur same type ka outfit tha? Aur jab tumne wo dekha, wo smile… ohhhh fuck it was so cute 🥹 Pata nahi kis type ki healer ho tum." },
        { t: "Chhote pair aur chhote haath 🦶🤏", d: "Tumhe pata hai na mujhe feet fetish tha 🙈 Toh tumhare chhote chhote pair hamesha turn on the. Aur ye chhote haath bhi 🤏" },
        { t: "Positivity aur giving nature 🌻", d: "Pata nahi kaise, but tum hamesha itni positive aur giving thi. Main toh full negative banda hoon — har cheez mein pehle bura scenario sochta hoon, phir accha. Tum bilkul opposite thi… kam se kam mere liye 💛" },
        { t: "Tummy (aur ek aur cheez…) 🫃", d: "Hahaha ik tum fat nahi ho, but tumhara tummy aur……. softtttt hai 😌 Mujhe isko apna pillow banana hai." },
        { t: "Tumhare saath main 'main' tha 🫶", d: "Tumhare aas paas main bas khud ho sakta tha. Bahar jaane ke baad aisa kabhi feel hi nahi hua. Tum meri sweet spot thi — kuch bhi bol sakta tha, koi tension nahi. Yahan toh kuch bhi bolne se pehle 1000 baar sochna padta hai." },
        { t: "Sab kuch 💗", d: "Tum jo bhi ho, jaisi bhi ho — andar se, bahar se — sab kuch. Bas waise hi." },
      ],
      question: { q: "Is shit coming properly nowadays? 💩🤔", a: "", yay: "Good good, health is wealth 😌💩" },
    },

    {
      height: "4'5\"",
      title: "Basketball 🏀",
      subtitle: "4'5\" pe hoop tak pahunch paogi? 😏",
      type: "basketball",
      song: "",
      songName: "",
      photo: "",
      caption: "future WNBA star (height ke alawa sab ready hai)",
      text: [
        "Tumhe basketball khelte dekhna… hoop tak ball pahunchane ke liye poori jaan laga deti thi 😂",
        "Chalo, aaj dekhte hain. 3 basket daalo tabhi aage jaane milega!",
      ],
      goal: 3,
      question: { q: "Basketball mein tumhari sabse favourite cheez kya thi? 🏀", a: "" },
    },

    {
      height: "4'9\"",
      title: "Tuition aur uske baad 📚",
      subtitle: "4'9\" — tumhari ASLI height 🤭 (jhooth mat bolna, chart jhooth nahi bolta)",
      type: "story",
      song: "",
      songName: "",
      photo: "",
      caption: "padhai kam, baatein zyada",
      text: [
        "Tuition wale din… padhai kitni hui pata nahi, par baatein bahut hui 😌",
        "Aur uske baad wala time — wahi time jab sab kuch thoda zyada special lagne laga.",
        "Waise official record ke liye: tum 4'9\" ho. 5'1\" sirf tumhare dimaag mein hai 😂",
      ],
      question: { q: "Tuition ke baad hum sabse zyada kya karte the? 😄", a: "" },
    },

    {
      height: "5'0\"",
      title: "Thank you for everything 🙏",
      type: "letter",
      song: "",
      songName: "",
      photo: "",
      caption: "thank you, chhotu 💗",
      text: [
        "Thank you — mere saath itna time bitaane ke liye.",
        "Meri bakwaas sunne ke liye, mere mood swings jhelne ke liye, aur jab main khud ko nahi samajh pa raha tha tab bhi mujhe samajhne ke liye.",
        "Tumne mujhe jitna diya, utna shayad maine kabhi bola nahi. Toh aaj bol raha hoon: thank you. Sab kuch ke liye. 💗",
      ],
      question: { q: "Ek cheez batao jiske liye tum mujhe thank you bolna chahogi 😛", a: "" },
    },

    {
      height: "5'1\"",
      title: "Sorry for everything 🥺",
      subtitle: "5'1\" — finally, wahi height jo tum sabko batati ho 😌",
      type: "letter",
      song: "",
      songName: "",
      photo: "",
      caption: "sorry 🥺",
      text: [
        "Sorry — jo bhi maine galat kiya, jo bhi bola jo nahi bolna chahiye tha, aur jab tumhe meri zarurat thi aur main wahan nahi tha.",
        "Koi excuse nahi hai. Bas itna jaan lo ki mujhe sach mein afsos hai.",
        "Hum abhi jahan bhi hain, jo bhi hai — main bas itna chahta hoon ki tum khush raho. Hamesha. 🥺",
      ],
      question: { q: "Maaf kiya? (haan ya haan 😇)", a: "" },
    },

    {
      height: "🎁 Bonus",
      title: "20 jagah, 20 chhote gifts 🎁",
      type: "gifts",
      song: "",
      songName: "",
      photo: "",
      caption: "ye sab tumhare liye",
      text: [
        "Ek baat bataun? Maine jitni bhi jagah ghooma, har jagah se tumhare liye ek chhota sa gift utha liya. Total 20 jagah, 20 gifts 🙈",
        "Socha tha November mein aaunga toh de dunga… par ab Christmas ke paas aa raha hoon 🎄",
        "Saare 20 dabbe kholo 👇",
      ],
      // Har gift kis jagah se hai — yahan apni 20 jagah likho:
      places: [
        "Jagah #1", "Jagah #2", "Jagah #3", "Jagah #4", "Jagah #5",
        "Jagah #6", "Jagah #7", "Jagah #8", "Jagah #9", "Jagah #10",
        "Jagah #11", "Jagah #12", "Jagah #13", "Jagah #14", "Jagah #15",
        "Jagah #16", "Jagah #17", "Jagah #18", "Jagah #19", "Jagah #20",
      ],
      outro: "Umeed hai tum mind nahi karogi inhe lene mein 🙈 Christmas ke aas paas milte hain… agar tum chaho toh 🎄",
      question: { q: "In 20 mein se sabse pehle kaunsa gift chahiye? (number ya jagah)", a: "" },
    },
  ],

  finale: {
    title: "Happy Birthday! 🎂",
    text: [
      "Congratulations, tumne officially 5'1\" complete kar liya ✅ (pigeon certified 🕊️)",
      "Bas itna hi kehna tha. Khush raho, hamesha muskurati raho, aur forehead pe planes landing karte raho 🛬",
    ],
  },
};
