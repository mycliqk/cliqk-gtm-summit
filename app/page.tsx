"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Share2, X } from "lucide-react";
import { AnimatedCursor } from "@/components/animated-cursor";
import { CountdownTimer } from "@/components/countdown-timer";

type MarketerStatus = "available" | "claimed" | "active-bid";

interface Marketer {
  id: string;
  name: string;
  company: string;
  role: string;
  status: MarketerStatus;
  image?: string;
}

const initialMarketers: Marketer[] = [
  { id: "1", name: "Tarek Mansour", company: "Kalshi", role: "Founder", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-N31YmhaIKOZeV77MBkoJpIputMEYsU.png" },
  { id: "2", name: "Roy Lee", company: "Cluely", role: "Founder", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0542-cd7HEvMa8uHDjcMLFqM5XsJVvCNzMH.jpeg" },
  { id: "3", name: "Avi Schiffmann", company: "Friend", role: "CEO", status: "available" },
  { id: "4", name: "Sean Hargrow", company: "Series", role: "Founder", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-PTBC2Bys5I9voxPegxHHsvvdim2fzw.png" },
  { id: "5", name: "Anson Lin", company: "Boardy", role: "Founder", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8tbETGIsMqDKmxsdP2WW5NCo5AbyRN.png" },
  { id: "6", name: "Natalie Riso", company: "Rho", role: "Marketing", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-GnNKa2bDeAlFiRK5G7deg2qwuFJDAr.png" },
  { id: "7", name: "Nik Sharma", company: "Sharma Brands", role: "Founder", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a8ed85a1-f21b-4f6d-93b6-c789a91b371e-0OLwRViEsZtTju8LYx6G2Chngzw1bk.png" },
  { id: "8", name: "Ankur Nagpal", company: "Silly Money", role: "Founder", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dIB6FWOzmQmtKH46Ph9liA0ZmAVQna.png" },
  { id: "9", name: "Sheel Shah", company: "Colin and Samir", role: "Head of Growth", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9-puIWsTFj1vL1kG3e8NfZRl94d9YWu5.png" },
  { id: "10", name: "Jaiya Gill", company: "Carry", role: "Marketing", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Jaiya%20Gill-NnvHDNLTGyD9IcmaCWK8CHkc4Q6NQL.png" },
  { id: "11", name: "Sophia Kianni", company: "Phia", role: "Founder", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rmJMHSrPzPOn01IU5VeaNPVSQ4zzQM.png" },
  { id: "12", name: "Phoebe Gates", company: "Phia", role: "Founder", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-tq1iyeoihOcWf37J8eugK7r0UShZzO.png" },
  { id: "13", name: "Andrew Yeung", company: "Fibe", role: "Founder", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Andrew%20Yeung-WTzNKapLch2YXQqajBkbj2QHar1nBd.png" },
  { id: "14", name: "Vin Matano", company: "Creator Buzz", role: "Founder", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9YmtwFRzqI3y3XWglx0oKZjnEDb2sN.png" },
  { id: "6", name: "Stan Rymkiewicz", company: "Default", role: "Founder", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-IhvNHNgS928kVnL6sJKxkNg1VA0dQP.png" },
  { id: "7", name: "Sameer Kapur", company: "Glide", role: "Founder", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7clCBOFEdkkSBVKIA9krzfVVftzOMb.png" },
  { id: "8", name: "Andy Karuza", company: "NachoNacho", role: "Founder", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hUw4Q4OZxtEazjfYqvtkXhiTxk8h86.png" },
  { id: "9", name: "Austin Georgas", company: "Whop", role: "Founder", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LpcpD7x5k0RFbKgAo4rM7FNNGtTmH2.png" },
  { id: "10", name: "Ariel Rubin", company: "Air", role: "Founder", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7IDUQUwYy3oMMTs7jfqopVgNIGyPG3.png" },
  { id: "11", name: "Zehra Naqvi", company: "Lore", role: "Founder", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aA2hXaZlXkRvleIdI3BhpqrVxTg6s4.png" },
  { id: "12", name: "Oren John", company: "&vest", role: "Founder", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-XMpZNataHYpAaXS9IEdVB793ymbqZV.png" },
  { id: "13", name: "Clayton Chambers", company: "Air", role: "Founder", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3hD7UEwYjRcIAjbesoqDmqY1FEj5G7.png" },
  { id: "14", name: "David Fallarme", company: "Owner.com", role: "VP Marketing", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-RN2w2zr9ajAuabg6X5yKgXdJRz76Zu.png" },
  { id: "15", name: "Anita Kirkovska", company: "Vellum AI", role: "Head of Growth", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-R3LLkG0LGEO6g4oCXhB1tN4l4pxwJf.png" },
  { id: "16", name: "Neel Murthy", company: "Rippling", role: "Head of Growth", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FUSThXeSa6X4euOaP6Vqt5FzXu7TR0.png" },
  { id: "17", name: "Aura Benchetrat", company: "BlueCargo", role: "Head of Marketing", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-68AnMvXBhHr52RqCWkh773NvweVbMq.png" },
  { id: "18", name: "Yohan Sudheer", company: "Antimetal", role: "Head of Growth", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-bi6dgyfMIvurNUbKyXkAfNxYtwDgdr.png" },
  { id: "19", name: "Mitchell Anderson", company: "Symphony", role: "Founding GTM Lead", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-47YgiQxubpuWrs3Ez0syBY84Jx95ha.png" },
  { id: "20", name: "Jasdeep Lalli", company: "Weel", role: "Head of Content", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-v6QXnwCMMcoPp8a1ycAV28alRNGDuQ.png" },
  { id: "21", name: "Craig Cannon", company: "Supabase", role: "Head of DevRel", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-nZPH1BAHHy6QDprIjvtRoNU45mPMKZ.png" },
  { id: "22", name: "Louise Ng", company: "Tabs", role: "VP Marketing", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-F9e2D25ibEyJVGQkb2iKEjgIRtXFYI.png" },
  { id: "23", name: "Will Begeny", company: "Tomo", role: "VP Marketing", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-lPMSv1Xk7JBWRp8WNjuibmX9co8q3l.png" },
  { id: "24", name: "Lauren Brose", company: "Upsolve", role: "Head of Growth Marketing", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jOQPlTfdEDlcHoaBJXuJ8I7YZkaAXv.png" },
  { id: "25", name: "James Buckley", company: "Thera", role: "Growth Marketing Manager", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-PdsbT9UAz5eCuRUoGiyVCyXIJDx3fJ.png" },
  { id: "26", name: "Madeline Kuttner", company: "Glossier", role: "Head of Growth Marketing", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6-cA6vnf2ijKx2zwJpRPvCOET32rVLTd.png" },
  { id: "27", name: "Henry Bell", company: "Starbridge", role: "Head of Growth", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7-nz5imzNPdjx4Gd4WbutsuaaWaEWuNN.png" },
  { id: "28", name: "Jack Chen", company: "Riff.ai", role: "VP of Growth", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8-fhFEqnZ6ZatSDwUnQymx6KSlq3blvH.png" },
  { id: "29", name: "Emily Lonetto", company: "Vizcom", role: "Head of Marketing", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10-sXh3qJTimOsqKACWfAqCBFLZ16hGss.png" },
  { id: "31", name: "Clair Simpson", company: "AI Marketing", role: "Founding Marketer", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/11-heXBzsofRxR79HilGyZ9MoQ02hL9Su.png" },
  { id: "32", name: "Madeleine Buras", company: "Tennr", role: "Marketing", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/12-gEYuR7YGMw7xUbElKo2lrw1lMXGnyX.png" },
  { id: "33", name: "Trevor Lynn", company: "GTM Leader", role: "CMO", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/13-XVrSRgANZQxPUVglncMdzYIFDHcqua.png" },
  { id: "34", name: "Saaj Parikh", company: "Titan", role: "Senior Director, Marketing", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/14-hpTtDRrJkW6vGfL2ps9dKEfJChe06n.png" },
  { id: "35", name: "Avante Price", company: "Posh", role: "CEO", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/15-PaecNf3l8qdm9M6ON7FX5Xn6PqviUd.png" },
  { id: "36", name: "Ryan Myher", company: "Genius", role: "COO & Founder", status: "available" },
  { id: "37", name: "Saira Ashraf", company: "TradeZella", role: "Co-Founder & Head of Marketing", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9O8LCVqfiebYrhi8HhcLA0a0Uk9kqU.png" },
  { id: "38", name: "David Wu", company: "Phantom", role: "Head of Growth", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-IQniyVwbLk14qZu4nBAlX9UHNB2TzZ.png" },
  { id: "40", name: "Bunmi Familoni", company: "Magic Spoon", role: "Head of Growth", status: "available" },
  { id: "41", name: "Nathan Storey", company: "Unorthodox Ventures", role: "Founder", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-AnA1N1gJbVYQPqBxn40aX6UAJ7om0V.png" },
  { id: "42", name: "Fabiana Waxman", company: "Alinea Invest", role: "Head of Growth", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hoqCFK2ls2rUwuGiBUxHVl75JxHlcm.png" },
  { id: "43", name: "Nicole Alonso", company: "Neo.Tax", role: "Head of Growth & Strategy", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Hv35HVgWISfm8a8ywsYINohUWlYMJ4.png" },
  { id: "44", name: "Danny Samoon", company: "Nucleus", role: "Growth", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Danny%20Samoon-1NQsko7xrQeobwRslbA1Veautl4mj9.png" },
  { id: "45", name: "Bethany Catron", company: "Rhone", role: "CMO", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bethany%20Catron%20Evans-j4RU74gsNyJG4fqlq2yLq0q2Lcf7MK.png" },
  { id: "46", name: "Jimmy Bruton", company: "Via Carota", role: "CMO", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iqrY3G8KOGtTNe6mMPRLb4s0ekDrFK.png" },
  { id: "47", name: "Bene Eaton", company: "FIGS", role: "CMO", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ben%C3%A9%20Eaton-UptoGmeTSGIdYOMYGrU55MFK4FJL6Q.png" },
  { id: "48", name: "Kara Holinski", company: "Confido", role: "Co-founder/CTO", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZQ4zFbqq2knGcIj5pm1Sa81k4PhB4v.png" },
  { id: "49", name: "Marc Baghadjian", company: "Hyper", role: "CEO", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-QLXUt6S8EaAU9gvavZSMeOXg6trLCo.png" },
  { id: "50", name: "Ben Sharf", company: "Platter", role: "Co-Founder", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZUtlWAWn0UfiNU6xM8vMHd5wNt1H9h.png" },
  { id: "51", name: "Max Marchione", company: "Superpower", role: "Founder", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-xzpsK9smhN5VVdI4lBH9wZpsL26kG7.png" },
  { id: "53", name: "Lisa Popovici", company: "Siena AI", role: "Co-founder", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Lisa%20Popovici-050Fw2p3sJU9JIOG2zPbdr7taYbJYQ.png" },
  { id: "54", name: "Ashley Artrip", company: "Clay", role: "GTM Engineering Manager", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZUtlWAWn0UfiNU6xM8vMHd5wNt1H9h.png" },
  { id: "55", name: "Austin Rief", company: "Morning Brew", role: "Co-Founder", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4Fut6K80kCOjoCQhPgKlRkgWV3I8Sm.png" },
  { id: "58", name: "Jenny Sung", company: "Perplexity", role: "GTM", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LPW8dS34vkfgx6sdeSDvOizHSOjQMY.png" },
  { id: "59", name: "Crystal Sun", company: "Flourish Ventures", role: "Investor", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-A4DZbRE5ncrcwW9psXpSWlcITNMtBX.png" },
  { id: "60", name: "Michael Wenner", company: "Domain Money", role: "Head of Growth", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-nvVef6skAIhIoS46Wo8IQaJgRA9Gc4.png" },
  { id: "61", name: "Ian Beaudoin", company: "Carta", role: "GTM", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Z2oE8YoxCPFYMnctgbiGRNjn4YaZts.png" },
  { id: "62", name: "Will Ziesing", company: "Cursor", role: "GTM", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Will%20Ziesing-ij0K1sW2gfh7SPBvKZb4IHyypYItb8.png" },
  { id: "63", name: "Saffron Agrawal", company: "AI Safety", role: "Researcher", status: "available" },
  { id: "64", name: "Ryan Waas", company: "Worldbuilder Co", role: "Founder", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZLinPltTu9R6B02gX7qGlLvr6TPlCZ.png" },
  { id: "65", name: "Sam Seiler", company: "Unify", role: "GTM", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7nOFBMPDI0mYOzPMp4WLL7LgoJK5Cs.png" },
  { id: "66", name: "Horacio Lopez", company: "Replit", role: "BizOps", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ydkbKLpeOWB6ysp6wl85plsAf6n25K.png" },
  { id: "67", name: "Oliver Brocato", company: "Bustem", role: "Founder", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Oliver%20Brocato-A0ojpWWz4Jf3tUdJCXdlv59unoMAnU.png" },
  { id: "68", name: "Nina Yiamsamatha", company: "Spotify", role: "Marketing", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Nina%20Yiamsamatha-GToPXgeNrKfAY86qwWZcv2rMRzmq5O.png" },
  { id: "69", name: "Nandini Mullaji", company: "Sitch", role: "Marketing", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-SVIl2YDql8df0wyBQ6iOk7gZhyIpuX.png" },
  { id: "70", name: "Dan McCormick", company: "Create Wellness", role: "Marketing", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7Zfr1MwuQ3PBxLN0QZuJaaQIJJbUI2.png" },
  { id: "71", name: "Katie Perry", company: "Zero Hash", role: "Marketing", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BArJGiLuztu6zunPnhid6N6uCZ0ytU.png" },
  { id: "72", name: "Danielle Ito", company: "Notion", role: "Marketing", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Danielle%20Ito-L34PcIy03iAzACRwSsDdeXlmbcK2IF.png" },
  { id: "73", name: "Tom Orbach", company: "Wiz", role: "Marketing", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Tom%20Orbach-2A2qPqegcIjJ4cz7zhoTUOg9O8CoOP.png" },
  { id: "74", name: "Ami Yoshimura", company: "Verci", role: "Marketing", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ami%20Yoshimura-PLps5KQ461eQF7ZLoBb0PymmcBccd5.png" },
  { id: "75", name: "Ankit Patel", company: "Obvi", role: "Founder", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-zUJ85MCFEyFmHeOFr02O3r5oLBYTEw.png" },
  { id: "76", name: "Dakota Rae Lowe", company: "Edelman", role: "Marketing", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WcbpGubjWt1AYKckEVGoC2i20g63S1.png" },
  { id: "77", name: "Alex Chung", company: "Chicago Booth", role: "Marketing", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Alex%20Chung-O1g3e1F0JgfxcZGQ3dhuK3gBUsFvPB.png" },
  { id: "78", name: "Shaan Arora", company: "Alia", role: "Marketing", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-tvBpiBwCxzqvJeIu6LNGnLpVs8DXQ0.png" },
  { id: "79", name: "Sarah Hunter", company: "Warp", role: "Marketing", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-u15UbHXbS0h87tZ174yTol2ZX1vrTY.png" },
  { id: "80", name: "Eve Halimi", company: "Alinea Invest", role: "Founder", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-evHRK0dOqsBw9erCczRmaq1gilbJid.png" },
  { id: "81", name: "Zayd Ali", company: "Valley", role: "Marketing", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-sHvR8bTina7aVp7mBQX0mP0K5uJbul.png" },
  { id: "82", name: "Sawyer Covington", company: "Timely AI", role: "Founder", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-pKDjkgJVI9vrzDonrXatwcZZQygxgv.png" },
  { id: "83", name: "Eli Weiss", company: "Yotpo", role: "Marketing", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-XSWxf7ojlUwEva6ztW6ZClmgW0tc7T.png" },
  { id: "85", name: "Jason Alco", company: "Popl", role: "Marketing", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Jason%20Alco-nypRixUTO8PFS4deptKfDCFtLUyj7Z.png" },
  { id: "86", name: "Kyle Joyce", company: "Enver", role: "Marketing", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-a4qb0L0NOSeQSnqaq3fRG2lt7uKE9J.png" },
  { id: "87", name: "Dan Pantelo", company: "Marpipe", role: "Founder", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LOXPicX0XGNkOuS1kFvJgf2L9tXCuJ.png" },
  { id: "88", name: "Arjun Mahadevan", company: "Doola", role: "Founder", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ri2Z9eHVHIcryqbJ8uU9QWQwnjcdDz.png" },
  { id: "89", name: "Joe Percoco", company: "Titan", role: "Founder", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZQUJXHmWIWOo5j7cuR2jflcj8cJsD0.png" },
  { id: "90", name: "Brandon Beckhardt", company: "Kalshi", role: "Founder", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-o1Nb0HZju7EsTncxydRGtZwcMsbwEg.png" },
  { id: "91", name: "Paulina Westermann", company: "Taktile", role: "Founder", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vYWOSbpoyziYMWroRbL2jAbzhyskPA.png" },
  { id: "93", name: "Maik Wehmeyer", company: "Taktile", role: "Founder", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Maik%20Taro%20Wehmeyer-6mlFb9nytfhC9XPWfgRwnJr9E9RBhk.png" },
  { id: "94", name: "Sydney Bedient", company: "Mutiny", role: "Marketing", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2ZWbTaYbx4Ge5aqX7cLx3pvsrtGp21.png" },
  { id: "95", name: "Misha Esipov", company: "Nova Credit", role: "Founder", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ptHeCVxoGjyvfhyQugJ9yxOUfxqt7B.png" },
  { id: "96", name: "Jacob Ballachino", company: "Artisan", role: "Marketing", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-UOaadwx8jf5RdL5Gp2DTlYQjGYlTFp.png" },
  { id: "97", name: "Nathan Allebach", company: "Ramp", role: "Social Media Lead", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cNs2revskTwJL3WGS7yO5BTYITJ9v8.png" },
  { id: "108", name: "Angela Mascarenas", company: "AI Hot 100 Summit", role: "Founder", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-OhowE03YDwdsAiB8VYIVWDjuwd1LNH.png" },
  { id: "109", name: "Alex Meredith", company: "Perplexity", role: "Marketing", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-R6HmqscanuB6hXZCcRdhXIRh4W1XgM.png" },
  { id: "110", name: "Anuj G", company: "Wadr Law", role: "Founder", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8HPTcyU1UixWiI3P0zLH5L47me5c8R.png" },
  { id: "111", name: "Dalton Pakkala", company: "ElevenLabs", role: "Social Media Manager", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Tu1Ytp9uj1xZOIwqrNCtvQ0VKUStrZ.png" },
  { id: "112", name: "Allan Lvov", company: "Warp", role: "Marketing", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-GGOvSERSZBQFGAFtcTu425rIS8ujns.png" },
  { id: "113", name: "Bhargav Patel", company: "Genuin", role: "Founder", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aOK0VNdWONLCfcKKnUYYlwvvTPRYP9.png" },
  { id: "114", name: "Greggory Elias", company: "Agents for Hire", role: "Founder", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TY0RBTqtL0Tg3hd0yTJLSBSKZHaqTu.png" },
  { id: "115", name: "Tom Shea", company: "Adgile Media", role: "Founder", status: "available", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qQvKOfFT324lIltGZ4eI1B2jH2mWqq.png" },
  { id: "116", name: "Ilias Anwar", company: "Cliqk", role: "CMO", status: "available" },
  { id: "119", name: "Rohan Gurram", company: "Cliqk", role: "CEO", status: "available" },
  { id: "120", name: "Yaz Castillo", company: "Udio", role: "Operations", status: "available" },
];

export default function Home() {
  const [marketers, setMarketers] = useState<Marketer[]>(initialMarketers);
  const [claimingMarketer, setClaimingMarketer] = useState<Marketer | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [linkedInUrl, setLinkedInUrl] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);

  const handleClaim = (id: string) => {
    const marketer = marketers.find((m) => m.id === id);
    if (marketer && marketer.status === "available") {
      setClaimingMarketer(marketer);
    }
  };

  const confirmClaim = () => {
    if (claimingMarketer && linkedInUrl) {
      setMarketers((prev) =>
        prev.map((m) =>
          m.id === claimingMarketer.id ? { ...m, status: "claimed" as const } : m
        )
      );
      setClaimingMarketer(null);
      setLinkedInUrl("");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  return (
    <main 
      className="min-h-screen overflow-x-hidden"
      style={{
        background: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255,255,255,0.08) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 80% 60%, rgba(255,255,255,0.04) 0%, transparent 40%), black"
      }}
    >
      {/* Header */}
      <header className="pt-6 md:pt-8 pb-4 px-4 animate-fade-in">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 min-w-0">
            <img 
              src="https://framerusercontent.com/images/tVGhpvWqKGrz0terIEGkBYTlHE.png" 
              alt="Cliqk" 
              className="w-8 h-8 rounded-lg shrink-0 object-contain"
            />
            <span className="text-white/60 text-xs md:text-sm truncate">GTM Summit by <a href="https://mycliqk.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors duration-300">Cliqk</a></span>
          </div>
          <div className="flex items-center gap-3 sm:gap-6">
            <CountdownTimer />
            <button className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-white/10 text-white/80 hover:bg-white/20 transition-all duration-300 text-xs md:text-sm shrink-0 hover:scale-105">
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-6 md:py-8 px-4 relative">
        <div className="hidden md:block">
          <AnimatedCursor />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-3 animate-slide-up tracking-tight leading-[1.1]">
            Best Marketers
            <span className="block text-white/50 font-medium mt-1">in NYC</span>
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-lg mb-5 animate-slide-up animation-delay-100 leading-relaxed font-normal">
            We built this to bring together the best marketers in tech. If you are on this list, you have been personally invited to GTM Summit.
          </p>
          <p className="text-white/50 text-xs sm:text-sm mb-6 animate-slide-up animation-delay-100 font-medium">
            GTM Summit by{" "}
            <a 
              href="https://mycliqk.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors duration-300"
            >
              Cliqk
            </a>
          </p>
          
          {/* Legend */}
          <div className="flex flex-wrap gap-3 md:gap-4 text-xs md:text-sm animate-slide-up animation-delay-200">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-white/70">Active bid</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-emerald-500" />
              <span className="text-white/70">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-white/20" />
              <span className="text-white/70">Claimed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="px-4 pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {marketers.map((marketer, index) => (
              <div
                key={marketer.id}
                onClick={() => marketer.status === "available" && handleClaim(marketer.id)}
                className={`relative group cursor-pointer transition-all duration-300 bg-zinc-900 rounded-xl p-3 md:p-4 border border-zinc-800 hover:bg-zinc-800 hover:border-purple-500/30 hover:scale-[1.03] hover:-translate-y-1 ${
                  marketer.status === "claimed" ? "opacity-60" : ""
                }`}
              >
                {/* Status indicator */}
                <div className="absolute top-2 right-2 md:top-3 md:right-3 flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      marketer.status === "available"
                        ? "bg-emerald-500"
                        : marketer.status === "active-bid"
                        ? "bg-amber-500 animate-pulse"
                        : "bg-white/20"
                    }`}
                  />
                </div>

{/* Avatar */}
                <div className="relative w-full aspect-square mb-2 md:mb-3">
                  {marketer.image ? (
                    <img 
                      src={marketer.image || "/placeholder.svg"} 
                      alt={marketer.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full rounded-lg flex items-center justify-center bg-gradient-to-br from-purple-600 to-purple-800 transition-transform duration-300 group-hover:scale-105">
                      <span className="text-white text-3xl md:text-4xl font-bold">{marketer.name.charAt(0)}</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="text-center mt-auto">
                  <h3 className="font-semibold text-white text-xs md:text-sm truncate">{marketer.name}</h3>
                  <p className="text-white/60 text-[10px] md:text-xs truncate">{marketer.role}</p>
                  <p className="text-purple-400 text-[10px] md:text-xs mt-0.5 truncate">{marketer.company}</p>
                </div>

                {/* Hover overlay for available cards */}
                {marketer.status === "available" && (
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 to-transparent rounded-xl flex items-end justify-center pb-3 md:pb-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-white font-medium text-xs md:text-sm">Click to Claim</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 pb-16 md:pb-28">
        <div className="max-w-4xl mx-auto">
          <p className="text-white/40 text-[10px] md:text-xs uppercase tracking-[0.2em] mb-3 md:mb-4">The Process</p>
          <h2 className="text-2xl md:text-5xl font-bold text-white mb-10 md:mb-20 leading-tight">
            How it <span className="italic font-normal">works</span>
          </h2>
          <div className="space-y-10 md:space-y-20">
            {[
              { num: "01", title: "Browse the Directory", desc: "Explore NYC's top marketing professionals. Each card represents a leader in their field." },
              { num: "02", title: "Claim Your Ticket", desc: "Found yourself? Repost your profile on LinkedIn and submit the link to claim your exclusive invite." },
              { num: "03", title: "Attend GTM Summit", desc: "Join the gathering. Network with the best marketers in NYC and build lasting connections." },
            ].map((step) => (
              <div key={step.num} className="flex gap-4 md:gap-10 items-start">
                <span className="text-purple-500 font-bold text-xs md:text-base shrink-0 pt-0.5 md:pt-1">{step.num}</span>
                <div>
                  <h3 className="text-white font-bold text-base md:text-2xl mb-2 md:mb-3">{step.title}</h3>
                  <p className="text-white/50 text-xs md:text-base leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 pb-16 md:pb-28">
        <div className="max-w-4xl mx-auto">
          <p className="text-white/40 text-[10px] md:text-xs uppercase tracking-[0.2em] mb-3 md:mb-4">Questions</p>
          <h2 className="text-2xl md:text-5xl font-bold text-white mb-10 md:mb-20 leading-tight">
            Frequently <span className="italic font-normal">Asked</span>
          </h2>
          <div className="space-y-8 md:space-y-16">
            <div className="border-t border-white/10 pt-6 md:pt-8">
              <h3 className="text-white font-bold text-sm md:text-xl mb-3 md:mb-4">What is GTM Summit?</h3>
              <p className="text-white/50 text-xs md:text-base leading-relaxed">
                GTM Summit is an <strong className="text-white">exclusive invite-only event</strong> hosted by{" "}
                <a href="https://mycliqk.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors duration-300">Cliqk</a>{" "}
                that brings together the best marketers in New York City. This curated gathering fosters meaningful connections between top marketing professionals, providing a unique opportunity to network, share insights, and collaborate with the most influential minds in the NYC marketing scene.
              </p>
            </div>
            <div className="border-t border-white/10 pt-6 md:pt-8">
              <h3 className="text-white font-bold text-sm md:text-xl mb-3 md:mb-4">Can I transfer my ticket to another marketer?</h3>
              <p className="text-white/50 text-xs md:text-base leading-relaxed">
                <strong className="text-white">Yes, absolutely.</strong> If you have claimed a ticket but would like to transfer it to another deserving marketer, simply reach out to us at{" "}
                <a href="https://mycliqk.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors duration-300">Cliqk</a>{" "}
                with the details and we will facilitate the transfer. We encourage sharing this opportunity with fellow marketers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GTM Summit Event */}
      <section className="px-4 pb-16 md:pb-32">
        <div className="max-w-4xl mx-auto">
          <p className="text-white/40 text-[10px] md:text-xs uppercase tracking-[0.2em] mb-3 md:mb-4">The Event</p>
          <h2 className="text-3xl md:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
            GTM <span className="italic font-normal">Summit</span>
          </h2>
          <p className="text-white/50 text-sm md:text-lg mb-8 md:mb-16 leading-relaxed">
            An invite-only gathering for <strong className="text-white">CMOs, growth leaders, founders</strong>, and social media operators building modern go-to-market engines.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-16 mb-8 md:mb-16">
            <div>
              <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] mb-1 md:mb-2">Location</p>
              <p className="text-white font-bold text-sm md:text-lg">404 Broadway, 2nd Floor</p>
              <p className="text-white/50 text-xs md:text-sm">New York, NY</p>
            </div>
            <div>
              <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] mb-1 md:mb-2">Hosted By</p>
              <p className="text-white font-bold text-sm md:text-lg">Ilias Anwar & Rohan Gurram</p>
              <p className="text-white/50 text-xs md:text-sm">Cliqk</p>
            </div>
          </div>
          
          <a
            href="https://lu.ma/1gl9fcra"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white font-bold text-xs md:text-base group"
          >
            Apply to Attend
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </a>
        </div>
      </section>

      {/* Claim Modal */}
      {claimingMarketer && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={() => setClaimingMarketer(null)} />
          <div className="relative rounded-t-2xl sm:rounded-2xl p-5 md:p-6 w-full sm:max-w-md border-t sm:border border-zinc-800 shadow-2xl bg-zinc-900 animate-slide-up-modal">
            <button
              onClick={() => setClaimingMarketer(null)}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors duration-300"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center mb-5 md:mb-6">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 md:mb-4 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-purple-800">
                <span className="text-white text-xl md:text-2xl font-serif font-bold">{claimingMarketer.name.charAt(0)}</span>
              </div>
              <h2 className="text-xl md:text-2xl font-serif font-bold text-white mb-1">Claim Your Ticket</h2>
              <p className="text-zinc-400 text-sm">
                Meet <span className="text-purple-400">{claimingMarketer.name}</span> at GTM Summit
              </p>
              <p className="text-white/40 text-xs md:text-sm">
                {claimingMarketer.role} at {claimingMarketer.company}
              </p>
            </div>
            <div className="space-y-3 md:space-y-4">
              <div className="bg-zinc-800 rounded-lg p-3 md:p-4 border border-zinc-700">
                <p className="text-zinc-300 text-xs md:text-sm mb-2 md:mb-3">
                  To claim your ticket, repost your photo from the directory on LinkedIn and submit the link below.
                </p>
                <p className="text-zinc-500 text-[10px] md:text-xs">
                  Can't attend? You can still claim by reposting and give your ticket to another deserving marketer.
                </p>
              </div>
              <Input
                type="url"
                placeholder="Paste your LinkedIn post link"
                value={linkedInUrl}
                onChange={(e) => setLinkedInUrl(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 text-sm"
              />
              <Button
                onClick={confirmClaim}
                disabled={!linkedInUrl}
                className="w-full text-white font-semibold py-5 md:py-6 bg-purple-600 hover:bg-purple-700 transition-all duration-300 hover:scale-[1.02]"
              >
                Submit & Claim Ticket
              </Button>
            </div>
            <p className="text-center text-zinc-500 text-[10px] md:text-xs mt-3 md:mt-4">
              By claiming, you agree to attend or transfer your ticket to another marketer
            </p>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed bottom-4 md:bottom-8 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 bg-emerald-500 text-white px-4 md:px-6 py-3 rounded-xl md:rounded-full font-medium shadow-lg text-sm md:text-base text-center animate-slide-up-modal">
          Ticket claimed successfully!
        </div>
      )}

      {/* Welcome Modal */}
      {showWelcome && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="absolute inset-0 bg-black/95 animate-fade-in" onClick={() => setShowWelcome(false)} />
          <div className="relative w-full sm:max-w-lg bg-zinc-950 border-t sm:border border-zinc-800/50 rounded-t-2xl sm:rounded-2xl p-6 sm:p-10 shadow-2xl animate-slide-up-modal max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowWelcome(false)}
              className="absolute top-5 right-5 text-white/30 hover:text-white transition-colors duration-300"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="mb-8 sm:mb-10">
              <p className="text-white/40 text-[10px] sm:text-xs uppercase tracking-[0.2em] mb-4">GTM Summit NYC</p>
              <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4 sm:mb-5 leading-tight tracking-tight">
                Best Marketers
              </h2>
              <p className="text-white/50 text-sm sm:text-base leading-relaxed">
                The top 120 marketers in tech. Your $500 ticket is covered. Find your name, claim your spot.
              </p>
            </div>
            
            <div className="flex items-center gap-6 mb-8 sm:mb-10 py-4 border-y border-white/10">
              <div>
                <CountdownTimer />
              </div>
            </div>
            
            <div className="space-y-4 mb-8 sm:mb-10">
              <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                Claim within 5 hours by reposting on LinkedIn. After that, your spot goes to open auction.
              </p>
              <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                Not on the list? Repost for a chance to win a spot.
              </p>
            </div>
            
            <button
              onClick={() => setShowWelcome(false)}
              className="w-full py-4 bg-white text-black font-semibold rounded-lg transition-all duration-300 hover:bg-white/90 text-sm sm:text-base tracking-wide"
            >
              View the list
            </button>
            
            <div className="mt-8 flex items-center justify-between">
              <a href="https://mycliqk.com" target="_blank" rel="noopener noreferrer" className="opacity-40 hover:opacity-100 transition-opacity">
                <img 
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image.png-RFdSWPMyG95euwrHD8g2dHWSHmjYuE.jpeg" 
                  alt="Cliqk" 
                  className="h-5 sm:h-6 w-auto"
                />
              </a>
              <span className="text-white/20 text-[10px] sm:text-xs tracking-wide">120 spots</span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
