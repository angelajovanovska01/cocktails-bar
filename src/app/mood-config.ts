import { Mood } from './cocktail.model';

export const moodMap: Record<string, Mood> = {
  party: {
    label: 'Party Starter',
    emoji: '🥳',
    ingredients: ['Vodka', 'Tequila', 'Rum'],
    fallback: ['Margarita', 'Mojito', 'Cosmopolitan'],
  },
  chill: {
    label: 'Chill Zone',
    emoji: '🧘',
    ingredients: ['Gin', 'Vermouth', 'Tonic'],
    fallback: ['Gin and Tonic', 'Martini', 'Negroni'],
  },
  complex: {
    label: 'Complex Concoction',
    emoji: '🧐',
    ingredients: ['Chartreuse', 'Campari', 'Absinthe'],
    fallback: ['Last Word', 'Sazerac', 'Corpse Reviver'],
  },
  nightcap: {
    label: 'Nightcap',
    emoji: '🌙',
    ingredients: ['Whiskey', 'Brandy', 'Amaro'],
    fallback: ['Old Fashioned', 'Manhattan', 'Vieux Carre'],
  },
};
