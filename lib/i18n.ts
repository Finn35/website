export type Lang = "nl" | "en";

export const SUPPORTED_LANGS: Lang[] = ["nl", "en"];
export const DEFAULT_LANG: Lang = "nl";

export type Translations = {
  nav: {
    features: string;
    pricing: string;
    faq: string;
    contact: string;
    cta: string;
  };
  hero: {
    eyebrow: string;
    headlinePre: string;
    headlineEmphasis: string;
    headlinePost: string;
    subhead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trust: { fast: string; price: string; risk: string };
    mockup: {
      url: string;
      brand: string;
      brandTagline: string;
      headline: string;
      sub: string;
      cta: string;
      stars: string;
      toastTitle: string;
      toastBody: string;
    };
  };
  features: {
    eyebrow: string;
    headline: string;
    subhead: string;
    items: Array<{ title: string; body: string; tag: string }>;
  };
  pricing: {
    eyebrow: string;
    headline: string;
    subhead: string;
    monthly: string;
    onetime: string;
    saveBadge: string;
    mostPopular: string;
    perMonth: string;
    onceSuffix: string;
    hostingPrefix: string;
    hostingSuffix: string;
    footnoteMain: string;
    footnoteCompareLead: string;
    footnoteCompareTail: string;
    plans: Array<{
      name: string;
      tagline: string;
      description: string;
      features: string[];
      cta: string;
    }>;
  };
  faq: {
    eyebrow: string;
    headline: string;
    subhead: string;
    contactLink: string;
    items: Array<{ q: string; a: string }>;
  };
  ctaBanner: {
    eyebrow: string;
    headlinePre: string;
    headlineEmphasis: string;
    headlinePost: string;
    subhead: string;
    button: string;
    note: string;
  };
  footer: {
    tagline: string;
    copy: string;
    suffix: string;
  };
  contact: {
    title: string;
    subtitle: string;
    fields: {
      bedrijfsnaam: string;
      naam: string;
      email: string;
      telefoon: string;
      website: string;
      pakketLabel: string;
    };
    pakket: {
      starter: { label: string; price: string };
      groei: { label: string; price: string };
      eenmalig: { label: string; price: string };
      onbekend: { label: string; price: string };
    };
    optionalToggle: string;
    errors: {
      bedrijfsnaam: string;
      naam: string;
      email: string;
      emailFormat: string;
      submit: string;
    };
    submitting: string;
    submit: string;
    success: {
      // Use the {name} and {company} placeholders.
      title: string;
      body: string;
    };
    privacy: string;
    close: string;
    backToHome: string;
  };
  langSwitch: { nl: string; en: string; label: string };
};

const nl: Translations = {
  nav: {
    features: "Wat we doen",
    pricing: "Prijzen",
    faq: "Vragen",
    contact: "Contact",
    cta: "Gratis mockup",
  },
  hero: {
    eyebrow: "Boutique web studio · Nederland",
    headlinePre: "Een website die jouw bedrijf",
    headlineEmphasis: "vooruit helpt",
    headlinePost: ".",
    subhead:
      "We ontwerpen, bouwen en onderhouden moderne websites voor lokale ondernemers. Gratis mockup binnen 48 uur. Vanaf €49 per maand.",
    ctaPrimary: "Vraag gratis mockup aan",
    ctaSecondary: "Bekijk prijzen",
    trust: {
      fast: "Live in 5 dagen",
      price: "Vanaf €49/maand",
      risk: "Geen contract",
    },
    mockup: {
      url: "annas-salon.nl",
      brand: "Anna's Salon",
      brandTagline: "Hair · Color · Care",
      headline: "Mooi haar, eenvoudig geboekt.",
      sub: "Hair en color in het hart van Amsterdam. Open di–za.",
      cta: "Boek een afspraak",
      stars: "5.0 · 124 Google reviews",
      toastTitle: "Afspraak bevestigd",
      toastBody: "Morgen 14:00 · Anna's Salon",
    },
  },
  features: {
    eyebrow: "Wat we doen",
    headline: "Eén studio. Alles wat jouw bedrijf online nodig heeft.",
    subhead:
      "Geen losse leveranciers, geen verrassingen. Eén factuur, één aanspreekpunt.",
    items: [
      {
        title: "Ontwerp dat verkoopt",
        body:
          "Op maat ontworpen, niet uit een template. Snel, modern, gebouwd om bezoekers in klanten te veranderen.",
        tag: "Op maat",
      },
      {
        title: "Boekingen op automatische piloot",
        body:
          "Klanten boeken zelf, 24/7. Koppeling met jouw agenda, bevestigingen en herinneringen — automatisch.",
        tag: "24/7",
      },
      {
        title: "Wij houden alles draaiende",
        body:
          "Updates, beveiliging, tekstwijzigingen — wij regelen het. Jij focust op jouw vak.",
        tag: "Inbegrepen",
      },
    ],
  },
  pricing: {
    eyebrow: "Prijzen",
    headline: "Eenvoudig. Eerlijk. Geen verrassingen.",
    subhead:
      "Maandelijks voor flexibiliteit, of eenmalig om de website te bezitten. Hetzelfde werk, twee manieren om te betalen.",
    monthly: "Maandelijks",
    onetime: "Eenmalig",
    saveBadge: "Bespaar 20%",
    mostPopular: "Meest gekozen",
    perMonth: "/maand",
    onceSuffix: "eenmalig",
    hostingPrefix: "daarna €",
    hostingSuffix: "/maand voor hosting",
    footnoteMain: "Geen contract. Geen opstartkosten. Maandelijks opzegbaar.",
    footnoteCompareLead: "Wix kost €17/maand — maar dan doe je alles zelf.",
    footnoteCompareTail:
      "Bij Lumeq doen wij alles, voor bijna dezelfde prijs.",
    plans: [
      {
        name: "Starter",
        tagline: "Voor wie net begint",
        description:
          "Een rustige, professionele website die jouw bedrijf goed neerzet en boekingen via WhatsApp ontvangt.",
        features: [
          "Professionele website (5 pagina's)",
          "Mobiel geoptimaliseerd",
          "SSL + hosting inbegrepen",
          "WhatsApp-knop",
          "Contactformulier",
          "1 update per maand",
          "Geen contract",
        ],
        cta: "Start met Starter",
      },
      {
        name: "Groei",
        tagline: "Voor wie wil groeien",
        description:
          "Alles uit Starter, plus automatisering die van bezoekers betalende klanten maakt.",
        features: [
          "Alles uit Starter",
          "Online boekingssysteem — klanten boeken via de website, jij beheert via Google Calendar op je telefoon",
          "Google Reviews automatisering",
          "Prioriteit support",
          "3 updates per maand",
          "Basis SEO-optimalisatie",
          "Geen contract",
        ],
        cta: "Start met Groei",
      },
    ],
  },
  faq: {
    eyebrow: "Vragen",
    headline: "Antwoorden op vragen die we vaak krijgen",
    subhead:
      "Staat jouw vraag er niet bij? Stuur ons een berichtje — meestal binnen een paar uur antwoord.",
    contactLink: "hello@lumeq.eu",
    items: [
      {
        q: "Hoe snel staat mijn website online?",
        a:
          "Binnen vijf werkdagen nadat jij het ontwerp goedkeurt. Het eerste ontwerp zie je al binnen 48 uur — gratis en zonder verplichtingen.",
      },
      {
        q: "Wat is het verschil tussen Maandelijks en Eenmalig?",
        a:
          "Maandelijks is een complete dienst: ontwerp, hosting, updates en automatisering — maandelijks opzegbaar. Eenmalig betaal je één keer en is de website van jou; daarna betaal je alleen €19 tot €29 per maand voor hosting.",
      },
      {
        q: "Wat als ik wijzigingen wil na livegang?",
        a:
          "Bij Maandelijks zijn tekstwijzigingen en kleine aanpassingen inbegrepen — meestal binnen 24 uur. Bij Eenmalig kun je zelf wijzigen via het CMS dat we opleveren, of wij regelen het tegen een uurtarief.",
      },
    ],
  },
  ctaBanner: {
    eyebrow: "Klaar om te beginnen?",
    headlinePre: "Eerst maken we een",
    headlineEmphasis: "gratis mockup",
    headlinePost: "van jouw website.",
    subhead:
      "Geen verplichtingen, geen kosten. Binnen 48 uur zie je hoe jouw nieuwe website eruit kan zien.",
    button: "Vraag gratis mockup aan",
    note: "Of stuur direct een mail naar hello@lumeq.eu",
  },
  footer: {
    tagline:
      "Boutique web studio uit Nederland. Modern, rustig, gemaakt om te blijven.",
    copy: "© 2026 Lumeq",
    suffix: "Met zorg gemaakt in Nederland",
  },
  contact: {
    title: "Vraag een gratis mockup aan",
    subtitle:
      "Vul je gegevens in. Binnen 48 uur ontvang je een mockup van jouw nieuwe website — geheel vrijblijvend.",
    fields: {
      bedrijfsnaam: "Bedrijfsnaam",
      naam: "Jouw naam",
      email: "E-mailadres",
      telefoon: "Telefoonnummer (optioneel)",
      website: "Huidige website (optioneel)",
      pakketLabel: "Pakket interesse",
    },
    pakket: {
      starter: { label: "Starter", price: "€49/maand" },
      groei: { label: "Groei", price: "€79/maand" },
      eenmalig: { label: "Eenmalig", price: "" },
      onbekend: { label: "Nog niet zeker", price: "" },
    },
    optionalToggle: "Telefoon en website toevoegen",
    errors: {
      bedrijfsnaam: "Vul je bedrijfsnaam in",
      naam: "Vul je naam in",
      email: "Vul je e-mailadres in",
      emailFormat: "Dit is geen geldig e-mailadres",
      submit:
        "Er ging iets mis. Probeer het opnieuw of mail ons direct op hello@lumeq.eu.",
    },
    submitting: "Versturen…",
    submit: "Verstuur aanvraag",
    success: {
      title: "Bedankt {name}!",
      body: "We maken binnen 48 uur een gratis mockup van {company}. Check je inbox.",
    },
    privacy:
      "We gebruiken je gegevens alleen om contact met je op te nemen.",
    close: "Sluiten",
    backToHome: "← Terug naar home",
  },
  langSwitch: { nl: "NL", en: "EN", label: "Taal" },
};

const en: Translations = {
  nav: {
    features: "Features",
    pricing: "Pricing",
    faq: "FAQ",
    contact: "Contact",
    cta: "Free mockup",
  },
  hero: {
    eyebrow: "Boutique web studio · Europe",
    headlinePre: "A website that moves your business",
    headlineEmphasis: "forward",
    headlinePost: ".",
    subhead:
      "We design, build, and maintain modern websites for small businesses. Free mockup in 48 hours. From €49/month.",
    ctaPrimary: "Get a free mockup",
    ctaSecondary: "See pricing",
    trust: {
      fast: "Live in 5 days",
      price: "From €49/month",
      risk: "No contract",
    },
    mockup: {
      url: "annas-salon.nl",
      brand: "Anna's Salon",
      brandTagline: "Hair · Color · Care",
      headline: "Beautiful hair, easily booked.",
      sub: "Hair and color in the heart of Amsterdam. Open Tue–Sat.",
      cta: "Book an appointment",
      stars: "5.0 · 124 Google reviews",
      toastTitle: "Booking confirmed",
      toastBody: "Tomorrow 2pm · Anna's Salon",
    },
  },
  features: {
    eyebrow: "What we do",
    headline: "One studio. Everything your business needs online.",
    subhead:
      "No scattered vendors, no surprises. One invoice, one point of contact.",
    items: [
      {
        title: "Design that converts",
        body:
          "Designed from scratch, not from a template. Fast, modern, built to turn visitors into customers.",
        tag: "Custom",
      },
      {
        title: "Bookings on autopilot",
        body:
          "Customers book themselves, 24/7. Connected to your calendar, with confirmations and reminders — automatic.",
        tag: "24/7",
      },
      {
        title: "We keep everything running",
        body:
          "Updates, security, text changes — we handle it. You focus on your craft.",
        tag: "Included",
      },
    ],
  },
  pricing: {
    eyebrow: "Pricing",
    headline: "Simple. Fair. No surprises.",
    subhead:
      "Pay monthly for flexibility, or pay once and own the website. Same craft, two ways to pay.",
    monthly: "Monthly",
    onetime: "One-time",
    saveBadge: "Save 20%",
    mostPopular: "Most popular",
    perMonth: "/month",
    onceSuffix: "once",
    hostingPrefix: "then €",
    hostingSuffix: "/month for hosting",
    footnoteMain: "No contract. No setup fees. Cancel monthly.",
    footnoteCompareLead:
      "Wix costs €17/month — but you do everything yourself.",
    footnoteCompareTail: "With Lumeq we do it all, for nearly the same price.",
    plans: [
      {
        name: "Starter",
        tagline: "For getting started",
        description:
          "A calm, professional website that puts your business out there and takes inquiries via WhatsApp.",
        features: [
          "Professional website (5 pages)",
          "Mobile optimised",
          "SSL + hosting included",
          "WhatsApp button",
          "Contact form",
          "1 update per month",
          "No contract",
        ],
        cta: "Start with Starter",
      },
      {
        name: "Growth",
        tagline: "For when you want to grow",
        description:
          "Everything in Starter, plus the automation that turns visitors into paying customers.",
        features: [
          "Everything in Starter",
          "Online booking system — customers book via your website, you manage everything from Google Calendar on your phone",
          "Google Reviews automation",
          "Priority support",
          "3 updates per month",
          "Basic SEO optimisation",
          "No contract",
        ],
        cta: "Start with Growth",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    headline: "Answers to questions we hear most",
    subhead:
      "Not finding your question here? Send us a note — usually a reply within a few hours.",
    contactLink: "hello@lumeq.eu",
    items: [
      {
        q: "How fast will my website be live?",
        a:
          "Within five working days after you approve the design. You'll see the first design within 48 hours — free, no commitment.",
      },
      {
        q: "What's the difference between Monthly and One-time?",
        a:
          "Monthly is a complete service: design, hosting, updates and automation — cancel any month. One-time is a single fee; you own the site, and after handover you only pay €19 to €29 per month for hosting.",
      },
      {
        q: "What if I want changes after launch?",
        a:
          "On Monthly, text changes and small tweaks are included — usually within 24 hours. On One-time, you can edit through the CMS we deliver, or we make changes at our hourly rate.",
      },
    ],
  },
  ctaBanner: {
    eyebrow: "Ready to start?",
    headlinePre: "First, we'll make a",
    headlineEmphasis: "free mockup",
    headlinePost: "of your website.",
    subhead:
      "No commitment, no cost. Within 48 hours you'll see what your new website could look like.",
    button: "Get a free mockup",
    note: "Or send a quick note to hello@lumeq.eu",
  },
  footer: {
    tagline:
      "Boutique web studio. Modern, calm, built to last.",
    copy: "© 2026 Lumeq",
    suffix: "Made with care in the Netherlands",
  },
  contact: {
    title: "Get a free mockup",
    subtitle:
      "Tell us a bit about your business. Within 48 hours you'll receive a mockup of your new website — no commitment.",
    fields: {
      bedrijfsnaam: "Company name",
      naam: "Your name",
      email: "Email",
      telefoon: "Phone (optional)",
      website: "Current website (optional)",
      pakketLabel: "Package interest",
    },
    pakket: {
      starter: { label: "Starter", price: "€49/mo" },
      groei: { label: "Growth", price: "€79/mo" },
      eenmalig: { label: "One-time", price: "" },
      onbekend: { label: "Not sure yet", price: "" },
    },
    optionalToggle: "Add phone and website",
    errors: {
      bedrijfsnaam: "Please enter your company name",
      naam: "Please enter your name",
      email: "Please enter your email",
      emailFormat: "This doesn't look like a valid email",
      submit:
        "Something went wrong. Please try again, or email us at hello@lumeq.eu.",
    },
    submitting: "Sending…",
    submit: "Send request",
    success: {
      title: "Thanks {name}!",
      body: "We'll have a free mockup of {company} ready within 48 hours. Check your inbox.",
    },
    privacy: "We only use your details to get in touch with you.",
    close: "Close",
    backToHome: "← Back to home",
  },
  langSwitch: { nl: "NL", en: "EN", label: "Language" },
};

export const translations: Record<Lang, Translations> = { nl, en };
