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
        "nov 1 2006, whitest person was born ig 🤍 tabbb bhi gussa hote hue hi paida hui hogi, like kitnaaaa gussa karti haiiii, kitnaaaaaaaaaaa 😤 but thik hai 🙄",
        "doctor must have said \"congrats, it's a girl… height will come later\" (spoiler: it never came 😂📏)",
        "itni si thi but nakhre tab se full size 😌",
        "but yeah, genuinely grateful to god like I got u 🙏 he dropped u for obv reason, upar bhi tang hi kar rahi hogi lmaoooo 😂",
        "but yeahhhh, apart from being naraz all the time, if I wouldn't have met u idk what would have happened",
        "and u r seriously bigger than me… nahhhhhhh, just in ageee 😂 in height now I am lowkeyyy 1 whole feet bigger hahahahahahahahah 📏",
        "but yeahhhhhh, thanks for getting on earth 🌍💗",
      ],
      question: {
        q: "Warm-up question: if you were a worm 🪱 when you took birth, will your height be same as the human one? 🤔",
        a: "",
        yay: "whatever u say… the worm would still be taller 🪱😂",
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
        { t: "Ur heart ❤️", d: "I still don't know what u saw in me, but u have a great heart. U were with me even after everything, u gave me love. ig I never deserved u, but thanks for giving all that love. And idk how such a small body has that big heart lmaoooooo 😂" },
        { t: "Small but sexy heightttt 📏", d: "tbh ur height is the most perfect height ever, like it's so cute 🥹 and like I told u, one of the reasons I feel attracted to u is this small height 🤏" },
        { t: "Ur helpful nature 🤝", d: "broooo I still remember when we started talking, how much u helped me in elections (which never took place 😂), in everything. like u r such a helpful person, I don't remember even a single time when I msged u or called u pehle and u didn't help… not now, abbb toh karte raho toh bhi nahi uthati hmmm 🙄 hahah. but yes, u were always helpful, even in exams u sacrificed ur things for me and I don't know how I could ever repay that" },
        { t: "Forehead 🛬", d: "big asss forehead, I could landdd a whole plane on it hahahahahahahahhah jk 😂 it with ur bangs is the cutest possible thing I could ever see. also that hairstyle u got in Dussehra ground once, with 2 balls like Mickey Mouse and bangs… perfectttt 🐭💗" },
        { t: "Ur smile 😊", d: "idk why, but remember when 3 days lagatar we had the same outfit color and type? when u saw that, that smile… ohhhh fuck it was so cute 🥹 idk what kinda healer u r" },
        { t: "Ur small feet and hands 🦶🤏", d: "uk I had a feet fetishhhhh 🙈 so ur smallll feet were always a turn on" },
        { t: "Positivity and giving nature 🌻", d: "idk like how, but u were always so positive and giving. like me, I am a neg, I think of the negative scenario for everything first, then positive. but u were the opp, atleast for me 💛" },
        { t: "Tummy and one more thing……. 🫃", d: "hahaha ik u r not fat, but ur tummy and ……. is softtttttt 😌 and I would like to make it my pillow" },
        { t: "I can be me around u 🫶", d: "I can be me when I am around u. like idk, after I went outside I never felt like that. u were my sweet spot, I could say anything and not worry. here I have to think 1000 times before saying anything" },
        { t: "Everything u r 💗", d: "everything u r, however u r, all of it… inner, outer" },
      ],
      question: { q: "Is shit coming properly nowadays? 💩🤔", a: "", yay: "Good good, health is wealth 😌💩" },
    },

    {
      height: "4'5\"",
      title: "Basketball 🏀",
      subtitle: "shortyyy, admit I was ur teacher 😏",
      type: "basketball",
      song: "",
      songName: "",
      video: "img/bb.mp4",
      caption: "shorty in action 🎥",
      text: [
        "Seeeee, u are shit in bb, u can't defeat me 😂 but being ur teacher… see, ik u copied my action, so admit I was ur teacher 😤🏀",
        "U play better than any girl I have ever seeen, but in front of meee? nahhhhhh never. I just have to raise my handdsss and u'll keep on jumping hahahahahhahahahahahahahha 🙋‍♂️🦘",
        "but yeahhhh, ig bb played an imp role in making me know u. I hated u early 😂 and ohhhhh god, I paired ur name with Utsavvv 🤢 and now I feel disgusted even thinking about that, how could I do that 😭",
        "but yeahhhh, tbh bb without u ain't fun. but ig our thing started bcz of bb, so thanks bb 🏀💗",
        "Chalo shortyyy, 3 basket daalo tabhi aage jaane milega 😏 (waise ye hoop bhi height mein tumse zyada hai hahahahah)",
      ],
      goal: 3,
      question: {
        q: "Kaun better bb player hai — main ya tum? (Tum better jhooth mat bolna shortyyyyyyy 😤)",
        a: "",
        yay: "Sach toh sabko pata hai 😎🏀",
      },
    },

    {
      height: "4'9\"",
      title: "Leena ma'am tuition 📚",
      subtitle: "4'9\" — ur REAL height 🤭",
      type: "story",
      song: "",
      songName: "",
      photo: "img/doublechin.jpg",
      caption: "i love this double chin hahahahah",
      text: [
        "okay idk how much I studied in Leena ma'am's tuition but yeahhhh, we did a lot of shit hhahahahahahh",
        "like all those clothes coincidences, and Holi and shit like happened there… even bhanda bhi wahi phata 😭 like idk who told but yeahhhh, someone did fk it up",
        "like I still remember bro, bc woh chocolate aur note dete waqt kitni phatiiii 😂 and somehow Leena ma'am got to know about that, ghar pahuncha aur udhar jaake waat lagiii hahahah",
        "bro ik kitni baar main fasa and hum fase hain, but now when I think about it I miss those days, and now I find it something I will remember for all my life as a good memory 💗",
        "bro do u remember denim? like all denim and same somehowwwww, like wtffff 👖👖",
        "also like when we used to come early for tuition class hahahahah 👀",
        "but yeahhhhh, ur feet never touched the ground while sitting on the chairrrr hahahahahahha 🪑🦶",
        "also I remember the chem exammm, tho I don't wanna say but someone said they did all hhahahahahh jkjkjkk 🧪",
      ],
      question: { q: "U gave me many gifts… what was the first thing I gave u, and what did u give me? 🎁", a: "" },
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
