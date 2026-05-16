export interface Flavor {
  id: string
  name: string
  descriptor: string
  body: string
  bg: string
  accent: string
  image: string
}

export const flavors: Flavor[] = [
  {
    id: 'mango-chili',
    name: 'MANGO CHILI',
    descriptor: 'Sweet enough to trust. Hot enough to remember.',
    body: 'Alphonso mango. Kashmiri chili. Zero regrets.',
    bg: '#FF6B2B',
    accent: '#FFE14D',
    image: '/assets/mango-chili.webp',
  },
  {
    id: 'cucumber-yuzu',
    name: 'CUCUMBER YUZU',
    descriptor: "The most refreshing thing you've ever done wrong.",
    body: 'Garden cucumber. Japanese yuzu. Aggressively clean.',
    bg: '#1A3D2B',
    accent: '#C8F55A',
    image: '/assets/cucumber-yuzu.webp',
  },
  {
    id: 'rose-lychee',
    name: 'ROSE LYCHEE',
    descriptor: 'Romantic. Slightly unhinged. Highly recommended.',
    body: 'Damascus rose water. Fresh lychee. No explanation needed.',
    bg: '#2D0A1E',
    accent: '#FF8FAB',
    image: '/assets/rose-lychee.webp',
  },
  {
    id: 'midnight-blackberry',
    name: 'MIDNIGHT BLACKBERRY',
    descriptor: 'For people who drink sparkling water at midnight.',
    body: 'Wild blackberry. Hint of black pepper. Disturbingly smooth.',
    bg: '#0D0D1A',
    accent: '#9B6DFF',
    image: '/assets/midnight-blackberry.webp',
  },
]
