import type { Locale, PassageId, PlanId, ProviderId, Tier } from "./types";

export type Copy = {
  meta: { title: string; description: string };
  nav: {
    product: string;
    models: string;
    pricing: string;
    start: string;
    menu: string;
    closeMenu: string;
    home: string;
    sections: string;
    blog: string;
  };
  hero: {
    kicker: string;
    title: string;
    whisper: string;
    support: string;
    sentence: string;
    scroll: string;
    models: string;
    plans: string;
    languages: string;
  };
  product: {
    kicker: string;
    title: string;
    lede: string;
    items: {
      id: PassageId;
      label: string;
      title: string;
      body: string;
      note: string;
    }[];
    chat: {
      modelsLabel: string;
      user: string;
      replies: Record<string, string>;
    };
    docs: {
      question: string;
      from: string;
      files: { id: string; name: string; excerpt: string; answer: string }[];
    };
    media: {
      image: string;
      video: string;
      apart: string;
      prompts: { id: string; label: string }[];
    };
  };
  models: {
    kicker: string;
    title: string;
    lede: string;
    all: string;
    search: string;
    clear: string;
    context: string;
    tier: string;
    showing: string;
    empty: string;
    provider: string;
    blurb: string;
    tiers: Record<Tier, string>;
    providers: Record<ProviderId, string>;
  };
  pricing: {
    kicker: string;
    title: string;
    lede: string;
    monthly: string;
    yearly: string;
    perMonth: string;
    billedMonthly: string;
    billedYearly: string;
    save: string;
    currencyUsd: string;
    currencyToman: string;
    opens: string;
    media: string;
    verify: string;
    start: string;
    featured: string;
    names: Record<PlanId, string>;
    features: Record<PlanId, string[]>;
  };
  faq: {
    kicker: string;
    title: string;
    items: { q: string; a: string }[];
  };
  blog: {
    kicker: string;
    title: string;
    titles: string[];
    countMore: string;
    lede: string;
    readLede: string;
    unread: string;
    all: string;
    back: string;
    items: { slug: string; date: string; title: string; body: string; paragraphs: string[] }[];
  };
  finale: { title: string; line: string; start: string };
  soon: { title: string; body: string; close: string };
  footer: { note: string; links: { id: string; label: string }[]; marks: string[] };
};

const fa: Copy = {
  meta: {
    title: "Parto",
    description: "یک گفتگو. چند مدل. فارسی، از اول.",
  },
  nav: {
    product: "محصول",
    models: "مدل‌ها",
    pricing: "قیمت",
    start: "شروع",
    menu: "فهرست",
    closeMenu: "بستن فهرست",
    home: "پرتو، بازگشت به بالا",
    sections: "بخش‌ها",
    blog: "وبلاگ",
  },
  hero: {
    kicker: "فارسی، از اول",
    title: "پرتو",
    whisper: "چند مدل، یک رشته",
    support: "وسط حرف مدل را عوض می‌کنی. پیام‌ها می‌ماند.",
    sentence: "از سند خودت بپرس. تصویر جدا حساب می‌شود.",
    scroll: "پایین",
    models: "مدل",
    plans: "طرح",
    languages: "زبان",
  },
  product: {
    kicker: "محصول",
    title: "گفتگو، سند، تصویر",
    lede: "مدل را وسط حرف عوض می‌کنی. از فایل خودت می‌پرسی. تصویر از اعتبار گفتگو کم نمی‌شود.",
    items: [
      {
        id: "chat",
        label: "گفتگو",
        title: "عوض کردن مدل",
        body: "پیام‌ها می‌ماند. جواب بعدی با مدلی که انتخاب می‌کنی می‌آید.",
        note: "یک سوال. مدل را عوض کن. جواب عوض می‌شود.",
      },
      {
        id: "docs",
        label: "اسناد",
        title: "پرسش از فایل",
        body: "فایل مال خودت است. جواب، نقل همان متن را نشان می‌دهد.",
        note: "فایل را انتخاب کن. نقل زیر جواب عوض می‌شود.",
      },
      {
        id: "media",
        label: "رسانه",
        title: "تصویر و ویدیو",
        body: "ساخت تصویر و ویدیو از اعتبار گفتگو کم نمی‌کند.",
        note: "هزینه از کیف پول رسانه می‌رود.",
      },
    ],
    chat: {
      modelsLabel: "مدل",
      user: "این را کوتاه کن: جلسهٔ فردا ساعت ده در دفتر مرکزی است و همه باید گزارش هفتگی را بیاورند.",
      replies: {
        "gpt-4o": "فردا ساعت ده، دفتر مرکزی. گزارش هفتگی را همراه بیاورید.",
        "claude-3.5-sonnet": "جلسه فردا، ساعت ۱۰، دفتر مرکزی. گزارش هفته همراهتان باشد.",
        "gemini-2.0-flash": "فردا ۱۰، دفتر مرکزی. گزارش هفتگی فراموش نشود.",
      },
    },
    docs: {
      question: "تحویل تا کی است؟",
      from: "از",
      files: [
        {
          id: "notes",
          name: "قرارداد.md",
          excerpt: "تحویل نسخهٔ نهایی: ۲۰ آبان، در دفتر مرکزی.",
          answer: "تا ۲۰ آبان، در دفتر مرکزی.",
        },
        {
          id: "session",
          name: "صورتجلسه.txt",
          excerpt: "بررسی تحویل، پنجشنبه ساعت ۱۶. حضور همه لازم است.",
          answer: "پنجشنبه ساعت ۱۶.",
        },
        {
          id: "brief",
          name: "بودجه.md",
          excerpt: "هزینهٔ تصویر و ویدیو جدا از اعتبار گفتگو محاسبه می‌شود.",
          answer: "تصویر و ویدیو جدا از اعتبار گفتگو است.",
        },
      ],
    },
    media: {
      image: "تصویر",
      video: "ویدیو",
      apart: "از اعتبار گفتگو کم نمی‌شود",
      prompts: [
        { id: "desk", label: "میز چوبی کنار پنجره" },
        { id: "horizon", label: "افق شهر هنگام غروب" },
        { id: "glass", label: "حباب شیشه‌ای روی میز" },
      ],
    },
  },
  models: {
    kicker: "مدل‌ها",
    title: "هفت مدل، یک رشته",
    lede: "هر مدل جای خودش را دارد. گفتگو عوض نمی‌شود.",
    all: "همه",
    search: "جستجوی مدل",
    clear: "پاک کردن جستجو",
    context: "پنجره",
    tier: "لایه",
    provider: "ارائه‌دهنده",
    showing: "نشان‌داده‌شده",
    empty: "مدلی با این نام نیست.",
    blurb: "{name} مدلی {tier} از {provider} است، با پنجرهٔ {context}.",
    tiers: {
      free: "رایگان",
      standard: "استاندارد",
      premium: "ممتاز",
      ultra: "الترا",
    },
    providers: {
      openai: "اوپن‌ای‌آی",
      anthropic: "آنتروپیک",
      google: "گوگل",
      deepseek: "دیپ‌سیک",
      glm: "جی‌ال‌ام",
    },
  },
  pricing: {
    kicker: "قیمت",
    title: "از رایگان تا متخصص",
    lede: "اعتبار گفتگو با طرح می‌آید. تصویر و ویدیو جدا هستند.",
    monthly: "ماهانه",
    yearly: "سالانه",
    perMonth: "در ماه",
    billedMonthly: "پرداخت ماهانه",
    billedYearly: "جمع سال",
    save: "٪ کمتر",
    currencyUsd: "دلار",
    currencyToman: "تومان",
    opens: "مدل‌های باز در این طرح",
    media: "تصویر و ویدیو از این اعتبار کم نمی‌شود.",
    verify: "نیاز به تأیید دانشجویی",
    start: "شروع",
    featured: "پیشنهاد",
    names: {
      free: "رایگان",
      student: "دانشجویی",
      plus: "پلاس",
      pro: "حرفه‌ای",
      expert: "متخصص",
    },
    features: {
      free: ["۵۰ اعتبار در روز", "فقط مدل‌های رایگان", "تا پنج گفتگو"],
      student: ["۲۰۰۰ اعتبار در ماه", "مدل‌های استاندارد", "گفتگوی نامحدود", "تأیید دانشجویی"],
      plus: ["۵۰۰۰ اعتبار در ماه", "تا مدل‌های ممتاز", "گفتگوی نامحدود", "پشتیبانی اولویت‌دار"],
      pro: ["۱۵۰۰۰ اعتبار در ماه", "تا مدل‌های الترا", "دسترسی API", "گزارش پیشرفته"],
      expert: ["۵۰۰۰۰ اعتبار در ماه", "هر چه در حرفه‌ای هست", "پشتیبانی اختصاصی"],
    },
  },
  faq: {
    kicker: "پرسش",
    title: "کوتاه، و روشن",
    items: [
      {
        q: "فارسی از اول هست؟",
        a: "بله. رابط، راست‌به‌چپ، و انگلیسی هر دو آماده‌اند. زبان را هر لحظه عوض می‌کنی.",
      },
      {
        q: "وسط گفتگو می‌شود مدل را عوض کرد؟",
        a: "بله. رشته می‌ماند. مدلِ جواب بعدی عوض می‌شود.",
      },
      {
        q: "جوابِ سند از کجا می‌آید؟",
        a: "از کتابخانهٔ خصوصی خودت. قطعهٔ هم‌خوان زیر جواب می‌آید.",
      },
      {
        q: "تصویر از اعتبار گفتگو کم می‌کند؟",
        a: "نه. تصویر و ویدیو از کیف پول رسانه حساب می‌شوند.",
      },
      {
        q: "طرح دانشجویی چه می‌خواهد؟",
        a: "تأیید دانشجویی. بعد از آن مدل‌های استاندارد و گفتگوی نامحدود باز است.",
      },
    ],
  },
  blog: {
    kicker: "وبلاگ",
    title: "چهار خبر",
    titles: ["خبری نمانده", "یک خبر", "دو خبر", "سه خبر", "چهار خبر"],
    countMore: "{n} خبر",
    lede: "تازه از پرتو.",
    readLede: "همه را خواندی.",
    unread: "جدید",
    all: "همهٔ خبرها",
    back: "بازگشت به خبرها",
    items: [
      {
        slug: "switch-model",
        date: "۱۸ مهر ۱۴۰۵",
        title: "وسط حرف، مدل عوض می‌شود",
        body: "رشته می‌ماند. جواب بعدی با مدلی که انتخاب می‌کنی می‌آید.",
        paragraphs: [
          "رشتهٔ گفتگو سر جایش می‌ماند. عوض کردن مدل، پیام‌های قبلی را پاک نمی‌کند.",
          "مدل را از همان گفتگو انتخاب می‌کنی. سؤال همان است.",
          "جواب بعدی با مدل تازه می‌آید. رشته نمی‌شکند.",
        ],
      },
      {
        slug: "ask-file",
        date: "۹ مهر ۱۴۰۵",
        title: "پرسش از فایل خودت",
        body: "جواب، نقل همان متن را زیر خودش نشان می‌دهد.",
        paragraphs: [
          "فایل در کتابخانهٔ خصوصی خودت است. پرتو از جای دیگری نقل نمی‌آورد.",
          "سؤال را می‌پرسی. جواب، تکهٔ هم‌خوان همان فایل را زیر خودش نشان می‌دهد.",
          "فایل را عوض کنی، نقل هم عوض می‌شود.",
        ],
      },
      {
        slug: "image-credit",
        date: "۲ مهر ۱۴۰۵",
        title: "تصویر از اعتبار گفتگو کم نمی‌کند",
        body: "هزینهٔ تصویر و ویدیو از کیف پول رسانه می‌رود.",
        paragraphs: [
          "ساخت تصویر و ویدیو از اعتبار گفتگو کم نمی‌کند.",
          "هزینه جداست و از کیف پول رسانه حساب می‌شود.",
          "گفتگو سر اعتبار خودش می‌ماند.",
        ],
      },
      {
        slug: "yearly",
        date: "۲۵ شهریور ۱۴۰۵",
        title: "پرداخت سالانه باز شد",
        body: "قیمت روی کارت، همان مبلغ ماه با تخفیف سال است. قیمت قبلی خط می‌خورد.",
        paragraphs: [
          "کنار ماهانه، پرداخت سالانه هم باز است.",
          "عدد روی کارت، مبلغ هر ماه بعد از تخفیف سال است.",
          "قیمت قبلی همان‌جا، با خط، کنار قیمت تازه می‌ماند.",
        ],
      },
    ],
  },
  finale: {
    title: "نور همین‌جا می‌ماند.",
    line: "درِ گفتگو هنوز باز نشده است.",
    start: "شروع گفتگو",
  },
  soon: {
    title: "هنوز نه",
    body: "شروع گفتگو از این صفحه باز نمی‌شود. نور هست؛ در، بعداً.",
    close: "ماندن",
  },
  footer: {
    note: "پرتو",
    links: [
      { id: "product", label: "محصول" },
      { id: "models", label: "مدل‌ها" },
      { id: "pricing", label: "قیمت" },
      { id: "questions", label: "پرسش" },
      { id: "blog", label: "وبلاگ" },
    ],
    marks: ["نماد اعتماد", "ساماندهی", "اینماد"],
  },
};

const en: Copy = {
  meta: {
    title: "Parto",
    description: "One conversation. Several models. Persian, from the first word.",
  },
  nav: {
    product: "Product",
    models: "Models",
    pricing: "Pricing",
    start: "Start",
    menu: "Menu",
    closeMenu: "Close menu",
    home: "Parto, back to top",
    sections: "Sections",
    blog: "Blog",
  },
  hero: {
    kicker: "Persian, from the first word",
    title: "Parto",
    whisper: "Several models, one thread",
    support: "Switch the model mid-conversation. The messages stay.",
    sentence: "Ask your own document. Image is billed apart.",
    scroll: "Down",
    models: "models",
    plans: "plans",
    languages: "languages",
  },
  product: {
    kicker: "Product",
    title: "Chat, documents, image",
    lede: "Switch models mid-thread. Ask your own file. Image does not spend chat credit.",
    items: [
      {
        id: "chat",
        label: "Chat",
        title: "Switch the model",
        body: "The messages stay. The next answer uses the model you pick.",
        note: "One question. Change the model. The answer changes.",
      },
      {
        id: "docs",
        label: "Documents",
        title: "Ask your file",
        body: "The file is yours. The answer shows the line it used.",
        note: "Pick a file. The quote under the answer changes.",
      },
      {
        id: "media",
        label: "Media",
        title: "Image and video",
        body: "Making an image or a video does not spend chat credit.",
        note: "The cost comes from the media wallet.",
      },
    ],
    chat: {
      modelsLabel: "Model",
      user: "Shorten this: Tomorrow’s meeting is at ten, at the main office, and everyone should bring the weekly report.",
      replies: {
        "gpt-4o": "Tomorrow at ten, main office. Bring the weekly report.",
        "claude-3.5-sonnet": "Meeting tomorrow at 10, main office. Please bring your weekly report.",
        "gemini-2.0-flash": "Tomorrow, 10:00, main office. Don’t forget the weekly report.",
      },
    },
    docs: {
      question: "When is delivery?",
      from: "From",
      files: [
        {
          id: "notes",
          name: "contract.md",
          excerpt: "Final delivery: 11 November, at the main office.",
          answer: "11 November, at the main office.",
        },
        {
          id: "session",
          name: "minutes.txt",
          excerpt: "Delivery review on Thursday at 16:00. Everyone attends.",
          answer: "Thursday at 16:00.",
        },
        {
          id: "brief",
          name: "budget.md",
          excerpt: "Image and video are billed apart from chat credit.",
          answer: "Image and video are apart from chat credit.",
        },
      ],
    },
    media: {
      image: "Image",
      video: "Video",
      apart: "Does not spend chat credit",
      prompts: [
        { id: "desk", label: "A wooden desk by a window" },
        { id: "horizon", label: "A city horizon at dusk" },
        { id: "glass", label: "A glass bubble on a table" },
      ],
    },
  },
  models: {
    kicker: "Models",
    title: "Seven models, one thread",
    lede: "Each model has its place. The conversation does not reset.",
    all: "All",
    search: "Search models",
    clear: "Clear search",
    context: "Window",
    tier: "Tier",
    provider: "Provider",
    showing: "showing",
    empty: "No model by that name.",
    blurb: "{name} is a {tier} model from {provider}, with a {context} context window.",
    tiers: {
      free: "Free",
      standard: "Standard",
      premium: "Premium",
      ultra: "Ultra",
    },
    providers: {
      openai: "OpenAI",
      anthropic: "Anthropic",
      google: "Google",
      deepseek: "DeepSeek",
      glm: "GLM",
    },
  },
  pricing: {
    kicker: "Pricing",
    title: "From free to expert",
    lede: "Chat credit comes with the plan. Image and video stay separate.",
    monthly: "Monthly",
    yearly: "Yearly",
    perMonth: "per month",
    billedMonthly: "Billed monthly",
    billedYearly: "Yearly total",
    save: "% off",
    currencyUsd: "USD",
    currencyToman: "Toman",
    opens: "Models this plan opens",
    media: "Image and video do not spend this credit.",
    verify: "Student verification required",
    start: "Start",
    featured: "Suggested",
    names: {
      free: "Free",
      student: "Student",
      plus: "Plus",
      pro: "Pro",
      expert: "Expert",
    },
    features: {
      free: ["50 credits a day", "Free models only", "Up to 5 chats"],
      student: ["2,000 credits a month", "Standard models", "Unlimited chats", "Student verification"],
      plus: ["5,000 credits a month", "Up to premium models", "Unlimited chats", "Priority support"],
      pro: ["15,000 credits a month", "Up to ultra models", "API access", "Advanced analytics"],
      expert: ["50,000 credits a month", "Everything in Pro", "Dedicated support"],
    },
  },
  faq: {
    kicker: "Questions",
    title: "Short, and clear",
    items: [
      {
        q: "Is Persian there from the start?",
        a: "Yes. The interface, right-to-left layout, and English are both ready. Switch language whenever you like.",
      },
      {
        q: "Can the model change mid-conversation?",
        a: "Yes. The thread stays. The model of the next answer changes.",
      },
      {
        q: "Where does a document answer come from?",
        a: "From your private library. The matching passage is shown under the answer.",
      },
      {
        q: "Does an image spend chat credit?",
        a: "No. Image and video are charged to the media wallet.",
      },
      {
        q: "What does the student plan ask for?",
        a: "Student verification. After that, standard models and unlimited chats are open.",
      },
    ],
  },
  blog: {
    kicker: "Blog",
    title: "Four notes",
    titles: ["No notes left", "One note", "Two notes", "Three notes", "Four notes"],
    countMore: "{n} notes",
    lede: "Recent news from Parto.",
    readLede: "You've read them.",
    unread: "New",
    all: "All news",
    back: "Back to the news",
    items: [
      {
        slug: "switch-model",
        date: "10 October 2026",
        title: "Switch the model mid-conversation",
        body: "The thread stays. The next answer uses the model you pick.",
        paragraphs: [
          "The thread stays where it is. Changing the model does not clear earlier messages.",
          "You pick the model from the same conversation. The question stays.",
          "The next answer comes from the new model. The thread does not break.",
        ],
      },
      {
        slug: "ask-file",
        date: "1 October 2026",
        title: "Ask your own file",
        body: "The answer shows the line it used, just underneath.",
        paragraphs: [
          "The file lives in your private library. Parto does not quote from anywhere else.",
          "You ask. The answer shows the matching passage from that file underneath.",
          "Change the file, and the quotation changes with it.",
        ],
      },
      {
        slug: "image-credit",
        date: "24 September 2026",
        title: "Images do not spend chat credit",
        body: "Image and video are charged to the media wallet.",
        paragraphs: [
          "Making an image or a video does not spend chat credit.",
          "That cost is separate. It comes from the media wallet.",
          "The conversation keeps its own credit.",
        ],
      },
      {
        slug: "yearly",
        date: "16 September 2026",
        title: "Yearly billing is open",
        body: "The price on the card is the monthly amount with the yearly discount. The old price is struck through.",
        paragraphs: [
          "Yearly billing sits beside monthly.",
          "The number on the card is the monthly amount after the yearly discount.",
          "The previous price stays there, struck through, next to the new one.",
        ],
      },
    ],
  },
  finale: {
    title: "The light stays here.",
    line: "The door into a conversation is not open yet.",
    start: "Start a conversation",
  },
  soon: {
    title: "Not yet",
    body: "Starting a conversation does not open from this page. The light is here; the door comes later.",
    close: "Stay",
  },
  footer: {
    note: "Parto",
    links: [
      { id: "product", label: "Product" },
      { id: "models", label: "Models" },
      { id: "pricing", label: "Pricing" },
      { id: "questions", label: "Questions" },
      { id: "blog", label: "Blog" },
    ],
    marks: ["Trust mark", "Samandehi", "Enamad"],
  },
};

export const copy: Record<Locale, Copy> = { fa, en };

export function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");
}
