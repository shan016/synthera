import { BriefcaseBusiness, CreditCard, Fingerprint, FolderSearch2, Home, Info, LayoutDashboard, LocateFixed, LogOut, MapPinHouse, MessageCircle, Package, RefreshCcw, Repeat, Settings, User } from "lucide-react";

export const config = {
    title: 'Synthera',
    description: 'Sistem trace IC & rekod kerja',
    icon: Fingerprint,
    slogan: `You can run but you can't hide`,
    wallet: '47n8oZWUKfxTewpK4XWwqEHRaGYn7tfkA4weF8WgEBTxcjpNfFoj9G6cJT4xj7mzkbQsyxjPb5EFJTxZ3Mm4XMoj2fFr3y5',
    bankAcc: '19185899311463',
    bankName: 'ShopeePay'
}

export const NAVBAR_LINKS: link[] = [
    { label: 'Home', href: '/ ', icon: Home },
    { label: 'Products', href: '#products', icon: Package },
    { label: 'About', href: '#', icon: Info },
    { label: 'Contact', href: '#', icon: MessageCircle }
]

export const AUTH_LINKS: link[] = [
    { label: 'Sign Up', href: '/sign-up' },
    { label: 'Sign In', href: '/sign-in', variant: 'outline' }
]


// Sections
export const HERO_SECTION: section = {
    title: 'Trace Lokasi & Rekod Kerja Dengan Mudah',
    description: 'Jejak IC, tengok rekod kerja dengan cepat dan mudah, guna data real-time yang padu!',
    items: [
        { label: 'Log Masuk', href: '/sign-in', variant: 'outline' },
        { label: 'Mula', href: '/sign-up' }
    ]
}

export const FEATURES_SECTION: section = {
    title: 'Apa Yang Boleh Anda Cari',
    description: 'Dapatkan info guna IC, nombor telefon, emel, atau nama.',
    items: [
        {
            title: 'Lokasi IC',
            description: 'Check lokasi yang didaftarkan yang dikaitkan dengan IC.',
            icon: MapPinHouse
        },
        {
            title: 'Rekod Pekerjaan',
            description: 'Check syarikat-syarikat terdahulu yang IC ni pernah daftar/kerja.',
            icon: BriefcaseBusiness
        },
        {
            title: 'Carian Manual',
            description: 'Perlukan carian nombor telefon, emel, atau nama penuh? Kami boleh tolong dengan bayaran.',
            icon: FolderSearch2
        }
    ]
}

export const HOW_SECTION: section = {
    title: 'Cara Nak Guna',
    description: 'Trace lokasi berdaftar dan rekod kerja dalam 3 langkah mudah. Sistem automatik carian dan manual lookup untuk info lebih mendalam.',
    items: [
        { label: 'Masukkan nombor IC/NRIC target' },
        { label: 'Sistem cari rekod' },
        { label: 'Lihat hasil carian' },
    ]
}


// End of sections

export const FOOTER: section = {
    title: `&copy; ${config.title}`,
    description: '',
    items: [
        { label: 'Terms & Conditions', href: '/terms' }
    ]
}


export const routes: Record<string, string> = {
    dashboard: '/dashboard',
    lookup: '/dashboard/lookup',
    billing: '/dashboard/billing',
    subscription: '/dashboard/subscription',
    settings: '/dashboard/settings',
    profile: '/dashboard/profile',
    logout: '/dashboard/logout',
    basic: '/dashboard/checkout/basic',
    pro: '/dashboard/checkout/pro',
    custom: '/dashboard/checkout/custom',
    pakej5: '/dashboard/checkout/pakej5',
    pakej10: '/dashboard/checkout/pakej10',
    manual: '/dashboard/checkout/manual'
}

export const pricing: PricingPlan[] = [
    {
        title: 'Pakej 5',
        description: '5 ringgit untuk 10 kali trace IC.',
        details: [
            '10x trace info IC',
            'Result laju & automatik',
            'Trace lokasi & rekod kerja',
            'Sesuai untuk pengguna biasa'
        ],
        price: 'RM 5.00',
        tag: 'pakej5'
    },
    {
        title: 'Pakej 10',
        description: 'RM10 untuk 30 kali trace info IC.',
        details: [
            '30x carian lokasi IC',
            'Trace lokasi & rekod kerja',
            'Result laju & automatik',
            'Lebih jimat & bernilai'
        ],
        price: 'RM 10.00',
        tag: 'pakej10'
    },
    {
        title: 'Advanced Tracking',
        description: 'Manual trace untuk target tanpa nombor IC',
        details: [
            'Ada nombor phone target je? Guna plan ni',
            'Laporan penuh & maklumat spesifik',
            'Contoh: telefon, media sosial, gambar, no IC',
            'Trace manual dalam 2-3 hari bekerja'
        ],
        price: 'RM 200.00',
        tag: 'manual'
    }
]


// export const faq = [
//     {
//         question: "What payment methods do you accept?",
//         answer: "We only accept Monero (XMR). No bank transfers, no PayPal, no nonsense."
//     },
//     {
//         question: "I don't have Monero. How do I get it?",
//         answer: `Download a Monero wallet from Monero website and buy XMR from KYCNOT or any exchange that supports Monero.`
//     },
//     {
//         question: "How long does it take to process my request?",
//         answer: "Depends on the complexity. Automated searches (IC location & work history) are instant. Manual lookups may take a few hours."
//     },
//     {
//         question: "Can I get a refund?",
//         answer: "No refunds. Once a search is made, it's final. Make sure you know what you're buying."
//     },
//     {
//         question: "What information do I need to perform a lookup?",
//         answer: "For automated searches, you need an IC number. For manual lookups, you can provide a phone number, email, or full name."
//     },
//     {
//         question: "Can I track someone's live location?",
//         answer: "No. We provide registered location history, not real-time tracking."
//     },
//     {
//         question: "How secure is my data?",
//         answer: "We don’t store search queries or logs. Once the data is retrieved, it's delivered to you and not kept on our servers."
//     },
//     {
//         question: "Can I request a custom lookup?",
//         answer: "Yes. We offer custom searches for things like social media profiles, leaked data, and more. Contact us for details."
//     }
// ];

export const faq = [
    {
        question: "Apa kaedah pembayaran yang diterima?",
        answer: "Kami terima pembayaran melalui DuitNow QR. Scan je QR code dan terus buat transfer dari bank korang."
    },
    {
        question: "Takde DuitNow, macam mana nak bayar?",
        answer: "Guna je app bank korang atau internet banking untuk scan QR DuitNow dan transfer duit terus."
    },
    {
        question: "Berapa lama untuk proses permintaan saya?",
        answer: "Itu bergantung pada kesukaran. Carian automatik (lokasi IC & sejarah kerja) segera. Kalau manual, boleh ambil beberapa jam."
    },
    {
        question: "Boleh refund ke?",
        answer: "Tak boleh. Bila dah buat carian, itu final. Pastikan korang tahu apa yang dibeli."
    },
    {
        question: "Apa info yang diperlukan untuk buat lookup?",
        answer: "Untuk carian automatik, korang perlukan nombor IC. Untuk manual, boleh bagi nombor telefon, email, atau nama penuh."
    },
    {
        question: "Boleh track lokasi seseorang secara langsung?",
        answer: "Tak boleh. Kami bagi sejarah lokasi yang dah didaftarkan, bukan tracking masa nyata."
    },
    {
        question: "Macam mana dengan keselamatan data saya?",
        answer: "Kami tak simpan sebarang carian atau log. Bila data dah ambil, kami bagi terus kat korang, lepas tu kami tak simpan."
    },
    {
        question: "Boleh request lookup khas?",
        answer: "Boleh. Kami ada buat carian khas macam profil media sosial, data yang bocor, dan banyak lagi. Hubungi kami untuk details."
    }
];

export const dashboardMenus = [
    { title: "Dashboard", path: routes.dashboard, icon: LayoutDashboard },
    // { title: "Lookup", path: routes.lookup, icon: LocateFixed },
    { title: "Billing", path: routes.billing, icon: CreditCard },
    { title: "Subscription", path: routes.subscription, icon: RefreshCcw },
    { title: "Settings", path: routes.profile, icon: Settings },
];

export const myAccount = [
    {
        item: 'Profile',
        path: routes.profile,
        icon: User
    },
    {
        item: 'Billing',
        path: routes.billing,
        icon: CreditCard
    },
    {
        item: 'Subscription',
        path: routes.subscription,
        icon: Repeat
    },
    {
        item: 'Logout',
        path: '/logout',
        icon: LogOut
    }
]